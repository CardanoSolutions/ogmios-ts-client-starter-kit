import { createInteractionContext } from '@cardano-ogmios/client'

export const createContext = () => createInteractionContext(
    err => console.error(err),
    () => console.log("Connection closed."),
    { connection: { host: process.env.OGMIOS_HOST, port: parseInt(process.env.OGMIOS_PORT!) } }
);
