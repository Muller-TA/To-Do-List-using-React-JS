import React, { useState, useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || [],
  );
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  function addTask() {
    if (task.trim() === "") return;
    setTasks([...tasks, { text: task, done: false }]);
    setTask("");
  }
  function deleteTask(index) {
    setTasks(tasks.filter((_, i) => i !== index));
  }
  function editTask(index) {
    const newText = window.prompt("Enter The Task");
    if (newText === null || newText.trim() === "") return;
    setTasks(
      tasks.map((task, i) => (i === index ? { ...task, text: newText } : task)),
    );
  }
  function toggleDone(index) {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, done: !task.done } : task,
      ),
    );
  }
  return (
    <div>
      <h1>To Do List App</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") addTask();
        }}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span>{index + 1}</span>
            <p className={task.done ? "done" : ""}>{task.text}</p>
            <button onClick={() => toggleDone(index)}>Done</button>
            <button onClick={() => editTask(index)}>Edit</button>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
