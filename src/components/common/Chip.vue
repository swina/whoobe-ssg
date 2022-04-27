<template>
    <span :class="$attrs.css" class="px-2 py-1 rounded bg-blue-400 text-white flex font-mono text-xs cursor-pointer"><slot></slot><slot name="icon"></slot></span>
</template>