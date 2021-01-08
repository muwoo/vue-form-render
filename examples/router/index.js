import Simple from '../demos/simple';
import Object from '../demos/object';
import Array from '../demos/array';
import String from '../demos/string';

import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'simple',
    component: Simple
  },
  {
    path: '/object',
    name: 'object',
    component: Object
  },
  {
    path: '/array',
    name: 'array',
    component: Array
  },
  {
    path: '/string',
    name: 'string',
    component: String
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
