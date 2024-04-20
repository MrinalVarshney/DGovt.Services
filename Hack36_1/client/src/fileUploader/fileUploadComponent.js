import React, {useEffect, useState} from "react"
import { useWeb3 } from "../Contract_Instances/Instances"
import addFile from "../utils/addFile";
import { useRef } from "react";

export default function Storage(){
    const [data, setData] = useState(null)
    const [fileName , setFileName] = useState(null)
    const [fileType , setFileType] = useState(null)
    const [storedFiles, setStoredFiles] = useState(null);
    const inputRef = useRef(null);
    const { storageContract, walletAddress } = useWeb3();
    useEffect(() => {
        const getFiles = async () => {
            const res = await storageContract.methods.getFiles();
            console.log(res);
        }
    },[])
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
        const cid = await addFile(data);
        await storageContract.methods.addFile(walletAddress,fileType,fileName,cid);
        console.log(cid);
    }
    return(
        <div>
            Storage
            <br/>
            <input type="file" ref={inputRef} onChange={handleChange}></input>
            <button onClick={handleSubmit}>Submit</button>
            <br/>
        </div>
    )
}