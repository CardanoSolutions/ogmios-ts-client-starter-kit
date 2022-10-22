import {
    createChainSyncClient,
    isByronBlock,
    isByronEpochBoundaryBlock,
} from '@cardano-ogmios/client'
import {
    Allegra,
    Alonzo,
    Babbage,
    Block,
    Byron,
    DigestBlake2BBlockHeader,
    Mary,
    Point,
    Shelley,
    Slot,
} from '@cardano-ogmios/schema';
import {
    createContext
} from './context';


/* A dummy database implementation. */
class Database {
    blocks: Block[];

    constructor() {
	    this.blocks = [];
    }

    rollForward(block : Block) {
	    this.blocks.push(block);
    }

    rollBackward(point : Point) {
	    this.blocks.filter(block => getBlockHeader(block).slot <= point.slot);
    }

    getBlock(point : Point) {
	    return this.blocks.filter(block => getBlockHeader(block).headerHash == point.hash);
    }
}

const rollForward = (db : Database) => async ({ block }: { block: Block }, requestNext: () => void) => {
    console.log(`Roll forward: ${JSON.stringify(block)}`);
    db.rollForward(block);
    requestNext();
}

const rollBackward = (db : Database) => async ({ point }: any, requestNext: () => void) => {
    console.log(`Roll backward: ${JSON.stringify(point)}`);
    db.rollBackward(point);
    requestNext();
}

function getBlockHeader (blockInEra : Block) : { slot : Slot, headerHash: DigestBlake2BBlockHeader } {
    if (isByronEpochBoundaryBlock(blockInEra)) {
        return { slot: blockInEra.byron.header.blockHeight, headerHash: blockInEra.byron.hash }
    } else if (isByronBlock(blockInEra)) {
        return { slot: blockInEra.byron.header.blockHeight, headerHash: blockInEra.byron.hash }
    }

    const block =
            (blockInEra as Shelley).shelley ||
            (blockInEra as Allegra).allegra ||
            (blockInEra as Mary).mary ||
            (blockInEra as Alonzo).alonzo ||
            (blockInEra as Babbage).babbage;

    return { slot: block.header.slot, headerHash: block.headerHash };
}

export async function runExample() {
    const context = await createContext();
    const db = new Database();
    const client = await createChainSyncClient(context, {
        rollForward: rollForward(db),
        rollBackward: rollBackward(db),
    });
    await client.startSync();
}

runExample()
