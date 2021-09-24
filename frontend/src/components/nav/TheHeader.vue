<template>
  <header>
    <nav>
      <h1>
        <router-link to="/register">Home</router-link>
      </h1>
      <ul>
        <li>
          <router-link v-if="!isAuthenticated" to="/register">Register</router-link>
        </li>
        <li>
          <router-link v-if="!isAuthenticated" to="/login">Login</router-link>
        </li>
         <li>
         <router-link v-if="isAuthenticated&&roles==='6c1f0d1a-23ac-4a9a-ab5c-f68ed0d46e39'"  to="/users">Users</router-link>
        </li>
         <li>
         <router-link v-if="isAuthenticated&&roles==='6c1f0d1a-23ac-4a9a-ab5c-f68ed0d46e39'" to="/post">Posts</router-link>
        </li>
        <li>
         <router-link v-if="!isLogout"  to="/logout">Logout</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>


<script>
export default {
  data(){
    return{
      roles:localStorage.getItem("roleId"),
      isAuthenticated: false
    }
  },
  mounted() {
    if(localStorage.getItem("isAuthenticated")== "true") {
       this.isAuthenticated = true;
     this.$store.commit('setLogout',false)
    }
    else{
      this.isAuthenticated = false
      this.$store.commit('setLogout',true)
    }
  },
  watch:{
    isLogout(){
      this.isLogout=this.$store.state.logOut;
      if(this.isLogout) {
        this.isAuthenticated = false
      }
      else {
        this.isAuthenticated = true
      }
    }
  },
    computed: {
      isLogout(){
        return this.$store.state.logOut;
      }
  },
}
</script>