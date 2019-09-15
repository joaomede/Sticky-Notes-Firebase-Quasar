const routes = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../pages/home")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../pages/login")
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../pages/about")
  },
  {
    path: "/changepassword",
    name: "Changepassword",
    component: () => import("../pages/changepassword"),
    meta: { requerAuth: true }
  },
  {
    path: "/stickynotes",
    name: "Stickynotes",
    component: () => import("../components/stickynotes"),
    meta: { requerAuth: true }
  }
];

if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    redirect: "/home"
  });
}

export default routes;
