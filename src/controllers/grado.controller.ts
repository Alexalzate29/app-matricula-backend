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
import {Grado} from '../models';
import {GradoRepository} from '../repositories';

export class GradoController {
  constructor(
    @repository(GradoRepository)
    public gradoRepository : GradoRepository,
  ) {}

  @post('/grados')
  @response(200, {
    description: 'Grado model instance',
    content: {'application/json': {schema: getModelSchemaRef(Grado)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grado, {
            title: 'NewGrado',
            exclude: ['id'],
          }),
        },
      },
    })
    grado: Omit<Grado, 'id'>,
  ): Promise<Grado> {
    return this.gradoRepository.create(grado);
  }

  @get('/grados/count')
  @response(200, {
    description: 'Grado model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Grado) where?: Where<Grado>,
  ): Promise<Count> {
    return this.gradoRepository.count(where);
  }

  @get('/grados')
  @response(200, {
    description: 'Array of Grado model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Grado, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Grado) filter?: Filter<Grado>,
  ): Promise<Grado[]> {
    return this.gradoRepository.find(filter);
  }

  @patch('/grados')
  @response(200, {
    description: 'Grado PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grado, {partial: true}),
        },
      },
    })
    grado: Grado,
    @param.where(Grado) where?: Where<Grado>,
  ): Promise<Count> {
    return this.gradoRepository.updateAll(grado, where);
  }

  @get('/grados/{id}')
  @response(200, {
    description: 'Grado model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Grado, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Grado, {exclude: 'where'}) filter?: FilterExcludingWhere<Grado>
  ): Promise<Grado> {
    return this.gradoRepository.findById(id, filter);
  }

  @patch('/grados/{id}')
  @response(204, {
    description: 'Grado PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Grado, {partial: true}),
        },
      },
    })
    grado: Grado,
  ): Promise<void> {
    await this.gradoRepository.updateById(id, grado);
  }

  @put('/grados/{id}')
  @response(204, {
    description: 'Grado PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() grado: Grado,
  ): Promise<void> {
    await this.gradoRepository.replaceById(id, grado);
  }

  @del('/grados/{id}')
  @response(204, {
    description: 'Grado DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.gradoRepository.deleteById(id);
  }
}
