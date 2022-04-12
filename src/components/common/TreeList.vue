<template>
    <ul>
        <li v-for="item in items">
            {{ item.label }}
        </li>
    </ul>
</template>

<script setup lang="ts">
const props = defineProps({
    items: Array
})
</script>