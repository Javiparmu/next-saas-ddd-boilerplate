import { connection, connect, disconnect } from 'mongoose';
import MongoConfig from './MongoConfig';
import { TooManyConnectionAttemptsException } from '../../domain/exception/TooManyConnectionAttemptsException';

const MAX_ATTEMPTS = 5;
const RETRY_INTERVAL = 5000;

export class MongooseConnection {
  static async connect(config?: MongoConfig): Promise<void> {
    if (connection?.readyState === 0) {
      await connect(config?.url ?? process.env.MONGODB_URI ?? '', {
        ignoreUndefined: true,
      });

      connection.on('disconnected', () => {
        console.log('Mongoose connection disconnected. Attempting to reconnect...');
        MongooseConnection.attemptReconnect(config);
      });
    }
  }

  private static async attemptReconnect(config?: MongoConfig, attempts = 0): Promise<void> {
    if (attempts < MAX_ATTEMPTS) {
      setTimeout(async () => {
        try {
          await connect(config?.url ?? process.env.MONGODB_URI ?? '', {
            ignoreUndefined: true,
          });
        } catch (error) {
          await MongooseConnection.attemptReconnect(config, attempts + 1);
        }
      }, RETRY_INTERVAL);
    } else {
      await disconnect();

      throw new TooManyConnectionAttemptsException('mongodb');
    }
  }

  static async disconnect(): Promise<void> {
    await disconnect();
  }
}
