<template>
<div>
   <h1 class="heading-center">Reset Password</h1>
     <form class="lg-form">
    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" id="psw" v-model.trim="password" required>

     <label for="psw"><b>confirm Password</b></label>
    <input type="password" placeholder="Enter confirm Password" name="cpsw" id="cpsw" v-model.trim="cpassword" required>
   
     
    <!-- <button type="button" @click="reset" >Submit</button> -->
    <base-button @click="reset()">Reset Password</base-button>
  
</form>
</div>
</template>
<script>
// import axios from 'axios'
// import {mapMutations } from "vuex";
import jwtInterceptor from '../../shared/jwt.interceptor'
export default {
   
    data(){
        return{
            password:'',
            cpassword:'',
        }
    },
    methods:{
    //       ...mapMutations("auth", {
    //   setLoading: "setLoading",
    
    // }),
      //reset password
        async reset(){
          this.$store.commit('setLoading',true)
        jwtInterceptor.patch('auth/reset',{
        password:this.password,
        cpassword:this.cpassword,
        token:this.$route.params.token
      })
      .then((data)=>{
       this.$store.commit('setLoading',false)
        console.log(data)
        this.$router.push('/login')
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