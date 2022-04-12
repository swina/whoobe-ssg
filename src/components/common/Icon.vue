<template>
    <div :class="$attrs.class" class="bg-transparent border-0 w-auto" @click="$emit('click',$event)" :title="$attrs.title">
        <i class="iconify" :data-icon="$attrs.icon"/>
    </div>
</template>