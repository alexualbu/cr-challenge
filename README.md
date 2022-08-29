# The problem 

Build a dependencies web service to provide a full list of all transitive dependencies for a given package, the same way npm builds a dependency tree when a user does npm install.
The web-server should return the full package dependency tree based on a given package name and version (user input). 

# Code Review Exercise 

A colleague from our company already implemented the functionality described above. 
Most of the code is boilerplate; the logic for the `/package` endpoint can be found in [src/package.ts](src/package.ts), and some basic tests in [test/package.test.ts](test/package.test.ts)

You should review the implementation of the `package.ts` (and its tests) and be ready for a peer-review discussion. 

In the first part, you will have the chance to chat with the implementer of the solution, ask for clarifications, suggest improvements, etc. 
Afterwards, we will ask you to implement some changes that you proposed. 

## Getting Started

### Prerequisites

* [Node v12 LTS](https://nodejs.org/download/release/latest-v12.x/)

To install dependencies and start the server in development mode:

```sh
npm install
npm start
```

The server will now be running on an available port (defaulting to 3000) and
will restart on changes to the src files.

Then we can try the `/package` endpoint. Here is an example that uses `curl` and
`jq`, but feel free to use any client.

```sh
curl -s http://localhost:3000/package/react/16.13.0 | jq .
```

Feel free to test the implementation with other packages - for example: `express`, `npm`, `trucolor` 

You can run the tests with:

```sh
npm run test

# Or in watch mode
npm run test -- --watch
```

The code is linted via eslint, you can run this via:

```sh
npm run lint
```
