<script setup lang="ts">
import TheHeader from '@/components/singletons/TheHeader.vue';
import NotesEditor from '@/components/NotesEditor.vue';
import Timers from '@/components/Timers.vue';
import DisplayDayOfYear from '@/components/DisplayDayOfYear.vue';
import TimersAdder from '@/components/TimersAdder.vue';
import DisplayCalendarWeek from '@/components/DisplayCalendarWeek.vue';
import TimersSum from '@/components/TimersSum.vue';
import { useNotesToggle } from '@/composables/useNotesToggle';

const { isShowNotes } = useNotesToggle();
</script>

<template>
    <TheHeader />
    <div class="wrapper">
        <div class="meta">
            <div>
                <DisplayDayOfYear /> | <DisplayCalendarWeek /> | <TimersSum />
            </div>
            <div>
                <TimersAdder />
            </div>
        </div>

        <Timers />
        <NotesEditor v-show="isShowNotes" />
    </div>
</template>

<style scoped lang="scss">
.wrapper {
    padding: 1rem 6rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: calc(var(--header-height) + 2rem);

    .meta {
        display: flex;
        justify-content: space-between;
        gap: 2rem;
        height: calc(70px + 0.8rem);
        min-width: 636px;

        & > * {
            display: flex;
            place-items: center;
            gap: 1rem;
            color: var(--text-color);
            flex-shrink: 0;
        }
    }
}
</style>
