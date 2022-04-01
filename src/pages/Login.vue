<template>
  <q-page class="q-mt-xl">
    <div class="row justify-center q-py-lg">
      <div class="text-h3">Log In</div>
    </div>
    <div class="row justify-center">
      <q-input
        standout="bg-teal text-white"
        v-model="email"
        label="Email"
        class="q-pa-md col-8 col-lg-4"
      />
    </div>
    <div class="row justify-center">
      <q-input
        standout="bg-teal text-white"
        v-model="password"
        label="Password"
        class="q-pa-md col-8 col-lg-4"
      />
    </div>
    <q-space />
    <div class="row justify-center q-pt-xl">
      <q-btn
        unelevated
        rounded
        color="red"
        label="Log In"
        class="col-4 col-lg-1"
      />
    </div>
    <div class="q-pt-xl">
      <div class="row justify-center items-center">
        <div class="text-body2">
          Don't Have PropTech Account?
        </div>
      </div>
      <div class="row justify-center items-center">
        <q-btn
          flat
          rounded
          color="primary"
          label="Register"
          class="col-4 col-lg-1"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'LoginPage',
  setup () {
    const email = ref('')
    const password = ref('')

    return {
      email,
      password
    }
  }
})
</script>
