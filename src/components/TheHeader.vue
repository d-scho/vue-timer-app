<script setup lang="ts">
import DarkmodeToggle from '@/components/DarkmodeToggle.vue';
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

	.header-info {
		display: flex;
		place-items: center;
		gap: 2rem;
		color: var(--primary-color);
	}
}
</style>