<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand :to="{ name: 'Map' }">HOME</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown v-if="loggedIn" right>
            <template #button-content><em>User</em></template>
            <b-dropdown-item :to="{ name: 'NewProperty' }">Add Property</b-dropdown-item>
            <b-dropdown-item :to="{ name: 'Map' }" @click="signOut">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item v-else :to="{ name: 'NewProperty' }" @click="signIn">
            <b-button variant="outline-info">Sign In</b-button>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'

export default Vue.extend({
  name: 'NavBar',
  computed: {
    ...mapGetters('loggedIn', ['loggedIn'])
  },
  methods: {
    ...mapActions('loggedIn', ['setLoggedIn']),
    signIn(): void {
      this.setLoggedIn(true)
    },
    signOut(): void {
      this.setLoggedIn(false)
    }
  }
})
</script>
