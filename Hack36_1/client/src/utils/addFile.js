import { create } from 'kubo-rpc-client'
// import fs from 'fs'
// Connect to IPFS API
const url = 'http://localhost:5001'
const ipfs = create({url : url});

export default async function addFile(fileContent) {
    // const fileContent = fs.readFileSync('/home/lokesh/Desktop/Test/image.jpg');
    console.log(fileContent)
    const results = await ipfs.add(fileContent);
    const res = await ipfs.pin.add(results.cid.toString());
    // ipfs.pin()
    console.log('File added with CID:', results.cid.toString());
   
    return results.cid.toString();
}