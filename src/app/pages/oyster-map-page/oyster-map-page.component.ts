import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { Beach, BeachStatus } from '../../Models/beach';
import { OysterBeachService } from '../../services/oyster-beach.service';
import { TideService } from '../../services/tide.service';
import { TidePrediction } from '../../Models/tide';

const STATUS_COLOR: Record<BeachStatus, string> = {
  open: '#2ecc71',
  conditional: '#f39c12',
  closed: '#e74c3c',
  unclassified: '#95a5a6',
};

@Component({
  selector: 'app-oyster-map-page',
  templateUrl: './oyster-map-page.component.html',
  styleUrls: ['./oyster-map-page.component.css']
})
export class OysterMapPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  beaches: Beach[] = [];
  loading = true;
  error = false;
  showOystersOnly = false;
  statusFilter: Record<BeachStatus, boolean> = {
    open: true,
    conditional: true,
    closed: true,
    unclassified: false,
  };

  private map!: L.Map;
  private markerLayer = L.layerGroup();

  constructor(
    private beachService: OysterBeachService,
    private tideService: TideService,
  ) {}

  ngOnInit(): void {
    this.beachService.getBeaches().subscribe({
      next: (beaches) => {
        this.beaches = beaches;
        this.loading = false;
        this.renderMarkers();
      },
      error: () => {
        this.loading = false;
        this.error = true;
      }
    });
  }

  ngAfterViewInit(): void {
    this.map = L.map(this.mapContainer.nativeElement).setView([47.5, -122.7], 8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(this.map);
    this.markerLayer.addTo(this.map);
  }

  ngOnDestroy(): void {
    if (this.map) this.map.remove();
  }

  onFilterChange(): void {
    this.renderMarkers();
  }

  get visibleCount(): number {
    return this.filteredBeaches().length;
  }

  private filteredBeaches(): Beach[] {
    return this.beaches.filter((b) => {
      if (this.showOystersOnly && !b.hasOyster) return false;
      return this.statusFilter[b.status];
    });
  }

  private renderMarkers(): void {
    if (!this.map) return;
    this.markerLayer.clearLayers();
    for (const beach of this.filteredBeaches()) {
      try {
        const color = STATUS_COLOR[beach.status];
        const marker = L.circleMarker([beach.lat, beach.lng], {
          radius: 7,
          fillColor: color,
          color: '#fff',
          weight: 1.5,
          fillOpacity: 0.9,
        });

        const speciesLine = beach.species ? `<div class="popup-species">${beach.species}</div>` : '';
        const reasonLine = beach.reason ? `<div class="popup-reason">${beach.reason}</div>` : '';
        const wdfwLink = beach.wdfwUrl
          ? `<a href="${beach.wdfwUrl}" target="_blank" rel="noopener">WDFW beach info</a>`
          : '';

        marker.bindPopup(`
          <strong>${beach.name}</strong>
          <div class="popup-county">${beach.county} County</div>
          <div class="popup-status popup-status--${beach.status}">${this.statusLabel(beach.status)}</div>
          ${speciesLine}
          ${reasonLine}
          ${wdfwLink}
          <div class="popup-tides">
            <div class="popup-tides-label">Next low tides</div>
            <div class="popup-tides-rows">Loading…</div>
          </div>
        `, { maxWidth: 300 });

        marker.on('popupopen', () => {
          this.tideService.getNextLowTides(beach.lat, beach.lng, 3).subscribe(tides => {
            const popup = marker.getPopup();
            const el = popup?.getElement()?.querySelector('.popup-tides-rows');
            if (el) {
              el.innerHTML = tides.length
                ? tides.map(t => this.tideRow(t)).join('')
                : '<span class="tide-unavailable">Tide data unavailable</span>';
            }
          });
        });

        this.markerLayer.addLayer(marker);
      } catch { /* skip any beach with unprojectable coordinates */ }
    }
  }

  private tideRow(t: TidePrediction): string {
    const now = new Date();
    const isToday = t.time.toDateString() === now.toDateString();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const isTomorrow = t.time.toDateString() === tomorrow.toDateString();

    const dayLabel = isToday ? 'Today' : isTomorrow ? 'Tomorrow'
      : t.time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const timeStr = t.time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    const sign = t.heightFt < 0 ? '' : '+';

    return `<div class="tide-row">
      <span class="tide-day">${dayLabel}</span>
      <span class="tide-time">${timeStr}</span>
      <span class="tide-height">${sign}${t.heightFt.toFixed(1)} ft</span>
    </div>`;
  }

  private statusLabel(s: BeachStatus): string {
    const labels: Record<BeachStatus, string> = {
      open: 'Open',
      conditional: 'Conditionally Open',
      closed: 'Closed',
      unclassified: 'Unclassified',
    };
    return labels[s];
  }
}
