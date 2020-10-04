import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import route from "./routeNames";
import Material from "@/components/Material";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: route.DASHBOARD,
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: Material
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
