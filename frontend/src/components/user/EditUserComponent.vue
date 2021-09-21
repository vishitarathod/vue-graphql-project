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


    <!-- <button type="button"  @click="handleUpdateForm()">Update</button> -->
    <base-button @click.prevent="handleUpdateForm()">Update</base-button>
   
</form>

  </div>
</template>

<script>
// import axios from "axios";
import jwtInterceptor from '../../shared/jwt.interceptor'
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
    created() {
        let apiURL = `user/edit-user/${this.$route.params.id}`;

        jwtInterceptor.get(apiURL).then((res) => {
            this.user = res.data;
            console.log(this.user)
        })
    },
    methods: {
    // ...mapMutations("auth", {
    //   setLoading: "setLoading",
    
    // }),
    //update user
      handleUpdateForm() {
            this.$store.commit('setLoading',true)
            let apiURL = `user/update-user/${this.$route.params.id}`;
            
            jwtInterceptor.put(apiURL, this.user).then((res) => {
                console.log(res)
                  this.$store.commit('setLoading',false)
                 this.$router.push('/users')
               
            }).catch(error => {
                console.log(error)
                 this.$store.commit('setLoading',false)
            });
        }
    }
}
</script>


