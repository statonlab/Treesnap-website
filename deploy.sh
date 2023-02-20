#!/bin/bash
git checkout master
git pull
npm run production \
  && git add -A \
  && git commit -m "Production build" \
  && git checkout live \
  && git merge master \
  && git push \
  && git checkout master \
  && curl https://forge.laravel.com/servers/525932/sites/1535028/deploy/http?token=KDgdwuGtM13BMrbtgLVqTTRaCAmcdhSWKbktuUhx \
  && git push \
  && echo "Deployed successfully"
