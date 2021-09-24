<template>
         
        <div>
          <h1 class="heading-center">Update User</h1>
       <form class="lg-form">
    
    <label for="name"><b>Name</b></label>
    <input type="text" class="form-control" v-model="user.name" required>

  <label for="email"><b>Email</b></label>
    <input type="text" name="email" id="email" v-model.trim="user.email" required>

    <label for="psw"><b>Password</b></label>
    <input type="text" name="psw" id="psw" v-model.trim="user.password" required>


    <button type="button"  @click.prevent="handleUpdateForm()">Update</button>
   
</form>

  </div>
</template>

<script>
// import axios from "axios";
import gql from 'graphql-tag'
import {apolloClient} from '../../vue-apollo'
// import {mapMutations} from "vuex";
export default {
    data() {
        return {
            user: { 
                name:'',
                email:'',
                password:''
            }
        }
    },
    //get user which we have to edit
   async created() {
         try {
        const response= await apolloClient.query({
    
          query: gql`query ($id:String!) {
              getUserForEdit(id:$id)
              {  
                      name
                      email
                      password 
              }
          }`,
          // Parameters
          variables: {
            id:this.$route.params.id
          },
        })
        if(response&&response.data){
           this.user = response.data.getUserForEdit
        }
      } catch (error) {
        //  this.error=error.message.split(': ')[1];
        console.log(error)
      }
    },
    methods: {
    //update user
    async handleUpdateForm() {
        try {
        this.$store.commit('setLoading',true)
        const response= await apolloClient.mutate({
    
          mutation: gql`mutation ($updateUserInput:UpdateUserInput) {
              updateUser(updateUserInput:$updateUserInput)
          }`,
          // Parameters
          variables: {
            updateUserInput:{
            id:this.$route.params.id,
            name:this.user.name,
            email:this.user.email,
            password: this.user.password,
            }
          },
        })
        if(response&&response.data){
           this.$store.commit('setLoading',false)
            this.$router.push('/users')
        }
      } catch (error) {
         this.$store.commit('setLoading',false)
         console.log(error)
        //  this.error=error.message.split(': ')[1];
      }
     }
    }
}
</script>


