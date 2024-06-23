import { MouseEvent } from 'react'
import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'

interface TableProps {
  id: number
  title: string
  content: string
}

//mockData
const notes = [
  { id: 1, title: 'Note 1', content: 'Content of Note 1' },
  { id: 2, title: 'Note 2', content: 'Content of Note 2' },
  { id: 3, title: 'Note 3', content: 'Content of Note 3' },
]

const SimpleTable: React.FC<TableProps> = ({ id, title, content }) => {
  return (
    <div className="list-container mx-auto rounded-lg py-8">
      <div className="mb-4 flex items-center justify-between">
        <div className="container-title">My Notes</div>
        <PrimaryButton
          onClick={(event: MouseEvent<Element, MouseEvent>): void => {
            throw new Error('Function not implemented.')
          }}
        >
          Add notes
        </PrimaryButton>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          {/* Table header */}
          <thead>
            <tr className="bg-slate-50">
              <th className="border-b-0 bg-slate-50 px-4 py-2 text-left uppercase">
                Title
              </th>
              <th className="border-b-0 bg-slate-50 px-4 py-2 text-left uppercase">
                Content
              </th>
              <th className="border-b-0 bg-slate-50 px-4 py-2 text-left uppercase"></th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {notes.map((note, index) => (
              <tr
                key={note.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
              >
                <td className="w-1/4 border border-gray-300 px-4 py-2">
                  {note.title}
                </td>
                <td className="w-3/4 border border-gray-300 px-4 py-2">
                  {note.content}
                </td>
                <td className="w-1/12 border border-gray-300 px-4 py-2 text-right">
                  <SecondaryButton
                    onClick={(
                      event: MouseEvent<Element, globalThis.MouseEvent>,
                    ): void => {
                      throw new Error('Function not implemented.')
                    }}
                  >
                    Edit
                  </SecondaryButton>
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
