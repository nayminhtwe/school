<template>
  <q-page>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card
        class="my-card"
        flat
        bordered
        v-for="item in getClasses"
        :key="item.id"
      >
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="text-h5 q-mt-sm q-mb-xs">{{ item.name }}</div>
            <div class="text-caption text-grey">
              {{ item.description }}
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
            Seats : {{ item.seats }}
          </q-btn>
          <q-btn
            flat
            color="primary"
            @click="onReserve(item.id)"
            v-if="item.enrolled"
          >
            Unenroll
          </q-btn>
          <q-btn
            flat
            color="primary"
            @click="onReserve(item.id)"
            v-else-if="item.seats < 4"
          >
            Enroll
          </q-btn>
          <q-btn
            flat
            color="primary"
            disabled
            v-else
          >
            Full
          </q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { useRoute } from 'vue-router'
import { defineComponent, watch, computed, onMounted } from 'vue'
import UserProfile from '../composables/UserProfile'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ClassesPage',
  setup () {
    const route = useRoute()
    const store = useStore()
    const { getUserProfile } = UserProfile()
    const status = computed(() => store.getters['classes/status'])
    const getClasses = computed(() => store.getters['classes/getClasses'])
    const userData = computed(() => route.params.child_id)

    watch(
      () => route.params.child_id,
      async newId => {
        if (newId) {
          userData.value = parseInt(newId)
          const formData = new FormData()
          formData.append('child_id', userData.value)
          await store.dispatch('classes/list', formData)
        }
      }
    )

    onMounted(async () => {
      if (getClasses.value.length === 0) {
        const formData = new FormData()
        formData.append('child_id', userData.value)
        await store.dispatch('classes/list', formData)
      }
    })

    const onReserve = async (id) => {
      const formData = new FormData()
      formData.append('child_id', userData.value)
      formData.append('class_id', id)
      await store.dispatch('classes/enroll', formData)
      if (status.value === 'success') {
        const formData = new FormData()
        formData.append('child_id', userData.value)
        await store.dispatch('classes/list', formData)
      }
    }
    return {
      getUserProfile,
      getClasses,
      onReserve,
      userData
    }
  }
})
</script>
