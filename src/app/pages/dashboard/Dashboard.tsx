import { useCallback, useEffect, useState } from 'react';
import { ApiException } from '../../shared/services/api/ApiException';
import {
  getAll,
  create,
  ITarefa,
  updateById,
  deleteById,
} from '../../shared/services/api/tarefas/TarefasService';
import { ButtonLogin } from './components/ButtonLogin';

const Dashboard = () => {
  const [lista, setLista] = useState<ITarefa[]>([]);

  useEffect(() => {
    getAll().then(result => {
      if (result instanceof ApiException) {
        alert(result);
      } else {
        setLista(result);
      }
    });
  }, []);

  const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> =
    useCallback(
      e => {
        if (e.key === 'Enter') {
          if (e.currentTarget.value.trim().length === 0) return;

          let value = e.currentTarget.value;

          if (lista.some(listItem => listItem.title === value)) {
            alert('Tarefa já existente');
            return;
          }

          create({ title: value, isCompleted: false }).then(result => {
            if (result instanceof ApiException) {
              alert(result);
            } else {
              setLista(oldLista => [...oldLista, result]);
            }
          });
        }
      },
      [lista]
    );

  const onChangeHandler = useCallback((tarefa: ITarefa) => {
    const updatedTarefa = { ...tarefa, isCompleted: !tarefa.isCompleted };
    updateById(tarefa.id, updatedTarefa).then(result => {
      if (result instanceof ApiException) {
        alert(result);
      } else {
        setLista(oldLista =>
          oldLista.map(item =>
            item.id === tarefa.id
              ? { ...item, isCompleted: !item.isCompleted }
              : item
          )
        );
      }
    });
  }, []);

  const handleDelete = useCallback((id: string) => {
    deleteById(id).then(result => {
      if (result instanceof ApiException) {
        alert(result);
      } else {
        setLista(oldLista => oldLista.filter(item => item.id !== id));
      }
    });
  }, []);

  return (
    <>
      <p>Lista</p>

      <p>
        {lista.filter(listItem => listItem.isCompleted).length} selecionados
      </p>

      <input type="text" onKeyDown={handleInputKeyDown} />

      <ul>
        {lista.map(item => (
          <li key={item.title}>
            <input
              type="checkbox"
              checked={item.isCompleted}
              onChange={() => onChangeHandler(item)}
            />
            <p style={{ marginRight: '10px', display: 'inline-block' }}>
              {item.title}
            </p>
            <ButtonLogin type="button" onClick={() => handleDelete(item.id)}>
              Delete
            </ButtonLogin>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Dashboard;
