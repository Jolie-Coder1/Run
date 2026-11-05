export function TaskItem({task, onToggle, onDelete}) {
  return (
    <li className={task.done ? "done" : ""}>
      <input type="checkbox" id={task.id} checked={task.done} onChange={() => onToggle(task.id)} />
      <label htmlFor={task.id}>{task.title}</label>
      <button type="button" aria-label={`Delete "${task.title}"`} onClick={() => onDelete(task.id)}>✕</button>
    </li>
  );
}

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) return <p className="empty">Nothing here yet.</p>;
  return (
    <ul className="todo-list">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </ul>
  );
}