<template>
    <div class="flex flex-col p-4 bg-white">
        <label class="text-xs mt-2">Analytics</label>
        <input type="text" v-model="store.project.data.analytics" placeholder="GA-xxxxx"/>
    </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
const store = inject('useStore')

</script>