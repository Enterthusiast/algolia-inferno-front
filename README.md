# Algolia technical test - Inferno - Frontend

## Assignement

Build a **nice looking**, relevant & fast instant-search application searching in the underlying apps.

You must use [Inferno](https://infernojs.org/) to build this application.

The application should include:
- a search box,
- a list of apps found (hits),
- a categories filtering (faceting),
- and a way to sort the results by rank ASC or rank DESC (default)

Algolia is all about search UX, a nice UX & UI touch an feel is very important to us.

## Install

````
npm install
````

### Configure environment variable

Copy `src/environment/config.ts.sample` and put your Algolia credentials in a new `src/environment/config.ts` file.

## Build

````
npm run build
````

## Local development

````
npm run start
````

## Tests

See TODO.

## Deploy on Heroku

You need an Heroku account, a Github account and a PHP app setup on Heroku in order to deploy this project properly.
We follow this trick https://gist.github.com/wh1tney/2ad13aa5fbdd83f6a489

Before deploying on Heroku be sure to have a `public` folder with your build pushed on Github, or your app will be empty.

So always build and push to Github before deploying.

## Live version
https://algolia-inferno-front.herokuapp.com/
https://enterthusiast.github.io/algolia-inferno-front/ (quicker first load)

## TODO

- Manage 404 image better
- Manage image ghosting/caching issue
- More typescript
- Unit and e2e tests
- Make search sharable with the router and query params
- Use rxjs (debounce, throttle...) to prevent too many request
- Loader/Loading state
- SEO, share, meta
- Page 404
- Animation
- favicon
