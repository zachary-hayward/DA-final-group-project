import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App.tsx'
import Home from './pages/Home.tsx'
import { GardenView } from './pages/GardenView.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="garden-layout" element={<GardenView />} />
  </Route>,
)
