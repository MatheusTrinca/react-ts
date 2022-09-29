import React from 'react';

interface IButtonLogin {
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
}

export const ButtonLogin: React.FC<IButtonLogin> = ({ children, type }) => {
  return <button type={type}>{children}</button>;
};
