import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router'
import { AgencyService } from '../../services/agency.service';
import { AgencyModel } from '../../models/agency.model';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, AfterViewInit {

  displayedColumns = ["agencia", "departamento", "provincia", "distrito", "direccion", "btnAction"];
  dtGrid: MatTableDataSource<AgencyModel> = new MatTableDataSource();;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private agencyService: AgencyService,
    private router: Router) { }

  ngOnInit(): void {
    this.events.init();
    this.functions.init();
  }

  ngAfterViewInit(): void {
    this.dtGrid.paginator = this.paginator;
    this.dtGrid.sort = this.sort;
  }

  events = {
    init: () => {

    },
    clickBtnNew: () => {
      this.router.navigateByUrl('main/new');
    },
    clickBtnEdit: (id: string) => {
      this.router.navigateByUrl(`main/${id}`);
    }
  }

  functions = {
    init: () => {
      this.functions.getList();
    },
    getList: () => {
      this.agencyService.getList().subscribe(resp => {
        this.dtGrid.data = resp;
      });
    },
    applyFilter: (event: Event) => {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dtGrid.filter = filterValue.trim().toLowerCase();

      if (this.dtGrid.paginator) {
        this.dtGrid.paginator.firstPage();
      }
    }

  }

}
