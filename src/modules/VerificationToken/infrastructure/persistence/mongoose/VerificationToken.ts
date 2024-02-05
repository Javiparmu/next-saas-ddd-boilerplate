import { UnixDate } from '@/modules/Shared/domain/value-object/UnixDate';
import { UserEmail } from '@/modules/User/domain/value-object/UserEmail';
import { Token } from '@/modules/VerificationToken/domain/value-object/Token';
import { VerificationTokenId } from '@/modules/VerificationToken/domain/value-object/VerificationTokenId';
import { Schema, model, models } from 'mongoose';

const verificationTokenSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
      unique: true,
      get: (id: string) => new VerificationTokenId(id),
      set: (id: VerificationTokenId) => id.value,
    },
    email: {
      type: String,
      required: true,
      get: (email: string) => new UserEmail(email),
      set: (email: UserEmail) => email.value,
    },
    token: {
      type: String,
      required: true,
      unique: true,
      get: (token: string) => new Token(token),
      set: (token: Token) => token.value,
    },
    expiresAt: {
      type: Number,
      required: true,
      get: (expiresAt: number) => new UnixDate(expiresAt),
      set: (expiresAt: UnixDate) => expiresAt.value,
    },
  },
  {
    collection: 'verificationTokens',
    timestamps: true,
  },
);

export default models?.VerificationToken || model('VerificationToken', verificationTokenSchema);
