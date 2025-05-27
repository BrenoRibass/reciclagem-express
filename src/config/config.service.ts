import dbConfig from '../../config.json';
import { DBConfig } from './config.types';

export const ConfigService = {
  get db(): DBConfig {
    return dbConfig.db;
  }
};
