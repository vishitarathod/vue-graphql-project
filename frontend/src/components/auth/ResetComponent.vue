<template>
<div>
   <h1 class="heading-center">Reset Password</h1>
     <form class="lg-form">
    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" id="psw" v-model.trim="password" required>

     <label for="psw"><b>confirm Password</b></label>
    <input type="password" placeholder="Enter confirm Password" name="cpsw" id="cpsw" v-model.trim="cpassword" required>
   <p class="error" v-if="error!=''">{{error}}</p>
     
    <button type="button" @click="reset" >Submit</button>
  
</form>
</div>
</template>
<script>
import gql from 'graphql-tag'
import {apolloClient} from '../../vue-apollo'
export default {
   
    data(){
        return{
            password:'',
            cpassword:'',
            error:""
        }
    },
    methods:{
        async reset(){
       try {
        await this.$store.commit('setLoading',true)
        const response= await apolloClient.mutate({
          mutation: gql`mutation ($token:String!,$password:String!) {
               resetPassword(token:$token,password:$password)
          }`,
          // Parameters
          variables: {
            token:this.$route.params.token,
            password:this.password
          },
        })
        if(response&&response.data){
         await this.$store.commit('setLoading',false)
         return this.$router.push('/login')
        }
      } catch (error) {
       await this.$store.commit('setLoading',false)
        this.error=error.message.split(': ')[1];
      }
    }
    }
}

</script>