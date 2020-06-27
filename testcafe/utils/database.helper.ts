import { ConnectionPool, Request } from 'mssql';
import { t } from 'testcafe';

import { logger } from './logger.helper';
import { decrypted } from './password.handler';

let pool: ConnectionPool;
let request: Request;

interface MSSQLConfig {
  server: string;
  user: string;
  password: string;
  database: string;
  tedious: boolean;
}

class DatabaseHelper {
  async getDBConnection(): Promise<void> {
    const msSQLConfig: MSSQLConfig = {
      server: process.env.APP_DB_SERVER,
      user: process.env.APP_DB_USERNAME,
      password: decrypted(process.env.APP_DB_PASSWORD),
      database: process.env.APP_DATABASE,
      tedious: false,
    };
    pool = await new ConnectionPool(msSQLConfig).connect();
    await t.expect(pool).notEql(null, 'Pool should not be equal to Null');
    try {
      request = pool.request();
      logger.info('Database connection is successful...');
    } catch (error) {
      pool.close();
      logger.error(`Database connection is failed... - ${error}`);
      throw new Error('`Database connection is failed');
    }
  }

  async queryDB(userQuery: string): Promise<unknown> {
    await this.getDBConnection();
    logger.info(`Query requested by User:\n ${userQuery}`);
    try {
      const result = await request.query(userQuery);
      return result;
    } catch (error) {
      logger.error(`Error executing query \n ${userQuery}\nError - ${error}`);
      throw new Error('`Database query execution is failed');
    } finally {
      logger.info('Pool is closed.');
      pool.close();
    }
  }
}

export const databaseHelper: DatabaseHelper = new DatabaseHelper();
