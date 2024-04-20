// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Hello {
    string public greeting = "Hello, World!";
    function greet() view public returns(string memory){
        return greeting;
    }
}