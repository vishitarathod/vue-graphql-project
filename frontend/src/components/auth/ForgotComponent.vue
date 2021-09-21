<template>
  <div>
      <h1 class="heading-center">Forgot Password</h1>
     <form class="lg-form">
    <label for="email"><b>Email</b></label>
    <input type="text" placeholder="Enter Email" name="email" id="email" v-model.trim="email" required>

     <p class="error" v-if="error!=''">{{error}}</p>
    <!-- <button type="button" @click="submit()">Submit</button> -->
    <base-button @click.prevent="submit()">Submit</base-button>
</form>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            email:'',
            error:""
        }
    },
    methods:{
    async submit(){
          this.$store.commit('setLoading',true)
       axios.post('http://localhost:3000/auth/forgot',{
        email:this.email,
      }).then((data)=>{
        this.$store.commit('setLoading',false)
        console.log(data)
        this.$router.push(`/reset/`)
      }).catch((error)=>{
        this.$store.commit('setLoading',false)
        console.log(error)
         console.log(error.response)
        this.error=error.response.data.error.details[0].message
      })
      }
    }
}
</script>


