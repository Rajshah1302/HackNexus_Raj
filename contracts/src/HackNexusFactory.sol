// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import { HackNexus } from "./HackNexus.sol";

contract HackNexusFactory is Ownable {

    error HackathonNFTFactory_InvalidIndex();

    struct Hackathon {
        address hackathonAddress;
        string hackathonName;
        string hackathonDate;
        string latitude;
        string longitude;
    }

    mapping(uint256 => Hackathon) public hackathons;

    mapping(address => address[]) public creatorToHackathons;

    uint256 public hackathonId;

    event HackathonNFTCreated(
        address indexed hackathonNFT,
        address indexed creator,
        string hackathonName
    );

    constructor(address _initialOwner) Ownable(_initialOwner) { }

    function hostHackathon(
        string memory name,
        string memory symbol,
        string memory _hackathonName,
        string memory _hackathonDate,
        string memory _latitude,
        string memory _longitude,
        string memory _totalPrizePool,
        string[] memory _trackNames,
        string[] memory _trackBounties,
        string memory _svgImage
    ) external returns (address) {
        
        HackNexus newHackathon = new HackNexus(
            name,
            symbol,
            _hackathonName,
            _hackathonDate,
            _latitude,
            _longitude,
            _totalPrizePool,
            _trackNames,
            _trackBounties,
            _svgImage,
            msg.sender 
        );

        hackathonId++;

        Hackathon storage hackathon = hackathons[hackathonId];
        hackathon.hackathonAddress = address(newHackathon);
        hackathon.hackathonName = _hackathonName;
        hackathon.hackathonDate = _hackathonDate;
        hackathon.latitude = _latitude;
        hackathon.longitude = _longitude;

        creatorToHackathons[msg.sender].push(address(newHackathon));

        emit HackathonNFTCreated(address(newHackathon), msg.sender, _hackathonName);
        return address(newHackathon);
    }

    function getHackathonAddresses(address _creator) external view returns (address[] memory) {
        return creatorToHackathons[_creator];
    }
}
