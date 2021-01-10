import Simple from '../demos/simple';
import Object from '../demos/object';
import String from '../demos/string';
import Multi from '../demos/multi';
import All from '../demos/all';
import Array from '../demos/array'
import RichText from '../demos/richText'

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
    path: '/array',
    name: 'array',
    component: Array
  },
  {
    path: '/richText',
    name: 'richText',
    component: RichText
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
