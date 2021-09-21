<template>
  <div id="app">
    <the-header></the-header>
    <router-view></router-view>
  </div>
</template>

<script>

import TheHeader from './components/nav/TheHeader.vue'

export default {

     components:{
        TheHeader,
        },

      // mounted(){
      //   console.log(this.$store);
      // },
      //   computed:{
      //     isLoading(){
      //       return this.$store.state.isLoading
      //     }
      //   }
}
</script>

<style>
</style>
