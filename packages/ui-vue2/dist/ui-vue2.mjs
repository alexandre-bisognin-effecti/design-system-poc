function a(n, t, o, u, d, f, l, m) {
  var e = typeof n == "function" ? n.options : n;
  return t && (e.render = t, e.staticRenderFns = o, e._compiled = !0), {
    exports: n,
    options: e
  };
}
const s = {
  name: "MeButton"
};
var c = function() {
  var t = this, o = t._self._c;
  return o("button", { staticClass: "me-button" }, [t._t("default")], 2);
}, i = [], _ = /* @__PURE__ */ a(
  s,
  c,
  i
);
const r = _.exports, p = {
  install(n) {
    n.component("MeButton", r);
  }
};
export {
  r as MeButton,
  p as default
};
