mocha-node-html-reporter
========================

HTML reporter for Mocha in node environment.

# Use
```bash
npm install mocha-node-html-reporter
mocha -R mocha-node-html-reporter
```

# warning
For some reason I __remove__ `core.__prototype__._elementBuilders['canvas']`
when using jsdom module to simulate browser environment.

Care if you are using jsdom to do other task with this module.