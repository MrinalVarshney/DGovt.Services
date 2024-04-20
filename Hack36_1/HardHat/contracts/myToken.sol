// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MyToken {
    string public name;
    uint256 public totalSupply;
    struct balance{
        string name;
        uint256 val;
    }
    mapping(address => balance[]) public balanceOf;

    event Transfer(address indexed from, address indexed to, uint256 value);

    constructor(string memory _name, uint256 _initialSupply) {
        name = _name;
        totalSupply = _initialSupply * 10 ** 18; // Assuming 18 decimal places
        balanceOf[msg.sender].push(balance({name: _name, val: totalSupply})); // Assign all tokens to contract deployer initially
    }

    function transfer(string memory _name, address _to, uint256 _value) external returns (bool) {
        require(_to != address(0), "Invalid recipient address");
    
        // Find and update sender's balance
        bool foundSender = false;
        for(uint256 i = 0; i < balanceOf[msg.sender].length; i++) {
            if(keccak256(bytes(balanceOf[msg.sender][i].name)) == keccak256(bytes(_name))) {
                require(balanceOf[msg.sender][i].val >= _value, "Insufficient balance");
                balanceOf[msg.sender][i].val -= _value;
                foundSender = true;
                break;
            }
        }
        require(foundSender, "Token balance not found for the given name");

        // Find or create and update receiver's balance
        bool foundReceiver = false;
        for(uint256 i = 0; i < balanceOf[_to].length; i++) {
            if(keccak256(bytes(balanceOf[_to][i].name)) == keccak256(bytes(_name))) {
                balanceOf[_to][i].val += _value;
                foundReceiver = true;
                break;
            }
        }
        if (!foundReceiver) {
            balanceOf[_to].push(balance({name: _name, val: _value}));
        }
    
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function getVal(address res, string memory _name) public view returns (uint256) {
        bool found = false;
        uint256 val = 0;
        for(uint256 i = 0; i < balanceOf[res].length; i++) {
            if(keccak256(bytes(balanceOf[res][i].name)) == keccak256(bytes(_name))) {
                found = true;
                val = balanceOf[res][i].val;
                break;
            }
        }
        require(found, "token not found");
        return val;
    }

}
