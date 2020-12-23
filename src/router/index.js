import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'OrderBook',
    component: () => import('../views/OrderBook.vue'),
  },
  {
    path: '/curdif',
    name: 'CurrencyAndDiffs',
    component: () => import('../views/CurrencyAndDiffs.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
