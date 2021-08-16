import { useEffect, useState } from 'react';
const api_base = 'http://localhost:3001';

function Home() {
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    GetTodos();
  }, []);

  const GetTodos = () => {
    const token = localStorage.getItem('id_token');

    fetch(api_base + '/todos', {
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    })
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error('Error: ', err));
  };

  const completeTodo = async (id) => {
    const data = await fetch(api_base + '/todo/complete/' + id).then((res) => res.json());

    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }

        return todo;
      })
    );
  };

  const addTodo = async () => {
    const token = localStorage.getItem('id_token');
    const data = await fetch(api_base + '/todo/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify({
        text: newTodo,
      }),
    }).then((res) => res.json());

    setTodos([...todos, data]);

    setPopupActive(false);
    setNewTodo('');
  };

  const deleteTodo = (id) => {
    console.log(id);
    fetch(api_base + '/todo/delete/' + id, { method: 'DELETE' })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTodos((todos) => todos.filter((todo) => todo._id !== data._id));
      });
  };

  return (
    <div className="App">
      {/* <h1 className="flex justify-center">Let's get shit done!</h1> */}
      {/* <h4>Your tasks</h4> */}

      <div className="todos">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <div
              className={'todo' + (todo.complete ? ' is-complete' : '')}
              key={todo._id}
              onClick={() => completeTodo(todo._id)}
            >
              <div className="checkbox"></div>

              <div className="text">{todo.text}</div>

              <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>
                x
              </div>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>

      <div className="addPopup" onClick={() => setPopupActive(true)}>
        +
      </div>

      {popupActive ? (
        <div className="popup">
          <div className="closePopup" onClick={() => setPopupActive(false)}>
            X
          </div>
          <div className="content">
            <h3>Add Task</h3>
            <input
              type="text"
              className="add-todo-input text-pink-500"
              onChange={(e) => setNewTodo(e.target.value)}
              value={newTodo}
            />
            <div className="button" onClick={addTodo}>
              Create Task
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default Home;
