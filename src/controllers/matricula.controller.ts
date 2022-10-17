import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Matricula} from '../models';
import {MatriculaRepository} from '../repositories';

export class MatriculaController {
  constructor(
    @repository(MatriculaRepository)
    public matriculaRepository : MatriculaRepository,
  ) {}

  @post('/matriculas')
  @response(200, {
    description: 'Matricula model instance',
    content: {'application/json': {schema: getModelSchemaRef(Matricula)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Matricula, {
            title: 'NewMatricula',
            exclude: ['id'],
          }),
        },
      },
    })
    matricula: Omit<Matricula, 'id'>,
  ): Promise<Matricula> {
    return this.matriculaRepository.create(matricula);
  }

  @get('/matriculas/count')
  @response(200, {
    description: 'Matricula model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Matricula) where?: Where<Matricula>,
  ): Promise<Count> {
    return this.matriculaRepository.count(where);
  }

  @get('/matriculas')
  @response(200, {
    description: 'Array of Matricula model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Matricula, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Matricula) filter?: Filter<Matricula>,
  ): Promise<Matricula[]> {
    return this.matriculaRepository.find(filter);
  }

  @patch('/matriculas')
  @response(200, {
    description: 'Matricula PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Matricula, {partial: true}),
        },
      },
    })
    matricula: Matricula,
    @param.where(Matricula) where?: Where<Matricula>,
  ): Promise<Count> {
    return this.matriculaRepository.updateAll(matricula, where);
  }

  @get('/matriculas/{id}')
  @response(200, {
    description: 'Matricula model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Matricula, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Matricula, {exclude: 'where'}) filter?: FilterExcludingWhere<Matricula>
  ): Promise<Matricula> {
    return this.matriculaRepository.findById(id, filter);
  }

  @patch('/matriculas/{id}')
  @response(204, {
    description: 'Matricula PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Matricula, {partial: true}),
        },
      },
    })
    matricula: Matricula,
  ): Promise<void> {
    await this.matriculaRepository.updateById(id, matricula);
  }

  @put('/matriculas/{id}')
  @response(204, {
    description: 'Matricula PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() matricula: Matricula,
  ): Promise<void> {
    await this.matriculaRepository.replaceById(id, matricula);
  }

  @del('/matriculas/{id}')
  @response(204, {
    description: 'Matricula DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.matriculaRepository.deleteById(id);
  }
}
