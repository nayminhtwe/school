export default function () {
  return {
    token: localStorage.getItem('access_token') || '',
    current: {
      user_id: 0,
      name: '',
      email: ''
    },
    status: '',
    message: '',
    errors: []
  }
}
