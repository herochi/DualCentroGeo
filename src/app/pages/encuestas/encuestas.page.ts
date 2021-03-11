import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CuestionarioService } from '../../services/cuestionario.service';
import { EncuestaModel } from '../../models/encuesta.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.page.html',
  styleUrls: ['./encuestas.page.scss'],
})
export class EncuestasPage implements OnInit {

  encuestas: EncuestaModel[] = [];
  correo = '';
  tipoUser = '';
  terminacionCorreo = '';

  constructor(private auth: AuthService, private router: Router, private cuestionarios: CuestionarioService) {
    this.correo = localStorage.getItem('correo');
    console.log(this.correo);
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.correo.length; i++){
      if ( this.correo.charAt(i) === '@'){
            for (let j = i; j < this.correo.length; j ++){
                this.terminacionCorreo = this.terminacionCorreo + this.correo.charAt(j);
              }
      }

    }
    console.log(this.terminacionCorreo);
    if (this.terminacionCorreo === '@centrogeo.edu.mx') {
        this.tipoUser = 'investigador';
    }else{
      this.tipoUser = 'normal';
    }
    console.log(this.tipoUser);
  }

  ngOnInit() {
    this.cuestionarios.obtenerCuestionarios()
    // tslint:disable-next-line: deprecation
    .subscribe( resp => {
      // console.log(resp);
      this.encuestas = resp;
      console.log(this.encuestas);
    } );
  }

  salir(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }


  crearCuestionario(){
   this.router.navigateByUrl('/cuestionarios');
  }

  irResponder(id: string){
    this.router.navigateByUrl(`/responder-encuesta/${id}`);
    console.log(id);
  }

  borrarEncuesta( cuestionario: EncuestaModel, i: number ){
    // console.log(this.encuestResp);
    Swal.fire({
      title: '¿Está seguro?' ,
      icon: 'question',
      text: `Esta seguro de que quiere eliminar la encuesta ${ cuestionario.nombre }`,
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if ( resp.value ){
        this.encuestas.splice(i, 1);
        // tslint:disable-next-line: deprecation
        this.cuestionarios.borrarEncuesta(cuestionario.id).subscribe();
      }
    });

  }

}
