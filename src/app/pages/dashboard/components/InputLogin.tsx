import React from 'react';

interface IInputLoginProps {
  label: string;
  value: string;
  onChange: (e: string) => void;
  onPressEnter?: () => void;
  type?: string;
}

export const InputLogin = React.forwardRef<HTMLInputElement, IInputLoginProps>(
  ({ label, value, onChange, onPressEnter, type }, ref) => {
    return (
      <>
        <label>{label}</label>
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          onKeyDown={e => onPressEnter && e.key === 'Enter' && onPressEnter()}
        />
      </>
    );
  }
);
