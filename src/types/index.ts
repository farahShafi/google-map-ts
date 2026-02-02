export interface Property {
  formatted_address: string
  full_name: string
  price: string
  description: string
  lat: string
  lng: string
}

export interface MapPosition {
  lat: number
  lng: number
}

export interface Marker {
  position: MapPosition
}

export interface RootState {
  allProperties: PropertiesState
  loggedIn: LoggedInState
}

export interface PropertiesState {
  properties: Property[]
}

export interface LoggedInState {
  loggedIn: boolean
}
