import { useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTodo, setEditedTodo] = useState("");

  const handleEnterKey = (e, index) => {
    if (e.key === "Enter") {
      if (e.target.id === "add") {
        addTodo();
      } else if (e.target.id === "edit") {
        saveEditedTodo(index);
      }
    }
  };

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos((t) => [...t, newTodo]);
      setNewTodo("");
    }
  };

  const saveEditedTodo = (index) => {
    setTodos((t) => {
      const updatedTodos = [...t];
      updatedTodos[index] = editedTodo;
      return updatedTodos;
    });
    setEditingIndex(null);
    setEditedTodo("");
  };

  const startEditing = (index, todo) => {
    setEditingIndex(index);
    setEditedTodo(todo);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
    setEditedTodo("");
  };

  const deleteTodo = (index) => {
    setTodos((t) => {
      const updatedTodos = [...t];
      updatedTodos.splice(index, 1);
      return updatedTodos;
    });
    setEditingIndex(null);
    setEditedTodo("");
  };

  return (
    <div className="w-[750px] h-[450px] my-32 px-32 mx-auto border rounded-md bg-slate-100">
      <h1 className="font-semibold text-6xl text-center p-6 mt-2">To-Do App</h1>
      <div className="flex justify-center items-center p-2">
        <input
          type="text"
          id="add"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleEnterKey}
          className="w-full p-2 outline-none border border-black rounded-md"
        />
        <button className="font-semibold text-2xl p-2" onClick={addTodo}>
          +
        </button>
      </div>
        <ul className="overflow-y-scroll h-[250px]">
          {todos.map((todo, index) => (
            <li key={todo}>
              {editingIndex !== index ? (
                <div className="flex justify-between items-center p-2">
                  <div className="border border-transparent p-2">{todo}</div>
                  <div>
                    <button
                      className="mr-1 p-2"
                      onClick={() => startEditing(index, todo)}
                    >
                      Edit
                    </button>
                    <button
                      className="mr-1 p-2"
                      onClick={() => deleteTodo(index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center p-2">
                  <input
                    type="text"
                    id="edit"
                    value={editedTodo}
                    onChange={(e) => setEditedTodo(e.target.value)}
                    onKeyDown={(e) => handleEnterKey(e, index)}
                    className="w-full p-2 outline-none border border-black rounded-md"
                  />
                  <button
                    className="mr-1 p-2"
                    onClick={() => saveEditedTodo(index)}
                  >
                    Save
                  </button>
                  <button className="mr-1 p-2" onClick={cancelEditing}>
                    Cancel
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
  );
};

export default App;
