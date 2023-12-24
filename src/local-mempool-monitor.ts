import {
    createMempoolMonitoringClient,
    MempoolMonitoring,
} from '@cardano-ogmios/client';
import {
    TransactionId
} from '@cardano-ogmios/schema';
import {
    createContext
} from './context';

async function flushMempool(
    client: MempoolMonitoring.MempoolMonitoringClient
): Promise<TransactionId[]> {
    let transactions = [];

    for(;;){
        const transactionId = await client.nextTransaction();
        if (transactionId !== null) {
            transactions.push(transactionId);
        } else {
            break;
        }
    }

    return transactions;
}

export async function runExample() {
    const context = await createContext();
    const client = await createMempoolMonitoringClient(context);

    while (true) {
        await client.acquireMempool();
        const transactions = await flushMempool(client);
        const capacity = await client.sizeOfMempool();
        console.log(`Local mempool: ${JSON.stringify({ ...capacity, transactions }, null, 2)}`);
        console.log(`Awaiting for changes in the mempool...`);
    }

    client.shutdown();
}

runExample();
