import { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Make a to-do list app", done: false },
  ]);
  const [inputValue, setInputValue] = useState("");

  const addBtn = () => {
    if (inputValue.trim() === "") return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text: inputValue, done: false },
    ]);
    setInputValue("");
  };

  const deleteBtn = (index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };
  const doneBtn = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  };
  const updateBtn = (id, newText) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, text: newText } : task)),
    );
  };
  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <div className="input-row">
        <input
          type="text"
          placeholder="Write a task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={addBtn}>Add</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li key={task.id} className={task.done ? "done" : ""}>
            <span>{index + 1}.</span>
            <p>{task.text}</p>

            <div className="task-btns">
              <button className="delete-btn" onClick={() => deleteBtn(index)}>
                ✕
              </button>
              <button
                className="update-btn"
                onClick={() => {
                  const newText = prompt("Write the new text:", task.text);
                  if (newText) updateBtn(task.id, newText);
                }}
              >
                ✏️
              </button>
              <button className="done-btn" onClick={() => doneBtn(task.id)}>
                ✓
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
