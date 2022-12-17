'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "7b00117b192041d84df6d19417b18220",
"index.html": "eb386f3f6686ee1ba040292e7b3e4811",
"/": "eb386f3f6686ee1ba040292e7b3e4811",
"main.dart.js": "469ab37f289320ec8308ff53980bf17c",
"flutter.js": "195f32f4217e034162a6697208586f44",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "d236d21dac807742c4a6d96340950cc9",
"assets/AssetManifest.json": "3741f165b4bf0611be56aef61ed7faad",
"assets/NOTICES": "ebafda210e1e54c8183118f5f02fa430",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/packages/easy_localization/i18n/ar-DZ.json": "acc0a8eebb2fcee312764600f7cc41ec",
"assets/packages/easy_localization/i18n/en.json": "5f5fda8715e8bf5116f77f469c5cf493",
"assets/packages/easy_localization/i18n/en-US.json": "5f5fda8715e8bf5116f77f469c5cf493",
"assets/packages/easy_localization/i18n/ar.json": "acc0a8eebb2fcee312764600f7cc41ec",
"assets/shaders/ink_sparkle.frag": "a04e492a05f9fd1a8cc6f12163b184dd",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/assets/images/location_fill_grey_red.png": "6d025e8dc6f8df9fb29185802b223f9d",
"assets/assets/images/foto_2.png": "3ca670ea58c56004a14cd5cb2723f0e8",
"assets/assets/images/foto_3.png": "fa9433a5fc4da3eaff7a1c9f59d66248",
"assets/assets/images/stop.png": "62307981188d4a92dc7e6ef4b3116ac4",
"assets/assets/images/foto_1.png": "be259f9f41b1fef355e0edc614a2eb1d",
"assets/assets/images/foto_4.png": "f939bc8f4831ccd0cde21ca6f490c321",
"assets/assets/images/map.svg": "da6e7acc84b2e87956beaa8b651e57e8",
"assets/assets/images/location_fill.png": "ee6d6aed577a81600d69befff66e8ad9",
"assets/assets/images/app_icon.png": "08dc9b2c6169490584eac21c35d733c8",
"assets/assets/images/droplet.png": "97cd94a3eb5650fab2deab668681b519",
"assets/assets/images/energy_income.png": "6bf896a1f9c0c8295946aeb431a38647",
"assets/assets/images/location_fill_grey.png": "1f9b79562f46146ca0cba4131f5d4e44",
"assets/assets/images/account_circle.svg": "895853c26b3d08907aeeff0c8295cec4",
"assets/assets/images/ev_station.svg": "83f9582f724bdbe01bf24f213a103111",
"assets/assets/images/energy_outcome.png": "8239afa3d956c3bad54b98de5825b7ec",
"assets/assets/images/logo.png": "19565c86a646dbfeba64b553048c2bf0",
"assets/assets/images/logo_opacity.png": "935696e91718e766041dfde2b1d87260",
"assets/assets/images/battery_charging.svg": "1884442c158798fb025dea7cee17b980",
"assets/assets/images/star.svg": "a7b47c21ac4fa6ee39fb45c6540eda17",
"assets/assets/images/location.png": "0a45f2f43e224a7815a5579ce46dfa25",
"assets/assets/images/contact_mail.svg": "ec4c21d40c8009a284472bf15ebe92e3",
"assets/assets/images/saldo_wykres.png": "a71b3bad31a75fdf3b9a6d3c6a2117fc",
"assets/assets/languages/pl-PL.json": "f00e0c3b0928a20352aba8010ee9c211",
"assets/assets/languages/en-US.json": "3c13f5f01f5a6f04420a151e3a610ef6",
"canvaskit/canvaskit.js": "687636ce014616f8b829c44074231939",
"canvaskit/profiling/canvaskit.js": "ba8aac0ba37d0bfa3c9a5f77c761b88b",
"canvaskit/profiling/canvaskit.wasm": "05ad694fda6cfca3f9bbac4b18358f93",
"canvaskit/canvaskit.wasm": "d4972dbefe733345d4eabb87d17fcb5f"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
