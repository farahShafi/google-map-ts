<template>
  <div class="container-fluid mainDiv">
    <div>
      <b-card-group deck>
        <b-card header="Add New Property">
          <div>
            <b-form>
              <b-form-group
                id="address-group-1"
                label="Property address:"
                label-for="address"
                description="Please see the Map for exact location"
              >
                <gmap-autocomplete
                  style="width: 100%"
                  @place_changed="setPlace"
                />
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Owner's Name:"
                label-for="full_name"
              >
                <b-form-input
                  id="full_name"
                  v-model="form.full_name"
                  required
                  placeholder="Enter name"
                />
              </b-form-group>

              <b-form-group
                id="input-group-3"
                label="Asking price:"
                label-for="price"
              >
                <b-form-input
                  id="price"
                  v-model="form.price"
                  required
                  placeholder="Enter price"
                />
              </b-form-group>

              <b-form-textarea
                id="textarea"
                v-model="form.description"
                placeholder="Enter Description..."
                rows="3"
                max-rows="6"
              />

              <div class="col-lg-6 offset-lg-3 row btn-row">
                <div class="btn-custom">
                  <b-button @click="onSubmit" variant="info">Submit</b-button>
                </div>
              </div>
            </b-form>
          </div>
        </b-card>

        <b-card header="Map">
          <gmap-map :center="center" :zoom="12" style="width: 100%; height: 500px">
            <gmap-info-window
              v-if="currentPlace"
              :options="infoOptions"
              :position="infoPosition"
              :opened="infoOpened"
            >
              <div class="popoverStyle">
                Address: {{ currentPlace.formatted_address }}
              </div>
            </gmap-info-window>
            <gmap-marker
              v-for="(m, key) in markers"
              :key="key"
              :position="m.position"
              :clickable="true"
              @click="onMarkerClick(m, key)"
              @mouseover="toggleInfo(m, key)"
              @mouseleave="infoOpened = false"
            />
          </gmap-map>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { MapPosition, Marker, Property } from '@/types'

interface PlaceResult {
  formatted_address: string
  geometry: {
    location: {
      lat(): number
      lng(): number
    }
  }
}

interface FormData {
  address: PlaceResult | null
  full_name: string
  price: string
  description: string
}

export default Vue.extend({
  name: 'NewProperty',
  data() {
    return {
      form: {
        address: null,
        full_name: '',
        price: '',
        description: ''
      } as FormData,
      center: { lat: 40.7607793, lng: -111.8910474 } as MapPosition,
      markers: [] as Marker[],
      places: [] as PlaceResult[],
      currentPlace: null as PlaceResult | null,
      infoPosition: null as MapPosition | null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      infoOpened: false,
      infoCurrentKey: null as number | null
    }
  },
  mounted() {
    this.geolocate()
  },
  computed: {
    ...mapGetters('allProperties', ['allProperties'])
  },
  methods: {
    ...mapActions('allProperties', ['addProperty']),
    onSubmit(): void {
      if (this.form.address?.formatted_address) {
        const propertyNew: Property = {
          formatted_address: this.form.address.formatted_address,
          full_name: this.form.full_name,
          price: this.form.price,
          description: this.form.description,
          lat: this.form.address.geometry.location.lat().toString(),
          lng: this.form.address.geometry.location.lng().toString()
        }
        this.addProperty(propertyNew)
        this.$router.push({ name: 'Map' })
      } else {
        alert('Please complete the Form to submit')
      }
    },
    setPlace(place: PlaceResult): void {
      this.currentPlace = place
      this.addMarker()
    },
    addMarker(): void {
      if (this.currentPlace) {
        const marker: MapPosition = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        }
        this.markers = []
        this.markers.push({ position: marker })
        this.places.push(this.currentPlace)
        this.center = marker
        this.form.address = this.currentPlace
      }
    },
    geolocate(): void {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      })
    },
    getPosition(marker: Marker): MapPosition {
      return {
        lat: marker.position.lat,
        lng: marker.position.lng
      }
    },
    onMarkerClick(m: Marker, key: number): void {
      this.center = m.position
      this.toggleInfo(m, key)
    },
    toggleInfo(marker: Marker, key: number): void {
      this.infoPosition = this.getPosition(marker)
      if (this.infoCurrentKey === key) {
        this.infoOpened = !this.infoOpened
      } else {
        this.infoOpened = true
        this.infoCurrentKey = key
      }
    }
  }
})
</script>
