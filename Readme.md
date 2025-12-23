# Bexio

[![Tests](https://github.com/mathewmeconry/bexio/workflows/Test/badge.svg)](https://github.com/mathewmeconry/bexio/actions)
![npm](https://img.shields.io/npm/v/bexio)

## Description

**Basic build and NPM-Package is in ES6!**

NPM Package for the API of [Bexio](https://www.bexio.com)

## Typings

The typings for the module are already included in the package

## API Documentation

The whole documentation of the API can be found here: [https://docs.bexio.com/](https://docs.bexio.com/)

## Support

NodeJS >= 18.14

## Functions

Not all API endpoints are implemented yet. If an endpoint you need is missing, please open a pull request.

## Example

How to use this library

```typescript
// import the module
import Bexio from "bexio";

// init the module with the API_TOKEN
const bexio = new Bexio(API_TOKEN);

// show the contact with ID 1 (Promise)
bexio.contacts.show(1).then((contact) => {
  console.log(contact);
});
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT
