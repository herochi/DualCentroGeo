import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CuestionarioService } from '../../services/cuestionario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cuestionarios',
  templateUrl: './cuestionarios.page.html',
  styleUrls: ['./cuestionarios.page.scss'],
})
export class CuestionariosPage implements OnInit {

  forma: FormGroup;
  form;
  enviado = 0;

  constructor(private fb: FormBuilder,
    // tslint:disable-next-line: align
    private cuestionarioService: CuestionarioService, private router: Router) {
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
      id: [''],
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
    // console.log(this.forma);
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

    if (this.forma.invalid) {
      return;
    }
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Guardando Información...'
    });
    Swal.showLoading();


    this.form = JSON.stringify(this.forma.value);
    this.cuestionarioService.crearCuestionario(this.form).
      subscribe(resp => {
        Swal.fire({
          title: this.forma.controls.nombre.value,
          icon: 'success',
          text: 'Se guardo correctamente'
        });
        console.log(resp);
        this.form = resp;
        // this.router.navigateByUrl('/encuestas');
      });

  }

  actualizar() {
    console.log(this.form);
    this.cuestionarioService.actualizarCuestionario(this.form).
      subscribe(resp => {
        console.log(resp);
      });
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

  // cambio lñdskas

}
