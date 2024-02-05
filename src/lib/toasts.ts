import { toast } from 'sonner';

export const errorToast = (message = 'Something went wrong'): string | number =>
  toast.error(message, {
    duration: 5000,
    style: {
      borderRadius: '10px',
      background: '#B00020',
      color: '#fff',
      fontSize: '1.1rem',
    },
  });
