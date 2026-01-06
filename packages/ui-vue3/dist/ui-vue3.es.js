import { defineComponent as d, createElementBlock as e, openBlock as o, normalizeStyle as u, normalizeClass as h, createCommentVNode as i, renderSlot as v, toDisplayString as n } from "vue";
var a = /* @__PURE__ */ ((t) => (t.BLUE = "blue", t.RED = "red", t.GRAY = "gray", t))(a || {});
const p = d({
  name: "MeButton",
  props: {
    label: {
      type: String
    },
    icon: {
      type: String
    },
    disabled: {
      type: Boolean
    },
    iconColor: {
      type: String
    },
    borderColor: {
      type: String
    },
    labelColor: {
      type: String
    },
    variant: {
      type: String,
      default: a.BLUE,
      validator: (t) => Object.values(a).includes(t)
    },
    outlined: {
      type: Boolean
    },
    flat: {
      type: Boolean
    },
    custom: {
      type: Boolean
    },
    active: {
      type: Boolean
    },
    activeYellow: {
      type: Boolean
    },
    activePink: {
      type: Boolean
    },
    activeIconOutlined: {
      type: Boolean
    },
    tooltipText: {
      type: String
    },
    iconPosition: {
      type: String,
      default: "left"
    },
    notificationDot: {
      type: Boolean,
      default: !1
    }
  },
  computed: {
    buttonClasses() {
      return {
        "default-style": !this.outlined && !this.flat && !this.custom,
        "outlined-style": this.outlined && !this.custom,
        "flat-style": this.flat && !this.custom,
        "custom-style": this.custom,
        "custom-active": this.active,
        "active-blue-style": this.active,
        "active-pink-style": this.activePink,
        "active-yellow-style": this.activeYellow,
        [this.variant]: !0
      };
    },
    buttonStyles() {
      return {
        "border-color": this.custom ? this.borderColor : void 0,
        color: this.custom ? this.labelColor : void 0
      };
    },
    showIcon() {
      return !!this.icon && !this.active && !this.activePink && !this.activeYellow && !this.custom;
    },
    showActiveIcon() {
      return !!this.icon && (this.active || this.activePink || this.activeYellow) && !this.activeIconOutlined;
    },
    showActiveIconOutlined() {
      return !!this.icon && (this.active || this.activePink || this.activeYellow) && this.activeIconOutlined;
    },
    showCustomIcon() {
      return !!this.icon && this.custom && !this.active && !this.activePink && !this.activeYellow;
    }
  }
}), b = (t, s) => {
  const l = t.__vccOpts || t;
  for (const [c, r] of s)
    l[c] = r;
  return l;
}, y = ["disabled", "title"], m = {
  key: 0,
  class: "material-icons-outlined base-btn-icon"
}, f = {
  key: 1,
  class: "material-icons base-btn-icon"
}, k = {
  key: 3,
  class: "base-btn-label"
}, w = {
  key: 5,
  class: "me-button__notification-dot"
};
function C(t, s, l, c, r, B) {
  return o(), e("button", {
    class: h([["base-btn", t.buttonClasses, `me-button-icon-${t.iconPosition}`], "!bg-green-500"]),
    style: u(t.buttonStyles),
    disabled: t.disabled,
    onClick: s[0] || (s[0] = (S) => t.$emit("click")),
    title: t.tooltipText
  }, [
    t.showIcon || t.showActiveIconOutlined ? (o(), e("span", m, n(t.icon), 1)) : i("", !0),
    t.showActiveIcon ? (o(), e("span", f, n(t.icon), 1)) : i("", !0),
    t.showCustomIcon ? (o(), e("span", {
      key: 2,
      class: "material-icons-outlined base-btn-icon-custom",
      style: u({ color: t.iconColor })
    }, n(t.icon), 5)) : i("", !0),
    t.label ? (o(), e("span", k, n(t.label), 1)) : i("", !0),
    t.label ? i("", !0) : v(t.$slots, "default", {
      key: 4,
      class: "base-btn-label"
    }, void 0, !0),
    t.notificationDot ? (o(), e("span", w)) : i("", !0)
  ], 14, y);
}
const g = /* @__PURE__ */ b(p, [["render", C], ["__scopeId", "data-v-9b7756f9"]]), P = {
  MeButton: g
};
export {
  g as MeButton,
  P as default
};
