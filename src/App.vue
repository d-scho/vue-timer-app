<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue';
import NotesEditor from '@/components/NotesEditor.vue';
import Timers from '@/components/Timers.vue';
</script>

<template>
    <TheHeader />
    <div class="wrapper" >
        <Timers />
        <NotesEditor />
    </div>
</template>

<style lang="scss">
  .wrapper {
	padding: 10px;
  }
</style>