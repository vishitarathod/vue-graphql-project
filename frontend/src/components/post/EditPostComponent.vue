<template>
      <div>
          <h1 class="heading-center">Update Post</h1>
       <form class="lg-form">
    
    <label for="title"><b>Title</b></label>
    <input type="text" v-model="post.title" required>

    <label for="discription"><b>Discription</b></label>
    <input type="text" v-model="post.discription" required>

    <button type="button"  @click.prevent="handleUpdateForm()">Update</button>
    <!-- <base-button @click.prevent="handleUpdateForm()">Update</base-button> -->
</form>

  </div>
</template>

<script>
import gql from 'graphql-tag'
import {apolloClient} from '../../vue-apollo'
export default {
    data() {
        return {
            post: { 
                title:'',
                discription:'',
            }
        }
    },
    //get post which we have to edit
   async created() {
         try {
        const response= await apolloClient.query({
    
          query: gql`query ($id:String!) {
              getPostForEdit(id:$id)
              {  
                      title
                      discription 
              }
          }`,
          // Parameters
          variables: {
            id:this.$route.params.id
          },
        })
        if(response&&response.data){
           this.post = response.data.getPostForEdit
        }
      } catch (error) {
        //  this.error=error.message.split(': ')[1];
        console.log(error)
      }
    }, 
    methods: {
        //update post
       async handleUpdateForm() {
             try {
                this.$store.commit('setLoading',true)
                const response= await apolloClient.mutate({
            
                mutation: gql`mutation ($id:String!,$title:String!,$discription:String!) {
                    updatePost(id:$id,title:$title,discription:$discription)
                }`,
                // Parameters
                variables: {
                    id:this.$route.params.id,
                    title:this.post.title,
                    discription:this.post.discription
                },
                })
                if(response&&response.data){
                this.$store.commit('setLoading',false)
                    this.$router.push('/userpost')
                }
            } catch (error) {
                this.$store.commit('setLoading',false)
                //  this.error=error.message.split(': ')[1];
            }
        }
    }
}
</script>
