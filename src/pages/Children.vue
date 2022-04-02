<template>
  <q-page>
    <div class="q-pa-md">
      <q-table
        title="Treats"
        :rows="rows"
        :columns="columns"
        row-key="name"
      >

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
          </q-tr>
          <q-tr
            v-show="props.expand"
            :props="props"
          >
            <q-td colspan="100%">
              <div class="text-left">This is expand slot for row above: {{ props.row.name }}.</div>
            </q-td>
          </q-tr>
        </template>

      </q-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import UserProfile from '../composables/UserProfile'

export default defineComponent({
  name: 'ChildrenPage',
  setup () {
    const { getUserProfile } = UserProfile()
    const columns = [
      { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: true },
      { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
      { name: 'age', align: 'left', label: 'Age', field: 'age', sortable: true }
    ]

    const rows = [
      {
        id: 1,
        name: 'kyaw kyaw',
        age: 5,
        enrolled: []
      },
      {
        id: 2,
        name: 'mg mg',
        age: 3,
        enrolled: []
      },
      {
        id: 3,
        name: 'ag ag',
        age: 8,
        enrolled: []
      }
    ]
    return {
      getUserProfile,
      columns,
      rows
    }
  }
})
</script>
