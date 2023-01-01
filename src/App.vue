<template>
  <NavBar @on-toggle="toggle" />
  <main v-cloak>
    <FirmDetails v-if="detailsVisible" @on-toggle="toggle" />
    <FirmForm v-else @on-submit="submit" :errors="errors" />
  </main>
</template>

<script setup lang="ts">
import FirmDetails from './components/FirmDetails.vue'
import FirmForm from './components/FirmForm.vue'
import NavBar from './components/NavBar.vue'
import useFirms from '@/Stores/FirmsStore'
import { Firm, FirmValidation } from '@/Models/Firms'
import { ref, onMounted } from 'vue'
let { firm, load, getFirm, postFirm } = useFirms();

onMounted(() => load());

let detailsVisible = ref(false)
async function toggle(id: string | null) {
  if (id != null) {
    await getFirm(id)
    detailsVisible.value = true
  } else {
    firm.value = undefined
    detailsVisible.value = false
  }
}

let errors = ref<FirmValidation>()
async function submit(userForm: Firm) {
  errors.value = undefined;
  errors.value = await postFirm(userForm)
  if (errors.value == undefined) { toggle(userForm.id) }
}
</script>

<style>
[v-cloak] {
  display: none;
}

html, body {
  width: 100%;
  height: auto;
  overflow-x: hidden;
}

@font-face {
  font-family: Gilroy-eb;
  src: url(@/assets/fonts/Gilroy-ExtraBold.otf);
}
@font-face {
  font-family: Gilroy-l;
  src: url(@/assets/fonts/Gilroy-Light.otf);
}

h1, h2 {
  font-family: Gilroy-eb;
  color: white;
}
h3, h4, label, li, input, textarea, p {
  font-family: Gilroy-l;
  color: white;
  font-weight: 400;
}

body {
  margin: 0;
  display: flex;
  justify-content: center;
  overflow-x: hidden;
  background: linear-gradient(90deg,#170954 9%,#312ebd 95%);
}
#app {
  width: 800px;
  height: 100%;
  display: flex;
  margin: 10px 0;
}
main {
  width: 580px;
  margin-left: 20px;
}

@media only screen and (max-width: 850px) {
  #app {
    width: 90%;
    justify-content: center;
  }
  main {   
    width: auto;
    display: flex;
    justify-content: center;
    margin: 40px 0;
  }
}
</style>