<script lang="ts">
/**
 * @component MeButton
 * @description Botão com suporte a variantes, ícones e estados
 */
import { defineComponent, computed, PropType } from 'vue'
import { ButtonVariant } from '../../utils/enums/Enums'

export interface MeButtonProps {
  label?: string
  icon?: string
  disabled?: boolean
  iconColor?: string
  borderColor?: string
  labelColor?: string
  variant?: `${ButtonVariant}`
  outlined?: boolean
  flat?: boolean
  custom?: boolean
  active?: boolean
  activeYellow?: boolean
  activePink?: boolean
  activeIconOutlined?: boolean
  tooltipText?: string
  iconPosition?: 'left' | 'right' | 'top' | 'bottom'
  notificationDot?: boolean
}

export default defineComponent({
  name: 'MeButton',

  props: {
    label: {
      type: String as PropType<string>,
      default: undefined
    },
    icon: {
      type: String as PropType<string>,
      default: undefined
    },
    disabled: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    iconColor: {
      type: String as PropType<string>,
      default: undefined
    },
    borderColor: {
      type: String as PropType<string>,
      default: undefined
    },
    labelColor: {
      type: String as PropType<string>,
      default: undefined
    },
    variant: {
      type: String as PropType<`${ButtonVariant}`>,
      default: ButtonVariant.BLUE
    },
    outlined: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    flat: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    custom: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    active: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    activeYellow: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    activePink: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    activeIconOutlined: {
      type: Boolean as PropType<boolean>,
      default: false
    },
    tooltipText: {
      type: String as PropType<string>,
      default: undefined
    },
    iconPosition: {
      type: String as PropType<'left' | 'right' | 'top' | 'bottom'>,
      default: 'left'
    },
    notificationDot: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  emits: ['click'],

  setup(props, { emit }) {
    const buttonClasses = computed(() => ({
      'default-style': !props.outlined && !props.flat && !props.custom,
      'outlined-style': props.outlined && !props.custom,
      'flat-style': props.flat && !props.custom,
      'custom-style': props.custom,
      'active-blue-style': props.active,
      'active-pink-style': props.activePink,
      'active-yellow-style': props.activeYellow,
      [props.variant]: true
    }))

    const buttonStyles = computed(() => ({
      'border-color': props.custom ? props.borderColor : undefined,
      'color': props.custom ? props.labelColor : undefined
    }))

    const showIcon = computed(() => {
      return !!props.icon && !props.active && !props.activePink && !props.activeYellow && !props.custom
    })

    const showActiveIcon = computed(() => {
      return !!props.icon && (props.active || props.activePink || props.activeYellow) && !props.activeIconOutlined
    })

    const showActiveIconOutlined = computed(() => {
      return !!props.icon && (props.active || props.activePink || props.activeYellow) && props.activeIconOutlined
    })

    const showCustomIcon = computed(() => {
      return !!props.icon && props.custom && !props.active && !props.activePink && !props.activeYellow
    })

    function handleClick(event: MouseEvent) {
      if (!props.disabled) {
        emit('click', event)
      }
    }

    return {
      buttonClasses,
      buttonStyles,
      showIcon,
      showActiveIcon,
      showActiveIconOutlined,
      showCustomIcon,
      handleClick
    }
  }
})
</script>

<template>
  <button
    :class="['base-btn', buttonClasses, `me-button-icon-${iconPosition}`]"
    :style="buttonStyles"
    :disabled="disabled"
    :title="tooltipText"
    @click="handleClick"
  >
    <span v-if="showIcon || showActiveIconOutlined" class="material-icons-outlined base-btn-icon">
      {{ icon }}
    </span>
    <span v-if="showActiveIcon" class="material-icons base-btn-icon">
      {{ icon }}
    </span>
    <span
      v-if="showCustomIcon"
      class="material-icons-outlined base-btn-icon-custom"
      :style="{ color: iconColor }"
    >
      {{ icon }}
    </span>
    <span v-if="label" class="base-btn-label">
      {{ label }}
    </span>
    <slot v-if="!label" />
    <span v-if="notificationDot" class="me-button__notification-dot" />
  </button>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/_tokens.scss' as *;

@mixin standard-focus {
  border-color: $blue-primary !important;
  background-color: $blue-primary !important;
  color: $neutral-white !important;
}

.base-btn {
  width: fit-content;
  flex-wrap: nowrap;
  padding: 0px 7px;
  border-radius: $border-radius-base;
  outline: none;
  border: $border-base solid;
  font-size: $text-base;
  line-height: $line-height-base;
  text-wrap: nowrap;
  user-select: none;
  cursor: pointer;
  font-weight: 500;
  @include transition-effect;
  @include flex-row($tiny);
  position: relative;

  &:active:not(:disabled) {
    filter: brightness(1.2);
  }

  &.me-button-icon-top {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: auto;
  }

  &.me-button-icon-left {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  &.me-button-icon-bottom {
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
    height: auto;
  }

  &.me-button-icon-right {
    flex-direction: row-reverse;
    justify-content: center;
    align-items: center;
  }

  .base-btn-icon,
  .base-btn-icon-custom {
    user-select: none;
    font-size: $icon-base;
    line-height: $line-height-base;
    width: $icon-base !important;
    height: $icon-base !important;
  }

  &:disabled {
    cursor: not-allowed;
  }

  &:focus-visible {
    @include drop-shadow-extra-hard;
  }

  &:hover:not(:disabled) {
    @include transition-effect;
  }

  &-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .me-button__notification-dot {
    position: absolute;
    top: -5px;
    right: -5px;
    width: 10px;
    height: 10px;
    background: $red-secondary;
    border-radius: 50%;
    border: 0.1px solid $neutral-white;
    display: block;
  }
}

.default-style {
  height: 36px;
  color: $neutral-white;

  &.red {
    background-color: $red-primary;
    border-color: $red-primary;

    &:hover:not(:disabled) {
      background-color: $red-secondary;
      border-color: $red-secondary;
    }

    &:disabled {
      background-color: $red-quinary;
      border-color: $red-quinary;
    }
  }

  &.blue,
  &.gray {
    background-color: $blue-primary;
    border-color: $blue-primary;

    &:hover:not(:disabled) {
      background-color: $blue-secondary;
      border-color: $blue-secondary;
    }

    &:disabled {
      background-color: $blue-quaternary;
      border-color: $blue-quaternary;
    }
  }
}

.outlined-style {
  height: 36px;
  background-color: transparent;
  border-color: $neutral-light;

  &.gray {
    color: $neutral-darkest;

    &:hover:not(:disabled) {
      border-color: $neutral-dark;
      background-color: $neutral-dark;
      color: $neutral-white;
    }

    &:disabled {
      color: $neutral-default;
    }
  }

  &.red {
    color: $red-primary;

    &:hover:not(:disabled) {
      border-color: $red-secondary;
      background-color: $red-secondary;
      color: $text-white;
    }

    &:disabled {
      color: $red-quinary;
    }
  }

  &.blue {
    color: $blue-primary;

    &:hover:not(:disabled) {
      border-color: $blue-secondary;
      background-color: $blue-secondary;
      color: $text-white;
    }

    &:disabled {
      color: $blue-quaternary;
    }
  }
}

.flat-style {
  height: 20px;
  padding: 0px;
  border: none;
  background-color: transparent;

  &.gray {
    color: $neutral-darkest;

    &:hover:not(:disabled) {
      color: $neutral-dark;
    }

    &:disabled {
      color: $neutral-default;
    }
  }

  &.red {
    color: $red-primary;

    &:hover:not(:disabled) {
      color: $red-secondary;
    }

    &:disabled {
      color: $red-quinary;
    }
  }

  &.blue {
    color: $blue-primary;

    &:hover:not(:disabled) {
      color: $blue-secondary;
    }

    &:disabled {
      color: $blue-quaternary;
    }
  }
}

.active-blue-style {
  background-color: transparent !important;
  border-color: $blue-primary !important;
  color: $blue-primary !important;

  &:hover:not(:disabled) {
    @include standard-focus;
  }
}

.active-yellow-style {
  background-color: transparent !important;
  border-color: $mustard-primary !important;
  color: $mustard-primary !important;

  &:hover:not(:disabled) {
    @include standard-focus;
  }
}

.active-pink-style {
  background-color: transparent !important;
  border-color: $pink-primary !important;
  color: $pink-primary !important;

  &:hover:not(:disabled) {
    @include standard-focus;
  }
}

.custom-style {
  height: 36px;
  background-color: transparent;
  border-color: $neutral-light;
  color: $neutral-deep;

  &:hover:not(:disabled) {
    @include standard-focus;

    .base-btn-icon-custom {
      color: $neutral-white !important;
      @include transition-effect;
    }
  }

  &:disabled {
    opacity: 0.5;
  }
}
</style>
