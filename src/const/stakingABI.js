export const stakingABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "erc721",
        "type": "address",
      },
      {
        "internalType": "uint256",
        "name": "tokenID",
        "type": "uint256",
      },
    ],
    "name": "claimReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "erc721",
        "type": "address",
      },
    ],
    "name": "listERC721",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "erc20",
        "type": "address",
      },
      {
        "internalType": "uint256[]",
        "name": "settings",
        "type": "uint256[]",
      },
    ],
    "stateMutability": "nonpayable",
    "type": "constructor",
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address",
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address",
      },
    ],
    "name": "OwnershipTransferred",
    "type": "event",
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256",
      },
    ],
    "name": "refuel",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256",
      },
      {
        "internalType": "address",
        "name": "erc721",
        "type": "address",
      },
      {
        "internalType": "uint256",
        "name": "tokenID",
        "type": "uint256",
      },
    ],
    "name": "stake",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address",
      },
    ],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256",
      },
      {
        "internalType": "uint256",
        "name": "timeDiff",
        "type": "uint256",
      },
    ],
    "name": "calculateReward",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "erc721",
        "type": "address",
      },
      {
        "internalType": "uint256",
        "name": "tokenID",
        "type": "uint256",
      },
    ],
    "name": "calculateRewardFor",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "erc721",
        "type": "address",
      },
      {
        "internalType": "uint256",
        "name": "tokenID",
        "type": "uint256",
      },
    ],
    "name": "stakeAmountFor",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address",
      },
    ],
    "name": "whitelist",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
]
