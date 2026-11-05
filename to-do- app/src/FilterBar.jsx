export default function FilterBar({ filter, onChange }) {
    const FILTERS = ['all', 'active', 'completed']

    return (
        <div role="group" aria-label="Filter Tasks" className="filters">
            {FILTERS.map((f) => (
                <button
                    key={f}
                    type="button"
                    aria-pressed={filter === f}
                    onClick={() => onChange(f)}
                >
                    {f === 'all' ? 'All' : f === 'active' ? 'Active' : 'Completed'}
                </button>
            ))}
        </div>
    )
}