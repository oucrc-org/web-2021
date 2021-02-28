<template>
	<p class="double-line-button mt-8 transform hover:scale-105 transition duration-500 ease-in-out">
		<img v-if="hasRightArrow" src="@/assets/images/next.png" alt=">">
		<span class="mr-1 tracking-widest">{{ label }}</span>
	</p>
</template>

<script>
export default {
	props: {
		label: {
			type: String,
			default: ''
		},
		hasRightArrow: {
			type: Boolean,
			default: true
		}
	}
}
</script>

<style scoped>
.double-line-button {
	@apply border-double border-4 border-secondary font-semibold inline-block py-2 relative text-secondary w-48
}

.double-line-button > img {
	@apply absolute bottom-0 h-4 mr-2 my-auto right-0 top-0
}
</style>
