import { CustomerId } from '@/modules/Customer/domain/value-object/CustomerId';
import { UnixDate } from '@/modules/Shared/domain/value-object/UnixDate';
import { UserAuthProvider } from '@/modules/User/domain/value-object/UserAuthProvider';
import { UserEmail } from '@/modules/User/domain/value-object/UserEmail';
import { UserId } from '@/modules/User/domain/value-object/UserId';
import { UserPassword } from '@/modules/User/domain/value-object/UserPassword';
import { UserRole } from '@/modules/User/domain/value-object/UserRole';
import { StripePriceId } from '@/modules/User/domain/value-object/stripe/StripePriceid';
import { Schema, model, models } from 'mongoose';

const userSchema = new Schema(
  {
    _id: {
      type: String,
      required: true,
      unique: true,
      get: (id: string) => new UserId(id),
      set: (id: UserId) => id.value,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      get: (email: string) => new UserEmail(email),
      set: (email: UserEmail) => email?.value,
    },
    emailVerified: {
      type: Number,
      get: (emailVerified: number) => new UnixDate(emailVerified),
      set: (emailVerified: UnixDate) => emailVerified?.value,
    },
    password: {
      type: String,
      get: (password: string) => new UserPassword(password),
      set: (password: UserPassword) => password?.value,
    },
    authProvider: {
      type: String,
      enum: ['credentials', 'google', 'github'],
      default: 'credentials',
      get: (authProvider: string) => new UserAuthProvider(authProvider),
      set: (authProvider: UserAuthProvider) => authProvider?.value,
    },
    providerAccountId: String,
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
      get: (role: string) => new UserRole(role),
      set: (role: UserRole) => role?.value,
    },
    plan: {
      type: String,
      default: 'none',
      get: (plan: string) => new StripePriceId(plan),
      set: (plan: StripePriceId) => plan?.value,
    },
    customerId: {
      type: String,
      get: (customerId: string) => new CustomerId(customerId),
      set: (customerId: CustomerId) => customerId?.value,
    },
  },
  {
    timestamps: true,
    collection: 'users',
  },
);

export default models?.User || model('User', userSchema);
