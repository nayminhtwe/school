<template>
  <q-page class="q-mt-xl">
    <div class="row justify-center q-py-lg">
      <div class="text-h3">Profile</div>
    </div>
    <div class="row justify-center">
      <q-input
        standout="bg-teal text-white"
        readonly
        type="text"
        v-model="getUserProfile.id"
        label="ID"
        class="q-pa-md col-8 col-lg-4"
      />
    </div>
    <div class="row justify-center">
      <q-input
        standout="bg-teal text-white"
        readonly
        v-model="getUserProfile.email"
        label="Email"
        class="q-pa-md col-8 col-lg-4"
      />
    </div>
    <q-space />
    <div class="row justify-center q-pt-xl">
      <q-btn
        unelevated
        rounded
        color="red"
        label="Logout"
        class="col-4 col-lg-1"
        @click="logout"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import UserProfile from '../composables/UserProfile'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ProfilePage',
  setup () {
    const router = useRouter()
    const store = useStore()
    const { getUserProfile } = UserProfile()
    const logout = () => {
      store.dispatch('auth/logout')
      setTimeout(() => {
        router.push('/auth/login')
      }, 2000)
    }
    return {
      getUserProfile,
      logout
    }
  }
})
</script>
