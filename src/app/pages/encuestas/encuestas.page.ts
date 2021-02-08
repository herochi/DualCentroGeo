import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CuestionarioService } from '../../services/cuestionario.service';
import { EncuestaModel } from '../../models/encuesta.model';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.page.html',
  styleUrls: ['./encuestas.page.scss'],
})
export class EncuestasPage implements OnInit {

  encuestas: EncuestaModel[] = [];

  constructor(private auth: AuthService, private router: Router, private cuestionarios: CuestionarioService) { }

  ngOnInit() {
    this.cuestionarios.obtenerCuestionarios()
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

}
