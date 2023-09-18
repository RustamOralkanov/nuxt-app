import { Swiper, SwiperSlide } from 'swiper/vue';
import { d as defineStore, _ as _export_sfc, e as useRuntimeConfig, a as __nuxt_component_0$3, b as useNuxtApp, c as createError } from '../server.mjs';
import { Pagination } from 'swiper/modules';
import { useSSRContext, computed, unref, reactive, defineComponent, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, ref, toRef, getCurrentInstance, onServerPrefetch } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { z as hash } from '../../nitro/node-server.mjs';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'fs';
import 'path';

const getDefault = () => null;
function useAsyncData(...args) {
  var _a, _b, _c, _d, _e;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  options.server = (_a = options.server) != null ? _a : true;
  options.default = (_b = options.default) != null ? _b : getDefault;
  options.lazy = (_c = options.lazy) != null ? _c : false;
  options.immediate = (_d = options.immediate) != null ? _d : true;
  const nuxt = useNuxtApp();
  const getCachedData = () => nuxt.isHydrating ? nuxt.payload.data[key] : nuxt.static.data[key];
  const hasCachedData = () => getCachedData() !== void 0;
  if (!nuxt._asyncData[key] || !options.immediate) {
    nuxt._asyncData[key] = {
      data: ref((_e = getCachedData()) != null ? _e : options.default()),
      pending: ref(!hasCachedData()),
      error: toRef(nuxt.payload._errors, key),
      status: ref("idle")
    };
  }
  const asyncData = { ...nuxt._asyncData[key] };
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    if (nuxt._asyncDataPromises[key]) {
      if (opts.dedupe === false) {
        return nuxt._asyncDataPromises[key];
      }
      nuxt._asyncDataPromises[key].cancelled = true;
    }
    if ((opts._initial || nuxt.isHydrating && opts._initial !== false) && hasCachedData()) {
      return getCachedData();
    }
    asyncData.pending.value = true;
    asyncData.status.value = "pending";
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxt));
        } catch (err) {
          reject(err);
        }
      }
    ).then((_result) => {
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      let result = _result;
      if (options.transform) {
        result = options.transform(_result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      asyncData.data.value = result;
      asyncData.error.value = null;
      asyncData.status.value = "success";
    }).catch((error) => {
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      asyncData.error.value = error;
      asyncData.data.value = unref(options.default());
      asyncData.status.value = "error";
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      nuxt.payload.data[key] = asyncData.data.value;
      if (asyncData.error.value) {
        nuxt.payload._errors[key] = createError(asyncData.error.value);
      }
      delete nuxt._asyncDataPromises[key];
    });
    nuxt._asyncDataPromises[key] = promise;
    return nuxt._asyncDataPromises[key];
  };
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxt.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxt.hook("app:created", () => promise);
    }
  }
  const asyncDataPromise = Promise.resolve(nuxt._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function useRequestFetch() {
  var _a;
  const event = (_a = useNuxtApp().ssrContext) == null ? void 0 : _a.event;
  return (event == null ? void 0 : event.$fetch) || globalThis.$fetch;
}
function useFetch(request, arg1, arg2) {
  var _a;
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _request = computed(() => {
    let r = request;
    if (typeof r === "function") {
      r = r();
    }
    return unref(r);
  });
  const _key = opts.key || hash([autoKey, ((_a = unref(opts.method)) == null ? void 0 : _a.toUpperCase()) || "GET", unref(opts.baseURL), typeof _request.value === "string" ? _request.value : "", unref(opts.params || opts.query)]);
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useFetch] key must be a string: " + _key);
  }
  if (!request) {
    throw new Error("[nuxt] [useFetch] request is missing.");
  }
  const key = _key === autoKey ? "$f" + _key : _key;
  if (!opts.baseURL && typeof _request.value === "string" && _request.value.startsWith("//")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    watch,
    immediate,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    immediate,
    watch: watch === false ? [] : [_fetchOptions, _request, ...watch || []]
  };
  let controller;
  const asyncData = useAsyncData(key, () => {
    var _a2;
    (_a2 = controller == null ? void 0 : controller.abort) == null ? void 0 : _a2.call(controller);
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    const isLocalFetch = typeof _request.value === "string" && _request.value.startsWith("/");
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch && isLocalFetch) {
      _$fetch = useRequestFetch();
    }
    return _$fetch(_request.value, { signal: controller.signal, ..._fetchOptions });
  }, _asyncDataOptions);
  return asyncData;
}
const useHeroStore = defineStore("hero", {
  state: () => ({
    hero: {}
  }),
  getters: {},
  actions: {
    async fetchHero() {
      const config = /* @__PURE__ */ useRuntimeConfig();
      const { data: hero } = await useFetch(
        `${config.public.apiBase}collections/hero/`,
        {
          headers: {
            "X-Api-Key": `${config.apiSecret}`
          }
        },
        "$uq73D1SBWO"
      );
      if (hero && hero.value) {
        this.hero = hero.value;
      } else {
        console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0434\u0430\u043D\u043D\u044B\u0445");
      }
    }
  }
});
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "Hero",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useHeroStore();
    store.fetchHero();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Swiper = Swiper;
      const _component_SwiperSlide = SwiperSlide;
      const _component_NuxtLink = __nuxt_component_0$3;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "hero" }, _attrs))} data-v-da98cdd4><div class="container" data-v-da98cdd4>`);
      _push(ssrRenderComponent(_component_Swiper, {
        modules: ["SwiperPagination" in _ctx ? _ctx.SwiperPagination : unref(Pagination)],
        "slides-per-view": 1,
        loop: true,
        pagination: true,
        class: "hero-swiper"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(unref(store).hero.results, (product) => {
              _push2(ssrRenderComponent(_component_SwiperSlide, {
                key: product.id,
                class: "hero-slide"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<img class="hero-bg"${ssrRenderAttr("src", product.image[0])} data-v-da98cdd4${_scopeId2}><div class="hero-wrapper" data-v-da98cdd4${_scopeId2}><h2 class="hero-title" data-v-da98cdd4${_scopeId2}>${ssrInterpolate(product.name)}</h2><div class="hero-price" data-v-da98cdd4${_scopeId2}>$ ${ssrInterpolate(product.price.toFixed(2))}</div>`);
                    _push3(ssrRenderComponent(_component_NuxtLink, {
                      to: `/products/${product.id}`,
                      class: "hero-btn"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`View Product`);
                        } else {
                          return [
                            createTextVNode("View Product")
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("img", {
                        class: "hero-bg",
                        src: product.image[0]
                      }, null, 8, ["src"]),
                      createVNode("div", { class: "hero-wrapper" }, [
                        createVNode("h2", { class: "hero-title" }, toDisplayString(product.name), 1),
                        createVNode("div", { class: "hero-price" }, "$ " + toDisplayString(product.price.toFixed(2)), 1),
                        createVNode(_component_NuxtLink, {
                          to: `/products/${product.id}`,
                          class: "hero-btn"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("View Product")
                          ]),
                          _: 2
                        }, 1032, ["to"])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(unref(store).hero.results, (product) => {
                return openBlock(), createBlock(_component_SwiperSlide, {
                  key: product.id,
                  class: "hero-slide"
                }, {
                  default: withCtx(() => [
                    createVNode("img", {
                      class: "hero-bg",
                      src: product.image[0]
                    }, null, 8, ["src"]),
                    createVNode("div", { class: "hero-wrapper" }, [
                      createVNode("h2", { class: "hero-title" }, toDisplayString(product.name), 1),
                      createVNode("div", { class: "hero-price" }, "$ " + toDisplayString(product.price.toFixed(2)), 1),
                      createVNode(_component_NuxtLink, {
                        to: `/products/${product.id}`,
                        class: "hero-btn"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("View Product")
                        ]),
                        _: 2
                      }, 1032, ["to"])
                    ])
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Main/Hero.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-da98cdd4"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "SectionTitle",
  __ssrInlineRender: true,
  props: {
    title: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<h2${ssrRenderAttrs(mergeProps({ class: "section-title" }, _attrs))} data-v-e7dffb2c>${ssrInterpolate(_ctx.title)}</h2>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SectionTitle.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-e7dffb2c"]]);
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "Card",
  __ssrInlineRender: true,
  props: {
    products: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      ssrRenderList(_ctx.products, (product) => {
        _push(`<div class="card" data-v-3dff5de0><div class="card-img" data-v-3dff5de0><img${ssrRenderAttr("src", product.images[0])} alt="" data-v-3dff5de0><div class="card-add-to-cart" data-v-3dff5de0> ADD TO CART </div></div><h3 class="card-title" data-v-3dff5de0>${ssrInterpolate(product.title)}</h3><h4 class="card-price" data-v-3dff5de0>$ ${ssrInterpolate(product.price.toFixed(2))}</h4></div>`);
      });
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Products/Card.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-3dff5de0"]]);
const useProductStore = defineStore("product", {
  state: () => ({
    products: []
  }),
  getters: {},
  actions: {
    async fetchProducts() {
      const config = /* @__PURE__ */ useRuntimeConfig();
      const { data: products } = await useFetch(
        `${config.public.apiBase}collections/products/`,
        {
          headers: {
            "X-Api-Key": `${config.apiSecret}`
          }
        },
        "$NIPFUKfV6S"
      );
      if (products && products.value) {
        this.products = products.value.results;
        return this.products;
      } else {
        console.error("\u041E\u0448\u0438\u0431\u043A\u0430 \u043F\u0440\u0438 \u043F\u043E\u043B\u0443\u0447\u0435\u043D\u0438\u0438 \u0434\u0430\u043D\u043D\u044B\u0445");
      }
    }
  }
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Wrapper",
  __ssrInlineRender: true,
  setup(__props) {
    const store = useProductStore();
    store.fetchProducts();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProductsCard = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "products-wrapper flex flex-wrap" }, _attrs))} data-v-1952e29d>`);
      _push(ssrRenderComponent(_component_ProductsCard, {
        products: unref(store).products
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Products/Wrapper.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-1952e29d"]]);
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_SectionTitle = __nuxt_component_0$1;
  const _component_NuxtLink = __nuxt_component_0$3;
  const _component_ProductsWrapper = __nuxt_component_2;
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "products" }, _attrs))} data-v-da0e3180><div class="container" data-v-da0e3180><div class="products-head flex justify-between items-center" data-v-da0e3180>`);
  _push(ssrRenderComponent(_component_SectionTitle, { title: "Shop The Latest" }, null, _parent));
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/shop",
    class: "products-link"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`View all`);
      } else {
        return [
          createTextVNode("View all")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
  _push(ssrRenderComponent(_component_ProductsWrapper, null, null, _parent));
  _push(`</div></section>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Main/Products.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-da0e3180"]]);
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_MainHero = __nuxt_component_0$2;
  const _component_MainProducts = __nuxt_component_1;
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_MainHero, null, null, _parent));
  _push(ssrRenderComponent(_component_MainProducts, null, null, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-1626fb32.mjs.map
