<script setup lang="ts">
import GenericButton from '@/components/generics/GenericButton.vue';
import { useNotesToggle } from '@/composables/useNotesToggle';
import { useLabels } from '@/composables/useLabels';

const { toggleShowNotes, isShowNotes } = useNotesToggle();
const { Labels } = useLabels();
</script>

<template>
    <GenericButton @click="toggleShowNotes" height="30px" width="100px">
        {{ isShowNotes ? Labels.HIDE_NOTES : Labels.SHOW_NOTES }}
    </GenericButton>
</template>
