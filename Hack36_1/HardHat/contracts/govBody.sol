// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "./myToken.sol";

contract govBody {
    MyToken elecToken;

    struct User {
        address userAddress;
        bytes publicKey;
        bool registered;
        // other fields as needed
    }
    
    constructor(address _tokenAddress) {
        elecToken = MyToken(_tokenAddress);
    }

    struct Party{
        string name;
        string leader;
        uint256 voteCount;
        bool winner;
    }
    struct ElectionData {
        string name;
        uint256 st_time;
        uint256 end_time;
        string winningParty;
        mapping(uint256 => Party) parties; // Use mapping instead of array
        uint256 partyCount; // Track the count separately
    }

    ElectionData[] public elections;

    // Mapping to store registered users who can vote
    mapping(address => User) public users;
    address[] signedUsers;
    //Function to add register user for voting
    function addUser(address _userAddress, bytes memory _publicKey) external {
        users[_userAddress] = User(_userAddress, _publicKey, true);
        signedUsers.push(_userAddress);
    }

    //Function to check if a user is pre-registered
    function checkUser(address _userAddress) external view returns (bool) {
        return users[_userAddress].registered;
    }

    function createElectionToken(
        string memory _name,
        uint256 supply
    ) public {
        elecToken = new MyToken(_name, supply);
    }
    function distribute(string memory _name, address _to, uint256 val, bool isGov, uint256 st_time, uint256  end_time) public {
        if(!isGov){
            bool foundUser = false;
            for(uint256 i = 0; i < signedUsers.length; i++){
                if(_to == signedUsers[i]){
                    foundUser = true;
                    break;
                }
            }
            require(foundUser, "can't transfer to the accounts other than parties");
            require((block.timestamp >= st_time && block.timestamp <= end_time), "election is over");
        }
        elecToken.transfer(_name, _to, val);
    }

    function getVal(address res, string memory _tokenName) public view returns (uint256) {
        return elecToken.getVal(res, _tokenName);
    }

    // creation of election
    function createElection(
        string memory _name,
        uint256 stTime,
        uint256 endTime,
        uint256 countofVoters,
        Party[] calldata participatingParties
    ) public {
        createElectionToken(_name, countofVoters);

        for(uint256 i = 0; i < signedUsers.length; i++){
            distribute(_name, signedUsers[i], 1, true, stTime, endTime);
        }

        ElectionData storage newElection = elections.push();
        newElection.name = _name;
        newElection.st_time = stTime;
        newElection.end_time = endTime;
        newElection.winningParty = "";
        for (uint256 i = 0; i < participatingParties.length; i++) {
            newElection.parties[i] = participatingParties[i];
        }

        newElection.partyCount = participatingParties.length;
    }

    // election winning
function declareWinner(string memory _name, uint256 _stTime, uint256 _endTime) public view returns (string memory, uint256, uint256) {
    uint256 ind = 0;
    bool found = false;
    for(uint256 i = 0; i < elections.length; i++){
        if(keccak256(bytes(elections[i].name)) == keccak256(bytes(_name))){
            if(elections[i].st_time == _stTime && elections[i].end_time == _endTime){
                ind = i;
                found = true;
                break;
            }
        }
    }
    require(found, "not found");
    require(elections[ind].partyCount > 0, "No election found with these credentials");

    Party memory winningParty;
    uint256 votes = 0;
    for(uint256 i = 0; i < elections[ind].partyCount; i++){
        if(votes < elections[ind].parties[i].voteCount){
            votes = elections[ind].parties[i].voteCount;
            winningParty = elections[ind].parties[i];
        }
    }
    winningParty.winner = true;
    return (winningParty.name, votes, votes); // assuming `maxi` should be equal to `votes`
}



}
