<script setup lang="ts">
const emit = defineEmits<{
  	(e: 'click'): void
}>();

const props = withDefaults(defineProps<{
	width?: `${string}px`;
	height?: `${string}px`;
}>(), {
	width: '100px',
	height: '30px',
});
</script>

<template>
	<button @click="emit('click')"><slot /></button>
</template>

<style scoped lang="scss">
button {
	height: v-bind('height');
	width: v-bind('width');
	border-radius: 5px;
	cursor: pointer;
	font-weight: bold;
	color: var(--primary-color);
	background-color: var(--secondary-color);
}
</style>