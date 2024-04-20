// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

struct file{
    string FileName;
    string FileType;
    string cid;
    string accessType;
}


contract Storage{

    mapping(address => file[])fileMapping;

    function addFile(address adr,string memory fileType, string memory fileName,string memory cid) public {
        fileMapping[adr].push(file(fileName,fileType,cid,'public'));
    }

    function getFiles(address adr) public view returns(file[] memory){
        return fileMapping[adr];
    }
}