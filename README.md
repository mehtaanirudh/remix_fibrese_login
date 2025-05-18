
# Welcome to Remix!

  

- 📖 [Remix docs](https://remix.run/docs)

  

## Development

  In the app folder create a new subfolder called `secrets`
  Create two secret files
  `zkootie-auth-services-dev.json` and `zkootie-connect-dev.json`

The `.env` should looks like this

```shellscript
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
SESSION_SECRET=
```
Run the dev server:

  

```shellscript

npm run dev

```

  

## Deployment

  

First, build your app for production:

  

```sh

npm  run  build

```
Deploy on Netflify using
  
  ```sh

 npm install -g netlify-cli
 netlify login
 netlify link
 netlify deploy --prod     
```

Then run the app in production mode:

  

```sh

npm  start

```

  

Now you'll need to pick a host to deploy it to.

  

### DIY

  

If you're familiar with deploying Node applications, the built-in Remix app server is production-ready.

  

Make sure to deploy the output of `npm run build`

  

-  `build/server`

-  `build/client`

  

## Styling

  

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.