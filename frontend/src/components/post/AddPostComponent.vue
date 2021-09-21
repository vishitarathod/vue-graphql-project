<template>
    <div>
  
     <h1 class="heading-center">Add Post</h1>
     <form class="lg-form">
       
    <label for="title"><b>Title</b></label>
     <input type="text" placeholder="Enter Title" name="title" id="title" v-model.trim="title" required>
      
    <label for="discription"><b>Discription</b></label>
    <input type="text" placeholder="Enter discription" name="discription" id="discription" v-model.trim="discription" required>

     <div class="form-group">
    <!-- <button class="btn btn-danger btn-block" @click="AddPost">Add Post</button> -->
    <base-button @click.prevent="AddPost()">Add Post</base-button>
      </div>
  
</form>
    </div>
</template>

<script>
// import axios from 'axios'
import jwtInterceptor from '../../shared/jwt.interceptor'
// import { mapGetters } from "vuex";
// import {mapMutations} from "vuex";
export default {
    data(){
        return{
            title:'',
            discription:'',
        }
    },
    methods:{
    //         ...mapMutations("auth", {
    //   setLoading: "setLoading",
    
    // }),
    //add post
    async AddPost(){
      this.$store.commit('setLoading',true)
     
      await jwtInterceptor.post('post/addpost',{
        // userId:this.getUserID,
        userId:localStorage.getItem("userId"),
        title:this.title,
        discription:this.discription,
      }).then((data)=>{
        console.log(data)
         this.$store.commit('setLoading',false)
            this.$router.push('/userpost')
      }).catch((e)=>{
        console.log(e)
       this.$store.commit('setLoading',false)
      })
      }
    }
}
</script>

