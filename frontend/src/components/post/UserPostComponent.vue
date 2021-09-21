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
                 <router-link :to="{ query: { page: pager.currentPage - 1 }}" class="page"><i class="fa fa-angle-left"></i></router-link>

                <router-link v-for="index in pager.totalPages" :key="index" :to="{ query: { page: index }}" class="page">{{index}}</router-link>
                 <!-- <a class="page"><i class="fa fa-angle-right"></i></a> -->
                  <router-link :to="{ query: { page: pager.currentPage + 1 }}" class="page"><i class="fa fa-angle-right"></i></router-link>
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
import jwtInterceptor from '../../shared/jwt.interceptor'
// import { mapGetters } from "vuex";
export default {
  data(){
    return{
    //   posts:[],
       permissions:{},
        pager: {},
            pageOfItems: [],
    }
  },
    watch: {
        '$route.query.page': {
            immediate: true,
            handler(page) {
                const userId=localStorage.getItem("userId")
                page = parseInt(page) || 1;
                if (page !== this.pager.currentPage) {
                    jwtInterceptor.post(`post/getuserpost/items?page=${page}`,{userId})
                        .then((response) => {
                        console.log(response)
                         this.pager = response.data.meta
                            this.pageOfItems = response.data.items
                            }
                        )
                }
            }
        },
         pageOfItems(){
            return this.pageOfItems
        }
    },
       mounted(){
        jwtInterceptor.get('user/get-permission?resourceName=Posts')
        .then((res)=>{
            console.log("per.........",res.data)
            this.permissions=res.data
        })
    },
    methods: {
            // delete user post
            deletePost(id){
                let apiURL = `post/delete-post/${id}`;
                let indexOfArrayItem = this.pageOfItems.findIndex(i => i.id === id);

                if (window.confirm("Do you really want to delete?")) {
                    jwtInterceptor.delete(apiURL).then(() => {
                        this.pageOfItems.splice(indexOfArrayItem, 1);
                    }).catch(error => {
                        console.log(error)
                    });
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

