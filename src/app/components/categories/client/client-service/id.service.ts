import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class IdService {
  clientID: string;

  setId(id: string): void{
    this.clientID = id;
    window.localStorage.setItem('clientId', id);
  }

  getId(): string{
    return this.clientID;
  }

}
