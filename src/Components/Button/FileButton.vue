<template>
	<NarrowButton size="medium" @click="$emit('clickFileButton')">
		<template v-slot:left-icon>
			<Icon name="IconPlusMediumLine" color="gray600"></Icon>
		</template>
		{{ text }}
	</NarrowButton>
</template>

<script>
import NarrowButton from '@/src/Components/Button/NarrowButton';
import Icon from '@/src/Elements/Core/Icon/Icon';
import customValidator from '@/utils/custom-validator.js';
export default {
	name: 'FileButton',
	props: {
		text: {
			type: String,
			default: '파일 첨부하기',
			validator(value) {
				return customValidator(value, typeof value === 'string', 'FileButton', 'text');
			},
		},
	},
	components: {
		NarrowButton,
		Icon,
	},
};
</script>

<style lang="scss" scoped></style>
