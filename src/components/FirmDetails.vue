<template>
  <div v-if="!editVisible && !deleteVisible">
    <img :src="'firms/' + firm?.name + '/image/' + (new Date()).toISOString()" alt="logo" />
    <p>
      {{ firm?.name }}
      {{ firm?.englishDescription }}
      {{ firm?.estonianDescription }}
    </p>
    <button v-on:click="toggleEdit">✏️</button>
    <button v-on:click="toggleDelete">❌</button>
  </div>

  <div v-else-if="editVisible">
    <h1>✏️</h1>
    <FirmForm @on-submit="submitUpdate" :firm="firm" :errors="errors" />
    <button v-on:click="toggleDetails">👎</button>
  </div>

  <div v-else>
    <h1>❌</h1>
    <button v-on:click="submitDelete">👍</button>
    <button v-on:click="toggleDetails">👎</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits, watch } from 'vue'
import useFirms from '@/Stores/FirmsStore'
import { Firm, FirmValidation } from '@/Models/Firms'
import FirmForm from './FirmForm.vue'
let { firm, load, updateFirm, deleteFirm } = useFirms()
const emit = defineEmits(['on-toggle'])

onMounted(() => load());

let editVisible = ref(false)
let deleteVisible = ref(false)
function toggleDetails() { editVisible.value = false; deleteVisible.value = false }
function toggleEdit() { editVisible.value = true; deleteVisible.value = false }
function toggleDelete() { editVisible.value = false; deleteVisible.value = true }

watch(firm, toggleDetails)

let errors = ref<FirmValidation>()
async function submitUpdate(formFirm: Firm) {
  errors.value = undefined
  errors.value = await updateFirm(formFirm, firm.value?.name ?? '')
  if (errors.value == undefined) { toggleDetails() }
}

async function submitDelete() {
  await deleteFirm(firm.value?.name ?? '');
  emit('on-toggle')
}
</script>
