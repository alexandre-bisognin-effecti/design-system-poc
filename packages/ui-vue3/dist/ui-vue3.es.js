import { defineComponent as n, createElementBlock as o, openBlock as a, normalizeClass as l, renderSlot as i } from "vue";
const d = ["disabled"], s = /* @__PURE__ */ n({
  __name: "MeButton",
  props: {
    variant: {},
    size: {},
    disabled: { type: Boolean },
    loading: { type: Boolean },
    block: { type: Boolean }
  },
  setup(e) {
    return (t, c) => (a(), o("button", {
      class: l(["me-button", [
        `me-button--${e.variant}`,
        `me-button--${e.size}`,
        { "is-block": e.block, "is-loading": e.loading }
      ]]),
      disabled: e.disabled || e.loading
    }, [
      i(t.$slots, "default")
    ], 10, d));
  }
}), b = {
  MeButton: s
};
export {
  s as MeButton,
  b as default
};
