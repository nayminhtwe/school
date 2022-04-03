<template>
  <q-page>
    <q-dialog v-model="create">
      <q-card>
        <q-card-section>
          <div class="text-h6 row justify-center">Create Child</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row justify-center q-pa-md">
            <q-input
              standout="bg-teal text-white"
              v-model="name"
              label="Name"
            />
          </div>
          <div class="row justify-center">
            <q-input
              standout="bg-teal text-white q-pa-md"
              type="number"
              v-model="age"
              label="Age"
            />
          </div>
          <q-space />
          <div class="row justify-center q-pt-xl">
            <q-btn
              unelevated
              rounded
              color="primary"
              label="Create"
              @click="onCreate"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <div class="q-pa-md">
      <q-table
        title="Treats"
        :rows="getChildren"
        :columns="columns"
        row-key="name"
      >

        <template v-slot:top>
          <div class="col-2 q-table__title">Children</div>

          <q-space />

          <q-btn
            unelevated
            rounded
            size="md"
            color="primary"
            icon="add"
            label="Create"
            @click="create = true"
          />
        </template>

        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th auto-width />
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.label }}
            </q-th>
            <q-th>Action</q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-btn
                size="sm"
                color="accent"
                round
                dense
                @click="props.expand = !props.expand"
                :icon="props.expand ? 'remove' : 'add'"
              />
            </q-td>
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.value }}
            </q-td>
            <q-td class="text-center">
              <q-btn
                class="q-mx-xs"
                unelevated
                rounded
                size="sm"
                color="primary"
                label="Enroll"
                @click="$router.push({ name: 'classes', params: { child_id:props.row.id } })"
              />
              <q-btn
                class="q-mx-xs"
                unelevated
                rounded
                size="sm"
                color="red"
                label="Delete"
                @click="onDelete(props.row)"
              />
            </q-td>
          </q-tr>
          <q-tr
            v-show="props.expand"
            :props="props"
          >
            <q-td colspan="100%">
              <div
                class="row"
                v-for="item in props.row.enrolled"
                :key="item.id"
              >
                <div class="col-6">
                  Course : {{ item.name }}
                </div>
                <div class="col-6">
                  SEATS : {{item.seats}}
                </div>
              </div>
            </q-td>
          </q-tr>
        </template>

      </q-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import UserProfile from '../composables/UserProfile'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ChildrenPage',
  setup () {
    const { getUserProfile } = UserProfile()
    const getChildren = computed(() => store.getters['children/getChildren'])

    const store = useStore()

    const status = computed(() => store.getters['auth/status'])

    const name = ref('')
    const age = ref('')
    const columns = [
      { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
      { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
      { name: 'age', align: 'left', label: 'Age', field: 'age', sortable: true }
    ]

    const create = ref(false)

    onMounted(async () => {
      if (getChildren.value.length === 0) {
        await store.dispatch('children/list')
      }
    })

    const onCreate = async () => {
      const formData = new FormData()
      formData.append('name', name.value)
      formData.append('age', age.value)

      await store.dispatch('children/create', formData)
      if (status.value === 'success') {
        await store.dispatch('children/list')
        create.value = false
      }
    }

    const onDelete = async (child) => {
      const formData = new FormData()
      formData.append('child_id', child.id)
      await store.dispatch('children/delete', formData)
      if (status.value === 'success') {
        await store.dispatch('children/list')
      }
    }
    return {
      getUserProfile,
      getChildren,
      name,
      age,
      columns,
      create,
      onCreate,
      onDelete
    }
  }
})
</script>
