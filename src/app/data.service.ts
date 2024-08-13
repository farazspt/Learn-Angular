import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
  useValue: '',
})
export class DataService {
  constructor(private url: string, private http: HttpClient) {}

  getAll() {
    return this.http.get(this.url);
  }

  getById(id: string | number) {
    return this.http.get(this.url + '/' + id);
  }

  create(body: any) {
    return this.http.post(this.url, body);
  }

  patch(post: any, postData: string, headers: any) {
    headers = headers || {};
    return this.http.patch(this.url + '/' + post.id, postData, headers);
  }

  put(post: any, postData: string, headers: any) {
    headers = headers || {};
    return this.http.put(this.url + '/' + post.id, postData, headers);
  }

  delete(post: any) {
    return this.http.delete(this.url + '/' + post.id);
  }
}
