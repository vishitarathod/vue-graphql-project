<script>
export default {
  created(){
     this.$store.dispatch('userLogout').then(async()=>{
       await this.$store.commit('setLogout',true)
        this.$router.push("/login")
     }
      
      );
  },
}
</script>
