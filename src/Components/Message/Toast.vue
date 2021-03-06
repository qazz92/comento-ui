<template>
	<transition name="slide-fade">
		<aside v-if="sync_show" class="c-application c-toast" :class="[computedType, computedPosition]">
			<Icon v-if="icon" class="c-toast--icon" :name="icon" :color="toastItemColor" />
			<Typography class="c-toast--message" element="p" type="body2" :color="toastItemColor">
				{{ message }}
			</Typography>
			<div v-if="$slots['button']" class="c-toast--button">
				<slot name="button" />
			</div>
		</aside>
	</transition>
</template>

<script>
import Typography from '@/src/Elements/Core/Typography/Typography';
import Icon, { IconNames } from '../../Elements/Core/Icon/Icon';
import customValidator from '@/utils/custom-validator.js';

export const toastTypes = ['basic', 'error', 'success'];
export const toastPositions = ['top', 'bottom'];

export default {
	name: 'Toast',
	props: {
		show: {
			type: Boolean,
			default: false,
		},
		message: {
			type: String,
			default: '',
			required: true,
		},
		type: {
			type: String,
			default: 'basic',
			validator(value) {
				const isValid = toastTypes.indexOf(value) !== -1;
				return customValidator(value, isValid, 'Toast', 'type');
			},
		},
		timeout: {
			type: Number,
			default: 3000,
		},
		position: {
			type: String,
			default: 'bottom',
			validator(value) {
				const isValid = toastPositions.indexOf(value) !== -1;
				return customValidator(value, isValid, 'Toast', 'position');
			},
		},
		icon: {
			type: String,
			default: null,
			validator(value) {
				const isValid = IconNames.indexOf(value) !== -1;
				return customValidator(value, isValid, 'Toast', 'icon');
			},
		},
	},
	data() {
		return {
			toastItemColor: 'white',
		};
	},
	computed: {
		sync_show: {
			get() {
				return this.show;
			},
		},
		computedType() {
			return this.type;
		},
		computedPosition() {
			return `position-${this.position}`;
		},
	},
	watch: {
		show() {
			this.show && this.handleShow();
		},
	},
	methods: {
		handleShow() {
			this.$nextTick(() => {
				setTimeout(() => {
					this.$emit('update:show', false);
				}, this.timeout);
			});
		},
	},
	components: {
		Icon,
		Typography,
	},
};
</script>

<style lang="scss" scoped>
.c-toast {
	position: fixed;
	bottom: 16px;
	left: 50%;
	@include transform(translate(-50%));
	padding: 14px 16px;
	text-align: center;
	z-index: 9999;
	@include border-radius(4px);
	@include shadow4();
	display: table; // width: fit-content 대체
	max-width: 90%;
	@include flexbox();
	@include flex-direction(row);
	@include align-items(center);

	&--message {
		margin: 0;
		@include flexbox();
		@include align-items(center);
	}

	&--icon {
		@include flexbox();
		margin-right: 4px;
	}

	&--button {
		@include flexbox();
	}

	&.basic {
		background: $gray850;
		color: $white;
	}
	&.error {
		background: $red600;
		color: $white;
	}
	&.success {
		background: $blue600;
		color: $white;
	}

	@include pc {
		bottom: 50px;
	}

	&.position-top {
		top: 32px;
		bottom: auto;

		@include pc {
			top: 100px;
		}
	}
}

.slide-fade-enter-active,
.slide-fade-leave-active {
	@include transition(all 0.3s ease-in-out);
	position: fixed;
}

.slide-fade-enter,
.slide-fade-leave-to {
	opacity: 0;
	@include transform(translate(-50%, 10px));
	&.position-top {
		@include transform(translate(-50%, -20px));
	}
}
</style>
