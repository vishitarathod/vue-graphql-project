<template>
  <div id="app">
    <!-- {{hello}} -->
    <the-header></the-header>
    <div id="loader" v-if="isLoading">
     <vue-loaders-ball-beat color="red" scale="1"></vue-loaders-ball-beat>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

import TheHeader from './components/nav/TheHeader.vue'
export default {
     components:{
        TheHeader,
        },
     computed:{
          isLoading(){
            return this.$store.state.isLoading
          }
        }
}
</script>
