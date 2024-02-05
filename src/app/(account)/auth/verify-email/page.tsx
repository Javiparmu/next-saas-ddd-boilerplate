'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FormResult from '@/components/auth/form-result';
import { verifyUser } from '@/app/actions/verify-user';
import { FormState } from '@/utils';

const SignIn = () => {
  const [state, setState] = useState(FormState.INITIAL);
  const [message, setMessage] = useState('');

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleVerifyToken = async () => {
    setState(FormState.LOADING);

    const token = searchParams.get('token');

    if (!token) {
      setState(FormState.ERROR);
      setMessage('Token not found.');
      return;
    }

    try {
      const data = await verifyUser(token);

      if (data.error) {
        setState(FormState.ERROR);
        setMessage(data.error);
      }

      if (data.success) {
        setState(FormState.SUCCESS);
        setMessage(data.success);

        router.push('/auth/signin');
      }
    } catch (error) {
      setState(FormState.ERROR);
      setMessage('Something went wrong.');
    }
  };

  useEffect(() => {
    handleVerifyToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, router]);

  return (
		<article>
			<h1>Verifying token.</h1>
			<FormResult state={state} message={message} />
		</article>
  );
};

export default SignIn;
