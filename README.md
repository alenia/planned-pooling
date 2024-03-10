# Planned Pooling Design Tool

a planned pooling crochet and knitting tool with support for displaying multiple types of crochet stitches

# To run eslint

`yarn lint`

# Testing

There are some tests using vitest. All helper methods should be unit tested, but I haven't backfilled the component tests:

* to run the tests: `yarn test`

A ton of the logic is in CSS, but needs to be tested still:

* If you make any changes to Swatch.jsx or Swatch.scss, look at the visual diff between the Preview component (mounted at /preview)
locally compared to the production version, or print out the pdfs of the versions and diff those somehow.
* If you add any swatch types, be sure to update the Preview component with the new swatch types.

I'd love to automate this one day, it's in an issue.

# Before you PR

Make sure this passes tests, typecheck and lint:

* `yarn lint` runs linter and typescript check
* `yarn test` fires up a test runner

  
# To install

`yarn install`

# To build

`yarn build`

# To run locally

`yarn dev`

# Deploying

I deploy this on digital ocean, and I have an app set up to track changes to the `release` branch. Here's what I do to deploy:
```
git co release
git fetch
git merge origin/main
git push origin release
git co -
```
the last command switches you back to the branch you were on. There should be no commits on release that aren't already on main.
I might try implementing tagging and scripting that later

