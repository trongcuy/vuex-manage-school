import Vue from "vue";
import VueRouter from "vue-router";
import Students from "./../views/Students";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Students
  },
  {
    path: "/classes",
    name: "Class",
    component: () =>
      import(/* webpackChunkName: "Classes" */ "../views/Classes.vue")
  },
  {
    path: "/overview",
    name: "OverView",
    component: () =>
      import(/* webpackChunkName: "OverView" */ "../views/OverView.vue")
  },
  {
    path: "/subjects",
    name: "Subjects",
    component: () =>
      import(/* webpackChunkName: "Subjects" */ "../views/Subjects.vue")
  },
  {
    path: "/teachers",
    name: "Teachers",
    component: () =>
      import(/* webpackChunkName: "Teachers" */ "../views/Teachers.vue")
  },
  {
    path: "/students",
    name: "Students",
    component: () =>
      import(/* webpackChunkName: "Students" */ "../views/Students.vue")
  },
  {
    path: "*",
    component: () =>
      import(/* webpackChunkName: "Students" */ "../views/404.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
