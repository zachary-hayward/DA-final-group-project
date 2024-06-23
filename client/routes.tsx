import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App.tsx'
import Home from './pages/Home.tsx'

import SinglePlant from './pages/SinglePlant.tsx'
import { GardenView } from './pages/GardenView.tsx'
import TaskPage from './pages/TaskPage.tsx'
import MyPlants from './pages/MyPlants.tsx'
import { Switch } from '@headlessui/react'

// Added 'Switch' to ensure only one route is matched and rendered at any given time. We may or may not need this.

export default createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="/my-garden" element={<GardenView />} />
    <Switch>
      <Route path="/my-plants" element={<MyPlants />} />
      <Route path="/my-plants/:id" element={<SinglePlant />} />
    </Switch>
    <Route path="/my-tasks" element={<TaskPage />} />
  </Route>,
)
