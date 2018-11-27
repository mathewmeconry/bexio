# Bexio
## Description
**Basic build and NPM-Package is in ES6!**

NPM Package for the API of [Bexio](https://www.bexio.com)

## Typings
The typings for the module are already included in the package

## API Documentation
The whole documentation of the API can be found here: [https://docs.bexio.com/](https://docs.bexio.com/)

## Functions
You can find a list of all implements functions in the [wiki](https://github.com/mathewmeconry/bexio/wiki)

## Example with express
List all contacts ordered by name
```javascript
const Bexio = require('./index');
const express = require('express');
const createServer = require('http').createServer;

// initialize the object
const bexioApi = new Bexio.default('CLIENT_ID', 'CLIENT_SECRET', 'http://127.0.0.1/callback', [Bexio.Scopes.CONTACT_SHOW]);

// initialize express and server
const app = express();
const server = createServer(app);

// redirect the user to the Bexio login page
app.get('/', (req, res) => {
    res.redirect(bexioApi.getAuthUrl())
});

// receive the callback of the bexio login page and get the access token
app.get('/callback', (req, res) => {
    bexioApi.generateAccessToken(req.query).then(() => {
        res.send('success')
    }).catch(err => {
        res.send(err)
    });
});

// list all contacts
app.get('/list_contacts', (req, res) => {
    bexioApi.contacts.listContacts({ order_by: 'name_1' }).then(contacts => {
        res.send(contacts)
    }).catch(err => {
        res.send(err)
    })
});

// listen on port 3000
server.listen(3000, () => {
    console.log('Listening on port 3000')
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