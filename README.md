![Build and deploy site](https://github.com/raphaelmenges/raphaelmenges.github.io/workflows/Build%20and%20deploy%20site/badge.svg?branch=deploy)

Welcome to the repository of my private Web page. [**View page here!**](https://raphaelmenges.github.io)

# Local setup
This is what you have to execute for a local setup. The `archive` folder is *not* automatically deployed to the output directory:
- `bundle install --path vendor`
- `bundle exec jekyll serve`

On Windows, you need to install ImageMagick: https://imagemagick.org/script/download.php

# Todo
- Arts (JustHotAir, Movies, STEOREO ...)
- Fix STEOREO archive deployment (throws error at minimization, excluded in \_config.yml)
- Grants?
- Gallery per item (not overall gallery) + gallery controls
- Print: QR Code + Contact info
- Deploy and document Votes! ?
- ETWEB organization 2019/2020
- Highlights -> print only that as one-page-cv? or make css class "printable?"

# Bugs
- [Responsive] Figure caption sometimes outside of viewport
- [Deployment] Lighbox.js breaks minifier `&& html-minifier --input-dir ./_site --output-dir ./_site --remove-comments --collapse-whitespace --minify-js --minify-css --file-ext js`
