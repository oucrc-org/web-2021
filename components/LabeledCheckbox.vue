<template>
	<div
		class="inline-block p-1 m-1"
		:class="[checked ? 'bg-primary text-highlight' : 'bg-highlight text-primary']">
		<label>
			<input type="checkbox" v-model="checked" class="hidden" :value="value" :name="name">
			{{label}}
		</label>
	</div>
</template>

<script>
export default {
	name: 'LabeledCheckbox',
	data() {
		return {
			checked: false,
		}
	},
	props: {
		label: {
			type: String,
			default: ''
		},
		name: {
			type: String,
			required: true
		},
		value: {
			type: String,
			default: ''
		}
	}
}
</script>

<style scoped>

</style>
