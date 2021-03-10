import { RespuestarModel } from './respuestasr.model';
export class EncuestaRespondidaModel{
    id: string;
    nombre: string;
    latitud: number;
    longitud: number;
    respuestasEncuesta: RespuestarModel[];
}
