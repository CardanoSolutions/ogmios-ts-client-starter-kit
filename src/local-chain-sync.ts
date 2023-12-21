import {
    createChainSynchronizationClient
} from '@cardano-ogmios/client'
import {
    Block,
    BlockPraos,
    DigestBlake2B256,
    Point,
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
	    this.blocks.filter(block => (block as BlockPraos).slot <= point.slot);
    }

    getBlock(point : Point) {
	    return this.blocks.filter(block => block.id == point.id);
    }
}

const replacer = (_key: any, block: Block) => {
    // Avoids error when serializing BigInt
    delete block['transactions'];
    return block;
}

const rollForward = (db : Database) => async ({ block }: { block: Block }, requestNextBlock: () => void) => {
    console.log(`Roll forward: ${JSON.stringify(block, replacer)}`);
    db.rollForward(block);
    requestNextBlock();
}

const rollBackward = (db : Database) => async ({ point }: any, requestNextBlock: () => void) => {
    console.log(`Roll backward: ${JSON.stringify(point)}`);
    db.rollBackward(point);
    requestNextBlock();
}

export async function runExample() {
    const context = await createContext();
    const db = new Database();
    const client = await createChainSynchronizationClient(context, {
        rollForward: rollForward(db),
        rollBackward: rollBackward(db),
    });
    await client.resume();
}

runExample()
