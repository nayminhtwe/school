export default function () {
  return {
    token: localStorage.getItem('access_token') || '',
    current: {
      id: 0,
      name: '',
      email: ''
    },
    status: '',
    message: '',
    errors: []
  }
}
