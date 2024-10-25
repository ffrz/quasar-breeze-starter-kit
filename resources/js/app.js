import "@/bootstrap";

import { createApp, h } from "vue";
import { createInertiaApp, Head, Link } from "@inertiajs/vue3";
import { Dialog, Loading, Notify, Quasar } from "quasar";
import AuthenticatedLayout from "./Layouts/AuthenticatedLayout.vue";
import GuestLayout from "./Layouts/GuestLayout.vue";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import { router } from "@inertiajs/vue3";
import processFlashMessage from "@/helpers/flash-message";
import MyLink from "@/Components/MyLink.vue";

let flashMessageProcessed = false;

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => "My App" + (title ? " - " + title : ""),
  resolve: (name) => {
    const pages = import.meta.glob("./Pages/**/*.vue", { eager: true });

    if (!flashMessageProcessed) {
      flashMessageProcessed = true;
      router.on('success', processFlashMessage);
    }

    return pages[`./Pages/${name}.vue`];
  },
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(ZiggyVue)
      .use(Quasar, {
        plugins: { Notify, Loading, Dialog },
      })
      .component('i-head', Head)
      .component('i-link', Link)
      .component('my-link', MyLink)
      .component('guest-layout', GuestLayout)
      .component('authenticated-layout', AuthenticatedLayout)
      .mount(el);
  },
  progress: {
    color: '#4B5563',
  },
});
