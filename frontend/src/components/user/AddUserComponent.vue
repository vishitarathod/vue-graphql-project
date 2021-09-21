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

                <div class="form-group">
                    <!-- <button class="btn btn-danger btn-block">Add</button> -->
                    <base-button @click.prevent="handleAddUserForm()">Add</base-button>
                </div>
            </form>
        </div>
 
</template>

<script>
import jwtInterceptor from '../../shared/jwt.interceptor'
// import { mapMutations} from "vuex";
export default {
    data() {
        return {
            user: { 
                name:'',
                email:'',
                password:'',
                roleId:'6d3475c5-d88c-4aae-af25-664b0420b071'
            }
        }
    },
    methods: {
    // ...mapMutations("auth", {
    //   setLoading: "setLoading",
    
    // }),
        //add user
        handleAddUserForm() {
           this.$store.commit('setLoading',true)
         
            let apiURL = `user/add-user`;
            jwtInterceptor.post(apiURL, this.user).then((res) => { 
                console.log("+++++++++++++",res)
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