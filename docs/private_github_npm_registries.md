# Setting Up Private NPM Registry Access

Organizations (or companies) can use GitHub to deploy private npm registries
that require an authentication token during `npm install`. If you have not
set this up, you may run into an error like this one when trying to install
your Node.js dependencies:

--insert picture here--

This document will help you avoid the aforementioned error and successfully
install dependencies protected behind private GitHub npm registries.