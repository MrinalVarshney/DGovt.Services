import React, {useEffect, useState} from "react"
import { useWeb3 } from "../Contract_Instances/Instances"
import addFile from "../utils/addFile";
import readFile from "../utils/readFile";
import { useRef } from "react";
export default function Storage(){
    const [data, setData] = useState(null)
    const [fileName , setFileName] = useState(null)
    const [fileType , setFileType] = useState(null)
    const [storedFiles, setStoredFiles] = useState(null);
    const inputRef = useRef(null);
    const { storageContract, localwalletAddress}  = useWeb3();
    const handleDownload = async(data) => {
        const bufferData = await readFile(data.cid);
       

     
        const blob = new Blob([bufferData], { type: 'application/octet-stream' });

     
        const url = URL.createObjectURL(blob);

       
        const downloadLink = document.createElement('a');


        downloadLink.href = url;

    
        downloadLink.download = data.FileName + '.' + data.FileType;

 
        document.body.appendChild(downloadLink);

    
        downloadLink.click();

        
        document.body.removeChild(downloadLink);
     
    }
    useEffect(() => {
        if(storageContract && localwalletAddress){
            const getFi = async () => {
                
                console.log(localwalletAddress)
                const res = await storageContract.methods.getFiles(localwalletAddress).call({from : localwalletAddress});
                // console.log(storageContract.methods.getFiles(walletAddress).call)
                console.log(res);
                setStoredFiles(res);
            }
            getFi() 
        }
        
    },[storageContract,localwalletAddress])
    const handleChange = (e) => {
        const file = e.target.files[0];
        console.log(file)
        if (!file) {
            return;
        }
        const type = file.type.split('/')[1];
        const name = file.name
        // console.log(type)
        setFileName(name);
        setFileType(type)
        const reader = new FileReader();
        reader.onload = (e) => {
            // console.log(e);
            const content = e.target.result;
          
            const buff = new Uint8Array(content);
            setData(buff);
        };
        reader.readAsArrayBuffer(file);
    }
    const handleSubmit = async (e) => {
        console.log(localwalletAddress)
        const cid = await addFile(data);
        await storageContract.methods.addFile(localwalletAddress,fileType,fileName,cid).send({from:localwalletAddress});
        console.log(cid);
    }
    return(
        <div>
            Storage
            <br/>
            <input type="file" ref={inputRef} onChange={handleChange}></input>
            <button onClick={handleSubmit}>Submit</button>
            <br/>
            {storedFiles?.map((data) => {
                
                return (
                    <div >
                        <button onClick={()=>{
                            handleDownload(data);
                        }}>
                            {data.FileName}
                        </button>
                        
                    </div>
                )
            })}
        </div>
    )
}