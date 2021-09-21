<template>
  <div>
    <h1 class="heading-center">Register</h1>
     <form class="lg-form">
    <label for="name"><b>Name</b></label>
    <input type="text"  placeholder="Enter name" name="name" id="name" v-model.trim="name" required>

    <label for="email"><b>Email</b></label>
    <input type="text" placeholder="Enter Email" name="email" id="email" v-model.trim="email" required>

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" id="psw" v-model.trim="password" required>

    <label for="roles"><b>Roles</b></label>
    <select id="roles" name="roles" class="dropdown" v-model="roleId">
      <option value="super admin">Super Admin</option>
      <option value="admin">Admin</option>
      <option value="user">User</option>
    </select>
    <p class="error" v-if="error!=''">{{error}}</p>
  <div>
      <!-- <button type="button" @click="register()">Register</button> -->
      <base-button @click.prevent="register()">Register</base-button>
  </div>
    </form>
</div>
</template>
<script>
// import { mapActions ,mapMutations} from "vuex";
export default {
  data() {
    return {
      name:"",
      email: "",
      password: "",
      roleId:"super admin",
      error:'',
    };
  },
  // computed: {
  //   ...mapGetters("register", {
  //     getRegisterApi: "getRegisterApi",
  //   }),
  // },
  methods: {
    // ...mapActions("register", {
    //   actionRegisterApi: "registerApi",
    // }),
    // ...mapMutations("auth", {
    //   setLoading: "setLoading",
    // }),
    //register
    async register() {
      // console.log(this.email, this.password);
     this.$store.commit('setLoading',true)
      const payload = {
        name:this.name,
        email: this.email,
        password: this.password,
        roleId:this.roleId
      };
      this.$store.dispatch('registerApi',{value:payload})
      .then(()=>{
        // console.log(res)
       this.$store.commit('setLoading',false)
       return this.$router.push('/login')
      })
      .catch((error)=>{
       this.$store.commit('setLoading',false)
        console.log(error.response)
        this.error=error.response.data.error.details[0].message
      })
    },
  },
};
</script>

<style >
.error{
  color: red;
}
</style>