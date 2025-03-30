/*! For license information please see main.js.LICENSE.txt */
(() => {
  var t = {
      34: t => {
        t.exports = "uniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\n\nattribute vec3 position;\nattribute vec2 uv;\n\nvarying vec2 vUv;\n\nvoid main() {\n  vUv = uv;\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n"
      },
      117: t => {
        t.exports = "precision highp float;\n\nuniform sampler2D grainTex;\nuniform sampler2D blurTex;\nuniform float time;\nuniform float seed;\nuniform vec3 back;\nuniform float style;\nuniform float param1;\nuniform float param2;\nuniform float param3;\n\nvarying vec2 vUv;\n\n#define PI 3.141592653589793\n\n//\n// Description : Array and textureless GLSL 2D simplex noise function.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : stegu\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//               https://github.com/stegu/webgl-noise\n//\n\nvec3 mod289(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec2 mod289(vec2 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec3 permute(vec3 x) {\n  return mod289(((x * 34.0) + 10.0) * x);\n}\nfloat snoise(vec2 v) {\n  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);\n  vec2 i = floor(v + dot(v, C.yy));\n  vec2 x0 = v - i + dot(i, C.xx);\n  vec2 i1;\n  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n  i = mod289(i);\n  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));\n  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);\n  m = m * m;\n  m = m * m;\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);\n  vec3 g;\n  g.x = a0.x * x0.x + h.x * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}\n\nfloat snoise01(vec2 v) {\n  return (1.0 + snoise(v)) * 0.5;\n}\n\nfloat noise2d(vec2 st) {\n  return snoise01(vec2(st.x + time * 0.02, st.y - time * 0.04 + seed));\n}\n\nfloat pattern(vec2 p) {\n  vec2 q = vec2(noise2d(p + vec2(0.0, 0.0)), noise2d(p + vec2(5.2, 1.3)));\n  vec2 r = vec2(noise2d(p + 4.0 * q + vec2(1.7, 9.2)), noise2d(p + 4.0 * q + vec2(8.3, 2.8)));\n  return noise2d(p + 1.0 * r);\n}\n\nvoid main() {\n  vec2 uv = vUv;\n  vec2 p = gl_FragCoord.xy;\n\n  uv = style > 0.0 ? ceil(uv * 50.0) / 50.0 : uv;\n\n  // texture\n  vec3 grainColor = texture2D(grainTex, mod(p * param1 * 5.0, 1024.0) / 1024.0).rgb;\n  float blurAlpha = texture2D(blurTex, uv).a;\n\n  float gr = pow(grainColor.r * 1.0, 1.5) + 0.5 * (1.0 - blurAlpha);\n  float gg = grainColor.g;\n\n  float ax = param2 * gr * cos(gg * 2.0 * PI);\n  float ay = param2 * gr * sin(gg * 2.0 * PI);\n\n  // noise\n  float ndx = 1.0 * 1.0 * param3 + 0.1 * (1.0 - blurAlpha);\n  float ndy = 2.0 * 1.0 * param3 + 0.1 * (1.0 - blurAlpha);\n  float nx = uv.x * ndx + ax;\n  float ny = uv.y * ndy + ay;\n  float n = pattern(vec2(nx, ny));\n  n = pow(n * 1.05, 6.0);\n  n = smoothstep(0.0, 1.0, n);\n\n  vec3 front = vec3(0.5);\n  vec3 result = mix(back, front, n);\n\n  gl_FragColor = vec4(result, blurAlpha);\n  // gl_FragColor = vec4(vec3(blurAlpha), 1.0);\n}\n"
      }
    },
    e = {};

  function n(i) {
    var r = e[i];
    if (void 0 !== r) return r.exports;
    var a = e[i] = {
      exports: {}
    };
    return t[i](a, a.exports, n), a.exports
  }
  n.n = t => {
    var e = t && t.__esModule ? () => t.default : () => t;
    return n.d(e, {
      a: e
    }), e
  }, n.d = (t, e) => {
    for (var i in e) n.o(e, i) && !n.o(t, i) && Object.defineProperty(t, i, {
      enumerable: !0,
      get: e[i]
    })
  }, n.g = function() {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")()
    } catch (t) {
      if ("object" == typeof window) return window
    }
  }(), n.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e), (() => {
    "use strict";

    function t(t) {
      if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      return t
    }

    function e(t, e) {
      t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e
    }
    var i, r, a, s, o, l, c, u, h, d, p, f, m, g, _, v, x, y = {
        autoSleep: 120,
        force3D: "auto",
        nullTargetWarn: 1,
        units: {
          lineHeight: ""
        }
      },
      b = {
        duration: .5,
        overwrite: !1,
        delay: 0
      },
      M = 1e8,
      S = 1e-8,
      E = 2 * Math.PI,
      T = E / 4,
      w = 0,
      A = Math.sqrt,
      R = Math.cos,
      C = Math.sin,
      P = function(t) {
        return "string" == typeof t
      },
      D = function(t) {
        return "function" == typeof t
      },
      L = function(t) {
        return "number" == typeof t
      },
      I = function(t) {
        return void 0 === t
      },
      U = function(t) {
        return "object" == typeof t
      },
      N = function(t) {
        return !1 !== t
      },
      O = function() {
        return "undefined" != typeof window
      },
      F = function(t) {
        return D(t) || P(t)
      },
      B = "function" == typeof ArrayBuffer && ArrayBuffer.isView || function() {},
      z = Array.isArray,
      k = /(?:-?\.?\d|\.)+/gi,
      H = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
      V = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
      G = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
      W = /[+-]=-?[.\d]+/,
      X = /[^,'"\[\]\s]+/gi,
      j = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
      q = {},
      Y = {},
      $ = function(t) {
        return (Y = Et(t, q)) && Tn
      },
      K = function(t, e) {
        return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()")
      },
      Z = function(t, e) {
        return !e && console.warn(t)
      },
      J = function(t, e) {
        return t && (q[t] = e) && Y && (Y[t] = e) || q
      },
      Q = function() {
        return 0
      },
      tt = {
        suppressEvents: !0,
        isStart: !0,
        kill: !1
      },
      et = {
        suppressEvents: !0,
        kill: !1
      },
      nt = {
        suppressEvents: !0
      },
      it = {},
      rt = [],
      at = {},
      st = {},
      ot = {},
      lt = 30,
      ct = [],
      ut = "",
      ht = function(t) {
        var e, n, i = t[0];
        if (U(i) || D(i) || (t = [t]), !(e = (i._gsap || {}).harness)) {
          for (n = ct.length; n-- && !ct[n].targetTest(i););
          e = ct[n]
        }
        for (n = t.length; n--;) t[n] && (t[n]._gsap || (t[n]._gsap = new Be(t[n], e))) || t.splice(n, 1);
        return t
      },
      dt = function(t) {
        return t._gsap || ht(ee(t))[0]._gsap
      },
      pt = function(t, e, n) {
        return (n = t[e]) && D(n) ? t[e]() : I(n) && t.getAttribute && t.getAttribute(e) || n
      },
      ft = function(t, e) {
        return (t = t.split(",")).forEach(e) || t
      },
      mt = function(t) {
        return Math.round(1e5 * t) / 1e5 || 0
      },
      gt = function(t) {
        return Math.round(1e7 * t) / 1e7 || 0
      },
      _t = function(t, e) {
        var n = e.charAt(0),
          i = parseFloat(e.substr(2));
        return t = parseFloat(t), "+" === n ? t + i : "-" === n ? t - i : "*" === n ? t * i : t / i
      },
      vt = function(t, e) {
        for (var n = e.length, i = 0; t.indexOf(e[i]) < 0 && ++i < n;);
        return i < n
      },
      xt = function() {
        var t, e, n = rt.length,
          i = rt.slice(0);
        for (at = {}, rt.length = 0, t = 0; t < n; t++)(e = i[t]) && e._lazy && (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0)
      },
      yt = function(t, e, n, i) {
        rt.length && !r && xt(), t.render(e, n, i || r && e < 0 && (t._initted || t._startAt)), rt.length && !r && xt()
      },
      bt = function(t) {
        var e = parseFloat(t);
        return (e || 0 === e) && (t + "").match(X).length < 2 ? e : P(t) ? t.trim() : t
      },
      Mt = function(t) {
        return t
      },
      St = function(t, e) {
        for (var n in e) n in t || (t[n] = e[n]);
        return t
      },
      Et = function(t, e) {
        for (var n in e) t[n] = e[n];
        return t
      },
      Tt = function t(e, n) {
        for (var i in n) "__proto__" !== i && "constructor" !== i && "prototype" !== i && (e[i] = U(n[i]) ? t(e[i] || (e[i] = {}), n[i]) : n[i]);
        return e
      },
      wt = function(t, e) {
        var n, i = {};
        for (n in t) n in e || (i[n] = t[n]);
        return i
      },
      At = function(t) {
        var e, n = t.parent || s,
          i = t.keyframes ? (e = z(t.keyframes), function(t, n) {
            for (var i in n) i in t || "duration" === i && e || "ease" === i || (t[i] = n[i])
          }) : St;
        if (N(t.inherit))
          for (; n;) i(t, n.vars.defaults), n = n.parent || n._dp;
        return t
      },
      Rt = function(t, e, n, i, r) {
        void 0 === n && (n = "_first"), void 0 === i && (i = "_last");
        var a, s = t[i];
        if (r)
          for (a = e[r]; s && s[r] > a;) s = s._prev;
        return s ? (e._next = s._next, s._next = e) : (e._next = t[n], t[n] = e), e._next ? e._next._prev = e : t[i] = e, e._prev = s, e.parent = e._dp = t, e
      },
      Ct = function(t, e, n, i) {
        void 0 === n && (n = "_first"), void 0 === i && (i = "_last");
        var r = e._prev,
          a = e._next;
        r ? r._next = a : t[n] === e && (t[n] = a), a ? a._prev = r : t[i] === e && (t[i] = r), e._next = e._prev = e.parent = null
      },
      Pt = function(t, e) {
        t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove && t.parent.remove(t), t._act = 0
      },
      Dt = function(t, e) {
        if (t && (!e || e._end > t._dur || e._start < 0))
          for (var n = t; n;) n._dirty = 1, n = n.parent;
        return t
      },
      Lt = function(t, e, n, i) {
        return t._startAt && (r ? t._startAt.revert(et) : t.vars.immediateRender && !t.vars.autoRevert || t._startAt.render(e, !0, i))
      },
      It = function t(e) {
        return !e || e._ts && t(e.parent)
      },
      Ut = function(t) {
        return t._repeat ? Nt(t._tTime, t = t.duration() + t._rDelay) * t : 0
      },
      Nt = function(t, e) {
        var n = Math.floor(t = gt(t / e));
        return t && n === t ? n - 1 : n
      },
      Ot = function(t, e) {
        return (t - e._start) * e._ts + (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur)
      },
      Ft = function(t) {
        return t._end = gt(t._start + (t._tDur / Math.abs(t._ts || t._rts || S) || 0))
      },
      Bt = function(t, e) {
        var n = t._dp;
        return n && n.smoothChildTiming && t._ts && (t._start = gt(n._time - (t._ts > 0 ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), Ft(t), n._dirty || Dt(n, t)), t
      },
      zt = function(t, e) {
        var n;
        if ((e._time || !e._dur && e._initted || e._start < t._time && (e._dur || !e.add)) && (n = Ot(t.rawTime(), e), (!e._dur || Zt(0, e.totalDuration(), n) - e._tTime > S) && e.render(n, !0)), Dt(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
          if (t._dur < t.duration())
            for (n = t; n._dp;) n.rawTime() >= 0 && n.totalTime(n._tTime), n = n._dp;
          t._zTime = -1e-8
        }
      },
      kt = function(t, e, n, i) {
        return e.parent && Pt(e), e._start = gt((L(n) ? n : n || t !== s ? Yt(t, n, e) : t._time) + e._delay), e._end = gt(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)), Rt(t, e, "_first", "_last", t._sort ? "_start" : 0), Wt(e) || (t._recent = e), i || zt(t, e), t._ts < 0 && Bt(t, t._tTime), t
      },
      Ht = function(t, e) {
        return (q.ScrollTrigger || K("scrollTrigger", e)) && q.ScrollTrigger.create(e, t)
      },
      Vt = function(t, e, n, i, a) {
        return je(t, e, a), t._initted ? !n && t._pt && !r && (t._dur && !1 !== t.vars.lazy || !t._dur && t.vars.lazy) && h !== Te.frame ? (rt.push(t), t._lazy = [a, i], 1) : void 0 : 1
      },
      Gt = function t(e) {
        var n = e.parent;
        return n && n._ts && n._initted && !n._lock && (n.rawTime() < 0 || t(n))
      },
      Wt = function(t) {
        var e = t.data;
        return "isFromStart" === e || "isStart" === e
      },
      Xt = function(t, e, n, i) {
        var r = t._repeat,
          a = gt(e) || 0,
          s = t._tTime / t._tDur;
        return s && !i && (t._time *= a / t._dur), t._dur = a, t._tDur = r ? r < 0 ? 1e10 : gt(a * (r + 1) + t._rDelay * r) : a, s > 0 && !i && Bt(t, t._tTime = t._tDur * s), t.parent && Ft(t), n || Dt(t.parent, t), t
      },
      jt = function(t) {
        return t instanceof ke ? Dt(t) : Xt(t, t._dur)
      },
      qt = {
        _start: 0,
        endTime: Q,
        totalDuration: Q
      },
      Yt = function t(e, n, i) {
        var r, a, s, o = e.labels,
          l = e._recent || qt,
          c = e.duration() >= M ? l.endTime(!1) : e._dur;
        return P(n) && (isNaN(n) || n in o) ? (a = n.charAt(0), s = "%" === n.substr(-1), r = n.indexOf("="), "<" === a || ">" === a ? (r >= 0 && (n = n.replace(/=/, "")), ("<" === a ? l._start : l.endTime(l._repeat >= 0)) + (parseFloat(n.substr(1)) || 0) * (s ? (r < 0 ? l : i).totalDuration() / 100 : 1)) : r < 0 ? (n in o || (o[n] = c), o[n]) : (a = parseFloat(n.charAt(r - 1) + n.substr(r + 1)), s && i && (a = a / 100 * (z(i) ? i[0] : i).totalDuration()), r > 1 ? t(e, n.substr(0, r - 1), i) + a : c + a)) : null == n ? c : +n
      },
      $t = function(t, e, n) {
        var i, r, a = L(e[1]),
          s = (a ? 2 : 1) + (t < 2 ? 0 : 1),
          o = e[s];
        if (a && (o.duration = e[1]), o.parent = n, t) {
          for (i = o, r = n; r && !("immediateRender" in i);) i = r.vars.defaults || {}, r = N(r.vars.inherit) && r.parent;
          o.immediateRender = N(i.immediateRender), t < 2 ? o.runBackwards = 1 : o.startAt = e[s - 1]
        }
        return new Ze(e[0], o, e[s + 1])
      },
      Kt = function(t, e) {
        return t || 0 === t ? e(t) : e
      },
      Zt = function(t, e, n) {
        return n < t ? t : n > e ? e : n
      },
      Jt = function(t, e) {
        return P(t) && (e = j.exec(t)) ? e[1] : ""
      },
      Qt = [].slice,
      te = function(t, e) {
        return t && U(t) && "length" in t && (!e && !t.length || t.length - 1 in t && U(t[0])) && !t.nodeType && t !== o
      },
      ee = function(t, e, n) {
        return a && !e && a.selector ? a.selector(t) : !P(t) || n || !l && we() ? z(t) ? function(t, e, n) {
          return void 0 === n && (n = []), t.forEach((function(t) {
            var i;
            return P(t) && !e || te(t, 1) ? (i = n).push.apply(i, ee(t)) : n.push(t)
          })) || n
        }(t, n) : te(t) ? Qt.call(t, 0) : t ? [t] : [] : Qt.call((e || c).querySelectorAll(t), 0)
      },
      ne = function(t) {
        return t = ee(t)[0] || Z("Invalid scope") || {},
          function(e) {
            var n = t.current || t.nativeElement || t;
            return ee(e, n.querySelectorAll ? n : n === t ? Z("Invalid scope") || c.createElement("div") : t)
          }
      },
      ie = function(t) {
        return t.sort((function() {
          return .5 - Math.random()
        }))
      },
      re = function(t) {
        if (D(t)) return t;
        var e = U(t) ? t : {
            each: t
          },
          n = Ie(e.ease),
          i = e.from || 0,
          r = parseFloat(e.base) || 0,
          a = {},
          s = i > 0 && i < 1,
          o = isNaN(i) || s,
          l = e.axis,
          c = i,
          u = i;
        return P(i) ? c = u = {
            center: .5,
            edges: .5,
            end: 1
          } [i] || 0 : !s && o && (c = i[0], u = i[1]),
          function(t, s, h) {
            var d, p, f, m, g, _, v, x, y, b = (h || e).length,
              S = a[b];
            if (!S) {
              if (!(y = "auto" === e.grid ? 0 : (e.grid || [1, M])[1])) {
                for (v = -M; v < (v = h[y++].getBoundingClientRect().left) && y < b;);
                y < b && y--
              }
              for (S = a[b] = [], d = o ? Math.min(y, b) * c - .5 : i % y, p = y === M ? 0 : o ? b * u / y - .5 : i / y | 0, v = 0, x = M, _ = 0; _ < b; _++) f = _ % y - d, m = p - (_ / y | 0), S[_] = g = l ? Math.abs("y" === l ? m : f) : A(f * f + m * m), g > v && (v = g), g < x && (x = g);
              "random" === i && ie(S), S.max = v - x, S.min = x, S.v = b = (parseFloat(e.amount) || parseFloat(e.each) * (y > b ? b - 1 : l ? "y" === l ? b / y : y : Math.max(y, b / y)) || 0) * ("edges" === i ? -1 : 1), S.b = b < 0 ? r - b : r, S.u = Jt(e.amount || e.each) || 0, n = n && b < 0 ? De(n) : n
            }
            return b = (S[t] - S.min) / S.max || 0, gt(S.b + (n ? n(b) : b) * S.v) + S.u
          }
      },
      ae = function(t) {
        var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
        return function(n) {
          var i = gt(Math.round(parseFloat(n) / t) * t * e);
          return (i - i % 1) / e + (L(n) ? 0 : Jt(n))
        }
      },
      se = function(t, e) {
        var n, i, r = z(t);
        return !r && U(t) && (n = r = t.radius || M, t.values ? (t = ee(t.values), (i = !L(t[0])) && (n *= n)) : t = ae(t.increment)), Kt(e, r ? D(t) ? function(e) {
          return i = t(e), Math.abs(i - e) <= n ? i : e
        } : function(e) {
          for (var r, a, s = parseFloat(i ? e.x : e), o = parseFloat(i ? e.y : 0), l = M, c = 0, u = t.length; u--;)(r = i ? (r = t[u].x - s) * r + (a = t[u].y - o) * a : Math.abs(t[u] - s)) < l && (l = r, c = u);
          return c = !n || l <= n ? t[c] : e, i || c === e || L(e) ? c : c + Jt(e)
        } : ae(t))
      },
      oe = function(t, e, n, i) {
        return Kt(z(t) ? !e : !0 === n ? !!(n = 0) : !i, (function() {
          return z(t) ? t[~~(Math.random() * t.length)] : (n = n || 1e-5) && (i = n < 1 ? Math.pow(10, (n + "").length - 2) : 1) && Math.floor(Math.round((t - n / 2 + Math.random() * (e - t + .99 * n)) / n) * n * i) / i
        }))
      },
      le = function(t, e, n) {
        return Kt(n, (function(n) {
          return t[~~e(n)]
        }))
      },
      ce = function(t) {
        for (var e, n, i, r, a = 0, s = ""; ~(e = t.indexOf("random(", a));) i = t.indexOf(")", e), r = "[" === t.charAt(e + 7), n = t.substr(e + 7, i - e - 7).match(r ? X : k), s += t.substr(a, e - a) + oe(r ? n : +n[0], r ? 0 : +n[1], +n[2] || 1e-5), a = i + 1;
        return s + t.substr(a, t.length - a)
      },
      ue = function(t, e, n, i, r) {
        var a = e - t,
          s = i - n;
        return Kt(r, (function(e) {
          return n + ((e - t) / a * s || 0)
        }))
      },
      he = function(t, e, n) {
        var i, r, a, s = t.labels,
          o = M;
        for (i in s)(r = s[i] - e) < 0 == !!n && r && o > (r = Math.abs(r)) && (a = i, o = r);
        return a
      },
      de = function(t, e, n) {
        var i, r, s, o = t.vars,
          l = o[e],
          c = a,
          u = t._ctx;
        if (l) return i = o[e + "Params"], r = o.callbackScope || t, n && rt.length && xt(), u && (a = u), s = i ? l.apply(r, i) : l.call(r), a = c, s
      },
      pe = function(t) {
        return Pt(t), t.scrollTrigger && t.scrollTrigger.kill(!!r), t.progress() < 1 && de(t, "onInterrupt"), t
      },
      fe = [],
      me = function(t) {
        if (t)
          if (t = !t.name && t.default || t, O() || t.headless) {
            var e = t.name,
              n = D(t),
              i = e && !n && t.init ? function() {
                this._props = []
              } : t,
              r = {
                init: Q,
                render: on,
                add: We,
                kill: cn,
                modifier: ln,
                rawVars: 0
              },
              a = {
                targetTest: 0,
                get: 0,
                getSetter: nn,
                aliases: {},
                register: 0
              };
            if (we(), t !== i) {
              if (st[e]) return;
              St(i, St(wt(t, r), a)), Et(i.prototype, Et(r, wt(t, a))), st[i.prop = e] = i, t.targetTest && (ct.push(i), it[e] = 1), e = ("css" === e ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin"
            }
            J(e, i), t.register && t.register(Tn, i, dn)
          } else fe.push(t)
      },
      ge = 255,
      _e = {
        aqua: [0, ge, ge],
        lime: [0, ge, 0],
        silver: [192, 192, 192],
        black: [0, 0, 0],
        maroon: [128, 0, 0],
        teal: [0, 128, 128],
        blue: [0, 0, ge],
        navy: [0, 0, 128],
        white: [ge, ge, ge],
        olive: [128, 128, 0],
        yellow: [ge, ge, 0],
        orange: [ge, 165, 0],
        gray: [128, 128, 128],
        purple: [128, 0, 128],
        green: [0, 128, 0],
        red: [ge, 0, 0],
        pink: [ge, 192, 203],
        cyan: [0, ge, ge],
        transparent: [ge, ge, ge, 0]
      },
      ve = function(t, e, n) {
        return (6 * (t += t < 0 ? 1 : t > 1 ? -1 : 0) < 1 ? e + (n - e) * t * 6 : t < .5 ? n : 3 * t < 2 ? e + (n - e) * (2 / 3 - t) * 6 : e) * ge + .5 | 0
      },
      xe = function(t, e, n) {
        var i, r, a, s, o, l, c, u, h, d, p = t ? L(t) ? [t >> 16, t >> 8 & ge, t & ge] : 0 : _e.black;
        if (!p) {
          if ("," === t.substr(-1) && (t = t.substr(0, t.length - 1)), _e[t]) p = _e[t];
          else if ("#" === t.charAt(0)) {
            if (t.length < 6 && (i = t.charAt(1), r = t.charAt(2), a = t.charAt(3), t = "#" + i + i + r + r + a + a + (5 === t.length ? t.charAt(4) + t.charAt(4) : "")), 9 === t.length) return [(p = parseInt(t.substr(1, 6), 16)) >> 16, p >> 8 & ge, p & ge, parseInt(t.substr(7), 16) / 255];
            p = [(t = parseInt(t.substr(1), 16)) >> 16, t >> 8 & ge, t & ge]
          } else if ("hsl" === t.substr(0, 3))
            if (p = d = t.match(k), e) {
              if (~t.indexOf("=")) return p = t.match(H), n && p.length < 4 && (p[3] = 1), p
            } else s = +p[0] % 360 / 360, o = +p[1] / 100, i = 2 * (l = +p[2] / 100) - (r = l <= .5 ? l * (o + 1) : l + o - l * o), p.length > 3 && (p[3] *= 1), p[0] = ve(s + 1 / 3, i, r), p[1] = ve(s, i, r), p[2] = ve(s - 1 / 3, i, r);
          else p = t.match(k) || _e.transparent;
          p = p.map(Number)
        }
        return e && !d && (i = p[0] / ge, r = p[1] / ge, a = p[2] / ge, l = ((c = Math.max(i, r, a)) + (u = Math.min(i, r, a))) / 2, c === u ? s = o = 0 : (h = c - u, o = l > .5 ? h / (2 - c - u) : h / (c + u), s = c === i ? (r - a) / h + (r < a ? 6 : 0) : c === r ? (a - i) / h + 2 : (i - r) / h + 4, s *= 60), p[0] = ~~(s + .5), p[1] = ~~(100 * o + .5), p[2] = ~~(100 * l + .5)), n && p.length < 4 && (p[3] = 1), p
      },
      ye = function(t) {
        var e = [],
          n = [],
          i = -1;
        return t.split(Me).forEach((function(t) {
          var r = t.match(V) || [];
          e.push.apply(e, r), n.push(i += r.length + 1)
        })), e.c = n, e
      },
      be = function(t, e, n) {
        var i, r, a, s, o = "",
          l = (t + o).match(Me),
          c = e ? "hsla(" : "rgba(",
          u = 0;
        if (!l) return t;
        if (l = l.map((function(t) {
            return (t = xe(t, e, 1)) && c + (e ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3] : t.join(",")) + ")"
          })), n && (a = ye(t), (i = n.c).join(o) !== a.c.join(o)))
          for (s = (r = t.replace(Me, "1").split(V)).length - 1; u < s; u++) o += r[u] + (~i.indexOf(u) ? l.shift() || c + "0,0,0,0)" : (a.length ? a : l.length ? l : n).shift());
        if (!r)
          for (s = (r = t.split(Me)).length - 1; u < s; u++) o += r[u] + l[u];
        return o + r[s]
      },
      Me = function() {
        var t, e = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
        for (t in _e) e += "|" + t + "\\b";
        return new RegExp(e + ")", "gi")
      }(),
      Se = /hsl[a]?\(/,
      Ee = function(t) {
        var e, n = t.join(" ");
        if (Me.lastIndex = 0, Me.test(n)) return e = Se.test(n), t[1] = be(t[1], e), t[0] = be(t[0], e, ye(t[1])), !0
      },
      Te = function() {
        var t, e, n, i, r, a, s = Date.now,
          h = 500,
          d = 33,
          f = s(),
          m = f,
          g = 1e3 / 240,
          _ = g,
          v = [],
          x = function n(o) {
            var l, c, u, p, x = s() - m,
              y = !0 === o;
            if ((x > h || x < 0) && (f += x - d), ((l = (u = (m += x) - f) - _) > 0 || y) && (p = ++i.frame, r = u - 1e3 * i.time, i.time = u /= 1e3, _ += l + (l >= g ? 4 : g - l), c = 1), y || (t = e(n)), c)
              for (a = 0; a < v.length; a++) v[a](u, r, p, o)
          };
        return i = {
          time: 0,
          frame: 0,
          tick: function() {
            x(!0)
          },
          deltaRatio: function(t) {
            return r / (1e3 / (t || 60))
          },
          wake: function() {
            u && (!l && O() && (o = l = window, c = o.document || {}, q.gsap = Tn, (o.gsapVersions || (o.gsapVersions = [])).push(Tn.version), $(Y || o.GreenSockGlobals || !o.gsap && o || {}), fe.forEach(me)), n = "undefined" != typeof requestAnimationFrame && requestAnimationFrame, t && i.sleep(), e = n || function(t) {
              return setTimeout(t, _ - 1e3 * i.time + 1 | 0)
            }, p = 1, x(2))
          },
          sleep: function() {
            (n ? cancelAnimationFrame : clearTimeout)(t), p = 0, e = Q
          },
          lagSmoothing: function(t, e) {
            h = t || 1 / 0, d = Math.min(e || 33, h)
          },
          fps: function(t) {
            g = 1e3 / (t || 240), _ = 1e3 * i.time + g
          },
          add: function(t, e, n) {
            var r = e ? function(e, n, a, s) {
              t(e, n, a, s), i.remove(r)
            } : t;
            return i.remove(t), v[n ? "unshift" : "push"](r), we(), r
          },
          remove: function(t, e) {
            ~(e = v.indexOf(t)) && v.splice(e, 1) && a >= e && a--
          },
          _listeners: v
        }, i
      }(),
      we = function() {
        return !p && Te.wake()
      },
      Ae = {},
      Re = /^[\d.\-M][\d.\-,\s]/,
      Ce = /["']/g,
      Pe = function(t) {
        for (var e, n, i, r = {}, a = t.substr(1, t.length - 3).split(":"), s = a[0], o = 1, l = a.length; o < l; o++) n = a[o], e = o !== l - 1 ? n.lastIndexOf(",") : n.length, i = n.substr(0, e), r[s] = isNaN(i) ? i.replace(Ce, "").trim() : +i, s = n.substr(e + 1).trim();
        return r
      },
      De = function(t) {
        return function(e) {
          return 1 - t(1 - e)
        }
      },
      Le = function t(e, n) {
        for (var i, r = e._first; r;) r instanceof ke ? t(r, n) : !r.vars.yoyoEase || r._yoyo && r._repeat || r._yoyo === n || (r.timeline ? t(r.timeline, n) : (i = r._ease, r._ease = r._yEase, r._yEase = i, r._yoyo = n)), r = r._next
      },
      Ie = function(t, e) {
        return t && (D(t) ? t : Ae[t] || function(t) {
          var e, n, i, r, a = (t + "").split("("),
            s = Ae[a[0]];
          return s && a.length > 1 && s.config ? s.config.apply(null, ~t.indexOf("{") ? [Pe(a[1])] : (e = t, n = e.indexOf("(") + 1, i = e.indexOf(")"), r = e.indexOf("(", n), e.substring(n, ~r && r < i ? e.indexOf(")", i + 1) : i)).split(",").map(bt)) : Ae._CE && Re.test(t) ? Ae._CE("", t) : s
        }(t)) || e
      },
      Ue = function(t, e, n, i) {
        void 0 === n && (n = function(t) {
          return 1 - e(1 - t)
        }), void 0 === i && (i = function(t) {
          return t < .5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2
        });
        var r, a = {
          easeIn: e,
          easeOut: n,
          easeInOut: i
        };
        return ft(t, (function(t) {
          for (var e in Ae[t] = q[t] = a, Ae[r = t.toLowerCase()] = n, a) Ae[r + ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")] = Ae[t + "." + e] = a[e]
        })), a
      },
      Ne = function(t) {
        return function(e) {
          return e < .5 ? (1 - t(1 - 2 * e)) / 2 : .5 + t(2 * (e - .5)) / 2
        }
      },
      Oe = function t(e, n, i) {
        var r = n >= 1 ? n : 1,
          a = (i || (e ? .3 : .45)) / (n < 1 ? n : 1),
          s = a / E * (Math.asin(1 / r) || 0),
          o = function(t) {
            return 1 === t ? 1 : r * Math.pow(2, -10 * t) * C((t - s) * a) + 1
          },
          l = "out" === e ? o : "in" === e ? function(t) {
            return 1 - o(1 - t)
          } : Ne(o);
        return a = E / a, l.config = function(n, i) {
          return t(e, n, i)
        }, l
      },
      Fe = function t(e, n) {
        void 0 === n && (n = 1.70158);
        var i = function(t) {
            return t ? --t * t * ((n + 1) * t + n) + 1 : 0
          },
          r = "out" === e ? i : "in" === e ? function(t) {
            return 1 - i(1 - t)
          } : Ne(i);
        return r.config = function(n) {
          return t(e, n)
        }, r
      };
    ft("Linear,Quad,Cubic,Quart,Quint,Strong", (function(t, e) {
      var n = e < 5 ? e + 1 : e;
      Ue(t + ",Power" + (n - 1), e ? function(t) {
        return Math.pow(t, n)
      } : function(t) {
        return t
      }, (function(t) {
        return 1 - Math.pow(1 - t, n)
      }), (function(t) {
        return t < .5 ? Math.pow(2 * t, n) / 2 : 1 - Math.pow(2 * (1 - t), n) / 2
      }))
    })), Ae.Linear.easeNone = Ae.none = Ae.Linear.easeIn, Ue("Elastic", Oe("in"), Oe("out"), Oe()), f = 7.5625, _ = 2 * (g = 1 / (m = 2.75)), v = 2.5 * g, Ue("Bounce", (function(t) {
      return 1 - x(1 - t)
    }), x = function(t) {
      return t < g ? f * t * t : t < _ ? f * Math.pow(t - 1.5 / m, 2) + .75 : t < v ? f * (t -= 2.25 / m) * t + .9375 : f * Math.pow(t - 2.625 / m, 2) + .984375
    }), Ue("Expo", (function(t) {
      return Math.pow(2, 10 * (t - 1)) * t + t * t * t * t * t * t * (1 - t)
    })), Ue("Circ", (function(t) {
      return -(A(1 - t * t) - 1)
    })), Ue("Sine", (function(t) {
      return 1 === t ? 1 : 1 - R(t * T)
    })), Ue("Back", Fe("in"), Fe("out"), Fe()), Ae.SteppedEase = Ae.steps = q.SteppedEase = {
      config: function(t, e) {
        void 0 === t && (t = 1);
        var n = 1 / t,
          i = t + (e ? 0 : 1),
          r = e ? 1 : 0;
        return function(t) {
          return ((i * Zt(0, .99999999, t) | 0) + r) * n
        }
      }
    }, b.ease = Ae["quad.out"], ft("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", (function(t) {
      return ut += t + "," + t + "Params,"
    }));
    var Be = function(t, e) {
        this.id = w++, t._gsap = this, this.target = t, this.harness = e, this.get = e ? e.get : pt, this.set = e ? e.getSetter : nn
      },
      ze = function() {
        function t(t) {
          this.vars = t, this._delay = +t.delay || 0, (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) && (this._rDelay = t.repeatDelay || 0, this._yoyo = !!t.yoyo || !!t.yoyoEase), this._ts = 1, Xt(this, +t.duration, 1, 1), this.data = t.data, a && (this._ctx = a, a.data.push(this)), p || Te.wake()
        }
        var e = t.prototype;
        return e.delay = function(t) {
          return t || 0 === t ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + t - this._delay), this._delay = t, this) : this._delay
        }, e.duration = function(t) {
          return arguments.length ? this.totalDuration(this._repeat > 0 ? t + (t + this._rDelay) * this._repeat : t) : this.totalDuration() && this._dur
        }, e.totalDuration = function(t) {
          return arguments.length ? (this._dirty = 0, Xt(this, this._repeat < 0 ? t : (t - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur
        }, e.totalTime = function(t, e) {
          if (we(), !arguments.length) return this._tTime;
          var n = this._dp;
          if (n && n.smoothChildTiming && this._ts) {
            for (Bt(this, t), !n._dp || n.parent || zt(n, this); n && n.parent;) n.parent._time !== n._start + (n._ts >= 0 ? n._tTime / n._ts : (n.totalDuration() - n._tTime) / -n._ts) && n.totalTime(n._tTime, !0), n = n.parent;
            !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && t < this._tDur || this._ts < 0 && t > 0 || !this._tDur && !t) && kt(this._dp, this, this._start - this._delay)
          }
          return (this._tTime !== t || !this._dur && !e || this._initted && Math.abs(this._zTime) === S || !t && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = t), yt(this, t, e)), this
        }, e.time = function(t, e) {
          return arguments.length ? this.totalTime(Math.min(this.totalDuration(), t + Ut(this)) % (this._dur + this._rDelay) || (t ? this._dur : 0), e) : this._time
        }, e.totalProgress = function(t, e) {
          return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0
        }, e.progress = function(t, e) {
          return arguments.length ? this.totalTime(this.duration() * (!this._yoyo || 1 & this.iteration() ? t : 1 - t) + Ut(this), e) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0
        }, e.iteration = function(t, e) {
          var n = this.duration() + this._rDelay;
          return arguments.length ? this.totalTime(this._time + (t - 1) * n, e) : this._repeat ? Nt(this._tTime, n) + 1 : 1
        }, e.timeScale = function(t, e) {
          if (!arguments.length) return -1e-8 === this._rts ? 0 : this._rts;
          if (this._rts === t) return this;
          var n = this.parent && this._ts ? Ot(this.parent._time, this) : this._tTime;
          return this._rts = +t || 0, this._ts = this._ps || -1e-8 === t ? 0 : this._rts, this.totalTime(Zt(-Math.abs(this._delay), this._tDur, n), !1 !== e), Ft(this),
            function(t) {
              for (var e = t.parent; e && e.parent;) e._dirty = 1, e.totalDuration(), e = e.parent;
              return t
            }(this)
        }, e.paused = function(t) {
          return arguments.length ? (this._ps !== t && (this._ps = t, t ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (we(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, 1 === this.progress() && Math.abs(this._zTime) !== S && (this._tTime -= S)))), this) : this._ps
        }, e.startTime = function(t) {
          if (arguments.length) {
            this._start = t;
            var e = this.parent || this._dp;
            return e && (e._sort || !this.parent) && kt(e, this, t - this._delay), this
          }
          return this._start
        }, e.endTime = function(t) {
          return this._start + (N(t) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1)
        }, e.rawTime = function(t) {
          var e = this.parent || this._dp;
          return e ? t && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? Ot(e.rawTime(t), this) : this._tTime : this._tTime
        }, e.revert = function(t) {
          void 0 === t && (t = nt);
          var e = r;
          return r = t, (this._initted || this._startAt) && (this.timeline && this.timeline.revert(t), this.totalTime(-.01, t.suppressEvents)), "nested" !== this.data && !1 !== t.kill && this.kill(), r = e, this
        }, e.globalTime = function(t) {
          for (var e = this, n = arguments.length ? t : e.rawTime(); e;) n = e._start + n / (Math.abs(e._ts) || 1), e = e._dp;
          return !this.parent && this._sat ? this._sat.globalTime(t) : n
        }, e.repeat = function(t) {
          return arguments.length ? (this._repeat = t === 1 / 0 ? -2 : t, jt(this)) : -2 === this._repeat ? 1 / 0 : this._repeat
        }, e.repeatDelay = function(t) {
          if (arguments.length) {
            var e = this._time;
            return this._rDelay = t, jt(this), e ? this.time(e) : this
          }
          return this._rDelay
        }, e.yoyo = function(t) {
          return arguments.length ? (this._yoyo = t, this) : this._yoyo
        }, e.seek = function(t, e) {
          return this.totalTime(Yt(this, t), N(e))
        }, e.restart = function(t, e) {
          return this.play().totalTime(t ? -this._delay : 0, N(e)), this._dur || (this._zTime = -1e-8), this
        }, e.play = function(t, e) {
          return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
        }, e.reverse = function(t, e) {
          return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
        }, e.pause = function(t, e) {
          return null != t && this.seek(t, e), this.paused(!0)
        }, e.resume = function() {
          return this.paused(!1)
        }, e.reversed = function(t) {
          return arguments.length ? (!!t !== this.reversed() && this.timeScale(-this._rts || (t ? -1e-8 : 0)), this) : this._rts < 0
        }, e.invalidate = function() {
          return this._initted = this._act = 0, this._zTime = -1e-8, this
        }, e.isActive = function() {
          var t, e = this.parent || this._dp,
            n = this._start;
          return !(e && !(this._ts && this._initted && e.isActive() && (t = e.rawTime(!0)) >= n && t < this.endTime(!0) - S))
        }, e.eventCallback = function(t, e, n) {
          var i = this.vars;
          return arguments.length > 1 ? (e ? (i[t] = e, n && (i[t + "Params"] = n), "onUpdate" === t && (this._onUpdate = e)) : delete i[t], this) : i[t]
        }, e.then = function(t) {
          var e = this;
          return new Promise((function(n) {
            var i = D(t) ? t : Mt,
              r = function() {
                var t = e.then;
                e.then = null, D(i) && (i = i(e)) && (i.then || i === e) && (e.then = t), n(i), e.then = t
              };
            e._initted && 1 === e.totalProgress() && e._ts >= 0 || !e._tTime && e._ts < 0 ? r() : e._prom = r
          }))
        }, e.kill = function() {
          pe(this)
        }, t
      }();
    St(ze.prototype, {
      _time: 0,
      _start: 0,
      _end: 0,
      _tTime: 0,
      _tDur: 0,
      _dirty: 0,
      _repeat: 0,
      _yoyo: !1,
      parent: null,
      _initted: !1,
      _rDelay: 0,
      _ts: 1,
      _dp: 0,
      ratio: 0,
      _zTime: -1e-8,
      _prom: 0,
      _ps: !1,
      _rts: 1
    });
    var ke = function(n) {
      function i(e, i) {
        var r;
        return void 0 === e && (e = {}), (r = n.call(this, e) || this).labels = {}, r.smoothChildTiming = !!e.smoothChildTiming, r.autoRemoveChildren = !!e.autoRemoveChildren, r._sort = N(e.sortChildren), s && kt(e.parent || s, t(r), i), e.reversed && r.reverse(), e.paused && r.paused(!0), e.scrollTrigger && Ht(t(r), e.scrollTrigger), r
      }
      e(i, n);
      var a = i.prototype;
      return a.to = function(t, e, n) {
        return $t(0, arguments, this), this
      }, a.from = function(t, e, n) {
        return $t(1, arguments, this), this
      }, a.fromTo = function(t, e, n, i) {
        return $t(2, arguments, this), this
      }, a.set = function(t, e, n) {
        return e.duration = 0, e.parent = this, At(e).repeatDelay || (e.repeat = 0), e.immediateRender = !!e.immediateRender, new Ze(t, e, Yt(this, n), 1), this
      }, a.call = function(t, e, n) {
        return kt(this, Ze.delayedCall(0, t, e), n)
      }, a.staggerTo = function(t, e, n, i, r, a, s) {
        return n.duration = e, n.stagger = n.stagger || i, n.onComplete = a, n.onCompleteParams = s, n.parent = this, new Ze(t, n, Yt(this, r)), this
      }, a.staggerFrom = function(t, e, n, i, r, a, s) {
        return n.runBackwards = 1, At(n).immediateRender = N(n.immediateRender), this.staggerTo(t, e, n, i, r, a, s)
      }, a.staggerFromTo = function(t, e, n, i, r, a, s, o) {
        return i.startAt = n, At(i).immediateRender = N(i.immediateRender), this.staggerTo(t, e, i, r, a, s, o)
      }, a.render = function(t, e, n) {
        var i, a, o, l, c, u, h, d, p, f, m, g, _ = this._time,
          v = this._dirty ? this.totalDuration() : this._tDur,
          x = this._dur,
          y = t <= 0 ? 0 : gt(t),
          b = this._zTime < 0 != t < 0 && (this._initted || !x);
        if (this !== s && y > v && t >= 0 && (y = v), y !== this._tTime || n || b) {
          if (_ !== this._time && x && (y += this._time - _, t += this._time - _), i = y, p = this._start, u = !(d = this._ts), b && (x || (_ = this._zTime), (t || !e) && (this._zTime = t)), this._repeat) {
            if (m = this._yoyo, c = x + this._rDelay, this._repeat < -1 && t < 0) return this.totalTime(100 * c + t, e, n);
            if (i = gt(y % c), y === v ? (l = this._repeat, i = x) : ((l = ~~(f = gt(y / c))) && l === f && (i = x, l--), i > x && (i = x)), f = Nt(this._tTime, c), !_ && this._tTime && f !== l && this._tTime - f * c - this._dur <= 0 && (f = l), m && 1 & l && (i = x - i, g = 1), l !== f && !this._lock) {
              var M = m && 1 & f,
                E = M === (m && 1 & l);
              if (l < f && (M = !M), _ = M ? 0 : y % x ? x : y, this._lock = 1, this.render(_ || (g ? 0 : gt(l * c)), e, !x)._lock = 0, this._tTime = y, !e && this.parent && de(this, "onRepeat"), this.vars.repeatRefresh && !g && (this.invalidate()._lock = 1), _ && _ !== this._time || u !== !this._ts || this.vars.onRepeat && !this.parent && !this._act) return this;
              if (x = this._dur, v = this._tDur, E && (this._lock = 2, _ = M ? x : -1e-4, this.render(_, !0), this.vars.repeatRefresh && !g && this.invalidate()), this._lock = 0, !this._ts && !u) return this;
              Le(this, g)
            }
          }
          if (this._hasPause && !this._forcing && this._lock < 2 && (h = function(t, e, n) {
              var i;
              if (n > e)
                for (i = t._first; i && i._start <= n;) {
                  if ("isPause" === i.data && i._start > e) return i;
                  i = i._next
                } else
                  for (i = t._last; i && i._start >= n;) {
                    if ("isPause" === i.data && i._start < e) return i;
                    i = i._prev
                  }
            }(this, gt(_), gt(i)), h && (y -= i - (i = h._start))), this._tTime = y, this._time = i, this._act = !d, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = t, _ = 0), !_ && i && !e && !l && (de(this, "onStart"), this._tTime !== y)) return this;
          if (i >= _ && t >= 0)
            for (a = this._first; a;) {
              if (o = a._next, (a._act || i >= a._start) && a._ts && h !== a) {
                if (a.parent !== this) return this.render(t, e, n);
                if (a.render(a._ts > 0 ? (i - a._start) * a._ts : (a._dirty ? a.totalDuration() : a._tDur) + (i - a._start) * a._ts, e, n), i !== this._time || !this._ts && !u) {
                  h = 0, o && (y += this._zTime = -1e-8);
                  break
                }
              }
              a = o
            } else {
              a = this._last;
              for (var T = t < 0 ? t : i; a;) {
                if (o = a._prev, (a._act || T <= a._end) && a._ts && h !== a) {
                  if (a.parent !== this) return this.render(t, e, n);
                  if (a.render(a._ts > 0 ? (T - a._start) * a._ts : (a._dirty ? a.totalDuration() : a._tDur) + (T - a._start) * a._ts, e, n || r && (a._initted || a._startAt)), i !== this._time || !this._ts && !u) {
                    h = 0, o && (y += this._zTime = T ? -1e-8 : S);
                    break
                  }
                }
                a = o
              }
            }
          if (h && !e && (this.pause(), h.render(i >= _ ? 0 : -1e-8)._zTime = i >= _ ? 1 : -1, this._ts)) return this._start = p, Ft(this), this.render(t, e, n);
          this._onUpdate && !e && de(this, "onUpdate", !0), (y === v && this._tTime >= this.totalDuration() || !y && _) && (p !== this._start && Math.abs(d) === Math.abs(this._ts) || this._lock || ((t || !x) && (y === v && this._ts > 0 || !y && this._ts < 0) && Pt(this, 1), e || t < 0 && !_ || !y && !_ && v || (de(this, y === v && t >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(y < v && this.timeScale() > 0) && this._prom())))
        }
        return this
      }, a.add = function(t, e) {
        var n = this;
        if (L(e) || (e = Yt(this, e, t)), !(t instanceof ze)) {
          if (z(t)) return t.forEach((function(t) {
            return n.add(t, e)
          })), this;
          if (P(t)) return this.addLabel(t, e);
          if (!D(t)) return this;
          t = Ze.delayedCall(0, t)
        }
        return this !== t ? kt(this, t, e) : this
      }, a.getChildren = function(t, e, n, i) {
        void 0 === t && (t = !0), void 0 === e && (e = !0), void 0 === n && (n = !0), void 0 === i && (i = -M);
        for (var r = [], a = this._first; a;) a._start >= i && (a instanceof Ze ? e && r.push(a) : (n && r.push(a), t && r.push.apply(r, a.getChildren(!0, e, n)))), a = a._next;
        return r
      }, a.getById = function(t) {
        for (var e = this.getChildren(1, 1, 1), n = e.length; n--;)
          if (e[n].vars.id === t) return e[n]
      }, a.remove = function(t) {
        return P(t) ? this.removeLabel(t) : D(t) ? this.killTweensOf(t) : (t.parent === this && Ct(this, t), t === this._recent && (this._recent = this._last), Dt(this))
      }, a.totalTime = function(t, e) {
        return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = gt(Te.time - (this._ts > 0 ? t / this._ts : (this.totalDuration() - t) / -this._ts))), n.prototype.totalTime.call(this, t, e), this._forcing = 0, this) : this._tTime
      }, a.addLabel = function(t, e) {
        return this.labels[t] = Yt(this, e), this
      }, a.removeLabel = function(t) {
        return delete this.labels[t], this
      }, a.addPause = function(t, e, n) {
        var i = Ze.delayedCall(0, e || Q, n);
        return i.data = "isPause", this._hasPause = 1, kt(this, i, Yt(this, t))
      }, a.removePause = function(t) {
        var e = this._first;
        for (t = Yt(this, t); e;) e._start === t && "isPause" === e.data && Pt(e), e = e._next
      }, a.killTweensOf = function(t, e, n) {
        for (var i = this.getTweensOf(t, n), r = i.length; r--;) He !== i[r] && i[r].kill(t, e);
        return this
      }, a.getTweensOf = function(t, e) {
        for (var n, i = [], r = ee(t), a = this._first, s = L(e); a;) a instanceof Ze ? vt(a._targets, r) && (s ? (!He || a._initted && a._ts) && a.globalTime(0) <= e && a.globalTime(a.totalDuration()) > e : !e || a.isActive()) && i.push(a) : (n = a.getTweensOf(r, e)).length && i.push.apply(i, n), a = a._next;
        return i
      }, a.tweenTo = function(t, e) {
        e = e || {};
        var n, i = this,
          r = Yt(i, t),
          a = e,
          s = a.startAt,
          o = a.onStart,
          l = a.onStartParams,
          c = a.immediateRender,
          u = Ze.to(i, St({
            ease: e.ease || "none",
            lazy: !1,
            immediateRender: !1,
            time: r,
            overwrite: "auto",
            duration: e.duration || Math.abs((r - (s && "time" in s ? s.time : i._time)) / i.timeScale()) || S,
            onStart: function() {
              if (i.pause(), !n) {
                var t = e.duration || Math.abs((r - (s && "time" in s ? s.time : i._time)) / i.timeScale());
                u._dur !== t && Xt(u, t, 0, 1).render(u._time, !0, !0), n = 1
              }
              o && o.apply(u, l || [])
            }
          }, e));
        return c ? u.render(0) : u
      }, a.tweenFromTo = function(t, e, n) {
        return this.tweenTo(e, St({
          startAt: {
            time: Yt(this, t)
          }
        }, n))
      }, a.recent = function() {
        return this._recent
      }, a.nextLabel = function(t) {
        return void 0 === t && (t = this._time), he(this, Yt(this, t))
      }, a.previousLabel = function(t) {
        return void 0 === t && (t = this._time), he(this, Yt(this, t), 1)
      }, a.currentLabel = function(t) {
        return arguments.length ? this.seek(t, !0) : this.previousLabel(this._time + S)
      }, a.shiftChildren = function(t, e, n) {
        void 0 === n && (n = 0);
        for (var i, r = this._first, a = this.labels; r;) r._start >= n && (r._start += t, r._end += t), r = r._next;
        if (e)
          for (i in a) a[i] >= n && (a[i] += t);
        return Dt(this)
      }, a.invalidate = function(t) {
        var e = this._first;
        for (this._lock = 0; e;) e.invalidate(t), e = e._next;
        return n.prototype.invalidate.call(this, t)
      }, a.clear = function(t) {
        void 0 === t && (t = !0);
        for (var e, n = this._first; n;) e = n._next, this.remove(n), n = e;
        return this._dp && (this._time = this._tTime = this._pTime = 0), t && (this.labels = {}), Dt(this)
      }, a.totalDuration = function(t) {
        var e, n, i, r = 0,
          a = this,
          o = a._last,
          l = M;
        if (arguments.length) return a.timeScale((a._repeat < 0 ? a.duration() : a.totalDuration()) / (a.reversed() ? -t : t));
        if (a._dirty) {
          for (i = a.parent; o;) e = o._prev, o._dirty && o.totalDuration(), (n = o._start) > l && a._sort && o._ts && !a._lock ? (a._lock = 1, kt(a, o, n - o._delay, 1)._lock = 0) : l = n, n < 0 && o._ts && (r -= n, (!i && !a._dp || i && i.smoothChildTiming) && (a._start += n / a._ts, a._time -= n, a._tTime -= n), a.shiftChildren(-n, !1, -Infinity), l = 0), o._end > r && o._ts && (r = o._end), o = e;
          Xt(a, a === s && a._time > r ? a._time : r, 1, 1), a._dirty = 0
        }
        return a._tDur
      }, i.updateRoot = function(t) {
        if (s._ts && (yt(s, Ot(t, s)), h = Te.frame), Te.frame >= lt) {
          lt += y.autoSleep || 120;
          var e = s._first;
          if ((!e || !e._ts) && y.autoSleep && Te._listeners.length < 2) {
            for (; e && !e._ts;) e = e._next;
            e || Te.sleep()
          }
        }
      }, i
    }(ze);
    St(ke.prototype, {
      _lock: 0,
      _hasPause: 0,
      _forcing: 0
    });
    var He, Ve, Ge = function(t, e, n, i, r, a, s) {
        var o, l, c, u, h, d, p, f, m = new dn(this._pt, t, e, 0, 1, sn, null, r),
          g = 0,
          _ = 0;
        for (m.b = n, m.e = i, n += "", (p = ~(i += "").indexOf("random(")) && (i = ce(i)), a && (a(f = [n, i], t, e), n = f[0], i = f[1]), l = n.match(G) || []; o = G.exec(i);) u = o[0], h = i.substring(g, o.index), c ? c = (c + 1) % 5 : "rgba(" === h.substr(-5) && (c = 1), u !== l[_++] && (d = parseFloat(l[_ - 1]) || 0, m._pt = {
          _next: m._pt,
          p: h || 1 === _ ? h : ",",
          s: d,
          c: "=" === u.charAt(1) ? _t(d, u) - d : parseFloat(u) - d,
          m: c && c < 4 ? Math.round : 0
        }, g = G.lastIndex);
        return m.c = g < i.length ? i.substring(g, i.length) : "", m.fp = s, (W.test(i) || p) && (m.e = 0), this._pt = m, m
      },
      We = function(t, e, n, i, r, a, s, o, l, c) {
        D(i) && (i = i(r || 0, t, a));
        var u, h = t[e],
          d = "get" !== n ? n : D(h) ? l ? t[e.indexOf("set") || !D(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](l) : t[e]() : h,
          p = D(h) ? l ? tn : Qe : Je;
        if (P(i) && (~i.indexOf("random(") && (i = ce(i)), "=" === i.charAt(1) && ((u = _t(d, i) + (Jt(d) || 0)) || 0 === u) && (i = u)), !c || d !== i || Ve) return isNaN(d * i) || "" === i ? (!h && !(e in t) && K(e, i), Ge.call(this, t, e, d, i, p, o || y.stringFilter, l)) : (u = new dn(this._pt, t, e, +d || 0, i - (d || 0), "boolean" == typeof h ? an : rn, 0, p), l && (u.fp = l), s && u.modifier(s, this, t), this._pt = u)
      },
      Xe = function(t, e, n, i, r, a) {
        var s, o, l, c;
        if (st[t] && !1 !== (s = new st[t]).init(r, s.rawVars ? e[t] : function(t, e, n, i, r) {
            if (D(t) && (t = Ye(t, r, e, n, i)), !U(t) || t.style && t.nodeType || z(t) || B(t)) return P(t) ? Ye(t, r, e, n, i) : t;
            var a, s = {};
            for (a in t) s[a] = Ye(t[a], r, e, n, i);
            return s
          }(e[t], i, r, a, n), n, i, a) && (n._pt = o = new dn(n._pt, r, t, 0, 1, s.render, s, 0, s.priority), n !== d))
          for (l = n._ptLookup[n._targets.indexOf(r)], c = s._props.length; c--;) l[s._props[c]] = o;
        return s
      },
      je = function t(e, n, a) {
        var o, l, c, u, h, d, p, f, m, g, _, v, x, y = e.vars,
          E = y.ease,
          T = y.startAt,
          w = y.immediateRender,
          A = y.lazy,
          R = y.onUpdate,
          C = y.runBackwards,
          P = y.yoyoEase,
          D = y.keyframes,
          L = y.autoRevert,
          I = e._dur,
          U = e._startAt,
          O = e._targets,
          F = e.parent,
          B = F && "nested" === F.data ? F.vars.targets : O,
          z = "auto" === e._overwrite && !i,
          k = e.timeline;
        if (k && (!D || !E) && (E = "none"), e._ease = Ie(E, b.ease), e._yEase = P ? De(Ie(!0 === P ? E : P, b.ease)) : 0, P && e._yoyo && !e._repeat && (P = e._yEase, e._yEase = e._ease, e._ease = P), e._from = !k && !!y.runBackwards, !k || D && !y.stagger) {
          if (v = (f = O[0] ? dt(O[0]).harness : 0) && y[f.prop], o = wt(y, it), U && (U._zTime < 0 && U.progress(1), n < 0 && C && w && !L ? U.render(-1, !0) : U.revert(C && I ? et : tt), U._lazy = 0), T) {
            if (Pt(e._startAt = Ze.set(O, St({
                data: "isStart",
                overwrite: !1,
                parent: F,
                immediateRender: !0,
                lazy: !U && N(A),
                startAt: null,
                delay: 0,
                onUpdate: R && function() {
                  return de(e, "onUpdate")
                },
                stagger: 0
              }, T))), e._startAt._dp = 0, e._startAt._sat = e, n < 0 && (r || !w && !L) && e._startAt.revert(et), w && I && n <= 0 && a <= 0) return void(n && (e._zTime = n))
          } else if (C && I && !U)
            if (n && (w = !1), c = St({
                overwrite: !1,
                data: "isFromStart",
                lazy: w && !U && N(A),
                immediateRender: w,
                stagger: 0,
                parent: F
              }, o), v && (c[f.prop] = v), Pt(e._startAt = Ze.set(O, c)), e._startAt._dp = 0, e._startAt._sat = e, n < 0 && (r ? e._startAt.revert(et) : e._startAt.render(-1, !0)), e._zTime = n, w) {
              if (!n) return
            } else t(e._startAt, S, S);
          for (e._pt = e._ptCache = 0, A = I && N(A) || A && !I, l = 0; l < O.length; l++) {
            if (p = (h = O[l])._gsap || ht(O)[l]._gsap, e._ptLookup[l] = g = {}, at[p.id] && rt.length && xt(), _ = B === O ? l : B.indexOf(h), f && !1 !== (m = new f).init(h, v || o, e, _, B) && (e._pt = u = new dn(e._pt, h, m.name, 0, 1, m.render, m, 0, m.priority), m._props.forEach((function(t) {
                g[t] = u
              })), m.priority && (d = 1)), !f || v)
              for (c in o) st[c] && (m = Xe(c, o, e, _, h, B)) ? m.priority && (d = 1) : g[c] = u = We.call(e, h, c, "get", o[c], _, B, 0, y.stringFilter);
            e._op && e._op[l] && e.kill(h, e._op[l]), z && e._pt && (He = e, s.killTweensOf(h, g, e.globalTime(n)), x = !e.parent, He = 0), e._pt && A && (at[p.id] = 1)
          }
          d && hn(e), e._onInit && e._onInit(e)
        }
        e._onUpdate = R, e._initted = (!e._op || e._pt) && !x, D && n <= 0 && k.render(M, !0, !0)
      },
      qe = function(t, e, n, i) {
        var r, a, s = e.ease || i || "power1.inOut";
        if (z(e)) a = n[t] || (n[t] = []), e.forEach((function(t, n) {
          return a.push({
            t: n / (e.length - 1) * 100,
            v: t,
            e: s
          })
        }));
        else
          for (r in e) a = n[r] || (n[r] = []), "ease" === r || a.push({
            t: parseFloat(t),
            v: e[r],
            e: s
          })
      },
      Ye = function(t, e, n, i, r) {
        return D(t) ? t.call(e, n, i, r) : P(t) && ~t.indexOf("random(") ? ce(t) : t
      },
      $e = ut + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
      Ke = {};
    ft($e + ",id,stagger,delay,duration,paused,scrollTrigger", (function(t) {
      return Ke[t] = 1
    }));
    var Ze = function(n) {
      function a(e, r, a, o) {
        var l;
        "number" == typeof r && (a.duration = r, r = a, a = null);
        var c, u, h, d, p, f, m, g, _ = (l = n.call(this, o ? r : At(r)) || this).vars,
          v = _.duration,
          x = _.delay,
          b = _.immediateRender,
          M = _.stagger,
          S = _.overwrite,
          E = _.keyframes,
          T = _.defaults,
          w = _.scrollTrigger,
          A = _.yoyoEase,
          R = r.parent || s,
          C = (z(e) || B(e) ? L(e[0]) : "length" in r) ? [e] : ee(e);
        if (l._targets = C.length ? ht(C) : Z("GSAP target " + e + " not found. https://gsap.com", !y.nullTargetWarn) || [], l._ptLookup = [], l._overwrite = S, E || M || F(v) || F(x)) {
          if (r = l.vars, (c = l.timeline = new ke({
              data: "nested",
              defaults: T || {},
              targets: R && "nested" === R.data ? R.vars.targets : C
            })).kill(), c.parent = c._dp = t(l), c._start = 0, M || F(v) || F(x)) {
            if (d = C.length, m = M && re(M), U(M))
              for (p in M) ~$e.indexOf(p) && (g || (g = {}), g[p] = M[p]);
            for (u = 0; u < d; u++)(h = wt(r, Ke)).stagger = 0, A && (h.yoyoEase = A), g && Et(h, g), f = C[u], h.duration = +Ye(v, t(l), u, f, C), h.delay = (+Ye(x, t(l), u, f, C) || 0) - l._delay, !M && 1 === d && h.delay && (l._delay = x = h.delay, l._start += x, h.delay = 0), c.to(f, h, m ? m(u, f, C) : 0), c._ease = Ae.none;
            c.duration() ? v = x = 0 : l.timeline = 0
          } else if (E) {
            At(St(c.vars.defaults, {
              ease: "none"
            })), c._ease = Ie(E.ease || r.ease || "none");
            var P, D, I, O = 0;
            if (z(E)) E.forEach((function(t) {
              return c.to(C, t, ">")
            })), c.duration();
            else {
              for (p in h = {}, E) "ease" === p || "easeEach" === p || qe(p, E[p], h, E.easeEach);
              for (p in h)
                for (P = h[p].sort((function(t, e) {
                    return t.t - e.t
                  })), O = 0, u = 0; u < P.length; u++)(I = {
                  ease: (D = P[u]).e,
                  duration: (D.t - (u ? P[u - 1].t : 0)) / 100 * v
                })[p] = D.v, c.to(C, I, O), O += I.duration;
              c.duration() < v && c.to({}, {
                duration: v - c.duration()
              })
            }
          }
          v || l.duration(v = c.duration())
        } else l.timeline = 0;
        return !0 !== S || i || (He = t(l), s.killTweensOf(C), He = 0), kt(R, t(l), a), r.reversed && l.reverse(), r.paused && l.paused(!0), (b || !v && !E && l._start === gt(R._time) && N(b) && It(t(l)) && "nested" !== R.data) && (l._tTime = -1e-8, l.render(Math.max(0, -x) || 0)), w && Ht(t(l), w), l
      }
      e(a, n);
      var o = a.prototype;
      return o.render = function(t, e, n) {
        var i, a, s, o, l, c, u, h, d, p = this._time,
          f = this._tDur,
          m = this._dur,
          g = t < 0,
          _ = t > f - S && !g ? f : t < S ? 0 : t;
        if (m) {
          if (_ !== this._tTime || !t || n || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== g || this._lazy) {
            if (i = _, h = this.timeline, this._repeat) {
              if (o = m + this._rDelay, this._repeat < -1 && g) return this.totalTime(100 * o + t, e, n);
              if (i = gt(_ % o), _ === f ? (s = this._repeat, i = m) : (s = ~~(l = gt(_ / o))) && s === l ? (i = m, s--) : i > m && (i = m), (c = this._yoyo && 1 & s) && (d = this._yEase, i = m - i), l = Nt(this._tTime, o), i === p && !n && this._initted && s === l) return this._tTime = _, this;
              s !== l && (h && this._yEase && Le(h, c), this.vars.repeatRefresh && !c && !this._lock && i !== o && this._initted && (this._lock = n = 1, this.render(gt(o * s), !0).invalidate()._lock = 0))
            }
            if (!this._initted) {
              if (Vt(this, g ? t : i, n, e, _)) return this._tTime = 0, this;
              if (!(p === this._time || n && this.vars.repeatRefresh && s !== l)) return this;
              if (m !== this._dur) return this.render(t, e, n)
            }
            if (this._tTime = _, this._time = i, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = u = (d || this._ease)(i / m), this._from && (this.ratio = u = 1 - u), i && !p && !e && !s && (de(this, "onStart"), this._tTime !== _)) return this;
            for (a = this._pt; a;) a.r(u, a.d), a = a._next;
            h && h.render(t < 0 ? t : h._dur * h._ease(i / this._dur), e, n) || this._startAt && (this._zTime = t), this._onUpdate && !e && (g && Lt(this, t, 0, n), de(this, "onUpdate")), this._repeat && s !== l && this.vars.onRepeat && !e && this.parent && de(this, "onRepeat"), _ !== this._tDur && _ || this._tTime !== _ || (g && !this._onUpdate && Lt(this, t, 0, !0), (t || !m) && (_ === this._tDur && this._ts > 0 || !_ && this._ts < 0) && Pt(this, 1), e || g && !p || !(_ || p || c) || (de(this, _ === f ? "onComplete" : "onReverseComplete", !0), this._prom && !(_ < f && this.timeScale() > 0) && this._prom()))
          }
        } else ! function(t, e, n, i) {
          var a, s, o, l = t.ratio,
            c = e < 0 || !e && (!t._start && Gt(t) && (t._initted || !Wt(t)) || (t._ts < 0 || t._dp._ts < 0) && !Wt(t)) ? 0 : 1,
            u = t._rDelay,
            h = 0;
          if (u && t._repeat && (h = Zt(0, t._tDur, e), s = Nt(h, u), t._yoyo && 1 & s && (c = 1 - c), s !== Nt(t._tTime, u) && (l = 1 - c, t.vars.repeatRefresh && t._initted && t.invalidate())), c !== l || r || i || t._zTime === S || !e && t._zTime) {
            if (!t._initted && Vt(t, e, i, n, h)) return;
            for (o = t._zTime, t._zTime = e || (n ? S : 0), n || (n = e && !o), t.ratio = c, t._from && (c = 1 - c), t._time = 0, t._tTime = h, a = t._pt; a;) a.r(c, a.d), a = a._next;
            e < 0 && Lt(t, e, 0, !0), t._onUpdate && !n && de(t, "onUpdate"), h && t._repeat && !n && t.parent && de(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === c && (c && Pt(t, 1), n || r || (de(t, c ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()))
          } else t._zTime || (t._zTime = e)
        }(this, t, e, n);
        return this
      }, o.targets = function() {
        return this._targets
      }, o.invalidate = function(t) {
        return (!t || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(t), n.prototype.invalidate.call(this, t)
      }, o.resetTo = function(t, e, n, i, r) {
        p || Te.wake(), this._ts || this.play();
        var a = Math.min(this._dur, (this._dp._time - this._start) * this._ts);
        return this._initted || je(this, a),
          function(t, e, n, i, r, a, s, o) {
            var l, c, u, h, d = (t._pt && t._ptCache || (t._ptCache = {}))[e];
            if (!d)
              for (d = t._ptCache[e] = [], u = t._ptLookup, h = t._targets.length; h--;) {
                if ((l = u[h][e]) && l.d && l.d._pt)
                  for (l = l.d._pt; l && l.p !== e && l.fp !== e;) l = l._next;
                if (!l) return Ve = 1, t.vars[e] = "+=0", je(t, s), Ve = 0, o ? Z(e + " not eligible for reset") : 1;
                d.push(l)
              }
            for (h = d.length; h--;)(l = (c = d[h])._pt || c).s = !i && 0 !== i || r ? l.s + (i || 0) + a * l.c : i, l.c = n - l.s, c.e && (c.e = mt(n) + Jt(c.e)), c.b && (c.b = l.s + Jt(c.b))
          }(this, t, e, n, i, this._ease(a / this._dur), a, r) ? this.resetTo(t, e, n, i, 1) : (Bt(this, 0), this.parent || Rt(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0))
      }, o.kill = function(t, e) {
        if (void 0 === e && (e = "all"), !(t || e && "all" !== e)) return this._lazy = this._pt = 0, this.parent ? pe(this) : this.scrollTrigger && this.scrollTrigger.kill(!!r), this;
        if (this.timeline) {
          var n = this.timeline.totalDuration();
          return this.timeline.killTweensOf(t, e, He && !0 !== He.vars.overwrite)._first || pe(this), this.parent && n !== this.timeline.totalDuration() && Xt(this, this._dur * this.timeline._tDur / n, 0, 1), this
        }
        var i, a, s, o, l, c, u, h = this._targets,
          d = t ? ee(t) : h,
          p = this._ptLookup,
          f = this._pt;
        if ((!e || "all" === e) && function(t, e) {
            for (var n = t.length, i = n === e.length; i && n-- && t[n] === e[n];);
            return n < 0
          }(h, d)) return "all" === e && (this._pt = 0), pe(this);
        for (i = this._op = this._op || [], "all" !== e && (P(e) && (l = {}, ft(e, (function(t) {
            return l[t] = 1
          })), e = l), e = function(t, e) {
            var n, i, r, a, s = t[0] ? dt(t[0]).harness : 0,
              o = s && s.aliases;
            if (!o) return e;
            for (i in n = Et({}, e), o)
              if (i in n)
                for (r = (a = o[i].split(",")).length; r--;) n[a[r]] = n[i];
            return n
          }(h, e)), u = h.length; u--;)
          if (~d.indexOf(h[u]))
            for (l in a = p[u], "all" === e ? (i[u] = e, o = a, s = {}) : (s = i[u] = i[u] || {}, o = e), o)(c = a && a[l]) && ("kill" in c.d && !0 !== c.d.kill(l) || Ct(this, c, "_pt"), delete a[l]), "all" !== s && (s[l] = 1);
        return this._initted && !this._pt && f && pe(this), this
      }, a.to = function(t, e) {
        return new a(t, e, arguments[2])
      }, a.from = function(t, e) {
        return $t(1, arguments)
      }, a.delayedCall = function(t, e, n, i) {
        return new a(e, 0, {
          immediateRender: !1,
          lazy: !1,
          overwrite: !1,
          delay: t,
          onComplete: e,
          onReverseComplete: e,
          onCompleteParams: n,
          onReverseCompleteParams: n,
          callbackScope: i
        })
      }, a.fromTo = function(t, e, n) {
        return $t(2, arguments)
      }, a.set = function(t, e) {
        return e.duration = 0, e.repeatDelay || (e.repeat = 0), new a(t, e)
      }, a.killTweensOf = function(t, e, n) {
        return s.killTweensOf(t, e, n)
      }, a
    }(ze);
    St(Ze.prototype, {
      _targets: [],
      _lazy: 0,
      _startAt: 0,
      _op: 0,
      _onInit: 0
    }), ft("staggerTo,staggerFrom,staggerFromTo", (function(t) {
      Ze[t] = function() {
        var e = new ke,
          n = Qt.call(arguments, 0);
        return n.splice("staggerFromTo" === t ? 5 : 4, 0, 0), e[t].apply(e, n)
      }
    }));
    var Je = function(t, e, n) {
        return t[e] = n
      },
      Qe = function(t, e, n) {
        return t[e](n)
      },
      tn = function(t, e, n, i) {
        return t[e](i.fp, n)
      },
      en = function(t, e, n) {
        return t.setAttribute(e, n)
      },
      nn = function(t, e) {
        return D(t[e]) ? Qe : I(t[e]) && t.setAttribute ? en : Je
      },
      rn = function(t, e) {
        return e.set(e.t, e.p, Math.round(1e6 * (e.s + e.c * t)) / 1e6, e)
      },
      an = function(t, e) {
        return e.set(e.t, e.p, !!(e.s + e.c * t), e)
      },
      sn = function(t, e) {
        var n = e._pt,
          i = "";
        if (!t && e.b) i = e.b;
        else if (1 === t && e.e) i = e.e;
        else {
          for (; n;) i = n.p + (n.m ? n.m(n.s + n.c * t) : Math.round(1e4 * (n.s + n.c * t)) / 1e4) + i, n = n._next;
          i += e.c
        }
        e.set(e.t, e.p, i, e)
      },
      on = function(t, e) {
        for (var n = e._pt; n;) n.r(t, n.d), n = n._next
      },
      ln = function(t, e, n, i) {
        for (var r, a = this._pt; a;) r = a._next, a.p === i && a.modifier(t, e, n), a = r
      },
      cn = function(t) {
        for (var e, n, i = this._pt; i;) n = i._next, i.p === t && !i.op || i.op === t ? Ct(this, i, "_pt") : i.dep || (e = 1), i = n;
        return !e
      },
      un = function(t, e, n, i) {
        i.mSet(t, e, i.m.call(i.tween, n, i.mt), i)
      },
      hn = function(t) {
        for (var e, n, i, r, a = t._pt; a;) {
          for (e = a._next, n = i; n && n.pr > a.pr;) n = n._next;
          (a._prev = n ? n._prev : r) ? a._prev._next = a: i = a, (a._next = n) ? n._prev = a : r = a, a = e
        }
        t._pt = i
      },
      dn = function() {
        function t(t, e, n, i, r, a, s, o, l) {
          this.t = e, this.s = i, this.c = r, this.p = n, this.r = a || rn, this.d = s || this, this.set = o || Je, this.pr = l || 0, this._next = t, t && (t._prev = this)
        }
        return t.prototype.modifier = function(t, e, n) {
          this.mSet = this.mSet || this.set, this.set = un, this.m = t, this.mt = n, this.tween = e
        }, t
      }();
    ft(ut + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", (function(t) {
      return it[t] = 1
    })), q.TweenMax = q.TweenLite = Ze, q.TimelineLite = q.TimelineMax = ke, s = new ke({
      sortChildren: !1,
      defaults: b,
      autoRemoveChildren: !0,
      id: "root",
      smoothChildTiming: !0
    }), y.stringFilter = Ee;
    var pn = [],
      fn = {},
      mn = [],
      gn = 0,
      _n = 0,
      vn = function(t) {
        return (fn[t] || mn).map((function(t) {
          return t()
        }))
      },
      xn = function() {
        var t = Date.now(),
          e = [];
        t - gn > 2 && (vn("matchMediaInit"), pn.forEach((function(t) {
          var n, i, r, a, s = t.queries,
            l = t.conditions;
          for (i in s)(n = o.matchMedia(s[i]).matches) && (r = 1), n !== l[i] && (l[i] = n, a = 1);
          a && (t.revert(), r && e.push(t))
        })), vn("matchMediaRevert"), e.forEach((function(t) {
          return t.onMatch(t, (function(e) {
            return t.add(null, e)
          }))
        })), gn = t, vn("matchMedia"))
      },
      yn = function() {
        function t(t, e) {
          this.selector = e && ne(e), this.data = [], this._r = [], this.isReverted = !1, this.id = _n++, t && this.add(t)
        }
        var e = t.prototype;
        return e.add = function(t, e, n) {
          D(t) && (n = e, e = t, t = D);
          var i = this,
            r = function() {
              var t, r = a,
                s = i.selector;
              return r && r !== i && r.data.push(i), n && (i.selector = ne(n)), a = i, t = e.apply(i, arguments), D(t) && i._r.push(t), a = r, i.selector = s, i.isReverted = !1, t
            };
          return i.last = r, t === D ? r(i, (function(t) {
            return i.add(null, t)
          })) : t ? i[t] = r : r
        }, e.ignore = function(t) {
          var e = a;
          a = null, t(this), a = e
        }, e.getTweens = function() {
          var e = [];
          return this.data.forEach((function(n) {
            return n instanceof t ? e.push.apply(e, n.getTweens()) : n instanceof Ze && !(n.parent && "nested" === n.parent.data) && e.push(n)
          })), e
        }, e.clear = function() {
          this._r.length = this.data.length = 0
        }, e.kill = function(t, e) {
          var n = this;
          if (t ? function() {
              for (var e, i = n.getTweens(), r = n.data.length; r--;) "isFlip" === (e = n.data[r]).data && (e.revert(), e.getChildren(!0, !0, !1).forEach((function(t) {
                return i.splice(i.indexOf(t), 1)
              })));
              for (i.map((function(t) {
                  return {
                    g: t._dur || t._delay || t._sat && !t._sat.vars.immediateRender ? t.globalTime(0) : -1 / 0,
                    t
                  }
                })).sort((function(t, e) {
                  return e.g - t.g || -1 / 0
                })).forEach((function(e) {
                  return e.t.revert(t)
                })), r = n.data.length; r--;)(e = n.data[r]) instanceof ke ? "nested" !== e.data && (e.scrollTrigger && e.scrollTrigger.revert(), e.kill()) : !(e instanceof Ze) && e.revert && e.revert(t);
              n._r.forEach((function(e) {
                return e(t, n)
              })), n.isReverted = !0
            }() : this.data.forEach((function(t) {
              return t.kill && t.kill()
            })), this.clear(), e)
            for (var i = pn.length; i--;) pn[i].id === this.id && pn.splice(i, 1)
        }, e.revert = function(t) {
          this.kill(t || {})
        }, t
      }(),
      bn = function() {
        function t(t) {
          this.contexts = [], this.scope = t, a && a.data.push(this)
        }
        var e = t.prototype;
        return e.add = function(t, e, n) {
          U(t) || (t = {
            matches: t
          });
          var i, r, s, l = new yn(0, n || this.scope),
            c = l.conditions = {};
          for (r in a && !l.selector && (l.selector = a.selector), this.contexts.push(l), e = l.add("onMatch", e), l.queries = t, t) "all" === r ? s = 1 : (i = o.matchMedia(t[r])) && (pn.indexOf(l) < 0 && pn.push(l), (c[r] = i.matches) && (s = 1), i.addListener ? i.addListener(xn) : i.addEventListener("change", xn));
          return s && e(l, (function(t) {
            return l.add(null, t)
          })), this
        }, e.revert = function(t) {
          this.kill(t || {})
        }, e.kill = function(t) {
          this.contexts.forEach((function(e) {
            return e.kill(t, !0)
          }))
        }, t
      }(),
      Mn = {
        registerPlugin: function() {
          for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
          e.forEach((function(t) {
            return me(t)
          }))
        },
        timeline: function(t) {
          return new ke(t)
        },
        getTweensOf: function(t, e) {
          return s.getTweensOf(t, e)
        },
        getProperty: function(t, e, n, i) {
          P(t) && (t = ee(t)[0]);
          var r = dt(t || {}).get,
            a = n ? Mt : bt;
          return "native" === n && (n = ""), t ? e ? a((st[e] && st[e].get || r)(t, e, n, i)) : function(e, n, i) {
            return a((st[e] && st[e].get || r)(t, e, n, i))
          } : t
        },
        quickSetter: function(t, e, n) {
          if ((t = ee(t)).length > 1) {
            var i = t.map((function(t) {
                return Tn.quickSetter(t, e, n)
              })),
              r = i.length;
            return function(t) {
              for (var e = r; e--;) i[e](t)
            }
          }
          t = t[0] || {};
          var a = st[e],
            s = dt(t),
            o = s.harness && (s.harness.aliases || {})[e] || e,
            l = a ? function(e) {
              var i = new a;
              d._pt = 0, i.init(t, n ? e + n : e, d, 0, [t]), i.render(1, i), d._pt && on(1, d)
            } : s.set(t, o);
          return a ? l : function(e) {
            return l(t, o, n ? e + n : e, s, 1)
          }
        },
        quickTo: function(t, e, n) {
          var i, r = Tn.to(t, St(((i = {})[e] = "+=0.1", i.paused = !0, i.stagger = 0, i), n || {})),
            a = function(t, n, i) {
              return r.resetTo(e, t, n, i)
            };
          return a.tween = r, a
        },
        isTweening: function(t) {
          return s.getTweensOf(t, !0).length > 0
        },
        defaults: function(t) {
          return t && t.ease && (t.ease = Ie(t.ease, b.ease)), Tt(b, t || {})
        },
        config: function(t) {
          return Tt(y, t || {})
        },
        registerEffect: function(t) {
          var e = t.name,
            n = t.effect,
            i = t.plugins,
            r = t.defaults,
            a = t.extendTimeline;
          (i || "").split(",").forEach((function(t) {
            return t && !st[t] && !q[t] && Z(e + " effect requires " + t + " plugin.")
          })), ot[e] = function(t, e, i) {
            return n(ee(t), St(e || {}, r), i)
          }, a && (ke.prototype[e] = function(t, n, i) {
            return this.add(ot[e](t, U(n) ? n : (i = n) && {}, this), i)
          })
        },
        registerEase: function(t, e) {
          Ae[t] = Ie(e)
        },
        parseEase: function(t, e) {
          return arguments.length ? Ie(t, e) : Ae
        },
        getById: function(t) {
          return s.getById(t)
        },
        exportRoot: function(t, e) {
          void 0 === t && (t = {});
          var n, i, r = new ke(t);
          for (r.smoothChildTiming = N(t.smoothChildTiming), s.remove(r), r._dp = 0, r._time = r._tTime = s._time, n = s._first; n;) i = n._next, !e && !n._dur && n instanceof Ze && n.vars.onComplete === n._targets[0] || kt(r, n, n._start - n._delay), n = i;
          return kt(s, r, 0), r
        },
        context: function(t, e) {
          return t ? new yn(t, e) : a
        },
        matchMedia: function(t) {
          return new bn(t)
        },
        matchMediaRefresh: function() {
          return pn.forEach((function(t) {
            var e, n, i = t.conditions;
            for (n in i) i[n] && (i[n] = !1, e = 1);
            e && t.revert()
          })) || xn()
        },
        addEventListener: function(t, e) {
          var n = fn[t] || (fn[t] = []);
          ~n.indexOf(e) || n.push(e)
        },
        removeEventListener: function(t, e) {
          var n = fn[t],
            i = n && n.indexOf(e);
          i >= 0 && n.splice(i, 1)
        },
        utils: {
          wrap: function t(e, n, i) {
            var r = n - e;
            return z(e) ? le(e, t(0, e.length), n) : Kt(i, (function(t) {
              return (r + (t - e) % r) % r + e
            }))
          },
          wrapYoyo: function t(e, n, i) {
            var r = n - e,
              a = 2 * r;
            return z(e) ? le(e, t(0, e.length - 1), n) : Kt(i, (function(t) {
              return e + ((t = (a + (t - e) % a) % a || 0) > r ? a - t : t)
            }))
          },
          distribute: re,
          random: oe,
          snap: se,
          normalize: function(t, e, n) {
            return ue(t, e, 0, 1, n)
          },
          getUnit: Jt,
          clamp: function(t, e, n) {
            return Kt(n, (function(n) {
              return Zt(t, e, n)
            }))
          },
          splitColor: xe,
          toArray: ee,
          selector: ne,
          mapRange: ue,
          pipe: function() {
            for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
            return function(t) {
              return e.reduce((function(t, e) {
                return e(t)
              }), t)
            }
          },
          unitize: function(t, e) {
            return function(n) {
              return t(parseFloat(n)) + (e || Jt(n))
            }
          },
          interpolate: function t(e, n, i, r) {
            var a = isNaN(e + n) ? 0 : function(t) {
              return (1 - t) * e + t * n
            };
            if (!a) {
              var s, o, l, c, u, h = P(e),
                d = {};
              if (!0 === i && (r = 1) && (i = null), h) e = {
                p: e
              }, n = {
                p: n
              };
              else if (z(e) && !z(n)) {
                for (l = [], c = e.length, u = c - 2, o = 1; o < c; o++) l.push(t(e[o - 1], e[o]));
                c--, a = function(t) {
                  t *= c;
                  var e = Math.min(u, ~~t);
                  return l[e](t - e)
                }, i = n
              } else r || (e = Et(z(e) ? [] : {}, e));
              if (!l) {
                for (s in n) We.call(d, e, s, "get", n[s]);
                a = function(t) {
                  return on(t, d) || (h ? e.p : e)
                }
              }
            }
            return Kt(i, a)
          },
          shuffle: ie
        },
        install: $,
        effects: ot,
        ticker: Te,
        updateRoot: ke.updateRoot,
        plugins: st,
        globalTimeline: s,
        core: {
          PropTween: dn,
          globals: J,
          Tween: Ze,
          Timeline: ke,
          Animation: ze,
          getCache: dt,
          _removeLinkedListItem: Ct,
          reverting: function() {
            return r
          },
          context: function(t) {
            return t && a && (a.data.push(t), t._ctx = a), a
          },
          suppressOverwrites: function(t) {
            return i = t
          }
        }
      };
    ft("to,from,fromTo,delayedCall,set,killTweensOf", (function(t) {
      return Mn[t] = Ze[t]
    })), Te.add(ke.updateRoot), d = Mn.to({}, {
      duration: 0
    });
    var Sn = function(t, e) {
        for (var n = t._pt; n && n.p !== e && n.op !== e && n.fp !== e;) n = n._next;
        return n
      },
      En = function(t, e) {
        return {
          name: t,
          rawVars: 1,
          init: function(t, n, i) {
            i._onInit = function(t) {
              var i, r;
              if (P(n) && (i = {}, ft(n, (function(t) {
                  return i[t] = 1
                })), n = i), e) {
                for (r in i = {}, n) i[r] = e(n[r]);
                n = i
              }! function(t, e) {
                var n, i, r, a = t._targets;
                for (n in e)
                  for (i = a.length; i--;)(r = t._ptLookup[i][n]) && (r = r.d) && (r._pt && (r = Sn(r, n)), r && r.modifier && r.modifier(e[n], t, a[i], n))
              }(t, n)
            }
          }
        }
      },
      Tn = Mn.registerPlugin({
        name: "attr",
        init: function(t, e, n, i, r) {
          var a, s, o;
          for (a in this.tween = n, e) o = t.getAttribute(a) || "", (s = this.add(t, "setAttribute", (o || 0) + "", e[a], i, r, 0, 0, a)).op = a, s.b = o, this._props.push(a)
        },
        render: function(t, e) {
          for (var n = e._pt; n;) r ? n.set(n.t, n.p, n.b, n) : n.r(t, n.d), n = n._next
        }
      }, {
        name: "endArray",
        init: function(t, e) {
          for (var n = e.length; n--;) this.add(t, n, t[n] || 0, e[n], 0, 0, 0, 0, 0, 1)
        }
      }, En("roundProps", ae), En("modifiers"), En("snap", se)) || Mn;
    Ze.version = ke.version = Tn.version = "3.12.7", u = 1, O() && we(), Ae.Power0, Ae.Power1, Ae.Power2, Ae.Power3, Ae.Power4, Ae.Linear, Ae.Quad, Ae.Cubic, Ae.Quart, Ae.Quint, Ae.Strong, Ae.Elastic, Ae.Back, Ae.SteppedEase, Ae.Bounce, Ae.Sine, Ae.Expo, Ae.Circ;
    var wn, An, Rn, Cn, Pn, Dn, Ln, In, Un = {},
      Nn = 180 / Math.PI,
      On = Math.PI / 180,
      Fn = Math.atan2,
      Bn = /([A-Z])/g,
      zn = /(left|right|width|margin|padding|x)/i,
      kn = /[\s,\(]\S/,
      Hn = {
        autoAlpha: "opacity,visibility",
        scale: "scaleX,scaleY",
        alpha: "opacity"
      },
      Vn = function(t, e) {
        return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e)
      },
      Gn = function(t, e) {
        return e.set(e.t, e.p, 1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e)
      },
      Wn = function(t, e) {
        return e.set(e.t, e.p, t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b, e)
      },
      Xn = function(t, e) {
        var n = e.s + e.c * t;
        e.set(e.t, e.p, ~~(n + (n < 0 ? -.5 : .5)) + e.u, e)
      },
      jn = function(t, e) {
        return e.set(e.t, e.p, t ? e.e : e.b, e)
      },
      qn = function(t, e) {
        return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e)
      },
      Yn = function(t, e, n) {
        return t.style[e] = n
      },
      $n = function(t, e, n) {
        return t.style.setProperty(e, n)
      },
      Kn = function(t, e, n) {
        return t._gsap[e] = n
      },
      Zn = function(t, e, n) {
        return t._gsap.scaleX = t._gsap.scaleY = n
      },
      Jn = function(t, e, n, i, r) {
        var a = t._gsap;
        a.scaleX = a.scaleY = n, a.renderTransform(r, a)
      },
      Qn = function(t, e, n, i, r) {
        var a = t._gsap;
        a[e] = n, a.renderTransform(r, a)
      },
      ti = "transform",
      ei = ti + "Origin",
      ni = function t(e, n) {
        var i = this,
          r = this.target,
          a = r.style,
          s = r._gsap;
        if (e in Un && a) {
          if (this.tfm = this.tfm || {}, "transform" === e) return Hn.transform.split(",").forEach((function(e) {
            return t.call(i, e, n)
          }));
          if (~(e = Hn[e] || e).indexOf(",") ? e.split(",").forEach((function(t) {
              return i.tfm[t] = yi(r, t)
            })) : this.tfm[e] = s.x ? s[e] : yi(r, e), e === ei && (this.tfm.zOrigin = s.zOrigin), this.props.indexOf(ti) >= 0) return;
          s.svg && (this.svgo = r.getAttribute("data-svg-origin"), this.props.push(ei, n, "")), e = ti
        }(a || n) && this.props.push(e, n, a[e])
      },
      ii = function(t) {
        t.translate && (t.removeProperty("translate"), t.removeProperty("scale"), t.removeProperty("rotate"))
      },
      ri = function() {
        var t, e, n = this.props,
          i = this.target,
          r = i.style,
          a = i._gsap;
        for (t = 0; t < n.length; t += 3) n[t + 1] ? 2 === n[t + 1] ? i[n[t]](n[t + 2]) : i[n[t]] = n[t + 2] : n[t + 2] ? r[n[t]] = n[t + 2] : r.removeProperty("--" === n[t].substr(0, 2) ? n[t] : n[t].replace(Bn, "-$1").toLowerCase());
        if (this.tfm) {
          for (e in this.tfm) a[e] = this.tfm[e];
          a.svg && (a.renderTransform(), i.setAttribute("data-svg-origin", this.svgo || "")), (t = Ln()) && t.isStart || r[ti] || (ii(r), a.zOrigin && r[ei] && (r[ei] += " " + a.zOrigin + "px", a.zOrigin = 0, a.renderTransform()), a.uncache = 1)
        }
      },
      ai = function(t, e) {
        var n = {
          target: t,
          props: [],
          revert: ri,
          save: ni
        };
        return t._gsap || Tn.core.getCache(t), e && t.style && t.nodeType && e.split(",").forEach((function(t) {
          return n.save(t)
        })), n
      },
      si = function(t, e) {
        var n = An.createElementNS ? An.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : An.createElement(t);
        return n && n.style ? n : An.createElement(t)
      },
      oi = function t(e, n, i) {
        var r = getComputedStyle(e);
        return r[n] || r.getPropertyValue(n.replace(Bn, "-$1").toLowerCase()) || r.getPropertyValue(n) || !i && t(e, ci(n) || n, 1) || ""
      },
      li = "O,Moz,ms,Ms,Webkit".split(","),
      ci = function(t, e, n) {
        var i = (e || Pn).style,
          r = 5;
        if (t in i && !n) return t;
        for (t = t.charAt(0).toUpperCase() + t.substr(1); r-- && !(li[r] + t in i););
        return r < 0 ? null : (3 === r ? "ms" : r >= 0 ? li[r] : "") + t
      },
      ui = function() {
        "undefined" != typeof window && window.document && (wn = window, An = wn.document, Rn = An.documentElement, Pn = si("div") || {
          style: {}
        }, si("div"), ti = ci(ti), ei = ti + "Origin", Pn.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", In = !!ci("perspective"), Ln = Tn.core.reverting, Cn = 1)
      },
      hi = function(t) {
        var e, n = t.ownerSVGElement,
          i = si("svg", n && n.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
          r = t.cloneNode(!0);
        r.style.display = "block", i.appendChild(r), Rn.appendChild(i);
        try {
          e = r.getBBox()
        } catch (t) {}
        return i.removeChild(r), Rn.removeChild(i), e
      },
      di = function(t, e) {
        for (var n = e.length; n--;)
          if (t.hasAttribute(e[n])) return t.getAttribute(e[n])
      },
      pi = function(t) {
        var e, n;
        try {
          e = t.getBBox()
        } catch (i) {
          e = hi(t), n = 1
        }
        return e && (e.width || e.height) || n || (e = hi(t)), !e || e.width || e.x || e.y ? e : {
          x: +di(t, ["x", "cx", "x1"]) || 0,
          y: +di(t, ["y", "cy", "y1"]) || 0,
          width: 0,
          height: 0
        }
      },
      fi = function(t) {
        return !(!t.getCTM || t.parentNode && !t.ownerSVGElement || !pi(t))
      },
      mi = function(t, e) {
        if (e) {
          var n, i = t.style;
          e in Un && e !== ei && (e = ti), i.removeProperty ? ("ms" !== (n = e.substr(0, 2)) && "webkit" !== e.substr(0, 6) || (e = "-" + e), i.removeProperty("--" === n ? e : e.replace(Bn, "-$1").toLowerCase())) : i.removeAttribute(e)
        }
      },
      gi = function(t, e, n, i, r, a) {
        var s = new dn(t._pt, e, n, 0, 1, a ? qn : jn);
        return t._pt = s, s.b = i, s.e = r, t._props.push(n), s
      },
      _i = {
        deg: 1,
        rad: 1,
        turn: 1
      },
      vi = {
        grid: 1,
        flex: 1
      },
      xi = function t(e, n, i, r) {
        var a, s, o, l, c = parseFloat(i) || 0,
          u = (i + "").trim().substr((c + "").length) || "px",
          h = Pn.style,
          d = zn.test(n),
          p = "svg" === e.tagName.toLowerCase(),
          f = (p ? "client" : "offset") + (d ? "Width" : "Height"),
          m = 100,
          g = "px" === r,
          _ = "%" === r;
        if (r === u || !c || _i[r] || _i[u]) return c;
        if ("px" !== u && !g && (c = t(e, n, i, "px")), l = e.getCTM && fi(e), (_ || "%" === u) && (Un[n] || ~n.indexOf("adius"))) return a = l ? e.getBBox()[d ? "width" : "height"] : e[f], mt(_ ? c / a * m : c / 100 * a);
        if (h[d ? "width" : "height"] = m + (g ? u : r), s = "rem" !== r && ~n.indexOf("adius") || "em" === r && e.appendChild && !p ? e : e.parentNode, l && (s = (e.ownerSVGElement || {}).parentNode), s && s !== An && s.appendChild || (s = An.body), (o = s._gsap) && _ && o.width && d && o.time === Te.time && !o.uncache) return mt(c / o.width * m);
        if (!_ || "height" !== n && "width" !== n)(_ || "%" === u) && !vi[oi(s, "display")] && (h.position = oi(e, "position")), s === e && (h.position = "static"), s.appendChild(Pn), a = Pn[f], s.removeChild(Pn), h.position = "absolute";
        else {
          var v = e.style[n];
          e.style[n] = m + r, a = e[f], v ? e.style[n] = v : mi(e, n)
        }
        return d && _ && ((o = dt(s)).time = Te.time, o.width = s[f]), mt(g ? a * c / m : a && c ? m / a * c : 0)
      },
      yi = function(t, e, n, i) {
        var r;
        return Cn || ui(), e in Hn && "transform" !== e && ~(e = Hn[e]).indexOf(",") && (e = e.split(",")[0]), Un[e] && "transform" !== e ? (r = Di(t, i), r = "transformOrigin" !== e ? r[e] : r.svg ? r.origin : Li(oi(t, ei)) + " " + r.zOrigin + "px") : (!(r = t.style[e]) || "auto" === r || i || ~(r + "").indexOf("calc(")) && (r = Ei[e] && Ei[e](t, e, n) || oi(t, e) || pt(t, e) || ("opacity" === e ? 1 : 0)), n && !~(r + "").trim().indexOf(" ") ? xi(t, e, r, n) + n : r
      },
      bi = function(t, e, n, i) {
        if (!n || "none" === n) {
          var r = ci(e, t, 1),
            a = r && oi(t, r, 1);
          a && a !== n ? (e = r, n = a) : "borderColor" === e && (n = oi(t, "borderTopColor"))
        }
        var s, o, l, c, u, h, d, p, f, m, g, _ = new dn(this._pt, t.style, e, 0, 1, sn),
          v = 0,
          x = 0;
        if (_.b = n, _.e = i, n += "", "auto" == (i += "") && (h = t.style[e], t.style[e] = i, i = oi(t, e) || i, h ? t.style[e] = h : mi(t, e)), Ee(s = [n, i]), i = s[1], l = (n = s[0]).match(V) || [], (i.match(V) || []).length) {
          for (; o = V.exec(i);) d = o[0], f = i.substring(v, o.index), u ? u = (u + 1) % 5 : "rgba(" !== f.substr(-5) && "hsla(" !== f.substr(-5) || (u = 1), d !== (h = l[x++] || "") && (c = parseFloat(h) || 0, g = h.substr((c + "").length), "=" === d.charAt(1) && (d = _t(c, d) + g), p = parseFloat(d), m = d.substr((p + "").length), v = V.lastIndex - m.length, m || (m = m || y.units[e] || g, v === i.length && (i += m, _.e += m)), g !== m && (c = xi(t, e, h, m) || 0), _._pt = {
            _next: _._pt,
            p: f || 1 === x ? f : ",",
            s: c,
            c: p - c,
            m: u && u < 4 || "zIndex" === e ? Math.round : 0
          });
          _.c = v < i.length ? i.substring(v, i.length) : ""
        } else _.r = "display" === e && "none" === i ? qn : jn;
        return W.test(i) && (_.e = 0), this._pt = _, _
      },
      Mi = {
        top: "0%",
        bottom: "100%",
        left: "0%",
        right: "100%",
        center: "50%"
      },
      Si = function(t, e) {
        if (e.tween && e.tween._time === e.tween._dur) {
          var n, i, r, a = e.t,
            s = a.style,
            o = e.u,
            l = a._gsap;
          if ("all" === o || !0 === o) s.cssText = "", i = 1;
          else
            for (r = (o = o.split(",")).length; --r > -1;) n = o[r], Un[n] && (i = 1, n = "transformOrigin" === n ? ei : ti), mi(a, n);
          i && (mi(a, ti), l && (l.svg && a.removeAttribute("transform"), s.scale = s.rotate = s.translate = "none", Di(a, 1), l.uncache = 1, ii(s)))
        }
      },
      Ei = {
        clearProps: function(t, e, n, i, r) {
          if ("isFromStart" !== r.data) {
            var a = t._pt = new dn(t._pt, e, n, 0, 0, Si);
            return a.u = i, a.pr = -10, a.tween = r, t._props.push(n), 1
          }
        }
      },
      Ti = [1, 0, 0, 1, 0, 0],
      wi = {},
      Ai = function(t) {
        return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t
      },
      Ri = function(t) {
        var e = oi(t, ti);
        return Ai(e) ? Ti : e.substr(7).match(H).map(mt)
      },
      Ci = function(t, e) {
        var n, i, r, a, s = t._gsap || dt(t),
          o = t.style,
          l = Ri(t);
        return s.svg && t.getAttribute("transform") ? "1,0,0,1,0,0" === (l = [(r = t.transform.baseVal.consolidate().matrix).a, r.b, r.c, r.d, r.e, r.f]).join(",") ? Ti : l : (l !== Ti || t.offsetParent || t === Rn || s.svg || (r = o.display, o.display = "block", (n = t.parentNode) && (t.offsetParent || t.getBoundingClientRect().width) || (a = 1, i = t.nextElementSibling, Rn.appendChild(t)), l = Ri(t), r ? o.display = r : mi(t, "display"), a && (i ? n.insertBefore(t, i) : n ? n.appendChild(t) : Rn.removeChild(t))), e && l.length > 6 ? [l[0], l[1], l[4], l[5], l[12], l[13]] : l)
      },
      Pi = function(t, e, n, i, r, a) {
        var s, o, l, c = t._gsap,
          u = r || Ci(t, !0),
          h = c.xOrigin || 0,
          d = c.yOrigin || 0,
          p = c.xOffset || 0,
          f = c.yOffset || 0,
          m = u[0],
          g = u[1],
          _ = u[2],
          v = u[3],
          x = u[4],
          y = u[5],
          b = e.split(" "),
          M = parseFloat(b[0]) || 0,
          S = parseFloat(b[1]) || 0;
        n ? u !== Ti && (o = m * v - g * _) && (l = M * (-g / o) + S * (m / o) - (m * y - g * x) / o, M = M * (v / o) + S * (-_ / o) + (_ * y - v * x) / o, S = l) : (M = (s = pi(t)).x + (~b[0].indexOf("%") ? M / 100 * s.width : M), S = s.y + (~(b[1] || b[0]).indexOf("%") ? S / 100 * s.height : S)), i || !1 !== i && c.smooth ? (x = M - h, y = S - d, c.xOffset = p + (x * m + y * _) - x, c.yOffset = f + (x * g + y * v) - y) : c.xOffset = c.yOffset = 0, c.xOrigin = M, c.yOrigin = S, c.smooth = !!i, c.origin = e, c.originIsAbsolute = !!n, t.style[ei] = "0px 0px", a && (gi(a, c, "xOrigin", h, M), gi(a, c, "yOrigin", d, S), gi(a, c, "xOffset", p, c.xOffset), gi(a, c, "yOffset", f, c.yOffset)), t.setAttribute("data-svg-origin", M + " " + S)
      },
      Di = function(t, e) {
        var n = t._gsap || new Be(t);
        if ("x" in n && !e && !n.uncache) return n;
        var i, r, a, s, o, l, c, u, h, d, p, f, m, g, _, v, x, b, M, S, E, T, w, A, R, C, P, D, L, I, U, N, O = t.style,
          F = n.scaleX < 0,
          B = "px",
          z = "deg",
          k = getComputedStyle(t),
          H = oi(t, ei) || "0";
        return i = r = a = l = c = u = h = d = p = 0, s = o = 1, n.svg = !(!t.getCTM || !fi(t)), k.translate && ("none" === k.translate && "none" === k.scale && "none" === k.rotate || (O[ti] = ("none" !== k.translate ? "translate3d(" + (k.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + ("none" !== k.rotate ? "rotate(" + k.rotate + ") " : "") + ("none" !== k.scale ? "scale(" + k.scale.split(" ").join(",") + ") " : "") + ("none" !== k[ti] ? k[ti] : "")), O.scale = O.rotate = O.translate = "none"), g = Ci(t, n.svg), n.svg && (n.uncache ? (R = t.getBBox(), H = n.xOrigin - R.x + "px " + (n.yOrigin - R.y) + "px", A = "") : A = !e && t.getAttribute("data-svg-origin"), Pi(t, A || H, !!A || n.originIsAbsolute, !1 !== n.smooth, g)), f = n.xOrigin || 0, m = n.yOrigin || 0, g !== Ti && (b = g[0], M = g[1], S = g[2], E = g[3], i = T = g[4], r = w = g[5], 6 === g.length ? (s = Math.sqrt(b * b + M * M), o = Math.sqrt(E * E + S * S), l = b || M ? Fn(M, b) * Nn : 0, (h = S || E ? Fn(S, E) * Nn + l : 0) && (o *= Math.abs(Math.cos(h * On))), n.svg && (i -= f - (f * b + m * S), r -= m - (f * M + m * E))) : (N = g[6], I = g[7], P = g[8], D = g[9], L = g[10], U = g[11], i = g[12], r = g[13], a = g[14], c = (_ = Fn(N, L)) * Nn, _ && (A = T * (v = Math.cos(-_)) + P * (x = Math.sin(-_)), R = w * v + D * x, C = N * v + L * x, P = T * -x + P * v, D = w * -x + D * v, L = N * -x + L * v, U = I * -x + U * v, T = A, w = R, N = C), u = (_ = Fn(-S, L)) * Nn, _ && (v = Math.cos(-_), U = E * (x = Math.sin(-_)) + U * v, b = A = b * v - P * x, M = R = M * v - D * x, S = C = S * v - L * x), l = (_ = Fn(M, b)) * Nn, _ && (A = b * (v = Math.cos(_)) + M * (x = Math.sin(_)), R = T * v + w * x, M = M * v - b * x, w = w * v - T * x, b = A, T = R), c && Math.abs(c) + Math.abs(l) > 359.9 && (c = l = 0, u = 180 - u), s = mt(Math.sqrt(b * b + M * M + S * S)), o = mt(Math.sqrt(w * w + N * N)), _ = Fn(T, w), h = Math.abs(_) > 2e-4 ? _ * Nn : 0, p = U ? 1 / (U < 0 ? -U : U) : 0), n.svg && (A = t.getAttribute("transform"), n.forceCSS = t.setAttribute("transform", "") || !Ai(oi(t, ti)), A && t.setAttribute("transform", A))), Math.abs(h) > 90 && Math.abs(h) < 270 && (F ? (s *= -1, h += l <= 0 ? 180 : -180, l += l <= 0 ? 180 : -180) : (o *= -1, h += h <= 0 ? 180 : -180)), e = e || n.uncache, n.x = i - ((n.xPercent = i && (!e && n.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-i) ? -50 : 0))) ? t.offsetWidth * n.xPercent / 100 : 0) + B, n.y = r - ((n.yPercent = r && (!e && n.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-r) ? -50 : 0))) ? t.offsetHeight * n.yPercent / 100 : 0) + B, n.z = a + B, n.scaleX = mt(s), n.scaleY = mt(o), n.rotation = mt(l) + z, n.rotationX = mt(c) + z, n.rotationY = mt(u) + z, n.skewX = h + z, n.skewY = d + z, n.transformPerspective = p + B, (n.zOrigin = parseFloat(H.split(" ")[2]) || !e && n.zOrigin || 0) && (O[ei] = Li(H)), n.xOffset = n.yOffset = 0, n.force3D = y.force3D, n.renderTransform = n.svg ? zi : In ? Bi : Ui, n.uncache = 0, n
      },
      Li = function(t) {
        return (t = t.split(" "))[0] + " " + t[1]
      },
      Ii = function(t, e, n) {
        var i = Jt(e);
        return mt(parseFloat(e) + parseFloat(xi(t, "x", n + "px", i))) + i
      },
      Ui = function(t, e) {
        e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, Bi(t, e)
      },
      Ni = "0deg",
      Oi = "0px",
      Fi = ") ",
      Bi = function(t, e) {
        var n = e || this,
          i = n.xPercent,
          r = n.yPercent,
          a = n.x,
          s = n.y,
          o = n.z,
          l = n.rotation,
          c = n.rotationY,
          u = n.rotationX,
          h = n.skewX,
          d = n.skewY,
          p = n.scaleX,
          f = n.scaleY,
          m = n.transformPerspective,
          g = n.force3D,
          _ = n.target,
          v = n.zOrigin,
          x = "",
          y = "auto" === g && t && 1 !== t || !0 === g;
        if (v && (u !== Ni || c !== Ni)) {
          var b, M = parseFloat(c) * On,
            S = Math.sin(M),
            E = Math.cos(M);
          M = parseFloat(u) * On, b = Math.cos(M), a = Ii(_, a, S * b * -v), s = Ii(_, s, -Math.sin(M) * -v), o = Ii(_, o, E * b * -v + v)
        }
        m !== Oi && (x += "perspective(" + m + Fi), (i || r) && (x += "translate(" + i + "%, " + r + "%) "), (y || a !== Oi || s !== Oi || o !== Oi) && (x += o !== Oi || y ? "translate3d(" + a + ", " + s + ", " + o + ") " : "translate(" + a + ", " + s + Fi), l !== Ni && (x += "rotate(" + l + Fi), c !== Ni && (x += "rotateY(" + c + Fi), u !== Ni && (x += "rotateX(" + u + Fi), h === Ni && d === Ni || (x += "skew(" + h + ", " + d + Fi), 1 === p && 1 === f || (x += "scale(" + p + ", " + f + Fi), _.style[ti] = x || "translate(0, 0)"
      },
      zi = function(t, e) {
        var n, i, r, a, s, o = e || this,
          l = o.xPercent,
          c = o.yPercent,
          u = o.x,
          h = o.y,
          d = o.rotation,
          p = o.skewX,
          f = o.skewY,
          m = o.scaleX,
          g = o.scaleY,
          _ = o.target,
          v = o.xOrigin,
          x = o.yOrigin,
          y = o.xOffset,
          b = o.yOffset,
          M = o.forceCSS,
          S = parseFloat(u),
          E = parseFloat(h);
        d = parseFloat(d), p = parseFloat(p), (f = parseFloat(f)) && (p += f = parseFloat(f), d += f), d || p ? (d *= On, p *= On, n = Math.cos(d) * m, i = Math.sin(d) * m, r = Math.sin(d - p) * -g, a = Math.cos(d - p) * g, p && (f *= On, s = Math.tan(p - f), r *= s = Math.sqrt(1 + s * s), a *= s, f && (s = Math.tan(f), n *= s = Math.sqrt(1 + s * s), i *= s)), n = mt(n), i = mt(i), r = mt(r), a = mt(a)) : (n = m, a = g, i = r = 0), (S && !~(u + "").indexOf("px") || E && !~(h + "").indexOf("px")) && (S = xi(_, "x", u, "px"), E = xi(_, "y", h, "px")), (v || x || y || b) && (S = mt(S + v - (v * n + x * r) + y), E = mt(E + x - (v * i + x * a) + b)), (l || c) && (s = _.getBBox(), S = mt(S + l / 100 * s.width), E = mt(E + c / 100 * s.height)), s = "matrix(" + n + "," + i + "," + r + "," + a + "," + S + "," + E + ")", _.setAttribute("transform", s), M && (_.style[ti] = s)
      },
      ki = function(t, e, n, i, r) {
        var a, s, o = 360,
          l = P(r),
          c = parseFloat(r) * (l && ~r.indexOf("rad") ? Nn : 1) - i,
          u = i + c + "deg";
        return l && ("short" === (a = r.split("_")[1]) && (c %= o) != c % 180 && (c += c < 0 ? o : -360), "cw" === a && c < 0 ? c = (c + 36e9) % o - ~~(c / o) * o : "ccw" === a && c > 0 && (c = (c - 36e9) % o - ~~(c / o) * o)), t._pt = s = new dn(t._pt, e, n, i, c, Gn), s.e = u, s.u = "deg", t._props.push(n), s
      },
      Hi = function(t, e) {
        for (var n in e) t[n] = e[n];
        return t
      },
      Vi = function(t, e, n) {
        var i, r, a, s, o, l, c, u = Hi({}, n._gsap),
          h = n.style;
        for (r in u.svg ? (a = n.getAttribute("transform"), n.setAttribute("transform", ""), h[ti] = e, i = Di(n, 1), mi(n, ti), n.setAttribute("transform", a)) : (a = getComputedStyle(n)[ti], h[ti] = e, i = Di(n, 1), h[ti] = a), Un)(a = u[r]) !== (s = i[r]) && "perspective,force3D,transformOrigin,svgOrigin".indexOf(r) < 0 && (o = Jt(a) !== (c = Jt(s)) ? xi(n, r, a, c) : parseFloat(a), l = parseFloat(s), t._pt = new dn(t._pt, i, r, o, l - o, Vn), t._pt.u = c || 0, t._props.push(r));
        Hi(i, u)
      };
    ft("padding,margin,Width,Radius", (function(t, e) {
      var n = "Top",
        i = "Right",
        r = "Bottom",
        a = "Left",
        s = (e < 3 ? [n, i, r, a] : [n + a, n + i, r + i, r + a]).map((function(n) {
          return e < 2 ? t + n : "border" + n + t
        }));
      Ei[e > 1 ? "border" + t : t] = function(t, e, n, i, r) {
        var a, o;
        if (arguments.length < 4) return a = s.map((function(e) {
          return yi(t, e, n)
        })), 5 === (o = a.join(" ")).split(a[0]).length ? a[0] : o;
        a = (i + "").split(" "), o = {}, s.forEach((function(t, e) {
          return o[t] = a[e] = a[e] || a[(e - 1) / 2 | 0]
        })), t.init(e, o, r)
      }
    }));
    var Gi, Wi, Xi = {
      name: "css",
      register: ui,
      targetTest: function(t) {
        return t.style && t.nodeType
      },
      init: function(t, e, n, i, r) {
        var a, s, o, l, c, u, h, d, p, f, m, g, _, v, x, b, M, S, E, T, w = this._props,
          A = t.style,
          R = n.vars.startAt;
        for (h in Cn || ui(), this.styles = this.styles || ai(t), b = this.styles.props, this.tween = n, e)
          if ("autoRound" !== h && (s = e[h], !st[h] || !Xe(h, e, n, i, t, r)))
            if (c = typeof s, u = Ei[h], "function" === c && (c = typeof(s = s.call(n, i, t, r))), "string" === c && ~s.indexOf("random(") && (s = ce(s)), u) u(this, t, h, s, n) && (x = 1);
            else if ("--" === h.substr(0, 2)) a = (getComputedStyle(t).getPropertyValue(h) + "").trim(), s += "", Me.lastIndex = 0, Me.test(a) || (d = Jt(a), p = Jt(s)), p ? d !== p && (a = xi(t, h, a, p) + p) : d && (s += d), this.add(A, "setProperty", a, s, i, r, 0, 0, h), w.push(h), b.push(h, 0, A[h]);
        else if ("undefined" !== c) {
          if (R && h in R ? (a = "function" == typeof R[h] ? R[h].call(n, i, t, r) : R[h], P(a) && ~a.indexOf("random(") && (a = ce(a)), Jt(a + "") || "auto" === a || (a += y.units[h] || Jt(yi(t, h)) || ""), "=" === (a + "").charAt(1) && (a = yi(t, h))) : a = yi(t, h), l = parseFloat(a), (f = "string" === c && "=" === s.charAt(1) && s.substr(0, 2)) && (s = s.substr(2)), o = parseFloat(s), h in Hn && ("autoAlpha" === h && (1 === l && "hidden" === yi(t, "visibility") && o && (l = 0), b.push("visibility", 0, A.visibility), gi(this, A, "visibility", l ? "inherit" : "hidden", o ? "inherit" : "hidden", !o)), "scale" !== h && "transform" !== h && ~(h = Hn[h]).indexOf(",") && (h = h.split(",")[0])), m = h in Un)
            if (this.styles.save(h), g || ((_ = t._gsap).renderTransform && !e.parseTransform || Di(t, e.parseTransform), v = !1 !== e.smoothOrigin && _.smooth, (g = this._pt = new dn(this._pt, A, ti, 0, 1, _.renderTransform, _, 0, -1)).dep = 1), "scale" === h) this._pt = new dn(this._pt, _, "scaleY", _.scaleY, (f ? _t(_.scaleY, f + o) : o) - _.scaleY || 0, Vn), this._pt.u = 0, w.push("scaleY", h), h += "X";
            else {
              if ("transformOrigin" === h) {
                b.push(ei, 0, A[ei]), S = void 0, E = void 0, T = void 0, E = (S = (M = s).split(" "))[0], T = S[1] || "50%", "top" !== E && "bottom" !== E && "left" !== T && "right" !== T || (M = E, E = T, T = M), S[0] = Mi[E] || E, S[1] = Mi[T] || T, s = S.join(" "), _.svg ? Pi(t, s, 0, v, 0, this) : ((p = parseFloat(s.split(" ")[2]) || 0) !== _.zOrigin && gi(this, _, "zOrigin", _.zOrigin, p), gi(this, A, h, Li(a), Li(s)));
                continue
              }
              if ("svgOrigin" === h) {
                Pi(t, s, 1, v, 0, this);
                continue
              }
              if (h in wi) {
                ki(this, _, h, l, f ? _t(l, f + s) : s);
                continue
              }
              if ("smoothOrigin" === h) {
                gi(this, _, "smooth", _.smooth, s);
                continue
              }
              if ("force3D" === h) {
                _[h] = s;
                continue
              }
              if ("transform" === h) {
                Vi(this, s, t);
                continue
              }
            }
          else h in A || (h = ci(h) || h);
          if (m || (o || 0 === o) && (l || 0 === l) && !kn.test(s) && h in A) o || (o = 0), (d = (a + "").substr((l + "").length)) !== (p = Jt(s) || (h in y.units ? y.units[h] : d)) && (l = xi(t, h, a, p)), this._pt = new dn(this._pt, m ? _ : A, h, l, (f ? _t(l, f + o) : o) - l, m || "px" !== p && "zIndex" !== h || !1 === e.autoRound ? Vn : Xn), this._pt.u = p || 0, d !== p && "%" !== p && (this._pt.b = a, this._pt.r = Wn);
          else if (h in A) bi.call(this, t, h, a, f ? f + s : s);
          else if (h in t) this.add(t, h, a || t[h], f ? f + s : s, i, r);
          else if ("parseTransform" !== h) {
            K(h, s);
            continue
          }
          m || (h in A ? b.push(h, 0, A[h]) : "function" == typeof t[h] ? b.push(h, 2, t[h]()) : b.push(h, 1, a || t[h])), w.push(h)
        }
        x && hn(this)
      },
      render: function(t, e) {
        if (e.tween._time || !Ln())
          for (var n = e._pt; n;) n.r(t, n.d), n = n._next;
        else e.styles.revert()
      },
      get: yi,
      aliases: Hn,
      getSetter: function(t, e, n) {
        var i = Hn[e];
        return i && i.indexOf(",") < 0 && (e = i), e in Un && e !== ei && (t._gsap.x || yi(t, "x")) ? n && Dn === n ? "scale" === e ? Zn : Kn : (Dn = n || {}) && ("scale" === e ? Jn : Qn) : t.style && !I(t.style[e]) ? Yn : ~e.indexOf("-") ? $n : nn(t, e)
      },
      core: {
        _removeProperty: mi,
        _getMatrix: Ci
      }
    };
    Tn.utils.checkPrefix = ci, Tn.core.getStyleSaver = ai, Wi = ft("x,y,z,scale,scaleX,scaleY,xPercent,yPercent" + "," + (Gi = "rotation,rotationX,rotationY,skewX,skewY") + ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", (function(t) {
      Un[t] = 1
    })), ft(Gi, (function(t) {
      y.units[t] = "deg", wi[t] = 1
    })), Hn[Wi[13]] = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent," + Gi, ft("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY", (function(t) {
      var e = t.split(":");
      Hn[e[1]] = Wi[e[0]]
    })), ft("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", (function(t) {
      y.units[t] = "px"
    })), Tn.registerPlugin(Xi);
    var ji = Tn.registerPlugin(Xi) || Tn;
    ji.core.Tween, ji.defaults({
      ease: "power2.out",
      overwrite: "auto"
    });
    let qi = null;
    class Yi {
      constructor() {
        if (qi) return qi;
        this.baseFPS = 60, this.baseDeltaTime = 1 / this.baseFPS, this.lastUpdateTime = 0, this.updateFunctions = [], this.updateFunctionsLength = 0, qi = this, this.init()
      }
      static getInstance() {
        return qi || (qi = new Yi), qi
      }
      static add(t) {
        Yi.getInstance().add(t)
      }
      static remove(t) {
        Yi.getInstance().remove(t)
      }
      static reset() {
        Yi.getInstance().reset()
      }
      init() {
        this.lastUpdateTime = .001 * performance.now(), this.animFunction = this.update.bind(this), requestAnimationFrame(this.animFunction)
      }
      add(t) {
        this.updateFunctions.push(t), this.updateFunctionsLength = this.updateFunctions.length
      }
      remove(t) {
        let e;
        for (let n = 0; n < this.updateFunctionsLength; n++)
          if (e = this.updateFunctions[n], e === t) {
            this.updateFunctions.splice(n, 1);
            break
          } this.updateFunctionsLength = this.updateFunctions.length
      }
      update(t) {
        requestAnimationFrame(this.animFunction);
        const e = (t *= .001) - this.lastUpdateTime,
          n = Math.max(Math.min(e / this.baseDeltaTime, 2), .5);
        let i;
        for (let r = 0; r < this.updateFunctionsLength; r++) i = this.updateFunctions[r], i({
          time: t,
          deltaTime: e,
          timeScale: n
        });
        this.lastUpdateTime = t
      }
      reset() {
        for (let t = 0; t < this.updateFunctionsLength; t++) delete this.updateFunctions[t];
        this.updateFunctions = [], this.updateFunctions.length = 0, this.updateFunctionsLength = 0
      }
    }
    class $i {
      constructor() {
        this.prevSize = {
          w: 0,
          h: 0
        }, this.checkTime = 0, this.interval = 500, this.getSize = null
      }
      reset() {
        this.prevSize = {
          w: 0,
          h: 0
        }, this.checkTime = 0
      }
      setSizeFunc(t) {
        this.getSize = t, this.reset()
      }
      check() {
        const t = performance.now();
        if (t - this.checkTime < this.interval) return !1;
        this.checkTime = t;
        const {
          width: e,
          height: n
        } = this.getSize();
        return (e !== this.prevSize.w || n !== this.prevSize.h) && (this.prevSize.w = e, this.prevSize.h = n, !0)
      }
    }
    var Ki, Zi, Ji, Qi, tr = !1,
      er = !1,
      nr = [],
      ir = -1;

    function rr(t) {
      let e = nr.indexOf(t); - 1 !== e && e > ir && nr.splice(e, 1)
    }

    function ar() {
      tr = !1, er = !0;
      for (let t = 0; t < nr.length; t++) nr[t](), ir = t;
      nr.length = 0, ir = -1, er = !1
    }
    var sr = !0;

    function or(t) {
      Zi = t
    }

    function lr(t, e) {
      let n, i = !0,
        r = Zi((() => {
          let r = t();
          JSON.stringify(r), i ? n = r : queueMicrotask((() => {
            e(r, n), n = r
          })), i = !1
        }));
      return () => Ji(r)
    }
    var cr = [],
      ur = [],
      hr = [];

    function dr(t, e) {
      "function" == typeof e ? (t._x_cleanups || (t._x_cleanups = []), t._x_cleanups.push(e)) : (e = t, ur.push(e))
    }

    function pr(t) {
      cr.push(t)
    }

    function fr(t, e, n) {
      t._x_attributeCleanups || (t._x_attributeCleanups = {}), t._x_attributeCleanups[e] || (t._x_attributeCleanups[e] = []), t._x_attributeCleanups[e].push(n)
    }

    function mr(t, e) {
      t._x_attributeCleanups && Object.entries(t._x_attributeCleanups).forEach((([n, i]) => {
        (void 0 === e || e.includes(n)) && (i.forEach((t => t())), delete t._x_attributeCleanups[n])
      }))
    }
    var gr = new MutationObserver(Er),
      _r = !1;

    function vr() {
      gr.observe(document, {
        subtree: !0,
        childList: !0,
        attributes: !0,
        attributeOldValue: !0
      }), _r = !0
    }

    function xr() {
      ! function() {
        let t = gr.takeRecords();
        yr.push((() => t.length > 0 && Er(t)));
        let e = yr.length;
        queueMicrotask((() => {
          if (yr.length === e)
            for (; yr.length > 0;) yr.shift()()
        }))
      }(), gr.disconnect(), _r = !1
    }
    var yr = [];

    function br(t) {
      if (!_r) return t();
      xr();
      let e = t();
      return vr(), e
    }
    var Mr = !1,
      Sr = [];

    function Er(t) {
      if (Mr) return void(Sr = Sr.concat(t));
      let e = [],
        n = new Set,
        i = new Map,
        r = new Map;
      for (let a = 0; a < t.length; a++)
        if (!t[a].target._x_ignoreMutationObserver && ("childList" === t[a].type && (t[a].removedNodes.forEach((t => {
            1 === t.nodeType && t._x_marker && n.add(t)
          })), t[a].addedNodes.forEach((t => {
            1 === t.nodeType && (n.has(t) ? n.delete(t) : t._x_marker || e.push(t))
          }))), "attributes" === t[a].type)) {
          let e = t[a].target,
            n = t[a].attributeName,
            s = t[a].oldValue,
            o = () => {
              i.has(e) || i.set(e, []), i.get(e).push({
                name: n,
                value: e.getAttribute(n)
              })
            },
            l = () => {
              r.has(e) || r.set(e, []), r.get(e).push(n)
            };
          e.hasAttribute(n) && null === s ? o() : e.hasAttribute(n) ? (l(), o()) : l()
        } r.forEach(((t, e) => {
        mr(e, t)
      })), i.forEach(((t, e) => {
        cr.forEach((n => n(e, t)))
      }));
      for (let t of n) e.some((e => e.contains(t))) || ur.forEach((e => e(t)));
      for (let t of e) t.isConnected && hr.forEach((e => e(t)));
      e = null, n = null, i = null, r = null
    }

    function Tr(t) {
      return Rr(Ar(t))
    }

    function wr(t, e, n) {
      return t._x_dataStack = [e, ...Ar(n || t)], () => {
        t._x_dataStack = t._x_dataStack.filter((t => t !== e))
      }
    }

    function Ar(t) {
      return t._x_dataStack ? t._x_dataStack : "function" == typeof ShadowRoot && t instanceof ShadowRoot ? Ar(t.host) : t.parentNode ? Ar(t.parentNode) : []
    }

    function Rr(t) {
      return new Proxy({
        objects: t
      }, Cr)
    }
    var Cr = {
      ownKeys: ({
        objects: t
      }) => Array.from(new Set(t.flatMap((t => Object.keys(t))))),
      has: ({
        objects: t
      }, e) => e != Symbol.unscopables && t.some((t => Object.prototype.hasOwnProperty.call(t, e) || Reflect.has(t, e))),
      get: ({
        objects: t
      }, e, n) => "toJSON" == e ? Pr : Reflect.get(t.find((t => Reflect.has(t, e))) || {}, e, n),
      set({
        objects: t
      }, e, n, i) {
        const r = t.find((t => Object.prototype.hasOwnProperty.call(t, e))) || t[t.length - 1],
          a = Object.getOwnPropertyDescriptor(r, e);
        return a?.set && a?.get ? a.set.call(i, n) || !0 : Reflect.set(r, e, n)
      }
    };

    function Pr() {
      return Reflect.ownKeys(this).reduce(((t, e) => (t[e] = Reflect.get(this, e), t)), {})
    }

    function Dr(t) {
      let e = (n, i = "") => {
        Object.entries(Object.getOwnPropertyDescriptors(n)).forEach((([r, {
          value: a,
          enumerable: s
        }]) => {
          if (!1 === s || void 0 === a) return;
          if ("object" == typeof a && null !== a && a.__v_skip) return;
          let o = "" === i ? r : `${i}.${r}`;
          var l;
          "object" == typeof a && null !== a && a._x_interceptor ? n[r] = a.initialize(t, o, r) : "object" != typeof(l = a) || Array.isArray(l) || null === l || a === n || a instanceof Element || e(a, o)
        }))
      };
      return e(t)
    }

    function Lr(t, e = () => {}) {
      let n = {
        initialValue: void 0,
        _x_interceptor: !0,
        initialize(e, n, i) {
          return t(this.initialValue, (() => function(t, e) {
            return e.split(".").reduce(((t, e) => t[e]), t)
          }(e, n)), (t => Ir(e, n, t)), n, i)
        }
      };
      return e(n), t => {
        if ("object" == typeof t && null !== t && t._x_interceptor) {
          let e = n.initialize.bind(n);
          n.initialize = (i, r, a) => {
            let s = t.initialize(i, r, a);
            return n.initialValue = s, e(i, r, a)
          }
        } else n.initialValue = t;
        return n
      }
    }

    function Ir(t, e, n) {
      if ("string" == typeof e && (e = e.split(".")), 1 !== e.length) {
        if (0 === e.length) throw error;
        return t[e[0]] || (t[e[0]] = {}), Ir(t[e[0]], e.slice(1), n)
      }
      t[e[0]] = n
    }
    var Ur = {};

    function Nr(t, e) {
      Ur[t] = e
    }

    function Or(t, e) {
      let n = function(t) {
        let [e, n] = na(t), i = {
          interceptor: Lr,
          ...e
        };
        return dr(t, n), i
      }(e);
      return Object.entries(Ur).forEach((([i, r]) => {
        Object.defineProperty(t, `$${i}`, {
          get: () => r(e, n),
          enumerable: !1
        })
      })), t
    }

    function Fr(t, e, n, ...i) {
      try {
        return n(...i)
      } catch (n) {
        Br(n, t, e)
      }
    }

    function Br(t, e, n = void 0) {
      t = Object.assign(t ?? {
        message: "No error message given."
      }, {
        el: e,
        expression: n
      }), console.warn(`Alpine Expression Error: ${t.message}\n\n${n?'Expression: "'+n+'"\n\n':""}`, e), setTimeout((() => {
        throw t
      }), 0)
    }
    var zr = !0;

    function kr(t) {
      let e = zr;
      zr = !1;
      let n = t();
      return zr = e, n
    }

    function Hr(t, e, n = {}) {
      let i;
      return Vr(t, e)((t => i = t), n), i
    }

    function Vr(...t) {
      return Gr(...t)
    }
    var Gr = Wr;

    function Wr(t, e) {
      let n = {};
      Or(n, t);
      let i = [n, ...Ar(t)],
        r = "function" == typeof e ? function(t, e) {
          return (n = () => {}, {
            scope: i = {},
            params: r = []
          } = {}) => {
            jr(n, e.apply(Rr([i, ...t]), r))
          }
        }(i, e) : function(t, e, n) {
          let i = function(t, e) {
            if (Xr[t]) return Xr[t];
            let n = Object.getPrototypeOf((async function() {})).constructor,
              i = /^[\n\s]*if.*\(.*\)/.test(t.trim()) || /^(let|const)\s/.test(t.trim()) ? `(async()=>{ ${t} })()` : t;
            let r = (() => {
              try {
                let e = new n(["__self", "scope"], `with (scope) { __self.result = ${i} }; __self.finished = true; return __self.result;`);
                return Object.defineProperty(e, "name", {
                  value: `[Alpine] ${t}`
                }), e
              } catch (n) {
                return Br(n, e, t), Promise.resolve()
              }
            })();
            return Xr[t] = r, r
          }(e, n);
          return (r = () => {}, {
            scope: a = {},
            params: s = []
          } = {}) => {
            i.result = void 0, i.finished = !1;
            let o = Rr([a, ...t]);
            if ("function" == typeof i) {
              let t = i(i, o).catch((t => Br(t, n, e)));
              i.finished ? (jr(r, i.result, o, s, n), i.result = void 0) : t.then((t => {
                jr(r, t, o, s, n)
              })).catch((t => Br(t, n, e))).finally((() => i.result = void 0))
            }
          }
        }(i, e, t);
      return Fr.bind(null, t, e, r)
    }
    var Xr = {};

    function jr(t, e, n, i, r) {
      if (zr && "function" == typeof e) {
        let a = e.apply(n, i);
        a instanceof Promise ? a.then((e => jr(t, e, n, i))).catch((t => Br(t, r, e))) : t(a)
      } else "object" == typeof e && e instanceof Promise ? e.then((e => t(e))) : t(e)
    }
    var qr = "x-";

    function Yr(t = "") {
      return qr + t
    }
    var $r = {};

    function Kr(t, e) {
      return $r[t] = e, {
        before(e) {
          if (!$r[e]) return void console.warn(String.raw`Cannot find directive \`${e}\`. \`${t}\` will use the default order of execution`);
          const n = ua.indexOf(e);
          ua.splice(n >= 0 ? n : ua.indexOf("DEFAULT"), 0, t)
        }
      }
    }

    function Zr(t, e, n) {
      if (e = Array.from(e), t._x_virtualDirectives) {
        let n = Object.entries(t._x_virtualDirectives).map((([t, e]) => ({
            name: t,
            value: e
          }))),
          i = Jr(n);
        n = n.map((t => i.find((e => e.name === t.name)) ? {
          name: `x-bind:${t.name}`,
          value: `"${t.value}"`
        } : t)), e = e.concat(n)
      }
      let i = {},
        r = e.map(ra(((t, e) => i[t] = e))).filter(oa).map(function(t, e) {
          return ({
            name: n,
            value: i
          }) => {
            let r = n.match(la()),
              a = n.match(/:([a-zA-Z0-9\-_:]+)/),
              s = n.match(/\.[^.\]]+(?=[^\]]*$)/g) || [],
              o = e || t[n] || n;
            return {
              type: r ? r[1] : null,
              value: a ? a[1] : null,
              modifiers: s.map((t => t.replace(".", ""))),
              expression: i,
              original: o
            }
          }
        }(i, n)).sort(ha);
      return r.map((e => function(t, e) {
        let n = $r[e.type] || (() => {}),
          [i, r] = na(t);
        fr(t, e.original, r);
        let a = () => {
          t._x_ignore || t._x_ignoreSelf || (n.inline && n.inline(t, e, i), n = n.bind(n, t, e, i), Qr ? ta.get(ea).push(n) : n())
        };
        return a.runCleanups = r, a
      }(t, e)))
    }

    function Jr(t) {
      return Array.from(t).map(ra()).filter((t => !oa(t)))
    }
    var Qr = !1,
      ta = new Map,
      ea = Symbol();

    function na(t) {
      let e = [],
        [n, i] = function(t) {
          let e = () => {};
          return [n => {
            let i = Zi(n);
            return t._x_effects || (t._x_effects = new Set, t._x_runEffects = () => {
              t._x_effects.forEach((t => t()))
            }), t._x_effects.add(i), e = () => {
              void 0 !== i && (t._x_effects.delete(i), Ji(i))
            }, i
          }, () => {
            e()
          }]
        }(t);
      return e.push(i), [{
        Alpine: hs,
        effect: n,
        cleanup: t => e.push(t),
        evaluateLater: Vr.bind(Vr, t),
        evaluate: Hr.bind(Hr, t)
      }, () => e.forEach((t => t()))]
    }
    var ia = (t, e) => ({
      name: n,
      value: i
    }) => (n.startsWith(t) && (n = n.replace(t, e)), {
      name: n,
      value: i
    });

    function ra(t = () => {}) {
      return ({
        name: e,
        value: n
      }) => {
        let {
          name: i,
          value: r
        } = aa.reduce(((t, e) => e(t)), {
          name: e,
          value: n
        });
        return i !== e && t(i, e), {
          name: i,
          value: r
        }
      }
    }
    var aa = [];

    function sa(t) {
      aa.push(t)
    }

    function oa({
      name: t
    }) {
      return la().test(t)
    }
    var la = () => new RegExp(`^${qr}([^:^.]+)\\b`),
      ca = "DEFAULT",
      ua = ["ignore", "ref", "data", "id", "anchor", "bind", "init", "for", "model", "modelable", "transition", "show", "if", ca, "teleport"];

    function ha(t, e) {
      let n = -1 === ua.indexOf(t.type) ? ca : t.type,
        i = -1 === ua.indexOf(e.type) ? ca : e.type;
      return ua.indexOf(n) - ua.indexOf(i)
    }

    function da(t, e, n = {}) {
      t.dispatchEvent(new CustomEvent(e, {
        detail: n,
        bubbles: !0,
        composed: !0,
        cancelable: !0
      }))
    }

    function pa(t, e) {
      if ("function" == typeof ShadowRoot && t instanceof ShadowRoot) return void Array.from(t.children).forEach((t => pa(t, e)));
      let n = !1;
      if (e(t, (() => n = !0)), n) return;
      let i = t.firstElementChild;
      for (; i;) pa(i, e), i = i.nextElementSibling
    }

    function fa(t, ...e) {
      console.warn(`Alpine Warning: ${t}`, ...e)
    }
    var ma = !1,
      ga = [],
      _a = [];

    function va() {
      return ga.map((t => t()))
    }

    function xa() {
      return ga.concat(_a).map((t => t()))
    }

    function ya(t) {
      ga.push(t)
    }

    function ba(t) {
      _a.push(t)
    }

    function Ma(t, e = !1) {
      return Sa(t, (t => {
        if ((e ? xa() : va()).some((e => t.matches(e)))) return !0
      }))
    }

    function Sa(t, e) {
      if (t) {
        if (e(t)) return t;
        if (t._x_teleportBack && (t = t._x_teleportBack), t.parentElement) return Sa(t.parentElement, e)
      }
    }
    var Ea = [],
      Ta = 1;

    function wa(t, e = pa, n = () => {}) {
      Sa(t, (t => t._x_ignore)) || function() {
        Qr = !0;
        let i = Symbol();
        ea = i, ta.set(i, []);
        let r = () => {
          for (; ta.get(i).length;) ta.get(i).shift()();
          ta.delete(i)
        };
        e(t, ((t, e) => {
          t._x_marker || (n(t, e), Ea.forEach((n => n(t, e))), Zr(t, t.attributes).forEach((t => t())), t._x_ignore || (t._x_marker = Ta++), t._x_ignore && e())
        })), Qr = !1, r()
      }()
    }

    function Aa(t, e = pa) {
      e(t, (t => {
        ! function(t) {
          for (t._x_effects?.forEach(rr); t._x_cleanups?.length;) t._x_cleanups.pop()()
        }(t), mr(t), delete t._x_marker
      }))
    }
    var Ra = [],
      Ca = !1;

    function Pa(t = () => {}) {
      return queueMicrotask((() => {
        Ca || setTimeout((() => {
          Da()
        }))
      })), new Promise((e => {
        Ra.push((() => {
          t(), e()
        }))
      }))
    }

    function Da() {
      for (Ca = !1; Ra.length;) Ra.shift()()
    }

    function La(t, e) {
      return Array.isArray(e) ? Ia(t, e.join(" ")) : "object" == typeof e && null !== e ? function(t, e) {
        let n = t => t.split(" ").filter(Boolean),
          i = Object.entries(e).flatMap((([t, e]) => !!e && n(t))).filter(Boolean),
          r = Object.entries(e).flatMap((([t, e]) => !e && n(t))).filter(Boolean),
          a = [],
          s = [];
        return r.forEach((e => {
          t.classList.contains(e) && (t.classList.remove(e), s.push(e))
        })), i.forEach((e => {
          t.classList.contains(e) || (t.classList.add(e), a.push(e))
        })), () => {
          s.forEach((e => t.classList.add(e))), a.forEach((e => t.classList.remove(e)))
        }
      }(t, e) : "function" == typeof e ? La(t, e()) : Ia(t, e)
    }

    function Ia(t, e) {
      return e = !0 === e ? e = "" : e || "", n = e.split(" ").filter((e => !t.classList.contains(e))).filter(Boolean), t.classList.add(...n), () => {
        t.classList.remove(...n)
      };
      var n
    }

    function Ua(t, e) {
      return "object" == typeof e && null !== e ? function(t, e) {
        let n = {};
        return Object.entries(e).forEach((([e, i]) => {
          n[e] = t.style[e], e.startsWith("--") || (e = e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()), t.style.setProperty(e, i)
        })), setTimeout((() => {
          0 === t.style.length && t.removeAttribute("style")
        })), () => {
          Ua(t, n)
        }
      }(t, e) : function(t, e) {
        let n = t.getAttribute("style", e);
        return t.setAttribute("style", e), () => {
          t.setAttribute("style", n || "")
        }
      }(t, e)
    }

    function Na(t, e = () => {}) {
      let n = !1;
      return function() {
        n ? e.apply(this, arguments) : (n = !0, t.apply(this, arguments))
      }
    }

    function Oa(t, e, n = {}) {
      t._x_transition || (t._x_transition = {
        enter: {
          during: n,
          start: n,
          end: n
        },
        leave: {
          during: n,
          start: n,
          end: n
        },
        in (n = () => {}, i = () => {}) {
          Ba(t, e, {
            during: this.enter.during,
            start: this.enter.start,
            end: this.enter.end
          }, n, i)
        },
        out(n = () => {}, i = () => {}) {
          Ba(t, e, {
            during: this.leave.during,
            start: this.leave.start,
            end: this.leave.end
          }, n, i)
        }
      })
    }

    function Fa(t) {
      let e = t.parentNode;
      if (e) return e._x_hidePromise ? e : Fa(e)
    }

    function Ba(t, e, {
      during: n,
      start: i,
      end: r
    } = {}, a = () => {}, s = () => {}) {
      if (t._x_transitioning && t._x_transitioning.cancel(), 0 === Object.keys(n).length && 0 === Object.keys(i).length && 0 === Object.keys(r).length) return a(), void s();
      let o, l, c;
      ! function(t, e) {
        let n, i, r, a = Na((() => {
          br((() => {
            n = !0, i || e.before(), r || (e.end(), Da()), e.after(), t.isConnected && e.cleanup(), delete t._x_transitioning
          }))
        }));
        t._x_transitioning = {
          beforeCancels: [],
          beforeCancel(t) {
            this.beforeCancels.push(t)
          },
          cancel: Na((function() {
            for (; this.beforeCancels.length;) this.beforeCancels.shift()();
            a()
          })),
          finish: a
        }, br((() => {
          e.start(), e.during()
        })), Ca = !0, requestAnimationFrame((() => {
          if (n) return;
          let a = 1e3 * Number(getComputedStyle(t).transitionDuration.replace(/,.*/, "").replace("s", "")),
            s = 1e3 * Number(getComputedStyle(t).transitionDelay.replace(/,.*/, "").replace("s", ""));
          0 === a && (a = 1e3 * Number(getComputedStyle(t).animationDuration.replace("s", ""))), br((() => {
            e.before()
          })), i = !0, requestAnimationFrame((() => {
            n || (br((() => {
              e.end()
            })), Da(), setTimeout(t._x_transitioning.finish, a + s), r = !0)
          }))
        }))
      }(t, {
        start() {
          o = e(t, i)
        },
        during() {
          l = e(t, n)
        },
        before: a,
        end() {
          o(), c = e(t, r)
        },
        after: s,
        cleanup() {
          l(), c()
        }
      })
    }

    function za(t, e, n) {
      if (-1 === t.indexOf(e)) return n;
      const i = t[t.indexOf(e) + 1];
      if (!i) return n;
      if ("scale" === e && isNaN(i)) return n;
      if ("duration" === e || "delay" === e) {
        let t = i.match(/([0-9]+)ms/);
        if (t) return t[1]
      }
      return "origin" === e && ["top", "right", "left", "center", "bottom"].includes(t[t.indexOf(e) + 2]) ? [i, t[t.indexOf(e) + 2]].join(" ") : i
    }
    Kr("transition", ((t, {
      value: e,
      modifiers: n,
      expression: i
    }, {
      evaluate: r
    }) => {
      "function" == typeof i && (i = r(i)), !1 !== i && (i && "boolean" != typeof i ? function(t, e, n) {
        Oa(t, La, ""), {
          enter: e => {
            t._x_transition.enter.during = e
          },
          "enter-start": e => {
            t._x_transition.enter.start = e
          },
          "enter-end": e => {
            t._x_transition.enter.end = e
          },
          leave: e => {
            t._x_transition.leave.during = e
          },
          "leave-start": e => {
            t._x_transition.leave.start = e
          },
          "leave-end": e => {
            t._x_transition.leave.end = e
          }
        } [n](e)
      }(t, i, e) : function(t, e, n) {
        Oa(t, Ua);
        let i = !e.includes("in") && !e.includes("out") && !n,
          r = i || e.includes("in") || ["enter"].includes(n),
          a = i || e.includes("out") || ["leave"].includes(n);
        e.includes("in") && !i && (e = e.filter(((t, n) => n < e.indexOf("out")))), e.includes("out") && !i && (e = e.filter(((t, n) => n > e.indexOf("out"))));
        let s = !e.includes("opacity") && !e.includes("scale"),
          o = s || e.includes("opacity") ? 0 : 1,
          l = s || e.includes("scale") ? za(e, "scale", 95) / 100 : 1,
          c = za(e, "delay", 0) / 1e3,
          u = za(e, "origin", "center"),
          h = "opacity, transform",
          d = za(e, "duration", 150) / 1e3,
          p = za(e, "duration", 75) / 1e3,
          f = "cubic-bezier(0.4, 0.0, 0.2, 1)";
        r && (t._x_transition.enter.during = {
          transformOrigin: u,
          transitionDelay: `${c}s`,
          transitionProperty: h,
          transitionDuration: `${d}s`,
          transitionTimingFunction: f
        }, t._x_transition.enter.start = {
          opacity: o,
          transform: `scale(${l})`
        }, t._x_transition.enter.end = {
          opacity: 1,
          transform: "scale(1)"
        }), a && (t._x_transition.leave.during = {
          transformOrigin: u,
          transitionDelay: `${c}s`,
          transitionProperty: h,
          transitionDuration: `${p}s`,
          transitionTimingFunction: f
        }, t._x_transition.leave.start = {
          opacity: 1,
          transform: "scale(1)"
        }, t._x_transition.leave.end = {
          opacity: o,
          transform: `scale(${l})`
        })
      }(t, n, e))
    })), window.Element.prototype._x_toggleAndCascadeWithTransitions = function(t, e, n, i) {
      const r = "visible" === document.visibilityState ? requestAnimationFrame : setTimeout;
      let a = () => r(n);
      e ? t._x_transition && (t._x_transition.enter || t._x_transition.leave) ? t._x_transition.enter && (Object.entries(t._x_transition.enter.during).length || Object.entries(t._x_transition.enter.start).length || Object.entries(t._x_transition.enter.end).length) ? t._x_transition.in(n) : a() : t._x_transition ? t._x_transition.in(n) : a() : (t._x_hidePromise = t._x_transition ? new Promise(((e, n) => {
        t._x_transition.out((() => {}), (() => e(i))), t._x_transitioning && t._x_transitioning.beforeCancel((() => n({
          isFromCancelledTransition: !0
        })))
      })) : Promise.resolve(i), queueMicrotask((() => {
        let e = Fa(t);
        e ? (e._x_hideChildren || (e._x_hideChildren = []), e._x_hideChildren.push(t)) : r((() => {
          let e = t => {
            let n = Promise.all([t._x_hidePromise, ...(t._x_hideChildren || []).map(e)]).then((([t]) => t?.()));
            return delete t._x_hidePromise, delete t._x_hideChildren, n
          };
          e(t).catch((t => {
            if (!t.isFromCancelledTransition) throw t
          }))
        }))
      })))
    };
    var ka = !1;

    function Ha(t, e = () => {}) {
      return (...n) => ka ? e(...n) : t(...n)
    }
    var Va = [];

    function Ga(t) {
      Va.push(t)
    }
    var Wa = !1;

    function Xa(t) {
      let e = Zi;
      or(((t, n) => {
        let i = e(t);
        return Ji(i), () => {}
      })), t(), or(e)
    }

    function ja(t, e, n, i = []) {
      switch (t._x_bindings || (t._x_bindings = Ki({})), t._x_bindings[e] = n, e = i.includes("camel") ? e.toLowerCase().replace(/-(\w)/g, ((t, e) => e.toUpperCase())) : e) {
        case "value":
          ! function(t, e) {
            if (ts(t)) void 0 === t.attributes.value && (t.value = e), window.fromModel && (t.checked = "boolean" == typeof e ? $a(t.value) === e : Ya(t.value, e));
            else if (Qa(t)) Number.isInteger(e) ? t.value = e : Array.isArray(e) || "boolean" == typeof e || [null, void 0].includes(e) ? Array.isArray(e) ? t.checked = e.some((e => Ya(e, t.value))) : t.checked = !!e : t.value = String(e);
            else if ("SELECT" === t.tagName) ! function(t, e) {
              const n = [].concat(e).map((t => t + ""));
              Array.from(t.options).forEach((t => {
                t.selected = n.includes(t.value)
              }))
            }(t, e);
            else {
              if (t.value === e) return;
              t.value = void 0 === e ? "" : e
            }
          }(t, n);
          break;
        case "style":
          ! function(t, e) {
            t._x_undoAddedStyles && t._x_undoAddedStyles(), t._x_undoAddedStyles = Ua(t, e)
          }(t, n);
          break;
        case "class":
          ! function(t, e) {
            t._x_undoAddedClasses && t._x_undoAddedClasses(), t._x_undoAddedClasses = La(t, e)
          }(t, n);
          break;
        case "selected":
        case "checked":
          ! function(t, e, n) {
            qa(t, e, n),
              function(t, e, n) {
                t[e] !== n && (t[e] = n)
              }(t, e, n)
          }(t, e, n);
          break;
        default:
          qa(t, e, n)
      }
    }

    function qa(t, e, n) {
      [null, void 0, !1].includes(n) && function(t) {
        return !["aria-pressed", "aria-checked", "aria-expanded", "aria-selected"].includes(t)
      }(e) ? t.removeAttribute(e) : (Za(e) && (n = e), function(t, e, n) {
        t.getAttribute(e) != n && t.setAttribute(e, n)
      }(t, e, n))
    }

    function Ya(t, e) {
      return t == e
    }

    function $a(t) {
      return !![1, "1", "true", "on", "yes", !0].includes(t) || ![0, "0", "false", "off", "no", !1].includes(t) && (t ? Boolean(t) : null)
    }
    var Ka = new Set(["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "defer", "disabled", "formnovalidate", "inert", "ismap", "itemscope", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "selected", "shadowrootclonable", "shadowrootdelegatesfocus", "shadowrootserializable"]);

    function Za(t) {
      return Ka.has(t)
    }

    function Ja(t, e, n) {
      let i = t.getAttribute(e);
      return null === i ? "function" == typeof n ? n() : n : "" === i || (Za(e) ? !![e, "true"].includes(i) : i)
    }

    function Qa(t) {
      return "checkbox" === t.type || "ui-checkbox" === t.localName || "ui-switch" === t.localName
    }

    function ts(t) {
      return "radio" === t.type || "ui-radio" === t.localName
    }

    function es(t, e) {
      var n;
      return function() {
        var i = this,
          r = arguments;
        clearTimeout(n), n = setTimeout((function() {
          n = null, t.apply(i, r)
        }), e)
      }
    }

    function ns(t, e) {
      let n;
      return function() {
        let i = arguments;
        n || (t.apply(this, i), n = !0, setTimeout((() => n = !1), e))
      }
    }

    function is({
      get: t,
      set: e
    }, {
      get: n,
      set: i
    }) {
      let r, a, s = !0,
        o = Zi((() => {
          let o = t(),
            l = n();
          if (s) i(rs(o)), s = !1;
          else {
            let t = JSON.stringify(o),
              n = JSON.stringify(l);
            t !== r ? i(rs(o)) : t !== n && e(rs(l))
          }
          r = JSON.stringify(t()), a = JSON.stringify(n())
        }));
      return () => {
        Ji(o)
      }
    }

    function rs(t) {
      return "object" == typeof t ? JSON.parse(JSON.stringify(t)) : t
    }
    var as = {},
      ss = !1,
      os = {};

    function ls(t, e, n) {
      let i = [];
      for (; i.length;) i.pop()();
      let r = Object.entries(e).map((([t, e]) => ({
          name: t,
          value: e
        }))),
        a = Jr(r);
      return r = r.map((t => a.find((e => e.name === t.name)) ? {
        name: `x-bind:${t.name}`,
        value: `"${t.value}"`
      } : t)), Zr(t, r, n).map((t => {
        i.push(t.runCleanups), t()
      })), () => {
        for (; i.length;) i.pop()()
      }
    }
    var cs = {},
      us = {
        get reactive() {
          return Ki
        },
        get release() {
          return Ji
        },
        get effect() {
          return Zi
        },
        get raw() {
          return Qi
        },
        version: "3.14.9",
        flushAndStopDeferringMutations: function() {
          Mr = !1, Er(Sr), Sr = []
        },
        dontAutoEvaluateFunctions: kr,
        disableEffectScheduling: function(t) {
          sr = !1, t(), sr = !0
        },
        startObservingMutations: vr,
        stopObservingMutations: xr,
        setReactivityEngine: function(t) {
          Ki = t.reactive, Ji = t.release, Zi = e => t.effect(e, {
            scheduler: t => {
              sr ? function(t) {
                var e;
                e = t, nr.includes(e) || nr.push(e), er || tr || (tr = !0, queueMicrotask(ar))
              }(t) : t()
            }
          }), Qi = t.raw
        },
        onAttributeRemoved: fr,
        onAttributesAdded: pr,
        closestDataStack: Ar,
        skipDuringClone: Ha,
        onlyDuringClone: function(t) {
          return (...e) => ka && t(...e)
        },
        addRootSelector: ya,
        addInitSelector: ba,
        interceptClone: Ga,
        addScopeToNode: wr,
        deferMutations: function() {
          Mr = !0
        },
        mapAttributes: sa,
        evaluateLater: Vr,
        interceptInit: function(t) {
          Ea.push(t)
        },
        setEvaluator: function(t) {
          Gr = t
        },
        mergeProxies: Rr,
        extractProp: function(t, e, n, i = !0) {
          if (t._x_bindings && void 0 !== t._x_bindings[e]) return t._x_bindings[e];
          if (t._x_inlineBindings && void 0 !== t._x_inlineBindings[e]) {
            let n = t._x_inlineBindings[e];
            return n.extract = i, kr((() => Hr(t, n.expression)))
          }
          return Ja(t, e, n)
        },
        findClosest: Sa,
        onElRemoved: dr,
        closestRoot: Ma,
        destroyTree: Aa,
        interceptor: Lr,
        transition: Ba,
        setStyles: Ua,
        mutateDom: br,
        directive: Kr,
        entangle: is,
        throttle: ns,
        debounce: es,
        evaluate: Hr,
        initTree: wa,
        nextTick: Pa,
        prefixed: Yr,
        prefix: function(t) {
          qr = t
        },
        plugin: function(t) {
          (Array.isArray(t) ? t : [t]).forEach((t => t(hs)))
        },
        magic: Nr,
        store: function(t, e) {
          if (ss || (as = Ki(as), ss = !0), void 0 === e) return as[t];
          as[t] = e, Dr(as[t]), "object" == typeof e && null !== e && e.hasOwnProperty("init") && "function" == typeof e.init && as[t].init()
        },
        start: function() {
          var t;
          ma && fa("Alpine has already been initialized on this page. Calling Alpine.start() more than once can cause problems."), ma = !0, document.body || fa("Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"), da(document, "alpine:init"), da(document, "alpine:initializing"), vr(), t = t => wa(t, pa), hr.push(t), dr((t => Aa(t))), pr(((t, e) => {
            Zr(t, e).forEach((t => t()))
          })), Array.from(document.querySelectorAll(xa().join(","))).filter((t => !Ma(t.parentElement, !0))).forEach((t => {
            wa(t)
          })), da(document, "alpine:initialized"), setTimeout((() => {
            [
              ["ui", "dialog", ["[x-dialog], [x-popover]"]],
              ["anchor", "anchor", ["[x-anchor]"]],
              ["sort", "sort", ["[x-sort]"]]
            ].forEach((([t, e, n]) => {
              var i;
              i = e, Object.keys($r).includes(i) || n.some((e => {
                if (document.querySelector(e)) return fa(`found "${e}", but missing ${t} plugin`), !0
              }))
            }))
          }))
        },
        clone: function(t, e) {
          e._x_dataStack || (e._x_dataStack = t._x_dataStack), ka = !0, Wa = !0, Xa((() => {
            ! function(t) {
              let e = !1;
              wa(t, ((t, n) => {
                pa(t, ((t, i) => {
                  if (e && function(t) {
                      return va().some((e => t.matches(e)))
                    }(t)) return i();
                  e = !0, n(t, i)
                }))
              }))
            }(e)
          })), ka = !1, Wa = !1
        },
        cloneNode: function(t, e) {
          Va.forEach((n => n(t, e))), ka = !0, Xa((() => {
            wa(e, ((t, e) => {
              e(t, (() => {}))
            }))
          })), ka = !1
        },
        bound: function(t, e, n) {
          return t._x_bindings && void 0 !== t._x_bindings[e] ? t._x_bindings[e] : Ja(t, e, n)
        },
        $data: Tr,
        watch: lr,
        walk: pa,
        data: function(t, e) {
          cs[t] = e
        },
        bind: function(t, e) {
          let n = "function" != typeof e ? () => e : e;
          return t instanceof Element ? ls(t, n()) : (os[t] = n, () => {})
        }
      },
      hs = us;

    function ds(t, e) {
      const n = Object.create(null),
        i = t.split(",");
      for (let t = 0; t < i.length; t++) n[i[t]] = !0;
      return e ? t => !!n[t.toLowerCase()] : t => !!n[t]
    }
    var ps, fs = Object.freeze({}),
      ms = (Object.freeze([]), Object.prototype.hasOwnProperty),
      gs = (t, e) => ms.call(t, e),
      _s = Array.isArray,
      vs = t => "[object Map]" === Ms(t),
      xs = t => "symbol" == typeof t,
      ys = t => null !== t && "object" == typeof t,
      bs = Object.prototype.toString,
      Ms = t => bs.call(t),
      Ss = t => Ms(t).slice(8, -1),
      Es = t => "string" == typeof t && "NaN" !== t && "-" !== t[0] && "" + parseInt(t, 10) === t,
      Ts = t => {
        const e = Object.create(null);
        return n => e[n] || (e[n] = t(n))
      },
      ws = /-(\w)/g,
      As = (Ts((t => t.replace(ws, ((t, e) => e ? e.toUpperCase() : "")))), /\B([A-Z])/g),
      Rs = (Ts((t => t.replace(As, "-$1").toLowerCase())), Ts((t => t.charAt(0).toUpperCase() + t.slice(1)))),
      Cs = (Ts((t => t ? `on${Rs(t)}` : "")), (t, e) => t !== e && (t == t || e == e)),
      Ps = new WeakMap,
      Ds = [],
      Ls = Symbol("iterate"),
      Is = Symbol("Map key iterate"),
      Us = 0;

    function Ns(t) {
      const {
        deps: e
      } = t;
      if (e.length) {
        for (let n = 0; n < e.length; n++) e[n].delete(t);
        e.length = 0
      }
    }
    var Os = !0,
      Fs = [];

    function Bs() {
      const t = Fs.pop();
      Os = void 0 === t || t
    }

    function zs(t, e, n) {
      if (!Os || void 0 === ps) return;
      let i = Ps.get(t);
      i || Ps.set(t, i = new Map);
      let r = i.get(n);
      r || i.set(n, r = new Set), r.has(ps) || (r.add(ps), ps.deps.push(r), ps.options.onTrack && ps.options.onTrack({
        effect: ps,
        target: t,
        type: e,
        key: n
      }))
    }

    function ks(t, e, n, i, r, a) {
      const s = Ps.get(t);
      if (!s) return;
      const o = new Set,
        l = t => {
          t && t.forEach((t => {
            (t !== ps || t.allowRecurse) && o.add(t)
          }))
        };
      if ("clear" === e) s.forEach(l);
      else if ("length" === n && _s(t)) s.forEach(((t, e) => {
        ("length" === e || e >= i) && l(t)
      }));
      else switch (void 0 !== n && l(s.get(n)), e) {
        case "add":
          _s(t) ? Es(n) && l(s.get("length")) : (l(s.get(Ls)), vs(t) && l(s.get(Is)));
          break;
        case "delete":
          _s(t) || (l(s.get(Ls)), vs(t) && l(s.get(Is)));
          break;
        case "set":
          vs(t) && l(s.get(Ls))
      }
      o.forEach((s => {
        s.options.onTrigger && s.options.onTrigger({
          effect: s,
          target: t,
          key: n,
          type: e,
          newValue: i,
          oldValue: r,
          oldTarget: a
        }), s.options.scheduler ? s.options.scheduler(s) : s()
      }))
    }
    var Hs = ds("__proto__,__v_isRef,__isVue"),
      Vs = new Set(Object.getOwnPropertyNames(Symbol).map((t => Symbol[t])).filter(xs)),
      Gs = qs(),
      Ws = qs(!0),
      Xs = js();

    function js() {
      const t = {};
      return ["includes", "indexOf", "lastIndexOf"].forEach((e => {
        t[e] = function(...t) {
          const n = Ro(this);
          for (let t = 0, e = this.length; t < e; t++) zs(n, "get", t + "");
          const i = n[e](...t);
          return -1 === i || !1 === i ? n[e](...t.map(Ro)) : i
        }
      })), ["push", "pop", "shift", "unshift", "splice"].forEach((e => {
        t[e] = function(...t) {
          Fs.push(Os), Os = !1;
          const n = Ro(this)[e].apply(this, t);
          return Bs(), n
        }
      })), t
    }

    function qs(t = !1, e = !1) {
      return function(n, i, r) {
        if ("__v_isReactive" === i) return !t;
        if ("__v_isReadonly" === i) return t;
        if ("__v_raw" === i && r === (t ? e ? Eo : So : e ? Mo : bo).get(n)) return n;
        const a = _s(n);
        if (!t && a && gs(Xs, i)) return Reflect.get(Xs, i, r);
        const s = Reflect.get(n, i, r);
        return (xs(i) ? Vs.has(i) : Hs(i)) ? s : (t || zs(n, "get", i), e ? s : Co(s) ? a && Es(i) ? s : s.value : ys(s) ? t ? wo(s) : To(s) : s)
      }
    }

    function Ys(t = !1) {
      return function(e, n, i, r) {
        let a = e[n];
        if (!t && (i = Ro(i), a = Ro(a), !_s(e) && Co(a) && !Co(i))) return a.value = i, !0;
        const s = _s(e) && Es(n) ? Number(n) < e.length : gs(e, n),
          o = Reflect.set(e, n, i, r);
        return e === Ro(r) && (s ? Cs(i, a) && ks(e, "set", n, i, a) : ks(e, "add", n, i)), o
      }
    }
    var $s = {
        get: Gs,
        set: Ys(),
        deleteProperty: function(t, e) {
          const n = gs(t, e),
            i = t[e],
            r = Reflect.deleteProperty(t, e);
          return r && n && ks(t, "delete", e, void 0, i), r
        },
        has: function(t, e) {
          const n = Reflect.has(t, e);
          return xs(e) && Vs.has(e) || zs(t, "has", e), n
        },
        ownKeys: function(t) {
          return zs(t, "iterate", _s(t) ? "length" : Ls), Reflect.ownKeys(t)
        }
      },
      Ks = {
        get: Ws,
        set: (t, e) => (console.warn(`Set operation on key "${String(e)}" failed: target is readonly.`, t), !0),
        deleteProperty: (t, e) => (console.warn(`Delete operation on key "${String(e)}" failed: target is readonly.`, t), !0)
      },
      Zs = t => ys(t) ? To(t) : t,
      Js = t => ys(t) ? wo(t) : t,
      Qs = t => t,
      to = t => Reflect.getPrototypeOf(t);

    function eo(t, e, n = !1, i = !1) {
      const r = Ro(t = t.__v_raw),
        a = Ro(e);
      e !== a && !n && zs(r, "get", e), !n && zs(r, "get", a);
      const {
        has: s
      } = to(r), o = i ? Qs : n ? Js : Zs;
      return s.call(r, e) ? o(t.get(e)) : s.call(r, a) ? o(t.get(a)) : void(t !== r && t.get(e))
    }

    function no(t, e = !1) {
      const n = this.__v_raw,
        i = Ro(n),
        r = Ro(t);
      return t !== r && !e && zs(i, "has", t), !e && zs(i, "has", r), t === r ? n.has(t) : n.has(t) || n.has(r)
    }

    function io(t, e = !1) {
      return t = t.__v_raw, !e && zs(Ro(t), "iterate", Ls), Reflect.get(t, "size", t)
    }

    function ro(t) {
      t = Ro(t);
      const e = Ro(this);
      return to(e).has.call(e, t) || (e.add(t), ks(e, "add", t, t)), this
    }

    function ao(t, e) {
      e = Ro(e);
      const n = Ro(this),
        {
          has: i,
          get: r
        } = to(n);
      let a = i.call(n, t);
      a ? yo(n, i, t) : (t = Ro(t), a = i.call(n, t));
      const s = r.call(n, t);
      return n.set(t, e), a ? Cs(e, s) && ks(n, "set", t, e, s) : ks(n, "add", t, e), this
    }

    function so(t) {
      const e = Ro(this),
        {
          has: n,
          get: i
        } = to(e);
      let r = n.call(e, t);
      r ? yo(e, n, t) : (t = Ro(t), r = n.call(e, t));
      const a = i ? i.call(e, t) : void 0,
        s = e.delete(t);
      return r && ks(e, "delete", t, void 0, a), s
    }

    function oo() {
      const t = Ro(this),
        e = 0 !== t.size,
        n = vs(t) ? new Map(t) : new Set(t),
        i = t.clear();
      return e && ks(t, "clear", void 0, void 0, n), i
    }

    function lo(t, e) {
      return function(n, i) {
        const r = this,
          a = r.__v_raw,
          s = Ro(a),
          o = e ? Qs : t ? Js : Zs;
        return !t && zs(s, "iterate", Ls), a.forEach(((t, e) => n.call(i, o(t), o(e), r)))
      }
    }

    function co(t, e, n) {
      return function(...i) {
        const r = this.__v_raw,
          a = Ro(r),
          s = vs(a),
          o = "entries" === t || t === Symbol.iterator && s,
          l = "keys" === t && s,
          c = r[t](...i),
          u = n ? Qs : e ? Js : Zs;
        return !e && zs(a, "iterate", l ? Is : Ls), {
          next() {
            const {
              value: t,
              done: e
            } = c.next();
            return e ? {
              value: t,
              done: e
            } : {
              value: o ? [u(t[0]), u(t[1])] : u(t),
              done: e
            }
          },
          [Symbol.iterator]() {
            return this
          }
        }
      }
    }

    function uo(t) {
      return function(...e) {
        {
          const n = e[0] ? `on key "${e[0]}" ` : "";
          console.warn(`${Rs(t)} operation ${n}failed: target is readonly.`, Ro(this))
        }
        return "delete" !== t && this
      }
    }

    function ho() {
      const t = {
          get(t) {
            return eo(this, t)
          },
          get size() {
            return io(this)
          },
          has: no,
          add: ro,
          set: ao,
          delete: so,
          clear: oo,
          forEach: lo(!1, !1)
        },
        e = {
          get(t) {
            return eo(this, t, !1, !0)
          },
          get size() {
            return io(this)
          },
          has: no,
          add: ro,
          set: ao,
          delete: so,
          clear: oo,
          forEach: lo(!1, !0)
        },
        n = {
          get(t) {
            return eo(this, t, !0)
          },
          get size() {
            return io(this, !0)
          },
          has(t) {
            return no.call(this, t, !0)
          },
          add: uo("add"),
          set: uo("set"),
          delete: uo("delete"),
          clear: uo("clear"),
          forEach: lo(!0, !1)
        },
        i = {
          get(t) {
            return eo(this, t, !0, !0)
          },
          get size() {
            return io(this, !0)
          },
          has(t) {
            return no.call(this, t, !0)
          },
          add: uo("add"),
          set: uo("set"),
          delete: uo("delete"),
          clear: uo("clear"),
          forEach: lo(!0, !0)
        };
      return ["keys", "values", "entries", Symbol.iterator].forEach((r => {
        t[r] = co(r, !1, !1), n[r] = co(r, !0, !1), e[r] = co(r, !1, !0), i[r] = co(r, !0, !0)
      })), [t, n, e, i]
    }
    var [po, fo, mo, go] = ho();

    function _o(t, e) {
      const n = e ? t ? go : mo : t ? fo : po;
      return (e, i, r) => "__v_isReactive" === i ? !t : "__v_isReadonly" === i ? t : "__v_raw" === i ? e : Reflect.get(gs(n, i) && i in e ? n : e, i, r)
    }
    var vo = {
        get: _o(!1, !1)
      },
      xo = {
        get: _o(!0, !1)
      };

    function yo(t, e, n) {
      const i = Ro(n);
      if (i !== n && e.call(t, i)) {
        const e = Ss(t);
        console.warn(`Reactive ${e} contains both the raw and reactive versions of the same object${"Map"===e?" as keys":""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`)
      }
    }
    var bo = new WeakMap,
      Mo = new WeakMap,
      So = new WeakMap,
      Eo = new WeakMap;

    function To(t) {
      return t && t.__v_isReadonly ? t : Ao(t, !1, $s, vo, bo)
    }

    function wo(t) {
      return Ao(t, !0, Ks, xo, So)
    }

    function Ao(t, e, n, i, r) {
      if (!ys(t)) return console.warn(`value cannot be made reactive: ${String(t)}`), t;
      if (t.__v_raw && (!e || !t.__v_isReactive)) return t;
      const a = r.get(t);
      if (a) return a;
      const s = (o = t).__v_skip || !Object.isExtensible(o) ? 0 : function(t) {
        switch (t) {
          case "Object":
          case "Array":
            return 1;
          case "Map":
          case "Set":
          case "WeakMap":
          case "WeakSet":
            return 2;
          default:
            return 0
        }
      }(Ss(o));
      var o;
      if (0 === s) return t;
      const l = new Proxy(t, 2 === s ? i : n);
      return r.set(t, l), l
    }

    function Ro(t) {
      return t && Ro(t.__v_raw) || t
    }

    function Co(t) {
      return Boolean(t && !0 === t.__v_isRef)
    }
    Nr("nextTick", (() => Pa)), Nr("dispatch", (t => da.bind(da, t))), Nr("watch", ((t, {
      evaluateLater: e,
      cleanup: n
    }) => (t, i) => {
      let r = e(t),
        a = lr((() => {
          let t;
          return r((e => t = e)), t
        }), i);
      n(a)
    })), Nr("store", (function() {
      return as
    })), Nr("data", (t => Tr(t))), Nr("root", (t => Ma(t))), Nr("refs", (t => (t._x_refs_proxy || (t._x_refs_proxy = Rr(function(t) {
      let e = [];
      return Sa(t, (t => {
        t._x_refs && e.push(t._x_refs)
      })), e
    }(t))), t._x_refs_proxy)));
    var Po = {};

    function Do(t) {
      return Po[t] || (Po[t] = 0), ++Po[t]
    }

    function Lo(t, e, n) {
      Nr(e, (i => fa(`You can't use [$${e}] without first installing the "${t}" plugin here: https://alpinejs.dev/plugins/${n}`, i)))
    }
    Nr("id", ((t, {
      cleanup: e
    }) => (n, i = null) => function(t, e, n, i) {
      if (t._x_id || (t._x_id = {}), t._x_id[e]) return t._x_id[e];
      let r = i();
      return t._x_id[e] = r, n((() => {
        delete t._x_id[e]
      })), r
    }(t, `${n}${i?`-${i}`:""}`, e, (() => {
      let e = function(t, e) {
          return Sa(t, (t => {
            if (t._x_ids && t._x_ids[e]) return !0
          }))
        }(t, n),
        r = e ? e._x_ids[n] : Do(n);
      return i ? `${n}-${r}-${i}` : `${n}-${r}`
    })))), Ga(((t, e) => {
      t._x_id && (e._x_id = t._x_id)
    })), Nr("el", (t => t)), Lo("Focus", "focus", "focus"), Lo("Persist", "persist", "persist"), Kr("modelable", ((t, {
      expression: e
    }, {
      effect: n,
      evaluateLater: i,
      cleanup: r
    }) => {
      let a = i(e),
        s = () => {
          let t;
          return a((e => t = e)), t
        },
        o = i(`${e} = __placeholder`),
        l = t => o((() => {}), {
          scope: {
            __placeholder: t
          }
        }),
        c = s();
      l(c), queueMicrotask((() => {
        if (!t._x_model) return;
        t._x_removeModelListeners.default();
        let e = t._x_model.get,
          n = t._x_model.set,
          i = is({
            get: () => e(),
            set(t) {
              n(t)
            }
          }, {
            get: () => s(),
            set(t) {
              l(t)
            }
          });
        r(i)
      }))
    })), Kr("teleport", ((t, {
      modifiers: e,
      expression: n
    }, {
      cleanup: i
    }) => {
      "template" !== t.tagName.toLowerCase() && fa("x-teleport can only be used on a <template> tag", t);
      let r = Uo(n),
        a = t.content.cloneNode(!0).firstElementChild;
      t._x_teleport = a, a._x_teleportBack = t, t.setAttribute("data-teleport-template", !0), a.setAttribute("data-teleport-target", !0), t._x_forwardEvents && t._x_forwardEvents.forEach((e => {
        a.addEventListener(e, (e => {
          e.stopPropagation(), t.dispatchEvent(new e.constructor(e.type, e))
        }))
      })), wr(a, {}, t);
      let s = (t, e, n) => {
        n.includes("prepend") ? e.parentNode.insertBefore(t, e) : n.includes("append") ? e.parentNode.insertBefore(t, e.nextSibling) : e.appendChild(t)
      };
      br((() => {
        s(a, r, e), Ha((() => {
          wa(a)
        }))()
      })), t._x_teleportPutBack = () => {
        let i = Uo(n);
        br((() => {
          s(t._x_teleport, i, e)
        }))
      }, i((() => br((() => {
        a.remove(), Aa(a)
      }))))
    }));
    var Io = document.createElement("div");

    function Uo(t) {
      let e = Ha((() => document.querySelector(t)), (() => Io))();
      return e || fa(`Cannot find x-teleport element for selector: "${t}"`), e
    }
    var No = () => {};

    function Oo(t, e, n, i) {
      let r = t,
        a = t => i(t),
        s = {},
        o = (t, e) => n => e(t, n);
      if (n.includes("dot") && (e = e.replace(/-/g, ".")), n.includes("camel") && (e = e.toLowerCase().replace(/-(\w)/g, ((t, e) => e.toUpperCase()))), n.includes("passive") && (s.passive = !0), n.includes("capture") && (s.capture = !0), n.includes("window") && (r = window), n.includes("document") && (r = document), n.includes("debounce")) {
        let t = n[n.indexOf("debounce") + 1] || "invalid-wait",
          e = Fo(t.split("ms")[0]) ? Number(t.split("ms")[0]) : 250;
        a = es(a, e)
      }
      if (n.includes("throttle")) {
        let t = n[n.indexOf("throttle") + 1] || "invalid-wait",
          e = Fo(t.split("ms")[0]) ? Number(t.split("ms")[0]) : 250;
        a = ns(a, e)
      }
      return n.includes("prevent") && (a = o(a, ((t, e) => {
        e.preventDefault(), t(e)
      }))), n.includes("stop") && (a = o(a, ((t, e) => {
        e.stopPropagation(), t(e)
      }))), n.includes("once") && (a = o(a, ((t, n) => {
        t(n), r.removeEventListener(e, a, s)
      }))), (n.includes("away") || n.includes("outside")) && (r = document, a = o(a, ((e, n) => {
        t.contains(n.target) || !1 !== n.target.isConnected && (t.offsetWidth < 1 && t.offsetHeight < 1 || !1 !== t._x_isShown && e(n))
      }))), n.includes("self") && (a = o(a, ((e, n) => {
        n.target === t && e(n)
      }))), (function(t) {
        return ["keydown", "keyup"].includes(t)
      }(e) || Bo(e)) && (a = o(a, ((t, e) => {
        (function(t, e) {
          let n = e.filter((t => !["window", "document", "prevent", "stop", "once", "capture", "self", "away", "outside", "passive"].includes(t)));
          if (n.includes("debounce")) {
            let t = n.indexOf("debounce");
            n.splice(t, Fo((n[t + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1)
          }
          if (n.includes("throttle")) {
            let t = n.indexOf("throttle");
            n.splice(t, Fo((n[t + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1)
          }
          if (0 === n.length) return !1;
          if (1 === n.length && zo(t.key).includes(n[0])) return !1;
          const i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((t => n.includes(t)));
          if (n = n.filter((t => !i.includes(t))), i.length > 0 && i.filter((e => ("cmd" !== e && "super" !== e || (e = "meta"), t[`${e}Key`]))).length === i.length) {
            if (Bo(t.type)) return !1;
            if (zo(t.key).includes(n[0])) return !1
          }
          return !0
        })(e, n) || t(e)
      }))), r.addEventListener(e, a, s), () => {
        r.removeEventListener(e, a, s)
      }
    }

    function Fo(t) {
      return !Array.isArray(t) && !isNaN(t)
    }

    function Bo(t) {
      return ["contextmenu", "click", "mouse"].some((e => t.includes(e)))
    }

    function zo(t) {
      if (!t) return [];
      var e;
      t = [" ", "_"].includes(e = t) ? e : e.replace(/([a-z])([A-Z])/g, "$1-$2").replace(/[_\s]/, "-").toLowerCase();
      let n = {
        ctrl: "control",
        slash: "/",
        space: " ",
        spacebar: " ",
        cmd: "meta",
        esc: "escape",
        up: "arrow-up",
        down: "arrow-down",
        left: "arrow-left",
        right: "arrow-right",
        period: ".",
        comma: ",",
        equal: "=",
        minus: "-",
        underscore: "_"
      };
      return n[t] = t, Object.keys(n).map((e => {
        if (n[e] === t) return e
      })).filter((t => t))
    }

    function ko(t, e, n, i) {
      return br((() => {
        if (n instanceof CustomEvent && void 0 !== n.detail) return null !== n.detail && void 0 !== n.detail ? n.detail : n.target.value;
        if (Qa(t)) {
          if (Array.isArray(i)) {
            let t = null;
            return t = e.includes("number") ? Ho(n.target.value) : e.includes("boolean") ? $a(n.target.value) : n.target.value, n.target.checked ? i.includes(t) ? i : i.concat([t]) : i.filter((e => !(e == t)))
          }
          return n.target.checked
        }
        if ("select" === t.tagName.toLowerCase() && t.multiple) return e.includes("number") ? Array.from(n.target.selectedOptions).map((t => Ho(t.value || t.text))) : e.includes("boolean") ? Array.from(n.target.selectedOptions).map((t => $a(t.value || t.text))) : Array.from(n.target.selectedOptions).map((t => t.value || t.text)); {
          let r;
          return r = ts(t) ? n.target.checked ? n.target.value : i : n.target.value, e.includes("number") ? Ho(r) : e.includes("boolean") ? $a(r) : e.includes("trim") ? r.trim() : r
        }
      }))
    }

    function Ho(t) {
      let e = t ? parseFloat(t) : null;
      return n = e, Array.isArray(n) || isNaN(n) ? t : e;
      var n
    }

    function Vo(t) {
      return null !== t && "object" == typeof t && "function" == typeof t.get && "function" == typeof t.set
    }
    No.inline = (t, {
      modifiers: e
    }, {
      cleanup: n
    }) => {
      e.includes("self") ? t._x_ignoreSelf = !0 : t._x_ignore = !0, n((() => {
        e.includes("self") ? delete t._x_ignoreSelf : delete t._x_ignore
      }))
    }, Kr("ignore", No), Kr("effect", Ha(((t, {
      expression: e
    }, {
      effect: n
    }) => {
      n(Vr(t, e))
    }))), Kr("model", ((t, {
      modifiers: e,
      expression: n
    }, {
      effect: i,
      cleanup: r
    }) => {
      let a = t;
      e.includes("parent") && (a = t.parentNode);
      let s, o = Vr(a, n);
      s = "string" == typeof n ? Vr(a, `${n} = __placeholder`) : "function" == typeof n && "string" == typeof n() ? Vr(a, `${n()} = __placeholder`) : () => {};
      let l = () => {
          let t;
          return o((e => t = e)), Vo(t) ? t.get() : t
        },
        c = t => {
          let e;
          o((t => e = t)), Vo(e) ? e.set(t) : s((() => {}), {
            scope: {
              __placeholder: t
            }
          })
        };
      "string" == typeof n && "radio" === t.type && br((() => {
        t.hasAttribute("name") || t.setAttribute("name", n)
      }));
      var u = "select" === t.tagName.toLowerCase() || ["checkbox", "radio"].includes(t.type) || e.includes("lazy") ? "change" : "input";
      let h = ka ? () => {} : Oo(t, u, e, (n => {
        c(ko(t, e, n, l()))
      }));
      if (e.includes("fill") && ([void 0, null, ""].includes(l()) || Qa(t) && Array.isArray(l()) || "select" === t.tagName.toLowerCase() && t.multiple) && c(ko(t, e, {
          target: t
        }, l())), t._x_removeModelListeners || (t._x_removeModelListeners = {}), t._x_removeModelListeners.default = h, r((() => t._x_removeModelListeners.default())), t.form) {
        let n = Oo(t.form, "reset", [], (n => {
          Pa((() => t._x_model && t._x_model.set(ko(t, e, {
            target: t
          }, l()))))
        }));
        r((() => n()))
      }
      t._x_model = {
        get: () => l(),
        set(t) {
          c(t)
        }
      }, t._x_forceModelUpdate = e => {
        void 0 === e && "string" == typeof n && n.match(/\./) && (e = ""), window.fromModel = !0, br((() => ja(t, "value", e))), delete window.fromModel
      }, i((() => {
        let n = l();
        e.includes("unintrusive") && document.activeElement.isSameNode(t) || t._x_forceModelUpdate(n)
      }))
    })), Kr("cloak", (t => queueMicrotask((() => br((() => t.removeAttribute(Yr("cloak")))))))), ba((() => `[${Yr("init")}]`)), Kr("init", Ha(((t, {
      expression: e
    }, {
      evaluate: n
    }) => "string" == typeof e ? !!e.trim() && n(e, {}, !1) : n(e, {}, !1)))), Kr("text", ((t, {
      expression: e
    }, {
      effect: n,
      evaluateLater: i
    }) => {
      let r = i(e);
      n((() => {
        r((e => {
          br((() => {
            t.textContent = e
          }))
        }))
      }))
    })), Kr("html", ((t, {
      expression: e
    }, {
      effect: n,
      evaluateLater: i
    }) => {
      let r = i(e);
      n((() => {
        r((e => {
          br((() => {
            t.innerHTML = e, t._x_ignoreSelf = !0, wa(t), delete t._x_ignoreSelf
          }))
        }))
      }))
    })), sa(ia(":", Yr("bind:")));
    var Go = (t, {
      value: e,
      modifiers: n,
      expression: i,
      original: r
    }, {
      effect: a,
      cleanup: s
    }) => {
      if (!e) {
        let e = {};
        return o = e, Object.entries(os).forEach((([t, e]) => {
          Object.defineProperty(o, t, {
            get: () => (...t) => e(...t)
          })
        })), void Vr(t, i)((e => {
          ls(t, e, r)
        }), {
          scope: e
        })
      }
      var o;
      if ("key" === e) return function(t, e) {
        t._x_keyExpression = e
      }(t, i);
      if (t._x_inlineBindings && t._x_inlineBindings[e] && t._x_inlineBindings[e].extract) return;
      let l = Vr(t, i);
      a((() => l((r => {
        void 0 === r && "string" == typeof i && i.match(/\./) && (r = ""), br((() => ja(t, e, r, n)))
      })))), s((() => {
        t._x_undoAddedClasses && t._x_undoAddedClasses(), t._x_undoAddedStyles && t._x_undoAddedStyles()
      }))
    };

    function Wo(t, e, n, i) {
      let r = {};
      return /^\[.*\]$/.test(t.item) && Array.isArray(e) ? t.item.replace("[", "").replace("]", "").split(",").map((t => t.trim())).forEach(((t, n) => {
        r[t] = e[n]
      })) : /^\{.*\}$/.test(t.item) && !Array.isArray(e) && "object" == typeof e ? t.item.replace("{", "").replace("}", "").split(",").map((t => t.trim())).forEach((t => {
        r[t] = e[t]
      })) : r[t.item] = e, t.index && (r[t.index] = n), t.collection && (r[t.collection] = i), r
    }

    function Xo() {}

    function jo(t, e, n) {
      Kr(e, (i => fa(`You can't use [x-${e}] without first installing the "${t}" plugin here: https://alpinejs.dev/plugins/${n}`, i)))
    }
    Go.inline = (t, {
      value: e,
      modifiers: n,
      expression: i
    }) => {
      e && (t._x_inlineBindings || (t._x_inlineBindings = {}), t._x_inlineBindings[e] = {
        expression: i,
        extract: !1
      })
    }, Kr("bind", Go), ya((() => `[${Yr("data")}]`)), Kr("data", ((t, {
      expression: e
    }, {
      cleanup: n
    }) => {
      if (function(t) {
          return !!ka && (!!Wa || t.hasAttribute("data-has-alpine-state"))
        }(t)) return;
      e = "" === e ? "{}" : e;
      let i = {};
      Or(i, t);
      let r = {};
      var a, s;
      a = r, s = i, Object.entries(cs).forEach((([t, e]) => {
        Object.defineProperty(a, t, {
          get: () => (...t) => e.bind(s)(...t),
          enumerable: !1
        })
      }));
      let o = Hr(t, e, {
        scope: r
      });
      void 0 !== o && !0 !== o || (o = {}), Or(o, t);
      let l = Ki(o);
      Dr(l);
      let c = wr(t, l);
      l.init && Hr(t, l.init), n((() => {
        l.destroy && Hr(t, l.destroy), c()
      }))
    })), Ga(((t, e) => {
      t._x_dataStack && (e._x_dataStack = t._x_dataStack, e.setAttribute("data-has-alpine-state", !0))
    })), Kr("show", ((t, {
      modifiers: e,
      expression: n
    }, {
      effect: i
    }) => {
      let r = Vr(t, n);
      t._x_doHide || (t._x_doHide = () => {
        br((() => {
          t.style.setProperty("display", "none", e.includes("important") ? "important" : void 0)
        }))
      }), t._x_doShow || (t._x_doShow = () => {
        br((() => {
          1 === t.style.length && "none" === t.style.display ? t.removeAttribute("style") : t.style.removeProperty("display")
        }))
      });
      let a, s = () => {
          t._x_doHide(), t._x_isShown = !1
        },
        o = () => {
          t._x_doShow(), t._x_isShown = !0
        },
        l = () => setTimeout(o),
        c = Na((t => t ? o() : s()), (e => {
          "function" == typeof t._x_toggleAndCascadeWithTransitions ? t._x_toggleAndCascadeWithTransitions(t, e, o, s) : e ? l() : s()
        })),
        u = !0;
      i((() => r((t => {
        (u || t !== a) && (e.includes("immediate") && (t ? l() : s()), c(t), a = t, u = !1)
      }))))
    })), Kr("for", ((t, {
      expression: e
    }, {
      effect: n,
      cleanup: i
    }) => {
      let r = function(t) {
          let e = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
            n = t.match(/([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/);
          if (!n) return;
          let i = {};
          i.items = n[2].trim();
          let r = n[1].replace(/^\s*\(|\)\s*$/g, "").trim(),
            a = r.match(e);
          return a ? (i.item = r.replace(e, "").trim(), i.index = a[1].trim(), a[2] && (i.collection = a[2].trim())) : i.item = r, i
        }(e),
        a = Vr(t, r.items),
        s = Vr(t, t._x_keyExpression || "index");
      t._x_prevKeys = [], t._x_lookup = {}, n((() => function(t, e, n, i) {
        let r = t;
        n((n => {
          var a;
          a = n, !Array.isArray(a) && !isNaN(a) && n >= 0 && (n = Array.from(Array(n).keys(), (t => t + 1))), void 0 === n && (n = []);
          let s = t._x_lookup,
            o = t._x_prevKeys,
            l = [],
            c = [];
          if ("object" != typeof(u = n) || Array.isArray(u))
            for (let r = 0; r < n.length; r++) {
              let a = Wo(e, n[r], r, n);
              i((e => {
                c.includes(e) && fa("Duplicate key on x-for", t), c.push(e)
              }), {
                scope: {
                  index: r,
                  ...a
                }
              }), l.push(a)
            } else n = Object.entries(n).map((([r, a]) => {
              let s = Wo(e, a, r, n);
              i((e => {
                c.includes(e) && fa("Duplicate key on x-for", t), c.push(e)
              }), {
                scope: {
                  index: r,
                  ...s
                }
              }), l.push(s)
            }));
          var u;
          let h = [],
            d = [],
            p = [],
            f = [];
          for (let t = 0; t < o.length; t++) {
            let e = o[t]; - 1 === c.indexOf(e) && p.push(e)
          }
          o = o.filter((t => !p.includes(t)));
          let m = "template";
          for (let t = 0; t < c.length; t++) {
            let e = c[t],
              n = o.indexOf(e);
            if (-1 === n) o.splice(t, 0, e), h.push([m, t]);
            else if (n !== t) {
              let e = o.splice(t, 1)[0],
                i = o.splice(n - 1, 1)[0];
              o.splice(t, 0, i), o.splice(n, 0, e), d.push([e, i])
            } else f.push(e);
            m = e
          }
          for (let t = 0; t < p.length; t++) {
            let e = p[t];
            e in s && (br((() => {
              Aa(s[e]), s[e].remove()
            })), delete s[e])
          }
          for (let t = 0; t < d.length; t++) {
            let [e, n] = d[t], i = s[e], a = s[n], o = document.createElement("div");
            br((() => {
              a || fa('x-for ":key" is undefined or invalid', r, n, s), a.after(o), i.after(a), a._x_currentIfEl && a.after(a._x_currentIfEl), o.before(i), i._x_currentIfEl && i.after(i._x_currentIfEl), o.remove()
            })), a._x_refreshXForScope(l[c.indexOf(n)])
          }
          for (let t = 0; t < h.length; t++) {
            let [e, n] = h[t], i = "template" === e ? r : s[e];
            i._x_currentIfEl && (i = i._x_currentIfEl);
            let a = l[n],
              o = c[n],
              u = document.importNode(r.content, !0).firstElementChild,
              d = Ki(a);
            wr(u, d, r), u._x_refreshXForScope = t => {
              Object.entries(t).forEach((([t, e]) => {
                d[t] = e
              }))
            }, br((() => {
              i.after(u), Ha((() => wa(u)))()
            })), "object" == typeof o && fa("x-for key cannot be an object, it must be a string or an integer", r), s[o] = u
          }
          for (let t = 0; t < f.length; t++) s[f[t]]._x_refreshXForScope(l[c.indexOf(f[t])]);
          r._x_prevKeys = c
        }))
      }(t, r, a, s))), i((() => {
        Object.values(t._x_lookup).forEach((t => br((() => {
          Aa(t), t.remove()
        })))), delete t._x_prevKeys, delete t._x_lookup
      }))
    })), Xo.inline = (t, {
      expression: e
    }, {
      cleanup: n
    }) => {
      let i = Ma(t);
      i._x_refs || (i._x_refs = {}), i._x_refs[e] = t, n((() => delete i._x_refs[e]))
    }, Kr("ref", Xo), Kr("if", ((t, {
      expression: e
    }, {
      effect: n,
      cleanup: i
    }) => {
      "template" !== t.tagName.toLowerCase() && fa("x-if can only be used on a <template> tag", t);
      let r = Vr(t, e);
      n((() => r((e => {
        e ? (() => {
          if (t._x_currentIfEl) return t._x_currentIfEl;
          let e = t.content.cloneNode(!0).firstElementChild;
          wr(e, {}, t), br((() => {
            t.after(e), Ha((() => wa(e)))()
          })), t._x_currentIfEl = e, t._x_undoIf = () => {
            br((() => {
              Aa(e), e.remove()
            })), delete t._x_currentIfEl
          }
        })() : t._x_undoIf && (t._x_undoIf(), delete t._x_undoIf)
      })))), i((() => t._x_undoIf && t._x_undoIf()))
    })), Kr("id", ((t, {
      expression: e
    }, {
      evaluate: n
    }) => {
      n(e).forEach((e => function(t, e) {
        t._x_ids || (t._x_ids = {}), t._x_ids[e] || (t._x_ids[e] = Do(e))
      }(t, e)))
    })), Ga(((t, e) => {
      t._x_ids && (e._x_ids = t._x_ids)
    })), sa(ia("@", Yr("on:"))), Kr("on", Ha(((t, {
      value: e,
      modifiers: n,
      expression: i
    }, {
      cleanup: r
    }) => {
      let a = i ? Vr(t, i) : () => {};
      "template" === t.tagName.toLowerCase() && (t._x_forwardEvents || (t._x_forwardEvents = []), t._x_forwardEvents.includes(e) || t._x_forwardEvents.push(e));
      let s = Oo(t, e, n, (t => {
        a((() => {}), {
          scope: {
            $event: t
          },
          params: [t]
        })
      }));
      r((() => s()))
    }))), jo("Collapse", "collapse", "collapse"), jo("Intersect", "intersect", "intersect"), jo("Focus", "trap", "focus"), jo("Mask", "mask", "mask"), hs.setEvaluator(Wr), hs.setReactivityEngine({
      reactive: To,
      effect: function(t, e = fs) {
        (function(t) {
          return t && !0 === t._isEffect
        })(t) && (t = t.raw);
        const n = function(t, e) {
          const n = function() {
            if (!n.active) return t();
            if (!Ds.includes(n)) {
              Ns(n);
              try {
                return Fs.push(Os), Os = !0, Ds.push(n), ps = n, t()
              } finally {
                Ds.pop(), Bs(), ps = Ds[Ds.length - 1]
              }
            }
          };
          return n.id = Us++, n.allowRecurse = !!e.allowRecurse, n._isEffect = !0, n.active = !0, n.raw = t, n.deps = [], n.options = e, n
        }(t, e);
        return e.lazy || n(), n
      },
      release: function(t) {
        t.active && (Ns(t), t.options.onStop && t.options.onStop(), t.active = !1)
      },
      raw: Ro
    });
    var qo = hs;
    const Yo = function(t) {
        const e = [];
        let n = 0;
        for (let i = 0; i < t.length; i++) {
          let r = t.charCodeAt(i);
          r < 128 ? e[n++] = r : r < 2048 ? (e[n++] = r >> 6 | 192, e[n++] = 63 & r | 128) : 55296 == (64512 & r) && i + 1 < t.length && 56320 == (64512 & t.charCodeAt(i + 1)) ? (r = 65536 + ((1023 & r) << 10) + (1023 & t.charCodeAt(++i)), e[n++] = r >> 18 | 240, e[n++] = r >> 12 & 63 | 128, e[n++] = r >> 6 & 63 | 128, e[n++] = 63 & r | 128) : (e[n++] = r >> 12 | 224, e[n++] = r >> 6 & 63 | 128, e[n++] = 63 & r | 128)
        }
        return e
      },
      $o = {
        byteToCharMap_: null,
        charToByteMap_: null,
        byteToCharMapWebSafe_: null,
        charToByteMapWebSafe_: null,
        ENCODED_VALS_BASE: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
        get ENCODED_VALS() {
          return this.ENCODED_VALS_BASE + "+/="
        },
        get ENCODED_VALS_WEBSAFE() {
          return this.ENCODED_VALS_BASE + "-_."
        },
        HAS_NATIVE_SUPPORT: "function" == typeof atob,
        encodeByteArray(t, e) {
          if (!Array.isArray(t)) throw Error("encodeByteArray takes an array as a parameter");
          this.init_();
          const n = e ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
            i = [];
          for (let e = 0; e < t.length; e += 3) {
            const r = t[e],
              a = e + 1 < t.length,
              s = a ? t[e + 1] : 0,
              o = e + 2 < t.length,
              l = o ? t[e + 2] : 0,
              c = r >> 2,
              u = (3 & r) << 4 | s >> 4;
            let h = (15 & s) << 2 | l >> 6,
              d = 63 & l;
            o || (d = 64, a || (h = 64)), i.push(n[c], n[u], n[h], n[d])
          }
          return i.join("")
        },
        encodeString(t, e) {
          return this.HAS_NATIVE_SUPPORT && !e ? btoa(t) : this.encodeByteArray(Yo(t), e)
        },
        decodeString(t, e) {
          return this.HAS_NATIVE_SUPPORT && !e ? atob(t) : function(t) {
            const e = [];
            let n = 0,
              i = 0;
            for (; n < t.length;) {
              const r = t[n++];
              if (r < 128) e[i++] = String.fromCharCode(r);
              else if (r > 191 && r < 224) {
                const a = t[n++];
                e[i++] = String.fromCharCode((31 & r) << 6 | 63 & a)
              } else if (r > 239 && r < 365) {
                const a = ((7 & r) << 18 | (63 & t[n++]) << 12 | (63 & t[n++]) << 6 | 63 & t[n++]) - 65536;
                e[i++] = String.fromCharCode(55296 + (a >> 10)), e[i++] = String.fromCharCode(56320 + (1023 & a))
              } else {
                const a = t[n++],
                  s = t[n++];
                e[i++] = String.fromCharCode((15 & r) << 12 | (63 & a) << 6 | 63 & s)
              }
            }
            return e.join("")
          }(this.decodeStringToByteArray(t, e))
        },
        decodeStringToByteArray(t, e) {
          this.init_();
          const n = e ? this.charToByteMapWebSafe_ : this.charToByteMap_,
            i = [];
          for (let e = 0; e < t.length;) {
            const r = n[t.charAt(e++)],
              a = e < t.length ? n[t.charAt(e)] : 0;
            ++e;
            const s = e < t.length ? n[t.charAt(e)] : 64;
            ++e;
            const o = e < t.length ? n[t.charAt(e)] : 64;
            if (++e, null == r || null == a || null == s || null == o) throw new Ko;
            const l = r << 2 | a >> 4;
            if (i.push(l), 64 !== s) {
              const t = a << 4 & 240 | s >> 2;
              if (i.push(t), 64 !== o) {
                const t = s << 6 & 192 | o;
                i.push(t)
              }
            }
          }
          return i
        },
        init_() {
          if (!this.byteToCharMap_) {
            this.byteToCharMap_ = {}, this.charToByteMap_ = {}, this.byteToCharMapWebSafe_ = {}, this.charToByteMapWebSafe_ = {};
            for (let t = 0; t < this.ENCODED_VALS.length; t++) this.byteToCharMap_[t] = this.ENCODED_VALS.charAt(t), this.charToByteMap_[this.byteToCharMap_[t]] = t, this.byteToCharMapWebSafe_[t] = this.ENCODED_VALS_WEBSAFE.charAt(t), this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]] = t, t >= this.ENCODED_VALS_BASE.length && (this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)] = t, this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)] = t)
          }
        }
      };
    class Ko extends Error {
      constructor() {
        super(...arguments), this.name = "DecodeBase64StringError"
      }
    }
    const Zo = function(t) {
        return function(t) {
          const e = Yo(t);
          return $o.encodeByteArray(e, !0)
        }(t).replace(/\./g, "")
      },
      Jo = () => {
        try {
          return function() {
            if ("undefined" != typeof self) return self;
            if ("undefined" != typeof window) return window;
            if (void 0 !== n.g) return n.g;
            throw new Error("Unable to locate global object.")
          }().__FIREBASE_DEFAULTS__ || (() => {
            if ("undefined" == typeof process || void 0 === process.env) return;
            const t = process.env.__FIREBASE_DEFAULTS__;
            return t ? JSON.parse(t) : void 0
          })() || (() => {
            if ("undefined" == typeof document) return;
            let t;
            try {
              t = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)
            } catch (t) {
              return
            }
            const e = t && function(t) {
              try {
                return $o.decodeString(t, !0)
              } catch (t) {
                console.error("base64Decode failed: ", t)
              }
              return null
            }(t[1]);
            return e && JSON.parse(e)
          })()
        } catch (t) {
          return void console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`)
        }
      },
      Qo = () => {
        var t;
        return null === (t = Jo()) || void 0 === t ? void 0 : t.config
      };
    class tl {
      constructor() {
        this.reject = () => {}, this.resolve = () => {}, this.promise = new Promise(((t, e) => {
          this.resolve = t, this.reject = e
        }))
      }
      wrapCallback(t) {
        return (e, n) => {
          e ? this.reject(e) : this.resolve(n), "function" == typeof t && (this.promise.catch((() => {})), 1 === t.length ? t(e) : t(e, n))
        }
      }
    }

    function el() {
      try {
        return "object" == typeof indexedDB
      } catch (t) {
        return !1
      }
    }

    function nl() {
      return new Promise(((t, e) => {
        try {
          let n = !0;
          const i = "validate-browser-context-for-indexeddb-analytics-module",
            r = self.indexedDB.open(i);
          r.onsuccess = () => {
            r.result.close(), n || self.indexedDB.deleteDatabase(i), t(!0)
          }, r.onupgradeneeded = () => {
            n = !1
          }, r.onerror = () => {
            var t;
            e((null === (t = r.error) || void 0 === t ? void 0 : t.message) || "")
          }
        } catch (t) {
          e(t)
        }
      }))
    }
    class il extends Error {
      constructor(t, e, n) {
        super(e), this.code = t, this.customData = n, this.name = "FirebaseError", Object.setPrototypeOf(this, il.prototype), Error.captureStackTrace && Error.captureStackTrace(this, rl.prototype.create)
      }
    }
    class rl {
      constructor(t, e, n) {
        this.service = t, this.serviceName = e, this.errors = n
      }
      create(t, ...e) {
        const n = e[0] || {},
          i = `${this.service}/${t}`,
          r = this.errors[t],
          a = r ? function(t, e) {
            return t.replace(al, ((t, n) => {
              const i = e[n];
              return null != i ? String(i) : `<${n}?>`
            }))
          }(r, n) : "Error",
          s = `${this.serviceName}: ${a} (${i}).`;
        return new il(i, s, n)
      }
    }
    const al = /\{\$([^}]+)}/g;

    function sl(t, e) {
      if (t === e) return !0;
      const n = Object.keys(t),
        i = Object.keys(e);
      for (const r of n) {
        if (!i.includes(r)) return !1;
        const n = t[r],
          a = e[r];
        if (ol(n) && ol(a)) {
          if (!sl(n, a)) return !1
        } else if (n !== a) return !1
      }
      for (const t of i)
        if (!n.includes(t)) return !1;
      return !0
    }

    function ol(t) {
      return null !== t && "object" == typeof t
    }

    function ll(t, e = 1e3, n = 2) {
      const i = e * Math.pow(n, t),
        r = Math.round(.5 * i * (Math.random() - .5) * 2);
      return Math.min(144e5, i + r)
    }

    function cl(t) {
      return t && t._delegate ? t._delegate : t
    }
    class ul {
      constructor(t, e, n) {
        this.name = t, this.instanceFactory = e, this.type = n, this.multipleInstances = !1, this.serviceProps = {}, this.instantiationMode = "LAZY", this.onInstanceCreated = null
      }
      setInstantiationMode(t) {
        return this.instantiationMode = t, this
      }
      setMultipleInstances(t) {
        return this.multipleInstances = t, this
      }
      setServiceProps(t) {
        return this.serviceProps = t, this
      }
      setInstanceCreatedCallback(t) {
        return this.onInstanceCreated = t, this
      }
    }
    const hl = "[DEFAULT]";
    class dl {
      constructor(t, e) {
        this.name = t, this.container = e, this.component = null, this.instances = new Map, this.instancesDeferred = new Map, this.instancesOptions = new Map, this.onInitCallbacks = new Map
      }
      get(t) {
        const e = this.normalizeInstanceIdentifier(t);
        if (!this.instancesDeferred.has(e)) {
          const t = new tl;
          if (this.instancesDeferred.set(e, t), this.isInitialized(e) || this.shouldAutoInitialize()) try {
            const n = this.getOrInitializeService({
              instanceIdentifier: e
            });
            n && t.resolve(n)
          } catch (t) {}
        }
        return this.instancesDeferred.get(e).promise
      }
      getImmediate(t) {
        var e;
        const n = this.normalizeInstanceIdentifier(null == t ? void 0 : t.identifier),
          i = null !== (e = null == t ? void 0 : t.optional) && void 0 !== e && e;
        if (!this.isInitialized(n) && !this.shouldAutoInitialize()) {
          if (i) return null;
          throw Error(`Service ${this.name} is not available`)
        }
        try {
          return this.getOrInitializeService({
            instanceIdentifier: n
          })
        } catch (t) {
          if (i) return null;
          throw t
        }
      }
      getComponent() {
        return this.component
      }
      setComponent(t) {
        if (t.name !== this.name) throw Error(`Mismatching Component ${t.name} for Provider ${this.name}.`);
        if (this.component) throw Error(`Component for ${this.name} has already been provided`);
        if (this.component = t, this.shouldAutoInitialize()) {
          if (function(t) {
              return "EAGER" === t.instantiationMode
            }(t)) try {
            this.getOrInitializeService({
              instanceIdentifier: hl
            })
          } catch (t) {}
          for (const [t, e] of this.instancesDeferred.entries()) {
            const n = this.normalizeInstanceIdentifier(t);
            try {
              const t = this.getOrInitializeService({
                instanceIdentifier: n
              });
              e.resolve(t)
            } catch (t) {}
          }
        }
      }
      clearInstance(t = hl) {
        this.instancesDeferred.delete(t), this.instancesOptions.delete(t), this.instances.delete(t)
      }
      async delete() {
        const t = Array.from(this.instances.values());
        await Promise.all([...t.filter((t => "INTERNAL" in t)).map((t => t.INTERNAL.delete())), ...t.filter((t => "_delete" in t)).map((t => t._delete()))])
      }
      isComponentSet() {
        return null != this.component
      }
      isInitialized(t = hl) {
        return this.instances.has(t)
      }
      getOptions(t = hl) {
        return this.instancesOptions.get(t) || {}
      }
      initialize(t = {}) {
        const {
          options: e = {}
        } = t, n = this.normalizeInstanceIdentifier(t.instanceIdentifier);
        if (this.isInitialized(n)) throw Error(`${this.name}(${n}) has already been initialized`);
        if (!this.isComponentSet()) throw Error(`Component ${this.name} has not been registered yet`);
        const i = this.getOrInitializeService({
          instanceIdentifier: n,
          options: e
        });
        for (const [t, e] of this.instancesDeferred.entries()) n === this.normalizeInstanceIdentifier(t) && e.resolve(i);
        return i
      }
      onInit(t, e) {
        var n;
        const i = this.normalizeInstanceIdentifier(e),
          r = null !== (n = this.onInitCallbacks.get(i)) && void 0 !== n ? n : new Set;
        r.add(t), this.onInitCallbacks.set(i, r);
        const a = this.instances.get(i);
        return a && t(a, i), () => {
          r.delete(t)
        }
      }
      invokeOnInitCallbacks(t, e) {
        const n = this.onInitCallbacks.get(e);
        if (n)
          for (const i of n) try {
            i(t, e)
          } catch (t) {}
      }
      getOrInitializeService({
        instanceIdentifier: t,
        options: e = {}
      }) {
        let n = this.instances.get(t);
        if (!n && this.component && (n = this.component.instanceFactory(this.container, {
            instanceIdentifier: (i = t, i === hl ? void 0 : i),
            options: e
          }), this.instances.set(t, n), this.instancesOptions.set(t, e), this.invokeOnInitCallbacks(n, t), this.component.onInstanceCreated)) try {
          this.component.onInstanceCreated(this.container, t, n)
        } catch (t) {}
        var i;
        return n || null
      }
      normalizeInstanceIdentifier(t = hl) {
        return this.component ? this.component.multipleInstances ? t : hl : t
      }
      shouldAutoInitialize() {
        return !!this.component && "EXPLICIT" !== this.component.instantiationMode
      }
    }
    class pl {
      constructor(t) {
        this.name = t, this.providers = new Map
      }
      addComponent(t) {
        const e = this.getProvider(t.name);
        if (e.isComponentSet()) throw new Error(`Component ${t.name} has already been registered with ${this.name}`);
        e.setComponent(t)
      }
      addOrOverwriteComponent(t) {
        this.getProvider(t.name).isComponentSet() && this.providers.delete(t.name), this.addComponent(t)
      }
      getProvider(t) {
        if (this.providers.has(t)) return this.providers.get(t);
        const e = new dl(t, this);
        return this.providers.set(t, e), e
      }
      getProviders() {
        return Array.from(this.providers.values())
      }
    }
    const fl = [];
    var ml;
    ! function(t) {
      t[t.DEBUG = 0] = "DEBUG", t[t.VERBOSE = 1] = "VERBOSE", t[t.INFO = 2] = "INFO", t[t.WARN = 3] = "WARN", t[t.ERROR = 4] = "ERROR", t[t.SILENT = 5] = "SILENT"
    }(ml || (ml = {}));
    const gl = {
        debug: ml.DEBUG,
        verbose: ml.VERBOSE,
        info: ml.INFO,
        warn: ml.WARN,
        error: ml.ERROR,
        silent: ml.SILENT
      },
      _l = ml.INFO,
      vl = {
        [ml.DEBUG]: "log",
        [ml.VERBOSE]: "log",
        [ml.INFO]: "info",
        [ml.WARN]: "warn",
        [ml.ERROR]: "error"
      },
      xl = (t, e, ...n) => {
        if (e < t.logLevel) return;
        const i = (new Date).toISOString(),
          r = vl[e];
        if (!r) throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`);
        console[r](`[${i}]  ${t.name}:`, ...n)
      };
    class yl {
      constructor(t) {
        this.name = t, this._logLevel = _l, this._logHandler = xl, this._userLogHandler = null, fl.push(this)
      }
      get logLevel() {
        return this._logLevel
      }
      set logLevel(t) {
        if (!(t in ml)) throw new TypeError(`Invalid value "${t}" assigned to \`logLevel\``);
        this._logLevel = t
      }
      setLogLevel(t) {
        this._logLevel = "string" == typeof t ? gl[t] : t
      }
      get logHandler() {
        return this._logHandler
      }
      set logHandler(t) {
        if ("function" != typeof t) throw new TypeError("Value assigned to `logHandler` must be a function");
        this._logHandler = t
      }
      get userLogHandler() {
        return this._userLogHandler
      }
      set userLogHandler(t) {
        this._userLogHandler = t
      }
      debug(...t) {
        this._userLogHandler && this._userLogHandler(this, ml.DEBUG, ...t), this._logHandler(this, ml.DEBUG, ...t)
      }
      log(...t) {
        this._userLogHandler && this._userLogHandler(this, ml.VERBOSE, ...t), this._logHandler(this, ml.VERBOSE, ...t)
      }
      info(...t) {
        this._userLogHandler && this._userLogHandler(this, ml.INFO, ...t), this._logHandler(this, ml.INFO, ...t)
      }
      warn(...t) {
        this._userLogHandler && this._userLogHandler(this, ml.WARN, ...t), this._logHandler(this, ml.WARN, ...t)
      }
      error(...t) {
        this._userLogHandler && this._userLogHandler(this, ml.ERROR, ...t), this._logHandler(this, ml.ERROR, ...t)
      }
    }
    let bl, Ml;
    const Sl = new WeakMap,
      El = new WeakMap,
      Tl = new WeakMap,
      wl = new WeakMap,
      Al = new WeakMap;
    let Rl = {
      get(t, e, n) {
        if (t instanceof IDBTransaction) {
          if ("done" === e) return El.get(t);
          if ("objectStoreNames" === e) return t.objectStoreNames || Tl.get(t);
          if ("store" === e) return n.objectStoreNames[1] ? void 0 : n.objectStore(n.objectStoreNames[0])
        }
        return Pl(t[e])
      },
      set: (t, e, n) => (t[e] = n, !0),
      has: (t, e) => t instanceof IDBTransaction && ("done" === e || "store" === e) || e in t
    };

    function Cl(t) {
      return "function" == typeof t ? (e = t) !== IDBDatabase.prototype.transaction || "objectStoreNames" in IDBTransaction.prototype ? (Ml || (Ml = [IDBCursor.prototype.advance, IDBCursor.prototype.continue, IDBCursor.prototype.continuePrimaryKey])).includes(e) ? function(...t) {
        return e.apply(Dl(this), t), Pl(Sl.get(this))
      } : function(...t) {
        return Pl(e.apply(Dl(this), t))
      } : function(t, ...n) {
        const i = e.call(Dl(this), t, ...n);
        return Tl.set(i, t.sort ? t.sort() : [t]), Pl(i)
      } : (t instanceof IDBTransaction && function(t) {
        if (El.has(t)) return;
        const e = new Promise(((e, n) => {
          const i = () => {
              t.removeEventListener("complete", r), t.removeEventListener("error", a), t.removeEventListener("abort", a)
            },
            r = () => {
              e(), i()
            },
            a = () => {
              n(t.error || new DOMException("AbortError", "AbortError")), i()
            };
          t.addEventListener("complete", r), t.addEventListener("error", a), t.addEventListener("abort", a)
        }));
        El.set(t, e)
      }(t), n = t, (bl || (bl = [IDBDatabase, IDBObjectStore, IDBIndex, IDBCursor, IDBTransaction])).some((t => n instanceof t)) ? new Proxy(t, Rl) : t);
      var e, n
    }

    function Pl(t) {
      if (t instanceof IDBRequest) return function(t) {
        const e = new Promise(((e, n) => {
          const i = () => {
              t.removeEventListener("success", r), t.removeEventListener("error", a)
            },
            r = () => {
              e(Pl(t.result)), i()
            },
            a = () => {
              n(t.error), i()
            };
          t.addEventListener("success", r), t.addEventListener("error", a)
        }));
        return e.then((e => {
          e instanceof IDBCursor && Sl.set(e, t)
        })).catch((() => {})), Al.set(e, t), e
      }(t);
      if (wl.has(t)) return wl.get(t);
      const e = Cl(t);
      return e !== t && (wl.set(t, e), Al.set(e, t)), e
    }
    const Dl = t => Al.get(t);

    function Ll(t, e, {
      blocked: n,
      upgrade: i,
      blocking: r,
      terminated: a
    } = {}) {
      const s = indexedDB.open(t, e),
        o = Pl(s);
      return i && s.addEventListener("upgradeneeded", (t => {
        i(Pl(s.result), t.oldVersion, t.newVersion, Pl(s.transaction), t)
      })), n && s.addEventListener("blocked", (t => n(t.oldVersion, t.newVersion, t))), o.then((t => {
        a && t.addEventListener("close", (() => a())), r && t.addEventListener("versionchange", (t => r(t.oldVersion, t.newVersion, t)))
      })).catch((() => {})), o
    }
    const Il = ["get", "getKey", "getAll", "getAllKeys", "count"],
      Ul = ["put", "add", "delete", "clear"],
      Nl = new Map;

    function Ol(t, e) {
      if (!(t instanceof IDBDatabase) || e in t || "string" != typeof e) return;
      if (Nl.get(e)) return Nl.get(e);
      const n = e.replace(/FromIndex$/, ""),
        i = e !== n,
        r = Ul.includes(n);
      if (!(n in (i ? IDBIndex : IDBObjectStore).prototype) || !r && !Il.includes(n)) return;
      const a = async function(t, ...e) {
        const a = this.transaction(t, r ? "readwrite" : "readonly");
        let s = a.store;
        return i && (s = s.index(e.shift())), (await Promise.all([s[n](...e), r && a.done]))[0]
      };
      return Nl.set(e, a), a
    }
    var Fl;
    Fl = Rl, Rl = {
      ...Fl,
      get: (t, e, n) => Ol(t, e) || Fl.get(t, e, n),
      has: (t, e) => !!Ol(t, e) || Fl.has(t, e)
    };
    class Bl {
      constructor(t) {
        this.container = t
      }
      getPlatformInfoString() {
        return this.container.getProviders().map((t => {
          if (function(t) {
              const e = t.getComponent();
              return "VERSION" === (null == e ? void 0 : e.type)
            }(t)) {
            const e = t.getImmediate();
            return `${e.library}/${e.version}`
          }
          return null
        })).filter((t => t)).join(" ")
      }
    }
    const zl = "@firebase/app",
      kl = "0.11.3",
      Hl = new yl("@firebase/app"),
      Vl = "@firebase/app-compat",
      Gl = "@firebase/analytics-compat",
      Wl = "@firebase/analytics",
      Xl = "@firebase/app-check-compat",
      jl = "@firebase/app-check",
      ql = "@firebase/auth",
      Yl = "@firebase/auth-compat",
      $l = "@firebase/database",
      Kl = "@firebase/data-connect",
      Zl = "@firebase/database-compat",
      Jl = "@firebase/functions",
      Ql = "@firebase/functions-compat",
      tc = "@firebase/installations",
      ec = "@firebase/installations-compat",
      nc = "@firebase/messaging",
      ic = "@firebase/messaging-compat",
      rc = "@firebase/performance",
      ac = "@firebase/performance-compat",
      sc = "@firebase/remote-config",
      oc = "@firebase/remote-config-compat",
      lc = "@firebase/storage",
      cc = "@firebase/storage-compat",
      uc = "@firebase/firestore",
      hc = "@firebase/vertexai",
      dc = "@firebase/firestore-compat",
      pc = "firebase",
      fc = "[DEFAULT]",
      mc = {
        [zl]: "fire-core",
        [Vl]: "fire-core-compat",
        [Wl]: "fire-analytics",
        [Gl]: "fire-analytics-compat",
        [jl]: "fire-app-check",
        [Xl]: "fire-app-check-compat",
        [ql]: "fire-auth",
        [Yl]: "fire-auth-compat",
        [$l]: "fire-rtdb",
        [Kl]: "fire-data-connect",
        [Zl]: "fire-rtdb-compat",
        [Jl]: "fire-fn",
        [Ql]: "fire-fn-compat",
        [tc]: "fire-iid",
        [ec]: "fire-iid-compat",
        [nc]: "fire-fcm",
        [ic]: "fire-fcm-compat",
        [rc]: "fire-perf",
        [ac]: "fire-perf-compat",
        [sc]: "fire-rc",
        [oc]: "fire-rc-compat",
        [lc]: "fire-gcs",
        [cc]: "fire-gcs-compat",
        [uc]: "fire-fst",
        [dc]: "fire-fst-compat",
        [hc]: "fire-vertex",
        "fire-js": "fire-js",
        [pc]: "fire-js-all"
      },
      gc = new Map,
      _c = new Map,
      vc = new Map;

    function xc(t, e) {
      try {
        t.container.addComponent(e)
      } catch (n) {
        Hl.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`, n)
      }
    }

    function yc(t) {
      const e = t.name;
      if (vc.has(e)) return Hl.debug(`There were multiple attempts to register component ${e}.`), !1;
      vc.set(e, t);
      for (const e of gc.values()) xc(e, t);
      for (const e of _c.values()) xc(e, t);
      return !0
    }

    function bc(t, e) {
      const n = t.container.getProvider("heartbeat").getImmediate({
        optional: !0
      });
      return n && n.triggerHeartbeat(), t.container.getProvider(e)
    }
    const Mc = new rl("app", "Firebase", {
      "no-app": "No Firebase App '{$appName}' has been created - call initializeApp() first",
      "bad-app-name": "Illegal App name: '{$appName}'",
      "duplicate-app": "Firebase App named '{$appName}' already exists with different options or config",
      "app-deleted": "Firebase App named '{$appName}' already deleted",
      "server-app-deleted": "Firebase Server App has been deleted",
      "no-options": "Need to provide options, when not being deployed to hosting via source.",
      "invalid-app-argument": "firebase.{$appName}() takes either no argument or a Firebase App instance.",
      "invalid-log-argument": "First argument to `onLog` must be null or a function.",
      "idb-open": "Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
      "idb-get": "Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
      "idb-set": "Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
      "idb-delete": "Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",
      "finalization-registry-not-supported": "FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.",
      "invalid-server-app-environment": "FirebaseServerApp is not for use in browser environments."
    });
    class Sc {
      constructor(t, e, n) {
        this._isDeleted = !1, this._options = Object.assign({}, t), this._config = Object.assign({}, e), this._name = e.name, this._automaticDataCollectionEnabled = e.automaticDataCollectionEnabled, this._container = n, this.container.addComponent(new ul("app", (() => this), "PUBLIC"))
      }
      get automaticDataCollectionEnabled() {
        return this.checkDestroyed(), this._automaticDataCollectionEnabled
      }
      set automaticDataCollectionEnabled(t) {
        this.checkDestroyed(), this._automaticDataCollectionEnabled = t
      }
      get name() {
        return this.checkDestroyed(), this._name
      }
      get options() {
        return this.checkDestroyed(), this._options
      }
      get config() {
        return this.checkDestroyed(), this._config
      }
      get container() {
        return this._container
      }
      get isDeleted() {
        return this._isDeleted
      }
      set isDeleted(t) {
        this._isDeleted = t
      }
      checkDestroyed() {
        if (this.isDeleted) throw Mc.create("app-deleted", {
          appName: this._name
        })
      }
    }

    function Ec(t, e = {}) {
      let n = t;
      "object" != typeof e && (e = {
        name: e
      });
      const i = Object.assign({
          name: fc,
          automaticDataCollectionEnabled: !1
        }, e),
        r = i.name;
      if ("string" != typeof r || !r) throw Mc.create("bad-app-name", {
        appName: String(r)
      });
      if (n || (n = Qo()), !n) throw Mc.create("no-options");
      const a = gc.get(r);
      if (a) {
        if (sl(n, a.options) && sl(i, a.config)) return a;
        throw Mc.create("duplicate-app", {
          appName: r
        })
      }
      const s = new pl(r);
      for (const t of vc.values()) s.addComponent(t);
      const o = new Sc(n, i, s);
      return gc.set(r, o), o
    }

    function Tc(t, e, n) {
      var i;
      let r = null !== (i = mc[t]) && void 0 !== i ? i : t;
      n && (r += `-${n}`);
      const a = r.match(/\s|\//),
        s = e.match(/\s|\//);
      if (a || s) {
        const t = [`Unable to register library "${r}" with version "${e}":`];
        return a && t.push(`library name "${r}" contains illegal characters (whitespace or "/")`), a && s && t.push("and"), s && t.push(`version name "${e}" contains illegal characters (whitespace or "/")`), void Hl.warn(t.join(" "))
      }
      yc(new ul(`${r}-version`, (() => ({
        library: r,
        version: e
      })), "VERSION"))
    }
    const wc = "firebase-heartbeat-store";
    let Ac = null;

    function Rc() {
      return Ac || (Ac = Ll("firebase-heartbeat-database", 1, {
        upgrade: (t, e) => {
          if (0 === e) try {
            t.createObjectStore(wc)
          } catch (t) {
            console.warn(t)
          }
        }
      }).catch((t => {
        throw Mc.create("idb-open", {
          originalErrorMessage: t.message
        })
      }))), Ac
    }
    async function Cc(t, e) {
      try {
        const n = (await Rc()).transaction(wc, "readwrite"),
          i = n.objectStore(wc);
        await i.put(e, Pc(t)), await n.done
      } catch (t) {
        if (t instanceof il) Hl.warn(t.message);
        else {
          const e = Mc.create("idb-set", {
            originalErrorMessage: null == t ? void 0 : t.message
          });
          Hl.warn(e.message)
        }
      }
    }

    function Pc(t) {
      return `${t.name}!${t.options.appId}`
    }
    class Dc {
      constructor(t) {
        this.container = t, this._heartbeatsCache = null;
        const e = this.container.getProvider("app").getImmediate();
        this._storage = new Ic(e), this._heartbeatsCachePromise = this._storage.read().then((t => (this._heartbeatsCache = t, t)))
      }
      async triggerHeartbeat() {
        var t, e;
        try {
          const n = this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),
            i = Lc();
          if (null == (null === (t = this._heartbeatsCache) || void 0 === t ? void 0 : t.heartbeats) && (this._heartbeatsCache = await this._heartbeatsCachePromise, null == (null === (e = this._heartbeatsCache) || void 0 === e ? void 0 : e.heartbeats))) return;
          if (this._heartbeatsCache.lastSentHeartbeatDate === i || this._heartbeatsCache.heartbeats.some((t => t.date === i))) return;
          if (this._heartbeatsCache.heartbeats.push({
              date: i,
              agent: n
            }), this._heartbeatsCache.heartbeats.length > 30) {
            const t = function(t) {
              if (0 === t.length) return -1;
              let e = 0,
                n = t[0].date;
              for (let i = 1; i < t.length; i++) t[i].date < n && (n = t[i].date, e = i);
              return e
            }(this._heartbeatsCache.heartbeats);
            this._heartbeatsCache.heartbeats.splice(t, 1)
          }
          return this._storage.overwrite(this._heartbeatsCache)
        } catch (t) {
          Hl.warn(t)
        }
      }
      async getHeartbeatsHeader() {
        var t;
        try {
          if (null === this._heartbeatsCache && await this._heartbeatsCachePromise, null == (null === (t = this._heartbeatsCache) || void 0 === t ? void 0 : t.heartbeats) || 0 === this._heartbeatsCache.heartbeats.length) return "";
          const e = Lc(),
            {
              heartbeatsToSend: n,
              unsentEntries: i
            } = function(t, e = 1024) {
              const n = [];
              let i = t.slice();
              for (const r of t) {
                const t = n.find((t => t.agent === r.agent));
                if (t) {
                  if (t.dates.push(r.date), Uc(n) > e) {
                    t.dates.pop();
                    break
                  }
                } else if (n.push({
                    agent: r.agent,
                    dates: [r.date]
                  }), Uc(n) > e) {
                  n.pop();
                  break
                }
                i = i.slice(1)
              }
              return {
                heartbeatsToSend: n,
                unsentEntries: i
              }
            }(this._heartbeatsCache.heartbeats),
            r = Zo(JSON.stringify({
              version: 2,
              heartbeats: n
            }));
          return this._heartbeatsCache.lastSentHeartbeatDate = e, i.length > 0 ? (this._heartbeatsCache.heartbeats = i, await this._storage.overwrite(this._heartbeatsCache)) : (this._heartbeatsCache.heartbeats = [], this._storage.overwrite(this._heartbeatsCache)), r
        } catch (t) {
          return Hl.warn(t), ""
        }
      }
    }

    function Lc() {
      return (new Date).toISOString().substring(0, 10)
    }
    class Ic {
      constructor(t) {
        this.app = t, this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck()
      }
      async runIndexedDBEnvironmentCheck() {
        return !!el() && nl().then((() => !0)).catch((() => !1))
      }
      async read() {
        if (await this._canUseIndexedDBPromise) {
          const t = await async function(t) {
            try {
              const e = (await Rc()).transaction(wc),
                n = await e.objectStore(wc).get(Pc(t));
              return await e.done, n
            } catch (t) {
              if (t instanceof il) Hl.warn(t.message);
              else {
                const e = Mc.create("idb-get", {
                  originalErrorMessage: null == t ? void 0 : t.message
                });
                Hl.warn(e.message)
              }
            }
          }(this.app);
          return (null == t ? void 0 : t.heartbeats) ? t : {
            heartbeats: []
          }
        }
        return {
          heartbeats: []
        }
      }
      async overwrite(t) {
        var e;
        if (await this._canUseIndexedDBPromise) {
          const n = await this.read();
          return Cc(this.app, {
            lastSentHeartbeatDate: null !== (e = t.lastSentHeartbeatDate) && void 0 !== e ? e : n.lastSentHeartbeatDate,
            heartbeats: t.heartbeats
          })
        }
      }
      async add(t) {
        var e;
        if (await this._canUseIndexedDBPromise) {
          const n = await this.read();
          return Cc(this.app, {
            lastSentHeartbeatDate: null !== (e = t.lastSentHeartbeatDate) && void 0 !== e ? e : n.lastSentHeartbeatDate,
            heartbeats: [...n.heartbeats, ...t.heartbeats]
          })
        }
      }
    }

    function Uc(t) {
      return Zo(JSON.stringify({
        version: 2,
        heartbeats: t
      })).length
    }
    yc(new ul("platform-logger", (t => new Bl(t)), "PRIVATE")), yc(new ul("heartbeat", (t => new Dc(t)), "PRIVATE")), Tc(zl, kl, ""), Tc(zl, kl, "esm2017"), Tc("fire-js", ""), Tc("firebase", "11.5.0", "app");
    const Nc = "@firebase/installations",
      Oc = "0.6.13",
      Fc = `w:${Oc}`,
      Bc = "FIS_v2",
      zc = new rl("installations", "Installations", {
        "missing-app-config-values": 'Missing App configuration value: "{$valueName}"',
        "not-registered": "Firebase Installation is not registered.",
        "installation-not-found": "Firebase Installation not found.",
        "request-failed": '{$requestName} request failed with error "{$serverCode} {$serverStatus}: {$serverMessage}"',
        "app-offline": "Could not process request. Application offline.",
        "delete-pending-registration": "Can't delete installation while there is a pending registration request."
      });

    function kc(t) {
      return t instanceof il && t.code.includes("request-failed")
    }

    function Hc({
      projectId: t
    }) {
      return `https://firebaseinstallations.googleapis.com/v1/projects/${t}/installations`
    }

    function Vc(t) {
      return {
        token: t.token,
        requestStatus: 2,
        expiresIn: (e = t.expiresIn, Number(e.replace("s", "000"))),
        creationTime: Date.now()
      };
      var e
    }
    async function Gc(t, e) {
      const n = (await e.json()).error;
      return zc.create("request-failed", {
        requestName: t,
        serverCode: n.code,
        serverMessage: n.message,
        serverStatus: n.status
      })
    }

    function Wc({
      apiKey: t
    }) {
      return new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-goog-api-key": t
      })
    }
    async function Xc(t) {
      const e = await t();
      return e.status >= 500 && e.status < 600 ? t() : e
    }

    function jc(t) {
      return new Promise((e => {
        setTimeout(e, t)
      }))
    }
    const qc = /^[cdef][\w-]{21}$/;

    function Yc() {
      try {
        const t = new Uint8Array(17);
        (self.crypto || self.msCrypto).getRandomValues(t), t[0] = 112 + t[0] % 16;
        const e = function(t) {
          var e;
          return (e = t, btoa(String.fromCharCode(...e)).replace(/\+/g, "-").replace(/\//g, "_")).substr(0, 22)
        }(t);
        return qc.test(e) ? e : ""
      } catch (t) {
        return ""
      }
    }

    function $c(t) {
      return `${t.appName}!${t.appId}`
    }
    const Kc = new Map;

    function Zc(t, e) {
      const n = $c(t);
      Jc(n, e),
        function(t, e) {
          const n = (!Qc && "BroadcastChannel" in self && (Qc = new BroadcastChannel("[Firebase] FID Change"), Qc.onmessage = t => {
            Jc(t.data.key, t.data.fid)
          }), Qc);
          n && n.postMessage({
            key: t,
            fid: e
          }), 0 === Kc.size && Qc && (Qc.close(), Qc = null)
        }(n, e)
    }

    function Jc(t, e) {
      const n = Kc.get(t);
      if (n)
        for (const t of n) t(e)
    }
    let Qc = null;
    const tu = "firebase-installations-store";
    let eu = null;

    function nu() {
      return eu || (eu = Ll("firebase-installations-database", 1, {
        upgrade: (t, e) => {
          0 === e && t.createObjectStore(tu)
        }
      })), eu
    }
    async function iu(t, e) {
      const n = $c(t),
        i = (await nu()).transaction(tu, "readwrite"),
        r = i.objectStore(tu),
        a = await r.get(n);
      return await r.put(e, n), await i.done, a && a.fid === e.fid || Zc(t, e.fid), e
    }
    async function ru(t) {
      const e = $c(t),
        n = (await nu()).transaction(tu, "readwrite");
      await n.objectStore(tu).delete(e), await n.done
    }
    async function au(t, e) {
      const n = $c(t),
        i = (await nu()).transaction(tu, "readwrite"),
        r = i.objectStore(tu),
        a = await r.get(n),
        s = e(a);
      return void 0 === s ? await r.delete(n) : await r.put(s, n), await i.done, !s || a && a.fid === s.fid || Zc(t, s.fid), s
    }
    async function su(t) {
      let e;
      const n = await au(t.appConfig, (n => {
        const i = function(t) {
            return cu(t || {
              fid: Yc(),
              registrationStatus: 0
            })
          }(n),
          r = function(t, e) {
            if (0 === e.registrationStatus) {
              if (!navigator.onLine) return {
                installationEntry: e,
                registrationPromise: Promise.reject(zc.create("app-offline"))
              };
              const n = {
                  fid: e.fid,
                  registrationStatus: 1,
                  registrationTime: Date.now()
                },
                i = async function(t, e) {
                  try {
                    const n = await async function({
                      appConfig: t,
                      heartbeatServiceProvider: e
                    }, {
                      fid: n
                    }) {
                      const i = Hc(t),
                        r = Wc(t),
                        a = e.getImmediate({
                          optional: !0
                        });
                      if (a) {
                        const t = await a.getHeartbeatsHeader();
                        t && r.append("x-firebase-client", t)
                      }
                      const s = {
                          fid: n,
                          authVersion: Bc,
                          appId: t.appId,
                          sdkVersion: Fc
                        },
                        o = {
                          method: "POST",
                          headers: r,
                          body: JSON.stringify(s)
                        },
                        l = await Xc((() => fetch(i, o)));
                      if (l.ok) {
                        const t = await l.json();
                        return {
                          fid: t.fid || n,
                          registrationStatus: 2,
                          refreshToken: t.refreshToken,
                          authToken: Vc(t.authToken)
                        }
                      }
                      throw await Gc("Create Installation", l)
                    }(t, e);
                    return iu(t.appConfig, n)
                  } catch (n) {
                    throw kc(n) && 409 === n.customData.serverCode ? await ru(t.appConfig) : await iu(t.appConfig, {
                      fid: e.fid,
                      registrationStatus: 0
                    }), n
                  }
                }(t, n);
              return {
                installationEntry: n,
                registrationPromise: i
              }
            }
            return 1 === e.registrationStatus ? {
              installationEntry: e,
              registrationPromise: ou(t)
            } : {
              installationEntry: e
            }
          }(t, i);
        return e = r.registrationPromise, r.installationEntry
      }));
      return "" === n.fid ? {
        installationEntry: await e
      } : {
        installationEntry: n,
        registrationPromise: e
      }
    }
    async function ou(t) {
      let e = await lu(t.appConfig);
      for (; 1 === e.registrationStatus;) await jc(100), e = await lu(t.appConfig);
      if (0 === e.registrationStatus) {
        const {
          installationEntry: e,
          registrationPromise: n
        } = await su(t);
        return n || e
      }
      return e
    }

    function lu(t) {
      return au(t, (t => {
        if (!t) throw zc.create("installation-not-found");
        return cu(t)
      }))
    }

    function cu(t) {
      return 1 === (e = t).registrationStatus && e.registrationTime + 1e4 < Date.now() ? {
        fid: t.fid,
        registrationStatus: 0
      } : t;
      var e
    }
    async function uu({
      appConfig: t,
      heartbeatServiceProvider: e
    }, n) {
      const i = function(t, {
          fid: e
        }) {
          return `${Hc(t)}/${e}/authTokens:generate`
        }(t, n),
        r = function(t, {
          refreshToken: e
        }) {
          const n = Wc(t);
          return n.append("Authorization", function(t) {
            return `${Bc} ${t}`
          }(e)), n
        }(t, n),
        a = e.getImmediate({
          optional: !0
        });
      if (a) {
        const t = await a.getHeartbeatsHeader();
        t && r.append("x-firebase-client", t)
      }
      const s = {
          installation: {
            sdkVersion: Fc,
            appId: t.appId
          }
        },
        o = {
          method: "POST",
          headers: r,
          body: JSON.stringify(s)
        },
        l = await Xc((() => fetch(i, o)));
      if (l.ok) return Vc(await l.json());
      throw await Gc("Generate Auth Token", l)
    }
    async function hu(t, e = !1) {
      let n;
      const i = await au(t.appConfig, (i => {
        if (!pu(i)) throw zc.create("not-registered");
        const r = i.authToken;
        if (!e && (2 === (a = r).requestStatus && ! function(t) {
            const e = Date.now();
            return e < t.creationTime || t.creationTime + t.expiresIn < e + 36e5
          }(a))) return i;
        var a;
        if (1 === r.requestStatus) return n = async function(t, e) {
          let n = await du(t.appConfig);
          for (; 1 === n.authToken.requestStatus;) await jc(100), n = await du(t.appConfig);
          const i = n.authToken;
          return 0 === i.requestStatus ? hu(t, e) : i
        }(t, e), i; {
          if (!navigator.onLine) throw zc.create("app-offline");
          const e = function(t) {
            const e = {
              requestStatus: 1,
              requestTime: Date.now()
            };
            return Object.assign(Object.assign({}, t), {
              authToken: e
            })
          }(i);
          return n = async function(t, e) {
            try {
              const n = await uu(t, e),
                i = Object.assign(Object.assign({}, e), {
                  authToken: n
                });
              return await iu(t.appConfig, i), n
            } catch (n) {
              if (!kc(n) || 401 !== n.customData.serverCode && 404 !== n.customData.serverCode) {
                const n = Object.assign(Object.assign({}, e), {
                  authToken: {
                    requestStatus: 0
                  }
                });
                await iu(t.appConfig, n)
              } else await ru(t.appConfig);
              throw n
            }
          }(t, e), e
        }
      }));
      return n ? await n : i.authToken
    }

    function du(t) {
      return au(t, (t => {
        if (!pu(t)) throw zc.create("not-registered");
        return 1 === (e = t.authToken).requestStatus && e.requestTime + 1e4 < Date.now() ? Object.assign(Object.assign({}, t), {
          authToken: {
            requestStatus: 0
          }
        }) : t;
        var e
      }))
    }

    function pu(t) {
      return void 0 !== t && 2 === t.registrationStatus
    }

    function fu(t) {
      return zc.create("missing-app-config-values", {
        valueName: t
      })
    }
    const mu = "installations";
    yc(new ul(mu, (t => {
      const e = t.getProvider("app").getImmediate(),
        n = function(t) {
          if (!t || !t.options) throw fu("App Configuration");
          if (!t.name) throw fu("App Name");
          const e = ["projectId", "apiKey", "appId"];
          for (const n of e)
            if (!t.options[n]) throw fu(n);
          return {
            appName: t.name,
            projectId: t.options.projectId,
            apiKey: t.options.apiKey,
            appId: t.options.appId
          }
        }(e);
      return {
        app: e,
        appConfig: n,
        heartbeatServiceProvider: bc(e, "heartbeat"),
        _delete: () => Promise.resolve()
      }
    }), "PUBLIC")), yc(new ul("installations-internal", (t => {
      const e = bc(t.getProvider("app").getImmediate(), mu).getImmediate();
      return {
        getId: () => async function(t) {
          const e = t,
            {
              installationEntry: n,
              registrationPromise: i
            } = await su(e);
          return i ? i.catch(console.error) : hu(e).catch(console.error), n.fid
        }(e),
        getToken: t => async function(t, e = !1) {
          const n = t;
          return await async function(t) {
            const {
              registrationPromise: e
            } = await su(t);
            e && await e
          }(n), (await hu(n, e)).token
        }(e, t)
      }
    }), "PRIVATE")), Tc(Nc, Oc), Tc(Nc, Oc, "esm2017");
    const gu = "analytics",
      _u = "https://www.googletagmanager.com/gtag/js",
      vu = new yl("@firebase/analytics"),
      xu = new rl("analytics", "Analytics", {
        "already-exists": "A Firebase Analytics instance with the appId {$id}  already exists. Only one Firebase Analytics instance can be created for each appId.",
        "already-initialized": "initializeAnalytics() cannot be called again with different options than those it was initially called with. It can be called again with the same options to return the existing instance, or getAnalytics() can be used to get a reference to the already-initialized instance.",
        "already-initialized-settings": "Firebase Analytics has already been initialized.settings() must be called before initializing any Analytics instanceor it will have no effect.",
        "interop-component-reg-failed": "Firebase Analytics Interop Component failed to instantiate: {$reason}",
        "invalid-analytics-context": "Firebase Analytics is not supported in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",
        "indexeddb-unavailable": "IndexedDB unavailable or restricted in this environment. Wrap initialization of analytics in analytics.isSupported() to prevent initialization in unsupported environments. Details: {$errorInfo}",
        "fetch-throttle": "The config fetch request timed out while in an exponential backoff state. Unix timestamp in milliseconds when fetch request throttling ends: {$throttleEndTimeMillis}.",
        "config-fetch-failed": "Dynamic config fetch failed: [{$httpStatus}] {$responseMessage}",
        "no-api-key": 'The "apiKey" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid API key.',
        "no-app-id": 'The "appId" field is empty in the local Firebase config. Firebase Analytics requires this field tocontain a valid app ID.',
        "no-client-id": 'The "client_id" field is empty.',
        "invalid-gtag-resource": "Trusted Types detected an invalid gtag resource: {$gtagURL}."
      });

    function yu(t) {
      if (!t.startsWith(_u)) {
        const e = xu.create("invalid-gtag-resource", {
          gtagURL: t
        });
        return vu.warn(e.message), ""
      }
      return t
    }

    function bu(t) {
      return Promise.all(t.map((t => t.catch((t => t)))))
    }
    const Mu = new class {
      constructor(t = {}, e = 1e3) {
        this.throttleMetadata = t, this.intervalMillis = e
      }
      getThrottleMetadata(t) {
        return this.throttleMetadata[t]
      }
      setThrottleMetadata(t, e) {
        this.throttleMetadata[t] = e
      }
      deleteThrottleMetadata(t) {
        delete this.throttleMetadata[t]
      }
    };

    function Su(t) {
      return new Headers({
        Accept: "application/json",
        "x-goog-api-key": t
      })
    }
    async function Eu(t, e = Mu, n) {
      const {
        appId: i,
        apiKey: r,
        measurementId: a
      } = t.options;
      if (!i) throw xu.create("no-app-id");
      if (!r) {
        if (a) return {
          measurementId: a,
          appId: i
        };
        throw xu.create("no-api-key")
      }
      const s = e.getThrottleMetadata(i) || {
          backoffCount: 0,
          throttleEndTimeMillis: Date.now()
        },
        o = new wu;
      return setTimeout((async () => {
        o.abort()
      }), void 0 !== n ? n : 6e4), Tu({
        appId: i,
        apiKey: r,
        measurementId: a
      }, s, o, e)
    }
    async function Tu(t, {
      throttleEndTimeMillis: e,
      backoffCount: n
    }, i, r = Mu) {
      var a;
      const {
        appId: s,
        measurementId: o
      } = t;
      try {
        await
        function(t, e) {
          return new Promise(((n, i) => {
            const r = Math.max(e - Date.now(), 0),
              a = setTimeout(n, r);
            t.addEventListener((() => {
              clearTimeout(a), i(xu.create("fetch-throttle", {
                throttleEndTimeMillis: e
              }))
            }))
          }))
        }(i, e)
      } catch (t) {
        if (o) return vu.warn(`Timed out fetching this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${null==t?void 0:t.message}]`), {
          appId: s,
          measurementId: o
        };
        throw t
      }
      try {
        const e = await async function(t) {
          var e;
          const {
            appId: n,
            apiKey: i
          } = t, r = {
            method: "GET",
            headers: Su(i)
          }, a = "https://firebase.googleapis.com/v1alpha/projects/-/apps/{app-id}/webConfig".replace("{app-id}", n), s = await fetch(a, r);
          if (200 !== s.status && 304 !== s.status) {
            let t = "";
            try {
              const n = await s.json();
              (null === (e = n.error) || void 0 === e ? void 0 : e.message) && (t = n.error.message)
            } catch (t) {}
            throw xu.create("config-fetch-failed", {
              httpStatus: s.status,
              responseMessage: t
            })
          }
          return s.json()
        }(t);
        return r.deleteThrottleMetadata(s), e
      } catch (e) {
        const l = e;
        if (! function(t) {
            if (!(t instanceof il && t.customData)) return !1;
            const e = Number(t.customData.httpStatus);
            return 429 === e || 500 === e || 503 === e || 504 === e
          }(l)) {
          if (r.deleteThrottleMetadata(s), o) return vu.warn(`Failed to fetch this Firebase app's measurement ID from the server. Falling back to the measurement ID ${o} provided in the "measurementId" field in the local Firebase config. [${null==l?void 0:l.message}]`), {
            appId: s,
            measurementId: o
          };
          throw e
        }
        const c = 503 === Number(null === (a = null == l ? void 0 : l.customData) || void 0 === a ? void 0 : a.httpStatus) ? ll(n, r.intervalMillis, 30) : ll(n, r.intervalMillis),
          u = {
            throttleEndTimeMillis: Date.now() + c,
            backoffCount: n + 1
          };
        return r.setThrottleMetadata(s, u), vu.debug(`Calling attemptFetch again in ${c} millis`), Tu(t, u, i, r)
      }
    }
    class wu {
      constructor() {
        this.listeners = []
      }
      addEventListener(t) {
        this.listeners.push(t)
      }
      abort() {
        this.listeners.forEach((t => t()))
      }
    }
    let Au, Ru;
    async function Cu(t, e, n, i, r, a, s) {
      var o;
      const l = Eu(t);
      l.then((e => {
        n[e.measurementId] = e.appId, t.options.measurementId && e.measurementId !== t.options.measurementId && vu.warn(`The measurement ID in the local Firebase config (${t.options.measurementId}) does not match the measurement ID fetched from the server (${e.measurementId}). To ensure analytics events are always sent to the correct Analytics property, update the measurement ID field in the local config or remove it from the local config.`)
      })).catch((t => vu.error(t))), e.push(l);
      const c = async function() {
        if (!el()) return vu.warn(xu.create("indexeddb-unavailable", {
          errorInfo: "IndexedDB is not available in this environment."
        }).message), !1;
        try {
          await nl()
        } catch (t) {
          return vu.warn(xu.create("indexeddb-unavailable", {
            errorInfo: null == t ? void 0 : t.toString()
          }).message), !1
        }
        return !0
      }().then((t => t ? i.getId() : void 0)), [u, h] = await Promise.all([l, c]);
      (function(t) {
        const e = window.document.getElementsByTagName("script");
        for (const n of Object.values(e))
          if (n.src && n.src.includes(_u) && n.src.includes(t)) return n;
        return null
      })(a) || function(t, e) {
        const n = function(t, e) {
            let n;
            return window.trustedTypes && (n = window.trustedTypes.createPolicy("firebase-js-sdk-policy", e)), n
          }(0, {
            createScriptURL: yu
          }),
          i = document.createElement("script"),
          r = `${_u}?l=${t}&id=${e}`;
        i.src = n ? null == n ? void 0 : n.createScriptURL(r) : r, i.async = !0, document.head.appendChild(i)
      }(a, u.measurementId), Ru && (r("consent", "default", Ru), Ru = void 0), r("js", new Date);
      const d = null !== (o = null == s ? void 0 : s.config) && void 0 !== o ? o : {};
      return d.origin = "firebase", d.update = !0, null != h && (d.firebase_id = h), r("config", u.measurementId, d), Au && (r("set", Au), Au = void 0), u.measurementId
    }
    class Pu {
      constructor(t) {
        this.app = t
      }
      _delete() {
        return delete Du[this.app.options.appId], Promise.resolve()
      }
    }
    let Du = {},
      Lu = [];
    const Iu = {};
    let Uu, Nu, Ou = "dataLayer",
      Fu = !1;

    function Bu(t, e, n) {
      ! function() {
        const t = [];
        if (function() {
            const t = "object" == typeof chrome ? chrome.runtime : "object" == typeof browser ? browser.runtime : void 0;
            return "object" == typeof t && void 0 !== t.id
          }() && t.push("This is a browser extension environment."), "undefined" != typeof navigator && navigator.cookieEnabled || t.push("Cookies are not available."), t.length > 0) {
          const e = t.map(((t, e) => `(${e+1}) ${t}`)).join(" "),
            n = xu.create("invalid-analytics-context", {
              errorInfo: e
            });
          vu.warn(n.message)
        }
      }();
      const i = t.options.appId;
      if (!i) throw xu.create("no-app-id");
      if (!t.options.apiKey) {
        if (!t.options.measurementId) throw xu.create("no-api-key");
        vu.warn(`The "apiKey" field is empty in the local Firebase config. This is needed to fetch the latest measurement ID for this Firebase app. Falling back to the measurement ID ${t.options.measurementId} provided in the "measurementId" field in the local Firebase config.`)
      }
      if (null != Du[i]) throw xu.create("already-exists", {
        id: i
      });
      if (!Fu) {
        ! function(t) {
          let e = [];
          Array.isArray(window[t]) ? e = window[t] : window[t] = e
        }(Ou);
        const {
          wrappedGtag: t,
          gtagCore: e
        } = function(t, e, n, i, r) {
          let a = function(...t) {
            window[i].push(arguments)
          };
          return window[r] && "function" == typeof window[r] && (a = window[r]), window[r] = function(t, e, n, i) {
            return async function(r, ...a) {
              try {
                if ("event" === r) {
                  const [i, r] = a;
                  await async function(t, e, n, i, r) {
                    try {
                      let a = [];
                      if (r && r.send_to) {
                        let t = r.send_to;
                        Array.isArray(t) || (t = [t]);
                        const i = await bu(n);
                        for (const n of t) {
                          const t = i.find((t => t.measurementId === n)),
                            r = t && e[t.appId];
                          if (!r) {
                            a = [];
                            break
                          }
                          a.push(r)
                        }
                      }
                      0 === a.length && (a = Object.values(e)), await Promise.all(a), t("event", i, r || {})
                    } catch (t) {
                      vu.error(t)
                    }
                  }(t, e, n, i, r)
                } else if ("config" === r) {
                  const [r, s] = a;
                  await async function(t, e, n, i, r, a) {
                    const s = i[r];
                    try {
                      if (s) await e[s];
                      else {
                        const t = (await bu(n)).find((t => t.measurementId === r));
                        t && await e[t.appId]
                      }
                    } catch (t) {
                      vu.error(t)
                    }
                    t("config", r, a)
                  }(t, e, n, i, r, s)
                } else if ("consent" === r) {
                  const [e, n] = a;
                  t("consent", e, n)
                } else if ("get" === r) {
                  const [e, n, i] = a;
                  t("get", e, n, i)
                } else if ("set" === r) {
                  const [e] = a;
                  t("set", e)
                } else t(r, ...a)
              } catch (t) {
                vu.error(t)
              }
            }
          }(a, t, e, n), {
            gtagCore: a,
            wrappedGtag: window[r]
          }
        }(Du, Lu, Iu, Ou, "gtag");
        Nu = t, Uu = e, Fu = !0
      }
      return Du[i] = Cu(t, Lu, Iu, e, Uu, Ou, n), new Pu(t)
    }

    function zu(t, e, n, i) {
      t = cl(t), async function(t, e, n, i, r) {
        if (r && r.global) t("event", n, i);
        else {
          const r = await e;
          t("event", n, Object.assign(Object.assign({}, i), {
            send_to: r
          }))
        }
      }(Nu, Du[t.app.options.appId], e, n, i).catch((t => vu.error(t)))
    }
    const ku = "@firebase/analytics",
      Hu = "0.10.12";
    yc(new ul(gu, ((t, {
      options: e
    }) => Bu(t.getProvider("app").getImmediate(), t.getProvider("installations-internal").getImmediate(), e)), "PUBLIC")), yc(new ul("analytics-internal", (function(t) {
      try {
        const e = t.getProvider(gu).getImmediate();
        return {
          logEvent: (t, n, i) => zu(e, t, n, i)
        }
      } catch (t) {
        throw xu.create("interop-component-reg-failed", {
          reason: t
        })
      }
    }), "PRIVATE")), Tc(ku, Hu), Tc(ku, Hu, "esm2017");
    let Vu = null;
    class Gu {
      constructor() {
        if (Vu) return Vu;
        this.onWheelAvailable = "onwheel" in document, this.onKeydownAvailable = "onkeydown" in document, this.onTouchAvailable = "ontouchstart" in document, this.onContextmenuAvailable = "oncontextmenu" in document, this.events = {
          pointerdown: this.onTouchAvailable ? "touchstart" : "pointerdown",
          pointermove: this.onTouchAvailable ? "touchmove" : "pointermove",
          pointerup: this.onTouchAvailable ? "touchend" : "pointerup"
        }, Vu = this
      }
      static getInstance() {
        return Vu || (Vu = new Gu), Vu
      }
      static get onWheelAvailable() {
        return Gu.getInstance().onWheelAvailable
      }
      static get onKeydownAvailable() {
        return Gu.getInstance().onKeydownAvailable
      }
      static get onTouchAvailable() {
        return Gu.getInstance().onTouchAvailable
      }
      static get isTouch() {
        return Gu.getInstance().onTouchAvailable
      }
      static get onContextmenuAvailable() {
        return Gu.getInstance().onContextmenuAvailable
      }
      static get pointerdownEvent() {
        return Gu.getInstance().events.pointerdown
      }
      static get pointermoveEvent() {
        return Gu.getInstance().events.pointermove
      }
      static get pointerupEvent() {
        return Gu.getInstance().events.pointerup
      }
    }
    class Wu {
      static random(t, e) {
        return void 0 === t ? Math.random() : void 0 === e ? Math.random() * t : t + Math.random() * (e - t)
      }
      static randomInt(t, e) {
        return Math.floor(Wu.random(t, e))
      }
      static constrain(t, e, n) {
        return Math.max(Math.min(t, n), e)
      }
      static map(t, e, n, i, r) {
        return (t - e) / (n - e) * (r - i) + i
      }
      static radians(t) {
        return t * (2 * Math.PI / 360)
      }
      static dist(t, e, n, i) {
        return Math.sqrt((t - n) * (t - n) + (e - i) * (e - i))
      }
      static lerp(t, e, n) {
        return t + (e - t) * n
      }
      static calcViewportFov(t, e) {
        return 2 * Math.atan(t / e) * (180 / Math.PI)
      }
    }
    class Xu {
      constructor(t, e) {
        this.x = t, this.velocity = 0, this.omega = e
      }
      update(t, e) {
        const n = e,
          i = this.velocity - (this.x - t) * (this.omega * this.omega * n),
          r = 1 + this.omega * n;
        this.velocity = i / (r * r), this.x += this.velocity * n
      }
      reset() {
        this.x = 0, this.velocity = 0
      }
    }
    class ju {
      constructor(t, e = {
        strictArea: !1,
        useTouch: !1
      }) {
        this.strictArea = e.strictArea, this.useTouch = e.useTouch, this.$area = null, this.$target = null, this.direction = t, this.downPos = 0, this.prevPos = 0, this.targetPosition = 0, this.position = 0, this.velocity = 0, this.acceleration = 0, this.k = .4, this.max = 0, this.progress = 0, this.isPointerDown = !1, this.isDragging = !1, this.isAutoScrolling = !1, this.tween = new Xu(0, 40), this.onWheelFunction = this.onWheel.bind(this), this.onKeyDownFunction = this.onKeyDown.bind(this), this.onDownFunction = this.onDown.bind(this), this.onMoveFunction = this.onMove.bind(this), this.onUpFunction = this.onUp.bind(this), this.onContextMenuFunc = this.onContextMenu.bind(this), this.listenerOption = {
          capture: !0,
          passive: !0
        }, this.canceller = () => !1, this.resizeMng = new $i
      }
      setTargetArea(t) {
        this.removeEvents(), this.$area = t, this.$target = this.$area.querySelector(this.$area.dataset.scrollTarget), this.setEvents(), this.reset(), this.resizeMng.setSizeFunc((() => {
          const {
            width: t,
            height: e
          } = this.$target.getBoundingClientRect();
          return {
            width: t + window.innerWidth,
            height: e + window.innerHeight
          }
        }))
      }
      setCanceller(t) {
        this.canceller = t
      }
      setEvents() {
        if (!this.$target) return;
        const t = this.strictArea ? this.$area : window;
        Gu.onWheelAvailable && t.addEventListener("wheel", this.onWheelFunction, this.listenerOption), !this.strictArea && Gu.onKeydownAvailable && window.addEventListener("keydown", this.onKeyDownFunction), (Gu.isTouch || this.useTouch) && (this.$area.addEventListener(Gu.pointerdownEvent, this.onDownFunction, this.listenerOption), this.$area.addEventListener(Gu.pointermoveEvent, this.onMoveFunction, this.listenerOption), this.$area.addEventListener(Gu.pointerupEvent, this.onUpFunction, this.listenerOption)), Gu.onContextmenuAvailable && window.addEventListener("contextmenu", this.onContextMenuFunc)
      }
      removeEvents() {
        if (!this.$target) return;
        const t = this.strictArea ? this.$area : window;
        Gu.onWheelAvailable && t.removeEventListener("wheel", this.onWheelFunction, this.listenerOption), !this.strictArea && Gu.onKeydownAvailable && window.removeEventListener("keydown", this.onKeyDownFunction), (Gu.isTouch || this.useTouch) && (this.$area.removeEventListener(Gu.pointerdownEvent, this.onDownFunction, this.listenerOption), this.$area.removeEventListener(Gu.pointermoveEvent, this.onMoveFunction, this.listenerOption), this.$area.removeEventListener(Gu.pointerupEvent, this.onUpFunction, this.listenerOption)), Gu.onContextmenuAvailable && window.removeEventListener("contextmenu", this.onContextMenuFunc)
      }
      getDownX(t) {
        return Gu.isTouch ? t.changedTouches[0].pageX : t.pageX
      }
      getDownY(t) {
        return Gu.isTouch ? t.changedTouches[0].pageY : t.pageY
      }
      getDownPos(t) {
        return "vertical" === this.direction ? this.getDownY(t) : this.getDownX(t)
      }
      onWheel(t) {
        if (this.canceller()) return;
        let e = 0;
        e = "horizontal" === this.direction ? Math.abs(t.deltaY) >= Math.abs(t.deltaX) ? t.deltaY : t.deltaX : t.deltaY;
        const n = e;
        this.addTargetPosition(n)
      }
      onKeyDown(t) {
        if (this.canceller()) return;
        const e = t.code;
        "ArrowUp" === e ? this.addTargetPosition(-500) : "ArrowDown" === e && this.addTargetPosition(500)
      }
      onDown(t) {
        if (this.canceller()) return;
        this.isPointerDown = !0;
        const e = this.getDownPos(t);
        this.downPos = e, this.prevPos = e, this.velocity = 0
      }
      onMove(t) {
        if (this.canceller()) return;
        if (!this.isPointerDown) return;
        const e = this.getDownPos(t);
        this.prevPos = this.downPos, this.downPos = e;
        const n = this.prevPos - this.downPos;
        this.addTargetPosition(n), this.isDragging = !0, this.$area.classList.add("is-dragging")
      }
      onUp() {
        this.canceller() || this.isPointerDown && (this.acceleration = -this.k * (this.position - this.targetPosition), this.downPos = 0, this.prevPos = 0, this.isPointerDown = !1, this.isDragging = !1, this.$area.classList.remove("is-dragging"))
      }
      onContextMenu() {
        this.isPointerDown = !1
      }
      addTargetPosition(t) {
        this.targetPosition = Wu.constrain(this.targetPosition + t, 0, this.max)
      }
      changeDirection(t) {
        this.direction !== t && (this.reset(), this.direction = t)
      }
      resize() {
        if (this.$target)
          if ("vertical" === this.direction) {
            const {
              height: t
            } = this.$target.getBoundingClientRect(), {
              height: e
            } = this.$target.parentNode.getBoundingClientRect();
            this.max = t - e
          } else {
            const {
              width: t
            } = this.$target.getBoundingClientRect(), {
              width: e
            } = this.$target.parentNode.getBoundingClientRect();
            this.max = t - e
          }
      }
      update(t) {
        this.canceller() || (this.resizeMng.check() && this.resize(), this.velocity += this.acceleration, this.targetPosition += this.velocity, this.velocity *= .9, this.acceleration = 0, this.targetPosition = Wu.constrain(this.targetPosition, 0, this.max), this.tween.update(this.targetPosition, t), Math.abs(this.tween.velocity) < .01 && (this.tween.x = this.targetPosition), this.isAutoScrolling && (this.tween.x = this.targetPosition), this.position = this.tween.x, this.max > 0 ? this.progress = Wu.constrain(this.position / this.max, 0, 1) : this.progress = 0, this.progress < 1e-4 && (this.progress = 0), "vertical" === this.direction ? this.$target.style.transform = `translate3d(0, ${-this.position}px, 0)` : this.$target.style.transform = `translate3d(${-this.position}px, 0, 0)`)
      }
      reset() {
        this.targetPosition = 0, this.position = 0, this.velocity = 0, this.acceleration = 0, this.max = 0, this.progress = 0, this.tween.reset()
      }
      setPosition(t) {
        this.targetPosition = t, this.position = t, this.tween.x = t
      }
      scrollTo({
        position: t,
        duration: e = 1,
        ease: n = "easeOut"
      }) {
        this.isAutoScrolling = !0, ji.to(this, {
          targetPosition: t,
          duration: e,
          ease: n,
          onComplete: () => {
            this.isAutoScrolling = !1
          }
        })
      }
      scrollBy({
        position: t,
        duration: e = 1,
        ease: n = "easeOut"
      }) {
        this.isAutoScrolling = !0, ji.to(this, {
          targetPosition: this.targetPosition + t,
          duration: e,
          ease: n,
          onComplete: () => {
            this.isAutoScrolling = !1
          }
        })
      }
    }

    function qu(t) {
      return new Promise((e => {
        setTimeout((() => {
          e()
        }), 1e3 * t)
      }))
    }
    const Yu = {
      enabled: !1,
      files: {},
      add: function(t, e) {
        !1 !== this.enabled && (this.files[t] = e)
      },
      get: function(t) {
        if (!1 !== this.enabled) return this.files[t]
      },
      remove: function(t) {
        delete this.files[t]
      },
      clear: function() {
        this.files = {}
      }
    };
    class $u {
      constructor(t, e, n) {
        const i = this;
        let r, a = !1,
          s = 0,
          o = 0;
        const l = [];
        this.onStart = void 0, this.onLoad = t, this.onProgress = e, this.onError = n, this.itemStart = function(t) {
          o++, !1 === a && void 0 !== i.onStart && i.onStart(t, s, o), a = !0
        }, this.itemEnd = function(t) {
          s++, void 0 !== i.onProgress && i.onProgress(t, s, o), s === o && (a = !1, void 0 !== i.onLoad && i.onLoad())
        }, this.itemError = function(t) {
          void 0 !== i.onError && i.onError(t)
        }, this.resolveURL = function(t) {
          return r ? r(t) : t
        }, this.setURLModifier = function(t) {
          return r = t, this
        }, this.addHandler = function(t, e) {
          return l.push(t, e), this
        }, this.removeHandler = function(t) {
          const e = l.indexOf(t);
          return -1 !== e && l.splice(e, 2), this
        }, this.getHandler = function(t) {
          for (let e = 0, n = l.length; e < n; e += 2) {
            const n = l[e],
              i = l[e + 1];
            if (n.global && (n.lastIndex = 0), n.test(t)) return i
          }
          return null
        }
      }
    }
    const Ku = new $u;
    class Zu {
      constructor(t) {
        this.manager = void 0 !== t ? t : Ku, this.crossOrigin = "anonymous", this.withCredentials = !1, this.path = "", this.resourcePath = "", this.requestHeader = {}
      }
      load() {}
      loadAsync(t, e) {
        const n = this;
        return new Promise((function(i, r) {
          n.load(t, i, e, r)
        }))
      }
      parse() {}
      setCrossOrigin(t) {
        return this.crossOrigin = t, this
      }
      setWithCredentials(t) {
        return this.withCredentials = t, this
      }
      setPath(t) {
        return this.path = t, this
      }
      setResourcePath(t) {
        return this.resourcePath = t, this
      }
      setRequestHeader(t) {
        return this.requestHeader = t, this
      }
    }

    function Ju(t) {
      for (let e = t.length - 1; e >= 0; --e)
        if (t[e] >= 65535) return !0;
      return !1
    }

    function Qu(t) {
      return document.createElementNS("http://www.w3.org/1999/xhtml", t)
    }

    function th() {
      const t = Qu("canvas");
      return t.style.display = "block", t
    }
    Zu.DEFAULT_MATERIAL_NAME = "__DEFAULT", Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array;
    const eh = {};

    function nh(t) {
      t in eh || (eh[t] = !0, console.warn(t))
    }
    class ih extends Zu {
      constructor(t) {
        super(t)
      }
      load(t, e, n, i) {
        void 0 !== this.path && (t = this.path + t), t = this.manager.resolveURL(t);
        const r = this,
          a = Yu.get(t);
        if (void 0 !== a) return r.manager.itemStart(t), setTimeout((function() {
          e && e(a), r.manager.itemEnd(t)
        }), 0), a;
        const s = Qu("img");

        function o() {
          c(), Yu.add(t, this), e && e(this), r.manager.itemEnd(t)
        }

        function l(e) {
          c(), i && i(e), r.manager.itemError(t), r.manager.itemEnd(t)
        }

        function c() {
          s.removeEventListener("load", o, !1), s.removeEventListener("error", l, !1)
        }
        return s.addEventListener("load", o, !1), s.addEventListener("error", l, !1), "data:" !== t.slice(0, 5) && void 0 !== this.crossOrigin && (s.crossOrigin = this.crossOrigin), r.manager.itemStart(t), s.src = t, s
      }
    }
    class rh {
      addEventListener(t, e) {
        void 0 === this._listeners && (this._listeners = {});
        const n = this._listeners;
        void 0 === n[t] && (n[t] = []), -1 === n[t].indexOf(e) && n[t].push(e)
      }
      hasEventListener(t, e) {
        const n = this._listeners;
        return void 0 !== n && void 0 !== n[t] && -1 !== n[t].indexOf(e)
      }
      removeEventListener(t, e) {
        const n = this._listeners;
        if (void 0 === n) return;
        const i = n[t];
        if (void 0 !== i) {
          const t = i.indexOf(e); - 1 !== t && i.splice(t, 1)
        }
      }
      dispatchEvent(t) {
        const e = this._listeners;
        if (void 0 === e) return;
        const n = e[t.type];
        if (void 0 !== n) {
          t.target = this;
          const e = n.slice(0);
          for (let n = 0, i = e.length; n < i; n++) e[n].call(this, t);
          t.target = null
        }
      }
    }
    const ah = 0,
      sh = 1,
      oh = 2,
      lh = 100,
      ch = 101,
      uh = 102,
      hh = 200,
      dh = 201,
      ph = 202,
      fh = 203,
      mh = 204,
      gh = 205,
      _h = 206,
      vh = 207,
      xh = 208,
      yh = 209,
      bh = 210,
      Mh = 211,
      Sh = 212,
      Eh = 213,
      Th = 214,
      wh = 0,
      Ah = 1,
      Rh = 2,
      Ch = 3,
      Ph = 4,
      Dh = 5,
      Lh = 6,
      Ih = 7,
      Uh = 301,
      Nh = 302,
      Oh = 306,
      Fh = 1e3,
      Bh = 1001,
      zh = 1002,
      kh = 1003,
      Hh = 1004,
      Vh = 1005,
      Gh = 1006,
      Wh = 1007,
      Xh = 1008,
      jh = 1009,
      qh = 1012,
      Yh = 1013,
      $h = 1014,
      Kh = 1015,
      Zh = 1016,
      Jh = 1017,
      Qh = 1018,
      td = 1020,
      ed = 1023,
      nd = 1026,
      id = 1027,
      rd = 1029,
      ad = 1031,
      sd = 1033,
      od = 33776,
      ld = 33777,
      cd = 33778,
      ud = 33779,
      hd = 35840,
      dd = 35841,
      pd = 35842,
      fd = 35843,
      md = 36196,
      gd = 37492,
      _d = 37496,
      vd = 37808,
      xd = 37809,
      yd = 37810,
      bd = 37811,
      Md = 37812,
      Sd = 37813,
      Ed = 37814,
      Td = 37815,
      wd = 37816,
      Ad = 37817,
      Rd = 37818,
      Cd = 37819,
      Pd = 37820,
      Dd = 37821,
      Ld = 36492,
      Id = 36494,
      Ud = 36495,
      Nd = 36284,
      Od = 36285,
      Fd = 36286,
      Bd = "",
      zd = "srgb",
      kd = "srgb-linear",
      Hd = "linear",
      Vd = "srgb",
      Gd = 7680,
      Wd = 512,
      Xd = 513,
      jd = 514,
      qd = 515,
      Yd = 516,
      $d = 517,
      Kd = 518,
      Zd = 519,
      Jd = "300 es",
      Qd = 2e3,
      tp = 2001,
      ep = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"],
      np = Math.PI / 180,
      ip = 180 / Math.PI;

    function rp() {
      const t = 4294967295 * Math.random() | 0,
        e = 4294967295 * Math.random() | 0,
        n = 4294967295 * Math.random() | 0,
        i = 4294967295 * Math.random() | 0;
      return (ep[255 & t] + ep[t >> 8 & 255] + ep[t >> 16 & 255] + ep[t >> 24 & 255] + "-" + ep[255 & e] + ep[e >> 8 & 255] + "-" + ep[e >> 16 & 15 | 64] + ep[e >> 24 & 255] + "-" + ep[63 & n | 128] + ep[n >> 8 & 255] + "-" + ep[n >> 16 & 255] + ep[n >> 24 & 255] + ep[255 & i] + ep[i >> 8 & 255] + ep[i >> 16 & 255] + ep[i >> 24 & 255]).toLowerCase()
    }

    function ap(t, e, n) {
      return Math.max(e, Math.min(n, t))
    }

    function sp(t, e, n) {
      return (1 - n) * t + n * e
    }

    function op(t, e) {
      switch (e.constructor) {
        case Float32Array:
          return t;
        case Uint32Array:
          return t / 4294967295;
        case Uint16Array:
          return t / 65535;
        case Uint8Array:
          return t / 255;
        case Int32Array:
          return Math.max(t / 2147483647, -1);
        case Int16Array:
          return Math.max(t / 32767, -1);
        case Int8Array:
          return Math.max(t / 127, -1);
        default:
          throw new Error("Invalid component type.")
      }
    }

    function lp(t, e) {
      switch (e.constructor) {
        case Float32Array:
          return t;
        case Uint32Array:
          return Math.round(4294967295 * t);
        case Uint16Array:
          return Math.round(65535 * t);
        case Uint8Array:
          return Math.round(255 * t);
        case Int32Array:
          return Math.round(2147483647 * t);
        case Int16Array:
          return Math.round(32767 * t);
        case Int8Array:
          return Math.round(127 * t);
        default:
          throw new Error("Invalid component type.")
      }
    }
    class cp {
      constructor(t = 0, e = 0) {
        cp.prototype.isVector2 = !0, this.x = t, this.y = e
      }
      get width() {
        return this.x
      }
      set width(t) {
        this.x = t
      }
      get height() {
        return this.y
      }
      set height(t) {
        this.y = t
      }
      set(t, e) {
        return this.x = t, this.y = e, this
      }
      setScalar(t) {
        return this.x = t, this.y = t, this
      }
      setX(t) {
        return this.x = t, this
      }
      setY(t) {
        return this.y = t, this
      }
      setComponent(t, e) {
        switch (t) {
          case 0:
            this.x = e;
            break;
          case 1:
            this.y = e;
            break;
          default:
            throw new Error("index is out of range: " + t)
        }
        return this
      }
      getComponent(t) {
        switch (t) {
          case 0:
            return this.x;
          case 1:
            return this.y;
          default:
            throw new Error("index is out of range: " + t)
        }
      }
      clone() {
        return new this.constructor(this.x, this.y)
      }
      copy(t) {
        return this.x = t.x, this.y = t.y, this
      }
      add(t) {
        return this.x += t.x, this.y += t.y, this
      }
      addScalar(t) {
        return this.x += t, this.y += t, this
      }
      addVectors(t, e) {
        return this.x = t.x + e.x, this.y = t.y + e.y, this
      }
      addScaledVector(t, e) {
        return this.x += t.x * e, this.y += t.y * e, this
      }
      sub(t) {
        return this.x -= t.x, this.y -= t.y, this
      }
      subScalar(t) {
        return this.x -= t, this.y -= t, this
      }
      subVectors(t, e) {
        return this.x = t.x - e.x, this.y = t.y - e.y, this
      }
      multiply(t) {
        return this.x *= t.x, this.y *= t.y, this
      }
      multiplyScalar(t) {
        return this.x *= t, this.y *= t, this
      }
      divide(t) {
        return this.x /= t.x, this.y /= t.y, this
      }
      divideScalar(t) {
        return this.multiplyScalar(1 / t)
      }
      applyMatrix3(t) {
        const e = this.x,
          n = this.y,
          i = t.elements;
        return this.x = i[0] * e + i[3] * n + i[6], this.y = i[1] * e + i[4] * n + i[7], this
      }
      min(t) {
        return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this
      }
      max(t) {
        return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this
      }
      clamp(t, e) {
        return this.x = ap(this.x, t.x, e.x), this.y = ap(this.y, t.y, e.y), this
      }
      clampScalar(t, e) {
        return this.x = ap(this.x, t, e), this.y = ap(this.y, t, e), this
      }
      clampLength(t, e) {
        const n = this.length();
        return this.divideScalar(n || 1).multiplyScalar(ap(n, t, e))
      }
      floor() {
        return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
      }
      ceil() {
        return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
      }
      round() {
        return this.x = Math.round(this.x), this.y = Math.round(this.y), this
      }
      roundToZero() {
        return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this
      }
      negate() {
        return this.x = -this.x, this.y = -this.y, this
      }
      dot(t) {
        return this.x * t.x + this.y * t.y
      }
      cross(t) {
        return this.x * t.y - this.y * t.x
      }
      lengthSq() {
        return this.x * this.x + this.y * this.y
      }
      length() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
      }
      manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y)
      }
      normalize() {
        return this.divideScalar(this.length() || 1)
      }
      angle() {
        return Math.atan2(-this.y, -this.x) + Math.PI
      }
      angleTo(t) {
        const e = Math.sqrt(this.lengthSq() * t.lengthSq());
        if (0 === e) return Math.PI / 2;
        const n = this.dot(t) / e;
        return Math.acos(ap(n, -1, 1))
      }
      distanceTo(t) {
        return Math.sqrt(this.distanceToSquared(t))
      }
      distanceToSquared(t) {
        const e = this.x - t.x,
          n = this.y - t.y;
        return e * e + n * n
      }
      manhattanDistanceTo(t) {
        return Math.abs(this.x - t.x) + Math.abs(this.y - t.y)
      }
      setLength(t) {
        return this.normalize().multiplyScalar(t)
      }
      lerp(t, e) {
        return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this
      }
      lerpVectors(t, e, n) {
        return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this
      }
      equals(t) {
        return t.x === this.x && t.y === this.y
      }
      fromArray(t, e = 0) {
        return this.x = t[e], this.y = t[e + 1], this
      }
      toArray(t = [], e = 0) {
        return t[e] = this.x, t[e + 1] = this.y, t
      }
      fromBufferAttribute(t, e) {
        return this.x = t.getX(e), this.y = t.getY(e), this
      }
      rotateAround(t, e) {
        const n = Math.cos(e),
          i = Math.sin(e),
          r = this.x - t.x,
          a = this.y - t.y;
        return this.x = r * n - a * i + t.x, this.y = r * i + a * n + t.y, this
      }
      random() {
        return this.x = Math.random(), this.y = Math.random(), this
      }*[Symbol.iterator]() {
        yield this.x, yield this.y
      }
    }
    class up {
      constructor(t, e, n, i, r, a, s, o, l) {
        up.prototype.isMatrix3 = !0, this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1], void 0 !== t && this.set(t, e, n, i, r, a, s, o, l)
      }
      set(t, e, n, i, r, a, s, o, l) {
        const c = this.elements;
        return c[0] = t, c[1] = i, c[2] = s, c[3] = e, c[4] = r, c[5] = o, c[6] = n, c[7] = a, c[8] = l, this
      }
      identity() {
        return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this
      }
      copy(t) {
        const e = this.elements,
          n = t.elements;
        return e[0] = n[0], e[1] = n[1], e[2] = n[2], e[3] = n[3], e[4] = n[4], e[5] = n[5], e[6] = n[6], e[7] = n[7], e[8] = n[8], this
      }
      extractBasis(t, e, n) {
        return t.setFromMatrix3Column(this, 0), e.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this
      }
      setFromMatrix4(t) {
        const e = t.elements;
        return this.set(e[0], e[4], e[8], e[1], e[5], e[9], e[2], e[6], e[10]), this
      }
      multiply(t) {
        return this.multiplyMatrices(this, t)
      }
      premultiply(t) {
        return this.multiplyMatrices(t, this)
      }
      multiplyMatrices(t, e) {
        const n = t.elements,
          i = e.elements,
          r = this.elements,
          a = n[0],
          s = n[3],
          o = n[6],
          l = n[1],
          c = n[4],
          u = n[7],
          h = n[2],
          d = n[5],
          p = n[8],
          f = i[0],
          m = i[3],
          g = i[6],
          _ = i[1],
          v = i[4],
          x = i[7],
          y = i[2],
          b = i[5],
          M = i[8];
        return r[0] = a * f + s * _ + o * y, r[3] = a * m + s * v + o * b, r[6] = a * g + s * x + o * M, r[1] = l * f + c * _ + u * y, r[4] = l * m + c * v + u * b, r[7] = l * g + c * x + u * M, r[2] = h * f + d * _ + p * y, r[5] = h * m + d * v + p * b, r[8] = h * g + d * x + p * M, this
      }
      multiplyScalar(t) {
        const e = this.elements;
        return e[0] *= t, e[3] *= t, e[6] *= t, e[1] *= t, e[4] *= t, e[7] *= t, e[2] *= t, e[5] *= t, e[8] *= t, this
      }
      determinant() {
        const t = this.elements,
          e = t[0],
          n = t[1],
          i = t[2],
          r = t[3],
          a = t[4],
          s = t[5],
          o = t[6],
          l = t[7],
          c = t[8];
        return e * a * c - e * s * l - n * r * c + n * s * o + i * r * l - i * a * o
      }
      invert() {
        const t = this.elements,
          e = t[0],
          n = t[1],
          i = t[2],
          r = t[3],
          a = t[4],
          s = t[5],
          o = t[6],
          l = t[7],
          c = t[8],
          u = c * a - s * l,
          h = s * o - c * r,
          d = l * r - a * o,
          p = e * u + n * h + i * d;
        if (0 === p) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
        const f = 1 / p;
        return t[0] = u * f, t[1] = (i * l - c * n) * f, t[2] = (s * n - i * a) * f, t[3] = h * f, t[4] = (c * e - i * o) * f, t[5] = (i * r - s * e) * f, t[6] = d * f, t[7] = (n * o - l * e) * f, t[8] = (a * e - n * r) * f, this
      }
      transpose() {
        let t;
        const e = this.elements;
        return t = e[1], e[1] = e[3], e[3] = t, t = e[2], e[2] = e[6], e[6] = t, t = e[5], e[5] = e[7], e[7] = t, this
      }
      getNormalMatrix(t) {
        return this.setFromMatrix4(t).invert().transpose()
      }
      transposeIntoArray(t) {
        const e = this.elements;
        return t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = e[1], t[4] = e[4], t[5] = e[7], t[6] = e[2], t[7] = e[5], t[8] = e[8], this
      }
      setUvTransform(t, e, n, i, r, a, s) {
        const o = Math.cos(r),
          l = Math.sin(r);
        return this.set(n * o, n * l, -n * (o * a + l * s) + a + t, -i * l, i * o, -i * (-l * a + o * s) + s + e, 0, 0, 1), this
      }
      scale(t, e) {
        return this.premultiply(hp.makeScale(t, e)), this
      }
      rotate(t) {
        return this.premultiply(hp.makeRotation(-t)), this
      }
      translate(t, e) {
        return this.premultiply(hp.makeTranslation(t, e)), this
      }
      makeTranslation(t, e) {
        return t.isVector2 ? this.set(1, 0, t.x, 0, 1, t.y, 0, 0, 1) : this.set(1, 0, t, 0, 1, e, 0, 0, 1), this
      }
      makeRotation(t) {
        const e = Math.cos(t),
          n = Math.sin(t);
        return this.set(e, -n, 0, n, e, 0, 0, 0, 1), this
      }
      makeScale(t, e) {
        return this.set(t, 0, 0, 0, e, 0, 0, 0, 1), this
      }
      equals(t) {
        const e = this.elements,
          n = t.elements;
        for (let t = 0; t < 9; t++)
          if (e[t] !== n[t]) return !1;
        return !0
      }
      fromArray(t, e = 0) {
        for (let n = 0; n < 9; n++) this.elements[n] = t[n + e];
        return this
      }
      toArray(t = [], e = 0) {
        const n = this.elements;
        return t[e] = n[0], t[e + 1] = n[1], t[e + 2] = n[2], t[e + 3] = n[3], t[e + 4] = n[4], t[e + 5] = n[5], t[e + 6] = n[6], t[e + 7] = n[7], t[e + 8] = n[8], t
      }
      clone() {
        return (new this.constructor).fromArray(this.elements)
      }
    }
    const hp = new up,
      dp = (new up).set(.4123908, .3575843, .1804808, .212639, .7151687, .0721923, .0193308, .1191948, .9505322),
      pp = (new up).set(3.2409699, -1.5373832, -.4986108, -.9692436, 1.8759675, .0415551, .0556301, -.203977, 1.0569715);

    function fp() {
      const t = {
          enabled: !0,
          workingColorSpace: kd,
          spaces: {},
          convert: function(t, e, n) {
            return !1 !== this.enabled && e !== n && e && n ? (this.spaces[e].transfer === Vd && (t.r = gp(t.r), t.g = gp(t.g), t.b = gp(t.b)), this.spaces[e].primaries !== this.spaces[n].primaries && (t.applyMatrix3(this.spaces[e].toXYZ), t.applyMatrix3(this.spaces[n].fromXYZ)), this.spaces[n].transfer === Vd && (t.r = _p(t.r), t.g = _p(t.g), t.b = _p(t.b)), t) : t
          },
          fromWorkingColorSpace: function(t, e) {
            return this.convert(t, this.workingColorSpace, e)
          },
          toWorkingColorSpace: function(t, e) {
            return this.convert(t, e, this.workingColorSpace)
          },
          getPrimaries: function(t) {
            return this.spaces[t].primaries
          },
          getTransfer: function(t) {
            return t === Bd ? Hd : this.spaces[t].transfer
          },
          getLuminanceCoefficients: function(t, e = this.workingColorSpace) {
            return t.fromArray(this.spaces[e].luminanceCoefficients)
          },
          define: function(t) {
            Object.assign(this.spaces, t)
          },
          _getMatrix: function(t, e, n) {
            return t.copy(this.spaces[e].toXYZ).multiply(this.spaces[n].fromXYZ)
          },
          _getDrawingBufferColorSpace: function(t) {
            return this.spaces[t].outputColorSpaceConfig.drawingBufferColorSpace
          },
          _getUnpackColorSpace: function(t = this.workingColorSpace) {
            return this.spaces[t].workingColorSpaceConfig.unpackColorSpace
          }
        },
        e = [.64, .33, .3, .6, .15, .06],
        n = [.2126, .7152, .0722],
        i = [.3127, .329];
      return t.define({
        [kd]: {
          primaries: e,
          whitePoint: i,
          transfer: Hd,
          toXYZ: dp,
          fromXYZ: pp,
          luminanceCoefficients: n,
          workingColorSpaceConfig: {
            unpackColorSpace: zd
          },
          outputColorSpaceConfig: {
            drawingBufferColorSpace: zd
          }
        },
        [zd]: {
          primaries: e,
          whitePoint: i,
          transfer: Vd,
          toXYZ: dp,
          fromXYZ: pp,
          luminanceCoefficients: n,
          outputColorSpaceConfig: {
            drawingBufferColorSpace: zd
          }
        }
      }), t
    }
    const mp = fp();

    function gp(t) {
      return t < .04045 ? .0773993808 * t : Math.pow(.9478672986 * t + .0521327014, 2.4)
    }

    function _p(t) {
      return t < .0031308 ? 12.92 * t : 1.055 * Math.pow(t, .41666) - .055
    }
    let vp;
    class xp {
      static getDataURL(t) {
        if (/^data:/i.test(t.src)) return t.src;
        if ("undefined" == typeof HTMLCanvasElement) return t.src;
        let e;
        if (t instanceof HTMLCanvasElement) e = t;
        else {
          void 0 === vp && (vp = Qu("canvas")), vp.width = t.width, vp.height = t.height;
          const n = vp.getContext("2d");
          t instanceof ImageData ? n.putImageData(t, 0, 0) : n.drawImage(t, 0, 0, t.width, t.height), e = vp
        }
        return e.toDataURL("image/png")
      }
      static sRGBToLinear(t) {
        if ("undefined" != typeof HTMLImageElement && t instanceof HTMLImageElement || "undefined" != typeof HTMLCanvasElement && t instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && t instanceof ImageBitmap) {
          const e = Qu("canvas");
          e.width = t.width, e.height = t.height;
          const n = e.getContext("2d");
          n.drawImage(t, 0, 0, t.width, t.height);
          const i = n.getImageData(0, 0, t.width, t.height),
            r = i.data;
          for (let t = 0; t < r.length; t++) r[t] = 255 * gp(r[t] / 255);
          return n.putImageData(i, 0, 0), e
        }
        if (t.data) {
          const e = t.data.slice(0);
          for (let t = 0; t < e.length; t++) e instanceof Uint8Array || e instanceof Uint8ClampedArray ? e[t] = Math.floor(255 * gp(e[t] / 255)) : e[t] = gp(e[t]);
          return {
            data: e,
            width: t.width,
            height: t.height
          }
        }
        return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), t
      }
    }
    let yp = 0;
    class bp {
      constructor(t = null) {
        this.isSource = !0, Object.defineProperty(this, "id", {
          value: yp++
        }), this.uuid = rp(), this.data = t, this.dataReady = !0, this.version = 0
      }
      set needsUpdate(t) {
        !0 === t && this.version++
      }
      toJSON(t) {
        const e = void 0 === t || "string" == typeof t;
        if (!e && void 0 !== t.images[this.uuid]) return t.images[this.uuid];
        const n = {
            uuid: this.uuid,
            url: ""
          },
          i = this.data;
        if (null !== i) {
          let t;
          if (Array.isArray(i)) {
            t = [];
            for (let e = 0, n = i.length; e < n; e++) i[e].isDataTexture ? t.push(Mp(i[e].image)) : t.push(Mp(i[e]))
          } else t = Mp(i);
          n.url = t
        }
        return e || (t.images[this.uuid] = n), n
      }
    }

    function Mp(t) {
      return "undefined" != typeof HTMLImageElement && t instanceof HTMLImageElement || "undefined" != typeof HTMLCanvasElement && t instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && t instanceof ImageBitmap ? xp.getDataURL(t) : t.data ? {
        data: Array.from(t.data),
        width: t.width,
        height: t.height,
        type: t.data.constructor.name
      } : (console.warn("THREE.Texture: Unable to serialize Texture."), {})
    }
    let Sp = 0;
    class Ep extends rh {
      constructor(t = Ep.DEFAULT_IMAGE, e = Ep.DEFAULT_MAPPING, n = 1001, i = 1001, r = 1006, a = 1008, s = 1023, o = 1009, l = Ep.DEFAULT_ANISOTROPY, c = "") {
        super(), this.isTexture = !0, Object.defineProperty(this, "id", {
          value: Sp++
        }), this.uuid = rp(), this.name = "", this.source = new bp(t), this.mipmaps = [], this.mapping = e, this.channel = 0, this.wrapS = n, this.wrapT = i, this.magFilter = r, this.minFilter = a, this.anisotropy = l, this.format = s, this.internalFormat = null, this.type = o, this.offset = new cp(0, 0), this.repeat = new cp(1, 1), this.center = new cp(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new up, this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = c, this.userData = {}, this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = !1, this.pmremVersion = 0
      }
      get image() {
        return this.source.data
      }
      set image(t = null) {
        this.source.data = t
      }
      updateMatrix() {
        this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y)
      }
      clone() {
        return (new this.constructor).copy(this)
      }
      copy(t) {
        return this.name = t.name, this.source = t.source, this.mipmaps = t.mipmaps.slice(0), this.mapping = t.mapping, this.channel = t.channel, this.wrapS = t.wrapS, this.wrapT = t.wrapT, this.magFilter = t.magFilter, this.minFilter = t.minFilter, this.anisotropy = t.anisotropy, this.format = t.format, this.internalFormat = t.internalFormat, this.type = t.type, this.offset.copy(t.offset), this.repeat.copy(t.repeat), this.center.copy(t.center), this.rotation = t.rotation, this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrix.copy(t.matrix), this.generateMipmaps = t.generateMipmaps, this.premultiplyAlpha = t.premultiplyAlpha, this.flipY = t.flipY, this.unpackAlignment = t.unpackAlignment, this.colorSpace = t.colorSpace, this.renderTarget = t.renderTarget, this.isRenderTargetTexture = t.isRenderTargetTexture, this.userData = JSON.parse(JSON.stringify(t.userData)), this.needsUpdate = !0, this
      }
      toJSON(t) {
        const e = void 0 === t || "string" == typeof t;
        if (!e && void 0 !== t.textures[this.uuid]) return t.textures[this.uuid];
        const n = {
          metadata: {
            version: 4.6,
            type: "Texture",
            generator: "Texture.toJSON"
          },
          uuid: this.uuid,
          name: this.name,
          image: this.source.toJSON(t).uuid,
          mapping: this.mapping,
          channel: this.channel,
          repeat: [this.repeat.x, this.repeat.y],
          offset: [this.offset.x, this.offset.y],
          center: [this.center.x, this.center.y],
          rotation: this.rotation,
          wrap: [this.wrapS, this.wrapT],
          format: this.format,
          internalFormat: this.internalFormat,
          type: this.type,
          colorSpace: this.colorSpace,
          minFilter: this.minFilter,
          magFilter: this.magFilter,
          anisotropy: this.anisotropy,
          flipY: this.flipY,
          generateMipmaps: this.generateMipmaps,
          premultiplyAlpha: this.premultiplyAlpha,
          unpackAlignment: this.unpackAlignment
        };
        return Object.keys(this.userData).length > 0 && (n.userData = this.userData), e || (t.textures[this.uuid] = n), n
      }
      dispose() {
        this.dispatchEvent({
          type: "dispose"
        })
      }
      transformUv(t) {
        if (300 !== this.mapping) return t;
        if (t.applyMatrix3(this.matrix), t.x < 0 || t.x > 1) switch (this.wrapS) {
          case Fh:
            t.x = t.x - Math.floor(t.x);
            break;
          case Bh:
            t.x = t.x < 0 ? 0 : 1;
            break;
          case zh:
            1 === Math.abs(Math.floor(t.x) % 2) ? t.x = Math.ceil(t.x) - t.x : t.x = t.x - Math.floor(t.x)
        }
        if (t.y < 0 || t.y > 1) switch (this.wrapT) {
          case Fh:
            t.y = t.y - Math.floor(t.y);
            break;
          case Bh:
            t.y = t.y < 0 ? 0 : 1;
            break;
          case zh:
            1 === Math.abs(Math.floor(t.y) % 2) ? t.y = Math.ceil(t.y) - t.y : t.y = t.y - Math.floor(t.y)
        }
        return this.flipY && (t.y = 1 - t.y), t
      }
      set needsUpdate(t) {
        !0 === t && (this.version++, this.source.needsUpdate = !0)
      }
      set needsPMREMUpdate(t) {
        !0 === t && this.pmremVersion++
      }
    }
    Ep.DEFAULT_IMAGE = null, Ep.DEFAULT_MAPPING = 300, Ep.DEFAULT_ANISOTROPY = 1;
    class Tp extends Zu {
      constructor(t) {
        super(t)
      }
      load(t, e, n, i) {
        const r = new Ep,
          a = new ih(this.manager);
        return a.setCrossOrigin(this.crossOrigin), a.setPath(this.path), a.load(t, (function(t) {
          r.image = t, r.needsUpdate = !0, void 0 !== e && e(r)
        }), n, i), r
      }
    }
    const wp = {
        aliceblue: 15792383,
        antiquewhite: 16444375,
        aqua: 65535,
        aquamarine: 8388564,
        azure: 15794175,
        beige: 16119260,
        bisque: 16770244,
        black: 0,
        blanchedalmond: 16772045,
        blue: 255,
        blueviolet: 9055202,
        brown: 10824234,
        burlywood: 14596231,
        cadetblue: 6266528,
        chartreuse: 8388352,
        chocolate: 13789470,
        coral: 16744272,
        cornflowerblue: 6591981,
        cornsilk: 16775388,
        crimson: 14423100,
        cyan: 65535,
        darkblue: 139,
        darkcyan: 35723,
        darkgoldenrod: 12092939,
        darkgray: 11119017,
        darkgreen: 25600,
        darkgrey: 11119017,
        darkkhaki: 12433259,
        darkmagenta: 9109643,
        darkolivegreen: 5597999,
        darkorange: 16747520,
        darkorchid: 10040012,
        darkred: 9109504,
        darksalmon: 15308410,
        darkseagreen: 9419919,
        darkslateblue: 4734347,
        darkslategray: 3100495,
        darkslategrey: 3100495,
        darkturquoise: 52945,
        darkviolet: 9699539,
        deeppink: 16716947,
        deepskyblue: 49151,
        dimgray: 6908265,
        dimgrey: 6908265,
        dodgerblue: 2003199,
        firebrick: 11674146,
        floralwhite: 16775920,
        forestgreen: 2263842,
        fuchsia: 16711935,
        gainsboro: 14474460,
        ghostwhite: 16316671,
        gold: 16766720,
        goldenrod: 14329120,
        gray: 8421504,
        green: 32768,
        greenyellow: 11403055,
        grey: 8421504,
        honeydew: 15794160,
        hotpink: 16738740,
        indianred: 13458524,
        indigo: 4915330,
        ivory: 16777200,
        khaki: 15787660,
        lavender: 15132410,
        lavenderblush: 16773365,
        lawngreen: 8190976,
        lemonchiffon: 16775885,
        lightblue: 11393254,
        lightcoral: 15761536,
        lightcyan: 14745599,
        lightgoldenrodyellow: 16448210,
        lightgray: 13882323,
        lightgreen: 9498256,
        lightgrey: 13882323,
        lightpink: 16758465,
        lightsalmon: 16752762,
        lightseagreen: 2142890,
        lightskyblue: 8900346,
        lightslategray: 7833753,
        lightslategrey: 7833753,
        lightsteelblue: 11584734,
        lightyellow: 16777184,
        lime: 65280,
        limegreen: 3329330,
        linen: 16445670,
        magenta: 16711935,
        maroon: 8388608,
        mediumaquamarine: 6737322,
        mediumblue: 205,
        mediumorchid: 12211667,
        mediumpurple: 9662683,
        mediumseagreen: 3978097,
        mediumslateblue: 8087790,
        mediumspringgreen: 64154,
        mediumturquoise: 4772300,
        mediumvioletred: 13047173,
        midnightblue: 1644912,
        mintcream: 16121850,
        mistyrose: 16770273,
        moccasin: 16770229,
        navajowhite: 16768685,
        navy: 128,
        oldlace: 16643558,
        olive: 8421376,
        olivedrab: 7048739,
        orange: 16753920,
        orangered: 16729344,
        orchid: 14315734,
        palegoldenrod: 15657130,
        palegreen: 10025880,
        paleturquoise: 11529966,
        palevioletred: 14381203,
        papayawhip: 16773077,
        peachpuff: 16767673,
        peru: 13468991,
        pink: 16761035,
        plum: 14524637,
        powderblue: 11591910,
        purple: 8388736,
        rebeccapurple: 6697881,
        red: 16711680,
        rosybrown: 12357519,
        royalblue: 4286945,
        saddlebrown: 9127187,
        salmon: 16416882,
        sandybrown: 16032864,
        seagreen: 3050327,
        seashell: 16774638,
        sienna: 10506797,
        silver: 12632256,
        skyblue: 8900331,
        slateblue: 6970061,
        slategray: 7372944,
        slategrey: 7372944,
        snow: 16775930,
        springgreen: 65407,
        steelblue: 4620980,
        tan: 13808780,
        teal: 32896,
        thistle: 14204888,
        tomato: 16737095,
        turquoise: 4251856,
        violet: 15631086,
        wheat: 16113331,
        white: 16777215,
        whitesmoke: 16119285,
        yellow: 16776960,
        yellowgreen: 10145074
      },
      Ap = {
        h: 0,
        s: 0,
        l: 0
      },
      Rp = {
        h: 0,
        s: 0,
        l: 0
      };

    function Cp(t, e, n) {
      return n < 0 && (n += 1), n > 1 && (n -= 1), n < 1 / 6 ? t + 6 * (e - t) * n : n < .5 ? e : n < 2 / 3 ? t + 6 * (e - t) * (2 / 3 - n) : t
    }
    class Pp {
      constructor(t, e, n) {
        return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(t, e, n)
      }
      set(t, e, n) {
        if (void 0 === e && void 0 === n) {
          const e = t;
          e && e.isColor ? this.copy(e) : "number" == typeof e ? this.setHex(e) : "string" == typeof e && this.setStyle(e)
        } else this.setRGB(t, e, n);
        return this
      }
      setScalar(t) {
        return this.r = t, this.g = t, this.b = t, this
      }
      setHex(t, e = zd) {
        return t = Math.floor(t), this.r = (t >> 16 & 255) / 255, this.g = (t >> 8 & 255) / 255, this.b = (255 & t) / 255, mp.toWorkingColorSpace(this, e), this
      }
      setRGB(t, e, n, i = mp.workingColorSpace) {
        return this.r = t, this.g = e, this.b = n, mp.toWorkingColorSpace(this, i), this
      }
      setHSL(t, e, n, i = mp.workingColorSpace) {
        if (t = function(t, e) {
            return (t % e + e) % e
          }(t, 1), e = ap(e, 0, 1), n = ap(n, 0, 1), 0 === e) this.r = this.g = this.b = n;
        else {
          const i = n <= .5 ? n * (1 + e) : n + e - n * e,
            r = 2 * n - i;
          this.r = Cp(r, i, t + 1 / 3), this.g = Cp(r, i, t), this.b = Cp(r, i, t - 1 / 3)
        }
        return mp.toWorkingColorSpace(this, i), this
      }
      setStyle(t, e = zd) {
        function n(e) {
          void 0 !== e && parseFloat(e) < 1 && console.warn("THREE.Color: Alpha component of " + t + " will be ignored.")
        }
        let i;
        if (i = /^(\w+)\(([^\)]*)\)/.exec(t)) {
          let r;
          const a = i[1],
            s = i[2];
          switch (a) {
            case "rgb":
            case "rgba":
              if (r = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s)) return n(r[4]), this.setRGB(Math.min(255, parseInt(r[1], 10)) / 255, Math.min(255, parseInt(r[2], 10)) / 255, Math.min(255, parseInt(r[3], 10)) / 255, e);
              if (r = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s)) return n(r[4]), this.setRGB(Math.min(100, parseInt(r[1], 10)) / 100, Math.min(100, parseInt(r[2], 10)) / 100, Math.min(100, parseInt(r[3], 10)) / 100, e);
              break;
            case "hsl":
            case "hsla":
              if (r = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s)) return n(r[4]), this.setHSL(parseFloat(r[1]) / 360, parseFloat(r[2]) / 100, parseFloat(r[3]) / 100, e);
              break;
            default:
              console.warn("THREE.Color: Unknown color model " + t)
          }
        } else if (i = /^\#([A-Fa-f\d]+)$/.exec(t)) {
          const n = i[1],
            r = n.length;
          if (3 === r) return this.setRGB(parseInt(n.charAt(0), 16) / 15, parseInt(n.charAt(1), 16) / 15, parseInt(n.charAt(2), 16) / 15, e);
          if (6 === r) return this.setHex(parseInt(n, 16), e);
          console.warn("THREE.Color: Invalid hex color " + t)
        } else if (t && t.length > 0) return this.setColorName(t, e);
        return this
      }
      setColorName(t, e = zd) {
        const n = wp[t.toLowerCase()];
        return void 0 !== n ? this.setHex(n, e) : console.warn("THREE.Color: Unknown color " + t), this
      }
      clone() {
        return new this.constructor(this.r, this.g, this.b)
      }
      copy(t) {
        return this.r = t.r, this.g = t.g, this.b = t.b, this
      }
      copySRGBToLinear(t) {
        return this.r = gp(t.r), this.g = gp(t.g), this.b = gp(t.b), this
      }
      copyLinearToSRGB(t) {
        return this.r = _p(t.r), this.g = _p(t.g), this.b = _p(t.b), this
      }
      convertSRGBToLinear() {
        return this.copySRGBToLinear(this), this
      }
      convertLinearToSRGB() {
        return this.copyLinearToSRGB(this), this
      }
      getHex(t = zd) {
        return mp.fromWorkingColorSpace(Dp.copy(this), t), 65536 * Math.round(ap(255 * Dp.r, 0, 255)) + 256 * Math.round(ap(255 * Dp.g, 0, 255)) + Math.round(ap(255 * Dp.b, 0, 255))
      }
      getHexString(t = zd) {
        return ("000000" + this.getHex(t).toString(16)).slice(-6)
      }
      getHSL(t, e = mp.workingColorSpace) {
        mp.fromWorkingColorSpace(Dp.copy(this), e);
        const n = Dp.r,
          i = Dp.g,
          r = Dp.b,
          a = Math.max(n, i, r),
          s = Math.min(n, i, r);
        let o, l;
        const c = (s + a) / 2;
        if (s === a) o = 0, l = 0;
        else {
          const t = a - s;
          switch (l = c <= .5 ? t / (a + s) : t / (2 - a - s), a) {
            case n:
              o = (i - r) / t + (i < r ? 6 : 0);
              break;
            case i:
              o = (r - n) / t + 2;
              break;
            case r:
              o = (n - i) / t + 4
          }
          o /= 6
        }
        return t.h = o, t.s = l, t.l = c, t
      }
      getRGB(t, e = mp.workingColorSpace) {
        return mp.fromWorkingColorSpace(Dp.copy(this), e), t.r = Dp.r, t.g = Dp.g, t.b = Dp.b, t
      }
      getStyle(t = zd) {
        mp.fromWorkingColorSpace(Dp.copy(this), t);
        const e = Dp.r,
          n = Dp.g,
          i = Dp.b;
        return t !== zd ? `color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})` : `rgb(${Math.round(255*e)},${Math.round(255*n)},${Math.round(255*i)})`
      }
      offsetHSL(t, e, n) {
        return this.getHSL(Ap), this.setHSL(Ap.h + t, Ap.s + e, Ap.l + n)
      }
      add(t) {
        return this.r += t.r, this.g += t.g, this.b += t.b, this
      }
      addColors(t, e) {
        return this.r = t.r + e.r, this.g = t.g + e.g, this.b = t.b + e.b, this
      }
      addScalar(t) {
        return this.r += t, this.g += t, this.b += t, this
      }
      sub(t) {
        return this.r = Math.max(0, this.r - t.r), this.g = Math.max(0, this.g - t.g), this.b = Math.max(0, this.b - t.b), this
      }
      multiply(t) {
        return this.r *= t.r, this.g *= t.g, this.b *= t.b, this
      }
      multiplyScalar(t) {
        return this.r *= t, this.g *= t, this.b *= t, this
      }
      lerp(t, e) {
        return this.r += (t.r - this.r) * e, this.g += (t.g - this.g) * e, this.b += (t.b - this.b) * e, this
      }
      lerpColors(t, e, n) {
        return this.r = t.r + (e.r - t.r) * n, this.g = t.g + (e.g - t.g) * n, this.b = t.b + (e.b - t.b) * n, this
      }
      lerpHSL(t, e) {
        this.getHSL(Ap), t.getHSL(Rp);
        const n = sp(Ap.h, Rp.h, e),
          i = sp(Ap.s, Rp.s, e),
          r = sp(Ap.l, Rp.l, e);
        return this.setHSL(n, i, r), this
      }
      setFromVector3(t) {
        return this.r = t.x, this.g = t.y, this.b = t.z, this
      }
      applyMatrix3(t) {
        const e = this.r,
          n = this.g,
          i = this.b,
          r = t.elements;
        return this.r = r[0] * e + r[3] * n + r[6] * i, this.g = r[1] * e + r[4] * n + r[7] * i, this.b = r[2] * e + r[5] * n + r[8] * i, this
      }
      equals(t) {
        return t.r === this.r && t.g === this.g && t.b === this.b
      }
      fromArray(t, e = 0) {
        return this.r = t[e], this.g = t[e + 1], this.b = t[e + 2], this
      }
      toArray(t = [], e = 0) {
        return t[e] = this.r, t[e + 1] = this.g, t[e + 2] = this.b, t
      }
      fromBufferAttribute(t, e) {
        return this.r = t.getX(e), this.g = t.getY(e), this.b = t.getZ(e), this
      }
      toJSON() {
        return this.getHex()
      }*[Symbol.iterator]() {
        yield this.r, yield this.g, yield this.b
      }
    }
    const Dp = new Pp;
    Pp.NAMES = wp;
    const Lp = {
      width: 100,
      height: 100,
      halfWidth: 50,
      halfHeight: 50,
      sceneWidth: 2,
      sceneHeight: 2,
      dpr: 1,
      aspectRatio: 1
    };
    class Ip {
      constructor(t = 0, e = 0, n = 0, i = 1) {
        this.isQuaternion = !0, this._x = t, this._y = e, this._z = n, this._w = i
      }
      static slerpFlat(t, e, n, i, r, a, s) {
        let o = n[i + 0],
          l = n[i + 1],
          c = n[i + 2],
          u = n[i + 3];
        const h = r[a + 0],
          d = r[a + 1],
          p = r[a + 2],
          f = r[a + 3];
        if (0 === s) return t[e + 0] = o, t[e + 1] = l, t[e + 2] = c, void(t[e + 3] = u);
        if (1 === s) return t[e + 0] = h, t[e + 1] = d, t[e + 2] = p, void(t[e + 3] = f);
        if (u !== f || o !== h || l !== d || c !== p) {
          let t = 1 - s;
          const e = o * h + l * d + c * p + u * f,
            n = e >= 0 ? 1 : -1,
            i = 1 - e * e;
          if (i > Number.EPSILON) {
            const r = Math.sqrt(i),
              a = Math.atan2(r, e * n);
            t = Math.sin(t * a) / r, s = Math.sin(s * a) / r
          }
          const r = s * n;
          if (o = o * t + h * r, l = l * t + d * r, c = c * t + p * r, u = u * t + f * r, t === 1 - s) {
            const t = 1 / Math.sqrt(o * o + l * l + c * c + u * u);
            o *= t, l *= t, c *= t, u *= t
          }
        }
        t[e] = o, t[e + 1] = l, t[e + 2] = c, t[e + 3] = u
      }
      static multiplyQuaternionsFlat(t, e, n, i, r, a) {
        const s = n[i],
          o = n[i + 1],
          l = n[i + 2],
          c = n[i + 3],
          u = r[a],
          h = r[a + 1],
          d = r[a + 2],
          p = r[a + 3];
        return t[e] = s * p + c * u + o * d - l * h, t[e + 1] = o * p + c * h + l * u - s * d, t[e + 2] = l * p + c * d + s * h - o * u, t[e + 3] = c * p - s * u - o * h - l * d, t
      }
      get x() {
        return this._x
      }
      set x(t) {
        this._x = t, this._onChangeCallback()
      }
      get y() {
        return this._y
      }
      set y(t) {
        this._y = t, this._onChangeCallback()
      }
      get z() {
        return this._z
      }
      set z(t) {
        this._z = t, this._onChangeCallback()
      }
      get w() {
        return this._w
      }
      set w(t) {
        this._w = t, this._onChangeCallback()
      }
      set(t, e, n, i) {
        return this._x = t, this._y = e, this._z = n, this._w = i, this._onChangeCallback(), this
      }
      clone() {
        return new this.constructor(this._x, this._y, this._z, this._w)
      }
      copy(t) {
        return this._x = t.x, this._y = t.y, this._z = t.z, this._w = t.w, this._onChangeCallback(), this
      }
      setFromEuler(t, e = !0) {
        const n = t._x,
          i = t._y,
          r = t._z,
          a = t._order,
          s = Math.cos,
          o = Math.sin,
          l = s(n / 2),
          c = s(i / 2),
          u = s(r / 2),
          h = o(n / 2),
          d = o(i / 2),
          p = o(r / 2);
        switch (a) {
          case "XYZ":
            this._x = h * c * u + l * d * p, this._y = l * d * u - h * c * p, this._z = l * c * p + h * d * u, this._w = l * c * u - h * d * p;
            break;
          case "YXZ":
            this._x = h * c * u + l * d * p, this._y = l * d * u - h * c * p, this._z = l * c * p - h * d * u, this._w = l * c * u + h * d * p;
            break;
          case "ZXY":
            this._x = h * c * u - l * d * p, this._y = l * d * u + h * c * p, this._z = l * c * p + h * d * u, this._w = l * c * u - h * d * p;
            break;
          case "ZYX":
            this._x = h * c * u - l * d * p, this._y = l * d * u + h * c * p, this._z = l * c * p - h * d * u, this._w = l * c * u + h * d * p;
            break;
          case "YZX":
            this._x = h * c * u + l * d * p, this._y = l * d * u + h * c * p, this._z = l * c * p - h * d * u, this._w = l * c * u - h * d * p;
            break;
          case "XZY":
            this._x = h * c * u - l * d * p, this._y = l * d * u - h * c * p, this._z = l * c * p + h * d * u, this._w = l * c * u + h * d * p;
            break;
          default:
            console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + a)
        }
        return !0 === e && this._onChangeCallback(), this
      }
      setFromAxisAngle(t, e) {
        const n = e / 2,
          i = Math.sin(n);
        return this._x = t.x * i, this._y = t.y * i, this._z = t.z * i, this._w = Math.cos(n), this._onChangeCallback(), this
      }
      setFromRotationMatrix(t) {
        const e = t.elements,
          n = e[0],
          i = e[4],
          r = e[8],
          a = e[1],
          s = e[5],
          o = e[9],
          l = e[2],
          c = e[6],
          u = e[10],
          h = n + s + u;
        if (h > 0) {
          const t = .5 / Math.sqrt(h + 1);
          this._w = .25 / t, this._x = (c - o) * t, this._y = (r - l) * t, this._z = (a - i) * t
        } else if (n > s && n > u) {
          const t = 2 * Math.sqrt(1 + n - s - u);
          this._w = (c - o) / t, this._x = .25 * t, this._y = (i + a) / t, this._z = (r + l) / t
        } else if (s > u) {
          const t = 2 * Math.sqrt(1 + s - n - u);
          this._w = (r - l) / t, this._x = (i + a) / t, this._y = .25 * t, this._z = (o + c) / t
        } else {
          const t = 2 * Math.sqrt(1 + u - n - s);
          this._w = (a - i) / t, this._x = (r + l) / t, this._y = (o + c) / t, this._z = .25 * t
        }
        return this._onChangeCallback(), this
      }
      setFromUnitVectors(t, e) {
        let n = t.dot(e) + 1;
        return n < Number.EPSILON ? (n = 0, Math.abs(t.x) > Math.abs(t.z) ? (this._x = -t.y, this._y = t.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -t.z, this._z = t.y, this._w = n)) : (this._x = t.y * e.z - t.z * e.y, this._y = t.z * e.x - t.x * e.z, this._z = t.x * e.y - t.y * e.x, this._w = n), this.normalize()
      }
      angleTo(t) {
        return 2 * Math.acos(Math.abs(ap(this.dot(t), -1, 1)))
      }
      rotateTowards(t, e) {
        const n = this.angleTo(t);
        if (0 === n) return this;
        const i = Math.min(1, e / n);
        return this.slerp(t, i), this
      }
      identity() {
        return this.set(0, 0, 0, 1)
      }
      invert() {
        return this.conjugate()
      }
      conjugate() {
        return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this
      }
      dot(t) {
        return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w
      }
      lengthSq() {
        return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
      }
      length() {
        return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
      }
      normalize() {
        let t = this.length();
        return 0 === t ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (t = 1 / t, this._x = this._x * t, this._y = this._y * t, this._z = this._z * t, this._w = this._w * t), this._onChangeCallback(), this
      }
      multiply(t) {
        return this.multiplyQuaternions(this, t)
      }
      premultiply(t) {
        return this.multiplyQuaternions(t, this)
      }
      multiplyQuaternions(t, e) {
        const n = t._x,
          i = t._y,
          r = t._z,
          a = t._w,
          s = e._x,
          o = e._y,
          l = e._z,
          c = e._w;
        return this._x = n * c + a * s + i * l - r * o, this._y = i * c + a * o + r * s - n * l, this._z = r * c + a * l + n * o - i * s, this._w = a * c - n * s - i * o - r * l, this._onChangeCallback(), this
      }
      slerp(t, e) {
        if (0 === e) return this;
        if (1 === e) return this.copy(t);
        const n = this._x,
          i = this._y,
          r = this._z,
          a = this._w;
        let s = a * t._w + n * t._x + i * t._y + r * t._z;
        if (s < 0 ? (this._w = -t._w, this._x = -t._x, this._y = -t._y, this._z = -t._z, s = -s) : this.copy(t), s >= 1) return this._w = a, this._x = n, this._y = i, this._z = r, this;
        const o = 1 - s * s;
        if (o <= Number.EPSILON) {
          const t = 1 - e;
          return this._w = t * a + e * this._w, this._x = t * n + e * this._x, this._y = t * i + e * this._y, this._z = t * r + e * this._z, this.normalize(), this
        }
        const l = Math.sqrt(o),
          c = Math.atan2(l, s),
          u = Math.sin((1 - e) * c) / l,
          h = Math.sin(e * c) / l;
        return this._w = a * u + this._w * h, this._x = n * u + this._x * h, this._y = i * u + this._y * h, this._z = r * u + this._z * h, this._onChangeCallback(), this
      }
      slerpQuaternions(t, e, n) {
        return this.copy(t).slerp(e, n)
      }
      random() {
        const t = 2 * Math.PI * Math.random(),
          e = 2 * Math.PI * Math.random(),
          n = Math.random(),
          i = Math.sqrt(1 - n),
          r = Math.sqrt(n);
        return this.set(i * Math.sin(t), i * Math.cos(t), r * Math.sin(e), r * Math.cos(e))
      }
      equals(t) {
        return t._x === this._x && t._y === this._y && t._z === this._z && t._w === this._w
      }
      fromArray(t, e = 0) {
        return this._x = t[e], this._y = t[e + 1], this._z = t[e + 2], this._w = t[e + 3], this._onChangeCallback(), this
      }
      toArray(t = [], e = 0) {
        return t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._w, t
      }
      fromBufferAttribute(t, e) {
        return this._x = t.getX(e), this._y = t.getY(e), this._z = t.getZ(e), this._w = t.getW(e), this._onChangeCallback(), this
      }
      toJSON() {
        return this.toArray()
      }
      _onChange(t) {
        return this._onChangeCallback = t, this
      }
      _onChangeCallback() {}*[Symbol.iterator]() {
        yield this._x, yield this._y, yield this._z, yield this._w
      }
    }
    class Up {
      constructor(t = 0, e = 0, n = 0) {
        Up.prototype.isVector3 = !0, this.x = t, this.y = e, this.z = n
      }
      set(t, e, n) {
        return void 0 === n && (n = this.z), this.x = t, this.y = e, this.z = n, this
      }
      setScalar(t) {
        return this.x = t, this.y = t, this.z = t, this
      }
      setX(t) {
        return this.x = t, this
      }
      setY(t) {
        return this.y = t, this
      }
      setZ(t) {
        return this.z = t, this
      }
      setComponent(t, e) {
        switch (t) {
          case 0:
            this.x = e;
            break;
          case 1:
            this.y = e;
            break;
          case 2:
            this.z = e;
            break;
          default:
            throw new Error("index is out of range: " + t)
        }
        return this
      }
      getComponent(t) {
        switch (t) {
          case 0:
            return this.x;
          case 1:
            return this.y;
          case 2:
            return this.z;
          default:
            throw new Error("index is out of range: " + t)
        }
      }
      clone() {
        return new this.constructor(this.x, this.y, this.z)
      }
      copy(t) {
        return this.x = t.x, this.y = t.y, this.z = t.z, this
      }
      add(t) {
        return this.x += t.x, this.y += t.y, this.z += t.z, this
      }
      addScalar(t) {
        return this.x += t, this.y += t, this.z += t, this
      }
      addVectors(t, e) {
        return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this
      }
      addScaledVector(t, e) {
        return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this
      }
      sub(t) {
        return this.x -= t.x, this.y -= t.y, this.z -= t.z, this
      }
      subScalar(t) {
        return this.x -= t, this.y -= t, this.z -= t, this
      }
      subVectors(t, e) {
        return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this
      }
      multiply(t) {
        return this.x *= t.x, this.y *= t.y, this.z *= t.z, this
      }
      multiplyScalar(t) {
        return this.x *= t, this.y *= t, this.z *= t, this
      }
      multiplyVectors(t, e) {
        return this.x = t.x * e.x, this.y = t.y * e.y, this.z = t.z * e.z, this
      }
      applyEuler(t) {
        return this.applyQuaternion(Op.setFromEuler(t))
      }
      applyAxisAngle(t, e) {
        return this.applyQuaternion(Op.setFromAxisAngle(t, e))
      }
      applyMatrix3(t) {
        const e = this.x,
          n = this.y,
          i = this.z,
          r = t.elements;
        return this.x = r[0] * e + r[3] * n + r[6] * i, this.y = r[1] * e + r[4] * n + r[7] * i, this.z = r[2] * e + r[5] * n + r[8] * i, this
      }
      applyNormalMatrix(t) {
        return this.applyMatrix3(t).normalize()
      }
      applyMatrix4(t) {
        const e = this.x,
          n = this.y,
          i = this.z,
          r = t.elements,
          a = 1 / (r[3] * e + r[7] * n + r[11] * i + r[15]);
        return this.x = (r[0] * e + r[4] * n + r[8] * i + r[12]) * a, this.y = (r[1] * e + r[5] * n + r[9] * i + r[13]) * a, this.z = (r[2] * e + r[6] * n + r[10] * i + r[14]) * a, this
      }
      applyQuaternion(t) {
        const e = this.x,
          n = this.y,
          i = this.z,
          r = t.x,
          a = t.y,
          s = t.z,
          o = t.w,
          l = 2 * (a * i - s * n),
          c = 2 * (s * e - r * i),
          u = 2 * (r * n - a * e);
        return this.x = e + o * l + a * u - s * c, this.y = n + o * c + s * l - r * u, this.z = i + o * u + r * c - a * l, this
      }
      project(t) {
        return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)
      }
      unproject(t) {
        return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)
      }
      transformDirection(t) {
        const e = this.x,
          n = this.y,
          i = this.z,
          r = t.elements;
        return this.x = r[0] * e + r[4] * n + r[8] * i, this.y = r[1] * e + r[5] * n + r[9] * i, this.z = r[2] * e + r[6] * n + r[10] * i, this.normalize()
      }
      divide(t) {
        return this.x /= t.x, this.y /= t.y, this.z /= t.z, this
      }
      divideScalar(t) {
        return this.multiplyScalar(1 / t)
      }
      min(t) {
        return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this
      }
      max(t) {
        return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this
      }
      clamp(t, e) {
        return this.x = ap(this.x, t.x, e.x), this.y = ap(this.y, t.y, e.y), this.z = ap(this.z, t.z, e.z), this
      }
      clampScalar(t, e) {
        return this.x = ap(this.x, t, e), this.y = ap(this.y, t, e), this.z = ap(this.z, t, e), this
      }
      clampLength(t, e) {
        const n = this.length();
        return this.divideScalar(n || 1).multiplyScalar(ap(n, t, e))
      }
      floor() {
        return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this
      }
      ceil() {
        return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this
      }
      round() {
        return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this
      }
      roundToZero() {
        return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this
      }
      negate() {
        return this.x = -this.x, this.y = -this.y, this.z = -this.z, this
      }
      dot(t) {
        return this.x * t.x + this.y * t.y + this.z * t.z
      }
      lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z
      }
      length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
      }
      manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
      }
      normalize() {
        return this.divideScalar(this.length() || 1)
      }
      setLength(t) {
        return this.normalize().multiplyScalar(t)
      }
      lerp(t, e) {
        return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this
      }
      lerpVectors(t, e, n) {
        return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this.z = t.z + (e.z - t.z) * n, this
      }
      cross(t) {
        return this.crossVectors(this, t)
      }
      crossVectors(t, e) {
        const n = t.x,
          i = t.y,
          r = t.z,
          a = e.x,
          s = e.y,
          o = e.z;
        return this.x = i * o - r * s, this.y = r * a - n * o, this.z = n * s - i * a, this
      }
      projectOnVector(t) {
        const e = t.lengthSq();
        if (0 === e) return this.set(0, 0, 0);
        const n = t.dot(this) / e;
        return this.copy(t).multiplyScalar(n)
      }
      projectOnPlane(t) {
        return Np.copy(this).projectOnVector(t), this.sub(Np)
      }
      reflect(t) {
        return this.sub(Np.copy(t).multiplyScalar(2 * this.dot(t)))
      }
      angleTo(t) {
        const e = Math.sqrt(this.lengthSq() * t.lengthSq());
        if (0 === e) return Math.PI / 2;
        const n = this.dot(t) / e;
        return Math.acos(ap(n, -1, 1))
      }
      distanceTo(t) {
        return Math.sqrt(this.distanceToSquared(t))
      }
      distanceToSquared(t) {
        const e = this.x - t.x,
          n = this.y - t.y,
          i = this.z - t.z;
        return e * e + n * n + i * i
      }
      manhattanDistanceTo(t) {
        return Math.abs(this.x - t.x) + Math.abs(this.y - t.y) + Math.abs(this.z - t.z)
      }
      setFromSpherical(t) {
        return this.setFromSphericalCoords(t.radius, t.phi, t.theta)
      }
      setFromSphericalCoords(t, e, n) {
        const i = Math.sin(e) * t;
        return this.x = i * Math.sin(n), this.y = Math.cos(e) * t, this.z = i * Math.cos(n), this
      }
      setFromCylindrical(t) {
        return this.setFromCylindricalCoords(t.radius, t.theta, t.y)
      }
      setFromCylindricalCoords(t, e, n) {
        return this.x = t * Math.sin(e), this.y = n, this.z = t * Math.cos(e), this
      }
      setFromMatrixPosition(t) {
        const e = t.elements;
        return this.x = e[12], this.y = e[13], this.z = e[14], this
      }
      setFromMatrixScale(t) {
        const e = this.setFromMatrixColumn(t, 0).length(),
          n = this.setFromMatrixColumn(t, 1).length(),
          i = this.setFromMatrixColumn(t, 2).length();
        return this.x = e, this.y = n, this.z = i, this
      }
      setFromMatrixColumn(t, e) {
        return this.fromArray(t.elements, 4 * e)
      }
      setFromMatrix3Column(t, e) {
        return this.fromArray(t.elements, 3 * e)
      }
      setFromEuler(t) {
        return this.x = t._x, this.y = t._y, this.z = t._z, this
      }
      setFromColor(t) {
        return this.x = t.r, this.y = t.g, this.z = t.b, this
      }
      equals(t) {
        return t.x === this.x && t.y === this.y && t.z === this.z
      }
      fromArray(t, e = 0) {
        return this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this
      }
      toArray(t = [], e = 0) {
        return t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t
      }
      fromBufferAttribute(t, e) {
        return this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this
      }
      random() {
        return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this
      }
      randomDirection() {
        const t = Math.random() * Math.PI * 2,
          e = 2 * Math.random() - 1,
          n = Math.sqrt(1 - e * e);
        return this.x = n * Math.cos(t), this.y = e, this.z = n * Math.sin(t), this
      }*[Symbol.iterator]() {
        yield this.x, yield this.y, yield this.z
      }
    }
    const Np = new Up,
      Op = new Ip;
    class Fp {
      constructor(t, e, n, i, r, a, s, o, l, c, u, h, d, p, f, m) {
        Fp.prototype.isMatrix4 = !0, this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], void 0 !== t && this.set(t, e, n, i, r, a, s, o, l, c, u, h, d, p, f, m)
      }
      set(t, e, n, i, r, a, s, o, l, c, u, h, d, p, f, m) {
        const g = this.elements;
        return g[0] = t, g[4] = e, g[8] = n, g[12] = i, g[1] = r, g[5] = a, g[9] = s, g[13] = o, g[2] = l, g[6] = c, g[10] = u, g[14] = h, g[3] = d, g[7] = p, g[11] = f, g[15] = m, this
      }
      identity() {
        return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
      }
      clone() {
        return (new Fp).fromArray(this.elements)
      }
      copy(t) {
        const e = this.elements,
          n = t.elements;
        return e[0] = n[0], e[1] = n[1], e[2] = n[2], e[3] = n[3], e[4] = n[4], e[5] = n[5], e[6] = n[6], e[7] = n[7], e[8] = n[8], e[9] = n[9], e[10] = n[10], e[11] = n[11], e[12] = n[12], e[13] = n[13], e[14] = n[14], e[15] = n[15], this
      }
      copyPosition(t) {
        const e = this.elements,
          n = t.elements;
        return e[12] = n[12], e[13] = n[13], e[14] = n[14], this
      }
      setFromMatrix3(t) {
        const e = t.elements;
        return this.set(e[0], e[3], e[6], 0, e[1], e[4], e[7], 0, e[2], e[5], e[8], 0, 0, 0, 0, 1), this
      }
      extractBasis(t, e, n) {
        return t.setFromMatrixColumn(this, 0), e.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this
      }
      makeBasis(t, e, n) {
        return this.set(t.x, e.x, n.x, 0, t.y, e.y, n.y, 0, t.z, e.z, n.z, 0, 0, 0, 0, 1), this
      }
      extractRotation(t) {
        const e = this.elements,
          n = t.elements,
          i = 1 / Bp.setFromMatrixColumn(t, 0).length(),
          r = 1 / Bp.setFromMatrixColumn(t, 1).length(),
          a = 1 / Bp.setFromMatrixColumn(t, 2).length();
        return e[0] = n[0] * i, e[1] = n[1] * i, e[2] = n[2] * i, e[3] = 0, e[4] = n[4] * r, e[5] = n[5] * r, e[6] = n[6] * r, e[7] = 0, e[8] = n[8] * a, e[9] = n[9] * a, e[10] = n[10] * a, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this
      }
      makeRotationFromEuler(t) {
        const e = this.elements,
          n = t.x,
          i = t.y,
          r = t.z,
          a = Math.cos(n),
          s = Math.sin(n),
          o = Math.cos(i),
          l = Math.sin(i),
          c = Math.cos(r),
          u = Math.sin(r);
        if ("XYZ" === t.order) {
          const t = a * c,
            n = a * u,
            i = s * c,
            r = s * u;
          e[0] = o * c, e[4] = -o * u, e[8] = l, e[1] = n + i * l, e[5] = t - r * l, e[9] = -s * o, e[2] = r - t * l, e[6] = i + n * l, e[10] = a * o
        } else if ("YXZ" === t.order) {
          const t = o * c,
            n = o * u,
            i = l * c,
            r = l * u;
          e[0] = t + r * s, e[4] = i * s - n, e[8] = a * l, e[1] = a * u, e[5] = a * c, e[9] = -s, e[2] = n * s - i, e[6] = r + t * s, e[10] = a * o
        } else if ("ZXY" === t.order) {
          const t = o * c,
            n = o * u,
            i = l * c,
            r = l * u;
          e[0] = t - r * s, e[4] = -a * u, e[8] = i + n * s, e[1] = n + i * s, e[5] = a * c, e[9] = r - t * s, e[2] = -a * l, e[6] = s, e[10] = a * o
        } else if ("ZYX" === t.order) {
          const t = a * c,
            n = a * u,
            i = s * c,
            r = s * u;
          e[0] = o * c, e[4] = i * l - n, e[8] = t * l + r, e[1] = o * u, e[5] = r * l + t, e[9] = n * l - i, e[2] = -l, e[6] = s * o, e[10] = a * o
        } else if ("YZX" === t.order) {
          const t = a * o,
            n = a * l,
            i = s * o,
            r = s * l;
          e[0] = o * c, e[4] = r - t * u, e[8] = i * u + n, e[1] = u, e[5] = a * c, e[9] = -s * c, e[2] = -l * c, e[6] = n * u + i, e[10] = t - r * u
        } else if ("XZY" === t.order) {
          const t = a * o,
            n = a * l,
            i = s * o,
            r = s * l;
          e[0] = o * c, e[4] = -u, e[8] = l * c, e[1] = t * u + r, e[5] = a * c, e[9] = n * u - i, e[2] = i * u - n, e[6] = s * c, e[10] = r * u + t
        }
        return e[3] = 0, e[7] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, this
      }
      makeRotationFromQuaternion(t) {
        return this.compose(kp, t, Hp)
      }
      lookAt(t, e, n) {
        const i = this.elements;
        return Wp.subVectors(t, e), 0 === Wp.lengthSq() && (Wp.z = 1), Wp.normalize(), Vp.crossVectors(n, Wp), 0 === Vp.lengthSq() && (1 === Math.abs(n.z) ? Wp.x += 1e-4 : Wp.z += 1e-4, Wp.normalize(), Vp.crossVectors(n, Wp)), Vp.normalize(), Gp.crossVectors(Wp, Vp), i[0] = Vp.x, i[4] = Gp.x, i[8] = Wp.x, i[1] = Vp.y, i[5] = Gp.y, i[9] = Wp.y, i[2] = Vp.z, i[6] = Gp.z, i[10] = Wp.z, this
      }
      multiply(t) {
        return this.multiplyMatrices(this, t)
      }
      premultiply(t) {
        return this.multiplyMatrices(t, this)
      }
      multiplyMatrices(t, e) {
        const n = t.elements,
          i = e.elements,
          r = this.elements,
          a = n[0],
          s = n[4],
          o = n[8],
          l = n[12],
          c = n[1],
          u = n[5],
          h = n[9],
          d = n[13],
          p = n[2],
          f = n[6],
          m = n[10],
          g = n[14],
          _ = n[3],
          v = n[7],
          x = n[11],
          y = n[15],
          b = i[0],
          M = i[4],
          S = i[8],
          E = i[12],
          T = i[1],
          w = i[5],
          A = i[9],
          R = i[13],
          C = i[2],
          P = i[6],
          D = i[10],
          L = i[14],
          I = i[3],
          U = i[7],
          N = i[11],
          O = i[15];
        return r[0] = a * b + s * T + o * C + l * I, r[4] = a * M + s * w + o * P + l * U, r[8] = a * S + s * A + o * D + l * N, r[12] = a * E + s * R + o * L + l * O, r[1] = c * b + u * T + h * C + d * I, r[5] = c * M + u * w + h * P + d * U, r[9] = c * S + u * A + h * D + d * N, r[13] = c * E + u * R + h * L + d * O, r[2] = p * b + f * T + m * C + g * I, r[6] = p * M + f * w + m * P + g * U, r[10] = p * S + f * A + m * D + g * N, r[14] = p * E + f * R + m * L + g * O, r[3] = _ * b + v * T + x * C + y * I, r[7] = _ * M + v * w + x * P + y * U, r[11] = _ * S + v * A + x * D + y * N, r[15] = _ * E + v * R + x * L + y * O, this
      }
      multiplyScalar(t) {
        const e = this.elements;
        return e[0] *= t, e[4] *= t, e[8] *= t, e[12] *= t, e[1] *= t, e[5] *= t, e[9] *= t, e[13] *= t, e[2] *= t, e[6] *= t, e[10] *= t, e[14] *= t, e[3] *= t, e[7] *= t, e[11] *= t, e[15] *= t, this
      }
      determinant() {
        const t = this.elements,
          e = t[0],
          n = t[4],
          i = t[8],
          r = t[12],
          a = t[1],
          s = t[5],
          o = t[9],
          l = t[13],
          c = t[2],
          u = t[6],
          h = t[10],
          d = t[14];
        return t[3] * (+r * o * u - i * l * u - r * s * h + n * l * h + i * s * d - n * o * d) + t[7] * (+e * o * d - e * l * h + r * a * h - i * a * d + i * l * c - r * o * c) + t[11] * (+e * l * u - e * s * d - r * a * u + n * a * d + r * s * c - n * l * c) + t[15] * (-i * s * c - e * o * u + e * s * h + i * a * u - n * a * h + n * o * c)
      }
      transpose() {
        const t = this.elements;
        let e;
        return e = t[1], t[1] = t[4], t[4] = e, e = t[2], t[2] = t[8], t[8] = e, e = t[6], t[6] = t[9], t[9] = e, e = t[3], t[3] = t[12], t[12] = e, e = t[7], t[7] = t[13], t[13] = e, e = t[11], t[11] = t[14], t[14] = e, this
      }
      setPosition(t, e, n) {
        const i = this.elements;
        return t.isVector3 ? (i[12] = t.x, i[13] = t.y, i[14] = t.z) : (i[12] = t, i[13] = e, i[14] = n), this
      }
      invert() {
        const t = this.elements,
          e = t[0],
          n = t[1],
          i = t[2],
          r = t[3],
          a = t[4],
          s = t[5],
          o = t[6],
          l = t[7],
          c = t[8],
          u = t[9],
          h = t[10],
          d = t[11],
          p = t[12],
          f = t[13],
          m = t[14],
          g = t[15],
          _ = u * m * l - f * h * l + f * o * d - s * m * d - u * o * g + s * h * g,
          v = p * h * l - c * m * l - p * o * d + a * m * d + c * o * g - a * h * g,
          x = c * f * l - p * u * l + p * s * d - a * f * d - c * s * g + a * u * g,
          y = p * u * o - c * f * o - p * s * h + a * f * h + c * s * m - a * u * m,
          b = e * _ + n * v + i * x + r * y;
        if (0 === b) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        const M = 1 / b;
        return t[0] = _ * M, t[1] = (f * h * r - u * m * r - f * i * d + n * m * d + u * i * g - n * h * g) * M, t[2] = (s * m * r - f * o * r + f * i * l - n * m * l - s * i * g + n * o * g) * M, t[3] = (u * o * r - s * h * r - u * i * l + n * h * l + s * i * d - n * o * d) * M, t[4] = v * M, t[5] = (c * m * r - p * h * r + p * i * d - e * m * d - c * i * g + e * h * g) * M, t[6] = (p * o * r - a * m * r - p * i * l + e * m * l + a * i * g - e * o * g) * M, t[7] = (a * h * r - c * o * r + c * i * l - e * h * l - a * i * d + e * o * d) * M, t[8] = x * M, t[9] = (p * u * r - c * f * r - p * n * d + e * f * d + c * n * g - e * u * g) * M, t[10] = (a * f * r - p * s * r + p * n * l - e * f * l - a * n * g + e * s * g) * M, t[11] = (c * s * r - a * u * r - c * n * l + e * u * l + a * n * d - e * s * d) * M, t[12] = y * M, t[13] = (c * f * i - p * u * i + p * n * h - e * f * h - c * n * m + e * u * m) * M, t[14] = (p * s * i - a * f * i - p * n * o + e * f * o + a * n * m - e * s * m) * M, t[15] = (a * u * i - c * s * i + c * n * o - e * u * o - a * n * h + e * s * h) * M, this
      }
      scale(t) {
        const e = this.elements,
          n = t.x,
          i = t.y,
          r = t.z;
        return e[0] *= n, e[4] *= i, e[8] *= r, e[1] *= n, e[5] *= i, e[9] *= r, e[2] *= n, e[6] *= i, e[10] *= r, e[3] *= n, e[7] *= i, e[11] *= r, this
      }
      getMaxScaleOnAxis() {
        const t = this.elements,
          e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2],
          n = t[4] * t[4] + t[5] * t[5] + t[6] * t[6],
          i = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
        return Math.sqrt(Math.max(e, n, i))
      }
      makeTranslation(t, e, n) {
        return t.isVector3 ? this.set(1, 0, 0, t.x, 0, 1, 0, t.y, 0, 0, 1, t.z, 0, 0, 0, 1) : this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, n, 0, 0, 0, 1), this
      }
      makeRotationX(t) {
        const e = Math.cos(t),
          n = Math.sin(t);
        return this.set(1, 0, 0, 0, 0, e, -n, 0, 0, n, e, 0, 0, 0, 0, 1), this
      }
      makeRotationY(t) {
        const e = Math.cos(t),
          n = Math.sin(t);
        return this.set(e, 0, n, 0, 0, 1, 0, 0, -n, 0, e, 0, 0, 0, 0, 1), this
      }
      makeRotationZ(t) {
        const e = Math.cos(t),
          n = Math.sin(t);
        return this.set(e, -n, 0, 0, n, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this
      }
      makeRotationAxis(t, e) {
        const n = Math.cos(e),
          i = Math.sin(e),
          r = 1 - n,
          a = t.x,
          s = t.y,
          o = t.z,
          l = r * a,
          c = r * s;
        return this.set(l * a + n, l * s - i * o, l * o + i * s, 0, l * s + i * o, c * s + n, c * o - i * a, 0, l * o - i * s, c * o + i * a, r * o * o + n, 0, 0, 0, 0, 1), this
      }
      makeScale(t, e, n) {
        return this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this
      }
      makeShear(t, e, n, i, r, a) {
        return this.set(1, n, r, 0, t, 1, a, 0, e, i, 1, 0, 0, 0, 0, 1), this
      }
      compose(t, e, n) {
        const i = this.elements,
          r = e._x,
          a = e._y,
          s = e._z,
          o = e._w,
          l = r + r,
          c = a + a,
          u = s + s,
          h = r * l,
          d = r * c,
          p = r * u,
          f = a * c,
          m = a * u,
          g = s * u,
          _ = o * l,
          v = o * c,
          x = o * u,
          y = n.x,
          b = n.y,
          M = n.z;
        return i[0] = (1 - (f + g)) * y, i[1] = (d + x) * y, i[2] = (p - v) * y, i[3] = 0, i[4] = (d - x) * b, i[5] = (1 - (h + g)) * b, i[6] = (m + _) * b, i[7] = 0, i[8] = (p + v) * M, i[9] = (m - _) * M, i[10] = (1 - (h + f)) * M, i[11] = 0, i[12] = t.x, i[13] = t.y, i[14] = t.z, i[15] = 1, this
      }
      decompose(t, e, n) {
        const i = this.elements;
        let r = Bp.set(i[0], i[1], i[2]).length();
        const a = Bp.set(i[4], i[5], i[6]).length(),
          s = Bp.set(i[8], i[9], i[10]).length();
        this.determinant() < 0 && (r = -r), t.x = i[12], t.y = i[13], t.z = i[14], zp.copy(this);
        const o = 1 / r,
          l = 1 / a,
          c = 1 / s;
        return zp.elements[0] *= o, zp.elements[1] *= o, zp.elements[2] *= o, zp.elements[4] *= l, zp.elements[5] *= l, zp.elements[6] *= l, zp.elements[8] *= c, zp.elements[9] *= c, zp.elements[10] *= c, e.setFromRotationMatrix(zp), n.x = r, n.y = a, n.z = s, this
      }
      makePerspective(t, e, n, i, r, a, s = 2e3) {
        const o = this.elements,
          l = 2 * r / (e - t),
          c = 2 * r / (n - i),
          u = (e + t) / (e - t),
          h = (n + i) / (n - i);
        let d, p;
        if (s === Qd) d = -(a + r) / (a - r), p = -2 * a * r / (a - r);
        else {
          if (s !== tp) throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + s);
          d = -a / (a - r), p = -a * r / (a - r)
        }
        return o[0] = l, o[4] = 0, o[8] = u, o[12] = 0, o[1] = 0, o[5] = c, o[9] = h, o[13] = 0, o[2] = 0, o[6] = 0, o[10] = d, o[14] = p, o[3] = 0, o[7] = 0, o[11] = -1, o[15] = 0, this
      }
      makeOrthographic(t, e, n, i, r, a, s = 2e3) {
        const o = this.elements,
          l = 1 / (e - t),
          c = 1 / (n - i),
          u = 1 / (a - r),
          h = (e + t) * l,
          d = (n + i) * c;
        let p, f;
        if (s === Qd) p = (a + r) * u, f = -2 * u;
        else {
          if (s !== tp) throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + s);
          p = r * u, f = -1 * u
        }
        return o[0] = 2 * l, o[4] = 0, o[8] = 0, o[12] = -h, o[1] = 0, o[5] = 2 * c, o[9] = 0, o[13] = -d, o[2] = 0, o[6] = 0, o[10] = f, o[14] = -p, o[3] = 0, o[7] = 0, o[11] = 0, o[15] = 1, this
      }
      equals(t) {
        const e = this.elements,
          n = t.elements;
        for (let t = 0; t < 16; t++)
          if (e[t] !== n[t]) return !1;
        return !0
      }
      fromArray(t, e = 0) {
        for (let n = 0; n < 16; n++) this.elements[n] = t[n + e];
        return this
      }
      toArray(t = [], e = 0) {
        const n = this.elements;
        return t[e] = n[0], t[e + 1] = n[1], t[e + 2] = n[2], t[e + 3] = n[3], t[e + 4] = n[4], t[e + 5] = n[5], t[e + 6] = n[6], t[e + 7] = n[7], t[e + 8] = n[8], t[e + 9] = n[9], t[e + 10] = n[10], t[e + 11] = n[11], t[e + 12] = n[12], t[e + 13] = n[13], t[e + 14] = n[14], t[e + 15] = n[15], t
      }
    }
    const Bp = new Up,
      zp = new Fp,
      kp = new Up(0, 0, 0),
      Hp = new Up(1, 1, 1),
      Vp = new Up,
      Gp = new Up,
      Wp = new Up,
      Xp = new Fp,
      jp = new Ip;
    class qp {
      constructor(t = 0, e = 0, n = 0, i = qp.DEFAULT_ORDER) {
        this.isEuler = !0, this._x = t, this._y = e, this._z = n, this._order = i
      }
      get x() {
        return this._x
      }
      set x(t) {
        this._x = t, this._onChangeCallback()
      }
      get y() {
        return this._y
      }
      set y(t) {
        this._y = t, this._onChangeCallback()
      }
      get z() {
        return this._z
      }
      set z(t) {
        this._z = t, this._onChangeCallback()
      }
      get order() {
        return this._order
      }
      set order(t) {
        this._order = t, this._onChangeCallback()
      }
      set(t, e, n, i = this._order) {
        return this._x = t, this._y = e, this._z = n, this._order = i, this._onChangeCallback(), this
      }
      clone() {
        return new this.constructor(this._x, this._y, this._z, this._order)
      }
      copy(t) {
        return this._x = t._x, this._y = t._y, this._z = t._z, this._order = t._order, this._onChangeCallback(), this
      }
      setFromRotationMatrix(t, e = this._order, n = !0) {
        const i = t.elements,
          r = i[0],
          a = i[4],
          s = i[8],
          o = i[1],
          l = i[5],
          c = i[9],
          u = i[2],
          h = i[6],
          d = i[10];
        switch (e) {
          case "XYZ":
            this._y = Math.asin(ap(s, -1, 1)), Math.abs(s) < .9999999 ? (this._x = Math.atan2(-c, d), this._z = Math.atan2(-a, r)) : (this._x = Math.atan2(h, l), this._z = 0);
            break;
          case "YXZ":
            this._x = Math.asin(-ap(c, -1, 1)), Math.abs(c) < .9999999 ? (this._y = Math.atan2(s, d), this._z = Math.atan2(o, l)) : (this._y = Math.atan2(-u, r), this._z = 0);
            break;
          case "ZXY":
            this._x = Math.asin(ap(h, -1, 1)), Math.abs(h) < .9999999 ? (this._y = Math.atan2(-u, d), this._z = Math.atan2(-a, l)) : (this._y = 0, this._z = Math.atan2(o, r));
            break;
          case "ZYX":
            this._y = Math.asin(-ap(u, -1, 1)), Math.abs(u) < .9999999 ? (this._x = Math.atan2(h, d), this._z = Math.atan2(o, r)) : (this._x = 0, this._z = Math.atan2(-a, l));
            break;
          case "YZX":
            this._z = Math.asin(ap(o, -1, 1)), Math.abs(o) < .9999999 ? (this._x = Math.atan2(-c, l), this._y = Math.atan2(-u, r)) : (this._x = 0, this._y = Math.atan2(s, d));
            break;
          case "XZY":
            this._z = Math.asin(-ap(a, -1, 1)), Math.abs(a) < .9999999 ? (this._x = Math.atan2(h, l), this._y = Math.atan2(s, r)) : (this._x = Math.atan2(-c, d), this._y = 0);
            break;
          default:
            console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + e)
        }
        return this._order = e, !0 === n && this._onChangeCallback(), this
      }
      setFromQuaternion(t, e, n) {
        return Xp.makeRotationFromQuaternion(t), this.setFromRotationMatrix(Xp, e, n)
      }
      setFromVector3(t, e = this._order) {
        return this.set(t.x, t.y, t.z, e)
      }
      reorder(t) {
        return jp.setFromEuler(this), this.setFromQuaternion(jp, t)
      }
      equals(t) {
        return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order
      }
      fromArray(t) {
        return this._x = t[0], this._y = t[1], this._z = t[2], void 0 !== t[3] && (this._order = t[3]), this._onChangeCallback(), this
      }
      toArray(t = [], e = 0) {
        return t[e] = this._x, t[e + 1] = this._y, t[e + 2] = this._z, t[e + 3] = this._order, t
      }
      _onChange(t) {
        return this._onChangeCallback = t, this
      }
      _onChangeCallback() {}*[Symbol.iterator]() {
        yield this._x, yield this._y, yield this._z, yield this._order
      }
    }
    qp.DEFAULT_ORDER = "XYZ";
    class Yp {
      constructor() {
        this.mask = 1
      }
      set(t) {
        this.mask = 1 << t >>> 0
      }
      enable(t) {
        this.mask |= 1 << t
      }
      enableAll() {
        this.mask = -1
      }
      toggle(t) {
        this.mask ^= 1 << t
      }
      disable(t) {
        this.mask &= ~(1 << t)
      }
      disableAll() {
        this.mask = 0
      }
      test(t) {
        return !!(this.mask & t.mask)
      }
      isEnabled(t) {
        return !!(this.mask & 1 << t)
      }
    }
    let $p = 0;
    const Kp = new Up,
      Zp = new Ip,
      Jp = new Fp,
      Qp = new Up,
      tf = new Up,
      ef = new Up,
      nf = new Ip,
      rf = new Up(1, 0, 0),
      af = new Up(0, 1, 0),
      sf = new Up(0, 0, 1),
      of = {
        type: "added"
      },
      lf = {
        type: "removed"
      },
      cf = {
        type: "childadded",
        child: null
      },
      uf = {
        type: "childremoved",
        child: null
      };
    class hf extends rh {
      constructor() {
        super(), this.isObject3D = !0, Object.defineProperty(this, "id", {
          value: $p++
        }), this.uuid = rp(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = hf.DEFAULT_UP.clone();
        const t = new Up,
          e = new qp,
          n = new Ip,
          i = new Up(1, 1, 1);
        e._onChange((function() {
          n.setFromEuler(e, !1)
        })), n._onChange((function() {
          e.setFromQuaternion(n, void 0, !1)
        })), Object.defineProperties(this, {
          position: {
            configurable: !0,
            enumerable: !0,
            value: t
          },
          rotation: {
            configurable: !0,
            enumerable: !0,
            value: e
          },
          quaternion: {
            configurable: !0,
            enumerable: !0,
            value: n
          },
          scale: {
            configurable: !0,
            enumerable: !0,
            value: i
          },
          modelViewMatrix: {
            value: new Fp
          },
          normalMatrix: {
            value: new up
          }
        }), this.matrix = new Fp, this.matrixWorld = new Fp, this.matrixAutoUpdate = hf.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = hf.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new Yp, this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {}
      }
      onBeforeShadow() {}
      onAfterShadow() {}
      onBeforeRender() {}
      onAfterRender() {}
      applyMatrix4(t) {
        this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(t), this.matrix.decompose(this.position, this.quaternion, this.scale)
      }
      applyQuaternion(t) {
        return this.quaternion.premultiply(t), this
      }
      setRotationFromAxisAngle(t, e) {
        this.quaternion.setFromAxisAngle(t, e)
      }
      setRotationFromEuler(t) {
        this.quaternion.setFromEuler(t, !0)
      }
      setRotationFromMatrix(t) {
        this.quaternion.setFromRotationMatrix(t)
      }
      setRotationFromQuaternion(t) {
        this.quaternion.copy(t)
      }
      rotateOnAxis(t, e) {
        return Zp.setFromAxisAngle(t, e), this.quaternion.multiply(Zp), this
      }
      rotateOnWorldAxis(t, e) {
        return Zp.setFromAxisAngle(t, e), this.quaternion.premultiply(Zp), this
      }
      rotateX(t) {
        return this.rotateOnAxis(rf, t)
      }
      rotateY(t) {
        return this.rotateOnAxis(af, t)
      }
      rotateZ(t) {
        return this.rotateOnAxis(sf, t)
      }
      translateOnAxis(t, e) {
        return Kp.copy(t).applyQuaternion(this.quaternion), this.position.add(Kp.multiplyScalar(e)), this
      }
      translateX(t) {
        return this.translateOnAxis(rf, t)
      }
      translateY(t) {
        return this.translateOnAxis(af, t)
      }
      translateZ(t) {
        return this.translateOnAxis(sf, t)
      }
      localToWorld(t) {
        return this.updateWorldMatrix(!0, !1), t.applyMatrix4(this.matrixWorld)
      }
      worldToLocal(t) {
        return this.updateWorldMatrix(!0, !1), t.applyMatrix4(Jp.copy(this.matrixWorld).invert())
      }
      lookAt(t, e, n) {
        t.isVector3 ? Qp.copy(t) : Qp.set(t, e, n);
        const i = this.parent;
        this.updateWorldMatrix(!0, !1), tf.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? Jp.lookAt(tf, Qp, this.up) : Jp.lookAt(Qp, tf, this.up), this.quaternion.setFromRotationMatrix(Jp), i && (Jp.extractRotation(i.matrixWorld), Zp.setFromRotationMatrix(Jp), this.quaternion.premultiply(Zp.invert()))
      }
      add(t) {
        if (arguments.length > 1) {
          for (let t = 0; t < arguments.length; t++) this.add(arguments[t]);
          return this
        }
        return t === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", t), this) : (t && t.isObject3D ? (t.removeFromParent(), t.parent = this, this.children.push(t), t.dispatchEvent( of ), cf.child = t, this.dispatchEvent(cf), cf.child = null) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", t), this)
      }
      remove(t) {
        if (arguments.length > 1) {
          for (let t = 0; t < arguments.length; t++) this.remove(arguments[t]);
          return this
        }
        const e = this.children.indexOf(t);
        return -1 !== e && (t.parent = null, this.children.splice(e, 1), t.dispatchEvent(lf), uf.child = t, this.dispatchEvent(uf), uf.child = null), this
      }
      removeFromParent() {
        const t = this.parent;
        return null !== t && t.remove(this), this
      }
      clear() {
        return this.remove(...this.children)
      }
      attach(t) {
        return this.updateWorldMatrix(!0, !1), Jp.copy(this.matrixWorld).invert(), null !== t.parent && (t.parent.updateWorldMatrix(!0, !1), Jp.multiply(t.parent.matrixWorld)), t.applyMatrix4(Jp), t.removeFromParent(), t.parent = this, this.children.push(t), t.updateWorldMatrix(!1, !0), t.dispatchEvent( of ), cf.child = t, this.dispatchEvent(cf), cf.child = null, this
      }
      getObjectById(t) {
        return this.getObjectByProperty("id", t)
      }
      getObjectByName(t) {
        return this.getObjectByProperty("name", t)
      }
      getObjectByProperty(t, e) {
        if (this[t] === e) return this;
        for (let n = 0, i = this.children.length; n < i; n++) {
          const i = this.children[n].getObjectByProperty(t, e);
          if (void 0 !== i) return i
        }
      }
      getObjectsByProperty(t, e, n = []) {
        this[t] === e && n.push(this);
        const i = this.children;
        for (let r = 0, a = i.length; r < a; r++) i[r].getObjectsByProperty(t, e, n);
        return n
      }
      getWorldPosition(t) {
        return this.updateWorldMatrix(!0, !1), t.setFromMatrixPosition(this.matrixWorld)
      }
      getWorldQuaternion(t) {
        return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(tf, t, ef), t
      }
      getWorldScale(t) {
        return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(tf, nf, t), t
      }
      getWorldDirection(t) {
        this.updateWorldMatrix(!0, !1);
        const e = this.matrixWorld.elements;
        return t.set(e[8], e[9], e[10]).normalize()
      }
      raycast() {}
      traverse(t) {
        t(this);
        const e = this.children;
        for (let n = 0, i = e.length; n < i; n++) e[n].traverse(t)
      }
      traverseVisible(t) {
        if (!1 === this.visible) return;
        t(this);
        const e = this.children;
        for (let n = 0, i = e.length; n < i; n++) e[n].traverseVisible(t)
      }
      traverseAncestors(t) {
        const e = this.parent;
        null !== e && (t(e), e.traverseAncestors(t))
      }
      updateMatrix() {
        this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0
      }
      updateMatrixWorld(t) {
        this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || t) && (!0 === this.matrixWorldAutoUpdate && (null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, t = !0);
        const e = this.children;
        for (let n = 0, i = e.length; n < i; n++) e[n].updateMatrixWorld(t)
      }
      updateWorldMatrix(t, e) {
        const n = this.parent;
        if (!0 === t && null !== n && n.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), !0 === this.matrixWorldAutoUpdate && (null === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), !0 === e) {
          const t = this.children;
          for (let e = 0, n = t.length; e < n; e++) t[e].updateWorldMatrix(!1, !0)
        }
      }
      toJSON(t) {
        const e = void 0 === t || "string" == typeof t,
          n = {};
        e && (t = {
          geometries: {},
          materials: {},
          textures: {},
          images: {},
          shapes: {},
          skeletons: {},
          animations: {},
          nodes: {}
        }, n.metadata = {
          version: 4.6,
          type: "Object",
          generator: "Object3D.toJSON"
        });
        const i = {};

        function r(e, n) {
          return void 0 === e[n.uuid] && (e[n.uuid] = n.toJSON(t)), n.uuid
        }
        if (i.uuid = this.uuid, i.type = this.type, "" !== this.name && (i.name = this.name), !0 === this.castShadow && (i.castShadow = !0), !0 === this.receiveShadow && (i.receiveShadow = !0), !1 === this.visible && (i.visible = !1), !1 === this.frustumCulled && (i.frustumCulled = !1), 0 !== this.renderOrder && (i.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (i.userData = this.userData), i.layers = this.layers.mask, i.matrix = this.matrix.toArray(), i.up = this.up.toArray(), !1 === this.matrixAutoUpdate && (i.matrixAutoUpdate = !1), this.isInstancedMesh && (i.type = "InstancedMesh", i.count = this.count, i.instanceMatrix = this.instanceMatrix.toJSON(), null !== this.instanceColor && (i.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (i.type = "BatchedMesh", i.perObjectFrustumCulled = this.perObjectFrustumCulled, i.sortObjects = this.sortObjects, i.drawRanges = this._drawRanges, i.reservedRanges = this._reservedRanges, i.visibility = this._visibility, i.active = this._active, i.bounds = this._bounds.map((t => ({
            boxInitialized: t.boxInitialized,
            boxMin: t.box.min.toArray(),
            boxMax: t.box.max.toArray(),
            sphereInitialized: t.sphereInitialized,
            sphereRadius: t.sphere.radius,
            sphereCenter: t.sphere.center.toArray()
          }))), i.maxInstanceCount = this._maxInstanceCount, i.maxVertexCount = this._maxVertexCount, i.maxIndexCount = this._maxIndexCount, i.geometryInitialized = this._geometryInitialized, i.geometryCount = this._geometryCount, i.matricesTexture = this._matricesTexture.toJSON(t), null !== this._colorsTexture && (i.colorsTexture = this._colorsTexture.toJSON(t)), null !== this.boundingSphere && (i.boundingSphere = {
            center: i.boundingSphere.center.toArray(),
            radius: i.boundingSphere.radius
          }), null !== this.boundingBox && (i.boundingBox = {
            min: i.boundingBox.min.toArray(),
            max: i.boundingBox.max.toArray()
          })), this.isScene) this.background && (this.background.isColor ? i.background = this.background.toJSON() : this.background.isTexture && (i.background = this.background.toJSON(t).uuid)), this.environment && this.environment.isTexture && !0 !== this.environment.isRenderTargetTexture && (i.environment = this.environment.toJSON(t).uuid);
        else if (this.isMesh || this.isLine || this.isPoints) {
          i.geometry = r(t.geometries, this.geometry);
          const e = this.geometry.parameters;
          if (void 0 !== e && void 0 !== e.shapes) {
            const n = e.shapes;
            if (Array.isArray(n))
              for (let e = 0, i = n.length; e < i; e++) {
                const i = n[e];
                r(t.shapes, i)
              } else r(t.shapes, n)
          }
        }
        if (this.isSkinnedMesh && (i.bindMode = this.bindMode, i.bindMatrix = this.bindMatrix.toArray(), void 0 !== this.skeleton && (r(t.skeletons, this.skeleton), i.skeleton = this.skeleton.uuid)), void 0 !== this.material)
          if (Array.isArray(this.material)) {
            const e = [];
            for (let n = 0, i = this.material.length; n < i; n++) e.push(r(t.materials, this.material[n]));
            i.material = e
          } else i.material = r(t.materials, this.material);
        if (this.children.length > 0) {
          i.children = [];
          for (let e = 0; e < this.children.length; e++) i.children.push(this.children[e].toJSON(t).object)
        }
        if (this.animations.length > 0) {
          i.animations = [];
          for (let e = 0; e < this.animations.length; e++) {
            const n = this.animations[e];
            i.animations.push(r(t.animations, n))
          }
        }
        if (e) {
          const e = a(t.geometries),
            i = a(t.materials),
            r = a(t.textures),
            s = a(t.images),
            o = a(t.shapes),
            l = a(t.skeletons),
            c = a(t.animations),
            u = a(t.nodes);
          e.length > 0 && (n.geometries = e), i.length > 0 && (n.materials = i), r.length > 0 && (n.textures = r), s.length > 0 && (n.images = s), o.length > 0 && (n.shapes = o), l.length > 0 && (n.skeletons = l), c.length > 0 && (n.animations = c), u.length > 0 && (n.nodes = u)
        }
        return n.object = i, n;

        function a(t) {
          const e = [];
          for (const n in t) {
            const i = t[n];
            delete i.metadata, e.push(i)
          }
          return e
        }
      }
      clone(t) {
        return (new this.constructor).copy(this, t)
      }
      copy(t, e = !0) {
        if (this.name = t.name, this.up.copy(t.up), this.position.copy(t.position), this.rotation.order = t.rotation.order, this.quaternion.copy(t.quaternion), this.scale.copy(t.scale), this.matrix.copy(t.matrix), this.matrixWorld.copy(t.matrixWorld), this.matrixAutoUpdate = t.matrixAutoUpdate, this.matrixWorldAutoUpdate = t.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = t.matrixWorldNeedsUpdate, this.layers.mask = t.layers.mask, this.visible = t.visible, this.castShadow = t.castShadow, this.receiveShadow = t.receiveShadow, this.frustumCulled = t.frustumCulled, this.renderOrder = t.renderOrder, this.animations = t.animations.slice(), this.userData = JSON.parse(JSON.stringify(t.userData)), !0 === e)
          for (let e = 0; e < t.children.length; e++) {
            const n = t.children[e];
            this.add(n.clone())
          }
        return this
      }
    }
    hf.DEFAULT_UP = new Up(0, 1, 0), hf.DEFAULT_MATRIX_AUTO_UPDATE = !0, hf.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
    class df extends hf {
      constructor() {
        super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new qp, this.environmentIntensity = 1, this.environmentRotation = new qp, this.overrideMaterial = null, "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {
          detail: this
        }))
      }
      copy(t, e) {
        return super.copy(t, e), null !== t.background && (this.background = t.background.clone()), null !== t.environment && (this.environment = t.environment.clone()), null !== t.fog && (this.fog = t.fog.clone()), this.backgroundBlurriness = t.backgroundBlurriness, this.backgroundIntensity = t.backgroundIntensity, this.backgroundRotation.copy(t.backgroundRotation), this.environmentIntensity = t.environmentIntensity, this.environmentRotation.copy(t.environmentRotation), null !== t.overrideMaterial && (this.overrideMaterial = t.overrideMaterial.clone()), this.matrixAutoUpdate = t.matrixAutoUpdate, this
      }
      toJSON(t) {
        const e = super.toJSON(t);
        return null !== this.fog && (e.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (e.object.backgroundBlurriness = this.backgroundBlurriness), 1 !== this.backgroundIntensity && (e.object.backgroundIntensity = this.backgroundIntensity), e.object.backgroundRotation = this.backgroundRotation.toArray(), 1 !== this.environmentIntensity && (e.object.environmentIntensity = this.environmentIntensity), e.object.environmentRotation = this.environmentRotation.toArray(), e
      }
    }
    class pf extends hf {
      constructor() {
        super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new Fp, this.projectionMatrix = new Fp, this.projectionMatrixInverse = new Fp, this.coordinateSystem = Qd
      }
      copy(t, e) {
        return super.copy(t, e), this.matrixWorldInverse.copy(t.matrixWorldInverse), this.projectionMatrix.copy(t.projectionMatrix), this.projectionMatrixInverse.copy(t.projectionMatrixInverse), this.coordinateSystem = t.coordinateSystem, this
      }
      getWorldDirection(t) {
        return super.getWorldDirection(t).negate()
      }
      updateMatrixWorld(t) {
        super.updateMatrixWorld(t), this.matrixWorldInverse.copy(this.matrixWorld).invert()
      }
      updateWorldMatrix(t, e) {
        super.updateWorldMatrix(t, e), this.matrixWorldInverse.copy(this.matrixWorld).invert()
      }
      clone() {
        return (new this.constructor).copy(this)
      }
    }
    class ff extends pf {
      constructor(t = -1, e = 1, n = 1, i = -1, r = .1, a = 2e3) {
        super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = t, this.right = e, this.top = n, this.bottom = i, this.near = r, this.far = a, this.updateProjectionMatrix()
      }
      copy(t, e) {
        return super.copy(t, e), this.left = t.left, this.right = t.right, this.top = t.top, this.bottom = t.bottom, this.near = t.near, this.far = t.far, this.zoom = t.zoom, this.view = null === t.view ? null : Object.assign({}, t.view), this
      }
      setViewOffset(t, e, n, i, r, a) {
        null === this.view && (this.view = {
          enabled: !0,
          fullWidth: 1,
          fullHeight: 1,
          offsetX: 0,
          offsetY: 0,
          width: 1,
          height: 1
        }), this.view.enabled = !0, this.view.fullWidth = t, this.view.fullHeight = e, this.view.offsetX = n, this.view.offsetY = i, this.view.width = r, this.view.height = a, this.updateProjectionMatrix()
      }
      clearViewOffset() {
        null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix()
      }
      updateProjectionMatrix() {
        const t = (this.right - this.left) / (2 * this.zoom),
          e = (this.top - this.bottom) / (2 * this.zoom),
          n = (this.right + this.left) / 2,
          i = (this.top + this.bottom) / 2;
        let r = n - t,
          a = n + t,
          s = i + e,
          o = i - e;
        if (null !== this.view && this.view.enabled) {
          const t = (this.right - this.left) / this.view.fullWidth / this.zoom,
            e = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
          r += t * this.view.offsetX, a = r + t * this.view.width, s -= e * this.view.offsetY, o = s - e * this.view.height
        }
        this.projectionMatrix.makeOrthographic(r, a, s, o, this.near, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert()
      }
      toJSON(t) {
        const e = super.toJSON(t);
        return e.object.zoom = this.zoom, e.object.left = this.left, e.object.right = this.right, e.object.top = this.top, e.object.bottom = this.bottom, e.object.near = this.near, e.object.far = this.far, null !== this.view && (e.object.view = Object.assign({}, this.view)), e
      }
    }
    class mf {
      constructor(t = new Up(1 / 0, 1 / 0, 1 / 0), e = new Up(-1 / 0, -1 / 0, -1 / 0)) {
        this.isBox3 = !0, this.min = t, this.max = e
      }
      set(t, e) {
        return this.min.copy(t), this.max.copy(e), this
      }
      setFromArray(t) {
        this.makeEmpty();
        for (let e = 0, n = t.length; e < n; e += 3) this.expandByPoint(_f.fromArray(t, e));
        return this
      }
      setFromBufferAttribute(t) {
        this.makeEmpty();
        for (let e = 0, n = t.count; e < n; e++) this.expandByPoint(_f.fromBufferAttribute(t, e));
        return this
      }
      setFromPoints(t) {
        this.makeEmpty();
        for (let e = 0, n = t.length; e < n; e++) this.expandByPoint(t[e]);
        return this
      }
      setFromCenterAndSize(t, e) {
        const n = _f.copy(e).multiplyScalar(.5);
        return this.min.copy(t).sub(n), this.max.copy(t).add(n), this
      }
      setFromObject(t, e = !1) {
        return this.makeEmpty(), this.expandByObject(t, e)
      }
      clone() {
        return (new this.constructor).copy(this)
      }
      copy(t) {
        return this.min.copy(t.min), this.max.copy(t.max), this
      }
      makeEmpty() {
        return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this
      }
      isEmpty() {
        return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
      }
      getCenter(t) {
        return this.isEmpty() ? t.set(0, 0, 0) : t.addVectors(this.min, this.max).multiplyScalar(.5)
      }
      getSize(t) {
        return this.isEmpty() ? t.set(0, 0, 0) : t.subVectors(this.max, this.min)
      }
      expandByPoint(t) {
        return this.min.min(t), this.max.max(t), this
      }
      expandByVector(t) {
        return this.min.sub(t), this.max.add(t), this
      }
      expandByScalar(t) {
        return this.min.addScalar(-t), this.max.addScalar(t), this
      }
      expandByObject(t, e = !1) {
        t.updateWorldMatrix(!1, !1);
        const n = t.geometry;
        if (void 0 !== n) {
          const i = n.getAttribute("position");
          if (!0 === e && void 0 !== i && !0 !== t.isInstancedMesh)
            for (let e = 0, n = i.count; e < n; e++) !0 === t.isMesh ? t.getVertexPosition(e, _f) : _f.fromBufferAttribute(i, e), _f.applyMatrix4(t.matrixWorld), this.expandByPoint(_f);
          else void 0 !== t.boundingBox ? (null === t.boundingBox && t.computeBoundingBox(), vf.copy(t.boundingBox)) : (null === n.boundingBox && n.computeBoundingBox(), vf.copy(n.boundingBox)), vf.applyMatrix4(t.matrixWorld), this.union(vf)
        }
        const i = t.children;
        for (let t = 0, n = i.length; t < n; t++) this.expandByObject(i[t], e);
        return this
      }
      containsPoint(t) {
        return t.x >= this.min.x && t.x <= this.max.x && t.y >= this.min.y && t.y <= this.max.y && t.z >= this.min.z && t.z <= this.max.z
      }
      containsBox(t) {
        return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y && this.min.z <= t.min.z && t.max.z <= this.max.z
      }
      getParameter(t, e) {
        return e.set((t.x - this.min.x) / (this.max.x - this.min.x), (t.y - this.min.y) / (this.max.y - this.min.y), (t.z - this.min.z) / (this.max.z - this.min.z))
      }
      intersectsBox(t) {
        return t.max.x >= this.min.x && t.min.x <= this.max.x && t.max.y >= this.min.y && t.min.y <= this.max.y && t.max.z >= this.min.z && t.min.z <= this.max.z
      }
      intersectsSphere(t) {
        return this.clampPoint(t.center, _f), _f.distanceToSquared(t.center) <= t.radius * t.radius
      }
      intersectsPlane(t) {
        let e, n;
        return t.normal.x > 0 ? (e = t.normal.x * this.min.x, n = t.normal.x * this.max.x) : (e = t.normal.x * this.max.x, n = t.normal.x * this.min.x), t.normal.y > 0 ? (e += t.normal.y * this.min.y, n += t.normal.y * this.max.y) : (e += t.normal.y * this.max.y, n += t.normal.y * this.min.y), t.normal.z > 0 ? (e += t.normal.z * this.min.z, n += t.normal.z * this.max.z) : (e += t.normal.z * this.max.z, n += t.normal.z * this.min.z), e <= -t.constant && n >= -t.constant
      }
      intersectsTriangle(t) {
        if (this.isEmpty()) return !1;
        this.getCenter(Tf), wf.subVectors(this.max, Tf), xf.subVectors(t.a, Tf), yf.subVectors(t.b, Tf), bf.subVectors(t.c, Tf), Mf.subVectors(yf, xf), Sf.subVectors(bf, yf), Ef.subVectors(xf, bf);
        let e = [0, -Mf.z, Mf.y, 0, -Sf.z, Sf.y, 0, -Ef.z, Ef.y, Mf.z, 0, -Mf.x, Sf.z, 0, -Sf.x, Ef.z, 0, -Ef.x, -Mf.y, Mf.x, 0, -Sf.y, Sf.x, 0, -Ef.y, Ef.x, 0];
        return !!Cf(e, xf, yf, bf, wf) && (e = [1, 0, 0, 0, 1, 0, 0, 0, 1], !!Cf(e, xf, yf, bf, wf) && (Af.crossVectors(Mf, Sf), e = [Af.x, Af.y, Af.z], Cf(e, xf, yf, bf, wf)))
      }
      clampPoint(t, e) {
        return e.copy(t).clamp(this.min, this.max)
      }
      distanceToPoint(t) {
        return this.clampPoint(t, _f).distanceTo(t)
      }
      getBoundingSphere(t) {
        return this.isEmpty() ? t.makeEmpty() : (this.getCenter(t.center), t.radius = .5 * this.getSize(_f).length()), t
      }
      intersect(t) {
        return this.min.max(t.min), this.max.min(t.max), this.isEmpty() && this.makeEmpty(), this
      }
      union(t) {
        return this.min.min(t.min), this.max.max(t.max), this
      }
      applyMatrix4(t) {
        return this.isEmpty() || (gf[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(t), gf[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(t), gf[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(t), gf[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(t), gf[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(t), gf[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(t), gf[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(t), gf[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(t), this.setFromPoints(gf)), this
      }
      translate(t) {
        return this.min.add(t), this.max.add(t), this
      }
      equals(t) {
        return t.min.equals(this.min) && t.max.equals(this.max)
      }
    }
    const gf = [new Up, new Up, new Up, new Up, new Up, new Up, new Up, new Up],
      _f = new Up,
      vf = new mf,
      xf = new Up,
      yf = new Up,
      bf = new Up,
      Mf = new Up,
      Sf = new Up,
      Ef = new Up,
      Tf = new Up,
      wf = new Up,
      Af = new Up,
      Rf = new Up;

    function Cf(t, e, n, i, r) {
      for (let a = 0, s = t.length - 3; a <= s; a += 3) {
        Rf.fromArray(t, a);
        const s = r.x * Math.abs(Rf.x) + r.y * Math.abs(Rf.y) + r.z * Math.abs(Rf.z),
          o = e.dot(Rf),
          l = n.dot(Rf),
          c = i.dot(Rf);
        if (Math.max(-Math.max(o, l, c), Math.min(o, l, c)) > s) return !1
      }
      return !0
    }
    const Pf = new mf,
      Df = new Up,
      Lf = new Up;
    class If {
      constructor(t = new Up, e = -1) {
        this.isSphere = !0, this.center = t, this.radius = e
      }
      set(t, e) {
        return this.center.copy(t), this.radius = e, this
      }
      setFromPoints(t, e) {
        const n = this.center;
        void 0 !== e ? n.copy(e) : Pf.setFromPoints(t).getCenter(n);
        let i = 0;
        for (let e = 0, r = t.length; e < r; e++) i = Math.max(i, n.distanceToSquared(t[e]));
        return this.radius = Math.sqrt(i), this
      }
      copy(t) {
        return this.center.copy(t.center), this.radius = t.radius, this
      }
      isEmpty() {
        return this.radius < 0
      }
      makeEmpty() {
        return this.center.set(0, 0, 0), this.radius = -1, this
      }
      containsPoint(t) {
        return t.distanceToSquared(this.center) <= this.radius * this.radius
      }
      distanceToPoint(t) {
        return t.distanceTo(this.center) - this.radius
      }
      intersectsSphere(t) {
        const e = this.radius + t.radius;
        return t.center.distanceToSquared(this.center) <= e * e
      }
      intersectsBox(t) {
        return t.intersectsSphere(this)
      }
      intersectsPlane(t) {
        return Math.abs(t.distanceToPoint(this.center)) <= this.radius
      }
      clampPoint(t, e) {
        const n = this.center.distanceToSquared(t);
        return e.copy(t), n > this.radius * this.radius && (e.sub(this.center).normalize(), e.multiplyScalar(this.radius).add(this.center)), e
      }
      getBoundingBox(t) {
        return this.isEmpty() ? (t.makeEmpty(), t) : (t.set(this.center, this.center), t.expandByScalar(this.radius), t)
      }
      applyMatrix4(t) {
        return this.center.applyMatrix4(t), this.radius = this.radius * t.getMaxScaleOnAxis(), this
      }
      translate(t) {
        return this.center.add(t), this
      }
      expandByPoint(t) {
        if (this.isEmpty()) return this.center.copy(t), this.radius = 0, this;
        Df.subVectors(t, this.center);
        const e = Df.lengthSq();
        if (e > this.radius * this.radius) {
          const t = Math.sqrt(e),
            n = .5 * (t - this.radius);
          this.center.addScaledVector(Df, n / t), this.radius += n
        }
        return this
      }
      union(t) {
        return t.isEmpty() ? this : this.isEmpty() ? (this.copy(t), this) : (!0 === this.center.equals(t.center) ? this.radius = Math.max(this.radius, t.radius) : (Lf.subVectors(t.center, this.center).setLength(t.radius), this.expandByPoint(Df.copy(t.center).add(Lf)), this.expandByPoint(Df.copy(t.center).sub(Lf))), this)
      }
      equals(t) {
        return t.center.equals(this.center) && t.radius === this.radius
      }
      clone() {
        return (new this.constructor).copy(this)
      }
    }
    const Uf = new Up,
      Nf = new Up,
      Of = new up;
    class Ff {
      constructor(t = new Up(1, 0, 0), e = 0) {
        this.isPlane = !0, this.normal = t, this.constant = e
      }
      set(t, e) {
        return this.normal.copy(t), this.constant = e, this
      }
      setComponents(t, e, n, i) {
        return this.normal.set(t, e, n), this.constant = i, this
      }
      setFromNormalAndCoplanarPoint(t, e) {
        return this.normal.copy(t), this.constant = -e.dot(this.normal), this
      }
      setFromCoplanarPoints(t, e, n) {
        const i = Uf.subVectors(n, e).cross(Nf.subVectors(t, e)).normalize();
        return this.setFromNormalAndCoplanarPoint(i, t), this
      }
      copy(t) {
        return this.normal.copy(t.normal), this.constant = t.constant, this
      }
      normalize() {
        const t = 1 / this.normal.length();
        return this.normal.multiplyScalar(t), this.constant *= t, this
      }
      negate() {
        return this.constant *= -1, this.normal.negate(), this
      }
      distanceToPoint(t) {
        return this.normal.dot(t) + this.constant
      }
      distanceToSphere(t) {
        return this.distanceToPoint(t.center) - t.radius
      }
      projectPoint(t, e) {
        return e.copy(t).addScaledVector(this.normal, -this.distanceToPoint(t))
      }
      intersectLine(t, e) {
        const n = t.delta(Uf),
          i = this.normal.dot(n);
        if (0 === i) return 0 === this.distanceToPoint(t.start) ? e.copy(t.start) : null;
        const r = -(t.start.dot(this.normal) + this.constant) / i;
        return r < 0 || r > 1 ? null : e.copy(t.start).addScaledVector(n, r)
      }
      intersectsLine(t) {
        const e = this.distanceToPoint(t.start),
          n = this.distanceToPoint(t.end);
        return e < 0 && n > 0 || n < 0 && e > 0
      }
      intersectsBox(t) {
        return t.intersectsPlane(this)
      }
      intersectsSphere(t) {
        return t.intersectsPlane(this)
      }
      coplanarPoint(t) {
        return t.copy(this.normal).multiplyScalar(-this.constant)
      }
      applyMatrix4(t, e) {
        const n = e || Of.getNormalMatrix(t),
          i = this.coplanarPoint(Uf).applyMatrix4(t),
          r = this.normal.applyMatrix3(n).normalize();
        return this.constant = -i.dot(r), this
      }
      translate(t) {
        return this.constant -= t.dot(this.normal), this
      }
      equals(t) {
        return t.normal.equals(this.normal) && t.constant === this.constant
      }
      clone() {
        return (new this.constructor).copy(this)
      }
    }
    const Bf = new If,
      zf = new Up;
    class kf {
      constructor(t = new Ff, e = new Ff, n = new Ff, i = new Ff, r = new Ff, a = new Ff) {
        this.planes = [t, e, n, i, r, a]
      }
      set(t, e, n, i, r, a) {
        const s = this.planes;
        return s[0].copy(t), s[1].copy(e), s[2].copy(n), s[3].copy(i), s[4].copy(r), s[5].copy(a), this
      }
      copy(t) {
        const e = this.planes;
        for (let n = 0; n < 6; n++) e[n].copy(t.planes[n]);
        return this
      }
      setFromProjectionMatrix(t, e = 2e3) {
        const n = this.planes,
          i = t.elements,
          r = i[0],
          a = i[1],
          s = i[2],
          o = i[3],
          l = i[4],
          c = i[5],
          u = i[6],
          h = i[7],
          d = i[8],
          p = i[9],
          f = i[10],
          m = i[11],
          g = i[12],
          _ = i[13],
          v = i[14],
          x = i[15];
        if (n[0].setComponents(o - r, h - l, m - d, x - g).normalize(), n[1].setComponents(o + r, h + l, m + d, x + g).normalize(), n[2].setComponents(o + a, h + c, m + p, x + _).normalize(), n[3].setComponents(o - a, h - c, m - p, x - _).normalize(), n[4].setComponents(o - s, h - u, m - f, x - v).normalize(), e === Qd) n[5].setComponents(o + s, h + u, m + f, x + v).normalize();
        else {
          if (e !== tp) throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + e);
          n[5].setComponents(s, u, f, v).normalize()
        }
        return this
      }
      intersectsObject(t) {
        if (void 0 !== t.boundingSphere) null === t.boundingSphere && t.computeBoundingSphere(), Bf.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);
        else {
          const e = t.geometry;
          null === e.boundingSphere && e.computeBoundingSphere(), Bf.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)
        }
        return this.intersectsSphere(Bf)
      }
      intersectsSprite(t) {
        return Bf.center.set(0, 0, 0), Bf.radius = .7071067811865476, Bf.applyMatrix4(t.matrixWorld), this.intersectsSphere(Bf)
      }
      intersectsSphere(t) {
        const e = this.planes,
          n = t.center,
          i = -t.radius;
        for (let t = 0; t < 6; t++)
          if (e[t].distanceToPoint(n) < i) return !1;
        return !0
      }
      intersectsBox(t) {
        const e = this.planes;
        for (let n = 0; n < 6; n++) {
          const i = e[n];
          if (zf.x = i.normal.x > 0 ? t.max.x : t.min.x, zf.y = i.normal.y > 0 ? t.max.y : t.min.y, zf.z = i.normal.z > 0 ? t.max.z : t.min.z, i.distanceToPoint(zf) < 0) return !1
        }
        return !0
      }
      containsPoint(t) {
        const e = this.planes;
        for (let n = 0; n < 6; n++)
          if (e[n].distanceToPoint(t) < 0) return !1;
        return !0
      }
      clone() {
        return (new this.constructor).copy(this)
      }
    }
    class Hf {
      constructor(t = 0, e = 0, n = 0, i = 1) {
        Hf.prototype.isVector4 = !0, this.x = t, this.y = e, this.z = n, this.w = i
      }
      get width() {
        return this.z
      }
      set width(t) {
        this.z = t
      }
      get height() {
        return this.w
      }
      set height(t) {
        this.w = t
      }
      set(t, e, n, i) {
        return this.x = t, this.y = e, this.z = n, this.w = i, this
      }
      setScalar(t) {
        return this.x = t, this.y = t, this.z = t, this.w = t, this
      }
      setX(t) {
        return this.x = t, this
      }
      setY(t) {
        return this.y = t, this
      }
      setZ(t) {
        return this.z = t, this
      }
      setW(t) {
        return this.w = t, this
      }
      setComponent(t, e) {
        switch (t) {
          case 0:
            this.x = e;
            break;
          case 1:
            this.y = e;
            break;
          case 2:
            this.z = e;
            break;
          case 3:
            this.w = e;
            break;
          default:
            throw new Error("index is out of range: " + t)
        }
        return this
      }
      getComponent(t) {
        switch (t) {
          case 0:
            return this.x;
          case 1:
            return this.y;
          case 2:
            return this.z;
          case 3:
            return this.w;
          default:
            throw new Error("index is out of range: " + t)
        }
      }
      clone() {
        return new this.constructor(this.x, this.y, this.z, this.w)
      }
      copy(t) {
        return this.x = t.x, this.y = t.y, this.z = t.z, this.w = void 0 !== t.w ? t.w : 1, this
      }
      add(t) {
        return this.x += t.x, this.y += t.y, this.z += t.z, this.w += t.w, this
      }
      addScalar(t) {
        return this.x += t, this.y += t, this.z += t, this.w += t, this
      }
      addVectors(t, e) {
        return this.x = t.x + e.x, this.y = t.y + e.y, this.z = t.z + e.z, this.w = t.w + e.w, this
      }
      addScaledVector(t, e) {
        return this.x += t.x * e, this.y += t.y * e, this.z += t.z * e, this.w += t.w * e, this
      }
      sub(t) {
        return this.x -= t.x, this.y -= t.y, this.z -= t.z, this.w -= t.w, this
      }
      subScalar(t) {
        return this.x -= t, this.y -= t, this.z -= t, this.w -= t, this
      }
      subVectors(t, e) {
        return this.x = t.x - e.x, this.y = t.y - e.y, this.z = t.z - e.z, this.w = t.w - e.w, this
      }
      multiply(t) {
        return this.x *= t.x, this.y *= t.y, this.z *= t.z, this.w *= t.w, this
      }
      multiplyScalar(t) {
        return this.x *= t, this.y *= t, this.z *= t, this.w *= t, this
      }
      applyMatrix4(t) {
        const e = this.x,
          n = this.y,
          i = this.z,
          r = this.w,
          a = t.elements;
        return this.x = a[0] * e + a[4] * n + a[8] * i + a[12] * r, this.y = a[1] * e + a[5] * n + a[9] * i + a[13] * r, this.z = a[2] * e + a[6] * n + a[10] * i + a[14] * r, this.w = a[3] * e + a[7] * n + a[11] * i + a[15] * r, this
      }
      divide(t) {
        return this.x /= t.x, this.y /= t.y, this.z /= t.z, this.w /= t.w, this
      }
      divideScalar(t) {
        return this.multiplyScalar(1 / t)
      }
      setAxisAngleFromQuaternion(t) {
        this.w = 2 * Math.acos(t.w);
        const e = Math.sqrt(1 - t.w * t.w);
        return e < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = t.x / e, this.y = t.y / e, this.z = t.z / e), this
      }
      setAxisAngleFromRotationMatrix(t) {
        let e, n, i, r;
        const a = .01,
          s = .1,
          o = t.elements,
          l = o[0],
          c = o[4],
          u = o[8],
          h = o[1],
          d = o[5],
          p = o[9],
          f = o[2],
          m = o[6],
          g = o[10];
        if (Math.abs(c - h) < a && Math.abs(u - f) < a && Math.abs(p - m) < a) {
          if (Math.abs(c + h) < s && Math.abs(u + f) < s && Math.abs(p + m) < s && Math.abs(l + d + g - 3) < s) return this.set(1, 0, 0, 0), this;
          e = Math.PI;
          const t = (l + 1) / 2,
            o = (d + 1) / 2,
            _ = (g + 1) / 2,
            v = (c + h) / 4,
            x = (u + f) / 4,
            y = (p + m) / 4;
          return t > o && t > _ ? t < a ? (n = 0, i = .707106781, r = .707106781) : (n = Math.sqrt(t), i = v / n, r = x / n) : o > _ ? o < a ? (n = .707106781, i = 0, r = .707106781) : (i = Math.sqrt(o), n = v / i, r = y / i) : _ < a ? (n = .707106781, i = .707106781, r = 0) : (r = Math.sqrt(_), n = x / r, i = y / r), this.set(n, i, r, e), this
        }
        let _ = Math.sqrt((m - p) * (m - p) + (u - f) * (u - f) + (h - c) * (h - c));
        return Math.abs(_) < .001 && (_ = 1), this.x = (m - p) / _, this.y = (u - f) / _, this.z = (h - c) / _, this.w = Math.acos((l + d + g - 1) / 2), this
      }
      setFromMatrixPosition(t) {
        const e = t.elements;
        return this.x = e[12], this.y = e[13], this.z = e[14], this.w = e[15], this
      }
      min(t) {
        return this.x = Math.min(this.x, t.x), this.y = Math.min(this.y, t.y), this.z = Math.min(this.z, t.z), this.w = Math.min(this.w, t.w), this
      }
      max(t) {
        return this.x = Math.max(this.x, t.x), this.y = Math.max(this.y, t.y), this.z = Math.max(this.z, t.z), this.w = Math.max(this.w, t.w), this
      }
      clamp(t, e) {
        return this.x = ap(this.x, t.x, e.x), this.y = ap(this.y, t.y, e.y), this.z = ap(this.z, t.z, e.z), this.w = ap(this.w, t.w, e.w), this
      }
      clampScalar(t, e) {
        return this.x = ap(this.x, t, e), this.y = ap(this.y, t, e), this.z = ap(this.z, t, e), this.w = ap(this.w, t, e), this
      }
      clampLength(t, e) {
        const n = this.length();
        return this.divideScalar(n || 1).multiplyScalar(ap(n, t, e))
      }
      floor() {
        return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this
      }
      ceil() {
        return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this
      }
      round() {
        return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this
      }
      roundToZero() {
        return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this
      }
      negate() {
        return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this
      }
      dot(t) {
        return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w
      }
      lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
      }
      length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
      }
      manhattanLength() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
      }
      normalize() {
        return this.divideScalar(this.length() || 1)
      }
      setLength(t) {
        return this.normalize().multiplyScalar(t)
      }
      lerp(t, e) {
        return this.x += (t.x - this.x) * e, this.y += (t.y - this.y) * e, this.z += (t.z - this.z) * e, this.w += (t.w - this.w) * e, this
      }
      lerpVectors(t, e, n) {
        return this.x = t.x + (e.x - t.x) * n, this.y = t.y + (e.y - t.y) * n, this.z = t.z + (e.z - t.z) * n, this.w = t.w + (e.w - t.w) * n, this
      }
      equals(t) {
        return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w
      }
      fromArray(t, e = 0) {
        return this.x = t[e], this.y = t[e + 1], this.z = t[e + 2], this.w = t[e + 3], this
      }
      toArray(t = [], e = 0) {
        return t[e] = this.x, t[e + 1] = this.y, t[e + 2] = this.z, t[e + 3] = this.w, t
      }
      fromBufferAttribute(t, e) {
        return this.x = t.getX(e), this.y = t.getY(e), this.z = t.getZ(e), this.w = t.getW(e), this
      }
      random() {
        return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this
      }*[Symbol.iterator]() {
        yield this.x, yield this.y, yield this.z, yield this.w
      }
    }

    function Vf() {
      let t = null,
        e = !1,
        n = null,
        i = null;

      function r(e, a) {
        n(e, a), i = t.requestAnimationFrame(r)
      }
      return {
        start: function() {
          !0 !== e && null !== n && (i = t.requestAnimationFrame(r), e = !0)
        },
        stop: function() {
          t.cancelAnimationFrame(i), e = !1
        },
        setAnimationLoop: function(t) {
          n = t
        },
        setContext: function(e) {
          t = e
        }
      }
    }

    function Gf(t) {
      const e = new WeakMap;
      return {
        get: function(t) {
          return t.isInterleavedBufferAttribute && (t = t.data), e.get(t)
        },
        remove: function(n) {
          n.isInterleavedBufferAttribute && (n = n.data);
          const i = e.get(n);
          i && (t.deleteBuffer(i.buffer), e.delete(n))
        },
        update: function(n, i) {
          if (n.isInterleavedBufferAttribute && (n = n.data), n.isGLBufferAttribute) {
            const t = e.get(n);
            return void((!t || t.version < n.version) && e.set(n, {
              buffer: n.buffer,
              type: n.type,
              bytesPerElement: n.elementSize,
              version: n.version
            }))
          }
          const r = e.get(n);
          if (void 0 === r) e.set(n, function(e, n) {
            const i = e.array,
              r = e.usage,
              a = i.byteLength,
              s = t.createBuffer();
            let o;
            if (t.bindBuffer(n, s), t.bufferData(n, i, r), e.onUploadCallback(), i instanceof Float32Array) o = t.FLOAT;
            else if (i instanceof Uint16Array) o = e.isFloat16BufferAttribute ? t.HALF_FLOAT : t.UNSIGNED_SHORT;
            else if (i instanceof Int16Array) o = t.SHORT;
            else if (i instanceof Uint32Array) o = t.UNSIGNED_INT;
            else if (i instanceof Int32Array) o = t.INT;
            else if (i instanceof Int8Array) o = t.BYTE;
            else if (i instanceof Uint8Array) o = t.UNSIGNED_BYTE;
            else {
              if (!(i instanceof Uint8ClampedArray)) throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + i);
              o = t.UNSIGNED_BYTE
            }
            return {
              buffer: s,
              type: o,
              bytesPerElement: i.BYTES_PER_ELEMENT,
              version: e.version,
              size: a
            }
          }(n, i));
          else if (r.version < n.version) {
            if (r.size !== n.array.byteLength) throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
            ! function(e, n, i) {
              const r = n.array,
                a = n.updateRanges;
              if (t.bindBuffer(i, e), 0 === a.length) t.bufferSubData(i, 0, r);
              else {
                a.sort(((t, e) => t.start - e.start));
                let e = 0;
                for (let t = 1; t < a.length; t++) {
                  const n = a[e],
                    i = a[t];
                  i.start <= n.start + n.count + 1 ? n.count = Math.max(n.count, i.start + i.count - n.start) : (++e, a[e] = i)
                }
                a.length = e + 1;
                for (let e = 0, n = a.length; e < n; e++) {
                  const n = a[e];
                  t.bufferSubData(i, n.start * r.BYTES_PER_ELEMENT, r, n.start, n.count)
                }
                n.clearUpdateRanges()
              }
              n.onUploadCallback()
            }(r.buffer, n, i), r.version = n.version
          }
        }
      }
    }
    const Wf = new Up,
      Xf = new cp;
    let jf = 0;
    class qf {
      constructor(t, e, n = !1) {
        if (Array.isArray(t)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
        this.isBufferAttribute = !0, Object.defineProperty(this, "id", {
          value: jf++
        }), this.name = "", this.array = t, this.itemSize = e, this.count = void 0 !== t ? t.length / e : 0, this.normalized = n, this.usage = 35044, this.updateRanges = [], this.gpuType = Kh, this.version = 0
      }
      onUploadCallback() {}
      set needsUpdate(t) {
        !0 === t && this.version++
      }
      setUsage(t) {
        return this.usage = t, this
      }
      addUpdateRange(t, e) {
        this.updateRanges.push({
          start: t,
          count: e
        })
      }
      clearUpdateRanges() {
        this.updateRanges.length = 0
      }
      copy(t) {
        return this.name = t.name, this.array = new t.array.constructor(t.array), this.itemSize = t.itemSize, this.count = t.count, this.normalized = t.normalized, this.usage = t.usage, this.gpuType = t.gpuType, this
      }
      copyAt(t, e, n) {
        t *= this.itemSize, n *= e.itemSize;
        for (let i = 0, r = this.itemSize; i < r; i++) this.array[t + i] = e.array[n + i];
        return this
      }
      copyArray(t) {
        return this.array.set(t), this
      }
      applyMatrix3(t) {
        if (2 === this.itemSize)
          for (let e = 0, n = this.count; e < n; e++) Xf.fromBufferAttribute(this, e), Xf.applyMatrix3(t), this.setXY(e, Xf.x, Xf.y);
        else if (3 === this.itemSize)
          for (let e = 0, n = this.count; e < n; e++) Wf.fromBufferAttribute(this, e), Wf.applyMatrix3(t), this.setXYZ(e, Wf.x, Wf.y, Wf.z);
        return this
      }
      applyMatrix4(t) {
        for (let e = 0, n = this.count; e < n; e++) Wf.fromBufferAttribute(this, e), Wf.applyMatrix4(t), this.setXYZ(e, Wf.x, Wf.y, Wf.z);
        return this
      }
      applyNormalMatrix(t) {
        for (let e = 0, n = this.count; e < n; e++) Wf.fromBufferAttribute(this, e), Wf.applyNormalMatrix(t), this.setXYZ(e, Wf.x, Wf.y, Wf.z);
        return this
      }
      transformDirection(t) {
        for (let e = 0, n = this.count; e < n; e++) Wf.fromBufferAttribute(this, e), Wf.transformDirection(t), this.setXYZ(e, Wf.x, Wf.y, Wf.z);
        return this
      }
      set(t, e = 0) {
        return this.array.set(t, e), this
      }
      getComponent(t, e) {
        let n = this.array[t * this.itemSize + e];
        return this.normalized && (n = op(n, this.array)), n
      }
      setComponent(t, e, n) {
        return this.normalized && (n = lp(n, this.array)), this.array[t * this.itemSize + e] = n, this
      }
      getX(t) {
        let e = this.array[t * this.itemSize];
        return this.normalized && (e = op(e, this.array)), e
      }
      setX(t, e) {
        return this.normalized && (e = lp(e, this.array)), this.array[t * this.itemSize] = e, this
      }
      getY(t) {
        let e = this.array[t * this.itemSize + 1];
        return this.normalized && (e = op(e, this.array)), e
      }
      setY(t, e) {
        return this.normalized && (e = lp(e, this.array)), this.array[t * this.itemSize + 1] = e, this
      }
      getZ(t) {
        let e = this.array[t * this.itemSize + 2];
        return this.normalized && (e = op(e, this.array)), e
      }
      setZ(t, e) {
        return this.normalized && (e = lp(e, this.array)), this.array[t * this.itemSize + 2] = e, this
      }
      getW(t) {
        let e = this.array[t * this.itemSize + 3];
        return this.normalized && (e = op(e, this.array)), e
      }
      setW(t, e) {
        return this.normalized && (e = lp(e, this.array)), this.array[t * this.itemSize + 3] = e, this
      }
      setXY(t, e, n) {
        return t *= this.itemSize, this.normalized && (e = lp(e, this.array), n = lp(n, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this
      }
      setXYZ(t, e, n, i) {
        return t *= this.itemSize, this.normalized && (e = lp(e, this.array), n = lp(n, this.array), i = lp(i, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = i, this
      }
      setXYZW(t, e, n, i, r) {
        return t *= this.itemSize, this.normalized && (e = lp(e, this.array), n = lp(n, this.array), i = lp(i, this.array), r = lp(r, this.array)), this.array[t + 0] = e, this.array[t + 1] = n, this.array[t + 2] = i, this.array[t + 3] = r, this
      }
      onUpload(t) {
        return this.onUploadCallback = t, this
      }
      clone() {
        return new this.constructor(this.array, this.itemSize).copy(this)
      }
      toJSON() {
        const t = {
          itemSize: this.itemSize,
          type: this.array.constructor.name,
          array: Array.from(this.array),
          normalized: this.normalized
        };
        return "" !== this.name && (t.name = this.name), 35044 !== this.usage && (t.usage = this.usage), t
      }
    }
    class Yf extends qf {
      constructor(t, e, n) {
        super(new Uint16Array(t), e, n)
      }
    }
    class $f extends qf {
      constructor(t, e, n) {
        super(new Uint32Array(t), e, n)
      }
    }
    class Kf extends qf {
      constructor(t, e, n) {
        super(new Float32Array(t), e, n)
      }
    }
    let Zf = 0;
    const Jf = new Fp,
      Qf = new hf,
      tm = new Up,
      em = new mf,
      nm = new mf,
      im = new Up;
    class rm extends rh {
      constructor() {
        super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", {
          value: Zf++
        }), this.uuid = rp(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = {
          start: 0,
          count: 1 / 0
        }, this.userData = {}
      }
      getIndex() {
        return this.index
      }
      setIndex(t) {
        return Array.isArray(t) ? this.index = new(Ju(t) ? $f : Yf)(t, 1) : this.index = t, this
      }
      setIndirect(t) {
        return this.indirect = t, this
      }
      getIndirect() {
        return this.indirect
      }
      getAttribute(t) {
        return this.attributes[t]
      }
      setAttribute(t, e) {
        return this.attributes[t] = e, this
      }
      deleteAttribute(t) {
        return delete this.attributes[t], this
      }
      hasAttribute(t) {
        return void 0 !== this.attributes[t]
      }
      addGroup(t, e, n = 0) {
        this.groups.push({
          start: t,
          count: e,
          materialIndex: n
        })
      }
      clearGroups() {
        this.groups = []
      }
      setDrawRange(t, e) {
        this.drawRange.start = t, this.drawRange.count = e
      }
      applyMatrix4(t) {
        const e = this.attributes.position;
        void 0 !== e && (e.applyMatrix4(t), e.needsUpdate = !0);
        const n = this.attributes.normal;
        if (void 0 !== n) {
          const e = (new up).getNormalMatrix(t);
          n.applyNormalMatrix(e), n.needsUpdate = !0
        }
        const i = this.attributes.tangent;
        return void 0 !== i && (i.transformDirection(t), i.needsUpdate = !0), null !== this.boundingBox && this.computeBoundingBox(), null !== this.boundingSphere && this.computeBoundingSphere(), this
      }
      applyQuaternion(t) {
        return Jf.makeRotationFromQuaternion(t), this.applyMatrix4(Jf), this
      }
      rotateX(t) {
        return Jf.makeRotationX(t), this.applyMatrix4(Jf), this
      }
      rotateY(t) {
        return Jf.makeRotationY(t), this.applyMatrix4(Jf), this
      }
      rotateZ(t) {
        return Jf.makeRotationZ(t), this.applyMatrix4(Jf), this
      }
      translate(t, e, n) {
        return Jf.makeTranslation(t, e, n), this.applyMatrix4(Jf), this
      }
      scale(t, e, n) {
        return Jf.makeScale(t, e, n), this.applyMatrix4(Jf), this
      }
      lookAt(t) {
        return Qf.lookAt(t), Qf.updateMatrix(), this.applyMatrix4(Qf.matrix), this
      }
      center() {
        return this.computeBoundingBox(), this.boundingBox.getCenter(tm).negate(), this.translate(tm.x, tm.y, tm.z), this
      }
      setFromPoints(t) {
        const e = this.getAttribute("position");
        if (void 0 === e) {
          const e = [];
          for (let n = 0, i = t.length; n < i; n++) {
            const i = t[n];
            e.push(i.x, i.y, i.z || 0)
          }
          this.setAttribute("position", new Kf(e, 3))
        } else {
          const n = Math.min(t.length, e.count);
          for (let i = 0; i < n; i++) {
            const n = t[i];
            e.setXYZ(i, n.x, n.y, n.z || 0)
          }
          t.length > e.count && console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), e.needsUpdate = !0
        }
        return this
      }
      computeBoundingBox() {
        null === this.boundingBox && (this.boundingBox = new mf);
        const t = this.attributes.position,
          e = this.morphAttributes.position;
        if (t && t.isGLBufferAttribute) return console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), void this.boundingBox.set(new Up(-1 / 0, -1 / 0, -1 / 0), new Up(1 / 0, 1 / 0, 1 / 0));
        if (void 0 !== t) {
          if (this.boundingBox.setFromBufferAttribute(t), e)
            for (let t = 0, n = e.length; t < n; t++) {
              const n = e[t];
              em.setFromBufferAttribute(n), this.morphTargetsRelative ? (im.addVectors(this.boundingBox.min, em.min), this.boundingBox.expandByPoint(im), im.addVectors(this.boundingBox.max, em.max), this.boundingBox.expandByPoint(im)) : (this.boundingBox.expandByPoint(em.min), this.boundingBox.expandByPoint(em.max))
            }
        } else this.boundingBox.makeEmpty();
        (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this)
      }
      computeBoundingSphere() {
        null === this.boundingSphere && (this.boundingSphere = new If);
        const t = this.attributes.position,
          e = this.morphAttributes.position;
        if (t && t.isGLBufferAttribute) return console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), void this.boundingSphere.set(new Up, 1 / 0);
        if (t) {
          const n = this.boundingSphere.center;
          if (em.setFromBufferAttribute(t), e)
            for (let t = 0, n = e.length; t < n; t++) {
              const n = e[t];
              nm.setFromBufferAttribute(n), this.morphTargetsRelative ? (im.addVectors(em.min, nm.min), em.expandByPoint(im), im.addVectors(em.max, nm.max), em.expandByPoint(im)) : (em.expandByPoint(nm.min), em.expandByPoint(nm.max))
            }
          em.getCenter(n);
          let i = 0;
          for (let e = 0, r = t.count; e < r; e++) im.fromBufferAttribute(t, e), i = Math.max(i, n.distanceToSquared(im));
          if (e)
            for (let r = 0, a = e.length; r < a; r++) {
              const a = e[r],
                s = this.morphTargetsRelative;
              for (let e = 0, r = a.count; e < r; e++) im.fromBufferAttribute(a, e), s && (tm.fromBufferAttribute(t, e), im.add(tm)), i = Math.max(i, n.distanceToSquared(im))
            }
          this.boundingSphere.radius = Math.sqrt(i), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this)
        }
      }
      computeTangents() {
        const t = this.index,
          e = this.attributes;
        if (null === t || void 0 === e.position || void 0 === e.normal || void 0 === e.uv) return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
        const n = e.position,
          i = e.normal,
          r = e.uv;
        !1 === this.hasAttribute("tangent") && this.setAttribute("tangent", new qf(new Float32Array(4 * n.count), 4));
        const a = this.getAttribute("tangent"),
          s = [],
          o = [];
        for (let t = 0; t < n.count; t++) s[t] = new Up, o[t] = new Up;
        const l = new Up,
          c = new Up,
          u = new Up,
          h = new cp,
          d = new cp,
          p = new cp,
          f = new Up,
          m = new Up;

        function g(t, e, i) {
          l.fromBufferAttribute(n, t), c.fromBufferAttribute(n, e), u.fromBufferAttribute(n, i), h.fromBufferAttribute(r, t), d.fromBufferAttribute(r, e), p.fromBufferAttribute(r, i), c.sub(l), u.sub(l), d.sub(h), p.sub(h);
          const a = 1 / (d.x * p.y - p.x * d.y);
          isFinite(a) && (f.copy(c).multiplyScalar(p.y).addScaledVector(u, -d.y).multiplyScalar(a), m.copy(u).multiplyScalar(d.x).addScaledVector(c, -p.x).multiplyScalar(a), s[t].add(f), s[e].add(f), s[i].add(f), o[t].add(m), o[e].add(m), o[i].add(m))
        }
        let _ = this.groups;
        0 === _.length && (_ = [{
          start: 0,
          count: t.count
        }]);
        for (let e = 0, n = _.length; e < n; ++e) {
          const n = _[e],
            i = n.start;
          for (let e = i, r = i + n.count; e < r; e += 3) g(t.getX(e + 0), t.getX(e + 1), t.getX(e + 2))
        }
        const v = new Up,
          x = new Up,
          y = new Up,
          b = new Up;

        function M(t) {
          y.fromBufferAttribute(i, t), b.copy(y);
          const e = s[t];
          v.copy(e), v.sub(y.multiplyScalar(y.dot(e))).normalize(), x.crossVectors(b, e);
          const n = x.dot(o[t]) < 0 ? -1 : 1;
          a.setXYZW(t, v.x, v.y, v.z, n)
        }
        for (let e = 0, n = _.length; e < n; ++e) {
          const n = _[e],
            i = n.start;
          for (let e = i, r = i + n.count; e < r; e += 3) M(t.getX(e + 0)), M(t.getX(e + 1)), M(t.getX(e + 2))
        }
      }
      computeVertexNormals() {
        const t = this.index,
          e = this.getAttribute("position");
        if (void 0 !== e) {
          let n = this.getAttribute("normal");
          if (void 0 === n) n = new qf(new Float32Array(3 * e.count), 3), this.setAttribute("normal", n);
          else
            for (let t = 0, e = n.count; t < e; t++) n.setXYZ(t, 0, 0, 0);
          const i = new Up,
            r = new Up,
            a = new Up,
            s = new Up,
            o = new Up,
            l = new Up,
            c = new Up,
            u = new Up;
          if (t)
            for (let h = 0, d = t.count; h < d; h += 3) {
              const d = t.getX(h + 0),
                p = t.getX(h + 1),
                f = t.getX(h + 2);
              i.fromBufferAttribute(e, d), r.fromBufferAttribute(e, p), a.fromBufferAttribute(e, f), c.subVectors(a, r), u.subVectors(i, r), c.cross(u), s.fromBufferAttribute(n, d), o.fromBufferAttribute(n, p), l.fromBufferAttribute(n, f), s.add(c), o.add(c), l.add(c), n.setXYZ(d, s.x, s.y, s.z), n.setXYZ(p, o.x, o.y, o.z), n.setXYZ(f, l.x, l.y, l.z)
            } else
              for (let t = 0, s = e.count; t < s; t += 3) i.fromBufferAttribute(e, t + 0), r.fromBufferAttribute(e, t + 1), a.fromBufferAttribute(e, t + 2), c.subVectors(a, r), u.subVectors(i, r), c.cross(u), n.setXYZ(t + 0, c.x, c.y, c.z), n.setXYZ(t + 1, c.x, c.y, c.z), n.setXYZ(t + 2, c.x, c.y, c.z);
          this.normalizeNormals(), n.needsUpdate = !0
        }
      }
      normalizeNormals() {
        const t = this.attributes.normal;
        for (let e = 0, n = t.count; e < n; e++) im.fromBufferAttribute(t, e), im.normalize(), t.setXYZ(e, im.x, im.y, im.z)
      }
      toNonIndexed() {
        function t(t, e) {
          const n = t.array,
            i = t.itemSize,
            r = t.normalized,
            a = new n.constructor(e.length * i);
          let s = 0,
            o = 0;
          for (let r = 0, l = e.length; r < l; r++) {
            s = t.isInterleavedBufferAttribute ? e[r] * t.data.stride + t.offset : e[r] * i;
            for (let t = 0; t < i; t++) a[o++] = n[s++]
          }
          return new qf(a, i, r)
        }
        if (null === this.index) return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
        const e = new rm,
          n = this.index.array,
          i = this.attributes;
        for (const r in i) {
          const a = t(i[r], n);
          e.setAttribute(r, a)
        }
        const r = this.morphAttributes;
        for (const i in r) {
          const a = [],
            s = r[i];
          for (let e = 0, i = s.length; e < i; e++) {
            const i = t(s[e], n);
            a.push(i)
          }
          e.morphAttributes[i] = a
        }
        e.morphTargetsRelative = this.morphTargetsRelative;
        const a = this.groups;
        for (let t = 0, n = a.length; t < n; t++) {
          const n = a[t];
          e.addGroup(n.start, n.count, n.materialIndex)
        }
        return e
      }
      toJSON() {
        const t = {
          metadata: {
            version: 4.6,
            type: "BufferGeometry",
            generator: "BufferGeometry.toJSON"
          }
        };
        if (t.uuid = this.uuid, t.type = this.type, "" !== this.name && (t.name = this.name), Object.keys(this.userData).length > 0 && (t.userData = this.userData), void 0 !== this.parameters) {
          const e = this.parameters;
          for (const n in e) void 0 !== e[n] && (t[n] = e[n]);
          return t
        }
        t.data = {
          attributes: {}
        };
        const e = this.index;
        null !== e && (t.data.index = {
          type: e.array.constructor.name,
          array: Array.prototype.slice.call(e.array)
        });
        const n = this.attributes;
        for (const e in n) {
          const i = n[e];
          t.data.attributes[e] = i.toJSON(t.data)
        }
        const i = {};
        let r = !1;
        for (const e in this.morphAttributes) {
          const n = this.morphAttributes[e],
            a = [];
          for (let e = 0, i = n.length; e < i; e++) {
            const i = n[e];
            a.push(i.toJSON(t.data))
          }
          a.length > 0 && (i[e] = a, r = !0)
        }
        r && (t.data.morphAttributes = i, t.data.morphTargetsRelative = this.morphTargetsRelative);
        const a = this.groups;
        a.length > 0 && (t.data.groups = JSON.parse(JSON.stringify(a)));
        const s = this.boundingSphere;
        return null !== s && (t.data.boundingSphere = {
          center: s.center.toArray(),
          radius: s.radius
        }), t
      }
      clone() {
        return (new this.constructor).copy(this)
      }
      copy(t) {
        this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
        const e = {};
        this.name = t.name;
        const n = t.index;
        null !== n && this.setIndex(n.clone(e));
        const i = t.attributes;
        for (const t in i) {
          const n = i[t];
          this.setAttribute(t, n.clone(e))
        }
        const r = t.morphAttributes;
        for (const t in r) {
          const n = [],
            i = r[t];
          for (let t = 0, r = i.length; t < r; t++) n.push(i[t].clone(e));
          this.morphAttributes[t] = n
        }
        this.morphTargetsRelative = t.morphTargetsRelative;
        const a = t.groups;
        for (let t = 0, e = a.length; t < e; t++) {
          const e = a[t];
          this.addGroup(e.start, e.count, e.materialIndex)
        }
        const s = t.boundingBox;
        null !== s && (this.boundingBox = s.clone());
        const o = t.boundingSphere;
        return null !== o && (this.boundingSphere = o.clone()), this.drawRange.start = t.drawRange.start, this.drawRange.count = t.drawRange.count, this.userData = t.userData, this
      }
      dispose() {
        this.dispatchEvent({
          type: "dispose"
        })
      }
    }
    class am extends rm {
      constructor(t = 1, e = 1, n = 1, i = 1, r = 1, a = 1) {
        super(), this.type = "BoxGeometry", this.parameters = {
          width: t,
          height: e,
          depth: n,
          widthSegments: i,
          heightSegments: r,
          depthSegments: a
        };
        const s = this;
        i = Math.floor(i), r = Math.floor(r), a = Math.floor(a);
        const o = [],
          l = [],
          c = [],
          u = [];
        let h = 0,
          d = 0;

        function p(t, e, n, i, r, a, p, f, m, g, _) {
          const v = a / m,
            x = p / g,
            y = a / 2,
            b = p / 2,
            M = f / 2,
            S = m + 1,
            E = g + 1;
          let T = 0,
            w = 0;
          const A = new Up;
          for (let a = 0; a < E; a++) {
            const s = a * x - b;
            for (let o = 0; o < S; o++) {
              const h = o * v - y;
              A[t] = h * i, A[e] = s * r, A[n] = M, l.push(A.x, A.y, A.z), A[t] = 0, A[e] = 0, A[n] = f > 0 ? 1 : -1, c.push(A.x, A.y, A.z), u.push(o / m), u.push(1 - a / g), T += 1
            }
          }
          for (let t = 0; t < g; t++)
            for (let e = 0; e < m; e++) {
              const n = h + e + S * t,
                i = h + e + S * (t + 1),
                r = h + (e + 1) + S * (t + 1),
                a = h + (e + 1) + S * t;
              o.push(n, i, a), o.push(i, r, a), w += 6
            }
          s.addGroup(d, w, _), d += w, h += T
        }
        p("z", "y", "x", -1, -1, n, e, t, a, r, 0), p("z", "y", "x", 1, -1, n, e, -t, a, r, 1), p("x", "z", "y", 1, 1, t, n, e, i, a, 2), p("x", "z", "y", 1, -1, t, n, -e, i, a, 3), p("x", "y", "z", 1, -1, t, e, n, i, r, 4), p("x", "y", "z", -1, -1, t, e, -n, i, r, 5), this.setIndex(o), this.setAttribute("position", new Kf(l, 3)), this.setAttribute("normal", new Kf(c, 3)), this.setAttribute("uv", new Kf(u, 2))
      }
      copy(t) {
        return super.copy(t), this.parameters = Object.assign({}, t.parameters), this
      }
      static fromJSON(t) {
        return new am(t.width, t.height, t.depth, t.widthSegments, t.heightSegments, t.depthSegments)
      }
    }
    class sm extends rm {
      constructor(t = 1, e = 1, n = 1, i = 1) {
        super(), this.type = "PlaneGeometry", this.parameters = {
          width: t,
          height: e,
          widthSegments: n,
          heightSegments: i
        };
        const r = t / 2,
          a = e / 2,
          s = Math.floor(n),
          o = Math.floor(i),
          l = s + 1,
          c = o + 1,
          u = t / s,
          h = e / o,
          d = [],
          p = [],
          f = [],
          m = [];
        for (let t = 0; t < c; t++) {
          const e = t * h - a;
          for (let n = 0; n < l; n++) {
            const i = n * u - r;
            p.push(i, -e, 0), f.push(0, 0, 1), m.push(n / s), m.push(1 - t / o)
          }
        }
        for (let t = 0; t < o; t++)
          for (let e = 0; e < s; e++) {
            const n = e + l * t,
              i = e + l * (t + 1),
              r = e + 1 + l * (t + 1),
              a = e + 1 + l * t;
            d.push(n, i, a), d.push(i, r, a)
          }
        this.setIndex(d), this.setAttribute("position", new Kf(p, 3)), this.setAttribute("normal", new Kf(f, 3)), this.setAttribute("uv", new Kf(m, 2))
      }
      copy(t) {
        return super.copy(t), this.parameters = Object.assign({}, t.parameters), this
      }
      static fromJSON(t) {
        return new sm(t.width, t.height, t.widthSegments, t.heightSegments)
      }
    }
    let om = 0;
    class lm extends rh {
      constructor() {
        super(), this.isMaterial = !0, Object.defineProperty(this, "id", {
          value: om++
        }), this.uuid = rp(), this.name = "", this.type = "Material", this.blending = 1, this.side = 0, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = lh, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Pp(0, 0, 0), this.blendAlpha = 0, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = Gd, this.stencilZFail = Gd, this.stencilZPass = Gd, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0
      }
      get alphaTest() {
        return this._alphaTest
      }
      set alphaTest(t) {
        this._alphaTest > 0 != t > 0 && this.version++, this._alphaTest = t
      }
      onBeforeRender() {}
      onBeforeCompile() {}
      customProgramCacheKey() {
        return this.onBeforeCompile.toString()
      }
      setValues(t) {
        if (void 0 !== t)
          for (const e in t) {
            const n = t[e];
            if (void 0 === n) {
              console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);
              continue
            }
            const i = this[e];
            void 0 !== i ? i && i.isColor ? i.set(n) : i && i.isVector3 && n && n.isVector3 ? i.copy(n) : this[e] = n : console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`)
          }
      }
      toJSON(t) {
        const e = void 0 === t || "string" == typeof t;
        e && (t = {
          textures: {},
          images: {}
        });
        const n = {
          metadata: {
            version: 4.6,
            type: "Material",
            generator: "Material.toJSON"
          }
        };

        function i(t) {
          const e = [];
          for (const n in t) {
            const i = t[n];
            delete i.metadata, e.push(i)
          }
          return e
        }
        if (n.uuid = this.uuid, n.type = this.type, "" !== this.name && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), void 0 !== this.roughness && (n.roughness = this.roughness), void 0 !== this.metalness && (n.metalness = this.metalness), void 0 !== this.sheen && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), void 0 !== this.sheenRoughness && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), void 0 !== this.emissiveIntensity && 1 !== this.emissiveIntensity && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), void 0 !== this.specularIntensity && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), void 0 !== this.shininess && (n.shininess = this.shininess), void 0 !== this.clearcoat && (n.clearcoat = this.clearcoat), void 0 !== this.clearcoatRoughness && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(t).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(t).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(t).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), void 0 !== this.dispersion && (n.dispersion = this.dispersion), void 0 !== this.iridescence && (n.iridescence = this.iridescence), void 0 !== this.iridescenceIOR && (n.iridescenceIOR = this.iridescenceIOR), void 0 !== this.iridescenceThicknessRange && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(t).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(t).uuid), void 0 !== this.anisotropy && (n.anisotropy = this.anisotropy), void 0 !== this.anisotropyRotation && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(t).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(t).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(t).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(t).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(t).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(t).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(t).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(t).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(t).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(t).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(t).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(t).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(t).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(t).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(t).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(t).uuid, void 0 !== this.combine && (n.combine = this.combine)), void 0 !== this.envMapRotation && (n.envMapRotation = this.envMapRotation.toArray()), void 0 !== this.envMapIntensity && (n.envMapIntensity = this.envMapIntensity), void 0 !== this.reflectivity && (n.reflectivity = this.reflectivity), void 0 !== this.refractionRatio && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(t).uuid), void 0 !== this.transmission && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(t).uuid), void 0 !== this.thickness && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(t).uuid), void 0 !== this.attenuationDistance && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance), void 0 !== this.attenuationColor && (n.attenuationColor = this.attenuationColor.getHex()), void 0 !== this.size && (n.size = this.size), null !== this.shadowSide && (n.shadowSide = this.shadowSide), void 0 !== this.sizeAttenuation && (n.sizeAttenuation = this.sizeAttenuation), 1 !== this.blending && (n.blending = this.blending), 0 !== this.side && (n.side = this.side), !0 === this.vertexColors && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), !0 === this.transparent && (n.transparent = !0), 204 !== this.blendSrc && (n.blendSrc = this.blendSrc), 205 !== this.blendDst && (n.blendDst = this.blendDst), this.blendEquation !== lh && (n.blendEquation = this.blendEquation), null !== this.blendSrcAlpha && (n.blendSrcAlpha = this.blendSrcAlpha), null !== this.blendDstAlpha && (n.blendDstAlpha = this.blendDstAlpha), null !== this.blendEquationAlpha && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), 0 !== this.blendAlpha && (n.blendAlpha = this.blendAlpha), 3 !== this.depthFunc && (n.depthFunc = this.depthFunc), !1 === this.depthTest && (n.depthTest = this.depthTest), !1 === this.depthWrite && (n.depthWrite = this.depthWrite), !1 === this.colorWrite && (n.colorWrite = this.colorWrite), 255 !== this.stencilWriteMask && (n.stencilWriteMask = this.stencilWriteMask), 519 !== this.stencilFunc && (n.stencilFunc = this.stencilFunc), 0 !== this.stencilRef && (n.stencilRef = this.stencilRef), 255 !== this.stencilFuncMask && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== Gd && (n.stencilFail = this.stencilFail), this.stencilZFail !== Gd && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== Gd && (n.stencilZPass = this.stencilZPass), !0 === this.stencilWrite && (n.stencilWrite = this.stencilWrite), void 0 !== this.rotation && 0 !== this.rotation && (n.rotation = this.rotation), !0 === this.polygonOffset && (n.polygonOffset = !0), 0 !== this.polygonOffsetFactor && (n.polygonOffsetFactor = this.polygonOffsetFactor), 0 !== this.polygonOffsetUnits && (n.polygonOffsetUnits = this.polygonOffsetUnits), void 0 !== this.linewidth && 1 !== this.linewidth && (n.linewidth = this.linewidth), void 0 !== this.dashSize && (n.dashSize = this.dashSize), void 0 !== this.gapSize && (n.gapSize = this.gapSize), void 0 !== this.scale && (n.scale = this.scale), !0 === this.dithering && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), !0 === this.alphaHash && (n.alphaHash = !0), !0 === this.alphaToCoverage && (n.alphaToCoverage = !0), !0 === this.premultipliedAlpha && (n.premultipliedAlpha = !0), !0 === this.forceSinglePass && (n.forceSinglePass = !0), !0 === this.wireframe && (n.wireframe = !0), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), "round" !== this.wireframeLinecap && (n.wireframeLinecap = this.wireframeLinecap), "round" !== this.wireframeLinejoin && (n.wireframeLinejoin = this.wireframeLinejoin), !0 === this.flatShading && (n.flatShading = !0), !1 === this.visible && (n.visible = !1), !1 === this.toneMapped && (n.toneMapped = !1), !1 === this.fog && (n.fog = !1), Object.keys(this.userData).length > 0 && (n.userData = this.userData), e) {
          const e = i(t.textures),
            r = i(t.images);
          e.length > 0 && (n.textures = e), r.length > 0 && (n.images = r)
        }
        return n
      }
      clone() {
        return (new this.constructor).copy(this)
      }
      copy(t) {
        this.name = t.name, this.blending = t.blending, this.side = t.side, this.vertexColors = t.vertexColors, this.opacity = t.opacity, this.transparent = t.transparent, this.blendSrc = t.blendSrc, this.blendDst = t.blendDst, this.blendEquation = t.blendEquation, this.blendSrcAlpha = t.blendSrcAlpha, this.blendDstAlpha = t.blendDstAlpha, this.blendEquationAlpha = t.blendEquationAlpha, this.blendColor.copy(t.blendColor), this.blendAlpha = t.blendAlpha, this.depthFunc = t.depthFunc, this.depthTest = t.depthTest, this.depthWrite = t.depthWrite, this.stencilWriteMask = t.stencilWriteMask, this.stencilFunc = t.stencilFunc, this.stencilRef = t.stencilRef, this.stencilFuncMask = t.stencilFuncMask, this.stencilFail = t.stencilFail, this.stencilZFail = t.stencilZFail, this.stencilZPass = t.stencilZPass, this.stencilWrite = t.stencilWrite;
        const e = t.clippingPlanes;
        let n = null;
        if (null !== e) {
          const t = e.length;
          n = new Array(t);
          for (let i = 0; i !== t; ++i) n[i] = e[i].clone()
        }
        return this.clippingPlanes = n, this.clipIntersection = t.clipIntersection, this.clipShadows = t.clipShadows, this.shadowSide = t.shadowSide, this.colorWrite = t.colorWrite, this.precision = t.precision, this.polygonOffset = t.polygonOffset, this.polygonOffsetFactor = t.polygonOffsetFactor, this.polygonOffsetUnits = t.polygonOffsetUnits, this.dithering = t.dithering, this.alphaTest = t.alphaTest, this.alphaHash = t.alphaHash, this.alphaToCoverage = t.alphaToCoverage, this.premultipliedAlpha = t.premultipliedAlpha, this.forceSinglePass = t.forceSinglePass, this.visible = t.visible, this.toneMapped = t.toneMapped, this.userData = JSON.parse(JSON.stringify(t.userData)), this
      }
      dispose() {
        this.dispatchEvent({
          type: "dispose"
        })
      }
      set needsUpdate(t) {
        !0 === t && this.version++
      }
      onBuild() {
        console.warn("Material: onBuild() has been removed.")
      }
    }

    function cm(t) {
      const e = {};
      for (const n in t) {
        e[n] = {};
        for (const i in t[n]) {
          const r = t[n][i];
          r && (r.isColor || r.isMatrix3 || r.isMatrix4 || r.isVector2 || r.isVector3 || r.isVector4 || r.isTexture || r.isQuaternion) ? r.isRenderTargetTexture ? (console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), e[n][i] = null) : e[n][i] = r.clone() : Array.isArray(r) ? e[n][i] = r.slice() : e[n][i] = r
        }
      }
      return e
    }

    function um(t) {
      const e = {};
      for (let n = 0; n < t.length; n++) {
        const i = cm(t[n]);
        for (const t in i) e[t] = i[t]
      }
      return e
    }

    function hm(t) {
      const e = t.getRenderTarget();
      return null === e ? t.outputColorSpace : !0 === e.isXRRenderTarget ? e.texture.colorSpace : mp.workingColorSpace
    }
    const dm = {
      clone: cm,
      merge: um
    };
    class pm extends lm {
      constructor(t) {
        super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = "\nvoid main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}\n", this.fragmentShader = "\nvoid main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}\n", this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
          clipCullDistance: !1,
          multiDraw: !1
        }, this.defaultAttributeValues = {
          color: [1, 1, 1],
          uv: [0, 0],
          uv1: [0, 0]
        }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, void 0 !== t && this.setValues(t)
      }
      copy(t) {
        return super.copy(t), this.fragmentShader = t.fragmentShader, this.vertexShader = t.vertexShader, this.uniforms = cm(t.uniforms), this.uniformsGroups = function(t) {
          const e = [];
          for (let n = 0; n < t.length; n++) e.push(t[n].clone());
          return e
        }(t.uniformsGroups), this.defines = Object.assign({}, t.defines), this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.fog = t.fog, this.lights = t.lights, this.clipping = t.clipping, this.extensions = Object.assign({}, t.extensions), this.glslVersion = t.glslVersion, this
      }
      toJSON(t) {
        const e = super.toJSON(t);
        e.glslVersion = this.glslVersion, e.uniforms = {};
        for (const n in this.uniforms) {
          const i = this.uniforms[n].value;
          i && i.isTexture ? e.uniforms[n] = {
            type: "t",
            value: i.toJSON(t).uuid
          } : i && i.isColor ? e.uniforms[n] = {
            type: "c",
            value: i.getHex()
          } : i && i.isVector2 ? e.uniforms[n] = {
            type: "v2",
            value: i.toArray()
          } : i && i.isVector3 ? e.uniforms[n] = {
            type: "v3",
            value: i.toArray()
          } : i && i.isVector4 ? e.uniforms[n] = {
            type: "v4",
            value: i.toArray()
          } : i && i.isMatrix3 ? e.uniforms[n] = {
            type: "m3",
            value: i.toArray()
          } : i && i.isMatrix4 ? e.uniforms[n] = {
            type: "m4",
            value: i.toArray()
          } : e.uniforms[n] = {
            value: i
          }
        }
        Object.keys(this.defines).length > 0 && (e.defines = this.defines), e.vertexShader = this.vertexShader, e.fragmentShader = this.fragmentShader, e.lights = this.lights, e.clipping = this.clipping;
        const n = {};
        for (const t in this.extensions) !0 === this.extensions[t] && (n[t] = !0);
        return Object.keys(n).length > 0 && (e.extensions = n), e
      }
    }
    const fm = new Up,
      mm = new Up,
      gm = new Up,
      _m = new Up,
      vm = new Up,
      xm = new Up,
      ym = new Up;
    class bm {
      constructor(t = new Up, e = new Up(0, 0, -1)) {
        this.origin = t, this.direction = e
      }
      set(t, e) {
        return this.origin.copy(t), this.direction.copy(e), this
      }
      copy(t) {
        return this.origin.copy(t.origin), this.direction.copy(t.direction), this
      }
      at(t, e) {
        return e.copy(this.origin).addScaledVector(this.direction, t)
      }
      lookAt(t) {
        return this.direction.copy(t).sub(this.origin).normalize(), this
      }
      recast(t) {
        return this.origin.copy(this.at(t, fm)), this
      }
      closestPointToPoint(t, e) {
        e.subVectors(t, this.origin);
        const n = e.dot(this.direction);
        return n < 0 ? e.copy(this.origin) : e.copy(this.origin).addScaledVector(this.direction, n)
      }
      distanceToPoint(t) {
        return Math.sqrt(this.distanceSqToPoint(t))
      }
      distanceSqToPoint(t) {
        const e = fm.subVectors(t, this.origin).dot(this.direction);
        return e < 0 ? this.origin.distanceToSquared(t) : (fm.copy(this.origin).addScaledVector(this.direction, e), fm.distanceToSquared(t))
      }
      distanceSqToSegment(t, e, n, i) {
        mm.copy(t).add(e).multiplyScalar(.5), gm.copy(e).sub(t).normalize(), _m.copy(this.origin).sub(mm);
        const r = .5 * t.distanceTo(e),
          a = -this.direction.dot(gm),
          s = _m.dot(this.direction),
          o = -_m.dot(gm),
          l = _m.lengthSq(),
          c = Math.abs(1 - a * a);
        let u, h, d, p;
        if (c > 0)
          if (u = a * o - s, h = a * s - o, p = r * c, u >= 0)
            if (h >= -p)
              if (h <= p) {
                const t = 1 / c;
                u *= t, h *= t, d = u * (u + a * h + 2 * s) + h * (a * u + h + 2 * o) + l
              } else h = r, u = Math.max(0, -(a * h + s)), d = -u * u + h * (h + 2 * o) + l;
        else h = -r, u = Math.max(0, -(a * h + s)), d = -u * u + h * (h + 2 * o) + l;
        else h <= -p ? (u = Math.max(0, -(-a * r + s)), h = u > 0 ? -r : Math.min(Math.max(-r, -o), r), d = -u * u + h * (h + 2 * o) + l) : h <= p ? (u = 0, h = Math.min(Math.max(-r, -o), r), d = h * (h + 2 * o) + l) : (u = Math.max(0, -(a * r + s)), h = u > 0 ? r : Math.min(Math.max(-r, -o), r), d = -u * u + h * (h + 2 * o) + l);
        else h = a > 0 ? -r : r, u = Math.max(0, -(a * h + s)), d = -u * u + h * (h + 2 * o) + l;
        return n && n.copy(this.origin).addScaledVector(this.direction, u), i && i.copy(mm).addScaledVector(gm, h), d
      }
      intersectSphere(t, e) {
        fm.subVectors(t.center, this.origin);
        const n = fm.dot(this.direction),
          i = fm.dot(fm) - n * n,
          r = t.radius * t.radius;
        if (i > r) return null;
        const a = Math.sqrt(r - i),
          s = n - a,
          o = n + a;
        return o < 0 ? null : s < 0 ? this.at(o, e) : this.at(s, e)
      }
      intersectsSphere(t) {
        return this.distanceSqToPoint(t.center) <= t.radius * t.radius
      }
      distanceToPlane(t) {
        const e = t.normal.dot(this.direction);
        if (0 === e) return 0 === t.distanceToPoint(this.origin) ? 0 : null;
        const n = -(this.origin.dot(t.normal) + t.constant) / e;
        return n >= 0 ? n : null
      }
      intersectPlane(t, e) {
        const n = this.distanceToPlane(t);
        return null === n ? null : this.at(n, e)
      }
      intersectsPlane(t) {
        const e = t.distanceToPoint(this.origin);
        return 0 === e || t.normal.dot(this.direction) * e < 0
      }
      intersectBox(t, e) {
        let n, i, r, a, s, o;
        const l = 1 / this.direction.x,
          c = 1 / this.direction.y,
          u = 1 / this.direction.z,
          h = this.origin;
        return l >= 0 ? (n = (t.min.x - h.x) * l, i = (t.max.x - h.x) * l) : (n = (t.max.x - h.x) * l, i = (t.min.x - h.x) * l), c >= 0 ? (r = (t.min.y - h.y) * c, a = (t.max.y - h.y) * c) : (r = (t.max.y - h.y) * c, a = (t.min.y - h.y) * c), n > a || r > i ? null : ((r > n || isNaN(n)) && (n = r), (a < i || isNaN(i)) && (i = a), u >= 0 ? (s = (t.min.z - h.z) * u, o = (t.max.z - h.z) * u) : (s = (t.max.z - h.z) * u, o = (t.min.z - h.z) * u), n > o || s > i ? null : ((s > n || n != n) && (n = s), (o < i || i != i) && (i = o), i < 0 ? null : this.at(n >= 0 ? n : i, e)))
      }
      intersectsBox(t) {
        return null !== this.intersectBox(t, fm)
      }
      intersectTriangle(t, e, n, i, r) {
        vm.subVectors(e, t), xm.subVectors(n, t), ym.crossVectors(vm, xm);
        let a, s = this.direction.dot(ym);
        if (s > 0) {
          if (i) return null;
          a = 1
        } else {
          if (!(s < 0)) return null;
          a = -1, s = -s
        }
        _m.subVectors(this.origin, t);
        const o = a * this.direction.dot(xm.crossVectors(_m, xm));
        if (o < 0) return null;
        const l = a * this.direction.dot(vm.cross(_m));
        if (l < 0) return null;
        if (o + l > s) return null;
        const c = -a * _m.dot(ym);
        return c < 0 ? null : this.at(c / s, r)
      }
      applyMatrix4(t) {
        return this.origin.applyMatrix4(t), this.direction.transformDirection(t), this
      }
      equals(t) {
        return t.origin.equals(this.origin) && t.direction.equals(this.direction)
      }
      clone() {
        return (new this.constructor).copy(this)
      }
    }
    const Mm = new Up,
      Sm = new Up,
      Em = new Up,
      Tm = new Up,
      wm = new Up,
      Am = new Up,
      Rm = new Up,
      Cm = new Up,
      Pm = new Up,
      Dm = new Up,
      Lm = new Hf,
      Im = new Hf,
      Um = new Hf;
    class Nm {
      constructor(t = new Up, e = new Up, n = new Up) {
        this.a = t, this.b = e, this.c = n
      }
      static getNormal(t, e, n, i) {
        i.subVectors(n, e), Mm.subVectors(t, e), i.cross(Mm);
        const r = i.lengthSq();
        return r > 0 ? i.multiplyScalar(1 / Math.sqrt(r)) : i.set(0, 0, 0)
      }
      static getBarycoord(t, e, n, i, r) {
        Mm.subVectors(i, e), Sm.subVectors(n, e), Em.subVectors(t, e);
        const a = Mm.dot(Mm),
          s = Mm.dot(Sm),
          o = Mm.dot(Em),
          l = Sm.dot(Sm),
          c = Sm.dot(Em),
          u = a * l - s * s;
        if (0 === u) return r.set(0, 0, 0), null;
        const h = 1 / u,
          d = (l * o - s * c) * h,
          p = (a * c - s * o) * h;
        return r.set(1 - d - p, p, d)
      }
      static containsPoint(t, e, n, i) {
        return null !== this.getBarycoord(t, e, n, i, Tm) && Tm.x >= 0 && Tm.y >= 0 && Tm.x + Tm.y <= 1
      }
      static getInterpolation(t, e, n, i, r, a, s, o) {
        return null === this.getBarycoord(t, e, n, i, Tm) ? (o.x = 0, o.y = 0, "z" in o && (o.z = 0), "w" in o && (o.w = 0), null) : (o.setScalar(0), o.addScaledVector(r, Tm.x), o.addScaledVector(a, Tm.y), o.addScaledVector(s, Tm.z), o)
      }
      static getInterpolatedAttribute(t, e, n, i, r, a) {
        return Lm.setScalar(0), Im.setScalar(0), Um.setScalar(0), Lm.fromBufferAttribute(t, e), Im.fromBufferAttribute(t, n), Um.fromBufferAttribute(t, i), a.setScalar(0), a.addScaledVector(Lm, r.x), a.addScaledVector(Im, r.y), a.addScaledVector(Um, r.z), a
      }
      static isFrontFacing(t, e, n, i) {
        return Mm.subVectors(n, e), Sm.subVectors(t, e), Mm.cross(Sm).dot(i) < 0
      }
      set(t, e, n) {
        return this.a.copy(t), this.b.copy(e), this.c.copy(n), this
      }
      setFromPointsAndIndices(t, e, n, i) {
        return this.a.copy(t[e]), this.b.copy(t[n]), this.c.copy(t[i]), this
      }
      setFromAttributeAndIndices(t, e, n, i) {
        return this.a.fromBufferAttribute(t, e), this.b.fromBufferAttribute(t, n), this.c.fromBufferAttribute(t, i), this
      }
      clone() {
        return (new this.constructor).copy(this)
      }
      copy(t) {
        return this.a.copy(t.a), this.b.copy(t.b), this.c.copy(t.c), this
      }
      getArea() {
        return Mm.subVectors(this.c, this.b), Sm.subVectors(this.a, this.b), .5 * Mm.cross(Sm).length()
      }
      getMidpoint(t) {
        return t.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
      }
      getNormal(t) {
        return Nm.getNormal(this.a, this.b, this.c, t)
      }
      getPlane(t) {
        return t.setFromCoplanarPoints(this.a, this.b, this.c)
      }
      getBarycoord(t, e) {
        return Nm.getBarycoord(t, this.a, this.b, this.c, e)
      }
      getInterpolation(t, e, n, i, r) {
        return Nm.getInterpolation(t, this.a, this.b, this.c, e, n, i, r)
      }
      containsPoint(t) {
        return Nm.containsPoint(t, this.a, this.b, this.c)
      }
      isFrontFacing(t) {
        return Nm.isFrontFacing(this.a, this.b, this.c, t)
      }
      intersectsBox(t) {
        return t.intersectsTriangle(this)
      }
      closestPointToPoint(t, e) {
        const n = this.a,
          i = this.b,
          r = this.c;
        let a, s;
        wm.subVectors(i, n), Am.subVectors(r, n), Cm.subVectors(t, n);
        const o = wm.dot(Cm),
          l = Am.dot(Cm);
        if (o <= 0 && l <= 0) return e.copy(n);
        Pm.subVectors(t, i);
        const c = wm.dot(Pm),
          u = Am.dot(Pm);
        if (c >= 0 && u <= c) return e.copy(i);
        const h = o * u - c * l;
        if (h <= 0 && o >= 0 && c <= 0) return a = o / (o - c), e.copy(n).addScaledVector(wm, a);
        Dm.subVectors(t, r);
        const d = wm.dot(Dm),
          p = Am.dot(Dm);
        if (p >= 0 && d <= p) return e.copy(r);
        const f = d * l - o * p;
        if (f <= 0 && l >= 0 && p <= 0) return s = l / (l - p), e.copy(n).addScaledVector(Am, s);
        const m = c * p - d * u;
        if (m <= 0 && u - c >= 0 && d - p >= 0) return Rm.subVectors(r, i), s = (u - c) / (u - c + (d - p)), e.copy(i).addScaledVector(Rm, s);
        const g = 1 / (m + f + h);
        return a = f * g, s = h * g, e.copy(n).addScaledVector(wm, a).addScaledVector(Am, s)
      }
      equals(t) {
        return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c)
      }
    }
    class Om extends lm {
      constructor(t) {
        super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new Pp(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new qp, this.combine = 0, this.reflectivity = 1, this.refractionRatio = .98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(t)
      }
      copy(t) {
        return super.copy(t), this.color.copy(t.color), this.map = t.map, this.lightMap = t.lightMap, this.lightMapIntensity = t.lightMapIntensity, this.aoMap = t.aoMap, this.aoMapIntensity = t.aoMapIntensity, this.specularMap = t.specularMap, this.alphaMap = t.alphaMap, this.envMap = t.envMap, this.envMapRotation.copy(t.envMapRotation), this.combine = t.combine, this.reflectivity = t.reflectivity, this.refractionRatio = t.refractionRatio, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this.wireframeLinecap = t.wireframeLinecap, this.wireframeLinejoin = t.wireframeLinejoin, this.fog = t.fog, this
      }
    }
    const Fm = new Fp,
      Bm = new bm,
      zm = new If,
      km = new Up,
      Hm = new Up,
      Vm = new Up,
      Gm = new Up,
      Wm = new Up,
      Xm = new Up,
      jm = new Up,
      qm = new Up;
    class Ym extends hf {
      constructor(t = new rm, e = new Om) {
        super(), this.isMesh = !0, this.type = "Mesh", this.geometry = t, this.material = e, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.updateMorphTargets()
      }
      copy(t, e) {
        return super.copy(t, e), void 0 !== t.morphTargetInfluences && (this.morphTargetInfluences = t.morphTargetInfluences.slice()), void 0 !== t.morphTargetDictionary && (this.morphTargetDictionary = Object.assign({}, t.morphTargetDictionary)), this.material = Array.isArray(t.material) ? t.material.slice() : t.material, this.geometry = t.geometry, this
      }
      updateMorphTargets() {
        const t = this.geometry.morphAttributes,
          e = Object.keys(t);
        if (e.length > 0) {
          const n = t[e[0]];
          if (void 0 !== n) {
            this.morphTargetInfluences = [], this.morphTargetDictionary = {};
            for (let t = 0, e = n.length; t < e; t++) {
              const e = n[t].name || String(t);
              this.morphTargetInfluences.push(0), this.morphTargetDictionary[e] = t
            }
          }
        }
      }
      getVertexPosition(t, e) {
        const n = this.geometry,
          i = n.attributes.position,
          r = n.morphAttributes.position,
          a = n.morphTargetsRelative;
        e.fromBufferAttribute(i, t);
        const s = this.morphTargetInfluences;
        if (r && s) {
          Xm.set(0, 0, 0);
          for (let n = 0, i = r.length; n < i; n++) {
            const i = s[n],
              o = r[n];
            0 !== i && (Wm.fromBufferAttribute(o, t), a ? Xm.addScaledVector(Wm, i) : Xm.addScaledVector(Wm.sub(e), i))
          }
          e.add(Xm)
        }
        return e
      }
      raycast(t, e) {
        const n = this.geometry,
          i = this.material,
          r = this.matrixWorld;
        if (void 0 !== i) {
          if (null === n.boundingSphere && n.computeBoundingSphere(), zm.copy(n.boundingSphere), zm.applyMatrix4(r), Bm.copy(t.ray).recast(t.near), !1 === zm.containsPoint(Bm.origin)) {
            if (null === Bm.intersectSphere(zm, km)) return;
            if (Bm.origin.distanceToSquared(km) > (t.far - t.near) ** 2) return
          }
          Fm.copy(r).invert(), Bm.copy(t.ray).applyMatrix4(Fm), null !== n.boundingBox && !1 === Bm.intersectsBox(n.boundingBox) || this._computeIntersections(t, e, Bm)
        }
      }
      _computeIntersections(t, e, n) {
        let i;
        const r = this.geometry,
          a = this.material,
          s = r.index,
          o = r.attributes.position,
          l = r.attributes.uv,
          c = r.attributes.uv1,
          u = r.attributes.normal,
          h = r.groups,
          d = r.drawRange;
        if (null !== s)
          if (Array.isArray(a))
            for (let r = 0, o = h.length; r < o; r++) {
              const o = h[r],
                p = a[o.materialIndex];
              for (let r = Math.max(o.start, d.start), a = Math.min(s.count, Math.min(o.start + o.count, d.start + d.count)); r < a; r += 3) i = $m(this, p, t, n, l, c, u, s.getX(r), s.getX(r + 1), s.getX(r + 2)), i && (i.faceIndex = Math.floor(r / 3), i.face.materialIndex = o.materialIndex, e.push(i))
            } else
              for (let r = Math.max(0, d.start), o = Math.min(s.count, d.start + d.count); r < o; r += 3) i = $m(this, a, t, n, l, c, u, s.getX(r), s.getX(r + 1), s.getX(r + 2)), i && (i.faceIndex = Math.floor(r / 3), e.push(i));
          else if (void 0 !== o)
          if (Array.isArray(a))
            for (let r = 0, s = h.length; r < s; r++) {
              const s = h[r],
                p = a[s.materialIndex];
              for (let r = Math.max(s.start, d.start), a = Math.min(o.count, Math.min(s.start + s.count, d.start + d.count)); r < a; r += 3) i = $m(this, p, t, n, l, c, u, r, r + 1, r + 2), i && (i.faceIndex = Math.floor(r / 3), i.face.materialIndex = s.materialIndex, e.push(i))
            } else
              for (let r = Math.max(0, d.start), s = Math.min(o.count, d.start + d.count); r < s; r += 3) i = $m(this, a, t, n, l, c, u, r, r + 1, r + 2), i && (i.faceIndex = Math.floor(r / 3), e.push(i))
      }
    }

    function $m(t, e, n, i, r, a, s, o, l, c) {
      t.getVertexPosition(o, Hm), t.getVertexPosition(l, Vm), t.getVertexPosition(c, Gm);
      const u = function(t, e, n, i, r, a, s, o) {
        let l;
        if (l = 1 === e.side ? i.intersectTriangle(s, a, r, !0, o) : i.intersectTriangle(r, a, s, 0 === e.side, o), null === l) return null;
        qm.copy(o), qm.applyMatrix4(t.matrixWorld);
        const c = n.ray.origin.distanceTo(qm);
        return c < n.near || c > n.far ? null : {
          distance: c,
          point: qm.clone(),
          object: t
        }
      }(t, e, n, i, Hm, Vm, Gm, jm);
      if (u) {
        const t = new Up;
        Nm.getBarycoord(jm, Hm, Vm, Gm, t), r && (u.uv = Nm.getInterpolatedAttribute(r, o, l, c, t, new cp)), a && (u.uv1 = Nm.getInterpolatedAttribute(a, o, l, c, t, new cp)), s && (u.normal = Nm.getInterpolatedAttribute(s, o, l, c, t, new Up), u.normal.dot(i.direction) > 0 && u.normal.multiplyScalar(-1));
        const e = {
          a: o,
          b: l,
          c,
          normal: new Up,
          materialIndex: 0
        };
        Nm.getNormal(Hm, Vm, Gm, e.normal), u.face = e, u.barycoord = t
      }
      return u
    }
    const Km = {
        alphahash_fragment: "\n#ifdef USE_ALPHAHASH\n\n\tif ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;\n\n#endif\n",
        alphahash_pars_fragment: "\n#ifdef USE_ALPHAHASH\n\n\t/**\n\t * See: https://casual-effects.com/research/Wyman2017Hashed/index.html\n\t */\n\n\tconst float ALPHA_HASH_SCALE = 0.05; // Derived from trials only, and may be changed.\n\n\tfloat hash2D( vec2 value ) {\n\n\t\treturn fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );\n\n\t}\n\n\tfloat hash3D( vec3 value ) {\n\n\t\treturn hash2D( vec2( hash2D( value.xy ), value.z ) );\n\n\t}\n\n\tfloat getAlphaHashThreshold( vec3 position ) {\n\n\t\t// Find the discretized derivatives of our coordinates\n\t\tfloat maxDeriv = max(\n\t\t\tlength( dFdx( position.xyz ) ),\n\t\t\tlength( dFdy( position.xyz ) )\n\t\t);\n\t\tfloat pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );\n\n\t\t// Find two nearest log-discretized noise scales\n\t\tvec2 pixScales = vec2(\n\t\t\texp2( floor( log2( pixScale ) ) ),\n\t\t\texp2( ceil( log2( pixScale ) ) )\n\t\t);\n\n\t\t// Compute alpha thresholds at our two noise scales\n\t\tvec2 alpha = vec2(\n\t\t\thash3D( floor( pixScales.x * position.xyz ) ),\n\t\t\thash3D( floor( pixScales.y * position.xyz ) )\n\t\t);\n\n\t\t// Factor to interpolate lerp with\n\t\tfloat lerpFactor = fract( log2( pixScale ) );\n\n\t\t// Interpolate alpha threshold from noise at two scales\n\t\tfloat x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;\n\n\t\t// Pass into CDF to compute uniformly distrib threshold\n\t\tfloat a = min( lerpFactor, 1.0 - lerpFactor );\n\t\tvec3 cases = vec3(\n\t\t\tx * x / ( 2.0 * a * ( 1.0 - a ) ),\n\t\t\t( x - 0.5 * a ) / ( 1.0 - a ),\n\t\t\t1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )\n\t\t);\n\n\t\t// Find our final, uniformly distributed alpha threshold (ατ)\n\t\tfloat threshold = ( x < ( 1.0 - a ) )\n\t\t\t? ( ( x < a ) ? cases.x : cases.y )\n\t\t\t: cases.z;\n\n\t\t// Avoids ατ == 0. Could also do ατ =1-ατ\n\t\treturn clamp( threshold , 1.0e-6, 1.0 );\n\n\t}\n\n#endif\n",
        alphamap_fragment: "\n#ifdef USE_ALPHAMAP\n\n\tdiffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;\n\n#endif\n",
        alphamap_pars_fragment: "\n#ifdef USE_ALPHAMAP\n\n\tuniform sampler2D alphaMap;\n\n#endif\n",
        alphatest_fragment: "\n#ifdef USE_ALPHATEST\n\n\t#ifdef ALPHA_TO_COVERAGE\n\n\tdiffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );\n\tif ( diffuseColor.a == 0.0 ) discard;\n\n\t#else\n\n\tif ( diffuseColor.a < alphaTest ) discard;\n\n\t#endif\n\n#endif\n",
        alphatest_pars_fragment: "\n#ifdef USE_ALPHATEST\n\tuniform float alphaTest;\n#endif\n",
        aomap_fragment: "\n#ifdef USE_AOMAP\n\n\t// reads channel R, compatible with a combined OcclusionRoughnessMetallic (RGB) texture\n\tfloat ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;\n\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\n\t#if defined( USE_CLEARCOAT ) \n\t\tclearcoatSpecularIndirect *= ambientOcclusion;\n\t#endif\n\n\t#if defined( USE_SHEEN ) \n\t\tsheenSpecularIndirect *= ambientOcclusion;\n\t#endif\n\n\t#if defined( USE_ENVMAP ) && defined( STANDARD )\n\n\t\tfloat dotNV = saturate( dot( geometryNormal, geometryViewDir ) );\n\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );\n\n\t#endif\n\n#endif\n",
        aomap_pars_fragment: "\n#ifdef USE_AOMAP\n\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n\n#endif\n",
        batching_pars_vertex: "\n#ifdef USE_BATCHING\n\t#if ! defined( GL_ANGLE_multi_draw )\n\t#define gl_DrawID _gl_DrawID\n\tuniform int _gl_DrawID;\n\t#endif\n\n\tuniform highp sampler2D batchingTexture;\n\tuniform highp usampler2D batchingIdTexture;\n\tmat4 getBatchingMatrix( const in float i ) {\n\n\t\tint size = textureSize( batchingTexture, 0 ).x;\n\t\tint j = int( i ) * 4;\n\t\tint x = j % size;\n\t\tint y = j / size;\n\t\tvec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );\n\t\tvec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );\n\t\tvec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );\n\t\tvec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );\n\t\treturn mat4( v1, v2, v3, v4 );\n\n\t}\n\n\tfloat getIndirectIndex( const in int i ) {\n\n\t\tint size = textureSize( batchingIdTexture, 0 ).x;\n\t\tint x = i % size;\n\t\tint y = i / size;\n\t\treturn float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );\n\n\t}\n\n#endif\n\n#ifdef USE_BATCHING_COLOR\n\n\tuniform sampler2D batchingColorTexture;\n\tvec3 getBatchingColor( const in float i ) {\n\n\t\tint size = textureSize( batchingColorTexture, 0 ).x;\n\t\tint j = int( i );\n\t\tint x = j % size;\n\t\tint y = j / size;\n\t\treturn texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;\n\n\t}\n\n#endif\n",
        batching_vertex: "\n#ifdef USE_BATCHING\n\tmat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );\n#endif\n",
        begin_vertex: "\nvec3 transformed = vec3( position );\n\n#ifdef USE_ALPHAHASH\n\n\tvPosition = vec3( position );\n\n#endif\n",
        beginnormal_vertex: "\nvec3 objectNormal = vec3( normal );\n\n#ifdef USE_TANGENT\n\n\tvec3 objectTangent = vec3( tangent.xyz );\n\n#endif\n",
        bsdfs: "\n\nfloat G_BlinnPhong_Implicit( /* const in float dotNL, const in float dotNV */ ) {\n\n\t// geometry term is (n dot l)(n dot v) / 4(n dot l)(n dot v)\n\treturn 0.25;\n\n}\n\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n\n}\n\nvec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {\n\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\n\tvec3 F = F_Schlick( specularColor, 1.0, dotVH );\n\n\tfloat G = G_BlinnPhong_Implicit( /* dotNL, dotNV */ );\n\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\n\treturn F * ( G * D );\n\n} // validated\n\n",
        iridescence_fragment: "\n\n#ifdef USE_IRIDESCENCE\n\n\t// XYZ to linear-sRGB color space\n\tconst mat3 XYZ_TO_REC709 = mat3(\n\t\t 3.2404542, -0.9692660,  0.0556434,\n\t\t-1.5371385,  1.8760108, -0.2040259,\n\t\t-0.4985314,  0.0415560,  1.0572252\n\t);\n\n\t// Assume air interface for top\n\t// Note: We don't handle the case fresnel0 == 1\n\tvec3 Fresnel0ToIor( vec3 fresnel0 ) {\n\n\t\tvec3 sqrtF0 = sqrt( fresnel0 );\n\t\treturn ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );\n\n\t}\n\n\t// Conversion FO/IOR\n\tvec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {\n\n\t\treturn pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );\n\n\t}\n\n\t// ior is a value between 1.0 and 3.0. 1.0 is air interface\n\tfloat IorToFresnel0( float transmittedIor, float incidentIor ) {\n\n\t\treturn pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));\n\n\t}\n\n\t// Fresnel equations for dielectric/dielectric interfaces.\n\t// Ref: https://belcour.github.io/blog/research/2017/05/01/brdf-thin-film.html\n\t// Evaluation XYZ sensitivity curves in Fourier space\n\tvec3 evalSensitivity( float OPD, vec3 shift ) {\n\n\t\tfloat phase = 2.0 * PI * OPD * 1.0e-9;\n\t\tvec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );\n\t\tvec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );\n\t\tvec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );\n\n\t\tvec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );\n\t\txyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );\n\t\txyz /= 1.0685e-7;\n\n\t\tvec3 rgb = XYZ_TO_REC709 * xyz;\n\t\treturn rgb;\n\n\t}\n\n\tvec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {\n\n\t\tvec3 I;\n\n\t\t// Force iridescenceIOR -> outsideIOR when thinFilmThickness -> 0.0\n\t\tfloat iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );\n\t\t// Evaluate the cosTheta on the base layer (Snell law)\n\t\tfloat sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );\n\n\t\t// Handle TIR:\n\t\tfloat cosTheta2Sq = 1.0 - sinTheta2Sq;\n\t\tif ( cosTheta2Sq < 0.0 ) {\n\n\t\t\treturn vec3( 1.0 );\n\n\t\t}\n\n\t\tfloat cosTheta2 = sqrt( cosTheta2Sq );\n\n\t\t// First interface\n\t\tfloat R0 = IorToFresnel0( iridescenceIOR, outsideIOR );\n\t\tfloat R12 = F_Schlick( R0, 1.0, cosTheta1 );\n\t\tfloat T121 = 1.0 - R12;\n\t\tfloat phi12 = 0.0;\n\t\tif ( iridescenceIOR < outsideIOR ) phi12 = PI;\n\t\tfloat phi21 = PI - phi12;\n\n\t\t// Second interface\n\t\tvec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) ); // guard against 1.0\n\t\tvec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );\n\t\tvec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );\n\t\tvec3 phi23 = vec3( 0.0 );\n\t\tif ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;\n\t\tif ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;\n\t\tif ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;\n\n\t\t// Phase shift\n\t\tfloat OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;\n\t\tvec3 phi = vec3( phi21 ) + phi23;\n\n\t\t// Compound terms\n\t\tvec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );\n\t\tvec3 r123 = sqrt( R123 );\n\t\tvec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );\n\n\t\t// Reflectance term for m = 0 (DC term amplitude)\n\t\tvec3 C0 = R12 + Rs;\n\t\tI = C0;\n\n\t\t// Reflectance term for m > 0 (pairs of diracs)\n\t\tvec3 Cm = Rs - T121;\n\t\tfor ( int m = 1; m <= 2; ++ m ) {\n\n\t\t\tCm *= r123;\n\t\t\tvec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );\n\t\t\tI += Cm * Sm;\n\n\t\t}\n\n\t\t// Since out of gamut colors might be produced, negative color values are clamped to 0.\n\t\treturn max( I, vec3( 0.0 ) );\n\n\t}\n\n#endif\n\n",
        bumpmap_pars_fragment: "\n#ifdef USE_BUMPMAP\n\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\n\t// Bump Mapping Unparametrized Surfaces on the GPU by Morten S. Mikkelsen\n\t// https://mmikk.github.io/papers3d/mm_sfgrad_bump.pdf\n\n\t// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)\n\n\tvec2 dHdxy_fwd() {\n\n\t\tvec2 dSTdx = dFdx( vBumpMapUv );\n\t\tvec2 dSTdy = dFdy( vBumpMapUv );\n\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;\n\n\t\treturn vec2( dBx, dBy );\n\n\t}\n\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {\n\n\t\t// normalize is done to ensure that the bump map looks the same regardless of the texture's scale\n\t\tvec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );\n\t\tvec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );\n\t\tvec3 vN = surf_norm; // normalized\n\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\n\t\tfloat fDet = dot( vSigmaX, R1 ) * faceDirection;\n\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\n\t}\n\n#endif\n",
        clipping_planes_fragment: "\n#if NUM_CLIPPING_PLANES > 0\n\n\tvec4 plane;\n\n\t#ifdef ALPHA_TO_COVERAGE\n\n\t\tfloat distanceToPlane, distanceGradient;\n\t\tfloat clipOpacity = 1.0;\n\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tdistanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n\t\t\tdistanceGradient = fwidth( distanceToPlane ) / 2.0;\n\t\t\tclipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n\n\t\t\tif ( clipOpacity == 0.0 ) discard;\n\n\t\t}\n\t\t#pragma unroll_loop_end\n\n\t\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\n\t\t\tfloat unionClipOpacity = 1.0;\n\n\t\t\t#pragma unroll_loop_start\n\t\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\n\t\t\t\tplane = clippingPlanes[ i ];\n\t\t\t\tdistanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;\n\t\t\t\tdistanceGradient = fwidth( distanceToPlane ) / 2.0;\n\t\t\t\tunionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );\n\n\t\t\t}\n\t\t\t#pragma unroll_loop_end\n\n\t\t\tclipOpacity *= 1.0 - unionClipOpacity;\n\n\t\t#endif\n\n\t\tdiffuseColor.a *= clipOpacity;\n\n\t\tif ( diffuseColor.a == 0.0 ) discard;\n\n\t#else\n\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tif ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;\n\n\t\t}\n\t\t#pragma unroll_loop_end\n\n\t\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\n\t\t\tbool clipped = true;\n\n\t\t\t#pragma unroll_loop_start\n\t\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\n\t\t\t\tplane = clippingPlanes[ i ];\n\t\t\t\tclipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;\n\n\t\t\t}\n\t\t\t#pragma unroll_loop_end\n\n\t\t\tif ( clipped ) discard;\n\n\t\t#endif\n\n\t#endif\n\n#endif\n",
        clipping_planes_pars_fragment: "\n#if NUM_CLIPPING_PLANES > 0\n\n\tvarying vec3 vClipPosition;\n\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n\n#endif\n",
        clipping_planes_pars_vertex: "\n#if NUM_CLIPPING_PLANES > 0\n\n\tvarying vec3 vClipPosition;\n\n#endif\n",
        clipping_planes_vertex: "\n#if NUM_CLIPPING_PLANES > 0\n\n\tvClipPosition = - mvPosition.xyz;\n\n#endif\n",
        color_fragment: "\n#if defined( USE_COLOR_ALPHA )\n\n\tdiffuseColor *= vColor;\n\n#elif defined( USE_COLOR )\n\n\tdiffuseColor.rgb *= vColor;\n\n#endif\n",
        color_pars_fragment: "\n#if defined( USE_COLOR_ALPHA )\n\n\tvarying vec4 vColor;\n\n#elif defined( USE_COLOR )\n\n\tvarying vec3 vColor;\n\n#endif\n",
        color_pars_vertex: "\n#if defined( USE_COLOR_ALPHA )\n\n\tvarying vec4 vColor;\n\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )\n\n\tvarying vec3 vColor;\n\n#endif\n",
        color_vertex: "\n#if defined( USE_COLOR_ALPHA )\n\n\tvColor = vec4( 1.0 );\n\n#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )\n\n\tvColor = vec3( 1.0 );\n\n#endif\n\n#ifdef USE_COLOR\n\n\tvColor *= color;\n\n#endif\n\n#ifdef USE_INSTANCING_COLOR\n\n\tvColor.xyz *= instanceColor.xyz;\n\n#endif\n\n#ifdef USE_BATCHING_COLOR\n\n\tvec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );\n\n\tvColor.xyz *= batchingColor.xyz;\n\n#endif\n",
        common: "\n#define PI 3.141592653589793\n#define PI2 6.283185307179586\n#define PI_HALF 1.5707963267948966\n#define RECIPROCAL_PI 0.3183098861837907\n#define RECIPROCAL_PI2 0.15915494309189535\n#define EPSILON 1e-6\n\n#ifndef saturate\n// <tonemapping_pars_fragment> may have defined saturate() already\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement( a ) ( 1.0 - saturate( a ) )\n\nfloat pow2( const in float x ) { return x*x; }\nvec3 pow2( const in vec3 x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }\nfloat average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }\n\n// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.\n// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/\nhighp float rand( const in vec2 uv ) {\n\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\n\treturn fract( sin( sn ) * c );\n\n}\n\n#ifdef HIGH_PRECISION\n\tfloat precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n\tfloat precisionSafeLength( vec3 v ) {\n\t\tfloat maxComponent = max3( abs( v ) );\n\t\treturn length( v / maxComponent ) * maxComponent;\n\t}\n#endif\n\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\n\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\n\n#ifdef USE_ALPHAHASH\n\n\tvarying vec3 vPosition;\n\n#endif\n\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n\n}\n\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\n\t// dir can be either a direction vector or a normal vector\n\t// upper-left 3x3 of matrix is assumed to be orthogonal\n\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n\n}\n\nmat3 transposeMat3( const in mat3 m ) {\n\n\tmat3 tmp;\n\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\n\treturn tmp;\n\n}\n\nbool isPerspectiveMatrix( mat4 m ) {\n\n\treturn m[ 2 ][ 3 ] == - 1.0;\n\n}\n\nvec2 equirectUv( in vec3 dir ) {\n\n\t// dir is assumed to be unit length\n\n\tfloat u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;\n\n\tfloat v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\n\treturn vec2( u, v );\n\n}\n\nvec3 BRDF_Lambert( const in vec3 diffuseColor ) {\n\n\treturn RECIPROCAL_PI * diffuseColor;\n\n} // validated\n\nvec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {\n\n\t// Original approximation by Christophe Schlick '94\n\t// float fresnel = pow( 1.0 - dotVH, 5.0 );\n\n\t// Optimized variant (presented by Epic at SIGGRAPH '13)\n\t// https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf\n\tfloat fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n\n\treturn f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n\n} // validated\n\nfloat F_Schlick( const in float f0, const in float f90, const in float dotVH ) {\n\n\t// Original approximation by Christophe Schlick '94\n\t// float fresnel = pow( 1.0 - dotVH, 5.0 );\n\n\t// Optimized variant (presented by Epic at SIGGRAPH '13)\n\t// https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf\n\tfloat fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );\n\n\treturn f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );\n\n} // validated\n",
        cube_uv_reflection_fragment: "\n#ifdef ENVMAP_TYPE_CUBE_UV\n\n\t#define cubeUV_minMipLevel 4.0\n\t#define cubeUV_minTileSize 16.0\n\n\t// These shader functions convert between the UV coordinates of a single face of\n\t// a cubemap, the 0-5 integer index of a cube face, and the direction vector for\n\t// sampling a textureCube (not generally normalized ).\n\n\tfloat getFace( vec3 direction ) {\n\n\t\tvec3 absDirection = abs( direction );\n\n\t\tfloat face = - 1.0;\n\n\t\tif ( absDirection.x > absDirection.z ) {\n\n\t\t\tif ( absDirection.x > absDirection.y )\n\n\t\t\t\tface = direction.x > 0.0 ? 0.0 : 3.0;\n\n\t\t\telse\n\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\n\t\t} else {\n\n\t\t\tif ( absDirection.z > absDirection.y )\n\n\t\t\t\tface = direction.z > 0.0 ? 2.0 : 5.0;\n\n\t\t\telse\n\n\t\t\t\tface = direction.y > 0.0 ? 1.0 : 4.0;\n\n\t\t}\n\n\t\treturn face;\n\n\t}\n\n\t// RH coordinate system; PMREM face-indexing convention\n\tvec2 getUV( vec3 direction, float face ) {\n\n\t\tvec2 uv;\n\n\t\tif ( face == 0.0 ) {\n\n\t\t\tuv = vec2( direction.z, direction.y ) / abs( direction.x ); // pos x\n\n\t\t} else if ( face == 1.0 ) {\n\n\t\t\tuv = vec2( - direction.x, - direction.z ) / abs( direction.y ); // pos y\n\n\t\t} else if ( face == 2.0 ) {\n\n\t\t\tuv = vec2( - direction.x, direction.y ) / abs( direction.z ); // pos z\n\n\t\t} else if ( face == 3.0 ) {\n\n\t\t\tuv = vec2( - direction.z, direction.y ) / abs( direction.x ); // neg x\n\n\t\t} else if ( face == 4.0 ) {\n\n\t\t\tuv = vec2( - direction.x, direction.z ) / abs( direction.y ); // neg y\n\n\t\t} else {\n\n\t\t\tuv = vec2( direction.x, direction.y ) / abs( direction.z ); // neg z\n\n\t\t}\n\n\t\treturn 0.5 * ( uv + 1.0 );\n\n\t}\n\n\tvec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {\n\n\t\tfloat face = getFace( direction );\n\n\t\tfloat filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );\n\n\t\tmipInt = max( mipInt, cubeUV_minMipLevel );\n\n\t\tfloat faceSize = exp2( mipInt );\n\n\t\thighp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0; // #25071\n\n\t\tif ( face > 2.0 ) {\n\n\t\t\tuv.y += faceSize;\n\n\t\t\tface -= 3.0;\n\n\t\t}\n\n\t\tuv.x += face * faceSize;\n\n\t\tuv.x += filterInt * 3.0 * cubeUV_minTileSize;\n\n\t\tuv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );\n\n\t\tuv.x *= CUBEUV_TEXEL_WIDTH;\n\t\tuv.y *= CUBEUV_TEXEL_HEIGHT;\n\n\t\t#ifdef texture2DGradEXT\n\n\t\t\treturn texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb; // disable anisotropic filtering\n\n\t\t#else\n\n\t\t\treturn texture2D( envMap, uv ).rgb;\n\n\t\t#endif\n\n\t}\n\n\t// These defines must match with PMREMGenerator\n\n\t#define cubeUV_r0 1.0\n\t#define cubeUV_m0 - 2.0\n\t#define cubeUV_r1 0.8\n\t#define cubeUV_m1 - 1.0\n\t#define cubeUV_r4 0.4\n\t#define cubeUV_m4 2.0\n\t#define cubeUV_r5 0.305\n\t#define cubeUV_m5 3.0\n\t#define cubeUV_r6 0.21\n\t#define cubeUV_m6 4.0\n\n\tfloat roughnessToMip( float roughness ) {\n\n\t\tfloat mip = 0.0;\n\n\t\tif ( roughness >= cubeUV_r1 ) {\n\n\t\t\tmip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;\n\n\t\t} else if ( roughness >= cubeUV_r4 ) {\n\n\t\t\tmip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;\n\n\t\t} else if ( roughness >= cubeUV_r5 ) {\n\n\t\t\tmip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;\n\n\t\t} else if ( roughness >= cubeUV_r6 ) {\n\n\t\t\tmip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;\n\n\t\t} else {\n\n\t\t\tmip = - 2.0 * log2( 1.16 * roughness ); // 1.16 = 1.79^0.25\n\t\t}\n\n\t\treturn mip;\n\n\t}\n\n\tvec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {\n\n\t\tfloat mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );\n\n\t\tfloat mipF = fract( mip );\n\n\t\tfloat mipInt = floor( mip );\n\n\t\tvec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );\n\n\t\tif ( mipF == 0.0 ) {\n\n\t\t\treturn vec4( color0, 1.0 );\n\n\t\t} else {\n\n\t\t\tvec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );\n\n\t\t\treturn vec4( mix( color0, color1, mipF ), 1.0 );\n\n\t\t}\n\n\t}\n\n#endif\n",
        defaultnormal_vertex: "\n\nvec3 transformedNormal = objectNormal;\n#ifdef USE_TANGENT\n\n\tvec3 transformedTangent = objectTangent;\n\n#endif\n\n#ifdef USE_BATCHING\n\n\t// this is in lieu of a per-instance normal-matrix\n\t// shear transforms in the instance matrix are not supported\n\n\tmat3 bm = mat3( batchingMatrix );\n\ttransformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );\n\ttransformedNormal = bm * transformedNormal;\n\n\t#ifdef USE_TANGENT\n\n\t\ttransformedTangent = bm * transformedTangent;\n\n\t#endif\n\n#endif\n\n#ifdef USE_INSTANCING\n\n\t// this is in lieu of a per-instance normal-matrix\n\t// shear transforms in the instance matrix are not supported\n\n\tmat3 im = mat3( instanceMatrix );\n\ttransformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );\n\ttransformedNormal = im * transformedNormal;\n\n\t#ifdef USE_TANGENT\n\n\t\ttransformedTangent = im * transformedTangent;\n\n\t#endif\n\n#endif\n\ntransformedNormal = normalMatrix * transformedNormal;\n\n#ifdef FLIP_SIDED\n\n\ttransformedNormal = - transformedNormal;\n\n#endif\n\n#ifdef USE_TANGENT\n\n\ttransformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;\n\n\t#ifdef FLIP_SIDED\n\n\t\ttransformedTangent = - transformedTangent;\n\n\t#endif\n\n#endif\n",
        displacementmap_pars_vertex: "\n#ifdef USE_DISPLACEMENTMAP\n\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n\n#endif\n",
        displacementmap_vertex: "\n#ifdef USE_DISPLACEMENTMAP\n\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );\n\n#endif\n",
        emissivemap_fragment: "\n#ifdef USE_EMISSIVEMAP\n\n\tvec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );\n\n\t#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE\n\n\t\t// use inline sRGB decode until browsers properly support SRGB8_ALPHA8 with video textures (#26516)\n\n\t\temissiveColor = sRGBTransferEOTF( emissiveColor );\n\n\t#endif\n\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n\n#endif\n",
        emissivemap_pars_fragment: "\n#ifdef USE_EMISSIVEMAP\n\n\tuniform sampler2D emissiveMap;\n\n#endif\n",
        colorspace_fragment: "\ngl_FragColor = linearToOutputTexel( gl_FragColor );\n",
        colorspace_pars_fragment: "\n\nvec4 LinearTransferOETF( in vec4 value ) {\n\treturn value;\n}\n\nvec4 sRGBTransferEOTF( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\n\nvec4 sRGBTransferOETF( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}\n\n",
        envmap_fragment: "\n#ifdef USE_ENVMAP\n\n\t#ifdef ENV_WORLDPOS\n\n\t\tvec3 cameraToFrag;\n\n\t\tif ( isOrthographic ) {\n\n\t\t\tcameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\n\t\t} else {\n\n\t\t\tcameraToFrag = normalize( vWorldPosition - cameraPosition );\n\n\t\t}\n\n\t\t// Transforming Normal Vectors with the Inverse Transformation\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\n\t\t\tvec3 reflectVec = reflect( cameraToFrag, worldNormal );\n\n\t\t#else\n\n\t\t\tvec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n\n\t\t#endif\n\n\t#else\n\n\t\tvec3 reflectVec = vReflect;\n\n\t#endif\n\n\t#ifdef ENVMAP_TYPE_CUBE\n\n\t\tvec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\n\t#else\n\n\t\tvec4 envColor = vec4( 0.0 );\n\n\t#endif\n\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\n\t#endif\n\n#endif\n",
        envmap_common_pars_fragment: "\n#ifdef USE_ENVMAP\n\n\tuniform float envMapIntensity;\n\tuniform float flipEnvMap;\n\tuniform mat3 envMapRotation;\n\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\t\n#endif\n",
        envmap_pars_fragment: "\n#ifdef USE_ENVMAP\n\n\tuniform float reflectivity;\n\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n\n\t\t#define ENV_WORLDPOS\n\n\t#endif\n\n\t#ifdef ENV_WORLDPOS\n\n\t\tvarying vec3 vWorldPosition;\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n\n#endif\n",
        envmap_pars_vertex: "\n#ifdef USE_ENVMAP\n\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )\n\n\t\t#define ENV_WORLDPOS\n\n\t#endif\n\n\t#ifdef ENV_WORLDPOS\n\t\t\n\t\tvarying vec3 vWorldPosition;\n\n\t#else\n\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\n\t#endif\n\n#endif\n",
        envmap_physical_pars_fragment: "\n#ifdef USE_ENVMAP\n\n\tvec3 getIBLIrradiance( const in vec3 normal ) {\n\n\t\t#ifdef ENVMAP_TYPE_CUBE_UV\n\n\t\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );\n\n\t\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\n\t\t#else\n\n\t\t\treturn vec3( 0.0 );\n\n\t\t#endif\n\n\t}\n\n\tvec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {\n\n\t\t#ifdef ENVMAP_TYPE_CUBE_UV\n\n\t\t\tvec3 reflectVec = reflect( - viewDir, normal );\n\n\t\t\t// Mixing the reflection with the normal is more accurate and keeps rough objects from gathering light from behind their tangent plane.\n\t\t\treflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );\n\n\t\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );\n\n\t\t\treturn envMapColor.rgb * envMapIntensity;\n\n\t\t#else\n\n\t\t\treturn vec3( 0.0 );\n\n\t\t#endif\n\n\t}\n\n\t#ifdef USE_ANISOTROPY\n\n\t\tvec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {\n\n\t\t\t#ifdef ENVMAP_TYPE_CUBE_UV\n\n\t\t\t  // https://google.github.io/filament/Filament.md.html#lighting/imagebasedlights/anisotropy\n\t\t\t\tvec3 bentNormal = cross( bitangent, viewDir );\n\t\t\t\tbentNormal = normalize( cross( bentNormal, bitangent ) );\n\t\t\t\tbentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );\n\n\t\t\t\treturn getIBLRadiance( viewDir, bentNormal, roughness );\n\n\t\t\t#else\n\n\t\t\t\treturn vec3( 0.0 );\n\n\t\t\t#endif\n\n\t\t}\n\n\t#endif\n\n#endif\n",
        envmap_vertex: "\n#ifdef USE_ENVMAP\n\n\t#ifdef ENV_WORLDPOS\n\n\t\tvWorldPosition = worldPosition.xyz;\n\n\t#else\n\n\t\tvec3 cameraToVertex;\n\n\t\tif ( isOrthographic ) {\n\n\t\t\tcameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\n\t\t} else {\n\n\t\t\tcameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\n\t\t}\n\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\n\t\t#else\n\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\n\t\t#endif\n\n\t#endif\n\n#endif\n",
        fog_vertex: "\n#ifdef USE_FOG\n\n\tvFogDepth = - mvPosition.z;\n\n#endif\n",
        fog_pars_vertex: "\n#ifdef USE_FOG\n\n\tvarying float vFogDepth;\n\n#endif\n",
        fog_fragment: "\n#ifdef USE_FOG\n\n\t#ifdef FOG_EXP2\n\n\t\tfloat fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );\n\n\t#else\n\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, vFogDepth );\n\n\t#endif\n\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n\n#endif\n",
        fog_pars_fragment: "\n#ifdef USE_FOG\n\n\tuniform vec3 fogColor;\n\tvarying float vFogDepth;\n\n\t#ifdef FOG_EXP2\n\n\t\tuniform float fogDensity;\n\n\t#else\n\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\n\t#endif\n\n#endif\n",
        gradientmap_pars_fragment: "\n\n#ifdef USE_GRADIENTMAP\n\n\tuniform sampler2D gradientMap;\n\n#endif\n\nvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\n\t// dotNL will be from -1.0 to 1.0\n\tfloat dotNL = dot( normal, lightDirection );\n\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\n\t#ifdef USE_GRADIENTMAP\n\n\t\treturn vec3( texture2D( gradientMap, coord ).r );\n\n\t#else\n\n\t\tvec2 fw = fwidth( coord ) * 0.5;\n\t\treturn mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );\n\n\t#endif\n\n}\n",
        lightmap_pars_fragment: "\n#ifdef USE_LIGHTMAP\n\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n\n#endif\n",
        lights_lambert_fragment: "\nLambertMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularStrength = specularStrength;\n",
        lights_lambert_pars_fragment: "\nvarying vec3 vViewPosition;\n\nstruct LambertMaterial {\n\n\tvec3 diffuseColor;\n\tfloat specularStrength;\n\n};\n\nvoid RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n\n\tfloat dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\n}\n\nvoid RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {\n\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\n}\n\n#define RE_Direct\t\t\t\tRE_Direct_Lambert\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Lambert\n",
        lights_pars_begin: "\nuniform bool receiveShadow;\nuniform vec3 ambientLightColor;\n\n#if defined( USE_LIGHT_PROBES )\n\n\tuniform vec3 lightProbe[ 9 ];\n\n#endif\n\n// get the irradiance (radiance convolved with cosine lobe) at the point 'normal' on the unit sphere\n// source: https://graphics.stanford.edu/papers/envmap/envmap.pdf\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n\n\t// normal is assumed to have unit length\n\n\tfloat x = normal.x, y = normal.y, z = normal.z;\n\n\t// band 0\n\tvec3 result = shCoefficients[ 0 ] * 0.886227;\n\n\t// band 1\n\tresult += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n\tresult += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n\tresult += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n\n\t// band 2\n\tresult += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n\tresult += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n\tresult += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n\tresult += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n\tresult += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n\n\treturn result;\n\n}\n\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {\n\n\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\n\tvec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n\n\treturn irradiance;\n\n}\n\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\n\tvec3 irradiance = ambientLightColor;\n\n\treturn irradiance;\n\n}\n\nfloat getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\n\t// based upon Frostbite 3 Moving to Physically-based Rendering\n\t// page 32, equation 26: E[window1]\n\t// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf\n\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\n\tif ( cutoffDistance > 0.0 ) {\n\n\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\n\t}\n\n\treturn distanceFalloff;\n\n}\n\nfloat getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {\n\n\treturn smoothstep( coneCosine, penumbraCosine, angleCosine );\n\n}\n\n#if NUM_DIR_LIGHTS > 0\n\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t};\n\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\n\tvoid getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {\n\n\t\tlight.color = directionalLight.color;\n\t\tlight.direction = directionalLight.direction;\n\t\tlight.visible = true;\n\n\t}\n\n#endif\n\n\n#if NUM_POINT_LIGHTS > 0\n\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t};\n\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\n\t// light is an out parameter as having it as a return value caused compiler errors on some devices\n\tvoid getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {\n\n\t\tvec3 lVector = pointLight.position - geometryPosition;\n\n\t\tlight.direction = normalize( lVector );\n\n\t\tfloat lightDistance = length( lVector );\n\n\t\tlight.color = pointLight.color;\n\t\tlight.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );\n\t\tlight.visible = ( light.color != vec3( 0.0 ) );\n\n\t}\n\n#endif\n\n\n#if NUM_SPOT_LIGHTS > 0\n\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t};\n\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\n\t// light is an out parameter as having it as a return value caused compiler errors on some devices\n\tvoid getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {\n\n\t\tvec3 lVector = spotLight.position - geometryPosition;\n\n\t\tlight.direction = normalize( lVector );\n\n\t\tfloat angleCos = dot( light.direction, spotLight.direction );\n\n\t\tfloat spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\n\t\tif ( spotAttenuation > 0.0 ) {\n\n\t\t\tfloat lightDistance = length( lVector );\n\n\t\t\tlight.color = spotLight.color * spotAttenuation;\n\t\t\tlight.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tlight.visible = ( light.color != vec3( 0.0 ) );\n\n\t\t} else {\n\n\t\t\tlight.color = vec3( 0.0 );\n\t\t\tlight.visible = false;\n\n\t\t}\n\n\t}\n\n#endif\n\n\n#if NUM_RECT_AREA_LIGHTS > 0\n\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\n\t// Pre-computed values of LinearTransformedCosine approximation of BRDF\n\t// BRDF approximation Texture is 64x64\n\tuniform sampler2D ltc_1; // RGBA Float\n\tuniform sampler2D ltc_2; // RGBA Float\n\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n\n#endif\n\n\n#if NUM_HEMI_LIGHTS > 0\n\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {\n\n\t\tfloat dotNL = dot( normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\n\t\treturn irradiance;\n\n\t}\n\n#endif\n",
        lights_toon_fragment: "\nToonMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\n",
        lights_toon_pars_fragment: "\nvarying vec3 vViewPosition;\n\nstruct ToonMaterial {\n\n\tvec3 diffuseColor;\n\n};\n\nvoid RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\n\tvec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;\n\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\n}\n\nvoid RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {\n\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\n}\n\n#define RE_Direct\t\t\t\tRE_Direct_Toon\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Toon\n",
        lights_phong_fragment: "\nBlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;\n",
        lights_phong_pars_fragment: "\nvarying vec3 vViewPosition;\n\nstruct BlinnPhongMaterial {\n\n\tvec3 diffuseColor;\n\tvec3 specularColor;\n\tfloat specularShininess;\n\tfloat specularStrength;\n\n};\n\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\n\tfloat dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\n\treflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;\n\n}\n\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\n}\n\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n",
        lights_physical_fragment: "\nPhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\n\nvec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );\nfloat geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );\n\nmaterial.roughness = max( roughnessFactor, 0.0525 );// 0.0525 corresponds to the base mip of a 256 cubemap.\nmaterial.roughness += geometryRoughness;\nmaterial.roughness = min( material.roughness, 1.0 );\n\n#ifdef IOR\n\n\tmaterial.ior = ior;\n\n\t#ifdef USE_SPECULAR\n\n\t\tfloat specularIntensityFactor = specularIntensity;\n\t\tvec3 specularColorFactor = specularColor;\n\n\t\t#ifdef USE_SPECULAR_COLORMAP\n\n\t\t\tspecularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;\n\n\t\t#endif\n\n\t\t#ifdef USE_SPECULAR_INTENSITYMAP\n\n\t\t\tspecularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;\n\n\t\t#endif\n\n\t\tmaterial.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );\n\n\t#else\n\n\t\tfloat specularIntensityFactor = 1.0;\n\t\tvec3 specularColorFactor = vec3( 1.0 );\n\t\tmaterial.specularF90 = 1.0;\n\n\t#endif\n\n\tmaterial.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );\n\n#else\n\n\tmaterial.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );\n\tmaterial.specularF90 = 1.0;\n\n#endif\n\n#ifdef USE_CLEARCOAT\n\n\tmaterial.clearcoat = clearcoat;\n\tmaterial.clearcoatRoughness = clearcoatRoughness;\n\tmaterial.clearcoatF0 = vec3( 0.04 );\n\tmaterial.clearcoatF90 = 1.0;\n\n\t#ifdef USE_CLEARCOATMAP\n\n\t\tmaterial.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;\n\n\t#endif\n\n\t#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\n\t\tmaterial.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;\n\n\t#endif\n\n\tmaterial.clearcoat = saturate( material.clearcoat ); // Burley clearcoat model\n\tmaterial.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );\n\tmaterial.clearcoatRoughness += geometryRoughness;\n\tmaterial.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );\n\n#endif\n\n#ifdef USE_DISPERSION\n\n\tmaterial.dispersion = dispersion;\n\n#endif\n\n#ifdef USE_IRIDESCENCE\n\n\tmaterial.iridescence = iridescence;\n\tmaterial.iridescenceIOR = iridescenceIOR;\n\n\t#ifdef USE_IRIDESCENCEMAP\n\n\t\tmaterial.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;\n\n\t#endif\n\n\t#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\n\t\tmaterial.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;\n\n\t#else\n\n\t\tmaterial.iridescenceThickness = iridescenceThicknessMaximum;\n\n\t#endif\n\n#endif\n\n#ifdef USE_SHEEN\n\n\tmaterial.sheenColor = sheenColor;\n\n\t#ifdef USE_SHEEN_COLORMAP\n\n\t\tmaterial.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;\n\n\t#endif\n\n\tmaterial.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );\n\n\t#ifdef USE_SHEEN_ROUGHNESSMAP\n\n\t\tmaterial.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;\n\n\t#endif\n\n#endif\n\n#ifdef USE_ANISOTROPY\n\n\t#ifdef USE_ANISOTROPYMAP\n\n\t\tmat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );\n\t\tvec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;\n\t\tvec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;\n\n\t#else\n\n\t\tvec2 anisotropyV = anisotropyVector;\n\n\t#endif\n\n\tmaterial.anisotropy = length( anisotropyV );\n\n\tif( material.anisotropy == 0.0 ) {\n\t\tanisotropyV = vec2( 1.0, 0.0 );\n\t} else {\n\t\tanisotropyV /= material.anisotropy;\n\t\tmaterial.anisotropy = saturate( material.anisotropy );\n\t}\n\n\t// Roughness along the anisotropy bitangent is the material roughness, while the tangent roughness increases with anisotropy.\n\tmaterial.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );\n\n\tmaterial.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;\n\tmaterial.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;\n\n#endif\n",
        lights_physical_pars_fragment: '\n\nstruct PhysicalMaterial {\n\n\tvec3 diffuseColor;\n\tfloat roughness;\n\tvec3 specularColor;\n\tfloat specularF90;\n\tfloat dispersion;\n\n\t#ifdef USE_CLEARCOAT\n\t\tfloat clearcoat;\n\t\tfloat clearcoatRoughness;\n\t\tvec3 clearcoatF0;\n\t\tfloat clearcoatF90;\n\t#endif\n\n\t#ifdef USE_IRIDESCENCE\n\t\tfloat iridescence;\n\t\tfloat iridescenceIOR;\n\t\tfloat iridescenceThickness;\n\t\tvec3 iridescenceFresnel;\n\t\tvec3 iridescenceF0;\n\t#endif\n\n\t#ifdef USE_SHEEN\n\t\tvec3 sheenColor;\n\t\tfloat sheenRoughness;\n\t#endif\n\n\t#ifdef IOR\n\t\tfloat ior;\n\t#endif\n\n\t#ifdef USE_TRANSMISSION\n\t\tfloat transmission;\n\t\tfloat transmissionAlpha;\n\t\tfloat thickness;\n\t\tfloat attenuationDistance;\n\t\tvec3 attenuationColor;\n\t#endif\n\n\t#ifdef USE_ANISOTROPY\n\t\tfloat anisotropy;\n\t\tfloat alphaT;\n\t\tvec3 anisotropyT;\n\t\tvec3 anisotropyB;\n\t#endif\n\n};\n\n// temporary\nvec3 clearcoatSpecularDirect = vec3( 0.0 );\nvec3 clearcoatSpecularIndirect = vec3( 0.0 );\nvec3 sheenSpecularDirect = vec3( 0.0 );\nvec3 sheenSpecularIndirect = vec3(0.0 );\n\nvec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {\n    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );\n    float x2 = x * x;\n    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );\n\n    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );\n}\n\n// Moving Frostbite to Physically Based Rendering 3.0 - page 12, listing 2\n// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf\nfloat V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\n\tfloat a2 = pow2( alpha );\n\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\n\treturn 0.5 / max( gv + gl, EPSILON );\n\n}\n\n// Microfacet Models for Refraction through Rough Surfaces - equation (33)\n// http://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html\n// alpha is "roughness squared" in Disney’s reparameterization\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\n\tfloat a2 = pow2( alpha );\n\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0; // avoid alpha = 0 with dotNH = 1\n\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n\n}\n\n// https://google.github.io/filament/Filament.md.html#materialsystem/anisotropicmodel/anisotropicspecularbrdf\n#ifdef USE_ANISOTROPY\n\n\tfloat V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {\n\n\t\tfloat gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );\n\t\tfloat gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );\n\t\tfloat v = 0.5 / ( gv + gl );\n\n\t\treturn saturate(v);\n\n\t}\n\n\tfloat D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {\n\n\t\tfloat a2 = alphaT * alphaB;\n\t\thighp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );\n\t\thighp float v2 = dot( v, v );\n\t\tfloat w2 = a2 / v2;\n\n\t\treturn RECIPROCAL_PI * a2 * pow2 ( w2 );\n\n\t}\n\n#endif\n\n#ifdef USE_CLEARCOAT\n\n\t// GGX Distribution, Schlick Fresnel, GGX_SmithCorrelated Visibility\n\tvec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {\n\n\t\tvec3 f0 = material.clearcoatF0;\n\t\tfloat f90 = material.clearcoatF90;\n\t\tfloat roughness = material.clearcoatRoughness;\n\n\t\tfloat alpha = pow2( roughness ); // UE4\'s roughness\n\n\t\tvec3 halfDir = normalize( lightDir + viewDir );\n\n\t\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\t\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\t\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\t\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\n\t\tvec3 F = F_Schlick( f0, f90, dotVH );\n\n\t\tfloat V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\n\t\tfloat D = D_GGX( alpha, dotNH );\n\n\t\treturn F * ( V * D );\n\n\t}\n\n#endif\n\nvec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {\n\n\tvec3 f0 = material.specularColor;\n\tfloat f90 = material.specularF90;\n\tfloat roughness = material.roughness;\n\n\tfloat alpha = pow2( roughness ); // UE4\'s roughness\n\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\n\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotVH = saturate( dot( viewDir, halfDir ) );\n\n\tvec3 F = F_Schlick( f0, f90, dotVH );\n\n\t#ifdef USE_IRIDESCENCE\n\n\t\tF = mix( F, material.iridescenceFresnel, material.iridescence );\n\n\t#endif\n\n\t#ifdef USE_ANISOTROPY\n\n\t\tfloat dotTL = dot( material.anisotropyT, lightDir );\n\t\tfloat dotTV = dot( material.anisotropyT, viewDir );\n\t\tfloat dotTH = dot( material.anisotropyT, halfDir );\n\t\tfloat dotBL = dot( material.anisotropyB, lightDir );\n\t\tfloat dotBV = dot( material.anisotropyB, viewDir );\n\t\tfloat dotBH = dot( material.anisotropyB, halfDir );\n\n\t\tfloat V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );\n\n\t\tfloat D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );\n\n\t#else\n\n\t\tfloat V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\n\t\tfloat D = D_GGX( alpha, dotNH );\n\n\t#endif\n\n\treturn F * ( V * D );\n\n}\n\n// Rect Area Light\n\n// Real-Time Polygonal-Light Shading with Linearly Transformed Cosines\n// by Eric Heitz, Jonathan Dupuy, Stephen Hill and David Neubelt\n// code: https://github.com/selfshadow/ltc_code/\n\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\n\tconst float LUT_SIZE = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS = 0.5 / LUT_SIZE;\n\n\tfloat dotNV = saturate( dot( N, V ) );\n\n\t// texture parameterized by sqrt( GGX alpha ) and sqrt( 1 - cos( theta ) )\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\n\treturn uv;\n\n}\n\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\n\t// Real-Time Area Lighting: a Journey from Research to Production (p.102)\n\t// An approximation of the form factor of a horizon-clipped rectangle.\n\n\tfloat l = length( f );\n\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n\n}\n\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\n\tfloat x = dot( v1, v2 );\n\n\tfloat y = abs( x );\n\n\t// rational polynomial approximation to theta / sin( theta ) / 2PI\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\n\treturn cross( v1, v2 ) * theta_sintheta;\n\n}\n\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\n\t// bail if point is on back side of plane of light\n\t// assumes ccw winding order of light vertices\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\n\t// construct orthonormal basis around N\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 ); // negated from paper; possibly due to a different handedness of world coordinate system\n\n\t// compute transform\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\n\t// transform rect\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\n\t// project rect onto sphere\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\n\t// calculate vector form factor\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\n\t// adjust for horizon clipping\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\n/*\n\t// alternate method of adjusting for horizon clipping (see reference)\n\t// refactoring required\n\tfloat len = length( vectorFormFactor );\n\tfloat z = vectorFormFactor.z / len;\n\n\tconst float LUT_SIZE = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS = 0.5 / LUT_SIZE;\n\n\t// tabulated horizon-clipped sphere, apparently...\n\tvec2 uv = vec2( z * 0.5 + 0.5, len );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\n\tfloat scale = texture2D( ltc_2, uv ).w;\n\n\tfloat result = len * scale;\n*/\n\n\treturn vec3( result );\n\n}\n\n// End Rect Area Light\n\n#if defined( USE_SHEEN )\n\n// https://github.com/google/filament/blob/master/shaders/src/brdf.fs\nfloat D_Charlie( float roughness, float dotNH ) {\n\n\tfloat alpha = pow2( roughness );\n\n\t// Estevez and Kulla 2017, "Production Friendly Microfacet Sheen BRDF"\n\tfloat invAlpha = 1.0 / alpha;\n\tfloat cos2h = dotNH * dotNH;\n\tfloat sin2h = max( 1.0 - cos2h, 0.0078125 ); // 2^(-14/2), so sin2h^2 > 0 in fp16\n\n\treturn ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );\n\n}\n\n// https://github.com/google/filament/blob/master/shaders/src/brdf.fs\nfloat V_Neubelt( float dotNV, float dotNL ) {\n\n\t// Neubelt and Pettineo 2013, "Crafting a Next-gen Material Pipeline for The Order: 1886"\n\treturn saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );\n\n}\n\nvec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {\n\n\tvec3 halfDir = normalize( lightDir + viewDir );\n\n\tfloat dotNL = saturate( dot( normal, lightDir ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\n\tfloat D = D_Charlie( sheenRoughness, dotNH );\n\tfloat V = V_Neubelt( dotNV, dotNL );\n\n\treturn sheenColor * ( D * V );\n\n}\n\n#endif\n\n// This is a curve-fit approximation to the "Charlie sheen" BRDF integrated over the hemisphere from\n// Estevez and Kulla 2017, "Production Friendly Microfacet Sheen BRDF". The analysis can be found\n// in the Sheen section of https://drive.google.com/file/d/1T0D1VSyR4AllqIJTQAraEIzjlb5h4FKH/view?usp=sharing\nfloat IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\n\tfloat r2 = roughness * roughness;\n\n\tfloat a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;\n\n\tfloat b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;\n\n\tfloat DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );\n\n\treturn saturate( DG * RECIPROCAL_PI );\n\n}\n\n// Analytical approximation of the DFG LUT, one half of the\n// split-sum approximation used in indirect specular lighting.\n// via \'environmentBRDF\' from "Physically Based Shading on Mobile"\n// https://www.unrealengine.com/blog/physically-based-shading-on-mobile\nvec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {\n\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\n\tvec4 r = roughness * c0 + c1;\n\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\n\tvec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;\n\n\treturn fab;\n\n}\n\nvec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {\n\n\tvec2 fab = DFGApprox( normal, viewDir, roughness );\n\n\treturn specularColor * fab.x + specularF90 * fab.y;\n\n}\n\n// Fdez-Agüera\'s "Multiple-Scattering Microfacet Model for Real-Time Image Based Lighting"\n// Approximates multiscattering in order to preserve energy.\n// http://www.jcgt.org/published/0008/01/03/\n#ifdef USE_IRIDESCENCE\nvoid computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#else\nvoid computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n#endif\n\n\tvec2 fab = DFGApprox( normal, viewDir, roughness );\n\n\t#ifdef USE_IRIDESCENCE\n\n\t\tvec3 Fr = mix( specularColor, iridescenceF0, iridescence );\n\n\t#else\n\n\t\tvec3 Fr = specularColor;\n\n\t#endif\n\n\tvec3 FssEss = Fr * fab.x + specularF90 * fab.y;\n\n\tfloat Ess = fab.x + fab.y;\n\tfloat Ems = 1.0 - Ess;\n\n\tvec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619; // 1/21\n\tvec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n\n\tsingleScatter += FssEss;\n\tmultiScatter += Fms * Ems;\n\n}\n\n#if NUM_RECT_AREA_LIGHTS > 0\n\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\n\t\tvec3 normal = geometryNormal;\n\t\tvec3 viewDir = geometryViewDir;\n\t\tvec3 position = geometryPosition;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.roughness;\n\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos + halfWidth - halfHeight; // counterclockwise; light shines in local neg z direction\n\t\trectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\n\t\t// LTC Fresnel Approximation by Stephen Hill\n\t\t// http://blog.selfshadow.com/publications/s2016-advances/s2016_ltc_fresnel.pdf\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\n\t}\n\n#endif\n\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\n\tfloat dotNL = saturate( dot( geometryNormal, directLight.direction ) );\n\n\tvec3 irradiance = dotNL * directLight.color;\n\n\t#ifdef USE_CLEARCOAT\n\n\t\tfloat dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );\n\n\t\tvec3 ccIrradiance = dotNLcc * directLight.color;\n\n\t\tclearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );\n\n\t#endif\n\n\t#ifdef USE_SHEEN\n\n\t\tsheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );\n\n\t#endif\n\n\treflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );\n\n\treflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n}\n\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );\n\n}\n\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n\n\t#ifdef USE_CLEARCOAT\n\n\t\tclearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );\n\n\t#endif\n\n\t#ifdef USE_SHEEN\n\n\t\tsheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );\n\n\t#endif\n\n\t// Both indirect specular and indirect diffuse light accumulate here\n\n\tvec3 singleScattering = vec3( 0.0 );\n\tvec3 multiScattering = vec3( 0.0 );\n\tvec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n\n\t#ifdef USE_IRIDESCENCE\n\n\t\tcomputeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );\n\n\t#else\n\n\t\tcomputeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );\n\n\t#endif\n\n\tvec3 totalScattering = singleScattering + multiScattering;\n\tvec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );\n\n\treflectedLight.indirectSpecular += radiance * singleScattering;\n\treflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;\n\n\treflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n\n}\n\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\n\n// ref: https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n\n}\n',
        lights_fragment_begin: "\n/**\n * This is a template that can be used to light a material, it uses pluggable\n * RenderEquations (RE)for specific lighting scenarios.\n *\n * Instructions for use:\n * - Ensure that both RE_Direct, RE_IndirectDiffuse and RE_IndirectSpecular are defined\n * - Create a material parameter that is to be passed as the third parameter to your lighting functions.\n *\n * TODO:\n * - Add area light support.\n * - Add sphere light support.\n * - Add diffuse light probe (irradiance cubemap) support.\n */\n\nvec3 geometryPosition = - vViewPosition;\nvec3 geometryNormal = normal;\nvec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\n\nvec3 geometryClearcoatNormal = vec3( 0.0 );\n\n#ifdef USE_CLEARCOAT\n\n\tgeometryClearcoatNormal = clearcoatNormal;\n\n#endif\n\n#ifdef USE_IRIDESCENCE\n\n\tfloat dotNVi = saturate( dot( normal, geometryViewDir ) );\n\n\tif ( material.iridescenceThickness == 0.0 ) {\n\n\t\tmaterial.iridescence = 0.0;\n\n\t} else {\n\n\t\tmaterial.iridescence = saturate( material.iridescence );\n\n\t}\n\n\tif ( material.iridescence > 0.0 ) {\n\n\t\tmaterial.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );\n\n\t\t// Iridescence F0 approximation\n\t\tmaterial.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );\n\n\t}\n\n#endif\n\nIncidentLight directLight;\n\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\n\tPointLight pointLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLightShadow pointLightShadow;\n\t#endif\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\n\t\tpointLight = pointLights[ i ];\n\n\t\tgetPointLightInfo( pointLight, geometryPosition, directLight );\n\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n\t\tpointLightShadow = pointLightShadows[ i ];\n\t\tdirectLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;\n\t\t#endif\n\n\t\tRE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\n\t}\n\t#pragma unroll_loop_end\n\n#endif\n\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\n\tSpotLight spotLight;\n\tvec4 spotColor;\n\tvec3 spotLightCoord;\n\tbool inSpotLightMap;\n\n\t#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLightShadow spotLightShadow;\n\t#endif\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\n\t\tspotLight = spotLights[ i ];\n\n\t\tgetSpotLightInfo( spotLight, geometryPosition, directLight );\n\n\t\t// spot lights are ordered [shadows with maps, shadows without maps, maps without shadows, none]\n\t\t#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n\t\t#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX\n\t\t#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\t#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS\n\t\t#else\n\t\t#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )\n\t\t#endif\n\n\t\t#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )\n\t\t\tspotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;\n\t\t\tinSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );\n\t\t\tspotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );\n\t\t\tdirectLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;\n\t\t#endif\n\n\t\t#undef SPOT_LIGHT_MAP_INDEX\n\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\tspotLightShadow = spotLightShadows[ i ];\n\t\tdirectLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n\t\t#endif\n\n\t\tRE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\n\t}\n\t#pragma unroll_loop_end\n\n#endif\n\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\n\tDirectionalLight directionalLight;\n\t#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLightShadow directionalLightShadow;\n\t#endif\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\n\t\tdirectionalLight = directionalLights[ i ];\n\n\t\tgetDirectionalLightInfo( directionalLight, directLight );\n\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n\t\tdirectionalLightShadow = directionalLightShadows[ i ];\n\t\tdirectLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\n\t\tRE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\n\t}\n\t#pragma unroll_loop_end\n\n#endif\n\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\n\tRectAreaLight rectAreaLight;\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\n\t}\n\t#pragma unroll_loop_end\n\n#endif\n\n#if defined( RE_IndirectDiffuse )\n\n\tvec3 iblIrradiance = vec3( 0.0 );\n\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\n\t#if defined( USE_LIGHT_PROBES )\n\n\t\tirradiance += getLightProbeIrradiance( lightProbe, geometryNormal );\n\n\t#endif\n\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );\n\n\t\t}\n\t\t#pragma unroll_loop_end\n\n\t#endif\n\n#endif\n\n#if defined( RE_IndirectSpecular )\n\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearcoatRadiance = vec3( 0.0 );\n\n#endif\n",
        lights_fragment_maps: "\n#if defined( RE_IndirectDiffuse )\n\n\t#ifdef USE_LIGHTMAP\n\n\t\tvec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n\t\tvec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;\n\n\t\tirradiance += lightMapIrradiance;\n\n\t#endif\n\n\t#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n\n\t\tiblIrradiance += getIBLIrradiance( geometryNormal );\n\n\t#endif\n\n#endif\n\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\n\t#ifdef USE_ANISOTROPY\n\n\t\tradiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );\n\n\t#else\n\n\t\tradiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );\n\n\t#endif\n\n\t#ifdef USE_CLEARCOAT\n\n\t\tclearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );\n\n\t#endif\n\n#endif\n",
        lights_fragment_end: "\n#if defined( RE_IndirectDiffuse )\n\n\tRE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\n#endif\n\n#if defined( RE_IndirectSpecular )\n\n\tRE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );\n\n#endif\n",
        logdepthbuf_fragment: "\n#if defined( USE_LOGDEPTHBUF )\n\n\t// Doing a strict comparison with == 1.0 can cause noise artifacts\n\t// on some platforms. See issue #17623.\n\tgl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n\n#endif\n",
        logdepthbuf_pars_fragment: "\n#if defined( USE_LOGDEPTHBUF )\n\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n\tvarying float vIsPerspective;\n\n#endif\n",
        logdepthbuf_pars_vertex: "\n#ifdef USE_LOGDEPTHBUF\n\n\tvarying float vFragDepth;\n\tvarying float vIsPerspective;\n\n#endif\n",
        logdepthbuf_vertex: "\n#ifdef USE_LOGDEPTHBUF\n\n\tvFragDepth = 1.0 + gl_Position.w;\n\tvIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n\n#endif\n",
        map_fragment: "\n#ifdef USE_MAP\n\n\tvec4 sampledDiffuseColor = texture2D( map, vMapUv );\n\n\t#ifdef DECODE_VIDEO_TEXTURE\n\n\t\t// use inline sRGB decode until browsers properly support SRGB8_ALPHA8 with video textures (#26516)\n\n\t\tsampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );\n\n\t#endif\n\n\tdiffuseColor *= sampledDiffuseColor;\n\n#endif\n",
        map_pars_fragment: "\n#ifdef USE_MAP\n\n\tuniform sampler2D map;\n\n#endif\n",
        map_particle_fragment: "\n#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\n\t#if defined( USE_POINTS_UV )\n\n\t\tvec2 uv = vUv;\n\n\t#else\n\n\t\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n\n\t#endif\n\n#endif\n\n#ifdef USE_MAP\n\n\tdiffuseColor *= texture2D( map, uv );\n\n#endif\n\n#ifdef USE_ALPHAMAP\n\n\tdiffuseColor.a *= texture2D( alphaMap, uv ).g;\n\n#endif\n",
        map_particle_pars_fragment: "\n#if defined( USE_POINTS_UV )\n\n\tvarying vec2 vUv;\n\n#else\n\n\t#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\n\t\tuniform mat3 uvTransform;\n\n\t#endif\n\n#endif\n\n#ifdef USE_MAP\n\n\tuniform sampler2D map;\n\n#endif\n\n#ifdef USE_ALPHAMAP\n\n\tuniform sampler2D alphaMap;\n\n#endif\n",
        metalnessmap_fragment: "\nfloat metalnessFactor = metalness;\n\n#ifdef USE_METALNESSMAP\n\n\tvec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );\n\n\t// reads channel B, compatible with a combined OcclusionRoughnessMetallic (RGB) texture\n\tmetalnessFactor *= texelMetalness.b;\n\n#endif\n",
        metalnessmap_pars_fragment: "\n#ifdef USE_METALNESSMAP\n\n\tuniform sampler2D metalnessMap;\n\n#endif\n",
        morphinstance_vertex: "\n#ifdef USE_INSTANCING_MORPH\n\n\tfloat morphTargetInfluences[ MORPHTARGETS_COUNT ];\n\n\tfloat morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;\n\n\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\n\t\tmorphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;\n\n\t}\n#endif\n",
        morphcolor_vertex: "\n#if defined( USE_MORPHCOLORS )\n\n\t// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:\n\t// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in normal = sum((target - base) * influence)\n\t// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting\n\tvColor *= morphTargetBaseInfluence;\n\n\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\n\t\t#if defined( USE_COLOR_ALPHA )\n\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];\n\n\t\t#elif defined( USE_COLOR )\n\n\t\t\tif ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];\n\n\t\t#endif\n\n\t}\n\n#endif\n",
        morphnormal_vertex: "\n#ifdef USE_MORPHNORMALS\n\n\t// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:\n\t// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in normal = sum((target - base) * influence)\n\t// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting\n\tobjectNormal *= morphTargetBaseInfluence;\n\n\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\n\t\tif ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];\n\n\t}\n\n#endif\n",
        morphtarget_pars_vertex: "\n#ifdef USE_MORPHTARGETS\n\n\t#ifndef USE_INSTANCING_MORPH\n\n\t\tuniform float morphTargetBaseInfluence;\n\t\tuniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];\n\n\t#endif\n\n\tuniform sampler2DArray morphTargetsTexture;\n\tuniform ivec2 morphTargetsTextureSize;\n\n\tvec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {\n\n\t\tint texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;\n\t\tint y = texelIndex / morphTargetsTextureSize.x;\n\t\tint x = texelIndex - y * morphTargetsTextureSize.x;\n\n\t\tivec3 morphUV = ivec3( x, y, morphTargetIndex );\n\t\treturn texelFetch( morphTargetsTexture, morphUV, 0 );\n\n\t}\n\n#endif\n",
        morphtarget_vertex: "\n#ifdef USE_MORPHTARGETS\n\n\t// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:\n\t// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in position = sum((target - base) * influence)\n\t// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting\n\ttransformed *= morphTargetBaseInfluence;\n\n\tfor ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {\n\n\t\tif ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];\n\n\t}\n\n#endif\n",
        normal_fragment_begin: "\nfloat faceDirection = gl_FrontFacing ? 1.0 : - 1.0;\n\n#ifdef FLAT_SHADED\n\n\tvec3 fdx = dFdx( vViewPosition );\n\tvec3 fdy = dFdy( vViewPosition );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n\n#else\n\n\tvec3 normal = normalize( vNormal );\n\n\t#ifdef DOUBLE_SIDED\n\n\t\tnormal *= faceDirection;\n\n\t#endif\n\n#endif\n\n#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )\n\n\t#ifdef USE_TANGENT\n\n\t\tmat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n\n\t#else\n\n\t\tmat3 tbn = getTangentFrame( - vViewPosition, normal,\n\t\t#if defined( USE_NORMALMAP )\n\t\t\tvNormalMapUv\n\t\t#elif defined( USE_CLEARCOAT_NORMALMAP )\n\t\t\tvClearcoatNormalMapUv\n\t\t#else\n\t\t\tvUv\n\t\t#endif\n\t\t);\n\n\t#endif\n\n\t#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n\n\t\ttbn[0] *= faceDirection;\n\t\ttbn[1] *= faceDirection;\n\n\t#endif\n\n#endif\n\n#ifdef USE_CLEARCOAT_NORMALMAP\n\n\t#ifdef USE_TANGENT\n\n\t\tmat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );\n\n\t#else\n\n\t\tmat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );\n\n\t#endif\n\n\t#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )\n\n\t\ttbn2[0] *= faceDirection;\n\t\ttbn2[1] *= faceDirection;\n\n\t#endif\n\n#endif\n\n// non perturbed normal for clearcoat among others\n\nvec3 nonPerturbedNormal = normal;\n\n",
        normal_fragment_maps: "\n\n#ifdef USE_NORMALMAP_OBJECTSPACE\n\n\tnormal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals\n\n\t#ifdef FLIP_SIDED\n\n\t\tnormal = - normal;\n\n\t#endif\n\n\t#ifdef DOUBLE_SIDED\n\n\t\tnormal = normal * faceDirection;\n\n\t#endif\n\n\tnormal = normalize( normalMatrix * normal );\n\n#elif defined( USE_NORMALMAP_TANGENTSPACE )\n\n\tvec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;\n\tmapN.xy *= normalScale;\n\n\tnormal = normalize( tbn * mapN );\n\n#elif defined( USE_BUMPMAP )\n\n\tnormal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );\n\n#endif\n",
        normal_pars_fragment: "\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n\t#ifdef USE_TANGENT\n\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\n\t#endif\n\n#endif\n",
        normal_pars_vertex: "\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n\t#ifdef USE_TANGENT\n\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\n\t#endif\n\n#endif\n",
        normal_vertex: "\n#ifndef FLAT_SHADED // normal is computed with derivatives when FLAT_SHADED\n\n\tvNormal = normalize( transformedNormal );\n\n\t#ifdef USE_TANGENT\n\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\n\t#endif\n\n#endif\n",
        normalmap_pars_fragment: "\n#ifdef USE_NORMALMAP\n\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n\n#endif\n\n#ifdef USE_NORMALMAP_OBJECTSPACE\n\n\tuniform mat3 normalMatrix;\n\n#endif\n\n#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )\n\n\t// Normal Mapping Without Precomputed Tangents\n\t// http://www.thetenthplanet.de/archives/1180\n\n\tmat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {\n\n\t\tvec3 q0 = dFdx( eye_pos.xyz );\n\t\tvec3 q1 = dFdy( eye_pos.xyz );\n\t\tvec2 st0 = dFdx( uv.st );\n\t\tvec2 st1 = dFdy( uv.st );\n\n\t\tvec3 N = surf_norm; // normalized\n\n\t\tvec3 q1perp = cross( q1, N );\n\t\tvec3 q0perp = cross( N, q0 );\n\n\t\tvec3 T = q1perp * st0.x + q0perp * st1.x;\n\t\tvec3 B = q1perp * st0.y + q0perp * st1.y;\n\n\t\tfloat det = max( dot( T, T ), dot( B, B ) );\n\t\tfloat scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );\n\n\t\treturn mat3( T * scale, B * scale, N );\n\n\t}\n\n#endif\n",
        clearcoat_normal_fragment_begin: "\n#ifdef USE_CLEARCOAT\n\n\tvec3 clearcoatNormal = nonPerturbedNormal;\n\n#endif\n",
        clearcoat_normal_fragment_maps: "\n#ifdef USE_CLEARCOAT_NORMALMAP\n\n\tvec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;\n\tclearcoatMapN.xy *= clearcoatNormalScale;\n\n\tclearcoatNormal = normalize( tbn2 * clearcoatMapN );\n\n#endif\n",
        clearcoat_pars_fragment: "\n\n#ifdef USE_CLEARCOATMAP\n\n\tuniform sampler2D clearcoatMap;\n\n#endif\n\n#ifdef USE_CLEARCOAT_NORMALMAP\n\n\tuniform sampler2D clearcoatNormalMap;\n\tuniform vec2 clearcoatNormalScale;\n\n#endif\n\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\n\tuniform sampler2D clearcoatRoughnessMap;\n\n#endif\n",
        iridescence_pars_fragment: "\n\n#ifdef USE_IRIDESCENCEMAP\n\n\tuniform sampler2D iridescenceMap;\n\n#endif\n\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\n\tuniform sampler2D iridescenceThicknessMap;\n\n#endif\n",
        opaque_fragment: "\n#ifdef OPAQUE\ndiffuseColor.a = 1.0;\n#endif\n\n#ifdef USE_TRANSMISSION\ndiffuseColor.a *= material.transmissionAlpha;\n#endif\n\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );\n",
        packing: "\nvec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\n\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\n\nconst float PackUpscale = 256. / 255.; // fraction -> 0..1 (including 1)\nconst float UnpackDownscale = 255. / 256.; // 0..1 -> fraction (excluding 1)\nconst float ShiftRight8 = 1. / 256.;\nconst float Inv255 = 1. / 255.;\n\nconst vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );\n\nconst vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );\nconst vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );\nconst vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );\n\nvec4 packDepthToRGBA( const in float v ) {\n\tif( v <= 0.0 )\n\t\treturn vec4( 0., 0., 0., 0. );\n\tif( v >= 1.0 )\n\t\treturn vec4( 1., 1., 1., 1. );\n\tfloat vuf;\n\tfloat af = modf( v * PackFactors.a, vuf );\n\tfloat bf = modf( vuf * ShiftRight8, vuf );\n\tfloat gf = modf( vuf * ShiftRight8, vuf );\n\treturn vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );\n}\n\nvec3 packDepthToRGB( const in float v ) {\n\tif( v <= 0.0 )\n\t\treturn vec3( 0., 0., 0. );\n\tif( v >= 1.0 )\n\t\treturn vec3( 1., 1., 1. );\n\tfloat vuf;\n\tfloat bf = modf( v * PackFactors.b, vuf );\n\tfloat gf = modf( vuf * ShiftRight8, vuf );\n\t// the 0.9999 tweak is unimportant, very tiny empirical improvement\n\t// return vec3( vuf * Inv255, gf * PackUpscale, bf * 0.9999 );\n\treturn vec3( vuf * Inv255, gf * PackUpscale, bf );\n}\n\nvec2 packDepthToRG( const in float v ) {\n\tif( v <= 0.0 )\n\t\treturn vec2( 0., 0. );\n\tif( v >= 1.0 )\n\t\treturn vec2( 1., 1. );\n\tfloat vuf;\n\tfloat gf = modf( v * 256., vuf );\n\treturn vec2( vuf * Inv255, gf );\n}\n\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors4 );\n}\n\nfloat unpackRGBToDepth( const in vec3 v ) {\n\treturn dot( v, UnpackFactors3 );\n}\n\nfloat unpackRGToDepth( const in vec2 v ) {\n\treturn v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;\n}\n\nvec4 pack2HalfToRGBA( const in vec2 v ) {\n\tvec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );\n\treturn vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );\n}\n\nvec2 unpackRGBATo2Half( const in vec4 v ) {\n\treturn vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\n\n// NOTE: viewZ, the z-coordinate in camera space, is negative for points in front of the camera\n\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\t// -near maps to 0; -far maps to 1\n\treturn ( viewZ + near ) / ( near - far );\n}\n\nfloat orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {\n\t// maps orthographic depth in [ 0, 1 ] to viewZ\n\treturn depth * ( near - far ) - near;\n}\n\n// NOTE: https://twitter.com/gonnavis/status/1377183786949959682\n\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\t// -near maps to 0; -far maps to 1\n\treturn ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );\n}\n\nfloat perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {\n\t// maps perspective depth in [ 0, 1 ] to viewZ\n\treturn ( near * far ) / ( ( far - near ) * depth - far );\n}\n",
        premultiplied_alpha_fragment: "\n#ifdef PREMULTIPLIED_ALPHA\n\n\t// Get get normal blending with premultipled, use with CustomBlending, OneFactor, OneMinusSrcAlphaFactor, AddEquation.\n\tgl_FragColor.rgb *= gl_FragColor.a;\n\n#endif\n",
        project_vertex: "\nvec4 mvPosition = vec4( transformed, 1.0 );\n\n#ifdef USE_BATCHING\n\n\tmvPosition = batchingMatrix * mvPosition;\n\n#endif\n\n#ifdef USE_INSTANCING\n\n\tmvPosition = instanceMatrix * mvPosition;\n\n#endif\n\nmvPosition = modelViewMatrix * mvPosition;\n\ngl_Position = projectionMatrix * mvPosition;\n",
        dithering_fragment: "\n#ifdef DITHERING\n\n\tgl_FragColor.rgb = dithering( gl_FragColor.rgb );\n\n#endif\n",
        dithering_pars_fragment: "\n#ifdef DITHERING\n\n\t// based on https://www.shadertoy.com/view/MslGR8\n\tvec3 dithering( vec3 color ) {\n\t\t//Calculate grid position\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\n\t\t//Shift the individual colors differently, thus making it even harder to see the dithering pattern\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\n\t\t//modify shift according to grid position.\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\n\t\t//shift the color by dither_shift\n\t\treturn color + dither_shift_RGB;\n\t}\n\n#endif\n",
        roughnessmap_fragment: "\nfloat roughnessFactor = roughness;\n\n#ifdef USE_ROUGHNESSMAP\n\n\tvec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );\n\n\t// reads channel G, compatible with a combined OcclusionRoughnessMetallic (RGB) texture\n\troughnessFactor *= texelRoughness.g;\n\n#endif\n",
        roughnessmap_pars_fragment: "\n#ifdef USE_ROUGHNESSMAP\n\n\tuniform sampler2D roughnessMap;\n\n#endif\n",
        shadowmap_pars_fragment: "\n#if NUM_SPOT_LIGHT_COORDS > 0\n\n\tvarying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n\n#endif\n\n#if NUM_SPOT_LIGHT_MAPS > 0\n\n\tuniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];\n\n#endif\n\n#ifdef USE_SHADOWMAP\n\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowIntensity;\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\n\t#endif\n\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowIntensity;\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\n\t#endif\n\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowIntensity;\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\n\t#endif\n\n\t/*\n\t#if NUM_RECT_AREA_LIGHTS > 0\n\n\t\t// TODO (abelnation): create uniforms for area light shadows\n\n\t#endif\n\t*/\n\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\n\t}\n\n\tvec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {\n\n\t\treturn unpackRGBATo2Half( texture2D( shadow, uv ) );\n\n\t}\n\n\tfloat VSMShadow (sampler2D shadow, vec2 uv, float compare ){\n\n\t\tfloat occlusion = 1.0;\n\n\t\tvec2 distribution = texture2DDistribution( shadow, uv );\n\n\t\tfloat hard_shadow = step( compare , distribution.x ); // Hard Shadow\n\n\t\tif (hard_shadow != 1.0 ) {\n\n\t\t\tfloat distance = compare - distribution.x ;\n\t\t\tfloat variance = max( 0.00000, distribution.y * distribution.y );\n\t\t\tfloat softness_probability = variance / (variance + distance * distance ); // Chebeyshevs inequality\n\t\t\tsoftness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 ); // 0.3 reduces light bleed\n\t\t\tocclusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );\n\n\t\t}\n\t\treturn occlusion;\n\n\t}\n\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\n\t\tfloat shadow = 1.0;\n\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\n\t\tbool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;\n\t\tbool frustumTest = inFrustum && shadowCoord.z <= 1.0;\n\n\t\tif ( frustumTest ) {\n\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tfloat dx2 = dx0 / 2.0;\n\t\t\tfloat dy2 = dy0 / 2.0;\n\t\t\tfloat dx3 = dx1 / 2.0;\n\t\t\tfloat dy3 = dy1 / 2.0;\n\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 17.0 );\n\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx = texelSize.x;\n\t\t\tfloat dy = texelSize.y;\n\n\t\t\tvec2 uv = shadowCoord.xy;\n\t\t\tvec2 f = fract( uv * shadowMapSize + 0.5 );\n\t\t\tuv -= f * texelSize;\n\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, uv, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),\n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),\n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),\n\t\t\t\t\t f.x ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),\n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t f.y ) +\n\t\t\t\tmix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t\t  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),\n\t\t\t\t\t\t  f.x ),\n\t\t\t\t\t f.y )\n\t\t\t) * ( 1.0 / 9.0 );\n\n\t\t#elif defined( SHADOWMAP_TYPE_VSM )\n\n\t\t\tshadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );\n\n\t\t#else // no percentage-closer filtering:\n\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\n\t\t#endif\n\n\t\t}\n\n\t\treturn mix( 1.0, shadow, shadowIntensity );\n\n\t}\n\n\t// cubeToUV() maps a 3D direction vector suitable for cube texture mapping to a 2D\n\t// vector suitable for 2D texture mapping. This code uses the following layout for the\n\t// 2D texture:\n\t//\n\t// xzXZ\n\t//  y Y\n\t//\n\t// Y - Positive y direction\n\t// y - Negative y direction\n\t// X - Positive x direction\n\t// x - Negative x direction\n\t// Z - Positive z direction\n\t// z - Negative z direction\n\t//\n\t// Source and test bed:\n\t// https://gist.github.com/tschw/da10c43c467ce8afd0c4\n\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\n\t\t// Number of texels to avoid at the edge of each square\n\n\t\tvec3 absV = abs( v );\n\n\t\t// Intersect unit cube\n\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\n\t\t// Apply scale to avoid seams\n\n\t\t// two texels less per square (one texel will do for NEAREST)\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\n\t\t// Unwrap\n\n\t\t// space: -1 ... 1 range for each square\n\t\t//\n\t\t// #X##\t\tdim    := ( 4 , 2 )\n\t\t//  # #\t\tcenter := ( 1 , 1 )\n\n\t\tvec2 planar = v.xy;\n\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\n\t\tif ( absV.z >= almostOne ) {\n\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\n\t\t} else if ( absV.x >= almostOne ) {\n\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\n\t\t} else if ( absV.y >= almostOne ) {\n\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\n\t\t}\n\n\t\t// Transform to UV space\n\n\t\t// scale := 0.5 / dim\n\t\t// translate := ( center + 0.5 ) / dim\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\n\t}\n\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\n\t\tfloat shadow = 1.0;\n\n\t\t// for point lights, the uniform @vShadowCoord is re-purposed to hold\n\t\t// the vector from the light to the world-space position of the fragment.\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\t\n\t\tfloat lightToPositionLength = length( lightToPosition );\n\n\t\tif ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {\n\n\t\t\t// dp = normalized distance from light to fragment position\n\t\t\tfloat dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear ); // need to clamp?\n\t\t\tdp += shadowBias;\n\n\t\t\t// bd3D = base direction 3D\n\t\t\tvec3 bd3D = normalize( lightToPosition );\n\n\t\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\n\t\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )\n\n\t\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\n\t\t\t\tshadow = (\n\t\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t\t) * ( 1.0 / 9.0 );\n\n\t\t\t#else // no percentage-closer filtering\n\n\t\t\t\tshadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\n\t\t\t#endif\n\n\t\t}\n\n\t\treturn mix( 1.0, shadow, shadowIntensity );\n\n\t}\n\n#endif\n",
        shadowmap_pars_vertex: "\n\n#if NUM_SPOT_LIGHT_COORDS > 0\n\n\tuniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];\n\tvarying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];\n\n#endif\n\n#ifdef USE_SHADOWMAP\n\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\n\t\tstruct DirectionalLightShadow {\n\t\t\tfloat shadowIntensity;\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\n\t\tuniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];\n\n\t#endif\n\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\n\t\tstruct SpotLightShadow {\n\t\t\tfloat shadowIntensity;\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t};\n\n\t\tuniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];\n\n\t#endif\n\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\n\t\tstruct PointLightShadow {\n\t\t\tfloat shadowIntensity;\n\t\t\tfloat shadowBias;\n\t\t\tfloat shadowNormalBias;\n\t\t\tfloat shadowRadius;\n\t\t\tvec2 shadowMapSize;\n\t\t\tfloat shadowCameraNear;\n\t\t\tfloat shadowCameraFar;\n\t\t};\n\n\t\tuniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];\n\n\t#endif\n\n\t/*\n\t#if NUM_RECT_AREA_LIGHTS > 0\n\n\t\t// TODO (abelnation): uniforms for area light shadows\n\n\t#endif\n\t*/\n\n#endif\n",
        shadowmap_vertex: "\n\n#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )\n\n\t// Offsetting the position used for querying occlusion along the world normal can be used to reduce shadow acne.\n\tvec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\tvec4 shadowWorldPosition;\n\n#endif\n\n#if defined( USE_SHADOWMAP )\n\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\n\t\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );\n\t\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;\n\n\t\t}\n\t\t#pragma unroll_loop_end\n\n\t#endif\n\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\n\t\t#pragma unroll_loop_start\n\t\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\n\t\t\tshadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );\n\t\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;\n\n\t\t}\n\t\t#pragma unroll_loop_end\n\n\t#endif\n\n\t/*\n\t#if NUM_RECT_AREA_LIGHTS > 0\n\n\t\t// TODO (abelnation): update vAreaShadowCoord with area light info\n\n\t#endif\n\t*/\n\n#endif\n\n// spot lights can be evaluated without active shadow mapping (when SpotLight.map is used)\n\n#if NUM_SPOT_LIGHT_COORDS > 0\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {\n\n\t\tshadowWorldPosition = worldPosition;\n\t\t#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\t\tshadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;\n\t\t#endif\n\t\tvSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;\n\n\t}\n\t#pragma unroll_loop_end\n\n#endif\n\n\n",
        shadowmask_pars_fragment: "\nfloat getShadowMask() {\n\n\tfloat shadow = 1.0;\n\n\t#ifdef USE_SHADOWMAP\n\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\n\tDirectionalLightShadow directionalLight;\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\n\t\tdirectionalLight = directionalLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\n\t}\n\t#pragma unroll_loop_end\n\n\t#endif\n\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\n\tSpotLightShadow spotLight;\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\n\t\tspotLight = spotLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;\n\n\t}\n\t#pragma unroll_loop_end\n\n\t#endif\n\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\n\tPointLightShadow pointLight;\n\n\t#pragma unroll_loop_start\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\n\t\tpointLight = pointLightShadows[ i ];\n\t\tshadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\n\t}\n\t#pragma unroll_loop_end\n\n\t#endif\n\n\t/*\n\t#if NUM_RECT_AREA_LIGHTS > 0\n\n\t\t// TODO (abelnation): update shadow for Area light\n\n\t#endif\n\t*/\n\n\t#endif\n\n\treturn shadow;\n\n}\n",
        skinbase_vertex: "\n#ifdef USE_SKINNING\n\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n\n#endif\n",
        skinning_pars_vertex: "\n#ifdef USE_SKINNING\n\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\n\tuniform highp sampler2D boneTexture;\n\n\tmat4 getBoneMatrix( const in float i ) {\n\n\t\tint size = textureSize( boneTexture, 0 ).x;\n\t\tint j = int( i ) * 4;\n\t\tint x = j % size;\n\t\tint y = j / size;\n\t\tvec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );\n\t\tvec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );\n\t\tvec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );\n\t\tvec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );\n\n\t\treturn mat4( v1, v2, v3, v4 );\n\n\t}\n\n#endif\n",
        skinning_vertex: "\n#ifdef USE_SKINNING\n\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n\n#endif\n",
        skinnormal_vertex: "\n#ifdef USE_SKINNING\n\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;\n\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\n\t#ifdef USE_TANGENT\n\n\t\tobjectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\n\t#endif\n\n#endif\n",
        specularmap_fragment: "\nfloat specularStrength;\n\n#ifdef USE_SPECULARMAP\n\n\tvec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );\n\tspecularStrength = texelSpecular.r;\n\n#else\n\n\tspecularStrength = 1.0;\n\n#endif\n",
        specularmap_pars_fragment: "\n#ifdef USE_SPECULARMAP\n\n\tuniform sampler2D specularMap;\n\n#endif\n",
        tonemapping_fragment: "\n#if defined( TONE_MAPPING )\n\n\tgl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n\n#endif\n",
        tonemapping_pars_fragment: "\n#ifndef saturate\n// <common> may have defined saturate() already\n#define saturate( a ) clamp( a, 0.0, 1.0 )\n#endif\n\nuniform float toneMappingExposure;\n\n// exposure only\nvec3 LinearToneMapping( vec3 color ) {\n\n\treturn saturate( toneMappingExposure * color );\n\n}\n\n// source: https://www.cs.utah.edu/docs/techreports/2002/pdf/UUCS-02-001.pdf\nvec3 ReinhardToneMapping( vec3 color ) {\n\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n\n}\n\n// source: http://filmicworlds.com/blog/filmic-tonemapping-operators/\nvec3 CineonToneMapping( vec3 color ) {\n\n\t// filmic operator by Jim Hejl and Richard Burgess-Dawson\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n\n}\n\n// source: https://github.com/selfshadow/ltc_code/blob/master/webgl/shaders/ltc/ltc_blit.fs\nvec3 RRTAndODTFit( vec3 v ) {\n\n\tvec3 a = v * ( v + 0.0245786 ) - 0.000090537;\n\tvec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;\n\treturn a / b;\n\n}\n\n// this implementation of ACES is modified to accommodate a brighter viewing environment.\n// the scale factor of 1/0.6 is subjective. see discussion in #19621.\n\nvec3 ACESFilmicToneMapping( vec3 color ) {\n\n\t// sRGB => XYZ => D65_2_D60 => AP1 => RRT_SAT\n\tconst mat3 ACESInputMat = mat3(\n\t\tvec3( 0.59719, 0.07600, 0.02840 ), // transposed from source\n\t\tvec3( 0.35458, 0.90834, 0.13383 ),\n\t\tvec3( 0.04823, 0.01566, 0.83777 )\n\t);\n\n\t// ODT_SAT => XYZ => D60_2_D65 => sRGB\n\tconst mat3 ACESOutputMat = mat3(\n\t\tvec3(  1.60475, -0.10208, -0.00327 ), // transposed from source\n\t\tvec3( -0.53108,  1.10813, -0.07276 ),\n\t\tvec3( -0.07367, -0.00605,  1.07602 )\n\t);\n\n\tcolor *= toneMappingExposure / 0.6;\n\n\tcolor = ACESInputMat * color;\n\n\t// Apply RRT and ODT\n\tcolor = RRTAndODTFit( color );\n\n\tcolor = ACESOutputMat * color;\n\n\t// Clamp to [0, 1]\n\treturn saturate( color );\n\n}\n\n// Matrices for rec 2020 <> rec 709 color space conversion\n// matrix provided in row-major order so it has been transposed\n// https://www.itu.int/pub/R-REP-BT.2407-2017\nconst mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(\n\tvec3( 1.6605, - 0.1246, - 0.0182 ),\n\tvec3( - 0.5876, 1.1329, - 0.1006 ),\n\tvec3( - 0.0728, - 0.0083, 1.1187 )\n);\n\nconst mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(\n\tvec3( 0.6274, 0.0691, 0.0164 ),\n\tvec3( 0.3293, 0.9195, 0.0880 ),\n\tvec3( 0.0433, 0.0113, 0.8956 )\n);\n\n// https://iolite-engine.com/blog_posts/minimal_agx_implementation\n// Mean error^2: 3.6705141e-06\nvec3 agxDefaultContrastApprox( vec3 x ) {\n\n\tvec3 x2 = x * x;\n\tvec3 x4 = x2 * x2;\n\n\treturn + 15.5 * x4 * x2\n\t\t- 40.14 * x4 * x\n\t\t+ 31.96 * x4\n\t\t- 6.868 * x2 * x\n\t\t+ 0.4298 * x2\n\t\t+ 0.1191 * x\n\t\t- 0.00232;\n\n}\n\n// AgX Tone Mapping implementation based on Filament, which in turn is based\n// on Blender's implementation using rec 2020 primaries\n// https://github.com/google/filament/pull/7236\n// Inputs and outputs are encoded as Linear-sRGB.\n\nvec3 AgXToneMapping( vec3 color ) {\n\n\t// AgX constants\n\tconst mat3 AgXInsetMatrix = mat3(\n\t\tvec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),\n\t\tvec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),\n\t\tvec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )\n\t);\n\n\t// explicit AgXOutsetMatrix generated from Filaments AgXOutsetMatrixInv\n\tconst mat3 AgXOutsetMatrix = mat3(\n\t\tvec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),\n\t\tvec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),\n\t\tvec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )\n\t);\n\n\t// LOG2_MIN      = -10.0\n\t// LOG2_MAX      =  +6.5\n\t// MIDDLE_GRAY   =  0.18\n\tconst float AgxMinEv = - 12.47393;  // log2( pow( 2, LOG2_MIN ) * MIDDLE_GRAY )\n\tconst float AgxMaxEv = 4.026069;    // log2( pow( 2, LOG2_MAX ) * MIDDLE_GRAY )\n\n\tcolor *= toneMappingExposure;\n\n\tcolor = LINEAR_SRGB_TO_LINEAR_REC2020 * color;\n\n\tcolor = AgXInsetMatrix * color;\n\n\t// Log2 encoding\n\tcolor = max( color, 1e-10 ); // avoid 0 or negative numbers for log2\n\tcolor = log2( color );\n\tcolor = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );\n\n\tcolor = clamp( color, 0.0, 1.0 );\n\n\t// Apply sigmoid\n\tcolor = agxDefaultContrastApprox( color );\n\n\t// Apply AgX look\n\t// v = agxLook(v, look);\n\n\tcolor = AgXOutsetMatrix * color;\n\n\t// Linearize\n\tcolor = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );\n\n\tcolor = LINEAR_REC2020_TO_LINEAR_SRGB * color;\n\n\t// Gamut mapping. Simple clamp for now.\n\tcolor = clamp( color, 0.0, 1.0 );\n\n\treturn color;\n\n}\n\n// https://modelviewer.dev/examples/tone-mapping\n\nvec3 NeutralToneMapping( vec3 color ) {\n\n\tconst float StartCompression = 0.8 - 0.04;\n\tconst float Desaturation = 0.15;\n\n\tcolor *= toneMappingExposure;\n\n\tfloat x = min( color.r, min( color.g, color.b ) );\n\n\tfloat offset = x < 0.08 ? x - 6.25 * x * x : 0.04;\n\n\tcolor -= offset;\n\n\tfloat peak = max( color.r, max( color.g, color.b ) );\n\n\tif ( peak < StartCompression ) return color;\n\n\tfloat d = 1. - StartCompression;\n\n\tfloat newPeak = 1. - d * d / ( peak + d - StartCompression );\n\n\tcolor *= newPeak / peak;\n\n\tfloat g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );\n\n\treturn mix( color, vec3( newPeak ), g );\n\n}\n\nvec3 CustomToneMapping( vec3 color ) { return color; }\n",
        transmission_fragment: "\n#ifdef USE_TRANSMISSION\n\n\tmaterial.transmission = transmission;\n\tmaterial.transmissionAlpha = 1.0;\n\tmaterial.thickness = thickness;\n\tmaterial.attenuationDistance = attenuationDistance;\n\tmaterial.attenuationColor = attenuationColor;\n\n\t#ifdef USE_TRANSMISSIONMAP\n\n\t\tmaterial.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;\n\n\t#endif\n\n\t#ifdef USE_THICKNESSMAP\n\n\t\tmaterial.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;\n\n\t#endif\n\n\tvec3 pos = vWorldPosition;\n\tvec3 v = normalize( cameraPosition - pos );\n\tvec3 n = inverseTransformDirection( normal, viewMatrix );\n\n\tvec4 transmitted = getIBLVolumeRefraction(\n\t\tn, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,\n\t\tpos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,\n\t\tmaterial.attenuationColor, material.attenuationDistance );\n\n\tmaterial.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );\n\n\ttotalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );\n\n#endif\n",
        transmission_pars_fragment: "\n#ifdef USE_TRANSMISSION\n\n\t// Transmission code is based on glTF-Sampler-Viewer\n\t// https://github.com/KhronosGroup/glTF-Sample-Viewer\n\n\tuniform float transmission;\n\tuniform float thickness;\n\tuniform float attenuationDistance;\n\tuniform vec3 attenuationColor;\n\n\t#ifdef USE_TRANSMISSIONMAP\n\n\t\tuniform sampler2D transmissionMap;\n\n\t#endif\n\n\t#ifdef USE_THICKNESSMAP\n\n\t\tuniform sampler2D thicknessMap;\n\n\t#endif\n\n\tuniform vec2 transmissionSamplerSize;\n\tuniform sampler2D transmissionSamplerMap;\n\n\tuniform mat4 modelMatrix;\n\tuniform mat4 projectionMatrix;\n\n\tvarying vec3 vWorldPosition;\n\n\t// Mipped Bicubic Texture Filtering by N8\n\t// https://www.shadertoy.com/view/Dl2SDW\n\n\tfloat w0( float a ) {\n\n\t\treturn ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );\n\n\t}\n\n\tfloat w1( float a ) {\n\n\t\treturn ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );\n\n\t}\n\n\tfloat w2( float a ){\n\n\t\treturn ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );\n\n\t}\n\n\tfloat w3( float a ) {\n\n\t\treturn ( 1.0 / 6.0 ) * ( a * a * a );\n\n\t}\n\n\t// g0 and g1 are the two amplitude functions\n\tfloat g0( float a ) {\n\n\t\treturn w0( a ) + w1( a );\n\n\t}\n\n\tfloat g1( float a ) {\n\n\t\treturn w2( a ) + w3( a );\n\n\t}\n\n\t// h0 and h1 are the two offset functions\n\tfloat h0( float a ) {\n\n\t\treturn - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );\n\n\t}\n\n\tfloat h1( float a ) {\n\n\t\treturn 1.0 + w3( a ) / ( w2( a ) + w3( a ) );\n\n\t}\n\n\tvec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {\n\n\t\tuv = uv * texelSize.zw + 0.5;\n\n\t\tvec2 iuv = floor( uv );\n\t\tvec2 fuv = fract( uv );\n\n\t\tfloat g0x = g0( fuv.x );\n\t\tfloat g1x = g1( fuv.x );\n\t\tfloat h0x = h0( fuv.x );\n\t\tfloat h1x = h1( fuv.x );\n\t\tfloat h0y = h0( fuv.y );\n\t\tfloat h1y = h1( fuv.y );\n\n\t\tvec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n\t\tvec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;\n\t\tvec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n\t\tvec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;\n\n\t\treturn g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +\n\t\t\tg1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );\n\n\t}\n\n\tvec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {\n\n\t\tvec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );\n\t\tvec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );\n\t\tvec2 fLodSizeInv = 1.0 / fLodSize;\n\t\tvec2 cLodSizeInv = 1.0 / cLodSize;\n\t\tvec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );\n\t\tvec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );\n\t\treturn mix( fSample, cSample, fract( lod ) );\n\n\t}\n\n\tvec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {\n\n\t\t// Direction of refracted light.\n\t\tvec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );\n\n\t\t// Compute rotation-independent scaling of the model matrix.\n\t\tvec3 modelScale;\n\t\tmodelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );\n\t\tmodelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );\n\t\tmodelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );\n\n\t\t// The thickness is specified in local space.\n\t\treturn normalize( refractionVector ) * thickness * modelScale;\n\n\t}\n\n\tfloat applyIorToRoughness( const in float roughness, const in float ior ) {\n\n\t\t// Scale roughness with IOR so that an IOR of 1.0 results in no microfacet refraction and\n\t\t// an IOR of 1.5 results in the default amount of microfacet refraction.\n\t\treturn roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );\n\n\t}\n\n\tvec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {\n\n\t\tfloat lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );\n\t\treturn textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );\n\n\t}\n\n\tvec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {\n\n\t\tif ( isinf( attenuationDistance ) ) {\n\n\t\t\t// Attenuation distance is +∞, i.e. the transmitted color is not attenuated at all.\n\t\t\treturn vec3( 1.0 );\n\n\t\t} else {\n\n\t\t\t// Compute light attenuation using Beer's law.\n\t\t\tvec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;\n\t\t\tvec3 transmittance = exp( - attenuationCoefficient * transmissionDistance ); // Beer's law\n\t\t\treturn transmittance;\n\n\t\t}\n\n\t}\n\n\tvec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,\n\t\tconst in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,\n\t\tconst in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,\n\t\tconst in vec3 attenuationColor, const in float attenuationDistance ) {\n\n\t\tvec4 transmittedLight;\n\t\tvec3 transmittance;\n\n\t\t#ifdef USE_DISPERSION\n\n\t\t\tfloat halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;\n\t\t\tvec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );\n\n\t\t\tfor ( int i = 0; i < 3; i ++ ) {\n\n\t\t\t\tvec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );\n\t\t\t\tvec3 refractedRayExit = position + transmissionRay;\n\n\t\t\t\t// Project refracted vector on the framebuffer, while mapping to normalized device coordinates.\n\t\t\t\tvec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n\t\t\t\tvec2 refractionCoords = ndcPos.xy / ndcPos.w;\n\t\t\t\trefractionCoords += 1.0;\n\t\t\t\trefractionCoords /= 2.0;\n\n\t\t\t\t// Sample framebuffer to get pixel the refracted ray hits.\n\t\t\t\tvec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );\n\t\t\t\ttransmittedLight[ i ] = transmissionSample[ i ];\n\t\t\t\ttransmittedLight.a += transmissionSample.a;\n\n\t\t\t\ttransmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];\n\n\t\t\t}\n\n\t\t\ttransmittedLight.a /= 3.0;\n\n\t\t#else\n\n\t\t\tvec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );\n\t\t\tvec3 refractedRayExit = position + transmissionRay;\n\n\t\t\t// Project refracted vector on the framebuffer, while mapping to normalized device coordinates.\n\t\t\tvec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );\n\t\t\tvec2 refractionCoords = ndcPos.xy / ndcPos.w;\n\t\t\trefractionCoords += 1.0;\n\t\t\trefractionCoords /= 2.0;\n\n\t\t\t// Sample framebuffer to get pixel the refracted ray hits.\n\t\t\ttransmittedLight = getTransmissionSample( refractionCoords, roughness, ior );\n\t\t\ttransmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );\n\n\t\t#endif\n\n\t\tvec3 attenuatedColor = transmittance * transmittedLight.rgb;\n\n\t\t// Get the specular component.\n\t\tvec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );\n\n\t\t// As less light is transmitted, the opacity should be increased. This simple approximation does a decent job\n\t\t// of modulating a CSS background, and has no effect when the buffer is opaque, due to a solid object or clear color.\n\t\tfloat transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;\n\n\t\treturn vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );\n\n\t}\n#endif\n",
        uv_pars_fragment: "\n#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n\n\tvarying vec2 vUv;\n\n#endif\n#ifdef USE_MAP\n\n\tvarying vec2 vMapUv;\n\n#endif\n#ifdef USE_ALPHAMAP\n\n\tvarying vec2 vAlphaMapUv;\n\n#endif\n#ifdef USE_LIGHTMAP\n\n\tvarying vec2 vLightMapUv;\n\n#endif\n#ifdef USE_AOMAP\n\n\tvarying vec2 vAoMapUv;\n\n#endif\n#ifdef USE_BUMPMAP\n\n\tvarying vec2 vBumpMapUv;\n\n#endif\n#ifdef USE_NORMALMAP\n\n\tvarying vec2 vNormalMapUv;\n\n#endif\n#ifdef USE_EMISSIVEMAP\n\n\tvarying vec2 vEmissiveMapUv;\n\n#endif\n#ifdef USE_METALNESSMAP\n\n\tvarying vec2 vMetalnessMapUv;\n\n#endif\n#ifdef USE_ROUGHNESSMAP\n\n\tvarying vec2 vRoughnessMapUv;\n\n#endif\n#ifdef USE_ANISOTROPYMAP\n\n\tvarying vec2 vAnisotropyMapUv;\n\n#endif\n#ifdef USE_CLEARCOATMAP\n\n\tvarying vec2 vClearcoatMapUv;\n\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\n\tvarying vec2 vClearcoatNormalMapUv;\n\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\n\tvarying vec2 vClearcoatRoughnessMapUv;\n\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\n\tvarying vec2 vIridescenceMapUv;\n\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\n\tvarying vec2 vIridescenceThicknessMapUv;\n\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\n\tvarying vec2 vSheenColorMapUv;\n\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\n\tvarying vec2 vSheenRoughnessMapUv;\n\n#endif\n#ifdef USE_SPECULARMAP\n\n\tvarying vec2 vSpecularMapUv;\n\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\n\tvarying vec2 vSpecularColorMapUv;\n\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\n\tvarying vec2 vSpecularIntensityMapUv;\n\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\n\tuniform mat3 transmissionMapTransform;\n\tvarying vec2 vTransmissionMapUv;\n\n#endif\n#ifdef USE_THICKNESSMAP\n\n\tuniform mat3 thicknessMapTransform;\n\tvarying vec2 vThicknessMapUv;\n\n#endif\n",
        uv_pars_vertex: "\n#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n\n\tvarying vec2 vUv;\n\n#endif\n#ifdef USE_MAP\n\n\tuniform mat3 mapTransform;\n\tvarying vec2 vMapUv;\n\n#endif\n#ifdef USE_ALPHAMAP\n\n\tuniform mat3 alphaMapTransform;\n\tvarying vec2 vAlphaMapUv;\n\n#endif\n#ifdef USE_LIGHTMAP\n\n\tuniform mat3 lightMapTransform;\n\tvarying vec2 vLightMapUv;\n\n#endif\n#ifdef USE_AOMAP\n\n\tuniform mat3 aoMapTransform;\n\tvarying vec2 vAoMapUv;\n\n#endif\n#ifdef USE_BUMPMAP\n\n\tuniform mat3 bumpMapTransform;\n\tvarying vec2 vBumpMapUv;\n\n#endif\n#ifdef USE_NORMALMAP\n\n\tuniform mat3 normalMapTransform;\n\tvarying vec2 vNormalMapUv;\n\n#endif\n#ifdef USE_DISPLACEMENTMAP\n\n\tuniform mat3 displacementMapTransform;\n\tvarying vec2 vDisplacementMapUv;\n\n#endif\n#ifdef USE_EMISSIVEMAP\n\n\tuniform mat3 emissiveMapTransform;\n\tvarying vec2 vEmissiveMapUv;\n\n#endif\n#ifdef USE_METALNESSMAP\n\n\tuniform mat3 metalnessMapTransform;\n\tvarying vec2 vMetalnessMapUv;\n\n#endif\n#ifdef USE_ROUGHNESSMAP\n\n\tuniform mat3 roughnessMapTransform;\n\tvarying vec2 vRoughnessMapUv;\n\n#endif\n#ifdef USE_ANISOTROPYMAP\n\n\tuniform mat3 anisotropyMapTransform;\n\tvarying vec2 vAnisotropyMapUv;\n\n#endif\n#ifdef USE_CLEARCOATMAP\n\n\tuniform mat3 clearcoatMapTransform;\n\tvarying vec2 vClearcoatMapUv;\n\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\n\tuniform mat3 clearcoatNormalMapTransform;\n\tvarying vec2 vClearcoatNormalMapUv;\n\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\n\tuniform mat3 clearcoatRoughnessMapTransform;\n\tvarying vec2 vClearcoatRoughnessMapUv;\n\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\n\tuniform mat3 sheenColorMapTransform;\n\tvarying vec2 vSheenColorMapUv;\n\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\n\tuniform mat3 sheenRoughnessMapTransform;\n\tvarying vec2 vSheenRoughnessMapUv;\n\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\n\tuniform mat3 iridescenceMapTransform;\n\tvarying vec2 vIridescenceMapUv;\n\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\n\tuniform mat3 iridescenceThicknessMapTransform;\n\tvarying vec2 vIridescenceThicknessMapUv;\n\n#endif\n#ifdef USE_SPECULARMAP\n\n\tuniform mat3 specularMapTransform;\n\tvarying vec2 vSpecularMapUv;\n\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\n\tuniform mat3 specularColorMapTransform;\n\tvarying vec2 vSpecularColorMapUv;\n\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\n\tuniform mat3 specularIntensityMapTransform;\n\tvarying vec2 vSpecularIntensityMapUv;\n\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\n\tuniform mat3 transmissionMapTransform;\n\tvarying vec2 vTransmissionMapUv;\n\n#endif\n#ifdef USE_THICKNESSMAP\n\n\tuniform mat3 thicknessMapTransform;\n\tvarying vec2 vThicknessMapUv;\n\n#endif\n",
        uv_vertex: "\n#if defined( USE_UV ) || defined( USE_ANISOTROPY )\n\n\tvUv = vec3( uv, 1 ).xy;\n\n#endif\n#ifdef USE_MAP\n\n\tvMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_ALPHAMAP\n\n\tvAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_LIGHTMAP\n\n\tvLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_AOMAP\n\n\tvAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_BUMPMAP\n\n\tvBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_NORMALMAP\n\n\tvNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_DISPLACEMENTMAP\n\n\tvDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_EMISSIVEMAP\n\n\tvEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_METALNESSMAP\n\n\tvMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_ROUGHNESSMAP\n\n\tvRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_ANISOTROPYMAP\n\n\tvAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_CLEARCOATMAP\n\n\tvClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_CLEARCOAT_NORMALMAP\n\n\tvClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_CLEARCOAT_ROUGHNESSMAP\n\n\tvClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_IRIDESCENCEMAP\n\n\tvIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_IRIDESCENCE_THICKNESSMAP\n\n\tvIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_SHEEN_COLORMAP\n\n\tvSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_SHEEN_ROUGHNESSMAP\n\n\tvSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_SPECULARMAP\n\n\tvSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_SPECULAR_COLORMAP\n\n\tvSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_SPECULAR_INTENSITYMAP\n\n\tvSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_TRANSMISSIONMAP\n\n\tvTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;\n\n#endif\n#ifdef USE_THICKNESSMAP\n\n\tvThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;\n\n#endif\n",
        worldpos_vertex: "\n#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0\n\n\tvec4 worldPosition = vec4( transformed, 1.0 );\n\n\t#ifdef USE_BATCHING\n\n\t\tworldPosition = batchingMatrix * worldPosition;\n\n\t#endif\n\n\t#ifdef USE_INSTANCING\n\n\t\tworldPosition = instanceMatrix * worldPosition;\n\n\t#endif\n\n\tworldPosition = modelMatrix * worldPosition;\n\n#endif\n",
        background_vert: "\nvarying vec2 vUv;\nuniform mat3 uvTransform;\n\nvoid main() {\n\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\n\tgl_Position = vec4( position.xy, 1.0, 1.0 );\n\n}\n",
        background_frag: "\nuniform sampler2D t2D;\nuniform float backgroundIntensity;\n\nvarying vec2 vUv;\n\nvoid main() {\n\n\tvec4 texColor = texture2D( t2D, vUv );\n\n\t#ifdef DECODE_VIDEO_TEXTURE\n\n\t\t// use inline sRGB decode until browsers properly support SRGB8_APLHA8 with video textures\n\n\t\ttexColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );\n\n\t#endif\n\n\ttexColor.rgb *= backgroundIntensity;\n\n\tgl_FragColor = texColor;\n\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\n}\n",
        backgroundCube_vert: "\nvarying vec3 vWorldDirection;\n\n#include <common>\n\nvoid main() {\n\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\n\tgl_Position.z = gl_Position.w; // set z to camera.far\n\n}\n",
        backgroundCube_frag: "\n\n#ifdef ENVMAP_TYPE_CUBE\n\n\tuniform samplerCube envMap;\n\n#elif defined( ENVMAP_TYPE_CUBE_UV )\n\n\tuniform sampler2D envMap;\n\n#endif\n\nuniform float flipEnvMap;\nuniform float backgroundBlurriness;\nuniform float backgroundIntensity;\nuniform mat3 backgroundRotation;\n\nvarying vec3 vWorldDirection;\n\n#include <cube_uv_reflection_fragment>\n\nvoid main() {\n\n\t#ifdef ENVMAP_TYPE_CUBE\n\n\t\tvec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );\n\n\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\n\t\tvec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );\n\n\t#else\n\n\t\tvec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n\n\t#endif\n\n\ttexColor.rgb *= backgroundIntensity;\n\n\tgl_FragColor = texColor;\n\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\n}\n",
        cube_vert: "\nvarying vec3 vWorldDirection;\n\n#include <common>\n\nvoid main() {\n\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\n\tgl_Position.z = gl_Position.w; // set z to camera.far\n\n}\n",
        cube_frag: "\nuniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\n\nvarying vec3 vWorldDirection;\n\nvoid main() {\n\n\tvec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );\n\n\tgl_FragColor = texColor;\n\tgl_FragColor.a *= opacity;\n\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\n}\n",
        depth_vert: "\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\n// This is used for computing an equivalent of gl_FragCoord.z that is as high precision as possible.\n// Some platforms compute gl_FragCoord at a lower precision which makes the manually computed value better for\n// depth-based postprocessing effects. Reproduced on iPad with A10 processor / iPadOS 13.3.1.\nvarying vec2 vHighPrecisionZW;\n\nvoid main() {\n\n\t#include <uv_vertex>\n\n\t#include <batching_vertex>\n\t#include <skinbase_vertex>\n\n\t#include <morphinstance_vertex>\n\n\t#ifdef USE_DISPLACEMENTMAP\n\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\n\t#endif\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\tvHighPrecisionZW = gl_Position.zw;\n\n}\n",
        depth_frag: "\n#if DEPTH_PACKING == 3200\n\n\tuniform float opacity;\n\n#endif\n\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvarying vec2 vHighPrecisionZW;\n\nvoid main() {\n\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <clipping_planes_fragment>\n\n\t#if DEPTH_PACKING == 3200\n\n\t\tdiffuseColor.a = opacity;\n\n\t#endif\n\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\n\t#include <logdepthbuf_fragment>\n\n\t// Higher precision equivalent of gl_FragCoord.z. This assumes depthRange has been left to its default values.\n\tfloat fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;\n\n\t#if DEPTH_PACKING == 3200\n\n\t\tgl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );\n\n\t#elif DEPTH_PACKING == 3201\n\n\t\tgl_FragColor = packDepthToRGBA( fragCoordZ );\n\n\t#elif DEPTH_PACKING == 3202\n\n\t\tgl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );\n\n\t#elif DEPTH_PACKING == 3203\n\n\t\tgl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );\n\n\t#endif\n\n}\n",
        distanceRGBA_vert: "\n#define DISTANCE\n\nvarying vec3 vWorldPosition;\n\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\n\t#include <batching_vertex>\n\t#include <skinbase_vertex>\n\n\t#include <morphinstance_vertex>\n\n\t#ifdef USE_DISPLACEMENTMAP\n\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\n\t#endif\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\n\tvWorldPosition = worldPosition.xyz;\n\n}\n",
        distanceRGBA_frag: "\n#define DISTANCE\n\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main () {\n\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <clipping_planes_fragment>\n\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist ); // clamp to [ 0, 1 ]\n\n\tgl_FragColor = packDepthToRGBA( dist );\n\n}\n",
        equirect_vert: "\nvarying vec3 vWorldDirection;\n\n#include <common>\n\nvoid main() {\n\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\n}\n",
        equirect_frag: "\nuniform sampler2D tEquirect;\n\nvarying vec3 vWorldDirection;\n\n#include <common>\n\nvoid main() {\n\n\tvec3 direction = normalize( vWorldDirection );\n\n\tvec2 sampleUV = equirectUv( direction );\n\n\tgl_FragColor = texture2D( tEquirect, sampleUV );\n\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\n}\n",
        linedashed_vert: "\nuniform float scale;\nattribute float lineDistance;\n\nvarying float vLineDistance;\n\n#include <common>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\tvLineDistance = scale * lineDistance;\n\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\n}\n",
        linedashed_frag: "\nuniform vec3 diffuse;\nuniform float opacity;\n\nuniform float dashSize;\nuniform float totalSize;\n\nvarying float vLineDistance;\n\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\n\t\tdiscard;\n\n\t}\n\n\tvec3 outgoingLight = vec3( 0.0 );\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\n\toutgoingLight = diffuseColor.rgb; // simple shader\n\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\n}\n",
        meshbasic_vert: "\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\n\t#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )\n\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinbase_vertex>\n\t\t#include <skinnormal_vertex>\n\t\t#include <defaultnormal_vertex>\n\n\t#endif\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n\n}\n",
        meshbasic_frag: "\nuniform vec3 diffuse;\nuniform float opacity;\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n#endif\n\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <specularmap_fragment>\n\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\n\t// accumulation (baked indirect lighting only)\n\t#ifdef USE_LIGHTMAP\n\n\t\tvec4 lightMapTexel = texture2D( lightMap, vLightMapUv );\n\t\treflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;\n\n\t#else\n\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\n\t#endif\n\n\t// modulation\n\t#include <aomap_fragment>\n\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\n\t#include <envmap_fragment>\n\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n\n}\n",
        meshlambert_vert: "\n#define LAMBERT\n\nvarying vec3 vViewPosition;\n\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\tvViewPosition = - mvPosition.xyz;\n\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n\n}\n",
        meshlambert_frag: "\n#define LAMBERT\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_lambert_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\n\t// accumulation\n\t#include <lights_lambert_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\n\t// modulation\n\t#include <aomap_fragment>\n\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\n\t#include <envmap_fragment>\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n\n}\n",
        meshmatcap_vert: "\n#define MATCAP\n\nvarying vec3 vViewPosition;\n\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <color_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\n\tvViewPosition = - mvPosition.xyz;\n\n}\n",
        meshmatcap_frag: "\n#define MATCAP\n\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\n\nvarying vec3 vViewPosition;\n\n#include <common>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5; // 0.495 to remove artifacts caused by undersized matcap disks\n\n\t#ifdef USE_MATCAP\n\n\t\tvec4 matcapColor = texture2D( matcap, uv );\n\n\t#else\n\n\t\tvec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 ); // default if matcap is missing\n\n\t#endif\n\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n\n}\n",
        meshnormal_vert: "\n#define NORMAL\n\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\n\tvarying vec3 vViewPosition;\n\n#endif\n\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <batching_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\n\tvViewPosition = - mvPosition.xyz;\n\n#endif\n\n}\n",
        meshnormal_frag: "\n#define NORMAL\n\nuniform float opacity;\n\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )\n\n\tvarying vec3 vViewPosition;\n\n#endif\n\n#include <packing>\n#include <uv_pars_fragment>\n#include <normal_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\tvec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );\n\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\n\tgl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );\n\n\t#ifdef OPAQUE\n\n\t\tgl_FragColor.a = 1.0;\n\n\t#endif\n\n}\n",
        meshphong_vert: "\n#define PHONG\n\nvarying vec3 vViewPosition;\n\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\tvViewPosition = - mvPosition.xyz;\n\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n\n}\n",
        meshphong_frag: "\n#define PHONG\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\n\t// accumulation\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\n\t// modulation\n\t#include <aomap_fragment>\n\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\n\t#include <envmap_fragment>\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n\n}\n",
        meshphysical_vert: "\n#define STANDARD\n\nvarying vec3 vViewPosition;\n\n#ifdef USE_TRANSMISSION\n\n\tvarying vec3 vWorldPosition;\n\n#endif\n\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\tvViewPosition = - mvPosition.xyz;\n\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n\n#ifdef USE_TRANSMISSION\n\n\tvWorldPosition = worldPosition.xyz;\n\n#endif\n}\n",
        meshphysical_frag: "\n#define STANDARD\n\n#ifdef PHYSICAL\n\t#define IOR\n\t#define USE_SPECULAR\n#endif\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n\n#ifdef IOR\n\tuniform float ior;\n#endif\n\n#ifdef USE_SPECULAR\n\tuniform float specularIntensity;\n\tuniform vec3 specularColor;\n\n\t#ifdef USE_SPECULAR_COLORMAP\n\t\tuniform sampler2D specularColorMap;\n\t#endif\n\n\t#ifdef USE_SPECULAR_INTENSITYMAP\n\t\tuniform sampler2D specularIntensityMap;\n\t#endif\n#endif\n\n#ifdef USE_CLEARCOAT\n\tuniform float clearcoat;\n\tuniform float clearcoatRoughness;\n#endif\n\n#ifdef USE_DISPERSION\n\tuniform float dispersion;\n#endif\n\n#ifdef USE_IRIDESCENCE\n\tuniform float iridescence;\n\tuniform float iridescenceIOR;\n\tuniform float iridescenceThicknessMinimum;\n\tuniform float iridescenceThicknessMaximum;\n#endif\n\n#ifdef USE_SHEEN\n\tuniform vec3 sheenColor;\n\tuniform float sheenRoughness;\n\n\t#ifdef USE_SHEEN_COLORMAP\n\t\tuniform sampler2D sheenColorMap;\n\t#endif\n\n\t#ifdef USE_SHEEN_ROUGHNESSMAP\n\t\tuniform sampler2D sheenRoughnessMap;\n\t#endif\n#endif\n\n#ifdef USE_ANISOTROPY\n\tuniform vec2 anisotropyVector;\n\n\t#ifdef USE_ANISOTROPYMAP\n\t\tuniform sampler2D anisotropyMap;\n\t#endif\n#endif\n\nvarying vec3 vViewPosition;\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <iridescence_fragment>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_physical_pars_fragment>\n#include <transmission_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_pars_fragment>\n#include <iridescence_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <clearcoat_normal_fragment_begin>\n\t#include <clearcoat_normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\n\t// accumulation\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\n\t// modulation\n\t#include <aomap_fragment>\n\n\tvec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;\n\tvec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;\n\n\t#include <transmission_fragment>\n\n\tvec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;\n\n\t#ifdef USE_SHEEN\n\n\t\t// Sheen energy compensation approximation calculation can be found at the end of\n\t\t// https://drive.google.com/file/d/1T0D1VSyR4AllqIJTQAraEIzjlb5h4FKH/view?usp=sharing\n\t\tfloat sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );\n\n\t\toutgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;\n\n\t#endif\n\n\t#ifdef USE_CLEARCOAT\n\n\t\tfloat dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );\n\n\t\tvec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );\n\n\t\toutgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;\n\n\t#endif\n\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n\n}\n",
        meshtoon_vert: "\n#define TOON\n\nvarying vec3 vViewPosition;\n\n#include <common>\n#include <batching_pars_vertex>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <normal_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <batching_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <normal_vertex>\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\n\tvViewPosition = - mvPosition.xyz;\n\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n\n}\n",
        meshtoon_frag: "\n#define TOON\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\n\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <normal_pars_fragment>\n#include <lights_toon_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\n\t// accumulation\n\t#include <lights_toon_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\n\t// modulation\n\t#include <aomap_fragment>\n\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n\n}\n",
        points_vert: "\nuniform float size;\nuniform float scale;\n\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\n#ifdef USE_POINTS_UV\n\n\tvarying vec2 vUv;\n\tuniform mat3 uvTransform;\n\n#endif\n\nvoid main() {\n\n\t#ifdef USE_POINTS_UV\n\n\t\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\n\t#endif\n\n\t#include <color_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphcolor_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\n\tgl_PointSize = size;\n\n\t#ifdef USE_SIZEATTENUATION\n\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\n\t#endif\n\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n\n}\n",
        points_frag: "\nuniform vec3 diffuse;\nuniform float opacity;\n\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\n\tvec3 outgoingLight = vec3( 0.0 );\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\n\toutgoingLight = diffuseColor.rgb;\n\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\n}\n",
        shadow_vert: "\n#include <common>\n#include <batching_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <shadowmap_pars_vertex>\n\nvoid main() {\n\n\t#include <batching_vertex>\n\n\t#include <beginnormal_vertex>\n\t#include <morphinstance_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n\n}\n",
        shadow_frag: "\nuniform vec3 color;\nuniform float opacity;\n\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <logdepthbuf_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n\nvoid main() {\n\n\t#include <logdepthbuf_fragment>\n\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\n}\n",
        sprite_vert: "\nuniform float rotation;\nuniform vec2 center;\n\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\n\nvoid main() {\n\n\t#include <uv_vertex>\n\n\tvec4 mvPosition = modelViewMatrix[ 3 ];\n\n\tvec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );\n\n\t#ifndef USE_SIZEATTENUATION\n\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\n\t#endif\n\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\n\tmvPosition.xy += rotatedPosition;\n\n\tgl_Position = projectionMatrix * mvPosition;\n\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\n}\n",
        sprite_frag: "\nuniform vec3 diffuse;\nuniform float opacity;\n\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <alphatest_pars_fragment>\n#include <alphahash_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\n\nvoid main() {\n\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <clipping_planes_fragment>\n\n\tvec3 outgoingLight = vec3( 0.0 );\n\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <alphahash_fragment>\n\n\toutgoingLight = diffuseColor.rgb;\n\n\t#include <opaque_fragment>\n\t#include <tonemapping_fragment>\n\t#include <colorspace_fragment>\n\t#include <fog_fragment>\n\n}\n"
      },
      Zm = {
        common: {
          diffuse: {
            value: new Pp(16777215)
          },
          opacity: {
            value: 1
          },
          map: {
            value: null
          },
          mapTransform: {
            value: new up
          },
          alphaMap: {
            value: null
          },
          alphaMapTransform: {
            value: new up
          },
          alphaTest: {
            value: 0
          }
        },
        specularmap: {
          specularMap: {
            value: null
          },
          specularMapTransform: {
            value: new up
          }
        },
        envmap: {
          envMap: {
            value: null
          },
          envMapRotation: {
            value: new up
          },
          flipEnvMap: {
            value: -1
          },
          reflectivity: {
            value: 1
          },
          ior: {
            value: 1.5
          },
          refractionRatio: {
            value: .98
          }
        },
        aomap: {
          aoMap: {
            value: null
          },
          aoMapIntensity: {
            value: 1
          },
          aoMapTransform: {
            value: new up
          }
        },
        lightmap: {
          lightMap: {
            value: null
          },
          lightMapIntensity: {
            value: 1
          },
          lightMapTransform: {
            value: new up
          }
        },
        bumpmap: {
          bumpMap: {
            value: null
          },
          bumpMapTransform: {
            value: new up
          },
          bumpScale: {
            value: 1
          }
        },
        normalmap: {
          normalMap: {
            value: null
          },
          normalMapTransform: {
            value: new up
          },
          normalScale: {
            value: new cp(1, 1)
          }
        },
        displacementmap: {
          displacementMap: {
            value: null
          },
          displacementMapTransform: {
            value: new up
          },
          displacementScale: {
            value: 1
          },
          displacementBias: {
            value: 0
          }
        },
        emissivemap: {
          emissiveMap: {
            value: null
          },
          emissiveMapTransform: {
            value: new up
          }
        },
        metalnessmap: {
          metalnessMap: {
            value: null
          },
          metalnessMapTransform: {
            value: new up
          }
        },
        roughnessmap: {
          roughnessMap: {
            value: null
          },
          roughnessMapTransform: {
            value: new up
          }
        },
        gradientmap: {
          gradientMap: {
            value: null
          }
        },
        fog: {
          fogDensity: {
            value: 25e-5
          },
          fogNear: {
            value: 1
          },
          fogFar: {
            value: 2e3
          },
          fogColor: {
            value: new Pp(16777215)
          }
        },
        lights: {
          ambientLightColor: {
            value: []
          },
          lightProbe: {
            value: []
          },
          directionalLights: {
            value: [],
            properties: {
              direction: {},
              color: {}
            }
          },
          directionalLightShadows: {
            value: [],
            properties: {
              shadowIntensity: 1,
              shadowBias: {},
              shadowNormalBias: {},
              shadowRadius: {},
              shadowMapSize: {}
            }
          },
          directionalShadowMap: {
            value: []
          },
          directionalShadowMatrix: {
            value: []
          },
          spotLights: {
            value: [],
            properties: {
              color: {},
              position: {},
              direction: {},
              distance: {},
              coneCos: {},
              penumbraCos: {},
              decay: {}
            }
          },
          spotLightShadows: {
            value: [],
            properties: {
              shadowIntensity: 1,
              shadowBias: {},
              shadowNormalBias: {},
              shadowRadius: {},
              shadowMapSize: {}
            }
          },
          spotLightMap: {
            value: []
          },
          spotShadowMap: {
            value: []
          },
          spotLightMatrix: {
            value: []
          },
          pointLights: {
            value: [],
            properties: {
              color: {},
              position: {},
              decay: {},
              distance: {}
            }
          },
          pointLightShadows: {
            value: [],
            properties: {
              shadowIntensity: 1,
              shadowBias: {},
              shadowNormalBias: {},
              shadowRadius: {},
              shadowMapSize: {},
              shadowCameraNear: {},
              shadowCameraFar: {}
            }
          },
          pointShadowMap: {
            value: []
          },
          pointShadowMatrix: {
            value: []
          },
          hemisphereLights: {
            value: [],
            properties: {
              direction: {},
              skyColor: {},
              groundColor: {}
            }
          },
          rectAreaLights: {
            value: [],
            properties: {
              color: {},
              position: {},
              width: {},
              height: {}
            }
          },
          ltc_1: {
            value: null
          },
          ltc_2: {
            value: null
          }
        },
        points: {
          diffuse: {
            value: new Pp(16777215)
          },
          opacity: {
            value: 1
          },
          size: {
            value: 1
          },
          scale: {
            value: 1
          },
          map: {
            value: null
          },
          alphaMap: {
            value: null
          },
          alphaMapTransform: {
            value: new up
          },
          alphaTest: {
            value: 0
          },
          uvTransform: {
            value: new up
          }
        },
        sprite: {
          diffuse: {
            value: new Pp(16777215)
          },
          opacity: {
            value: 1
          },
          center: {
            value: new cp(.5, .5)
          },
          rotation: {
            value: 0
          },
          map: {
            value: null
          },
          mapTransform: {
            value: new up
          },
          alphaMap: {
            value: null
          },
          alphaMapTransform: {
            value: new up
          },
          alphaTest: {
            value: 0
          }
        }
      },
      Jm = {
        basic: {
          uniforms: um([Zm.common, Zm.specularmap, Zm.envmap, Zm.aomap, Zm.lightmap, Zm.fog]),
          vertexShader: Km.meshbasic_vert,
          fragmentShader: Km.meshbasic_frag
        },
        lambert: {
          uniforms: um([Zm.common, Zm.specularmap, Zm.envmap, Zm.aomap, Zm.lightmap, Zm.emissivemap, Zm.bumpmap, Zm.normalmap, Zm.displacementmap, Zm.fog, Zm.lights, {
            emissive: {
              value: new Pp(0)
            }
          }]),
          vertexShader: Km.meshlambert_vert,
          fragmentShader: Km.meshlambert_frag
        },
        phong: {
          uniforms: um([Zm.common, Zm.specularmap, Zm.envmap, Zm.aomap, Zm.lightmap, Zm.emissivemap, Zm.bumpmap, Zm.normalmap, Zm.displacementmap, Zm.fog, Zm.lights, {
            emissive: {
              value: new Pp(0)
            },
            specular: {
              value: new Pp(1118481)
            },
            shininess: {
              value: 30
            }
          }]),
          vertexShader: Km.meshphong_vert,
          fragmentShader: Km.meshphong_frag
        },
        standard: {
          uniforms: um([Zm.common, Zm.envmap, Zm.aomap, Zm.lightmap, Zm.emissivemap, Zm.bumpmap, Zm.normalmap, Zm.displacementmap, Zm.roughnessmap, Zm.metalnessmap, Zm.fog, Zm.lights, {
            emissive: {
              value: new Pp(0)
            },
            roughness: {
              value: 1
            },
            metalness: {
              value: 0
            },
            envMapIntensity: {
              value: 1
            }
          }]),
          vertexShader: Km.meshphysical_vert,
          fragmentShader: Km.meshphysical_frag
        },
        toon: {
          uniforms: um([Zm.common, Zm.aomap, Zm.lightmap, Zm.emissivemap, Zm.bumpmap, Zm.normalmap, Zm.displacementmap, Zm.gradientmap, Zm.fog, Zm.lights, {
            emissive: {
              value: new Pp(0)
            }
          }]),
          vertexShader: Km.meshtoon_vert,
          fragmentShader: Km.meshtoon_frag
        },
        matcap: {
          uniforms: um([Zm.common, Zm.bumpmap, Zm.normalmap, Zm.displacementmap, Zm.fog, {
            matcap: {
              value: null
            }
          }]),
          vertexShader: Km.meshmatcap_vert,
          fragmentShader: Km.meshmatcap_frag
        },
        points: {
          uniforms: um([Zm.points, Zm.fog]),
          vertexShader: Km.points_vert,
          fragmentShader: Km.points_frag
        },
        dashed: {
          uniforms: um([Zm.common, Zm.fog, {
            scale: {
              value: 1
            },
            dashSize: {
              value: 1
            },
            totalSize: {
              value: 2
            }
          }]),
          vertexShader: Km.linedashed_vert,
          fragmentShader: Km.linedashed_frag
        },
        depth: {
          uniforms: um([Zm.common, Zm.displacementmap]),
          vertexShader: Km.depth_vert,
          fragmentShader: Km.depth_frag
        },
        normal: {
          uniforms: um([Zm.common, Zm.bumpmap, Zm.normalmap, Zm.displacementmap, {
            opacity: {
              value: 1
            }
          }]),
          vertexShader: Km.meshnormal_vert,
          fragmentShader: Km.meshnormal_frag
        },
        sprite: {
          uniforms: um([Zm.sprite, Zm.fog]),
          vertexShader: Km.sprite_vert,
          fragmentShader: Km.sprite_frag
        },
        background: {
          uniforms: {
            uvTransform: {
              value: new up
            },
            t2D: {
              value: null
            },
            backgroundIntensity: {
              value: 1
            }
          },
          vertexShader: Km.background_vert,
          fragmentShader: Km.background_frag
        },
        backgroundCube: {
          uniforms: {
            envMap: {
              value: null
            },
            flipEnvMap: {
              value: -1
            },
            backgroundBlurriness: {
              value: 0
            },
            backgroundIntensity: {
              value: 1
            },
            backgroundRotation: {
              value: new up
            }
          },
          vertexShader: Km.backgroundCube_vert,
          fragmentShader: Km.backgroundCube_frag
        },
        cube: {
          uniforms: {
            tCube: {
              value: null
            },
            tFlip: {
              value: -1
            },
            opacity: {
              value: 1
            }
          },
          vertexShader: Km.cube_vert,
          fragmentShader: Km.cube_frag
        },
        equirect: {
          uniforms: {
            tEquirect: {
              value: null
            }
          },
          vertexShader: Km.equirect_vert,
          fragmentShader: Km.equirect_frag
        },
        distanceRGBA: {
          uniforms: um([Zm.common, Zm.displacementmap, {
            referencePosition: {
              value: new Up
            },
            nearDistance: {
              value: 1
            },
            farDistance: {
              value: 1e3
            }
          }]),
          vertexShader: Km.distanceRGBA_vert,
          fragmentShader: Km.distanceRGBA_frag
        },
        shadow: {
          uniforms: um([Zm.lights, Zm.fog, {
            color: {
              value: new Pp(0)
            },
            opacity: {
              value: 1
            }
          }]),
          vertexShader: Km.shadow_vert,
          fragmentShader: Km.shadow_frag
        }
      };
    Jm.physical = {
      uniforms: um([Jm.standard.uniforms, {
        clearcoat: {
          value: 0
        },
        clearcoatMap: {
          value: null
        },
        clearcoatMapTransform: {
          value: new up
        },
        clearcoatNormalMap: {
          value: null
        },
        clearcoatNormalMapTransform: {
          value: new up
        },
        clearcoatNormalScale: {
          value: new cp(1, 1)
        },
        clearcoatRoughness: {
          value: 0
        },
        clearcoatRoughnessMap: {
          value: null
        },
        clearcoatRoughnessMapTransform: {
          value: new up
        },
        dispersion: {
          value: 0
        },
        iridescence: {
          value: 0
        },
        iridescenceMap: {
          value: null
        },
        iridescenceMapTransform: {
          value: new up
        },
        iridescenceIOR: {
          value: 1.3
        },
        iridescenceThicknessMinimum: {
          value: 100
        },
        iridescenceThicknessMaximum: {
          value: 400
        },
        iridescenceThicknessMap: {
          value: null
        },
        iridescenceThicknessMapTransform: {
          value: new up
        },
        sheen: {
          value: 0
        },
        sheenColor: {
          value: new Pp(0)
        },
        sheenColorMap: {
          value: null
        },
        sheenColorMapTransform: {
          value: new up
        },
        sheenRoughness: {
          value: 1
        },
        sheenRoughnessMap: {
          value: null
        },
        sheenRoughnessMapTransform: {
          value: new up
        },
        transmission: {
          value: 0
        },
        transmissionMap: {
          value: null
        },
        transmissionMapTransform: {
          value: new up
        },
        transmissionSamplerSize: {
          value: new cp
        },
        transmissionSamplerMap: {
          value: null
        },
        thickness: {
          value: 0
        },
        thicknessMap: {
          value: null
        },
        thicknessMapTransform: {
          value: new up
        },
        attenuationDistance: {
          value: 0
        },
        attenuationColor: {
          value: new Pp(0)
        },
        specularColor: {
          value: new Pp(1, 1, 1)
        },
        specularColorMap: {
          value: null
        },
        specularColorMapTransform: {
          value: new up
        },
        specularIntensity: {
          value: 1
        },
        specularIntensityMap: {
          value: null
        },
        specularIntensityMapTransform: {
          value: new up
        },
        anisotropyVector: {
          value: new cp
        },
        anisotropyMap: {
          value: null
        },
        anisotropyMapTransform: {
          value: new up
        }
      }]),
      vertexShader: Km.meshphysical_vert,
      fragmentShader: Km.meshphysical_frag
    };
    const Qm = {
        r: 0,
        b: 0,
        g: 0
      },
      tg = new qp,
      eg = new Fp;

    function ng(t, e, n, i, r, a, s) {
      const o = new Pp(0);
      let l, c, u = !0 === a ? 0 : 1,
        h = null,
        d = 0,
        p = null;

      function f(t) {
        let i = !0 === t.isScene ? t.background : null;
        return i && i.isTexture && (i = (t.backgroundBlurriness > 0 ? n : e).get(i)), i
      }

      function m(e, n) {
        e.getRGB(Qm, hm(t)), i.buffers.color.setClear(Qm.r, Qm.g, Qm.b, n, s)
      }
      return {
        getClearColor: function() {
          return o
        },
        setClearColor: function(t, e = 1) {
          o.set(t), u = e, m(o, u)
        },
        getClearAlpha: function() {
          return u
        },
        setClearAlpha: function(t) {
          u = t, m(o, u)
        },
        render: function(e) {
          let n = !1;
          const r = f(e);
          null === r ? m(o, u) : r && r.isColor && (m(r, 1), n = !0);
          const a = t.xr.getEnvironmentBlendMode();
          "additive" === a ? i.buffers.color.setClear(0, 0, 0, 1, s) : "alpha-blend" === a && i.buffers.color.setClear(0, 0, 0, 0, s), (t.autoClear || n) && (i.buffers.depth.setTest(!0), i.buffers.depth.setMask(!0), i.buffers.color.setMask(!0), t.clear(t.autoClearColor, t.autoClearDepth, t.autoClearStencil))
        },
        addToRenderList: function(e, n) {
          const i = f(n);
          i && (i.isCubeTexture || i.mapping === Oh) ? (void 0 === c && (c = new Ym(new am(1, 1, 1), new pm({
            name: "BackgroundCubeMaterial",
            uniforms: cm(Jm.backgroundCube.uniforms),
            vertexShader: Jm.backgroundCube.vertexShader,
            fragmentShader: Jm.backgroundCube.fragmentShader,
            side: 1,
            depthTest: !1,
            depthWrite: !1,
            fog: !1
          })), c.geometry.deleteAttribute("normal"), c.geometry.deleteAttribute("uv"), c.onBeforeRender = function(t, e, n) {
            this.matrixWorld.copyPosition(n.matrixWorld)
          }, Object.defineProperty(c.material, "envMap", {
            get: function() {
              return this.uniforms.envMap.value
            }
          }), r.update(c)), tg.copy(n.backgroundRotation), tg.x *= -1, tg.y *= -1, tg.z *= -1, i.isCubeTexture && !1 === i.isRenderTargetTexture && (tg.y *= -1, tg.z *= -1), c.material.uniforms.envMap.value = i, c.material.uniforms.flipEnvMap.value = i.isCubeTexture && !1 === i.isRenderTargetTexture ? -1 : 1, c.material.uniforms.backgroundBlurriness.value = n.backgroundBlurriness, c.material.uniforms.backgroundIntensity.value = n.backgroundIntensity, c.material.uniforms.backgroundRotation.value.setFromMatrix4(eg.makeRotationFromEuler(tg)), c.material.toneMapped = mp.getTransfer(i.colorSpace) !== Vd, h === i && d === i.version && p === t.toneMapping || (c.material.needsUpdate = !0, h = i, d = i.version, p = t.toneMapping), c.layers.enableAll(), e.unshift(c, c.geometry, c.material, 0, 0, null)) : i && i.isTexture && (void 0 === l && (l = new Ym(new sm(2, 2), new pm({
            name: "BackgroundMaterial",
            uniforms: cm(Jm.background.uniforms),
            vertexShader: Jm.background.vertexShader,
            fragmentShader: Jm.background.fragmentShader,
            side: 0,
            depthTest: !1,
            depthWrite: !1,
            fog: !1
          })), l.geometry.deleteAttribute("normal"), Object.defineProperty(l.material, "map", {
            get: function() {
              return this.uniforms.t2D.value
            }
          }), r.update(l)), l.material.uniforms.t2D.value = i, l.material.uniforms.backgroundIntensity.value = n.backgroundIntensity, l.material.toneMapped = mp.getTransfer(i.colorSpace) !== Vd, !0 === i.matrixAutoUpdate && i.updateMatrix(), l.material.uniforms.uvTransform.value.copy(i.matrix), h === i && d === i.version && p === t.toneMapping || (l.material.needsUpdate = !0, h = i, d = i.version, p = t.toneMapping), l.layers.enableAll(), e.unshift(l, l.geometry, l.material, 0, 0, null))
        },
        dispose: function() {
          void 0 !== c && (c.geometry.dispose(), c.material.dispose(), c = void 0), void 0 !== l && (l.geometry.dispose(), l.material.dispose(), l = void 0)
        }
      }
    }

    function ig(t, e) {
      const n = t.getParameter(t.MAX_VERTEX_ATTRIBS),
        i = {},
        r = c(null);
      let a = r,
        s = !1;

      function o(e) {
        return t.bindVertexArray(e)
      }

      function l(e) {
        return t.deleteVertexArray(e)
      }

      function c(t) {
        const e = [],
          i = [],
          r = [];
        for (let t = 0; t < n; t++) e[t] = 0, i[t] = 0, r[t] = 0;
        return {
          geometry: null,
          program: null,
          wireframe: !1,
          newAttributes: e,
          enabledAttributes: i,
          attributeDivisors: r,
          object: t,
          attributes: {},
          index: null
        }
      }

      function u() {
        const t = a.newAttributes;
        for (let e = 0, n = t.length; e < n; e++) t[e] = 0
      }

      function h(t) {
        d(t, 0)
      }

      function d(e, n) {
        const i = a.newAttributes,
          r = a.enabledAttributes,
          s = a.attributeDivisors;
        i[e] = 1, 0 === r[e] && (t.enableVertexAttribArray(e), r[e] = 1), s[e] !== n && (t.vertexAttribDivisor(e, n), s[e] = n)
      }

      function p() {
        const e = a.newAttributes,
          n = a.enabledAttributes;
        for (let i = 0, r = n.length; i < r; i++) n[i] !== e[i] && (t.disableVertexAttribArray(i), n[i] = 0)
      }

      function f(e, n, i, r, a, s, o) {
        !0 === o ? t.vertexAttribIPointer(e, n, i, a, s) : t.vertexAttribPointer(e, n, i, r, a, s)
      }

      function m() {
        g(), s = !0, a !== r && (a = r, o(a.object))
      }

      function g() {
        r.geometry = null, r.program = null, r.wireframe = !1
      }
      return {
        setup: function(n, r, l, m, g) {
          let _ = !1;
          const v = function(e, n, r) {
            const a = !0 === r.wireframe;
            let s = i[e.id];
            void 0 === s && (s = {}, i[e.id] = s);
            let o = s[n.id];
            void 0 === o && (o = {}, s[n.id] = o);
            let l = o[a];
            return void 0 === l && (l = c(t.createVertexArray()), o[a] = l), l
          }(m, l, r);
          a !== v && (a = v, o(a.object)), _ = function(t, e, n, i) {
            const r = a.attributes,
              s = e.attributes;
            let o = 0;
            const l = n.getAttributes();
            for (const e in l)
              if (l[e].location >= 0) {
                const n = r[e];
                let i = s[e];
                if (void 0 === i && ("instanceMatrix" === e && t.instanceMatrix && (i = t.instanceMatrix), "instanceColor" === e && t.instanceColor && (i = t.instanceColor)), void 0 === n) return !0;
                if (n.attribute !== i) return !0;
                if (i && n.data !== i.data) return !0;
                o++
              } return a.attributesNum !== o || a.index !== i
          }(n, m, l, g), _ && function(t, e, n, i) {
            const r = {},
              s = e.attributes;
            let o = 0;
            const l = n.getAttributes();
            for (const e in l)
              if (l[e].location >= 0) {
                let n = s[e];
                void 0 === n && ("instanceMatrix" === e && t.instanceMatrix && (n = t.instanceMatrix), "instanceColor" === e && t.instanceColor && (n = t.instanceColor));
                const i = {};
                i.attribute = n, n && n.data && (i.data = n.data), r[e] = i, o++
              } a.attributes = r, a.attributesNum = o, a.index = i
          }(n, m, l, g), null !== g && e.update(g, t.ELEMENT_ARRAY_BUFFER), (_ || s) && (s = !1, function(n, i, r, a) {
            u();
            const s = a.attributes,
              o = r.getAttributes(),
              l = i.defaultAttributeValues;
            for (const i in o) {
              const r = o[i];
              if (r.location >= 0) {
                let o = s[i];
                if (void 0 === o && ("instanceMatrix" === i && n.instanceMatrix && (o = n.instanceMatrix), "instanceColor" === i && n.instanceColor && (o = n.instanceColor)), void 0 !== o) {
                  const i = o.normalized,
                    s = o.itemSize,
                    l = e.get(o);
                  if (void 0 === l) continue;
                  const c = l.buffer,
                    u = l.type,
                    p = l.bytesPerElement,
                    m = u === t.INT || u === t.UNSIGNED_INT || o.gpuType === Yh;
                  if (o.isInterleavedBufferAttribute) {
                    const e = o.data,
                      l = e.stride,
                      g = o.offset;
                    if (e.isInstancedInterleavedBuffer) {
                      for (let t = 0; t < r.locationSize; t++) d(r.location + t, e.meshPerAttribute);
                      !0 !== n.isInstancedMesh && void 0 === a._maxInstanceCount && (a._maxInstanceCount = e.meshPerAttribute * e.count)
                    } else
                      for (let t = 0; t < r.locationSize; t++) h(r.location + t);
                    t.bindBuffer(t.ARRAY_BUFFER, c);
                    for (let t = 0; t < r.locationSize; t++) f(r.location + t, s / r.locationSize, u, i, l * p, (g + s / r.locationSize * t) * p, m)
                  } else {
                    if (o.isInstancedBufferAttribute) {
                      for (let t = 0; t < r.locationSize; t++) d(r.location + t, o.meshPerAttribute);
                      !0 !== n.isInstancedMesh && void 0 === a._maxInstanceCount && (a._maxInstanceCount = o.meshPerAttribute * o.count)
                    } else
                      for (let t = 0; t < r.locationSize; t++) h(r.location + t);
                    t.bindBuffer(t.ARRAY_BUFFER, c);
                    for (let t = 0; t < r.locationSize; t++) f(r.location + t, s / r.locationSize, u, i, s * p, s / r.locationSize * t * p, m)
                  }
                } else if (void 0 !== l) {
                  const e = l[i];
                  if (void 0 !== e) switch (e.length) {
                    case 2:
                      t.vertexAttrib2fv(r.location, e);
                      break;
                    case 3:
                      t.vertexAttrib3fv(r.location, e);
                      break;
                    case 4:
                      t.vertexAttrib4fv(r.location, e);
                      break;
                    default:
                      t.vertexAttrib1fv(r.location, e)
                  }
                }
              }
            }
            p()
          }(n, r, l, m), null !== g && t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, e.get(g).buffer))
        },
        reset: m,
        resetDefaultState: g,
        dispose: function() {
          m();
          for (const t in i) {
            const e = i[t];
            for (const t in e) {
              const n = e[t];
              for (const t in n) l(n[t].object), delete n[t];
              delete e[t]
            }
            delete i[t]
          }
        },
        releaseStatesOfGeometry: function(t) {
          if (void 0 === i[t.id]) return;
          const e = i[t.id];
          for (const t in e) {
            const n = e[t];
            for (const t in n) l(n[t].object), delete n[t];
            delete e[t]
          }
          delete i[t.id]
        },
        releaseStatesOfProgram: function(t) {
          for (const e in i) {
            const n = i[e];
            if (void 0 === n[t.id]) continue;
            const r = n[t.id];
            for (const t in r) l(r[t].object), delete r[t];
            delete n[t.id]
          }
        },
        initAttributes: u,
        enableAttribute: h,
        disableUnusedAttributes: p
      }
    }

    function rg(t, e, n) {
      let i;

      function r(e, r, a) {
        0 !== a && (t.drawArraysInstanced(i, e, r, a), n.update(r, i, a))
      }
      this.setMode = function(t) {
        i = t
      }, this.render = function(e, r) {
        t.drawArrays(i, e, r), n.update(r, i, 1)
      }, this.renderInstances = r, this.renderMultiDraw = function(t, r, a) {
        if (0 === a) return;
        e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i, t, 0, r, 0, a);
        let s = 0;
        for (let t = 0; t < a; t++) s += r[t];
        n.update(s, i, 1)
      }, this.renderMultiDrawInstances = function(t, a, s, o) {
        if (0 === s) return;
        const l = e.get("WEBGL_multi_draw");
        if (null === l)
          for (let e = 0; e < t.length; e++) r(t[e], a[e], o[e]);
        else {
          l.multiDrawArraysInstancedWEBGL(i, t, 0, a, 0, o, 0, s);
          let e = 0;
          for (let t = 0; t < s; t++) e += a[t] * o[t];
          n.update(e, i, 1)
        }
      }
    }

    function ag(t, e, n, i) {
      let r;

      function a(e) {
        if ("highp" === e) {
          if (t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.HIGH_FLOAT).precision > 0 && t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.HIGH_FLOAT).precision > 0) return "highp";
          e = "mediump"
        }
        return "mediump" === e && t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.MEDIUM_FLOAT).precision > 0 && t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp"
      }
      let s = void 0 !== n.precision ? n.precision : "highp";
      const o = a(s);
      o !== s && (console.warn("THREE.WebGLRenderer:", s, "not supported, using", o, "instead."), s = o);
      const l = !0 === n.logarithmicDepthBuffer,
        c = !0 === n.reverseDepthBuffer && e.has("EXT_clip_control"),
        u = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),
        h = t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
      return {
        isWebGL2: !0,
        getMaxAnisotropy: function() {
          if (void 0 !== r) return r;
          if (!0 === e.has("EXT_texture_filter_anisotropic")) {
            const n = e.get("EXT_texture_filter_anisotropic");
            r = t.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
          } else r = 0;
          return r
        },
        getMaxPrecision: a,
        textureFormatReadable: function(e) {
          return e === ed || i.convert(e) === t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT)
        },
        textureTypeReadable: function(n) {
          const r = n === Zh && (e.has("EXT_color_buffer_half_float") || e.has("EXT_color_buffer_float"));
          return !(n !== jh && i.convert(n) !== t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE) && n !== Kh && !r)
        },
        precision: s,
        logarithmicDepthBuffer: l,
        reverseDepthBuffer: c,
        maxTextures: u,
        maxVertexTextures: h,
        maxTextureSize: t.getParameter(t.MAX_TEXTURE_SIZE),
        maxCubemapSize: t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),
        maxAttributes: t.getParameter(t.MAX_VERTEX_ATTRIBS),
        maxVertexUniforms: t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),
        maxVaryings: t.getParameter(t.MAX_VARYING_VECTORS),
        maxFragmentUniforms: t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),
        vertexTextures: h > 0,
        maxSamples: t.getParameter(t.MAX_SAMPLES)
      }
    }

    function sg(t) {
      const e = this;
      let n = null,
        i = 0,
        r = !1,
        a = !1;
      const s = new Ff,
        o = new up,
        l = {
          value: null,
          needsUpdate: !1
        };

      function c(t, n, i, r) {
        const a = null !== t ? t.length : 0;
        let c = null;
        if (0 !== a) {
          if (c = l.value, !0 !== r || null === c) {
            const e = i + 4 * a,
              r = n.matrixWorldInverse;
            o.getNormalMatrix(r), (null === c || c.length < e) && (c = new Float32Array(e));
            for (let e = 0, n = i; e !== a; ++e, n += 4) s.copy(t[e]).applyMatrix4(r, o), s.normal.toArray(c, n), c[n + 3] = s.constant
          }
          l.value = c, l.needsUpdate = !0
        }
        return e.numPlanes = a, e.numIntersection = 0, c
      }
      this.uniform = l, this.numPlanes = 0, this.numIntersection = 0, this.init = function(t, e) {
        const n = 0 !== t.length || e || 0 !== i || r;
        return r = e, i = t.length, n
      }, this.beginShadows = function() {
        a = !0, c(null)
      }, this.endShadows = function() {
        a = !1
      }, this.setGlobalState = function(t, e) {
        n = c(t, e, 0)
      }, this.setState = function(s, o, u) {
        const h = s.clippingPlanes,
          d = s.clipIntersection,
          p = s.clipShadows,
          f = t.get(s);
        if (!r || null === h || 0 === h.length || a && !p) a ? c(null) : (l.value !== n && (l.value = n, l.needsUpdate = i > 0), e.numPlanes = i, e.numIntersection = 0);
        else {
          const t = a ? 0 : i,
            e = 4 * t;
          let r = f.clippingState || null;
          l.value = r, r = c(h, o, e, u);
          for (let t = 0; t !== e; ++t) r[t] = n[t];
          f.clippingState = r, this.numIntersection = d ? this.numPlanes : 0, this.numPlanes += t
        }
      }
    }
    class og extends rh {
      constructor(t = 1, e = 1, n = {}) {
        super(), this.isRenderTarget = !0, this.width = t, this.height = e, this.depth = 1, this.scissor = new Hf(0, 0, t, e), this.scissorTest = !1, this.viewport = new Hf(0, 0, t, e);
        const i = {
          width: t,
          height: e,
          depth: 1
        };
        n = Object.assign({
          generateMipmaps: !1,
          internalFormat: null,
          minFilter: Gh,
          depthBuffer: !0,
          stencilBuffer: !1,
          resolveDepthBuffer: !0,
          resolveStencilBuffer: !0,
          depthTexture: null,
          samples: 0,
          count: 1
        }, n);
        const r = new Ep(i, n.mapping, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.colorSpace);
        r.flipY = !1, r.generateMipmaps = n.generateMipmaps, r.internalFormat = n.internalFormat, this.textures = [];
        const a = n.count;
        for (let t = 0; t < a; t++) this.textures[t] = r.clone(), this.textures[t].isRenderTargetTexture = !0, this.textures[t].renderTarget = this;
        this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.resolveDepthBuffer = n.resolveDepthBuffer, this.resolveStencilBuffer = n.resolveStencilBuffer, this._depthTexture = null, this.depthTexture = n.depthTexture, this.samples = n.samples
      }
      get texture() {
        return this.textures[0]
      }
      set texture(t) {
        this.textures[0] = t
      }
      set depthTexture(t) {
        null !== this._depthTexture && (this._depthTexture.renderTarget = null), null !== t && (t.renderTarget = this), this._depthTexture = t
      }
      get depthTexture() {
        return this._depthTexture
      }
      setSize(t, e, n = 1) {
        if (this.width !== t || this.height !== e || this.depth !== n) {
          this.width = t, this.height = e, this.depth = n;
          for (let i = 0, r = this.textures.length; i < r; i++) this.textures[i].image.width = t, this.textures[i].image.height = e, this.textures[i].image.depth = n;
          this.dispose()
        }
        this.viewport.set(0, 0, t, e), this.scissor.set(0, 0, t, e)
      }
      clone() {
        return (new this.constructor).copy(this)
      }
      copy(t) {
        this.width = t.width, this.height = t.height, this.depth = t.depth, this.scissor.copy(t.scissor), this.scissorTest = t.scissorTest, this.viewport.copy(t.viewport), this.textures.length = 0;
        for (let e = 0, n = t.textures.length; e < n; e++) {
          this.textures[e] = t.textures[e].clone(), this.textures[e].isRenderTargetTexture = !0, this.textures[e].renderTarget = this;
          const n = Object.assign({}, t.textures[e].image);
          this.textures[e].source = new bp(n)
        }
        return this.depthBuffer = t.depthBuffer, this.stencilBuffer = t.stencilBuffer, this.resolveDepthBuffer = t.resolveDepthBuffer, this.resolveStencilBuffer = t.resolveStencilBuffer, null !== t.depthTexture && (this.depthTexture = t.depthTexture.clone()), this.samples = t.samples, this
      }
      dispose() {
        this.dispatchEvent({
          type: "dispose"
        })
      }
    }
    class lg extends og {
      constructor(t = 1, e = 1, n = {}) {
        super(t, e, n), this.isWebGLRenderTarget = !0
      }
    }
    const cg = new Up,
      ug = new cp,
      hg = new cp;
    class dg extends pf {
      constructor(t = 50, e = 1, n = .1, i = 2e3) {
        super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = t, this.zoom = 1, this.near = n, this.far = i, this.focus = 10, this.aspect = e, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix()
      }
      copy(t, e) {
        return super.copy(t, e), this.fov = t.fov, this.zoom = t.zoom, this.near = t.near, this.far = t.far, this.focus = t.focus, this.aspect = t.aspect, this.view = null === t.view ? null : Object.assign({}, t.view), this.filmGauge = t.filmGauge, this.filmOffset = t.filmOffset, this
      }
      setFocalLength(t) {
        const e = .5 * this.getFilmHeight() / t;
        this.fov = 2 * ip * Math.atan(e), this.updateProjectionMatrix()
      }
      getFocalLength() {
        const t = Math.tan(.5 * np * this.fov);
        return .5 * this.getFilmHeight() / t
      }
      getEffectiveFOV() {
        return 2 * ip * Math.atan(Math.tan(.5 * np * this.fov) / this.zoom)
      }
      getFilmWidth() {
        return this.filmGauge * Math.min(this.aspect, 1)
      }
      getFilmHeight() {
        return this.filmGauge / Math.max(this.aspect, 1)
      }
      getViewBounds(t, e, n) {
        cg.set(-1, -1, .5).applyMatrix4(this.projectionMatrixInverse), e.set(cg.x, cg.y).multiplyScalar(-t / cg.z), cg.set(1, 1, .5).applyMatrix4(this.projectionMatrixInverse), n.set(cg.x, cg.y).multiplyScalar(-t / cg.z)
      }
      getViewSize(t, e) {
        return this.getViewBounds(t, ug, hg), e.subVectors(hg, ug)
      }
      setViewOffset(t, e, n, i, r, a) {
        this.aspect = t / e, null === this.view && (this.view = {
          enabled: !0,
          fullWidth: 1,
          fullHeight: 1,
          offsetX: 0,
          offsetY: 0,
          width: 1,
          height: 1
        }), this.view.enabled = !0, this.view.fullWidth = t, this.view.fullHeight = e, this.view.offsetX = n, this.view.offsetY = i, this.view.width = r, this.view.height = a, this.updateProjectionMatrix()
      }
      clearViewOffset() {
        null !== this.view && (this.view.enabled = !1), this.updateProjectionMatrix()
      }
      updateProjectionMatrix() {
        const t = this.near;
        let e = t * Math.tan(.5 * np * this.fov) / this.zoom,
          n = 2 * e,
          i = this.aspect * n,
          r = -.5 * i;
        const a = this.view;
        if (null !== this.view && this.view.enabled) {
          const t = a.fullWidth,
            s = a.fullHeight;
          r += a.offsetX * i / t, e -= a.offsetY * n / s, i *= a.width / t, n *= a.height / s
        }
        const s = this.filmOffset;
        0 !== s && (r += t * s / this.getFilmWidth()), this.projectionMatrix.makePerspective(r, r + i, e, e - n, t, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert()
      }
      toJSON(t) {
        const e = super.toJSON(t);
        return e.object.fov = this.fov, e.object.zoom = this.zoom, e.object.near = this.near, e.object.far = this.far, e.object.focus = this.focus, e.object.aspect = this.aspect, null !== this.view && (e.object.view = Object.assign({}, this.view)), e.object.filmGauge = this.filmGauge, e.object.filmOffset = this.filmOffset, e
      }
    }
    const pg = -90;
    class fg extends hf {
      constructor(t, e, n) {
        super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
        const i = new dg(pg, 1, t, e);
        i.layers = this.layers, this.add(i);
        const r = new dg(pg, 1, t, e);
        r.layers = this.layers, this.add(r);
        const a = new dg(pg, 1, t, e);
        a.layers = this.layers, this.add(a);
        const s = new dg(pg, 1, t, e);
        s.layers = this.layers, this.add(s);
        const o = new dg(pg, 1, t, e);
        o.layers = this.layers, this.add(o);
        const l = new dg(pg, 1, t, e);
        l.layers = this.layers, this.add(l)
      }
      updateCoordinateSystem() {
        const t = this.coordinateSystem,
          e = this.children.concat(),
          [n, i, r, a, s, o] = e;
        for (const t of e) this.remove(t);
        if (t === Qd) n.up.set(0, 1, 0), n.lookAt(1, 0, 0), i.up.set(0, 1, 0), i.lookAt(-1, 0, 0), r.up.set(0, 0, -1), r.lookAt(0, 1, 0), a.up.set(0, 0, 1), a.lookAt(0, -1, 0), s.up.set(0, 1, 0), s.lookAt(0, 0, 1), o.up.set(0, 1, 0), o.lookAt(0, 0, -1);
        else {
          if (t !== tp) throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + t);
          n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), i.up.set(0, -1, 0), i.lookAt(1, 0, 0), r.up.set(0, 0, 1), r.lookAt(0, 1, 0), a.up.set(0, 0, -1), a.lookAt(0, -1, 0), s.up.set(0, -1, 0), s.lookAt(0, 0, 1), o.up.set(0, -1, 0), o.lookAt(0, 0, -1)
        }
        for (const t of e) this.add(t), t.updateMatrixWorld()
      }
      update(t, e) {
        null === this.parent && this.updateMatrixWorld();
        const {
          renderTarget: n,
          activeMipmapLevel: i
        } = this;
        this.coordinateSystem !== t.coordinateSystem && (this.coordinateSystem = t.coordinateSystem, this.updateCoordinateSystem());
        const [r, a, s, o, l, c] = this.children, u = t.getRenderTarget(), h = t.getActiveCubeFace(), d = t.getActiveMipmapLevel(), p = t.xr.enabled;
        t.xr.enabled = !1;
        const f = n.texture.generateMipmaps;
        n.texture.generateMipmaps = !1, t.setRenderTarget(n, 0, i), t.render(e, r), t.setRenderTarget(n, 1, i), t.render(e, a), t.setRenderTarget(n, 2, i), t.render(e, s), t.setRenderTarget(n, 3, i), t.render(e, o), t.setRenderTarget(n, 4, i), t.render(e, l), n.texture.generateMipmaps = f, t.setRenderTarget(n, 5, i), t.render(e, c), t.setRenderTarget(u, h, d), t.xr.enabled = p, n.texture.needsPMREMUpdate = !0
      }
    }
    class mg extends Ep {
      constructor(t, e, n, i, r, a, s, o, l, c) {
        super(t = void 0 !== t ? t : [], e = void 0 !== e ? e : Uh, n, i, r, a, s, o, l, c), this.isCubeTexture = !0, this.flipY = !1
      }
      get images() {
        return this.image
      }
      set images(t) {
        this.image = t
      }
    }
    class gg extends lg {
      constructor(t = 1, e = {}) {
        super(t, t, e), this.isWebGLCubeRenderTarget = !0;
        const n = {
            width: t,
            height: t,
            depth: 1
          },
          i = [n, n, n, n, n, n];
        this.texture = new mg(i, e.mapping, e.wrapS, e.wrapT, e.magFilter, e.minFilter, e.format, e.type, e.anisotropy, e.colorSpace), this.texture.isRenderTargetTexture = !0, this.texture.generateMipmaps = void 0 !== e.generateMipmaps && e.generateMipmaps, this.texture.minFilter = void 0 !== e.minFilter ? e.minFilter : Gh
      }
      fromEquirectangularTexture(t, e) {
        this.texture.type = e.type, this.texture.colorSpace = e.colorSpace, this.texture.generateMipmaps = e.generateMipmaps, this.texture.minFilter = e.minFilter, this.texture.magFilter = e.magFilter;
        const n = {
            tEquirect: {
              value: null
            }
          },
          i = "\n\n\t\t\t\tvarying vec3 vWorldDirection;\n\n\t\t\t\tvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\n\t\t\t\t\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n\n\t\t\t\t}\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tvWorldDirection = transformDirection( position, modelMatrix );\n\n\t\t\t\t\t#include <begin_vertex>\n\t\t\t\t\t#include <project_vertex>\n\n\t\t\t\t}\n\t\t\t",
          r = "\n\n\t\t\t\tuniform sampler2D tEquirect;\n\n\t\t\t\tvarying vec3 vWorldDirection;\n\n\t\t\t\t#include <common>\n\n\t\t\t\tvoid main() {\n\n\t\t\t\t\tvec3 direction = normalize( vWorldDirection );\n\n\t\t\t\t\tvec2 sampleUV = equirectUv( direction );\n\n\t\t\t\t\tgl_FragColor = texture2D( tEquirect, sampleUV );\n\n\t\t\t\t}\n\t\t\t",
          a = new am(5, 5, 5),
          s = new pm({
            name: "CubemapFromEquirect",
            uniforms: cm(n),
            vertexShader: i,
            fragmentShader: r,
            side: 1,
            blending: 0
          });
        s.uniforms.tEquirect.value = e;
        const o = new Ym(a, s),
          l = e.minFilter;
        return e.minFilter === Xh && (e.minFilter = Gh), new fg(1, 10, this).update(t, o), e.minFilter = l, o.geometry.dispose(), o.material.dispose(), this
      }
      clear(t, e, n, i) {
        const r = t.getRenderTarget();
        for (let r = 0; r < 6; r++) t.setRenderTarget(this, r), t.clear(e, n, i);
        t.setRenderTarget(r)
      }
    }

    function _g(t) {
      let e = new WeakMap;

      function n(t, e) {
        return 303 === e ? t.mapping = Uh : 304 === e && (t.mapping = Nh), t
      }

      function i(t) {
        const n = t.target;
        n.removeEventListener("dispose", i);
        const r = e.get(n);
        void 0 !== r && (e.delete(n), r.dispose())
      }
      return {
        get: function(r) {
          if (r && r.isTexture) {
            const a = r.mapping;
            if (303 === a || 304 === a) {
              if (e.has(r)) return n(e.get(r).texture, r.mapping); {
                const a = r.image;
                if (a && a.height > 0) {
                  const s = new gg(a.height);
                  return s.fromEquirectangularTexture(t, r), e.set(r, s), r.addEventListener("dispose", i), n(s.texture, r.mapping)
                }
                return null
              }
            }
          }
          return r
        },
        dispose: function() {
          e = new WeakMap
        }
      }
    }
    const vg = [.125, .215, .35, .446, .526, .582],
      xg = new ff,
      yg = new Pp;
    let bg = null,
      Mg = 0,
      Sg = 0,
      Eg = !1;
    const Tg = (1 + Math.sqrt(5)) / 2,
      wg = 1 / Tg,
      Ag = [new Up(-Tg, wg, 0), new Up(Tg, wg, 0), new Up(-wg, 0, Tg), new Up(wg, 0, Tg), new Up(0, Tg, -wg), new Up(0, Tg, wg), new Up(-1, 1, -1), new Up(1, 1, -1), new Up(-1, 1, 1), new Up(1, 1, 1)],
      Rg = new Up;
    class Cg {
      constructor(t) {
        this._renderer = t, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._lodPlanes = [], this._sizeLods = [], this._sigmas = [], this._blurMaterial = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._compileMaterial(this._blurMaterial)
      }
      fromScene(t, e = 0, n = .1, i = 100, r = {}) {
        const {
          size: a = 256,
          position: s = Rg
        } = r;
        bg = this._renderer.getRenderTarget(), Mg = this._renderer.getActiveCubeFace(), Sg = this._renderer.getActiveMipmapLevel(), Eg = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(a);
        const o = this._allocateTargets();
        return o.depthBuffer = !0, this._sceneToCubeUV(t, n, i, o, s), e > 0 && this._blur(o, 0, 0, e), this._applyPMREM(o), this._cleanup(o), o
      }
      fromEquirectangular(t, e = null) {
        return this._fromTexture(t, e)
      }
      fromCubemap(t, e = null) {
        return this._fromTexture(t, e)
      }
      compileCubemapShader() {
        null === this._cubemapMaterial && (this._cubemapMaterial = Ig(), this._compileMaterial(this._cubemapMaterial))
      }
      compileEquirectangularShader() {
        null === this._equirectMaterial && (this._equirectMaterial = Lg(), this._compileMaterial(this._equirectMaterial))
      }
      dispose() {
        this._dispose(), null !== this._cubemapMaterial && this._cubemapMaterial.dispose(), null !== this._equirectMaterial && this._equirectMaterial.dispose()
      }
      _setSize(t) {
        this._lodMax = Math.floor(Math.log2(t)), this._cubeSize = Math.pow(2, this._lodMax)
      }
      _dispose() {
        null !== this._blurMaterial && this._blurMaterial.dispose(), null !== this._pingPongRenderTarget && this._pingPongRenderTarget.dispose();
        for (let t = 0; t < this._lodPlanes.length; t++) this._lodPlanes[t].dispose()
      }
      _cleanup(t) {
        this._renderer.setRenderTarget(bg, Mg, Sg), this._renderer.xr.enabled = Eg, t.scissorTest = !1, Dg(t, 0, 0, t.width, t.height)
      }
      _fromTexture(t, e) {
        t.mapping === Uh || t.mapping === Nh ? this._setSize(0 === t.image.length ? 16 : t.image[0].width || t.image[0].image.width) : this._setSize(t.image.width / 4), bg = this._renderer.getRenderTarget(), Mg = this._renderer.getActiveCubeFace(), Sg = this._renderer.getActiveMipmapLevel(), Eg = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
        const n = e || this._allocateTargets();
        return this._textureToCubeUV(t, n), this._applyPMREM(n), this._cleanup(n), n
      }
      _allocateTargets() {
        const t = 3 * Math.max(this._cubeSize, 112),
          e = 4 * this._cubeSize,
          n = {
            magFilter: Gh,
            minFilter: Gh,
            generateMipmaps: !1,
            type: Zh,
            format: ed,
            colorSpace: kd,
            depthBuffer: !1
          },
          i = Pg(t, e, n);
        if (null === this._pingPongRenderTarget || this._pingPongRenderTarget.width !== t || this._pingPongRenderTarget.height !== e) {
          null !== this._pingPongRenderTarget && this._dispose(), this._pingPongRenderTarget = Pg(t, e, n);
          const {
            _lodMax: i
          } = this;
          ({
            sizeLods: this._sizeLods,
            lodPlanes: this._lodPlanes,
            sigmas: this._sigmas
          } = function(t) {
            const e = [],
              n = [],
              i = [];
            let r = t;
            const a = t - 4 + 1 + vg.length;
            for (let s = 0; s < a; s++) {
              const a = Math.pow(2, r);
              n.push(a);
              let o = 1 / a;
              s > t - 4 ? o = vg[s - t + 4 - 1] : 0 === s && (o = 0), i.push(o);
              const l = 1 / (a - 2),
                c = -l,
                u = 1 + l,
                h = [c, c, u, c, u, u, c, c, u, u, c, u],
                d = 6,
                p = 6,
                f = 3,
                m = 2,
                g = 1,
                _ = new Float32Array(f * p * d),
                v = new Float32Array(m * p * d),
                x = new Float32Array(g * p * d);
              for (let t = 0; t < d; t++) {
                const e = t % 3 * 2 / 3 - 1,
                  n = t > 2 ? 0 : -1,
                  i = [e, n, 0, e + 2 / 3, n, 0, e + 2 / 3, n + 1, 0, e, n, 0, e + 2 / 3, n + 1, 0, e, n + 1, 0];
                _.set(i, f * p * t), v.set(h, m * p * t);
                const r = [t, t, t, t, t, t];
                x.set(r, g * p * t)
              }
              const y = new rm;
              y.setAttribute("position", new qf(_, f)), y.setAttribute("uv", new qf(v, m)), y.setAttribute("faceIndex", new qf(x, g)), e.push(y), r > 4 && r--
            }
            return {
              lodPlanes: e,
              sizeLods: n,
              sigmas: i
            }
          }(i)), this._blurMaterial = function(t, e, n) {
            const i = new Float32Array(20),
              r = new Up(0, 1, 0);
            return new pm({
              name: "SphericalGaussianBlur",
              defines: {
                n: 20,
                CUBEUV_TEXEL_WIDTH: 1 / e,
                CUBEUV_TEXEL_HEIGHT: 1 / n,
                CUBEUV_MAX_MIP: `${t}.0`
              },
              uniforms: {
                envMap: {
                  value: null
                },
                samples: {
                  value: 1
                },
                weights: {
                  value: i
                },
                latitudinal: {
                  value: !1
                },
                dTheta: {
                  value: 0
                },
                mipInt: {
                  value: 0
                },
                poleAxis: {
                  value: r
                }
              },
              vertexShader: "\n\n\t\tprecision mediump float;\n\t\tprecision mediump int;\n\n\t\tattribute float faceIndex;\n\n\t\tvarying vec3 vOutputDirection;\n\n\t\t// RH coordinate system; PMREM face-indexing convention\n\t\tvec3 getDirection( vec2 uv, float face ) {\n\n\t\t\tuv = 2.0 * uv - 1.0;\n\n\t\t\tvec3 direction = vec3( uv, 1.0 );\n\n\t\t\tif ( face == 0.0 ) {\n\n\t\t\t\tdirection = direction.zyx; // ( 1, v, u ) pos x\n\n\t\t\t} else if ( face == 1.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xz *= -1.0; // ( -u, 1, -v ) pos y\n\n\t\t\t} else if ( face == 2.0 ) {\n\n\t\t\t\tdirection.x *= -1.0; // ( -u, v, 1 ) pos z\n\n\t\t\t} else if ( face == 3.0 ) {\n\n\t\t\t\tdirection = direction.zyx;\n\t\t\t\tdirection.xz *= -1.0; // ( -1, v, -u ) neg x\n\n\t\t\t} else if ( face == 4.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xy *= -1.0; // ( -u, -1, v ) neg y\n\n\t\t\t} else if ( face == 5.0 ) {\n\n\t\t\t\tdirection.z *= -1.0; // ( u, v, -1 ) neg z\n\n\t\t\t}\n\n\t\t\treturn direction;\n\n\t\t}\n\n\t\tvoid main() {\n\n\t\t\tvOutputDirection = getDirection( uv, faceIndex );\n\t\t\tgl_Position = vec4( position, 1.0 );\n\n\t\t}\n\t",
              fragmentShader: "\n\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tvarying vec3 vOutputDirection;\n\n\t\t\tuniform sampler2D envMap;\n\t\t\tuniform int samples;\n\t\t\tuniform float weights[ n ];\n\t\t\tuniform bool latitudinal;\n\t\t\tuniform float dTheta;\n\t\t\tuniform float mipInt;\n\t\t\tuniform vec3 poleAxis;\n\n\t\t\t#define ENVMAP_TYPE_CUBE_UV\n\t\t\t#include <cube_uv_reflection_fragment>\n\n\t\t\tvec3 getSample( float theta, vec3 axis ) {\n\n\t\t\t\tfloat cosTheta = cos( theta );\n\t\t\t\t// Rodrigues' axis-angle rotation\n\t\t\t\tvec3 sampleDirection = vOutputDirection * cosTheta\n\t\t\t\t\t+ cross( axis, vOutputDirection ) * sin( theta )\n\t\t\t\t\t+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );\n\n\t\t\t\treturn bilinearCubeUV( envMap, sampleDirection, mipInt );\n\n\t\t\t}\n\n\t\t\tvoid main() {\n\n\t\t\t\tvec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );\n\n\t\t\t\tif ( all( equal( axis, vec3( 0.0 ) ) ) ) {\n\n\t\t\t\t\taxis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );\n\n\t\t\t\t}\n\n\t\t\t\taxis = normalize( axis );\n\n\t\t\t\tgl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );\n\t\t\t\tgl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );\n\n\t\t\t\tfor ( int i = 1; i < n; i++ ) {\n\n\t\t\t\t\tif ( i >= samples ) {\n\n\t\t\t\t\t\tbreak;\n\n\t\t\t\t\t}\n\n\t\t\t\t\tfloat theta = dTheta * float( i );\n\t\t\t\t\tgl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );\n\t\t\t\t\tgl_FragColor.rgb += weights[ i ] * getSample( theta, axis );\n\n\t\t\t\t}\n\n\t\t\t}\n\t\t",
              blending: 0,
              depthTest: !1,
              depthWrite: !1
            })
          }(i, t, e)
        }
        return i
      }
      _compileMaterial(t) {
        const e = new Ym(this._lodPlanes[0], t);
        this._renderer.compile(e, xg)
      }
      _sceneToCubeUV(t, e, n, i, r) {
        const a = new dg(90, 1, e, n),
          s = [1, -1, 1, 1, 1, 1],
          o = [1, 1, 1, -1, -1, -1],
          l = this._renderer,
          c = l.autoClear,
          u = l.toneMapping;
        l.getClearColor(yg), l.toneMapping = 0, l.autoClear = !1;
        const h = new Om({
            name: "PMREM.Background",
            side: 1,
            depthWrite: !1,
            depthTest: !1
          }),
          d = new Ym(new am, h);
        let p = !1;
        const f = t.background;
        f ? f.isColor && (h.color.copy(f), t.background = null, p = !0) : (h.color.copy(yg), p = !0);
        for (let e = 0; e < 6; e++) {
          const n = e % 3;
          0 === n ? (a.up.set(0, s[e], 0), a.position.set(r.x, r.y, r.z), a.lookAt(r.x + o[e], r.y, r.z)) : 1 === n ? (a.up.set(0, 0, s[e]), a.position.set(r.x, r.y, r.z), a.lookAt(r.x, r.y + o[e], r.z)) : (a.up.set(0, s[e], 0), a.position.set(r.x, r.y, r.z), a.lookAt(r.x, r.y, r.z + o[e]));
          const c = this._cubeSize;
          Dg(i, n * c, e > 2 ? c : 0, c, c), l.setRenderTarget(i), p && l.render(d, a), l.render(t, a)
        }
        d.geometry.dispose(), d.material.dispose(), l.toneMapping = u, l.autoClear = c, t.background = f
      }
      _textureToCubeUV(t, e) {
        const n = this._renderer,
          i = t.mapping === Uh || t.mapping === Nh;
        i ? (null === this._cubemapMaterial && (this._cubemapMaterial = Ig()), this._cubemapMaterial.uniforms.flipEnvMap.value = !1 === t.isRenderTargetTexture ? -1 : 1) : null === this._equirectMaterial && (this._equirectMaterial = Lg());
        const r = i ? this._cubemapMaterial : this._equirectMaterial,
          a = new Ym(this._lodPlanes[0], r);
        r.uniforms.envMap.value = t;
        const s = this._cubeSize;
        Dg(e, 0, 0, 3 * s, 2 * s), n.setRenderTarget(e), n.render(a, xg)
      }
      _applyPMREM(t) {
        const e = this._renderer,
          n = e.autoClear;
        e.autoClear = !1;
        const i = this._lodPlanes.length;
        for (let e = 1; e < i; e++) {
          const n = Math.sqrt(this._sigmas[e] * this._sigmas[e] - this._sigmas[e - 1] * this._sigmas[e - 1]),
            r = Ag[(i - e - 1) % Ag.length];
          this._blur(t, e - 1, e, n, r)
        }
        e.autoClear = n
      }
      _blur(t, e, n, i, r) {
        const a = this._pingPongRenderTarget;
        this._halfBlur(t, a, e, n, i, "latitudinal", r), this._halfBlur(a, t, n, n, i, "longitudinal", r)
      }
      _halfBlur(t, e, n, i, r, a, s) {
        const o = this._renderer,
          l = this._blurMaterial;
        "latitudinal" !== a && "longitudinal" !== a && console.error("blur direction must be either latitudinal or longitudinal!");
        const c = new Ym(this._lodPlanes[i], l),
          u = l.uniforms,
          h = this._sizeLods[n] - 1,
          d = isFinite(r) ? Math.PI / (2 * h) : 2 * Math.PI / 39,
          p = r / d,
          f = isFinite(r) ? 1 + Math.floor(3 * p) : 20;
        f > 20 && console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${f} samples when the maximum is set to 20`);
        const m = [];
        let g = 0;
        for (let t = 0; t < 20; ++t) {
          const e = t / p,
            n = Math.exp(-e * e / 2);
          m.push(n), 0 === t ? g += n : t < f && (g += 2 * n)
        }
        for (let t = 0; t < m.length; t++) m[t] = m[t] / g;
        u.envMap.value = t.texture, u.samples.value = f, u.weights.value = m, u.latitudinal.value = "latitudinal" === a, s && (u.poleAxis.value = s);
        const {
          _lodMax: _
        } = this;
        u.dTheta.value = d, u.mipInt.value = _ - n;
        const v = this._sizeLods[i];
        Dg(e, 3 * v * (i > _ - 4 ? i - _ + 4 : 0), 4 * (this._cubeSize - v), 3 * v, 2 * v), o.setRenderTarget(e), o.render(c, xg)
      }
    }

    function Pg(t, e, n) {
      const i = new lg(t, e, n);
      return i.texture.mapping = Oh, i.texture.name = "PMREM.cubeUv", i.scissorTest = !0, i
    }

    function Dg(t, e, n, i, r) {
      t.viewport.set(e, n, i, r), t.scissor.set(e, n, i, r)
    }

    function Lg() {
      return new pm({
        name: "EquirectangularToCubeUV",
        uniforms: {
          envMap: {
            value: null
          }
        },
        vertexShader: "\n\n\t\tprecision mediump float;\n\t\tprecision mediump int;\n\n\t\tattribute float faceIndex;\n\n\t\tvarying vec3 vOutputDirection;\n\n\t\t// RH coordinate system; PMREM face-indexing convention\n\t\tvec3 getDirection( vec2 uv, float face ) {\n\n\t\t\tuv = 2.0 * uv - 1.0;\n\n\t\t\tvec3 direction = vec3( uv, 1.0 );\n\n\t\t\tif ( face == 0.0 ) {\n\n\t\t\t\tdirection = direction.zyx; // ( 1, v, u ) pos x\n\n\t\t\t} else if ( face == 1.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xz *= -1.0; // ( -u, 1, -v ) pos y\n\n\t\t\t} else if ( face == 2.0 ) {\n\n\t\t\t\tdirection.x *= -1.0; // ( -u, v, 1 ) pos z\n\n\t\t\t} else if ( face == 3.0 ) {\n\n\t\t\t\tdirection = direction.zyx;\n\t\t\t\tdirection.xz *= -1.0; // ( -1, v, -u ) neg x\n\n\t\t\t} else if ( face == 4.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xy *= -1.0; // ( -u, -1, v ) neg y\n\n\t\t\t} else if ( face == 5.0 ) {\n\n\t\t\t\tdirection.z *= -1.0; // ( u, v, -1 ) neg z\n\n\t\t\t}\n\n\t\t\treturn direction;\n\n\t\t}\n\n\t\tvoid main() {\n\n\t\t\tvOutputDirection = getDirection( uv, faceIndex );\n\t\t\tgl_Position = vec4( position, 1.0 );\n\n\t\t}\n\t",
        fragmentShader: "\n\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tvarying vec3 vOutputDirection;\n\n\t\t\tuniform sampler2D envMap;\n\n\t\t\t#include <common>\n\n\t\t\tvoid main() {\n\n\t\t\t\tvec3 outputDirection = normalize( vOutputDirection );\n\t\t\t\tvec2 uv = equirectUv( outputDirection );\n\n\t\t\t\tgl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );\n\n\t\t\t}\n\t\t",
        blending: 0,
        depthTest: !1,
        depthWrite: !1
      })
    }

    function Ig() {
      return new pm({
        name: "CubemapToCubeUV",
        uniforms: {
          envMap: {
            value: null
          },
          flipEnvMap: {
            value: -1
          }
        },
        vertexShader: "\n\n\t\tprecision mediump float;\n\t\tprecision mediump int;\n\n\t\tattribute float faceIndex;\n\n\t\tvarying vec3 vOutputDirection;\n\n\t\t// RH coordinate system; PMREM face-indexing convention\n\t\tvec3 getDirection( vec2 uv, float face ) {\n\n\t\t\tuv = 2.0 * uv - 1.0;\n\n\t\t\tvec3 direction = vec3( uv, 1.0 );\n\n\t\t\tif ( face == 0.0 ) {\n\n\t\t\t\tdirection = direction.zyx; // ( 1, v, u ) pos x\n\n\t\t\t} else if ( face == 1.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xz *= -1.0; // ( -u, 1, -v ) pos y\n\n\t\t\t} else if ( face == 2.0 ) {\n\n\t\t\t\tdirection.x *= -1.0; // ( -u, v, 1 ) pos z\n\n\t\t\t} else if ( face == 3.0 ) {\n\n\t\t\t\tdirection = direction.zyx;\n\t\t\t\tdirection.xz *= -1.0; // ( -1, v, -u ) neg x\n\n\t\t\t} else if ( face == 4.0 ) {\n\n\t\t\t\tdirection = direction.xzy;\n\t\t\t\tdirection.xy *= -1.0; // ( -u, -1, v ) neg y\n\n\t\t\t} else if ( face == 5.0 ) {\n\n\t\t\t\tdirection.z *= -1.0; // ( u, v, -1 ) neg z\n\n\t\t\t}\n\n\t\t\treturn direction;\n\n\t\t}\n\n\t\tvoid main() {\n\n\t\t\tvOutputDirection = getDirection( uv, faceIndex );\n\t\t\tgl_Position = vec4( position, 1.0 );\n\n\t\t}\n\t",
        fragmentShader: "\n\n\t\t\tprecision mediump float;\n\t\t\tprecision mediump int;\n\n\t\t\tuniform float flipEnvMap;\n\n\t\t\tvarying vec3 vOutputDirection;\n\n\t\t\tuniform samplerCube envMap;\n\n\t\t\tvoid main() {\n\n\t\t\t\tgl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );\n\n\t\t\t}\n\t\t",
        blending: 0,
        depthTest: !1,
        depthWrite: !1
      })
    }

    function Ug(t) {
      let e = new WeakMap,
        n = null;

      function i(t) {
        const n = t.target;
        n.removeEventListener("dispose", i);
        const r = e.get(n);
        void 0 !== r && (e.delete(n), r.dispose())
      }
      return {
        get: function(r) {
          if (r && r.isTexture) {
            const a = r.mapping,
              s = 303 === a || 304 === a,
              o = a === Uh || a === Nh;
            if (s || o) {
              let a = e.get(r);
              const l = void 0 !== a ? a.texture.pmremVersion : 0;
              if (r.isRenderTargetTexture && r.pmremVersion !== l) return null === n && (n = new Cg(t)), a = s ? n.fromEquirectangular(r, a) : n.fromCubemap(r, a), a.texture.pmremVersion = r.pmremVersion, e.set(r, a), a.texture;
              if (void 0 !== a) return a.texture; {
                const l = r.image;
                return s && l && l.height > 0 || o && l && function(t) {
                  let e = 0;
                  for (let n = 0; n < 6; n++) void 0 !== t[n] && e++;
                  return 6 === e
                }(l) ? (null === n && (n = new Cg(t)), a = s ? n.fromEquirectangular(r) : n.fromCubemap(r), a.texture.pmremVersion = r.pmremVersion, e.set(r, a), r.addEventListener("dispose", i), a.texture) : null
              }
            }
          }
          return r
        },
        dispose: function() {
          e = new WeakMap, null !== n && (n.dispose(), n = null)
        }
      }
    }

    function Ng(t) {
      const e = {};

      function n(n) {
        if (void 0 !== e[n]) return e[n];
        let i;
        switch (n) {
          case "WEBGL_depth_texture":
            i = t.getExtension("WEBGL_depth_texture") || t.getExtension("MOZ_WEBGL_depth_texture") || t.getExtension("WEBKIT_WEBGL_depth_texture");
            break;
          case "EXT_texture_filter_anisotropic":
            i = t.getExtension("EXT_texture_filter_anisotropic") || t.getExtension("MOZ_EXT_texture_filter_anisotropic") || t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
            break;
          case "WEBGL_compressed_texture_s3tc":
            i = t.getExtension("WEBGL_compressed_texture_s3tc") || t.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
            break;
          case "WEBGL_compressed_texture_pvrtc":
            i = t.getExtension("WEBGL_compressed_texture_pvrtc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
            break;
          default:
            i = t.getExtension(n)
        }
        return e[n] = i, i
      }
      return {
        has: function(t) {
          return null !== n(t)
        },
        init: function() {
          n("EXT_color_buffer_float"), n("WEBGL_clip_cull_distance"), n("OES_texture_float_linear"), n("EXT_color_buffer_half_float"), n("WEBGL_multisampled_render_to_texture"), n("WEBGL_render_shared_exponent")
        },
        get: function(t) {
          const e = n(t);
          return null === e && nh("THREE.WebGLRenderer: " + t + " extension not supported."), e
        }
      }
    }

    function Og(t, e, n, i) {
      const r = {},
        a = new WeakMap;

      function s(t) {
        const o = t.target;
        null !== o.index && e.remove(o.index);
        for (const t in o.attributes) e.remove(o.attributes[t]);
        o.removeEventListener("dispose", s), delete r[o.id];
        const l = a.get(o);
        l && (e.remove(l), a.delete(o)), i.releaseStatesOfGeometry(o), !0 === o.isInstancedBufferGeometry && delete o._maxInstanceCount, n.memory.geometries--
      }

      function o(t) {
        const n = [],
          i = t.index,
          r = t.attributes.position;
        let s = 0;
        if (null !== i) {
          const t = i.array;
          s = i.version;
          for (let e = 0, i = t.length; e < i; e += 3) {
            const i = t[e + 0],
              r = t[e + 1],
              a = t[e + 2];
            n.push(i, r, r, a, a, i)
          }
        } else {
          if (void 0 === r) return; {
            const t = r.array;
            s = r.version;
            for (let e = 0, i = t.length / 3 - 1; e < i; e += 3) {
              const t = e + 0,
                i = e + 1,
                r = e + 2;
              n.push(t, i, i, r, r, t)
            }
          }
        }
        const o = new(Ju(n) ? $f : Yf)(n, 1);
        o.version = s;
        const l = a.get(t);
        l && e.remove(l), a.set(t, o)
      }
      return {
        get: function(t, e) {
          return !0 === r[e.id] || (e.addEventListener("dispose", s), r[e.id] = !0, n.memory.geometries++), e
        },
        update: function(n) {
          const i = n.attributes;
          for (const n in i) e.update(i[n], t.ARRAY_BUFFER)
        },
        getWireframeAttribute: function(t) {
          const e = a.get(t);
          if (e) {
            const n = t.index;
            null !== n && e.version < n.version && o(t)
          } else o(t);
          return a.get(t)
        }
      }
    }

    function Fg(t, e, n) {
      let i, r, a;

      function s(e, s, o) {
        0 !== o && (t.drawElementsInstanced(i, s, r, e * a, o), n.update(s, i, o))
      }
      this.setMode = function(t) {
        i = t
      }, this.setIndex = function(t) {
        r = t.type, a = t.bytesPerElement
      }, this.render = function(e, s) {
        t.drawElements(i, s, r, e * a), n.update(s, i, 1)
      }, this.renderInstances = s, this.renderMultiDraw = function(t, a, s) {
        if (0 === s) return;
        e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i, a, 0, r, t, 0, s);
        let o = 0;
        for (let t = 0; t < s; t++) o += a[t];
        n.update(o, i, 1)
      }, this.renderMultiDrawInstances = function(t, o, l, c) {
        if (0 === l) return;
        const u = e.get("WEBGL_multi_draw");
        if (null === u)
          for (let e = 0; e < t.length; e++) s(t[e] / a, o[e], c[e]);
        else {
          u.multiDrawElementsInstancedWEBGL(i, o, 0, r, t, 0, c, 0, l);
          let e = 0;
          for (let t = 0; t < l; t++) e += o[t] * c[t];
          n.update(e, i, 1)
        }
      }
    }

    function Bg(t) {
      const e = {
        frame: 0,
        calls: 0,
        triangles: 0,
        points: 0,
        lines: 0
      };
      return {
        memory: {
          geometries: 0,
          textures: 0
        },
        render: e,
        programs: null,
        autoReset: !0,
        reset: function() {
          e.calls = 0, e.triangles = 0, e.points = 0, e.lines = 0
        },
        update: function(n, i, r) {
          switch (e.calls++, i) {
            case t.TRIANGLES:
              e.triangles += r * (n / 3);
              break;
            case t.LINES:
              e.lines += r * (n / 2);
              break;
            case t.LINE_STRIP:
              e.lines += r * (n - 1);
              break;
            case t.LINE_LOOP:
              e.lines += r * n;
              break;
            case t.POINTS:
              e.points += r * n;
              break;
            default:
              console.error("THREE.WebGLInfo: Unknown draw mode:", i)
          }
        }
      }
    }
    class zg extends Ep {
      constructor(t = null, e = 1, n = 1, i = 1) {
        super(null), this.isDataArrayTexture = !0, this.image = {
          data: t,
          width: e,
          height: n,
          depth: i
        }, this.magFilter = kh, this.minFilter = kh, this.wrapR = Bh, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = new Set
      }
      addLayerUpdate(t) {
        this.layerUpdates.add(t)
      }
      clearLayerUpdates() {
        this.layerUpdates.clear()
      }
    }

    function kg(t, e, n) {
      const i = new WeakMap,
        r = new Hf;
      return {
        update: function(a, s, o) {
          const l = a.morphTargetInfluences,
            c = s.morphAttributes.position || s.morphAttributes.normal || s.morphAttributes.color,
            u = void 0 !== c ? c.length : 0;
          let h = i.get(s);
          if (void 0 === h || h.count !== u) {
            void 0 !== h && h.texture.dispose();
            const d = void 0 !== s.morphAttributes.position,
              p = void 0 !== s.morphAttributes.normal,
              f = void 0 !== s.morphAttributes.color,
              m = s.morphAttributes.position || [],
              g = s.morphAttributes.normal || [],
              _ = s.morphAttributes.color || [];
            let v = 0;
            !0 === d && (v = 1), !0 === p && (v = 2), !0 === f && (v = 3);
            let x = s.attributes.position.count * v,
              y = 1;
            x > e.maxTextureSize && (y = Math.ceil(x / e.maxTextureSize), x = e.maxTextureSize);
            const b = new Float32Array(x * y * 4 * u),
              M = new zg(b, x, y, u);
            M.type = Kh, M.needsUpdate = !0;
            const S = 4 * v;
            for (let T = 0; T < u; T++) {
              const w = m[T],
                A = g[T],
                R = _[T],
                C = x * y * 4 * T;
              for (let P = 0; P < w.count; P++) {
                const D = P * S;
                !0 === d && (r.fromBufferAttribute(w, P), b[C + D + 0] = r.x, b[C + D + 1] = r.y, b[C + D + 2] = r.z, b[C + D + 3] = 0), !0 === p && (r.fromBufferAttribute(A, P), b[C + D + 4] = r.x, b[C + D + 5] = r.y, b[C + D + 6] = r.z, b[C + D + 7] = 0), !0 === f && (r.fromBufferAttribute(R, P), b[C + D + 8] = r.x, b[C + D + 9] = r.y, b[C + D + 10] = r.z, b[C + D + 11] = 4 === R.itemSize ? r.w : 1)
              }
            }

            function E() {
              M.dispose(), i.delete(s), s.removeEventListener("dispose", E)
            }
            h = {
              count: u,
              texture: M,
              size: new cp(x, y)
            }, i.set(s, h), s.addEventListener("dispose", E)
          }
          if (!0 === a.isInstancedMesh && null !== a.morphTexture) o.getUniforms().setValue(t, "morphTexture", a.morphTexture, n);
          else {
            let L = 0;
            for (let U = 0; U < l.length; U++) L += l[U];
            const I = s.morphTargetsRelative ? 1 : 1 - L;
            o.getUniforms().setValue(t, "morphTargetBaseInfluence", I), o.getUniforms().setValue(t, "morphTargetInfluences", l)
          }
          o.getUniforms().setValue(t, "morphTargetsTexture", h.texture, n), o.getUniforms().setValue(t, "morphTargetsTextureSize", h.size)
        }
      }
    }

    function Hg(t, e, n, i) {
      let r = new WeakMap;

      function a(t) {
        const e = t.target;
        e.removeEventListener("dispose", a), n.remove(e.instanceMatrix), null !== e.instanceColor && n.remove(e.instanceColor)
      }
      return {
        update: function(s) {
          const o = i.render.frame,
            l = s.geometry,
            c = e.get(s, l);
          if (r.get(c) !== o && (e.update(c), r.set(c, o)), s.isInstancedMesh && (!1 === s.hasEventListener("dispose", a) && s.addEventListener("dispose", a), r.get(s) !== o && (n.update(s.instanceMatrix, t.ARRAY_BUFFER), null !== s.instanceColor && n.update(s.instanceColor, t.ARRAY_BUFFER), r.set(s, o))), s.isSkinnedMesh) {
            const t = s.skeleton;
            r.get(t) !== o && (t.update(), r.set(t, o))
          }
          return c
        },
        dispose: function() {
          r = new WeakMap
        }
      }
    }
    class Vg extends Ep {
      constructor(t = null, e = 1, n = 1, i = 1) {
        super(null), this.isData3DTexture = !0, this.image = {
          data: t,
          width: e,
          height: n,
          depth: i
        }, this.magFilter = kh, this.minFilter = kh, this.wrapR = Bh, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1
      }
    }
    class Gg extends Ep {
      constructor(t, e, n, i, r, a, s, o, l, c = 1026) {
        if (c !== nd && c !== id) throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
        void 0 === n && c === nd && (n = $h), void 0 === n && c === id && (n = td), super(null, i, r, a, s, o, c, n, l), this.isDepthTexture = !0, this.image = {
          width: t,
          height: e
        }, this.magFilter = void 0 !== s ? s : kh, this.minFilter = void 0 !== o ? o : kh, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null
      }
      copy(t) {
        return super.copy(t), this.source = new bp(Object.assign({}, t.image)), this.compareFunction = t.compareFunction, this
      }
      toJSON(t) {
        const e = super.toJSON(t);
        return null !== this.compareFunction && (e.compareFunction = this.compareFunction), e
      }
    }
    const Wg = new Ep,
      Xg = new Gg(1, 1),
      jg = new zg,
      qg = new Vg,
      Yg = new mg,
      $g = [],
      Kg = [],
      Zg = new Float32Array(16),
      Jg = new Float32Array(9),
      Qg = new Float32Array(4);

    function t_(t, e, n) {
      const i = t[0];
      if (i <= 0 || i > 0) return t;
      const r = e * n;
      let a = $g[r];
      if (void 0 === a && (a = new Float32Array(r), $g[r] = a), 0 !== e) {
        i.toArray(a, 0);
        for (let i = 1, r = 0; i !== e; ++i) r += n, t[i].toArray(a, r)
      }
      return a
    }

    function e_(t, e) {
      if (t.length !== e.length) return !1;
      for (let n = 0, i = t.length; n < i; n++)
        if (t[n] !== e[n]) return !1;
      return !0
    }

    function n_(t, e) {
      for (let n = 0, i = e.length; n < i; n++) t[n] = e[n]
    }

    function i_(t, e) {
      let n = Kg[e];
      void 0 === n && (n = new Int32Array(e), Kg[e] = n);
      for (let i = 0; i !== e; ++i) n[i] = t.allocateTextureUnit();
      return n
    }

    function r_(t, e) {
      const n = this.cache;
      n[0] !== e && (t.uniform1f(this.addr, e), n[0] = e)
    }

    function a_(t, e) {
      const n = this.cache;
      if (void 0 !== e.x) n[0] === e.x && n[1] === e.y || (t.uniform2f(this.addr, e.x, e.y), n[0] = e.x, n[1] = e.y);
      else {
        if (e_(n, e)) return;
        t.uniform2fv(this.addr, e), n_(n, e)
      }
    }

    function s_(t, e) {
      const n = this.cache;
      if (void 0 !== e.x) n[0] === e.x && n[1] === e.y && n[2] === e.z || (t.uniform3f(this.addr, e.x, e.y, e.z), n[0] = e.x, n[1] = e.y, n[2] = e.z);
      else if (void 0 !== e.r) n[0] === e.r && n[1] === e.g && n[2] === e.b || (t.uniform3f(this.addr, e.r, e.g, e.b), n[0] = e.r, n[1] = e.g, n[2] = e.b);
      else {
        if (e_(n, e)) return;
        t.uniform3fv(this.addr, e), n_(n, e)
      }
    }

    function o_(t, e) {
      const n = this.cache;
      if (void 0 !== e.x) n[0] === e.x && n[1] === e.y && n[2] === e.z && n[3] === e.w || (t.uniform4f(this.addr, e.x, e.y, e.z, e.w), n[0] = e.x, n[1] = e.y, n[2] = e.z, n[3] = e.w);
      else {
        if (e_(n, e)) return;
        t.uniform4fv(this.addr, e), n_(n, e)
      }
    }

    function l_(t, e) {
      const n = this.cache,
        i = e.elements;
      if (void 0 === i) {
        if (e_(n, e)) return;
        t.uniformMatrix2fv(this.addr, !1, e), n_(n, e)
      } else {
        if (e_(n, i)) return;
        Qg.set(i), t.uniformMatrix2fv(this.addr, !1, Qg), n_(n, i)
      }
    }

    function c_(t, e) {
      const n = this.cache,
        i = e.elements;
      if (void 0 === i) {
        if (e_(n, e)) return;
        t.uniformMatrix3fv(this.addr, !1, e), n_(n, e)
      } else {
        if (e_(n, i)) return;
        Jg.set(i), t.uniformMatrix3fv(this.addr, !1, Jg), n_(n, i)
      }
    }

    function u_(t, e) {
      const n = this.cache,
        i = e.elements;
      if (void 0 === i) {
        if (e_(n, e)) return;
        t.uniformMatrix4fv(this.addr, !1, e), n_(n, e)
      } else {
        if (e_(n, i)) return;
        Zg.set(i), t.uniformMatrix4fv(this.addr, !1, Zg), n_(n, i)
      }
    }

    function h_(t, e) {
      const n = this.cache;
      n[0] !== e && (t.uniform1i(this.addr, e), n[0] = e)
    }

    function d_(t, e) {
      const n = this.cache;
      if (void 0 !== e.x) n[0] === e.x && n[1] === e.y || (t.uniform2i(this.addr, e.x, e.y), n[0] = e.x, n[1] = e.y);
      else {
        if (e_(n, e)) return;
        t.uniform2iv(this.addr, e), n_(n, e)
      }
    }

    function p_(t, e) {
      const n = this.cache;
      if (void 0 !== e.x) n[0] === e.x && n[1] === e.y && n[2] === e.z || (t.uniform3i(this.addr, e.x, e.y, e.z), n[0] = e.x, n[1] = e.y, n[2] = e.z);
      else {
        if (e_(n, e)) return;
        t.uniform3iv(this.addr, e), n_(n, e)
      }
    }

    function f_(t, e) {
      const n = this.cache;
      if (void 0 !== e.x) n[0] === e.x && n[1] === e.y && n[2] === e.z && n[3] === e.w || (t.uniform4i(this.addr, e.x, e.y, e.z, e.w), n[0] = e.x, n[1] = e.y, n[2] = e.z, n[3] = e.w);
      else {
        if (e_(n, e)) return;
        t.uniform4iv(this.addr, e), n_(n, e)
      }
    }

    function m_(t, e) {
      const n = this.cache;
      n[0] !== e && (t.uniform1ui(this.addr, e), n[0] = e)
    }

    function g_(t, e) {
      const n = this.cache;
      if (void 0 !== e.x) n[0] === e.x && n[1] === e.y || (t.uniform2ui(this.addr, e.x, e.y), n[0] = e.x, n[1] = e.y);
      else {
        if (e_(n, e)) return;
        t.uniform2uiv(this.addr, e), n_(n, e)
      }
    }

    function __(t, e) {
      const n = this.cache;
      if (void 0 !== e.x) n[0] === e.x && n[1] === e.y && n[2] === e.z || (t.uniform3ui(this.addr, e.x, e.y, e.z), n[0] = e.x, n[1] = e.y, n[2] = e.z);
      else {
        if (e_(n, e)) return;
        t.uniform3uiv(this.addr, e), n_(n, e)
      }
    }

    function v_(t, e) {
      const n = this.cache;
      if (void 0 !== e.x) n[0] === e.x && n[1] === e.y && n[2] === e.z && n[3] === e.w || (t.uniform4ui(this.addr, e.x, e.y, e.z, e.w), n[0] = e.x, n[1] = e.y, n[2] = e.z, n[3] = e.w);
      else {
        if (e_(n, e)) return;
        t.uniform4uiv(this.addr, e), n_(n, e)
      }
    }

    function x_(t, e, n) {
      const i = this.cache,
        r = n.allocateTextureUnit();
      let a;
      i[0] !== r && (t.uniform1i(this.addr, r), i[0] = r), this.type === t.SAMPLER_2D_SHADOW ? (Xg.compareFunction = 515, a = Xg) : a = Wg, n.setTexture2D(e || a, r)
    }

    function y_(t, e, n) {
      const i = this.cache,
        r = n.allocateTextureUnit();
      i[0] !== r && (t.uniform1i(this.addr, r), i[0] = r), n.setTexture3D(e || qg, r)
    }

    function b_(t, e, n) {
      const i = this.cache,
        r = n.allocateTextureUnit();
      i[0] !== r && (t.uniform1i(this.addr, r), i[0] = r), n.setTextureCube(e || Yg, r)
    }

    function M_(t, e, n) {
      const i = this.cache,
        r = n.allocateTextureUnit();
      i[0] !== r && (t.uniform1i(this.addr, r), i[0] = r), n.setTexture2DArray(e || jg, r)
    }

    function S_(t, e) {
      t.uniform1fv(this.addr, e)
    }

    function E_(t, e) {
      const n = t_(e, this.size, 2);
      t.uniform2fv(this.addr, n)
    }

    function T_(t, e) {
      const n = t_(e, this.size, 3);
      t.uniform3fv(this.addr, n)
    }

    function w_(t, e) {
      const n = t_(e, this.size, 4);
      t.uniform4fv(this.addr, n)
    }

    function A_(t, e) {
      const n = t_(e, this.size, 4);
      t.uniformMatrix2fv(this.addr, !1, n)
    }

    function R_(t, e) {
      const n = t_(e, this.size, 9);
      t.uniformMatrix3fv(this.addr, !1, n)
    }

    function C_(t, e) {
      const n = t_(e, this.size, 16);
      t.uniformMatrix4fv(this.addr, !1, n)
    }

    function P_(t, e) {
      t.uniform1iv(this.addr, e)
    }

    function D_(t, e) {
      t.uniform2iv(this.addr, e)
    }

    function L_(t, e) {
      t.uniform3iv(this.addr, e)
    }

    function I_(t, e) {
      t.uniform4iv(this.addr, e)
    }

    function U_(t, e) {
      t.uniform1uiv(this.addr, e)
    }

    function N_(t, e) {
      t.uniform2uiv(this.addr, e)
    }

    function O_(t, e) {
      t.uniform3uiv(this.addr, e)
    }

    function F_(t, e) {
      t.uniform4uiv(this.addr, e)
    }

    function B_(t, e, n) {
      const i = this.cache,
        r = e.length,
        a = i_(n, r);
      e_(i, a) || (t.uniform1iv(this.addr, a), n_(i, a));
      for (let t = 0; t !== r; ++t) n.setTexture2D(e[t] || Wg, a[t])
    }

    function z_(t, e, n) {
      const i = this.cache,
        r = e.length,
        a = i_(n, r);
      e_(i, a) || (t.uniform1iv(this.addr, a), n_(i, a));
      for (let t = 0; t !== r; ++t) n.setTexture3D(e[t] || qg, a[t])
    }

    function k_(t, e, n) {
      const i = this.cache,
        r = e.length,
        a = i_(n, r);
      e_(i, a) || (t.uniform1iv(this.addr, a), n_(i, a));
      for (let t = 0; t !== r; ++t) n.setTextureCube(e[t] || Yg, a[t])
    }

    function H_(t, e, n) {
      const i = this.cache,
        r = e.length,
        a = i_(n, r);
      e_(i, a) || (t.uniform1iv(this.addr, a), n_(i, a));
      for (let t = 0; t !== r; ++t) n.setTexture2DArray(e[t] || jg, a[t])
    }
    class V_ {
      constructor(t, e, n) {
        this.id = t, this.addr = n, this.cache = [], this.type = e.type, this.setValue = function(t) {
          switch (t) {
            case 5126:
              return r_;
            case 35664:
              return a_;
            case 35665:
              return s_;
            case 35666:
              return o_;
            case 35674:
              return l_;
            case 35675:
              return c_;
            case 35676:
              return u_;
            case 5124:
            case 35670:
              return h_;
            case 35667:
            case 35671:
              return d_;
            case 35668:
            case 35672:
              return p_;
            case 35669:
            case 35673:
              return f_;
            case 5125:
              return m_;
            case 36294:
              return g_;
            case 36295:
              return __;
            case 36296:
              return v_;
            case 35678:
            case 36198:
            case 36298:
            case 36306:
            case 35682:
              return x_;
            case 35679:
            case 36299:
            case 36307:
              return y_;
            case 35680:
            case 36300:
            case 36308:
            case 36293:
              return b_;
            case 36289:
            case 36303:
            case 36311:
            case 36292:
              return M_
          }
        }(e.type)
      }
    }
    class G_ {
      constructor(t, e, n) {
        this.id = t, this.addr = n, this.cache = [], this.type = e.type, this.size = e.size, this.setValue = function(t) {
          switch (t) {
            case 5126:
              return S_;
            case 35664:
              return E_;
            case 35665:
              return T_;
            case 35666:
              return w_;
            case 35674:
              return A_;
            case 35675:
              return R_;
            case 35676:
              return C_;
            case 5124:
            case 35670:
              return P_;
            case 35667:
            case 35671:
              return D_;
            case 35668:
            case 35672:
              return L_;
            case 35669:
            case 35673:
              return I_;
            case 5125:
              return U_;
            case 36294:
              return N_;
            case 36295:
              return O_;
            case 36296:
              return F_;
            case 35678:
            case 36198:
            case 36298:
            case 36306:
            case 35682:
              return B_;
            case 35679:
            case 36299:
            case 36307:
              return z_;
            case 35680:
            case 36300:
            case 36308:
            case 36293:
              return k_;
            case 36289:
            case 36303:
            case 36311:
            case 36292:
              return H_
          }
        }(e.type)
      }
    }
    class W_ {
      constructor(t) {
        this.id = t, this.seq = [], this.map = {}
      }
      setValue(t, e, n) {
        const i = this.seq;
        for (let r = 0, a = i.length; r !== a; ++r) {
          const a = i[r];
          a.setValue(t, e[a.id], n)
        }
      }
    }
    const X_ = /(\w+)(\])?(\[|\.)?/g;

    function j_(t, e) {
      t.seq.push(e), t.map[e.id] = e
    }

    function q_(t, e, n) {
      const i = t.name,
        r = i.length;
      for (X_.lastIndex = 0;;) {
        const a = X_.exec(i),
          s = X_.lastIndex;
        let o = a[1];
        const l = "]" === a[2],
          c = a[3];
        if (l && (o |= 0), void 0 === c || "[" === c && s + 2 === r) {
          j_(n, void 0 === c ? new V_(o, t, e) : new G_(o, t, e));
          break
        } {
          let t = n.map[o];
          void 0 === t && (t = new W_(o), j_(n, t)), n = t
        }
      }
    }
    class Y_ {
      constructor(t, e) {
        this.seq = [], this.map = {};
        const n = t.getProgramParameter(e, t.ACTIVE_UNIFORMS);
        for (let i = 0; i < n; ++i) {
          const n = t.getActiveUniform(e, i);
          q_(n, t.getUniformLocation(e, n.name), this)
        }
      }
      setValue(t, e, n, i) {
        const r = this.map[e];
        void 0 !== r && r.setValue(t, n, i)
      }
      setOptional(t, e, n) {
        const i = e[n];
        void 0 !== i && this.setValue(t, n, i)
      }
      static upload(t, e, n, i) {
        for (let r = 0, a = e.length; r !== a; ++r) {
          const a = e[r],
            s = n[a.id];
          !1 !== s.needsUpdate && a.setValue(t, s.value, i)
        }
      }
      static seqWithValue(t, e) {
        const n = [];
        for (let i = 0, r = t.length; i !== r; ++i) {
          const r = t[i];
          r.id in e && n.push(r)
        }
        return n
      }
    }

    function $_(t, e, n) {
      const i = t.createShader(e);
      return t.shaderSource(i, n), t.compileShader(i), i
    }
    let K_ = 0;
    const Z_ = new up;

    function J_(t, e, n) {
      const i = t.getShaderParameter(e, t.COMPILE_STATUS),
        r = t.getShaderInfoLog(e).trim();
      if (i && "" === r) return "";
      const a = /ERROR: 0:(\d+)/.exec(r);
      if (a) {
        const i = parseInt(a[1]);
        return n.toUpperCase() + "\n\n" + r + "\n\n" + function(t, e) {
          const n = t.split("\n"),
            i = [],
            r = Math.max(e - 6, 0),
            a = Math.min(e + 6, n.length);
          for (let t = r; t < a; t++) {
            const r = t + 1;
            i.push(`${r===e?">":" "} ${r}: ${n[t]}`)
          }
          return i.join("\n")
        }(t.getShaderSource(e), i)
      }
      return r
    }

    function Q_(t, e) {
      const n = function(t) {
        mp._getMatrix(Z_, mp.workingColorSpace, t);
        const e = `mat3( ${Z_.elements.map((t=>t.toFixed(4)))} )`;
        switch (mp.getTransfer(t)) {
          case Hd:
            return [e, "LinearTransferOETF"];
          case Vd:
            return [e, "sRGBTransferOETF"];
          default:
            return console.warn("THREE.WebGLProgram: Unsupported color space: ", t), [e, "LinearTransferOETF"]
        }
      }(e);
      return [`vec4 ${t}( vec4 value ) {`, `\treturn ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`, "}"].join("\n")
    }

    function tv(t, e) {
      let n;
      switch (e) {
        case 1:
          n = "Linear";
          break;
        case 2:
          n = "Reinhard";
          break;
        case 3:
          n = "Cineon";
          break;
        case 4:
          n = "ACESFilmic";
          break;
        case 6:
          n = "AgX";
          break;
        case 7:
          n = "Neutral";
          break;
        case 5:
          n = "Custom";
          break;
        default:
          console.warn("THREE.WebGLProgram: Unsupported toneMapping:", e), n = "Linear"
      }
      return "vec3 " + t + "( vec3 color ) { return " + n + "ToneMapping( color ); }"
    }
    const ev = new Up;

    function nv(t) {
      return "" !== t
    }

    function iv(t, e) {
      const n = e.numSpotLightShadows + e.numSpotLightMaps - e.numSpotLightShadowsWithMaps;
      return t.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, n).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows)
    }

    function rv(t, e) {
      return t.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection)
    }
    const av = /^[ \t]*#include +<([\w\d./]+)>/gm;

    function sv(t) {
      return t.replace(av, lv)
    }
    const ov = new Map;

    function lv(t, e) {
      let n = Km[e];
      if (void 0 === n) {
        const t = ov.get(e);
        if (void 0 === t) throw new Error("Can not resolve #include <" + e + ">");
        n = Km[t], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', e, t)
      }
      return sv(n)
    }
    const cv = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;

    function uv(t) {
      return t.replace(cv, hv)
    }

    function hv(t, e, n, i) {
      let r = "";
      for (let t = parseInt(e); t < parseInt(n); t++) r += i.replace(/\[\s*i\s*\]/g, "[ " + t + " ]").replace(/UNROLLED_LOOP_INDEX/g, t);
      return r
    }

    function dv(t) {
      let e = `precision ${t.precision} float;\n\tprecision ${t.precision} int;\n\tprecision ${t.precision} sampler2D;\n\tprecision ${t.precision} samplerCube;\n\tprecision ${t.precision} sampler3D;\n\tprecision ${t.precision} sampler2DArray;\n\tprecision ${t.precision} sampler2DShadow;\n\tprecision ${t.precision} samplerCubeShadow;\n\tprecision ${t.precision} sampler2DArrayShadow;\n\tprecision ${t.precision} isampler2D;\n\tprecision ${t.precision} isampler3D;\n\tprecision ${t.precision} isamplerCube;\n\tprecision ${t.precision} isampler2DArray;\n\tprecision ${t.precision} usampler2D;\n\tprecision ${t.precision} usampler3D;\n\tprecision ${t.precision} usamplerCube;\n\tprecision ${t.precision} usampler2DArray;\n\t`;
      return "highp" === t.precision ? e += "\n#define HIGH_PRECISION" : "mediump" === t.precision ? e += "\n#define MEDIUM_PRECISION" : "lowp" === t.precision && (e += "\n#define LOW_PRECISION"), e
    }

    function pv(t, e, n, i) {
      const r = t.getContext(),
        a = n.defines;
      let s = n.vertexShader,
        o = n.fragmentShader;
      const l = function(t) {
          let e = "SHADOWMAP_TYPE_BASIC";
          return 1 === t.shadowMapType ? e = "SHADOWMAP_TYPE_PCF" : 2 === t.shadowMapType ? e = "SHADOWMAP_TYPE_PCF_SOFT" : 3 === t.shadowMapType && (e = "SHADOWMAP_TYPE_VSM"), e
        }(n),
        c = function(t) {
          let e = "ENVMAP_TYPE_CUBE";
          if (t.envMap) switch (t.envMapMode) {
            case Uh:
            case Nh:
              e = "ENVMAP_TYPE_CUBE";
              break;
            case Oh:
              e = "ENVMAP_TYPE_CUBE_UV"
          }
          return e
        }(n),
        u = function(t) {
          let e = "ENVMAP_MODE_REFLECTION";
          return t.envMap && t.envMapMode === Nh && (e = "ENVMAP_MODE_REFRACTION"), e
        }(n),
        h = function(t) {
          let e = "ENVMAP_BLENDING_NONE";
          if (t.envMap) switch (t.combine) {
            case 0:
              e = "ENVMAP_BLENDING_MULTIPLY";
              break;
            case 1:
              e = "ENVMAP_BLENDING_MIX";
              break;
            case 2:
              e = "ENVMAP_BLENDING_ADD"
          }
          return e
        }(n),
        d = function(t) {
          const e = t.envMapCubeUVHeight;
          if (null === e) return null;
          const n = Math.log2(e) - 2,
            i = 1 / e;
          return {
            texelWidth: 1 / (3 * Math.max(Math.pow(2, n), 112)),
            texelHeight: i,
            maxMip: n
          }
        }(n),
        p = function(t) {
          return [t.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "", t.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""].filter(nv).join("\n")
        }(n),
        f = function(t) {
          const e = [];
          for (const n in t) {
            const i = t[n];
            !1 !== i && e.push("#define " + n + " " + i)
          }
          return e.join("\n")
        }(a),
        m = r.createProgram();
      let g, _, v = n.glslVersion ? "#version " + n.glslVersion + "\n" : "";
      n.isRawShaderMaterial ? (g = ["#define SHADER_TYPE " + n.shaderType, "#define SHADER_NAME " + n.shaderName, f].filter(nv).join("\n"), g.length > 0 && (g += "\n"), _ = ["#define SHADER_TYPE " + n.shaderType, "#define SHADER_NAME " + n.shaderName, f].filter(nv).join("\n"), _.length > 0 && (_ += "\n")) : (g = [dv(n), "#define SHADER_TYPE " + n.shaderType, "#define SHADER_NAME " + n.shaderName, f, n.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "", n.batching ? "#define USE_BATCHING" : "", n.batchingColor ? "#define USE_BATCHING_COLOR" : "", n.instancing ? "#define USE_INSTANCING" : "", n.instancingColor ? "#define USE_INSTANCING_COLOR" : "", n.instancingMorph ? "#define USE_INSTANCING_MORPH" : "", n.useFog && n.fog ? "#define USE_FOG" : "", n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "", n.map ? "#define USE_MAP" : "", n.envMap ? "#define USE_ENVMAP" : "", n.envMap ? "#define " + u : "", n.lightMap ? "#define USE_LIGHTMAP" : "", n.aoMap ? "#define USE_AOMAP" : "", n.bumpMap ? "#define USE_BUMPMAP" : "", n.normalMap ? "#define USE_NORMALMAP" : "", n.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "", n.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "", n.displacementMap ? "#define USE_DISPLACEMENTMAP" : "", n.emissiveMap ? "#define USE_EMISSIVEMAP" : "", n.anisotropy ? "#define USE_ANISOTROPY" : "", n.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "", n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", n.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", n.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", n.specularMap ? "#define USE_SPECULARMAP" : "", n.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "", n.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "", n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", n.metalnessMap ? "#define USE_METALNESSMAP" : "", n.alphaMap ? "#define USE_ALPHAMAP" : "", n.alphaHash ? "#define USE_ALPHAHASH" : "", n.transmission ? "#define USE_TRANSMISSION" : "", n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", n.thicknessMap ? "#define USE_THICKNESSMAP" : "", n.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "", n.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "", n.mapUv ? "#define MAP_UV " + n.mapUv : "", n.alphaMapUv ? "#define ALPHAMAP_UV " + n.alphaMapUv : "", n.lightMapUv ? "#define LIGHTMAP_UV " + n.lightMapUv : "", n.aoMapUv ? "#define AOMAP_UV " + n.aoMapUv : "", n.emissiveMapUv ? "#define EMISSIVEMAP_UV " + n.emissiveMapUv : "", n.bumpMapUv ? "#define BUMPMAP_UV " + n.bumpMapUv : "", n.normalMapUv ? "#define NORMALMAP_UV " + n.normalMapUv : "", n.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + n.displacementMapUv : "", n.metalnessMapUv ? "#define METALNESSMAP_UV " + n.metalnessMapUv : "", n.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + n.roughnessMapUv : "", n.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + n.anisotropyMapUv : "", n.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + n.clearcoatMapUv : "", n.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + n.clearcoatNormalMapUv : "", n.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + n.clearcoatRoughnessMapUv : "", n.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + n.iridescenceMapUv : "", n.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + n.iridescenceThicknessMapUv : "", n.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + n.sheenColorMapUv : "", n.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + n.sheenRoughnessMapUv : "", n.specularMapUv ? "#define SPECULARMAP_UV " + n.specularMapUv : "", n.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + n.specularColorMapUv : "", n.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + n.specularIntensityMapUv : "", n.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + n.transmissionMapUv : "", n.thicknessMapUv ? "#define THICKNESSMAP_UV " + n.thicknessMapUv : "", n.vertexTangents && !1 === n.flatShading ? "#define USE_TANGENT" : "", n.vertexColors ? "#define USE_COLOR" : "", n.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", n.vertexUv1s ? "#define USE_UV1" : "", n.vertexUv2s ? "#define USE_UV2" : "", n.vertexUv3s ? "#define USE_UV3" : "", n.pointsUvs ? "#define USE_POINTS_UV" : "", n.flatShading ? "#define FLAT_SHADED" : "", n.skinning ? "#define USE_SKINNING" : "", n.morphTargets ? "#define USE_MORPHTARGETS" : "", n.morphNormals && !1 === n.flatShading ? "#define USE_MORPHNORMALS" : "", n.morphColors ? "#define USE_MORPHCOLORS" : "", n.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + n.morphTextureStride : "", n.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + n.morphTargetsCount : "", n.doubleSided ? "#define DOUBLE_SIDED" : "", n.flipSided ? "#define FLIP_SIDED" : "", n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", n.shadowMapEnabled ? "#define " + l : "", n.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", n.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "", n.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", n.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", "#ifdef USE_INSTANCING", "\tattribute mat4 instanceMatrix;", "#endif", "#ifdef USE_INSTANCING_COLOR", "\tattribute vec3 instanceColor;", "#endif", "#ifdef USE_INSTANCING_MORPH", "\tuniform sampler2D morphTexture;", "#endif", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_UV1", "\tattribute vec2 uv1;", "#endif", "#ifdef USE_UV2", "\tattribute vec2 uv2;", "#endif", "#ifdef USE_UV3", "\tattribute vec2 uv3;", "#endif", "#ifdef USE_TANGENT", "\tattribute vec4 tangent;", "#endif", "#if defined( USE_COLOR_ALPHA )", "\tattribute vec4 color;", "#elif defined( USE_COLOR )", "\tattribute vec3 color;", "#endif", "#ifdef USE_SKINNING", "\tattribute vec4 skinIndex;", "\tattribute vec4 skinWeight;", "#endif", "\n"].filter(nv).join("\n"), _ = [dv(n), "#define SHADER_TYPE " + n.shaderType, "#define SHADER_NAME " + n.shaderName, f, n.useFog && n.fog ? "#define USE_FOG" : "", n.useFog && n.fogExp2 ? "#define FOG_EXP2" : "", n.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "", n.map ? "#define USE_MAP" : "", n.matcap ? "#define USE_MATCAP" : "", n.envMap ? "#define USE_ENVMAP" : "", n.envMap ? "#define " + c : "", n.envMap ? "#define " + u : "", n.envMap ? "#define " + h : "", d ? "#define CUBEUV_TEXEL_WIDTH " + d.texelWidth : "", d ? "#define CUBEUV_TEXEL_HEIGHT " + d.texelHeight : "", d ? "#define CUBEUV_MAX_MIP " + d.maxMip + ".0" : "", n.lightMap ? "#define USE_LIGHTMAP" : "", n.aoMap ? "#define USE_AOMAP" : "", n.bumpMap ? "#define USE_BUMPMAP" : "", n.normalMap ? "#define USE_NORMALMAP" : "", n.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "", n.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "", n.emissiveMap ? "#define USE_EMISSIVEMAP" : "", n.anisotropy ? "#define USE_ANISOTROPY" : "", n.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "", n.clearcoat ? "#define USE_CLEARCOAT" : "", n.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", n.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", n.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", n.dispersion ? "#define USE_DISPERSION" : "", n.iridescence ? "#define USE_IRIDESCENCE" : "", n.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", n.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", n.specularMap ? "#define USE_SPECULARMAP" : "", n.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "", n.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "", n.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", n.metalnessMap ? "#define USE_METALNESSMAP" : "", n.alphaMap ? "#define USE_ALPHAMAP" : "", n.alphaTest ? "#define USE_ALPHATEST" : "", n.alphaHash ? "#define USE_ALPHAHASH" : "", n.sheen ? "#define USE_SHEEN" : "", n.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "", n.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "", n.transmission ? "#define USE_TRANSMISSION" : "", n.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", n.thicknessMap ? "#define USE_THICKNESSMAP" : "", n.vertexTangents && !1 === n.flatShading ? "#define USE_TANGENT" : "", n.vertexColors || n.instancingColor || n.batchingColor ? "#define USE_COLOR" : "", n.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", n.vertexUv1s ? "#define USE_UV1" : "", n.vertexUv2s ? "#define USE_UV2" : "", n.vertexUv3s ? "#define USE_UV3" : "", n.pointsUvs ? "#define USE_POINTS_UV" : "", n.gradientMap ? "#define USE_GRADIENTMAP" : "", n.flatShading ? "#define FLAT_SHADED" : "", n.doubleSided ? "#define DOUBLE_SIDED" : "", n.flipSided ? "#define FLIP_SIDED" : "", n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", n.shadowMapEnabled ? "#define " + l : "", n.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", n.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "", n.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "", n.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "", n.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", n.reverseDepthBuffer ? "#define USE_REVERSEDEPTHBUF" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", 0 !== n.toneMapping ? "#define TONE_MAPPING" : "", 0 !== n.toneMapping ? Km.tonemapping_pars_fragment : "", 0 !== n.toneMapping ? tv("toneMapping", n.toneMapping) : "", n.dithering ? "#define DITHERING" : "", n.opaque ? "#define OPAQUE" : "", Km.colorspace_pars_fragment, Q_("linearToOutputTexel", n.outputColorSpace), (mp.getLuminanceCoefficients(ev), ["float luminance( const in vec3 rgb ) {", `\tconst vec3 weights = vec3( ${ev.x.toFixed(4)}, ${ev.y.toFixed(4)}, ${ev.z.toFixed(4)} );`, "\treturn dot( weights, rgb );", "}"].join("\n")), n.useDepthPacking ? "#define DEPTH_PACKING " + n.depthPacking : "", "\n"].filter(nv).join("\n")), s = sv(s), s = iv(s, n), s = rv(s, n), o = sv(o), o = iv(o, n), o = rv(o, n), s = uv(s), o = uv(o), !0 !== n.isRawShaderMaterial && (v = "#version 300 es\n", g = [p, "#define attribute in", "#define varying out", "#define texture2D texture"].join("\n") + "\n" + g, _ = ["#define varying in", n.glslVersion === Jd ? "" : "layout(location = 0) out highp vec4 pc_fragColor;", n.glslVersion === Jd ? "" : "#define gl_FragColor pc_fragColor", "#define gl_FragDepthEXT gl_FragDepth", "#define texture2D texture", "#define textureCube texture", "#define texture2DProj textureProj", "#define texture2DLodEXT textureLod", "#define texture2DProjLodEXT textureProjLod", "#define textureCubeLodEXT textureLod", "#define texture2DGradEXT textureGrad", "#define texture2DProjGradEXT textureProjGrad", "#define textureCubeGradEXT textureGrad"].join("\n") + "\n" + _);
      const x = v + g + s,
        y = v + _ + o,
        b = $_(r, r.VERTEX_SHADER, x),
        M = $_(r, r.FRAGMENT_SHADER, y);

      function S(e) {
        if (t.debug.checkShaderErrors) {
          const n = r.getProgramInfoLog(m).trim(),
            i = r.getShaderInfoLog(b).trim(),
            a = r.getShaderInfoLog(M).trim();
          let s = !0,
            o = !0;
          if (!1 === r.getProgramParameter(m, r.LINK_STATUS))
            if (s = !1, "function" == typeof t.debug.onShaderError) t.debug.onShaderError(r, m, b, M);
            else {
              const t = J_(r, b, "vertex"),
                i = J_(r, M, "fragment");
              console.error("THREE.WebGLProgram: Shader Error " + r.getError() + " - VALIDATE_STATUS " + r.getProgramParameter(m, r.VALIDATE_STATUS) + "\n\nMaterial Name: " + e.name + "\nMaterial Type: " + e.type + "\n\nProgram Info Log: " + n + "\n" + t + "\n" + i)
            }
          else "" !== n ? console.warn("THREE.WebGLProgram: Program Info Log:", n) : "" !== i && "" !== a || (o = !1);
          o && (e.diagnostics = {
            runnable: s,
            programLog: n,
            vertexShader: {
              log: i,
              prefix: g
            },
            fragmentShader: {
              log: a,
              prefix: _
            }
          })
        }
        r.deleteShader(b), r.deleteShader(M), E = new Y_(r, m), T = function(t, e) {
          const n = {},
            i = t.getProgramParameter(e, t.ACTIVE_ATTRIBUTES);
          for (let r = 0; r < i; r++) {
            const i = t.getActiveAttrib(e, r),
              a = i.name;
            let s = 1;
            i.type === t.FLOAT_MAT2 && (s = 2), i.type === t.FLOAT_MAT3 && (s = 3), i.type === t.FLOAT_MAT4 && (s = 4), n[a] = {
              type: i.type,
              location: t.getAttribLocation(e, a),
              locationSize: s
            }
          }
          return n
        }(r, m)
      }
      let E, T;
      r.attachShader(m, b), r.attachShader(m, M), void 0 !== n.index0AttributeName ? r.bindAttribLocation(m, 0, n.index0AttributeName) : !0 === n.morphTargets && r.bindAttribLocation(m, 0, "position"), r.linkProgram(m), this.getUniforms = function() {
        return void 0 === E && S(this), E
      }, this.getAttributes = function() {
        return void 0 === T && S(this), T
      };
      let w = !1 === n.rendererExtensionParallelShaderCompile;
      return this.isReady = function() {
        return !1 === w && (w = r.getProgramParameter(m, 37297)), w
      }, this.destroy = function() {
        i.releaseStatesOfProgram(this), r.deleteProgram(m), this.program = void 0
      }, this.type = n.shaderType, this.name = n.shaderName, this.id = K_++, this.cacheKey = e, this.usedTimes = 1, this.program = m, this.vertexShader = b, this.fragmentShader = M, this
    }
    let fv = 0;
    class mv {
      constructor() {
        this.shaderCache = new Map, this.materialCache = new Map
      }
      update(t) {
        const e = t.vertexShader,
          n = t.fragmentShader,
          i = this._getShaderStage(e),
          r = this._getShaderStage(n),
          a = this._getShaderCacheForMaterial(t);
        return !1 === a.has(i) && (a.add(i), i.usedTimes++), !1 === a.has(r) && (a.add(r), r.usedTimes++), this
      }
      remove(t) {
        const e = this.materialCache.get(t);
        for (const t of e) t.usedTimes--, 0 === t.usedTimes && this.shaderCache.delete(t.code);
        return this.materialCache.delete(t), this
      }
      getVertexShaderID(t) {
        return this._getShaderStage(t.vertexShader).id
      }
      getFragmentShaderID(t) {
        return this._getShaderStage(t.fragmentShader).id
      }
      dispose() {
        this.shaderCache.clear(), this.materialCache.clear()
      }
      _getShaderCacheForMaterial(t) {
        const e = this.materialCache;
        let n = e.get(t);
        return void 0 === n && (n = new Set, e.set(t, n)), n
      }
      _getShaderStage(t) {
        const e = this.shaderCache;
        let n = e.get(t);
        return void 0 === n && (n = new gv(t), e.set(t, n)), n
      }
    }
    class gv {
      constructor(t) {
        this.id = fv++, this.code = t, this.usedTimes = 0
      }
    }

    function _v(t, e, n, i, r, a, s) {
      const o = new Yp,
        l = new mv,
        c = new Set,
        u = [],
        h = r.logarithmicDepthBuffer,
        d = r.vertexTextures;
      let p = r.precision;
      const f = {
        MeshDepthMaterial: "depth",
        MeshDistanceMaterial: "distanceRGBA",
        MeshNormalMaterial: "normal",
        MeshBasicMaterial: "basic",
        MeshLambertMaterial: "lambert",
        MeshPhongMaterial: "phong",
        MeshToonMaterial: "toon",
        MeshStandardMaterial: "physical",
        MeshPhysicalMaterial: "physical",
        MeshMatcapMaterial: "matcap",
        LineBasicMaterial: "basic",
        LineDashedMaterial: "dashed",
        PointsMaterial: "points",
        ShadowMaterial: "shadow",
        SpriteMaterial: "sprite"
      };

      function m(t) {
        return c.add(t), 0 === t ? "uv" : `uv${t}`
      }
      return {
        getParameters: function(a, o, u, g, _) {
          const v = g.fog,
            x = _.geometry,
            y = a.isMeshStandardMaterial ? g.environment : null,
            b = (a.isMeshStandardMaterial ? n : e).get(a.envMap || y),
            M = b && b.mapping === Oh ? b.image.height : null,
            S = f[a.type];
          null !== a.precision && (p = r.getMaxPrecision(a.precision), p !== a.precision && console.warn("THREE.WebGLProgram.getParameters:", a.precision, "not supported, using", p, "instead."));
          const E = x.morphAttributes.position || x.morphAttributes.normal || x.morphAttributes.color,
            T = void 0 !== E ? E.length : 0;
          let w, A, R, C, P = 0;
          if (void 0 !== x.morphAttributes.position && (P = 1), void 0 !== x.morphAttributes.normal && (P = 2), void 0 !== x.morphAttributes.color && (P = 3), S) {
            const t = Jm[S];
            w = t.vertexShader, A = t.fragmentShader
          } else w = a.vertexShader, A = a.fragmentShader, l.update(a), R = l.getVertexShaderID(a), C = l.getFragmentShaderID(a);
          const D = t.getRenderTarget(),
            L = t.state.buffers.depth.getReversed(),
            I = !0 === _.isInstancedMesh,
            U = !0 === _.isBatchedMesh,
            N = !!a.map,
            O = !!a.matcap,
            F = !!b,
            B = !!a.aoMap,
            z = !!a.lightMap,
            k = !!a.bumpMap,
            H = !!a.normalMap,
            V = !!a.displacementMap,
            G = !!a.emissiveMap,
            W = !!a.metalnessMap,
            X = !!a.roughnessMap,
            j = a.anisotropy > 0,
            q = a.clearcoat > 0,
            Y = a.dispersion > 0,
            $ = a.iridescence > 0,
            K = a.sheen > 0,
            Z = a.transmission > 0,
            J = j && !!a.anisotropyMap,
            Q = q && !!a.clearcoatMap,
            tt = q && !!a.clearcoatNormalMap,
            et = q && !!a.clearcoatRoughnessMap,
            nt = $ && !!a.iridescenceMap,
            it = $ && !!a.iridescenceThicknessMap,
            rt = K && !!a.sheenColorMap,
            at = K && !!a.sheenRoughnessMap,
            st = !!a.specularMap,
            ot = !!a.specularColorMap,
            lt = !!a.specularIntensityMap,
            ct = Z && !!a.transmissionMap,
            ut = Z && !!a.thicknessMap,
            ht = !!a.gradientMap,
            dt = !!a.alphaMap,
            pt = a.alphaTest > 0,
            ft = !!a.alphaHash,
            mt = !!a.extensions;
          let gt = 0;
          a.toneMapped && (null !== D && !0 !== D.isXRRenderTarget || (gt = t.toneMapping));
          const _t = {
            shaderID: S,
            shaderType: a.type,
            shaderName: a.name,
            vertexShader: w,
            fragmentShader: A,
            defines: a.defines,
            customVertexShaderID: R,
            customFragmentShaderID: C,
            isRawShaderMaterial: !0 === a.isRawShaderMaterial,
            glslVersion: a.glslVersion,
            precision: p,
            batching: U,
            batchingColor: U && null !== _._colorsTexture,
            instancing: I,
            instancingColor: I && null !== _.instanceColor,
            instancingMorph: I && null !== _.morphTexture,
            supportsVertexTextures: d,
            outputColorSpace: null === D ? t.outputColorSpace : !0 === D.isXRRenderTarget ? D.texture.colorSpace : kd,
            alphaToCoverage: !!a.alphaToCoverage,
            map: N,
            matcap: O,
            envMap: F,
            envMapMode: F && b.mapping,
            envMapCubeUVHeight: M,
            aoMap: B,
            lightMap: z,
            bumpMap: k,
            normalMap: H,
            displacementMap: d && V,
            emissiveMap: G,
            normalMapObjectSpace: H && 1 === a.normalMapType,
            normalMapTangentSpace: H && 0 === a.normalMapType,
            metalnessMap: W,
            roughnessMap: X,
            anisotropy: j,
            anisotropyMap: J,
            clearcoat: q,
            clearcoatMap: Q,
            clearcoatNormalMap: tt,
            clearcoatRoughnessMap: et,
            dispersion: Y,
            iridescence: $,
            iridescenceMap: nt,
            iridescenceThicknessMap: it,
            sheen: K,
            sheenColorMap: rt,
            sheenRoughnessMap: at,
            specularMap: st,
            specularColorMap: ot,
            specularIntensityMap: lt,
            transmission: Z,
            transmissionMap: ct,
            thicknessMap: ut,
            gradientMap: ht,
            opaque: !1 === a.transparent && 1 === a.blending && !1 === a.alphaToCoverage,
            alphaMap: dt,
            alphaTest: pt,
            alphaHash: ft,
            combine: a.combine,
            mapUv: N && m(a.map.channel),
            aoMapUv: B && m(a.aoMap.channel),
            lightMapUv: z && m(a.lightMap.channel),
            bumpMapUv: k && m(a.bumpMap.channel),
            normalMapUv: H && m(a.normalMap.channel),
            displacementMapUv: V && m(a.displacementMap.channel),
            emissiveMapUv: G && m(a.emissiveMap.channel),
            metalnessMapUv: W && m(a.metalnessMap.channel),
            roughnessMapUv: X && m(a.roughnessMap.channel),
            anisotropyMapUv: J && m(a.anisotropyMap.channel),
            clearcoatMapUv: Q && m(a.clearcoatMap.channel),
            clearcoatNormalMapUv: tt && m(a.clearcoatNormalMap.channel),
            clearcoatRoughnessMapUv: et && m(a.clearcoatRoughnessMap.channel),
            iridescenceMapUv: nt && m(a.iridescenceMap.channel),
            iridescenceThicknessMapUv: it && m(a.iridescenceThicknessMap.channel),
            sheenColorMapUv: rt && m(a.sheenColorMap.channel),
            sheenRoughnessMapUv: at && m(a.sheenRoughnessMap.channel),
            specularMapUv: st && m(a.specularMap.channel),
            specularColorMapUv: ot && m(a.specularColorMap.channel),
            specularIntensityMapUv: lt && m(a.specularIntensityMap.channel),
            transmissionMapUv: ct && m(a.transmissionMap.channel),
            thicknessMapUv: ut && m(a.thicknessMap.channel),
            alphaMapUv: dt && m(a.alphaMap.channel),
            vertexTangents: !!x.attributes.tangent && (H || j),
            vertexColors: a.vertexColors,
            vertexAlphas: !0 === a.vertexColors && !!x.attributes.color && 4 === x.attributes.color.itemSize,
            pointsUvs: !0 === _.isPoints && !!x.attributes.uv && (N || dt),
            fog: !!v,
            useFog: !0 === a.fog,
            fogExp2: !!v && v.isFogExp2,
            flatShading: !0 === a.flatShading,
            sizeAttenuation: !0 === a.sizeAttenuation,
            logarithmicDepthBuffer: h,
            reverseDepthBuffer: L,
            skinning: !0 === _.isSkinnedMesh,
            morphTargets: void 0 !== x.morphAttributes.position,
            morphNormals: void 0 !== x.morphAttributes.normal,
            morphColors: void 0 !== x.morphAttributes.color,
            morphTargetsCount: T,
            morphTextureStride: P,
            numDirLights: o.directional.length,
            numPointLights: o.point.length,
            numSpotLights: o.spot.length,
            numSpotLightMaps: o.spotLightMap.length,
            numRectAreaLights: o.rectArea.length,
            numHemiLights: o.hemi.length,
            numDirLightShadows: o.directionalShadowMap.length,
            numPointLightShadows: o.pointShadowMap.length,
            numSpotLightShadows: o.spotShadowMap.length,
            numSpotLightShadowsWithMaps: o.numSpotLightShadowsWithMaps,
            numLightProbes: o.numLightProbes,
            numClippingPlanes: s.numPlanes,
            numClipIntersection: s.numIntersection,
            dithering: a.dithering,
            shadowMapEnabled: t.shadowMap.enabled && u.length > 0,
            shadowMapType: t.shadowMap.type,
            toneMapping: gt,
            decodeVideoTexture: N && !0 === a.map.isVideoTexture && mp.getTransfer(a.map.colorSpace) === Vd,
            decodeVideoTextureEmissive: G && !0 === a.emissiveMap.isVideoTexture && mp.getTransfer(a.emissiveMap.colorSpace) === Vd,
            premultipliedAlpha: a.premultipliedAlpha,
            doubleSided: 2 === a.side,
            flipSided: 1 === a.side,
            useDepthPacking: a.depthPacking >= 0,
            depthPacking: a.depthPacking || 0,
            index0AttributeName: a.index0AttributeName,
            extensionClipCullDistance: mt && !0 === a.extensions.clipCullDistance && i.has("WEBGL_clip_cull_distance"),
            extensionMultiDraw: (mt && !0 === a.extensions.multiDraw || U) && i.has("WEBGL_multi_draw"),
            rendererExtensionParallelShaderCompile: i.has("KHR_parallel_shader_compile"),
            customProgramCacheKey: a.customProgramCacheKey()
          };
          return _t.vertexUv1s = c.has(1), _t.vertexUv2s = c.has(2), _t.vertexUv3s = c.has(3), c.clear(), _t
        },
        getProgramCacheKey: function(e) {
          const n = [];
          if (e.shaderID ? n.push(e.shaderID) : (n.push(e.customVertexShaderID), n.push(e.customFragmentShaderID)), void 0 !== e.defines)
            for (const t in e.defines) n.push(t), n.push(e.defines[t]);
          return !1 === e.isRawShaderMaterial && (function(t, e) {
            t.push(e.precision), t.push(e.outputColorSpace), t.push(e.envMapMode), t.push(e.envMapCubeUVHeight), t.push(e.mapUv), t.push(e.alphaMapUv), t.push(e.lightMapUv), t.push(e.aoMapUv), t.push(e.bumpMapUv), t.push(e.normalMapUv), t.push(e.displacementMapUv), t.push(e.emissiveMapUv), t.push(e.metalnessMapUv), t.push(e.roughnessMapUv), t.push(e.anisotropyMapUv), t.push(e.clearcoatMapUv), t.push(e.clearcoatNormalMapUv), t.push(e.clearcoatRoughnessMapUv), t.push(e.iridescenceMapUv), t.push(e.iridescenceThicknessMapUv), t.push(e.sheenColorMapUv), t.push(e.sheenRoughnessMapUv), t.push(e.specularMapUv), t.push(e.specularColorMapUv), t.push(e.specularIntensityMapUv), t.push(e.transmissionMapUv), t.push(e.thicknessMapUv), t.push(e.combine), t.push(e.fogExp2), t.push(e.sizeAttenuation), t.push(e.morphTargetsCount), t.push(e.morphAttributeCount), t.push(e.numDirLights), t.push(e.numPointLights), t.push(e.numSpotLights), t.push(e.numSpotLightMaps), t.push(e.numHemiLights), t.push(e.numRectAreaLights), t.push(e.numDirLightShadows), t.push(e.numPointLightShadows), t.push(e.numSpotLightShadows), t.push(e.numSpotLightShadowsWithMaps), t.push(e.numLightProbes), t.push(e.shadowMapType), t.push(e.toneMapping), t.push(e.numClippingPlanes), t.push(e.numClipIntersection), t.push(e.depthPacking)
          }(n, e), function(t, e) {
            o.disableAll(), e.supportsVertexTextures && o.enable(0), e.instancing && o.enable(1), e.instancingColor && o.enable(2), e.instancingMorph && o.enable(3), e.matcap && o.enable(4), e.envMap && o.enable(5), e.normalMapObjectSpace && o.enable(6), e.normalMapTangentSpace && o.enable(7), e.clearcoat && o.enable(8), e.iridescence && o.enable(9), e.alphaTest && o.enable(10), e.vertexColors && o.enable(11), e.vertexAlphas && o.enable(12), e.vertexUv1s && o.enable(13), e.vertexUv2s && o.enable(14), e.vertexUv3s && o.enable(15), e.vertexTangents && o.enable(16), e.anisotropy && o.enable(17), e.alphaHash && o.enable(18), e.batching && o.enable(19), e.dispersion && o.enable(20), e.batchingColor && o.enable(21), t.push(o.mask), o.disableAll(), e.fog && o.enable(0), e.useFog && o.enable(1), e.flatShading && o.enable(2), e.logarithmicDepthBuffer && o.enable(3), e.reverseDepthBuffer && o.enable(4), e.skinning && o.enable(5), e.morphTargets && o.enable(6), e.morphNormals && o.enable(7), e.morphColors && o.enable(8), e.premultipliedAlpha && o.enable(9), e.shadowMapEnabled && o.enable(10), e.doubleSided && o.enable(11), e.flipSided && o.enable(12), e.useDepthPacking && o.enable(13), e.dithering && o.enable(14), e.transmission && o.enable(15), e.sheen && o.enable(16), e.opaque && o.enable(17), e.pointsUvs && o.enable(18), e.decodeVideoTexture && o.enable(19), e.decodeVideoTextureEmissive && o.enable(20), e.alphaToCoverage && o.enable(21), t.push(o.mask)
          }(n, e), n.push(t.outputColorSpace)), n.push(e.customProgramCacheKey), n.join()
        },
        getUniforms: function(t) {
          const e = f[t.type];
          let n;
          if (e) {
            const t = Jm[e];
            n = dm.clone(t.uniforms)
          } else n = t.uniforms;
          return n
        },
        acquireProgram: function(e, n) {
          let i;
          for (let t = 0, e = u.length; t < e; t++) {
            const e = u[t];
            if (e.cacheKey === n) {
              i = e, ++i.usedTimes;
              break
            }
          }
          return void 0 === i && (i = new pv(t, n, e, a), u.push(i)), i
        },
        releaseProgram: function(t) {
          if (0 == --t.usedTimes) {
            const e = u.indexOf(t);
            u[e] = u[u.length - 1], u.pop(), t.destroy()
          }
        },
        releaseShaderCache: function(t) {
          l.remove(t)
        },
        programs: u,
        dispose: function() {
          l.dispose()
        }
      }
    }

    function vv() {
      let t = new WeakMap;
      return {
        has: function(e) {
          return t.has(e)
        },
        get: function(e) {
          let n = t.get(e);
          return void 0 === n && (n = {}, t.set(e, n)), n
        },
        remove: function(e) {
          t.delete(e)
        },
        update: function(e, n, i) {
          t.get(e)[n] = i
        },
        dispose: function() {
          t = new WeakMap
        }
      }
    }

    function xv(t, e) {
      return t.groupOrder !== e.groupOrder ? t.groupOrder - e.groupOrder : t.renderOrder !== e.renderOrder ? t.renderOrder - e.renderOrder : t.material.id !== e.material.id ? t.material.id - e.material.id : t.z !== e.z ? t.z - e.z : t.id - e.id
    }

    function yv(t, e) {
      return t.groupOrder !== e.groupOrder ? t.groupOrder - e.groupOrder : t.renderOrder !== e.renderOrder ? t.renderOrder - e.renderOrder : t.z !== e.z ? e.z - t.z : t.id - e.id
    }

    function bv() {
      const t = [];
      let e = 0;
      const n = [],
        i = [],
        r = [];

      function a(n, i, r, a, s, o) {
        let l = t[e];
        return void 0 === l ? (l = {
          id: n.id,
          object: n,
          geometry: i,
          material: r,
          groupOrder: a,
          renderOrder: n.renderOrder,
          z: s,
          group: o
        }, t[e] = l) : (l.id = n.id, l.object = n, l.geometry = i, l.material = r, l.groupOrder = a, l.renderOrder = n.renderOrder, l.z = s, l.group = o), e++, l
      }
      return {
        opaque: n,
        transmissive: i,
        transparent: r,
        init: function() {
          e = 0, n.length = 0, i.length = 0, r.length = 0
        },
        push: function(t, e, s, o, l, c) {
          const u = a(t, e, s, o, l, c);
          s.transmission > 0 ? i.push(u) : !0 === s.transparent ? r.push(u) : n.push(u)
        },
        unshift: function(t, e, s, o, l, c) {
          const u = a(t, e, s, o, l, c);
          s.transmission > 0 ? i.unshift(u) : !0 === s.transparent ? r.unshift(u) : n.unshift(u)
        },
        finish: function() {
          for (let n = e, i = t.length; n < i; n++) {
            const e = t[n];
            if (null === e.id) break;
            e.id = null, e.object = null, e.geometry = null, e.material = null, e.group = null
          }
        },
        sort: function(t, e) {
          n.length > 1 && n.sort(t || xv), i.length > 1 && i.sort(e || yv), r.length > 1 && r.sort(e || yv)
        }
      }
    }

    function Mv() {
      let t = new WeakMap;
      return {
        get: function(e, n) {
          const i = t.get(e);
          let r;
          return void 0 === i ? (r = new bv, t.set(e, [r])) : n >= i.length ? (r = new bv, i.push(r)) : r = i[n], r
        },
        dispose: function() {
          t = new WeakMap
        }
      }
    }

    function Sv() {
      const t = {};
      return {
        get: function(e) {
          if (void 0 !== t[e.id]) return t[e.id];
          let n;
          switch (e.type) {
            case "DirectionalLight":
              n = {
                direction: new Up,
                color: new Pp
              };
              break;
            case "SpotLight":
              n = {
                position: new Up,
                direction: new Up,
                color: new Pp,
                distance: 0,
                coneCos: 0,
                penumbraCos: 0,
                decay: 0
              };
              break;
            case "PointLight":
              n = {
                position: new Up,
                color: new Pp,
                distance: 0,
                decay: 0
              };
              break;
            case "HemisphereLight":
              n = {
                direction: new Up,
                skyColor: new Pp,
                groundColor: new Pp
              };
              break;
            case "RectAreaLight":
              n = {
                color: new Pp,
                position: new Up,
                halfWidth: new Up,
                halfHeight: new Up
              }
          }
          return t[e.id] = n, n
        }
      }
    }
    let Ev = 0;

    function Tv(t, e) {
      return (e.castShadow ? 2 : 0) - (t.castShadow ? 2 : 0) + (e.map ? 1 : 0) - (t.map ? 1 : 0)
    }

    function wv(t) {
      const e = new Sv,
        n = function() {
          const t = {};
          return {
            get: function(e) {
              if (void 0 !== t[e.id]) return t[e.id];
              let n;
              switch (e.type) {
                case "DirectionalLight":
                case "SpotLight":
                  n = {
                    shadowIntensity: 1,
                    shadowBias: 0,
                    shadowNormalBias: 0,
                    shadowRadius: 1,
                    shadowMapSize: new cp
                  };
                  break;
                case "PointLight":
                  n = {
                    shadowIntensity: 1,
                    shadowBias: 0,
                    shadowNormalBias: 0,
                    shadowRadius: 1,
                    shadowMapSize: new cp,
                    shadowCameraNear: 1,
                    shadowCameraFar: 1e3
                  }
              }
              return t[e.id] = n, n
            }
          }
        }(),
        i = {
          version: 0,
          hash: {
            directionalLength: -1,
            pointLength: -1,
            spotLength: -1,
            rectAreaLength: -1,
            hemiLength: -1,
            numDirectionalShadows: -1,
            numPointShadows: -1,
            numSpotShadows: -1,
            numSpotMaps: -1,
            numLightProbes: -1
          },
          ambient: [0, 0, 0],
          probe: [],
          directional: [],
          directionalShadow: [],
          directionalShadowMap: [],
          directionalShadowMatrix: [],
          spot: [],
          spotLightMap: [],
          spotShadow: [],
          spotShadowMap: [],
          spotLightMatrix: [],
          rectArea: [],
          rectAreaLTC1: null,
          rectAreaLTC2: null,
          point: [],
          pointShadow: [],
          pointShadowMap: [],
          pointShadowMatrix: [],
          hemi: [],
          numSpotLightShadowsWithMaps: 0,
          numLightProbes: 0
        };
      for (let t = 0; t < 9; t++) i.probe.push(new Up);
      const r = new Up,
        a = new Fp,
        s = new Fp;
      return {
        setup: function(r) {
          let a = 0,
            s = 0,
            o = 0;
          for (let t = 0; t < 9; t++) i.probe[t].set(0, 0, 0);
          let l = 0,
            c = 0,
            u = 0,
            h = 0,
            d = 0,
            p = 0,
            f = 0,
            m = 0,
            g = 0,
            _ = 0,
            v = 0;
          r.sort(Tv);
          for (let t = 0, x = r.length; t < x; t++) {
            const x = r[t],
              y = x.color,
              b = x.intensity,
              M = x.distance,
              S = x.shadow && x.shadow.map ? x.shadow.map.texture : null;
            if (x.isAmbientLight) a += y.r * b, s += y.g * b, o += y.b * b;
            else if (x.isLightProbe) {
              for (let t = 0; t < 9; t++) i.probe[t].addScaledVector(x.sh.coefficients[t], b);
              v++
            } else if (x.isDirectionalLight) {
              const t = e.get(x);
              if (t.color.copy(x.color).multiplyScalar(x.intensity), x.castShadow) {
                const t = x.shadow,
                  e = n.get(x);
                e.shadowIntensity = t.intensity, e.shadowBias = t.bias, e.shadowNormalBias = t.normalBias, e.shadowRadius = t.radius, e.shadowMapSize = t.mapSize, i.directionalShadow[l] = e, i.directionalShadowMap[l] = S, i.directionalShadowMatrix[l] = x.shadow.matrix, p++
              }
              i.directional[l] = t, l++
            } else if (x.isSpotLight) {
              const t = e.get(x);
              t.position.setFromMatrixPosition(x.matrixWorld), t.color.copy(y).multiplyScalar(b), t.distance = M, t.coneCos = Math.cos(x.angle), t.penumbraCos = Math.cos(x.angle * (1 - x.penumbra)), t.decay = x.decay, i.spot[u] = t;
              const r = x.shadow;
              if (x.map && (i.spotLightMap[g] = x.map, g++, r.updateMatrices(x), x.castShadow && _++), i.spotLightMatrix[u] = r.matrix, x.castShadow) {
                const t = n.get(x);
                t.shadowIntensity = r.intensity, t.shadowBias = r.bias, t.shadowNormalBias = r.normalBias, t.shadowRadius = r.radius, t.shadowMapSize = r.mapSize, i.spotShadow[u] = t, i.spotShadowMap[u] = S, m++
              }
              u++
            } else if (x.isRectAreaLight) {
              const t = e.get(x);
              t.color.copy(y).multiplyScalar(b), t.halfWidth.set(.5 * x.width, 0, 0), t.halfHeight.set(0, .5 * x.height, 0), i.rectArea[h] = t, h++
            } else if (x.isPointLight) {
              const t = e.get(x);
              if (t.color.copy(x.color).multiplyScalar(x.intensity), t.distance = x.distance, t.decay = x.decay, x.castShadow) {
                const t = x.shadow,
                  e = n.get(x);
                e.shadowIntensity = t.intensity, e.shadowBias = t.bias, e.shadowNormalBias = t.normalBias, e.shadowRadius = t.radius, e.shadowMapSize = t.mapSize, e.shadowCameraNear = t.camera.near, e.shadowCameraFar = t.camera.far, i.pointShadow[c] = e, i.pointShadowMap[c] = S, i.pointShadowMatrix[c] = x.shadow.matrix, f++
              }
              i.point[c] = t, c++
            } else if (x.isHemisphereLight) {
              const t = e.get(x);
              t.skyColor.copy(x.color).multiplyScalar(b), t.groundColor.copy(x.groundColor).multiplyScalar(b), i.hemi[d] = t, d++
            }
          }
          h > 0 && (!0 === t.has("OES_texture_float_linear") ? (i.rectAreaLTC1 = Zm.LTC_FLOAT_1, i.rectAreaLTC2 = Zm.LTC_FLOAT_2) : (i.rectAreaLTC1 = Zm.LTC_HALF_1, i.rectAreaLTC2 = Zm.LTC_HALF_2)), i.ambient[0] = a, i.ambient[1] = s, i.ambient[2] = o;
          const x = i.hash;
          x.directionalLength === l && x.pointLength === c && x.spotLength === u && x.rectAreaLength === h && x.hemiLength === d && x.numDirectionalShadows === p && x.numPointShadows === f && x.numSpotShadows === m && x.numSpotMaps === g && x.numLightProbes === v || (i.directional.length = l, i.spot.length = u, i.rectArea.length = h, i.point.length = c, i.hemi.length = d, i.directionalShadow.length = p, i.directionalShadowMap.length = p, i.pointShadow.length = f, i.pointShadowMap.length = f, i.spotShadow.length = m, i.spotShadowMap.length = m, i.directionalShadowMatrix.length = p, i.pointShadowMatrix.length = f, i.spotLightMatrix.length = m + g - _, i.spotLightMap.length = g, i.numSpotLightShadowsWithMaps = _, i.numLightProbes = v, x.directionalLength = l, x.pointLength = c, x.spotLength = u, x.rectAreaLength = h, x.hemiLength = d, x.numDirectionalShadows = p, x.numPointShadows = f, x.numSpotShadows = m, x.numSpotMaps = g, x.numLightProbes = v, i.version = Ev++)
        },
        setupView: function(t, e) {
          let n = 0,
            o = 0,
            l = 0,
            c = 0,
            u = 0;
          const h = e.matrixWorldInverse;
          for (let e = 0, d = t.length; e < d; e++) {
            const d = t[e];
            if (d.isDirectionalLight) {
              const t = i.directional[n];
              t.direction.setFromMatrixPosition(d.matrixWorld), r.setFromMatrixPosition(d.target.matrixWorld), t.direction.sub(r), t.direction.transformDirection(h), n++
            } else if (d.isSpotLight) {
              const t = i.spot[l];
              t.position.setFromMatrixPosition(d.matrixWorld), t.position.applyMatrix4(h), t.direction.setFromMatrixPosition(d.matrixWorld), r.setFromMatrixPosition(d.target.matrixWorld), t.direction.sub(r), t.direction.transformDirection(h), l++
            } else if (d.isRectAreaLight) {
              const t = i.rectArea[c];
              t.position.setFromMatrixPosition(d.matrixWorld), t.position.applyMatrix4(h), s.identity(), a.copy(d.matrixWorld), a.premultiply(h), s.extractRotation(a), t.halfWidth.set(.5 * d.width, 0, 0), t.halfHeight.set(0, .5 * d.height, 0), t.halfWidth.applyMatrix4(s), t.halfHeight.applyMatrix4(s), c++
            } else if (d.isPointLight) {
              const t = i.point[o];
              t.position.setFromMatrixPosition(d.matrixWorld), t.position.applyMatrix4(h), o++
            } else if (d.isHemisphereLight) {
              const t = i.hemi[u];
              t.direction.setFromMatrixPosition(d.matrixWorld), t.direction.transformDirection(h), u++
            }
          }
        },
        state: i
      }
    }

    function Av(t) {
      const e = new wv(t),
        n = [],
        i = [],
        r = {
          lightsArray: n,
          shadowsArray: i,
          camera: null,
          lights: e,
          transmissionRenderTarget: {}
        };
      return {
        init: function(t) {
          r.camera = t, n.length = 0, i.length = 0
        },
        state: r,
        setupLights: function() {
          e.setup(n)
        },
        setupLightsView: function(t) {
          e.setupView(n, t)
        },
        pushLight: function(t) {
          n.push(t)
        },
        pushShadow: function(t) {
          i.push(t)
        }
      }
    }

    function Rv(t) {
      let e = new WeakMap;
      return {
        get: function(n, i = 0) {
          const r = e.get(n);
          let a;
          return void 0 === r ? (a = new Av(t), e.set(n, [a])) : i >= r.length ? (a = new Av(t), r.push(a)) : a = r[i], a
        },
        dispose: function() {
          e = new WeakMap
        }
      }
    }
    class Cv extends lm {
      constructor(t) {
        super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = 3200, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(t)
      }
      copy(t) {
        return super.copy(t), this.depthPacking = t.depthPacking, this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this.wireframe = t.wireframe, this.wireframeLinewidth = t.wireframeLinewidth, this
      }
    }
    class Pv extends lm {
      constructor(t) {
        super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(t)
      }
      copy(t) {
        return super.copy(t), this.map = t.map, this.alphaMap = t.alphaMap, this.displacementMap = t.displacementMap, this.displacementScale = t.displacementScale, this.displacementBias = t.displacementBias, this
      }
    }

    function Dv(t, e, n) {
      let i = new kf;
      const r = new cp,
        a = new cp,
        s = new Hf,
        o = new Cv({
          depthPacking: 3201
        }),
        l = new Pv,
        c = {},
        u = n.maxTextureSize,
        h = {
          [ah]: 1,
          [sh]: 0,
          [oh]: 2
        },
        d = new pm({
          defines: {
            VSM_SAMPLES: 8
          },
          uniforms: {
            shadow_pass: {
              value: null
            },
            resolution: {
              value: new cp
            },
            radius: {
              value: 4
            }
          },
          vertexShader: "\nvoid main() {\n\n\tgl_Position = vec4( position, 1.0 );\n\n}\n",
          fragmentShader: "\nuniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\n\n#include <packing>\n\nvoid main() {\n\n\tconst float samples = float( VSM_SAMPLES );\n\n\tfloat mean = 0.0;\n\tfloat squared_mean = 0.0;\n\n\tfloat uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );\n\tfloat uvStart = samples <= 1.0 ? 0.0 : - 1.0;\n\tfor ( float i = 0.0; i < samples; i ++ ) {\n\n\t\tfloat uvOffset = uvStart + i * uvStride;\n\n\t\t#ifdef HORIZONTAL_PASS\n\n\t\t\tvec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );\n\t\t\tmean += distribution.x;\n\t\t\tsquared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n\n\t\t#else\n\n\t\t\tfloat depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );\n\t\t\tmean += depth;\n\t\t\tsquared_mean += depth * depth;\n\n\t\t#endif\n\n\t}\n\n\tmean = mean / samples;\n\tsquared_mean = squared_mean / samples;\n\n\tfloat std_dev = sqrt( squared_mean - mean * mean );\n\n\tgl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );\n\n}\n"
        }),
        p = d.clone();
      p.defines.HORIZONTAL_PASS = 1;
      const f = new rm;
      f.setAttribute("position", new qf(new Float32Array([-1, -1, .5, 3, -1, .5, -1, 3, .5]), 3));
      const m = new Ym(f, d),
        g = this;
      this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1;
      let _ = this.type;

      function v(n, i) {
        const a = e.update(m);
        d.defines.VSM_SAMPLES !== n.blurSamples && (d.defines.VSM_SAMPLES = n.blurSamples, p.defines.VSM_SAMPLES = n.blurSamples, d.needsUpdate = !0, p.needsUpdate = !0), null === n.mapPass && (n.mapPass = new lg(r.x, r.y)), d.uniforms.shadow_pass.value = n.map.texture, d.uniforms.resolution.value = n.mapSize, d.uniforms.radius.value = n.radius, t.setRenderTarget(n.mapPass), t.clear(), t.renderBufferDirect(i, null, a, d, m, null), p.uniforms.shadow_pass.value = n.mapPass.texture, p.uniforms.resolution.value = n.mapSize, p.uniforms.radius.value = n.radius, t.setRenderTarget(n.map), t.clear(), t.renderBufferDirect(i, null, a, p, m, null)
      }

      function x(e, n, i, r) {
        let a = null;
        const s = !0 === i.isPointLight ? e.customDistanceMaterial : e.customDepthMaterial;
        if (void 0 !== s) a = s;
        else if (a = !0 === i.isPointLight ? l : o, t.localClippingEnabled && !0 === n.clipShadows && Array.isArray(n.clippingPlanes) && 0 !== n.clippingPlanes.length || n.displacementMap && 0 !== n.displacementScale || n.alphaMap && n.alphaTest > 0 || n.map && n.alphaTest > 0) {
          const t = a.uuid,
            e = n.uuid;
          let i = c[t];
          void 0 === i && (i = {}, c[t] = i);
          let r = i[e];
          void 0 === r && (r = a.clone(), i[e] = r, n.addEventListener("dispose", b)), a = r
        }
        return a.visible = n.visible, a.wireframe = n.wireframe, a.side = 3 === r ? null !== n.shadowSide ? n.shadowSide : n.side : null !== n.shadowSide ? n.shadowSide : h[n.side], a.alphaMap = n.alphaMap, a.alphaTest = n.alphaTest, a.map = n.map, a.clipShadows = n.clipShadows, a.clippingPlanes = n.clippingPlanes, a.clipIntersection = n.clipIntersection, a.displacementMap = n.displacementMap, a.displacementScale = n.displacementScale, a.displacementBias = n.displacementBias, a.wireframeLinewidth = n.wireframeLinewidth, a.linewidth = n.linewidth, !0 === i.isPointLight && !0 === a.isMeshDistanceMaterial && (t.properties.get(a).light = i), a
      }

      function y(n, r, a, s, o) {
        if (!1 === n.visible) return;
        if (n.layers.test(r.layers) && (n.isMesh || n.isLine || n.isPoints) && (n.castShadow || n.receiveShadow && 3 === o) && (!n.frustumCulled || i.intersectsObject(n))) {
          n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse, n.matrixWorld);
          const i = e.update(n),
            l = n.material;
          if (Array.isArray(l)) {
            const e = i.groups;
            for (let c = 0, u = e.length; c < u; c++) {
              const u = e[c],
                h = l[u.materialIndex];
              if (h && h.visible) {
                const e = x(n, h, s, o);
                n.onBeforeShadow(t, n, r, a, i, e, u), t.renderBufferDirect(a, null, i, e, n, u), n.onAfterShadow(t, n, r, a, i, e, u)
              }
            }
          } else if (l.visible) {
            const e = x(n, l, s, o);
            n.onBeforeShadow(t, n, r, a, i, e, null), t.renderBufferDirect(a, null, i, e, n, null), n.onAfterShadow(t, n, r, a, i, e, null)
          }
        }
        const l = n.children;
        for (let t = 0, e = l.length; t < e; t++) y(l[t], r, a, s, o)
      }

      function b(t) {
        t.target.removeEventListener("dispose", b);
        for (const e in c) {
          const n = c[e],
            i = t.target.uuid;
          i in n && (n[i].dispose(), delete n[i])
        }
      }
      this.render = function(e, n, o) {
        if (!1 === g.enabled) return;
        if (!1 === g.autoUpdate && !1 === g.needsUpdate) return;
        if (0 === e.length) return;
        const l = t.getRenderTarget(),
          c = t.getActiveCubeFace(),
          h = t.getActiveMipmapLevel(),
          d = t.state;
        d.setBlending(0), d.buffers.color.setClear(1, 1, 1, 1), d.buffers.depth.setTest(!0), d.setScissorTest(!1);
        const p = 3 !== _ && 3 === this.type,
          f = 3 === _ && 3 !== this.type;
        for (let l = 0, c = e.length; l < c; l++) {
          const c = e[l],
            h = c.shadow;
          if (void 0 === h) {
            console.warn("THREE.WebGLShadowMap:", c, "has no shadow.");
            continue
          }
          if (!1 === h.autoUpdate && !1 === h.needsUpdate) continue;
          r.copy(h.mapSize);
          const m = h.getFrameExtents();
          if (r.multiply(m), a.copy(h.mapSize), (r.x > u || r.y > u) && (r.x > u && (a.x = Math.floor(u / m.x), r.x = a.x * m.x, h.mapSize.x = a.x), r.y > u && (a.y = Math.floor(u / m.y), r.y = a.y * m.y, h.mapSize.y = a.y)), null === h.map || !0 === p || !0 === f) {
            const t = 3 !== this.type ? {
              minFilter: kh,
              magFilter: kh
            } : {};
            null !== h.map && h.map.dispose(), h.map = new lg(r.x, r.y, t), h.map.texture.name = c.name + ".shadowMap", h.camera.updateProjectionMatrix()
          }
          t.setRenderTarget(h.map), t.clear();
          const g = h.getViewportCount();
          for (let t = 0; t < g; t++) {
            const e = h.getViewport(t);
            s.set(a.x * e.x, a.y * e.y, a.x * e.z, a.y * e.w), d.viewport(s), h.updateMatrices(c, t), i = h.getFrustum(), y(n, o, h.camera, c, this.type)
          }!0 !== h.isPointLightShadow && 3 === this.type && v(h, o), h.needsUpdate = !1
        }
        _ = this.type, g.needsUpdate = !1, t.setRenderTarget(l, c, h)
      }
    }
    const Lv = {
      [wh]: 1,
      [Rh]: 6,
      [Ph]: 7,
      [Ch]: 5,
      [Ah]: 0,
      [Lh]: 2,
      [Ih]: 4,
      [Dh]: 3
    };

    function Iv(t, e) {
      const n = new function() {
          let e = !1;
          const n = new Hf;
          let i = null;
          const r = new Hf(0, 0, 0, 0);
          return {
            setMask: function(n) {
              i === n || e || (t.colorMask(n, n, n, n), i = n)
            },
            setLocked: function(t) {
              e = t
            },
            setClear: function(e, i, a, s, o) {
              !0 === o && (e *= s, i *= s, a *= s), n.set(e, i, a, s), !1 === r.equals(n) && (t.clearColor(e, i, a, s), r.copy(n))
            },
            reset: function() {
              e = !1, i = null, r.set(-1, 0, 0, 0)
            }
          }
        },
        i = new function() {
          let n = !1,
            i = !1,
            r = null,
            a = null,
            s = null;
          return {
            setReversed: function(t) {
              if (i !== t) {
                const t = e.get("EXT_clip_control");
                i ? t.clipControlEXT(t.LOWER_LEFT_EXT, t.ZERO_TO_ONE_EXT) : t.clipControlEXT(t.LOWER_LEFT_EXT, t.NEGATIVE_ONE_TO_ONE_EXT);
                const n = s;
                s = null, this.setClear(n)
              }
              i = t
            },
            getReversed: function() {
              return i
            },
            setTest: function(e) {
              e ? k(t.DEPTH_TEST) : H(t.DEPTH_TEST)
            },
            setMask: function(e) {
              r === e || n || (t.depthMask(e), r = e)
            },
            setFunc: function(e) {
              if (i && (e = Lv[e]), a !== e) {
                switch (e) {
                  case 0:
                    t.depthFunc(t.NEVER);
                    break;
                  case 1:
                    t.depthFunc(t.ALWAYS);
                    break;
                  case 2:
                    t.depthFunc(t.LESS);
                    break;
                  case 3:
                  default:
                    t.depthFunc(t.LEQUAL);
                    break;
                  case 4:
                    t.depthFunc(t.EQUAL);
                    break;
                  case 5:
                    t.depthFunc(t.GEQUAL);
                    break;
                  case 6:
                    t.depthFunc(t.GREATER);
                    break;
                  case 7:
                    t.depthFunc(t.NOTEQUAL)
                }
                a = e
              }
            },
            setLocked: function(t) {
              n = t
            },
            setClear: function(e) {
              s !== e && (i && (e = 1 - e), t.clearDepth(e), s = e)
            },
            reset: function() {
              n = !1, r = null, a = null, s = null, i = !1
            }
          }
        },
        r = new function() {
          let e = !1,
            n = null,
            i = null,
            r = null,
            a = null,
            s = null,
            o = null,
            l = null,
            c = null;
          return {
            setTest: function(n) {
              e || (n ? k(t.STENCIL_TEST) : H(t.STENCIL_TEST))
            },
            setMask: function(i) {
              n === i || e || (t.stencilMask(i), n = i)
            },
            setFunc: function(e, n, s) {
              i === e && r === n && a === s || (t.stencilFunc(e, n, s), i = e, r = n, a = s)
            },
            setOp: function(e, n, i) {
              s === e && o === n && l === i || (t.stencilOp(e, n, i), s = e, o = n, l = i)
            },
            setLocked: function(t) {
              e = t
            },
            setClear: function(e) {
              c !== e && (t.clearStencil(e), c = e)
            },
            reset: function() {
              e = !1, n = null, i = null, r = null, a = null, s = null, o = null, l = null, c = null
            }
          }
        },
        a = new WeakMap,
        s = new WeakMap;
      let o = {},
        l = {},
        c = new WeakMap,
        u = [],
        h = null,
        d = !1,
        p = null,
        f = null,
        m = null,
        g = null,
        _ = null,
        v = null,
        x = null,
        y = new Pp(0, 0, 0),
        b = 0,
        M = !1,
        S = null,
        E = null,
        T = null,
        w = null,
        A = null;
      const R = t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
      let C = !1,
        P = 0;
      const D = t.getParameter(t.VERSION); - 1 !== D.indexOf("WebGL") ? (P = parseFloat(/^WebGL (\d)/.exec(D)[1]), C = P >= 1) : -1 !== D.indexOf("OpenGL ES") && (P = parseFloat(/^OpenGL ES (\d)/.exec(D)[1]), C = P >= 2);
      let L = null,
        I = {};
      const U = t.getParameter(t.SCISSOR_BOX),
        N = t.getParameter(t.VIEWPORT),
        O = (new Hf).fromArray(U),
        F = (new Hf).fromArray(N);

      function B(e, n, i, r) {
        const a = new Uint8Array(4),
          s = t.createTexture();
        t.bindTexture(e, s), t.texParameteri(e, t.TEXTURE_MIN_FILTER, t.NEAREST), t.texParameteri(e, t.TEXTURE_MAG_FILTER, t.NEAREST);
        for (let s = 0; s < i; s++) e === t.TEXTURE_3D || e === t.TEXTURE_2D_ARRAY ? t.texImage3D(n, 0, t.RGBA, 1, 1, r, 0, t.RGBA, t.UNSIGNED_BYTE, a) : t.texImage2D(n + s, 0, t.RGBA, 1, 1, 0, t.RGBA, t.UNSIGNED_BYTE, a);
        return s
      }
      const z = {};

      function k(e) {
        !0 !== o[e] && (t.enable(e), o[e] = !0)
      }

      function H(e) {
        !1 !== o[e] && (t.disable(e), o[e] = !1)
      }
      z[t.TEXTURE_2D] = B(t.TEXTURE_2D, t.TEXTURE_2D, 1), z[t.TEXTURE_CUBE_MAP] = B(t.TEXTURE_CUBE_MAP, t.TEXTURE_CUBE_MAP_POSITIVE_X, 6), z[t.TEXTURE_2D_ARRAY] = B(t.TEXTURE_2D_ARRAY, t.TEXTURE_2D_ARRAY, 1, 1), z[t.TEXTURE_3D] = B(t.TEXTURE_3D, t.TEXTURE_3D, 1, 1), n.setClear(0, 0, 0, 1), i.setClear(1), r.setClear(0), k(t.DEPTH_TEST), i.setFunc(3), X(!1), j(1), k(t.CULL_FACE), W(0);
      const V = {
        [lh]: t.FUNC_ADD,
        [ch]: t.FUNC_SUBTRACT,
        [uh]: t.FUNC_REVERSE_SUBTRACT
      };
      V[103] = t.MIN, V[104] = t.MAX;
      const G = {
        [hh]: t.ZERO,
        [dh]: t.ONE,
        [ph]: t.SRC_COLOR,
        [mh]: t.SRC_ALPHA,
        [bh]: t.SRC_ALPHA_SATURATE,
        [xh]: t.DST_COLOR,
        [_h]: t.DST_ALPHA,
        [fh]: t.ONE_MINUS_SRC_COLOR,
        [gh]: t.ONE_MINUS_SRC_ALPHA,
        [yh]: t.ONE_MINUS_DST_COLOR,
        [vh]: t.ONE_MINUS_DST_ALPHA,
        [Mh]: t.CONSTANT_COLOR,
        [Sh]: t.ONE_MINUS_CONSTANT_COLOR,
        [Eh]: t.CONSTANT_ALPHA,
        [Th]: t.ONE_MINUS_CONSTANT_ALPHA
      };

      function W(e, n, i, r, a, s, o, l, c, u) {
        if (0 !== e) {
          if (!1 === d && (k(t.BLEND), d = !0), 5 === e) a = a || n, s = s || i, o = o || r, n === f && a === _ || (t.blendEquationSeparate(V[n], V[a]), f = n, _ = a), i === m && r === g && s === v && o === x || (t.blendFuncSeparate(G[i], G[r], G[s], G[o]), m = i, g = r, v = s, x = o), !1 !== l.equals(y) && c === b || (t.blendColor(l.r, l.g, l.b, c), y.copy(l), b = c), p = e, M = !1;
          else if (e !== p || u !== M) {
            if (f === lh && _ === lh || (t.blendEquation(t.FUNC_ADD), f = lh, _ = lh), u) switch (e) {
              case 1:
                t.blendFuncSeparate(t.ONE, t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE_MINUS_SRC_ALPHA);
                break;
              case 2:
                t.blendFunc(t.ONE, t.ONE);
                break;
              case 3:
                t.blendFuncSeparate(t.ZERO, t.ONE_MINUS_SRC_COLOR, t.ZERO, t.ONE);
                break;
              case 4:
                t.blendFuncSeparate(t.ZERO, t.SRC_COLOR, t.ZERO, t.SRC_ALPHA);
                break;
              default:
                console.error("THREE.WebGLState: Invalid blending: ", e)
            } else switch (e) {
              case 1:
                t.blendFuncSeparate(t.SRC_ALPHA, t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE_MINUS_SRC_ALPHA);
                break;
              case 2:
                t.blendFunc(t.SRC_ALPHA, t.ONE);
                break;
              case 3:
                t.blendFuncSeparate(t.ZERO, t.ONE_MINUS_SRC_COLOR, t.ZERO, t.ONE);
                break;
              case 4:
                t.blendFunc(t.ZERO, t.SRC_COLOR);
                break;
              default:
                console.error("THREE.WebGLState: Invalid blending: ", e)
            }
            m = null, g = null, v = null, x = null, y.set(0, 0, 0), b = 0, p = e, M = u
          }
        } else !0 === d && (H(t.BLEND), d = !1)
      }

      function X(e) {
        S !== e && (e ? t.frontFace(t.CW) : t.frontFace(t.CCW), S = e)
      }

      function j(e) {
        0 !== e ? (k(t.CULL_FACE), e !== E && (1 === e ? t.cullFace(t.BACK) : 2 === e ? t.cullFace(t.FRONT) : t.cullFace(t.FRONT_AND_BACK))) : H(t.CULL_FACE), E = e
      }

      function q(e, n, i) {
        e ? (k(t.POLYGON_OFFSET_FILL), w === n && A === i || (t.polygonOffset(n, i), w = n, A = i)) : H(t.POLYGON_OFFSET_FILL)
      }
      return {
        buffers: {
          color: n,
          depth: i,
          stencil: r
        },
        enable: k,
        disable: H,
        bindFramebuffer: function(e, n) {
          return l[e] !== n && (t.bindFramebuffer(e, n), l[e] = n, e === t.DRAW_FRAMEBUFFER && (l[t.FRAMEBUFFER] = n), e === t.FRAMEBUFFER && (l[t.DRAW_FRAMEBUFFER] = n), !0)
        },
        drawBuffers: function(e, n) {
          let i = u,
            r = !1;
          if (e) {
            i = c.get(n), void 0 === i && (i = [], c.set(n, i));
            const a = e.textures;
            if (i.length !== a.length || i[0] !== t.COLOR_ATTACHMENT0) {
              for (let e = 0, n = a.length; e < n; e++) i[e] = t.COLOR_ATTACHMENT0 + e;
              i.length = a.length, r = !0
            }
          } else i[0] !== t.BACK && (i[0] = t.BACK, r = !0);
          r && t.drawBuffers(i)
        },
        useProgram: function(e) {
          return h !== e && (t.useProgram(e), h = e, !0)
        },
        setBlending: W,
        setMaterial: function(e, a) {
          2 === e.side ? H(t.CULL_FACE) : k(t.CULL_FACE);
          let s = 1 === e.side;
          a && (s = !s), X(s), 1 === e.blending && !1 === e.transparent ? W(0) : W(e.blending, e.blendEquation, e.blendSrc, e.blendDst, e.blendEquationAlpha, e.blendSrcAlpha, e.blendDstAlpha, e.blendColor, e.blendAlpha, e.premultipliedAlpha), i.setFunc(e.depthFunc), i.setTest(e.depthTest), i.setMask(e.depthWrite), n.setMask(e.colorWrite);
          const o = e.stencilWrite;
          r.setTest(o), o && (r.setMask(e.stencilWriteMask), r.setFunc(e.stencilFunc, e.stencilRef, e.stencilFuncMask), r.setOp(e.stencilFail, e.stencilZFail, e.stencilZPass)), q(e.polygonOffset, e.polygonOffsetFactor, e.polygonOffsetUnits), !0 === e.alphaToCoverage ? k(t.SAMPLE_ALPHA_TO_COVERAGE) : H(t.SAMPLE_ALPHA_TO_COVERAGE)
        },
        setFlipSided: X,
        setCullFace: j,
        setLineWidth: function(e) {
          e !== T && (C && t.lineWidth(e), T = e)
        },
        setPolygonOffset: q,
        setScissorTest: function(e) {
          e ? k(t.SCISSOR_TEST) : H(t.SCISSOR_TEST)
        },
        activeTexture: function(e) {
          void 0 === e && (e = t.TEXTURE0 + R - 1), L !== e && (t.activeTexture(e), L = e)
        },
        bindTexture: function(e, n, i) {
          void 0 === i && (i = null === L ? t.TEXTURE0 + R - 1 : L);
          let r = I[i];
          void 0 === r && (r = {
            type: void 0,
            texture: void 0
          }, I[i] = r), r.type === e && r.texture === n || (L !== i && (t.activeTexture(i), L = i), t.bindTexture(e, n || z[e]), r.type = e, r.texture = n)
        },
        unbindTexture: function() {
          const e = I[L];
          void 0 !== e && void 0 !== e.type && (t.bindTexture(e.type, null), e.type = void 0, e.texture = void 0)
        },
        compressedTexImage2D: function() {
          try {
            t.compressedTexImage2D(...arguments)
          } catch (t) {
            console.error("THREE.WebGLState:", t)
          }
        },
        compressedTexImage3D: function() {
          try {
            t.compressedTexImage3D(...arguments)
          } catch (t) {
            console.error("THREE.WebGLState:", t)
          }
        },
        texImage2D: function() {
          try {
            t.texImage2D(...arguments)
          } catch (t) {
            console.error("THREE.WebGLState:", t)
          }
        },
        texImage3D: function() {
          try {
            t.texImage3D(...arguments)
          } catch (t) {
            console.error("THREE.WebGLState:", t)
          }
        },
        updateUBOMapping: function(e, n) {
          let i = s.get(n);
          void 0 === i && (i = new WeakMap, s.set(n, i));
          let r = i.get(e);
          void 0 === r && (r = t.getUniformBlockIndex(n, e.name), i.set(e, r))
        },
        uniformBlockBinding: function(e, n) {
          const i = s.get(n).get(e);
          a.get(n) !== i && (t.uniformBlockBinding(n, i, e.__bindingPointIndex), a.set(n, i))
        },
        texStorage2D: function() {
          try {
            t.texStorage2D(...arguments)
          } catch (t) {
            console.error("THREE.WebGLState:", t)
          }
        },
        texStorage3D: function() {
          try {
            t.texStorage3D(...arguments)
          } catch (t) {
            console.error("THREE.WebGLState:", t)
          }
        },
        texSubImage2D: function() {
          try {
            t.texSubImage2D(...arguments)
          } catch (t) {
            console.error("THREE.WebGLState:", t)
          }
        },
        texSubImage3D: function() {
          try {
            t.texSubImage3D(...arguments)
          } catch (t) {
            console.error("THREE.WebGLState:", t)
          }
        },
        compressedTexSubImage2D: function() {
          try {
            t.compressedTexSubImage2D(...arguments)
          } catch (t) {
            console.error("THREE.WebGLState:", t)
          }
        },
        compressedTexSubImage3D: function() {
          try {
            t.compressedTexSubImage3D(...arguments)
          } catch (t) {
            console.error("THREE.WebGLState:", t)
          }
        },
        scissor: function(e) {
          !1 === O.equals(e) && (t.scissor(e.x, e.y, e.z, e.w), O.copy(e))
        },
        viewport: function(e) {
          !1 === F.equals(e) && (t.viewport(e.x, e.y, e.z, e.w), F.copy(e))
        },
        reset: function() {
          t.disable(t.BLEND), t.disable(t.CULL_FACE), t.disable(t.DEPTH_TEST), t.disable(t.POLYGON_OFFSET_FILL), t.disable(t.SCISSOR_TEST), t.disable(t.STENCIL_TEST), t.disable(t.SAMPLE_ALPHA_TO_COVERAGE), t.blendEquation(t.FUNC_ADD), t.blendFunc(t.ONE, t.ZERO), t.blendFuncSeparate(t.ONE, t.ZERO, t.ONE, t.ZERO), t.blendColor(0, 0, 0, 0), t.colorMask(!0, !0, !0, !0), t.clearColor(0, 0, 0, 0), t.depthMask(!0), t.depthFunc(t.LESS), i.setReversed(!1), t.clearDepth(1), t.stencilMask(4294967295), t.stencilFunc(t.ALWAYS, 0, 4294967295), t.stencilOp(t.KEEP, t.KEEP, t.KEEP), t.clearStencil(0), t.cullFace(t.BACK), t.frontFace(t.CCW), t.polygonOffset(0, 0), t.activeTexture(t.TEXTURE0), t.bindFramebuffer(t.FRAMEBUFFER, null), t.bindFramebuffer(t.DRAW_FRAMEBUFFER, null), t.bindFramebuffer(t.READ_FRAMEBUFFER, null), t.useProgram(null), t.lineWidth(1), t.scissor(0, 0, t.canvas.width, t.canvas.height), t.viewport(0, 0, t.canvas.width, t.canvas.height), o = {}, L = null, I = {}, l = {}, c = new WeakMap, u = [], h = null, d = !1, p = null, f = null, m = null, g = null, _ = null, v = null, x = null, y = new Pp(0, 0, 0), b = 0, M = !1, S = null, E = null, T = null, w = null, A = null, O.set(0, 0, t.canvas.width, t.canvas.height), F.set(0, 0, t.canvas.width, t.canvas.height), n.reset(), i.reset(), r.reset()
        }
      }
    }

    function Uv(t, e, n, i) {
      const r = function(t) {
        switch (t) {
          case jh:
          case 1010:
            return {
              byteLength: 1, components: 1
            };
          case qh:
          case 1011:
          case Zh:
            return {
              byteLength: 2, components: 1
            };
          case Jh:
          case Qh:
            return {
              byteLength: 2, components: 4
            };
          case $h:
          case Yh:
          case Kh:
            return {
              byteLength: 4, components: 1
            };
          case 35902:
            return {
              byteLength: 4, components: 3
            }
        }
        throw new Error(`Unknown texture type ${t}.`)
      }(i);
      switch (n) {
        case 1021:
        case 1024:
          return t * e;
        case 1025:
          return t * e * 2;
        case 1028:
        case rd:
          return t * e / r.components * r.byteLength;
        case 1030:
        case ad:
          return t * e * 2 / r.components * r.byteLength;
        case 1022:
          return t * e * 3 / r.components * r.byteLength;
        case ed:
        case sd:
          return t * e * 4 / r.components * r.byteLength;
        case od:
        case ld:
          return Math.floor((t + 3) / 4) * Math.floor((e + 3) / 4) * 8;
        case cd:
        case ud:
          return Math.floor((t + 3) / 4) * Math.floor((e + 3) / 4) * 16;
        case dd:
        case fd:
          return Math.max(t, 16) * Math.max(e, 8) / 4;
        case hd:
        case pd:
          return Math.max(t, 8) * Math.max(e, 8) / 2;
        case md:
        case gd:
          return Math.floor((t + 3) / 4) * Math.floor((e + 3) / 4) * 8;
        case _d:
        case vd:
          return Math.floor((t + 3) / 4) * Math.floor((e + 3) / 4) * 16;
        case xd:
          return Math.floor((t + 4) / 5) * Math.floor((e + 3) / 4) * 16;
        case yd:
          return Math.floor((t + 4) / 5) * Math.floor((e + 4) / 5) * 16;
        case bd:
          return Math.floor((t + 5) / 6) * Math.floor((e + 4) / 5) * 16;
        case Md:
          return Math.floor((t + 5) / 6) * Math.floor((e + 5) / 6) * 16;
        case Sd:
          return Math.floor((t + 7) / 8) * Math.floor((e + 4) / 5) * 16;
        case Ed:
          return Math.floor((t + 7) / 8) * Math.floor((e + 5) / 6) * 16;
        case Td:
          return Math.floor((t + 7) / 8) * Math.floor((e + 7) / 8) * 16;
        case wd:
          return Math.floor((t + 9) / 10) * Math.floor((e + 4) / 5) * 16;
        case Ad:
          return Math.floor((t + 9) / 10) * Math.floor((e + 5) / 6) * 16;
        case Rd:
          return Math.floor((t + 9) / 10) * Math.floor((e + 7) / 8) * 16;
        case Cd:
          return Math.floor((t + 9) / 10) * Math.floor((e + 9) / 10) * 16;
        case Pd:
          return Math.floor((t + 11) / 12) * Math.floor((e + 9) / 10) * 16;
        case Dd:
          return Math.floor((t + 11) / 12) * Math.floor((e + 11) / 12) * 16;
        case Ld:
        case Id:
        case Ud:
          return Math.ceil(t / 4) * Math.ceil(e / 4) * 16;
        case 36283:
        case Nd:
          return Math.ceil(t / 4) * Math.ceil(e / 4) * 8;
        case Od:
        case Fd:
          return Math.ceil(t / 4) * Math.ceil(e / 4) * 16
      }
      throw new Error(`Unable to determine texture byte length for ${n} format.`)
    }

    function Nv(t, e, n, i, r, a, s) {
      const o = e.has("WEBGL_multisampled_render_to_texture") ? e.get("WEBGL_multisampled_render_to_texture") : null,
        l = "undefined" != typeof navigator && /OculusBrowser/g.test(navigator.userAgent),
        c = new cp,
        u = new WeakMap;
      let h;
      const d = new WeakMap;
      let p = !1;
      try {
        p = "undefined" != typeof OffscreenCanvas && null !== new OffscreenCanvas(1, 1).getContext("2d")
      } catch (t) {}

      function f(t, e) {
        return p ? new OffscreenCanvas(t, e) : Qu("canvas")
      }

      function m(t, e, n) {
        let i = 1;
        const r = H(t);
        if ((r.width > n || r.height > n) && (i = n / Math.max(r.width, r.height)), i < 1) {
          if ("undefined" != typeof HTMLImageElement && t instanceof HTMLImageElement || "undefined" != typeof HTMLCanvasElement && t instanceof HTMLCanvasElement || "undefined" != typeof ImageBitmap && t instanceof ImageBitmap || "undefined" != typeof VideoFrame && t instanceof VideoFrame) {
            const n = Math.floor(i * r.width),
              a = Math.floor(i * r.height);
            void 0 === h && (h = f(n, a));
            const s = e ? f(n, a) : h;
            return s.width = n, s.height = a, s.getContext("2d").drawImage(t, 0, 0, n, a), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + r.width + "x" + r.height + ") to (" + n + "x" + a + ")."), s
          }
          return "data" in t && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + r.width + "x" + r.height + ")."), t
        }
        return t
      }

      function g(t) {
        return t.generateMipmaps
      }

      function _(e) {
        t.generateMipmap(e)
      }

      function v(e) {
        return e.isWebGLCubeRenderTarget ? t.TEXTURE_CUBE_MAP : e.isWebGL3DRenderTarget ? t.TEXTURE_3D : e.isWebGLArrayRenderTarget || e.isCompressedArrayTexture ? t.TEXTURE_2D_ARRAY : t.TEXTURE_2D
      }

      function x(n, i, r, a, s = !1) {
        if (null !== n) {
          if (void 0 !== t[n]) return t[n];
          console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + n + "'")
        }
        let o = i;
        if (i === t.RED && (r === t.FLOAT && (o = t.R32F), r === t.HALF_FLOAT && (o = t.R16F), r === t.UNSIGNED_BYTE && (o = t.R8)), i === t.RED_INTEGER && (r === t.UNSIGNED_BYTE && (o = t.R8UI), r === t.UNSIGNED_SHORT && (o = t.R16UI), r === t.UNSIGNED_INT && (o = t.R32UI), r === t.BYTE && (o = t.R8I), r === t.SHORT && (o = t.R16I), r === t.INT && (o = t.R32I)), i === t.RG && (r === t.FLOAT && (o = t.RG32F), r === t.HALF_FLOAT && (o = t.RG16F), r === t.UNSIGNED_BYTE && (o = t.RG8)), i === t.RG_INTEGER && (r === t.UNSIGNED_BYTE && (o = t.RG8UI), r === t.UNSIGNED_SHORT && (o = t.RG16UI), r === t.UNSIGNED_INT && (o = t.RG32UI), r === t.BYTE && (o = t.RG8I), r === t.SHORT && (o = t.RG16I), r === t.INT && (o = t.RG32I)), i === t.RGB_INTEGER && (r === t.UNSIGNED_BYTE && (o = t.RGB8UI), r === t.UNSIGNED_SHORT && (o = t.RGB16UI), r === t.UNSIGNED_INT && (o = t.RGB32UI), r === t.BYTE && (o = t.RGB8I), r === t.SHORT && (o = t.RGB16I), r === t.INT && (o = t.RGB32I)), i === t.RGBA_INTEGER && (r === t.UNSIGNED_BYTE && (o = t.RGBA8UI), r === t.UNSIGNED_SHORT && (o = t.RGBA16UI), r === t.UNSIGNED_INT && (o = t.RGBA32UI), r === t.BYTE && (o = t.RGBA8I), r === t.SHORT && (o = t.RGBA16I), r === t.INT && (o = t.RGBA32I)), i === t.RGB && r === t.UNSIGNED_INT_5_9_9_9_REV && (o = t.RGB9_E5), i === t.RGBA) {
          const e = s ? Hd : mp.getTransfer(a);
          r === t.FLOAT && (o = t.RGBA32F), r === t.HALF_FLOAT && (o = t.RGBA16F), r === t.UNSIGNED_BYTE && (o = e === Vd ? t.SRGB8_ALPHA8 : t.RGBA8), r === t.UNSIGNED_SHORT_4_4_4_4 && (o = t.RGBA4), r === t.UNSIGNED_SHORT_5_5_5_1 && (o = t.RGB5_A1)
        }
        return o !== t.R16F && o !== t.R32F && o !== t.RG16F && o !== t.RG32F && o !== t.RGBA16F && o !== t.RGBA32F || e.get("EXT_color_buffer_float"), o
      }

      function y(e, n) {
        let i;
        return e ? null === n || n === $h || n === td ? i = t.DEPTH24_STENCIL8 : n === Kh ? i = t.DEPTH32F_STENCIL8 : n === qh && (i = t.DEPTH24_STENCIL8, console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : null === n || n === $h || n === td ? i = t.DEPTH_COMPONENT24 : n === Kh ? i = t.DEPTH_COMPONENT32F : n === qh && (i = t.DEPTH_COMPONENT16), i
      }

      function b(t, e) {
        return !0 === g(t) || t.isFramebufferTexture && t.minFilter !== kh && t.minFilter !== Gh ? Math.log2(Math.max(e.width, e.height)) + 1 : void 0 !== t.mipmaps && t.mipmaps.length > 0 ? t.mipmaps.length : t.isCompressedTexture && Array.isArray(t.image) ? e.mipmaps.length : 1
      }

      function M(t) {
        const e = t.target;
        e.removeEventListener("dispose", M),
          function(t) {
            const e = i.get(t);
            if (void 0 === e.__webglInit) return;
            const n = t.source,
              r = d.get(n);
            if (r) {
              const i = r[e.__cacheKey];
              i.usedTimes--, 0 === i.usedTimes && E(t), 0 === Object.keys(r).length && d.delete(n)
            }
            i.remove(t)
          }(e), e.isVideoTexture && u.delete(e)
      }

      function S(e) {
        const n = e.target;
        n.removeEventListener("dispose", S),
          function(e) {
            const n = i.get(e);
            if (e.depthTexture && (e.depthTexture.dispose(), i.remove(e.depthTexture)), e.isWebGLCubeRenderTarget)
              for (let e = 0; e < 6; e++) {
                if (Array.isArray(n.__webglFramebuffer[e]))
                  for (let i = 0; i < n.__webglFramebuffer[e].length; i++) t.deleteFramebuffer(n.__webglFramebuffer[e][i]);
                else t.deleteFramebuffer(n.__webglFramebuffer[e]);
                n.__webglDepthbuffer && t.deleteRenderbuffer(n.__webglDepthbuffer[e])
              } else {
                if (Array.isArray(n.__webglFramebuffer))
                  for (let e = 0; e < n.__webglFramebuffer.length; e++) t.deleteFramebuffer(n.__webglFramebuffer[e]);
                else t.deleteFramebuffer(n.__webglFramebuffer);
                if (n.__webglDepthbuffer && t.deleteRenderbuffer(n.__webglDepthbuffer), n.__webglMultisampledFramebuffer && t.deleteFramebuffer(n.__webglMultisampledFramebuffer), n.__webglColorRenderbuffer)
                  for (let e = 0; e < n.__webglColorRenderbuffer.length; e++) n.__webglColorRenderbuffer[e] && t.deleteRenderbuffer(n.__webglColorRenderbuffer[e]);
                n.__webglDepthRenderbuffer && t.deleteRenderbuffer(n.__webglDepthRenderbuffer)
              }
            const r = e.textures;
            for (let e = 0, n = r.length; e < n; e++) {
              const n = i.get(r[e]);
              n.__webglTexture && (t.deleteTexture(n.__webglTexture), s.memory.textures--), i.remove(r[e])
            }
            i.remove(e)
          }(n)
      }

      function E(e) {
        const n = i.get(e);
        t.deleteTexture(n.__webglTexture);
        const r = e.source;
        delete d.get(r)[n.__cacheKey], s.memory.textures--
      }
      let T = 0;

      function w(e, r) {
        const a = i.get(e);
        if (e.isVideoTexture && function(t) {
            const e = s.render.frame;
            u.get(t) !== e && (u.set(t, e), t.update())
          }(e), !1 === e.isRenderTargetTexture && e.version > 0 && a.__version !== e.version) {
          const t = e.image;
          if (null === t) console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
          else {
            if (!1 !== t.complete) return void L(a, e, r);
            console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")
          }
        }
        n.bindTexture(t.TEXTURE_2D, a.__webglTexture, t.TEXTURE0 + r)
      }
      const A = {
          [Fh]: t.REPEAT,
          [Bh]: t.CLAMP_TO_EDGE,
          [zh]: t.MIRRORED_REPEAT
        },
        R = {
          [kh]: t.NEAREST,
          [Hh]: t.NEAREST_MIPMAP_NEAREST,
          [Vh]: t.NEAREST_MIPMAP_LINEAR,
          [Gh]: t.LINEAR,
          [Wh]: t.LINEAR_MIPMAP_NEAREST,
          [Xh]: t.LINEAR_MIPMAP_LINEAR
        },
        C = {
          [Wd]: t.NEVER,
          [Zd]: t.ALWAYS,
          [Xd]: t.LESS,
          [qd]: t.LEQUAL,
          [jd]: t.EQUAL,
          [Kd]: t.GEQUAL,
          [Yd]: t.GREATER,
          [$d]: t.NOTEQUAL
        };

      function P(n, a) {
        if (a.type !== Kh || !1 !== e.has("OES_texture_float_linear") || a.magFilter !== Gh && a.magFilter !== Wh && a.magFilter !== Vh && a.magFilter !== Xh && a.minFilter !== Gh && a.minFilter !== Wh && a.minFilter !== Vh && a.minFilter !== Xh || console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), t.texParameteri(n, t.TEXTURE_WRAP_S, A[a.wrapS]), t.texParameteri(n, t.TEXTURE_WRAP_T, A[a.wrapT]), n !== t.TEXTURE_3D && n !== t.TEXTURE_2D_ARRAY || t.texParameteri(n, t.TEXTURE_WRAP_R, A[a.wrapR]), t.texParameteri(n, t.TEXTURE_MAG_FILTER, R[a.magFilter]), t.texParameteri(n, t.TEXTURE_MIN_FILTER, R[a.minFilter]), a.compareFunction && (t.texParameteri(n, t.TEXTURE_COMPARE_MODE, t.COMPARE_REF_TO_TEXTURE), t.texParameteri(n, t.TEXTURE_COMPARE_FUNC, C[a.compareFunction])), !0 === e.has("EXT_texture_filter_anisotropic")) {
          if (a.magFilter === kh) return;
          if (a.minFilter !== Vh && a.minFilter !== Xh) return;
          if (a.type === Kh && !1 === e.has("OES_texture_float_linear")) return;
          if (a.anisotropy > 1 || i.get(a).__currentAnisotropy) {
            const s = e.get("EXT_texture_filter_anisotropic");
            t.texParameterf(n, s.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(a.anisotropy, r.getMaxAnisotropy())), i.get(a).__currentAnisotropy = a.anisotropy
          }
        }
      }

      function D(e, n) {
        let i = !1;
        void 0 === e.__webglInit && (e.__webglInit = !0, n.addEventListener("dispose", M));
        const r = n.source;
        let a = d.get(r);
        void 0 === a && (a = {}, d.set(r, a));
        const o = function(t) {
          const e = [];
          return e.push(t.wrapS), e.push(t.wrapT), e.push(t.wrapR || 0), e.push(t.magFilter), e.push(t.minFilter), e.push(t.anisotropy), e.push(t.internalFormat), e.push(t.format), e.push(t.type), e.push(t.generateMipmaps), e.push(t.premultiplyAlpha), e.push(t.flipY), e.push(t.unpackAlignment), e.push(t.colorSpace), e.join()
        }(n);
        if (o !== e.__cacheKey) {
          void 0 === a[o] && (a[o] = {
            texture: t.createTexture(),
            usedTimes: 0
          }, s.memory.textures++, i = !0), a[o].usedTimes++;
          const r = a[e.__cacheKey];
          void 0 !== r && (a[e.__cacheKey].usedTimes--, 0 === r.usedTimes && E(n)), e.__cacheKey = o, e.__webglTexture = a[o].texture
        }
        return i
      }

      function L(e, s, o) {
        let l = t.TEXTURE_2D;
        (s.isDataArrayTexture || s.isCompressedArrayTexture) && (l = t.TEXTURE_2D_ARRAY), s.isData3DTexture && (l = t.TEXTURE_3D);
        const c = D(e, s),
          u = s.source;
        n.bindTexture(l, e.__webglTexture, t.TEXTURE0 + o);
        const h = i.get(u);
        if (u.version !== h.__version || !0 === c) {
          n.activeTexture(t.TEXTURE0 + o);
          const e = mp.getPrimaries(mp.workingColorSpace),
            i = s.colorSpace === Bd ? null : mp.getPrimaries(s.colorSpace),
            d = s.colorSpace === Bd || e === i ? t.NONE : t.BROWSER_DEFAULT_WEBGL;
          t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, s.flipY), t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, s.premultiplyAlpha), t.pixelStorei(t.UNPACK_ALIGNMENT, s.unpackAlignment), t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL, d);
          let p = m(s.image, !1, r.maxTextureSize);
          p = k(s, p);
          const f = a.convert(s.format, s.colorSpace),
            v = a.convert(s.type);
          let M, S = x(s.internalFormat, f, v, s.colorSpace, s.isVideoTexture);
          P(l, s);
          const E = s.mipmaps,
            T = !0 !== s.isVideoTexture,
            w = void 0 === h.__version || !0 === c,
            A = u.dataReady,
            R = b(s, p);
          if (s.isDepthTexture) S = y(s.format === id, s.type), w && (T ? n.texStorage2D(t.TEXTURE_2D, 1, S, p.width, p.height) : n.texImage2D(t.TEXTURE_2D, 0, S, p.width, p.height, 0, f, v, null));
          else if (s.isDataTexture)
            if (E.length > 0) {
              T && w && n.texStorage2D(t.TEXTURE_2D, R, S, E[0].width, E[0].height);
              for (let e = 0, i = E.length; e < i; e++) M = E[e], T ? A && n.texSubImage2D(t.TEXTURE_2D, e, 0, 0, M.width, M.height, f, v, M.data) : n.texImage2D(t.TEXTURE_2D, e, S, M.width, M.height, 0, f, v, M.data);
              s.generateMipmaps = !1
            } else T ? (w && n.texStorage2D(t.TEXTURE_2D, R, S, p.width, p.height), A && n.texSubImage2D(t.TEXTURE_2D, 0, 0, 0, p.width, p.height, f, v, p.data)) : n.texImage2D(t.TEXTURE_2D, 0, S, p.width, p.height, 0, f, v, p.data);
          else if (s.isCompressedTexture)
            if (s.isCompressedArrayTexture) {
              T && w && n.texStorage3D(t.TEXTURE_2D_ARRAY, R, S, E[0].width, E[0].height, p.depth);
              for (let e = 0, i = E.length; e < i; e++)
                if (M = E[e], s.format !== ed)
                  if (null !== f)
                    if (T) {
                      if (A)
                        if (s.layerUpdates.size > 0) {
                          const i = Uv(M.width, M.height, s.format, s.type);
                          for (const r of s.layerUpdates) {
                            const a = M.data.subarray(r * i / M.data.BYTES_PER_ELEMENT, (r + 1) * i / M.data.BYTES_PER_ELEMENT);
                            n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY, e, 0, 0, r, M.width, M.height, 1, f, a)
                          }
                          s.clearLayerUpdates()
                        } else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY, e, 0, 0, 0, M.width, M.height, p.depth, f, M.data)
                    } else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY, e, S, M.width, M.height, p.depth, 0, M.data, 0, 0);
              else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
              else T ? A && n.texSubImage3D(t.TEXTURE_2D_ARRAY, e, 0, 0, 0, M.width, M.height, p.depth, f, v, M.data) : n.texImage3D(t.TEXTURE_2D_ARRAY, e, S, M.width, M.height, p.depth, 0, f, v, M.data)
            } else {
              T && w && n.texStorage2D(t.TEXTURE_2D, R, S, E[0].width, E[0].height);
              for (let e = 0, i = E.length; e < i; e++) M = E[e], s.format !== ed ? null !== f ? T ? A && n.compressedTexSubImage2D(t.TEXTURE_2D, e, 0, 0, M.width, M.height, f, M.data) : n.compressedTexImage2D(t.TEXTURE_2D, e, S, M.width, M.height, 0, M.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : T ? A && n.texSubImage2D(t.TEXTURE_2D, e, 0, 0, M.width, M.height, f, v, M.data) : n.texImage2D(t.TEXTURE_2D, e, S, M.width, M.height, 0, f, v, M.data)
            }
          else if (s.isDataArrayTexture)
            if (T) {
              if (w && n.texStorage3D(t.TEXTURE_2D_ARRAY, R, S, p.width, p.height, p.depth), A)
                if (s.layerUpdates.size > 0) {
                  const e = Uv(p.width, p.height, s.format, s.type);
                  for (const i of s.layerUpdates) {
                    const r = p.data.subarray(i * e / p.data.BYTES_PER_ELEMENT, (i + 1) * e / p.data.BYTES_PER_ELEMENT);
                    n.texSubImage3D(t.TEXTURE_2D_ARRAY, 0, 0, 0, i, p.width, p.height, 1, f, v, r)
                  }
                  s.clearLayerUpdates()
                } else n.texSubImage3D(t.TEXTURE_2D_ARRAY, 0, 0, 0, 0, p.width, p.height, p.depth, f, v, p.data)
            } else n.texImage3D(t.TEXTURE_2D_ARRAY, 0, S, p.width, p.height, p.depth, 0, f, v, p.data);
          else if (s.isData3DTexture) T ? (w && n.texStorage3D(t.TEXTURE_3D, R, S, p.width, p.height, p.depth), A && n.texSubImage3D(t.TEXTURE_3D, 0, 0, 0, 0, p.width, p.height, p.depth, f, v, p.data)) : n.texImage3D(t.TEXTURE_3D, 0, S, p.width, p.height, p.depth, 0, f, v, p.data);
          else if (s.isFramebufferTexture) {
            if (w)
              if (T) n.texStorage2D(t.TEXTURE_2D, R, S, p.width, p.height);
              else {
                let e = p.width,
                  i = p.height;
                for (let r = 0; r < R; r++) n.texImage2D(t.TEXTURE_2D, r, S, e, i, 0, f, v, null), e >>= 1, i >>= 1
              }
          } else if (E.length > 0) {
            if (T && w) {
              const e = H(E[0]);
              n.texStorage2D(t.TEXTURE_2D, R, S, e.width, e.height)
            }
            for (let e = 0, i = E.length; e < i; e++) M = E[e], T ? A && n.texSubImage2D(t.TEXTURE_2D, e, 0, 0, f, v, M) : n.texImage2D(t.TEXTURE_2D, e, S, f, v, M);
            s.generateMipmaps = !1
          } else if (T) {
            if (w) {
              const e = H(p);
              n.texStorage2D(t.TEXTURE_2D, R, S, e.width, e.height)
            }
            A && n.texSubImage2D(t.TEXTURE_2D, 0, 0, 0, f, v, p)
          } else n.texImage2D(t.TEXTURE_2D, 0, S, f, v, p);
          g(s) && _(l), h.__version = u.version, s.onUpdate && s.onUpdate(s)
        }
        e.__version = s.version
      }

      function I(e, r, s, l, c, u) {
        const h = a.convert(s.format, s.colorSpace),
          d = a.convert(s.type),
          p = x(s.internalFormat, h, d, s.colorSpace),
          f = i.get(r),
          m = i.get(s);
        if (m.__renderTarget = r, !f.__hasExternalTextures) {
          const e = Math.max(1, r.width >> u),
            i = Math.max(1, r.height >> u);
          c === t.TEXTURE_3D || c === t.TEXTURE_2D_ARRAY ? n.texImage3D(c, u, p, e, i, r.depth, 0, h, d, null) : n.texImage2D(c, u, p, e, i, 0, h, d, null)
        }
        n.bindFramebuffer(t.FRAMEBUFFER, e), z(r) ? o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER, l, c, m.__webglTexture, 0, B(r)) : (c === t.TEXTURE_2D || c >= t.TEXTURE_CUBE_MAP_POSITIVE_X && c <= t.TEXTURE_CUBE_MAP_NEGATIVE_Z) && t.framebufferTexture2D(t.FRAMEBUFFER, l, c, m.__webglTexture, u), n.bindFramebuffer(t.FRAMEBUFFER, null)
      }

      function U(e, n, i) {
        if (t.bindRenderbuffer(t.RENDERBUFFER, e), n.depthBuffer) {
          const r = n.depthTexture,
            a = r && r.isDepthTexture ? r.type : null,
            s = y(n.stencilBuffer, a),
            l = n.stencilBuffer ? t.DEPTH_STENCIL_ATTACHMENT : t.DEPTH_ATTACHMENT,
            c = B(n);
          z(n) ? o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER, c, s, n.width, n.height) : i ? t.renderbufferStorageMultisample(t.RENDERBUFFER, c, s, n.width, n.height) : t.renderbufferStorage(t.RENDERBUFFER, s, n.width, n.height), t.framebufferRenderbuffer(t.FRAMEBUFFER, l, t.RENDERBUFFER, e)
        } else {
          const e = n.textures;
          for (let r = 0; r < e.length; r++) {
            const s = e[r],
              l = a.convert(s.format, s.colorSpace),
              c = a.convert(s.type),
              u = x(s.internalFormat, l, c, s.colorSpace),
              h = B(n);
            i && !1 === z(n) ? t.renderbufferStorageMultisample(t.RENDERBUFFER, h, u, n.width, n.height) : z(n) ? o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER, h, u, n.width, n.height) : t.renderbufferStorage(t.RENDERBUFFER, u, n.width, n.height)
          }
        }
        t.bindRenderbuffer(t.RENDERBUFFER, null)
      }

      function N(e) {
        const r = i.get(e),
          a = !0 === e.isWebGLCubeRenderTarget;
        if (r.__boundDepthTexture !== e.depthTexture) {
          const t = e.depthTexture;
          if (r.__depthDisposeCallback && r.__depthDisposeCallback(), t) {
            const e = () => {
              delete r.__boundDepthTexture, delete r.__depthDisposeCallback, t.removeEventListener("dispose", e)
            };
            t.addEventListener("dispose", e), r.__depthDisposeCallback = e
          }
          r.__boundDepthTexture = t
        }
        if (e.depthTexture && !r.__autoAllocateDepthBuffer) {
          if (a) throw new Error("target.depthTexture not supported in Cube render targets");
          ! function(e, r) {
            if (r && r.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
            if (n.bindFramebuffer(t.FRAMEBUFFER, e), !r.depthTexture || !r.depthTexture.isDepthTexture) throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
            const a = i.get(r.depthTexture);
            a.__renderTarget = r, a.__webglTexture && r.depthTexture.image.width === r.width && r.depthTexture.image.height === r.height || (r.depthTexture.image.width = r.width, r.depthTexture.image.height = r.height, r.depthTexture.needsUpdate = !0), w(r.depthTexture, 0);
            const s = a.__webglTexture,
              l = B(r);
            if (r.depthTexture.format === nd) z(r) ? o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.TEXTURE_2D, s, 0, l) : t.framebufferTexture2D(t.FRAMEBUFFER, t.DEPTH_ATTACHMENT, t.TEXTURE_2D, s, 0);
            else {
              if (r.depthTexture.format !== id) throw new Error("Unknown depthTexture format");
              z(r) ? o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER, t.DEPTH_STENCIL_ATTACHMENT, t.TEXTURE_2D, s, 0, l) : t.framebufferTexture2D(t.FRAMEBUFFER, t.DEPTH_STENCIL_ATTACHMENT, t.TEXTURE_2D, s, 0)
            }
          }(r.__webglFramebuffer, e)
        } else if (a) {
          r.__webglDepthbuffer = [];
          for (let i = 0; i < 6; i++)
            if (n.bindFramebuffer(t.FRAMEBUFFER, r.__webglFramebuffer[i]), void 0 === r.__webglDepthbuffer[i]) r.__webglDepthbuffer[i] = t.createRenderbuffer(), U(r.__webglDepthbuffer[i], e, !1);
            else {
              const n = e.stencilBuffer ? t.DEPTH_STENCIL_ATTACHMENT : t.DEPTH_ATTACHMENT,
                a = r.__webglDepthbuffer[i];
              t.bindRenderbuffer(t.RENDERBUFFER, a), t.framebufferRenderbuffer(t.FRAMEBUFFER, n, t.RENDERBUFFER, a)
            }
        } else if (n.bindFramebuffer(t.FRAMEBUFFER, r.__webglFramebuffer), void 0 === r.__webglDepthbuffer) r.__webglDepthbuffer = t.createRenderbuffer(), U(r.__webglDepthbuffer, e, !1);
        else {
          const n = e.stencilBuffer ? t.DEPTH_STENCIL_ATTACHMENT : t.DEPTH_ATTACHMENT,
            i = r.__webglDepthbuffer;
          t.bindRenderbuffer(t.RENDERBUFFER, i), t.framebufferRenderbuffer(t.FRAMEBUFFER, n, t.RENDERBUFFER, i)
        }
        n.bindFramebuffer(t.FRAMEBUFFER, null)
      }
      const O = [],
        F = [];

      function B(t) {
        return Math.min(r.maxSamples, t.samples)
      }

      function z(t) {
        const n = i.get(t);
        return t.samples > 0 && !0 === e.has("WEBGL_multisampled_render_to_texture") && !1 !== n.__useRenderToTexture
      }

      function k(t, e) {
        const n = t.colorSpace,
          i = t.format,
          r = t.type;
        return !0 === t.isCompressedTexture || !0 === t.isVideoTexture || n !== kd && n !== Bd && (mp.getTransfer(n) === Vd ? i === ed && r === jh || console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture color space:", n)), e
      }

      function H(t) {
        return "undefined" != typeof HTMLImageElement && t instanceof HTMLImageElement ? (c.width = t.naturalWidth || t.width, c.height = t.naturalHeight || t.height) : "undefined" != typeof VideoFrame && t instanceof VideoFrame ? (c.width = t.displayWidth, c.height = t.displayHeight) : (c.width = t.width, c.height = t.height), c
      }
      this.allocateTextureUnit = function() {
        const t = T;
        return t >= r.maxTextures && console.warn("THREE.WebGLTextures: Trying to use " + t + " texture units while this GPU supports only " + r.maxTextures), T += 1, t
      }, this.resetTextureUnits = function() {
        T = 0
      }, this.setTexture2D = w, this.setTexture2DArray = function(e, r) {
        const a = i.get(e);
        e.version > 0 && a.__version !== e.version ? L(a, e, r) : n.bindTexture(t.TEXTURE_2D_ARRAY, a.__webglTexture, t.TEXTURE0 + r)
      }, this.setTexture3D = function(e, r) {
        const a = i.get(e);
        e.version > 0 && a.__version !== e.version ? L(a, e, r) : n.bindTexture(t.TEXTURE_3D, a.__webglTexture, t.TEXTURE0 + r)
      }, this.setTextureCube = function(e, s) {
        const o = i.get(e);
        e.version > 0 && o.__version !== e.version ? function(e, s, o) {
          if (6 !== s.image.length) return;
          const l = D(e, s),
            c = s.source;
          n.bindTexture(t.TEXTURE_CUBE_MAP, e.__webglTexture, t.TEXTURE0 + o);
          const u = i.get(c);
          if (c.version !== u.__version || !0 === l) {
            n.activeTexture(t.TEXTURE0 + o);
            const e = mp.getPrimaries(mp.workingColorSpace),
              i = s.colorSpace === Bd ? null : mp.getPrimaries(s.colorSpace),
              h = s.colorSpace === Bd || e === i ? t.NONE : t.BROWSER_DEFAULT_WEBGL;
            t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL, s.flipY), t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL, s.premultiplyAlpha), t.pixelStorei(t.UNPACK_ALIGNMENT, s.unpackAlignment), t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL, h);
            const d = s.isCompressedTexture || s.image[0].isCompressedTexture,
              p = s.image[0] && s.image[0].isDataTexture,
              f = [];
            for (let t = 0; t < 6; t++) f[t] = d || p ? p ? s.image[t].image : s.image[t] : m(s.image[t], !0, r.maxCubemapSize), f[t] = k(s, f[t]);
            const v = f[0],
              y = a.convert(s.format, s.colorSpace),
              M = a.convert(s.type),
              S = x(s.internalFormat, y, M, s.colorSpace),
              E = !0 !== s.isVideoTexture,
              T = void 0 === u.__version || !0 === l,
              w = c.dataReady;
            let A, R = b(s, v);
            if (P(t.TEXTURE_CUBE_MAP, s), d) {
              E && T && n.texStorage2D(t.TEXTURE_CUBE_MAP, R, S, v.width, v.height);
              for (let e = 0; e < 6; e++) {
                A = f[e].mipmaps;
                for (let i = 0; i < A.length; i++) {
                  const r = A[i];
                  s.format !== ed ? null !== y ? E ? w && n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + e, i, 0, 0, r.width, r.height, y, r.data) : n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + e, i, S, r.width, r.height, 0, r.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : E ? w && n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + e, i, 0, 0, r.width, r.height, y, M, r.data) : n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + e, i, S, r.width, r.height, 0, y, M, r.data)
                }
              }
            } else {
              if (A = s.mipmaps, E && T) {
                A.length > 0 && R++;
                const e = H(f[0]);
                n.texStorage2D(t.TEXTURE_CUBE_MAP, R, S, e.width, e.height)
              }
              for (let e = 0; e < 6; e++)
                if (p) {
                  E ? w && n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + e, 0, 0, 0, f[e].width, f[e].height, y, M, f[e].data) : n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + e, 0, S, f[e].width, f[e].height, 0, y, M, f[e].data);
                  for (let i = 0; i < A.length; i++) {
                    const r = A[i].image[e].image;
                    E ? w && n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + e, i + 1, 0, 0, r.width, r.height, y, M, r.data) : n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + e, i + 1, S, r.width, r.height, 0, y, M, r.data)
                  }
                } else {
                  E ? w && n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + e, 0, 0, 0, y, M, f[e]) : n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + e, 0, S, y, M, f[e]);
                  for (let i = 0; i < A.length; i++) {
                    const r = A[i];
                    E ? w && n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + e, i + 1, 0, 0, y, M, r.image[e]) : n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X + e, i + 1, S, y, M, r.image[e])
                  }
                }
            }
            g(s) && _(t.TEXTURE_CUBE_MAP), u.__version = c.version, s.onUpdate && s.onUpdate(s)
          }
          e.__version = s.version
        }(o, e, s) : n.bindTexture(t.TEXTURE_CUBE_MAP, o.__webglTexture, t.TEXTURE0 + s)
      }, this.rebindTextures = function(e, n, r) {
        const a = i.get(e);
        void 0 !== n && I(a.__webglFramebuffer, e, e.texture, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, 0), void 0 !== r && N(e)
      }, this.setupRenderTarget = function(e) {
        const r = e.texture,
          o = i.get(e),
          l = i.get(r);
        e.addEventListener("dispose", S);
        const c = e.textures,
          u = !0 === e.isWebGLCubeRenderTarget,
          h = c.length > 1;
        if (h || (void 0 === l.__webglTexture && (l.__webglTexture = t.createTexture()), l.__version = r.version, s.memory.textures++), u) {
          o.__webglFramebuffer = [];
          for (let e = 0; e < 6; e++)
            if (r.mipmaps && r.mipmaps.length > 0) {
              o.__webglFramebuffer[e] = [];
              for (let n = 0; n < r.mipmaps.length; n++) o.__webglFramebuffer[e][n] = t.createFramebuffer()
            } else o.__webglFramebuffer[e] = t.createFramebuffer()
        } else {
          if (r.mipmaps && r.mipmaps.length > 0) {
            o.__webglFramebuffer = [];
            for (let e = 0; e < r.mipmaps.length; e++) o.__webglFramebuffer[e] = t.createFramebuffer()
          } else o.__webglFramebuffer = t.createFramebuffer();
          if (h)
            for (let e = 0, n = c.length; e < n; e++) {
              const n = i.get(c[e]);
              void 0 === n.__webglTexture && (n.__webglTexture = t.createTexture(), s.memory.textures++)
            }
          if (e.samples > 0 && !1 === z(e)) {
            o.__webglMultisampledFramebuffer = t.createFramebuffer(), o.__webglColorRenderbuffer = [], n.bindFramebuffer(t.FRAMEBUFFER, o.__webglMultisampledFramebuffer);
            for (let n = 0; n < c.length; n++) {
              const i = c[n];
              o.__webglColorRenderbuffer[n] = t.createRenderbuffer(), t.bindRenderbuffer(t.RENDERBUFFER, o.__webglColorRenderbuffer[n]);
              const r = a.convert(i.format, i.colorSpace),
                s = a.convert(i.type),
                l = x(i.internalFormat, r, s, i.colorSpace, !0 === e.isXRRenderTarget),
                u = B(e);
              t.renderbufferStorageMultisample(t.RENDERBUFFER, u, l, e.width, e.height), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0 + n, t.RENDERBUFFER, o.__webglColorRenderbuffer[n])
            }
            t.bindRenderbuffer(t.RENDERBUFFER, null), e.depthBuffer && (o.__webglDepthRenderbuffer = t.createRenderbuffer(), U(o.__webglDepthRenderbuffer, e, !0)), n.bindFramebuffer(t.FRAMEBUFFER, null)
          }
        }
        if (u) {
          n.bindTexture(t.TEXTURE_CUBE_MAP, l.__webglTexture), P(t.TEXTURE_CUBE_MAP, r);
          for (let n = 0; n < 6; n++)
            if (r.mipmaps && r.mipmaps.length > 0)
              for (let i = 0; i < r.mipmaps.length; i++) I(o.__webglFramebuffer[n][i], e, r, t.COLOR_ATTACHMENT0, t.TEXTURE_CUBE_MAP_POSITIVE_X + n, i);
            else I(o.__webglFramebuffer[n], e, r, t.COLOR_ATTACHMENT0, t.TEXTURE_CUBE_MAP_POSITIVE_X + n, 0);
          g(r) && _(t.TEXTURE_CUBE_MAP), n.unbindTexture()
        } else if (h) {
          for (let r = 0, a = c.length; r < a; r++) {
            const a = c[r],
              s = i.get(a);
            n.bindTexture(t.TEXTURE_2D, s.__webglTexture), P(t.TEXTURE_2D, a), I(o.__webglFramebuffer, e, a, t.COLOR_ATTACHMENT0 + r, t.TEXTURE_2D, 0), g(a) && _(t.TEXTURE_2D)
          }
          n.unbindTexture()
        } else {
          let i = t.TEXTURE_2D;
          if ((e.isWebGL3DRenderTarget || e.isWebGLArrayRenderTarget) && (i = e.isWebGL3DRenderTarget ? t.TEXTURE_3D : t.TEXTURE_2D_ARRAY), n.bindTexture(i, l.__webglTexture), P(i, r), r.mipmaps && r.mipmaps.length > 0)
            for (let n = 0; n < r.mipmaps.length; n++) I(o.__webglFramebuffer[n], e, r, t.COLOR_ATTACHMENT0, i, n);
          else I(o.__webglFramebuffer, e, r, t.COLOR_ATTACHMENT0, i, 0);
          g(r) && _(i), n.unbindTexture()
        }
        e.depthBuffer && N(e)
      }, this.updateRenderTargetMipmap = function(t) {
        const e = t.textures;
        for (let r = 0, a = e.length; r < a; r++) {
          const a = e[r];
          if (g(a)) {
            const e = v(t),
              r = i.get(a).__webglTexture;
            n.bindTexture(e, r), _(e), n.unbindTexture()
          }
        }
      }, this.updateMultisampleRenderTarget = function(e) {
        if (e.samples > 0)
          if (!1 === z(e)) {
            const r = e.textures,
              a = e.width,
              s = e.height;
            let o = t.COLOR_BUFFER_BIT;
            const c = e.stencilBuffer ? t.DEPTH_STENCIL_ATTACHMENT : t.DEPTH_ATTACHMENT,
              u = i.get(e),
              h = r.length > 1;
            if (h)
              for (let e = 0; e < r.length; e++) n.bindFramebuffer(t.FRAMEBUFFER, u.__webglMultisampledFramebuffer), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0 + e, t.RENDERBUFFER, null), n.bindFramebuffer(t.FRAMEBUFFER, u.__webglFramebuffer), t.framebufferTexture2D(t.DRAW_FRAMEBUFFER, t.COLOR_ATTACHMENT0 + e, t.TEXTURE_2D, null, 0);
            n.bindFramebuffer(t.READ_FRAMEBUFFER, u.__webglMultisampledFramebuffer), n.bindFramebuffer(t.DRAW_FRAMEBUFFER, u.__webglFramebuffer);
            for (let n = 0; n < r.length; n++) {
              if (e.resolveDepthBuffer && (e.depthBuffer && (o |= t.DEPTH_BUFFER_BIT), e.stencilBuffer && e.resolveStencilBuffer && (o |= t.STENCIL_BUFFER_BIT)), h) {
                t.framebufferRenderbuffer(t.READ_FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.RENDERBUFFER, u.__webglColorRenderbuffer[n]);
                const e = i.get(r[n]).__webglTexture;
                t.framebufferTexture2D(t.DRAW_FRAMEBUFFER, t.COLOR_ATTACHMENT0, t.TEXTURE_2D, e, 0)
              }
              t.blitFramebuffer(0, 0, a, s, 0, 0, a, s, o, t.NEAREST), !0 === l && (O.length = 0, F.length = 0, O.push(t.COLOR_ATTACHMENT0 + n), e.depthBuffer && !1 === e.resolveDepthBuffer && (O.push(c), F.push(c), t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER, F)), t.invalidateFramebuffer(t.READ_FRAMEBUFFER, O))
            }
            if (n.bindFramebuffer(t.READ_FRAMEBUFFER, null), n.bindFramebuffer(t.DRAW_FRAMEBUFFER, null), h)
              for (let e = 0; e < r.length; e++) {
                n.bindFramebuffer(t.FRAMEBUFFER, u.__webglMultisampledFramebuffer), t.framebufferRenderbuffer(t.FRAMEBUFFER, t.COLOR_ATTACHMENT0 + e, t.RENDERBUFFER, u.__webglColorRenderbuffer[e]);
                const a = i.get(r[e]).__webglTexture;
                n.bindFramebuffer(t.FRAMEBUFFER, u.__webglFramebuffer), t.framebufferTexture2D(t.DRAW_FRAMEBUFFER, t.COLOR_ATTACHMENT0 + e, t.TEXTURE_2D, a, 0)
              }
            n.bindFramebuffer(t.DRAW_FRAMEBUFFER, u.__webglMultisampledFramebuffer)
          } else if (e.depthBuffer && !1 === e.resolveDepthBuffer && l) {
          const n = e.stencilBuffer ? t.DEPTH_STENCIL_ATTACHMENT : t.DEPTH_ATTACHMENT;
          t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER, [n])
        }
      }, this.setupDepthRenderbuffer = N, this.setupFrameBufferTexture = I, this.useMultisampledRTT = z
    }

    function Ov(t, e) {
      return {
        convert: function(n, i = "") {
          let r;
          const a = mp.getTransfer(i);
          if (n === jh) return t.UNSIGNED_BYTE;
          if (n === Jh) return t.UNSIGNED_SHORT_4_4_4_4;
          if (n === Qh) return t.UNSIGNED_SHORT_5_5_5_1;
          if (35902 === n) return t.UNSIGNED_INT_5_9_9_9_REV;
          if (1010 === n) return t.BYTE;
          if (1011 === n) return t.SHORT;
          if (n === qh) return t.UNSIGNED_SHORT;
          if (n === Yh) return t.INT;
          if (n === $h) return t.UNSIGNED_INT;
          if (n === Kh) return t.FLOAT;
          if (n === Zh) return t.HALF_FLOAT;
          if (1021 === n) return t.ALPHA;
          if (1022 === n) return t.RGB;
          if (n === ed) return t.RGBA;
          if (1024 === n) return t.LUMINANCE;
          if (1025 === n) return t.LUMINANCE_ALPHA;
          if (n === nd) return t.DEPTH_COMPONENT;
          if (n === id) return t.DEPTH_STENCIL;
          if (1028 === n) return t.RED;
          if (n === rd) return t.RED_INTEGER;
          if (1030 === n) return t.RG;
          if (n === ad) return t.RG_INTEGER;
          if (n === sd) return t.RGBA_INTEGER;
          if (n === od || n === ld || n === cd || n === ud)
            if (a === Vd) {
              if (r = e.get("WEBGL_compressed_texture_s3tc_srgb"), null === r) return null;
              if (n === od) return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;
              if (n === ld) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
              if (n === cd) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
              if (n === ud) return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT
            } else {
              if (r = e.get("WEBGL_compressed_texture_s3tc"), null === r) return null;
              if (n === od) return r.COMPRESSED_RGB_S3TC_DXT1_EXT;
              if (n === ld) return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;
              if (n === cd) return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;
              if (n === ud) return r.COMPRESSED_RGBA_S3TC_DXT5_EXT
            } if (n === hd || n === dd || n === pd || n === fd) {
            if (r = e.get("WEBGL_compressed_texture_pvrtc"), null === r) return null;
            if (n === hd) return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
            if (n === dd) return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
            if (n === pd) return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
            if (n === fd) return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
          }
          if (n === md || n === gd || n === _d) {
            if (r = e.get("WEBGL_compressed_texture_etc"), null === r) return null;
            if (n === md || n === gd) return a === Vd ? r.COMPRESSED_SRGB8_ETC2 : r.COMPRESSED_RGB8_ETC2;
            if (n === _d) return a === Vd ? r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : r.COMPRESSED_RGBA8_ETC2_EAC
          }
          if (n === vd || n === xd || n === yd || n === bd || n === Md || n === Sd || n === Ed || n === Td || n === wd || n === Ad || n === Rd || n === Cd || n === Pd || n === Dd) {
            if (r = e.get("WEBGL_compressed_texture_astc"), null === r) return null;
            if (n === vd) return a === Vd ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : r.COMPRESSED_RGBA_ASTC_4x4_KHR;
            if (n === xd) return a === Vd ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : r.COMPRESSED_RGBA_ASTC_5x4_KHR;
            if (n === yd) return a === Vd ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : r.COMPRESSED_RGBA_ASTC_5x5_KHR;
            if (n === bd) return a === Vd ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : r.COMPRESSED_RGBA_ASTC_6x5_KHR;
            if (n === Md) return a === Vd ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : r.COMPRESSED_RGBA_ASTC_6x6_KHR;
            if (n === Sd) return a === Vd ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : r.COMPRESSED_RGBA_ASTC_8x5_KHR;
            if (n === Ed) return a === Vd ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : r.COMPRESSED_RGBA_ASTC_8x6_KHR;
            if (n === Td) return a === Vd ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : r.COMPRESSED_RGBA_ASTC_8x8_KHR;
            if (n === wd) return a === Vd ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : r.COMPRESSED_RGBA_ASTC_10x5_KHR;
            if (n === Ad) return a === Vd ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : r.COMPRESSED_RGBA_ASTC_10x6_KHR;
            if (n === Rd) return a === Vd ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : r.COMPRESSED_RGBA_ASTC_10x8_KHR;
            if (n === Cd) return a === Vd ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : r.COMPRESSED_RGBA_ASTC_10x10_KHR;
            if (n === Pd) return a === Vd ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : r.COMPRESSED_RGBA_ASTC_12x10_KHR;
            if (n === Dd) return a === Vd ? r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : r.COMPRESSED_RGBA_ASTC_12x12_KHR
          }
          if (n === Ld || n === Id || n === Ud) {
            if (r = e.get("EXT_texture_compression_bptc"), null === r) return null;
            if (n === Ld) return a === Vd ? r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : r.COMPRESSED_RGBA_BPTC_UNORM_EXT;
            if (n === Id) return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
            if (n === Ud) return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT
          }
          if (36283 === n || n === Nd || n === Od || n === Fd) {
            if (r = e.get("EXT_texture_compression_rgtc"), null === r) return null;
            if (n === Ld) return r.COMPRESSED_RED_RGTC1_EXT;
            if (n === Nd) return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;
            if (n === Od) return r.COMPRESSED_RED_GREEN_RGTC2_EXT;
            if (n === Fd) return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT
          }
          return n === td ? t.UNSIGNED_INT_24_8 : void 0 !== t[n] ? t[n] : null
        }
      }
    }
    class Fv extends dg {
      constructor(t = []) {
        super(), this.isArrayCamera = !0, this.cameras = t, this.index = 0
      }
    }
    class Bv extends hf {
      constructor() {
        super(), this.isGroup = !0, this.type = "Group"
      }
    }
    const zv = {
      type: "move"
    };
    class kv {
      constructor() {
        this._targetRay = null, this._grip = null, this._hand = null
      }
      getHandSpace() {
        return null === this._hand && (this._hand = new Bv, this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = {
          pinching: !1
        }), this._hand
      }
      getTargetRaySpace() {
        return null === this._targetRay && (this._targetRay = new Bv, this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new Up, this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new Up), this._targetRay
      }
      getGripSpace() {
        return null === this._grip && (this._grip = new Bv, this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new Up, this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new Up), this._grip
      }
      dispatchEvent(t) {
        return null !== this._targetRay && this._targetRay.dispatchEvent(t), null !== this._grip && this._grip.dispatchEvent(t), null !== this._hand && this._hand.dispatchEvent(t), this
      }
      connect(t) {
        if (t && t.hand) {
          const e = this._hand;
          if (e)
            for (const n of t.hand.values()) this._getHandJoint(e, n)
        }
        return this.dispatchEvent({
          type: "connected",
          data: t
        }), this
      }
      disconnect(t) {
        return this.dispatchEvent({
          type: "disconnected",
          data: t
        }), null !== this._targetRay && (this._targetRay.visible = !1), null !== this._grip && (this._grip.visible = !1), null !== this._hand && (this._hand.visible = !1), this
      }
      update(t, e, n) {
        let i = null,
          r = null,
          a = null;
        const s = this._targetRay,
          o = this._grip,
          l = this._hand;
        if (t && "visible-blurred" !== e.session.visibilityState) {
          if (l && t.hand) {
            a = !0;
            for (const i of t.hand.values()) {
              const t = e.getJointPose(i, n),
                r = this._getHandJoint(l, i);
              null !== t && (r.matrix.fromArray(t.transform.matrix), r.matrix.decompose(r.position, r.rotation, r.scale), r.matrixWorldNeedsUpdate = !0, r.jointRadius = t.radius), r.visible = null !== t
            }
            const i = l.joints["index-finger-tip"],
              r = l.joints["thumb-tip"],
              s = i.position.distanceTo(r.position),
              o = .02,
              c = .005;
            l.inputState.pinching && s > o + c ? (l.inputState.pinching = !1, this.dispatchEvent({
              type: "pinchend",
              handedness: t.handedness,
              target: this
            })) : !l.inputState.pinching && s <= o - c && (l.inputState.pinching = !0, this.dispatchEvent({
              type: "pinchstart",
              handedness: t.handedness,
              target: this
            }))
          } else null !== o && t.gripSpace && (r = e.getPose(t.gripSpace, n), null !== r && (o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(r.linearVelocity)) : o.hasLinearVelocity = !1, r.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(r.angularVelocity)) : o.hasAngularVelocity = !1));
          null !== s && (i = e.getPose(t.targetRaySpace, n), null === i && null !== r && (i = r), null !== i && (s.matrix.fromArray(i.transform.matrix), s.matrix.decompose(s.position, s.rotation, s.scale), s.matrixWorldNeedsUpdate = !0, i.linearVelocity ? (s.hasLinearVelocity = !0, s.linearVelocity.copy(i.linearVelocity)) : s.hasLinearVelocity = !1, i.angularVelocity ? (s.hasAngularVelocity = !0, s.angularVelocity.copy(i.angularVelocity)) : s.hasAngularVelocity = !1, this.dispatchEvent(zv)))
        }
        return null !== s && (s.visible = null !== i), null !== o && (o.visible = null !== r), null !== l && (l.visible = null !== a), this
      }
      _getHandJoint(t, e) {
        if (void 0 === t.joints[e.jointName]) {
          const n = new Bv;
          n.matrixAutoUpdate = !1, n.visible = !1, t.joints[e.jointName] = n, t.add(n)
        }
        return t.joints[e.jointName]
      }
    }
    class Hv {
      constructor() {
        this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0
      }
      init(t, e, n) {
        if (null === this.texture) {
          const i = new Ep;
          t.properties.get(i).__webglTexture = e.texture, e.depthNear === n.depthNear && e.depthFar === n.depthFar || (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = i
        }
      }
      getMesh(t) {
        if (null !== this.texture && null === this.mesh) {
          const e = t.cameras[0].viewport,
            n = new pm({
              vertexShader: "\nvoid main() {\n\n\tgl_Position = vec4( position, 1.0 );\n\n}",
              fragmentShader: "\nuniform sampler2DArray depthColor;\nuniform float depthWidth;\nuniform float depthHeight;\n\nvoid main() {\n\n\tvec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );\n\n\tif ( coord.x >= 1.0 ) {\n\n\t\tgl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;\n\n\t} else {\n\n\t\tgl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;\n\n\t}\n\n}",
              uniforms: {
                depthColor: {
                  value: this.texture
                },
                depthWidth: {
                  value: e.z
                },
                depthHeight: {
                  value: e.w
                }
              }
            });
          this.mesh = new Ym(new sm(20, 20), n)
        }
        return this.mesh
      }
      reset() {
        this.texture = null, this.mesh = null
      }
      getDepthTexture() {
        return this.texture
      }
    }
    class Vv extends rh {
      constructor(t, e) {
        super();
        const n = this;
        let i = null,
          r = 1,
          a = null,
          s = "local-floor",
          o = 1,
          l = null,
          c = null,
          u = null,
          h = null,
          d = null,
          p = null;
        const f = new Hv,
          m = e.getContextAttributes();
        let g = null,
          _ = null;
        const v = [],
          x = [],
          y = new cp;
        let b = null;
        const M = new dg;
        M.viewport = new Hf;
        const S = new dg;
        S.viewport = new Hf;
        const E = [M, S],
          T = new Fv;
        let w = null,
          A = null;

        function R(t) {
          const e = x.indexOf(t.inputSource);
          if (-1 === e) return;
          const n = v[e];
          void 0 !== n && (n.update(t.inputSource, t.frame, l || a), n.dispatchEvent({
            type: t.type,
            data: t.inputSource
          }))
        }

        function C() {
          i.removeEventListener("select", R), i.removeEventListener("selectstart", R), i.removeEventListener("selectend", R), i.removeEventListener("squeeze", R), i.removeEventListener("squeezestart", R), i.removeEventListener("squeezeend", R), i.removeEventListener("end", C), i.removeEventListener("inputsourceschange", P);
          for (let t = 0; t < v.length; t++) {
            const e = x[t];
            null !== e && (x[t] = null, v[t].disconnect(e))
          }
          w = null, A = null, f.reset(), t.setRenderTarget(g), d = null, h = null, u = null, i = null, _ = null, N.stop(), n.isPresenting = !1, t.setPixelRatio(b), t.setSize(y.width, y.height, !1), n.dispatchEvent({
            type: "sessionend"
          })
        }

        function P(t) {
          for (let e = 0; e < t.removed.length; e++) {
            const n = t.removed[e],
              i = x.indexOf(n);
            i >= 0 && (x[i] = null, v[i].disconnect(n))
          }
          for (let e = 0; e < t.added.length; e++) {
            const n = t.added[e];
            let i = x.indexOf(n);
            if (-1 === i) {
              for (let t = 0; t < v.length; t++) {
                if (t >= x.length) {
                  x.push(n), i = t;
                  break
                }
                if (null === x[t]) {
                  x[t] = n, i = t;
                  break
                }
              }
              if (-1 === i) break
            }
            const r = v[i];
            r && r.connect(n)
          }
        }
        this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(t) {
          let e = v[t];
          return void 0 === e && (e = new kv, v[t] = e), e.getTargetRaySpace()
        }, this.getControllerGrip = function(t) {
          let e = v[t];
          return void 0 === e && (e = new kv, v[t] = e), e.getGripSpace()
        }, this.getHand = function(t) {
          let e = v[t];
          return void 0 === e && (e = new kv, v[t] = e), e.getHandSpace()
        }, this.setFramebufferScaleFactor = function(t) {
          r = t, !0 === n.isPresenting && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")
        }, this.setReferenceSpaceType = function(t) {
          s = t, !0 === n.isPresenting && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")
        }, this.getReferenceSpace = function() {
          return l || a
        }, this.setReferenceSpace = function(t) {
          l = t
        }, this.getBaseLayer = function() {
          return null !== h ? h : d
        }, this.getBinding = function() {
          return u
        }, this.getFrame = function() {
          return p
        }, this.getSession = function() {
          return i
        }, this.setSession = async function(c) {
          if (i = c, null !== i) {
            if (g = t.getRenderTarget(), i.addEventListener("select", R), i.addEventListener("selectstart", R), i.addEventListener("selectend", R), i.addEventListener("squeeze", R), i.addEventListener("squeezestart", R), i.addEventListener("squeezeend", R), i.addEventListener("end", C), i.addEventListener("inputsourceschange", P), !0 !== m.xrCompatible && await e.makeXRCompatible(), b = t.getPixelRatio(), t.getSize(y), "undefined" != typeof XRWebGLBinding && "createProjectionLayer" in XRWebGLBinding.prototype) {
              let n = null,
                a = null,
                s = null;
              m.depth && (s = m.stencil ? e.DEPTH24_STENCIL8 : e.DEPTH_COMPONENT24, n = m.stencil ? id : nd, a = m.stencil ? td : $h);
              const o = {
                colorFormat: e.RGBA8,
                depthFormat: s,
                scaleFactor: r
              };
              u = new XRWebGLBinding(i, e), h = u.createProjectionLayer(o), i.updateRenderState({
                layers: [h]
              }), t.setPixelRatio(1), t.setSize(h.textureWidth, h.textureHeight, !1), _ = new lg(h.textureWidth, h.textureHeight, {
                format: ed,
                type: jh,
                depthTexture: new Gg(h.textureWidth, h.textureHeight, a, void 0, void 0, void 0, void 0, void 0, void 0, n),
                stencilBuffer: m.stencil,
                colorSpace: t.outputColorSpace,
                samples: m.antialias ? 4 : 0,
                resolveDepthBuffer: !1 === h.ignoreDepthValues,
                resolveStencilBuffer: !1 === h.ignoreDepthValues
              })
            } else {
              const n = {
                antialias: m.antialias,
                alpha: !0,
                depth: m.depth,
                stencil: m.stencil,
                framebufferScaleFactor: r
              };
              d = new XRWebGLLayer(i, e, n), i.updateRenderState({
                baseLayer: d
              }), t.setPixelRatio(1), t.setSize(d.framebufferWidth, d.framebufferHeight, !1), _ = new lg(d.framebufferWidth, d.framebufferHeight, {
                format: ed,
                type: jh,
                colorSpace: t.outputColorSpace,
                stencilBuffer: m.stencil,
                resolveDepthBuffer: !1 === d.ignoreDepthValues,
                resolveStencilBuffer: !1 === d.ignoreDepthValues
              })
            }
            _.isXRRenderTarget = !0, this.setFoveation(o), l = null, a = await i.requestReferenceSpace(s), N.setContext(i), N.start(), n.isPresenting = !0, n.dispatchEvent({
              type: "sessionstart"
            })
          }
        }, this.getEnvironmentBlendMode = function() {
          if (null !== i) return i.environmentBlendMode
        }, this.getDepthTexture = function() {
          return f.getDepthTexture()
        };
        const D = new Up,
          L = new Up;

        function I(t, e) {
          null === e ? t.matrixWorld.copy(t.matrix) : t.matrixWorld.multiplyMatrices(e.matrixWorld, t.matrix), t.matrixWorldInverse.copy(t.matrixWorld).invert()
        }
        this.updateCamera = function(t) {
          if (null === i) return;
          let e = t.near,
            n = t.far;
          null !== f.texture && (f.depthNear > 0 && (e = f.depthNear), f.depthFar > 0 && (n = f.depthFar)), T.near = S.near = M.near = e, T.far = S.far = M.far = n, w === T.near && A === T.far || (i.updateRenderState({
            depthNear: T.near,
            depthFar: T.far
          }), w = T.near, A = T.far), M.layers.mask = 2 | t.layers.mask, S.layers.mask = 4 | t.layers.mask, T.layers.mask = M.layers.mask | S.layers.mask;
          const r = t.parent,
            a = T.cameras;
          I(T, r);
          for (let t = 0; t < a.length; t++) I(a[t], r);
          2 === a.length ? function(t, e, n) {
              D.setFromMatrixPosition(e.matrixWorld), L.setFromMatrixPosition(n.matrixWorld);
              const i = D.distanceTo(L),
                r = e.projectionMatrix.elements,
                a = n.projectionMatrix.elements,
                s = r[14] / (r[10] - 1),
                o = r[14] / (r[10] + 1),
                l = (r[9] + 1) / r[5],
                c = (r[9] - 1) / r[5],
                u = (r[8] - 1) / r[0],
                h = (a[8] + 1) / a[0],
                d = s * u,
                p = s * h,
                f = i / (-u + h),
                m = f * -u;
              if (e.matrixWorld.decompose(t.position, t.quaternion, t.scale), t.translateX(m), t.translateZ(f), t.matrixWorld.compose(t.position, t.quaternion, t.scale), t.matrixWorldInverse.copy(t.matrixWorld).invert(), -1 === r[10]) t.projectionMatrix.copy(e.projectionMatrix), t.projectionMatrixInverse.copy(e.projectionMatrixInverse);
              else {
                const e = s + f,
                  n = o + f,
                  r = d - m,
                  a = p + (i - m),
                  u = l * o / n * e,
                  h = c * o / n * e;
                t.projectionMatrix.makePerspective(r, a, u, h, e, n), t.projectionMatrixInverse.copy(t.projectionMatrix).invert()
              }
            }(T, M, S) : T.projectionMatrix.copy(M.projectionMatrix),
            function(t, e, n) {
              null === n ? t.matrix.copy(e.matrixWorld) : (t.matrix.copy(n.matrixWorld), t.matrix.invert(), t.matrix.multiply(e.matrixWorld)), t.matrix.decompose(t.position, t.quaternion, t.scale), t.updateMatrixWorld(!0), t.projectionMatrix.copy(e.projectionMatrix), t.projectionMatrixInverse.copy(e.projectionMatrixInverse), t.isPerspectiveCamera && (t.fov = 2 * ip * Math.atan(1 / t.projectionMatrix.elements[5]), t.zoom = 1)
            }(t, T, r)
        }, this.getCamera = function() {
          return T
        }, this.getFoveation = function() {
          if (null !== h || null !== d) return o
        }, this.setFoveation = function(t) {
          o = t, null !== h && (h.fixedFoveation = t), null !== d && void 0 !== d.fixedFoveation && (d.fixedFoveation = t)
        }, this.hasDepthSensing = function() {
          return null !== f.texture
        }, this.getDepthSensingMesh = function() {
          return f.getMesh(T)
        };
        let U = null;
        const N = new Vf;
        N.setAnimationLoop((function(e, r) {
          if (c = r.getViewerPose(l || a), p = r, null !== c) {
            const e = c.views;
            null !== d && (t.setRenderTargetFramebuffer(_, d.framebuffer), t.setRenderTarget(_));
            let n = !1;
            e.length !== T.cameras.length && (T.cameras.length = 0, n = !0);
            for (let i = 0; i < e.length; i++) {
              const r = e[i];
              let a = null;
              if (null !== d) a = d.getViewport(r);
              else {
                const e = u.getViewSubImage(h, r);
                a = e.viewport, 0 === i && (t.setRenderTargetTextures(_, e.colorTexture, h.ignoreDepthValues ? void 0 : e.depthStencilTexture), t.setRenderTarget(_))
              }
              let s = E[i];
              void 0 === s && (s = new dg, s.layers.enable(i), s.viewport = new Hf, E[i] = s), s.matrix.fromArray(r.transform.matrix), s.matrix.decompose(s.position, s.quaternion, s.scale), s.projectionMatrix.fromArray(r.projectionMatrix), s.projectionMatrixInverse.copy(s.projectionMatrix).invert(), s.viewport.set(a.x, a.y, a.width, a.height), 0 === i && (T.matrix.copy(s.matrix), T.matrix.decompose(T.position, T.quaternion, T.scale)), !0 === n && T.cameras.push(s)
            }
            const r = i.enabledFeatures;
            if (r && r.includes("depth-sensing") && "gpu-optimized" == i.depthUsage && u) {
              const n = u.getDepthInformation(e[0]);
              n && n.isValid && n.texture && f.init(t, n, i.renderState)
            }
          }
          for (let t = 0; t < v.length; t++) {
            const e = x[t],
              n = v[t];
            null !== e && void 0 !== n && n.update(e, r, l || a)
          }
          U && U(e, r), r.detectedPlanes && n.dispatchEvent({
            type: "planesdetected",
            data: r
          }), p = null
        })), this.setAnimationLoop = function(t) {
          U = t
        }, this.dispose = function() {}
      }
    }
    const Gv = new qp,
      Wv = new Fp;

    function Xv(t, e) {
      function n(t, e) {
        !0 === t.matrixAutoUpdate && t.updateMatrix(), e.value.copy(t.matrix)
      }

      function i(t, i) {
        t.opacity.value = i.opacity, i.color && t.diffuse.value.copy(i.color), i.emissive && t.emissive.value.copy(i.emissive).multiplyScalar(i.emissiveIntensity), i.map && (t.map.value = i.map, n(i.map, t.mapTransform)), i.alphaMap && (t.alphaMap.value = i.alphaMap, n(i.alphaMap, t.alphaMapTransform)), i.bumpMap && (t.bumpMap.value = i.bumpMap, n(i.bumpMap, t.bumpMapTransform), t.bumpScale.value = i.bumpScale, 1 === i.side && (t.bumpScale.value *= -1)), i.normalMap && (t.normalMap.value = i.normalMap, n(i.normalMap, t.normalMapTransform), t.normalScale.value.copy(i.normalScale), 1 === i.side && t.normalScale.value.negate()), i.displacementMap && (t.displacementMap.value = i.displacementMap, n(i.displacementMap, t.displacementMapTransform), t.displacementScale.value = i.displacementScale, t.displacementBias.value = i.displacementBias), i.emissiveMap && (t.emissiveMap.value = i.emissiveMap, n(i.emissiveMap, t.emissiveMapTransform)), i.specularMap && (t.specularMap.value = i.specularMap, n(i.specularMap, t.specularMapTransform)), i.alphaTest > 0 && (t.alphaTest.value = i.alphaTest);
        const r = e.get(i),
          a = r.envMap,
          s = r.envMapRotation;
        a && (t.envMap.value = a, Gv.copy(s), Gv.x *= -1, Gv.y *= -1, Gv.z *= -1, a.isCubeTexture && !1 === a.isRenderTargetTexture && (Gv.y *= -1, Gv.z *= -1), t.envMapRotation.value.setFromMatrix4(Wv.makeRotationFromEuler(Gv)), t.flipEnvMap.value = a.isCubeTexture && !1 === a.isRenderTargetTexture ? -1 : 1, t.reflectivity.value = i.reflectivity, t.ior.value = i.ior, t.refractionRatio.value = i.refractionRatio), i.lightMap && (t.lightMap.value = i.lightMap, t.lightMapIntensity.value = i.lightMapIntensity, n(i.lightMap, t.lightMapTransform)), i.aoMap && (t.aoMap.value = i.aoMap, t.aoMapIntensity.value = i.aoMapIntensity, n(i.aoMap, t.aoMapTransform))
      }
      return {
        refreshFogUniforms: function(e, n) {
          n.color.getRGB(e.fogColor.value, hm(t)), n.isFog ? (e.fogNear.value = n.near, e.fogFar.value = n.far) : n.isFogExp2 && (e.fogDensity.value = n.density)
        },
        refreshMaterialUniforms: function(t, r, a, s, o) {
          r.isMeshBasicMaterial || r.isMeshLambertMaterial ? i(t, r) : r.isMeshToonMaterial ? (i(t, r), function(t, e) {
            e.gradientMap && (t.gradientMap.value = e.gradientMap)
          }(t, r)) : r.isMeshPhongMaterial ? (i(t, r), function(t, e) {
            t.specular.value.copy(e.specular), t.shininess.value = Math.max(e.shininess, 1e-4)
          }(t, r)) : r.isMeshStandardMaterial ? (i(t, r), function(t, e) {
            t.metalness.value = e.metalness, e.metalnessMap && (t.metalnessMap.value = e.metalnessMap, n(e.metalnessMap, t.metalnessMapTransform)), t.roughness.value = e.roughness, e.roughnessMap && (t.roughnessMap.value = e.roughnessMap, n(e.roughnessMap, t.roughnessMapTransform)), e.envMap && (t.envMapIntensity.value = e.envMapIntensity)
          }(t, r), r.isMeshPhysicalMaterial && function(t, e, i) {
            t.ior.value = e.ior, e.sheen > 0 && (t.sheenColor.value.copy(e.sheenColor).multiplyScalar(e.sheen), t.sheenRoughness.value = e.sheenRoughness, e.sheenColorMap && (t.sheenColorMap.value = e.sheenColorMap, n(e.sheenColorMap, t.sheenColorMapTransform)), e.sheenRoughnessMap && (t.sheenRoughnessMap.value = e.sheenRoughnessMap, n(e.sheenRoughnessMap, t.sheenRoughnessMapTransform))), e.clearcoat > 0 && (t.clearcoat.value = e.clearcoat, t.clearcoatRoughness.value = e.clearcoatRoughness, e.clearcoatMap && (t.clearcoatMap.value = e.clearcoatMap, n(e.clearcoatMap, t.clearcoatMapTransform)), e.clearcoatRoughnessMap && (t.clearcoatRoughnessMap.value = e.clearcoatRoughnessMap, n(e.clearcoatRoughnessMap, t.clearcoatRoughnessMapTransform)), e.clearcoatNormalMap && (t.clearcoatNormalMap.value = e.clearcoatNormalMap, n(e.clearcoatNormalMap, t.clearcoatNormalMapTransform), t.clearcoatNormalScale.value.copy(e.clearcoatNormalScale), 1 === e.side && t.clearcoatNormalScale.value.negate())), e.dispersion > 0 && (t.dispersion.value = e.dispersion), e.iridescence > 0 && (t.iridescence.value = e.iridescence, t.iridescenceIOR.value = e.iridescenceIOR, t.iridescenceThicknessMinimum.value = e.iridescenceThicknessRange[0], t.iridescenceThicknessMaximum.value = e.iridescenceThicknessRange[1], e.iridescenceMap && (t.iridescenceMap.value = e.iridescenceMap, n(e.iridescenceMap, t.iridescenceMapTransform)), e.iridescenceThicknessMap && (t.iridescenceThicknessMap.value = e.iridescenceThicknessMap, n(e.iridescenceThicknessMap, t.iridescenceThicknessMapTransform))), e.transmission > 0 && (t.transmission.value = e.transmission, t.transmissionSamplerMap.value = i.texture, t.transmissionSamplerSize.value.set(i.width, i.height), e.transmissionMap && (t.transmissionMap.value = e.transmissionMap, n(e.transmissionMap, t.transmissionMapTransform)), t.thickness.value = e.thickness, e.thicknessMap && (t.thicknessMap.value = e.thicknessMap, n(e.thicknessMap, t.thicknessMapTransform)), t.attenuationDistance.value = e.attenuationDistance, t.attenuationColor.value.copy(e.attenuationColor)), e.anisotropy > 0 && (t.anisotropyVector.value.set(e.anisotropy * Math.cos(e.anisotropyRotation), e.anisotropy * Math.sin(e.anisotropyRotation)), e.anisotropyMap && (t.anisotropyMap.value = e.anisotropyMap, n(e.anisotropyMap, t.anisotropyMapTransform))), t.specularIntensity.value = e.specularIntensity, t.specularColor.value.copy(e.specularColor), e.specularColorMap && (t.specularColorMap.value = e.specularColorMap, n(e.specularColorMap, t.specularColorMapTransform)), e.specularIntensityMap && (t.specularIntensityMap.value = e.specularIntensityMap, n(e.specularIntensityMap, t.specularIntensityMapTransform))
          }(t, r, o)) : r.isMeshMatcapMaterial ? (i(t, r), function(t, e) {
            e.matcap && (t.matcap.value = e.matcap)
          }(t, r)) : r.isMeshDepthMaterial ? i(t, r) : r.isMeshDistanceMaterial ? (i(t, r), function(t, n) {
            const i = e.get(n).light;
            t.referencePosition.value.setFromMatrixPosition(i.matrixWorld), t.nearDistance.value = i.shadow.camera.near, t.farDistance.value = i.shadow.camera.far
          }(t, r)) : r.isMeshNormalMaterial ? i(t, r) : r.isLineBasicMaterial ? (function(t, e) {
            t.diffuse.value.copy(e.color), t.opacity.value = e.opacity, e.map && (t.map.value = e.map, n(e.map, t.mapTransform))
          }(t, r), r.isLineDashedMaterial && function(t, e) {
            t.dashSize.value = e.dashSize, t.totalSize.value = e.dashSize + e.gapSize, t.scale.value = e.scale
          }(t, r)) : r.isPointsMaterial ? function(t, e, i, r) {
            t.diffuse.value.copy(e.color), t.opacity.value = e.opacity, t.size.value = e.size * i, t.scale.value = .5 * r, e.map && (t.map.value = e.map, n(e.map, t.uvTransform)), e.alphaMap && (t.alphaMap.value = e.alphaMap, n(e.alphaMap, t.alphaMapTransform)), e.alphaTest > 0 && (t.alphaTest.value = e.alphaTest)
          }(t, r, a, s) : r.isSpriteMaterial ? function(t, e) {
            t.diffuse.value.copy(e.color), t.opacity.value = e.opacity, t.rotation.value = e.rotation, e.map && (t.map.value = e.map, n(e.map, t.mapTransform)), e.alphaMap && (t.alphaMap.value = e.alphaMap, n(e.alphaMap, t.alphaMapTransform)), e.alphaTest > 0 && (t.alphaTest.value = e.alphaTest)
          }(t, r) : r.isShadowMaterial ? (t.color.value.copy(r.color), t.opacity.value = r.opacity) : r.isShaderMaterial && (r.uniformsNeedUpdate = !1)
        }
      }
    }

    function jv(t, e, n, i) {
      let r = {},
        a = {},
        s = [];
      const o = t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);

      function l(t, e, n, i) {
        const r = t.value,
          a = e + "_" + n;
        if (void 0 === i[a]) return i[a] = "number" == typeof r || "boolean" == typeof r ? r : r.clone(), !0; {
          const t = i[a];
          if ("number" == typeof r || "boolean" == typeof r) {
            if (t !== r) return i[a] = r, !0
          } else if (!1 === t.equals(r)) return t.copy(r), !0
        }
        return !1
      }

      function c(t) {
        const e = {
          boundary: 0,
          storage: 0
        };
        return "number" == typeof t || "boolean" == typeof t ? (e.boundary = 4, e.storage = 4) : t.isVector2 ? (e.boundary = 8, e.storage = 8) : t.isVector3 || t.isColor ? (e.boundary = 16, e.storage = 12) : t.isVector4 ? (e.boundary = 16, e.storage = 16) : t.isMatrix3 ? (e.boundary = 48, e.storage = 48) : t.isMatrix4 ? (e.boundary = 64, e.storage = 64) : t.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", t), e
      }

      function u(e) {
        const n = e.target;
        n.removeEventListener("dispose", u);
        const i = s.indexOf(n.__bindingPointIndex);
        s.splice(i, 1), t.deleteBuffer(r[n.id]), delete r[n.id], delete a[n.id]
      }
      return {
        bind: function(t, e) {
          const n = e.program;
          i.uniformBlockBinding(t, n)
        },
        update: function(n, h) {
          let d = r[n.id];
          void 0 === d && (function(t) {
            const e = t.uniforms;
            let n = 0;
            for (let t = 0, i = e.length; t < i; t++) {
              const i = Array.isArray(e[t]) ? e[t] : [e[t]];
              for (let t = 0, e = i.length; t < e; t++) {
                const e = i[t],
                  r = Array.isArray(e.value) ? e.value : [e.value];
                for (let t = 0, i = r.length; t < i; t++) {
                  const i = c(r[t]),
                    a = n % 16,
                    s = a % i.boundary,
                    o = a + s;
                  n += s, 0 !== o && 16 - o < i.storage && (n += 16 - o), e.__data = new Float32Array(i.storage / Float32Array.BYTES_PER_ELEMENT), e.__offset = n, n += i.storage
                }
              }
            }
            const i = n % 16;
            i > 0 && (n += 16 - i), t.__size = n, t.__cache = {}
          }(n), d = function(e) {
            const n = function() {
              for (let t = 0; t < o; t++)
                if (-1 === s.indexOf(t)) return s.push(t), t;
              return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0
            }();
            e.__bindingPointIndex = n;
            const i = t.createBuffer(),
              r = e.__size,
              a = e.usage;
            return t.bindBuffer(t.UNIFORM_BUFFER, i), t.bufferData(t.UNIFORM_BUFFER, r, a), t.bindBuffer(t.UNIFORM_BUFFER, null), t.bindBufferBase(t.UNIFORM_BUFFER, n, i), i
          }(n), r[n.id] = d, n.addEventListener("dispose", u));
          const p = h.program;
          i.updateUBOMapping(n, p);
          const f = e.render.frame;
          a[n.id] !== f && (function(e) {
            const n = r[e.id],
              i = e.uniforms,
              a = e.__cache;
            t.bindBuffer(t.UNIFORM_BUFFER, n);
            for (let e = 0, n = i.length; e < n; e++) {
              const n = Array.isArray(i[e]) ? i[e] : [i[e]];
              for (let i = 0, r = n.length; i < r; i++) {
                const r = n[i];
                if (!0 === l(r, e, i, a)) {
                  const e = r.__offset,
                    n = Array.isArray(r.value) ? r.value : [r.value];
                  let i = 0;
                  for (let a = 0; a < n.length; a++) {
                    const s = n[a],
                      o = c(s);
                    "number" == typeof s || "boolean" == typeof s ? (r.__data[0] = s, t.bufferSubData(t.UNIFORM_BUFFER, e + i, r.__data)) : s.isMatrix3 ? (r.__data[0] = s.elements[0], r.__data[1] = s.elements[1], r.__data[2] = s.elements[2], r.__data[3] = 0, r.__data[4] = s.elements[3], r.__data[5] = s.elements[4], r.__data[6] = s.elements[5], r.__data[7] = 0, r.__data[8] = s.elements[6], r.__data[9] = s.elements[7], r.__data[10] = s.elements[8], r.__data[11] = 0) : (s.toArray(r.__data, i), i += o.storage / Float32Array.BYTES_PER_ELEMENT)
                  }
                  t.bufferSubData(t.UNIFORM_BUFFER, e, r.__data)
                }
              }
            }
            t.bindBuffer(t.UNIFORM_BUFFER, null)
          }(n), a[n.id] = f)
        },
        dispose: function() {
          for (const e in r) t.deleteBuffer(r[e]);
          s = [], r = {}, a = {}
        }
      }
    }
    class qv {
      constructor(t = {}) {
        const {
          canvas: e = th(),
          context: n = null,
          depth: i = !0,
          stencil: r = !1,
          alpha: a = !1,
          antialias: s = !1,
          premultipliedAlpha: o = !0,
          preserveDrawingBuffer: l = !1,
          powerPreference: c = "default",
          failIfMajorPerformanceCaveat: u = !1,
          reverseDepthBuffer: h = !1
        } = t;
        let d;
        if (this.isWebGLRenderer = !0, null !== n) {
          if ("undefined" != typeof WebGLRenderingContext && n instanceof WebGLRenderingContext) throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
          d = n.getContextAttributes().alpha
        } else d = a;
        const p = new Uint32Array(4),
          f = new Int32Array(4);
        let m = null,
          g = null;
        const _ = [],
          v = [];
        this.domElement = e, this.debug = {
          checkShaderErrors: !0,
          onShaderError: null
        }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this._outputColorSpace = zd, this.toneMapping = 0, this.toneMappingExposure = 1;
        const x = this;
        let y = !1,
          b = 0,
          M = 0,
          S = null,
          E = -1,
          T = null;
        const w = new Hf,
          A = new Hf;
        let R = null;
        const C = new Pp(0);
        let P = 0,
          D = e.width,
          L = e.height,
          I = 1,
          U = null,
          N = null;
        const O = new Hf(0, 0, D, L),
          F = new Hf(0, 0, D, L);
        let B = !1;
        const z = new kf;
        let k = !1,
          H = !1;
        this.transmissionResolutionScale = 1;
        const V = new Fp,
          G = new Fp,
          W = new Up,
          X = new Hf,
          j = {
            background: null,
            fog: null,
            environment: null,
            overrideMaterial: null,
            isScene: !0
          };
        let q = !1;

        function Y() {
          return null === S ? I : 1
        }
        let $, K, Z, J, Q, tt, et, nt, it, rt, at, st, ot, lt, ct, ut, ht, dt, pt, ft, mt, gt, _t, vt, xt = n;

        function yt(t, n) {
          return e.getContext(t, n)
        }
        try {
          const t = {
            alpha: !0,
            depth: i,
            stencil: r,
            antialias: s,
            premultipliedAlpha: o,
            preserveDrawingBuffer: l,
            powerPreference: c,
            failIfMajorPerformanceCaveat: u
          };
          if ("setAttribute" in e && e.setAttribute("data-engine", "three.js r174"), e.addEventListener("webglcontextlost", St, !1), e.addEventListener("webglcontextrestored", Et, !1), e.addEventListener("webglcontextcreationerror", Tt, !1), null === xt) {
            const e = "webgl2";
            if (xt = yt(e, t), null === xt) throw yt(e) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.")
          }
        } catch (t) {
          throw console.error("THREE.WebGLRenderer: " + t.message), t
        }

        function bt() {
          $ = new Ng(xt), $.init(), gt = new Ov(xt, $), K = new ag(xt, $, t, gt), Z = new Iv(xt, $), K.reverseDepthBuffer && h && Z.buffers.depth.setReversed(!0), J = new Bg(xt), Q = new vv, tt = new Nv(xt, $, Z, Q, K, gt, J), et = new _g(x), nt = new Ug(x), it = new Gf(xt), _t = new ig(xt, it), rt = new Og(xt, it, J, _t), at = new Hg(xt, rt, it, J), pt = new kg(xt, K, tt), ut = new sg(Q), st = new _v(x, et, nt, $, K, _t, ut), ot = new Xv(x, Q), lt = new Mv, ct = new Rv($), dt = new ng(x, et, nt, Z, at, d, o), ht = new Dv(x, at, K), vt = new jv(xt, J, K, Z), ft = new rg(xt, $, J), mt = new Fg(xt, $, J), J.programs = st.programs, x.capabilities = K, x.extensions = $, x.properties = Q, x.renderLists = lt, x.shadowMap = ht, x.state = Z, x.info = J
        }
        bt();
        const Mt = new Vv(x, xt);

        function St(t) {
          t.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), y = !0
        }

        function Et() {
          console.log("THREE.WebGLRenderer: Context Restored."), y = !1;
          const t = J.autoReset,
            e = ht.enabled,
            n = ht.autoUpdate,
            i = ht.needsUpdate,
            r = ht.type;
          bt(), J.autoReset = t, ht.enabled = e, ht.autoUpdate = n, ht.needsUpdate = i, ht.type = r
        }

        function Tt(t) {
          console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", t.statusMessage)
        }

        function wt(t) {
          const e = t.target;
          e.removeEventListener("dispose", wt),
            function(t) {
              (function(t) {
                const e = Q.get(t).programs;
                void 0 !== e && (e.forEach((function(t) {
                  st.releaseProgram(t)
                })), t.isShaderMaterial && st.releaseShaderCache(t))
              })(t), Q.remove(t)
            }(e)
        }

        function At(t, e, n) {
          !0 === t.transparent && 2 === t.side && !1 === t.forceSinglePass ? (t.side = 1, t.needsUpdate = !0, Ft(t, e, n), t.side = 0, t.needsUpdate = !0, Ft(t, e, n), t.side = 2) : Ft(t, e, n)
        }
        this.xr = Mt, this.getContext = function() {
          return xt
        }, this.getContextAttributes = function() {
          return xt.getContextAttributes()
        }, this.forceContextLoss = function() {
          const t = $.get("WEBGL_lose_context");
          t && t.loseContext()
        }, this.forceContextRestore = function() {
          const t = $.get("WEBGL_lose_context");
          t && t.restoreContext()
        }, this.getPixelRatio = function() {
          return I
        }, this.setPixelRatio = function(t) {
          void 0 !== t && (I = t, this.setSize(D, L, !1))
        }, this.getSize = function(t) {
          return t.set(D, L)
        }, this.setSize = function(t, n, i = !0) {
          Mt.isPresenting ? console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.") : (D = t, L = n, e.width = Math.floor(t * I), e.height = Math.floor(n * I), !0 === i && (e.style.width = t + "px", e.style.height = n + "px"), this.setViewport(0, 0, t, n))
        }, this.getDrawingBufferSize = function(t) {
          return t.set(D * I, L * I).floor()
        }, this.setDrawingBufferSize = function(t, n, i) {
          D = t, L = n, I = i, e.width = Math.floor(t * i), e.height = Math.floor(n * i), this.setViewport(0, 0, t, n)
        }, this.getCurrentViewport = function(t) {
          return t.copy(w)
        }, this.getViewport = function(t) {
          return t.copy(O)
        }, this.setViewport = function(t, e, n, i) {
          t.isVector4 ? O.set(t.x, t.y, t.z, t.w) : O.set(t, e, n, i), Z.viewport(w.copy(O).multiplyScalar(I).round())
        }, this.getScissor = function(t) {
          return t.copy(F)
        }, this.setScissor = function(t, e, n, i) {
          t.isVector4 ? F.set(t.x, t.y, t.z, t.w) : F.set(t, e, n, i), Z.scissor(A.copy(F).multiplyScalar(I).round())
        }, this.getScissorTest = function() {
          return B
        }, this.setScissorTest = function(t) {
          Z.setScissorTest(B = t)
        }, this.setOpaqueSort = function(t) {
          U = t
        }, this.setTransparentSort = function(t) {
          N = t
        }, this.getClearColor = function(t) {
          return t.copy(dt.getClearColor())
        }, this.setClearColor = function() {
          dt.setClearColor(...arguments)
        }, this.getClearAlpha = function() {
          return dt.getClearAlpha()
        }, this.setClearAlpha = function() {
          dt.setClearAlpha(...arguments)
        }, this.clear = function(t = !0, e = !0, n = !0) {
          let i = 0;
          if (t) {
            let t = !1;
            if (null !== S) {
              const e = S.texture.format;
              t = e === sd || e === ad || e === rd
            }
            if (t) {
              const t = S.texture.type,
                e = t === jh || t === $h || t === qh || t === td || t === Jh || t === Qh,
                n = dt.getClearColor(),
                i = dt.getClearAlpha(),
                r = n.r,
                a = n.g,
                s = n.b;
              e ? (p[0] = r, p[1] = a, p[2] = s, p[3] = i, xt.clearBufferuiv(xt.COLOR, 0, p)) : (f[0] = r, f[1] = a, f[2] = s, f[3] = i, xt.clearBufferiv(xt.COLOR, 0, f))
            } else i |= xt.COLOR_BUFFER_BIT
          }
          e && (i |= xt.DEPTH_BUFFER_BIT), n && (i |= xt.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), xt.clear(i)
        }, this.clearColor = function() {
          this.clear(!0, !1, !1)
        }, this.clearDepth = function() {
          this.clear(!1, !0, !1)
        }, this.clearStencil = function() {
          this.clear(!1, !1, !0)
        }, this.dispose = function() {
          e.removeEventListener("webglcontextlost", St, !1), e.removeEventListener("webglcontextrestored", Et, !1), e.removeEventListener("webglcontextcreationerror", Tt, !1), dt.dispose(), lt.dispose(), ct.dispose(), Q.dispose(), et.dispose(), nt.dispose(), at.dispose(), _t.dispose(), vt.dispose(), st.dispose(), Mt.dispose(), Mt.removeEventListener("sessionstart", Ct), Mt.removeEventListener("sessionend", Pt), Dt.stop()
        }, this.renderBufferDirect = function(t, e, n, i, r, a) {
          null === e && (e = j);
          const s = r.isMesh && r.matrixWorld.determinant() < 0,
            o = function(t, e, n, i, r) {
              !0 !== e.isScene && (e = j), tt.resetTextureUnits();
              const a = e.fog,
                s = i.isMeshStandardMaterial ? e.environment : null,
                o = null === S ? x.outputColorSpace : !0 === S.isXRRenderTarget ? S.texture.colorSpace : kd,
                l = (i.isMeshStandardMaterial ? nt : et).get(i.envMap || s),
                c = !0 === i.vertexColors && !!n.attributes.color && 4 === n.attributes.color.itemSize,
                u = !!n.attributes.tangent && (!!i.normalMap || i.anisotropy > 0),
                h = !!n.morphAttributes.position,
                d = !!n.morphAttributes.normal,
                p = !!n.morphAttributes.color;
              let f = 0;
              i.toneMapped && (null !== S && !0 !== S.isXRRenderTarget || (f = x.toneMapping));
              const m = n.morphAttributes.position || n.morphAttributes.normal || n.morphAttributes.color,
                _ = void 0 !== m ? m.length : 0,
                v = Q.get(i),
                y = g.state.lights;
              if (!0 === k && (!0 === H || t !== T)) {
                const e = t === T && i.id === E;
                ut.setState(i, t, e)
              }
              let b = !1;
              i.version === v.__version ? v.needsLights && v.lightsStateVersion !== y.state.version || v.outputColorSpace !== o || r.isBatchedMesh && !1 === v.batching ? b = !0 : r.isBatchedMesh || !0 !== v.batching ? r.isBatchedMesh && !0 === v.batchingColor && null === r.colorTexture || r.isBatchedMesh && !1 === v.batchingColor && null !== r.colorTexture || r.isInstancedMesh && !1 === v.instancing ? b = !0 : r.isInstancedMesh || !0 !== v.instancing ? r.isSkinnedMesh && !1 === v.skinning ? b = !0 : r.isSkinnedMesh || !0 !== v.skinning ? r.isInstancedMesh && !0 === v.instancingColor && null === r.instanceColor || r.isInstancedMesh && !1 === v.instancingColor && null !== r.instanceColor || r.isInstancedMesh && !0 === v.instancingMorph && null === r.morphTexture || r.isInstancedMesh && !1 === v.instancingMorph && null !== r.morphTexture || v.envMap !== l || !0 === i.fog && v.fog !== a ? b = !0 : void 0 === v.numClippingPlanes || v.numClippingPlanes === ut.numPlanes && v.numIntersection === ut.numIntersection ? (v.vertexAlphas !== c || v.vertexTangents !== u || v.morphTargets !== h || v.morphNormals !== d || v.morphColors !== p || v.toneMapping !== f || v.morphTargetsCount !== _) && (b = !0) : b = !0 : b = !0 : b = !0 : b = !0 : (b = !0, v.__version = i.version);
              let M = v.currentProgram;
              !0 === b && (M = Ft(i, e, r));
              let w = !1,
                A = !1,
                R = !1;
              const C = M.getUniforms(),
                P = v.uniforms;
              if (Z.useProgram(M.program) && (w = !0, A = !0, R = !0), i.id !== E && (E = i.id, A = !0), w || T !== t) {
                Z.buffers.depth.getReversed() ? (V.copy(t.projectionMatrix), function(t) {
                  const e = t.elements;
                  e[2] = .5 * e[2] + .5 * e[3], e[6] = .5 * e[6] + .5 * e[7], e[10] = .5 * e[10] + .5 * e[11], e[14] = .5 * e[14] + .5 * e[15]
                }(V), function(t) {
                  const e = t.elements; - 1 === e[11] ? (e[10] = -e[10] - 1, e[14] = -e[14]) : (e[10] = -e[10], e[14] = 1 - e[14])
                }(V), C.setValue(xt, "projectionMatrix", V)) : C.setValue(xt, "projectionMatrix", t.projectionMatrix), C.setValue(xt, "viewMatrix", t.matrixWorldInverse);
                const e = C.map.cameraPosition;
                void 0 !== e && e.setValue(xt, W.setFromMatrixPosition(t.matrixWorld)), K.logarithmicDepthBuffer && C.setValue(xt, "logDepthBufFC", 2 / (Math.log(t.far + 1) / Math.LN2)), (i.isMeshPhongMaterial || i.isMeshToonMaterial || i.isMeshLambertMaterial || i.isMeshBasicMaterial || i.isMeshStandardMaterial || i.isShaderMaterial) && C.setValue(xt, "isOrthographic", !0 === t.isOrthographicCamera), T !== t && (T = t, A = !0, R = !0)
              }
              if (r.isSkinnedMesh) {
                C.setOptional(xt, r, "bindMatrix"), C.setOptional(xt, r, "bindMatrixInverse");
                const t = r.skeleton;
                t && (null === t.boneTexture && t.computeBoneTexture(), C.setValue(xt, "boneTexture", t.boneTexture, tt))
              }
              r.isBatchedMesh && (C.setOptional(xt, r, "batchingTexture"), C.setValue(xt, "batchingTexture", r._matricesTexture, tt), C.setOptional(xt, r, "batchingIdTexture"), C.setValue(xt, "batchingIdTexture", r._indirectTexture, tt), C.setOptional(xt, r, "batchingColorTexture"), null !== r._colorsTexture && C.setValue(xt, "batchingColorTexture", r._colorsTexture, tt));
              const D = n.morphAttributes;
              var U, N;
              if (void 0 === D.position && void 0 === D.normal && void 0 === D.color || pt.update(r, n, M), (A || v.receiveShadow !== r.receiveShadow) && (v.receiveShadow = r.receiveShadow, C.setValue(xt, "receiveShadow", r.receiveShadow)), i.isMeshGouraudMaterial && null !== i.envMap && (P.envMap.value = l, P.flipEnvMap.value = l.isCubeTexture && !1 === l.isRenderTargetTexture ? -1 : 1), i.isMeshStandardMaterial && null === i.envMap && null !== e.environment && (P.envMapIntensity.value = e.environmentIntensity), A && (C.setValue(xt, "toneMappingExposure", x.toneMappingExposure), v.needsLights && (N = R, (U = P).ambientLightColor.needsUpdate = N, U.lightProbe.needsUpdate = N, U.directionalLights.needsUpdate = N, U.directionalLightShadows.needsUpdate = N, U.pointLights.needsUpdate = N, U.pointLightShadows.needsUpdate = N, U.spotLights.needsUpdate = N, U.spotLightShadows.needsUpdate = N, U.rectAreaLights.needsUpdate = N, U.hemisphereLights.needsUpdate = N), a && !0 === i.fog && ot.refreshFogUniforms(P, a), ot.refreshMaterialUniforms(P, i, I, L, g.state.transmissionRenderTarget[t.id]), Y_.upload(xt, Bt(v), P, tt)), i.isShaderMaterial && !0 === i.uniformsNeedUpdate && (Y_.upload(xt, Bt(v), P, tt), i.uniformsNeedUpdate = !1), i.isSpriteMaterial && C.setValue(xt, "center", r.center), C.setValue(xt, "modelViewMatrix", r.modelViewMatrix), C.setValue(xt, "normalMatrix", r.normalMatrix), C.setValue(xt, "modelMatrix", r.matrixWorld), i.isShaderMaterial || i.isRawShaderMaterial) {
                const t = i.uniformsGroups;
                for (let e = 0, n = t.length; e < n; e++) {
                  const n = t[e];
                  vt.update(n, M), vt.bind(n, M)
                }
              }
              return M
            }(t, e, n, i, r);
          Z.setMaterial(i, s);
          let l = n.index,
            c = 1;
          if (!0 === i.wireframe) {
            if (l = rt.getWireframeAttribute(n), void 0 === l) return;
            c = 2
          }
          const u = n.drawRange,
            h = n.attributes.position;
          let d = u.start * c,
            p = (u.start + u.count) * c;
          null !== a && (d = Math.max(d, a.start * c), p = Math.min(p, (a.start + a.count) * c)), null !== l ? (d = Math.max(d, 0), p = Math.min(p, l.count)) : null != h && (d = Math.max(d, 0), p = Math.min(p, h.count));
          const f = p - d;
          if (f < 0 || f === 1 / 0) return;
          let m;
          _t.setup(r, i, o, n, l);
          let _ = ft;
          if (null !== l && (m = it.get(l), _ = mt, _.setIndex(m)), r.isMesh) !0 === i.wireframe ? (Z.setLineWidth(i.wireframeLinewidth * Y()), _.setMode(xt.LINES)) : _.setMode(xt.TRIANGLES);
          else if (r.isLine) {
            let t = i.linewidth;
            void 0 === t && (t = 1), Z.setLineWidth(t * Y()), r.isLineSegments ? _.setMode(xt.LINES) : r.isLineLoop ? _.setMode(xt.LINE_LOOP) : _.setMode(xt.LINE_STRIP)
          } else r.isPoints ? _.setMode(xt.POINTS) : r.isSprite && _.setMode(xt.TRIANGLES);
          if (r.isBatchedMesh)
            if (null !== r._multiDrawInstances) nh("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."), _.renderMultiDrawInstances(r._multiDrawStarts, r._multiDrawCounts, r._multiDrawCount, r._multiDrawInstances);
            else if ($.get("WEBGL_multi_draw")) _.renderMultiDraw(r._multiDrawStarts, r._multiDrawCounts, r._multiDrawCount);
          else {
            const t = r._multiDrawStarts,
              e = r._multiDrawCounts,
              n = r._multiDrawCount,
              a = l ? it.get(l).bytesPerElement : 1,
              s = Q.get(i).currentProgram.getUniforms();
            for (let i = 0; i < n; i++) s.setValue(xt, "_gl_DrawID", i), _.render(t[i] / a, e[i])
          } else if (r.isInstancedMesh) _.renderInstances(d, f, r.count);
          else if (n.isInstancedBufferGeometry) {
            const t = void 0 !== n._maxInstanceCount ? n._maxInstanceCount : 1 / 0,
              e = Math.min(n.instanceCount, t);
            _.renderInstances(d, f, e)
          } else _.render(d, f)
        }, this.compile = function(t, e, n = null) {
          null === n && (n = t), g = ct.get(n), g.init(e), v.push(g), n.traverseVisible((function(t) {
            t.isLight && t.layers.test(e.layers) && (g.pushLight(t), t.castShadow && g.pushShadow(t))
          })), t !== n && t.traverseVisible((function(t) {
            t.isLight && t.layers.test(e.layers) && (g.pushLight(t), t.castShadow && g.pushShadow(t))
          })), g.setupLights();
          const i = new Set;
          return t.traverse((function(t) {
            if (!(t.isMesh || t.isPoints || t.isLine || t.isSprite)) return;
            const e = t.material;
            if (e)
              if (Array.isArray(e))
                for (let r = 0; r < e.length; r++) {
                  const a = e[r];
                  At(a, n, t), i.add(a)
                } else At(e, n, t), i.add(e)
          })), g = v.pop(), i
        }, this.compileAsync = function(t, e, n = null) {
          const i = this.compile(t, e, n);
          return new Promise((e => {
            function n() {
              i.forEach((function(t) {
                Q.get(t).currentProgram.isReady() && i.delete(t)
              })), 0 !== i.size ? setTimeout(n, 10) : e(t)
            }
            null !== $.get("KHR_parallel_shader_compile") ? n() : setTimeout(n, 10)
          }))
        };
        let Rt = null;

        function Ct() {
          Dt.stop()
        }

        function Pt() {
          Dt.start()
        }
        const Dt = new Vf;

        function Lt(t, e, n, i) {
          if (!1 === t.visible) return;
          if (t.layers.test(e.layers))
            if (t.isGroup) n = t.renderOrder;
            else if (t.isLOD) !0 === t.autoUpdate && t.update(e);
          else if (t.isLight) g.pushLight(t), t.castShadow && g.pushShadow(t);
          else if (t.isSprite) {
            if (!t.frustumCulled || z.intersectsSprite(t)) {
              i && X.setFromMatrixPosition(t.matrixWorld).applyMatrix4(G);
              const e = at.update(t),
                r = t.material;
              r.visible && m.push(t, e, r, n, X.z, null)
            }
          } else if ((t.isMesh || t.isLine || t.isPoints) && (!t.frustumCulled || z.intersectsObject(t))) {
            const e = at.update(t),
              r = t.material;
            if (i && (void 0 !== t.boundingSphere ? (null === t.boundingSphere && t.computeBoundingSphere(), X.copy(t.boundingSphere.center)) : (null === e.boundingSphere && e.computeBoundingSphere(), X.copy(e.boundingSphere.center)), X.applyMatrix4(t.matrixWorld).applyMatrix4(G)), Array.isArray(r)) {
              const i = e.groups;
              for (let a = 0, s = i.length; a < s; a++) {
                const s = i[a],
                  o = r[s.materialIndex];
                o && o.visible && m.push(t, e, o, n, X.z, s)
              }
            } else r.visible && m.push(t, e, r, n, X.z, null)
          }
          const r = t.children;
          for (let t = 0, a = r.length; t < a; t++) Lt(r[t], e, n, i)
        }

        function It(t, e, n, i) {
          const r = t.opaque,
            a = t.transmissive,
            s = t.transparent;
          g.setupLightsView(n), !0 === k && ut.setGlobalState(x.clippingPlanes, n), i && Z.viewport(w.copy(i)), r.length > 0 && Nt(r, e, n), a.length > 0 && Nt(a, e, n), s.length > 0 && Nt(s, e, n), Z.buffers.depth.setTest(!0), Z.buffers.depth.setMask(!0), Z.buffers.color.setMask(!0), Z.setPolygonOffset(!1)
        }

        function Ut(t, e, n, i) {
          if (null !== (!0 === n.isScene ? n.overrideMaterial : null)) return;
          void 0 === g.state.transmissionRenderTarget[i.id] && (g.state.transmissionRenderTarget[i.id] = new lg(1, 1, {
            generateMipmaps: !0,
            type: $.has("EXT_color_buffer_half_float") || $.has("EXT_color_buffer_float") ? Zh : jh,
            minFilter: Xh,
            samples: 4,
            stencilBuffer: r,
            resolveDepthBuffer: !1,
            resolveStencilBuffer: !1,
            colorSpace: mp.workingColorSpace
          }));
          const a = g.state.transmissionRenderTarget[i.id],
            s = i.viewport || w;
          a.setSize(s.z * x.transmissionResolutionScale, s.w * x.transmissionResolutionScale);
          const o = x.getRenderTarget();
          x.setRenderTarget(a), x.getClearColor(C), P = x.getClearAlpha(), P < 1 && x.setClearColor(16777215, .5), x.clear(), q && dt.render(n);
          const l = x.toneMapping;
          x.toneMapping = 0;
          const c = i.viewport;
          if (void 0 !== i.viewport && (i.viewport = void 0), g.setupLightsView(i), !0 === k && ut.setGlobalState(x.clippingPlanes, i), Nt(t, n, i), tt.updateMultisampleRenderTarget(a), tt.updateRenderTargetMipmap(a), !1 === $.has("WEBGL_multisampled_render_to_texture")) {
            let t = !1;
            for (let r = 0, a = e.length; r < a; r++) {
              const a = e[r],
                s = a.object,
                o = a.geometry,
                l = a.material,
                c = a.group;
              if (2 === l.side && s.layers.test(i.layers)) {
                const e = l.side;
                l.side = 1, l.needsUpdate = !0, Ot(s, n, i, o, l, c), l.side = e, l.needsUpdate = !0, t = !0
              }
            }!0 === t && (tt.updateMultisampleRenderTarget(a), tt.updateRenderTargetMipmap(a))
          }
          x.setRenderTarget(o), x.setClearColor(C, P), void 0 !== c && (i.viewport = c), x.toneMapping = l
        }

        function Nt(t, e, n) {
          const i = !0 === e.isScene ? e.overrideMaterial : null;
          for (let r = 0, a = t.length; r < a; r++) {
            const a = t[r],
              s = a.object,
              o = a.geometry,
              l = null === i ? a.material : i,
              c = a.group;
            s.layers.test(n.layers) && Ot(s, e, n, o, l, c)
          }
        }

        function Ot(t, e, n, i, r, a) {
          t.onBeforeRender(x, e, n, i, r, a), t.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse, t.matrixWorld), t.normalMatrix.getNormalMatrix(t.modelViewMatrix), r.onBeforeRender(x, e, n, i, t, a), !0 === r.transparent && 2 === r.side && !1 === r.forceSinglePass ? (r.side = 1, r.needsUpdate = !0, x.renderBufferDirect(n, e, i, r, t, a), r.side = 0, r.needsUpdate = !0, x.renderBufferDirect(n, e, i, r, t, a), r.side = 2) : x.renderBufferDirect(n, e, i, r, t, a), t.onAfterRender(x, e, n, i, r, a)
        }

        function Ft(t, e, n) {
          !0 !== e.isScene && (e = j);
          const i = Q.get(t),
            r = g.state.lights,
            a = g.state.shadowsArray,
            s = r.state.version,
            o = st.getParameters(t, r.state, a, e, n),
            l = st.getProgramCacheKey(o);
          let c = i.programs;
          i.environment = t.isMeshStandardMaterial ? e.environment : null, i.fog = e.fog, i.envMap = (t.isMeshStandardMaterial ? nt : et).get(t.envMap || i.environment), i.envMapRotation = null !== i.environment && null === t.envMap ? e.environmentRotation : t.envMapRotation, void 0 === c && (t.addEventListener("dispose", wt), c = new Map, i.programs = c);
          let u = c.get(l);
          if (void 0 !== u) {
            if (i.currentProgram === u && i.lightsStateVersion === s) return zt(t, o), u
          } else o.uniforms = st.getUniforms(t), t.onBeforeCompile(o, x), u = st.acquireProgram(o, l), c.set(l, u), i.uniforms = o.uniforms;
          const h = i.uniforms;
          return (t.isShaderMaterial || t.isRawShaderMaterial) && !0 !== t.clipping || (h.clippingPlanes = ut.uniform), zt(t, o), i.needsLights = function(t) {
            return t.isMeshLambertMaterial || t.isMeshToonMaterial || t.isMeshPhongMaterial || t.isMeshStandardMaterial || t.isShadowMaterial || t.isShaderMaterial && !0 === t.lights
          }(t), i.lightsStateVersion = s, i.needsLights && (h.ambientLightColor.value = r.state.ambient, h.lightProbe.value = r.state.probe, h.directionalLights.value = r.state.directional, h.directionalLightShadows.value = r.state.directionalShadow, h.spotLights.value = r.state.spot, h.spotLightShadows.value = r.state.spotShadow, h.rectAreaLights.value = r.state.rectArea, h.ltc_1.value = r.state.rectAreaLTC1, h.ltc_2.value = r.state.rectAreaLTC2, h.pointLights.value = r.state.point, h.pointLightShadows.value = r.state.pointShadow, h.hemisphereLights.value = r.state.hemi, h.directionalShadowMap.value = r.state.directionalShadowMap, h.directionalShadowMatrix.value = r.state.directionalShadowMatrix, h.spotShadowMap.value = r.state.spotShadowMap, h.spotLightMatrix.value = r.state.spotLightMatrix, h.spotLightMap.value = r.state.spotLightMap, h.pointShadowMap.value = r.state.pointShadowMap, h.pointShadowMatrix.value = r.state.pointShadowMatrix), i.currentProgram = u, i.uniformsList = null, u
        }

        function Bt(t) {
          if (null === t.uniformsList) {
            const e = t.currentProgram.getUniforms();
            t.uniformsList = Y_.seqWithValue(e.seq, t.uniforms)
          }
          return t.uniformsList
        }

        function zt(t, e) {
          const n = Q.get(t);
          n.outputColorSpace = e.outputColorSpace, n.batching = e.batching, n.batchingColor = e.batchingColor, n.instancing = e.instancing, n.instancingColor = e.instancingColor, n.instancingMorph = e.instancingMorph, n.skinning = e.skinning, n.morphTargets = e.morphTargets, n.morphNormals = e.morphNormals, n.morphColors = e.morphColors, n.morphTargetsCount = e.morphTargetsCount, n.numClippingPlanes = e.numClippingPlanes, n.numIntersection = e.numClipIntersection, n.vertexAlphas = e.vertexAlphas, n.vertexTangents = e.vertexTangents, n.toneMapping = e.toneMapping
        }
        Dt.setAnimationLoop((function(t) {
          Rt && Rt(t)
        })), "undefined" != typeof self && Dt.setContext(self), this.setAnimationLoop = function(t) {
          Rt = t, Mt.setAnimationLoop(t), null === t ? Dt.stop() : Dt.start()
        }, Mt.addEventListener("sessionstart", Ct), Mt.addEventListener("sessionend", Pt), this.render = function(t, e) {
          if (void 0 !== e && !0 !== e.isCamera) return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
          if (!0 === y) return;
          if (!0 === t.matrixWorldAutoUpdate && t.updateMatrixWorld(), null === e.parent && !0 === e.matrixWorldAutoUpdate && e.updateMatrixWorld(), !0 === Mt.enabled && !0 === Mt.isPresenting && (!0 === Mt.cameraAutoUpdate && Mt.updateCamera(e), e = Mt.getCamera()), !0 === t.isScene && t.onBeforeRender(x, t, e, S), g = ct.get(t, v.length), g.init(e), v.push(g), G.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse), z.setFromProjectionMatrix(G), H = this.localClippingEnabled, k = ut.init(this.clippingPlanes, H), m = lt.get(t, _.length), m.init(), _.push(m), !0 === Mt.enabled && !0 === Mt.isPresenting) {
            const t = x.xr.getDepthSensingMesh();
            null !== t && Lt(t, e, -1 / 0, x.sortObjects)
          }
          Lt(t, e, 0, x.sortObjects), m.finish(), !0 === x.sortObjects && m.sort(U, N), q = !1 === Mt.enabled || !1 === Mt.isPresenting || !1 === Mt.hasDepthSensing(), q && dt.addToRenderList(m, t), this.info.render.frame++, !0 === k && ut.beginShadows();
          const n = g.state.shadowsArray;
          ht.render(n, t, e), !0 === k && ut.endShadows(), !0 === this.info.autoReset && this.info.reset();
          const i = m.opaque,
            r = m.transmissive;
          if (g.setupLights(), e.isArrayCamera) {
            const n = e.cameras;
            if (r.length > 0)
              for (let e = 0, a = n.length; e < a; e++) Ut(i, r, t, n[e]);
            q && dt.render(t);
            for (let e = 0, i = n.length; e < i; e++) {
              const i = n[e];
              It(m, t, i, i.viewport)
            }
          } else r.length > 0 && Ut(i, r, t, e), q && dt.render(t), It(m, t, e);
          null !== S && 0 === M && (tt.updateMultisampleRenderTarget(S), tt.updateRenderTargetMipmap(S)), !0 === t.isScene && t.onAfterRender(x, t, e), _t.resetDefaultState(), E = -1, T = null, v.pop(), v.length > 0 ? (g = v[v.length - 1], !0 === k && ut.setGlobalState(x.clippingPlanes, g.state.camera)) : g = null, _.pop(), m = _.length > 0 ? _[_.length - 1] : null
        }, this.getActiveCubeFace = function() {
          return b
        }, this.getActiveMipmapLevel = function() {
          return M
        }, this.getRenderTarget = function() {
          return S
        }, this.setRenderTargetTextures = function(t, e, n) {
          Q.get(t.texture).__webglTexture = e, Q.get(t.depthTexture).__webglTexture = n;
          const i = Q.get(t);
          i.__hasExternalTextures = !0, i.__autoAllocateDepthBuffer = void 0 === n, i.__autoAllocateDepthBuffer || !0 === $.has("WEBGL_multisampled_render_to_texture") && (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"), i.__useRenderToTexture = !1)
        }, this.setRenderTargetFramebuffer = function(t, e) {
          const n = Q.get(t);
          n.__webglFramebuffer = e, n.__useDefaultFramebuffer = void 0 === e
        };
        const kt = xt.createFramebuffer();
        this.setRenderTarget = function(t, e = 0, n = 0) {
          S = t, b = e, M = n;
          let i = !0,
            r = null,
            a = !1,
            s = !1;
          if (t) {
            const o = Q.get(t);
            if (void 0 !== o.__useDefaultFramebuffer) Z.bindFramebuffer(xt.FRAMEBUFFER, null), i = !1;
            else if (void 0 === o.__webglFramebuffer) tt.setupRenderTarget(t);
            else if (o.__hasExternalTextures) tt.rebindTextures(t, Q.get(t.texture).__webglTexture, Q.get(t.depthTexture).__webglTexture);
            else if (t.depthBuffer) {
              const e = t.depthTexture;
              if (o.__boundDepthTexture !== e) {
                if (null !== e && Q.has(e) && (t.width !== e.image.width || t.height !== e.image.height)) throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");
                tt.setupDepthRenderbuffer(t)
              }
            }
            const l = t.texture;
            (l.isData3DTexture || l.isDataArrayTexture || l.isCompressedArrayTexture) && (s = !0);
            const c = Q.get(t).__webglFramebuffer;
            t.isWebGLCubeRenderTarget ? (r = Array.isArray(c[e]) ? c[e][n] : c[e], a = !0) : r = t.samples > 0 && !1 === tt.useMultisampledRTT(t) ? Q.get(t).__webglMultisampledFramebuffer : Array.isArray(c) ? c[n] : c, w.copy(t.viewport), A.copy(t.scissor), R = t.scissorTest
          } else w.copy(O).multiplyScalar(I).floor(), A.copy(F).multiplyScalar(I).floor(), R = B;
          if (0 !== n && (r = kt), Z.bindFramebuffer(xt.FRAMEBUFFER, r) && i && Z.drawBuffers(t, r), Z.viewport(w), Z.scissor(A), Z.setScissorTest(R), a) {
            const i = Q.get(t.texture);
            xt.framebufferTexture2D(xt.FRAMEBUFFER, xt.COLOR_ATTACHMENT0, xt.TEXTURE_CUBE_MAP_POSITIVE_X + e, i.__webglTexture, n)
          } else if (s) {
            const i = Q.get(t.texture),
              r = e;
            xt.framebufferTextureLayer(xt.FRAMEBUFFER, xt.COLOR_ATTACHMENT0, i.__webglTexture, n, r)
          } else if (null !== t && 0 !== n) {
            const e = Q.get(t.texture);
            xt.framebufferTexture2D(xt.FRAMEBUFFER, xt.COLOR_ATTACHMENT0, xt.TEXTURE_2D, e.__webglTexture, n)
          }
          E = -1
        }, this.readRenderTargetPixels = function(t, e, n, i, r, a, s) {
          if (!t || !t.isWebGLRenderTarget) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
          let o = Q.get(t).__webglFramebuffer;
          if (t.isWebGLCubeRenderTarget && void 0 !== s && (o = o[s]), o) {
            Z.bindFramebuffer(xt.FRAMEBUFFER, o);
            try {
              const s = t.texture,
                o = s.format,
                l = s.type;
              if (!K.textureFormatReadable(o)) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
              if (!K.textureTypeReadable(l)) return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
              e >= 0 && e <= t.width - i && n >= 0 && n <= t.height - r && xt.readPixels(e, n, i, r, gt.convert(o), gt.convert(l), a)
            } finally {
              const t = null !== S ? Q.get(S).__webglFramebuffer : null;
              Z.bindFramebuffer(xt.FRAMEBUFFER, t)
            }
          }
        }, this.readRenderTargetPixelsAsync = async function(t, e, n, i, r, a, s) {
          if (!t || !t.isWebGLRenderTarget) throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
          let o = Q.get(t).__webglFramebuffer;
          if (t.isWebGLCubeRenderTarget && void 0 !== s && (o = o[s]), o) {
            const s = t.texture,
              l = s.format,
              c = s.type;
            if (!K.textureFormatReadable(l)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
            if (!K.textureTypeReadable(c)) throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
            if (e >= 0 && e <= t.width - i && n >= 0 && n <= t.height - r) {
              Z.bindFramebuffer(xt.FRAMEBUFFER, o);
              const t = xt.createBuffer();
              xt.bindBuffer(xt.PIXEL_PACK_BUFFER, t), xt.bufferData(xt.PIXEL_PACK_BUFFER, a.byteLength, xt.STREAM_READ), xt.readPixels(e, n, i, r, gt.convert(l), gt.convert(c), 0);
              const s = null !== S ? Q.get(S).__webglFramebuffer : null;
              Z.bindFramebuffer(xt.FRAMEBUFFER, s);
              const u = xt.fenceSync(xt.SYNC_GPU_COMMANDS_COMPLETE, 0);
              return xt.flush(), await
              function(t, e) {
                return new Promise((function(n, i) {
                  setTimeout((function r() {
                    switch (t.clientWaitSync(e, t.SYNC_FLUSH_COMMANDS_BIT, 0)) {
                      case t.WAIT_FAILED:
                        i();
                        break;
                      case t.TIMEOUT_EXPIRED:
                        setTimeout(r, 4);
                        break;
                      default:
                        n()
                    }
                  }), 4)
                }))
              }(xt, u), xt.bindBuffer(xt.PIXEL_PACK_BUFFER, t), xt.getBufferSubData(xt.PIXEL_PACK_BUFFER, 0, a), xt.deleteBuffer(t), xt.deleteSync(u), a
            }
            throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")
          }
        }, this.copyFramebufferToTexture = function(t, e = null, n = 0) {
          !0 !== t.isTexture && (nh("WebGLRenderer: copyFramebufferToTexture function signature has changed."), e = arguments[0] || null, t = arguments[1]);
          const i = Math.pow(2, -n),
            r = Math.floor(t.image.width * i),
            a = Math.floor(t.image.height * i),
            s = null !== e ? e.x : 0,
            o = null !== e ? e.y : 0;
          tt.setTexture2D(t, 0), xt.copyTexSubImage2D(xt.TEXTURE_2D, n, 0, 0, s, o, r, a), Z.unbindTexture()
        };
        const Ht = xt.createFramebuffer(),
          Vt = xt.createFramebuffer();
        this.copyTextureToTexture = function(t, e, n = null, i = null, r = 0, a = null) {
          let s, o, l, c, u, h, d, p, f;
          !0 !== t.isTexture && (nh("WebGLRenderer: copyTextureToTexture function signature has changed."), i = arguments[0] || null, t = arguments[1], e = arguments[2], a = arguments[3] || 0, n = null), null === a && (0 !== r ? (nh("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."), a = r, r = 0) : a = 0);
          const m = t.isCompressedTexture ? t.mipmaps[a] : t.image;
          if (null !== n) s = n.max.x - n.min.x, o = n.max.y - n.min.y, l = n.isBox3 ? n.max.z - n.min.z : 1, c = n.min.x, u = n.min.y, h = n.isBox3 ? n.min.z : 0;
          else {
            const e = Math.pow(2, -r);
            s = Math.floor(m.width * e), o = Math.floor(m.height * e), l = t.isDataArrayTexture ? m.depth : t.isData3DTexture ? Math.floor(m.depth * e) : 1, c = 0, u = 0, h = 0
          }
          null !== i ? (d = i.x, p = i.y, f = i.z) : (d = 0, p = 0, f = 0);
          const g = gt.convert(e.format),
            _ = gt.convert(e.type);
          let v;
          e.isData3DTexture ? (tt.setTexture3D(e, 0), v = xt.TEXTURE_3D) : e.isDataArrayTexture || e.isCompressedArrayTexture ? (tt.setTexture2DArray(e, 0), v = xt.TEXTURE_2D_ARRAY) : (tt.setTexture2D(e, 0), v = xt.TEXTURE_2D), xt.pixelStorei(xt.UNPACK_FLIP_Y_WEBGL, e.flipY), xt.pixelStorei(xt.UNPACK_PREMULTIPLY_ALPHA_WEBGL, e.premultiplyAlpha), xt.pixelStorei(xt.UNPACK_ALIGNMENT, e.unpackAlignment);
          const x = xt.getParameter(xt.UNPACK_ROW_LENGTH),
            y = xt.getParameter(xt.UNPACK_IMAGE_HEIGHT),
            b = xt.getParameter(xt.UNPACK_SKIP_PIXELS),
            M = xt.getParameter(xt.UNPACK_SKIP_ROWS),
            S = xt.getParameter(xt.UNPACK_SKIP_IMAGES);
          xt.pixelStorei(xt.UNPACK_ROW_LENGTH, m.width), xt.pixelStorei(xt.UNPACK_IMAGE_HEIGHT, m.height), xt.pixelStorei(xt.UNPACK_SKIP_PIXELS, c), xt.pixelStorei(xt.UNPACK_SKIP_ROWS, u), xt.pixelStorei(xt.UNPACK_SKIP_IMAGES, h);
          const E = t.isDataArrayTexture || t.isData3DTexture,
            T = e.isDataArrayTexture || e.isData3DTexture;
          if (t.isDepthTexture) {
            const n = Q.get(t),
              i = Q.get(e),
              m = Q.get(n.__renderTarget),
              g = Q.get(i.__renderTarget);
            Z.bindFramebuffer(xt.READ_FRAMEBUFFER, m.__webglFramebuffer), Z.bindFramebuffer(xt.DRAW_FRAMEBUFFER, g.__webglFramebuffer);
            for (let n = 0; n < l; n++) E && (xt.framebufferTextureLayer(xt.READ_FRAMEBUFFER, xt.COLOR_ATTACHMENT0, Q.get(t).__webglTexture, r, h + n), xt.framebufferTextureLayer(xt.DRAW_FRAMEBUFFER, xt.COLOR_ATTACHMENT0, Q.get(e).__webglTexture, a, f + n)), xt.blitFramebuffer(c, u, s, o, d, p, s, o, xt.DEPTH_BUFFER_BIT, xt.NEAREST);
            Z.bindFramebuffer(xt.READ_FRAMEBUFFER, null), Z.bindFramebuffer(xt.DRAW_FRAMEBUFFER, null)
          } else if (0 !== r || t.isRenderTargetTexture || Q.has(t)) {
            const n = Q.get(t),
              i = Q.get(e);
            Z.bindFramebuffer(xt.READ_FRAMEBUFFER, Ht), Z.bindFramebuffer(xt.DRAW_FRAMEBUFFER, Vt);
            for (let t = 0; t < l; t++) E ? xt.framebufferTextureLayer(xt.READ_FRAMEBUFFER, xt.COLOR_ATTACHMENT0, n.__webglTexture, r, h + t) : xt.framebufferTexture2D(xt.READ_FRAMEBUFFER, xt.COLOR_ATTACHMENT0, xt.TEXTURE_2D, n.__webglTexture, r), T ? xt.framebufferTextureLayer(xt.DRAW_FRAMEBUFFER, xt.COLOR_ATTACHMENT0, i.__webglTexture, a, f + t) : xt.framebufferTexture2D(xt.DRAW_FRAMEBUFFER, xt.COLOR_ATTACHMENT0, xt.TEXTURE_2D, i.__webglTexture, a), 0 !== r ? xt.blitFramebuffer(c, u, s, o, d, p, s, o, xt.COLOR_BUFFER_BIT, xt.NEAREST) : T ? xt.copyTexSubImage3D(v, a, d, p, f + t, c, u, s, o) : xt.copyTexSubImage2D(v, a, d, p, c, u, s, o);
            Z.bindFramebuffer(xt.READ_FRAMEBUFFER, null), Z.bindFramebuffer(xt.DRAW_FRAMEBUFFER, null)
          } else T ? t.isDataTexture || t.isData3DTexture ? xt.texSubImage3D(v, a, d, p, f, s, o, l, g, _, m.data) : e.isCompressedArrayTexture ? xt.compressedTexSubImage3D(v, a, d, p, f, s, o, l, g, m.data) : xt.texSubImage3D(v, a, d, p, f, s, o, l, g, _, m) : t.isDataTexture ? xt.texSubImage2D(xt.TEXTURE_2D, a, d, p, s, o, g, _, m.data) : t.isCompressedTexture ? xt.compressedTexSubImage2D(xt.TEXTURE_2D, a, d, p, m.width, m.height, g, m.data) : xt.texSubImage2D(xt.TEXTURE_2D, a, d, p, s, o, g, _, m);
          xt.pixelStorei(xt.UNPACK_ROW_LENGTH, x), xt.pixelStorei(xt.UNPACK_IMAGE_HEIGHT, y), xt.pixelStorei(xt.UNPACK_SKIP_PIXELS, b), xt.pixelStorei(xt.UNPACK_SKIP_ROWS, M), xt.pixelStorei(xt.UNPACK_SKIP_IMAGES, S), 0 === a && e.generateMipmaps && xt.generateMipmap(v), Z.unbindTexture()
        }, this.copyTextureToTexture3D = function(t, e, n = null, i = null, r = 0) {
          return !0 !== t.isTexture && (nh("WebGLRenderer: copyTextureToTexture3D function signature has changed."), n = arguments[0] || null, i = arguments[1] || null, t = arguments[2], e = arguments[3], r = arguments[4] || 0), nh('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'), this.copyTextureToTexture(t, e, n, i, r)
        }, this.initRenderTarget = function(t) {
          void 0 === Q.get(t).__webglFramebuffer && tt.setupRenderTarget(t)
        }, this.initTexture = function(t) {
          t.isCubeTexture ? tt.setTextureCube(t, 0) : t.isData3DTexture ? tt.setTexture3D(t, 0) : t.isDataArrayTexture || t.isCompressedArrayTexture ? tt.setTexture2DArray(t, 0) : tt.setTexture2D(t, 0), Z.unbindTexture()
        }, this.resetState = function() {
          b = 0, M = 0, S = null, Z.reset(), _t.reset()
        }, "undefined" != typeof __THREE_DEVTOOLS__ && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {
          detail: this
        }))
      }
      get coordinateSystem() {
        return Qd
      }
      get outputColorSpace() {
        return this._outputColorSpace
      }
      set outputColorSpace(t) {
        this._outputColorSpace = t;
        const e = this.getContext();
        e.drawingBufferColorspace = mp._getDrawingBufferColorSpace(t), e.unpackColorSpace = mp._getUnpackColorSpace()
      }
    }
    class Yv {
      constructor() {
        this.$container = document.getElementById("Background"), this.setConfig(), this.scene = new df, this.camera = new ff(-1, 1, 1, -1, .1, 1e4), this.camera.position.set(0, 0, 10), this.renderer = new qv({
          canvas: this.$container.querySelector("canvas"),
          alpha: !0
        }), this.renderer.setSize(Lp.width, Lp.height), this.renderer.setPixelRatio(Lp.dpr)
      }
      setConfig() {
        const {
          width: t,
          height: e
        } = this.$container.getBoundingClientRect();
        Lp.dpr = Math.min(window.devicePixelRatio, 1.5), Lp.width = t, Lp.height = e, Lp.halfWidth = Lp.width / 2, Lp.halfHeight = Lp.height / 2, Lp.aspectRatio = Lp.width / Lp.height
      }
      resizeScene() {
        window.innerWidth >= window.innerHeight ? (this.camera.left = -1, this.camera.right = 1, this.camera.top = 1 / Lp.aspectRatio, this.camera.bottom = -1 / Lp.aspectRatio, Lp.sceneWidth = 2, Lp.sceneHeight = 2 / Lp.aspectRatio) : (this.camera.left = -1 * Lp.aspectRatio, this.camera.right = 1 * Lp.aspectRatio, this.camera.top = 1, this.camera.bottom = -1, Lp.sceneWidth = 2 * Lp.aspectRatio, Lp.sceneHeight = 2), this.camera.aspect = Lp.aspectRatio, this.camera.updateProjectionMatrix(), this.renderer.setSize(Lp.width, Lp.height)
      }
    }
    class $v extends pm {
      constructor(t) {
        super(t), this.isRawShaderMaterial = !0, this.type = "RawShaderMaterial"
      }
    }
    var Kv = n(34),
      Zv = n.n(Kv),
      Jv = n(117),
      Qv = n.n(Jv);
    class tx extends Ym {
      constructor({
        grain: t,
        blur: e
      }) {
        super(), this.geometry = new sm(3, 3), this.material = new $v({
          uniforms: {
            grainTex: {
              value: t
            },
            blurTex: {
              value: e
            },
            time: {
              value: 0
            },
            seed: {
              value: 100 * Math.random()
            },
            back: {
              value: new Up(.05, .05, .05)
            },
            style: {
              value: 0
            },
            param1: {
              value: 0
            },
            param2: {
              value: 0
            },
            param3: {
              value: 0
            }
          },
          vertexShader: Zv(),
          fragmentShader: Qv(),
          transparent: !0
        }), this.position.x = -.8, this.position.y = -.5, this.position.z = 1
      }
      changeStyle(t) {
        this.material.uniforms.style.value = t
      }
      update(t) {
        this.material.uniforms.time.value = t, this.material.uniforms.back.value.x = Lp.backColor.r, this.material.uniforms.back.value.y = Lp.backColor.g, this.material.uniforms.back.value.z = Lp.backColor.b, this.material.uniforms.param1.value = Lp.params.param1, this.material.uniforms.param2.value = Lp.params.param2, this.material.uniforms.param3.value = Lp.params.param3
      }
    }
    const ex = new class extends Yv {
        constructor() {
          super(), this.rect = null, this.circle = null, this.isReady = !1, Lp.backColor = new Pp(.05, .05, .05), Lp.params = {
            param1: 1,
            param2: .05,
            param3: .2
          }
        }
        async init() {
          const t = new Tp,
            e = [t.loadAsync("/assets/texture/grain.webp"), t.loadAsync("/assets/texture/blur.webp")],
            n = await Promise.all(e);
          n[0].minFilter = kh, n[0].magFilter = kh, n[0].generateMipmaps = !1, n[1].minFilter = kh, n[1].magFilter = kh, n[1].generateMipmaps = !1, this.circle = new tx({
            grain: n[0],
            blur: n[1]
          }), this.scene.add(this.circle), this.resize(), this.isReady = !0
        }
        changeTheme(t) {
          "dark" === t ? ji.to(Lp.backColor, {
            r: .05,
            g: .05,
            b: .05,
            duration: 1.6
          }) : ji.to(Lp.backColor, {
            r: .9,
            g: .9,
            b: .9,
            duration: 1.6
          })
        }
        changeStyle(t) {
          this.circle.changeStyle("mono" === t ? 1 : 0)
        }
        resize() {
          this.setConfig(), this.resizeScene()
        }
        update({
          time: t
        }) {
          this.isReady && (this.circle.update(t), this.renderer.render(this.scene, this.camera))
        }
      },
      nx = {
        theme: "dark",
        fontStyle: "sans-serif",
        isTransitioning: !1,
        pagePaths: ["/", "/projects/", "/info/", "/contact/", "/faq/", "/copycats/"],
        currentPath: null,
        init() {
          this.$page = document.getElementById("Page"), this.pages = {
            "/": document.querySelector('[data-page="home"]'),
            "/projects/": document.querySelector('[data-page="projects"]'),
            "/info/": document.querySelector('[data-page="info"]'),
            "/contact/": document.querySelector('[data-page="contact"]'),
            "/faq/": document.querySelector('[data-page="faq"]'),
            "/copycats/": document.querySelector('[data-page="copycats"]')
          };
          const t = window.matchMedia("(prefers-color-scheme: dark)");
          this.theme = t.matches ? "dark" : "light", this.scroll = new ju("vertical", {
            strictArea: !0
          }), this.scroll.setTargetArea(document.getElementById("Page")), this.initAnalytics(), this.showMessagesOnConsole(), this.changeTheme(this.theme), this.updateView(), this.enter(), document.querySelectorAll("a").forEach((t => {
            "_blank" !== t.getAttribute("target") && (t.onclick = e => {
              e.preventDefault(), window.history.pushState(null, "", t.href), this.updateView()
            })
          })), window.addEventListener("popstate", (() => {
            this.updateView()
          }))
        },
        initAnalytics() {
          const t = Ec({
            apiKey: "AIzaSyD5988Ze7x2V6BmDjDufJRJ6AiN-BOpY8U",
            authDomain: "p5aholic-website.firebaseapp.com",
            databaseURL: "https://p5aholic-website.firebaseio.com",
            projectId: "p5aholic-website",
            storageBucket: "p5aholic-website.appspot.com",
            messagingSenderId: "576867660128",
            appId: "1:576867660128:web:05dac81a0e5c812fe16e05",
            measurementId: "G-6V4D6GVTWB"
          });
          this.analytics = function(t = function(t = fc) {
            const e = gc.get(t);
            if (!e && t === fc && Qo()) return Ec();
            if (!e) throw Mc.create("no-app", {
              appName: t
            });
            return e
          }()) {
            const e = bc(t = cl(t), gu);
            return e.isInitialized() ? e.getImmediate() : function(t, e = {}) {
              const n = bc(t, gu);
              if (n.isInitialized()) {
                const t = n.getImmediate();
                if (sl(e, n.getOptions())) return t;
                throw xu.create("already-initialized")
              }
              return n.initialize({
                options: e
              })
            }(t)
          }(t), zu(this.analytics, "domain_event", {
            domain: window.location.hostname
          })
        },
        logPageViewEvent() {
          zu(this.analytics, "page_view", {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname
          })
        },
        resize() {
          this.scroll.resize()
        },
        update(t) {
          this.isTransitioning || this.scroll.update(t.deltaTime)
        },
        toggleTheme() {
          "dark" === this.theme ? this.changeTheme("light") : this.changeTheme("dark")
        },
        changeTheme(t) {
          "dark" === t ? (this.$page.classList.add("is-dark"), document.documentElement.style.setProperty("--c-bg", "hsl(0, 0%, 5%)"), document.documentElement.style.setProperty("--c-text", "hsl(0, 0%, 95%)")) : (this.$page.classList.remove("is-dark"), document.documentElement.style.setProperty("--c-bg", "hsl(0, 0%, 90%)"), document.documentElement.style.setProperty("--c-text", "hsl(0, 0%, 10%)")), this.theme = t, ex.changeTheme(t)
        },
        toggleFontStyle() {
          "sans-serif" === this.fontStyle ? (this.fontStyle = "mono", document.body.classList.add("is-monospaced")) : (this.fontStyle = "sans-serif", document.body.classList.remove("is-monospaced")), ex.changeStyle(this.fontStyle)
        },
        async enter() {
          const t = document.getElementById("EnterView"),
            e = t.querySelector("._t1"),
            n = t.querySelector("._t2");
          await qu(1), ji.to(e, {
            opacity: 0,
            duration: .6
          }), ji.to(n, {
            opacity: 0,
            duration: .6,
            delay: .15
          }), await qu(.6), t.style.pointerEvents = "none", ji.to(t, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
              t.remove()
            }
          })
        },
        updateView() {
          const t = window.location.pathname;
          this.pagePaths.includes(t) ? this.switchPage(t) : this.switchPage("/"), this.logPageViewEvent()
        },
        async switchPage(t) {
          this.isTransitioning = !0, this.currentPath && (this.hidePage(this.pages[this.currentPath]), await qu(.3)), this.scroll.reset(), this.isTransitioning = !1, this.showPage(this.pages[t]), this.currentPath = t
        },
        showPage(t) {
          t.style.display = "block", t.classList.remove("is-leaving"), ji.fromTo(t, {
            opacity: 0
          }, {
            opacity: 1,
            duration: .9
          })
        },
        hidePage(t) {
          t.classList.add("is-leaving"), ji.to(t, {
            opacity: 0,
            duration: .3,
            onComplete: () => {
              t.style.display = "none", t.classList.remove("is-leaving")
            }
          })
        },
        showMessagesOnConsole() {
          console.log("%cNotice:", "font-size: 20px; font-weight: bold;"), console.log("%cUnauthorized copying or reuse of the source code or content of this website is prohibited. These actions are a violation of copyright laws and may result in legal action. Please respect the intellectual property rights of the creators and refrain from using the code without permission. (Durai Lingam, p5aholic.me)", "font-size: 14px; line-height: 2;"), console.log("%cIf this message appears on a domain other than p5aholic.me, the site is using p5aholic.me's source code without permission and may be a copyright infringement. (Durai Lingam, p5aholic.me)", "font-size: 14px; line-height: 2;")
        }
      },
      ix = new class {
        constructor() {}
        init() {
          window.Alpine = qo, qo.store("app", nx), qo.start(), ex.init(), this.resizeMng = new $i, this.resizeMng.setSizeFunc((() => ({
            width: window.innerWidth,
            height: window.innerHeight
          }))), this.resize(), Yi.add(this.update.bind(this))
        }
        resize() {
          const t = document.documentElement,
            e = .01 * t.clientWidth,
            n = .01 * t.clientHeight;
          document.documentElement.style.setProperty("--vw", `${e}px`), document.documentElement.style.setProperty("--vh", `${n}px`), document.documentElement.style.setProperty("--vmax", `${Math.max(e,n)}px`), document.documentElement.style.setProperty("--vmin", `${Math.min(e,n)}px`), ex.resize(), qo.store("app").resize()
        }
        update(t) {
          this.resizeMng.check() && this.resize(), qo.store("app").update(t), ex.update(t)
        }
      };
    document.addEventListener("DOMContentLoaded", (() => {
      ! function() {
        const t = document.querySelector('meta[name="viewport"]');

        function e() {
          const e = window.outerWidth > 375 ? "width=device-width,initial-scale=1" : "width=375";
          t.getAttribute("content") !== e && t.setAttribute("content", e)
        }
        window.addEventListener("resize", e), e()
      }(), ix.init()
    }))
  })()
})();
