
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "redirectTo": "/login",
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "route": "/register"
  },
  {
    "renderMode": 2,
    "route": "/inventario"
  },
  {
    "renderMode": 2,
    "route": "/test"
  },
  {
    "renderMode": 2,
    "redirectTo": "/login",
    "route": "/**"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 125, hash: '544971d007bc8aa2bd9d99d381d171fcd7317336cfa91eac8061de7c391c4b36', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 125, hash: '544971d007bc8aa2bd9d99d381d171fcd7317336cfa91eac8061de7c391c4b36', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'login/index.html': {size: 3600, hash: '3b176e1bbb0429322fa873dcb706958844b127ab707a4b8029fef1e16c02018e', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'inventario/index.html': {size: 10045, hash: '6df740ec796bc53ef0a9a9c82a848aa03b4b7693694701fe3ef8af04fa989ea7', text: () => import('./assets-chunks/inventario_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 3945, hash: 'd0f7e85bba6dff17bb968332ea84317c51b047b1f6e0d03ffff621f2e2ebaa6f', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'test/index.html': {size: 1032, hash: '624a91384e5ba630b466e270a4cf7c4a28827928520d2008811e8da134bd768b', text: () => import('./assets-chunks/test_index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
