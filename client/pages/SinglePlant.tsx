import { useParams } from 'react-router-dom'
import React from "react"


export default function SinglePlant() {
    const { id } = useParams()
    // const { data, isError, isLoading, error } = 

    const plantData = {
        plantName: "Tomato",
        scientificName: "Solanum lycopersicum",
        description: "Tomatoes are popular garden plants grown for their delicious fruits, which come in a variety of shapes, sizes, and colors.",
        careInstructions: {
            sunlight: "Full sun, at least 6-8 hours of direct sunlight per day.",
            watering: "Regular watering, keeping the soil consistently moist but not waterlogged.",
            fertilization: "Feed with balanced fertilizer at planting and during the growing season.",
            pruning: "Remove suckers to encourage strong growth and fruit production.",
            pests: "Watch for pests like aphids, hornworms, and tomato fruitworms. Use organic pest control methods if needed.",
            diseases: "Prevent diseases like blight and wilt by ensuring good air circulation and avoiding overhead watering."  
        }
    }

    if (!id) {
        throw new Error()
    }

    return (
        <>
        <div className = " ">
        </div> 
        <div className="title-section">
            <h2 className="plant-name">{plantData.plantName}</h2>
            <h3 className="plant-scientific-name">{plantData.scientificName}</h3>
            <p className="plant-description">{plantData.description}</p>
            <img src="image-url" alt="your plant"></img>
        </div>
            <h3>Care instructions</h3>
            <p>here are some instructions</p>
            <h3>Todo</h3>  
            <p>here are some todos</p>
            <h3>Notes</h3>
            <p>here are some notes</p>
        </>
    )
    //components: plant info (care instructions)

}
