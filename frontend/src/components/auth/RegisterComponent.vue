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
      <button type="button" @click.prevent="register()">Register</button>
  </div>
    </form>
</div>
</template>
<script>

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
  methods: {
    //register
    async register() {
      try {
        this.$store.commit('setLoading',true)
        const payload = {
        name:this.name,
        email: this.email,
        password: this.password,
        roleId:this.roleId
      };
      await this.$store.dispatch('registerApi',payload)
       return this.$router.push('/login')
      } catch (error) {
        this.error=error
      }
    },
  },
};
</script>

<style >
.error{
  color: red;
}
</style>