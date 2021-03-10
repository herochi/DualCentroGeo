import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EncuestaModel } from 'src/app/models/encuesta.model';
import { CuestionarioService } from '../../services/cuestionario.service';
import Swal from 'sweetalert2';
import { LocationService } from '../../services/location.service';
import { EncuestaRespondidaModel } from '../../models/encuesta-respondida.mode';

@Component({
  selector: 'app-responder-encuesta',
  templateUrl: './responder-encuesta.page.html',
  styleUrls: ['./responder-encuesta.page.scss'],
})
export class ResponderEncuestaPage implements OnInit {

  encuesta: EncuestaModel;
  encuestResp: EncuestaRespondidaModel = new EncuestaRespondidaModel();
  respuestasArray = [];
  public latitude: number;
  public longitude: number;

  constructor(private cuestionarioService: CuestionarioService,
              private route: ActivatedRoute,
              private locationService: LocationService,
              public router: Router) {
    const id = this.route.snapshot.paramMap.get('id');
    this.cuestionarioService.obtenerUnCuestionario(id)
      // tslint:disable-next-line: deprecation
      .subscribe((resp: EncuestaModel) => {
        this.encuesta = resp;
        this.encuesta.id = id;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < resp.preguntas.length; i ++){
          this.respuestasArray.push([]);
        }
      });
  }

  ngOnInit() {}



  funcion(evento, indice: number){
    this.respuestasArray[indice] = evento.detail.value;
  }

  funcionCheck(evento, indice: number){
    if (evento.detail.checked === true){
        this.respuestasArray[indice].push(evento.detail.value);
    } else{
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < this.respuestasArray[indice].length; i ++){
            if ( evento.detail.value === this.respuestasArray[indice][i]  ){
              this.respuestasArray[indice].splice(i, 1);
            }

          }
    }
  }

  enviarRespuesta() {
    this.encuestResp.id = this.encuesta.id;
    this.encuestResp.nombre = this.encuesta.nombre;
    this.encuestResp.respuestasEncuesta = this.respuestasArray;
    this.getLocation();
  }

  getLocation() {
    this.locationService.getPosition().then(pos => {
        this.latitude = pos.lat;
        this.longitude = pos.lng;
        this.encuestResp.latitud = this.latitude;
        this.encuestResp.longitud = this.longitude;

        // Aquí se guarda la respuesta
        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          text: 'Guardando Información...'
        });
        Swal.showLoading();
        this.cuestionarioService.guardarRespuesta(this.encuestResp).
        // tslint:disable-next-line: deprecation
        subscribe(resp => {
          Swal.fire({
            title: this.encuestResp.nombre ,
            icon: 'success',
            text: 'Se guardo correctamente'
          });
          this.router.navigateByUrl('/encuestas');
        }, (err) => {
          console.log(err.error.error.message);
          Swal.fire({
            icon: 'error',
            title: 'Error al autenticar',
            text: err.error.error.message
          });
        }
        );
    });
  }

}
