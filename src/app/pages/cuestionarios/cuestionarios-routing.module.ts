import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuestionariosPage } from './cuestionarios.page';

const routes: Routes = [
  {
    path: '',
    component: CuestionariosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CuestionariosPageRoutingModule {}
