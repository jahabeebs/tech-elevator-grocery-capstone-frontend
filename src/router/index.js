import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Register from '../views/Register.vue'
import store from '../store/index'
import ProductList from '../components/ProductList.vue'
import Category from '../components/Category.vue'
import ProductDetails from '../components/ProductDetails.vue'
import ShoppingCart from '../components/ShoppingCart.vue'
import Certification from '../components/Certification.vue'
import Search from '../components/Search.vue'
import Checkout from '../components/Checkout.vue'


Vue.use(Router)

/**
 * The Vue Router is used to "direct" the browser to render a specific view component
 * inside of App.vue depending on the URL.
 *
 * It also is used to detect whether or not a route requires the user to have first authenticated.
 * If the user has not yet authenticated (and needs to) they are redirected to /login
 * If they have (or don't need to) they're allowed to go about their way.
 */

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProductList,
      meta: {
        requiresAuth: false //anyone can see this - default as guest
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/all-products",
      name: "all-products",
      component: Home,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/byCategory/:categoryId",
      name: 'category',
      component: Category,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: "/product-details/:id",
      name: "product-details",
      component: ProductDetails,
    },
    {
      path: "/shopping-cart",
      name: "cart",
      component: ShoppingCart,
    },
    {
      path: "/certification/:id",
      name: "certification",
      component: Certification
    },
    {
      path: "/checkout",
      name: "checkout",
      component: Checkout
    },
    {
      path: "/search/:query",
      name: "search",
      component: Search
    },
  ]
})

router.beforeEach((to, from, next) => {
  // Determine if the route requires Authentication
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);

  // If it does and they are not logged in, send the user to "/login"
  if (requiresAuth && store.state.token === '') {
    next("/login");
  } else {
    // Else let them go to their next destination
    next();
  }
});

export default router;
