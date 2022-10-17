import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Grado,
  Estudiante,
} from '../models';
import {GradoRepository} from '../repositories';

export class GradoEstudianteController {
  constructor(
    @repository(GradoRepository)
    public gradoRepository: GradoRepository,
  ) { }

  @get('/grados/{id}/estudiante', {
    responses: {
      '200': {
        description: 'Estudiante belonging to Grado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Estudiante)},
          },
        },
      },
    },
  })
  async getEstudiante(
    @param.path.string('id') id: typeof Grado.prototype.id,
  ): Promise<Estudiante> {
    return this.gradoRepository.estudiante(id);
  }
}
