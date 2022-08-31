<template>
    <div class="bars sidebarLeft">
        <template v-for="item in items" :key="item.label">
            <span class="hover:text-purple-700" @click="addTab(item)" :title="item.label"><i class="iconify text-2xl" :data-icon="item.icon" :title="item.label"/></span>
        </template>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { tabberAddTab } from '/@/composables/useNavigation';

import { inject } from 'vue'
const store = inject('useStore')

const title = ref('SidebarLeft');

    const items = ref ([
      
      { label: 'Templates' , icon: 'carbon:volume-file-storage' , component: 'Archive' , context: 'templates' },
      { label: 'New Template' , icon: 'emojione-monotone:new-button' , component: 'Editor' , hasTab: true },
      { label: 'Assets' , icon: 'bx:data' , component : 'Assets' , context: 'assets'},
      { label: 'Builder' , icon: 'ic:round-build-circle'  , component: 'Builder'},
      { label: 'Pages' , icon: 'mdi:web'  , component: 'Pages', context: 'pages' },
      { label: 'UI Kits' , icon: 'mdi:widgets' , component: 'UIKits' },
      { label: 'Directus' , icon: 'simple-icons:directus' , component: 'Directus' }
    ])
    
    const addTab = (component: object) => {
      if ( component.component )
        tabberAddTab ( component )
      if ( component?.status )
        //status[component.status] = !status[component.status]
        store.status.fileexplorer = component.status
      
    }
</script>