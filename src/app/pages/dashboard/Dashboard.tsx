import { useCallback, useState } from 'react';

interface IListData {
  title: string;
  isSelected: boolean;
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
          return [...oldLista, { title: value, isSelected: false }];
        });
      }
    }, []);

  return (
    <>
      <p>Lista</p>

      <p>{lista.filter(listItem => listItem.isSelected).length} selecionados</p>

      <input type="text" onKeyDown={handleInputKeyDown} />

      <ul>
        {lista.map(item => (
          <li key={item.title}>
            <input
              type="checkbox"
              checked={item.isSelected}
              onChange={() => {
                setLista(oldState =>
                  oldState.map(oldItem =>
                    oldItem.title === item.title
                      ? { ...oldItem, isSelected: !oldItem.isSelected }
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
