import { createStateQueryClient } from '@cardano-ogmios/client';
import { createContext } from './context';

export async function runExample() {
    const context = await createContext();
    const client = await createStateQueryClient(context)

    const height = await client.blockHeight();
    console.log(`height: ${height}`);

    const tip = await client.chainTip();
    console.log(`tip: ${JSON.stringify(tip, null, 2)}`);

    const params = await client.currentProtocolParameters();
    console.log(`params: ${JSON.stringify(params, null, 2)}`);

    client.shutdown();
}

runExample()
