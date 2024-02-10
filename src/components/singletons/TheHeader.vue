<script setup lang="ts">
import TheDarkmodeToggle from '@/components/singletons/TheDarkmodeToggle.vue';
import TheNotesToggle from '@/components/singletons/TheNotesToggle.vue';
import DayOfYearDisplay from '@/components/DayOfYearDisplay.vue';
import CalendarWeekDisplay from '@/components/CalendarWeekDisplay.vue';
import TimerSumDisplay from '@/components/TimerSumDisplay.vue';
</script>

<template>
	<header>
		<div class="header-info">
			<DayOfYearDisplay /> | <CalendarWeekDisplay /> | <TimerSumDisplay />
        </div>
		<div class="header-settings">
			<TheNotesToggle />
			<TheDarkmodeToggle />
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
	background-color: var(--secondary-color);
	z-index: 200;

	.header-info {
		display: flex;
		place-items: center;
		gap: 2rem;
		color: var(--primary-color);
	}

	.header-settings {
		display: flex;
		place-items: center;
		gap: 2rem;
		color: var(--primary-color);
	}
}
</style>