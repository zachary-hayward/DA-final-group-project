interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  deleteId: number | null
  deleteName: string
}

function SmallDeleteButton({ onClick, deleteId, deleteName }: Props) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="smlDel"
      id={`${deleteName}-${deleteId}`}
    >
      <svg
        width="11"
        height="11"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="10" cy="10" r="9.5" stroke="#FF0000" strokeWidth="1.5" />
        <path d="M5 10H10.2941H15" stroke="#FF0000" strokeWidth="2" />
      </svg>
    </button>
  )
}

export default SmallDeleteButton
