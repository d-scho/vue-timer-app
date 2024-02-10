<script setup lang="ts">
import TimersAdder from '@/components/TimersAdder.vue';
import DarkmodeToggle from '@/components/DarkmodeToggle.vue';
import NotesToggle from '@/components/NotesToggle.vue';
import DisplayDayOfYear from '@/components/DisplayDayOfYear.vue';
import DisplayCalendarWeek from '@/components/DisplayCalendarWeek.vue';
import TimersSum from '@/components/TimersSum.vue';
</script>

<template>
	<header>
		<div class="header-info">
			<DisplayDayOfYear /> | <DisplayCalendarWeek /> | <TimersSum />
        </div>
		<div class="header-settings">
			<TimersAdder />
			<NotesToggle />
			<DarkmodeToggle />
		</div>
	</header>
</template>

<style scoped lang="scss">
header {
	display: flex;
	justify-content: space-between;
	gap: 2rem;
	margin-bottom: 2px;
	box-shadow: 0px 0px 5px gray;
	padding: 1rem 7rem;
	position: fixed;
	width: 100%;
	height: var(--header-height);
	background-color: var(--bg-color);
	z-index: 200;

	& > * {
		display: flex;
		place-items: center;
		gap: 1rem;
		color: var(--text-color);
		flex-shrink: 0;
	}
}
</style>