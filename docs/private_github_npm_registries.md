# Setting Up Private NPM Registry Access

Organizations (or companies) can use GitHub to deploy private npm registries
that require an authentication token during `npm install`. If you have not
set this up, you may run into an error like this one when trying to install
your Node.js dependencies:

```
npm ERR! code E401
npm ERR! 401 Unauthorized - GET https://npm.pkg.github.com/@<ORGANIZATION>%2f<REPOSITORY> - unauthenticated: User cannot be authenticated with the token provided.

npm ERR! A complete log of this run can be found in:
npm ERR!     /home/<USER>/.npm/_logs/2023-09-03T22_23_54_426Z-debug-0.log
```

This document will help you avoid the aforementioned error and successfully
install dependencies protected behind private GitHub npm registries.
