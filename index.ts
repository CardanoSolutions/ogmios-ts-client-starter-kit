import { createInteractionContext, InteractionContext, createStateQueryClient } from '@cardano-ogmios/client'

async function run() {
    const context: InteractionContext = await createInteractionContext(
        err => console.error(err),
        () => console.log("Connection closed."),
        { connection: {  host: process.env.CARDANO_NODE_HOST, port: parseInt(process.env.OGMIOS_PORT!) } }
    )

    const client = await createStateQueryClient(context)
    
    const result = await client.blockHeight();
    console.log(`result: ${result}`);

    await client.shutdown() // Close the connection when done.
}

run().then(() => console.log("done")).catch(err => console.error(err));