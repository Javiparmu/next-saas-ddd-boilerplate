'use client';

import { FormEvent, useEffect, useState } from 'react';
import GoogleSignIn from '@/components/auth/google-sign-in';
import GithubSignIn from '@/components/auth/github-sign-in';
import FormResult from '@/components/auth/form-result';
import { login } from '@/app/actions/login';
import { useSearchParams } from 'next/navigation';
import { FormState } from '@/app/utils';

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
    <article className='flex flex-col p-8 rounded-md w-[500px] bg-card'>
      <h1 className='text-2xl mb-8'>Sign in to your account.</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-6 items-center w-full'>
        <label className='flex flex-col w-full'>
          Email
          <input type="email" id="email" color="black" required className='h-12 p-2 border-[1px] border-gray-400 rounded-md' />
        </label>
        <label className='flex flex-col w-full'>
          Password
          <input minLength={8} type="password" id="password" color="black" required className='h-12 w-full p-2 border-[1px] border-gray-400 rounded-md' />
        </label>
        <FormResult message={message} state={state} />
        <button disabled={state === FormState.LOADING} title="Sign in" type="submit" className='h-14 w-full rounded-lg bg-primary text-gray-100 hover:bg-primary/90 transition'>
          Sign in
        </button>
      </form>
      <div className='h-[1px] bg-primary my-8'/>
      <GoogleSignIn />
      <GithubSignIn />
    </article>
  );
};

export default SignIn;
