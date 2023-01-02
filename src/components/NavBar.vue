<template>
    <div :style="style2" class="feedback-background" @click="makeNavVisible"></div>
    <CrudButton v-on:click="makeNavVisible" class="nav-button" :color="'#1f7a8c'" :text="'☰'" />
    <nav :style="style">
        <ul>
            <h1>OSALEVAD FIRMAD:</h1>
            <li 
                v-for="firm1 in firms" :key="firm1.id" 
                v-on:click="emit('on-toggle', firm1.id); makeNavVisible()"
                :style="firm1.name == firm?.name ? 'background-color: #ff0063' : ''"
            >
                {{ firm1.name }}
            </li>
            <li 
                v-on:click="emit('on-toggle'); makeNavVisible()"
                :style="firm == undefined ? 'background: #ff0063' : ''"
            >
                New firm
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import useFirms from '@/Stores/FirmsStore'
import CrudButton from './CrudButton.vue'
import { ref, defineEmits } from 'vue'
const emit = defineEmits(['on-toggle'])
let { firm, firms } = useFirms();

let style = ref<string>();
let style2 = ref<string>();
let status = ref(false);

function makeNavVisible() 
{
    if (window.innerWidth <= 850) {
        status.value = !status.value
        if (status.value)
        {
            style.value = "left: 0;"
            style2.value = "display: block;"
        } else {
            style.value = ''
            style2.value = ''
        }
    }
}
addEventListener("resize", () => {''});
onresize = () => {
    if (window.innerWidth > 850) {
        status.value = false;
        style.value = ''
        style2.value = ''
    }
};
</script>

<style scoped>
.feedback-background {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 150%;
    z-index: 300;
    background-color: rgba(0, 0, 0, 0.478);
    overflow-y: hidden;
}
nav {
    position: sticky;
    position: -webkit-sticky;
    top: 10px;
    height: 100%;
    width: 200px;
    z-index: 1000;
}
ul {
    top: 8px;
    width: auto;
    height: min-content;
    list-style-type: none;
    padding: 0;
    margin: 0;
}
li {
    line-height: 25px;
    cursor: pointer;
}
li:hover {
    background-color: #ff0063;
}
.nav-button {
    display: none;
    position: fixed;
    left: 10px;
    margin: 10px;
    z-index: 1100;
}

@media only screen and (max-width: 850px) {
    .nav-button {
        display: block;
    }
    nav {
        position: fixed;
        background: linear-gradient(90deg,#170954 9%,#312ebd 95%);
        top: 0;
        left: -200px;
        transition: left 0.2s;
        height: 150%;
        overflow-y: hidden;
    }
    ul {
        padding-left: 10px;
        margin-top: 80px;
    }
}
</style>