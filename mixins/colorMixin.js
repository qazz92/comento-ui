import { colors } from '@/src/Elements/Core/Colors';

const colorMixin = {
	methods: {
		$_checkIsValidColor(color) {
			if (Object.keys(colors).indexOf(color) !== -1) {
				return true;
			} else {
				console.error('color does not belong to design system color list');
			}
		},
		$_setTextColor(color) {
			if (this.$_checkIsValidColor(color)) {
				return {
					color: this.$_checkIsValidColor(color) ? colors[color] : 'inherit',
				};
			} else {
				console.error('Text Color is not valid');
			}
		},
		$_setBackgroundColor(color) {
			if (this.$_checkIsValidColor(color)) {
				return {
					backgroundColor: colors[color],
				};
			} else {
				console.error('Background Color is not valid');
			}
		},
		$_setBorderColor(color) {
			if (this.$_checkIsValidColor(color)) {
				return {
					borderColor: colors[color],
				};
			} else {
				console.error('Border Color is not valid');
			}
		},
	},
};
export default colorMixin;
