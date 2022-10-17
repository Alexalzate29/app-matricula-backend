import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Grado, GradoRelations, Estudiante} from '../models';
import {EstudianteRepository} from './estudiante.repository';

export class GradoRepository extends DefaultCrudRepository<
  Grado,
  typeof Grado.prototype.id,
  GradoRelations
> {

  public readonly estudiante: BelongsToAccessor<Estudiante, typeof Grado.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EstudianteRepository') protected estudianteRepositoryGetter: Getter<EstudianteRepository>,
  ) {
    super(Grado, dataSource);
    this.estudiante = this.createBelongsToAccessorFor('estudiante', estudianteRepositoryGetter,);
    this.registerInclusionResolver('estudiante', this.estudiante.inclusionResolver);
  }
}
