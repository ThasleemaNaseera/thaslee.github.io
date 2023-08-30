var paper = function(u, q) {
    var z = (u = u || require("./node/self.js")).window,
        k = u.document,
        V = new function() {
            var s = /^(statics|enumerable|beans|preserve)$/,
                t = [],
                n = t.slice,
                a = Object.create,
                f = Object.getOwnPropertyDescriptor,
                d = Object.defineProperty,
                r = t.forEach || function(t, e) {
                    for (var i = 0, n = this.length; i < n; i++) t.call(e, this[i], i, this)
                },
                o = Object.assign || function(t) {
                    for (var e = 1, i = arguments.length; e < i; e++) {
                        var n = arguments[e];
                        for (var r in n) n.hasOwnProperty(r) && (t[r] = n[r])
                    }
                    return t
                },
                i = function(t, e, i) {
                    if (t) {
                        var n = f(t, "length");
                        (n && "number" == typeof n.value ? r : function(t, e) {
                            for (var i in this) this.hasOwnProperty(i) && t.call(e, this[i], i, this)
                        }).call(t, e, i = i || t)
                    }
                    return i
                };

            function h(a, o, h, u, l) {
                var c = {};

                function t(t, e) {
                    "string" == typeof(e = e || (e = f(o, t)) && (e.get ? e : e.value)) && "#" === e[0] && (e = a[e.substring(1)] || e);
                    var i, n = "function" == typeof e,
                        r = e,
                        s = l || n && !e.base ? e && e.get ? t in a : a[t] : null;
                    l && s || (n && s && (e.base = s), n && !1 !== u && (i = t.match(/^([gs]et|is)(([A-Z])(.*))$/)) && (c[i[3].toLowerCase() + i[4]] = i[2]), r && !n && r.get && "function" == typeof r.get && _.isPlainObject(r) || (r = {
                        value: r,
                        writable: !0
                    }), (f(a, t) || {
                        configurable: !0
                    }).configurable && (r.configurable = !0, r.enumerable = null != h ? h : !i), d(a, t, r))
                }
                if (o) {
                    for (var e in o) o.hasOwnProperty(e) && !s.test(e) && t(e);
                    for (var e in c) {
                        var i = c[e],
                            n = a["set" + i],
                            r = a["get" + i] || n && a["is" + i];
                        !r || !0 !== u && 0 !== r.length || t(e, {
                            get: r,
                            set: n
                        })
                    }
                }
                return a
            }

            function _() {
                for (var t = 0, e = arguments.length; t < e; t++) {
                    var i = arguments[t];
                    i && o(this, i)
                }
                return this
            }
            return h(_, {
                inject: function(t) {
                    if (t) {
                        var e = !0 === t.statics ? t : t.statics,
                            i = t.beans,
                            n = t.preserve;
                        e !== t && h(this.prototype, t, t.enumerable, i, n), h(this, e, null, i, n)
                    }
                    for (var r = 1, s = arguments.length; r < s; r++) this.inject(arguments[r]);
                    return this
                },
                extend: function() {
                    for (var t, e, i, n = this, r = 0, s = arguments.length; r < s && (!t || !e); r++) i = arguments[r], t = t || i.initialize, e = e || i.prototype;
                    return e = (t = t || function() {
                        n.apply(this, arguments)
                    }).prototype = e || a(this.prototype), d(e, "constructor", {
                        value: t,
                        writable: !0,
                        configurable: !0
                    }), h(t, this), arguments.length && this.inject.apply(t, arguments), t.base = n, t
                }
            }).inject({
                enumerable: !1,
                initialize: _,
                set: _,
                inject: function() {
                    for (var t = 0, e = arguments.length; t < e; t++) {
                        var i = arguments[t];
                        i && h(this, i, i.enumerable, i.beans, i.preserve)
                    }
                    return this
                },
                extend: function() {
                    var t = a(this);
                    return t.inject.apply(t, arguments)
                },
                each: function(t, e) {
                    return i(this, t, e)
                },
                clone: function() {
                    return new this.constructor(this)
                },
                statics: {
                    set: o,
                    each: i,
                    create: a,
                    define: d,
                    describe: f,
                    clone: function(t) {
                        return o(new t.constructor, t)
                    },
                    isPlainObject: function(t) {
                        var e = null != t && t.constructor;
                        return e && (e === Object || e === _ || "Object" === e.name)
                    },
                    pick: function(t, e) {
                        return t !== q ? t : e
                    },
                    slice: function(t, e, i) {
                        return n.call(t, e, i)
                    }
                }
            })
        };
    "undefined" != typeof module && (module.exports = V), V.inject({
        enumerable: !1,
        toString: function() {
            return null != this._id ? (this._class || "Object") + (this._name ? " '" + this._name + "'" : " @" + this._id) : "{ " + V.each(this, function(t, e) {
                if (!/^_/.test(e)) {
                    var i = typeof t;
                    this.push(e + ": " + ("number" === i ? b.instance.number(t) : "string" === i ? "'" + t + "'" : t))
                }
            }, []).join(", ") + " }"
        },
        getClassName: function() {
            return this._class || ""
        },
        importJSON: function(t) {
            return V.importJSON(t, this)
        },
        exportJSON: function(t) {
            return V.exportJSON(this, t)
        },
        toJSON: function() {
            return V.serialize(this)
        },
        set: function(t, e) {
            return t && V.filter(this, t, e, this._prioritize), this
        }
    }, {
        beans: !1,
        statics: {
            exports: {},
            extend: function t() {
                var e = t.base.apply(this, arguments),
                    i = e.prototype._class;
                return i && !V.exports[i] && (V.exports[i] = e), e
            },
            equals: function(t, e) {
                if (t === e) return !0;
                if (t && t.equals) return t.equals(e);
                if (e && e.equals) return e.equals(t);
                if (t && e && "object" == typeof t && "object" == typeof e) {
                    if (Array.isArray(t) && Array.isArray(e)) {
                        if ((i = t.length) !== e.length) return !1;
                        for (; i--;)
                            if (!V.equals(t[i], e[i])) return !1
                    } else {
                        var i, n = Object.keys(t);
                        if ((i = n.length) !== Object.keys(e).length) return !1;
                        for (; i--;) {
                            var r = n[i];
                            if (!e.hasOwnProperty(r) || !V.equals(t[r], e[r])) return !1
                        }
                    }
                    return !0
                }
                return !1
            },
            read: function(t, e, i, n) {
                if (this === V) {
                    var r = this.peek(t, e);
                    return t.__index++, r
                }
                var s = this.prototype,
                    a = s._readIndex,
                    o = e || a && t.__index || 0,
                    h = t.length,
                    u = t[o];
                if (n = n || h - o, u instanceof this || i && i.readNull && null == u && n <= 1) return a && (t.__index = o + 1), u && i && i.clone ? u.clone() : u;
                if (u = V.create(s), a && (u.__read = !0), u = u.initialize.apply(u, 0 < o || o + n < h ? V.slice(t, o, o + n) : t) || u, a) {
                    t.__index = o + u.__read;
                    var l = u.__filtered;
                    l && (t.__filtered = l, u.__filtered = q), u.__read = q
                }
                return u
            },
            peek: function(t, e) {
                return t[t.__index = e || t.__index || 0]
            },
            remain: function(t) {
                return t.length - (t.__index || 0)
            },
            readList: function(t, e, i, n) {
                for (var r, s = [], a = e || 0, o = n ? a + n : t.length, h = a; h < o; h++) s.push(Array.isArray(r = t[h]) ? this.read(r, 0, i) : this.read(t, h, i, 1));
                return s
            },
            readNamed: function(t, e, i, n, r) {
                var s = this.getNamed(t, e),
                    a = s !== q;
                if (a) {
                    var o = t.__filtered;
                    o || ((o = t.__filtered = V.create(t[0])).__unfiltered = t[0]), o[e] = q
                }
                var h = a ? [s] : t;
                return this.read(h, i, n, r)
            },
            getNamed: function(t, e) {
                var i = t[0];
                if (t._hasObject === q && (t._hasObject = 1 === t.length && V.isPlainObject(i)), t._hasObject) return e ? i[e] : t.__filtered || i
            },
            hasNamed: function(t, e) {
                return !!this.getNamed(t, e)
            },
            filter: function(i, n, r, t) {
                var s;

                function e(t) {
                    if (!(r && t in r || s && t in s)) {
                        var e = n[t];
                        e !== q && (i[t] = e)
                    }
                }
                if (t) {
                    for (var a, o = {}, h = 0, u = t.length; h < u; h++)(a = t[h]) in n && (e(a), o[a] = !0);
                    s = o
                }
                return Object.keys(n.__unfiltered || n).forEach(e), i
            },
            isPlainValue: function(t, e) {
                return V.isPlainObject(t) || Array.isArray(t) || e && "string" == typeof t
            },
            serialize: function(t, e, i, n) {
                e = e || {};
                var r, s = !n;
                if (s && (e.formatter = new b(e.precision), n = {
                        length: 0,
                        definitions: {},
                        references: {},
                        add: function(t, e) {
                            var i = "#" + t._id,
                                n = this.references[i];
                            if (!n) {
                                this.length++;
                                var r = e.call(t),
                                    s = t._class;
                                s && r[0] !== s && r.unshift(s), this.definitions[i] = r, n = this.references[i] = [i]
                            }
                            return n
                        }
                    }), t && t._serialize) {
                    r = t._serialize(e, n);
                    var a = t._class;
                    !a || t._compactSerialize || !s && i || r[0] === a || r.unshift(a)
                } else if (Array.isArray(t)) {
                    r = [];
                    for (var o = 0, h = t.length; o < h; o++) r[o] = V.serialize(t[o], e, i, n)
                } else if (V.isPlainObject(t)) {
                    r = {};
                    var u = Object.keys(t);
                    for (o = 0, h = u.length; o < h; o++) {
                        var l = u[o];
                        r[l] = V.serialize(t[l], e, i, n)
                    }
                } else r = "number" == typeof t ? e.formatter.number(t, e.precision) : t;
                return s && 0 < n.length ? [
                    ["dictionary", n.definitions], r
                ] : r
            },
            deserialize: function(t, e, i, n, r) {
                var s = t,
                    a = !i,
                    o = a && t && t.length && "dictionary" === t[0][0];
                if (i = i || {}, Array.isArray(t)) {
                    var h = t[0],
                        u = "dictionary" === h;
                    if (1 == t.length && /^#/.test(h)) return i.dictionary[h];
                    s = [];
                    for (var l = (h = V.exports[h]) ? 1 : 0, c = t.length; l < c; l++) s.push(V.deserialize(t[l], e, i, u, o));
                    if (h) {
                        var f = s;
                        s = e ? e(h, f, a || r) : new h(f)
                    }
                } else if (V.isPlainObject(t))
                    for (var d in s = {}, n && (i.dictionary = s), t) s[d] = V.deserialize(t[d], e, i);
                return o ? s[1] : s
            },
            exportJSON: function(t, e) {
                var i = V.serialize(t, e);
                return e && 0 == e.asString ? i : JSON.stringify(i)
            },
            importJSON: function(t, a) {
                return V.deserialize("string" == typeof t ? JSON.parse(t) : t, function(t, e, i) {
                    var n = i && a && a.constructor === t,
                        r = n ? a : V.create(t.prototype);
                    if (1 === e.length && r instanceof O && (n || !(r instanceof o))) {
                        var s = e[0];
                        V.isPlainObject(s) && (s.insert = !1)
                    }
                    return (n ? r.set : t).apply(r, e), n && (a = null), r
                })
            },
            push: function(t, e) {
                var i = e.length;
                if (i < 4096) t.push.apply(t, e);
                else {
                    var n = t.length;
                    t.length += i;
                    for (var r = 0; r < i; r++) t[n + r] = e[r]
                }
                return t
            },
            splice: function(t, e, i, n) {
                var r = e && e.length,
                    s = i === q;
                (i = s ? t.length : i) > t.length && (i = t.length);
                for (var a = 0; a < r; a++) e[a]._index = i + a;
                if (s) return V.push(t, e), [];
                var o = [i, n];
                e && V.push(o, e);
                for (var h = t.splice.apply(t, o), u = (a = 0, h.length); a < u; a++) h[a]._index = q;
                for (a = i + r, u = t.length; a < u; a++) t[a]._index = a;
                return h
            },
            capitalize: function(t) {
                return t.replace(/\b[a-z]/g, function(t) {
                    return t.toUpperCase()
                })
            },
            camelize: function(t) {
                return t.replace(/-(.)/g, function(t, e) {
                    return e.toUpperCase()
                })
            },
            hyphenate: function(t) {
                return t.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
            }
        }
    });
    var t = {
            on: function(t, e) {
                if ("string" != typeof t) V.each(t, function(t, e) {
                    this.on(e, t)
                }, this);
                else {
                    var i = this._eventTypes,
                        n = i && i[t],
                        r = this._callbacks = this._callbacks || {}; - 1 === (r = r[t] = r[t] || []).indexOf(e) && (r.push(e), n && n.install && 1 === r.length && n.install.call(this, t))
                }
                return this
            },
            off: function(t, e) {
                if ("string" == typeof t) {
                    var i, n = this._eventTypes,
                        r = n && n[t],
                        s = this._callbacks && this._callbacks[t];
                    return s && (!e || -1 !== (i = s.indexOf(e)) && 1 === s.length ? (r && r.uninstall && r.uninstall.call(this, t), delete this._callbacks[t]) : -1 !== i && s.splice(i, 1)), this
                }
                V.each(t, function(t, e) {
                    this.off(e, t)
                }, this)
            },
            once: function(e, i) {
                return this.on(e, function t() {
                    i.apply(this, arguments), this.off(e, t)
                })
            },
            emit: function(t, e) {
                var i = this._callbacks && this._callbacks[t];
                if (!i) return !1;
                var n = V.slice(arguments, 1),
                    r = e && e.target && !e.currentTarget;
                i = i.slice(), r && (e.currentTarget = this);
                for (var s = 0, a = i.length; s < a; s++)
                    if (0 == i[s].apply(this, n)) {
                        e && e.stop && e.stop();
                        break
                    }
                return r && delete e.currentTarget, !0
            },
            responds: function(t) {
                return !(!this._callbacks || !this._callbacks[t])
            },
            attach: "#on",
            detach: "#off",
            fire: "#emit",
            _installEvents: function(t) {
                var e = this._eventTypes,
                    i = this._callbacks,
                    n = t ? "install" : "uninstall";
                if (e)
                    for (var r in i)
                        if (0 < i[r].length) {
                            var s = e[r],
                                a = s && s[n];
                            a && a.call(this, r)
                        }
            },
            statics: {
                inject: function t(a) {
                    var e = a._events;
                    if (e) {
                        var o = {};
                        V.each(e, function(t, e) {
                            var i = "string" == typeof t,
                                n = i ? t : e,
                                r = V.capitalize(n),
                                s = n.substring(2).toLowerCase();
                            o[s] = i ? {} : t, n = "_" + n, a["get" + r] = function() {
                                return this[n]
                            }, a["set" + r] = function(t) {
                                var e = this[n];
                                e && this.off(s, e), t && this.on(s, t), this[n] = t
                            }
                        }), a._eventTypes = o
                    }
                    return t.base.apply(this, arguments)
                }
            }
        },
        c = V.extend({
            _class: "PaperScope",
            initialize: function t() {
                (st = this).settings = new V({
                    applyMatrix: !0,
                    insertItems: !0,
                    handleSize: 4,
                    hitTolerance: 0
                }), this.project = null, this.projects = [], this.tools = [], this._id = t._id++, t._scopes[this._id] = this;
                var e = t.prototype;
                if (!this.support) {
                    var i = it.getContext(1, 1) || {};
                    e.support = {
                        nativeDash: "setLineDash" in i || "mozDash" in i,
                        nativeBlendModes: x.nativeModes
                    }, it.release(i)
                }
                if (!this.agent) {
                    var n = u.navigator.userAgent.toLowerCase(),
                        r = (/(darwin|win|mac|linux|freebsd|sunos)/.exec(n) || [])[0],
                        s = "darwin" === r ? "mac" : r,
                        a = e.agent = e.browser = {
                            platform: s
                        };
                    s && (a[s] = !0), n.replace(/(opera|chrome|safari|webkit|firefox|msie|trident|atom|node)\/?\s*([.\d]+)(?:.*version\/([.\d]+))?(?:.*rv\:v?([.\d]+))?/g, function(t, e, i, n, r) {
                        if (!a.chrome) {
                            var s = "opera" === e ? n : /^(node|trident)$/.test(e) ? r : i;
                            a.version = s, a.versionNumber = parseFloat(s), e = "trident" === e ? "msie" : e, a.name = e, a[e] = !0
                        }
                    }), a.chrome && delete a.webkit, a.atom && delete a.chrome
                }
            },
            version: "0.12.0",
            getView: function() {
                var t = this.project;
                return t && t._view
            },
            getPaper: function() {
                return this
            },
            execute: function(t, e) {},
            install: function(e) {
                var i = this;
                for (var t in V.each(["project", "view", "tool"], function(t) {
                        V.define(e, t, {
                            configurable: !0,
                            get: function() {
                                return i[t]
                            }
                        })
                    }), this) !/^_/.test(t) && this[t] && (e[t] = this[t])
            },
            setup: function(t) {
                return (st = this).project = new S(t), this
            },
            createCanvas: function(t, e) {
                return it.getCanvas(t, e)
            },
            activate: function() {
                st = this
            },
            clear: function() {
                for (var t = this.projects, e = this.tools, i = t.length - 1; 0 <= i; i--) t[i].remove();
                for (i = e.length - 1; 0 <= i; i--) e[i].remove()
            },
            remove: function() {
                this.clear(), delete c._scopes[this._id]
            },
            statics: new function() {
                function t(i) {
                    return i += "Attribute",
                        function(t, e) {
                            return t[i](e) || t[i]("data-paper-" + e)
                        }
                }
                return {
                    _scopes: {},
                    _id: 0,
                    get: function(t) {
                        return this._scopes[t] || null
                    },
                    getAttribute: t("get"),
                    hasAttribute: t("has")
                }
            }
        }),
        e = V.extend(t, {
            initialize: function(t) {
                this._scope = st, this._index = this._scope[this._list].push(this) - 1, !t && this._scope[this._reference] || this.activate()
            },
            activate: function() {
                if (!this._scope) return !1;
                var t = this._scope[this._reference];
                return t && t !== this && t.emit("deactivate"), (this._scope[this._reference] = this).emit("activate", t), !0
            },
            isActive: function() {
                return this._scope[this._reference] === this
            },
            remove: function() {
                return null != this._index && (V.splice(this._scope[this._list], null, this._index, 1), this._scope[this._reference] == this && (this._scope[this._reference] = null), !(this._scope = null))
            },
            getView: function() {
                return this._scope.getView()
            }
        }),
        b = V.extend({
            initialize: function(t) {
                this.precision = V.pick(t, 5), this.multiplier = Math.pow(10, this.precision)
            },
            number: function(t) {
                return this.precision < 16 ? Math.round(t * this.multiplier) / this.multiplier : t
            },
            pair: function(t, e, i) {
                return this.number(t) + (i || ",") + this.number(e)
            },
            point: function(t, e) {
                return this.number(t.x) + (e || ",") + this.number(t.y)
            },
            size: function(t, e) {
                return this.number(t.width) + (e || ",") + this.number(t.height)
            },
            rectangle: function(t, e) {
                return this.point(t, e) + (e || ",") + this.size(t, e)
            }
        });
    b.instance = new b;
    var H = new function() {
            var f = [
                    [.5773502691896257],
                    [0, .7745966692414834],
                    [.33998104358485626, .8611363115940526],
                    [0, .5384693101056831, .906179845938664],
                    [.2386191860831969, .6612093864662645, .932469514203152],
                    [0, .4058451513773972, .7415311855993945, .9491079123427585],
                    [.1834346424956498, .525532409916329, .7966664774136267, .9602898564975363],
                    [0, .3242534234038089, .6133714327005904, .8360311073266358, .9681602395076261],
                    [.14887433898163122, .4333953941292472, .6794095682990244, .8650633666889845, .9739065285171717],
                    [0, .26954315595234496, .5190961292068118, .7301520055740494, .8870625997680953, .978228658146057],
                    [.1252334085114689, .3678314989981802, .5873179542866175, .7699026741943047, .9041172563704749, .9815606342467192],
                    [0, .2304583159551348, .44849275103644687, .6423493394403402, .8015780907333099, .9175983992229779, .9841830547185881],
                    [.10805494870734367, .31911236892788974, .5152486363581541, .6872929048116855, .827201315069765, .9284348836635735, .9862838086968123],
                    [0, .20119409399743451, .3941513470775634, .5709721726085388, .7244177313601701, .8482065834104272, .937273392400706, .9879925180204854],
                    [.09501250983763744, .2816035507792589, .45801677765722737, .6178762444026438, .755404408355003, .8656312023878318, .9445750230732326, .9894009349916499]
                ],
                d = [
                    [1],
                    [.8888888888888888, .5555555555555556],
                    [.6521451548625461, .34785484513745385],
                    [.5688888888888889, .47862867049936647, .23692688505618908],
                    [.46791393457269104, .3607615730481386, .17132449237917036],
                    [.4179591836734694, .3818300505051189, .27970539148927664, .1294849661688697],
                    [.362683783378362, .31370664587788727, .22238103445337448, .10122853629037626],
                    [.3302393550012598, .31234707704000286, .26061069640293544, .1806481606948574, .08127438836157441],
                    [.29552422471475287, .26926671930999635, .21908636251598204, .1494513491505806, .06667134430868814],
                    [.2729250867779006, .26280454451024665, .23319376459199048, .18629021092773426, .1255803694649046, .05566856711617366],
                    [.24914704581340277, .2334925365383548, .20316742672306592, .16007832854334622, .10693932599531843, .04717533638651183],
                    [.2325515532308739, .22628318026289723, .2078160475368885, .17814598076194574, .13887351021978725, .09212149983772845, .04048400476531588],
                    [.2152638534631578, .2051984637212956, .18553839747793782, .15720316715819355, .12151857068790319, .08015808715976021, .03511946033175186],
                    [.2025782419255613, .19843148532711158, .1861610000155622, .16626920581699392, .13957067792615432, .10715922046717194, .07036604748810812, .03075324199611727],
                    [.1894506104550685, .18260341504492358, .16915651939500254, .14959598881657674, .12462897125553388, .09515851168249279, .062253523938647894, .027152459411754096]
                ],
                b = Math.abs,
                S = Math.sqrt,
                C = Math.pow,
                e = Math.log2 || function(t) {
                    return Math.log(t) * Math.LOG2E
                },
                P = 1e-12,
                I = 112e-18;

            function M(t, e, i) {
                return t < e ? e : i < t ? i : t
            }

            function v(t, e, i) {
                function n(t) {
                    var e = 134217729 * t,
                        i = t - e + e;
                    return [i, t - i]
                }
                var r = e * e - t * i,
                    s = e * e + t * i;
                if (3 * b(r) < s) {
                    var a = n(t),
                        o = n(e),
                        h = n(i),
                        u = e * e,
                        l = t * i;
                    r = u - l + (o[0] * o[0] - u + 2 * o[0] * o[1] + o[1] * o[1] - (a[0] * h[0] - l + a[0] * h[1] + a[1] * h[0] + a[1] * h[1]))
                }
                return r
            }

            function T() {
                var t = Math.max.apply(Math, arguments);
                return t && (t < 1e-8 || 1e8 < t) ? C(2, -Math.round(e(t))) : 0
            }
            return {
                EPSILON: P,
                MACHINE_EPSILON: I,
                CURVETIME_EPSILON: 1e-8,
                GEOMETRIC_EPSILON: 1e-7,
                TRIGONOMETRIC_EPSILON: 1e-8,
                KAPPA: 4 * (S(2) - 1) / 3,
                isZero: function(t) {
                    return -P <= t && t <= P
                },
                clamp: M,
                integrate: function(t, e, i, n) {
                    for (var r = f[n - 2], s = d[n - 2], a = .5 * (i - e), o = a + e, h = 0, u = n + 1 >> 1, l = 1 & n ? s[h++] * t(o) : 0; h < u;) {
                        var c = a * r[h];
                        l += s[h++] * (t(o + c) + t(o - c))
                    }
                    return a * l
                },
                findRoot: function(t, e, i, n, r, s, a) {
                    for (var o = 0; o < s; o++) {
                        var h = t(i),
                            u = h / e(i),
                            l = i - u;
                        if (b(u) < a) {
                            i = l;
                            break
                        }
                        i = 0 < h ? (r = i, l <= n ? .5 * (n + r) : l) : (n = i, r <= l ? .5 * (n + r) : l)
                    }
                    return M(i, n, r)
                },
                solveQuadratic: function(t, e, i, n, r, s) {
                    var a, o = 1 / 0;
                    if (b(t) < P) {
                        if (b(e) < P) return b(i) < P ? -1 : 0;
                        a = -i / e
                    } else {
                        var h = v(t, e *= -.5, i);
                        if (h && b(h) < I) {
                            var u = T(b(t), b(e), b(i));
                            u && (h = v(t *= u, e *= u, i *= u))
                        }
                        if (-I <= h) {
                            var l = h < 0 ? 0 : S(h),
                                c = e + (e < 0 ? -l : l);
                            o = 0 === c ? -(a = i / t) : (a = c / t, i / c)
                        }
                    }
                    var f = 0,
                        d = null == r,
                        _ = r - P,
                        g = s + P;
                    return isFinite(a) && (d || _ < a && a < g) && (n[f++] = d ? a : M(a, r, s)), o !== a && isFinite(o) && (d || _ < o && o < g) && (n[f++] = d ? o : M(o, r, s)), f
                },
                solveCubic: function(i, n, r, s, t, e, a) {
                    var o, h, u, l, c, f = T(b(i), b(n), b(r), b(s));

                    function d(t) {
                        var e = i * (o = t);
                        l = (e + (h = e + n)) * o + (u = h * o + r), c = u * o + s
                    }
                    if (f && (i *= f, n *= f, r *= f, s *= f), b(i) < P) i = n, h = r, u = s, o = 1 / 0;
                    else if (b(s) < P) h = n, u = r, o = 0;
                    else {
                        d(-n / i / 3);
                        var _ = c / i,
                            g = C(b(_), 1 / 3),
                            v = _ < 0 ? -1 : 1,
                            p = -l / i,
                            m = 0 < p ? 1.324717957244746 * Math.max(g, S(p)) : g,
                            y = o - v * m;
                        if (y !== o) {
                            for (; d(y), v * o < v * (y = 0 === l ? o : o - c / l / (1 + I)););
                            b(i) * o * o > b(s / o) && (h = ((u = -s / o) - r) / o)
                        }
                    }
                    var w = H.solveQuadratic(i, h, u, t, e, a),
                        x = null == e;
                    return isFinite(o) && (0 === w || 0 < w && o !== t[0] && o !== t[1]) && (x || e - P < o && o < a + P) && (t[w++] = x ? o : M(o, e, a)), w
                }
            }
        },
        l = {
            _id: 1,
            _pools: {},
            get: function(t) {
                if (t) {
                    var e = this._pools[t];
                    return e || (e = this._pools[t] = {
                        _id: 1
                    }), e._id++
                }
                return this._id++
            }
        },
        Z = V.extend({
            _class: "Point",
            _readIndex: !0,
            initialize: function(t, e) {
                var i = typeof t,
                    n = this.__read,
                    r = 0;
                if ("number" === i) {
                    var s = "number" == typeof e;
                    this._set(t, s ? e : t), n && (r = s ? 2 : 1)
                } else if ("undefined" === i || null === t) this._set(0, 0), n && (r = null === t ? 1 : 0);
                else {
                    var a = "string" === i ? t.split(/[\s,]+/) || [] : t;
                    r = 1, Array.isArray(a) ? this._set(+a[0], +(1 < a.length ? a[1] : a[0])) : "x" in a ? this._set(a.x || 0, a.y || 0) : "width" in a ? this._set(a.width || 0, a.height || 0) : "angle" in a ? (this._set(a.length || 0, 0), this.setAngle(a.angle || 0)) : (this._set(0, 0), r = 0)
                }
                return n && (this.__read = r), this
            },
            set: "#initialize",
            _set: function(t, e) {
                return this.x = t, this.y = e, this
            },
            equals: function(t) {
                return this === t || t && (this.x === t.x && this.y === t.y || Array.isArray(t) && this.x === t[0] && this.y === t[1]) || !1
            },
            clone: function() {
                return new Z(this.x, this.y)
            },
            toString: function() {
                var t = b.instance;
                return "{ x: " + t.number(this.x) + ", y: " + t.number(this.y) + " }"
            },
            _serialize: function(t) {
                var e = t.formatter;
                return [e.number(this.x), e.number(this.y)]
            },
            getLength: function() {
                return Math.sqrt(this.x * this.x + this.y * this.y)
            },
            setLength: function(t) {
                if (this.isZero()) {
                    var e = this._angle || 0;
                    this._set(Math.cos(e) * t, Math.sin(e) * t)
                } else {
                    var i = t / this.getLength();
                    H.isZero(i) && this.getAngle(), this._set(this.x * i, this.y * i)
                }
            },
            getAngle: function() {
                return 180 * this.getAngleInRadians.apply(this, arguments) / Math.PI
            },
            setAngle: function(t) {
                this.setAngleInRadians.call(this, t * Math.PI / 180)
            },
            getAngleInDegrees: "#getAngle",
            setAngleInDegrees: "#setAngle",
            getAngleInRadians: function() {
                if (arguments.length) {
                    var t = Z.read(arguments),
                        e = this.getLength() * t.getLength();
                    if (H.isZero(e)) return NaN;
                    var i = this.dot(t) / e;
                    return Math.acos(i < -1 ? -1 : 1 < i ? 1 : i)
                }
                return this.isZero() ? this._angle || 0 : this._angle = Math.atan2(this.y, this.x)
            },
            setAngleInRadians: function(t) {
                if (this._angle = t, !this.isZero()) {
                    var e = this.getLength();
                    this._set(Math.cos(t) * e, Math.sin(t) * e)
                }
            },
            getQuadrant: function() {
                return 0 <= this.x ? 0 <= this.y ? 1 : 4 : 0 <= this.y ? 2 : 3
            }
        }, {
            beans: !1,
            getDirectedAngle: function() {
                var t = Z.read(arguments);
                return 180 * Math.atan2(this.cross(t), this.dot(t)) / Math.PI
            },
            getDistance: function() {
                var t = Z.read(arguments),
                    e = t.x - this.x,
                    i = t.y - this.y,
                    n = e * e + i * i;
                return V.read(arguments) ? n : Math.sqrt(n)
            },
            normalize: function(t) {
                t === q && (t = 1);
                var e = this.getLength(),
                    i = 0 !== e ? t / e : 0,
                    n = new Z(this.x * i, this.y * i);
                return 0 <= i && (n._angle = this._angle), n
            },
            rotate: function(t, e) {
                if (0 === t) return this.clone();
                t = t * Math.PI / 180;
                var i = e ? this.subtract(e) : this,
                    n = Math.sin(t),
                    r = Math.cos(t);
                return i = new Z(i.x * r - i.y * n, i.x * n + i.y * r), e ? i.add(e) : i
            },
            transform: function(t) {
                return t ? t._transformPoint(this) : this
            },
            add: function() {
                var t = Z.read(arguments);
                return new Z(this.x + t.x, this.y + t.y)
            },
            subtract: function() {
                var t = Z.read(arguments);
                return new Z(this.x - t.x, this.y - t.y)
            },
            multiply: function() {
                var t = Z.read(arguments);
                return new Z(this.x * t.x, this.y * t.y)
            },
            divide: function() {
                var t = Z.read(arguments);
                return new Z(this.x / t.x, this.y / t.y)
            },
            modulo: function() {
                var t = Z.read(arguments);
                return new Z(this.x % t.x, this.y % t.y)
            },
            negate: function() {
                return new Z(-this.x, -this.y)
            },
            isInside: function() {
                return T.read(arguments).contains(this)
            },
            isClose: function() {
                var t = Z.read(arguments),
                    e = V.read(arguments);
                return this.getDistance(t) <= e
            },
            isCollinear: function() {
                var t = Z.read(arguments);
                return Z.isCollinear(this.x, this.y, t.x, t.y)
            },
            isColinear: "#isCollinear",
            isOrthogonal: function() {
                var t = Z.read(arguments);
                return Z.isOrthogonal(this.x, this.y, t.x, t.y)
            },
            isZero: function() {
                var t = H.isZero;
                return t(this.x) && t(this.y)
            },
            isNaN: function() {
                return isNaN(this.x) || isNaN(this.y)
            },
            isInQuadrant: function(t) {
                return 0 <= this.x * (1 < t && t < 4 ? -1 : 1) && 0 <= this.y * (2 < t ? -1 : 1)
            },
            dot: function() {
                var t = Z.read(arguments);
                return this.x * t.x + this.y * t.y
            },
            cross: function() {
                var t = Z.read(arguments);
                return this.x * t.y - this.y * t.x
            },
            project: function() {
                var t = Z.read(arguments),
                    e = t.isZero() ? 0 : this.dot(t) / t.dot(t);
                return new Z(t.x * e, t.y * e)
            },
            statics: {
                min: function() {
                    var t = Z.read(arguments),
                        e = Z.read(arguments);
                    return new Z(Math.min(t.x, e.x), Math.min(t.y, e.y))
                },
                max: function() {
                    var t = Z.read(arguments),
                        e = Z.read(arguments);
                    return new Z(Math.max(t.x, e.x), Math.max(t.y, e.y))
                },
                random: function() {
                    return new Z(Math.random(), Math.random())
                },
                isCollinear: function(t, e, i, n) {
                    return Math.abs(t * n - e * i) <= 1e-8 * Math.sqrt((t * t + e * e) * (i * i + n * n))
                },
                isOrthogonal: function(t, e, i, n) {
                    return Math.abs(t * i + e * n) <= 1e-8 * Math.sqrt((t * t + e * e) * (i * i + n * n))
                }
            }
        }, V.each(["round", "ceil", "floor", "abs"], function(t) {
            var e = Math[t];
            this[t] = function() {
                return new Z(e(this.x), e(this.y))
            }
        }, {})),
        f = Z.extend({
            initialize: function(t, e, i, n) {
                this._x = t, this._y = e, this._owner = i, this._setter = n
            },
            _set: function(t, e, i) {
                return this._x = t, this._y = e, i || this._owner[this._setter](this), this
            },
            getX: function() {
                return this._x
            },
            setX: function(t) {
                this._x = t, this._owner[this._setter](this)
            },
            getY: function() {
                return this._y
            },
            setY: function(t) {
                this._y = t, this._owner[this._setter](this)
            },
            isSelected: function() {
                return !!(this._owner._selection & this._getSelection())
            },
            setSelected: function(t) {
                this._owner._changeSelection(this._getSelection(), t)
            },
            _getSelection: function() {
                return "setPosition" === this._setter ? 4 : 0
            }
        }),
        U = V.extend({
            _class: "Size",
            _readIndex: !0,
            initialize: function(t, e) {
                var i = typeof t,
                    n = this.__read,
                    r = 0;
                if ("number" === i) {
                    var s = "number" == typeof e;
                    this._set(t, s ? e : t), n && (r = s ? 2 : 1)
                } else if ("undefined" === i || null === t) this._set(0, 0), n && (r = null === t ? 1 : 0);
                else {
                    var a = "string" === i ? t.split(/[\s,]+/) || [] : t;
                    r = 1, Array.isArray(a) ? this._set(+a[0], +(1 < a.length ? a[1] : a[0])) : "width" in a ? this._set(a.width || 0, a.height || 0) : "x" in a ? this._set(a.x || 0, a.y || 0) : (this._set(0, 0), r = 0)
                }
                return n && (this.__read = r), this
            },
            set: "#initialize",
            _set: function(t, e) {
                return this.width = t, this.height = e, this
            },
            equals: function(t) {
                return t === this || t && (this.width === t.width && this.height === t.height || Array.isArray(t) && this.width === t[0] && this.height === t[1]) || !1
            },
            clone: function() {
                return new U(this.width, this.height)
            },
            toString: function() {
                var t = b.instance;
                return "{ width: " + t.number(this.width) + ", height: " + t.number(this.height) + " }"
            },
            _serialize: function(t) {
                var e = t.formatter;
                return [e.number(this.width), e.number(this.height)]
            },
            add: function() {
                var t = U.read(arguments);
                return new U(this.width + t.width, this.height + t.height)
            },
            subtract: function() {
                var t = U.read(arguments);
                return new U(this.width - t.width, this.height - t.height)
            },
            multiply: function() {
                var t = U.read(arguments);
                return new U(this.width * t.width, this.height * t.height)
            },
            divide: function() {
                var t = U.read(arguments);
                return new U(this.width / t.width, this.height / t.height)
            },
            modulo: function() {
                var t = U.read(arguments);
                return new U(this.width % t.width, this.height % t.height)
            },
            negate: function() {
                return new U(-this.width, -this.height)
            },
            isZero: function() {
                var t = H.isZero;
                return t(this.width) && t(this.height)
            },
            isNaN: function() {
                return isNaN(this.width) || isNaN(this.height)
            },
            statics: {
                min: function(t, e) {
                    return new U(Math.min(t.width, e.width), Math.min(t.height, e.height))
                },
                max: function(t, e) {
                    return new U(Math.max(t.width, e.width), Math.max(t.height, e.height))
                },
                random: function() {
                    return new U(Math.random(), Math.random())
                }
            }
        }, V.each(["round", "ceil", "floor", "abs"], function(t) {
            var e = Math[t];
            this[t] = function() {
                return new U(e(this.width), e(this.height))
            }
        }, {})),
        i = U.extend({
            initialize: function(t, e, i, n) {
                this._width = t, this._height = e, this._owner = i, this._setter = n
            },
            _set: function(t, e, i) {
                return this._width = t, this._height = e, i || this._owner[this._setter](this), this
            },
            getWidth: function() {
                return this._width
            },
            setWidth: function(t) {
                this._width = t, this._owner[this._setter](this)
            },
            getHeight: function() {
                return this._height
            },
            setHeight: function(t) {
                this._height = t, this._owner[this._setter](this)
            }
        }),
        T = V.extend({
            _class: "Rectangle",
            _readIndex: !0,
            beans: !0,
            initialize: function(t, e, i, n) {
                var r, s = typeof t;
                if ("number" === s ? (this._set(t, e, i, n), r = 4) : "undefined" === s || null === t ? (this._set(0, 0, 0, 0), r = null === t ? 1 : 0) : 1 === arguments.length && (Array.isArray(t) ? (this._set.apply(this, t), r = 1) : t.x !== q || t.width !== q ? (this._set(t.x || 0, t.y || 0, t.width || 0, t.height || 0), r = 1) : t.from === q && t.to === q && (this._set(0, 0, 0, 0), V.filter(this, t), r = 1)), r === q) {
                    var a, o, h = Z.readNamed(arguments, "from"),
                        u = V.peek(arguments),
                        l = h.x,
                        c = h.y;
                    if (u && u.x !== q || V.hasNamed(arguments, "to")) {
                        var f = Z.readNamed(arguments, "to");
                        a = f.x - l, o = f.y - c, a < 0 && (l = f.x, a = -a), o < 0 && (c = f.y, o = -o)
                    } else {
                        var d = U.read(arguments);
                        a = d.width, o = d.height
                    }
                    this._set(l, c, a, o), r = arguments.__index;
                    var _ = arguments.__filtered;
                    _ && (this.__filtered = _)
                }
                return this.__read && (this.__read = r), this
            },
            set: "#initialize",
            _set: function(t, e, i, n) {
                return this.x = t, this.y = e, this.width = i, this.height = n, this
            },
            clone: function() {
                return new T(this.x, this.y, this.width, this.height)
            },
            equals: function(t) {
                var e = V.isPlainValue(t) ? T.read(arguments) : t;
                return e === this || e && this.x === e.x && this.y === e.y && this.width === e.width && this.height === e.height || !1
            },
            toString: function() {
                var t = b.instance;
                return "{ x: " + t.number(this.x) + ", y: " + t.number(this.y) + ", width: " + t.number(this.width) + ", height: " + t.number(this.height) + " }"
            },
            _serialize: function(t) {
                var e = t.formatter;
                return [e.number(this.x), e.number(this.y), e.number(this.width), e.number(this.height)]
            },
            getPoint: function(t) {
                return new(t ? Z : f)(this.x, this.y, this, "setPoint")
            },
            setPoint: function() {
                var t = Z.read(arguments);
                this.x = t.x, this.y = t.y
            },
            getSize: function(t) {
                return new(t ? U : i)(this.width, this.height, this, "setSize")
            },
            _fw: 1,
            _fh: 1,
            setSize: function() {
                var t = U.read(arguments),
                    e = this._sx,
                    i = this._sy,
                    n = t.width,
                    r = t.height;
                e && (this.x += (this.width - n) * e), i && (this.y += (this.height - r) * i), this.width = n, this.height = r, this._fw = this._fh = 1
            },
            getLeft: function() {
                return this.x
            },
            setLeft: function(t) {
                if (!this._fw) {
                    var e = t - this.x;
                    this.width -= .5 === this._sx ? 2 * e : e
                }
                this.x = t, this._sx = this._fw = 0
            },
            getTop: function() {
                return this.y
            },
            setTop: function(t) {
                if (!this._fh) {
                    var e = t - this.y;
                    this.height -= .5 === this._sy ? 2 * e : e
                }
                this.y = t, this._sy = this._fh = 0
            },
            getRight: function() {
                return this.x + this.width
            },
            setRight: function(t) {
                if (!this._fw) {
                    var e = t - this.x;
                    this.width = .5 === this._sx ? 2 * e : e
                }
                this.x = t - this.width, this._sx = 1, this._fw = 0
            },
            getBottom: function() {
                return this.y + this.height
            },
            setBottom: function(t) {
                if (!this._fh) {
                    var e = t - this.y;
                    this.height = .5 === this._sy ? 2 * e : e
                }
                this.y = t - this.height, this._sy = 1, this._fh = 0
            },
            getCenterX: function() {
                return this.x + this.width / 2
            },
            setCenterX: function(t) {
                this._fw || .5 === this._sx ? this.x = t - this.width / 2 : (this._sx && (this.x += 2 * (t - this.x) * this._sx), this.width = 2 * (t - this.x)), this._sx = .5, this._fw = 0
            },
            getCenterY: function() {
                return this.y + this.height / 2
            },
            setCenterY: function(t) {
                this._fh || .5 === this._sy ? this.y = t - this.height / 2 : (this._sy && (this.y += 2 * (t - this.y) * this._sy), this.height = 2 * (t - this.y)), this._sy = .5, this._fh = 0
            },
            getCenter: function(t) {
                return new(t ? Z : f)(this.getCenterX(), this.getCenterY(), this, "setCenter")
            },
            setCenter: function() {
                var t = Z.read(arguments);
                return this.setCenterX(t.x), this.setCenterY(t.y), this
            },
            getArea: function() {
                return this.width * this.height
            },
            isEmpty: function() {
                return 0 === this.width || 0 === this.height
            },
            contains: function(t) {
                return t && t.width !== q || 4 === (Array.isArray(t) ? t : arguments).length ? this._containsRectangle(T.read(arguments)) : this._containsPoint(Z.read(arguments))
            },
            _containsPoint: function(t) {
                var e = t.x,
                    i = t.y;
                return e >= this.x && i >= this.y && e <= this.x + this.width && i <= this.y + this.height
            },
            _containsRectangle: function(t) {
                var e = t.x,
                    i = t.y;
                return e >= this.x && i >= this.y && e + t.width <= this.x + this.width && i + t.height <= this.y + this.height
            },
            intersects: function() {
                var t = T.read(arguments),
                    e = V.read(arguments) || 0;
                return t.x + t.width > this.x - e && t.y + t.height > this.y - e && t.x < this.x + this.width + e && t.y < this.y + this.height + e
            },
            intersect: function() {
                var t = T.read(arguments),
                    e = Math.max(this.x, t.x),
                    i = Math.max(this.y, t.y),
                    n = Math.min(this.x + this.width, t.x + t.width),
                    r = Math.min(this.y + this.height, t.y + t.height);
                return new T(e, i, n - e, r - i)
            },
            unite: function() {
                var t = T.read(arguments),
                    e = Math.min(this.x, t.x),
                    i = Math.min(this.y, t.y),
                    n = Math.max(this.x + this.width, t.x + t.width),
                    r = Math.max(this.y + this.height, t.y + t.height);
                return new T(e, i, n - e, r - i)
            },
            include: function() {
                var t = Z.read(arguments),
                    e = Math.min(this.x, t.x),
                    i = Math.min(this.y, t.y),
                    n = Math.max(this.x + this.width, t.x),
                    r = Math.max(this.y + this.height, t.y);
                return new T(e, i, n - e, r - i)
            },
            expand: function() {
                var t = U.read(arguments),
                    e = t.width,
                    i = t.height;
                return new T(this.x - e / 2, this.y - i / 2, this.width + e, this.height + i)
            },
            scale: function(t, e) {
                return this.expand(this.width * t - this.width, this.height * (e === q ? t : e) - this.height)
            }
        }, V.each([
            ["Top", "Left"],
            ["Top", "Right"],
            ["Bottom", "Left"],
            ["Bottom", "Right"],
            ["Left", "Center"],
            ["Top", "Center"],
            ["Right", "Center"],
            ["Bottom", "Center"]
        ], function(t, e) {
            var i = t.join(""),
                n = /^[RL]/.test(i);
            4 <= e && (t[1] += n ? "Y" : "X");
            var r = t[n ? 0 : 1],
                s = t[n ? 1 : 0],
                a = "get" + r,
                o = "get" + s,
                h = "set" + r,
                u = "set" + s,
                l = "set" + i;
            this["get" + i] = function(t) {
                return new(t ? Z : f)(this[a](), this[o](), this, l)
            }, this[l] = function() {
                var t = Z.read(arguments);
                this[h](t.x), this[u](t.y)
            }
        }, {
            beans: !0
        })),
        s = T.extend({
            initialize: function(t, e, i, n, r, s) {
                this._set(t, e, i, n, !0), this._owner = r, this._setter = s
            },
            _set: function(t, e, i, n, r) {
                return this._x = t, this._y = e, this._width = i, this._height = n, r || this._owner[this._setter](this), this
            }
        }, new function() {
            var i = T.prototype;
            return V.each(["x", "y", "width", "height"], function(t) {
                var e = V.capitalize(t),
                    i = "_" + t;
                this["get" + e] = function() {
                    return this[i]
                }, this["set" + e] = function(t) {
                    this[i] = t, this._dontNotify || this._owner[this._setter](this)
                }
            }, V.each(["Point", "Size", "Center", "Left", "Top", "Right", "Bottom", "CenterX", "CenterY", "TopLeft", "TopRight", "BottomLeft", "BottomRight", "LeftCenter", "TopCenter", "RightCenter", "BottomCenter"], function(t) {
                var e = "set" + t;
                this[e] = function() {
                    this._dontNotify = !0, i[e].apply(this, arguments), this._dontNotify = !1, this._owner[this._setter](this)
                }
            }, {
                isSelected: function() {
                    return !!(2 & this._owner._selection)
                },
                setSelected: function(t) {
                    var e = this._owner;
                    e._changeSelection && e._changeSelection(2, t)
                }
            }))
        }),
        W = V.extend({
            _class: "Matrix",
            initialize: function t(e, i) {
                var n = arguments.length,
                    r = !0;
                if (6 <= n ? this._set.apply(this, arguments) : 1 === n || 2 === n ? e instanceof t ? this._set(e._a, e._b, e._c, e._d, e._tx, e._ty, i) : Array.isArray(e) ? this._set.apply(this, i ? e.concat([i]) : e) : r = !1 : n ? r = !1 : this.reset(), !r) throw new Error("Unsupported matrix parameters");
                return this
            },
            set: "#initialize",
            _set: function(t, e, i, n, r, s, a) {
                return this._a = t, this._b = e, this._c = i, this._d = n, this._tx = r, this._ty = s, a || this._changed(), this
            },
            _serialize: function(t, e) {
                return V.serialize(this.getValues(), t, !0, e)
            },
            _changed: function() {
                var t = this._owner;
                t && (t._applyMatrix ? t.transform(null, !0) : t._changed(25))
            },
            clone: function() {
                return new W(this._a, this._b, this._c, this._d, this._tx, this._ty)
            },
            equals: function(t) {
                return t === this || t && this._a === t._a && this._b === t._b && this._c === t._c && this._d === t._d && this._tx === t._tx && this._ty === t._ty
            },
            toString: function() {
                var t = b.instance;
                return "[[" + [t.number(this._a), t.number(this._c), t.number(this._tx)].join(", ") + "], [" + [t.number(this._b), t.number(this._d), t.number(this._ty)].join(", ") + "]]"
            },
            reset: function(t) {
                return this._a = this._d = 1, this._b = this._c = this._tx = this._ty = 0, t || this._changed(), this
            },
            apply: function(t, e) {
                var i = this._owner;
                return !!i && (i.transform(null, !0, V.pick(t, !0), e), this.isIdentity())
            },
            translate: function() {
                var t = Z.read(arguments),
                    e = t.x,
                    i = t.y;
                return this._tx += e * this._a + i * this._c, this._ty += e * this._b + i * this._d, this._changed(), this
            },
            scale: function() {
                var t = Z.read(arguments),
                    e = Z.read(arguments, 0, {
                        readNull: !0
                    });
                return e && this.translate(e), this._a *= t.x, this._b *= t.x, this._c *= t.y, this._d *= t.y, e && this.translate(e.negate()), this._changed(), this
            },
            rotate: function(t) {
                t *= Math.PI / 180;
                var e = Z.read(arguments, 1),
                    i = e.x,
                    n = e.y,
                    r = Math.cos(t),
                    s = Math.sin(t),
                    a = i - i * r + n * s,
                    o = n - i * s - n * r,
                    h = this._a,
                    u = this._b,
                    l = this._c,
                    c = this._d;
                return this._a = r * h + s * l, this._b = r * u + s * c, this._c = -s * h + r * l, this._d = -s * u + r * c, this._tx += a * h + o * l, this._ty += a * u + o * c, this._changed(), this
            },
            shear: function() {
                var t = Z.read(arguments),
                    e = Z.read(arguments, 0, {
                        readNull: !0
                    });
                e && this.translate(e);
                var i = this._a,
                    n = this._b;
                return this._a += t.y * this._c, this._b += t.y * this._d, this._c += t.x * i, this._d += t.x * n, e && this.translate(e.negate()), this._changed(), this
            },
            skew: function() {
                var t = Z.read(arguments),
                    e = Z.read(arguments, 0, {
                        readNull: !0
                    }),
                    i = Math.PI / 180,
                    n = new Z(Math.tan(t.x * i), Math.tan(t.y * i));
                return this.shear(n, e)
            },
            append: function(t, e) {
                if (t) {
                    var i = this._a,
                        n = this._b,
                        r = this._c,
                        s = this._d,
                        a = t._a,
                        o = t._c,
                        h = t._b,
                        u = t._d,
                        l = t._tx,
                        c = t._ty;
                    this._a = a * i + h * r, this._c = o * i + u * r, this._b = a * n + h * s, this._d = o * n + u * s, this._tx += l * i + c * r, this._ty += l * n + c * s, e || this._changed()
                }
                return this
            },
            prepend: function(t, e) {
                if (t) {
                    var i = this._a,
                        n = this._b,
                        r = this._c,
                        s = this._d,
                        a = this._tx,
                        o = this._ty,
                        h = t._a,
                        u = t._c,
                        l = t._b,
                        c = t._d,
                        f = t._tx,
                        d = t._ty;
                    this._a = h * i + u * n, this._c = h * r + u * s, this._b = l * i + c * n, this._d = l * r + c * s, this._tx = h * a + u * o + f, this._ty = l * a + c * o + d, e || this._changed()
                }
                return this
            },
            appended: function(t) {
                return this.clone().append(t)
            },
            prepended: function(t) {
                return this.clone().prepend(t)
            },
            invert: function() {
                var t = this._a,
                    e = this._b,
                    i = this._c,
                    n = this._d,
                    r = this._tx,
                    s = this._ty,
                    a = t * n - e * i,
                    o = null;
                return a && !isNaN(a) && isFinite(r) && isFinite(s) && (this._a = n / a, this._b = -e / a, this._c = -i / a, this._d = t / a, this._tx = (i * s - n * r) / a, this._ty = (e * r - t * s) / a, o = this), o
            },
            inverted: function() {
                return this.clone().invert()
            },
            concatenate: "#append",
            preConcatenate: "#prepend",
            chain: "#appended",
            _shiftless: function() {
                return new W(this._a, this._b, this._c, this._d, 0, 0)
            },
            _orNullIfIdentity: function() {
                return this.isIdentity() ? null : this
            },
            isIdentity: function() {
                return 1 === this._a && 0 === this._b && 0 === this._c && 1 === this._d && 0 === this._tx && 0 === this._ty
            },
            isInvertible: function() {
                var t = this._a * this._d - this._c * this._b;
                return t && !isNaN(t) && isFinite(this._tx) && isFinite(this._ty)
            },
            isSingular: function() {
                return !this.isInvertible()
            },
            transform: function(t, e, i) {
                return arguments.length < 3 ? this._transformPoint(Z.read(arguments)) : this._transformCoordinates(t, e, i)
            },
            _transformPoint: function(t, e, i) {
                var n = t.x,
                    r = t.y;
                return e || (e = new Z), e._set(n * this._a + r * this._c + this._tx, n * this._b + r * this._d + this._ty, i)
            },
            _transformCoordinates: function(t, e, i) {
                for (var n = 0, r = 2 * i; n < r; n += 2) {
                    var s = t[n],
                        a = t[n + 1];
                    e[n] = s * this._a + a * this._c + this._tx, e[n + 1] = s * this._b + a * this._d + this._ty
                }
                return e
            },
            _transformCorners: function(t) {
                var e = t.x,
                    i = t.y,
                    n = e + t.width,
                    r = i + t.height,
                    s = [e, i, n, i, n, r, e, r];
                return this._transformCoordinates(s, s, 4)
            },
            _transformBounds: function(t, e, i) {
                for (var n = this._transformCorners(t), r = n.slice(0, 2), s = r.slice(), a = 2; a < 8; a++) {
                    var o = n[a],
                        h = 1 & a;
                    o < r[h] ? r[h] = o : o > s[h] && (s[h] = o)
                }
                return e || (e = new T), e._set(r[0], r[1], s[0] - r[0], s[1] - r[1], i)
            },
            inverseTransform: function() {
                return this._inverseTransform(Z.read(arguments))
            },
            _inverseTransform: function(t, e, i) {
                var n = this._a,
                    r = this._b,
                    s = this._c,
                    a = this._d,
                    o = this._tx,
                    h = this._ty,
                    u = n * a - r * s,
                    l = null;
                if (u && !isNaN(u) && isFinite(o) && isFinite(h)) {
                    var c = t.x - this._tx,
                        f = t.y - this._ty;
                    e || (e = new Z), l = e._set((c * a - f * s) / u, (f * n - c * r) / u, i)
                }
                return l
            },
            decompose: function() {
                var t, e, i, n = this._a,
                    r = this._b,
                    s = this._c,
                    a = this._d,
                    o = n * a - r * s,
                    h = Math.sqrt,
                    u = Math.atan2,
                    l = 180 / Math.PI;
                if (0 !== n || 0 !== r) {
                    var c = h(n * n + r * r);
                    t = Math.acos(n / c) * (0 < r ? 1 : -1), e = [c, o / c], i = [u(n * s + r * a, c * c), 0]
                } else if (0 !== s || 0 !== a) {
                    var f = h(s * s + a * a);
                    t = Math.asin(s / f) * (0 < a ? 1 : -1), e = [o / f, f], i = [0, u(n * s + r * a, f * f)]
                } else i = e = [t = 0, 0];
                return {
                    translation: this.getTranslation(),
                    rotation: t * l,
                    scaling: new Z(e),
                    skewing: new Z(i[0] * l, i[1] * l)
                }
            },
            getValues: function() {
                return [this._a, this._b, this._c, this._d, this._tx, this._ty]
            },
            getTranslation: function() {
                return new Z(this._tx, this._ty)
            },
            getScaling: function() {
                return this.decompose().scaling
            },
            getRotation: function() {
                return this.decompose().rotation
            },
            applyToContext: function(t) {
                this.isIdentity() || t.transform(this._a, this._b, this._c, this._d, this._tx, this._ty)
            }
        }, V.each(["a", "b", "c", "d", "tx", "ty"], function(t) {
            var e = V.capitalize(t),
                i = "_" + t;
            this["get" + e] = function() {
                return this[i]
            }, this["set" + e] = function(t) {
                this[i] = t, this._changed()
            }
        }, {})),
        G = V.extend({
            _class: "Line",
            initialize: function(t, e, i, n, r) {
                (4 <= arguments.length ? (this._px = t, this._py = e, this._vx = i, this._vy = n, r) : (this._px = t.x, this._py = t.y, this._vx = e.x, this._vy = e.y, i)) || (this._vx -= this._px, this._vy -= this._py)
            },
            getPoint: function() {
                return new Z(this._px, this._py)
            },
            getVector: function() {
                return new Z(this._vx, this._vy)
            },
            getLength: function() {
                return this.getVector().getLength()
            },
            intersect: function(t, e) {
                return G.intersect(this._px, this._py, this._vx, this._vy, t._px, t._py, t._vx, t._vy, !0, e)
            },
            getSide: function(t, e) {
                return G.getSide(this._px, this._py, this._vx, this._vy, t.x, t.y, !0, e)
            },
            getDistance: function(t) {
                return Math.abs(this.getSignedDistance(t))
            },
            getSignedDistance: function(t) {
                return G.getSignedDistance(this._px, this._py, this._vx, this._vy, t.x, t.y, !0)
            },
            isCollinear: function(t) {
                return Z.isCollinear(this._vx, this._vy, t._vx, t._vy)
            },
            isOrthogonal: function(t) {
                return Z.isOrthogonal(this._vx, this._vy, t._vx, t._vy)
            },
            statics: {
                intersect: function(t, e, i, n, r, s, a, o, h, u) {
                    h || (i -= t, n -= e, a -= r, o -= s);
                    var l = i * o - n * a;
                    if (!H.isZero(l)) {
                        var c = t - r,
                            f = e - s,
                            d = (a * f - o * c) / l,
                            _ = (i * f - n * c) / l;
                        if (u || -1e-12 < d && d < 1 + 1e-12 && -1e-12 < _ && _ < 1 + 1e-12) return u || (d = d <= 0 ? 0 : 1 <= d ? 1 : d), new Z(t + d * i, e + d * n)
                    }
                },
                getSide: function(t, e, i, n, r, s, a, o) {
                    a || (i -= t, n -= e);
                    var h = r - t,
                        u = h * n - (s - e) * i;
                    return !o && H.isZero(u) && 0 <= (u = (h * i + h * i) / (i * i + n * n)) && u <= 1 && (u = 0), u < 0 ? -1 : 0 < u ? 1 : 0
                },
                getSignedDistance: function(t, e, i, n, r, s, a) {
                    return a || (i -= t, n -= e), 0 === i ? 0 < n ? r - t : t - r : 0 === n ? i < 0 ? s - e : e - s : ((r - t) * n - (s - e) * i) / Math.sqrt(i * i + n * n)
                },
                getDistance: function(t, e, i, n, r, s, a) {
                    return Math.abs(G.getSignedDistance(t, e, i, n, r, s, a))
                }
            }
        }),
        S = e.extend({
            _class: "Project",
            _list: "projects",
            _reference: "project",
            _compactSerialize: !0,
            initialize: function(t) {
                e.call(this, !0), this._children = [], this._namedChildren = {}, this._activeLayer = null, this._currentStyle = new _(null, null, this), this._view = X.create(this, t || it.getCanvas(1, 1)), this._selectionItems = {}, this._selectionCount = 0, this._updateVersion = 0
            },
            _serialize: function(t, e) {
                return V.serialize(this._children, t, !0, e)
            },
            _changed: function(t, e) {
                if (1 & t) {
                    var i = this._view;
                    i && (i._needsUpdate = !0, !i._requested && i._autoUpdate && i.requestUpdate())
                }
                var n = this._changes;
                if (n && e) {
                    var r = this._changesById,
                        s = e._id,
                        a = r[s];
                    a ? a.flags |= t : n.push(r[s] = {
                        item: e,
                        flags: t
                    })
                }
            },
            clear: function() {
                for (var t = this._children, e = t.length - 1; 0 <= e; e--) t[e].remove()
            },
            isEmpty: function() {
                return !this._children.length
            },
            remove: function t() {
                return !!t.base.call(this) && (this._view && this._view.remove(), !0)
            },
            getView: function() {
                return this._view
            },
            getCurrentStyle: function() {
                return this._currentStyle
            },
            setCurrentStyle: function(t) {
                this._currentStyle.set(t)
            },
            getIndex: function() {
                return this._index
            },
            getOptions: function() {
                return this._scope.settings
            },
            getLayers: function() {
                return this._children
            },
            getActiveLayer: function() {
                return this._activeLayer || new o({
                    project: this,
                    insert: !0
                })
            },
            getSymbolDefinitions: function() {
                var n = [],
                    r = {};
                return this.getItems({
                    class: a,
                    match: function(t) {
                        var e = t._definition,
                            i = e._id;
                        return r[i] || (r[i] = !0, n.push(e)), !1
                    }
                }), n
            },
            getSymbols: "getSymbolDefinitions",
            getSelectedItems: function() {
                var t = this._selectionItems,
                    e = [];
                for (var i in t) {
                    var n = t[i],
                        r = n._selection;
                    1 & r && n.isInserted() ? e.push(n) : r || this._updateSelection(n)
                }
                return e
            },
            _updateSelection: function(t) {
                var e = t._id,
                    i = this._selectionItems;
                t._selection ? i[e] !== t && (this._selectionCount++, i[e] = t) : i[e] === t && (this._selectionCount--, delete i[e])
            },
            selectAll: function() {
                for (var t = this._children, e = 0, i = t.length; e < i; e++) t[e].setFullySelected(!0)
            },
            deselectAll: function() {
                var t = this._selectionItems;
                for (var e in t) t[e].setFullySelected(!1)
            },
            addLayer: function(t) {
                return this.insertLayer(q, t)
            },
            insertLayer: function(t, e) {
                if (e instanceof o) {
                    e._remove(!1, !0), V.splice(this._children, [e], t, 0), e._setProject(this, !0);
                    var i = e._name;
                    i && e.setName(i), this._changes && e._changed(5), this._activeLayer || (this._activeLayer = e)
                } else e = null;
                return e
            },
            _insertItem: function(t, e, i) {
                return e = this.insertLayer(t, e) || (this._activeLayer || this._insertItem(q, new o(O.NO_INSERT), !0)).insertChild(t, e), i && e.activate && e.activate(), e
            },
            getItems: function(t) {
                return O._getItems(this, t)
            },
            getItem: function(t) {
                return O._getItems(this, t, null, null, !0)[0] || null
            },
            importJSON: function(t) {
                this.activate();
                var e = this._activeLayer;
                return V.importJSON(t, e && e.isEmpty() && e)
            },
            removeOn: function(t) {
                var e = this._removeSets;
                if (e) {
                    "mouseup" === t && (e.mousedrag = null);
                    var i = e[t];
                    if (i) {
                        for (var n in i) {
                            var r = i[n];
                            for (var s in e) {
                                var a = e[s];
                                a && a != i && delete a[r._id]
                            }
                            r.remove()
                        }
                        e[t] = null
                    }
                }
            },
            draw: function(t, e, i) {
                this._updateVersion++, t.save(), e.applyToContext(t);
                for (var n = this._children, r = new V({
                        offset: new Z(0, 0),
                        pixelRatio: i,
                        viewMatrix: e.isIdentity() ? null : e,
                        matrices: [new W],
                        updateMatrix: !0
                    }), s = 0, a = n.length; s < a; s++) n[s].draw(t, r);
                if (t.restore(), 0 < this._selectionCount) {
                    t.save(), t.strokeWidth = 1;
                    var o = this._selectionItems,
                        h = this._scope.settings.handleSize,
                        u = this._updateVersion;
                    for (var l in o) o[l]._drawSelection(t, e, h, o, u);
                    t.restore()
                }
            }
        }),
        O = V.extend(t, {
            statics: {
                extend: function t(e) {
                    return e._serializeFields && (e._serializeFields = V.set({}, this.prototype._serializeFields, e._serializeFields)), t.base.apply(this, arguments)
                },
                NO_INSERT: {
                    insert: !1
                }
            },
            _class: "Item",
            _name: null,
            _applyMatrix: !0,
            _canApplyMatrix: !0,
            _canScaleStroke: !1,
            _pivot: null,
            _visible: !0,
            _blendMode: "normal",
            _opacity: 1,
            _locked: !1,
            _guide: !1,
            _clipMask: !1,
            _selection: 0,
            _selectBounds: !0,
            _selectChildren: !1,
            _serializeFields: {
                name: null,
                applyMatrix: null,
                matrix: new W,
                pivot: null,
                visible: !0,
                blendMode: "normal",
                opacity: 1,
                locked: !1,
                guide: !1,
                clipMask: !1,
                selected: !1,
                data: {}
            },
            _prioritize: ["applyMatrix"]
        }, new function() {
            var t = ["onMouseDown", "onMouseUp", "onMouseDrag", "onClick", "onDoubleClick", "onMouseMove", "onMouseEnter", "onMouseLeave"];
            return V.each(t, function(t) {
                this._events[t] = {
                    install: function(t) {
                        this.getView()._countItemEvent(t, 1)
                    },
                    uninstall: function(t) {
                        this.getView()._countItemEvent(t, -1)
                    }
                }
            }, {
                _events: {
                    onFrame: {
                        install: function() {
                            this.getView()._animateItem(this, !0)
                        },
                        uninstall: function() {
                            this.getView()._animateItem(this, !1)
                        }
                    },
                    onLoad: {},
                    onError: {}
                },
                statics: {
                    _itemHandlers: t
                }
            })
        }, {
            initialize: function() {},
            _initialize: function(t, e) {
                var i = t && V.isPlainObject(t),
                    n = i && !0 === t.internal,
                    r = this._matrix = new W,
                    s = i && t.project || st.project,
                    a = st.settings;
                return this._id = n ? null : l.get(), this._parent = this._index = null, this._applyMatrix = this._canApplyMatrix && a.applyMatrix, e && r.translate(e), (r._owner = this)._style = new _(s._currentStyle, this, s), n || i && 0 == t.insert || !a.insertItems && (!i || !0 !== t.insert) ? this._setProject(s) : (i && t.parent || s)._insertItem(q, this, !0), i && t !== O.NO_INSERT && this.set(t, {
                    internal: !0,
                    insert: !0,
                    project: !0,
                    parent: !0
                }), i
            },
            _serialize: function(n, r) {
                var s = {},
                    a = this;

                function t(t) {
                    for (var e in t) {
                        var i = a[e];
                        V.equals(i, "leading" === e ? 1.2 * t.fontSize : t[e]) || (s[e] = V.serialize(i, n, "data" !== e, r))
                    }
                }
                return t(this._serializeFields), this instanceof C || t(this._style._defaults), [this._class, s]
            },
            _changed: function(t) {
                var e = this._symbol,
                    i = this._parent || e,
                    n = this._project;
                8 & t && (this._bounds = this._position = this._decomposed = q), 16 & t && (this._globalMatrix = q), i && 72 & t && O._clearBoundsCache(i), 2 & t && O._clearBoundsCache(this), n && n._changed(t, this), e && e._changed(t)
            },
            getId: function() {
                return this._id
            },
            getName: function() {
                return this._name
            },
            setName: function(t) {
                if (this._name && this._removeNamed(), t === +t + "") throw new Error("Names consisting only of numbers are not supported.");
                var e = this._getOwner();
                if (t && e) {
                    var i = e._children,
                        n = e._namedChildren;
                    (n[t] = n[t] || []).push(this), t in i || (i[t] = this)
                }
                this._name = t || q, this._changed(256)
            },
            getStyle: function() {
                return this._style
            },
            setStyle: function(t) {
                this.getStyle().set(t)
            }
        }, V.each(["locked", "visible", "blendMode", "opacity", "guide"], function(e) {
            var t = V.capitalize(e),
                i = "_" + e,
                n = {
                    locked: 256,
                    visible: 265
                };
            this["get" + t] = function() {
                return this[i]
            }, this["set" + t] = function(t) {
                t != this[i] && (this[i] = t, this._changed(n[e] || 257))
            }
        }, {}), {
            beans: !0,
            getSelection: function() {
                return this._selection
            },
            setSelection: function(t) {
                if (t !== this._selection) {
                    this._selection = t;
                    var e = this._project;
                    e && (e._updateSelection(this), this._changed(257))
                }
            },
            _changeSelection: function(t, e) {
                var i = this._selection;
                this.setSelection(e ? i | t : i & ~t)
            },
            isSelected: function() {
                if (this._selectChildren)
                    for (var t = this._children, e = 0, i = t.length; e < i; e++)
                        if (t[e].isSelected()) return !0;
                return !!(1 & this._selection)
            },
            setSelected: function(t) {
                if (this._selectChildren)
                    for (var e = this._children, i = 0, n = e.length; i < n; i++) e[i].setSelected(t);
                this._changeSelection(1, t)
            },
            isFullySelected: function() {
                var t = this._children,
                    e = !!(1 & this._selection);
                if (t && e) {
                    for (var i = 0, n = t.length; i < n; i++)
                        if (!t[i].isFullySelected()) return !1;
                    return !0
                }
                return e
            },
            setFullySelected: function(t) {
                var e = this._children;
                if (e)
                    for (var i = 0, n = e.length; i < n; i++) e[i].setFullySelected(t);
                this._changeSelection(1, t)
            },
            isClipMask: function() {
                return this._clipMask
            },
            setClipMask: function(t) {
                this._clipMask != (t = !!t) && ((this._clipMask = t) && (this.setFillColor(null), this.setStrokeColor(null)), this._changed(257), this._parent && this._parent._changed(2048))
            },
            getData: function() {
                return this._data || (this._data = {}), this._data
            },
            setData: function(t) {
                this._data = t
            },
            getPosition: function(t) {
                var e = t ? Z : f,
                    i = this._position || (this._position = this._getPositionFromBounds());
                return new e(i.x, i.y, this, "setPosition")
            },
            setPosition: function() {
                this.translate(Z.read(arguments).subtract(this.getPosition(!0)))
            },
            _getPositionFromBounds: function(t) {
                return this._pivot ? this._matrix._transformPoint(this._pivot) : (t || this.getBounds()).getCenter(!0)
            },
            getPivot: function() {
                var t = this._pivot;
                return t ? new f(t.x, t.y, this, "setPivot") : null
            },
            setPivot: function() {
                this._pivot = Z.read(arguments, 0, {
                    clone: !0,
                    readNull: !0
                }), this._position = q
            }
        }, V.each({
            getStrokeBounds: {
                stroke: !0
            },
            getHandleBounds: {
                handle: !0
            },
            getInternalBounds: {
                internal: !0
            }
        }, function(e, t) {
            this[t] = function(t) {
                return this.getBounds(t, e)
            }
        }, {
            beans: !0,
            getBounds: function(t, e) {
                var i = e || t instanceof W,
                    n = V.set({}, i ? e : t, this._boundsOptions);
                n.stroke && !this.getStrokeScaling() || (n.cacheItem = this);
                var r = this._getCachedBounds(i && t, n).rect;
                return arguments.length ? r : new s(r.x, r.y, r.width, r.height, this, "setBounds")
            },
            setBounds: function() {
                var t = T.read(arguments),
                    e = this.getBounds(),
                    i = this._matrix,
                    n = new W,
                    r = t.getCenter();
                n.translate(r), t.width == e.width && t.height == e.height || (i.isInvertible() || (i.set(i._backup || (new W).translate(i.getTranslation())), e = this.getBounds()), n.scale(0 !== e.width ? t.width / e.width : 0, 0 !== e.height ? t.height / e.height : 0)), r = e.getCenter(), n.translate(-r.x, -r.y), this.transform(n)
            },
            _getBounds: function(t, e) {
                var i = this._children;
                return i && i.length ? (O._updateBoundsCache(this, e.cacheItem), O._getBounds(i, t, e)) : new T
            },
            _getBoundsCacheKey: function(t, e) {
                return [t.stroke ? 1 : 0, t.handle ? 1 : 0, e ? 1 : 0].join("")
            },
            _getCachedBounds: function(t, e, i) {
                t = t && t._orNullIfIdentity();
                var n = e.internal && !i,
                    r = e.cacheItem,
                    s = n ? null : this._matrix._orNullIfIdentity(),
                    a = r && (!t || t.equals(s)) && this._getBoundsCacheKey(e, n),
                    o = this._bounds;
                if (O._updateBoundsCache(this._parent || this._symbol, r), a && o && a in o) return {
                    rect: (f = o[a]).rect.clone(),
                    nonscaling: f.nonscaling
                };
                var h = this._getBounds(t || s, e),
                    u = h.rect || h,
                    l = this._style,
                    c = h.nonscaling || l.hasStroke() && !l.getStrokeScaling();
                if (a) {
                    o || (this._bounds = o = {});
                    var f = o[a] = {
                        rect: u.clone(),
                        nonscaling: c,
                        internal: n
                    }
                }
                return {
                    rect: u,
                    nonscaling: c
                }
            },
            _getStrokeMatrix: function(t, e) {
                var i = this.getStrokeScaling() ? null : e && e.internal ? this : this._parent || this._symbol && this._symbol._item,
                    n = i ? i.getViewMatrix().invert() : t;
                return n && n._shiftless()
            },
            statics: {
                _updateBoundsCache: function(t, e) {
                    if (t && e) {
                        var i = e._id,
                            n = t._boundsCache = t._boundsCache || {
                                ids: {},
                                list: []
                            };
                        n.ids[i] || (n.list.push(e), n.ids[i] = e)
                    }
                },
                _clearBoundsCache: function(t) {
                    var e = t._boundsCache;
                    if (e) {
                        t._bounds = t._position = t._boundsCache = q;
                        for (var i = 0, n = e.list, r = n.length; i < r; i++) {
                            var s = n[i];
                            s !== t && (s._bounds = s._position = q, s._boundsCache && O._clearBoundsCache(s))
                        }
                    }
                },
                _getBounds: function(t, e, i) {
                    var n = 1 / 0,
                        r = -n,
                        s = n,
                        a = r,
                        o = !1;
                    i = i || {};
                    for (var h = 0, u = t.length; h < u; h++) {
                        var l = t[h];
                        if (l._visible && !l.isEmpty()) {
                            var c = l._getCachedBounds(e && e.appended(l._matrix), i, !0),
                                f = c.rect;
                            n = Math.min(f.x, n), s = Math.min(f.y, s), r = Math.max(f.x + f.width, r), a = Math.max(f.y + f.height, a), c.nonscaling && (o = !0)
                        }
                    }
                    return {
                        rect: isFinite(n) ? new T(n, s, r - n, a - s) : new T,
                        nonscaling: o
                    }
                }
            }
        }), {
            beans: !0,
            _decompose: function() {
                return this._applyMatrix ? null : this._decomposed || (this._decomposed = this._matrix.decompose())
            },
            getRotation: function() {
                var t = this._decompose();
                return t ? t.rotation : 0
            },
            setRotation: function(t) {
                var e = this.getRotation();
                if (null != e && null != t) {
                    var i = this._decomposed;
                    this.rotate(t - e), i && (i.rotation = t, this._decomposed = i)
                }
            },
            getScaling: function() {
                var t = this._decompose(),
                    e = t && t.scaling;
                return new f(e ? e.x : 1, e ? e.y : 1, this, "setScaling")
            },
            setScaling: function() {
                var t = this.getScaling(),
                    e = Z.read(arguments, 0, {
                        clone: !0,
                        readNull: !0
                    });
                if (t && e && !t.equals(e)) {
                    var i = this.getRotation(),
                        n = this._decomposed,
                        r = new W,
                        s = this.getPosition(!0);
                    r.translate(s), i && r.rotate(i), r.scale(e.x / t.x, e.y / t.y), i && r.rotate(-i), r.translate(s.negate()), this.transform(r), n && (n.scaling = e, this._decomposed = n)
                }
            },
            getMatrix: function() {
                return this._matrix
            },
            setMatrix: function() {
                var t = this._matrix;
                t.initialize.apply(t, arguments)
            },
            getGlobalMatrix: function(t) {
                var e = this._globalMatrix;
                if (e)
                    for (var i = this._parent, n = []; i;) {
                        if (!i._globalMatrix) {
                            e = null;
                            for (var r = 0, s = n.length; r < s; r++) n[r]._globalMatrix = null;
                            break
                        }
                        n.push(i), i = i._parent
                    }
                e || (e = this._globalMatrix = this._matrix.clone(), (i = this._parent) && e.prepend(i.getGlobalMatrix(!0)));
                return t ? e : e.clone()
            },
            getViewMatrix: function() {
                return this.getGlobalMatrix().prepend(this.getView()._matrix)
            },
            getApplyMatrix: function() {
                return this._applyMatrix
            },
            setApplyMatrix: function(t) {
                (this._applyMatrix = this._canApplyMatrix && !!t) && this.transform(null, !0)
            },
            getTransformContent: "#getApplyMatrix",
            setTransformContent: "#setApplyMatrix"
        }, {
            getProject: function() {
                return this._project
            },
            _setProject: function(t, e) {
                if (this._project !== t) {
                    this._project && this._installEvents(!1), this._project = t;
                    for (var i = this._children, n = 0, r = i && i.length; n < r; n++) i[n]._setProject(t);
                    e = !0
                }
                e && this._installEvents(!0)
            },
            getView: function() {
                return this._project._view
            },
            _installEvents: function t(e) {
                t.base.call(this, e);
                for (var i = this._children, n = 0, r = i && i.length; n < r; n++) i[n]._installEvents(e)
            },
            getLayer: function() {
                for (var t = this; t = t._parent;)
                    if (t instanceof o) return t;
                return null
            },
            getParent: function() {
                return this._parent
            },
            setParent: function(t) {
                return t.addChild(this)
            },
            _getOwner: "#getParent",
            getChildren: function() {
                return this._children
            },
            setChildren: function(t) {
                this.removeChildren(), this.addChildren(t)
            },
            getFirstChild: function() {
                return this._children && this._children[0] || null
            },
            getLastChild: function() {
                return this._children && this._children[this._children.length - 1] || null
            },
            getNextSibling: function() {
                var t = this._getOwner();
                return t && t._children[this._index + 1] || null
            },
            getPreviousSibling: function() {
                var t = this._getOwner();
                return t && t._children[this._index - 1] || null
            },
            getIndex: function() {
                return this._index
            },
            equals: function(t) {
                return t === this || t && this._class === t._class && this._style.equals(t._style) && this._matrix.equals(t._matrix) && this._locked === t._locked && this._visible === t._visible && this._blendMode === t._blendMode && this._opacity === t._opacity && this._clipMask === t._clipMask && this._guide === t._guide && this._equals(t) || !1
            },
            _equals: function(t) {
                return V.equals(this._children, t._children)
            },
            clone: function(t) {
                var e = new this.constructor(O.NO_INSERT),
                    i = this._children,
                    n = V.pick(t ? t.insert : q, t === q || !0 === t),
                    r = V.pick(t ? t.deep : q, !0);
                i && e.copyAttributes(this), i && !r || e.copyContent(this), i || e.copyAttributes(this), n && e.insertAbove(this);
                var s = this._name,
                    a = this._parent;
                if (s && a) {
                    i = a._children;
                    for (var o = s, h = 1; i[s];) s = o + " " + h++;
                    s !== o && e.setName(s)
                }
                return e
            },
            copyContent: function(t) {
                for (var e = t._children, i = 0, n = e && e.length; i < n; i++) this.addChild(e[i].clone(!1), !0)
            },
            copyAttributes: function(t, e) {
                this.setStyle(t._style);
                for (var i = ["_locked", "_visible", "_blendMode", "_opacity", "_clipMask", "_guide"], n = 0, r = i.length; n < r; n++) {
                    var s = i[n];
                    t.hasOwnProperty(s) && (this[s] = t[s])
                }
                e || this._matrix.set(t._matrix, !0), this.setApplyMatrix(t._applyMatrix), this.setPivot(t._pivot), this.setSelection(t._selection);
                var a = t._data,
                    o = t._name;
                this._data = a ? V.clone(a) : null, o && this.setName(o)
            },
            rasterize: function(t, e) {
                var i = this.getStrokeBounds(),
                    n = (t || this.getView().getResolution()) / 72,
                    r = i.getTopLeft().floor(),
                    s = i.getBottomRight().ceil(),
                    a = new U(s.subtract(r)),
                    o = new I(O.NO_INSERT);
                if (!a.isZero()) {
                    var h = it.getCanvas(a.multiply(n)),
                        u = h.getContext("2d"),
                        l = (new W).scale(n).translate(r.negate());
                    u.save(), l.applyToContext(u), this.draw(u, new V({
                        matrices: [l]
                    })), u.restore(), o.setCanvas(h)
                }
                return o.transform((new W).translate(r.add(a.divide(2))).scale(1 / n)), (e === q || e) && o.insertAbove(this), o
            },
            contains: function() {
                return !!this._contains(this._matrix._inverseTransform(Z.read(arguments)))
            },
            _contains: function(t) {
                var e = this._children;
                if (e) {
                    for (var i = e.length - 1; 0 <= i; i--)
                        if (e[i].contains(t)) return !0;
                    return !1
                }
                return t.isInside(this.getInternalBounds())
            },
            isInside: function() {
                return T.read(arguments).contains(this.getBounds())
            },
            _asPathItem: function() {
                return new F.Rectangle({
                    rectangle: this.getInternalBounds(),
                    matrix: this._matrix,
                    insert: !1
                })
            },
            intersects: function(t, e) {
                return t instanceof O && 0 < this._asPathItem().getIntersections(t._asPathItem(), null, e, !0).length
            }
        }, new function() {
            function t() {
                return this._hitTest(Z.read(arguments), A.getOptions(arguments))
            }

            function e() {
                var t = Z.read(arguments),
                    e = A.getOptions(arguments),
                    i = [];
                return this._hitTest(t, V.set({
                    all: i
                }, e)), i
            }

            function i(t, e, i, n) {
                var r = this._children;
                if (r)
                    for (var s = r.length - 1; 0 <= s; s--) {
                        var a = r[s],
                            o = a !== n && a._hitTest(t, e, i);
                        if (o && !e.all) return o
                    }
                return null
            }
            return S.inject({
                hitTest: t,
                hitTestAll: e,
                _hitTest: i
            }), {
                hitTest: t,
                hitTestAll: e,
                _hitTestChildren: i
            }
        }, {
            _hitTest: function(n, e, t) {
                if (this._locked || !this._visible || this._guide && !e.guides || this.isEmpty()) return null;
                var i = this._matrix,
                    r = t ? t.appended(i) : this.getGlobalMatrix().prepend(this.getView()._matrix),
                    s = Math.max(e.tolerance, 1e-12),
                    a = e._tolerancePadding = new U(F._getStrokePadding(s, i._shiftless().invert()));
                if (!(n = i._inverseTransform(n)) || !this._children && !this.getBounds({
                        internal: !0,
                        stroke: !0,
                        handle: !0
                    }).expand(a.multiply(2))._containsPoint(n)) return null;
                var o, h, u = !(e.guides && !this._guide || e.selected && !this.isSelected() || e.type && e.type !== V.hyphenate(this._class) || e.class && !(this instanceof e.class)),
                    l = e.match,
                    c = this;

                function f(t) {
                    return t && l && !l(t) && (t = null), t && e.all && e.all.push(t), t
                }

                function d(t, e) {
                    var i = e ? o["get" + e]() : c.getPosition();
                    if (n.subtract(i).divide(a).length <= 1) return new A(t, c, {
                        name: e ? V.hyphenate(e) : t,
                        point: i
                    })
                }
                var _ = e.position,
                    g = e.center,
                    v = e.bounds;
                if (u && this._parent && (_ || g || v)) {
                    if ((g || v) && (o = this.getInternalBounds()), !(h = _ && d("position") || g && d("center", "Center")) && v)
                        for (var p = ["TopLeft", "TopRight", "BottomLeft", "BottomRight", "LeftCenter", "TopCenter", "RightCenter", "BottomCenter"], m = 0; m < 8 && !h; m++) h = d("bounds", p[m]);
                    h = f(h)
                }
                return h || (h = this._hitTestChildren(n, e, r) || u && f(this._hitTestSelf(n, e, r, this.getStrokeScaling() ? null : r._shiftless().invert())) || null), h && h.point && (h.point = i.transform(h.point)), h
            },
            _hitTestSelf: function(t, e) {
                if (e.fill && this.hasFill() && this._contains(t)) return new A("fill", this)
            },
            matches: function(t, e) {
                var i = typeof t;
                if ("object" === i) {
                    for (var n in t)
                        if (t.hasOwnProperty(n) && !this.matches(n, t[n])) return !1;
                    return !0
                }
                if ("function" === i) return t(this);
                if ("match" === t) return e(this);
                var r = /^(empty|editable)$/.test(t) ? this["is" + V.capitalize(t)]() : "type" === t ? V.hyphenate(this._class) : this[t];
                if ("class" === t) {
                    if ("function" == typeof e) return this instanceof e;
                    r = this._class
                }
                if ("function" == typeof e) return !!e(r);
                if (e) {
                    if (e.test) return e.test(r);
                    if (V.isPlainObject(e)) return function t(e, i) {
                        for (var n in e)
                            if (e.hasOwnProperty(n)) {
                                var r = e[n],
                                    s = i[n];
                                if (V.isPlainObject(r) && V.isPlainObject(s)) {
                                    if (!t(r, s)) return !1
                                } else if (!V.equals(r, s)) return !1
                            }
                        return !0
                    }(e, r)
                }
                return V.equals(r, e)
            },
            getItems: function(t) {
                return O._getItems(this, t, this._matrix)
            },
            getItem: function(t) {
                return O._getItems(this, t, this._matrix, null, !0)[0] || null
            },
            statics: {
                _getItems: function t(e, i, n, r, s) {
                    if (!r) {
                        var a = "object" == typeof i && i,
                            o = a && a.overlapping,
                            h = a && a.inside,
                            u = (p = o || h) && T.read([p]);
                        r = {
                            items: [],
                            recursive: a && !1 !== a.recursive,
                            inside: !!h,
                            overlapping: !!o,
                            rect: u,
                            path: o && new F.Rectangle({
                                rectangle: u,
                                insert: !1
                            })
                        }, a && (i = V.filter({}, i, {
                            recursive: !0,
                            inside: !0,
                            overlapping: !0
                        }))
                    }
                    var l = e._children,
                        c = r.items;
                    n = (u = r.rect) && (n || new W);
                    for (var f = 0, d = l && l.length; f < d; f++) {
                        var _ = l[f],
                            g = n && n.appended(_._matrix),
                            v = !0;
                        if (u) {
                            var p = _.getBounds(g);
                            if (!u.intersects(p)) continue;
                            u.contains(p) || r.overlapping && (p.contains(u) || r.path.intersects(_, g)) || (v = !1)
                        }
                        if (v && _.matches(i) && (c.push(_), s)) break;
                        if (!1 !== r.recursive && t(_, i, g, r, s), s && 0 < c.length) break
                    }
                    return c
                }
            }
        }, {
            importJSON: function(t) {
                var e = V.importJSON(t, this);
                return e !== this ? this.addChild(e) : e
            },
            addChild: function(t) {
                return this.insertChild(q, t)
            },
            insertChild: function(t, e) {
                var i = e ? this.insertChildren(t, [e]) : null;
                return i && i[0]
            },
            addChildren: function(t) {
                return this.insertChildren(this._children.length, t)
            },
            insertChildren: function(t, e) {
                var i = this._children;
                if (i && e && 0 < e.length) {
                    for (var n = {}, r = (e = V.slice(e)).length - 1; 0 <= r; r--) {
                        var s = (u = e[r]) && u._id;
                        !u || n[s] ? e.splice(r, 1) : (u._remove(!1, !0), n[s] = !0)
                    }
                    V.splice(i, e, t, 0);
                    for (var a = this._project, o = a._changes, h = (r = 0, e.length); r < h; r++) {
                        var u, l = (u = e[r])._name;
                        u._parent = this, u._setProject(a, !0), l && u.setName(l), o && u._changed(5)
                    }
                    this._changed(11)
                } else e = null;
                return e
            },
            _insertItem: "#insertChild",
            _insertAt: function(t, e) {
                var i = t && t._getOwner(),
                    n = t !== this && i ? this : null;
                return n && (n._remove(!1, !0), i._insertItem(t._index + e, n)), n
            },
            insertAbove: function(t) {
                return this._insertAt(t, 1)
            },
            insertBelow: function(t) {
                return this._insertAt(t, 0)
            },
            sendToBack: function() {
                var t = this._getOwner();
                return t ? t._insertItem(0, this) : null
            },
            bringToFront: function() {
                var t = this._getOwner();
                return t ? t._insertItem(q, this) : null
            },
            appendTop: "#addChild",
            appendBottom: function(t) {
                return this.insertChild(0, t)
            },
            moveAbove: "#insertAbove",
            moveBelow: "#insertBelow",
            addTo: function(t) {
                return t._insertItem(q, this)
            },
            copyTo: function(t) {
                return this.clone(!1).addTo(t)
            },
            reduce: function(t) {
                var e = this._children;
                if (e && 1 === e.length) {
                    var i = e[0].reduce(t);
                    return this._parent ? (i.insertAbove(this), this.remove()) : i.remove(), i
                }
                return this
            },
            _removeNamed: function() {
                var t = this._getOwner();
                if (t) {
                    var e = t._children,
                        i = t._namedChildren,
                        n = this._name,
                        r = i[n],
                        s = r ? r.indexOf(this) : -1; - 1 !== s && (e[n] == this && delete e[n], r.splice(s, 1), r.length ? e[n] = r[0] : delete i[n])
                }
            },
            _remove: function(t, e) {
                var i = this._getOwner(),
                    n = this._project,
                    r = this._index;
                return this._style && this._style._dispose(), !!i && (this._name && this._removeNamed(), null != r && (n._activeLayer === this && (n._activeLayer = this.getNextSibling() || this.getPreviousSibling()), V.splice(i._children, null, r, 1)), this._installEvents(!1), t && n._changes && this._changed(5), e && i._changed(11, this), !(this._parent = null))
            },
            remove: function() {
                return this._remove(!0, !0)
            },
            replaceWith: function(t) {
                var e = t && t.insertBelow(this);
                return e && this.remove(), e
            },
            removeChildren: function(t, e) {
                if (!this._children) return null;
                t = t || 0, e = V.pick(e, this._children.length);
                for (var i = V.splice(this._children, null, t, e - t), n = i.length - 1; 0 <= n; n--) i[n]._remove(!0, !1);
                return 0 < i.length && this._changed(11), i
            },
            clear: "#removeChildren",
            reverseChildren: function() {
                if (this._children) {
                    this._children.reverse();
                    for (var t = 0, e = this._children.length; t < e; t++) this._children[t]._index = t;
                    this._changed(11)
                }
            },
            isEmpty: function() {
                var t = this._children;
                return !t || !t.length
            },
            isEditable: function() {
                for (var t = this; t;) {
                    if (!t._visible || t._locked) return !1;
                    t = t._parent
                }
                return !0
            },
            hasFill: function() {
                return this.getStyle().hasFill()
            },
            hasStroke: function() {
                return this.getStyle().hasStroke()
            },
            hasShadow: function() {
                return this.getStyle().hasShadow()
            },
            _getOrder: function(t) {
                function e(t) {
                    for (var e = []; e.unshift(t), t = t._parent;);
                    return e
                }
                for (var i = e(this), n = e(t), r = 0, s = Math.min(i.length, n.length); r < s; r++)
                    if (i[r] != n[r]) return i[r]._index < n[r]._index ? 1 : -1;
                return 0
            },
            hasChildren: function() {
                return this._children && 0 < this._children.length
            },
            isInserted: function() {
                return !!this._parent && this._parent.isInserted()
            },
            isAbove: function(t) {
                return -1 === this._getOrder(t)
            },
            isBelow: function(t) {
                return 1 === this._getOrder(t)
            },
            isParent: function(t) {
                return this._parent === t
            },
            isChild: function(t) {
                return t && t._parent === this
            },
            isDescendant: function(t) {
                for (var e = this; e = e._parent;)
                    if (e === t) return !0;
                return !1
            },
            isAncestor: function(t) {
                return !!t && t.isDescendant(this)
            },
            isSibling: function(t) {
                return this._parent === t._parent
            },
            isGroupedWith: function(t) {
                for (var e = this._parent; e;) {
                    if (e._parent && /^(Group|Layer|CompoundPath)$/.test(e._class) && t.isDescendant(e)) return !0;
                    e = e._parent
                }
                return !1
            }
        }, V.each(["rotate", "scale", "shear", "skew"], function(i) {
            var n = "rotate" === i;
            this[i] = function() {
                var t = (n ? V : Z).read(arguments),
                    e = Z.read(arguments, 0, {
                        readNull: !0
                    });
                return this.transform((new W)[i](t, e || this.getPosition(!0)))
            }
        }, {
            translate: function() {
                var t = new W;
                return this.transform(t.translate.apply(t, arguments))
            },
            transform: function(t, e, i, n) {
                var r = this._matrix,
                    s = t && !t.isIdentity(),
                    a = (e || this._applyMatrix) && (!r.isIdentity() || s || e && i && this._children);
                if (!s && !a) return this;
                if (s) {
                    !t.isInvertible() && r.isInvertible() && (r._backup = r.getValues()), r.prepend(t, !0);
                    var o = this._style,
                        h = o.getFillColor(!0),
                        u = o.getStrokeColor(!0);
                    h && h.transform(t), u && u.transform(t)
                }
                if (a && (a = this._transformContent(r, i, n))) {
                    var l = this._pivot;
                    l && r._transformPoint(l, l, !0), r.reset(!0), n && this._canApplyMatrix && (this._applyMatrix = !0)
                }
                var c = this._bounds,
                    f = this._position;
                (s || a) && this._changed(25);
                var d = s && c && t.decompose();
                if (d && d.skewing.isZero() && d.rotation % 90 == 0) {
                    for (var _ in c) {
                        var g = c[_];
                        if (g.nonscaling) delete c[_];
                        else if (a || !g.internal) {
                            var v = g.rect;
                            t._transformBounds(v, v)
                        }
                    }
                    var p = (this._bounds = c)[this._getBoundsCacheKey(this._boundsOptions || {})];
                    p && (this._position = this._getPositionFromBounds(p.rect))
                } else s && f && this._pivot && (this._position = t._transformPoint(f, f));
                return this
            },
            _transformContent: function(t, e, i) {
                var n = this._children;
                if (n) {
                    for (var r = 0, s = n.length; r < s; r++) n[r].transform(t, !0, e, i);
                    return !0
                }
            },
            globalToLocal: function() {
                return this.getGlobalMatrix(!0)._inverseTransform(Z.read(arguments))
            },
            localToGlobal: function() {
                return this.getGlobalMatrix(!0)._transformPoint(Z.read(arguments))
            },
            parentToLocal: function() {
                return this._matrix._inverseTransform(Z.read(arguments))
            },
            localToParent: function() {
                return this._matrix._transformPoint(Z.read(arguments))
            },
            fitBounds: function(t, e) {
                t = T.read(arguments);
                var i = this.getBounds(),
                    n = i.height / i.width,
                    r = t.height / t.width,
                    s = (e ? r < n : n < r) ? t.width / i.width : t.height / i.height,
                    a = new T(new Z, new U(i.width * s, i.height * s));
                a.setCenter(t.getCenter()), this.setBounds(a)
            }
        }), {
            _setStyles: function(t, e, i) {
                var n = this._style,
                    r = this._matrix;
                if (n.hasFill() && (t.fillStyle = n.getFillColor().toCanvasStyle(t, r)), n.hasStroke()) {
                    t.strokeStyle = n.getStrokeColor().toCanvasStyle(t, r), t.lineWidth = n.getStrokeWidth();
                    var s = n.getStrokeJoin(),
                        a = n.getStrokeCap(),
                        o = n.getMiterLimit();
                    if (s && (t.lineJoin = s), a && (t.lineCap = a), o && (t.miterLimit = o), st.support.nativeDash) {
                        var h = n.getDashArray(),
                            u = n.getDashOffset();
                        h && h.length && ("setLineDash" in t ? (t.setLineDash(h), t.lineDashOffset = u) : (t.mozDash = h, t.mozDashOffset = u))
                    }
                }
                if (n.hasShadow()) {
                    var l = e.pixelRatio || 1,
                        c = i._shiftless().prepend((new W).scale(l, l)),
                        f = c.transform(new Z(n.getShadowBlur(), 0)),
                        d = c.transform(this.getShadowOffset());
                    t.shadowColor = n.getShadowColor().toCanvasStyle(t), t.shadowBlur = f.getLength(), t.shadowOffsetX = d.x, t.shadowOffsetY = d.y
                }
            },
            draw: function(t, e, i) {
                this._updateVersion = this._project._updateVersion;
                if (this._visible && 0 !== this._opacity) {
                    var n = e.matrices,
                        r = e.viewMatrix,
                        s = this._matrix,
                        a = n[n.length - 1].appended(s);
                    if (a.isInvertible()) {
                        r = r ? r.appended(a) : a, n.push(a), e.updateMatrix && (this._globalMatrix = a);
                        var o, h, u, l = this._blendMode,
                            c = this._opacity,
                            f = "normal" === l,
                            d = x.nativeModes[l],
                            _ = f && 1 === c || e.dontStart || e.clip || (d || f && c < 1) && this._canComposite(),
                            g = e.pixelRatio || 1;
                        if (!_) {
                            var v = this.getStrokeBounds(r);
                            if (!v.width || !v.height) return void n.pop();
                            u = e.offset, h = e.offset = v.getTopLeft().floor(), o = t, t = it.getContext(v.getSize().ceil().add(1).multiply(g)), 1 !== g && t.scale(g, g)
                        }
                        t.save();
                        var p = i ? i.appended(s) : this._canScaleStroke && !this.getStrokeScaling(!0) && r,
                            m = !_ && e.clipItem,
                            y = !p || m;
                        if (_ ? (t.globalAlpha = c, d && (t.globalCompositeOperation = l)) : y && t.translate(-h.x, -h.y), y && (_ ? s : r).applyToContext(t), m && e.clipItem.draw(t, e.extend({
                                clip: !0
                            })), p) {
                            t.setTransform(g, 0, 0, g, 0, 0);
                            var w = e.offset;
                            w && t.translate(-w.x, -w.y)
                        }
                        this._draw(t, e, r, p), t.restore(), n.pop(), e.clip && !e.dontFinish && t.clip(), _ || (x.process(l, t, o, c, h.subtract(u).multiply(g)), it.release(t), e.offset = u)
                    }
                }
            },
            _isUpdated: function(t) {
                var e = this._parent;
                if (e instanceof D) return e._isUpdated(t);
                var i = this._updateVersion === t;
                return !i && e && e._visible && e._isUpdated(t) && (this._updateVersion = t, i = !0), i
            },
            _drawSelection: function(t, e, i, n, r) {
                var s = this._selection,
                    a = 1 & s,
                    o = 2 & s || a && this._selectBounds,
                    h = 4 & s;
                if (this._drawSelected || (a = !1), (a || o || h) && this._isUpdated(r)) {
                    var u, l = this.getSelectedColor(!0) || (u = this.getLayer()) && u.getSelectedColor(!0),
                        c = e.appended(this.getGlobalMatrix(!0)),
                        f = i / 2;
                    if (t.strokeStyle = t.fillStyle = l ? l.toCanvasStyle(t) : "#009dec", a && this._drawSelected(t, c, n), h) {
                        var d = this.getPosition(!0),
                            _ = this._parent,
                            g = _ ? _.localToGlobal(d) : d,
                            v = g.x,
                            p = g.y;
                        t.beginPath(), t.arc(v, p, f, 0, 2 * Math.PI, !0), t.stroke();
                        for (var m = [
                                [0, -1],
                                [1, 0],
                                [0, 1],
                                [-1, 0]
                            ], y = f, w = i + 1, x = 0; x < 4; x++) {
                            var b = m[x],
                                S = b[0],
                                C = b[1];
                            t.moveTo(v + S * y, p + C * y), t.lineTo(v + S * w, p + C * w), t.stroke()
                        }
                    }
                    if (o) {
                        var P = c._transformCorners(this.getInternalBounds());
                        t.beginPath();
                        for (x = 0; x < 8; x++) t[x ? "lineTo" : "moveTo"](P[x], P[++x]);
                        t.closePath(), t.stroke();
                        for (x = 0; x < 8; x++) t.fillRect(P[x] - f, P[++x] - f, i, i)
                    }
                }
            },
            _canComposite: function() {
                return !1
            }
        }, V.each(["down", "drag", "up", "move"], function(e) {
            this["removeOn" + V.capitalize(e)] = function() {
                var t = {};
                return t[e] = !0, this.removeOn(t)
            }
        }, {
            removeOn: function(t) {
                for (var e in t)
                    if (t[e]) {
                        var i = "mouse" + e,
                            n = this._project,
                            r = n._removeSets = n._removeSets || {};
                        r[i] = r[i] || {}, r[i][this._id] = this
                    }
                return this
            }
        }), {
            tween: function(t, e, i) {
                i || (i = e, e = t, t = null, i || (i = e, e = null));
                var n = i && i.easing,
                    r = i && i.start,
                    s = null != i && ("number" == typeof i ? i : i.duration),
                    a = new y(this, t, e, s, n, r);
                return s && this.on("frame", function t(e) {
                    a._handleFrame(1e3 * e.time), a.running || this.off("frame", t)
                }), a
            },
            tweenTo: function(t, e) {
                return this.tween(null, t, e)
            },
            tweenFrom: function(t, e) {
                return this.tween(t, null, e)
            }
        }),
        C = O.extend({
            _class: "Group",
            _selectBounds: !1,
            _selectChildren: !0,
            _serializeFields: {
                children: []
            },
            initialize: function(t) {
                this._children = [], this._namedChildren = {}, this._initialize(t) || this.addChildren(Array.isArray(t) ? t : arguments)
            },
            _changed: function t(e) {
                t.base.call(this, e), 2050 & e && (this._clipItem = q)
            },
            _getClipItem: function() {
                var t = this._clipItem;
                if (t === q) {
                    t = null;
                    for (var e = this._children, i = 0, n = e.length; i < n; i++)
                        if (e[i]._clipMask) {
                            t = e[i];
                            break
                        }
                    this._clipItem = t
                }
                return t
            },
            isClipped: function() {
                return !!this._getClipItem()
            },
            setClipped: function(t) {
                var e = this.getFirstChild();
                e && e.setClipMask(t)
            },
            _getBounds: function t(e, i) {
                var n = this._getClipItem();
                return n ? n._getCachedBounds(e && e.appended(n._matrix), V.set({}, i, {
                    stroke: !1
                })) : t.base.call(this, e, i)
            },
            _hitTestChildren: function t(e, i, n) {
                var r = this._getClipItem();
                return (!r || r.contains(e)) && t.base.call(this, e, i, n, r)
            },
            _draw: function(t, e) {
                var i = e.clip,
                    n = !i && this._getClipItem();
                e = e.extend({
                    clipItem: n,
                    clip: !1
                }), i ? (t.beginPath(), e.dontStart = e.dontFinish = !0) : n && n.draw(t, e.extend({
                    clip: !0
                }));
                for (var r = this._children, s = 0, a = r.length; s < a; s++) {
                    var o = r[s];
                    o !== n && o.draw(t, e)
                }
            }
        }),
        o = C.extend({
            _class: "Layer",
            initialize: function() {
                C.apply(this, arguments)
            },
            _getOwner: function() {
                return this._parent || null != this._index && this._project
            },
            isInserted: function t() {
                return this._parent ? t.base.call(this) : null != this._index
            },
            activate: function() {
                this._project._activeLayer = this
            },
            _hitTestSelf: function() {}
        }),
        P = O.extend({
            _class: "Shape",
            _applyMatrix: !1,
            _canApplyMatrix: !1,
            _canScaleStroke: !0,
            _serializeFields: {
                type: null,
                size: null,
                radius: null
            },
            initialize: function(t, e) {
                this._initialize(t, e)
            },
            _equals: function(t) {
                return this._type === t._type && this._size.equals(t._size) && V.equals(this._radius, t._radius)
            },
            copyContent: function(t) {
                this.setType(t._type), this.setSize(t._size), this.setRadius(t._radius)
            },
            getType: function() {
                return this._type
            },
            setType: function(t) {
                this._type = t
            },
            getShape: "#getType",
            setShape: "#setType",
            getSize: function() {
                var t = this._size;
                return new i(t.width, t.height, this, "setSize")
            },
            setSize: function() {
                var t = U.read(arguments);
                if (this._size) {
                    if (!this._size.equals(t)) {
                        var e = this._type,
                            i = t.width,
                            n = t.height;
                        "rectangle" === e ? this._radius.set(U.min(this._radius, t.divide(2))) : "circle" === e ? (i = n = (i + n) / 2, this._radius = i / 2) : "ellipse" === e && this._radius._set(i / 2, n / 2), this._size._set(i, n), this._changed(9)
                    }
                } else this._size = t.clone()
            },
            getRadius: function() {
                var t = this._radius;
                return "circle" === this._type ? t : new i(t.width, t.height, this, "setRadius")
            },
            setRadius: function(t) {
                var e = this._type;
                if ("circle" === e) {
                    if (t === this._radius) return;
                    var i = 2 * t;
                    this._radius = t, this._size._set(i, i)
                } else if (t = U.read(arguments), this._radius) {
                    if (this._radius.equals(t)) return;
                    if (this._radius.set(t), "rectangle" === e) {
                        i = U.max(this._size, t.multiply(2));
                        this._size.set(i)
                    } else "ellipse" === e && this._size._set(2 * t.width, 2 * t.height)
                } else this._radius = t.clone();
                this._changed(9)
            },
            isEmpty: function() {
                return !1
            },
            toPath: function(t) {
                var e = new(F[V.capitalize(this._type)])({
                    center: new Z,
                    size: this._size,
                    radius: this._radius,
                    insert: !1
                });
                return e.copyAttributes(this), st.settings.applyMatrix && e.setApplyMatrix(!0), (t === q || t) && e.insertAbove(this), e
            },
            toShape: "#clone",
            _asPathItem: function() {
                return this.toPath(!1)
            },
            _draw: function(t, e, i, n) {
                var r = this._style,
                    s = r.hasFill(),
                    a = r.hasStroke(),
                    o = e.dontFinish || e.clip,
                    h = !n;
                if (s || a || o) {
                    var u = this._type,
                        l = this._radius,
                        c = "circle" === u;
                    if (e.dontStart || t.beginPath(), h && c) t.arc(0, 0, l, 0, 2 * Math.PI, !0);
                    else {
                        var f = c ? l : l.width,
                            d = c ? l : l.height,
                            _ = this._size,
                            g = _.width,
                            v = _.height;
                        if (h && "rectangle" === u && 0 === f && 0 === d) t.rect(-g / 2, -v / 2, g, v);
                        else {
                            var p = g / 2,
                                m = v / 2,
                                y = .44771525016920644,
                                w = f * y,
                                x = d * y,
                                b = [-p, -m + d, -p, -m + x, -p + w, -m, -p + f, -m, p - f, -m, p - w, -m, p, -m + x, p, -m + d, p, m - d, p, m - x, p - w, m, p - f, m, -p + f, m, -p + w, m, -p, m - x, -p, m - d];
                            n && n.transform(b, b, 32), t.moveTo(b[0], b[1]), t.bezierCurveTo(b[2], b[3], b[4], b[5], b[6], b[7]), p !== f && t.lineTo(b[8], b[9]), t.bezierCurveTo(b[10], b[11], b[12], b[13], b[14], b[15]), m !== d && t.lineTo(b[16], b[17]), t.bezierCurveTo(b[18], b[19], b[20], b[21], b[22], b[23]), p !== f && t.lineTo(b[24], b[25]), t.bezierCurveTo(b[26], b[27], b[28], b[29], b[30], b[31])
                        }
                    }
                    t.closePath()
                }
                o || !s && !a || (this._setStyles(t, e, i), s && (t.fill(r.getFillRule()), t.shadowColor = "rgba(0,0,0,0)"), a && t.stroke())
            },
            _canComposite: function() {
                return !(this.hasFill() && this.hasStroke())
            },
            _getBounds: function(t, e) {
                var i = new T(this._size).setCenter(0, 0),
                    n = this._style,
                    r = e.stroke && n.hasStroke() && n.getStrokeWidth();
                return t && (i = t._transformBounds(i)), r ? i.expand(F._getStrokePadding(r, this._getStrokeMatrix(t, e))) : i
            }
        }, new function() {
            function m(t, e, i) {
                var n = t._radius;
                if (!n.isZero())
                    for (var r = t._size.divide(2), s = 1; s <= 4; s++) {
                        var a = new Z(1 < s && s < 4 ? -1 : 1, 2 < s ? -1 : 1),
                            o = a.multiply(r),
                            h = o.subtract(a.multiply(n));
                        if (new T(i ? o.add(a.multiply(i)) : o, h).contains(e)) return {
                            point: h,
                            quadrant: s
                        }
                    }
            }

            function y(t, e, i, n) {
                var r = t.divide(e);
                return (!n || r.isInQuadrant(n)) && r.subtract(r.normalize()).multiply(e).divide(i).length <= 1
            }
            return {
                _contains: function t(e) {
                    if ("rectangle" !== this._type) return e.divide(this.size).getLength() <= .5;
                    var i = m(this, e);
                    return i ? e.subtract(i.point).divide(this._radius).getLength() <= 1 : t.base.call(this, e)
                },
                _hitTestSelf: function t(e, i, n, r) {
                    var s = !1,
                        a = this._style,
                        o = i.stroke && a.hasStroke(),
                        h = i.fill && a.hasFill();
                    if (o || h) {
                        var u = this._type,
                            l = this._radius,
                            c = o ? a.getStrokeWidth() / 2 : 0,
                            f = i._tolerancePadding.add(F._getStrokePadding(c, !a.getStrokeScaling() && r));
                        if ("rectangle" === u) {
                            var d = f.multiply(2),
                                _ = m(this, e, d);
                            if (_) s = y(e.subtract(_.point), l, f, _.quadrant);
                            else {
                                var g = new T(this._size).setCenter(0, 0),
                                    v = g.expand(d),
                                    p = g.expand(d.negate());
                                s = v._containsPoint(e) && !p._containsPoint(e)
                            }
                        } else s = y(e, l, f)
                    }
                    return s ? new A(o ? "stroke" : "fill", this) : t.base.apply(this, arguments)
                }
            }
        }, {
            statics: new function() {
                function i(t, e, i, n, r) {
                    var s = new P(V.getNamed(r), e);
                    return s._type = t, s._size = i, s._radius = n, s
                }
                return {
                    Circle: function() {
                        var t = Z.readNamed(arguments, "center"),
                            e = V.readNamed(arguments, "radius");
                        return i("circle", t, new U(2 * e), e, arguments)
                    },
                    Rectangle: function() {
                        var t = T.readNamed(arguments, "rectangle"),
                            e = U.min(U.readNamed(arguments, "radius"), t.getSize(!0).divide(2));
                        return i("rectangle", t.getCenter(!0), t.getSize(!0), e, arguments)
                    },
                    Ellipse: function() {
                        var t = P._readEllipse(arguments),
                            e = t.radius;
                        return i("ellipse", t.center, e.multiply(2), e, arguments)
                    },
                    _readEllipse: function(t) {
                        var e, i;
                        if (V.hasNamed(t, "radius")) e = Z.readNamed(t, "center"), i = U.readNamed(t, "radius");
                        else {
                            var n = T.readNamed(t, "rectangle");
                            e = n.getCenter(!0), i = n.getSize(!0).divide(2)
                        }
                        return {
                            center: e,
                            radius: i
                        }
                    }
                }
            }
        }),
        I = O.extend({
            _class: "Raster",
            _applyMatrix: !1,
            _canApplyMatrix: !1,
            _boundsOptions: {
                stroke: !1,
                handle: !1
            },
            _serializeFields: {
                crossOrigin: null,
                source: null
            },
            _prioritize: ["crossOrigin"],
            _smoothing: !0,
            initialize: function(t, e) {
                if (!this._initialize(t, e !== q && Z.read(arguments, 1))) {
                    var i = "string" == typeof t ? k.getElementById(t) : t;
                    i ? this.setImage(i) : this.setSource(t)
                }
                this._size || (this._size = new U, this._loaded = !1)
            },
            _equals: function(t) {
                return this.getSource() === t.getSource()
            },
            copyContent: function(t) {
                var e = t._image,
                    i = t._canvas;
                if (e) this._setImage(e);
                else if (i) {
                    var n = it.getCanvas(t._size);
                    n.getContext("2d").drawImage(i, 0, 0), this._setImage(n)
                }
                this._crossOrigin = t._crossOrigin
            },
            getSize: function() {
                var t = this._size;
                return new i(t ? t.width : 0, t ? t.height : 0, this, "setSize")
            },
            setSize: function() {
                var t = U.read(arguments);
                if (!t.equals(this._size))
                    if (0 < t.width && 0 < t.height) {
                        var e = this.getElement();
                        this._setImage(it.getCanvas(t)), e && this.getContext(!0).drawImage(e, 0, 0, t.width, t.height)
                    } else this._canvas && it.release(this._canvas), this._size = t.clone()
            },
            getWidth: function() {
                return this._size ? this._size.width : 0
            },
            setWidth: function(t) {
                this.setSize(t, this.getHeight())
            },
            getHeight: function() {
                return this._size ? this._size.height : 0
            },
            setHeight: function(t) {
                this.setSize(this.getWidth(), t)
            },
            getLoaded: function() {
                return this._loaded
            },
            isEmpty: function() {
                var t = this._size;
                return !t || 0 === t.width && 0 === t.height
            },
            getResolution: function() {
                var t = this._matrix,
                    e = new Z(0, 0).transform(t),
                    i = new Z(1, 0).transform(t).subtract(e),
                    n = new Z(0, 1).transform(t).subtract(e);
                return new U(72 / i.getLength(), 72 / n.getLength())
            },
            getPpi: "#getResolution",
            getImage: function() {
                return this._image
            },
            setImage: function(e) {
                var n = this;

                function i(t) {
                    var e = n.getView(),
                        i = t && t.type || "load";
                    e && n.responds(i) && (st = e._scope, n.emit(i, new g(t)))
                }
                this._setImage(e), this._loaded ? setTimeout(i, 0) : e && Q.add(e, {
                    load: function(t) {
                        n._setImage(e), i(t)
                    },
                    error: i
                })
            },
            _setImage: function(t) {
                this._canvas && it.release(this._canvas), t && t.getContext ? (this._image = null, this._canvas = t, this._loaded = !0) : (this._image = t, this._canvas = null, this._loaded = !!(t && t.src && t.complete)), this._size = new U(t ? t.naturalWidth || t.width : 0, t ? t.naturalHeight || t.height : 0), this._context = null, this._changed(1033)
            },
            getCanvas: function() {
                if (!this._canvas) {
                    var e = it.getContext(this._size);
                    try {
                        this._image && e.drawImage(this._image, 0, 0), this._canvas = e.canvas
                    } catch (t) {
                        it.release(e)
                    }
                }
                return this._canvas
            },
            setCanvas: "#setImage",
            getContext: function(t) {
                return this._context || (this._context = this.getCanvas().getContext("2d")), t && (this._image = null, this._changed(1025)), this._context
            },
            setContext: function(t) {
                this._context = t
            },
            getSource: function() {
                var t = this._image;
                return t && t.src || this.toDataURL()
            },
            setSource: function(t) {
                var e = new u.Image,
                    i = this._crossOrigin;
                i && (e.crossOrigin = i), e.src = t, this.setImage(e)
            },
            getCrossOrigin: function() {
                var t = this._image;
                return t && t.crossOrigin || this._crossOrigin || ""
            },
            setCrossOrigin: function(t) {
                this._crossOrigin = t;
                var e = this._image;
                e && (e.crossOrigin = t)
            },
            getSmoothing: function() {
                return this._smoothing
            },
            setSmoothing: function(t) {
                this._smoothing = t, this._changed(257)
            },
            getElement: function() {
                return this._canvas || this._loaded && this._image
            }
        }, {
            beans: !1,
            getSubCanvas: function() {
                var t = T.read(arguments),
                    e = it.getContext(t.getSize());
                return e.drawImage(this.getCanvas(), t.x, t.y, t.width, t.height, 0, 0, t.width, t.height), e.canvas
            },
            getSubRaster: function() {
                var t = T.read(arguments),
                    e = new I(O.NO_INSERT);
                return e._setImage(this.getSubCanvas(t)), e.translate(t.getCenter().subtract(this.getSize().divide(2))), e._matrix.prepend(this._matrix), e.insertAbove(this), e
            },
            toDataURL: function() {
                var t = this._image,
                    e = t && t.src;
                if (/^data:/.test(e)) return e;
                var i = this.getCanvas();
                return i ? i.toDataURL.apply(i, arguments) : null
            },
            drawImage: function(t) {
                var e = Z.read(arguments, 1);
                this.getContext(!0).drawImage(t, e.x, e.y)
            },
            getAverageColor: function(t) {
                var e, i;
                if (t ? t instanceof L ? e = (i = t).getBounds() : "object" == typeof t && ("width" in t ? e = new T(t) : "x" in t && (e = new T(t.x - .5, t.y - .5, 1, 1))) : e = this.getBounds(), !e) return null;
                var n = Math.min(e.width, 32),
                    r = Math.min(e.height, 32),
                    s = I._sampleContext;
                s ? s.clearRect(0, 0, 33, 33) : s = I._sampleContext = it.getContext(new U(32)), s.save();
                var a = (new W).scale(n / e.width, r / e.height).translate(-e.x, -e.y);
                a.applyToContext(s), i && i.draw(s, new V({
                    clip: !0,
                    matrices: [a]
                })), this._matrix.applyToContext(s);
                var o = this.getElement(),
                    h = this._size;
                o && s.drawImage(o, -h.width / 2, -h.height / 2), s.restore();
                for (var u = s.getImageData(.5, .5, Math.ceil(n), Math.ceil(r)).data, l = [0, 0, 0], c = 0, f = 0, d = u.length; f < d; f += 4) {
                    var _ = u[f + 3];
                    c += _, _ /= 255, l[0] += u[f] * _, l[1] += u[f + 1] * _, l[2] += u[f + 2] * _
                }
                for (f = 0; f < 3; f++) l[f] /= c;
                return c ? B.read(l) : null
            },
            getPixel: function() {
                var t = Z.read(arguments),
                    e = this.getContext().getImageData(t.x, t.y, 1, 1).data;
                return new B("rgb", [e[0] / 255, e[1] / 255, e[2] / 255], e[3] / 255)
            },
            setPixel: function() {
                var t = Z.read(arguments),
                    e = B.read(arguments),
                    i = e._convert("rgb"),
                    n = e._alpha,
                    r = this.getContext(!0),
                    s = r.createImageData(1, 1),
                    a = s.data;
                a[0] = 255 * i[0], a[1] = 255 * i[1], a[2] = 255 * i[2], a[3] = null != n ? 255 * n : 255, r.putImageData(s, t.x, t.y)
            },
            createImageData: function() {
                var t = U.read(arguments);
                return this.getContext().createImageData(t.width, t.height)
            },
            getImageData: function() {
                var t = T.read(arguments);
                return t.isEmpty() && (t = new T(this._size)), this.getContext().getImageData(t.x, t.y, t.width, t.height)
            },
            setImageData: function(t) {
                var e = Z.read(arguments, 1);
                this.getContext(!0).putImageData(t, e.x, e.y)
            },
            _getBounds: function(t, e) {
                var i = new T(this._size).setCenter(0, 0);
                return t ? t._transformBounds(i) : i
            },
            _hitTestSelf: function(t) {
                if (this._contains(t)) {
                    var e = this;
                    return new A("pixel", e, {
                        offset: t.add(e._size.divide(2)).round(),
                        color: {
                            get: function() {
                                return e.getPixel(this.offset)
                            }
                        }
                    })
                }
            },
            _draw: function(t, e, i) {
                var n = this.getElement();
                n && 0 < n.width && 0 < n.height && (t.globalAlpha = this._opacity, this._setStyles(t, e, i), K.setPrefixed(t, "imageSmoothingEnabled", this._smoothing), t.drawImage(n, -this._size.width / 2, -this._size.height / 2))
            },
            _canComposite: function() {
                return !0
            }
        }),
        a = O.extend({
            _class: "SymbolItem",
            _applyMatrix: !1,
            _canApplyMatrix: !1,
            _boundsOptions: {
                stroke: !0
            },
            _serializeFields: {
                symbol: null
            },
            initialize: function(t, e) {
                this._initialize(t, e !== q && Z.read(arguments, 1)) || this.setDefinition(t instanceof M ? t : new M(t))
            },
            _equals: function(t) {
                return this._definition === t._definition
            },
            copyContent: function(t) {
                this.setDefinition(t._definition)
            },
            getDefinition: function() {
                return this._definition
            },
            setDefinition: function(t) {
                this._definition = t, this._changed(9)
            },
            getSymbol: "#getDefinition",
            setSymbol: "#setDefinition",
            isEmpty: function() {
                return this._definition._item.isEmpty()
            },
            _getBounds: function(t, e) {
                var i = this._definition._item;
                return i._getCachedBounds(i._matrix.prepended(t), e)
            },
            _hitTestSelf: function(t, e, i) {
                var n = this._definition._item._hitTest(t, e, i);
                return n && (n.item = this), n
            },
            _draw: function(t, e) {
                this._definition._item.draw(t, e)
            }
        }),
        M = V.extend({
            _class: "SymbolDefinition",
            initialize: function(t, e) {
                this._id = l.get(), this.project = st.project, t && this.setItem(t, e)
            },
            _serialize: function(t, e) {
                return e.add(this, function() {
                    return V.serialize([this._class, this._item], t, !1, e)
                })
            },
            _changed: function(t) {
                8 & t && O._clearBoundsCache(this), 1 & t && this.project._changed(t)
            },
            getItem: function() {
                return this._item
            },
            setItem: function(t, e) {
                t._symbol && (t = t.clone()), this._item && (this._item._symbol = null), (this._item = t).remove(), t.setSelected(!1), e || t.setPosition(new Z), (t._symbol = this)._changed(9)
            },
            getDefinition: "#getItem",
            setDefinition: "#setItem",
            place: function(t) {
                return new a(this, t)
            },
            clone: function() {
                return new M(this._item.clone(!1))
            },
            equals: function(t) {
                return t === this || t && this._item.equals(t._item) || !1
            }
        }),
        A = V.extend({
            _class: "HitResult",
            initialize: function(t, e, i) {
                this.type = t, this.item = e, i && this.inject(i)
            },
            statics: {
                getOptions: function(t) {
                    var e = t && V.read(t);
                    return V.set({
                        type: null,
                        tolerance: st.settings.hitTolerance,
                        fill: !e,
                        stroke: !e,
                        segments: !e,
                        handles: !1,
                        ends: !1,
                        position: !1,
                        center: !1,
                        bounds: !1,
                        guides: !1,
                        selected: !1
                    }, e)
                }
            }
        }),
        J = V.extend({
            _class: "Segment",
            beans: !0,
            _selection: 0,
            initialize: function(t, e, i, n, r, s) {
                var a, o, h, u, l = arguments.length;
                0 < l && (null == t || "object" == typeof t ? u = 1 === l && t && "point" in t ? (a = t.point, o = t.handleIn, h = t.handleOut, t.selection) : (a = t, o = e, h = i, n) : (a = [t, e], o = i !== q ? [i, n] : null, h = r !== q ? [r, s] : null)), new d(a, this, "_point"), new d(o, this, "_handleIn"), new d(h, this, "_handleOut"), u && this.setSelection(u)
            },
            _serialize: function(t, e) {
                var i = this._point,
                    n = this._selection,
                    r = n || this.hasHandles() ? [i, this._handleIn, this._handleOut] : i;
                return n && r.push(n), V.serialize(r, t, !0, e)
            },
            _changed: function(t) {
                var e = this._path;
                if (e) {
                    var i, n = e._curves,
                        r = this._index;
                    n && (t && t !== this._point && t !== this._handleIn || !(i = 0 < r ? n[r - 1] : e._closed ? n[n.length - 1] : null) || i._changed(), t && t !== this._point && t !== this._handleOut || !(i = n[r]) || i._changed()), e._changed(41)
                }
            },
            getPoint: function() {
                return this._point
            },
            setPoint: function() {
                this._point.set(Z.read(arguments))
            },
            getHandleIn: function() {
                return this._handleIn
            },
            setHandleIn: function() {
                this._handleIn.set(Z.read(arguments))
            },
            getHandleOut: function() {
                return this._handleOut
            },
            setHandleOut: function() {
                this._handleOut.set(Z.read(arguments))
            },
            hasHandles: function() {
                return !this._handleIn.isZero() || !this._handleOut.isZero()
            },
            isSmooth: function() {
                var t = this._handleIn,
                    e = this._handleOut;
                return !t.isZero() && !e.isZero() && t.isCollinear(e)
            },
            clearHandles: function() {
                this._handleIn._set(0, 0), this._handleOut._set(0, 0)
            },
            getSelection: function() {
                return this._selection
            },
            setSelection: function(t) {
                var e = this._selection,
                    i = this._path;
                this._selection = t = t || 0, i && t !== e && (i._updateSelection(this, e, t), i._changed(257))
            },
            _changeSelection: function(t, e) {
                var i = this._selection;
                this.setSelection(e ? i | t : i & ~t)
            },
            isSelected: function() {
                return !!(7 & this._selection)
            },
            setSelected: function(t) {
                this._changeSelection(7, t)
            },
            getIndex: function() {
                return this._index !== q ? this._index : null
            },
            getPath: function() {
                return this._path || null
            },
            getCurve: function() {
                var t = this._path,
                    e = this._index;
                return t ? (0 < e && !t._closed && e === t._segments.length - 1 && e--, t.getCurves()[e] || null) : null
            },
            getLocation: function() {
                var t = this.getCurve();
                return t ? new j(t, this === t._segment1 ? 0 : 1) : null
            },
            getNext: function() {
                var t = this._path && this._path._segments;
                return t && (t[this._index + 1] || this._path._closed && t[0]) || null
            },
            smooth: function(t, e, i) {
                var n = t || {},
                    r = n.type,
                    s = n.factor,
                    a = this.getPrevious(),
                    o = this.getNext(),
                    h = (a || this)._point,
                    u = this._point,
                    l = (o || this)._point,
                    c = h.getDistance(u),
                    f = u.getDistance(l);
                if (r && "catmull-rom" !== r) {
                    if ("geometric" !== r) throw new Error("Smoothing method '" + r + "' not supported.");
                    if (a && o) {
                        var d = h.subtract(l),
                            _ = s === q ? .4 : s,
                            g = _ * c / (c + f);
                        e || this.setHandleIn(d.multiply(g)), i || this.setHandleOut(d.multiply(g - _))
                    }
                } else {
                    var v = s === q ? .5 : s,
                        p = Math.pow(c, v),
                        m = p * p,
                        y = Math.pow(f, v),
                        w = y * y;
                    if (!e && a) {
                        var x = 2 * w + 3 * y * p + m,
                            b = 3 * y * (y + p);
                        this.setHandleIn(0 !== b ? new Z((w * h._x + x * u._x - m * l._x) / b - u._x, (w * h._y + x * u._y - m * l._y) / b - u._y) : new Z)
                    }
                    if (!i && o) {
                        x = 2 * m + 3 * p * y + w, b = 3 * p * (p + y);
                        this.setHandleOut(0 !== b ? new Z((m * l._x + x * u._x - w * h._x) / b - u._x, (m * l._y + x * u._y - w * h._y) / b - u._y) : new Z)
                    }
                }
            },
            getPrevious: function() {
                var t = this._path && this._path._segments;
                return t && (t[this._index - 1] || this._path._closed && t[t.length - 1]) || null
            },
            isFirst: function() {
                return !this._index
            },
            isLast: function() {
                var t = this._path;
                return t && this._index === t._segments.length - 1 || !1
            },
            reverse: function() {
                var t = this._handleIn,
                    e = this._handleOut,
                    i = t.clone();
                t.set(e), e.set(i)
            },
            reversed: function() {
                return new J(this._point, this._handleOut, this._handleIn)
            },
            remove: function() {
                return !!this._path && !!this._path.removeSegment(this._index)
            },
            clone: function() {
                return new J(this._point, this._handleIn, this._handleOut)
            },
            equals: function(t) {
                return t === this || t && this._class === t._class && this._point.equals(t._point) && this._handleIn.equals(t._handleIn) && this._handleOut.equals(t._handleOut) || !1
            },
            toString: function() {
                var t = ["point: " + this._point];
                return this._handleIn.isZero() || t.push("handleIn: " + this._handleIn), this._handleOut.isZero() || t.push("handleOut: " + this._handleOut), "{ " + t.join(", ") + " }"
            },
            transform: function(t) {
                this._transformCoordinates(t, new Array(6), !0), this._changed()
            },
            interpolate: function(t, e, i) {
                var n = 1 - i,
                    r = i,
                    s = t._point,
                    a = e._point,
                    o = t._handleIn,
                    h = e._handleIn,
                    u = e._handleOut,
                    l = t._handleOut;
                this._point._set(n * s._x + r * a._x, n * s._y + r * a._y, !0), this._handleIn._set(n * o._x + r * h._x, n * o._y + r * h._y, !0), this._handleOut._set(n * l._x + r * u._x, n * l._y + r * u._y, !0), this._changed()
            },
            _transformCoordinates: function(t, e, i) {
                var n = this._point,
                    r = i && this._handleIn.isZero() ? null : this._handleIn,
                    s = i && this._handleOut.isZero() ? null : this._handleOut,
                    a = n._x,
                    o = n._y,
                    h = 2;
                return e[0] = a, e[1] = o, r && (e[h++] = r._x + a, e[h++] = r._y + o), s && (e[h++] = s._x + a, e[h++] = s._y + o), t && (t._transformCoordinates(e, e, h / 2), a = e[0], o = e[1], i ? (n._x = a, n._y = o, h = 2, r && (r._x = e[h++] - a, r._y = e[h++] - o), s && (s._x = e[h++] - a, s._y = e[h++] - o)) : (r || (e[h++] = a, e[h++] = o), s || (e[h++] = a, e[h++] = o))), e
            }
        }),
        d = Z.extend({
            initialize: function(t, e, i) {
                var n, r, s;
                if (t)
                    if ((n = t[0]) !== q) r = t[1];
                    else {
                        var a = t;
                        (n = a.x) === q && (n = (a = Z.read(arguments)).x), r = a.y, s = a.selected
                    }
                else n = r = 0;
                this._x = n, this._y = r, (this._owner = e)[i] = this, s && this.setSelected(!0)
            },
            _set: function(t, e) {
                return this._x = t, this._y = e, this._owner._changed(this), this
            },
            getX: function() {
                return this._x
            },
            setX: function(t) {
                this._x = t, this._owner._changed(this)
            },
            getY: function() {
                return this._y
            },
            setY: function(t) {
                this._y = t, this._owner._changed(this)
            },
            isZero: function() {
                var t = H.isZero;
                return t(this._x) && t(this._y)
            },
            isSelected: function() {
                return !!(this._owner._selection & this._getSelection())
            },
            setSelected: function(t) {
                this._owner._changeSelection(this._getSelection(), t)
            },
            _getSelection: function() {
                var t = this._owner;
                return this === t._point ? 1 : this === t._handleIn ? 2 : this === t._handleOut ? 4 : 0
            }
        }),
        $ = V.extend({
            _class: "Curve",
            beans: !0,
            initialize: function(t, e, i, n, r, s, a, o) {
                var h, u, l, c, f, d, _ = arguments.length;
                3 === _ ? (this._path = t, h = e, u = i) : _ ? 1 === _ ? "segment1" in t ? (h = new J(t.segment1), u = new J(t.segment2)) : "point1" in t ? (l = t.point1, f = t.handle1, d = t.handle2, c = t.point2) : Array.isArray(t) && (l = [t[0], t[1]], c = [t[6], t[7]], f = [t[2] - t[0], t[3] - t[1]], d = [t[4] - t[6], t[5] - t[7]]) : 2 === _ ? (h = new J(t), u = new J(e)) : 4 === _ ? (l = t, f = e, d = i, c = n) : 8 === _ && (l = [t, e], c = [a, o], f = [i - t, n - e], d = [r - a, s - o]) : (h = new J, u = new J), this._segment1 = h || new J(l, null, f), this._segment2 = u || new J(c, d, null)
            },
            _serialize: function(t, e) {
                return V.serialize(this.hasHandles() ? [this.getPoint1(), this.getHandle1(), this.getHandle2(), this.getPoint2()] : [this.getPoint1(), this.getPoint2()], t, !0, e)
            },
            _changed: function() {
                this._length = this._bounds = q
            },
            clone: function() {
                return new $(this._segment1, this._segment2)
            },
            toString: function() {
                var t = ["point1: " + this._segment1._point];
                return this._segment1._handleOut.isZero() || t.push("handle1: " + this._segment1._handleOut), this._segment2._handleIn.isZero() || t.push("handle2: " + this._segment2._handleIn), t.push("point2: " + this._segment2._point), "{ " + t.join(", ") + " }"
            },
            classify: function() {
                return $.classify(this.getValues())
            },
            remove: function() {
                var t = !1;
                if (this._path) {
                    var e = this._segment2,
                        i = e._handleOut;
                    (t = e.remove()) && this._segment1._handleOut.set(i)
                }
                return t
            },
            getPoint1: function() {
                return this._segment1._point
            },
            setPoint1: function() {
                this._segment1._point.set(Z.read(arguments))
            },
            getPoint2: function() {
                return this._segment2._point
            },
            setPoint2: function() {
                this._segment2._point.set(Z.read(arguments))
            },
            getHandle1: function() {
                return this._segment1._handleOut
            },
            setHandle1: function() {
                this._segment1._handleOut.set(Z.read(arguments))
            },
            getHandle2: function() {
                return this._segment2._handleIn
            },
            setHandle2: function() {
                this._segment2._handleIn.set(Z.read(arguments))
            },
            getSegment1: function() {
                return this._segment1
            },
            getSegment2: function() {
                return this._segment2
            },
            getPath: function() {
                return this._path
            },
            getIndex: function() {
                return this._segment1._index
            },
            getNext: function() {
                var t = this._path && this._path._curves;
                return t && (t[this._segment1._index + 1] || this._path._closed && t[0]) || null
            },
            getPrevious: function() {
                var t = this._path && this._path._curves;
                return t && (t[this._segment1._index - 1] || this._path._closed && t[t.length - 1]) || null
            },
            isFirst: function() {
                return !this._segment1._index
            },
            isLast: function() {
                var t = this._path;
                return t && this._segment1._index === t._curves.length - 1 || !1
            },
            isSelected: function() {
                return this.getPoint1().isSelected() && this.getHandle1().isSelected() && this.getHandle2().isSelected() && this.getPoint2().isSelected()
            },
            setSelected: function(t) {
                this.getPoint1().setSelected(t), this.getHandle1().setSelected(t), this.getHandle2().setSelected(t), this.getPoint2().setSelected(t)
            },
            getValues: function(t) {
                return $.getValues(this._segment1, this._segment2, t)
            },
            getPoints: function() {
                for (var t = this.getValues(), e = [], i = 0; i < 8; i += 2) e.push(new Z(t[i], t[i + 1]));
                return e
            }
        }, {
            getLength: function() {
                return null == this._length && (this._length = $.getLength(this.getValues(), 0, 1)), this._length
            },
            getArea: function() {
                return $.getArea(this.getValues())
            },
            getLine: function() {
                return new G(this._segment1._point, this._segment2._point)
            },
            getPart: function(t, e) {
                return new $($.getPart(this.getValues(), t, e))
            },
            getPartLength: function(t, e) {
                return $.getLength(this.getValues(), t, e)
            },
            divideAt: function(t) {
                return this.divideAtTime(t && t.curve === this ? t.time : this.getTimeAt(t))
            },
            divideAtTime: function(t, e) {
                var i = null;
                if (1e-8 <= t && t <= 1 - 1e-8) {
                    var n = $.subdivide(this.getValues(), t),
                        r = n[0],
                        s = n[1],
                        a = e || this.hasHandles(),
                        o = this._segment1,
                        h = this._segment2,
                        u = this._path;
                    a && (o._handleOut._set(r[2] - r[0], r[3] - r[1]), h._handleIn._set(s[4] - s[6], s[5] - s[7]));
                    var l = r[6],
                        c = r[7],
                        f = new J(new Z(l, c), a && new Z(r[4] - l, r[5] - c), a && new Z(s[2] - l, s[3] - c));
                    i = u ? (u.insert(o._index + 1, f), this.getNext()) : (this._segment2 = f, this._changed(), new $(f, h))
                }
                return i
            },
            splitAt: function(t) {
                var e = this._path;
                return e ? e.splitAt(t) : null
            },
            splitAtTime: function(t) {
                return this.splitAt(this.getLocationAtTime(t))
            },
            divide: function(t, e) {
                return this.divideAtTime(t === q ? .5 : e ? t : this.getTimeAt(t))
            },
            split: function(t, e) {
                return this.splitAtTime(t === q ? .5 : e ? t : this.getTimeAt(t))
            },
            reversed: function() {
                return new $(this._segment2.reversed(), this._segment1.reversed())
            },
            clearHandles: function() {
                this._segment1._handleOut._set(0, 0), this._segment2._handleIn._set(0, 0)
            },
            statics: {
                getValues: function(t, e, i, n) {
                    var r = t._point,
                        s = t._handleOut,
                        a = e._handleIn,
                        o = e._point,
                        h = r.x,
                        u = r.y,
                        l = o.x,
                        c = o.y,
                        f = n ? [h, u, h, u, l, c, l, c] : [h, u, h + s._x, u + s._y, l + a._x, c + a._y, l, c];
                    return i && i._transformCoordinates(f, f, 4), f
                },
                subdivide: function(t, e) {
                    var i = t[0],
                        n = t[1],
                        r = t[2],
                        s = t[3],
                        a = t[4],
                        o = t[5],
                        h = t[6],
                        u = t[7];
                    e === q && (e = .5);
                    var l = 1 - e,
                        c = l * i + e * r,
                        f = l * n + e * s,
                        d = l * r + e * a,
                        _ = l * s + e * o,
                        g = l * a + e * h,
                        v = l * o + e * u,
                        p = l * c + e * d,
                        m = l * f + e * _,
                        y = l * d + e * g,
                        w = l * _ + e * v,
                        x = l * p + e * y,
                        b = l * m + e * w;
                    return [
                        [i, n, c, f, p, m, x, b],
                        [x, b, y, w, g, v, h, u]
                    ]
                },
                getMonoCurves: function(t, e) {
                    var i = [],
                        n = e ? 0 : 1,
                        r = t[n + 0],
                        s = t[n + 2],
                        a = t[n + 4],
                        o = t[n + 6];
                    if (s <= r == a <= s && a <= s == o <= a || $.isStraight(t)) i.push(t);
                    else {
                        var h = 3 * (s - a) - r + o,
                            u = 2 * (r + a) - 4 * s,
                            l = s - r,
                            c = [],
                            f = H.solveQuadratic(h, u, l, c, 1e-8, 1 - 1e-8);
                        if (f) {
                            c.sort();
                            var d = c[0],
                                _ = $.subdivide(t, d);
                            i.push(_[0]), 1 < f && (d = (c[1] - d) / (1 - d), _ = $.subdivide(_[1], d), i.push(_[0])), i.push(_[1])
                        } else i.push(t)
                    }
                    return i
                },
                solveCubic: function(t, e, i, n, r, s) {
                    var a = t[e],
                        o = t[e + 2],
                        h = t[e + 4],
                        u = t[e + 6],
                        l = 0;
                    if (!(a < i && u < i && o < i && h < i || i < a && i < u && i < o && i < h)) {
                        var c = 3 * (o - a),
                            f = 3 * (h - o) - c,
                            d = u - a - c - f;
                        l = H.solveCubic(d, f, c, a - i, n, r, s)
                    }
                    return l
                },
                getTimeOf: function(t, e) {
                    var i = new Z(t[0], t[1]),
                        n = new Z(t[6], t[7]);
                    if (null === (e.isClose(i, 1e-12) ? 0 : e.isClose(n, 1e-12) ? 1 : null))
                        for (var r = [e.x, e.y], s = [], a = 0; a < 2; a++)
                            for (var o = $.solveCubic(t, a, r[a], s, 0, 1), h = 0; h < o; h++) {
                                var u = s[h];
                                if (e.isClose($.getPoint(t, u), 1e-7)) return u
                            }
                    return e.isClose(i, 1e-7) ? 0 : e.isClose(n, 1e-7) ? 1 : null
                },
                getNearestTime: function(i, n) {
                    if ($.isStraight(i)) {
                        var t = i[0],
                            e = i[1],
                            r = i[6] - t,
                            s = i[7] - e,
                            a = r * r + s * s;
                        if (0 === a) return 0;
                        var o = ((n.x - t) * r + (n.y - e) * s) / a;
                        return o < 1e-12 ? 0 : .999999999999 < o ? 1 : $.getTimeOf(i, new Z(t + o * r, e + o * s))
                    }
                    var h = 1 / 0,
                        u = 0;

                    function l(t) {
                        if (0 <= t && t <= 1) {
                            var e = n.getDistance($.getPoint(i, t), !0);
                            if (e < h) return h = e, u = t, !0
                        }
                    }
                    for (var c = 0; c <= 100; c++) l(c / 100);
                    for (var f = .005; 1e-8 < f;) l(u - f) || l(u + f) || (f /= 2);
                    return u
                },
                getPart: function(t, e, i) {
                    var n = i < e;
                    if (n) {
                        var r = e;
                        e = i, i = r
                    }
                    return 0 < e && (t = $.subdivide(t, e)[1]), i < 1 && (t = $.subdivide(t, (i - e) / (1 - e))[0]), n ? [t[6], t[7], t[4], t[5], t[2], t[3], t[0], t[1]] : t
                },
                isFlatEnough: function(t, e) {
                    var i = t[0],
                        n = t[1],
                        r = t[2],
                        s = t[3],
                        a = t[4],
                        o = t[5],
                        h = t[6],
                        u = t[7],
                        l = 3 * r - 2 * i - h,
                        c = 3 * s - 2 * n - u,
                        f = 3 * a - 2 * h - i,
                        d = 3 * o - 2 * u - n;
                    return Math.max(l * l, f * f) + Math.max(c * c, d * d) <= 16 * e * e
                },
                getArea: function(t) {
                    var e = t[0],
                        i = t[1],
                        n = t[2],
                        r = t[3],
                        s = t[4],
                        a = t[5],
                        o = t[6],
                        h = t[7];
                    return 3 * ((h - i) * (n + s) - (o - e) * (r + a) + r * (e - s) - n * (i - a) + h * (s + e / 3) - o * (a + i / 3)) / 20
                },
                getBounds: function(t) {
                    for (var e = t.slice(0, 2), i = e.slice(), n = [0, 0], r = 0; r < 2; r++) $._addBounds(t[r], t[r + 2], t[r + 4], t[r + 6], r, 0, e, i, n);
                    return new T(e[0], e[1], i[0] - e[0], i[1] - e[1])
                },
                _addBounds: function(t, e, i, n, r, s, a, o, h) {
                    function u(t, e) {
                        var i = t - e,
                            n = t + e;
                        i < a[r] && (a[r] = i), n > o[r] && (o[r] = n)
                    }
                    s /= 2;
                    var l = a[r] - s,
                        c = o[r] + s;
                    if (t < l || e < l || i < l || n < l || c < t || c < e || c < i || c < n)
                        if (e < t != e < n && i < t != i < n) u(t, s), u(n, s);
                        else {
                            var f = 3 * (e - i) - t + n,
                                d = 2 * (t + i) - 4 * e,
                                _ = e - t,
                                g = H.solveQuadratic(f, d, _, h);
                            u(n, 0);
                            for (var v = 0; v < g; v++) {
                                var p = h[v],
                                    m = 1 - p;
                                1e-8 <= p && p <= 1 - 1e-8 && u(m * m * m * t + 3 * m * m * p * e + 3 * m * p * p * i + p * p * p * n, s)
                            }
                        }
                }
            }
        }, V.each(["getBounds", "getStrokeBounds", "getHandleBounds"], function(e) {
            this[e] = function() {
                this._bounds || (this._bounds = {});
                var t = this._bounds[e];
                return t || (t = this._bounds[e] = F[e]([this._segment1, this._segment2], !1, this._path)), t.clone()
            }
        }, {}), V.each({
            isStraight: function(t, e, i, n) {
                if (e.isZero() && i.isZero()) return !0;
                var r = n.subtract(t);
                if (r.isZero()) return !1;
                if (r.isCollinear(e) && r.isCollinear(i)) {
                    var s = new G(t, n);
                    if (s.getDistance(t.add(e)) < 1e-7 && s.getDistance(n.add(i)) < 1e-7) {
                        var a = r.dot(r),
                            o = r.dot(e) / a,
                            h = r.dot(i) / a;
                        return 0 <= o && o <= 1 && h <= 0 && -1 <= h
                    }
                }
                return !1
            },
            isLinear: function(t, e, i, n) {
                var r = n.subtract(t).divide(3);
                return e.equals(r) && i.negate().equals(r)
            }
        }, function(a, t) {
            this[t] = function(t) {
                var e = this._segment1,
                    i = this._segment2;
                return a(e._point, e._handleOut, i._handleIn, i._point, t)
            }, this.statics[t] = function(t, e) {
                var i = t[0],
                    n = t[1],
                    r = t[6],
                    s = t[7];
                return a(new Z(i, n), new Z(t[2] - i, t[3] - n), new Z(t[4] - r, t[5] - s), new Z(r, s), e)
            }
        }, {
            statics: {},
            hasHandles: function() {
                return !this._segment1._handleOut.isZero() || !this._segment2._handleIn.isZero()
            },
            hasLength: function(t) {
                return (!this.getPoint1().equals(this.getPoint2()) || this.hasHandles()) && this.getLength() > (t || 0)
            },
            isCollinear: function(t) {
                return t && this.isStraight() && t.isStraight() && this.getLine().isCollinear(t.getLine())
            },
            isHorizontal: function() {
                return this.isStraight() && Math.abs(this.getTangentAtTime(.5).y) < 1e-8
            },
            isVertical: function() {
                return this.isStraight() && Math.abs(this.getTangentAtTime(.5).x) < 1e-8
            }
        }), {
            beans: !1,
            getLocationAt: function(t, e) {
                return this.getLocationAtTime(e ? t : this.getTimeAt(t))
            },
            getLocationAtTime: function(t) {
                return null != t && 0 <= t && t <= 1 ? new j(this, t) : null
            },
            getTimeAt: function(t, e) {
                return $.getTimeAt(this.getValues(), t, e)
            },
            getParameterAt: "#getTimeAt",
            getTimesWithTangent: function() {
                var t = Z.read(arguments);
                return t.isZero() ? [] : $.getTimesWithTangent(this.getValues(), t)
            },
            getOffsetAtTime: function(t) {
                return this.getPartLength(0, t)
            },
            getLocationOf: function() {
                return this.getLocationAtTime(this.getTimeOf(Z.read(arguments)))
            },
            getOffsetOf: function() {
                var t = this.getLocationOf.apply(this, arguments);
                return t ? t.getOffset() : null
            },
            getTimeOf: function() {
                return $.getTimeOf(this.getValues(), Z.read(arguments))
            },
            getParameterOf: "#getTimeOf",
            getNearestLocation: function() {
                var t = Z.read(arguments),
                    e = this.getValues(),
                    i = $.getNearestTime(e, t),
                    n = $.getPoint(e, i);
                return new j(this, i, n, null, t.getDistance(n))
            },
            getNearestPoint: function() {
                var t = this.getNearestLocation.apply(this, arguments);
                return t ? t.getPoint() : t
            }
        }, new function() {
            var t = ["getPoint", "getTangent", "getNormal", "getWeightedTangent", "getWeightedNormal", "getCurvature"];
            return V.each(t, function(n) {
                this[n + "At"] = function(t, e) {
                    var i = this.getValues();
                    return $[n](i, e ? t : $.getTimeAt(i, t))
                }, this[n + "AtTime"] = function(t) {
                    return $[n](this.getValues(), t)
                }
            }, {
                statics: {
                    _evaluateMethods: t
                }
            })
        }, new function() {
            function f(t) {
                var e = t[0],
                    i = t[1],
                    n = t[2],
                    r = t[3],
                    s = t[4],
                    a = t[5],
                    o = t[6],
                    h = t[7],
                    u = 9 * (n - s) + 3 * (o - e),
                    l = 6 * (e + s) - 12 * n,
                    c = 3 * (n - e),
                    f = 9 * (r - a) + 3 * (h - i),
                    d = 6 * (i + a) - 12 * r,
                    _ = 3 * (r - i);
                return function(t) {
                    var e = (u * t + l) * t + c,
                        i = (f * t + d) * t + _;
                    return Math.sqrt(e * e + i * i)
                }
            }

            function d(t, e) {
                return Math.max(2, Math.min(16, Math.ceil(32 * Math.abs(e - t))))
            }

            function i(t, e, i, n) {
                if (null == e || e < 0 || 1 < e) return null;
                var r = t[0],
                    s = t[1],
                    a = t[2],
                    o = t[3],
                    h = t[4],
                    u = t[5],
                    l = t[6],
                    c = t[7],
                    f = H.isZero;
                f(a - r) && f(o - s) && (a = r, o = s), f(h - l) && f(u - c) && (h = l, u = c);
                var d, _, g = 3 * (a - r),
                    v = 3 * (h - a) - g,
                    p = l - r - g - v,
                    m = 3 * (o - s),
                    y = 3 * (u - o) - m,
                    w = c - s - m - y;
                if (0 === i) d = 0 === e ? r : 1 === e ? l : ((p * e + v) * e + g) * e + r, _ = 0 === e ? s : 1 === e ? c : ((w * e + y) * e + m) * e + s;
                else {
                    if (_ = e < 1e-8 ? (d = g, m) : 1 - 1e-8 < e ? (d = 3 * (l - h), 3 * (c - u)) : (d = (3 * p * e + 2 * v) * e + g, (3 * w * e + 2 * y) * e + m), n) {
                        0 === d && 0 === _ && (e < 1e-8 || 1 - 1e-8 < e) && (d = h - a, _ = u - o);
                        var x = Math.sqrt(d * d + _ * _);
                        x && (d /= x, _ /= x)
                    }
                    if (3 === i) {
                        h = 6 * p * e + 2 * v, u = 6 * w * e + 2 * y;
                        var b = Math.pow(d * d + _ * _, 1.5);
                        d = 0 !== b ? (d * u - _ * h) / b : 0, _ = 0
                    }
                }
                return 2 === i ? new Z(_, -d) : new Z(d, _)
            }
            return {
                statics: {
                    classify: function(t) {
                        var e = t[0],
                            i = t[1],
                            n = t[2],
                            r = t[3],
                            s = t[4],
                            a = t[5],
                            o = t[6],
                            h = t[7],
                            u = n * (i - h) + r * (o - e) + e * h - i * o,
                            l = 3 * (s * (r - i) + a * (e - n) + n * i - r * e),
                            c = l - u,
                            f = c - u + (e * (h - a) + i * (s - o) + o * a - h * s),
                            d = Math.sqrt(f * f + c * c + l * l),
                            _ = 0 !== d ? 1 / d : 0,
                            g = H.isZero,
                            v = "serpentine";

                        function p(t, e, i) {
                            var n = e !== q,
                                r = n && 0 < e && e < 1,
                                s = n && 0 < i && i < 1;
                            return !n || (r || s) && ("loop" !== t || r && s) || (r = s = !(t = "arch")), {
                                type: t,
                                roots: r || s ? r && s ? e < i ? [e, i] : [i, e] : [r ? e : i] : null
                            }
                        }
                        if (c *= _, l *= _, g(f *= _)) return g(c) ? p(g(l) ? "line" : "quadratic") : p(v, l / (3 * c));
                        var m = 3 * c * c - 4 * f * l;
                        if (g(m)) return p("cusp", c / (2 * f));
                        var y = 0 < m ? Math.sqrt(m / 3) : Math.sqrt(-m),
                            w = 2 * f;
                        return p(0 < m ? v : "loop", (c + y) / w, (c - y) / w)
                    },
                    getLength: function(t, e, i, n) {
                        if (e === q && (e = 0), i === q && (i = 1), $.isStraight(t)) {
                            var r = t;
                            i < 1 && (r = $.subdivide(r, i)[0], e /= i), 0 < e && (r = $.subdivide(r, e)[1]);
                            var s = r[6] - r[0],
                                a = r[7] - r[1];
                            return Math.sqrt(s * s + a * a)
                        }
                        return H.integrate(n || f(t), e, i, d(e, i))
                    },
                    getTimeAt: function(t, e, i) {
                        if (i === q && (i = e < 0 ? 1 : 0), 0 === e) return i;
                        var n = Math.abs,
                            r = 0 < e,
                            s = r ? i : 0,
                            a = r ? 1 : i,
                            o = f(t),
                            h = $.getLength(t, s, a, o),
                            u = n(e) - h;
                        if (n(u) < 1e-12) return r ? a : s;
                        if (1e-12 < u) return null;
                        var l = e / h,
                            c = 0;
                        return H.findRoot(function(t) {
                            return c += H.integrate(o, i, t, d(i, t)), i = t, c - e
                        }, o, i + l, s, a, 32, 1e-12)
                    },
                    getPoint: function(t, e) {
                        return i(t, e, 0, !1)
                    },
                    getTangent: function(t, e) {
                        return i(t, e, 1, !0)
                    },
                    getWeightedTangent: function(t, e) {
                        return i(t, e, 1, !1)
                    },
                    getNormal: function(t, e) {
                        return i(t, e, 2, !0)
                    },
                    getWeightedNormal: function(t, e) {
                        return i(t, e, 2, !1)
                    },
                    getCurvature: function(t, e) {
                        return i(t, e, 3, !1).x
                    },
                    getPeaks: function(t) {
                        var e = t[0],
                            i = t[1],
                            n = t[2],
                            r = t[3],
                            s = t[4],
                            a = t[5],
                            o = 3 * n - e - 3 * s + t[6],
                            h = 3 * e - 6 * n + 3 * s,
                            u = -3 * e + 3 * n,
                            l = 3 * r - i - 3 * a + t[7],
                            c = 3 * i - 6 * r + 3 * a,
                            f = -3 * i + 3 * r,
                            d = [];
                        return H.solveCubic(9 * (o * o + l * l), 9 * (o * h + c * l), 2 * (h * h + c * c) + 3 * (u * o + f * l), u * h + c * f, d, 1e-8, 1 - 1e-8), d.sort()
                    }
                }
            }
        }, new function() {
            function F(t, e, i, n, r, s, a) {
                var o = !a && i.getPrevious() === r,
                    h = !a && i !== r && i.getNext() === r;
                if (null !== n && (o ? 1e-8 : 0) <= n && n <= (h ? 1 - 1e-8 : 1) && null !== s && (h ? 1e-8 : 0) <= s && s <= (o ? 1 - 1e-8 : 1)) {
                    var u = new j(i, n, null, a),
                        l = new j(r, s, null, a);
                    (u._intersection = l)._intersection = u, e && !e(u) || j.insert(t, u, !0)
                }
            }

            function D(t, e, i, n) {
                return t[0][1] < i ? r(t, !0, i) : e[0][1] > n ? r(e, !1, n) : t[0][0]
            }

            function r(t, e, i) {
                for (var n = t[0][0], r = t[0][1], s = 1, a = t.length; s < a; s++) {
                    var o = t[s][0],
                        h = t[s][1];
                    if (e ? i <= h : h <= i) return h === i ? o : n + (i - r) * (o - n) / (h - r);
                    n = o, r = h
                }
                return null
            }

            function S(t, e, i, n, r) {
                var s = H.isZero;
                if (s(n) && s(r)) {
                    var a = $.getTimeOf(t, new Z(e, i));
                    return null === a ? [] : [a]
                }
                for (var o = Math.atan2(-r, n), h = Math.sin(o), u = Math.cos(o), l = [], c = [], f = 0; f < 8; f += 2) {
                    var d = t[f] - e,
                        _ = t[f + 1] - i;
                    l.push(d * u - _ * h, d * h + _ * u)
                }
                return $.solveCubic(l, 1, 0, c, 0, 1), c
            }

            function y(t, e, i, n, r, s) {
                var a = 1e-12,
                    o = Math.min,
                    h = Math.max;
                if (h(t[0], t[2], t[4], t[6]) + a > o(e[0], e[2], e[4], e[6]) && o(t[0], t[2], t[4], t[6]) - a < h(e[0], e[2], e[4], e[6]) && h(t[1], t[3], t[5], t[7]) + a > o(e[1], e[3], e[5], e[7]) && o(t[1], t[3], t[5], t[7]) - a < h(e[1], e[3], e[5], e[7])) {
                    var u = C(t, e);
                    if (u)
                        for (var l = 0; l < 2; l++) {
                            var c = u[l];
                            F(r, s, i, c[0], n, c[1], !0)
                        } else {
                            var f = $.isStraight(t),
                                d = $.isStraight(e),
                                _ = f && d,
                                g = f && !d,
                                v = r.length;
                            if ((_ ? function(t, e, i, n, r, s) {
                                    var a = G.intersect(t[0], t[1], t[6], t[7], e[0], e[1], e[6], e[7]);
                                    a && F(r, s, i, $.getTimeOf(t, a), n, $.getTimeOf(e, a))
                                } : f || d ? function(t, e, i, n, r, s, a) {
                                    for (var o = e[0], h = e[1], u = S(t, o, h, e[6] - o, e[7] - h), l = 0, c = u.length; l < c; l++) {
                                        var f = u[l],
                                            d = $.getPoint(t, f),
                                            _ = $.getTimeOf(e, d);
                                        null !== _ && F(r, s, a ? n : i, a ? _ : f, a ? i : n, a ? f : _)
                                    }
                                } : function t(e, i, n, r, s, a, o, h, u, l, c, f, d) {
                                    if (4096 <= ++u || 40 <= ++h) return u;
                                    var _, g, v = i[0],
                                        p = i[1],
                                        m = i[6],
                                        y = i[7],
                                        w = G.getSignedDistance,
                                        x = w(v, p, m, y, i[2], i[3]),
                                        b = w(v, p, m, y, i[4], i[5]),
                                        S = 0 < x * b ? .75 : 4 / 9,
                                        C = S * Math.min(0, x, b),
                                        P = S * Math.max(0, x, b),
                                        I = w(v, p, m, y, e[0], e[1]),
                                        M = w(v, p, m, y, e[2], e[3]),
                                        T = w(v, p, m, y, e[4], e[5]),
                                        z = w(v, p, m, y, e[6], e[7]),
                                        k = function(t, e, i, n) {
                                            var r, s = [0, t],
                                                a = [1 / 3, e],
                                                o = [2 / 3, i],
                                                h = [1, n],
                                                u = e - (2 * t + n) / 3,
                                                l = i - (t + 2 * n) / 3;
                                            if (u * l < 0) r = [
                                                [s, a, h],
                                                [s, o, h]
                                            ];
                                            else {
                                                var c = u / l;
                                                r = [2 <= c ? [s, a, h] : c <= .5 ? [s, o, h] : [s, a, o, h],
                                                    [s, h]
                                                ]
                                            }
                                            return (u || l) < 0 ? r.reverse() : r
                                        }(I, M, T, z),
                                        O = k[0],
                                        A = k[1];
                                    if (0 === x && 0 === b && 0 === I && 0 === M && 0 === T && 0 === z || null == (_ = D(O, A, C, P)) || null == (g = D(O.reverse(), A.reverse(), C, P))) return u;
                                    var L = l + (c - l) * _,
                                        N = l + (c - l) * g;
                                    if (Math.max(d - f, N - L) < 1e-9) {
                                        var B = (L + N) / 2,
                                            E = (f + d) / 2;
                                        F(s, a, o ? r : n, o ? E : B, o ? n : r, o ? B : E)
                                    } else if (e = $.getPart(e, _, g), .8 < g - _)
                                        if (d - f < N - L) B = (L + N) / 2, u = t(i, (j = $.subdivide(e, .5))[0], r, n, s, a, !o, h, u, f, d, L, B), u = t(i, j[1], r, n, s, a, !o, h, u, f, d, B, N);
                                        else {
                                            var j;
                                            E = (f + d) / 2, u = t((j = $.subdivide(i, .5))[0], e, r, n, s, a, !o, h, u, f, E, L, N), u = t(j[1], e, r, n, s, a, !o, h, u, E, d, L, N)
                                        }
                                    else u = 1e-9 <= d - f ? t(i, e, r, n, s, a, !o, h, u, f, d, L, N) : t(e, i, n, r, s, a, o, h, u, L, N, f, d);
                                    return u
                                })(g ? e : t, g ? t : e, g ? n : i, g ? i : n, r, s, g, 0, 0, 0, 1, 0, 1), !_ || r.length === v)
                                for (l = 0; l < 4; l++) {
                                    var p = l >> 1,
                                        m = 1 & l,
                                        y = 6 * p,
                                        w = 6 * m,
                                        x = new Z(t[y], t[y + 1]),
                                        b = new Z(e[w], e[w + 1]);
                                    x.isClose(b, a) && F(r, s, i, p, n, m)
                                }
                        }
                }
                return r
            }

            function w(t, e, i, n) {
                var r = $.classify(t);
                if ("loop" === r.type) {
                    var s = r.roots;
                    F(i, n, e, s[0], e, s[1])
                }
                return i
            }

            function C(t, e) {
                function i(t) {
                    var e = t[6] - t[0],
                        i = t[7] - t[1];
                    return e * e + i * i
                }
                var n = Math.abs,
                    r = G.getDistance,
                    s = 1e-7,
                    a = $.isStraight(t),
                    o = $.isStraight(e),
                    h = a && o,
                    u = i(t) < i(e),
                    l = u ? e : t,
                    c = u ? t : e,
                    f = l[0],
                    d = l[1],
                    _ = l[6] - f,
                    g = l[7] - d;
                if (r(f, d, _, g, c[0], c[1], !0) < s && r(f, d, _, g, c[6], c[7], !0) < s) !h && r(f, d, _, g, l[2], l[3], !0) < s && r(f, d, _, g, l[4], l[5], !0) < s && r(f, d, _, g, c[2], c[3], !0) < s && r(f, d, _, g, c[4], c[5], !0) < s && (a = o = h = !0);
                else if (h) return null;
                if (a ^ o) return null;
                for (var v = [t, e], p = [], m = 0; m < 4 && p.length < 2; m++) {
                    var y = 1 & m,
                        w = 1 ^ y,
                        x = m >> 1,
                        b = $.getTimeOf(v[y], new Z(v[w][x ? 6 : 0], v[w][x ? 7 : 1]));
                    if (null != b) {
                        var S = y ? [x, b] : [b, x];
                        (!p.length || 1e-8 < n(S[0] - p[0][0]) && 1e-8 < n(S[1] - p[0][1])) && p.push(S)
                    }
                    if (2 < m && !p.length) break
                }
                if (2 !== p.length) p = null;
                else if (!h) {
                    var C = $.getPart(t, p[0][0], p[1][0]),
                        P = $.getPart(e, p[0][1], p[1][1]);
                    (n(P[2] - C[2]) > s || n(P[3] - C[3]) > s || n(P[4] - C[4]) > s || n(P[5] - C[5]) > s) && (p = null)
                }
                return p
            }
            return {
                getIntersections: function(t) {
                    var e = this.getValues(),
                        i = t && t !== this && t.getValues();
                    return i ? y(e, i, this, t, []) : w(e, this, [])
                },
                statics: {
                    getOverlaps: C,
                    getIntersections: function(t, e, i, n, r, s) {
                        var a = !e;
                        a && (e = t);
                        for (var o, h, u = t.length, l = e.length, c = [], f = [], d = 0; d < l; d++) c[d] = e[d].getValues(r);
                        for (d = 0; d < u; d++) {
                            var _ = t[d],
                                g = a ? c[d] : _.getValues(n),
                                v = _.getPath();
                            v !== h && (h = v, o = [], f.push(o)), a && w(g, _, o, i);
                            for (var p = a ? d + 1 : 0; p < l; p++) {
                                if (s && o.length) return o;
                                y(g, c[p], _, e[p], o, i)
                            }
                        }
                        o = [], d = 0;
                        for (var m = f.length; d < m; d++) V.push(o, f[d]);
                        return o
                    },
                    getCurveLineIntersections: S,
                    getTimesWithTangent: function(t, e) {
                        var i = t[0],
                            n = t[1],
                            r = t[2],
                            s = t[3],
                            a = t[4],
                            o = t[5],
                            h = t[6],
                            u = t[7],
                            l = e.normalize(),
                            c = l.x,
                            f = l.y,
                            d = 3 * h - 9 * a + 9 * r - 3 * i,
                            _ = 3 * u - 9 * o + 9 * s - 3 * n,
                            g = 6 * a - 12 * r + 6 * i,
                            v = 6 * o - 12 * s + 6 * n,
                            p = 3 * r - 3 * i,
                            m = 3 * s - 3 * n,
                            y = 2 * d * f - 2 * _ * c,
                            w = [];
                        if (Math.abs(y) < H.CURVETIME_EPSILON) {
                            if (0 != (y = d * v - _ * g)) {
                                var x = -(d * m - _ * p) / y;
                                0 <= x && x <= 1 && w.push(x)
                            }
                        } else {
                            var b = (g * g - 4 * d * p) * f * f + (-2 * g * v + 4 * _ * p + 4 * d * m) * c * f + (v * v - 4 * _ * m) * c * c,
                                S = g * f - v * c;
                            if (0 <= b && 0 != y) {
                                var C = Math.sqrt(b),
                                    P = -(S + C) / y,
                                    I = (-S + C) / y;
                                0 <= P && P <= 1 && w.push(P), 0 <= I && I <= 1 && w.push(I)
                            }
                        }
                        return w
                    }
                }
            }
        }),
        j = V.extend({
            _class: "CurveLocation",
            initialize: function(t, e, i, n, r) {
                if (.99999999 <= e) {
                    var s = t.getNext();
                    s && (e = 0, t = s)
                }
                this._setCurve(t), this._time = e, this._point = i || t.getPointAtTime(e), this._overlap = n, this._distance = r, this._intersection = this._next = this._previous = null
            },
            _setCurve: function(t) {
                var e = t._path;
                this._path = e, this._version = e ? e._version : 0, this._curve = t, this._segment = null, this._segment1 = t._segment1, this._segment2 = t._segment2
            },
            _setSegment: function(t) {
                this._setCurve(t.getCurve()), this._segment = t, this._time = t === this._segment1 ? 0 : 1, this._point = t._point.clone()
            },
            getSegment: function() {
                var t = this._segment;
                if (!t) {
                    var e = this.getCurve(),
                        i = this.getTime();
                    0 === i ? t = e._segment1 : 1 === i ? t = e._segment2 : null != i && (t = e.getPartLength(0, i) < e.getPartLength(i, 1) ? e._segment1 : e._segment2), this._segment = t
                }
                return t
            },
            getCurve: function() {
                var t = this._path,
                    i = this;

                function e(t) {
                    var e = t && t.getCurve();
                    if (e && null != (i._time = e.getTimeOf(i._point))) return i._setCurve(e), e
                }
                return t && t._version !== this._version && (this._time = this._offset = this._curveOffset = this._curve = null), this._curve || e(this._segment) || e(this._segment1) || e(this._segment2.getPrevious())
            },
            getPath: function() {
                var t = this.getCurve();
                return t && t._path
            },
            getIndex: function() {
                var t = this.getCurve();
                return t && t.getIndex()
            },
            getTime: function() {
                var t = this.getCurve(),
                    e = this._time;
                return t && null == e ? this._time = t.getTimeOf(this._point) : e
            },
            getParameter: "#getTime",
            getPoint: function() {
                return this._point
            },
            getOffset: function() {
                var t = this._offset;
                if (null == t) {
                    t = 0;
                    var e = this.getPath(),
                        i = this.getIndex();
                    if (e && null != i)
                        for (var n = e.getCurves(), r = 0; r < i; r++) t += n[r].getLength();
                    this._offset = t += this.getCurveOffset()
                }
                return t
            },
            getCurveOffset: function() {
                var t = this._curveOffset;
                if (null == t) {
                    var e = this.getCurve(),
                        i = this.getTime();
                    this._curveOffset = t = null != i && e && e.getPartLength(0, i)
                }
                return t
            },
            getIntersection: function() {
                return this._intersection
            },
            getDistance: function() {
                return this._distance
            },
            divide: function() {
                var t = this.getCurve(),
                    e = t && t.divideAtTime(this.getTime());
                return e && this._setSegment(e._segment1), e
            },
            split: function() {
                var t = this.getCurve(),
                    e = t._path,
                    i = t && t.splitAtTime(this.getTime());
                return i && this._setSegment(e.getLastSegment()), i
            },
            equals: function(t, e) {
                var i = this === t;
                if (!i && t instanceof j) {
                    var n = this.getCurve(),
                        r = t.getCurve(),
                        s = n._path;
                    if (s === r._path) {
                        var a = Math.abs,
                            o = a(this.getOffset() - t.getOffset()),
                            h = !e && this._intersection,
                            u = !e && t._intersection;
                        i = (o < 1e-7 || s && a(s.getLength() - o) < 1e-7) && (!h && !u || h && u && h.equals(u, !0))
                    }
                }
                return i
            },
            toString: function() {
                var t = [],
                    e = this.getPoint(),
                    i = b.instance;
                e && t.push("point: " + e);
                var n = this.getIndex();
                null != n && t.push("index: " + n);
                var r = this.getTime();
                return null != r && t.push("time: " + i.number(r)), null != this._distance && t.push("distance: " + i.number(this._distance)), "{ " + t.join(", ") + " }"
            },
            isTouching: function() {
                var t = this._intersection;
                if (t && this.getTangent().isCollinear(t.getTangent())) {
                    var e = this.getCurve(),
                        i = t.getCurve();
                    return !(e.isStraight() && i.isStraight() && e.getLine().intersect(i.getLine()))
                }
                return !1
            },
            isCrossing: function() {
                var t = this._intersection;
                if (!t) return !1;
                var e = this.getTime(),
                    i = t.getTime(),
                    n = 1e-8,
                    r = 1 - n,
                    s = n <= e && e <= r,
                    a = n <= i && i <= r;
                if (s && a) return !this.isTouching();
                var o = this.getCurve(),
                    h = e < n ? o.getPrevious() : o,
                    u = t.getCurve(),
                    l = i < n ? u.getPrevious() : u;
                if (r < e && (o = o.getNext()), r < i && (u = u.getNext()), !(h && o && l && u)) return !1;
                var c = [];

                function f(t, e) {
                    var i = t.getValues(),
                        n = $.classify(i).roots || $.getPeaks(i),
                        r = n.length,
                        s = e && 1 < r ? n[r - 1] : 0 < r ? n[0] : .5;
                    c.push($.getLength(i, e ? s : 0, e ? 1 : s) / 2)
                }

                function d(t, e, i) {
                    return e < i ? e < t && t < i : e < t || t < i
                }
                s || (f(h, !0), f(o, !1)), a || (f(l, !0), f(u, !1));
                var _ = this.getPoint(),
                    g = Math.min.apply(Math, c),
                    v = s ? o.getTangentAtTime(e) : o.getPointAt(g).subtract(_),
                    p = s ? v.negate() : h.getPointAt(-g).subtract(_),
                    m = a ? u.getTangentAtTime(i) : u.getPointAt(g).subtract(_),
                    y = a ? m.negate() : l.getPointAt(-g).subtract(_),
                    w = p.getAngle(),
                    x = v.getAngle(),
                    b = y.getAngle(),
                    S = m.getAngle();
                return !!(s ? d(w, b, S) ^ d(x, b, S) && d(w, S, b) ^ d(x, S, b) : d(b, w, x) ^ d(S, w, x) && d(b, x, w) ^ d(S, x, w))
            },
            hasOverlap: function() {
                return !!this._overlap
            }
        }, V.each($._evaluateMethods, function(t) {
            var i = t + "At";
            this[t] = function() {
                var t = this.getCurve(),
                    e = this.getTime();
                return null != e && t && t[i](e, !0)
            }
        }, {
            preserve: !0
        }), new function() {
            function n(r, s, t) {
                var a = r.length,
                    e = 0,
                    i = a - 1;

                function n(t, e) {
                    for (var i = t + e; - 1 <= i && i <= a; i += e) {
                        var n = r[(i % a + a) % a];
                        if (!s.getPoint().isClose(n.getPoint(), 1e-7)) break;
                        if (s.equals(n)) return n
                    }
                    return null
                }
                for (; e <= i;) {
                    var o, h = e + i >>> 1,
                        u = r[h];
                    if (t && (o = s.equals(u) ? u : n(h, -1) || n(h, 1))) return s._overlap && (o._overlap = o._intersection._overlap = !0), o;
                    var l = s.getPath(),
                        c = u.getPath();
                    (l !== c ? l._id - c._id : s.getIndex() + s.getTime() - (u.getIndex() + u.getTime())) < 0 ? i = h - 1 : e = h + 1
                }
                return r.splice(e, 0, s), s
            }
            return {
                statics: {
                    insert: n,
                    expand: function(t) {
                        for (var e = t.slice(), i = t.length - 1; 0 <= i; i--) n(e, t[i]._intersection, !1);
                        return e
                    }
                }
            }
        }),
        L = O.extend({
            _class: "PathItem",
            _selectBounds: !1,
            _canScaleStroke: !0,
            beans: !0,
            initialize: function() {},
            statics: {
                create: function(t) {
                    var e, i, n;
                    if (V.isPlainObject(t) ? (i = t.segments, e = t.pathData) : Array.isArray(t) ? i = t : "string" == typeof t && (e = t), i) {
                        var r = i[0];
                        n = r && Array.isArray(r[0])
                    } else e && (n = 1 < (e.match(/m/gi) || []).length || /z\s*\S+/i.test(e));
                    return new(n ? D : F)(t)
                }
            },
            _asPathItem: function() {
                return this
            },
            isClockwise: function() {
                return 0 <= this.getArea()
            },
            setClockwise: function(t) {
                this.isClockwise() != (t = !!t) && this.reverse()
            },
            setPathData: function(t) {
                var n, e, i, r = t && t.match(/[mlhvcsqtaz][^mlhvcsqtaz]*/gi),
                    s = !1,
                    a = new Z,
                    o = new Z;

                function h(t, e) {
                    var i = +n[t];
                    return s && (i += a[e]), i
                }

                function u(t) {
                    return new Z(h(t, "x"), h(t + 1, "y"))
                }
                this.clear();
                for (var l = 0, c = r && r.length; l < c; l++) {
                    var f = r[l],
                        d = f[0],
                        _ = d.toLowerCase(),
                        g = (n = f.match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g)) && n.length;
                    switch (s = d === _, "z" !== e || /[mz]/.test(_) || this.moveTo(a), _) {
                        case "m":
                        case "l":
                            for (var v = "m" === _, p = 0; p < g; p += 2) this[v ? "moveTo" : "lineTo"](a = u(p)), v && (o = a, v = !1);
                            i = a;
                            break;
                        case "h":
                        case "v":
                            var m = "h" === _ ? "x" : "y";
                            a = a.clone();
                            for (p = 0; p < g; p++) a[m] = h(p, m), this.lineTo(a);
                            i = a;
                            break;
                        case "c":
                            for (p = 0; p < g; p += 6) this.cubicCurveTo(u(p), i = u(p + 2), a = u(p + 4));
                            break;
                        case "s":
                            for (p = 0; p < g; p += 4) this.cubicCurveTo(/[cs]/.test(e) ? a.multiply(2).subtract(i) : a, i = u(p), a = u(p + 2)), e = _;
                            break;
                        case "q":
                            for (p = 0; p < g; p += 4) this.quadraticCurveTo(i = u(p), a = u(p + 2));
                            break;
                        case "t":
                            for (p = 0; p < g; p += 2) this.quadraticCurveTo(i = /[qt]/.test(e) ? a.multiply(2).subtract(i) : a, a = u(p)), e = _;
                            break;
                        case "a":
                            for (p = 0; p < g; p += 7) this.arcTo(a = u(p + 5), new U(+n[p], +n[p + 1]), +n[p + 2], +n[p + 4], +n[p + 3]);
                            break;
                        case "z":
                            this.closePath(1e-12), a = o
                    }
                    e = _
                }
            },
            _canComposite: function() {
                return !(this.hasFill() && this.hasStroke())
            },
            _contains: function(t) {
                var e = t.isInside(this.getBounds({
                    internal: !0,
                    handle: !0
                })) ? this._getWinding(t) : {};
                return e.onPath || !!("evenodd" === this.getFillRule() ? 1 & e.windingL || 1 & e.windingR : e.winding)
            },
            getIntersections: function(t, e, i, n) {
                var r = this === t || !t,
                    s = this._matrix._orNullIfIdentity(),
                    a = r ? s : (i || t._matrix)._orNullIfIdentity();
                return r || this.getBounds(s).intersects(t.getBounds(a), 1e-12) ? $.getIntersections(this.getCurves(), !r && t.getCurves(), e, s, a, n) : []
            },
            getCrossings: function(t) {
                return this.getIntersections(t, function(t) {
                    return t.hasOverlap() || t.isCrossing()
                })
            },
            getNearestLocation: function() {
                for (var t = Z.read(arguments), e = this.getCurves(), i = 1 / 0, n = null, r = 0, s = e.length; r < s; r++) {
                    var a = e[r].getNearestLocation(t);
                    a._distance < i && (i = a._distance, n = a)
                }
                return n
            },
            getNearestPoint: function() {
                var t = this.getNearestLocation.apply(this, arguments);
                return t ? t.getPoint() : t
            },
            interpolate: function(t, e, i) {
                var n = !this._children,
                    r = n ? "_segments" : "_children",
                    s = t[r],
                    a = e[r],
                    o = this[r];
                if (!s || !a || s.length !== a.length) throw new Error("Invalid operands in interpolate() call: " + t + ", " + e);
                var h = o.length,
                    u = a.length;
                if (h < u)
                    for (var l = n ? J : F, c = h; c < u; c++) this.add(new l);
                else u < h && this[n ? "removeSegments" : "removeChildren"](u, h);
                for (c = 0; c < u; c++) o[c].interpolate(s[c], a[c], i);
                n && (this.setClosed(t._closed), this._changed(9))
            },
            compare: function(t) {
                var e = !1;
                if (t) {
                    var i = this._children || [this],
                        n = t._children ? t._children.slice() : [t],
                        r = i.length,
                        s = n.length,
                        a = [],
                        o = 0;
                    e = !0;
                    for (var h = r - 1; 0 <= h && e; h--) {
                        var u = i[h];
                        e = !1;
                        for (var l = s - 1; 0 <= l && !e; l--) u.compare(n[l]) && (a[l] || (a[l] = !0, o++), e = !0)
                    }
                    e = e && o === s
                }
                return e
            }
        }),
        F = L.extend({
            _class: "Path",
            _serializeFields: {
                segments: [],
                closed: !1
            },
            initialize: function(t) {
                this._closed = !1, this._segments = [], this._version = 0;
                var e = Array.isArray(t) ? "object" == typeof t[0] ? t : arguments : !t || t.size !== q || t.x === q && t.point === q ? null : arguments;
                e && 0 < e.length ? this.setSegments(e) : (this._curves = q, this._segmentSelection = 0, e || "string" != typeof t || (this.setPathData(t), t = null)), this._initialize(!e && t)
            },
            _equals: function(t) {
                return this._closed === t._closed && V.equals(this._segments, t._segments)
            },
            copyContent: function(t) {
                this.setSegments(t._segments), this._closed = t._closed
            },
            _changed: function t(e) {
                if (t.base.call(this, e), 8 & e) {
                    if (this._length = this._area = q, 32 & e) this._version++;
                    else if (this._curves)
                        for (var i = 0, n = this._curves.length; i < n; i++) this._curves[i]._changed()
                } else 64 & e && (this._bounds = q)
            },
            getStyle: function() {
                var t = this._parent;
                return (t instanceof D ? t : this)._style
            },
            getSegments: function() {
                return this._segments
            },
            setSegments: function(t) {
                var e = this.isFullySelected(),
                    i = t && t.length;
                if (this._segments.length = 0, this._segmentSelection = 0, this._curves = q, i) {
                    var n = t[i - 1];
                    "boolean" == typeof n && (this.setClosed(n), i--), this._add(J.readList(t, 0, {}, i))
                }
                e && this.setFullySelected(!0)
            },
            getFirstSegment: function() {
                return this._segments[0]
            },
            getLastSegment: function() {
                return this._segments[this._segments.length - 1]
            },
            getCurves: function() {
                var t = this._curves,
                    e = this._segments;
                if (!t) {
                    var i = this._countCurves();
                    t = this._curves = new Array(i);
                    for (var n = 0; n < i; n++) t[n] = new $(this, e[n], e[n + 1] || e[0])
                }
                return t
            },
            getFirstCurve: function() {
                return this.getCurves()[0]
            },
            getLastCurve: function() {
                var t = this.getCurves();
                return t[t.length - 1]
            },
            isClosed: function() {
                return this._closed
            },
            setClosed: function(t) {
                if (this._closed != (t = !!t)) {
                    if (this._closed = t, this._curves) {
                        var e = this._curves.length = this._countCurves();
                        t && (this._curves[e - 1] = new $(this, this._segments[e - 1], this._segments[0]))
                    }
                    this._changed(41)
                }
            }
        }, {
            beans: !0,
            getPathData: function(r, t) {
                var s, a, o, h, u, l, c, f, e = this._segments,
                    i = e.length,
                    d = new b(t),
                    _ = new Array(6),
                    g = !0,
                    v = [];

                function n(t, e) {
                    if (t._transformCoordinates(r, _), s = _[0], a = _[1], g) v.push("M" + d.pair(s, a)), g = !1;
                    else if (u = _[2], l = _[3], u === s && l === a && c === o && f === h) {
                        if (!e) {
                            var i = s - o,
                                n = a - h;
                            v.push(0 === i ? "v" + d.number(n) : 0 === n ? "h" + d.number(i) : "l" + d.pair(i, n))
                        }
                    } else v.push("c" + d.pair(c - o, f - h) + " " + d.pair(u - o, l - h) + " " + d.pair(s - o, a - h));
                    o = s, h = a, c = _[4], f = _[5]
                }
                if (!i) return "";
                for (var p = 0; p < i; p++) n(e[p]);
                return this._closed && 0 < i && (n(e[0], !0), v.push("z")), v.join("")
            },
            isEmpty: function() {
                return !this._segments.length
            },
            _transformContent: function(t) {
                for (var e = this._segments, i = new Array(6), n = 0, r = e.length; n < r; n++) e[n]._transformCoordinates(t, i, !0);
                return !0
            },
            _add: function(t, e) {
                for (var i = this._segments, n = this._curves, r = t.length, s = null == e, a = (e = s ? i.length : e, 0); a < r; a++) {
                    var o = t[a];
                    o._path && (o = t[a] = o.clone()), o._path = this, o._index = e + a, o._selection && this._updateSelection(o, 0, o._selection)
                }
                if (s) V.push(i, t);
                else {
                    i.splice.apply(i, [e, 0].concat(t));
                    a = e + r;
                    for (var h = i.length; a < h; a++) i[a]._index = a
                }
                if (n) {
                    var u = this._countCurves(),
                        l = 0 < e && e + r - 1 === u ? e - 1 : e,
                        c = l,
                        f = Math.min(l + r, u);
                    t._curves && (n.splice.apply(n, [l, 0].concat(t._curves)), c += t._curves.length);
                    for (a = c; a < f; a++) n.splice(a, 0, new $(this, null, null));
                    this._adjustCurves(l, f)
                }
                return this._changed(41), t
            },
            _adjustCurves: function(t, e) {
                for (var i, n = this._segments, r = this._curves, s = t; s < e; s++)(i = r[s])._path = this, i._segment1 = n[s], i._segment2 = n[s + 1] || n[0], i._changed();
                (i = r[this._closed && !t ? n.length - 1 : t - 1]) && (i._segment2 = n[t] || n[0], i._changed()), (i = r[e]) && (i._segment1 = n[e], i._changed())
            },
            _countCurves: function() {
                var t = this._segments.length;
                return !this._closed && 0 < t ? t - 1 : t
            },
            add: function(t) {
                return 1 < arguments.length && "number" != typeof t ? this._add(J.readList(arguments)) : this._add([J.read(arguments)])[0]
            },
            insert: function(t, e) {
                return 2 < arguments.length && "number" != typeof e ? this._add(J.readList(arguments, 1), t) : this._add([J.read(arguments, 1)], t)[0]
            },
            addSegment: function() {
                return this._add([J.read(arguments)])[0]
            },
            insertSegment: function(t) {
                return this._add([J.read(arguments, 1)], t)[0]
            },
            addSegments: function(t) {
                return this._add(J.readList(t))
            },
            insertSegments: function(t, e) {
                return this._add(J.readList(e), t)
            },
            removeSegment: function(t) {
                return this.removeSegments(t, t + 1)[0] || null
            },
            removeSegments: function(t, e, i) {
                t = t || 0, e = V.pick(e, this._segments.length);
                var n = this._segments,
                    r = this._curves,
                    s = n.length,
                    a = n.splice(t, e - t),
                    o = a.length;
                if (!o) return a;
                for (var h = 0; h < o; h++) {
                    var u = a[h];
                    u._selection && this._updateSelection(u, u._selection, 0), u._index = u._path = null
                }
                h = t;
                for (var l = n.length; h < l; h++) n[h]._index = h;
                if (r) {
                    var c = 0 < t && e === s + (this._closed ? 1 : 0) ? t - 1 : t;
                    for (h = (r = r.splice(c, o)).length - 1; 0 <= h; h--) r[h]._path = null;
                    i && (a._curves = r.slice(1)), this._adjustCurves(c, c)
                }
                return this._changed(41), a
            },
            clear: "#removeSegments",
            hasHandles: function() {
                for (var t = this._segments, e = 0, i = t.length; e < i; e++)
                    if (t[e].hasHandles()) return !0;
                return !1
            },
            clearHandles: function() {
                for (var t = this._segments, e = 0, i = t.length; e < i; e++) t[e].clearHandles()
            },
            getLength: function() {
                if (null == this._length) {
                    for (var t = this.getCurves(), e = 0, i = 0, n = t.length; i < n; i++) e += t[i].getLength();
                    this._length = e
                }
                return this._length
            },
            getArea: function() {
                var t = this._area;
                if (null == t) {
                    for (var e = this._segments, i = this._closed, n = t = 0, r = e.length; n < r; n++) {
                        var s = n + 1 === r;
                        t += $.getArea($.getValues(e[n], e[s ? 0 : n + 1], null, s && !i))
                    }
                    this._area = t
                }
                return t
            },
            isFullySelected: function() {
                var t = this._segments.length;
                return this.isSelected() && 0 < t && this._segmentSelection === 7 * t
            },
            setFullySelected: function(t) {
                t && this._selectSegments(!0), this.setSelected(t)
            },
            setSelection: function t(e) {
                1 & e || this._selectSegments(!1), t.base.call(this, e)
            },
            _selectSegments: function(t) {
                var e = this._segments,
                    i = e.length,
                    n = t ? 7 : 0;
                this._segmentSelection = n * i;
                for (var r = 0; r < i; r++) e[r]._selection = n
            },
            _updateSelection: function(t, e, i) {
                t._selection = i, 0 < (this._segmentSelection += i - e) && this.setSelected(!0)
            },
            divideAt: function(t) {
                var e, i = this.getLocationAt(t);
                return i && (e = i.getCurve().divideAt(i.getCurveOffset())) ? e._segment1 : null
            },
            splitAt: function(t) {
                var e = this.getLocationAt(t),
                    i = e && e.index,
                    n = e && e.time;
                1 - 1e-8 < n && (i++, n = 0);
                var r = this.getCurves();
                if (0 <= i && i < r.length) {
                    1e-8 <= n && r[i++].divideAtTime(n);
                    var s, a = this.removeSegments(i, this._segments.length, !0);
                    return this._closed ? (this.setClosed(!1), s = this) : ((s = new F(O.NO_INSERT)).insertAbove(this), s.copyAttributes(this)), s._add(a, 0), this.addSegment(a[0]), s
                }
                return null
            },
            split: function(t, e) {
                var i, n = e === q ? t : (i = this.getCurves()[t]) && i.getLocationAtTime(e);
                return null != n ? this.splitAt(n) : null
            },
            join: function(t, e) {
                var i = e || 0;
                if (t && t !== this) {
                    var n = t._segments,
                        r = this.getLastSegment(),
                        s = t.getLastSegment();
                    if (!s) return this;
                    r && r._point.isClose(s._point, i) && t.reverse();
                    var a = t.getFirstSegment();
                    if (r && r._point.isClose(a._point, i)) r.setHandleOut(a._handleOut), this._add(n.slice(1));
                    else {
                        var o = this.getFirstSegment();
                        o && o._point.isClose(a._point, i) && t.reverse(), s = t.getLastSegment(), o && o._point.isClose(s._point, i) ? (o.setHandleIn(s._handleIn), this._add(n.slice(0, n.length - 1), 0)) : this._add(n.slice())
                    }
                    t._closed && this._add([n[0]]), t.remove()
                }
                var h = this.getFirstSegment(),
                    u = this.getLastSegment();
                return h !== u && h._point.isClose(u._point, i) && (h.setHandleIn(u._handleIn), u.remove(), this.setClosed(!0)), this
            },
            reduce: function(t) {
                for (var e = this.getCurves(), i = t && t.simplify, n = i ? 1e-7 : 0, r = e.length - 1; 0 <= r; r--) {
                    var s = e[r];
                    !s.hasHandles() && (!s.hasLength(n) || i && s.isCollinear(s.getNext())) && s.remove()
                }
                return this
            },
            reverse: function() {
                this._segments.reverse();
                for (var t = 0, e = this._segments.length; t < e; t++) {
                    var i = this._segments[t],
                        n = i._handleIn;
                    i._handleIn = i._handleOut, i._handleOut = n, i._index = t
                }
                this._curves = null, this._changed(9)
            },
            flatten: function(t) {
                for (var e = new m(this, t || .25, 256, !0).parts, i = e.length, n = [], r = 0; r < i; r++) n.push(new J(e[r].curve.slice(0, 2)));
                !this._closed && 0 < i && n.push(new J(e[i - 1].curve.slice(6))), this.setSegments(n)
            },
            simplify: function(t) {
                var e = new n(this).fit(t || 2.5);
                return e && this.setSegments(e), !!e
            },
            smooth: function(t) {
                var r = this,
                    e = t || {},
                    i = e.type || "asymmetric",
                    n = this._segments,
                    s = n.length,
                    a = this._closed;

                function o(t, e) {
                    var i = t && t.index;
                    if (null != i) {
                        var n = t.path;
                        if (n && n !== r) throw new Error(t._class + " " + i + " of " + n + " is not part of " + r);
                        e && t instanceof $ && i++
                    } else i = "number" == typeof t ? t : e;
                    return Math.min(i < 0 && a ? i % s : i < 0 ? i + s : i, s - 1)
                }
                var h = a && e.from === q && e.to === q,
                    u = o(e.from, 0),
                    l = o(e.to, s - 1);
                if (l < u)
                    if (a) u -= s;
                    else {
                        var c = u;
                        u = l, l = c
                    }
                if (/^(?:asymmetric|continuous)$/.test(i)) {
                    var f = "asymmetric" === i,
                        d = Math.min,
                        _ = l - u + 1,
                        g = _ - 1,
                        v = h ? d(_, 4) : 1,
                        p = v,
                        m = v,
                        y = [];
                    if (a || (p = d(1, u), m = d(1, s - l - 1)), (g += p + m) <= 1) return;
                    for (var w = 0, x = u - p; w <= g; w++, x++) y[w] = n[(x < 0 ? x + s : x) % s]._point;
                    var b = y[0]._x + 2 * y[1]._x,
                        S = y[0]._y + 2 * y[1]._y,
                        C = 2,
                        P = g - 1,
                        I = [b],
                        M = [S],
                        T = [C],
                        z = [],
                        k = [];
                    for (w = 1; w < g; w++) {
                        var O = w < P,
                            A = O ? 4 : f ? 2 : 7,
                            L = O ? 4 : f ? 3 : 8,
                            N = O ? 2 : f ? 0 : 1,
                            B = (O ? 1 : f ? 1 : 2) / C;
                        C = T[w] = A - B, b = I[w] = L * y[w]._x + N * y[w + 1]._x - B * b, S = M[w] = L * y[w]._y + N * y[w + 1]._y - B * S
                    }
                    z[P] = I[P] / T[P], k[P] = M[P] / T[P];
                    for (w = g - 2; 0 <= w; w--) z[w] = (I[w] - z[w + 1]) / T[w], k[w] = (M[w] - k[w + 1]) / T[w];
                    z[g] = (3 * y[g]._x - z[P]) / 2, k[g] = (3 * y[g]._y - k[P]) / 2;
                    w = p;
                    var E = g - m;
                    for (x = u; w <= E; w++, x++) {
                        var j = n[x < 0 ? x + s : x],
                            F = j._point,
                            D = z[w] - F._x,
                            R = k[w] - F._y;
                        (h || w < E) && j.setHandleOut(D, R), (h || p < w) && j.setHandleIn(-D, -R)
                    }
                } else
                    for (w = u; w <= l; w++) n[w < 0 ? w + s : w].smooth(e, !h && w === u, !h && w === l)
            },
            toShape: function(t) {
                if (!this._closed) return null;
                var e, i, n, r, s, a, o, u = this._segments;

                function h(t, e) {
                    var i = u[t],
                        n = i.getNext(),
                        r = u[e],
                        s = r.getNext();
                    return i._handleOut.isZero() && n._handleIn.isZero() && r._handleOut.isZero() && s._handleIn.isZero() && n._point.subtract(i._point).isCollinear(s._point.subtract(r._point))
                }

                function l(t) {
                    var e = u[t],
                        i = e.getNext(),
                        n = e._handleOut,
                        r = i._handleIn,
                        s = .5522847498307936;
                    if (n.isOrthogonal(r)) {
                        var a = e._point,
                            o = i._point,
                            h = new G(a, n, !0).intersect(new G(o, r, !0), !0);
                        return h && H.isZero(n.getLength() / h.subtract(a).getLength() - s) && H.isZero(r.getLength() / h.subtract(o).getLength() - s)
                    }
                    return !1
                }

                function c(t, e) {
                    return u[t]._point.getDistance(u[e]._point)
                }
                if (!this.hasHandles() && 4 === u.length && h(0, 2) && h(1, 3) && (s = u[1], a = s.getPrevious(), o = s.getNext(), a._handleOut.isZero() && s._handleIn.isZero() && s._handleOut.isZero() && o._handleIn.isZero() && s._point.subtract(a._point).isOrthogonal(o._point.subtract(s._point))) ? (e = P.Rectangle, i = new U(c(0, 3), c(0, 1)), r = u[1]._point.add(u[2]._point).divide(2)) : 8 === u.length && l(0) && l(2) && l(4) && l(6) && h(1, 5) && h(3, 7) ? (e = P.Rectangle, n = (i = new U(c(1, 6), c(0, 3))).subtract(new U(c(0, 7), c(1, 2))).divide(2), r = u[3]._point.add(u[4]._point).divide(2)) : 4 === u.length && l(0) && l(1) && l(2) && l(3) && (n = H.isZero(c(0, 2) - c(1, 3)) ? (e = P.Circle, c(0, 2) / 2) : (e = P.Ellipse, new U(c(2, 0) / 2, c(3, 1) / 2)), r = u[1]._point), e) {
                    var f = this.getPosition(!0),
                        d = new e({
                            center: f,
                            size: i,
                            radius: n,
                            insert: !1
                        });
                    return d.copyAttributes(this, !0), d._matrix.prepend(this._matrix), d.rotate(r.subtract(f).getAngle() + 90), (t === q || t) && d.insertAbove(this), d
                }
                return null
            },
            toPath: "#clone",
            compare: function t(e) {
                if (!e || e instanceof D) return t.base.call(this, e);
                var i = this.getCurves(),
                    n = e.getCurves(),
                    r = i.length,
                    s = n.length;
                if (!r || !s) return r == s;
                for (var a, o, h = i[0].getValues(), u = [], l = 0, c = 0, f = 0; f < s; f++) {
                    var d = n[f].getValues();
                    if (u.push(d), v = $.getOverlaps(h, d)) {
                        a = !f && 0 < v[0][0] ? s - 1 : f, o = v[0][1];
                        break
                    }
                }
                var _, g = Math.abs;
                for (d = u[a]; h && d;) {
                    var v;
                    if (v = $.getOverlaps(h, d))
                        if (g(v[0][0] - c) < 1e-8) {
                            1 === (c = v[1][0]) && (h = ++l < r ? i[l].getValues() : null, c = 0);
                            var p = v[0][1];
                            if (g(p - o) < 1e-8) {
                                if (_ || (_ = [a, p]), 1 === (o = v[1][1]) && (++a >= s && (a = 0), d = u[a] || n[a].getValues(), o = 0), !h) return _[0] === a && _[1] === o;
                                continue
                            }
                        }
                    break
                }
                return !1
            },
            _hitTestSelf: function(n, r, t, s) {
                var a, o, h, u, e, i, l = this,
                    c = this.getStyle(),
                    f = this._segments,
                    d = f.length,
                    _ = this._closed,
                    g = r._tolerancePadding,
                    v = g,
                    p = r.stroke && c.hasStroke(),
                    m = r.fill && c.hasFill(),
                    y = r.curves,
                    w = p ? c.getStrokeWidth() / 2 : m && 0 < r.tolerance || y ? 0 : null;

                function x(t, e) {
                    return n.subtract(t).divide(e).length <= 1
                }

                function b(t, e, i) {
                    if (!r.selected || e.isSelected()) {
                        var n = t._point;
                        if (e !== n && (e = e.add(n)), x(e, v)) return new A(i, l, {
                            segment: t,
                            point: e
                        })
                    }
                }

                function S(t, e) {
                    return (e || r.segments) && b(t, t._point, "segment") || !e && r.handles && (b(t, t._handleIn, "handle-in") || b(t, t._handleOut, "handle-out"))
                }

                function C(t) {
                    u.add(t)
                }

                function P(t) {
                    var e, i = _ || 0 < t._index && t._index < d - 1;
                    return "round" === (i ? a : o) ? x(t._point, v) : (u = new F({
                        internal: !0,
                        closed: !0
                    }), i ? t.isSmooth() || F._addBevelJoin(t, a, w, h, null, s, C, !0) : "square" === o && F._addSquareCap(t, o, w, null, s, C, !0), u.isEmpty() ? void 0 : u.contains(n) || (e = u.getNearestLocation(n)) && x(e.getPoint(), g))
                }
                if (null !== w && (0 < w ? (a = c.getStrokeJoin(), o = c.getStrokeCap(), h = c.getMiterLimit(), v = v.add(F._getStrokePadding(w, s))) : a = o = "round"), !r.ends || r.segments || _) {
                    if (r.segments || r.handles)
                        for (var I = 0; I < d; I++)
                            if (i = S(f[I])) return i
                } else if (i = S(f[0], !0) || S(f[d - 1], !0)) return i;
                if (null !== w) {
                    if (e = this.getNearestLocation(n)) {
                        var M = e.getTime();
                        0 === M || 1 === M && 1 < d ? P(e.getSegment()) || (e = null) : x(e.getPoint(), v) || (e = null)
                    }
                    if (!e && "miter" === a && 1 < d)
                        for (I = 0; I < d; I++) {
                            var T = f[I];
                            if (n.getDistance(T._point) <= h * w && P(T)) {
                                e = T.getLocation();
                                break
                            }
                        }
                }
                return !e && m && this._contains(n) || e && !p && !y ? new A("fill", this) : e ? new A(p ? "stroke" : "curve", this, {
                    location: e,
                    point: e.getPoint()
                }) : null
            }
        }, V.each($._evaluateMethods, function(i) {
            this[i + "At"] = function(t) {
                var e = this.getLocationAt(t);
                return e && e[i]()
            }
        }, {
            beans: !1,
            getLocationOf: function() {
                for (var t = Z.read(arguments), e = this.getCurves(), i = 0, n = e.length; i < n; i++) {
                    var r = e[i].getLocationOf(t);
                    if (r) return r
                }
                return null
            },
            getOffsetOf: function() {
                var t = this.getLocationOf.apply(this, arguments);
                return t ? t.getOffset() : null
            },
            getLocationAt: function(t) {
                if ("number" == typeof t) {
                    for (var e = this.getCurves(), i = 0, n = 0, r = e.length; n < r; n++) {
                        var s = i,
                            a = e[n];
                        if (t < (i += a.getLength())) return a.getLocationAt(t - s)
                    }
                    if (0 < e.length && t <= this.getLength()) return new j(e[e.length - 1], 1)
                } else if (t && t.getPath && t.getPath() === this) return t;
                return null
            },
            getOffsetsWithTangent: function() {
                var t = Z.read(arguments);
                if (t.isZero()) return [];
                for (var e = [], i = 0, n = this.getCurves(), r = 0, s = n.length; r < s; r++) {
                    for (var a = n[r], o = a.getTimesWithTangent(t), h = 0, u = o.length; h < u; h++) {
                        var l = i + a.getOffsetAtTime(o[h]);
                        e.indexOf(l) < 0 && e.push(l)
                    }
                    i += a.length
                }
                return e
            }
        }), new function() {
            function p(n, t, r) {
                var s, a, o, h, u, l, c, f, e = t._segments,
                    i = e.length,
                    d = new Array(6),
                    _ = !0;

                function g(t) {
                    if (r) t._transformCoordinates(r, d), s = d[0], a = d[1];
                    else {
                        var e = t._point;
                        s = e._x, a = e._y
                    }
                    if (_) n.moveTo(s, a), _ = !1;
                    else {
                        if (r) u = d[2], l = d[3];
                        else {
                            var i = t._handleIn;
                            u = s + i._x, l = a + i._y
                        }
                        u === s && l === a && c === o && f === h ? n.lineTo(s, a) : n.bezierCurveTo(c, f, u, l, s, a)
                    }
                    if (o = s, h = a, r) c = d[4], f = d[5];
                    else {
                        i = t._handleOut;
                        c = o + i._x, f = h + i._y
                    }
                }
                for (var v = 0; v < i; v++) g(e[v]);
                t._closed && 0 < i && g(e[0])
            }
            return {
                _draw: function(t, e, i, n) {
                    var r = e.dontStart,
                        s = e.dontFinish || e.clip,
                        a = this.getStyle(),
                        o = a.hasFill(),
                        h = a.hasStroke(),
                        u = a.getDashArray(),
                        l = !st.support.nativeDash && h && u && u.length;

                    function c(t) {
                        return u[(t % l + l) % l]
                    }
                    if (r || t.beginPath(), (o || h && !l || s) && (p(t, this, n), this._closed && t.closePath()), !s && (o || h) && (this._setStyles(t, e, i), o && (t.fill(a.getFillRule()), t.shadowColor = "rgba(0,0,0,0)"), h)) {
                        if (l) {
                            r || t.beginPath();
                            var f, d = new m(this, .25, 32, !1, n),
                                _ = d.length,
                                g = -a.getDashOffset(),
                                v = 0;
                            for (g %= _; 0 < g;) g -= c(v--) + c(v--);
                            for (; g < _;) f = g + c(v++), (0 < g || 0 < f) && d.drawPart(t, Math.max(g, 0), Math.max(f, 0)), g = f + c(v++)
                        }
                        t.stroke()
                    }
                },
                _drawSelected: function(t, e) {
                    t.beginPath(), p(t, this, e), t.stroke(),
                        function(n, t, e, i) {
                            var r, s, a = i / 2,
                                o = new Array(6);

                            function h(t) {
                                var e = o[t],
                                    i = o[t + 1];
                                r == e && s == i || (n.beginPath(), n.moveTo(r, s), n.lineTo(e, i), n.stroke(), n.beginPath(), n.arc(e, i, a, 0, 2 * Math.PI, !0), n.fill())
                            }
                            for (var u = 0, l = t.length; u < l; u++) {
                                var c = t[u],
                                    f = c._selection;
                                if (c._transformCoordinates(e, o), r = o[0], s = o[1], 2 & f && h(2), 4 & f && h(4), n.fillRect(r - a, s - a, i, i), !(1 & f)) {
                                    var d = n.fillStyle;
                                    n.fillStyle = "#ffffff", n.fillRect(r - a + 1, s - a + 1, i - 2, i - 2), n.fillStyle = d
                                }
                            }
                        }(t, this._segments, e, st.settings.handleSize)
                }
            }
        }, new function() {
            function q(t) {
                var e = t._segments;
                if (!e.length) throw new Error("Use a moveTo() command first");
                return e[e.length - 1]
            }
            return {
                moveTo: function() {
                    var t = this._segments;
                    1 === t.length && this.removeSegment(0), t.length || this._add([new J(Z.read(arguments))])
                },
                moveBy: function() {
                    throw new Error("moveBy() is unsupported on Path items.")
                },
                lineTo: function() {
                    this._add([new J(Z.read(arguments))])
                },
                cubicCurveTo: function() {
                    var t = Z.read(arguments),
                        e = Z.read(arguments),
                        i = Z.read(arguments),
                        n = q(this);
                    n.setHandleOut(t.subtract(n._point)), this._add([new J(i, e.subtract(i))])
                },
                quadraticCurveTo: function() {
                    var t = Z.read(arguments),
                        e = Z.read(arguments),
                        i = q(this)._point;
                    this.cubicCurveTo(t.add(i.subtract(t).multiply(1 / 3)), t.add(e.subtract(t).multiply(1 / 3)), e)
                },
                curveTo: function() {
                    var t = Z.read(arguments),
                        e = Z.read(arguments),
                        i = V.pick(V.read(arguments), .5),
                        n = 1 - i,
                        r = q(this)._point,
                        s = t.subtract(r.multiply(n * n)).subtract(e.multiply(i * i)).divide(2 * i * n);
                    if (s.isNaN()) throw new Error("Cannot put a curve through points with parameter = " + i);
                    this.quadraticCurveTo(s, e)
                },
                arcTo: function() {
                    var t, e, i, n, r = Math.abs,
                        s = Math.sqrt,
                        a = q(this),
                        o = a._point,
                        h = Z.read(arguments),
                        u = V.peek(arguments);
                    if ("boolean" == typeof(_ = V.pick(u, !0))) var l = (v = o.add(h).divide(2)).add(v.subtract(o).rotate(_ ? -90 : 90));
                    else if (V.remain(arguments) <= 2) l = h, h = Z.read(arguments);
                    else {
                        var c = U.read(arguments),
                            f = H.isZero;
                        if (f(c.width) || f(c.height)) return this.lineTo(h);
                        var d = V.read(arguments),
                            _ = !!V.read(arguments),
                            g = !!V.read(arguments),
                            v = o.add(h).divide(2),
                            p = (F = o.subtract(v).rotate(-d)).x,
                            m = F.y,
                            y = r(c.width),
                            w = r(c.height),
                            x = y * y,
                            b = w * w,
                            S = p * p,
                            C = m * m,
                            P = s(S / x + C / b);
                        if (1 < P && (x = (y *= P) * y, b = (w *= P) * w), r(P = (x * b - x * C - b * S) / (x * C + b * S)) < 1e-12 && (P = 0), P < 0) throw new Error("Cannot create an arc with the given arguments");
                        t = new Z(y * m / w, -w * p / y).multiply((g === _ ? -1 : 1) * s(P)).rotate(d).add(v), e = (i = (n = (new W).translate(t).rotate(d).scale(y, w))._inverseTransform(o)).getDirectedAngle(n._inverseTransform(h)), !_ && 0 < e ? e -= 360 : _ && e < 0 && (e += 360)
                    }
                    if (l) {
                        var I = new G(o.add(l).divide(2), l.subtract(o).rotate(90), !0),
                            M = new G(l.add(h).divide(2), h.subtract(l).rotate(90), !0),
                            T = new G(o, h),
                            z = T.getSide(l);
                        if (!(t = I.intersect(M, !0))) {
                            if (!z) return this.lineTo(h);
                            throw new Error("Cannot create an arc with the given arguments")
                        }
                        e = (i = o.subtract(t)).getDirectedAngle(h.subtract(t));
                        var k = T.getSide(t, !0);
                        0 === k ? e = z * r(e) : z === k && (e += e < 0 ? 360 : -360)
                    }
                    for (var O = r(e), A = 360 <= O ? 4 : Math.ceil((O - 1e-7) / 90), L = e / A, N = L * Math.PI / 360, B = 4 / 3 * Math.sin(N) / (1 + Math.cos(N)), E = [], j = 0; j <= A; j++) {
                        var F = h,
                            D = null;
                        if (j < A && (D = i.rotate(90).multiply(B), n ? (F = n._transformPoint(i), D = n._transformPoint(i.add(D)).subtract(F)) : F = t.add(i)), j) {
                            var R = i.rotate(-90).multiply(B);
                            n && (R = n._transformPoint(i.add(R)).subtract(F)), E.push(new J(F, R, D))
                        } else a.setHandleOut(D);
                        i = i.rotate(L)
                    }
                    this._add(E)
                },
                lineBy: function() {
                    var t = Z.read(arguments),
                        e = q(this)._point;
                    this.lineTo(e.add(t))
                },
                curveBy: function() {
                    var t = Z.read(arguments),
                        e = Z.read(arguments),
                        i = V.read(arguments),
                        n = q(this)._point;
                    this.curveTo(n.add(t), n.add(e), i)
                },
                cubicCurveBy: function() {
                    var t = Z.read(arguments),
                        e = Z.read(arguments),
                        i = Z.read(arguments),
                        n = q(this)._point;
                    this.cubicCurveTo(n.add(t), n.add(e), n.add(i))
                },
                quadraticCurveBy: function() {
                    var t = Z.read(arguments),
                        e = Z.read(arguments),
                        i = q(this)._point;
                    this.quadraticCurveTo(i.add(t), i.add(e))
                },
                arcBy: function() {
                    var t = q(this)._point,
                        e = t.add(Z.read(arguments)),
                        i = V.pick(V.peek(arguments), !0);
                    "boolean" == typeof i ? this.arcTo(e, i) : this.arcTo(e, t.add(Z.read(arguments)))
                },
                closePath: function(t) {
                    this.setClosed(!0), this.join(this, t)
                }
            }
        }, {
            _getBounds: function(t, e) {
                var i = e.handle ? "getHandleBounds" : e.stroke ? "getStrokeBounds" : "getBounds";
                return F[i](this._segments, this._closed, this, t, e)
            },
            statics: {
                getBounds: function(t, e, i, n, r, s) {
                    var a = t[0];
                    if (!a) return new T;
                    var o = new Array(6),
                        h = a._transformCoordinates(n, new Array(6)),
                        u = h.slice(0, 2),
                        l = u.slice(),
                        c = new Array(2);

                    function f(t) {
                        t._transformCoordinates(n, o);
                        for (var e = 0; e < 2; e++) $._addBounds(h[e], h[e + 4], o[e + 2], o[e], e, s ? s[e] : 0, u, l, c);
                        var i = h;
                        h = o, o = i
                    }
                    for (var d = 1, _ = t.length; d < _; d++) f(t[d]);
                    return e && f(a), new T(u[0], u[1], l[0] - u[0], l[1] - u[1])
                },
                getStrokeBounds: function(t, e, i, n, r) {
                    var s = i.getStyle(),
                        a = s.hasStroke(),
                        o = s.getStrokeWidth(),
                        h = a && i._getStrokeMatrix(n, r),
                        u = a && F._getStrokePadding(o, h),
                        l = F.getBounds(t, e, i, n, r, u);
                    if (!a) return l;
                    var c = o / 2,
                        f = s.getStrokeJoin(),
                        d = s.getStrokeCap(),
                        _ = s.getMiterLimit(),
                        g = new T(new U(u));

                    function v(t) {
                        l = l.include(t)
                    }

                    function p(t) {
                        l = l.unite(g.setCenter(t._point.transform(n)))
                    }

                    function m(t, e) {
                        "round" === e || t.isSmooth() ? p(t) : F._addBevelJoin(t, e, c, _, n, h, v)
                    }

                    function y(t, e) {
                        "round" === e ? p(t) : F._addSquareCap(t, e, c, n, h, v)
                    }
                    for (var w = t.length - (e ? 0 : 1), x = 1; x < w; x++) m(t[x], f);
                    return e ? m(t[0], f) : 0 < w && (y(t[0], d), y(t[t.length - 1], d)), l
                },
                _getStrokePadding: function(t, e) {
                    if (!e) return [t, t];
                    var i = new Z(t, 0).transform(e),
                        n = new Z(0, t).transform(e),
                        r = i.getAngleInRadians(),
                        s = i.getLength(),
                        a = n.getLength(),
                        o = Math.sin(r),
                        h = Math.cos(r),
                        u = Math.tan(r),
                        l = Math.atan2(a * u, s),
                        c = Math.atan2(a, u * s);
                    return [Math.abs(s * Math.cos(l) * h + a * Math.sin(l) * o), Math.abs(a * Math.sin(c) * h + s * Math.cos(c) * o)]
                },
                _addBevelJoin: function(t, e, i, n, r, s, a, o) {
                    var h = t.getCurve(),
                        u = h.getPrevious(),
                        l = h.getPoint1().transform(r),
                        c = u.getNormalAtTime(1).multiply(i).transform(s),
                        f = h.getNormalAtTime(0).multiply(i).transform(s);
                    if (c.getDirectedAngle(f) < 0 && (c = c.negate(), f = f.negate()), o && a(l), a(l.add(c)), "miter" === e) {
                        var d = new G(l.add(c), new Z(-c.y, c.x), !0).intersect(new G(l.add(f), new Z(-f.y, f.x), !0), !0);
                        d && l.getDistance(d) <= n * i && a(d)
                    }
                    a(l.add(f))
                },
                _addSquareCap: function(t, e, i, n, r, s, a) {
                    var o = t._point.transform(n),
                        h = t.getLocation(),
                        u = h.getNormal().multiply(0 === h.getTime() ? i : -i).transform(r);
                    "square" === e && (a && (s(o.subtract(u)), s(o.add(u))), o = o.add(u.rotate(-90))), s(o.add(u)), s(o.subtract(u))
                },
                getHandleBounds: function(t, e, i, n, r) {
                    var s, a, o = i.getStyle();
                    if (r.stroke && o.hasStroke()) {
                        var h = i._getStrokeMatrix(n, r),
                            u = o.getStrokeWidth() / 2,
                            l = u;
                        "miter" === o.getStrokeJoin() && (l = u * o.getMiterLimit()), "square" === o.getStrokeCap() && (l = Math.max(l, u * Math.SQRT2)), s = F._getStrokePadding(u, h), a = F._getStrokePadding(l, h)
                    }
                    for (var c = new Array(6), f = 1 / 0, d = -f, _ = f, g = d, v = 0, p = t.length; v < p; v++) {
                        t[v]._transformCoordinates(n, c);
                        for (var m = 0; m < 6; m += 2) {
                            var y = m ? s : a,
                                w = y ? y[0] : 0,
                                x = y ? y[1] : 0,
                                b = c[m],
                                S = c[m + 1],
                                C = b - w,
                                P = b + w,
                                I = S - x,
                                M = S + x;
                            C < f && (f = C), d < P && (d = P), I < _ && (_ = I), g < M && (g = M)
                        }
                    }
                    return new T(f, _, d - f, g - _)
                }
            }
        });
    F.inject({
        statics: new function() {
            var c = .5522847498307936,
                a = [new J([-1, 0], [0, c], [0, -c]), new J([0, -1], [-c, 0], [c, 0]), new J([1, 0], [0, -c], [0, c]), new J([0, 1], [c, 0], [-c, 0])];

            function f(t, e, i) {
                var n = V.getNamed(i),
                    r = new F(n && 0 == n.insert && O.NO_INSERT);
                return r._add(t), r._closed = e, r.set(n, {
                    insert: !0
                })
            }

            function i(t, e, i) {
                for (var n = new Array(4), r = 0; r < 4; r++) {
                    var s = a[r];
                    n[r] = new J(s._point.multiply(e).add(t), s._handleIn.multiply(e), s._handleOut.multiply(e))
                }
                return f(n, !0, i)
            }
            return {
                Line: function() {
                    return f([new J(Z.readNamed(arguments, "from")), new J(Z.readNamed(arguments, "to"))], !1, arguments)
                },
                Circle: function() {
                    var t = Z.readNamed(arguments, "center"),
                        e = V.readNamed(arguments, "radius");
                    return i(t, new U(e), arguments)
                },
                Rectangle: function() {
                    var t, e = T.readNamed(arguments, "rectangle"),
                        i = U.readNamed(arguments, "radius", 0, {
                            readNull: !0
                        }),
                        n = e.getBottomLeft(!0),
                        r = e.getTopLeft(!0),
                        s = e.getTopRight(!0),
                        a = e.getBottomRight(!0);
                    if (!i || i.isZero()) t = [new J(n), new J(r), new J(s), new J(a)];
                    else {
                        var o = (i = U.min(i, e.getSize(!0).divide(2))).width,
                            h = i.height,
                            u = o * c,
                            l = h * c;
                        t = [new J(n.add(o, 0), null, [-u, 0]), new J(n.subtract(0, h), [0, l]), new J(r.add(0, h), null, [0, -l]), new J(r.add(o, 0), [-u, 0], null), new J(s.subtract(o, 0), null, [u, 0]), new J(s.add(0, h), [0, -l], null), new J(a.subtract(0, h), null, [0, l]), new J(a.subtract(o, 0), [u, 0])]
                    }
                    return f(t, !0, arguments)
                },
                RoundRectangle: "#Rectangle",
                Ellipse: function() {
                    var t = P._readEllipse(arguments);
                    return i(t.center, t.radius, arguments)
                },
                Oval: "#Ellipse",
                Arc: function() {
                    var t = Z.readNamed(arguments, "from"),
                        e = Z.readNamed(arguments, "through"),
                        i = Z.readNamed(arguments, "to"),
                        n = V.getNamed(arguments),
                        r = new F(n && 0 == n.insert && O.NO_INSERT);
                    return r.moveTo(t), r.arcTo(e, i), r.set(n)
                },
                RegularPolygon: function() {
                    for (var t = Z.readNamed(arguments, "center"), e = V.readNamed(arguments, "sides"), i = V.readNamed(arguments, "radius"), n = 360 / e, r = e % 3 == 0, s = new Z(0, r ? -i : i), a = r ? -1 : .5, o = new Array(e), h = 0; h < e; h++) o[h] = new J(t.add(s.rotate((h + a) * n)));
                    return f(o, !0, arguments)
                },
                Star: function() {
                    for (var t = Z.readNamed(arguments, "center"), e = 2 * V.readNamed(arguments, "points"), i = V.readNamed(arguments, "radius1"), n = V.readNamed(arguments, "radius2"), r = 360 / e, s = new Z(0, -1), a = new Array(e), o = 0; o < e; o++) a[o] = new J(t.add(s.rotate(r * o).multiply(o % 2 ? n : i)));
                    return f(a, !0, arguments)
                }
            }
        }
    });
    var D = L.extend({
        _class: "CompoundPath",
        _serializeFields: {
            children: []
        },
        beans: !0,
        initialize: function(t) {
            this._children = [], this._namedChildren = {}, this._initialize(t) || ("string" == typeof t ? this.setPathData(t) : this.addChildren(Array.isArray(t) ? t : arguments))
        },
        insertChildren: function t(e, i) {
            var n = i,
                r = n[0];
            r && "number" == typeof r[0] && (n = [n]);
            for (var s = i.length - 1; 0 <= s; s--) {
                var a = n[s];
                n !== i || a instanceof F || (n = V.slice(n)), Array.isArray(a) ? n[s] = new F({
                    segments: a,
                    insert: !1
                }) : a instanceof D && (n.splice.apply(n, [s, 1].concat(a.removeChildren())), a.remove())
            }
            return t.base.call(this, e, n)
        },
        reduce: function t(e) {
            for (var i = this._children, n = i.length - 1; 0 <= n; n--) {
                (r = i[n].reduce(e)).isEmpty() && r.remove()
            }
            return i.length ? t.base.call(this) : ((r = new F(O.NO_INSERT)).copyAttributes(this), r.insertAbove(this), this.remove(), r);
            var r
        },
        isClosed: function() {
            for (var t = this._children, e = 0, i = t.length; e < i; e++)
                if (!t[e]._closed) return !1;
            return !0
        },
        setClosed: function(t) {
            for (var e = this._children, i = 0, n = e.length; i < n; i++) e[i].setClosed(t)
        },
        getFirstSegment: function() {
            var t = this.getFirstChild();
            return t && t.getFirstSegment()
        },
        getLastSegment: function() {
            var t = this.getLastChild();
            return t && t.getLastSegment()
        },
        getCurves: function() {
            for (var t = this._children, e = [], i = 0, n = t.length; i < n; i++) V.push(e, t[i].getCurves());
            return e
        },
        getFirstCurve: function() {
            var t = this.getFirstChild();
            return t && t.getFirstCurve()
        },
        getLastCurve: function() {
            var t = this.getLastChild();
            return t && t.getLastCurve()
        },
        getArea: function() {
            for (var t = this._children, e = 0, i = 0, n = t.length; i < n; i++) e += t[i].getArea();
            return e
        },
        getLength: function() {
            for (var t = this._children, e = 0, i = 0, n = t.length; i < n; i++) e += t[i].getLength();
            return e
        },
        getPathData: function(t, e) {
            for (var i = this._children, n = [], r = 0, s = i.length; r < s; r++) {
                var a = i[r],
                    o = a._matrix;
                n.push(a.getPathData(t && !o.isIdentity() ? t.appended(o) : t, e))
            }
            return n.join("")
        },
        _hitTestChildren: function t(e, i, n) {
            return t.base.call(this, e, i.class === F || "path" === i.type ? i : V.set({}, i, {
                fill: !1
            }), n)
        },
        _draw: function(t, e, i, n) {
            var r = this._children;
            if (r.length) {
                e = e.extend({
                    dontStart: !0,
                    dontFinish: !0
                }), t.beginPath();
                for (var s = 0, a = r.length; s < a; s++) r[s].draw(t, e, n);
                if (!e.clip) {
                    this._setStyles(t, e, i);
                    var o = this._style;
                    o.hasFill() && (t.fill(o.getFillRule()), t.shadowColor = "rgba(0,0,0,0)"), o.hasStroke() && t.stroke()
                }
            }
        },
        _drawSelected: function(t, e, i) {
            for (var n = this._children, r = 0, s = n.length; r < s; r++) {
                var a = n[r],
                    o = a._matrix;
                i[a._id] || a._drawSelected(t, o.isIdentity() ? e : e.appended(o))
            }
        }
    }, new function() {
        function n(t, e) {
            var i = t._children;
            if (e && !i.length) throw new Error("Use a moveTo() command first");
            return i[i.length - 1]
        }
        return V.each(["lineTo", "cubicCurveTo", "quadraticCurveTo", "curveTo", "arcTo", "lineBy", "cubicCurveBy", "quadraticCurveBy", "curveBy", "arcBy"], function(e) {
            this[e] = function() {
                var t = n(this, !0);
                t[e].apply(t, arguments)
            }
        }, {
            moveTo: function() {
                var t = n(this),
                    e = t && t.isEmpty() ? t : new F(O.NO_INSERT);
                e !== t && this.addChild(e), e.moveTo.apply(e, arguments)
            },
            moveBy: function() {
                var t = n(this, !0),
                    e = t && t.getLastSegment(),
                    i = Z.read(arguments);
                this.moveTo(e ? i.add(e._point) : i)
            },
            closePath: function(t) {
                n(this, !0).closePath(t)
            }
        })
    }, V.each(["reverse", "flatten", "simplify", "smooth"], function(s) {
        this[s] = function(t) {
            for (var e, i = this._children, n = 0, r = i.length; n < r; n++) e = i[n][s](t) || e;
            return e
        }
    }, {}));
    L.inject(new function() {
        var L = Math.min,
            N = Math.max,
            B = Math.abs,
            m = {
                unite: {
                    1: !0,
                    2: !0
                },
                intersect: {
                    2: !0
                },
                subtract: {
                    1: !0
                },
                exclude: {
                    1: !0,
                    "-1": !0
                }
            };

        function y(t, e) {
            var i = t.clone(!1).reduce({
                simplify: !0
            }).transform(null, !0, !0);
            return e ? i.resolveCrossings().reorient("nonzero" === i.getFillRule(), !0) : i
        }

        function w(t, e, i, n, r) {
            var s = new D(O.NO_INSERT);
            return s.addChildren(t, !0), s = s.reduce({
                simplify: e
            }), r && 0 == r.insert || s.insertAbove(n && i.isSibling(n) && i.getIndex() < n.getIndex() ? n : i), s.copyAttributes(i, !0), s
        }

        function i(t, e, i, n) {
            if (n && (0 == n.trace || n.stroke) && /^(subtract|intersect)$/.test(i)) return x(t, e, i);
            var r = y(t, !0),
                s = e && t !== e && y(e, !0),
                a = m[i];
            a[i] = !0, s && (a.subtract || a.exclude) ^ s.isClockwise() ^ r.isClockwise() && s.reverse();
            var o, h = S(j.expand(r.getCrossings(s))),
                u = r._children || [r],
                l = s && (s._children || [s]),
                c = [],
                f = [];

            function d(t) {
                for (var e = 0, i = t.length; e < i; e++) {
                    var n = t[e];
                    V.push(c, n._segments), V.push(f, n.getCurves()), n._overlapsOnly = !0
                }
            }
            if (h.length) {
                d(u), l && d(l);
                for (var _ = 0, g = h.length; _ < g; _++) I(h[_]._segment, r, s, f, a);
                for (_ = 0, g = c.length; _ < g; _++) {
                    var v = c[_],
                        p = v._intersection;
                    v._winding || I(v, r, s, f, a), p && p._overlap || (v._path._overlapsOnly = !1)
                }
                o = M(c, a)
            } else o = b(l ? u.concat(l) : u.slice(), function(t) {
                return !!a[t]
            });
            return w(o, !0, t, e, n)
        }

        function x(t, e, i) {
            var n = y(t),
                r = y(e),
                s = n.getCrossings(r),
                a = "subtract" === i,
                o = "divide" === i,
                h = {},
                u = [];

            function l(t) {
                if (!h[t._id] && (o || r.contains(t.getPointAt(t.getLength() / 2)) ^ a)) return u.unshift(t), h[t._id] = !0
            }
            for (var c = s.length - 1; 0 <= c; c--) {
                var f = s[c].split();
                f && (l(f) && f.getFirstSegment().setHandleIn(0, 0), n.getLastSegment().setHandleOut(0, 0))
            }
            return l(n), w(u, !1, t, e)
        }

        function C(t, e) {
            for (var i = t; i;) {
                if (i === e) return;
                i = i._previous
            }
            for (; t._next && t._next !== e;) t = t._next;
            if (!t._next) {
                for (; e._previous;) e = e._previous;
                (t._next = e)._previous = t
            }
        }

        function P(t) {
            for (var e = t.length - 1; 0 <= e; e--) t[e].clearHandles()
        }

        function b(t, e, i) {
            var n = t && t.length;
            if (n) {
                var r = V.each(t, function(t, e) {
                        this[t._id] = {
                            container: null,
                            winding: t.isClockwise() ? 1 : -1,
                            index: e
                        }
                    }, {}),
                    s = t.slice().sort(function(t, e) {
                        return B(e.getArea()) - B(t.getArea())
                    }),
                    a = s[0];
                null == i && (i = a.isClockwise());
                for (var o = 0; o < n; o++) {
                    for (var h = s[o], u = r[h._id], l = h.getInteriorPoint(), c = 0, f = o - 1; 0 <= f; f--) {
                        var d = s[f];
                        if (d.contains(l)) {
                            var _ = r[d._id];
                            c = _.winding, u.winding += c, u.container = _.exclude ? _.container : d;
                            break
                        }
                    }
                    if (e(u.winding) === e(c)) u.exclude = !0, t[u.index] = null;
                    else {
                        var g = u.container;
                        h.setClockwise(g ? !g.isClockwise() : i)
                    }
                }
            }
            return t
        }

        function S(t, e, i) {
            var n, r, s, a = e && [],
                o = !1,
                h = i || [],
                u = i && {};

            function l(t) {
                return t._path._id + "." + t._segment1._index
            }
            for (var c = (i && i.length) - 1; 0 <= c; c--) {
                (f = i[c])._path && (u[l(f)] = !0)
            }
            for (c = t.length - 1; 0 <= c; c--) {
                var f, d, _ = t[c],
                    g = _._time,
                    v = g,
                    p = e && !e(_);
                if ((f = _._curve) && (f !== r ? (o = !f.hasHandles() || u && u[l(f)], n = [], s = null, r = f) : 1e-8 <= s && (g /= s)), p) n && n.push(_);
                else {
                    if (e && a.unshift(_), s = v, g < 1e-8) d = f._segment1;
                    else if (1 - 1e-8 < g) d = f._segment2;
                    else {
                        var m = f.divideAtTime(g, !0);
                        o && h.push(f, m), d = m._segment1;
                        for (var y = n.length - 1; 0 <= y; y--) {
                            var w = n[y];
                            w._time = (w._time - g) / (1 - g)
                        }
                    }
                    _._setSegment(d);
                    var x = d._intersection,
                        b = _._intersection;
                    if (x) {
                        C(x, b);
                        for (var S = x; S;) C(S._intersection, x), S = S._next
                    } else d._intersection = b
                }
            }
            return i || P(h), a || t
        }

        function E(f, d, _, g, v) {
            var p, t, m = _ ? 1 : 0,
                y = 1 ^ m,
                e = [f.x, f.y],
                w = e[m],
                x = e[y],
                b = 1e-6,
                S = w - 1e-9,
                C = w + 1e-9,
                i = 0,
                n = 0,
                P = 0,
                I = 0,
                M = !1,
                r = !1,
                T = 1,
                z = [];

            function k(t) {
                var e = t[y + 0],
                    i = t[y + 6];
                if (!(x < L(e, i) || x > N(e, i))) {
                    var n = t[m + 0],
                        r = t[m + 2],
                        s = t[m + 4],
                        a = t[m + 6];
                    if (e !== i) {
                        var o = x === e ? 0 : x === i ? 1 : S > N(n, r, s, a) || C < L(n, r, s, a) ? 1 : 0 < $.solveCubic(t, y, x, z, 0, 1) ? z[0] : 1,
                            h = 0 === o ? n : 1 === o ? a : $.getPoint(t, o)[_ ? "y" : "x"],
                            u = i < e ? 1 : -1,
                            l = p[y] > p[y + 6] ? 1 : -1,
                            c = p[m + 6];
                        return x !== e ? (h < S ? P += u : C < h ? I += u : M = !0, w - b < h && h < w + b && (T /= 2)) : (u !== l ? n < S ? P += u : C < n && (I += u) : n != c && (c < C && C < h ? (I += u, M = !0) : S < c && h < S && (P += u, M = !0)), T = 0), p = t, !v && S < h && h < C && 0 === $.getTangent(t, o)[_ ? "x" : "y"] && E(f, d, !_, g, !0)
                    }(n < C && S < a || a < C && S < n) && (M = !0)
                }
            }

            function s(t) {
                var e = t[y + 0],
                    i = t[y + 2],
                    n = t[y + 4],
                    r = t[y + 6];
                if (x <= N(e, i, n, r) && x >= L(e, i, n, r))
                    for (var s, a = t[m + 0], o = t[m + 2], h = t[m + 4], u = t[m + 6], l = S > N(a, o, h, u) || C < L(a, o, h, u) ? [t] : $.getMonoCurves(t, _), c = 0, f = l.length; c < f; c++)
                        if (s = k(l[c])) return s
            }
            for (var a = 0, o = d.length; a < o; a++) {
                var h, u = d[a],
                    l = u._path,
                    c = u.getValues();
                if (!(a && d[a - 1]._path === l || (p = null, l._closed || (t = $.getValues(l.getLastCurve().getSegment2(), u.getSegment1(), null, !g))[y] !== t[y + 6] && (p = t), p))) {
                    p = c;
                    for (var O = l.getLastCurve(); O && O !== u;) {
                        var A = O.getValues();
                        if (A[y] !== A[y + 6]) {
                            p = A;
                            break
                        }
                        O = O.getPrevious()
                    }
                }
                if (h = s(c)) return h;
                if (a + 1 === o || d[a + 1]._path !== l) {
                    if (t && (h = s(t))) return h;
                    !M || P || I || (P = I = l.isClockwise(g) ^ _ ? 1 : -1), i += P, n += I, P = I = 0, M && (M = !(r = !0)), t = null
                }
            }
            return i = B(i), n = B(n), {
                winding: N(i, n),
                windingL: i,
                windingR: n,
                quality: T,
                onPath: r
            }
        }

        function I(t, e, i, n, r) {
            var s = [],
                a = t,
                o = 0;
            do {
                var h = (v = t.getCurve()).getLength();
                s.push({
                    segment: t,
                    curve: v,
                    length: h
                }), o += h, t = t.getNext()
            } while (t && !t._intersection && t !== a);
            for (var u = [.5, .25, .75], l = {
                    winding: 0,
                    quality: -1
                }, c = 0; c < u.length && l.quality < .5; c++) {
                h = o * u[c];
                for (var f = 0, d = s.length; f < d; f++) {
                    var _ = s[f],
                        g = _.length;
                    if (h <= g) {
                        var v, p = (v = _.curve)._path,
                            m = p._parent,
                            y = m instanceof D ? m : p,
                            w = H.clamp(v.getTimeAt(h), 1e-8, 1 - 1e-8),
                            x = v.getPointAtTime(w),
                            b = B(v.getTangentAtTime(w).y) < Math.SQRT1_2,
                            S = null;
                        if (r.subtract && i) {
                            var C = y === e ? i._getWinding(x, b, !0) : e._getWinding(x, b, !0);
                            if (y === e && C.winding || y === i && !C.winding) {
                                if (C.quality < 1) continue;
                                S = {
                                    winding: 0,
                                    quality: 1
                                }
                            }
                        }(S = S || E(x, n, b, !0)).quality > l.quality && (l = S);
                        break
                    }
                    h -= g
                }
            }
            for (f = s.length - 1; 0 <= f; f--) s[f].segment._winding = l
        }

        function M(t, i) {
            var u, e = [];

            function l(t) {
                var e;
                return !(!t || t._visited || i && (!i[(e = t._winding || {}).winding] || i.unite && 2 === e.winding && e.windingL && e.windingR))
            }

            function c(t) {
                if (t)
                    for (var e = 0, i = u.length; e < i; e++)
                        if (t === u[e]) return !0;
                return !1
            }

            function n(t) {
                for (var e = t._segments, i = 0, n = e.length; i < n; i++) e[i]._visited = !0
            }

            function r(a, o) {
                var t = a._intersection,
                    e = t,
                    h = [];

                function i(t, e) {
                    for (; t && t !== e;) {
                        var i = t._segment,
                            n = i && i._path;
                        if (n) {
                            var r = i.getNext() || n.getFirstSegment(),
                                s = r._intersection;
                            i !== a && (c(i) || c(r) || r && l(i) && (l(r) || s && l(s._segment))) && h.push(i), o && u.push(i)
                        }
                        t = t._next
                    }
                }
                if (o && (u = [a]), t) {
                    for (i(t); t && t._prev;) t = t._prev;
                    i(t, e)
                }
                return h
            }
            t.sort(function(t, e) {
                var i = t._intersection,
                    n = e._intersection,
                    r = !(!i || !i._overlap),
                    s = !(!n || !n._overlap),
                    a = t._path,
                    o = e._path;
                return r ^ s ? r ? 1 : -1 : !i ^ !n ? i ? 1 : -1 : a !== o ? a._id - o._id : t._index - e._index
            });
            for (var s = 0, a = t.length; s < a; s++) {
                var o, h, f, d = t[s],
                    _ = l(d),
                    g = null,
                    v = !1,
                    p = !0,
                    m = [];
                if (_ && d._path._overlapsOnly) {
                    var y = d._path,
                        w = d._intersection._segment._path;
                    y.compare(w) && (y.getArea() && e.push(y.clone(!1)), n(y), n(w), _ = !1)
                }
                for (; _;) {
                    var x = !g,
                        b = r(d, x),
                        S = b.shift(),
                        C = !(v = !x && (c(d) || c(S))) && S;
                    if (x && (g = new F(O.NO_INSERT), o = null), v) {
                        (d.isFirst() || d.isLast()) && (p = d._path._closed), d._visited = !0;
                        break
                    }
                    if (C && o && (m.push(o), o = null), o || (C && b.push(d), o = {
                            start: g._segments.length,
                            crossings: b,
                            visited: h = [],
                            handleIn: f
                        }), C && (d = S), !l(d)) {
                        g.removeSegments(o.start);
                        for (var P = 0, I = h.length; P < I; P++) h[P]._visited = !1;
                        for (h.length = 0;
                            (d = o && o.crossings.shift()) && d._path || (d = null, (o = m.pop()) && (h = o.visited, f = o.handleIn)), o && !l(d););
                        if (!d) break
                    }
                    var M = d.getNext();
                    g.add(new J(d._point, f, M && d._handleOut)), d._visited = !0, h.push(d), d = M || d._path.getFirstSegment(), f = M && M._handleIn
                }
                v && (p && (g.getFirstSegment().setHandleIn(f), g.setClosed(p)), 0 !== g.getArea() && e.push(g))
            }
            return e
        }
        return {
            _getWinding: function(t, e, i) {
                return E(t, this.getCurves(), e, i)
            },
            unite: function(t, e) {
                return i(this, t, "unite", e)
            },
            intersect: function(t, e) {
                return i(this, t, "intersect", e)
            },
            subtract: function(t, e) {
                return i(this, t, "subtract", e)
            },
            exclude: function(t, e) {
                return i(this, t, "exclude", e)
            },
            divide: function(t, e) {
                return e && (0 == e.trace || e.stroke) ? x(this, t, "divide") : w([this.subtract(t, e), this.intersect(t, e)], !0, this, t, e)
            },
            resolveCrossings: function() {
                var t = this._children,
                    e = t || [this];

                function i(t, e) {
                    var i = t && t._intersection;
                    return i && i._overlap && i._path === e
                }
                var n = !1,
                    r = !1,
                    s = this.getIntersections(null, function(t) {
                        return t.hasOverlap() && (n = !0) || t.isCrossing() && (r = !0)
                    }),
                    a = n && r && [];
                if (s = j.expand(s), n)
                    for (var o = S(s, function(t) {
                            return t.hasOverlap()
                        }, a), h = o.length - 1; 0 <= h; h--) {
                        var u = o[h],
                            l = u._path,
                            c = u._segment,
                            f = c.getPrevious(),
                            d = c.getNext();
                        i(f, l) && i(d, l) && (c.remove(), f._handleOut._set(0, 0), d._handleIn._set(0, 0), f === c || f.getCurve().hasLength() || (d._handleIn.set(f._handleIn), f.remove()))
                    }
                r && (S(s, n && function(t) {
                    var e = t.getCurve(),
                        i = t.getSegment(),
                        n = t._intersection,
                        r = n._curve,
                        s = n._segment;
                    if (e && r && e._path && r._path) return !0;
                    i && (i._intersection = null), s && (s._intersection = null)
                }, a), a && P(a), e = M(V.each(e, function(t) {
                    V.push(this, t._segments)
                }, [])));
                var _, g = e.length;
                return 1 < g && t ? (e !== t && this.setChildren(e), _ = this) : 1 !== g || t || (e[0] !== this && this.setSegments(e[0].removeSegments()), _ = this), _ || ((_ = new D(O.NO_INSERT)).addChildren(e), (_ = _.reduce()).copyAttributes(this), this.replaceWith(_)), _
            },
            reorient: function(e, t) {
                var i = this._children;
                return i && i.length ? this.setChildren(b(this.removeChildren(), function(t) {
                    return !!(e ? t : 1 & t)
                }, t)) : t !== q && this.setClockwise(t), this
            },
            getInteriorPoint: function() {
                var t = this.getBounds().getCenter(!0);
                if (!this.contains(t)) {
                    for (var e = this.getCurves(), i = t.y, n = [], r = [], s = 0, a = e.length; s < a; s++) {
                        var o = e[s].getValues(),
                            h = o[1],
                            u = o[3],
                            l = o[5],
                            c = o[7];
                        if (i >= L(h, u, l, c) && i <= N(h, u, l, c))
                            for (var f = $.getMonoCurves(o), d = 0, _ = f.length; d < _; d++) {
                                var g = f[d],
                                    v = g[1],
                                    p = g[7];
                                if (v !== p && (v <= i && i <= p || p <= i && i <= v)) {
                                    var m = i === v ? g[0] : i === p ? g[6] : 1 === $.solveCubic(g, 1, i, r, 0, 1) ? $.getPoint(g, r[0]).x : (g[0] + g[6]) / 2;
                                    n.push(m)
                                }
                            }
                    }
                    1 < n.length && (n.sort(function(t, e) {
                        return t - e
                    }), t.x = (n[0] + n[1]) / 2)
                }
                return t
            }
        }
    });
    var m = V.extend({
            _class: "PathFlattener",
            initialize: function(t, l, e, c, n) {
                var i, r = [],
                    f = [],
                    d = 0,
                    _ = 1 / (e || 32),
                    s = t._segments,
                    a = s[0];

                function o(t, e) {
                    var i = $.getValues(t, e, n);
                    r.push(i),
                        function t(e, i, n, r) {
                            if (!(_ < r - n) || c && $.isStraight(e) || $.isFlatEnough(e, l || .25)) {
                                var s = e[6] - e[0],
                                    a = e[7] - e[1],
                                    o = Math.sqrt(s * s + a * a);
                                0 < o && (d += o, f.push({
                                    offset: d,
                                    curve: e,
                                    index: i,
                                    time: r
                                }))
                            } else {
                                var h = $.subdivide(e, .5),
                                    u = (n + r) / 2;
                                t(h[0], i, n, u), t(h[1], i, u, r)
                            }
                        }(i, t._index, 0, 1)
                }
                for (var h = 1, u = s.length; h < u; h++) o(a, i = s[h]), a = i;
                t._closed && o(i || a, s[0]), this.curves = r, this.parts = f, this.length = d, this.index = 0
            },
            _get: function(t) {
                for (var e, i = this.parts, n = i.length, r = this.index;
                    (e = r) && !(i[--r].offset < t););
                for (; e < n; e++) {
                    var s = i[e];
                    if (s.offset >= t) {
                        var a = i[(this.index = e) - 1],
                            o = a && a.index === s.index ? a.time : 0,
                            h = a ? a.offset : 0;
                        return {
                            index: s.index,
                            time: o + (s.time - o) * (t - h) / (s.offset - h)
                        }
                    }
                }
                return {
                    index: i[n - 1].index,
                    time: 1
                }
            },
            drawPart: function(t, e, i) {
                for (var n = this._get(e), r = this._get(i), s = n.index, a = r.index; s <= a; s++) {
                    var o = $.getPart(this.curves[s], s === n.index ? n.time : 0, s === r.index ? r.time : 1);
                    s === n.index && t.moveTo(o[0], o[1]), t.bezierCurveTo.apply(t, o.slice(2))
                }
            }
        }, V.each($._evaluateMethods, function(i) {
            this[i + "At"] = function(t) {
                var e = this._get(t);
                return $[i](this.curves[e.index], e.time)
            }
        }, {})),
        n = V.extend({
            initialize: function(t) {
                for (var e, i = this.points = [], n = t._segments, r = t._closed, s = 0, a = n.length; s < a; s++) {
                    var o = n[s].point;
                    e && e.equals(o) || i.push(e = o.clone())
                }
                r && (i.unshift(i[i.length - 1]), i.push(i[1])), this.closed = r
            },
            fit: function(t) {
                var e = this.points,
                    i = e.length,
                    n = null;
                return 0 < i && (n = [new J(e[0])], 1 < i && (this.fitCubic(n, t, 0, i - 1, e[1].subtract(e[0]), e[i - 2].subtract(e[i - 1])), this.closed && (n.shift(), n.pop()))), n
            },
            fitCubic: function(t, e, i, n, r, s) {
                var a = this.points;
                if (n - i != 1) {
                    for (var o, h = this.chordLengthParameterize(i, n), u = Math.max(e, e * e), l = !0, c = 0; c <= 4; c++) {
                        var f = this.generateBezier(i, n, h, r, s),
                            d = this.findMaxError(i, n, f, h);
                        if (d.error < e && l) return void this.addCurve(t, f);
                        if (o = d.index, d.error >= u) break;
                        l = this.reparameterize(i, n, h, f), u = d.error
                    }
                    var _ = a[o - 1].subtract(a[o + 1]);
                    this.fitCubic(t, e, i, o, r, _), this.fitCubic(t, e, o, n, _.negate(), s)
                } else {
                    var g = a[i],
                        v = a[n],
                        p = g.getDistance(v) / 3;
                    this.addCurve(t, [g, g.add(r.normalize(p)), v.add(s.normalize(p)), v])
                }
            },
            addCurve: function(t, e) {
                t[t.length - 1].setHandleOut(e[1].subtract(e[0])), t.push(new J(e[3], e[2].subtract(e[3])))
            },
            generateBezier: function(t, e, i, n, r) {
                for (var s = Math.abs, a = this.points, o = a[t], h = a[e], u = [
                        [0, 0],
                        [0, 0]
                    ], l = [0, 0], c = 0, f = e - t + 1; c < f; c++) {
                    var d = i[c],
                        _ = 1 - d,
                        g = 3 * d * _,
                        v = _ * _ * _,
                        p = g * _,
                        m = g * d,
                        y = d * d * d,
                        w = n.normalize(p),
                        x = r.normalize(m),
                        b = a[t + c].subtract(o.multiply(v + p)).subtract(h.multiply(m + y));
                    u[0][0] += w.dot(w), u[0][1] += w.dot(x), u[1][0] = u[0][1], u[1][1] += x.dot(x), l[0] += w.dot(b), l[1] += x.dot(b)
                }
                var S, C, P = u[0][0] * u[1][1] - u[1][0] * u[0][1];
                if (1e-12 < s(P)) {
                    var I = u[0][0] * l[1] - u[1][0] * l[0];
                    S = (l[0] * u[1][1] - l[1] * u[0][1]) / P, C = I / P
                } else {
                    var M = u[0][0] + u[0][1],
                        T = u[1][0] + u[1][1];
                    S = C = 1e-12 < s(M) ? l[0] / M : 1e-12 < s(T) ? l[1] / T : 0
                }
                var z, k, O = h.getDistance(o),
                    A = 1e-12 * O;
                if (S < A || C < A) S = C = O / 3;
                else {
                    var L = h.subtract(o);
                    z = n.normalize(S), k = r.normalize(C), z.dot(L) - k.dot(L) > O * O && (S = C = O / 3, z = k = null)
                }
                return [o, o.add(z || n.normalize(S)), h.add(k || r.normalize(C)), h]
            },
            reparameterize: function(t, e, i, n) {
                for (var r = t; r <= e; r++) i[r - t] = this.findRoot(n, this.points[r], i[r - t]);
                r = 1;
                for (var s = i.length; r < s; r++)
                    if (i[r] <= i[r - 1]) return !1;
                return !0
            },
            findRoot: function(t, e, i) {
                for (var n = [], r = [], s = 0; s <= 2; s++) n[s] = t[s + 1].subtract(t[s]).multiply(3);
                for (s = 0; s <= 1; s++) r[s] = n[s + 1].subtract(n[s]).multiply(2);
                var a = this.evaluate(3, t, i),
                    o = this.evaluate(2, n, i),
                    h = this.evaluate(1, r, i),
                    u = a.subtract(e),
                    l = o.dot(o) + u.dot(h);
                return H.isZero(l) ? i : i - u.dot(o) / l
            },
            evaluate: function(t, e, i) {
                for (var n = e.slice(), r = 1; r <= t; r++)
                    for (var s = 0; s <= t - r; s++) n[s] = n[s].multiply(1 - i).add(n[s + 1].multiply(i));
                return n[0]
            },
            chordLengthParameterize: function(t, e) {
                for (var i = [0], n = t + 1; n <= e; n++) i[n - t] = i[n - t - 1] + this.points[n].getDistance(this.points[n - 1]);
                n = 1;
                for (var r = e - t; n <= r; n++) i[n] /= i[r];
                return i
            },
            findMaxError: function(t, e, i, n) {
                for (var r = Math.floor((e - t + 1) / 2), s = 0, a = t + 1; a < e; a++) {
                    var o = this.evaluate(3, i, n[a - t]).subtract(this.points[a]),
                        h = o.x * o.x + o.y * o.y;
                    s <= h && (s = h, r = a)
                }
                return {
                    error: s,
                    index: r
                }
            }
        }),
        h = O.extend({
            _class: "TextItem",
            _applyMatrix: !1,
            _canApplyMatrix: !1,
            _serializeFields: {
                content: null
            },
            _boundsOptions: {
                stroke: !1,
                handle: !1
            },
            initialize: function(t) {
                this._content = "", this._lines = [];
                var e = t && V.isPlainObject(t) && t.x === q && t.y === q;
                this._initialize(e && t, !e && Z.read(arguments))
            },
            _equals: function(t) {
                return this._content === t._content
            },
            copyContent: function(t) {
                this.setContent(t._content)
            },
            getContent: function() {
                return this._content
            },
            setContent: function(t) {
                this._content = "" + t, this._lines = this._content.split(/\r\n|\n|\r/gm), this._changed(521)
            },
            isEmpty: function() {
                return !this._content
            },
            getCharacterStyle: "#getStyle",
            setCharacterStyle: "#setStyle",
            getParagraphStyle: "#getStyle",
            setParagraphStyle: "#setStyle"
        }),
        N = h.extend({
            _class: "PointText",
            initialize: function() {
                h.apply(this, arguments)
            },
            getPoint: function() {
                var t = this._matrix.getTranslation();
                return new f(t.x, t.y, this, "setPoint")
            },
            setPoint: function() {
                var t = Z.read(arguments);
                this.translate(t.subtract(this._matrix.getTranslation()))
            },
            _draw: function(t, e, i) {
                if (this._content) {
                    this._setStyles(t, e, i);
                    var n = this._lines,
                        r = this._style,
                        s = r.hasFill(),
                        a = r.hasStroke(),
                        o = r.getLeading(),
                        h = t.shadowColor;
                    t.font = r.getFontStyle(), t.textAlign = r.getJustification();
                    for (var u = 0, l = n.length; u < l; u++) {
                        t.shadowColor = h;
                        var c = n[u];
                        s && (t.fillText(c, 0, 0), t.shadowColor = "rgba(0,0,0,0)"), a && t.strokeText(c, 0, 0), t.translate(0, o)
                    }
                }
            },
            _getBounds: function(t, e) {
                var i = this._style,
                    n = this._lines,
                    r = n.length,
                    s = i.getJustification(),
                    a = i.getLeading(),
                    o = this.getView().getTextWidth(i.getFontStyle(), n),
                    h = 0;
                "left" !== s && (h -= o / ("center" === s ? 2 : 1));
                var u = new T(h, r ? -.75 * a : 0, o, r * a);
                return t ? t._transformBounds(u, u) : u
            }
        }),
        B = V.extend(new function() {
            var m, y = {
                    gray: ["gray"],
                    rgb: ["red", "green", "blue"],
                    hsb: ["hue", "saturation", "brightness"],
                    hsl: ["hue", "saturation", "lightness"],
                    gradient: ["gradient", "origin", "destination", "highlight"]
                },
                w = {},
                x = {
                    transparent: [0, 0, 0, 0]
                };
            var a = [
                    [0, 3, 1],
                    [2, 0, 1],
                    [1, 0, 3],
                    [1, 2, 0],
                    [3, 1, 0],
                    [0, 1, 2]
                ],
                i = {
                    "rgb-hsb": function(t, e, i) {
                        var n = Math.max(t, e, i),
                            r = n - Math.min(t, e, i);
                        return [0 === r ? 0 : 60 * (n == t ? (e - i) / r + (e < i ? 6 : 0) : n == e ? (i - t) / r + 2 : (t - e) / r + 4), 0 === n ? 0 : r / n, n]
                    },
                    "hsb-rgb": function(t, e, i) {
                        var n, r = (t = (t / 60 % 6 + 6) % 6) - (n = Math.floor(t)),
                            s = [i, i * (1 - e), i * (1 - e * r), i * (1 - e * (1 - r))];
                        return [s[(n = a[n])[0]], s[n[1]], s[n[2]]]
                    },
                    "rgb-hsl": function(t, e, i) {
                        var n = Math.max(t, e, i),
                            r = Math.min(t, e, i),
                            s = n - r,
                            a = 0 === s,
                            o = (n + r) / 2;
                        return [a ? 0 : 60 * (n == t ? (e - i) / s + (e < i ? 6 : 0) : n == e ? (i - t) / s + 2 : (t - e) / s + 4), a ? 0 : o < .5 ? s / (n + r) : s / (2 - n - r), o]
                    },
                    "hsl-rgb": function(t, e, i) {
                        if (0 === e) return [i, i, i];
                        for (var n = [(t = (t / 360 % 1 + 1) % 1) + 1 / 3, t, t - 1 / 3], r = i < .5 ? i * (1 + e) : i + e - i * e, s = 2 * i - r, a = [], o = 0; o < 3; o++) {
                            var h = n[o];
                            h < 0 && (h += 1), 1 < h && (h -= 1), a[o] = 6 * h < 1 ? s + 6 * (r - s) * h : 2 * h < 1 ? r : 3 * h < 2 ? s + (r - s) * (2 / 3 - h) * 6 : s
                        }
                        return a
                    },
                    "rgb-gray": function(t, e, i) {
                        return [.2989 * t + .587 * e + .114 * i]
                    },
                    "gray-rgb": function(t) {
                        return [t, t, t]
                    },
                    "gray-hsb": function(t) {
                        return [0, 0, t]
                    },
                    "gray-hsl": function(t) {
                        return [0, 0, t]
                    },
                    "gradient-rgb": function() {
                        return []
                    },
                    "rgb-gradient": function() {
                        return []
                    }
                };
            return V.each(y, function(t, s) {
                w[s] = [], V.each(t, function(t, e) {
                    var i = V.capitalize(t),
                        n = /^(hue|saturation)$/.test(t),
                        r = w[s][e] = "gradient" === s ? "gradient" === t ? function(t) {
                            var e = this._components[0];
                            return e !== (t = E.read(Array.isArray(t) ? t : arguments, 0, {
                                readNull: !0
                            })) && (e && e._removeOwner(this), t && t._addOwner(this)), t
                        } : function() {
                            return Z.read(arguments, 0, {
                                readNull: "highlight" === t,
                                clone: !0
                            })
                        } : function(t) {
                            return null == t || isNaN(t) ? 0 : +t
                        };
                    this["get" + i] = function() {
                        return this._type === s || n && /^hs[bl]$/.test(this._type) ? this._components[e] : this._convert(s)[e]
                    }, this["set" + i] = function(t) {
                        this._type === s || n && /^hs[bl]$/.test(this._type) || (this._components = this._convert(s), this._properties = y[s], this._type = s), this._components[e] = r.call(this, t), this._changed()
                    }
                }, this)
            }, {
                _class: "Color",
                _readIndex: !0,
                initialize: function t(e) {
                    var i, n, r, s, a = arguments,
                        o = this.__read,
                        h = 0;
                    Array.isArray(e) && (e = (a = e)[0]);
                    var u = null != e && typeof e;
                    if ("string" === u && e in y && (i = e, e = a[1], Array.isArray(e) ? (n = e, r = a[2]) : (o && (h = 1), a = V.slice(a, 1), u = typeof e)), !n) {
                        if (s = "number" === u ? a : "object" === u && null != e.length ? e : null) {
                            i || (i = 3 <= s.length ? "rgb" : "gray");
                            var l = y[i].length;
                            r = s[l], o && (h += s === arguments ? l + (null != r ? 1 : 0) : 1), s.length > l && (s = V.slice(s, 0, l))
                        } else if ("string" === u) {
                            var c = function(t) {
                                var e, i = t.match(/^#([\da-f]{2})([\da-f]{2})([\da-f]{2})([\da-f]{2})?$/i) || t.match(/^#([\da-f])([\da-f])([\da-f])([\da-f])?$/i),
                                    n = "rgb";
                                if (i) {
                                    var r = i[4] ? 4 : 3;
                                    e = new Array(r);
                                    for (var s = 0; s < r; s++) {
                                        var a = i[s + 1];
                                        e[s] = parseInt(1 == a.length ? a + a : a, 16) / 255
                                    }
                                } else if (i = t.match(/^(rgb|hsl)a?\((.*)\)$/)) {
                                    n = i[1], e = i[2].split(/[,\s]+/g);
                                    for (var o = "hsl" === n, h = (s = 0, Math.min(e.length, 4)); s < h; s++) {
                                        var u = e[s];
                                        if (a = parseFloat(u), o)
                                            if (0 === s) {
                                                var l = u.match(/([a-z]*)$/)[1];
                                                a *= {
                                                    turn: 360,
                                                    rad: 180 / Math.PI,
                                                    grad: .9
                                                }[l] || 1
                                            } else s < 3 && (a /= 100);
                                        else s < 3 && (a /= 255);
                                        e[s] = a
                                    }
                                } else {
                                    var c = x[t];
                                    if (!c)
                                        if (z) {
                                            m || ((m = it.getContext(1, 1)).globalCompositeOperation = "copy"), m.fillStyle = "rgba(0,0,0,0)", m.fillStyle = t, m.fillRect(0, 0, 1, 1);
                                            var f = m.getImageData(0, 0, 1, 1).data;
                                            c = x[t] = [f[0] / 255, f[1] / 255, f[2] / 255]
                                        } else c = [0, 0, 0];
                                    e = c.slice()
                                }
                                return [n, e]
                            }(e);
                            i = c[0], 4 === (n = c[1]).length && (r = n[3], n.length--)
                        } else if ("object" === u)
                            if (e.constructor === t) {
                                if (i = e._type, n = e._components.slice(), r = e._alpha, "gradient" === i)
                                    for (var f = 1, d = n.length; f < d; f++) {
                                        var _ = n[f];
                                        _ && (n[f] = _.clone())
                                    }
                            } else if (e.constructor === E) i = "gradient", s = a;
                        else {
                            var g = y[i = "hue" in e ? "lightness" in e ? "hsl" : "hsb" : "gradient" in e || "stops" in e || "radial" in e ? "gradient" : "gray" in e ? "gray" : "rgb"],
                                v = w[i];
                            this._components = n = [];
                            for (f = 0, d = g.length; f < d; f++) {
                                null == (p = e[g[f]]) && !f && "gradient" === i && "stops" in e && (p = {
                                    stops: e.stops,
                                    radial: e.radial
                                }), null != (p = v[f].call(this, p)) && (n[f] = p)
                            }
                            r = e.alpha
                        }
                        o && i && (h = 1)
                    }
                    if (this._type = i || "rgb", !n) {
                        this._components = n = [];
                        for (f = 0, d = (v = w[this._type]).length; f < d; f++) {
                            var p;
                            null != (p = v[f].call(this, s && s[f])) && (n[f] = p)
                        }
                    }
                    return this._components = n, this._properties = y[this._type], this._alpha = r, o && (this.__read = h), this
                },
                set: "#initialize",
                _serialize: function(t, e) {
                    var i = this.getComponents();
                    return V.serialize(/^(gray|rgb)$/.test(this._type) ? i : [this._type].concat(i), t, !0, e)
                },
                _changed: function() {
                    this._canvasStyle = null, this._owner && this._owner._changed(129)
                },
                _convert: function(t) {
                    var e;
                    return this._type === t ? this._components.slice() : (e = i[this._type + "-" + t]) ? e.apply(this, this._components) : i["rgb-" + t].apply(this, i[this._type + "-rgb"].apply(this, this._components))
                },
                convert: function(t) {
                    return new B(t, this._convert(t), this._alpha)
                },
                getType: function() {
                    return this._type
                },
                setType: function(t) {
                    this._components = this._convert(t), this._properties = y[t], this._type = t
                },
                getComponents: function() {
                    var t = this._components.slice();
                    return null != this._alpha && t.push(this._alpha), t
                },
                getAlpha: function() {
                    return null != this._alpha ? this._alpha : 1
                },
                setAlpha: function(t) {
                    this._alpha = null == t ? null : Math.min(Math.max(t, 0), 1), this._changed()
                },
                hasAlpha: function() {
                    return null != this._alpha
                },
                equals: function(t) {
                    var e = V.isPlainValue(t, !0) ? B.read(arguments) : t;
                    return e === this || e && this._class === e._class && this._type === e._type && this.getAlpha() === e.getAlpha() && V.equals(this._components, e._components) || !1
                },
                toString: function() {
                    for (var t = this._properties, e = [], i = "gradient" === this._type, n = b.instance, r = 0, s = t.length; r < s; r++) {
                        var a = this._components[r];
                        null != a && e.push(t[r] + ": " + (i ? a : n.number(a)))
                    }
                    return null != this._alpha && e.push("alpha: " + n.number(this._alpha)), "{ " + e.join(", ") + " }"
                },
                toCSS: function(t) {
                    var e = this._convert("rgb"),
                        i = t || null == this._alpha ? 1 : this._alpha;

                    function n(t) {
                        return Math.round(255 * (t < 0 ? 0 : 1 < t ? 1 : t))
                    }
                    return e = [n(e[0]), n(e[1]), n(e[2])], i < 1 && e.push(i < 0 ? 0 : i), t ? "#" + ((1 << 24) + (e[0] << 16) + (e[1] << 8) + e[2]).toString(16).slice(1) : (4 == e.length ? "rgba(" : "rgb(") + e.join(",") + ")"
                },
                toCanvasStyle: function(t, e) {
                    if (this._canvasStyle) return this._canvasStyle;
                    if ("gradient" !== this._type) return this._canvasStyle = this.toCSS();
                    var i, n = this._components,
                        r = n[0],
                        s = r._stops,
                        a = n[1],
                        o = n[2],
                        h = n[3],
                        u = e && e.inverted();
                    if (u && (a = u._transformPoint(a), o = u._transformPoint(o), h && (h = u._transformPoint(h))), r._radial) {
                        var l = o.getDistance(a);
                        if (h) {
                            var c = h.subtract(a);
                            c.getLength() > l && (h = a.add(c.normalize(l - .1)))
                        }
                        var f = h || a;
                        i = t.createRadialGradient(f.x, f.y, 0, a.x, a.y, l)
                    } else i = t.createLinearGradient(a.x, a.y, o.x, o.y);
                    for (var d = 0, _ = s.length; d < _; d++) {
                        var g = s[d],
                            v = g._offset;
                        i.addColorStop(null == v ? d / (_ - 1) : v, g._color.toCanvasStyle())
                    }
                    return this._canvasStyle = i
                },
                transform: function(t) {
                    if ("gradient" === this._type) {
                        for (var e = this._components, i = 1, n = e.length; i < n; i++) {
                            var r = e[i];
                            t._transformPoint(r, r, !0)
                        }
                        this._changed()
                    }
                },
                statics: {
                    _types: y,
                    random: function() {
                        var t = Math.random;
                        return new B(t(), t(), t())
                    }
                }
            })
        }, new function() {
            return V.each({
                add: function(t, e) {
                    return t + e
                },
                subtract: function(t, e) {
                    return t - e
                },
                multiply: function(t, e) {
                    return t * e
                },
                divide: function(t, e) {
                    return t / e
                }
            }, function(a, t) {
                this[t] = function(t) {
                    t = B.read(arguments);
                    for (var e = this._type, i = this._components, n = t._convert(e), r = 0, s = i.length; r < s; r++) n[r] = a(i[r], n[r]);
                    return new B(e, n, null != this._alpha ? a(this._alpha, t.getAlpha()) : null)
                }
            }, {})
        }),
        E = V.extend({
            _class: "Gradient",
            initialize: function(t, e) {
                this._id = l.get(), t && V.isPlainObject(t) && (this.set(t), t = e = null), null == this._stops && this.setStops(t || ["white", "black"]), null == this._radial && this.setRadial("string" == typeof e && "radial" === e || e || !1)
            },
            _serialize: function(t, e) {
                return e.add(this, function() {
                    return V.serialize([this._stops, this._radial], t, !0, e)
                })
            },
            _changed: function() {
                for (var t = 0, e = this._owners && this._owners.length; t < e; t++) this._owners[t]._changed()
            },
            _addOwner: function(t) {
                this._owners || (this._owners = []), this._owners.push(t)
            },
            _removeOwner: function(t) {
                var e = this._owners ? this._owners.indexOf(t) : -1; - 1 != e && (this._owners.splice(e, 1), this._owners.length || (this._owners = q))
            },
            clone: function() {
                for (var t = [], e = 0, i = this._stops.length; e < i; e++) t[e] = this._stops[e].clone();
                return new E(t, this._radial)
            },
            getStops: function() {
                return this._stops
            },
            setStops: function(t) {
                if (t.length < 2) throw new Error("Gradient stop list needs to contain at least two stops.");
                var e = this._stops;
                if (e)
                    for (var i = 0, n = e.length; i < n; i++) e[i]._owner = q;
                for (i = 0, n = (e = this._stops = R.readList(t, 0, {
                        clone: !0
                    })).length; i < n; i++) e[i]._owner = this;
                this._changed()
            },
            getRadial: function() {
                return this._radial
            },
            setRadial: function(t) {
                this._radial = t, this._changed()
            },
            equals: function(t) {
                if (t === this) return !0;
                if (t && this._class === t._class) {
                    var e = this._stops,
                        i = t._stops,
                        n = e.length;
                    if (n === i.length) {
                        for (var r = 0; r < n; r++)
                            if (!e[r].equals(i[r])) return !1;
                        return !0
                    }
                }
                return !1
            }
        }),
        R = V.extend({
            _class: "GradientStop",
            initialize: function(t, e) {
                var i = t,
                    n = e;
                "object" == typeof t && e === q && (Array.isArray(t) && "number" != typeof t[0] ? (i = t[0], n = t[1]) : ("color" in t || "offset" in t || "rampPoint" in t) && (i = t.color, n = t.offset || t.rampPoint || 0)), this.setColor(i), this.setOffset(n)
            },
            clone: function() {
                return new R(this._color.clone(), this._offset)
            },
            _serialize: function(t, e) {
                var i = this._color,
                    n = this._offset;
                return V.serialize(null == n ? [i] : [i, n], t, !0, e)
            },
            _changed: function() {
                this._owner && this._owner._changed(129)
            },
            getOffset: function() {
                return this._offset
            },
            setOffset: function(t) {
                this._offset = t, this._changed()
            },
            getRampPoint: "#getOffset",
            setRampPoint: "#setOffset",
            getColor: function() {
                return this._color
            },
            setColor: function() {
                var t = B.read(arguments, 0, {
                    clone: !0
                });
                t && (t._owner = this), this._color = t, this._changed()
            },
            equals: function(t) {
                return t === this || t && this._class === t._class && this._color.equals(t._color) && this._offset == t._offset || !1
            }
        }),
        _ = V.extend(new function() {
            var n = {
                    fillColor: null,
                    fillRule: "nonzero",
                    strokeColor: null,
                    strokeWidth: 1,
                    strokeCap: "butt",
                    strokeJoin: "miter",
                    strokeScaling: !0,
                    miterLimit: 10,
                    dashOffset: 0,
                    dashArray: [],
                    shadowColor: null,
                    shadowBlur: 0,
                    shadowOffset: new Z,
                    selectedColor: null
                },
                r = V.set({}, n, {
                    fontFamily: "sans-serif",
                    fontWeight: "normal",
                    fontSize: 12,
                    leading: null,
                    justification: "left"
                }),
                s = V.set({}, r, {
                    fillColor: new B
                }),
                i = {
                    strokeWidth: 193,
                    strokeCap: 193,
                    strokeJoin: 193,
                    strokeScaling: 201,
                    miterLimit: 193,
                    fontFamily: 9,
                    fontWeight: 9,
                    fontSize: 9,
                    font: 9,
                    leading: 9,
                    justification: 9
                },
                a = {
                    beans: !0
                },
                d = {
                    _class: "Style",
                    beans: !0,
                    initialize: function(t, e, i) {
                        this._values = {}, this._owner = e, this._project = e && e._project || i || st.project, this._defaults = !e || e instanceof C ? r : e instanceof h ? s : n, t && this.set(t)
                    }
                };
            return V.each(r, function(t, h) {
                var u = /Color$/.test(h),
                    l = "shadowOffset" === h,
                    e = V.capitalize(h),
                    o = i[h],
                    c = "set" + e,
                    f = "get" + e;
                d[c] = function(t) {
                    var e = this._owner,
                        i = e && e._children,
                        n = i && 0 < i.length && !(e instanceof D);
                    if (n)
                        for (var r = 0, s = i.length; r < s; r++) i[r]._style[c](t);
                    if (("selectedColor" === h || !n) && h in this._defaults) {
                        var a = this._values[h];
                        a !== t && (u && (a && a._owner !== q && (a._owner = q, a._canvasStyle = null), t && t.constructor === B && (t._owner && (t = t.clone()), t._owner = e)), this._values[h] = t, e && e._changed(o || 129))
                    }
                }, d[f] = function(t) {
                    var e, i = this._owner,
                        n = i && i._children;
                    if (h in this._defaults && (!n || !n.length || t || i instanceof D))
                        if ((e = this._values[h]) === q)(e = this._defaults[h]) && e.clone && (e = e.clone());
                        else {
                            var r = u ? B : l ? Z : null;
                            !r || e && e.constructor === r || (this._values[h] = e = r.read([e], 0, {
                                readNull: !0,
                                clone: !0
                            }), e && u && (e._owner = i))
                        }
                    else if (n)
                        for (var s = 0, a = n.length; s < a; s++) {
                            var o = n[s]._style[f]();
                            if (s) {
                                if (!V.equals(e, o)) return q
                            } else e = o
                        }
                    return e
                }, a[f] = function(t) {
                    return this._style[f](t)
                }, a[c] = function(t) {
                    this._style[c](t)
                }
            }), V.each({
                Font: "FontFamily",
                WindingRule: "FillRule"
            }, function(t, e) {
                var i = "get" + e,
                    n = "set" + e;
                d[i] = a[i] = "#get" + t, d[n] = a[n] = "#set" + t
            }), O.inject(a), d
        }, {
            set: function(t) {
                var e = t instanceof _,
                    i = e ? t._values : t;
                if (i)
                    for (var n in i)
                        if (n in this._defaults) {
                            var r = i[n];
                            this[n] = r && e && r.clone ? r.clone() : r
                        }
            },
            equals: function(t) {
                function e(t, e, i) {
                    var n = t._values,
                        r = e._values,
                        s = e._defaults;
                    for (var a in n) {
                        var o = n[a],
                            h = r[a];
                        if (!(i && a in r || V.equals(o, h === q ? s[a] : h))) return !1
                    }
                    return !0
                }
                return t === this || t && this._class === t._class && e(this, t) && e(t, this, !0) || !1
            },
            _dispose: function() {
                var t;
                (t = this.getFillColor()) && (t._canvasStyle = null), (t = this.getStrokeColor()) && (t._canvasStyle = null), (t = this.getShadowColor()) && (t._canvasStyle = null)
            },
            hasFill: function() {
                var t = this.getFillColor();
                return !!t && 0 < t.alpha
            },
            hasStroke: function() {
                var t = this.getStrokeColor();
                return !!t && 0 < t.alpha && 0 < this.getStrokeWidth()
            },
            hasShadow: function() {
                var t = this.getShadowColor();
                return !!t && 0 < t.alpha && (0 < this.getShadowBlur() || !this.getShadowOffset().isZero())
            },
            getView: function() {
                return this._project._view
            },
            getFontStyle: function() {
                var t = this.getFontSize();
                return this.getFontWeight() + " " + t + (/[a-z]/i.test(t + "") ? " " : "px ") + this.getFontFamily()
            },
            getFont: "#getFontFamily",
            setFont: "#setFontFamily",
            getLeading: function t() {
                var e = t.base.call(this),
                    i = this.getFontSize();
                return /pt|em|%|px/.test(i) && (i = this.getView().getPixelSize(i)), null != e ? e : 1.2 * i
            }
        }),
        K = new function() {
            function r(t, e, i, n) {
                for (var r = ["", "webkit", "moz", "Moz", "ms", "o"], s = e[0].toUpperCase() + e.substring(1), a = 0; a < 6; a++) {
                    var o = r[a],
                        h = o ? o + s : e;
                    if (h in t) {
                        if (!i) return t[h];
                        t[h] = n;
                        break
                    }
                }
            }
            return {
                getStyles: function(t) {
                    var e = t && 9 !== t.nodeType ? t.ownerDocument : t,
                        i = e && e.defaultView;
                    return i && i.getComputedStyle(t, "")
                },
                getBounds: function(t, e) {
                    var i, n = t.ownerDocument,
                        r = n.body,
                        s = n.documentElement;
                    try {
                        i = t.getBoundingClientRect()
                    } catch (t) {
                        i = {
                            left: 0,
                            top: 0,
                            width: 0,
                            height: 0
                        }
                    }
                    var a = i.left - (s.clientLeft || r.clientLeft || 0),
                        o = i.top - (s.clientTop || r.clientTop || 0);
                    if (!e) {
                        var h = n.defaultView;
                        a += h.pageXOffset || s.scrollLeft || r.scrollLeft, o += h.pageYOffset || s.scrollTop || r.scrollTop
                    }
                    return new T(a, o, i.width, i.height)
                },
                getViewportBounds: function(t) {
                    var e = t.ownerDocument,
                        i = e.defaultView,
                        n = e.documentElement;
                    return new T(0, 0, i.innerWidth || n.clientWidth, i.innerHeight || n.clientHeight)
                },
                getOffset: function(t, e) {
                    return K.getBounds(t, e).getPoint()
                },
                getSize: function(t) {
                    return K.getBounds(t, !0).getSize()
                },
                isInvisible: function(t) {
                    return K.getSize(t).equals(new U(0, 0))
                },
                isInView: function(t) {
                    return !K.isInvisible(t) && K.getViewportBounds(t).intersects(K.getBounds(t, !0))
                },
                isInserted: function(t) {
                    return k.body.contains(t)
                },
                getPrefixed: function(t, e) {
                    return t && r(t, e)
                },
                setPrefixed: function(t, e, i) {
                    if ("object" == typeof e)
                        for (var n in e) r(t, n, !0, e[n]);
                    else r(t, e, !0, i)
                }
            }
        },
        Q = {
            add: function(t, e) {
                if (t)
                    for (var i in e)
                        for (var n = e[i], r = i.split(/[\s,]+/g), s = 0, a = r.length; s < a; s++) {
                            var o = r[s],
                                h = t === k && ("touchstart" === o || "touchmove" === o) && {
                                    passive: !1
                                };
                            t.addEventListener(o, n, h)
                        }
            },
            remove: function(t, e) {
                if (t)
                    for (var i in e)
                        for (var n = e[i], r = i.split(/[\s,]+/g), s = 0, a = r.length; s < a; s++) t.removeEventListener(r[s], n, !1)
            },
            getPoint: function(t) {
                var e = t.targetTouches ? t.targetTouches.length ? t.targetTouches[0] : t.changedTouches[0] : t;
                return new Z(e.pageX || e.clientX + k.documentElement.scrollLeft, e.pageY || e.clientY + k.documentElement.scrollTop)
            },
            getTarget: function(t) {
                return t.target || t.srcElement
            },
            getRelatedTarget: function(t) {
                return t.relatedTarget || t.toElement
            },
            getOffset: function(t, e) {
                return Q.getPoint(t).subtract(K.getOffset(e || Q.getTarget(t)))
            }
        };
    Q.requestAnimationFrame = new function() {
        var e, n = K.getPrefixed(z, "requestAnimationFrame"),
            r = !1,
            s = [];

        function a() {
            var t = s;
            s = [];
            for (var e = 0, i = t.length; e < i; e++) t[e]();
            (r = n && s.length) && n(a)
        }
        return function(t) {
            s.push(t), n ? r || (n(a), r = !0) : e || (e = setInterval(a, 1e3 / 60))
        }
    };
    var X = V.extend(t, {
            _class: "View",
            initialize: function t(e, i) {
                function n(t) {
                    return i[t] || parseInt(i.getAttribute(t), 10)
                }

                function r() {
                    var t = K.getSize(i);
                    return t.isNaN() || t.isZero() ? new U(n("width"), n("height")) : t
                }
                var s;
                if (z && i) {
                    this._id = i.getAttribute("id"), null == this._id && i.setAttribute("id", this._id = "view-" + t._id++), Q.add(i, this._viewEvents);
                    var a = "none";
                    if (K.setPrefixed(i.style, {
                            userDrag: a,
                            userSelect: a,
                            touchCallout: a,
                            contentZooming: a,
                            tapHighlightColor: "rgba(0,0,0,0)"
                        }), c.hasAttribute(i, "resize")) {
                        var o = this;
                        Q.add(z, this._windowEvents = {
                            resize: function() {
                                o.setViewSize(r())
                            }
                        })
                    }
                    if (s = r(), c.hasAttribute(i, "stats") && "undefined" != typeof Stats) {
                        this._stats = new Stats;
                        var h = this._stats.domElement,
                            u = h.style,
                            l = K.getOffset(i);
                        u.position = "absolute", u.left = l.x + "px", u.top = l.y + "px", k.body.appendChild(h)
                    }
                } else s = new U(i), i = null;
                this._project = e, this._scope = e._scope, this._element = i, this._pixelRatio || (this._pixelRatio = z && z.devicePixelRatio || 1), this._setElementSize(s.width, s.height), this._viewSize = s, t._views.push(this), ((t._viewsById[this._id] = this)._matrix = new W)._owner = this, t._focused || (t._focused = this), this._frameItems = {}, this._frameItemCount = 0, this._itemEvents = {
                    native: {},
                    virtual: {}
                }, this._autoUpdate = !st.agent.node, this._needsUpdate = !1
            },
            remove: function() {
                if (!this._project) return !1;
                X._focused === this && (X._focused = null), X._views.splice(X._views.indexOf(this), 1), delete X._viewsById[this._id];
                var t = this._project;
                return t._view === this && (t._view = null), Q.remove(this._element, this._viewEvents), Q.remove(z, this._windowEvents), this._element = this._project = null, this.off("frame"), this._animate = !1, this._frameItems = {}, !0
            },
            _events: V.each(O._itemHandlers.concat(["onResize", "onKeyDown", "onKeyUp"]), function(t) {
                this[t] = {}
            }, {
                onFrame: {
                    install: function() {
                        this.play()
                    },
                    uninstall: function() {
                        this.pause()
                    }
                }
            }),
            _animate: !1,
            _time: 0,
            _count: 0,
            getAutoUpdate: function() {
                return this._autoUpdate
            },
            setAutoUpdate: function(t) {
                (this._autoUpdate = t) && this.requestUpdate()
            },
            update: function() {},
            draw: function() {
                this.update()
            },
            requestUpdate: function() {
                if (!this._requested) {
                    var e = this;
                    Q.requestAnimationFrame(function() {
                        if (e._requested = !1, e._animate) {
                            e.requestUpdate();
                            var t = e._element;
                            K.getPrefixed(k, "hidden") && "true" !== c.getAttribute(t, "keepalive") || !K.isInView(t) || e._handleFrame()
                        }
                        e._autoUpdate && e.update()
                    }), this._requested = !0
                }
            },
            play: function() {
                this._animate = !0, this.requestUpdate()
            },
            pause: function() {
                this._animate = !1
            },
            _handleFrame: function() {
                st = this._scope;
                var t = Date.now() / 1e3,
                    e = this._last ? t - this._last : 0;
                this._last = t, this.emit("frame", new V({
                    delta: e,
                    time: this._time += e,
                    count: this._count++
                })), this._stats && this._stats.update()
            },
            _animateItem: function(t, e) {
                var i = this._frameItems;
                e ? (i[t._id] = {
                    item: t,
                    time: 0,
                    count: 0
                }, 1 == ++this._frameItemCount && this.on("frame", this._handleFrameItems)) : (delete i[t._id], 0 == --this._frameItemCount && this.off("frame", this._handleFrameItems))
            },
            _handleFrameItems: function(t) {
                for (var e in this._frameItems) {
                    var i = this._frameItems[e];
                    i.item.emit("frame", new V(t, {
                        time: i.time += t.delta,
                        count: i.count++
                    }))
                }
            },
            _changed: function() {
                this._project._changed(4097), this._bounds = this._decomposed = q
            },
            getElement: function() {
                return this._element
            },
            getPixelRatio: function() {
                return this._pixelRatio
            },
            getResolution: function() {
                return 72 * this._pixelRatio
            },
            getViewSize: function() {
                var t = this._viewSize;
                return new i(t.width, t.height, this, "setViewSize")
            },
            setViewSize: function() {
                var t = U.read(arguments),
                    e = t.subtract(this._viewSize);
                e.isZero() || (this._setElementSize(t.width, t.height), this._viewSize.set(t), this._changed(), this.emit("resize", {
                    size: t,
                    delta: e
                }), this._autoUpdate && this.update())
            },
            _setElementSize: function(t, e) {
                var i = this._element;
                i && (i.width !== t && (i.width = t), i.height !== e && (i.height = e))
            },
            getBounds: function() {
                return this._bounds || (this._bounds = this._matrix.inverted()._transformBounds(new T(new Z, this._viewSize))), this._bounds
            },
            getSize: function() {
                return this.getBounds().getSize()
            },
            isVisible: function() {
                return K.isInView(this._element)
            },
            isInserted: function() {
                return K.isInserted(this._element)
            },
            getPixelSize: function(t) {
                var e, i = this._element;
                if (i) {
                    var n = i.parentNode,
                        r = k.createElement("div");
                    r.style.fontSize = t, n.appendChild(r), e = parseFloat(K.getStyles(r).fontSize), n.removeChild(r)
                } else e = parseFloat(e);
                return e
            },
            getTextWidth: function(t, e) {
                return 0
            }
        }, V.each(["rotate", "scale", "shear", "skew"], function(i) {
            var n = "rotate" === i;
            this[i] = function() {
                var t = (n ? V : Z).read(arguments),
                    e = Z.read(arguments, 0, {
                        readNull: !0
                    });
                return this.transform((new W)[i](t, e || this.getCenter(!0)))
            }
        }, {
            _decompose: function() {
                return this._decomposed || (this._decomposed = this._matrix.decompose())
            },
            translate: function() {
                var t = new W;
                return this.transform(t.translate.apply(t, arguments))
            },
            getCenter: function() {
                return this.getBounds().getCenter()
            },
            setCenter: function() {
                var t = Z.read(arguments);
                this.translate(this.getCenter().subtract(t))
            },
            getZoom: function() {
                var t = this._decompose().scaling;
                return (t.x + t.y) / 2
            },
            setZoom: function(t) {
                this.transform((new W).scale(t / this.getZoom(), this.getCenter()))
            },
            getRotation: function() {
                return this._decompose().rotation
            },
            setRotation: function(t) {
                var e = this.getRotation();
                null != e && null != t && this.rotate(t - e)
            },
            getScaling: function() {
                var t = this._decompose().scaling;
                return new f(t.x, t.y, this, "setScaling")
            },
            setScaling: function() {
                var t = this.getScaling(),
                    e = Z.read(arguments, 0, {
                        clone: !0,
                        readNull: !0
                    });
                t && e && this.scale(e.x / t.x, e.y / t.y)
            },
            getMatrix: function() {
                return this._matrix
            },
            setMatrix: function() {
                var t = this._matrix;
                t.initialize.apply(t, arguments)
            },
            transform: function(t) {
                this._matrix.append(t)
            },
            scrollBy: function() {
                this.translate(Z.read(arguments).negate())
            }
        }), {
            projectToView: function() {
                return this._matrix._transformPoint(Z.read(arguments))
            },
            viewToProject: function() {
                return this._matrix._inverseTransform(Z.read(arguments))
            },
            getEventPoint: function(t) {
                return this.viewToProject(Q.getOffset(t, this._element))
            }
        }, {
            statics: {
                _views: [],
                _viewsById: {},
                _id: 0,
                create: function(t, e) {
                    return k && "string" == typeof e && (e = k.getElementById(e)), new(z ? r : X)(t, e)
                }
            }
        }, new function() {
            if (z) {
                var n, r, t, e, i, g = !1,
                    s = !1,
                    a = z.navigator;
                a.pointerEnabled || a.msPointerEnabled ? (t = "pointerdown MSPointerDown", e = "pointermove MSPointerMove", i = "pointerup pointercancel MSPointerUp MSPointerCancel") : (t = "touchstart", e = "touchmove", i = "touchend touchcancel", "ontouchstart" in z && a.userAgent.match(/mobile|tablet|ip(ad|hone|od)|android|silk/i) || (t += " mousedown", e += " mousemove", i += " mouseup"));
                var o = {},
                    h = {
                        mouseout: function(t) {
                            var e = X._focused,
                                i = Q.getRelatedTarget(t);
                            if (e && (!i || "HTML" === i.nodeName)) {
                                var n = Q.getOffset(t, e._element),
                                    r = n.x,
                                    s = Math.abs,
                                    a = s(r),
                                    o = a - (1 << 25);
                                n.x = s(o) < a ? o * (r < 0 ? -1 : 1) : r, d(e, t, e.viewToProject(n))
                            }
                        },
                        scroll: f
                    };
                o[t] = function(t) {
                    var e = X._focused = c(t);
                    g || (g = !0, e._handleMouseEvent("mousedown", t))
                }, h[e] = function(t) {
                    var e = X._focused;
                    if (!s) {
                        var i = c(t);
                        i ? e !== i && (e && d(e, t), n || (n = e), e = X._focused = r = i) : r && r === e && (n && !n.isInserted() && (n = null), e = X._focused = n, n = null, f())
                    }
                    e && d(e, t)
                }, h[t] = function() {
                    s = !0
                }, h[i] = function(t) {
                    var e = X._focused;
                    e && g && e._handleMouseEvent("mouseup", t), s = g = !1
                }, Q.add(k, h), Q.add(z, {
                    load: f
                });
                var v, p, m, y, w, x, b, S, C = !1,
                    P = !1,
                    l = {
                        doubleclick: "click",
                        mousedrag: "mousemove"
                    },
                    I = !1,
                    u = {
                        mousedown: {
                            mousedown: 1,
                            mousedrag: 1,
                            click: 1,
                            doubleclick: 1
                        },
                        mouseup: {
                            mouseup: 1,
                            mousedrag: 1,
                            click: 1,
                            doubleclick: 1
                        },
                        mousemove: {
                            mousedrag: 1,
                            mousemove: 1,
                            mouseenter: 1,
                            mouseleave: 1
                        }
                    };
                return {
                    _viewEvents: o,
                    _handleMouseEvent: function(t, e, i) {
                        var n = this._itemEvents,
                            r = n.native[t],
                            s = "mousemove" === t,
                            a = this._scope.tool,
                            o = this;

                        function h(t) {
                            return n.virtual[t] || o.responds(t) || a && a.responds(t)
                        }
                        s && g && h("mousedrag") && (t = "mousedrag"), i || (i = this.getEventPoint(e));
                        var u = this.getBounds().contains(i),
                            l = r && u && o._project.hitTest(i, {
                                tolerance: 0,
                                fill: !0,
                                stroke: !0
                            }),
                            c = l && l.item || null,
                            f = !1,
                            d = {};
                        if (d[t.substr(5)] = !0, r && c !== y && (y && M(y, null, "mouseleave", e, i), c && M(c, null, "mouseenter", e, i), y = c), I ^ u && (M(this, null, u ? "mouseenter" : "mouseleave", e, i), u ? this : null, f = !0), !u && !d.drag || i.equals(p) || (T(this, c, s ? t : "mousemove", e, i, p), f = !0), I = u, d.down && u || d.up && v) {
                            if (T(this, c, t, e, i, v), d.down) {
                                if (S = c === x && Date.now() - b < 300, m = x = c, !P && c) {
                                    for (var _ = c; _ && !_.responds("mousedrag");) _ = _._parent;
                                    _ && (w = c)
                                }
                                v = i
                            } else d.up && (P || c !== m || (b = Date.now(), T(this, c, S ? "doubleclick" : "click", e, i, v), S = !1), m = w = null);
                            f = !(I = !1)
                        }
                        p = i, f && a && (C = a._handleMouseEvent(t, e, i, d) || C), !1 !== e.cancelable && (C && !d.move || d.down && h("mouseup")) && e.preventDefault()
                    },
                    _handleKeyEvent: function(e, i, n, r) {
                        var s, a = this._scope,
                            t = a.tool;

                        function o(t) {
                            t.responds(e) && (st = a, t.emit(e, s = s || new Y(e, i, n, r)))
                        }
                        this.isVisible() && (o(this), t && t.responds(e) && o(t))
                    },
                    _countItemEvent: function(t, e) {
                        var i = this._itemEvents,
                            n = i.native,
                            r = i.virtual;
                        for (var s in u) n[s] = (n[s] || 0) + (u[s][t] || 0) * e;
                        r[t] = (r[t] || 0) + e
                    },
                    statics: {
                        updateFocus: f,
                        _resetState: function() {
                            g = s = C = I = !1, n = r = v = p = m = y = w = x = b = S = null
                        }
                    }
                }
            }

            function c(t) {
                var e = Q.getTarget(t);
                return e.getAttribute && X._viewsById[e.getAttribute("id")]
            }

            function f() {
                var t = X._focused;
                if (!t || !t.isVisible())
                    for (var e = 0, i = X._views.length; e < i; e++)
                        if ((t = X._views[e]).isVisible()) {
                            X._focused = r = t;
                            break
                        }
            }

            function d(t, e, i) {
                t._handleMouseEvent("mousemove", e, i)
            }

            function M(t, n, e, r, s, a, i) {
                var o, h = !1;

                function u(t, e) {
                    if (t.responds(e)) {
                        if (o || (o = new tt(e, r, s, n || t, a ? s.subtract(a) : null)), t.emit(e, o) && (C = !0, o.prevented && (P = !0), o.stopped)) return h = !0
                    } else {
                        var i = l[e];
                        if (i) return u(t, i)
                    }
                }
                for (; t && t !== i && !u(t, e);) t = t._parent;
                return h
            }

            function T(t, e, i, n, r, s) {
                return t._project.removeOn(i), P = C = !1, w && M(w, null, i, n, r, s) || e && e !== w && !e.isDescendant(w) && M(e, null, "mousedrag" === i ? "mousemove" : i, n, r, s, w) || M(t, w || e || t, i, n, r, s)
            }
        }),
        r = X.extend({
            _class: "CanvasView",
            initialize: function(t, e) {
                if (!(e instanceof z.HTMLCanvasElement)) {
                    var i = U.read(arguments, 1);
                    if (i.isZero()) throw new Error("Cannot create CanvasView with the provided argument: " + V.slice(arguments, 1));
                    e = it.getCanvas(i)
                }
                var n = this._context = e.getContext("2d");
                if (n.save(), this._pixelRatio = 1, !/^off|false$/.test(c.getAttribute(e, "hidpi"))) {
                    var r = z.devicePixelRatio || 1,
                        s = K.getPrefixed(n, "backingStorePixelRatio") || 1;
                    this._pixelRatio = r / s
                }
                X.call(this, t, e), this._needsUpdate = !0
            },
            remove: function t() {
                return this._context.restore(), t.base.call(this)
            },
            _setElementSize: function t(e, i) {
                var n = this._pixelRatio;
                if (t.base.call(this, e * n, i * n), 1 !== n) {
                    var r = this._element,
                        s = this._context;
                    if (!c.hasAttribute(r, "resize")) {
                        var a = r.style;
                        a.width = e + "px", a.height = i + "px"
                    }
                    s.restore(), s.save(), s.scale(n, n)
                }
            },
            getPixelSize: function t(e) {
                var i, n = st.agent;
                if (n && n.firefox) i = t.base.call(this, e);
                else {
                    var r = this._context,
                        s = r.font;
                    r.font = e + " serif", i = parseFloat(r.font), r.font = s
                }
                return i
            },
            getTextWidth: function(t, e) {
                var i = this._context,
                    n = i.font,
                    r = 0;
                i.font = t;
                for (var s = 0, a = e.length; s < a; s++) r = Math.max(r, i.measureText(e[s]).width);
                return i.font = n, r
            },
            update: function() {
                if (!this._needsUpdate) return !1;
                var t = this._project,
                    e = this._context,
                    i = this._viewSize;
                return e.clearRect(0, 0, i.width + 1, i.height + 1), t && t.draw(e, this._matrix, this._pixelRatio), !(this._needsUpdate = !1)
            }
        }),
        g = V.extend({
            _class: "Event",
            initialize: function(t) {
                this.event = t, this.type = t && t.type
            },
            prevented: !1,
            stopped: !1,
            preventDefault: function() {
                this.prevented = !0, this.event.preventDefault()
            },
            stopPropagation: function() {
                this.stopped = !0, this.event.stopPropagation()
            },
            stop: function() {
                this.stopPropagation(), this.preventDefault()
            },
            getTimeStamp: function() {
                return this.event.timeStamp
            },
            getModifiers: function() {
                return v.modifiers
            }
        }),
        Y = g.extend({
            _class: "KeyEvent",
            initialize: function(t, e, i, n) {
                this.type = t, this.event = e, this.key = i, this.character = n
            },
            toString: function() {
                return "{ type: '" + this.type + "', key: '" + this.key + "', character: '" + this.character + "', modifiers: " + this.getModifiers() + " }"
            }
        }),
        v = new function() {
            var h, r, i = {
                    "\t": "tab",
                    " ": "space",
                    "\b": "backspace",
                    "": "delete",
                    Spacebar: "space",
                    Del: "delete",
                    Win: "meta",
                    Esc: "escape"
                },
                n = {
                    tab: "\t",
                    space: " ",
                    enter: "\r"
                },
                u = {},
                l = {},
                c = new V({
                    shift: !1,
                    control: !1,
                    alt: !1,
                    meta: !1,
                    capsLock: !1,
                    space: !1
                }).inject({
                    option: {
                        get: function() {
                            return this.alt
                        }
                    },
                    command: {
                        get: function() {
                            var t = st && st.agent;
                            return t && t.mac ? this.meta : this.control
                        }
                    }
                });

            function s(t) {
                var e = t.key || t.keyIdentifier;
                return e = /^U\+/.test(e) ? String.fromCharCode(parseInt(e.substr(2), 16)) : /^Arrow[A-Z]/.test(e) ? e.substr(5) : "Unidentified" === e || e === q ? String.fromCharCode(t.keyCode) : e, i[e] || (1 < e.length ? V.hyphenate(e) : e.toLowerCase())
            }

            function f(t, e, i, n) {
                var r, s = X._focused;
                if ((u[e] = t) ? l[e] = i : delete l[e], 1 < e.length && (r = V.camelize(e)) in c) {
                    c[r] = t;
                    var a = st && st.agent;
                    if ("meta" === r && a && a.mac)
                        if (t) h = {};
                        else {
                            for (var o in h) o in l && f(!1, o, h[o], n);
                            h = null
                        }
                } else t && h && (h[e] = i);
                s && s._handleKeyEvent(t ? "keydown" : "keyup", n, e, i)
            }
            return Q.add(k, {
                keydown: function(t) {
                    var e = s(t),
                        i = st && st.agent;
                    1 < e.length || i && i.chrome && (t.altKey || i.mac && t.metaKey || !i.mac && t.ctrlKey) ? f(!0, e, n[e] || (1 < e.length ? "" : e), t) : r = e
                },
                keypress: function(t) {
                    if (r) {
                        var e = s(t),
                            i = t.charCode,
                            n = 32 <= i ? String.fromCharCode(i) : 1 < e.length ? "" : e;
                        e !== r && (e = n.toLowerCase()), f(!0, e, n, t), r = null
                    }
                },
                keyup: function(t) {
                    var e = s(t);
                    e in l && f(!1, e, l[e], t)
                }
            }), Q.add(z, {
                blur: function(t) {
                    for (var e in l) f(!1, e, l[e], t)
                }
            }), {
                modifiers: c,
                isDown: function(t) {
                    return !!u[t]
                }
            }
        },
        tt = g.extend({
            _class: "MouseEvent",
            initialize: function(t, e, i, n, r) {
                this.type = t, this.event = e, this.point = i, this.target = n, this.delta = r
            },
            toString: function() {
                return "{ type: '" + this.type + "', point: " + this.point + ", target: " + this.target + (this.delta ? ", delta: " + this.delta : "") + ", modifiers: " + this.getModifiers() + " }"
            }
        }),
        p = g.extend({
            _class: "ToolEvent",
            _item: null,
            initialize: function(t, e, i) {
                this.tool = t, this.type = e, this.event = i
            },
            _choosePoint: function(t, e) {
                return t || (e ? e.clone() : null)
            },
            getPoint: function() {
                return this._choosePoint(this._point, this.tool._point)
            },
            setPoint: function(t) {
                this._point = t
            },
            getLastPoint: function() {
                return this._choosePoint(this._lastPoint, this.tool._lastPoint)
            },
            setLastPoint: function(t) {
                this._lastPoint = t
            },
            getDownPoint: function() {
                return this._choosePoint(this._downPoint, this.tool._downPoint)
            },
            setDownPoint: function(t) {
                this._downPoint = t
            },
            getMiddlePoint: function() {
                return !this._middlePoint && this.tool._lastPoint ? this.tool._point.add(this.tool._lastPoint).divide(2) : this._middlePoint
            },
            setMiddlePoint: function(t) {
                this._middlePoint = t
            },
            getDelta: function() {
                return !this._delta && this.tool._lastPoint ? this.tool._point.subtract(this.tool._lastPoint) : this._delta
            },
            setDelta: function(t) {
                this._delta = t
            },
            getCount: function() {
                return this.tool[/^mouse(down|up)$/.test(this.type) ? "_downCount" : "_moveCount"]
            },
            setCount: function(t) {
                this.tool[/^mouse(down|up)$/.test(this.type) ? "downCount" : "count"] = t
            },
            getItem: function() {
                if (!this._item) {
                    var t = this.tool._scope.project.hitTest(this.getPoint());
                    if (t) {
                        for (var e = t.item, i = e._parent;
                            /^(Group|CompoundPath)$/.test(i._class);) i = (e = i)._parent;
                        this._item = e
                    }
                }
                return this._item
            },
            setItem: function(t) {
                this._item = t
            },
            toString: function() {
                return "{ type: " + this.type + ", point: " + this.getPoint() + ", count: " + this.getCount() + ", modifiers: " + this.getModifiers() + " }"
            }
        }),
        y = (e.extend({
            _class: "Tool",
            _list: "tools",
            _reference: "tool",
            _events: ["onMouseDown", "onMouseUp", "onMouseDrag", "onMouseMove", "onActivate", "onDeactivate", "onEditOptions", "onKeyDown", "onKeyUp"],
            initialize: function(t) {
                e.call(this), this._moveCount = -1, this._downCount = -1, this.set(t)
            },
            getMinDistance: function() {
                return this._minDistance
            },
            setMinDistance: function(t) {
                null != (this._minDistance = t) && null != this._maxDistance && t > this._maxDistance && (this._maxDistance = t)
            },
            getMaxDistance: function() {
                return this._maxDistance
            },
            setMaxDistance: function(t) {
                this._maxDistance = t, null != this._minDistance && null != t && t < this._minDistance && (this._minDistance = t)
            },
            getFixedDistance: function() {
                return this._minDistance == this._maxDistance ? this._minDistance : null
            },
            setFixedDistance: function(t) {
                this._minDistance = this._maxDistance = t
            },
            _handleMouseEvent: function(t, e, a, o) {
                st = this._scope, o.drag && !this.responds(t) && (t = "mousemove");
                var h = o.move || o.drag,
                    i = this.responds(t),
                    n = this.minDistance,
                    r = this.maxDistance,
                    s = !1,
                    u = this;

                function l(t, e) {
                    var i = a,
                        n = h ? u._point : u._downPoint || i;
                    if (h) {
                        if (0 <= u._moveCount && i.equals(n)) return !1;
                        if (n && (null != t || null != e)) {
                            var r = i.subtract(n),
                                s = r.getLength();
                            if (s < (t || 0)) return !1;
                            e && (i = n.add(r.normalize(Math.min(s, e))))
                        }
                        u._moveCount++
                    }
                    return u._point = i, u._lastPoint = n || i, o.down && (u._moveCount = -1, u._downPoint = i, u._downCount++), !0
                }

                function c() {
                    i && (s = u.emit(t, new p(u, t, e)) || s)
                }
                if (o.down) l(), c();
                else if (o.up) l(null, r), c();
                else if (i)
                    for (; l(n, r);) c();
                return s
            }
        }), V.extend(t, {
            _class: "Tween",
            statics: {
                easings: {
                    linear: function(t) {
                        return t
                    },
                    easeInQuad: function(t) {
                        return t * t
                    },
                    easeOutQuad: function(t) {
                        return t * (2 - t)
                    },
                    easeInOutQuad: function(t) {
                        return t < .5 ? 2 * t * t : 2 * (2 - t) * t - 1
                    },
                    easeInCubic: function(t) {
                        return t * t * t
                    },
                    easeOutCubic: function(t) {
                        return --t * t * t + 1
                    },
                    easeInOutCubic: function(t) {
                        return t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
                    },
                    easeInQuart: function(t) {
                        return t * t * t * t
                    },
                    easeOutQuart: function(t) {
                        return 1 - --t * t * t * t
                    },
                    easeInOutQuart: function(t) {
                        return t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t
                    },
                    easeInQuint: function(t) {
                        return t * t * t * t * t
                    },
                    easeOutQuint: function(t) {
                        return 1 + --t * t * t * t * t
                    },
                    easeInOutQuint: function(t) {
                        return t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
                    }
                }
            },
            initialize: function t(e, i, n, r, s, a) {
                this.object = e;
                var o = typeof s,
                    h = "function" === o;
                this.type = h ? o : "string" === o ? s : "linear", this.easing = h ? s : t.easings[this.type], this.duration = r, this.running = !1, this._then = null, this._startTime = null;
                var u = i || n;
                this._keys = u ? Object.keys(u) : [], this._parsedKeys = this._parseKeys(this._keys), this._from = u && this._getState(i), this._to = u && this._getState(n), !1 !== a && this.start()
            },
            then: function(t) {
                return this._then = t, this
            },
            start: function() {
                return this._startTime = null, this.running = !0, this
            },
            stop: function() {
                return this.running = !1, this
            },
            update: function(e) {
                if (this.running) {
                    1 < e && (e = 1, this.running = !1);
                    for (var i = this.easing(e), t = this._keys, n = function(t) {
                            return "function" == typeof t ? t(i, e) : t
                        }, r = 0, s = t && t.length; r < s; r++) {
                        var a = t[r],
                            o = n(this._from[a]),
                            h = n(this._to[a]),
                            u = o && h && o.__add && h.__add ? h.__subtract(o).__multiply(i).__add(o) : (h - o) * i + o;
                        this._setProperty(this._parsedKeys[a], u)
                    }!this.running && this._then && this._then(this.object), this.responds("update") && this.emit("update", new V({
                        progress: e,
                        factor: i
                    }))
                }
                return this
            },
            _events: {
                onUpdate: {}
            },
            _handleFrame: function(t) {
                var e = this._startTime,
                    i = e ? (t - e) / this.duration : 0;
                e || (this._startTime = t), this.update(i)
            },
            _getState: function(t) {
                for (var e = this._keys, i = {}, n = 0, r = e.length; n < r; n++) {
                    var s, a = e[n],
                        o = this._parsedKeys[a],
                        h = this._getProperty(o);
                    if (t) {
                        var u = this._resolveValue(h, t[a]);
                        this._setProperty(o, u), s = (s = this._getProperty(o)) && s.clone ? s.clone() : s, this._setProperty(o, h)
                    } else s = h && h.clone ? h.clone() : h;
                    i[a] = s
                }
                return i
            },
            _resolveValue: function(t, e) {
                if (e) {
                    if (Array.isArray(e) && 2 === e.length) {
                        var i = e[0];
                        return i && i.match && i.match(/^[+\-*/]=/) ? this._calculate(t, i[0], e[1]) : e
                    }
                    if ("string" == typeof e) {
                        var n = e.match(/^[+\-*/]=(.*)/);
                        if (n) {
                            var r = JSON.parse(n[1].replace(/(['"])?([a-zA-Z0-9_]+)(['"])?:/g, '"$2": '));
                            return this._calculate(t, e[0], r)
                        }
                    }
                }
                return e
            },
            _calculate: function(t, e, i) {
                return st.PaperScript.calculateBinary(t, e, i)
            },
            _parseKeys: function(t) {
                for (var e = {}, i = 0, n = t.length; i < n; i++) {
                    var r = t[i],
                        s = r.replace(/\.([^.]*)/g, "/$1").replace(/\[['"]?([^'"\]]*)['"]?\]/g, "/$1");
                    e[r] = s.split("/")
                }
                return e
            },
            _getProperty: function(t, e) {
                for (var i = this.object, n = 0, r = t.length - (e || 0); n < r && i; n++) i = i[t[n]];
                return i
            },
            _setProperty: function(t, e) {
                var i = this._getProperty(t, 1);
                i && (i[t[t.length - 1]] = e)
            }
        })),
        et = function(i) {
            var n = new u.XMLHttpRequest;
            return n.open((i.method || "get").toUpperCase(), i.url, V.pick(i.async, !0)), i.mimeType && n.overrideMimeType(i.mimeType), n.onload = function() {
                var t = n.status;
                0 === t || 200 === t ? i.onLoad && i.onLoad.call(n, n.responseText) : n.onerror()
            }, n.onerror = function() {
                var t = n.status,
                    e = 'Could not load "' + i.url + '" (Status: ' + t + ")";
                if (!i.onError) throw new Error(e);
                i.onError(e, t)
            }, n.send(null)
        },
        it = {
            canvases: [],
            getCanvas: function(t, e) {
                if (!z) return null;
                var i, n = !0;
                "object" == typeof t && (e = t.height, t = t.width), this.canvases.length ? i = this.canvases.pop() : (i = k.createElement("canvas"), n = !1);
                var r = i.getContext("2d");
                if (!r) throw new Error("Canvas " + i + " is unable to provide a 2D context.");
                return i.width === t && i.height === e ? n && r.clearRect(0, 0, t + 1, e + 1) : (i.width = t, i.height = e), r.save(), i
            },
            getContext: function(t, e) {
                var i = this.getCanvas(t, e);
                return i ? i.getContext("2d") : null
            },
            release: function(t) {
                var e = t && t.canvas ? t.canvas : t;
                e && e.getContext && (e.getContext("2d").restore(), this.canvases.push(e))
            }
        },
        x = new function() {
            var g, v, p, m, y, w, x, b, S, C, P, l = Math.min,
                c = Math.max,
                t = Math.abs;

            function f(t, e, i) {
                return .2989 * t + .587 * e + .114 * i
            }

            function e(t, e, i, n) {
                var r = n - f(t, e, i),
                    s = (n = f(S = t + r, C = e + r, P = i + r), l(S, C, P)),
                    a = c(S, C, P);
                if (s < 0) {
                    var o = n - s;
                    S = n + (S - n) * n / o, C = n + (C - n) * n / o, P = n + (P - n) * n / o
                }
                if (255 < a) {
                    var h = 255 - n,
                        u = a - n;
                    S = n + (S - n) * h / u, C = n + (C - n) * h / u, P = n + (P - n) * h / u
                }
            }

            function i(t, e, i) {
                return c(t, e, i) - l(t, e, i)
            }

            function n(t, e, i, n) {
                var r, s = [t, e, i],
                    a = c(t, e, i),
                    o = l(t, e, i);
                r = 0 === l(o = o === t ? 0 : o === e ? 1 : 2, a = a === t ? 0 : a === e ? 1 : 2) ? 1 === c(o, a) ? 2 : 1 : 0, s[a] > s[o] ? (s[r] = (s[r] - s[o]) * n / (s[a] - s[o]), s[a] = n) : s[r] = s[a] = 0, s[o] = 0, S = s[0], C = s[1], P = s[2]
            }
            var I = {
                    multiply: function() {
                        S = y * g / 255, C = w * v / 255, P = x * p / 255
                    },
                    screen: function() {
                        S = y + g - y * g / 255, C = w + v - w * v / 255, P = x + p - x * p / 255
                    },
                    overlay: function() {
                        S = y < 128 ? 2 * y * g / 255 : 255 - 2 * (255 - y) * (255 - g) / 255, C = w < 128 ? 2 * w * v / 255 : 255 - 2 * (255 - w) * (255 - v) / 255, P = x < 128 ? 2 * x * p / 255 : 255 - 2 * (255 - x) * (255 - p) / 255
                    },
                    "soft-light": function() {
                        var t = g * y / 255;
                        S = t + y * (255 - (255 - y) * (255 - g) / 255 - t) / 255, C = (t = v * w / 255) + w * (255 - (255 - w) * (255 - v) / 255 - t) / 255, P = (t = p * x / 255) + x * (255 - (255 - x) * (255 - p) / 255 - t) / 255
                    },
                    "hard-light": function() {
                        S = g < 128 ? 2 * g * y / 255 : 255 - 2 * (255 - g) * (255 - y) / 255, C = v < 128 ? 2 * v * w / 255 : 255 - 2 * (255 - v) * (255 - w) / 255, P = p < 128 ? 2 * p * x / 255 : 255 - 2 * (255 - p) * (255 - x) / 255
                    },
                    "color-dodge": function() {
                        S = 0 === y ? 0 : 255 === g ? 255 : l(255, 255 * y / (255 - g)), C = 0 === w ? 0 : 255 === v ? 255 : l(255, 255 * w / (255 - v)), P = 0 === x ? 0 : 255 === p ? 255 : l(255, 255 * x / (255 - p))
                    },
                    "color-burn": function() {
                        S = 255 === y ? 255 : 0 === g ? 0 : c(0, 255 - 255 * (255 - y) / g), C = 255 === w ? 255 : 0 === v ? 0 : c(0, 255 - 255 * (255 - w) / v), P = 255 === x ? 255 : 0 === p ? 0 : c(0, 255 - 255 * (255 - x) / p)
                    },
                    darken: function() {
                        S = y < g ? y : g, C = w < v ? w : v, P = x < p ? x : p
                    },
                    lighten: function() {
                        S = g < y ? y : g, C = v < w ? w : v, P = p < x ? x : p
                    },
                    difference: function() {
                        (S = y - g) < 0 && (S = -S), (C = w - v) < 0 && (C = -C), (P = x - p) < 0 && (P = -P)
                    },
                    exclusion: function() {
                        S = y + g * (255 - y - y) / 255, C = w + v * (255 - w - w) / 255, P = x + p * (255 - x - x) / 255
                    },
                    hue: function() {
                        n(g, v, p, i(y, w, x)), e(S, C, P, f(y, w, x))
                    },
                    saturation: function() {
                        n(y, w, x, i(g, v, p)), e(S, C, P, f(y, w, x))
                    },
                    luminosity: function() {
                        e(y, w, x, f(g, v, p))
                    },
                    color: function() {
                        e(g, v, p, f(y, w, x))
                    },
                    add: function() {
                        S = l(y + g, 255), C = l(w + v, 255), P = l(x + p, 255)
                    },
                    subtract: function() {
                        S = c(y - g, 0), C = c(w - v, 0), P = c(x - p, 0)
                    },
                    average: function() {
                        S = (y + g) / 2, C = (w + v) / 2, P = (x + p) / 2
                    },
                    negation: function() {
                        S = 255 - t(255 - g - y), C = 255 - t(255 - v - w), P = 255 - t(255 - p - x)
                    }
                },
                M = this.nativeModes = V.each(["source-over", "source-in", "source-out", "source-atop", "destination-over", "destination-in", "destination-out", "destination-atop", "lighter", "darker", "copy", "xor"], function(t) {
                    this[t] = !0
                }, {}),
                r = it.getContext(1, 1);
            r && (V.each(I, function(t, e) {
                var i = "darken" === e,
                    n = !1;
                r.save();
                try {
                    r.fillStyle = i ? "#300" : "#a00", r.fillRect(0, 0, 1, 1), r.globalCompositeOperation = e, r.globalCompositeOperation === e && (r.fillStyle = i ? "#a00" : "#300", r.fillRect(0, 0, 1, 1), n = r.getImageData(0, 0, 1, 1).data[0] !== i ? 170 : 51)
                } catch (t) {}
                r.restore(), M[e] = n
            }), it.release(r)), this.process = function(t, e, i, n, r) {
                var s = e.canvas,
                    a = "normal" === t;
                if (a || M[t]) i.save(), i.setTransform(1, 0, 0, 1, 0, 0), i.globalAlpha = n, a || (i.globalCompositeOperation = t), i.drawImage(s, r.x, r.y), i.restore();
                else {
                    var o = I[t];
                    if (!o) return;
                    for (var h = i.getImageData(r.x, r.y, s.width, s.height), u = h.data, l = e.getImageData(0, 0, s.width, s.height).data, c = 0, f = u.length; c < f; c += 4) {
                        g = l[c], y = u[c], v = l[c + 1], w = u[c + 1], p = l[c + 2], x = u[c + 2], m = l[c + 3], b = u[c + 3], o();
                        var d = m * n / 255,
                            _ = 1 - d;
                        u[c] = d * S + _ * y, u[c + 1] = d * C + _ * w, u[c + 2] = d * P + _ * x, u[c + 3] = m * n + _ * b
                    }
                    i.putImageData(h, r.x, r.y)
                }
            }
        },
        nt = new function() {
            var n = "http://www.w3.org/2000/svg",
                t = "http://www.w3.org/2000/xmlns",
                e = "http://www.w3.org/1999/xlink",
                a = {
                    href: e,
                    xlink: t,
                    xmlns: t + "/",
                    "xmlns:xlink": t + "/"
                };

            function r(t, e, i) {
                for (var n in e) {
                    var r = e[n],
                        s = a[n];
                    "number" == typeof r && i && (r = i.number(r)), s ? t.setAttributeNS(s, n, r) : t.setAttribute(n, r)
                }
                return t
            }
            return {
                svg: n,
                xmlns: t,
                xlink: e,
                create: function(t, e, i) {
                    return r(k.createElementNS(n, t), e, i)
                },
                get: function(t, e) {
                    var i = a[e],
                        n = i ? t.getAttributeNS(i, e) : t.getAttribute(e);
                    return "null" === n ? null : n
                },
                set: r
            }
        },
        rt = V.each({
            fillColor: ["fill", "color"],
            fillRule: ["fill-rule", "string"],
            strokeColor: ["stroke", "color"],
            strokeWidth: ["stroke-width", "number"],
            strokeCap: ["stroke-linecap", "string"],
            strokeJoin: ["stroke-linejoin", "string"],
            strokeScaling: ["vector-effect", "lookup", {
                true: "none",
                false: "non-scaling-stroke"
            }, function(t, e) {
                return !e && (t instanceof L || t instanceof P || t instanceof h)
            }],
            miterLimit: ["stroke-miterlimit", "number"],
            dashArray: ["stroke-dasharray", "array"],
            dashOffset: ["stroke-dashoffset", "number"],
            fontFamily: ["font-family", "string"],
            fontWeight: ["font-weight", "string"],
            fontSize: ["font-size", "number"],
            justification: ["text-anchor", "lookup", {
                left: "start",
                center: "middle",
                right: "end"
            }],
            opacity: ["opacity", "number"],
            blendMode: ["mix-blend-mode", "style"]
        }, function(t, e) {
            var i = V.capitalize(e),
                n = t[2];
            this[e] = {
                type: t[1],
                property: e,
                attribute: t[0],
                toSVG: n,
                fromSVG: n && V.each(n, function(t, e) {
                    this[t] = e
                }, {}),
                exportFilter: t[3],
                get: "get" + i,
                set: "set" + i
            }
        }, {});
    new function() {
        var g;

        function f(t, e, i) {
            var n = new V,
                r = t.getTranslation();
            if (e) {
                var s = (t = t._shiftless())._inverseTransform(r);
                n[i ? "cx" : "x"] = s.x, n[i ? "cy" : "y"] = s.y, r = null
            }
            if (!t.isIdentity()) {
                var a = t.decompose();
                if (a) {
                    var o = [],
                        h = a.rotation,
                        u = a.scaling,
                        l = a.skewing;
                    r && !r.isZero() && o.push("translate(" + g.point(r) + ")"), h && o.push("rotate(" + g.number(h) + ")"), H.isZero(u.x - 1) && H.isZero(u.y - 1) || o.push("scale(" + g.point(u) + ")"), l.x && o.push("skewX(" + g.number(l.x) + ")"), l.y && o.push("skewY(" + g.number(l.y) + ")"), n.transform = o.join(" ")
                } else n.transform = "matrix(" + t.getValues().join(",") + ")"
            }
            return n
        }

        function t(t, e) {
            for (var i = f(t._matrix), n = t._children, r = nt.create("g", i, g), s = 0, a = n.length; s < a; s++) {
                var o = n[s],
                    h = m(o, e);
                if (h)
                    if (o.isClipMask()) {
                        var u = nt.create("clipPath");
                        u.appendChild(h), p(o, u, "clip"), nt.set(r, {
                            "clip-path": "url(#" + u.id + ")"
                        })
                    } else r.appendChild(h)
            }
            return r
        }

        function d(t) {
            var e = t._type,
                i = t._radius,
                n = f(t._matrix, !0, "rectangle" !== e);
            if ("rectangle" === e) {
                e = "rect";
                var r = t._size,
                    s = r.width,
                    a = r.height;
                n.x -= s / 2, n.y -= a / 2, n.width = s, n.height = a, i.isZero() && (i = null)
            }
            return i && ("circle" === e ? n.r = i : (n.rx = i.width, n.ry = i.height)), nt.create(e, n, g)
        }
        var s, o = {
            Group: t,
            Layer: t,
            Raster: function(t, e) {
                var i = f(t._matrix, !0),
                    n = t.getSize(),
                    r = t.getImage();
                return i.x -= n.width / 2, i.y -= n.height / 2, i.width = n.width, i.height = n.height, i.href = 0 == e.embedImages && r && r.src || t.toDataURL(), nt.create("image", i, g)
            },
            Path: function(t, e) {
                var i = e.matchShapes;
                if (i) {
                    var n = t.toShape(!1);
                    if (n) return d(n)
                }
                var r, s = t._segments,
                    a = s.length,
                    o = f(t._matrix);
                if (i && 2 <= a && !t.hasHandles())
                    if (2 < a) {
                        r = t._closed ? "polygon" : "polyline";
                        for (var h = [], u = 0; u < a; u++) h.push(g.point(s[u]._point));
                        o.points = h.join(" ")
                    } else {
                        r = "line";
                        var l = s[0]._point,
                            c = s[1]._point;
                        o.set({
                            x1: l.x,
                            y1: l.y,
                            x2: c.x,
                            y2: c.y
                        })
                    }
                else r = "path", o.d = t.getPathData(null, e.precision);
                return nt.create(r, o, g)
            },
            Shape: d,
            CompoundPath: function(t, e) {
                var i = f(t._matrix),
                    n = t.getPathData(null, e.precision);
                return n && (i.d = n), nt.create("path", i, g)
            },
            SymbolItem: function(t, e) {
                var i = f(t._matrix, !0),
                    n = t._definition,
                    r = v(n, "symbol"),
                    s = n._item,
                    a = s.getBounds();
                return r || ((r = nt.create("symbol", {
                    viewBox: g.rectangle(a)
                })).appendChild(m(s, e)), p(n, r, "symbol")), i.href = "#" + r.id, i.x += a.x, i.y += a.y, i.width = a.width, i.height = a.height, i.overflow = "visible", nt.create("use", i, g)
            },
            PointText: function(t) {
                var e = nt.create("text", f(t._matrix, !0), g);
                return e.textContent = t._content, e
            }
        };

        function h(s, t, e) {
            var a = {},
                o = !e && s.getParent(),
                h = [];
            return null != s._name && (a.id = s._name), V.each(rt, function(t) {
                var e = t.get,
                    i = t.type,
                    n = s[e]();
                if (t.exportFilter ? t.exportFilter(s, n) : !o || !V.equals(o[e](), n)) {
                    if ("color" === i && null != n) {
                        var r = n.getAlpha();
                        r < 1 && (a[t.attribute + "-opacity"] = r)
                    }
                    "style" === i ? h.push(t.attribute + ": " + n) : a[t.attribute] = null == n ? "none" : "color" === i ? n.gradient ? function(t) {
                        var e = v(t, "color");
                        if (!e) {
                            var i, n = t.getGradient(),
                                r = n._radial,
                                s = t.getOrigin(),
                                a = t.getDestination();
                            if (r) {
                                i = {
                                    cx: s.x,
                                    cy: s.y,
                                    r: s.getDistance(a)
                                };
                                var o = t.getHighlight();
                                o && (i.fx = o.x, i.fy = o.y)
                            } else i = {
                                x1: s.x,
                                y1: s.y,
                                x2: a.x,
                                y2: a.y
                            };
                            i.gradientUnits = "userSpaceOnUse", e = nt.create((r ? "radial" : "linear") + "Gradient", i, g);
                            for (var h = n._stops, u = 0, l = h.length; u < l; u++) {
                                var c = h[u],
                                    f = c._color,
                                    d = f.getAlpha(),
                                    _ = c._offset;
                                i = {
                                    offset: null == _ ? u / (l - 1) : _
                                }, f && (i["stop-color"] = f.toCSS(!0)), d < 1 && (i["stop-opacity"] = d), e.appendChild(nt.create("stop", i, g))
                            }
                            p(t, e, "color")
                        }
                        return "url(#" + e.id + ")"
                    }(n) : n.toCSS(!0) : "array" === i ? n.join(",") : "lookup" === i ? t.toSVG[n] : n
                }
            }), h.length && (a.style = h.join(";")), 1 === a.opacity && delete a.opacity, s._visible || (a.visibility = "hidden"), nt.set(t, a, g)
        }

        function v(t, e) {
            return s || (s = {
                ids: {},
                svgs: {}
            }), t && s.svgs[e + "-" + (t._id || t.__id || (t.__id = l.get("svg")))]
        }

        function p(t, e, i) {
            s || v();
            var n = s.ids[i] = (s.ids[i] || 0) + 1;
            e.id = i + "-" + n, s.svgs[i + "-" + (t._id || t.__id)] = e
        }

        function _(t, e) {
            var i = t,
                n = null;
            if (s) {
                for (var r in i = "svg" === t.nodeName.toLowerCase() && t, s.svgs) n || (i || (i = nt.create("svg")).appendChild(t), n = i.insertBefore(nt.create("defs"), i.firstChild)), n.appendChild(s.svgs[r]);
                s = null
            }
            return e.asString ? (new u.XMLSerializer).serializeToString(i) : i
        }

        function m(t, e, i) {
            var n = o[t._class],
                r = n && n(t, e);
            if (r) {
                var s = e.onExport;
                s && (r = s(t, r, e) || r);
                var a = JSON.stringify(t._data);
                a && "{}" !== a && "null" !== a && r.setAttribute("data-paper-data", a)
            }
            return r && h(t, r, i)
        }

        function y(t) {
            return t || (t = {}), g = new b(t.precision), t
        }
        O.inject({
            exportSVG: function(t) {
                return _(m(this, t = y(t), !0), t)
            }
        }), S.inject({
            exportSVG: function(t) {
                t = y(t);
                var e = this._children,
                    i = this.getView(),
                    n = V.pick(t.bounds, "view"),
                    r = t.matrix || "view" === n && i._matrix,
                    s = r && W.read([r]),
                    a = "view" === n ? new T([0, 0], i.getViewSize()) : "content" === n ? O._getBounds(e, s, {
                        stroke: !0
                    }).rect : T.read([n], 0, {
                        readNull: !0
                    }),
                    o = {
                        version: "1.1",
                        xmlns: nt.svg,
                        "xmlns:xlink": nt.xlink
                    };
                a && (o.width = a.width, o.height = a.height, (a.x || a.y) && (o.viewBox = g.rectangle(a)));
                var h = nt.create("svg", o, g),
                    u = h;
                s && !s.isIdentity() && (u = h.appendChild(nt.create("g", f(s), g)));
                for (var l = 0, c = e.length; l < c; l++) u.appendChild(m(e[l], t, !0));
                return _(h, t)
            }
        })
    }, new function() {
        var v, p = {};

        function _(t, e, i, n, r) {
            var s = nt.get(t, e),
                a = null == s ? n ? null : i ? "" : 0 : i ? s : parseFloat(s);
            return /%\s*$/.test(s) ? a / 100 * (r ? 1 : v[/x|^width/.test(e) ? "width" : "height"]) : a
        }

        function g(t, e, i, n, r) {
            return e = _(t, e || "x", !1, n, r), i = _(t, i || "y", !1, n, r), !n || null != e && null != i ? new Z(e, i) : null
        }

        function m(t, e, i, n, r) {
            return e = _(t, e || "width", !1, n, r), i = _(t, i || "height", !1, n, r), !n || null != e && null != i ? new U(e, i) : null
        }

        function c(t, e, i) {
            return "none" === t ? null : "number" === e ? parseFloat(t) : "array" === e ? t ? t.split(/[\s,]+/g).map(parseFloat) : [] : "color" === e ? s(t) || t : "lookup" === e ? i[t] : t
        }

        function r(t, e, i, n) {
            var r = t.childNodes,
                s = "clippath" === e,
                a = "defs" === e,
                o = new C,
                h = o._project,
                u = h._currentStyle,
                l = [];
            if (s || a || (o = w(o, t, n), h._currentStyle = o._style.clone()), n)
                for (var c = t.querySelectorAll("defs"), f = 0, d = c.length; f < d; f++) x(c[f], i, !1);
            for (f = 0, d = r.length; f < d; f++) {
                var _, g = r[f];
                1 !== g.nodeType || /^defs$/i.test(g.nodeName) || !(_ = x(g, i, !1)) || _ instanceof M || l.push(_)
            }
            return o.addChildren(l), s && (o = w(o.reduce(), t, n)), h._currentStyle = u, (s || a) && (o.remove(), o = null), o
        }

        function t(t, e) {
            for (var i = t.getAttribute("points").match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g), n = [], r = 0, s = i.length; r < s; r += 2) n.push(new Z(parseFloat(i[r]), parseFloat(i[r + 1])));
            var a = new F(n);
            return "polygon" === e && a.closePath(), a
        }

        function e(t, e) {
            var i, n = (_(t, "href", !0) || "").substring(1),
                r = "radialgradient" === e;
            if (n)(i = p[n].getGradient())._radial ^ r && ((i = i.clone())._radial = r);
            else {
                for (var s = t.childNodes, a = [], o = 0, h = s.length; o < h; o++) {
                    var u = s[o];
                    1 === u.nodeType && a.push(w(new R, u))
                }
                i = new E(a, r)
            }
            var l, c, f, d = "userSpaceOnUse" !== _(t, "gradientUnits", !0);
            return r ? (c = (l = g(t, "cx", "cy", !1, d)).add(_(t, "r", !1, !1, d), 0), f = g(t, "fx", "fy", !0, d)) : (l = g(t, "x1", "y1", !1, d), c = g(t, "x2", "y2", !1, d)), w(new B(i, l, c, f), t)._scaleToBounds = d, null
        }
        var y = {
            "#document": function(t, e, i, n) {
                for (var r = t.childNodes, s = 0, a = r.length; s < a; s++) {
                    var o = r[s];
                    if (1 === o.nodeType) return x(o, i, n)
                }
            },
            g: r,
            svg: r,
            clippath: r,
            polygon: t,
            polyline: t,
            path: function(t) {
                return L.create(t.getAttribute("d"))
            },
            lineargradient: e,
            radialgradient: e,
            image: function(i) {
                var t = new I(_(i, "href", !0));
                return t.on("load", function() {
                    var t = m(i);
                    this.setSize(t);
                    var e = g(i).add(t.divide(2));
                    this._matrix.append((new W).translate(e))
                }), t
            },
            symbol: function(t, e, i, n) {
                return new M(r(t, e, i, n), !0)
            },
            defs: r,
            use: function(t) {
                var e = (_(t, "href", !0) || "").substring(1),
                    i = p[e],
                    n = g(t);
                return i ? i instanceof M ? i.place(n) : i.clone().translate(n) : null
            },
            circle: function(t) {
                return new P.Circle(g(t, "cx", "cy"), _(t, "r"))
            },
            ellipse: function(t) {
                return new P.Ellipse({
                    center: g(t, "cx", "cy"),
                    radius: m(t, "rx", "ry")
                })
            },
            rect: function(t) {
                return new P.Rectangle(new T(g(t), m(t)), m(t, "rx", "ry"))
            },
            line: function(t) {
                return new F.Line(g(t, "x1", "y1"), g(t, "x2", "y2"))
            },
            text: function(t) {
                var e = new N(g(t).add(g(t, "dx", "dy")));
                return e.setContent(t.textContent.trim() || ""), e
            }
        };

        function i(t, e, i, n) {
            if (t.transform) {
                for (var r = (n.getAttribute(i) || "").split(/\)\s*/g), s = new W, a = 0, o = r.length; a < o; a++) {
                    var h = r[a];
                    if (!h) break;
                    for (var u = h.split(/\(\s*/), l = u[0], c = u[1].split(/[\s,]+/g), f = 0, d = c.length; f < d; f++) c[f] = parseFloat(c[f]);
                    switch (l) {
                        case "matrix":
                            s.append(new W(c[0], c[1], c[2], c[3], c[4], c[5]));
                            break;
                        case "rotate":
                            s.rotate(c[0], c[1] || 0, c[2] || 0);
                            break;
                        case "translate":
                            s.translate(c[0], c[1] || 0);
                            break;
                        case "scale":
                            s.scale(c);
                            break;
                        case "skewX":
                            s.skew(c[0], 0);
                            break;
                        case "skewY":
                            s.skew(0, c[0])
                    }
                }
                t.transform(s)
            }
        }

        function n(t, e, i) {
            var n = "fill-opacity" === i ? "getFillColor" : "getStrokeColor",
                r = t[n] && t[n]();
            r && r.setAlpha(parseFloat(e))
        }
        var a = V.set(V.each(rt, function(r) {
            this[r.attribute] = function(t, e) {
                if (t[r.set] && (t[r.set](c(e, r.type, r.fromSVG)), "color" === r.type)) {
                    var i = t[r.get]();
                    if (i && i._scaleToBounds) {
                        var n = t.getBounds();
                        i.transform((new W).translate(n.getPoint()).scale(n.getSize()))
                    }
                }
            }
        }, {}), {
            id: function(t, e) {
                (p[e] = t).setName && t.setName(e)
            },
            "clip-path": function(t, e) {
                var i = s(e);
                if (i) {
                    if ((i = i.clone()).setClipMask(!0), !(t instanceof C)) return new C(i, t);
                    t.insertChild(0, i)
                }
            },
            gradientTransform: i,
            transform: i,
            "fill-opacity": n,
            "stroke-opacity": n,
            visibility: function(t, e) {
                t.setVisible && t.setVisible("visible" === e)
            },
            display: function(t, e) {
                t.setVisible && t.setVisible(null !== e)
            },
            "stop-color": function(t, e) {
                t.setColor && t.setColor(e)
            },
            "stop-opacity": function(t, e) {
                t._color && t._color.setAlpha(parseFloat(e))
            },
            offset: function(t, e) {
                if (t.setOffset) {
                    var i = e.match(/(.*)%$/);
                    t.setOffset(i ? i[1] / 100 : parseFloat(e))
                }
            },
            viewBox: function(t, e, i, n, r) {
                var s, a = new T(c(e, "array")),
                    o = m(n, null, null, !0);
                if (t instanceof C) {
                    var h = o ? o.divide(a.getSize()) : 1,
                        u = (new W).scale(h).translate(a.getPoint().negate());
                    s = t
                } else t instanceof M && (o && a.setSize(o), s = t._item);
                if (s) {
                    if ("visible" !== f(n, "overflow", r)) {
                        var l = new P.Rectangle(a);
                        l.setClipMask(!0), s.addChild(l)
                    }
                    u && s.transform(u)
                }
            }
        });

        function f(t, e, i) {
            var n = t.attributes[e],
                r = n && n.value;
            if (!r && t.style) {
                var s = V.camelize(e);
                (r = t.style[s]) || i.node[s] === i.parent[s] || (r = i.node[s])
            }
            return r ? "none" === r ? null : r : q
        }

        function w(n, r, t) {
            var e = r.parentNode,
                s = {
                    node: K.getStyles(r) || {},
                    parent: !t && !/^defs$/i.test(e.tagName) && K.getStyles(e) || {}
                };
            return V.each(a, function(t, e) {
                var i = f(r, e, s);
                n = i !== q && t(n, i, e, r, s) || n
            }), n
        }

        function s(t) {
            var e = t && t.match(/\((?:["'#]*)([^"')]+)/),
                i = e && e[1],
                n = i && p[z ? i.replace(z.location.href.split("#")[0] + "#", "") : i];
            return n && n._scaleToBounds && ((n = n.clone())._scaleToBounds = !0), n
        }

        function x(t, e, i) {
            var n, r, s, a = t.nodeName.toLowerCase(),
                o = "#document" !== a,
                h = k.body;
            i && o && (v = st.getView().getSize(), v = m(t, null, null, !0) || v, n = nt.create("svg", {
                style: "stroke-width: 1px; stroke-miterlimit: 10"
            }), r = t.parentNode, s = t.nextSibling, n.appendChild(t), h.appendChild(n));
            var u = st.settings,
                l = u.applyMatrix,
                c = u.insertItems;
            u.applyMatrix = !1, u.insertItems = !1;
            var f = y[a],
                d = f && f(t, a, e, i) || null;
            if (u.insertItems = c, u.applyMatrix = l, d) {
                !o || d instanceof C || (d = w(d, t, i));
                var _ = e.onImport,
                    g = o && t.getAttribute("data-paper-data");
                _ && (d = _(t, d, e) || d), e.expandShapes && d instanceof P && (d.remove(), d = d.toPath()), g && (d._data = JSON.parse(g))
            }
            return n && (h.removeChild(n), r && (s ? r.insertBefore(t, s) : r.appendChild(t))), i && (p = {}, d && V.pick(e.applyMatrix, l) && d.matrix.apply(!0, !0)), d
        }

        function o(n, r, s) {
            if (!n) return null;
            r = "function" == typeof r ? {
                onLoad: r
            } : r || {};
            var a = st,
                o = null;

            function t(t) {
                try {
                    var e = "object" == typeof t ? t : (new u.DOMParser).parseFromString(t, "image/svg+xml");
                    if (!e.nodeName) throw e = null, new Error("Unsupported SVG source: " + n);
                    st = a, o = x(e, r, !0), r && !1 === r.insert || s._insertItem(q, o);
                    var i = r.onLoad;
                    i && i(o, t)
                } catch (t) {
                    h(t)
                }
            }

            function h(t, e) {
                var i = r.onError;
                if (!i) throw new Error(t);
                i(t, e)
            }
            if ("string" != typeof n || /^.*</.test(n)) {
                if ("undefined" != typeof File && n instanceof File) {
                    var e = new FileReader;
                    return e.onload = function() {
                        t(e.result)
                    }, e.onerror = function() {
                        h(e.error)
                    }, e.readAsText(n)
                }
                t(n)
            } else {
                var i = k.getElementById(n);
                i ? t(i) : et({
                    url: n,
                    async: !0,
                    onLoad: t,
                    onError: h
                })
            }
            return o
        }
        O.inject({
            importSVG: function(t, e) {
                return o(t, e, this)
            }
        }), S.inject({
            importSVG: function(t, e) {
                return this.activate(), o(t, e, this)
            }
        })
    };
    var st = new(c.inject(V.exports, {
        Base: V,
        Numerical: H,
        Key: v,
        DomEvent: Q,
        DomElement: K,
        document: k,
        window: z,
        Symbol: M,
        PlacedSymbol: a
    }));
    return st.agent.node && require("./node/extend.js")(st), "function" == typeof define && define.amd ? define("paper", st) : "object" == typeof module && module && (module.exports = st), st
}.call(this, "object" == typeof self ? self : null);