import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Estudiante} from './estudiante.model';

@model()
export class Grado extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  cantidad: number;

  @property({
    type: 'string',
    required: true,
  })
  id_estudiante: string;

  @belongsTo(() => Estudiante)
  estudianteId: string;

  @property({
    type: 'string',
  })
  matriculaId?: string;

  constructor(data?: Partial<Grado>) {
    super(data);
  }
}

export interface GradoRelations {
  // describe navigational properties here
}

export type GradoWithRelations = Grado & GradoRelations;
