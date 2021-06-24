import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataInit } from '../../assets/data/data';
import { Observable, of } from 'rxjs';
import { AgencyModel } from '../models/agency.model';
import { UUID } from 'angular2-uuid';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {

  constructor(private http: HttpClient) { }

  get dataLocal(): AgencyModel[] {
    return JSON.parse(localStorage.getItem('data_main'));
  }

  initData() {
    const dataLocalString = JSON.stringify(DataInit);
    const dataParse: AgencyModel[] = JSON.parse(dataLocalString);
    const dataSet: AgencyModel[] = dataParse.map(x => ({
      id: UUID.UUID(),
      agencia: x.agencia,
      distrito: x.distrito,
      provincia: x.provincia,
      departamento: x.departamento,
      direccion: x.direccion,
      lat: x.lat,
      lon: x.lon,
      img: 'https://source.unsplash.com/category/technology'
    }));

    localStorage.setItem('data_main', JSON.stringify(dataSet))
  }

  getList(): Observable<AgencyModel[]> {
    const data = this.dataLocal;
    return of<AgencyModel[]>(data);
  }

  getById(id: string): AgencyModel {
    const data = this.dataLocal;
    return data.find(x => x.id === id);
  }

  insert(entity: AgencyModel) {
    entity.id = UUID.UUID();
    let newData = this.dataLocal;
    newData.unshift(entity);

    localStorage.setItem('data_main', JSON.stringify(newData));
  }

  update(entity: AgencyModel) {
    let dataLocal = this.dataLocal;

    let newData = dataLocal.map(x => {
      if (x.id === entity.id) return { ...entity };
      return x;
    });

    localStorage.setItem('data_main', JSON.stringify(newData));
  }
}
