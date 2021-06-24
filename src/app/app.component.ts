import { Component, OnInit } from '@angular/core';
import { AgencyService } from './services/agency.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'BCP';

  constructor(private agencyService: AgencyService) {
    this.agencyService.initData();
  }
}
