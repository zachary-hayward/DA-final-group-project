// import { useParams } from 'react-router-dom'
// import React from "react"

import InstructionListItem from '../components/InstructionListItem'
import SimpleTable from '../components/SimpleTable'
import TasksTable from '../components/TasksTable'

// mockData
const plantData: {
  plantName: string
  scientificName: string
  description: string
  careInstructions: {
    soil: string
    sunlight: string
    watering: string
    fertilization: string
    pruning: string
    pests: string
    diseases: string
  }
  plantingTime: {
    indoors: string
    outdoors: string
    spacing: string
    time: string
  }
  harvesting: {
    time: string
    tips: string
  }
} = {
  plantName: 'Tomato',
  scientificName: 'Solanum lycopersicum',
  description:
    'Tomatoes are popular garden plants grown for their delicious fruits, which come in a variety of shapes, sizes, and colors.',
  careInstructions: {
    soil: 'Well-drained, fertile soil rich in organic matter.',
    sunlight: 'Full sun, at least 6-8 hours of direct sunlight per day.',
    watering:
      'Regular watering, keeping the soil consistently moist but not waterlogged.',
    fertilization:
      'Feed with balanced fertilizer at planting and during the growing season.',
    pruning: 'Remove suckers to encourage strong growth and fruit production.',
    pests:
      'Watch for pests like aphids, hornworms, and tomato fruitworms. Use organic pest control methods if needed.',
    diseases:
      'Prevent diseases like blight and wilt by ensuring good air circulation and avoiding overhead watering.',
  },
  plantingTime: {
    indoors:
      'Start seeds indoors 6-8 weeks before the last frost date in your area.',
    outdoors:
      'Transplant seedlings outdoors after all danger of frost has passed and soil temperatures are consistently above 55°F (13°C).',
    spacing:
      'Plant seedlings 18-24 inches apart in rows spaced 24-36 inches apart.',
    time: 'Spring: September to November. Summer: December to February',
  },
  harvesting: {
    time: 'Harvest tomatoes when they are firm, fully colored, and have reached their mature size. This is typically 60-85 days after transplanting.',
    tips: 'Pick tomatoes regularly to encourage continued fruit production.',
  },
}

export default function SinglePlant() {
  return (
    <>
      {/* Page Banner - hard coded - currently WIP of componentising it */}
      <div>
        <div className="banner-container">
          <div className="mx-auto max-w-7xl">
            <div className="banner-flex">
              <div className="flex-1">
                <h2 className="banner-title">{plantData.plantName}</h2>
                <h3 className="py-3 text-xl italic text-gray-800">
                  {plantData.scientificName}
                </h3>
                <div className="mt-4 w-full resize-y md:max-w-xl">
                  <p className="text-lg text-gray-800">
                    {plantData.description}
                  </p>
                </div>
              </div>
              <div className="ml-8 flex-shrink-0">
                <img
                  src="/images/photos/tomato-plant.png"
                  alt={plantData.plantName}
                  className="h-50 w-auto"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Care Instructions*/}
        <div>
          <div className="list-container">
            <h3 className="container-title">Care instructions</h3>
            <InstructionListItem
              iconSrc={'/images/flat-icons/soil.png'}
              title={'Soil'} // Hard coded for now because of mockdata!
              description={plantData.careInstructions.soil}
            />
            <InstructionListItem
              iconSrc={'/images/flat-icons/sun.png'}
              title={'Sun'} // Hard coded for now because of mockdata!
              description={plantData.careInstructions.sunlight}
            />
            <InstructionListItem
              iconSrc={'/images/flat-icons/drop.png'}
              title={'Watering'} // Hard coded for now because of mockdata!
              description={plantData.careInstructions.watering}
            />
            <InstructionListItem
              iconSrc={'/images/flat-icons/fertilizer.png'}
              title={'Fertiliser'} // Hard coded for now because of mockdata!
              description={plantData.careInstructions.fertilization}
            />
            <InstructionListItem
              iconSrc={'/images/flat-icons/pruning-shears.png'}
              title={'Pruning'} // Hard coded for now because of mockdata!
              description={plantData.careInstructions.pruning}
            />
            <InstructionListItem
              iconSrc={'/images/flat-icons/bug-spray.png'}
              title={'Pests'} // Hard coded for now because of mockdata!
              description={plantData.careInstructions.pests}
            />
            <InstructionListItem
              iconSrc={'/images/flat-icons/pests.png'}
              title={'Disease Prevention'} // Hard coded for now because of mockdata!
              description={plantData.careInstructions.diseases}
            />
          </div>
        </div>

        {/* Planting Instructions*/}
        <div>
          <div className="list-container">
            <h3 className="container-title">Planting</h3>
            <InstructionListItem
              iconSrc={'/images/flat-icons/damage.png'}
              title={'Outdoors'} // Hard coded for now because of mockdata!
              description={plantData.plantingTime.outdoors}
            />
            <InstructionListItem
              iconSrc={'/images/flat-icons/indoor-plants.png'}
              title={'Indoors'} // Hard coded for now because of mockdata!
              description={plantData.plantingTime.indoors}
            />
            <InstructionListItem
              iconSrc={'/images/flat-icons/measure.png'}
              title={'Spacing'} // Hard coded for now because of mockdata!
              description={plantData.plantingTime.spacing}
            />
            <InstructionListItem
              iconSrc={'/images/flat-icons/calendar.png'}
              title={'Season'} // Hard coded for now because of mockdata!
              description={plantData.plantingTime.time}
            />
          </div>

          {/* Harvesting Instructions*/}
          <div>
            <div className="list-container">
              <h3 className="container-title">Harvesting</h3>
              <InstructionListItem
                iconSrc={'/images/flat-icons/harvest.png'}
                title={'Season'} // Hard coded for now because of mockdata!
                description={plantData.harvesting.time}
              />
              <InstructionListItem
                iconSrc={'/images/flat-icons/idea.png'}
                title={'Tips'} // Hard coded for now because of mockdata!
                description={plantData.harvesting.tips}
              />
            </div>

            {/* Notes Tables*/}
            <div>
              <div className="list-container">
                <SimpleTable id={0} title={''} content={''} />
              </div>
              <TasksTable tasks={[]} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
