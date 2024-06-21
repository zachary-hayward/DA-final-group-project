import { Layout } from 'react-grid-layout'

export interface User extends UserData {
  id: number
}
export interface UserData {
  username: string
  location: string
}

export interface Plant {
  id: number
  name: string
  difficulty: string
  planting_starts: string
  planting_ends: string
  watering_frequency: string
  sunlight: number
  cycle: string
}

export interface GardenDB {
  garden_id: number
  user_id: number
  layout: string
  plot_id: number
  plot_number: number
  shade_level: number
  plot_type: number
  size: string
  average_wind: string
  plot_name: string
  plot_plant_id: number
  plant_id: number
  date_planted: string
  last_watered: string
  plant_name: string
  difficulty: string
  planting_starts: string
  planting_ends: string
  watering_frequency: string
  sunlight: number
  cycle: string
}

// export interface Layout {
//   w: number
//   h: number
//   x: number
//   y: number
//   i: string
// }

export interface PlotDatum {
  layoutId: string
  name: string
  sunLight: number
  occupation: number
  blockType: string
  size: string
  shade: number
  wind: number
  growable: boolean
}

export interface GardenToSave {
  layout: Layout
  plot: PlotDatum[]
}
