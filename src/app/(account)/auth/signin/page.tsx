'use client';

import { FormEvent, useEffect, useState } from 'react';
import GoogleSignIn from '@/components/auth/google-sign-in';
import GithubSignIn from '@/components/auth/github-sign-in';
import FormResult from '@/components/auth/form-result';
import { login } from '@/app/actions/login';
import { useSearchParams } from 'next/navigation';
import { FormState } from '@/utils';

const SignIn = () => {
  const [state, setState] = useState(FormState.INITIAL);
  const [message, setMessage] = useState('');

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = (e.target as HTMLFormElement).email.value;
    const password = (e.target as HTMLFormElement).password.value;

    setState(FormState.LOADING);

    try {
      const data = await login(email, password, callbackUrl);

      if (data?.success) {
        setState(FormState.SUCCESS);
        setMessage(data?.success ?? '');
      }

      if (data?.error) {
        setState(FormState.ERROR);
        setMessage(data.error);
      }
    } catch (error) {
      setState(FormState.ERROR);
      setMessage('Something went wrong.');
    }
  };

  useEffect(() => {
    if (searchParams.get('error') === 'OAuthAccountNotLinked') {
      setState(FormState.ERROR);
      setMessage('Email already in use with different provider!');
    }
  }, [searchParams]);

  return (
    <article>
      <h1>Sign in to your account.</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" id="email" color="black" required />
        </label>
        <label>
          Password
          <input minLength={8} type="password" id="password" color="black" required />
        </label>
        <FormResult message={message} state={state} />
        <button disabled={state === FormState.LOADING} title="Sign in" type="submit">
          Sign in
        </button>
      </form>
      <div />
      <GoogleSignIn />
      <GithubSignIn />
    </article>
  );
};

export default SignIn;
