import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Estudiante, EstudianteRelations, Grado} from '../models';
import {GradoRepository} from './grado.repository';

export class EstudianteRepository extends DefaultCrudRepository<
  Estudiante,
  typeof Estudiante.prototype.id,
  EstudianteRelations
> {

  public readonly grados: HasManyRepositoryFactory<Grado, typeof Estudiante.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('GradoRepository') protected gradoRepositoryGetter: Getter<GradoRepository>,
  ) {
    super(Estudiante, dataSource);
    this.grados = this.createHasManyRepositoryFactoryFor('grados', gradoRepositoryGetter,);
    this.registerInclusionResolver('grados', this.grados.inclusionResolver);
  }
}
