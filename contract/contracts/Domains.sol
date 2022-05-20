//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import {StringUtils} from "./lib/StringUtil.sol";
import {Base64} from "./lib/Base64.sol";

import "hardhat/console.sol";

contract Domains is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    string public tld; // Top level domain

    // Mapping domain name to wallet address and records
    mapping(string => address) public domains;
    mapping(string => string) public records;

    // We'll be storing our NFT images on chain as SVGs
    string svgPartOne =
        '<svg xmlns="http://www.w3.org/2000/svg" width="270" height="270" fill="none"><path fill="url(#a)" d="M0 0h270v270H0z"/><defs><filter id="b" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="270" width="270"><feDropShadow dx="0" dy="1" stdDeviation="2" flood-opacity=".225" width="200%" height="200%"/></filter></defs><path fill="#000" d="M14.301 14.475h7.263v163.847h-7.263V14.475zm85.363 164.12L59.717 96.387 99.664 14.18v164.415zm78.779 0-39.945-82.208 39.945-82.207v164.415zM47.075 21.738h20.904L47.075 64.726V21.738zm20.904 149.299H47.075v-43.011l20.904 43.011zM39.812 14.475H79.6L39.812 96.387V14.475zM79.6 178.3H39.812V96.387L79.6 178.3zm45.847-156.562h20.904l-20.904 42.988V21.738zm20.905 149.299h-20.904v-43.011l20.904 43.011zM118.184 14.475h39.787l-39.787 81.912V14.475zM157.971 178.3h-39.787V96.387l39.787 81.913z"/><defs><linearGradient id="a" x1="0" y1="0" x2="270" y2="270" gradientUnits="userSpaceOnUse"><stop stop-color="#ffed21"/><stop offset="1" stop-color="#ffb521" stop-opacity=".99"/></linearGradient></defs><text text-anchor="middle" alignment-baseline="middle" x="135" y="135" font-size="27" stroke-width=".2" stroke="#888" fill="#fff" filter="url(#b)" font-family="Plus Jakarta Sans,DejaVu Sans,Noto Color Emoji,Apple Color Emoji,sans-serif" font-weight="bold">';
    string svgPartTwo =
        '</text><text x="165" y="255" font-size="75" fill="#fff">.kk</text></svg>';

    constructor(string memory _tld) payable ERC721("KK Domain Service", "KKS") {
        tld = _tld;
        console.log("%s name service deployed", _tld);
    }

    function price(string calldata name) public pure returns (uint256) {
        uint256 len = StringUtils.strlen(name);
        require(len > 0);
        if (len == 3) {
            return 5 * 10**14; // 1 MATIC = 1 000 000 000 000 000 000 (18 decimals).
        } else if (len == 4) {
            return 3 * 10**14;
        } else {
            return 1 * 10**14;
        }
    }

    function register(string calldata name) public payable {
        require(domains[name] == address(0));

        uint256 _price = price(name);

        // Check if enough Matic was paid in the transaction
        require(msg.value >= _price, "Not enough Matic paid");

        // Combine the name passed into the function  with the TLD
        string memory _name = string(abi.encodePacked(name, ".", tld));
        // Create the SVG (image) for the NFT with the name
        string memory finalSvg = string(
            abi.encodePacked(svgPartOne, name, svgPartTwo)
        );
        uint256 newRecordId = _tokenIds.current();
        uint256 length = StringUtils.strlen(name);
        string memory strLen = Strings.toString(length);

        console.log(
            "Registering %s.%s on the contract with tokenID %d",
            name,
            tld,
            newRecordId
        );

        // Create the JSON metadata of our NFT. We do this by combining strings and encoding as base64
        string memory json = Base64.encode(
            abi.encodePacked(
                '{"name": "',
                _name,
                '", "description": "A domain on the KK name service", "image": "data:image/svg+xml;base64,',
                Base64.encode(bytes(finalSvg)),
                '","length":"',
                strLen,
                '"}'
            )
        );

        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        console.log(
            "\n--------------------------------------------------------"
        );
        console.log("Final tokenURI", finalTokenUri);
        console.log(
            "--------------------------------------------------------\n"
        );

        _safeMint(msg.sender, newRecordId);
        _setTokenURI(newRecordId, finalTokenUri);
        domains[name] = msg.sender;

        _tokenIds.increment();
    }

    // This will give us the domain owners' address
    function getAddress(string calldata name) public view returns (address) {
        return domains[name];
    }

    function setRecord(string calldata name, string calldata record) public {
        // Check that the owner is the transaction sender
        require(domains[name] == msg.sender);
        records[name] = record;
    }

    function getRecord(string calldata name)
        public
        view
        returns (string memory)
    {
        return records[name];
    }
}
