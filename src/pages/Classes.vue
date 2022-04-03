<template>
  <q-page>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card
        class="my-card"
        flat
        bordered
      >
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-overline">Overline</div>
            <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
            <div class="text-caption text-grey">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-img
              class="rounded-borders"
              src="https://cdn.quasar.dev/img/parallax2.jpg"
            />
          </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-actions>
          <q-btn
            flat
            round
            icon="event"
          />
          <q-btn flat>
            7:30PM
          </q-btn>
          <q-btn
            flat
            color="primary"
            @click="onReserve(id)"
          >
            Reserve
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { useRoute } from 'vue-router'
import { defineComponent, ref, watch } from 'vue'
import UserProfile from '../composables/UserProfile'

export default defineComponent({
  name: 'ClassesPage',
  setup () {
    const route = useRoute()
    const { getUserProfile } = UserProfile()
    const userData = ref(0)

    watch(
      () => route.params.child_id,
      async newId => {
        // userData.value = await fetchUser(newId)
        userData.value = parseInt(newId)
      }
    )

    const onReserve = (id) => {
      console.log(id, userData.value)
    }
    return {
      getUserProfile,
      onReserve,
      userData
    }
  }
})
</script>
