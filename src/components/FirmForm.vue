<template>
  <form @submit.prevent="emit('on-submit', formFirm)">
    <label for="name">Name</label>
    <input 
      :class="errors?.Name != undefined ? 'error' : ''" 
      name="name" 
      v-model="formFirm.name" 
      type="text"
    >
    <h4 v-for="error in errors?.Name" :key="error">⚠️{{ error }}</h4>
    <label for="image">Image</label>
    <div class="image-upload-container">
      <label for="file-upload" class="custom-file-upload">
          <input id="file-upload" name="image" type="file" v-on:change="(e) => onChange(e)">
          Upload 📁
      </label>
      <p>{{formFirm.image.name ?? 'No file chosen'}}</p>
    </div>
    <div
      :class="errors?.Image != undefined ? 'image-container error' : 'image-container'"
    >
      <img 
        v-if="imageSrc != undefined" 
        :src="imageSrc" 
        alt="Firms logo" 
      />
      <img 
        v-else-if="prop.firm?.name != undefined" 
        :src="urlApi + 'firms/' + prop.firm?.name + '/image/' + (new Date()).toISOString()" 
        alt="Firms logo" 
      />
      <img v-else
        :src="require('@/assets/placeholder.png')"
        alt="placeholder" 
      />
    </div>
    <h4 v-for="error in errors?.Image" :key="error">⚠️{{ error }}</h4>
    <label for="estonianDescription">Estonian description</label>
    <textarea 
      :class="errors?.EstonianDescription != undefined ? 'error' : ''"  
      name="estonianDescription" 
      cols="40" 
      rows="8" 
      v-model="formFirm.estonianDescription"
    ></textarea>
    <h4 v-for="error in errors?.EstonianDescription" :key="error">⚠️{{ error }}</h4>
    <label for="englishDescription">English description</label>
    <textarea
      :class="errors?.EnglishDescription != undefined ? 'error' : ''" 
      name="englishDescription" 
      cols="40" 
      rows="8" 
      v-model="formFirm.englishDescription"
    ></textarea>
    <h4 v-for="error in errors?.EnglishDescription" :key="error">⚠️{{ error }}</h4>
    <label for="key">Key</label>
    <input
      :class="errors?.title != undefined ? 'error' : ''" 
      name="key" 
      v-model="formFirm.key" 
      type="text"
    >
    <h4>{{ errors?.title != undefined ? '⚠️' + errors?.title : '' }}</h4>
    <CrudButton type="submit" :color="'green'" :text="'Salvesta ✔️'" />
  </form>
</template>

<script setup lang="ts">
import { ref, Ref, defineProps, defineEmits, onMounted } from 'vue'
import { Firm, FirmValidation } from '@/Models/Firms'
import useFirms from '@/Stores/FirmsStore'
import CrudButton from './CrudButton.vue'
let { urlApi, load } = useFirms();
const emit = defineEmits<{ (e: 'on-submit', formFirm: Firm): void }>()
const prop = defineProps<{ firm?: Firm, errors?: FirmValidation }>();
const formFirm: Ref<Firm> = ref({
  name: prop.firm?.name ?? '',
  image: prop.firm?.image ?? '',
  englishDescription: prop.firm?.englishDescription ?? '',
  estonianDescription: prop.firm?.estonianDescription ?? '',
  key: ''
});

onMounted(() => load());

let imageSrc = ref<string>()
function onChange(e: any) {
  var files = e.target.files || e.dataTransfer.files
  if (!files.length) return
  createImage(files[0])
}
function createImage(file: any) {
  var reader = new FileReader()
  reader.onload = (e) => {
    if (e.target != null) 
    { 
      formFirm.value.image = file
      imageSrc.value = URL.createObjectURL(file)
    }
  }
  reader.readAsDataURL(file)
}
</script>

<style scoped>
form {
  border-radius: 10px;
  background: none;
  width: 500px;
  height: auto;
  display: flex;
  flex-direction: column;
  color: #FFFFFF;
}
.image-container {
  width: 100%;
  max-width: 300px;
  margin: 0 0 5px 0;
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
label {
  font-weight: 1000;
  margin: 15px 0 5px 0;
}
input, textarea {
  border: 3px solid transparent;
  color: #000000;
  border-radius: 5px;
  transition: 0.25s;
  font-weight: 1000;
  outline: none;
}
textarea {
  resize: none;
}
textarea::-webkit-scrollbar {
    width: 5px;
    height: 7px;
}
textarea::-webkit-scrollbar-thumb {
    background: #ff0063;
    border-radius: 5px;
}
input {
  padding: 2px 5px;
  height: 30px;
}
.error {
  border: 3px solid red;
}
.error:not(.image-container) {
  background-color: #ffe9e9;
}
input:focus:not(.error), textarea:focus:not(.error) {
  border: 3px solid #c3c3c3;
}
input:hover:not(.error), textarea:hover:not(.error) {
  border: 3px solid #c3c3c3;
}
.image-upload-container {
  display: flex;
  align-items: center;
}
input[type="file"] {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  border: 0;
}
.custom-file-upload {
  height: 35px;
  width: 85px;
  padding: 0 5px;
  line-height: 35px;
  display: inline-block;
  background-color: #ff0063;
  border-radius: 3px;
  cursor: pointer;
  margin: 0 5px 0 0;
}
.custom-file-upload:hover {
  filter: brightness(120%);
}
h4 {
  color: #ff5959;
  font-weight: 1000;
  margin: 5px 0 10px 0;
  padding: 0;
}
</style>
