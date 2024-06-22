interface ListItemProps {
  iconSrc: string
  title: string
  description: string
}

const InstructionListItem: React.FC<ListItemProps> = ({
  iconSrc,
  title,
  description,
}) => {
  return (
    <div>
      <div className="list-container">
        <div className="list-grid">
          <div className="col-span-1">
            <img className="h-10 w-12" src={iconSrc} alt={title} />
          </div>
          <div className="col-span-11">
            <h4 className="list-title">{title}</h4>
            <p className="list-description">{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstructionListItem
