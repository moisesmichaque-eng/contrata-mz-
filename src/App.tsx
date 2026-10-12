20:06:18.329 Running build in Washington, D.C., USA (East) – iad1
20:06:18.330 Build machine configuration: 2 cores, 8 GB
20:06:18.523 Cloning github.com/moisesmichaque-eng/contrata-mz- (Branch: main, Commit: d60237e)
20:06:19.018 Cloning completed: 494.000ms
20:06:19.158 Restored build cache from previous deployment (5rRPnT3hVfLKJncWLRYhHfdEnUEH)
20:06:19.690 Running "vercel build"
20:06:19.714 Vercel CLI 62.7.0
20:06:20.757 Installing dependencies...
20:06:25.288 
20:06:25.288 up to date in 4s
20:06:25.289 
20:06:25.289 26 packages are looking for funding
20:06:25.289   run `npm fund` for details
20:06:25.291 npm warn install-scripts 2 packages have install scripts not yet covered by allowScripts:
20:06:25.291 npm warn install-scripts   core-js@3.50.0 (postinstall: node -e "try{require('./postinstall')}catch(e){}")
20:06:25.291 npm warn install-scripts   esbuild@0.21.5 (postinstall: node install.js)
20:06:25.291 npm warn install-scripts
20:06:25.291 npm warn install-scripts Run `npm install-scripts ls` to review, or `npm install-scripts approve <pkg>` to allow.
20:06:25.414 Running "npm run build"
20:06:25.535 
20:06:25.535 > contrata-mz@0.1.0 build
20:06:25.535 > vite build
20:06:25.535 
20:06:25.813 vite v5.4.21 building for production...
20:06:25.897 transforming...
20:06:25.946 ✓ 3 modules transformed.
20:06:25.947 x Build failed in 92ms
20:06:25.948 error during build:
20:06:25.948 [vite:esbuild] Transform failed with 1 error:
20:06:25.948 /vercel/path0/src/App.tsx:126:17: ERROR: Expected ";" but found ":"
20:06:25.948 file: /vercel/path0/src/App.tsx:126:17
20:06:25.948 
20:06:25.949 Expected ";" but found ":"
20:06:25.949 124|   ]);
20:06:25.949 125|   // ===== FACTURACAO - MANTIDO - SO ADICAO =====
20:06:25.949 126|     {id:'p1', nome:'Saco de Cimento 50kg - CMPOR', preco:850, qtd:3, desc:0},
20:06:25.949    |                   ^
20:06:25.949 127|     {id:'p2', nome:'Bloco 15cm - 40x20', preco:42, qtd:20, desc:5},
20:06:25.949 128|   ]);
20:06:25.949 
20:06:25.949     at failureErrorWithLog (/vercel/path0/node_modules/esbuild/lib/main.js:1472:15)
20:06:25.949     at /vercel/path0/node_modules/esbuild/lib/main.js:755:50
20:06:25.950     at responseCallbacks.<computed> (/vercel/path0/node_modules/esbuild/lib/main.js:622:9)
20:06:25.950     at handleIncomingPacket (/vercel/path0/node_modules/esbuild/lib/main.js:677:12)
20:06:25.950     at Socket.readFromStdout (/vercel/path0/node_modules/esbuild/lib/main.js:600:7)
20:06:25.950     at Socket.emit (node:events:514:28)
20:06:25.950     at addChunk (node:internal/streams/readable:568:12)
20:06:25.950     at readableAddChunkPushByteMode (node:internal/streams/readable:519:3)
20:06:25.950     at Readable.push (node:internal/streams/readable:399:5)
20:06:25.950     at Pipe.onStreamRead (node:internal/stream_base_commons:189:23)
20:06:25.971 Error: Command "npm run build" exited with 1
