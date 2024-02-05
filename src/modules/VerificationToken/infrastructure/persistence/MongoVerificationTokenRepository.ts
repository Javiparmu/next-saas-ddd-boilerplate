import { MongoRepository } from '@/modules/Shared/infrastructure/persistence/MongoRepository';
import { VerificationToken } from '../../domain/VerificationToken';
import { VerificationTokenRepository } from '../../domain/VerificationTokenRepository';
import { Token } from '../../domain/value-object/Token';
import { VerificationTokenId } from '../../domain/value-object/VerificationTokenId';
import VerificationTokenModel from '@/modules/VerificationToken/infrastructure/persistence/mongoose/VerificationToken';
import { MongooseConnection } from '@/modules/Shared/infrastructure/persistence/MongooseConnection';
import { VerificationTokenDocument } from './mongoose/documents';
import { UserEmail } from '@/modules/User/domain/value-object/UserEmail';

export class MongoVerificationTokenRepository extends MongoRepository<VerificationToken> implements VerificationTokenRepository {
  constructor() {
    super(VerificationTokenModel);
  }

  async save(verificationToken: VerificationToken): Promise<void> {
    await this.persist(verificationToken.id, verificationToken);
  }

  async find(verificationTokenId: VerificationTokenId): Promise<VerificationToken | null> {
    await MongooseConnection.connect({ url: process.env.MONGODB_URI ?? '' });

    const verificationToken = await VerificationTokenModel.findById(verificationTokenId.value).lean<VerificationTokenDocument>();

    return verificationToken ? VerificationToken.fromPrimitives({ ...verificationToken, id: verificationToken._id }) : null;
  }

  async findByEmail(email: UserEmail): Promise<VerificationToken | null> {
    await MongooseConnection.connect({ url: process.env.MONGODB_URI ?? '' });

    const verificationToken = await VerificationTokenModel.findOne({ email }).lean<VerificationTokenDocument>();

    return verificationToken ? VerificationToken.fromPrimitives({ ...verificationToken, id: verificationToken._id }) : null;
  }
  async findByToken(token: Token): Promise<VerificationToken | null> {
    await MongooseConnection.connect({ url: process.env.MONGODB_URI ?? '' });

    const verificationToken = await VerificationTokenModel.findOne({ token }).lean<VerificationTokenDocument>();

    return verificationToken ? VerificationToken.fromPrimitives({ ...verificationToken, id: verificationToken._id }) : null;
  }
  async delete(verificationTokenId: VerificationTokenId): Promise<void> {
    await MongooseConnection.connect({ url: process.env.MONGODB_URI ?? '' });

    await VerificationTokenModel.findByIdAndDelete(verificationTokenId.value);
  }
}
