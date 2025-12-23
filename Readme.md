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

### Implemented

You can find a list of all implements functions in the [wiki](https://github.com/mathewmeconry/bexio/wiki)

### Missing

You can find a list of all missing functions here: [Missing Functions](https://github.com/mathewmeconry/bexio/wiki#missing-functions).  
If you need a function implemented, please fill out an issue.

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
