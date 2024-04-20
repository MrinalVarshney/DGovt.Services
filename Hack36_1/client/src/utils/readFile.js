import { create } from 'kubo-rpc-client'
import fs from 'fs'
// Connect to IPFS API
const url = 'http://localhost:5001'
const ipfs = create({url : url});


export default async function readFile(cid) {
    try {
        const fileStream = ipfs.cat(cid);
        console.log(fileStream)
        const chunks = [];
        for await (const chunk of ipfs.cat(cid)) {
            chunks.push(chunk);
        }
        // Concatenate all chunks into a single buffer
        const fileContent = Buffer.concat(chunks);
        const filePath = "/home/lokesh/Desktop/Test/image3.png";
        fs.writeFile(filePath, fileContent, (err) => {
            if (err) {
              console.error('Error writing file:', err);
            } else {
              console.log('File created successfully.');
            }
          });
        console.log('File content:',fileContent);
    } catch (error) {
        console.error('Error reading file:', error);
    }
}
