import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface IListData {
  id: string;
  title: string;
  isCompleted: boolean;
}

const Dashboard = () => {
  const [lista, setLista] = useState<IListData[]>([]);

  const handleInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> =
    useCallback(e => {
      if (e.key === 'Enter') {
        if (e.currentTarget.value.trim().length === 0) return;

        let value = e.currentTarget.value;

        setLista(oldLista => {
          if (oldLista.some(listItem => listItem.title === value))
            return oldLista;
          return [
            ...oldLista,
            { id: uuidv4(), title: value, isCompleted: false },
          ];
        });
      }
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
              onChange={() => {
                setLista(oldState =>
                  oldState.map(oldItem =>
                    oldItem.title === item.title
                      ? { ...oldItem, isCompleted: !oldItem.isCompleted }
                      : oldItem
                  )
                );
              }}
            />
            {item.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Dashboard;
