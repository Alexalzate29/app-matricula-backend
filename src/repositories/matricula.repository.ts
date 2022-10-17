import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Matricula, MatriculaRelations, Estudiante, Grado} from '../models';
import {EstudianteRepository} from './estudiante.repository';
import {GradoRepository} from './grado.repository';

export class MatriculaRepository extends DefaultCrudRepository<
  Matricula,
  typeof Matricula.prototype.id,
  MatriculaRelations
> {

  public readonly estudiante: HasOneRepositoryFactory<Estudiante, typeof Matricula.prototype.id>;

  public readonly grado: HasOneRepositoryFactory<Grado, typeof Matricula.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EstudianteRepository') protected estudianteRepositoryGetter: Getter<EstudianteRepository>, @repository.getter('GradoRepository') protected gradoRepositoryGetter: Getter<GradoRepository>,
  ) {
    super(Matricula, dataSource);
    this.grado = this.createHasOneRepositoryFactoryFor('grado', gradoRepositoryGetter);
    this.registerInclusionResolver('grado', this.grado.inclusionResolver);
    this.estudiante = this.createHasOneRepositoryFactoryFor('estudiante', estudianteRepositoryGetter);
    this.registerInclusionResolver('estudiante', this.estudiante.inclusionResolver);
  }
}
