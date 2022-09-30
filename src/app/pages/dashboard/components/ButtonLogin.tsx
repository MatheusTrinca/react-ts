import React from 'react';

interface IButtonLogin {
  children: React.ReactNode;
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export const ButtonLogin: React.FC<IButtonLogin> = ({
  children,
  type,
  onClick,
}) => {
  return (
    <button onClick={onClick} type={type}>
      {children}
    </button>
  );
};
