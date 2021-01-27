import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuestionariosPageRoutingModule } from './cuestionarios-routing.module';

import { CuestionariosPage } from './cuestionarios.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuestionariosPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CuestionariosPage]
})
export class CuestionariosPageModule {}
