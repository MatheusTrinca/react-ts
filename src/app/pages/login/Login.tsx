import React from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { ButtonLogin } from '../dashboard/components/ButtonLogin';
import { InputLogin } from '../dashboard/components/InputLogin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputPasswordReference = useRef<HTMLInputElement>(null);

  const handleEntrar = useCallback(() => {
    if (inputPasswordReference.current !== null) {
      inputPasswordReference.current.focus();
    }
  }, []);

  const emailLength = useMemo(() => {
    return email.length * 1000;
  }, [email.length]);

  return (
    <div>
      <h2>Login</h2>
      <p>Email Length: {emailLength}</p>
      <form onSubmit={handleEntrar}>
        <InputLogin
          label="Email"
          value={email}
          onChange={setEmail}
          onPressEnter={() => inputPasswordReference.current?.focus()}
        />

        <InputLogin
          ref={inputPasswordReference}
          label="Password"
          value={password}
          onChange={setPassword}
          type="password"
        />
        <ButtonLogin type="submit">Entrar</ButtonLogin>
      </form>
    </div>
  );
};

export default Login;

// Aula 13
