import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Beach, BeachStatus } from '../Models/beach';

const DOH_URL =
  'https://fortress.wa.gov/doh/arcgis/arcgis/rest/services/Biotoxin/Biotoxin_v2/MapServer/4/query' +
  '?where=1%3D1&outFields=*&outSR=4326&f=geojson';

@Injectable({ providedIn: 'root' })
export class OysterBeachService {
  constructor(private http: HttpClient) {}

  getBeaches(): Observable<Beach[]> {
    return this.http.get<any>(DOH_URL).pipe(
      map((geojson) => geojson.features
        .map((f: any) => this.parseFeature(f))
        .filter((b: Beach | null) => b !== null) as Beach[])
    );
  }

  private parseFeature(feature: any): Beach | null {
    const attrs = feature.properties as Record<string, any>;
    const geom = feature.geometry;
    if (!geom) return null;

    // Extract a flat array of [lng, lat] points regardless of geometry type
    let points: number[][];
    if (geom.type === 'MultiLineString') {
      // coordinates = [subline, subline, ...]; pick midpoint of the longest subline
      const sublines: number[][][] = geom.coordinates;
      const longest = sublines.reduce((a: number[][], b: number[][]) => b.length > a.length ? b : a, sublines[0]);
      points = longest;
    } else {
      points = geom.coordinates as number[][];
    }

    if (!points || !points.length) return null;

    // midpoint of the shoreline
    const mid = points[Math.floor(points.length / 2)];
    if (!mid || mid.length < 2) return null;
    const [lng, lat] = mid;
    if (typeof lng !== 'number' || typeof lat !== 'number' || !isFinite(lng) || !isFinite(lat)) return null;

    const name = this.attr(attrs, 'beachname') || this.attr(attrs, 'NAME') || 'Unknown Beach';
    const finalStatus = (this.attr(attrs, 'finalstatus') || '').toLowerCase();
    let status = this.normalizeStatus(finalStatus);
    let reason = this.attr(attrs, 'reasondescription')
      || this.attr(attrs, 'otherreasondescription')
      || this.attr(attrs, 'POLLREASON')
      || this.attr(attrs, 'BIOREASON')
      || '';

    // DFWOpen=0 means WDFW hasn't opened the harvest season. This is independent of DOH
    // water quality / biotoxin status — a beach can have clean water but a closed season.
    const dfwOpenRaw = this.attrRaw(attrs, 'DFWOpen');
    const dfwOpen = dfwOpenRaw === 1 || dfwOpenRaw === '1';
    if (!dfwOpen && (status === 'open' || status === 'conditional')) {
      status = 'closed';
      const cseason = this.attr(attrs, 'Cseason').replace(/<[^>]*>/g, '').trim();
      reason = cseason || 'WDFW harvest season is not currently open.';
    }

    const species = [
      this.attr(attrs, 'beachbiotoxinspecie'),
      this.attr(attrs, 'beachconditionalspecie'),
    ].filter(Boolean).join('; ');
    const county = this.attr(attrs, 'countyname') || this.attr(attrs, 'COUNTY') || '';
    const wdfwUrl = this.attr(attrs, 'WDFW') || '';

    const oysterText = (name + ' ' + species + ' ' + reason).toLowerCase();
    const hasOyster = oysterText.includes('oyster');

    return { name, status, reason, species, county, wdfwUrl, lat, lng, hasOyster };
  }

  // suffix-match against fully-qualified ArcGIS field names
  private attr(attrs: Record<string, any>, suffix: string): string {
    const key = Object.keys(attrs).find((k) => k === suffix || k.endsWith('.' + suffix));
    return key ? (attrs[key] ?? '') : '';
  }

  private attrRaw(attrs: Record<string, any>, suffix: string): any {
    const key = Object.keys(attrs).find((k) => k === suffix || k.endsWith('.' + suffix));
    return key ? attrs[key] : undefined;
  }

  private normalizeStatus(raw: string): BeachStatus {
    if (raw.includes('conditional')) return 'conditional';
    if (raw === 'open') return 'open';
    if (raw === 'closed') return 'closed';
    return 'unclassified';
  }
}
