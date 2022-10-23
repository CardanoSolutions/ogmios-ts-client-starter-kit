# Ogmios Client Starter Kit

This repo provides a NodeJS package with several examples of how to leverage Ogmios typescript client to execute local-state-queries, local-chain-sync and local-tx-submission and local-tx-monitoring protocols against a node.

## Dev Environment

### Option #1: Manual Setup

For running this starter kit you'll need access to an Ogmios instance connected to a fully synced instance of a Cardano Node. You can read the setup instructions on the documentation for each corresponding component

### Option #2: Demeter.run

If you don't want to install the required components yourself, you can use [Demeter.run](https://demeter.run) platform to create a cloud environment with access to common Cardano infrastrcuture. The following command will open this repo in a private, web-based VSCode IDE with access to a shared Cardano Node and Ogmios.

[![Run in Cardano Workspace](https://demeter.run/code/badge.svg)](https://demeter.run/code/?repository=https://github.com/CardanoSolutions/ogmios-client-starter-kit.git&template=typescript)

## Getting started

> **Note**
> The following instructions assumes that you're using a Cardano Workspace.

Once you've finished with the Cardano Workspace creation process, you should be able to access this codebase from a VSCode IDE instance. Open this README file using the Markdown Preview command to continue this guide from inside the workspace.

Since this is a Node.js package, the next step is to install the dependencies. This can be done by opening the embedded terminal within the VSCode IDE.

> **Note**
> There's no need to install NodeJS or NPM, these tools are already available as part of your workspace.

From within the terminal, run the following yarn command to install the dependencies:

```sh
yarn
```

When yarn finishes, you should be able to execute the examples.

### Run the Local-State-Query example

This example shows how to connect to Ogmios using the Local-State-Query mini-protocol, which allows us to execute queries about the state of the node using request / response semantics.

The code for this example lives in `src/local-state-query.ts`. To start the example, you can run the script called `local-state-query` defined in the `package.json` file. Open the embedded VSCode terminal and execute the following command:

```sh
yarn local-state-query
```

### Run the Local-Chain-Sync example

This example shows how to connect to Ogmios using the Local-Chain-Sync mini-protocol, which allows us to syncrhonize the state of the chain by "pulling" block data.

The code for this example lives in `src/local-chain-sync.ts`. To start the example, you can run the script called `local-chain-sync` defined in the `package.json` file. Open the embedded VSCode terminal and execute the following command:

```sh
yarn local-chain-sync
```

> **Warning**
> The local-chain-sync example does not terminate, it'll start synchronizing blocks from the network tip until your stop it (`CTRL-C`). You'll also notice that it always starts with a _Roll backward_ instruction, from where it'll continue syncing.

## FAQ

### How do I connect to the Ogmios instance?

Ogmios works as a lightweight bridge between the Cardano Node and HTTP web-socket clients. There are many client libraries available but we'll be using only the Typescript client for this starter-kit.

To initialize the client library, the host and port where the **Ogmios instance is listening needs to be specified.

> **Note**
> When running inside a _Cardano Workspace_, these values are already available as environmental variables: `OGMIOS_HOST` and `OGMIOS_PORT`.

The following snippet shows an exmample of how to setup an "interaction context" that will hold the connection between your client and the Ogmios instance.

```ts
import { createInteractionContext } from '@cardano-ogmios/client'

const context = createInteractionContext(
    err => console.error(err),
    () => console.log("Connection closed."),
    { connection: { host: process.env.OGMIOS_HOST, port: parseInt(process.env.OGMIOS_PORT!) } }
);
```

### Where can I get more info about Ogmios?

Ogmios is developed by [Cardano Solutions](https://github.com/cardanosolutions) and the main contributor / maintainer is [KtorZ](https://github.com/KtorZ). The codebase lives in the [CardanoSolutions/Ogmios](https://github.com/cardanosolutions/ogmios) Github repository. Technical documentation and API reference can be found at [ogmios.dev](https://ogmios.dev/).

## DIY Ideas

Here are some ideas on how to continue the development of this starter kit as a way to understand the rest of Ogmios features. These tasks can be acomplished by reading the Ogmios [typescript client documentation](https://ogmios.dev/typescript-client/) and some extrapolation from the existing examples:

- [ ] Query a particular UTxO by output reference.

- [ ] Submit a Tx using the Local-Tx-Submission mini-protocol.

- [ ] Check the state of the mempool using the Tx-Monitor mini-protocol.
