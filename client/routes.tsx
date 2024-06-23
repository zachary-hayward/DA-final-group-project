import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App.tsx'
import Home from './pages/Home.tsx'

import SinglePlant from './pages/SinglePlant.tsx'
import { GardenView } from './pages/GardenView.tsx'
import TaskPage from './pages/TaskPage.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="/my-plants" element="" />
    {/* '/my-plants' should link to the plants list of an exisiting garden */}
    <Route path="/my-plants/:id" element={<SinglePlant />} />
    <Route path="/my-garden" element={<GardenView />} />
    <Route path="/my-tasks" element={<TaskPage />} />
  </Route>,
)
