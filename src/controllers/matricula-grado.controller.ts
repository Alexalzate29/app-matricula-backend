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
  Grado,
} from '../models';
import {MatriculaRepository} from '../repositories';

export class MatriculaGradoController {
  constructor(
    @repository(MatriculaRepository) protected matriculaRepository: MatriculaRepository,
  ) { }

  @get('/matriculas/{id}/grado', {
    responses: {
      '200': {
        description: 'Matricula has one Grado',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Grado),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Grado>,
  ): Promise<Grado> {
    return this.matriculaRepository.grado(id).get(filter);
  }

  @post('/matriculas/{id}/grado', {
    responses: {
      '200': {
        description: 'Matricula model instance',
        content: {'application/json': {schema: getModelSchemaRef(Grado)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Matricula.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grado, {
            title: 'NewGradoInMatricula',
            exclude: ['id'],
            optional: ['matriculaId']
          }),
        },
      },
    }) grado: Omit<Grado, 'id'>,
  ): Promise<Grado> {
    return this.matriculaRepository.grado(id).create(grado);
  }

  @patch('/matriculas/{id}/grado', {
    responses: {
      '200': {
        description: 'Matricula.Grado PATCH success count',
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
    return this.matriculaRepository.grado(id).patch(grado, where);
  }

  @del('/matriculas/{id}/grado', {
    responses: {
      '200': {
        description: 'Matricula.Grado DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Grado)) where?: Where<Grado>,
  ): Promise<Count> {
    return this.matriculaRepository.grado(id).delete(where);
  }
}
