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
                        <!-- <th>Password</th> -->
                        <th v-if="permissions.update||permissions.delete">action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in pageOfItems" :key="user.id">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                         <!-- <td>{{ user.password }}</td> -->
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
import jwtInterceptor from '../../shared/jwt.interceptor.js'
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
            handler(page) {
                page = parseInt(page) || 1;
                if (page !== this.pager.currentPage) {
                    jwtInterceptor.get(`user/users/items?page=${page}`)
                        .then((response) => {
                        console.log("userssssssss.........",response);
                        console.log("meta.........",response.data.meta)
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
        jwtInterceptor.get('user/get-permission?resourceName=Users')
        .then((res)=>{
            console.log("permissions.......",res.data)
            this.permissions=res.data
        })
    },
    
    methods: {
        // delete user
            deleteUser(id){
                let apiURL = `user/delete-user/${id}`;
                let indexOfArrayItem = this.pageOfItems.findIndex(i => i.id === id);

                if (window.confirm("Do you really want to delete?")) {
                    jwtInterceptor.delete(apiURL).then(() => {
                        var pageOfItems=this.pageOfItems
                        pageOfItems.splice(indexOfArrayItem, 1)
                        this.pageOfItems=pageOfItems
                    }).catch(error => {
                        console.log(error)
                    });
                }
            },
 },
}

</script>



