import "@/bootstrap";

import { createApp, h } from "vue";
import { createInertiaApp, Head, Link } from "@inertiajs/vue3";
import { Dialog, Loading, Notify, Quasar } from "quasar";
import GuestLayout from "./Layouts/GuestLayout.vue";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";
import { ZiggyVue } from '../../vendor/tightenco/ziggy';

// import { router } from "@inertiajs/vue3";
// import processFlashMessage from "@/helpers/flash";

// let flashMessageProcessed = false;

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
  title: (title) => "My App" + (title ? " - " + title : ""),
  resolve: (name) => {
    const pages = import.meta.glob("./Pages/**/*.vue", { eager: true });
    let page = pages[`./Pages/${name}.vue`];

    // if (page.default.layout !== false) {
    //   page.default.layout = page.default.layout || GuestLayout;
    // }

    // if (!flashMessageProcessed) {
    //   flashMessageProcessed = true;
    //   router.on('success', processFlashMessage);
    // }

    return page;
  },
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(ZiggyVue)
      .use(Quasar, {
        plugins: { Notify, Loading, Dialog },
      })
      .component("Head", Head)
      .component("Link", Link)
      .mount(el);
  },
  progress: {
    color: '#4B5563',
  },
});

// import '../css/app.css';
// import './bootstrap';

// import { createInertiaApp } from '@inertiajs/vue3';
// import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
// import { createApp, h } from 'vue';
// import { ZiggyVue } from '../../vendor/tightenco/ziggy';

// const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// createInertiaApp({
//     title: (title) => `${title} - ${appName}`,
//     resolve: (name) =>
//         resolvePageComponent(
//             `./Pages/${name}.vue`,
//             import.meta.glob('./Pages/**/*.vue'),
//         ),
//     setup({ el, App, props, plugin }) {
//         return createApp({ render: () => h(App, props) })
//             .use(plugin)
//             .use(ZiggyVue)
//             .mount(el);
//     },
//     progress: {
//         color: '#4B5563',
//     },
// });
