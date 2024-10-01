import AboutPage from "@/pages/AboutPage.vue";
import HomePage from "@/pages/HomePage.vue";
import CreateProductPage from "@/pages/product/createProductPage.vue";
import ListProductsPage from "@/pages/product/ListProductsPage.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomePage,
  },
  {
    path: "/about",
    name: "About",
    component: AboutPage,
  },
  {
    path: "/products",
    name: "Products",
    component: ListProductsPage,
  },
  {
    path: "/products/create",
    name: "ProductDetail",
    component: CreateProductPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
