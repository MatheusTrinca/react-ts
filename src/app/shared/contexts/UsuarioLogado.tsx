import { createContext, useCallback, useContext, useState } from 'react';

interface IUsuarioLogadoContextData {
  name: string;
  logout: () => void;
  handleName: (newName: string) => void;
}

interface IUsuarioLogadoProvider {
  children: React.ReactNode;
}

const UsuarioLogadoContext = createContext<IUsuarioLogadoContextData>(
  {} as IUsuarioLogadoContextData
);

export const UsuarioLogadoProvider: React.FC<IUsuarioLogadoProvider> = ({
  children,
}) => {
  const [name, setName] = useState('');

  const handleLogout = useCallback(() => {
    console.log('Logout');
  }, []);

  const handleName = useCallback((newName: string) => {
    setName(newName);
  }, []);

  return (
    <UsuarioLogadoContext.Provider
      value={{ name, logout: handleLogout, handleName }}
    >
      {children}
    </UsuarioLogadoContext.Provider>
  );
};

export const useUsuarioLogado = () => {
  const context = useContext(UsuarioLogadoContext);
  return context;
};
