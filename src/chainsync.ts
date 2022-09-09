import { createChainSyncClient, isBabbageBlock, safeJSON } from '@cardano-ogmios/client'
import { Block, PointOrOrigin, TipOrOrigin } from '@cardano-ogmios/schema';
import { createContext } from './context';

const rollForward = async ({ block }: { block: Block}, requestNext: () => void) => {
  console.log(safeJSON.sanitize(block));
  if (isBabbageBlock(block)) {
    console.log(safeJSON.sanitize(block.babbage.header));
  }

  requestNext();
}

const rollBackward = async ({ point }: any, requestNext: () => void) => {
  console.log(JSON.stringify(point));
  requestNext();
}

export async function executeChainSync() {
  const context = await createContext();
  const client = await createChainSyncClient(context, { rollForward, rollBackward });
  await client.startSync();
}

executeChainSync().then(() => console.log("done")).catch(err => console.error(err));