// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract HackNexus is ERC721, Ownable {
    using Strings for uint256;

    string public hackathonName;
    string public hackathonDate;
    string public hackathonVenue;
    string public totalPrizePool;

    string public imageURL;

    uint256 public tokenCounter;

    struct Links {
        string github;
        string youtube;
    }

    mapping(uint256 => Links) public tokenLinks;

    struct Track {
        string name;
        string bounty;
    }

    Track[] public tracks;

    constructor(
        string memory name,
        string memory symbol,
        string memory _hackathonName,
        string memory _hackathonDate,
        string memory _hackathonVenue,
        string memory _totalPrizePool,
        string[] memory _trackNames,
        string[] memory _trackBounties,
        string memory _imageURL,
        address _owner  
    ) ERC721(name, symbol) Ownable(_owner) {
        require(_trackNames.length == _trackBounties.length, "Tracks and bounties length mismatch");

        hackathonName = _hackathonName;
        hackathonDate = _hackathonDate;
        hackathonVenue = _hackathonVenue;
        totalPrizePool = _totalPrizePool;
        imageURL = _imageURL;

        for (uint256 i = 0; i < _trackNames.length; i++) {
            tracks.push(Track(_trackNames[i], _trackBounties[i]));
        }
    }

    /// @notice Mints a new NFT for the participant.
    function mint(string memory _githubLink, string memory _youtubeLink) external {
        tokenCounter++;
        uint256 tokenId = tokenCounter;
        _safeMint(msg.sender, tokenId);
        tokenLinks[tokenId] = Links(_githubLink, _youtubeLink);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "data:application/json;base64,";
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        string memory imageURI = string(
            abi.encodePacked("data:image/svg+xml;base64,", Base64.encode(bytes(imageURL)))
        );

        return string(
            abi.encodePacked(
                _baseURI(),
                Base64.encode(
                    bytes(
                        abi.encodePacked(
                            '{"name":"',
                            hackathonName, ' Participation NFT #', tokenId.toString(),
                            '", "description":"Participation NFT for hackathon ', hackathonName, '", ',
                            '"attributes": [',
                                '{"trait_type": "Hackathon Name", "value": "', hackathonName, '"},',
                                '{"trait_type": "Hackathon Date", "value": "', hackathonDate, '"}',
                            '], "image":"',
                            imageURI,
                            '"}'
                        )
                    )
                )
            )
        );
    }
}
