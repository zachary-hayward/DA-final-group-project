export default function TertiaryButton() {
  // Tailwind Secondary Button
  return (
    <>
      <span className="hidden sm:block">
        <button
          type="button"
          className="inline-flex items-center px-3 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900"
        >
          Edit
        </button>
      </span>
    </>
  )
}
