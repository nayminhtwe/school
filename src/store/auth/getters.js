const getters = {
  isAuthenticated: state => !!state.token,
  getUserToken: state => state.token,
  getUserProfile: state => state.current,
  status: state => state.status
}

export default getters
