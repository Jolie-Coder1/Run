
import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  // 1. Load saved tasks once when the app starts
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("myTasks");
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch {
      return [];
    }
  });

  const [newTask, setNewTask] = useState("");

  // 2. Create a reference for the input
  const inputRef = useRef(null);

  // 3. Automatically focus the input when the app opens
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // 4. Save tasks whenever the tasks list changes
  useEffect(() => {
    localStorage.setItem("myTasks", JSON.stringify(tasks));
  }, [tasks]);

  // 5. Count tasks that are not completed
  const remainingTasks = tasks.filter(
    (task) => !task.completed
  ).length;

  // 6. Update the browser tab title
  useEffect(() => {
    document.title = `To-Do List (${remainingTasks} remaining)`;
  }, [remainingTasks]);

  // Add a new task
  const addTask = (event) => {
    event.preventDefault();

    if (newTask.trim() === "") {
      return;
    }

    const task = {
      id: Date.now(),
      text: newTask.trim(),
      completed: false,
    };

    setTasks((previousTasks) => [...previousTasks, task]);
    setNewTask("");
    inputRef.current.focus();
  };

  // Mark a task as completed or incomplete
  const toggleTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  };

  return (
    <div className="app">
      <div className="todo-container">
        <h1>My To-Do List</h1>
        <p className="subtitle">
          Organize your tasks and stay productive.
        </p>

        <form onSubmit={addTask} className="task-form">
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter a new task..."
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
          />

          <button type="submit">Add Task</button>
        </form>

        <div className="task-summary">
          <p>Total tasks: {tasks.length}</p>
          <p>Remaining: {remainingTasks}</p>
        </div>

        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <label className={task.completed ? "completed" : ""}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                />
                {task.text}
              </label>

              <button
                className="delete-button"
                onClick={() => deleteTask(task.id)}
                type="button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {tasks.length === 0 && (
          <p className="empty-message">
            No tasks yet. Add your first task!
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
