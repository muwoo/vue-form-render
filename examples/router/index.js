import Simple from '../demos/simple';
import Object from '../demos/object';
import String from '../demos/string';
import Multi from '../demos/multi';
import All from '../demos/all';

import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'simple',
    component: Simple
  },
  {
    path: '/all',
    name: 'all',
    component: All
  },
  {
    path: '/object',
    name: 'object',
    component: Object
  },
  {
    path: '/string',
    name: 'string',
    component: String
  },
  {
    path: '/multi',
    name: 'multi',
    component: Multi
  },
  {
    path: '/:pathMatch(.*)*',
    component: Simple
  },
]

const router = createRouter({
  routes, // short for `routes: routes`
  history: createWebHashHistory(),
});

export default router;
