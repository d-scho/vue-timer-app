<script setup lang="ts">
import DarkmodeToggle from '@/components/DarkmodeToggle.vue';
import DayOfYearDisplay from '@/components/DayOfYearDisplay.vue';
import CalendarWeekDisplay from '@/components/CalendarWeekDisplay.vue';
</script>

<template>
	<header>
		<div class="header-info">
			<DayOfYearDisplay /> | <CalendarWeekDisplay />
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
	padding: 1rem 2rem;

	.header-info {
		display: flex;
		place-items: center;
		gap: 2rem;
	}
}
</style>