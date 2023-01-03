<template>
    <button :style="'background-color: ' + prop.color"><h3>{{ prop.text }}</h3></button>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
const prop = defineProps<{ text: string, color: string }>();
</script>

<style scoped>
button {
    min-width: 35px;
    height: 35px;
    background-color: none;
    color: #FFFFFF;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    margin: 5px;
}
button:hover {
   filter: brightness(120%);
}
h3 {
   line-height: 35px;
   padding: 0;
   margin: 0;
}
</style>