# CheshireCat Node.js SDK

----

**CheshireCat Node.js SDK** is a library to help the implementation
of [Cheshire Cat](https://github.com/matteocacciola/cheshirecat-core) on a Node.js Project

* [Installation](#installation)
* [Usage](#usage)

## Installation

To install CheshireCat Node.js SDK you can add the following line to your package.json file:

```json
{
  "dependencies": {
    "cheshirecat-nodejs-sdk": "github:matteocacciola/cheshirecat-nodejs-sdk"
  }
}
```

## Usage
Initialization and usage:

```javascript
import { CheshireCatClient } from 'cheshirecat-nodejs-sdk';
import { HttpClient } from 'cheshirecat-nodejs-sdk/clients/httpclient';
import { WSClient } from 'cheshirecat-nodejs-sdk/clients/wsclient';

cheshireCatClient = new CheshireCatClient(
    new WSClient('cheshire_cat_core', 1865, null),
    new HttpClient('cheshire_cat_core', 1865, null)
);
```
Send a message to the websocket:

```javascript
import { Message } from 'cheshirecat-nodejs-sdk/models/dtos';

notificationClosure = (message: string) => {
 // handle websocket notification, like chat token stream
}

// result is the result of the message
result = cheshireCatClient.message().sendWebsocketMessage(
    new Message("Hello world!", 'user', []),  // message body
    notificationClosure // websocket notification closure handle
);

```

Load data to the rabbit hole:
```javascript
//file
result = await cheshireCatClient.rabbitHole().postFile(file, null, null);

//url
result = await cheshireCatClient.rabbitHole().postWeb(url, null,null);
```

Memory management utilities:

```javascript
cheshireCatClient.memory().getMemoryCollections(); // get number of vectors in the working memory
cheshireCatClient.memory().getMemoryRecall("HELLO"); // recall memories by text

//delete memory points by metadata, like this example delete by source
cheshireCatClient.memory().deleteMemoryPointsByMetadata(Collection.Declarative, ["source" => $url]);
```
