import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  baseUrl = "https://portfoliowebsite-79fde-default-rtdb.firebaseio.com/"

  async get(requestUrl: string): Promise<Object[]> {
    return this.http.get<Object[]>(this.baseUrl + requestUrl).toPromise();
  }
}
