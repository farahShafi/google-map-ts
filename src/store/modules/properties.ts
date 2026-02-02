import { Module } from 'vuex'
import { Property, PropertiesState, RootState } from '@/types'

const state = (): PropertiesState => ({
  properties: [
    {
      formatted_address: '412 West 9000 South, Sandy, UT 84070\nSandy Sandy Utah United States',
      full_name: 'Timcoat Tim',
      price: '350k',
      description: 'Single Home, Built in 1998',
      lat: '40.5886089',
      lng: '-111.9034992'
    },
    {
      formatted_address: 'South Salt Lake, UT 84115\nSouth Salt Lake South Salt Lake, Salt Lake City Utah United States',
      full_name: 'Chris Hornok',
      price: '470k',
      description: 'Twin home, Built in 2010',
      lat: '40.6973223',
      lng: '-111.8784961'
    }
  ]
})

const getters = {
  allProperties: (state: PropertiesState): Property[] => state.properties
}

const mutations = {
  SET_PROPERTIES(state: PropertiesState, properties: Property[]): void {
    state.properties = properties
  },
  ADD_PROPERTY(state: PropertiesState, property: Property): void {
    state.properties.unshift(property)
  }
}

const actions = {
  addProperty({ commit }: any, property: Property): void {
    commit('ADD_PROPERTY', property)
  }
}

const propertiesModule: Module<PropertiesState, RootState> = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default propertiesModule
