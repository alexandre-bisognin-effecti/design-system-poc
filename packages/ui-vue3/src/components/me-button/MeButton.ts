import { defineComponent, PropType } from 'vue';
import { ButtonVariant } from '../../utils/enums/Enums';

export default defineComponent({

  name: 'MeButton',

  props: {
    label: {
      type: String,
    },

    icon: {
      type: String as PropType<string | undefined>,
    },

    disabled: {
      type: Boolean,
    },

    iconColor: {
      type: String,
    },

    borderColor: {
      type: String,
    },

    labelColor: {
      type: String,
    },

    variant: {
      type: String as PropType<`${ButtonVariant}`>,
      default: ButtonVariant.BLUE,
      validator: (value: string) => {
        return Object.values(ButtonVariant).includes(value as ButtonVariant);
      },
    },

    outlined: {
      type: Boolean,
    },

    flat: {
      type: Boolean,
    },

    custom: {
      type: Boolean,
    },

    active: {
      type: Boolean,
    },

    activeYellow: {
      type: Boolean,
    },

    activePink: {
      type: Boolean,
    },

    activeIconOutlined: {
      type: Boolean,
    },

    tooltipText: {
      type: String,
    },

    iconPosition: {
      type: String,
      default: 'left',
    },

    notificationDot: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    buttonClasses(): Record<string, boolean> {
      return {
        'default-style': !this.outlined && !this.flat && !this.custom,
        'outlined-style': this.outlined && !this.custom,
        'flat-style': this.flat && !this.custom,
        'custom-style': this.custom,
        'custom-active': this.active,
        'active-blue-style': this.active,
        'active-pink-style': this.activePink,
        'active-yellow-style': this.activeYellow,
        [this.variant]: true,
      };
    },

    buttonStyles(): { 'border-color': string | undefined; 'color': string | undefined; } {
      return {
        'border-color': this.custom ? this.borderColor : undefined,
        'color': this.custom ? this.labelColor : undefined,
      };
    },

    showIcon(): boolean {
      return !!this.icon && !this.active && !this.activePink && !this.activeYellow && !this.custom;
    },

    showActiveIcon(): boolean {
      return !!this.icon && (this.active || this.activePink || this.activeYellow) && !this.activeIconOutlined;
    },

    showActiveIconOutlined(): boolean {
      return !!this.icon && (this.active || this.activePink || this.activeYellow) && this.activeIconOutlined;
    },

    showCustomIcon(): boolean {
      return !!this.icon && this.custom && !this.active && !this.activePink && !this.activeYellow;
    },
  },
})
