interface Props {
  onClick: (event: React.MouseEvent) => void
  children: React.ReactNode
}

export default function TertiaryButton({ onClick, children }: Props) {
  // Tailwind Secondary Button
  return (
    <>
      <span className="hidden sm:block">
        <button
          type="button"
          className="inline-flex items-center px-3 py-2 text-sm font-semibold text-indigo-700 hover:text-indigo-900"
          onClick={onClick}
        >
          {children}
        </button>
      </span>
    </>
  )
}
