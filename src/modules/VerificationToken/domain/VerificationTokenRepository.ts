import { VerificationToken } from './VerificationToken';
import { UserEmail } from '@/modules/User/domain/value-object/UserEmail';
import { VerificationTokenId } from './value-object/VerificationTokenId';
import { Token } from './value-object/Token';

export interface VerificationTokenRepository {
  save(verificationToken: VerificationToken): Promise<void>;
  find(verificationTokenId: VerificationTokenId): Promise<VerificationToken | null>;
  findByEmail(userEmail: UserEmail): Promise<VerificationToken | null>;
  findByToken(token: Token): Promise<VerificationToken | null>;
  delete(verificationTokenId: VerificationTokenId): Promise<void>;
}
