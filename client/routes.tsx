import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App.tsx'
import Home from './components/Home.tsx'
import Register from './components/Register.tsx'

export default createRoutesFromElements(
  <Route path='/' element={<App />}>
    <Route index element={<Home />} />
    <Route path='/register' element={<Register />} />
  </Route>
)
