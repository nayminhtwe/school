import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default function UserProfile () {
  const store = useStore()

  const getUserProfile = computed(() => store.getters['auth/getUserProfile'])

  onMounted(async () => {
    if (!getUserProfile.value.id) {
      await store.dispatch('auth/profile')
    }
  })

  return {
    getUserProfile
  }
}
