# Planned Pooling Design Tool

a planned pooling crochet and knitting tool with support for displaying multiple types of crochet stitches

# To install

`yarn install`

# To build

`yarn build`

# To run locally

`yarn dev`

# To run eslint

`yarn lint`

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

# Testing

There aren't any actual tests since a ton of the logic is in CSS.

* If you make any changes to Swatch.jsx or Swatch.scss, look at the visual diff between the Preview component (mounted at /preview)
locally compared to the production version, or print out the pdfs of the versions and diff those somehow.
* If you add any swatch types, be sure to update the Preview component with the new swatch types.

I'd love to automate this one day, it's in an issue.
