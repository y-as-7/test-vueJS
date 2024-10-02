import AboutPage from "@/pages/AboutPage.vue";
import HomePage from "@/pages/HomePage.vue";
import CreateProductPage from "@/pages/product/createProductPage.vue";
import UpdateProductPage from "@/pages/product/UpdateProductPage.vue";
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
});

export default router;
