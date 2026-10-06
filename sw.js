const V='haccp-studio-v9.2',CORE=['./','index.html','css/app.css','css/splash.css','assets/ad.jpg','assets/brand.jpg','assets/about-chef.jpg','assets/logo-nap.jpg','js/app.js','manifest.webmanifest','icons/icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.hostname==='api.languagetool.org')return;
e.respondWith(caches.match(r,{ignoreSearch:true}).then(hit=>{const net=fetch(r).then(res=>{if(res.ok&&(u.origin===location.origin||/cdn/.test(u.hostname)))caches.open(V).then(c=>c.put(r,res.clone()));return res}).catch(()=>hit||(r.mode==='navigate'?caches.match('index.html'):Response.error()));return hit||net}))});
self.addEventListener('message',e=>{if(e.data&&e.data.type==='SKIP_WAITING')self.skipWaiting()});
