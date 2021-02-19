import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EncuestaModel } from 'src/app/models/encuesta.model';
import { CuestionarioService } from '../../services/cuestionario.service';
import { PreguntasModel } from '../../models/preguntas.model';
import { EncuestaRespondidaModel } from '../../models/encuesta-respondida.model';
import { RespuestarModel } from '../../models/respuestasr.model';
import { FormBuilder, FormGroup, Validators, FormArray, NgForm } from '@angular/forms';
import { PruebaModel } from '../../models/prueba.mode';

@Component({
  selector: 'app-responder-encuesta',
  templateUrl: './responder-encuesta.page.html',
  styleUrls: ['./responder-encuesta.page.scss'],
})
export class ResponderEncuestaPage implements OnInit {

  arreglito: RespuestarModel[];
  encuesta: EncuestaModel;
  preguntas: PreguntasModel[];
  // encuestaRespondida: EncuestaRespondidaModel = new EncuestaRespondidaModel();
  // respuestasRespondida: RespuestarModel[];
  encuestaRespondida: FormGroup;
  encuestaRespondidaEnv;
  pruebaNumber2 = new PruebaModel();

  // TODO ESTO ES UNA PRUEBA SI FUNCIONA CHIDO!

  dataArray = [];


  constructor(private cuestionarioService: CuestionarioService,
              private route: ActivatedRoute,
              private fb: FormBuilder) {
    const id = this.route.snapshot.paramMap.get('id');
    this.cuestionarioService.obtenerUnCuestionario(id)
      .subscribe((resp: EncuestaModel) => {
        console.log('esta es la respuesta', resp);
        this.encuesta = resp;
        this.encuesta.id = id;
        console.log(this.encuesta);
        this.preguntas = this.encuesta.preguntas;
        console.log('estas son las preguntas', this.preguntas);
        this.crearFormulario();
        console.log(this.encuestaRespondida);
        this.agregarPregunta();
        console.log('estas son las preguntas', this.preguntas);
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < resp.preguntas.length; i++) {
          this.dataArray.push(this.pruebaNumber2);
        }
        console.log(this.dataArray);
      });
  }

  ngOnInit() {}

  get respuestas() {
    return this.encuestaRespondida.get('respuestas') as FormArray;
  }

  crearFormulario() {
    const id = this.route.snapshot.paramMap.get('id');
    this.encuestaRespondida = this.fb.group({
      id: [id],
      nombre: [this.encuesta.nombre, Validators.required],
      respuestas: this.fb.array([])
    });
  }

  crearRespuestas(i: number): FormGroup{
    return this.fb.group({
      pregunta:  [this.encuesta.preguntas[i].pregunta, Validators.required],
      respuesta: this.fb.array([])
    });
  }
  agregarPregunta() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.encuesta.preguntas.length; i++){
      this.respuestas.push(this.crearRespuestas(i));
    }
    // console.log(this.forma);
    // this.addRespuesta();

  }
  // Sacar las respuetas
  // tslint:disable-next-line: adjacent-overload-signatures
  obtenerRespuestas(i: number): FormArray {
    return this.respuestas.at(i).get('respuesta') as FormArray;
  }

  agregarRespuesta(ip: number){
    // this.respuestas(indicePregunta).push(this.obtenerRespuestas(indiceRespuesta));
    this.obtenerRespuestas(ip).setValue(['hola']);

  }

  valor(algo: string){
     // console.log(n, i);
     // console.log(this.obtenerRespuestas(n));
     // console.log( this.encuesta.preguntas[n].respuestas[i]);
     console.log(algo);

  }



  enviarRespuesta() {
    // console.log(this.encuestaRespondida);
    // console.log(form);
    console.log(this.dataArray);

  }


}
