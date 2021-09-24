<template>
  <div>
      <h1 class="heading-center">Forgot Password</h1>
     <form class="lg-form">
    <label for="email"><b>Email</b></label>
    <input type="text" placeholder="Enter Email" name="email" id="email" v-model.trim="email" required>

     <p class="error" v-if="error!=''">{{error}}</p>
    <button type="button" @click="submit()">Submit</button>
</form>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import {apolloClient} from '../../vue-apollo'
export default {
    data(){
        return{
            email:'',
            error:""
        }
    },
    methods:{
    async submit(){
      try {
        await this.$store.commit('setLoading',true)
        const response= await apolloClient.mutate({
          mutation: gql`mutation ($email:String!) {
               forgotPassword(email:$email)
          }`,
          // Parameters
          variables: {
            email:this.email
          },
        })
        if(response&&response.data){
         await this.$store.commit('setLoading',false)
         return this.$router.push('/reset')
        }
      } catch (error) {
       await this.$store.commit('setLoading',false)
        this.error=error.message.split(': ')[1];
      }
      }
    }
}
</script>


