import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GraficaComponent } from './grafica/grafica.component';
import { AbecedarioComponent } from './abecedario/abecedario.component';
import { PalabraComponent } from './palabra/palabra.component';
import { AdministradorComponent } from './administrador/administrador.component';

const routes: Routes = [
  {
    path:'admin',
    component:AdminComponent,
    children:[
      {path:'',component:DashboardComponent},
      {path:'grafica',component:GraficaComponent},
      {path:'abecedario',component:AbecedarioComponent},
      {path:'palabra',component:PalabraComponent},
      {path:'administrador',component:AdministradorComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
