const contractPerNetwork = {
  mainnet: 'hello.near-examples.near',
  testnet: "hillary2.testnet"//'hello.near-examples.testnet',
};

export const NetworkId = 'testnet';
export const HelloNearContract = contractPerNetwork[NetworkId];