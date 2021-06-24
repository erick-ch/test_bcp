import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgencyService } from '../../services/agency.service';
import { AgencyModel } from '../../models/agency.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MapLabel, MapPositionModel } from '../../models/map.model';


@Component({
  selector: 'app-main-crud',
  templateUrl: './main-crud.component.html',
  styleUrls: ['./main-crud.component.scss']
})
export class MainCrudComponent implements OnInit {

  private idUrl: string;
  public urlImg: string = '';
  public stateRegister: 'NEW' | 'EDIT';
  public form: FormGroup;
  public mapPosition = new MapPositionModel();
  public mapLabel = new MapLabel();

  constructor(private fb: FormBuilder,
    private agencyService: AgencyService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    this.functions.createForm();
  }

  ngOnInit(): void {
    this.functions.init();
  }

  functions = {
    init: () => {
      this.functions.listenerStateRegister();
    },
    listenerStateRegister: () => {
      this.activatedRoute.params.subscribe(({ id }) => {
        if (id === 'new') {
          this.stateRegister = 'NEW';
          return;
        };

        this.idUrl = id;
        this.stateRegister = 'EDIT';
        this.functions.setForm();
      });
    },
    createForm: () => {
      this.form = this.fb.group({
        agencia: ['', Validators.required],
        departamento: ['', Validators.required],
        provincia: ['', Validators.required],
        distrito: ['', Validators.required],
        direccion: ['', Validators.required],
        lat: [-12.072459, [Validators.required, Validators.pattern(/^-?[0-9]\d*(\.\d+)?$/)]],
        lon: [-77.071117, [Validators.required, Validators.pattern(/^-?[0-9]\d*(\.\d+)?$/)]]
      });
    },
    save: () => {
      if (this.form.valid) {
        const valueForm = this.form.value;

        const entity = new AgencyModel();
        entity.agencia = valueForm.agencia;
        entity.departamento = valueForm.departamento;
        entity.provincia = valueForm.provincia;
        entity.distrito = valueForm.distrito;
        entity.direccion = valueForm.direccion;
        entity.lat = valueForm.lat;
        entity.lon = valueForm.lon;
        entity.img = 'https://source.unsplash.com/category/technology';

        if (this.stateRegister === 'NEW') {
          this.agencyService.insert(entity);
        }
        else {
          entity.id = this.idUrl;
          this.agencyService.update(entity);
        }

        this.router.navigateByUrl('/main')
      }
    },
    setForm: () => {
      const { agencia, departamento, provincia,
        distrito, direccion, lat, lon, img
      } = this.agencyService.getById(this.idUrl);

      this.form.setValue({
        agencia,
        departamento,
        provincia,
        distrito,
        direccion,
        lat,
        lon
      });

      this.urlImg = img;

      this.mapPosition.lat = lat;
      this.mapPosition.lng = lon;

      this.mapLabel.color = 'yellow';
      this.mapLabel.text = agencia;
    }
  }

}
