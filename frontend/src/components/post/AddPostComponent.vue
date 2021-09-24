<template>
    <div>
  
     <h1 class="heading-center">Add Post</h1>
     <form class="lg-form">
       
    <label for="title"><b>Title</b></label>
     <input type="text" placeholder="Enter Title" name="title" id="title" v-model.trim="title" required>
      
    <label for="discription"><b>Discription</b></label>
    <input type="text" placeholder="Enter discription" name="discription" id="discription" v-model.trim="discription" required>
     <div class="form-group">
    <button class="btn btn-danger btn-block" @click.prevent="AddPost">Add Post</button>
    <!-- <base-button @click.prevent="AddPost()">Add Post</base-button> -->
      </div>
  
</form>
    </div>
</template>

<script>
import gql from 'graphql-tag'
import {apolloClient} from '../../vue-apollo'
export default {
    data(){
        return{
            title:'',
            discription:'',
        }
    },
    methods:{
    //add post
    async AddPost(){
      try {
        this.$store.commit('setLoading',true)
        const response= await apolloClient.mutate({
    
          mutation: gql`mutation ($title:String!,$discription:String!,$userId:String!) {
              addPost(title:$title,discription:$discription,userId:$userId)
          }`,
          // Parameters
          variables: {
              userId:localStorage.getItem("userId"),
              title:this.title,
              discription:this.discription,
          },
        })
        if(response&&response.data){
           this.$store.commit('setLoading',false)
            this.$router.push('/userpost')
        }
      } catch (error) {
         this.$store.commit('setLoading',false)
      }
      }
    }
}
</script>

