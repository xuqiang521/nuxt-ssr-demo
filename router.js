import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _7baa31e4 = () => import('../pages/repos.vue' /* webpackChunkName: "pages/repos" */).then(m => m.default || m)
const _0a7564cd = () => import('../pages/books.vue' /* webpackChunkName: "pages/books" */).then(m => m.default || m)
const _3d66d9d0 = () => import('../pages/events/all.vue' /* webpackChunkName: "pages/events/all" */).then(m => m.default || m)
const _609816f5 = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)
const _0bd2d1b8 = () => import('../pages/index/index.vue' /* webpackChunkName: "pages/index/index" */).then(m => m.default || m)
const _206396fb = () => import('../pages/index/_welcome/_category.vue' /* webpackChunkName: "pages/index/_welcome/_category" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/repos",
			component: _7baa31e4,
			name: "repos"
		},
		{
			path: "/books",
			component: _0a7564cd,
			name: "books"
		},
		{
			path: "/events/all",
			component: _3d66d9d0,
			name: "events-all"
		},
		{
			path: "/",
			component: _609816f5,
			children: [
				{
					path: "",
					component: _0bd2d1b8,
					name: "index"
				},
				{
					path: ":welcome/:category?",
					component: _206396fb,
					name: "index-welcome-category"
				}
			]
		}
    ],
    
    
    fallback: false
  })
}
