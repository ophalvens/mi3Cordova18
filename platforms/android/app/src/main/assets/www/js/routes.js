'use strict';
var routes = [
  // Index page
  {
    path: '/',
    url: './index.html',
    name: 'home',
  },
  // project page
  {
    path: '/project/',
    url: './pages/project.html',
    name: 'project',
  },
  // locatie page
  {
    path: '/locatie/',
    url: './pages/locatie.html',
    name: 'locatie',
  },
  // data page
  {
    path: '/data/',
    url: './pages/data.html',
    name: 'data',
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
