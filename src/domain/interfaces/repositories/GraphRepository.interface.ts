import { Neo4jCRUDDatasource } from '@/data/interfaces/datasources/Neo4jCRUDDatasource.interface'
import { Neo4jFiltersDatasource } from '@/data/interfaces/datasources/Neo4jFiltersDatasource.interface'

export interface GraphRepository
  extends Neo4jCRUDDatasource,
    Neo4jFiltersDatasource {}
