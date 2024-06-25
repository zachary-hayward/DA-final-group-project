interface Props {
  onClick: (event: React.MouseEvent) => void
  children: React.ReactNode
}

export default function DeleteButton({ onClick, children }: Props) {
  // Tailwind Delete Button
  return (
    <>
      <span className="sm:ml-3">
        <button
          type="button"
          className="mb-2 me-2 inline-flex items-center rounded-md bg-green-700 bg-red-700 px-3 py-2 py-2.5 
          text-sm font-medium font-semibold text-white text-white shadow-sm hover:bg-red-800  focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          onClick={onClick}
        >
          {children}
        </button>
      </span>
    </>
  )
}
