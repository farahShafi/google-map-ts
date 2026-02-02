<template>
  <div id="root">
    <gmap-map ref="mymap" :center="startLocation" :zoom="11" style="width: 100%">
      <gmap-info-window
        :options="infoOptions"
        :position="infoPosition"
        :opened="infoOpened"
      >
        <div class="popoverStyle">
          Address: {{ infoContent.formatted_address }}<br />
          Owner: {{ infoContent.full_name }}<br />
          Price: {{ infoContent.price }}<br />
          Description: {{ infoContent.description }}<br />
        </div>
      </gmap-info-window>

      <gmap-marker
        v-for="(item, key) in allProperties"
        :key="key"
        :position="getPosition(item)"
        :clickable="true"
        @mouseover="toggleInfo(item, key)"
        @mouseleave="infoOpened = false"
        @click="toggleInfo(item, key)"
      />
    </gmap-map>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { Property, MapPosition } from '@/types'

interface InfoContent {
  formatted_address: string
  full_name: string
  price: string
  description: string
  lat: string
  lng: string
}

export default Vue.extend({
  name: 'MapView',
  data() {
    return {
      startLocation: {
        lat: 40.5649781,
        lng: -111.8389726
      } as MapPosition,
      infoPosition: null as MapPosition | null,
      infoContent: {
        formatted_address: '',
        full_name: '',
        price: '',
        description: '',
        lat: '',
        lng: ''
      } as InfoContent,
      infoOpened: false,
      infoCurrentKey: null as number | null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    }
  },
  computed: {
    ...mapGetters('allProperties', ['allProperties'])
  },
  methods: {
    getPosition(marker: Property): MapPosition {
      return {
        lat: parseFloat(marker.lat),
        lng: parseFloat(marker.lng)
      }
    },
    toggleInfo(marker: Property, key: number): void {
      this.infoPosition = this.getPosition(marker)
      this.infoContent.full_name = marker.full_name
      this.infoContent.formatted_address = marker.formatted_address
      this.infoContent.price = marker.price
      this.infoContent.description = marker.description

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
