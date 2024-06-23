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
    <div className="mx-auto py-12">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-medium">My Notes</div>
        <PrimaryButton
          onClick={(event: MouseEvent<Element, MouseEvent>): void => {
            throw new Error('Function not implemented.')
          }}
        >
          Add notes
        </PrimaryButton>
      </div>

      {/* Table */}
      <div className="overflow-x-auto pt-4">
        <table>
          {/* Table header */}
          <thead>
            <tr className="bg-slate-50 ">
              <th className="table-header border-l border-t border-slate-200">
                Title
              </th>
              <th className="table-header border-t border-slate-200">
                Content
              </th>
              <th className="table-header border-r border-t border-slate-200"></th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {notes.map((note, index) => (
              <tr
                key={note.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
              >
                <td className="w-1/4 border border-slate-200 px-4 py-2">
                  {note.title}
                </td>
                <td className="w-3/4 border border-slate-200 px-4 py-2">
                  {note.content}
                </td>
                <td className="w-1/12 border border-slate-200 px-4 py-2 text-right">
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
