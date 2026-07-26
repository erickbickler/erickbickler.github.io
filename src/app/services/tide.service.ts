import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TidePrediction, TideStation } from '../Models/tide';

// Primary NOAA tide prediction stations covering Washington waters.
// Sourced from api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json
const WA_STATIONS: TideStation[] = [
  { id: '9440572', name: 'Fort Canby', lat: 46.268, lng: -124.037 },
  { id: '9440910', name: 'Toke Point', lat: 46.708, lng: -123.967 },
  { id: '9441102', name: 'Westport', lat: 46.904, lng: -124.105 },
  { id: '9441187', name: 'Aberdeen', lat: 46.968, lng: -123.853 },
  { id: '9441627', name: 'Point Grenville', lat: 47.303, lng: -124.27 },
  { id: '9442396', name: 'La Push', lat: 47.913, lng: -124.636 },
  { id: '9442705', name: 'Cape Alava', lat: 48.171, lng: -124.737 },
  { id: '9443090', name: 'Neah Bay', lat: 48.371, lng: -124.602 },
  { id: '9443361', name: 'Sekiu', lat: 48.263, lng: -124.297 },
  { id: '9444090', name: 'Port Angeles', lat: 48.125, lng: -123.44 },
  { id: '9444471', name: 'Dungeness', lat: 48.167, lng: -123.117 },
  { id: '9444900', name: 'Port Townsend', lat: 48.111, lng: -122.76 },
  { id: '9445016', name: 'Foulweather Bluff', lat: 47.927, lng: -122.617 },
  { id: '9445017', name: 'Port Ludlow', lat: 47.925, lng: -122.68 },
  { id: '9445059', name: 'Port Gamble', lat: 47.858, lng: -122.58 },
  { id: '9445133', name: 'Bangor', lat: 47.748, lng: -122.727 },
  { id: '9445246', name: 'Dabob Bay', lat: 47.762, lng: -122.85 },
  { id: '9445293', name: 'Pleasant Harbor', lat: 47.665, lng: -122.912 },
  { id: '9445303', name: 'Seabeck', lat: 47.642, lng: -122.828 },
  { id: '9445326', name: 'Triton Head', lat: 47.603, lng: -122.982 },
  { id: '9445388', name: 'Ayock Point', lat: 47.508, lng: -123.052 },
  { id: '9445441', name: 'Lynch Cove', lat: 47.418, lng: -122.9 },
  { id: '9445478', name: 'Union', lat: 47.358, lng: -123.098 },
  { id: '9445526', name: 'Hansville', lat: 47.918, lng: -122.545 },
  { id: '9445639', name: 'Kingston', lat: 47.797, lng: -122.493 },
  { id: '9445719', name: 'Poulsbo', lat: 47.725, lng: -122.638 },
  { id: '9445753', name: 'Port Madison', lat: 47.705, lng: -122.525 },
  { id: '9445832', name: 'Brownsville', lat: 47.652, lng: -122.615 },
  { id: '9445882', name: 'Eagle Harbor', lat: 47.62, lng: -122.515 },
  { id: '9445958', name: 'Bremerton', lat: 47.562, lng: -122.623 },
  { id: '9445993', name: 'Harper', lat: 47.523, lng: -122.517 },
  { id: '9446025', name: 'Point Vashon', lat: 47.512, lng: -122.463 },
  { id: '9446248', name: 'Des Moines', lat: 47.4, lng: -122.328 },
  { id: '9446281', name: 'Allyn, Case Inlet', lat: 47.383, lng: -122.823 },
  { id: '9446291', name: 'Wauna, Carr Inlet', lat: 47.378, lng: -122.634 },
  { id: '9446366', name: 'Vaughn, Case Inlet', lat: 47.342, lng: -122.775 },
  { id: '9446369', name: 'Gig Harbor', lat: 47.34, lng: -122.588 },
  { id: '9446451', name: 'Horsehead Bay', lat: 47.302, lng: -122.682 },
  { id: '9446484', name: 'Tacoma', lat: 47.267, lng: -122.413 },
  { id: '9446486', name: 'Tacoma Narrows', lat: 47.272, lng: -122.552 },
  { id: '9446489', name: 'Pickering Passage', lat: 47.282, lng: -122.923 },
  { id: '9446583', name: 'McMicken Island', lat: 47.247, lng: -122.862 },
  { id: '9446628', name: 'Shelton', lat: 47.215, lng: -123.083 },
  { id: '9446638', name: 'Longbranch, Filucy Bay', lat: 47.21, lng: -122.753 },
  { id: '9446666', name: 'Totten Inlet', lat: 47.197, lng: -122.938 },
  { id: '9446671', name: 'Devils Head', lat: 47.167, lng: -122.763 },
  { id: '9446714', name: 'Steilacoom', lat: 47.173, lng: -122.603 },
  { id: '9446752', name: 'Little Skookum Inlet', lat: 47.157, lng: -123.008 },
  { id: '9446800', name: 'Boston Harbor', lat: 47.142, lng: -122.903 },
  { id: '9446804', name: 'Anderson Island', lat: 47.153, lng: -122.675 },
  { id: '9446828', name: 'Dupont, Nisqually Reach', lat: 47.118, lng: -122.665 },
  { id: '9446969', name: 'Olympia', lat: 47.06, lng: -122.903 },
  { id: '9447130', name: 'Seattle', lat: 47.603, lng: -122.339 },
  { id: '9447265', name: 'Shilshole Bay', lat: 47.688, lng: -122.403 },
  { id: '9447427', name: 'Edmonds', lat: 47.813, lng: -122.383 },
  { id: '9447659', name: 'Everett', lat: 47.98, lng: -122.223 },
  { id: '9447717', name: 'Priest Point', lat: 48.035, lng: -122.227 },
  { id: '9447773', name: 'Tulalip', lat: 48.065, lng: -122.288 },
  { id: '9447814', name: 'Glendale, Whidbey Island', lat: 47.94, lng: -122.357 },
  { id: '9447854', name: 'Bush Point, Whidbey Island', lat: 48.033, lng: -122.607 },
  { id: '9447883', name: 'Greenbank, Whidbey Island', lat: 48.105, lng: -122.57 },
  { id: '9447905', name: 'Admiralty Head', lat: 48.158, lng: -122.668 },
  { id: '9447929', name: 'Coupeville, Penn Cove', lat: 48.223, lng: -122.69 },
  { id: '9447951', name: 'Sunset Beach, Whidbey Island', lat: 48.283, lng: -122.728 },
  { id: '9447985', name: 'Smith Island', lat: 48.317, lng: -122.837 },
  { id: '9447993', name: 'Ala Spit, Whidbey Island', lat: 48.397, lng: -122.587 },
  { id: '9448094', name: 'Kayak Point', lat: 48.137, lng: -122.367 },
  { id: '9448558', name: 'La Conner', lat: 48.392, lng: -122.497 },
  { id: '9448601', name: 'Deception Pass', lat: 48.413, lng: -122.615 },
  { id: '9448682', name: 'Padilla Bay', lat: 48.458, lng: -122.513 },
  { id: '9448794', name: 'Anacortes', lat: 48.518, lng: -122.62 },
  { id: '9449161', name: 'Lummi Island', lat: 48.717, lng: -122.708 },
  { id: '9449211', name: 'Bellingham', lat: 48.745, lng: -122.495 },
  { id: '9449424', name: 'Cherry Point', lat: 48.863, lng: -122.759 },
  { id: '9449639', name: 'Point Roberts', lat: 48.975, lng: -123.083 },
  { id: '9449679', name: 'Blaine', lat: 48.992, lng: -122.765 },
  { id: '9449704', name: 'Patos Island', lat: 48.787, lng: -122.97 },
  { id: '9449771', name: 'Rosario, Orcas Island', lat: 48.647, lng: -122.87 },
  { id: '9449834', name: 'Roche Harbor, San Juan Island', lat: 48.61, lng: -123.155 },
  { id: '9449880', name: 'Friday Harbor', lat: 48.545, lng: -123.013 },
  { id: '9449982', name: 'Richardson, Lopez Island', lat: 48.447, lng: -122.9 },
];

const NOAA_BASE = 'https://api.tidesandcurrents.noaa.gov/api/prod/datagetter';

@Injectable({ providedIn: 'root' })
export class TideService {
  private cache = new Map<string, TidePrediction[]>();

  constructor(private http: HttpClient) {}

  getNextLowTides(lat: number, lng: number, count = 3): Observable<TidePrediction[]> {
    const station = this.nearestStation(lat, lng);
    const key = `${station.id}_${this.dateStr(0)}`;

    if (this.cache.has(key)) {
      return of(this.nextN(this.cache.get(key)!, count));
    }

    const url = `${NOAA_BASE}?product=predictions&station=${station.id}` +
      `&datum=MLLW&time_zone=lst_ldt&interval=hilo&units=english` +
      `&begin_date=${this.dateStr(0)}&end_date=${this.dateStr(2)}&format=json`;

    return this.http.get<any>(url).pipe(
      map(resp => {
        const lows: TidePrediction[] = (resp.predictions || [])
          .filter((p: any) => p.type === 'L')
          .map((p: any) => ({
            // NOAA returns local time strings; parse as local by converting to ISO
            time: new Date(p.t.replace(' ', 'T')),
            heightFt: parseFloat(p.v),
          }));
        this.cache.set(key, lows);
        return this.nextN(lows, count);
      }),
      catchError(() => of([]))
    );
  }

  private nextN(preds: TidePrediction[], count: number): TidePrediction[] {
    const now = new Date();
    return preds.filter(p => p.time > now).slice(0, count);
  }

  private nearestStation(lat: number, lng: number): TideStation {
    return WA_STATIONS.reduce((best, s) => {
      const d = Math.hypot(s.lat - lat, s.lng - lng);
      const db = Math.hypot(best.lat - lat, best.lng - lng);
      return d < db ? s : best;
    });
  }

  private dateStr(offsetDays: number): string {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}${m}${day}`;
  }
}
