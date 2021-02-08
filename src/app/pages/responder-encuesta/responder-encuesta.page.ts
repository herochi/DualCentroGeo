import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EncuestaModel } from 'src/app/models/encuesta.model';
import { CuestionarioService } from '../../services/cuestionario.service';
import { PreguntasModel } from '../../models/preguntas.model';

@Component({
  selector: 'app-responder-encuesta',
  templateUrl: './responder-encuesta.page.html',
  styleUrls: ['./responder-encuesta.page.scss'],
})
export class ResponderEncuestaPage implements OnInit {

  encuesta: EncuestaModel;
  preguntas: PreguntasModel[];
  respuestas: string[];

  constructor(private cuestionarioService: CuestionarioService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.cuestionarioService.obtenerUnCuestionario(id)
    .subscribe( (resp: EncuestaModel) => {
      this.encuesta = resp;
      this.encuesta.id = id;
      console.log(this.encuesta);
      this.preguntas = this.encuesta.preguntas;
      console.log(this.preguntas);
    });
  }

}
