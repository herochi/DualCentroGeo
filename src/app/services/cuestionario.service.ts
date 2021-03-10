import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EncuestaModel } from '../models/encuesta.model';

@Injectable({
  providedIn: 'root'
})
export class CuestionarioService {

  // URL de la base de datos de firebase
  private url = 'https://login-app-97ecf-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) { }


  // Metodo para crear un cuestionario a partir de lo recibido por el FormGroup
  crearCuestionario( cuestionario ){

    return this.http.post(`${ this.url }/cuestionarios.json`, cuestionario)
    .pipe(
      map( (resp: any) => {
        cuestionario = JSON.parse(cuestionario);
        cuestionario.id = resp.name;
       // console.log(cuestionario.type);
        // cuestionario2 = formData;
        // tslint:disable-next-line: no-string-literal
        return cuestionario;
      } )
    );
  }

  // Método para actualizar un cuestionario *******************NO CORREGIDO************************
  actualizarCuestionario( cuestionario ){
      return this.http.put(`${ this.url }/cuestionarios/${ cuestionario.id }.json`, cuestionario);
  }

  // Método para obtener los cuestionarios en un arreglo de cuestionarios
  obtenerCuestionarios(){
    return this.http.get(`${ this.url }/cuestionarios.json`)
    .pipe(
          map( this.iterarCuestionarios )
    );
  }

  // tslint:disable-next-line: max-line-length
  // Método que itera la información recibida para sacar cuestionarios 1 por 1 y lo devuelve, es su  complemente del método obtenerCuestionarios()
  private iterarCuestionarios( cuestionarios: object ){
    const encuestas: EncuestaModel[] = [];
    if ( cuestionarios === null ){ return []; }

    Object.keys( cuestionarios ).forEach( key => {
      const cuestionarioOBj: EncuestaModel = cuestionarios[key];
      cuestionarioOBj.id = key;
      encuestas.push(cuestionarioOBj);
    });

    return encuestas;
  }

  // Método para solo devolver los valores de un cuestionario
  obtenerUnCuestionario(id: string){
      return this.http.get(`${ this.url }/cuestionarios/${id}.json`);
  }



  guardarRespuesta( respuestas ){

    return this.http.post(`${ this.url }/respuestas.json`, respuestas)
    .pipe(
      map( (resp: any) => {
       return resp;
      } )
    );
  }

  borrarEncuesta( id: string ){
    return this.http.delete(`${ this.url }/cuestionarios/${id}.json`);
  }
}
