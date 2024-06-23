interface Props {
  onClick: (event: React.MouseEvent) => void
  children: React.ReactNode
}

export default function GoBackButton({ onClick, children }: Props) {
  // Tailwind GoBack Button
  return (
    <>
      <button
        type="button"
        className="inline-block items-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={onClick}
      >
        {'< '}
        {children}
      </button>
    </>
  )
}
