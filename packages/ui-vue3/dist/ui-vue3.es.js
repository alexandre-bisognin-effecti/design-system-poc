import { defineComponent as C, computed as o, createElementBlock as l, openBlock as n, normalizeStyle as d, normalizeClass as h, createCommentVNode as c, renderSlot as w, toDisplayString as i } from "vue";
var v = /* @__PURE__ */ ((e) => (e.BLUE = "blue", e.RED = "red", e.GRAY = "gray", e))(v || {});
const p = ["disabled", "title"], I = {
  key: 0,
  class: "material-icons-outlined base-btn-icon"
}, P = {
  key: 1,
  class: "material-icons base-btn-icon"
}, Y = {
  key: 3,
  class: "base-btn-label"
}, x = {
  key: 5,
  class: "me-button__notification-dot"
}, O = /* @__PURE__ */ C({
  __name: "MeButton",
  props: {
    label: {},
    icon: {},
    disabled: { type: Boolean },
    iconColor: {},
    borderColor: {},
    labelColor: {},
    variant: { default: v.BLUE },
    outlined: { type: Boolean },
    flat: { type: Boolean },
    custom: { type: Boolean },
    active: { type: Boolean },
    activeYellow: { type: Boolean },
    activePink: { type: Boolean },
    activeIconOutlined: { type: Boolean },
    tooltipText: {},
    iconPosition: { default: "left" },
    notificationDot: { type: Boolean, default: !1 }
  },
  emits: ["click"],
  setup(e, { emit: a }) {
    const t = e, s = a, u = o(() => ({
      "default-style": !t.outlined && !t.flat && !t.custom,
      "outlined-style": t.outlined && !t.custom,
      "flat-style": t.flat && !t.custom,
      "custom-style": t.custom,
      "custom-active": t.active,
      "active-blue-style": t.active,
      "active-pink-style": t.activePink,
      "active-yellow-style": t.activeYellow,
      [t.variant]: !0
    })), b = o(() => ({
      "border-color": t.custom ? t.borderColor : void 0,
      color: t.custom ? t.labelColor : void 0
    })), m = o(() => !!t.icon && !t.active && !t.activePink && !t.activeYellow && !t.custom), y = o(() => !!t.icon && (t.active || t.activePink || t.activeYellow) && !t.activeIconOutlined), f = o(() => !!t.icon && (t.active || t.activePink || t.activeYellow) && t.activeIconOutlined), k = o(() => !!t.icon && t.custom && !t.active && !t.activePink && !t.activeYellow);
    function B(r) {
      t.disabled || s("click", r);
    }
    return (r, S) => (n(), l("button", {
      class: h(["base-btn", u.value, `me-button-icon-${e.iconPosition}`]),
      style: d(b.value),
      disabled: e.disabled,
      title: e.tooltipText,
      onClick: B
    }, [
      m.value || f.value ? (n(), l("span", I, i(e.icon), 1)) : c("", !0),
      y.value ? (n(), l("span", P, i(e.icon), 1)) : c("", !0),
      k.value ? (n(), l("span", {
        key: 2,
        class: "material-icons-outlined base-btn-icon-custom",
        style: d({ color: e.iconColor })
      }, i(e.icon), 5)) : c("", !0),
      e.label ? (n(), l("span", Y, i(e.label), 1)) : c("", !0),
      e.label ? c("", !0) : w(r.$slots, "default", { key: 4 }, void 0, !0),
      e.notificationDot ? (n(), l("span", x)) : c("", !0)
    ], 14, p));
  }
}), D = (e, a) => {
  const t = e.__vccOpts || e;
  for (const [s, u] of a)
    t[s] = u;
  return t;
}, E = /* @__PURE__ */ D(O, [["__scopeId", "data-v-797722c3"]]), A = {
  MeButton: E
};
export {
  E as MeButton,
  A as default
};
