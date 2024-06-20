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
            soil: "Well-drained, fertile soil rich in organic matter.",
            sunlight: "Full sun, at least 6-8 hours of direct sunlight per day.",
            watering: "Regular watering, keeping the soil consistently moist but not waterlogged.",
            fertilization: "Feed with balanced fertilizer at planting and during the growing season.",
            pruning: "Remove suckers to encourage strong growth and fruit production.",
            pests: "Watch for pests like aphids, hornworms, and tomato fruitworms. Use organic pest control methods if needed.",
            diseases: "Prevent diseases like blight and wilt by ensuring good air circulation and avoiding overhead watering."  
        },
        plantingTime: {
            indoors: "Start seeds indoors 6-8 weeks before the last frost date in your area.",
            outdoors: "Transplant seedlings outdoors after all danger of frost has passed and soil temperatures are consistently above 55°F (13°C).",
            spacing: "Plant seedlings 18-24 inches apart in rows spaced 24-36 inches apart.",
            time: "Spring: September to November. Summer: December to February",
        },
        harvesting: {
            time: "Harvest tomatoes when they are firm, fully colored, and have reached their mature size. This is typically 60-85 days after transplanting.",
            tips: "Pick tomatoes regularly to encourage continued fruit production."
        }
    }

    if (!id) {
        throw new Error()
    }

    return (
        <>
        console.log("")
        <div className="title-section">
            <h2 className="plant-name">{plantData.plantName}</h2>
            <h3 className="plant-scientific-name">{plantData.scientificName}</h3>
            <p className="plant-description">{plantData.description}</p>
            <img src='/images/photos/tomato-plant.png' alt={plantData.plantName}></img>
        </div>
        <div>
            <h3>Care instructions</h3>
            <h4>Soil </h4>
            <p>{plantData.careInstructions.soil}</p>
            <h4>Sunlight </h4>
            <p>{plantData.careInstructions.sunlight}</p>
            <h4>Watering </h4>
            <p>{plantData.careInstructions.watering}</p>
            <h4>Fertilisation </h4>
            <p>{plantData.careInstructions.fertilization}</p>
            <h4>Pruning </h4>
            <p>{plantData.careInstructions.pruning}</p>
            <h4>Pests </h4>
            <p>{plantData.careInstructions.pests}</p>
            <h4>Disease prevention </h4>
            <p>{plantData.careInstructions.diseases}</p>
        </div>
        <div>
        <h3>Planting</h3>
            <h4>Outdoors </h4>
            <p>{plantData.plantingTime.outdoors}</p>
            <h4>Indoors </h4>
            <p>{plantData.plantingTime.indoors}</p>
            <h4>Spacing </h4>
            <p>{plantData.plantingTime.spacing}</p>
            <h4>Season </h4>
            <p>{plantData.plantingTime.time}</p>
        </div>
        <div>
        <h3>Harvesting</h3>
            <h4>Season</h4>
            <p>{plantData.harvesting.time}</p>
            <h4>Tips</h4>
            <p>{plantData.harvesting.tips}</p>
        </div>
        <div>
        <h3>Notes</h3>
            <p>here are some notes</p>
        </div>
        </>
    )
    //components: plant info (care instructions)

}
