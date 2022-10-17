import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Estudiante,
  Grado,
} from '../models';
import {EstudianteRepository} from '../repositories';

export class EstudianteGradoController {
  constructor(
    @repository(EstudianteRepository) protected estudianteRepository: EstudianteRepository,
  ) { }

  @get('/estudiantes/{id}/grados', {
    responses: {
      '200': {
        description: 'Array of Estudiante has many Grado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Grado)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Grado>,
  ): Promise<Grado[]> {
    return this.estudianteRepository.grados(id).find(filter);
  }

  @post('/estudiantes/{id}/grados', {
    responses: {
      '200': {
        description: 'Estudiante model instance',
        content: {'application/json': {schema: getModelSchemaRef(Grado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Estudiante.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grado, {
            title: 'NewGradoInEstudiante',
            exclude: ['id'],
            optional: ['estudianteId']
          }),
        },
      },
    }) grado: Omit<Grado, 'id'>,
  ): Promise<Grado> {
    return this.estudianteRepository.grados(id).create(grado);
  }

  @patch('/estudiantes/{id}/grados', {
    responses: {
      '200': {
        description: 'Estudiante.Grado PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grado, {partial: true}),
        },
      },
    })
    grado: Partial<Grado>,
    @param.query.object('where', getWhereSchemaFor(Grado)) where?: Where<Grado>,
  ): Promise<Count> {
    return this.estudianteRepository.grados(id).patch(grado, where);
  }

  @del('/estudiantes/{id}/grados', {
    responses: {
      '200': {
        description: 'Estudiante.Grado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Grado)) where?: Where<Grado>,
  ): Promise<Count> {
    return this.estudianteRepository.grados(id).delete(where);
  }
}
