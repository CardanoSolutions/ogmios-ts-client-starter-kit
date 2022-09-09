import { createStateQueryClient, createTxMonitorClient, safeJSON } from '@cardano-ogmios/client';
import { createContext } from './context';

export async function executeQueries() {
    const context = await createContext();
    const client = await createStateQueryClient(context)
    
    const height = await client.blockHeight();
    console.log(`height: ${height}`);

    const tip = await client.chainTip();
    console.log(`tip: ${safeJSON.stringify(tip)}`);
    
    const params = await client.currentProtocolParameters();
    console.log(`params: ${safeJSON.stringify(params)}`);

    client.shutdown();
}

executeQueries().then(() => console.log("done")).catch(err => console.error(err));