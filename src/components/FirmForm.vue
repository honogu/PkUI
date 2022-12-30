<template>
  <form @submit.prevent="emit('on-submit', formFirm)">
    <label for="name">Name:</label>
    <input name="name" v-model="formFirm.name" type="text">
    <p v-for="error in errors?.Name" :key="error">{{ error }}</p>
    <label for="image">Image:</label>
    <input name="image" type="file" v-on:change="(e) => onChange(e)">
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
    <p v-for="error in errors?.Image" :key="error">{{ error }}</p>
    <label for="englishDescription">English description:</label>
    <input name="englishDescription" v-model="formFirm.englishDescription" type="text">
    <p v-for="error in errors?.EnglishDescription" :key="error">{{ error }}</p>
    <label for="estonianDescription">Estonian description:</label>
    <input name="estonianDescription" v-model="formFirm.estonianDescription" type="text">
    <p v-for="error in errors?.EstonianDescription" :key="error">{{ error }}</p>
    <label for="key">Key:</label>
    <input name="key" v-model="formFirm.key" type="text">
    <button type="submit">SALVESTA</button>
  </form>
</template>

<script setup lang="ts">
import { ref, Ref, defineProps, defineEmits, onMounted } from 'vue'
import { Firm, FirmValidation } from '@/Models/Firms'
import useFirms from '@/Stores/FirmsStore'
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
  background: #ff0063;
  width: 500px;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 50px;
  color: #FFFFFF;
}
</style>
