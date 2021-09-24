<template>
  <div>
    <h1 class="heading-center">Login</h1>  
    <form class="lg-form">
  <div>
    <label for="email">Email/Username</label>
    <input type="email" name="email" id="email" v-model.trim="email" required>
  </div>
  <div>
    <label for="password">Password</label>
    <input type="password" name="password" id="password" v-model.trim="password" required>
  </div>
  <p class="error" v-if="error!=''">{{error}}</p>
  
  <div class="router">
   <!-- <base-button @click.prevent="login()">Login</base-button> -->
    <button type="button" @click.prevent="login()">Login</button>
  </div>
  <div class="container">
    <p> <router-link to="/forgot">forgot password?</router-link></p>
  </div>
</form>
  <p>
    Don't have an account? <span><router-link to="/register">Register</router-link></span>
  </p>
</div>

</template>

<script>
export default {
     data() {
    return {
      email: "",
      password: "",
      error:""
    };
  },
 
  methods: {
    //login
    async login() {
       this.$store.commit('setLoading',true)

      const payload = {
        email: this.email,
        password: this.password,
      };
      this.$store.dispatch('loginApi',payload)
     .then(async()=>{
       this.$store.commit('setLoading',false)
        const getRolesName=localStorage.getItem("roleId")
   
       if(this.$store.getters.getLoginApiStatus){
       await this.$store.commit('setLoading',false)

        if(getRolesName==="6c1f0d1a-23ac-4a9a-ab5c-f68ed0d46e39"){
            this.$router.push("/users")
        }else if(getRolesName==="3226d1a8-4cfa-4fcc-a34a-b08841a96d40"){
           this.$router.push("/users")
        }else{
          this.$router.push("/userpost")
        }
      }else{
        alert("failed")
      }
     }).catch((error)=>{
       this.$store.commit('setLoading',false)
        this.error=error
      })
     
    },
  },
}
</script>