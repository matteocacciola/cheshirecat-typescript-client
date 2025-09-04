# CheshireCat Typescript Client

----

**CheshireCat Typescript Client** is a library to help the implementation
of [Cheshire Cat](https://github.com/matteocacciola/cheshirecat-core) on a Javascript / Typescript (e.g. Node.js, React.js, Vue.js) Project

* [Installation](#installation)
* [Usage](#usage)

## Installation

To install CheshireCat Typescript Client, run:

```bash
npm install cheshirecat-typescript-client
```

or, if you are using yarn:

```bash
yarn add cheshirecat-typescript-client
```

## Usage
Initialization and usage:

```javascript
import { CheshireCatClient, HttpClient, WSClient } from 'cheshirecat-typescript-client';

const cheshireCatClient = new CheshireCatClient(
    new WSClient('cheshire_cat_core', 1865, null),
    new HttpClient('cheshire_cat_core', 1865, null)
);
```
Send a message to the websocket:

```javascript
import { Message } from 'cheshirecat-typescript-client';

const notificationClosure = (message: string) => {
 // handle websocket notification, like chat token stream
}

// result is the result of the message
const result = cheshireCatClient.message().sendWebsocketMessage(
    new Message("Hello world!"),  // message body
    "agent", // agent name
    "user", // user name
    notificationClosure // websocket notification closure handle
);

```

Load data to the rabbit hole:
```javascript
//file
const result = await cheshireCatClient.rabbitHole().postFile(file, "agent");

//url
const result = await cheshireCatClient.rabbitHole().postWeb(url, "agent");
```

Memory management utilities:

```javascript
cheshireCatClient.memory().getMemoryCollections("agent"); // get number of vectors in the working memory
cheshireCatClient.memory().getMemoryRecall("HELLO", "agent", "user"); // recall memories by text

//delete memory points by metadata, like this example delete by source
cheshireCatClient.memory().deleteMemoryPointsByMetadata("declarative", "agent", {"source": url});
```
