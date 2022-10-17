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
  Matricula,
  Estudiante,
} from '../models';
import {MatriculaRepository} from '../repositories';

export class MatriculaEstudianteController {
  constructor(
    @repository(MatriculaRepository) protected matriculaRepository: MatriculaRepository,
  ) { }

  @get('/matriculas/{id}/estudiante', {
    responses: {
      '200': {
        description: 'Matricula has one Estudiante',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Estudiante),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Estudiante>,
  ): Promise<Estudiante> {
    return this.matriculaRepository.estudiante(id).get(filter);
  }

  @post('/matriculas/{id}/estudiante', {
    responses: {
      '200': {
        description: 'Matricula model instance',
        content: {'application/json': {schema: getModelSchemaRef(Estudiante)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Matricula.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estudiante, {
            title: 'NewEstudianteInMatricula',
            exclude: ['id'],
            optional: ['matriculaId']
          }),
        },
      },
    }) estudiante: Omit<Estudiante, 'id'>,
  ): Promise<Estudiante> {
    return this.matriculaRepository.estudiante(id).create(estudiante);
  }

  @patch('/matriculas/{id}/estudiante', {
    responses: {
      '200': {
        description: 'Matricula.Estudiante PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Estudiante, {partial: true}),
        },
      },
    })
    estudiante: Partial<Estudiante>,
    @param.query.object('where', getWhereSchemaFor(Estudiante)) where?: Where<Estudiante>,
  ): Promise<Count> {
    return this.matriculaRepository.estudiante(id).patch(estudiante, where);
  }

  @del('/matriculas/{id}/estudiante', {
    responses: {
      '200': {
        description: 'Matricula.Estudiante DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Estudiante)) where?: Where<Estudiante>,
  ): Promise<Count> {
    return this.matriculaRepository.estudiante(id).delete(where);
  }
}
