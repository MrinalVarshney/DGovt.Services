// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract election{
    string name ;
    uint256 startDate;
    uint256 endDate;
    constructor(string memory _name, uint256 _stDate, uint256 _endDate){
        name = _name;
        startDate = _stDate;
        endDate = _endDate;
    }
}