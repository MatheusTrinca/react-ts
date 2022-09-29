import Routes from './routes';
import { UsuarioLogadoProvider } from './shared/contexts/UsuarioLogado';

function App() {
  return (
    <div className="App">
      <UsuarioLogadoProvider>
        <Routes />
      </UsuarioLogadoProvider>
    </div>
  );
}

export default App;
