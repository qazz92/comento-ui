<template>
	<div class="c-application c-checkbox">
		<input
			:id="computedId"
			v-model="sync_value"
			type="checkbox"
			:disabled="disabled"
			v-bind="$attrs"
			v-on="$listeners"
		/>
		<label :class="{ disabled }" :for="computedId">
			<Typography :color="computedColor">
				<slot />
			</Typography>
		</label>
	</div>
</template>

<script>
import { colorKeys } from '@/src/Elements/Core/Colors';
import Typography from '@/src/Elements/Core/Typography/Typography';
import uniqueId from '@/utils/unique-id';

export default {
	name: 'Checkbox',
	inheritAttrs: false,
	props: {
		value: {
			type: Boolean,
			default: false,
			validator(value) {
				return typeof value === 'boolean';
			},
		},
		disabled: {
			type: Boolean,
			default: false,
			validator(value) {
				return typeof value === 'boolean';
			},
		},
		id: {
			type: String,
			default: '',
			validator(value) {
				return typeof value === 'string';
			},
		},
		color: {
			type: String,
			default: 'gray500',
			validator(value) {
				const isValid = colorKeys.indexOf(value) !== -1;
				if (!isValid) {
					console.error(`${value} is not a valid name of the typography color`);
				}
				return isValid;
			},
		},
	},
	data() {
		return {
			uid: uniqueId(),
		};
	},
	computed: {
		sync_value: {
			get() {
				return this.value;
			},
			set(val) {
				this.$emit('update:value', val);
			},
		},
		computedId() {
			return this.id || `c-checkbox-${this.uid}`;
		},
		computedColor() {
			return this.disabled ? 'gray300' : this.color;
		},
	},
	components: { Typography },
};
</script>

<style lang="scss" scoped>
.c-checkbox {
	@include flexbox();

	input[type='checkbox'] {
		position: absolute;
		clip: rect(1px, 1px, 1px, 1px);
		padding: 0;
		border: 0;
		height: 1px;
		width: 1px;
		overflow: hidden;

		&:hover:not(:disabled),
		&:focus:not(:disabled) {
			& + label:before {
				background-color: $green000;
				border-color: $green600;
			}
		}

		&:disabled,
		&:disabled + label {
			cursor: not-allowed !important;
			&:active {
				pointer-events: none;
			}
		}
		&:disabled {
			& + label:before {
				background-color: $gray100;
			}
			&:checked + label:before {
				background-color: $gray100;
				border-color: $input-border-color;
				content: '';
				background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18' width='18' height='18' fill='%23D2D5D8'%3E%3Cpath d='M3.75 9.15753L7.5 12.9075L14.25 6.15753L13.1925 5.09253L7.5 10.785L4.8075 8.10003L3.75 9.15753Z'/%3E%3C/svg%3E");
			}
		}

		&:checked:not(:disabled) {
			& + label:before {
				background-color: #fff;
				background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18 18' width='18' height='18' fill='%2300c854'%3E%3Cpath d='M3.75 9.15753L7.5 12.9075L14.25 6.15753L13.1925 5.09253L7.5 10.785L4.8075 8.10003L3.75 9.15753Z'/%3E%3C/svg%3E");
				border-color: $green600;
			}
		}

		& + label {
			display: inline-flex;
			flex-direction: row;
			align-items: center;
			cursor: pointer;
			> div {
				display: inline-block;
			}
			&:before {
				width: 20px;
				height: 20px;
				content: '';
				background-color: $gray000;
				border: 1px solid $input-border-color;
				border-radius: 2px;
				display: inline-block;
				margin-right: 8px;
				box-sizing: border-box;
			}
		}
	}
}
</style>
