<template>
	<div class="button">
		<span>{{ label }}</span>
	</div>
</template>

<script>
export default {
	props: ['label']
}
</script>

<style scoped>
.button {
	position: relative;
	border: 4px double black;
	text-align: center;
	transition-duration: 0.3s;
}

.button > span::after {
	position: absolute;
	content: '>';
	right: 0.25rem;
}

.button:hover {
	transition-duration: 0.3s;
	background-color: #eee;
}
</style>
