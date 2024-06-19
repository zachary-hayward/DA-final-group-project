import { createRoutesFromElements, Route } from 'react-router-dom'
import App from './components/App.tsx'
import Register from './components/Register.tsx'

export default createRoutesFromElements(
  <Route path='/' element={<App />}>
    <Route path='/register' element={<Register />} />
  </Route>
)
