import { PlanEnum } from './enums';

export const pricingData = {
  basic: {
    name: PlanEnum.BASIC,
    title: 'Basic',
    subtitle: 'Ideal for newcomers exploring AI possibilities at a low cost.',
    features: [
      {
        available: true,
        text: 'Chat and code AI access',
      },
      {
        available: true,
        text: '5 requests / hour',
      },
      {
        available: true,
        text: 'Email support',
      },
      {
        available: true,
        text: 'Early new features access',
      },
    ],
    price: 9.95,
  },
  standard: {
    name: PlanEnum.STANDARD,
    title: 'Standard',
    subtitle: 'Suitable for hobbyists and professionals needing more AI capabilities.',
    features: [
      {
        available: true,
        text: 'Image, video and music AI access',
      },
      {
        available: true,
        text: '10 requests / hour',
      },
      {
        available: true,
        text: 'Priority support',
      },
      {
        available: true,
        text: 'Early beta features access',
      },
    ],
    price: 19.95,
  },
  premium: {
    name: PlanEnum.PREMIUM,
    title: 'Premium',
    subtitle: 'For demanding users requiring comprehensive AI tools and support.',
    features: [
      {
        available: true,
        text: 'All AI functionalities including fine-tuning',
      },
      {
        available: true,
        text: '20 requests / hour',
      },
      {
        available: true,
        text: '24/7 priority support',
      },
      {
        available: true,
        text: 'Early beta features and incoming api access',
      },
      {
        available: true,
        text: 'Vote for new features',
      },
    ],
    price: 39.95,
  },
};
