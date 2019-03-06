# Syncano Socket for <name>

[![Syncano Socket](https://img.shields.io/badge/syncano-socket-blue.svg)](https://syncano.io)
[![CircleCI branch](https://img.shields.io/circleci/project/github/eyedea-io/syncano-socket-customer-io/master.svg)](https://circleci.com/gh/eyedea-io/syncano-socket-customer-io/tree/master)
[![Codecov branch](https://img.shields.io/codecov/c/github/eyedea-io/syncano-socket-customer-io/master.svg)](https://codecov.io/github/eyedea-io/syncano-socket-customer-io/)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![npm](https://img.shields.io/npm/dw/@eyedea-sockets/customer-io.svg)](https://www.npmjs.com/package/@eyedea-sockets/customer-io)
![license](https://img.shields.io/github/license/eyedea-io/syncano-socket-customer-io.svg)

Main Socket features:

> **customer-io/anonymous-event** — Send anonymous event
  * **Params**
    * **event**: string - Event name (required)
    * **data**: object - Additional data sent over with the event (required)

> **customer-io/customer-event** — Send customer event
  * **Params**
    * **customerId**: string - Unique user id 
    * **email**: string - Customer email
    * **event**: string - Event name (required)
    * **data**: object - Additional data sent over with the event

> **customer-io/customer** — add/update customer
  * **Params**
    * **customerId**: string - Unique user id 
    * **email**: string - Customer email (required)
    * **attributes**: object - description: Custom attributes to define the customer

> **customer-io/delete-customers** — Remove customer 
  * **Params**
    * **customerId**: string - Unique user id (required)


Confing: 
```
  SITE_ID - customer.io siteId
  API_KEY = customer.io apiKey
```

## Getting Started

Install package in your project:

```sh
cd my_project
npm install @syncano/cli --save-dev
npm install @eyedea-sockets/<name> --save
npx s deploy
```

Use it:

```js
import Syncano from '@syncano/client'

const s = new Syncano(<instaneName>)

// Search for a user
const params = {
  event: 'recover_password',
  data: {
    'email': 'test@email.com',
  }
}

const suggestions = await s.get('customer-io/anonymous-event', params)

```
