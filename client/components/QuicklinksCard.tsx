import { Link } from 'react-router-dom'

interface CardProps {
  icon: string
  text: string
  link: string
}

const Card = ({ icon, text, link }) => {
  return (
    <Link to={link} className="mx-4 flex-1">
      <div className="rounded-lg bg-white p-6 shadow-md transition duration-300 hover:shadow-lg">
        <div className="mb-4 flex items-center justify-center">
          <div className="mr-4">{icon}</div>
          <div>{text}</div>
        </div>
      </div>
    </Link>
  )
}

export default Card
