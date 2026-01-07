import { defineComponent as v, computed as o } from "vue";
var d = /* @__PURE__ */ ((t) => (t.BLUE = "blue", t.RED = "red", t.GRAY = "gray", t))(d || {});
const _ = v({
  name: "MeButton",
  props: {
    label: {
      type: String,
      default: void 0
    },
    icon: {
      type: String,
      default: void 0
    },
    disabled: {
      type: Boolean,
      default: !1
    },
    iconColor: {
      type: String,
      default: void 0
    },
    borderColor: {
      type: String,
      default: void 0
    },
    labelColor: {
      type: String,
      default: void 0
    },
    variant: {
      type: String,
      default: d.BLUE
    },
    outlined: {
      type: Boolean,
      default: !1
    },
    flat: {
      type: Boolean,
      default: !1
    },
    custom: {
      type: Boolean,
      default: !1
    },
    active: {
      type: Boolean,
      default: !1
    },
    activeYellow: {
      type: Boolean,
      default: !1
    },
    activePink: {
      type: Boolean,
      default: !1
    },
    activeIconOutlined: {
      type: Boolean,
      default: !1
    },
    tooltipText: {
      type: String,
      default: void 0
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
  emits: ["click"],
  setup(t, { emit: e }) {
    const n = o(() => ({
      "default-style": !t.outlined && !t.flat && !t.custom,
      "outlined-style": t.outlined && !t.custom,
      "flat-style": t.flat && !t.custom,
      "custom-style": t.custom,
      "active-blue-style": t.active,
      "active-pink-style": t.activePink,
      "active-yellow-style": t.activeYellow,
      [t.variant]: !0
    })), a = o(() => ({
      "border-color": t.custom ? t.borderColor : void 0,
      color: t.custom ? t.labelColor : void 0
    })), c = o(() => !!t.icon && !t.active && !t.activePink && !t.activeYellow && !t.custom), i = o(() => !!t.icon && (t.active || t.activePink || t.activeYellow) && !t.activeIconOutlined), s = o(() => !!t.icon && (t.active || t.activePink || t.activeYellow) && t.activeIconOutlined), u = o(() => !!t.icon && t.custom && !t.active && !t.activePink && !t.activeYellow);
    function l(f) {
      t.disabled || e("click", f);
    }
    return {
      buttonClasses: n,
      buttonStyles: a,
      showIcon: c,
      showActiveIcon: i,
      showActiveIconOutlined: s,
      showCustomIcon: u,
      handleClick: l
    };
  }
});
function b(t, e, n, a, c, i, s, u) {
  var l = typeof t == "function" ? t.options : t;
  return e && (l.render = e, l.staticRenderFns = n, l._compiled = !0), l._scopeId = "data-v-" + i, {
    exports: t,
    options: l
  };
}
var y = function() {
  var e = this, n = e._self._c;
  return e._self._setupProxy, n("button", { class: ["base-btn", e.buttonClasses, `me-button-icon-${e.iconPosition}`], style: e.buttonStyles, attrs: { disabled: e.disabled, title: e.tooltipText }, on: { click: e.handleClick } }, [e.showIcon || e.showActiveIconOutlined ? n("span", { staticClass: "material-icons-outlined base-btn-icon" }, [e._v(" " + e._s(e.icon) + " ")]) : e._e(), e.showActiveIcon ? n("span", { staticClass: "material-icons base-btn-icon" }, [e._v(" " + e._s(e.icon) + " ")]) : e._e(), e.showCustomIcon ? n("span", { staticClass: "material-icons-outlined base-btn-icon-custom", style: { color: e.iconColor } }, [e._v(" " + e._s(e.icon) + " ")]) : e._e(), e.label ? n("span", { staticClass: "base-btn-label" }, [e._v(" " + e._s(e.label) + " ")]) : e._e(), e.label ? e._e() : e._t("default"), e.notificationDot ? n("span", { staticClass: "me-button__notification-dot" }) : e._e()], 2);
}, m = [], r = /* @__PURE__ */ b(
  _,
  y,
  m,
  !1,
  null,
  "28e2d8f6"
);
const w = r.exports;
export {
  d as ButtonVariant,
  w as MeButton
};
