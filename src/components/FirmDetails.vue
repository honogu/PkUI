<template>
  <div v-if="detailsVisible">
    <div class="button-container">
      <CrudButton v-on:click="toggleEdit" :color="'#1f7a8c'" :text="'✏️'" />
      <CrudButton v-on:click="toggleDelete" :color="'#AE1F1F'" :text="'🗑️'" />
    </div>
  </div>
  <div class="delete-container" v-if="deleteVisible">
    <h1>Delete "{{ currentFirm?.name }}" 🗑️</h1>
  </div>

  <div :class="detailsVisible ? 'image-container middle' : 'image-container'" v-if="!editVisible">
    <img 
      :src="urlApi + 'firms/' + currentFirm?.id + '/image/' + (new Date()).toISOString()"
      :style="loading ? 'visibility: hidden; width: 0;' : ''"
      @load="loading = false" 
      alt="logo" 
    />
    <img v-if="loading"
      :src="require('@/assets/placeholder.png')"
      alt="placeholder"
    />
  </div>

  <div v-if="detailsVisible">
    <h4>
      {{ currentFirm?.estonianDescription }}
    </h4>
    <hr />
    <h4>
      {{ currentFirm?.englishDescription }}
    </h4>
  </div>
  <div v-else-if="editVisible">
    <div class="buttons">
      <h1>Edit "{{ currentFirm?.name }}" ✏️</h1>
      <CrudButton v-on:click="{ toggleDetails(); loading = true }" :color="'red'" :text="'❌'" />
    </div>
    <FirmForm @on-submit="submitUpdate" :firm="currentFirm" :errors="errors" />
  </div>
  <div class="delete-container" v-else>
    <label for="key">Key:</label>
    <input 
      :class="errors?.title != undefined ? 'error' : ''" 
      name="key" 
      v-model="key" 
      :type="passwordVisibility ? 'text' : 'password'"
    >
    <CrudButton class="password-button" v-on:click="togglePassword" :color="'#1f7a8c'" :text="passwordVisibility ? '😀' : '😄'" />
    <p>{{ errors?.title != undefined ? '⚠️' + errors?.title : '' }}</p>
    <div class="buttons">
      <CrudButton v-on:click="submitDelete" :color="'green'" :text="'✔️'" />
      <CrudButton v-on:click="toggleDetails" :color="'red'" :text="'❌'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineEmits, watch } from 'vue'
import { Firm, FirmValidation } from '@/Models/Firms'
import useFirms from '@/Stores/FirmsStore'
import CrudButton from './CrudButton.vue'
import FirmForm from './FirmForm.vue'
let { urlApi, apiKey, currentFirm, load, updateFirm, deleteFirm } = useFirms()
const emit = defineEmits(['on-toggle'])

onMounted(() => load());

let passwordVisibility = ref(false)
let loading = ref(true)
let editVisible = ref(false)
let deleteVisible = ref(false)
let detailsVisible = ref(true)
function toggleDetails() { detailsVisible.value = true; editVisible.value = false; deleteVisible.value = false }
function toggleEdit() { detailsVisible.value = false; editVisible.value = true; deleteVisible.value = false }
function toggleDelete() { detailsVisible.value = false; editVisible.value = false; deleteVisible.value = true }
function togglePassword() { passwordVisibility.value = !passwordVisibility.value }

watch(currentFirm, toggle)
function toggle() {loading.value = true; toggleDetails() }

let errors = ref<FirmValidation>()
async function submitUpdate(formFirm: Firm) {
  errors.value = undefined
  errors.value = await updateFirm(formFirm, currentFirm.value?.id ?? '')
  if (errors.value == undefined) { toggleDetails() }
}

let key = ref(apiKey)
async function submitDelete() {
  errors.value = undefined
  errors.value = await deleteFirm(currentFirm.value?.id ?? '', key.value ?? '')
  if (errors.value == undefined) { emit('on-toggle') }
}
</script>

<style scoped>
.image-container {
  align-items: center;
  aspect-ratio: 3.5/1;
  background-color: #fff;
  border: solid;
  border-bottom-color: #fff;
  border-left: 15px solid #fff;
  border-radius: 7px;
  border-right: 15px solid #fff;
  border-top-color: #fff;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  max-width: 270px;
  width: 100%;
}
.middle {
  margin: 0 auto;
}
.image-container img {
  height: auto;
  max-width: 100%;
  max-height: 100%;
}
.delete-container .image-container {
  margin: 0 0 5px 0;
}
h4 {
  word-wrap: break-word;
  padding-left: 2px;
  padding-right: 2px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: pre-wrap;
  font-size: 17px;
  line-height: 1.5em;
}
p {
  color: #ff5959;
  font-weight: 1000;
  margin: 5px 0 10px 0;
  padding: 0;
}
.button-container {
  display: flex;
  justify-content: right;
}
.buttons {
  display: flex;
  justify-content: start;
  align-items: center;
}
.password-button {
  position: absolute;
  margin-top: 2.5px;
  margin-left: -37px;
}
label {
  display: block;
  padding-bottom: 5px;
}
input {
  padding: 2px 5px;
  height: 30px;
  width: 286px;
  border: 3px solid transparent;
  color: #000000;
  border-radius: 5px;
  transition: 0.25s;
  font-weight: 1000;
  outline: none;
}
.error {
  border: 3px solid red;
}
input:focus:not(.error) {
  border: 3px solid #c3c3c3;
}
input:hover:not(.error) {
  border: 3px solid #c3c3c3;
}

@media only screen and (max-width: 850px) {
  h4 {
    font-size: 14px;
  }
  .middle {
    aspect-ratio: 3.5/1;
    max-width: 250px;
    width: 80%;
  }
}
</style>