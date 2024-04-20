// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.24;

// import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// contract votingToken is ERC20 {
//     string public electionId;
//     uint256 public startDate;
//     uint256 public endDate;

//     constructor(string memory _electionId, uint256 _startDate, uint256 _endDate) ERC20("Voting Token", "VOTE") {
//         electionId = _electionId;
//         startDate = _startDate;
//         endDate = _endDate;
//     }

//     function sendToken(address  recipient) public payable {
//         _mint(msg.sender, 1);
//         transfer(recipient, 1);
//     }
    
// }
