import { Router } from "express";
import { glob } from "glob";

export function registerRoutes(router: Router) {
  const routes = glob.sync(__dirname + '/**/*.route.*');
  routes.map(route => register(route, router));
}

export function registerApiRoutes(router: Router) {
  const routes = glob.sync(__dirname + '/api/*.api.route.*');
  routes.map(route => registerApi(route, router));
}


function register(routePath: string, app: Router) {
  const route = require(routePath);
  route.register(app);
}

function registerApi(routePath: string, app: Router) {
  const route = require(routePath);
  route.register(app);
}
