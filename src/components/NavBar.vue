<template>
    <div :style="style2" class="feedback-background" @click="makeNavVisible"></div>
    <CrudButton v-on:click="makeNavVisible" class="nav-button" :color="'#1f7a8c'" :text="'☰'" />
    <nav :style="style">
        <div class="nav-container">
            <h1>OSALEVAD FIRMAD:</h1>
            <ul>
                <li 
                    v-for="firm1 in firms" :key="firm1.id" 
                    v-on:click="emit('on-toggle', firm1.id); makeNavVisible()"
                    :style="firm1.name == currentFirm?.name ? 'background-color: #ff0063' : ''"
                >
                    {{ firm1.name }}
                </li>
                <li 
                    v-on:click="emit('on-toggle'); makeNavVisible()"
                    :style="currentFirm == undefined ? 'background: #ff0063' : ''"
                >
                    New firm
                </li>
            </ul>
        </div>
    </nav>
</template>

<script setup lang="ts">
import useFirms from '@/Stores/FirmsStore'
import CrudButton from './CrudButton.vue'
import { ref, defineEmits } from 'vue'
const emit = defineEmits(['on-toggle'])
let { currentFirm, firms } = useFirms();

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
    top: 10px;
    position: -webkit-sticky;
    height: auto;
    width: 200px;
    z-index: 1000;
}
.nav-container {
    position: relative;
    height: 100vh;
    padding-left: 10px;
}
.nav-container h1 {
    margin: 0;
}
ul {
    width: auto;
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
    margin: 0;
    z-index: 1100;
}

@media only screen and (max-width: 850px) {
    .nav-button {
        display: block;
    }
    .nav-container h1 {
        padding-top: 50px;
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
        position: absolute;
        overflow-y: scroll;
        top: 115px;
        bottom: 110px;
    }
    ul::-webkit-scrollbar {
        width: 5px;
    }
    ul::-webkit-scrollbar-thumb {
        background: #ff0063;
        border-radius: 5px;
    }
    ul::-webkit-scrollbar-track {
        background: #170954;
    }
}
</style>