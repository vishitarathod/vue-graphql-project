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
   <base-button @click.prevent="login()">Login</base-button>
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
          //  console.log("get roles.........",getRolesName)
        this.$router.push("/register")
        console.log(this.$store.getters.getLoginApiStatus);
       if(this.$store.getters.getLoginApiStatus){
       await  this.$store.commit('setLoading',false)
       
      //  console.log("}}}}}}}}}",this.$store.state.logOut)
        if(getRolesName==="b3963d93-175b-409e-8eaa-c4af1a41373b"){
            this.$router.push("/users")
        }else if(getRolesName==="d8eece8e-315e-40f9-9da7-19d5c7a23121"){
           this.$router.push("/users")
        }else{
          this.$router.push("/userpost")
        }
      }else{
        alert("failed")
      }
     }).catch((error)=>{
       this.$store.commit('setLoading',false)
        console.log("++++++++++++++++++")
        console.log(error.response)
        this.error=error
      })
     
    },
  },
}
</script>