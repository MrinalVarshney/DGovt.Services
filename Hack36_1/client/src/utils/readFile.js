import { create } from 'kubo-rpc-client'
import { Buffer } from 'buffer';
// import fs from 'fs'
// Connect to IPFS API
const url = 'http://localhost:5001'
const ipfs = create({url : url});


export default async function readFile(cid) {
    try {
        const fileStream = ipfs.cat(cid);
        // console.log(fileStream)
        const chunks = [];
        for await (const chunk of ipfs.cat(cid)) {
            chunks.push(chunk);
        }
    

        // Concatenate all chunks into a single buffer
        const fileContent = Buffer.concat(chunks);
        
        return fileContent
    } catch (error) {
        console.error('Error reading file:', error);
    }
}
