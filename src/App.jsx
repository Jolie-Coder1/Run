
import { useState } from 'react'
import './App.css'
import FilterBar from './FilterBar'
import TaskForm from './TaskForm'
import TaskList from './TaskList'

function App() {

  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')

  const addTask = (title) => 
    setTasks((prevTasks) => [...prevTasks, { id: crypto.randomUUID(), title, done: false }])

  const toggleTask = (id) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const deleteTask = (id) => setTasks((prev) => prev.filter((t) => t.id !== id));

  const clearCompleted = () => setTasks((prev) => prev.filter((t) => !t.done));

  const visible = tasks.filter((t) =>
    filter === "active" ? !t.done : filter === "completed" ? t.done : true
  );

  const remaining = tasks.filter((t) => !t.done).length;


  return (
    <>
      <main>
        <h1>My Task</h1>
        <TaskForm onAdd={addTask} />
        <FilterBar filter={filter} onChange={setFilter} />
        <TaskList tasks={visible} onToggle={toggleTask} onDelete={deleteTask} />


         <footer className="todo-footer">
        <p role="status">{remaining} task{remaining === 1 ? "" : "s"} left</p>
        {tasks.some((t) => t.done) && (
          <button type="button" onClick={clearCompleted}>Clear completed</button>
        )}
      </footer>

      </main>
    </>
  )
}

export default App