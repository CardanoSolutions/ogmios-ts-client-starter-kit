import { createLedgerStateQueryClient } from '@cardano-ogmios/client';
import { createContext } from './context';

function handleBigInt(_, v: unknown): any {
    return typeof v === 'bigint' ? Number(v) : v
}

export async function runExample() {
    const context = await createContext();
    const client = await createLedgerStateQueryClient(context)

    const height = await client.networkBlockHeight();
    console.log(`=== Network height\n${height}\n`);

    const tip = await client.networkTip();
    console.log(`=== Network tip\n${JSON.stringify(tip, null, 2)}\n`);

    const params = await client.protocolParameters();
    delete params.plutusCostModels; // Lots of noise
    console.log(`=== Protocol parameters\n${JSON.stringify(params, handleBigInt, 2)}`);

    client.shutdown();
}

runExample()
