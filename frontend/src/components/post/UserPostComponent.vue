<template>
<div class="row">
        <div class="col-md-12">
            <div class="clearfix">
            <router-link class="btn btn-danger addbtn" v-if="permissions.write"  to="/addpost">Add Post</router-link>
            </div>
           <h1 class="sub-heading">Post Data</h1>
              <div v-if="permissions.read||pageOfItems.length!=0">
            <table class="table table-striped" border="2px">
                <thead  class="thead-dark">
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th v-if="permissions.update||permissions.delete">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="post in pageOfItems" :key="post.id">
                        <td>{{ post.id }}</td>
                        <td>{{ post.title }}</td>
                        <td>{{ post.discription }}</td>
                          <td>
                            <router-link :to="{name: 'editpost', params: { id: post.id }}" v-if="permissions.update" class="btn btn-danger"><i class="fa fa-pencil"></i>
                            </router-link> 
                            <a @click.prevent="deletePost(post.id)" v-if="permissions.delete" class="btn btn-danger"><i class="fa fa-trash"></i></a>
                        </td>
                    </tr>
                </tbody>
            </table>
               <div class="pagination">
                 <router-link :to="{ query: { page: pager.currentpage - 1 }}" class="page"><i class="fa fa-angle-left"></i></router-link>

                <router-link v-for="index in pager.totalpages" :key="index" :to="{ query: { page: index }}" class="page">{{index}}</router-link>
                 <!-- <a class="page"><i class="fa fa-angle-right"></i></a> -->
                  <router-link :to="{ query: { page: pager.currentpage + 1 }}" class="page"><i class="fa fa-angle-right"></i></router-link>
            </div>
              </div>
                <div v-else>
                No data found
            </div>
        </div>
    </div>
</template>
<script>

import gql from 'graphql-tag'
import {apolloClient} from '../../vue-apollo'
export default {
  data(){
    return{
       permissions:{},
        pager: {},
        pageOfItems: [],
    }
  },
    watch: {
        '$route.query.page': {
            immediate: true,
           async handler(page) {
               const userId=localStorage.getItem("userId")
                page = parseInt(page) || 1;
                if (page !== this.pager.currentpage) {
                    try {
                        const response= await apolloClient.query({
                    
                        query: gql`query ($page:Int!,$userId:String!) {
                            getUserPost(page:$page,userId:$userId)
                            {
                                currentpage
                                totalpages
                                pageOfItems{
                                id
                                title
                                discription
                                }
                            }
                        }`,
                        // Parameters
                        variables: {
                            page,
                            userId 
                        },
                        })
                        if(response&&response.data){
                            this.pager = response.data.getUserPost
                            this.pageOfItems = response.data.getUserPost.pageOfItems
                        }
                    } catch (error) {
                        console.log(error)
                        //  this.error=error.message.split(': ')[1];
                    }
                }
            }
        },
         pageOfItems(){
            return this.pageOfItems
        }
    },
       async mounted(){
                 try {
                    const response= await apolloClient.query({
                    query: gql`query ($resourceName:String!) {
                        getPermission(resourceName:$resourceName){
                            read
                            write
                            update
                            delete
                        }
                    }`,
                    // Parameters
                    variables: {
                        resourceName:'Posts'
                    },
                    })
                    if(response&&response.data){
                         this.permissions=response.data.getPermission
                    }
                }catch (error) {
                    //  this.error=error.message.split(': ')[1];
                    console.log(error)
                }
    },
    methods: {
            // delete user post
           async deletePost(pid){
                try {
                this.$store.commit('setLoading',true)
                let indexOfArrayItem = this.pageOfItems.findIndex(i => i.id === pid);

                if (window.confirm("Do you really want to delete?")) {
                    const response= await apolloClient.mutate({
                
                    mutation: gql`mutation ($id:String!) {
                        deletePost(id:$id)
                    }`,
                    // Parameters
                    variables: {
                        id:pid
                    },
                    })
                    if(response&&response.data){
                    this.$store.commit('setLoading',false)
                        var pageOfItems=this.pageOfItems
                        pageOfItems.splice(indexOfArrayItem, 1)
                        this.pageOfItems=pageOfItems
                    }
                } 
                }catch (error) {
                    this.$store.commit('setLoading',false)
                    //  this.error=error.message.split(': ')[1];
                    console.log(error)
                }
            },
          }
}

</script>

<style>
    .btn-success {
        margin-right: 10px;
    }
</style>

