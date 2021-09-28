<template>
<div class="row">
        <div class="col-md-12">
            <div class="clearfix">
          
            <router-link class="btn btn-danger addbtn" v-if="permissions.write"  to="/adduser">Add User</router-link>
            </div>
             <h1 class="sub-heading">Users Data</h1>
             <div v-if="permissions.read">
            <table v-if="pageOfItems.length!=0" class="table table-striped"  border="2px">
                <thead class="thead-dark">
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th v-if="permissions.update||permissions.delete">action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in pageOfItems" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                         <td>{{ user.password }}</td>
                        <td >
                            <router-link class="btn btn-danger" v-if="permissions.update" :to="{name: 'edituser', params: { id: user.id }}" ><i class="fa fa-pencil"></i>
                            </router-link> 
                            <a @click.prevent="deleteUser(user.id)" v-if="permissions.delete" class="btn btn-danger"><i class="fa fa-trash"></i></a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="pageOfItems.length!=0"  class="pagination">
                 <!-- <a class="page"><i class="fa fa-angle-left"></i></a> -->
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
// import axios from 'axios'
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
                page = parseInt(page) || 1;
                if (page !== this.pager.currentpage) {

                     try {
                        const response= await apolloClient.query({
                    
                        query: gql`query ($page:Int!) {
                            getUsers(page:$page)
                            {
                                currentpage
                                totalpages
                                pageOfItems{
                                id
                                name
                                email
                                password
                                }
                            }
                        }`,
                        // Parameters
                        variables: {
                            page 
                        },
                        })
                        if(response&&response.data){
                            this.pager = response.data.getUsers
                            // this.pager = response.data.getUsers.totalpages
                            this.pageOfItems = response.data.getUsers.pageOfItems
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
                    const userId=localStorage.getItem('userId')
                    const response= await apolloClient.query({
                    query: gql`query ($resourceName:String!,$userId:String!) {
                        getPermission(resourceName:$resourceName,userId:$userId){
                            read
                            write
                            update
                            delete
                        }
                    }`,
                    // Parameters
                    variables: {
                        resourceName:'Users',
                        userId
                    },
                    })
                    if(response&&response.data){
                         this.permissions=response.data.getPermission
                    }
                }catch (error) {
                    //  this.error=error.message.split(': ')[1];
                    console.log(error)
                    throw error

                }
    },
    methods: {
        // delete user
           async deleteUser(uid){
               try {
                this.$store.commit('setLoading',true)
                let indexOfArrayItem = this.pageOfItems.findIndex(i => i.id === uid);

                if (window.confirm("Do you really want to delete?")) {
                    const response= await apolloClient.mutate({
                
                    mutation: gql`mutation ($id:String!) {
                        deleteUser(id:$id)
                    }`,
                    // Parameters
                    variables: {
                        id:uid
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
 },
}

</script>



