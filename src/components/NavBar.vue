<template>
    <ul>
        <li 
            v-for="name in firms" :key="name" 
            v-on:click="$emit('on-toggle', name)"
        >
            {{ name }}
        </li>
        <li v-on:click="$emit('on-toggle')">New firm</li>
    </ul>
</template>

<script setup lang="ts">
import useFirms from '@/Stores/FirmsStore'
let { firms } = useFirms();
</script>
