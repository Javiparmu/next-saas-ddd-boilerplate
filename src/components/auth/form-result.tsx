import CheckIcon from '../ui/check-icon';
import CrossIcon from '../ui/cross-icon';
import Loader from '../ui/loader';
import { FormState } from '@/app/utils';

interface FormResult {
  message: string;
	state: FormState;
}

const FormResult = ({ message, state }: FormResult) => {
  if (state === FormState.INITIAL) {
    return null;
  }

  if (state === FormState.LOADING) {
    return <Loader />;
  }

  const color = FormState.SUCCESS ? '#389ABB' : '#979ce7';
  const icon = FormState.SUCCESS ? <CheckIcon color={color} /> : <CrossIcon color={color} />;

  return (
    <div 
      style={{
        backgroundColor: FormState.SUCCESS ? 'hsl(160 95% 39% / 0.5)' : 'hsl(0 84.2% 60.2% / 0.5)',
      }} 
      className='flex w-full gap-2 px-2 py-4 rounded-lg'
    >
      <div>{icon}</div>
      <p>{message}</p>
    </div>
  );
};

export default FormResult;
