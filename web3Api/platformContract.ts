import networkConfig from "config/networkConfig";
import { BigNumber, Signer } from "ethers";
import { DoubleDice__factory, VirtualFloorCreationParamsStruct } from "lib/contracts";

export const commitToVirtualFloor = async (signer: Signer, amount: BigNumber, virtualFloorId: string, outcomeIndex: number, deadline: number): Promise<string | null> => {
  const mainContract = DoubleDice__factory.connect(
    networkConfig.platformContractAddress,
    signer
  );
  
  const tx = await mainContract.commitToVirtualFloor(
    virtualFloorId,
    outcomeIndex,
    amount,
    deadline
  );

  const { transactionHash } = await tx.wait();
  if (transactionHash) {
    return transactionHash;
  }

  return null;
}

export const createVirtualFloor = async (signer: Signer, params: VirtualFloorCreationParamsStruct): Promise<string | null> => {
  const mainContract = DoubleDice__factory.connect(
    networkConfig.platformContractAddress,
    signer
  );

  const tx = await mainContract.createVirtualFloor(params);

  const { transactionHash } = await tx.wait();
  if (transactionHash) {
    return transactionHash;
  }

  return null;
}

export const setResult = async (signer: Signer, virtualFloorId: string, winningOutcomeIndex: number): Promise<string | null> => {
  const mainContract = DoubleDice__factory.connect(
    networkConfig.platformContractAddress,
    signer
  );

  const tx = await mainContract.setResult(virtualFloorId, winningOutcomeIndex);

  const { transactionHash } = await tx.wait();
  if (transactionHash) {
    return transactionHash;
  }

  return null;
}

export const challengeSetResult = async (signer: Signer, virtualFloorId: string, outcomeIndex: number): Promise<string | null> => {
  const mainContract = DoubleDice__factory.connect(
    networkConfig.platformContractAddress,
    signer
  );

  const tx = await mainContract.challengeSetResult(virtualFloorId, outcomeIndex);

  const { transactionHash } = await tx.wait();
  if (transactionHash) {
    return transactionHash;
  }
  return null;
}

export const confirmUnchallengedResult = async (signer: Signer, virtualFloorId: string): Promise<string | null> => {
  const mainContract = DoubleDice__factory.connect(
    networkConfig.platformContractAddress,
    signer
  );

  const tx = await mainContract.confirmUnchallengedResult(virtualFloorId);

  const { transactionHash } = await tx.wait();
  if (transactionHash) {
    return transactionHash;
  }

  return null;
}

export const claimRefunds = async (signer: Signer, virtualFloorId: string, tokenIds: BigNumber[]): Promise<string | null> => {
  const mainContract = DoubleDice__factory.connect(
    networkConfig.platformContractAddress,
    signer
  );

  const tx = await mainContract.claimRefunds(virtualFloorId, tokenIds);

  const { transactionHash } = await tx.wait();
  if (transactionHash) {
    return transactionHash;
  }

  return null;
}

export const claimPayouts = async (signer: Signer, virtualFloorId: string, tokenIds: BigNumber[]): Promise<string | null> => {
  const mainContract = DoubleDice__factory.connect(
    networkConfig.platformContractAddress,
    signer
  );

  const tx = await mainContract.claimPayouts(virtualFloorId, tokenIds);

  const { transactionHash } = await tx.wait();
  if (transactionHash) {
    return transactionHash;
  }

  return null;
}
