<template>
	<button :class="classes" @click="onClick">
		<img :src="image" :alt="imageAltText" />
		{{ label }}
	</button>
</template>

<script>
import './image-button.less';

export default {
	computed: {
		classes() {
			const list = ['image-button'];

			if (this.imageShadow) {
				list.push('with-shadow');
			}

			return list;
		}
	},
	methods: {
		onClick() {
			this.$emit('click');
		}
	},
	name: 'image-button',
	props: {
		image: String,
		imageAltText: {
			default: '',
			type: String
		},
		imageShadow: {
			default: true,
			type: Boolean
		},
		label: String
	}
};
</script>
