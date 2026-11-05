import { useState } from "react"

export default function TaskForm({onAdd}) {
    const [title, setTitle] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        const clean = title.trim()
        if (!clean) return
        onAdd(clean)
        setTitle('')
    }

    return (

        <form onSubmit={handleSubmit}>
            <label htmlFor="new-task" className="visually-hidden">New Task</label>
            <input id="new-task" value={title} placeholder="What needs to be done?" onChange={(e) => setTitle(e.target.value)}></input>
            <button type="submit">Add</button>
        </form>

    )
}