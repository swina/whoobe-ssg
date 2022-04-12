<template>
    <div class="bars sidebarLeft">
        <template v-for="item in items" :key="item.label">
            <span @click="addTab(item)" :title="item.label"><i class="iconify text-2xl" :data-icon="item.icon" :title="item.label"/></span>
        </template>

    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { tabberAddTab , status } from '/@/composables/useNavigation';

    const title = ref('SidebarLeft');

    const items = ref ([
      
      { label: 'Templates' , icon: 'carbon:volume-file-storage' , component: 'Archive'  },
      { label: 'New Template' , icon: 'emojione-monotone:new-button' , component: 'Editor' , hasTab: true },
      { label: 'UI Kits' , icon: 'mdi:widgets' , component: 'UIKits' },
      { label: 'Website' , icon: 'mdi:web'  , component: 'Website' },
      //{ label: 'Svelte' , icon: 'cib:svelte' , component : 'Svelte' },
      { label: 'Settings' , icon: 'carbon:settings-adjust'  , component: 'Settings'}
    ])
    
    const addTab = (component: object) => {
      if ( component.component )
        tabberAddTab ( component )
      if ( component?.status )
        //status[component.status] = !status[component.status]
        status.fileexplorer = component.status
      
    }
</script>