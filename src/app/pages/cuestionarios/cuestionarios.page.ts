import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.page.html',
  styleUrls: ['./cuestionarios.page.scss'],
})
export class CuestionariosPage implements OnInit {

  forma: FormGroup;


  constructor(private fb: FormBuilder) {
    this.crearFormulario();
  }

  ngOnInit() {
  }

  // "Getters"

  // tslint:disable-next-line: typedef
  get preguntas() {
    return this.forma.get('preguntas') as FormArray;
  }
  // tslint:disable-next-line: typedef


  /*employeeSkills(empIndex:number) : FormArray {
    return this.employees().at(empIndex).get("skills") as FormArray
  }*/


  // Formulario principal
  crearFormulario() {
    this.forma = this.fb.group({
      nombre: ['', Validators.required],
      preguntas: this.fb.array([]),
    });
  }

  // Crear una nueva pregunta*********************************
  nuevaPregunta(): FormGroup {
    return this.fb.group({
      tipoP: ['', Validators.required],
      pregunta: ['', Validators.required],
      respuestas: this.fb.array([])
    });
  }

  // Agregar la nueva pregunta ******************************
  agregarPregunta() {
    this.preguntas.push(this.nuevaPregunta());
    console.log(this.forma);
    // this.addRespuesta();

  }

  // Sacar las respuetas
  respuestas(i: number): FormArray {
    return this.preguntas.at(i).get('respuestas') as FormArray;
  }


  // Crear nuevas respuestas
  nuevasRespuestas(): FormGroup {
    return this.fb.group({
      respuesta: ['', Validators.required]
    });
  }

  // Añadir las respuestas
  addRespuesta(i: number) {
    this.respuestas(i).push(this.nuevasRespuestas());
    console.log(this.respuestas(i));
  }


  // Borrar Respuesta
  borrarRespuesta(pi: number, ri: number) {
    this.respuestas(pi).removeAt(ri);
  }

  // Borrar una pregunta
  borrarPregunta(i: number) {
    this.preguntas.removeAt(i);
  }












  guardar() {
    console.log(this.forma);
  }

  /*cargar(){
    this.forma.reset({
      preguntas: {
        descripción: 'Primera pregunta',
        respuestas: {
        }
      }
    });
  }*/

  // soy un cambio
}
