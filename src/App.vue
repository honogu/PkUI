<template>
  <NavBar @on-toggle="toggle"/>
  <FirmDetails v-if="detailsVisible" @on-toggle="toggle"/>
  <FirmForm v-else @on-submit="submit" :errors="errors"/>
</template>

<script setup lang="ts">
import FirmDetails from './components/FirmDetails.vue'
import FirmForm from './components/FirmForm.vue'
import NavBar from './components/NavBar.vue'
import useFirms from '@/Stores/FirmsStore'
import { Firm, FirmValidation } from '@/Models/Firms'
import { ref, onMounted } from 'vue'
let { load, getFirm, postFirm } = useFirms();

onMounted(() => load());

let detailsVisible = ref(false)
async function toggle(name: string | null) {
  if (name != null) {
    await getFirm(name)
    detailsVisible.value = true
  } else {
    detailsVisible.value = false
  }
}

let errors = ref<FirmValidation>()
async function submit(userForm: Firm) {
  errors.value = undefined;
  errors.value = await postFirm(userForm)
  if (errors.value == undefined) { toggle(userForm.name) }
}
</script>
