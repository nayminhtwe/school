<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <div class="auth-heading q-my-lg">
        <div class="text-h3 text-primary">PropTech</div>
        <div class="text-h6 text-brown col-mt-sm">EdTech School Management</div>
      </div>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout'
})
</script>

<style scoped>
.auth-heading {
  text-align: center;
}
</style>
