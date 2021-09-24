<template>
    <div>
        <h1 class="heading-center">Add User</h1>
     <form class="lg-form">
          
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" class="form-control" v-model="user.name" required>
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input type="email" class="form-control" v-model="user.email" required>
                </div>

                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" v-model="user.password" required>
                </div>
                 <p class="error" v-if="error!=''">{{error}}</p>
                <div class="form-group">
                    <!-- <button class="btn btn-danger btn-block">Add</button> -->
                    <button @click.prevent="handleAddUserForm()">Add</button>
                </div>
            </form>
        </div>
 
</template>

<script>
import gql from 'graphql-tag'
import {apolloClient} from '../../vue-apollo'
export default {
    data() {
        return {
            user: { 
                name:'',
                email:'',
                password:'',
                roleId:'ac916b69-c475-4b2f-bf69-a4066ff12e62'
            },
            error:""
        }
    },
    methods: {
        //add user
       async handleAddUserForm() {
         try {
        this.$store.commit('setLoading',true)
        const response= await apolloClient.mutate({
    
          mutation: gql`mutation ($registerInput: RegisterInput) {
              addUser(registerInput:$registerInput)
              {
                      id
                      name
                      email
                      password
                      roleId
              }
          }`,
          // Parameters
          variables: {
            registerInput:{
            name:this.user.name,
            email:this.user.email,
            password: this.user.password,
            roleName:this.user.roleId
            }
          },
        })
        if(response&&response.data){
           this.$store.commit('setLoading',false)
            this.$router.push('/users')
        }
      } catch (error) {
         this.$store.commit('setLoading',false)
         this.error=error.message.split(': ')[1];
      }
        }
    }
}
</script>