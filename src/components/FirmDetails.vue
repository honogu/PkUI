<template>
  <div v-if="!editVisible && !deleteVisible">
    <div class="images">
      <img 
        :src="urlApi + 'firms/' + firm?.name + '/image/' + (new Date()).toISOString()"
        @load="loading = false" 
        alt="logo" 
      />
      <img v-if="loading"
        :src="require('@/assets/placeholder.png')"
        alt="placeholder" 
      />
    </div>
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
    <label for="key">Key:</label>
    <input name="key" v-model="key" type="text">
    <p>{{ errors?.title }}</p>
    <button v-on:click="submitDelete">👍</button>
    <button v-on:click="toggleDetails">👎</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits, watch } from 'vue'
import useFirms from '@/Stores/FirmsStore'
import { Firm, FirmValidation } from '@/Models/Firms'
import FirmForm from './FirmForm.vue'
let { urlApi, firm, load, updateFirm, deleteFirm } = useFirms()
const emit = defineEmits(['on-toggle'])

onMounted(() => load());

let editVisible = ref(false)
let deleteVisible = ref(false)
function toggleDetails() { editVisible.value = false; deleteVisible.value = false }
function toggleEdit() { editVisible.value = true; deleteVisible.value = false }
function toggleDelete() { editVisible.value = false; deleteVisible.value = true }

watch(firm, reload)

let loading = ref(true)
function reload() {
  toggleDetails()
  loading.value = true
}

let errors = ref<FirmValidation>()
async function submitUpdate(formFirm: Firm) {
  errors.value = undefined
  errors.value = await updateFirm(formFirm, firm.value?.name ?? '')
  if (errors.value == undefined) { toggleDetails() }
}

let key = ref<string>()
async function submitDelete() {
  errors.value = undefined
  errors.value = await deleteFirm(firm.value?.name ?? '', key.value ?? '')
  if (errors.value == undefined) { emit('on-toggle') }
}
</script>

<style scoped>
.images {
  height: 100px;
}
.images img {
  position: absolute;
  height: 100px;
}
</style>