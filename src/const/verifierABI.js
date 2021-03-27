export const verifierABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address",
      },
      {
        "internalType": "address",
        "name": "erc20",
        "type": "address",
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256",
      },
      {
        "internalType": "uint256",
        "name": "nonce",
        "type": "uint256",
      },
      {
        "internalType": "bytes32",
        "name": "r",
        "type": "bytes32",
      },
      {
        "internalType": "bytes32",
        "name": "s",
        "type": "bytes32",
      },
      {
        "internalType": "uint8",
        "name": "v",
        "type": "uint8",
      },
    ],
    "name": "transferFromBySig",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "tokens",
        "type": "address[]",
      },
    ],
    "stateMutability": "nonpayable",
    "type": "constructor",
  },
  {
    "inputs": [],
    "name": "DOMAIN_TYPEHASH",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32",
      },
    ],
    "stateMutability": "view",
    "type": "function",
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string",
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
    "name": "nonces",
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
    "name": "TRANSFER_FROM_TYPEHASH",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32",
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
    "name": "whitelisted",
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
