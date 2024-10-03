import AboutPage from "@/pages/AboutPage.vue";
import HomePage from "@/pages/HomePage.vue";
import ListCategory from "@/resources/Categories/ListCategory.vue";
import UpdateCategory from "@/resources/Categories/UpdateCategory.vue";
import CreateProduct from "@/resources/products/CreateProduct.vue";
import ListProduct from "@/resources/products/ListProduct.vue";
import UpdateProduct from "@/resources/products/UpdateProduct.vue";
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
    path: "/categories",
    name: "Categories",
    component: ListCategory,
  },
  {
    path: "/categories/create",
    name: "CreateCategory",
    component: ListCategory,
  },
  {
    path: "/categories/:id/edit",
    name: "EditCategory",
    component: UpdateCategory,
  },
  {
    path: "/products",
    name: "Products",
    component: ListProduct,
  },
  {
    path: "/products/create",
    name: "CreateProduct",
    component: CreateProduct,
  },
  {
    name: "EditProduct",
    component: UpdateProduct,
    path: "/products/:id/edit",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
  linkExactActiveClass: "exact-active",
  strict: false,
  sensitive: false,
});

export default router;
