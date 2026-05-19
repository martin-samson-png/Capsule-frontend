import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["./app/assets/styles/main.css"],

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        "reka-ui",
        "@vueuse/core",
        "clsx",
        "tailwind-merge",
        "@vue/devtools-core",
        "@vue/devtools-kit",
        "@internationalized/date",
        "reka-ui/date",
        "lucide-vue-next",
      ],
    },
  },

  modules: ["@nuxtjs/supabase", "nuxt-lucide-icons"],
  lucide: { namePrefix: "Icon" },

  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    types: "~~/app/types/database.types.ts",

    useSsrCookies: true,
    cookieOptions: {
      maxAge: 60 * 60 * 24 * 30,
      sameSite: "lax",
      secure: true,
    },

    redirect: true,
    redirectOptions: {
      login: "/auth/login",
      callback: "/auth/confirm",
      exclude: ["/auth/login", "/auth/register", "/auth/confirm"],
      saveRedirectToCookie: true,
    },
  },

  runtimeConfig: {
    public: {
      backendUrl: process.env.BACKEND_URL,
    },
  },
});
