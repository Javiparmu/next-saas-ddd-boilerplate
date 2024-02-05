import CheckIcon from '../ui/check-icon';
import CrossIcon from '../ui/cross-icon';
import Loader from '../ui/loader';
import { FormState } from '@/utils';

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
    <div>
      <div>{icon}</div>
      <p>{message}</p>
    </div>
  );
};

export default FormResult;
