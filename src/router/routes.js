const routes = [
  {
    path: "/",
    redirect: "/login"
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
    path: "/settings",
    name: "Settings",
    component: () => import("../components/settings"),
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
    redirect: "/login"
  });
}

export default routes;
