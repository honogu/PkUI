<template>
  <div v-if="!editVisible && !deleteVisible">
    <div class="button-container">
      <CrudButton v-on:click="toggleEdit" :color="'#1f7a8c'" :text="'✏️'" />
      <CrudButton v-on:click="toggleDelete" :color="'#AE1F1F'" :text="'🗑️'" />
    </div>
    <div class="image-container">
      <img 
        :src="urlApi + 'firms/' + firm?.name + '/image/' + (new Date()).toISOString()"
        :style="loading ? 'visibility: hidden; width: 0;' : ''"
        @load="loading = false" 
        alt="logo" 
      />
      <img v-if="loading"
        :src="require('@/assets/placeholder.png')"
        alt="placeholder"
      />
    </div>
    <h4>
      {{ firm?.estonianDescription }}
    </h4>
    <hr />
    <h4>
      {{ firm?.englishDescription }}
    </h4>
  </div>

  <div v-else-if="editVisible">
    <div class="buttons">
      <h1>Edit "{{ firm?.name }}" ✏️</h1>
      <CrudButton v-on:click="toggleDetails" :color="'red'" :text="'❌'" />
    </div>
    <FirmForm @on-submit="submitUpdate" :firm="firm" :errors="errors" />
  </div>

  <div class="delete-container" v-else>
    <h1>Delete "{{ firm?.name }}" 🗑️</h1>
    <div class="image-container">
      <img 
        :src="urlApi + 'firms/' + firm?.name + '/image/' + (new Date()).toISOString()"
        :style="loading ? 'visibility: hidden; width: 0;' : ''"
        @load="loading = false" 
        alt="logo" 
      />
      <img v-if="loading"
        :src="require('@/assets/placeholder.png')"
        alt="placeholder"
      />
    </div>
    <label for="key">Key:</label>
    <input 
      :class="errors?.title != undefined ? 'error' : ''" 
      name="key" 
      v-model="key" 
      type="text"
    >
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
.image-container {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  aspect-ratio: 3.5/1;
  border: solid 1px #FFFFFF;
  background-color: #FFFFFF;
  border-radius: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
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
  font-size: 19px;
  text-align: left;
  text-overflow: ellipsis;
  white-space: pre-wrap;
}
.buttons {
  display: flex;
  justify-content: start;
  align-items: center;
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
}
.error {
  border: 3px solid red;
}
input:focus {
  outline: none;
  border: 3px solid #ff0063;
}
input:hover {
  outline: none;
  border: 3px solid #ff0063;
}

@media only screen and (max-width: 850px) {
  .button-container {
    display: flex;
    justify-content: right;
  }
}
</style>