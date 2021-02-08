import { PreguntasModel } from './preguntas.model';

export class EncuestaModel{
    id: string;
    nombre: string;
    preguntas: PreguntasModel[];
}
