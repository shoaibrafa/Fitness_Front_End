import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  /**
   * Server path.
   */
  // SERVER = 'http://192.168.0.2:8080/athletique';
  // SERVER = 'http://localhost:8080/athletique';
  SERVER = 'http://192.168.0.106:8080/athletique';

  constructor() { }
}
