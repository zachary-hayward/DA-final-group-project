interface TableProps {
  title: string
  content: string
}

const SimpleTable: React.FC<ListItemProps> = ({ title, content }) => {
  // Example data (replace with your actual data)
  const notes = [
    { id: 1, title: 'Note 1', content: 'Content of Note 1' },
    { id: 2, title: 'Note 2', content: 'Content of Note 2' },
    { id: 3, title: 'Note 3', content: 'Content of Note 3' },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-2xl font-bold">Notes</div>
        <button className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-600">
          Add Note
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          {/* Table header */}
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Content</th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {notes.map((note) => (
              <tr
                key={note.id}
                className={note.id % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
              >
                <td className="border border-gray-300 px-4 py-2">
                  {note.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {note.content}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button className="rounded bg-green-500 px-2 py-1 font-bold text-white hover:bg-green-600">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SimpleTable
