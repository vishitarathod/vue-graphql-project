export default{
    setLoading(state, data) {
        state.isLoading = data;
      },
      setLoginApiStatus(state, data) {
        state.loginApiStatus = data;
      },
      setLogout(state, payload){
        state.logOut = payload;
       }
}