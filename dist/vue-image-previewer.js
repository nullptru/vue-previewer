(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.VuePreviewer = factory());
}(this, function () { 'use strict';

  //
  //
  //
  //
  //
  //
  //
  //
  //
  var script = {
    name: 'Icon',
    props: {
      mode: {
        type: String,
        default: 'svg' // icon | svg

      },
      type: {
        type: String,
        required: true
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent;

  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

  function createInjector(context) {
    return function (id, style) {
      return addStyle(id, style);
    };
  }

  var HEAD;
  var styles = {};

  function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: new Set(),
      styles: []
    });

    if (!style.ids.has(id)) {
      style.ids.add(id);
      var code = css.source;

      if (css.map) {
        // https://developer.chrome.com/devtools/docs/javascript-debugging
        // this makes source maps inside style tags work properly in Chrome
        code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

        code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
      }

      if (!style.element) {
        style.element = document.createElement('style');
        style.element.type = 'text/css';
        if (css.media) style.element.setAttribute('media', css.media);

        if (HEAD === undefined) {
          HEAD = document.head || document.getElementsByTagName('head')[0];
        }

        HEAD.appendChild(style.element);
      }

      if ('styleSheet' in style.element) {
        style.styles.push(code);
        style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
      } else {
        var index = style.ids.size - 1;
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) style.element.removeChild(nodes[index]);
        if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
      }
    }
  }

  var browser = createInjector;

  /* script */
  const __vue_script__ = script;

  /* template */
  var __vue_render__ = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "span",
      _vm._g(_vm._b({}, "span", _vm.$attrs, false), _vm.$listeners),
      [
        _vm.mode === "svg"
          ? [
              _c(
                "svg",
                { staticClass: "icon", attrs: { "aria-hidden": "true" } },
                [_c("use", { attrs: { "xlink:href": "#icon-" + _vm.type } })]
              )
            ]
          : [_c("i", { staticClass: "icon iconfont", class: _vm.type })]
      ],
      2
    )
  };
  var __vue_staticRenderFns__ = [];
  __vue_render__._withStripped = true;

    /* style */
    const __vue_inject_styles__ = function (inject) {
      if (!inject) return
      inject("data-v-4c92887d_0", { source: "\n.icon[data-v-4c92887d] {\n  width: 1em;\n  height: 1em;\n  vertical-align: -0.15em;\n  fill: currentColor;\n  overflow: hidden;\n}\n", map: {"version":3,"sources":["/Users/Geass/Desktop/Project/vue-preview/src/components/Icon.vue"],"names":[],"mappings":";AA0BA;EACA,UAAA;EACA,WAAA;EACA,uBAAA;EACA,kBAAA;EACA,gBAAA;AACA","file":"Icon.vue","sourcesContent":["<template lang=\"pug\">\n  span(v-bind=\"$attrs\" v-on=\"$listeners\")\n    template(v-if=\"mode==='svg'\")\n      svg.icon(aria-hidden=\"true\")\n        use(:xlink:href=\"`#icon-${type}`\")\n    template(v-else)\n      i.icon.iconfont(:class=\"type\")\n</template>\n\n<script>\nexport default {\n  name: 'Icon',\n  props: {\n    mode: {\n      type: String,\n      default: 'svg' // icon | svg\n    },\n    type: {\n      type: String,\n      required: true\n    }\n  }\n}\n</script>\n\n<style scoped>\n.icon {\n  width: 1em;\n  height: 1em;\n  vertical-align: -0.15em;\n  fill: currentColor;\n  overflow: hidden;\n}\n</style>\n\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__ = "data-v-4c92887d";
    /* module identifier */
    const __vue_module_identifier__ = undefined;
    /* functional template */
    const __vue_is_functional_template__ = false;
    /* style inject SSR */
    

    
    var Icon = normalizeComponent_1(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      browser,
      undefined
    );

  //
  const defaultOptions = {
    defaultWidth: '100px',
    defaultHeight: '75px',
    thumbnailStyle: {
      backgroundSize: 'cover'
    },
    keyMap: {
      zoomin: '+',
      zoomout: '-',
      rotate: 'r',
      prev: 'ArrowLeft',
      next: 'ArrowRight'
    }
  };
  var script$1 = {
    name: 'VuePreviewer',
    props: {
      images: {
        type: Array,
        default: () => []
      },
      mode: {
        type: String,
        default: 'image'
      },
      options: {
        type: Object,
        default: () => ({})
      },
      showFooter: {
        type: Boolean,
        default: true
      }
    },
    components: {
      Icon
    },

    data() {
      return {
        inIframe: window.self !== window.top,
        currentIndex: -1,
        isShowPre: false,
        // operation
        scaleRate: 1,
        rotateRate: 0,
        cursorStyle: 'zoom-in'
      };
    },

    computed: {
      imageList() {
        return this.normalizeImage(this.images, {
          sWidth: this.componentOptions.defaultWidth,
          sHeight: this.componentOptions.defaultHeight
        });
      },

      componentOptions() {
        return { ...this.$global_vue_image_previewer_options,
          ...defaultOptions,
          ...this.options
        };
      }

    },

    mounted() {
      document.addEventListener('keydown', this.onKey);
    },

    destroyed() {
      document.removeEventListener('keydown', this.onKey);
    },

    methods: {
      onKey(key) {
        const {
          keyMap = {}
        } = this.componentOptions;

        switch (key.key) {
          case keyMap.prev:
            this.prevClick();
            break;

          case keyMap.next:
            this.nextClick();
            break;

          case keyMap.zoomin:
            this.zoomin();
            break;

          case keyMap.zoomout:
            this.zoomout();
            break;

          case keyMap.rotate:
            this.rotate();
        }
      },

      normalizeImage(imgs, {
        sWidth,
        sHeight
      }) {
        return imgs.map((img, idx) => {
          // only src source
          if (typeof img === 'string') {
            return {
              width: sWidth,
              height: sHeight,
              src: img,
              thumbnailSrc: img,
              name: `Image ${idx + 1}`
            };
          } else {
            return {
              width: img.width || sWidth,
              height: img.height || sHeight,
              src: img.src,
              thumbnailSrc: img.thumbnailSrc || img.src,
              name: img.name
            };
          }
        });
      },

      onImageClick({
        target
      }) {
        if (target.nodeName === 'IMG' || target.getAttribute('name') === 'img') {
          this.currentIndex = +target.dataset['index'];
          this.isShowPre = true;
          this.$nextTick(() => {
            this.$refs['selectImg'].focus();
          });
          this.$emit('select', this.imageList[this.currentIndex]);
        }
      },

      zoomin() {
        this.scaleRate += 0.5;
      },

      zoomout() {
        this.scaleRate -= 0.25;
        this.scaleRate = Math.max(this.scaleRate, 0.25);
      },

      rotate() {
        this.rotateRate += 90;
      },

      toggleFullscreen() {
        const isFullscreen = document.fullscreenElement || document.msFullscreenElement || document.mozFullscreenElement || document.webkitFullscreenElement || false;

        if (isFullscreen) {
          this.exitFullscreen();
        } else {
          this.enterFullscreen();
        }
      },

      exitFullscreen() {
        const el = document.documentElement;
        const rfs = el.cancelFullscreen || el.webkitExitFullscreen || el.mozCancelFullscreen || el.exitFullscreen;

        if (rfs) {
          rfs.call(el);
        } else {
          console.error("Your browser seems doesn't support fullscreen");
        }
      },

      enterFullscreen() {
        const el = document.documentElement;
        const rfs = el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullscreen || el.msRequestFullscreen;

        if (rfs) {
          rfs.call(el);
        } else {
          console.error("Your browser seems doesn't support fullscreen");
        }
      },

      imageClick() {
        if (this.cursorStyle === 'zoom-in') {
          this.cursorStyle = 'zoom-out';
          this.scaleRate += 0.5;
        } else {
          this.cursorStyle = 'zoom-in';
          this.scaleRate -= 0.5;
        }
      },

      prevClick() {
        if (this.currentIndex > 0) {
          this.$refs['selectImg'].classList.add('select-img');
          this.currentIndex -= 1;
          this.resetRate();
          setTimeout(() => {
            this.$refs['selectImg'].classList.remove('select-img');
          });
        }
      },

      nextClick() {
        if (this.currentIndex < this.imageList.length - 1) {
          this.$refs['selectImg'].classList.add('select-img');
          this.currentIndex += 1;
          this.resetRate();
          setTimeout(() => {
            this.$refs['selectImg'].classList.remove('select-img');
          });
        }
      },

      close() {
        this.currentIndex = -1;
        this.isShowPre = false;
        this.resetRate();
        this.$emit('close');
      },

      resetRate() {
        this.scaleRate = 1;
        this.rotateRate = 0;
      }

    }
  };

  /* script */
  const __vue_script__$1 = script$1;

  /* template */
  var __vue_render__$1 = function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c(
      "section",
      { staticClass: "vue-preview", on: { keydown: _vm.onKey } },
      [
        _c(
          "section",
          { staticClass: "list", on: { click: _vm.onImageClick } },
          _vm._l(_vm.imageList, function(img, index) {
            return _c(
              "span",
              { key: index, staticClass: "list__img" },
              [
                _vm.mode === "image"
                  ? [
                      _c("img", {
                        style: _vm.componentOptions.thumbnailStyle,
                        attrs: {
                          src: img.thumbnailSrc,
                          width: img.width,
                          height: img.height,
                          "data-index": index
                        }
                      })
                    ]
                  : [
                      _c(
                        "span",
                        {
                          staticClass: "link",
                          attrs: { name: "img", "data-index": index }
                        },
                        [_vm._v(_vm._s(img.name))]
                      )
                    ]
              ],
              2
            )
          }),
          0
        ),
        ~_vm.currentIndex && _vm.isShowPre
          ? _c("div", { staticClass: "pre-container" }, [
              _c("header", { staticClass: "pre__header" }, [
                _c("div", [
                  _vm._v(
                    _vm._s(_vm.currentIndex + 1) +
                      "/" +
                      _vm._s(_vm.imageList.length)
                  )
                ]),
                _c(
                  "section",
                  [
                    !_vm.inIframe
                      ? _c("icon", {
                          staticClass: "icon",
                          attrs: { type: "zoom" },
                          on: { click: _vm.toggleFullscreen }
                        })
                      : _vm._e(),
                    _c("icon", {
                      staticClass: "icon",
                      attrs: { type: "zoomin" },
                      on: { click: _vm.zoomin }
                    }),
                    _c("icon", {
                      staticClass: "icon",
                      attrs: { type: "zoomout" },
                      on: { click: _vm.zoomout }
                    }),
                    _c("icon", {
                      staticClass: "icon",
                      attrs: { type: "rotate" },
                      on: { click: _vm.rotate }
                    }),
                    _c("icon", {
                      staticClass: "icon",
                      attrs: { type: "close" },
                      on: { click: _vm.close }
                    })
                  ],
                  1
                )
              ]),
              _c(
                "div",
                {
                  staticClass: "pre__content",
                  on: {
                    click: function($event) {
                      $event.preventDefault();
                      $event.stopPropagation();
                      return _vm.close($event)
                    }
                  }
                },
                [
                  _vm.currentIndex
                    ? _c("icon", {
                        staticClass: "prev",
                        attrs: { type: "prev" },
                        on: {
                          click: function($event) {
                            $event.preventDefault();
                            $event.stopPropagation();
                            return _vm.prevClick($event)
                          }
                        }
                      })
                    : _vm._e(),
                  _vm.currentIndex < _vm.imageList.length - 1
                    ? _c("icon", {
                        staticClass: "next",
                        attrs: { type: "next" },
                        on: {
                          click: function($event) {
                            $event.preventDefault();
                            $event.stopPropagation();
                            return _vm.nextClick($event)
                          }
                        }
                      })
                    : _vm._e(),
                  _c(
                    "span",
                    {
                      ref: "selectImg",
                      style: {
                        cursor: _vm.cursorStyle,
                        transform:
                          "scale(" +
                          _vm.scaleRate +
                          ") rotate(" +
                          _vm.rotateRate +
                          "deg)"
                      },
                      on: {
                        click: function($event) {
                          $event.preventDefault();
                          $event.stopPropagation();
                          return _vm.imageClick($event)
                        }
                      }
                    },
                    [
                      _c("img", {
                        attrs: { src: _vm.imageList[_vm.currentIndex].src }
                      })
                    ]
                  )
                ],
                1
              ),
              _vm.showFooter
                ? _c(
                    "div",
                    { staticClass: "pre__footer" },
                    [
                      _vm._t(
                        "footer",
                        [
                          _c("div", { staticClass: "footer" }, [
                            _vm._v(_vm._s(_vm.imageList[_vm.currentIndex].name))
                          ])
                        ],
                        { image: _vm.imageList[_vm.currentIndex] }
                      )
                    ],
                    2
                  )
                : _vm._e()
            ])
          : _vm._e()
      ]
    )
  };
  var __vue_staticRenderFns__$1 = [];
  __vue_render__$1._withStripped = true;

    /* style */
    const __vue_inject_styles__$1 = function (inject) {
      if (!inject) return
      inject("data-v-02c1f29a_0", { source: "\n.link[data-v-02c1f29a] {\n  margin-right: 8px;\n  cursor: pointer;\n  color: #20a0ff;\n}\n.pre-container[data-v-02c1f29a] {\n  z-index: 1000;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  margin: 0;\n  background-color: #0e0e0e;\n}\n.pre__header[data-v-02c1f29a] {\n  z-index: 1010;\n  position: fixed;\n  top: 0;\n  display: flex;\n  justify-content: space-between;\n  width: calc(100% - 16px);\n  padding: 8px;\n  max-height: 10%;\n  color: rgba(255, 255, 255, 0.7);\n  font-size: 16px;\n}\n.icon[data-v-02c1f29a] {\n  font-size: 16px;\n  cursor: pointer;\n  margin-right: 8px;\n  padding: 4px;\n}\n.icon[data-v-02c1f29a]:hover {\n  color: darken(white, 10);\n}\n.pre__footer[data-v-02c1f29a] {\n  z-index: 1010;\n  position: fixed;\n  bottom: 0;\n  display: flex;\n  width: 100%;\n  max-height: 10%;\n  background-color: rgba(0, 0, 0, 0.3);\n}\n.pre__content[data-v-02c1f29a] {\n  display: flex;\n  width: 100vw;\n  height: 100vh;\n  align-items: center;\n  justify-content: center;\n  overflow: auto;\n}\n*[data-v-02c1f29a] {\n  transition: all 0.3s ease;\n}\n.select-img[data-v-02c1f29a] {\n  transition: rotate 0s ease;\n}\n.pre__content[data-v-02c1f29a]::-webkit-scrollbar {\n  display: none;\n}\n.prev[data-v-02c1f29a],\n.next[data-v-02c1f29a] {\n  cursor: pointer;\n  z-index: 1010;\n  position: fixed;\n  color: rgba(255, 255, 255, 0.7);\n  font-size: 16px;\n  padding: 16px;\n  border-radius: 50%;\n}\n.prev[data-v-02c1f29a]:hover,\n.next[data-v-02c1f29a]:hover {\n  color: darken(white, 10);\n  background-color: rgba(255, 255, 255, 0.5);\n}\n.prev[data-v-02c1f29a] {\n  left: 16px;\n}\n.next[data-v-02c1f29a] {\n  right: 16px;\n}\n.list__img[data-v-02c1f29a] {\n  cursor: pointer;\n  margin: 8px 4px;\n}\n.pre__footer[data-v-02c1f29a] {\n  display: flex;\n  justify-content: center;\n  color: white;\n  padding: 8px;\n}\n", map: {"version":3,"sources":["/Users/Geass/Desktop/Project/vue-preview/src/components/VuePreviewer.vue"],"names":[],"mappings":";AA4PA;EACA,iBAAA;EACA,eAAA;EACA,cAAA;AACA;AACA;EACA,aAAA;EACA,eAAA;EACA,MAAA;EACA,OAAA;EACA,QAAA;EACA,SAAA;EACA,yBAAA;AACA;AACA;EACA,aAAA;EACA,eAAA;EACA,MAAA;EACA,aAAA;EACA,8BAAA;EACA,wBAAA;EACA,YAAA;EACA,eAAA;EACA,+BAAA;EACA,eAAA;AACA;AACA;EACA,eAAA;EACA,eAAA;EACA,iBAAA;EACA,YAAA;AACA;AACA;EACA,wBAAA;AACA;AACA;EACA,aAAA;EACA,eAAA;EACA,SAAA;EACA,aAAA;EACA,WAAA;EACA,eAAA;EACA,oCAAA;AACA;AACA;EACA,aAAA;EACA,YAAA;EACA,aAAA;EACA,mBAAA;EACA,uBAAA;EACA,cAAA;AACA;AACA;EACA,yBAAA;AACA;AACA;EACA,0BAAA;AACA;AACA;EACA,aAAA;AACA;AACA;;EAEA,eAAA;EACA,aAAA;EACA,eAAA;EACA,+BAAA;EACA,eAAA;EACA,aAAA;EACA,kBAAA;AACA;AACA;;EAEA,wBAAA;EACA,0CAAA;AACA;AACA;EACA,UAAA;AACA;AACA;EACA,WAAA;AACA;AACA;EACA,eAAA;EACA,eAAA;AACA;AACA;EACA,aAAA;EACA,uBAAA;EACA,YAAA;EACA,YAAA;AACA","file":"VuePreviewer.vue","sourcesContent":["<template lang=\"pug\">\n  section.vue-preview(@keydown=\"onKey\")\n    //- img list\n    section.list(@click=\"onImageClick\")\n      span.list__img(\n        v-for=\"(img, index) in imageList\"\n        :key=\"index\"\n      )\n        template(v-if=\"mode === 'image'\")\n          img(\n            :src=\"img.thumbnailSrc\"\n            :width=\"img.width\"\n            :height=\"img.height\"\n            :data-index=\"index\"\n            :style=\"componentOptions.thumbnailStyle\"\n          )\n        template(v-else)\n          span.link(name=\"img\" :data-index=\"index\") {{ img.name }}\n    //- preview\n    .pre-container(v-if=\"~currentIndex && isShowPre\")\n      header.pre__header\n        div {{ currentIndex+1 }}/{{ imageList.length }}\n        section\n          icon.icon(v-if=\"!inIframe\" type=\"zoom\" @click=\"toggleFullscreen\")\n          icon.icon(type=\"zoomin\" @click=\"zoomin\")\n          icon.icon(type=\"zoomout\" @click=\"zoomout\")\n          icon.icon(type=\"rotate\" @click=\"rotate\")\n          icon.icon(type=\"close\" @click=\"close\")\n      .pre__content(@click.prevent.stop=\"close\")\n        icon.prev(v-if=\"currentIndex\" type=\"prev\" @click.prevent.stop=\"prevClick\")\n        icon.next(v-if=\"currentIndex < imageList.length-1\" type=\"next\" @click.prevent.stop=\"nextClick\")\n\n        span(\n          ref=\"selectImg\"\n          :style=\"{cursor: cursorStyle, transform: `scale(${scaleRate}) rotate(${rotateRate}deg)`}\"\n          @click.prevent.stop=\"imageClick\"\n        )\n          img(:src=\"imageList[currentIndex].src\")\n      //- footer\n      .pre__footer(v-if=\"showFooter\")\n        slot(name=\"footer\" :image=\"imageList[currentIndex]\")\n          .footer {{ imageList[currentIndex].name }}\n</template>\n\n<script>\nimport Icon from './Icon.vue'\n\nconst defaultOptions = {\n  defaultWidth: '100px',\n  defaultHeight: '75px',\n  thumbnailStyle: {\n    backgroundSize: 'cover'\n  },\n  keyMap: {\n    zoomin: '+',\n    zoomout: '-',\n    rotate: 'r',\n    prev: 'ArrowLeft',\n    next: 'ArrowRight'\n  }\n}\nexport default {\n  name: 'VuePreviewer',\n  props: {\n    images: {\n      type: Array,\n      default: () => []\n    },\n    mode: {\n      type: String,\n      default: 'image'\n    },\n    options: {\n      type: Object,\n      default: () => ({})\n    },\n    showFooter: {\n      type: Boolean,\n      default: true\n    }\n  },\n  components: { Icon },\n  data() {\n    return {\n      inIframe: window.self !== window.top,\n      currentIndex: -1,\n      isShowPre: false,\n      // operation\n      scaleRate: 1,\n      rotateRate: 0,\n      cursorStyle: 'zoom-in'\n    }\n  },\n  computed: {\n    imageList() {\n      return this.normalizeImage(this.images, {\n        sWidth: this.componentOptions.defaultWidth,\n        sHeight: this.componentOptions.defaultHeight\n      })\n    },\n    componentOptions() {\n      return {\n        ...this.$global_vue_image_previewer_options,\n        ...defaultOptions,\n        ...this.options\n      }\n    }\n  },\n  mounted() {\n    document.addEventListener('keydown', this.onKey)\n  },\n  destroyed() {\n    document.removeEventListener('keydown', this.onKey)\n  },\n  methods: {\n    onKey(key) {\n      const { keyMap = {} } = this.componentOptions\n      switch (key.key) {\n        case keyMap.prev:\n          this.prevClick()\n          break\n        case keyMap.next:\n          this.nextClick()\n          break\n        case keyMap.zoomin:\n          this.zoomin()\n          break\n        case keyMap.zoomout:\n          this.zoomout()\n          break\n        case keyMap.rotate:\n          this.rotate()\n      }\n    },\n    normalizeImage(imgs, { sWidth, sHeight }) {\n      return imgs.map((img, idx) => {\n        // only src source\n        if (typeof img === 'string') {\n          return {\n            width: sWidth,\n            height: sHeight,\n            src: img,\n            thumbnailSrc: img,\n            name: `Image ${idx + 1}`\n          }\n        } else {\n          return {\n            width: img.width || sWidth,\n            height: img.height || sHeight,\n            src: img.src,\n            thumbnailSrc: img.thumbnailSrc || img.src,\n            name: img.name\n          }\n        }\n      })\n    },\n    onImageClick({ target }) {\n      if (target.nodeName === 'IMG' || target.getAttribute('name') === 'img') {\n        this.currentIndex = +target.dataset['index']\n        this.isShowPre = true\n        this.$nextTick(() => {\n          this.$refs['selectImg'].focus()\n        })\n        this.$emit('select', this.imageList[this.currentIndex])\n      }\n    },\n    zoomin() {\n      this.scaleRate += 0.5\n    },\n    zoomout() {\n      this.scaleRate -= 0.25\n      this.scaleRate = Math.max(this.scaleRate, 0.25)\n    },\n    rotate() {\n      this.rotateRate += 90\n    },\n    toggleFullscreen() {\n      const isFullscreen =\n        document.fullscreenElement ||\n        document.msFullscreenElement ||\n        document.mozFullscreenElement ||\n        document.webkitFullscreenElement ||\n        false\n      if (isFullscreen) {\n        this.exitFullscreen()\n      } else {\n        this.enterFullscreen()\n      }\n    },\n    exitFullscreen() {\n      const el = document.documentElement\n      const rfs = el.cancelFullscreen || el.webkitExitFullscreen || el.mozCancelFullscreen || el.exitFullscreen\n      if (rfs) {\n        rfs.call(el)\n      } else {\n        console.error(\"Your browser seems doesn't support fullscreen\")\n      }\n    },\n    enterFullscreen() {\n      const el = document.documentElement\n      const rfs =\n        el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullscreen || el.msRequestFullscreen\n      if (rfs) {\n        rfs.call(el)\n      } else {\n        console.error(\"Your browser seems doesn't support fullscreen\")\n      }\n    },\n    imageClick() {\n      if (this.cursorStyle === 'zoom-in') {\n        this.cursorStyle = 'zoom-out'\n        this.scaleRate += 0.5\n      } else {\n        this.cursorStyle = 'zoom-in'\n        this.scaleRate -= 0.5\n      }\n    },\n    prevClick() {\n      if (this.currentIndex > 0) {\n        this.$refs['selectImg'].classList.add('select-img')\n        this.currentIndex -= 1\n        this.resetRate()\n        setTimeout(() => {\n          this.$refs['selectImg'].classList.remove('select-img')\n        })\n      }\n    },\n    nextClick() {\n      if (this.currentIndex < this.imageList.length - 1) {\n        this.$refs['selectImg'].classList.add('select-img')\n        this.currentIndex += 1\n        this.resetRate()\n        setTimeout(() => {\n          this.$refs['selectImg'].classList.remove('select-img')\n        })\n      }\n    },\n    close() {\n      this.currentIndex = -1\n      this.isShowPre = false\n      this.resetRate()\n      this.$emit('close')\n    },\n    resetRate() {\n      this.scaleRate = 1\n      this.rotateRate = 0\n    }\n  }\n}\n</script>\n\n<style scoped>\n.link {\n  margin-right: 8px;\n  cursor: pointer;\n  color: #20a0ff;\n}\n.pre-container {\n  z-index: 1000;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  margin: 0;\n  background-color: #0e0e0e;\n}\n.pre__header {\n  z-index: 1010;\n  position: fixed;\n  top: 0;\n  display: flex;\n  justify-content: space-between;\n  width: calc(100% - 16px);\n  padding: 8px;\n  max-height: 10%;\n  color: rgba(255, 255, 255, 0.7);\n  font-size: 16px;\n}\n.icon {\n  font-size: 16px;\n  cursor: pointer;\n  margin-right: 8px;\n  padding: 4px;\n}\n.icon:hover {\n  color: darken(white, 10);\n}\n.pre__footer {\n  z-index: 1010;\n  position: fixed;\n  bottom: 0;\n  display: flex;\n  width: 100%;\n  max-height: 10%;\n  background-color: rgba(0, 0, 0, 0.3);\n}\n.pre__content {\n  display: flex;\n  width: 100vw;\n  height: 100vh;\n  align-items: center;\n  justify-content: center;\n  overflow: auto;\n}\n* {\n  transition: all 0.3s ease;\n}\n.select-img {\n  transition: rotate 0s ease;\n}\n.pre__content::-webkit-scrollbar {\n  display: none;\n}\n.prev,\n.next {\n  cursor: pointer;\n  z-index: 1010;\n  position: fixed;\n  color: rgba(255, 255, 255, 0.7);\n  font-size: 16px;\n  padding: 16px;\n  border-radius: 50%;\n}\n.prev:hover,\n.next:hover {\n  color: darken(white, 10);\n  background-color: rgba(255, 255, 255, 0.5);\n}\n.prev {\n  left: 16px;\n}\n.next {\n  right: 16px;\n}\n.list__img {\n  cursor: pointer;\n  margin: 8px 4px;\n}\n.pre__footer {\n  display: flex;\n  justify-content: center;\n  color: white;\n  padding: 8px;\n}\n</style>\n\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$1 = "data-v-02c1f29a";
    /* module identifier */
    const __vue_module_identifier__$1 = undefined;
    /* functional template */
    const __vue_is_functional_template__$1 = false;
    /* style inject SSR */
    

    
    var VuePreviewer = normalizeComponent_1(
      { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
      __vue_inject_styles__$1,
      __vue_script__$1,
      __vue_scope_id__$1,
      __vue_is_functional_template__$1,
      __vue_module_identifier__$1,
      browser,
      undefined
    );

  !function (l) {
    var t,
        o = '<svg><symbol id="icon-zoom" viewBox="0 0 1024 1024"><path d="M233.1859 621.052718 126.190027 621.052718l0 275.717575 275.717575 0 0-111.110587L237.300614 785.659707 237.300614 621.052718 233.1859 621.052718zM126.190027 398.831544l111.110587 0L237.300614 234.224556l164.608012 0L401.908626 127.228683 126.190027 127.228683 126.190027 398.831544zM784.621051 785.659707 620.014062 785.659707l0 111.110587 275.717575 0L895.731638 621.052718l-111.110587 0L784.621051 785.659707zM620.014062 127.228683l0 111.110587 164.608012 0 0 164.608012 111.110587 0L895.732661 127.228683 620.014062 127.228683z"  ></path></symbol><symbol id="icon-zoomout" viewBox="0 0 1024 1024"><path d="M232.727273 465.454545h372.363636V372.363636H232.727273v93.090909z m513.303272 214.760728A416.721455 416.721455 0 0 0 837.818182 418.909091c0-231.377455-187.531636-418.909091-418.909091-418.909091S0 187.531636 0 418.909091s187.531636 418.909091 418.909091 418.909091c98.909091 0 189.626182-34.443636 261.306182-91.787637l209.780363 209.780364 65.815273-65.815273-209.780364-209.780363zM418.909091 744.727273A325.818182 325.818182 0 1 1 418.909091 93.090909a325.818182 325.818182 0 0 1 0 651.636364z"  ></path></symbol><symbol id="icon-zoomin" viewBox="0 0 1024 1024"><path d="M1002.0864 923.2896l-207.0016-207.0528a441.856 441.856 0 0 0 39.2192-59.7504 437.3504 437.3504 0 0 0 52.9408-209.2032 438.8352 438.8352 0 1 0-171.9808 348.3136l207.2576 207.2064a56.064 56.064 0 0 0 79.5136 0c22.016-21.9648 22.016-57.5488 0-79.5136zM99.584 447.2832a349.184 349.184 0 0 1 348.8256-348.8256 349.184 349.184 0 0 1 348.8256 348.8256 349.184 349.184 0 0 1-348.8256 348.8256 349.2352 349.2352 0 0 1-348.8256-348.8256z"  ></path><path d="M605.952 402.2784H493.4144V289.792a45.056 45.056 0 0 0-90.0096 0v112.5376H290.8672a45.056 45.056 0 0 0 0 90.0096H403.456v112.5376a45.056 45.056 0 0 0 90.0096 0V492.288h112.5376a45.056 45.056 0 0 0 0-90.0096z"  ></path></symbol><symbol id="icon-close" viewBox="0 0 1024 1024"><path d="M520.52000029 456.89000029L159.92 96.29a45 45 0 1 0-63.65999971 63.60000029l360.59999942 360.63-360.59999942 360.63a45 45 0 1 0 63.63 63.63l360.63-360.60000029 360.63 360.60000029a45 45 0 1 0 63.63-63.60000029l-360.60000029-360.65999971 360.60000029-360.60000029a45 45 0 1 0-63.63-63.63l-360.60000029 360.60000029z"  ></path></symbol><symbol id="icon-rotate" viewBox="0 0 1024 1024"><path d="M480 32a32 32 0 0 0 32 32c119.664 0 232.16 46.608 316.768 131.232C913.392 279.84 960 392.336 960 512c0 118.096-45.472 229.168-128 313.392V736a32 32 0 0 0-64 0v192h192a32 32 0 0 0 0-64h-76.416C974.16 768.512 1024 644.112 1024 512c0-136.752-53.264-265.328-149.984-362.032C777.328 53.264 648.752 0 512 0a32 32 0 0 0-32 32zM149.984 874.032C246.672 970.736 375.248 1024 512 1024a32 32 0 0 0 0-64c-119.664 0-232.16-46.608-316.768-131.232C110.608 744.16 64 631.664 64 512c0-118.096 45.472-229.168 128-313.392V288a32 32 0 0 0 64 0V96H64a32 32 0 0 0 0 64h76.416C49.84 255.488 0 379.888 0 512c0 136.752 53.264 265.328 149.984 362.032z" fill="" ></path></symbol><symbol id="icon-next" viewBox="0 0 1024 1024"><path d="M993.24928 514.63168v0.12288c0 5.51936-320.39424 337.38752-320.39424 337.38752a43.35104 43.35104 0 0 1-31.04256 13.04576c-10.78272 0-21.632-4.26496-29.97248-12.29312-17.18272-16.3072-17.61792-43.83744-1.06496-60.83072l218.05056-236.04736H73.9584c-23.89504 0-43.20768-19.18976-43.20768-42.77248 0-23.7056 19.31264-42.89536 43.20768-42.89536h754.86208l-217.98912-236.17024c-16.54784-17.02912-16.0512-45.15328 1.13152-61.55264 17.18272-16.43008 44.71296-19.3792 61.2096-2.47296 0 0 320.0768 339.0208 320.0768 344.47872z"  ></path></symbol><symbol id="icon-prev" viewBox="0 0 1024 1024"><path d="M350.82752 170.15296c16.49664-16.90112 44.02688-13.95712 61.2096 2.47296 17.1776 16.39936 17.67936 44.52352 1.13152 61.55264L195.17952 470.35392h754.86208c23.89504 0 43.20768 19.18976 43.20768 42.89536 0 23.5776-19.31264 42.77248-43.20768 42.77248H195.17952L413.23008 792.064c16.55296 16.99328 16.11776 44.52352-1.06496 60.83072-8.3456 8.02816-19.18976 12.29312-29.97248 12.29312a43.33056 43.33056 0 0 1-31.04256-13.04576S30.75584 520.27392 30.75584 514.75456v-0.12288c-0.00512-5.45792 320.07168-344.47872 320.07168-344.47872z"  ></path></symbol></svg>',
        e = (t = document.getElementsByTagName("script"))[t.length - 1].getAttribute("data-injectcss");

    if (e && !l.__iconfont__svg__cssinject__) {
      l.__iconfont__svg__cssinject__ = !0;

      try {
        document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
      } catch (t) {
        console && console.log(t);
      }
    }

    !function (t) {
      if (document.addEventListener) {
        if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) setTimeout(t, 0);else {
          var e = function () {
            document.removeEventListener("DOMContentLoaded", e, !1), t();
          };

          document.addEventListener("DOMContentLoaded", e, !1);
        }
      } else document.attachEvent && (n = t, i = l.document, a = !1, (c = function () {
        try {
          i.documentElement.doScroll("left");
        } catch (t) {
          return void setTimeout(c, 50);
        }

        o();
      })(), i.onreadystatechange = function () {
        "complete" == i.readyState && (i.onreadystatechange = null, o());
      });

      function o() {
        a || (a = !0, n());
      }

      var n, i, a, c;
    }(function () {
      var t, e;
      (t = document.createElement("div")).innerHTML = o, o = null, (e = t.getElementsByTagName("svg")[0]) && (e.setAttribute("aria-hidden", "true"), e.style.position = "absolute", e.style.width = 0, e.style.height = 0, e.style.overflow = "hidden", function (t, e) {
        e.firstChild ? function (t, e) {
          e.parentNode.insertBefore(t, e);
        }(t, e.firstChild) : e.appendChild(t);
      }(e, document.body));
    });
  }(window);

  function install(Vue, options) {
    if (install.installed) {
      return;
    }

    Vue.prototype.$global_vue_image_previewer_options = options;
    install.installed = true;
    Vue.component(VuePreviewer.name, VuePreviewer);
  }

  VuePreviewer.install = install;

  return VuePreviewer;

}));
