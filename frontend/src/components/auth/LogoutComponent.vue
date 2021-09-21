<script>
export default {
  //   computed: {
  //     this.$store.getter.getLogout
  // },
  created(){
     this.$store.dispatch('userLogout').then(async()=>{
       await this.$store.commit('setLogout',true)
        this.$router.push("/login")
     }
      
      );
  },
  methods: {
    // ...mapActions("logout", {
    //   userLogout: "userLogout",
    // }),
    // ...mapMutations("logout", {
    //   setLogout: "setLogout",
    
    // }),
    },
}
</script>
