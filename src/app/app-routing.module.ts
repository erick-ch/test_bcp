import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainCrudComponent } from './components/main-crud/main-crud.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  { path: 'main/:id', component: MainCrudComponent },
  { path: '**', component: MainComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
