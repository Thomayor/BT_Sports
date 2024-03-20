import './bootstrap';
import '../fonts/import.css';
import '../css/app.css';
import 'flag-icons/css/flag-icons.min.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { RouteContext } from '@/Hooks/useRoute';
import './i18n';

let appName = 'Laravel';
if (window !== undefined) {
  appName =
    window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';
}
createInertiaApp({
  title: title => `${title} - ${appName}`,
  progress: {
    color: '#4B5563',
  },
  resolve: name =>
    resolvePageComponent(
      `./Pages/${name}.tsx`,
      import.meta.glob('./Pages/**/*.tsx'),
    ),
  setup({ el, App, props }) {
    const root = createRoot(el);
    return root.render(
      <RouteContext.Provider value={(window as any).route}>
        <App {...props} />
      </RouteContext.Provider>,
    );
  },
}).then(() => {
  document.getElementById('app')?.removeAttribute('data-page');
});
