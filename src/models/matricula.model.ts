import {Entity, model, property, hasOne} from '@loopback/repository';
import {Estudiante} from './estudiante.model';
import {Grado} from './grado.model';

@model()
export class Matricula extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  fechamatricula: string;

  @property({
    type: 'string',
    required: true,
  })
  id_estudiante: string;

  @property({
    type: 'string',
    required: true,
  })
  id_grado: string;

  @hasOne(() => Estudiante)
  estudiante: Estudiante;

  @hasOne(() => Grado)
  grado: Grado;

  constructor(data?: Partial<Matricula>) {
    super(data);
  }
}

export interface MatriculaRelations {
  // describe navigational properties here
}

export type MatriculaWithRelations = Matricula & MatriculaRelations;
