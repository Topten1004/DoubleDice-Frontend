import networkConfig from "config/networkConfig";
import { BigNumber, ethers, Signer } from "ethers";
import { ERC20PresetMinterPauser__factory } from "lib/contracts";

export const getAllowance = async (signer: Signer, tokenAddress: string): Promise<BigNumber> => {
  const tokenContract = ERC20PresetMinterPauser__factory.connect(
    tokenAddress,
    signer
  );

  const account = await signer.getAddress();

  return await tokenContract
    .connect(signer)
    .allowance(account, networkConfig.platformContractAddress);
};

export const getUserBalance = async (signer: Signer, tokenAddress: string, user: string): Promise<BigNumber> => {
  const tokenContract = ERC20PresetMinterPauser__factory.connect(
    tokenAddress,
    signer
  );

  return await tokenContract
    .connect(signer)
    .balanceOf(user);
};

export const increaseAllowanceIfNecessary = async ({
  signer,
  minAllowanceRequired,
  tokenAddress,
  spender = networkConfig.platformContractAddress
}: {
  signer: Signer;
  minAllowanceRequired: BigNumber;
  tokenAddress: string;
  spender?: string;
}): Promise<void> => {
  const currentAllowance = await getAllowance(signer, tokenAddress);
  const isCurrentAllowanceEnough = currentAllowance.gte(minAllowanceRequired);
  // If current allowance is enough to cover the required transaction,
  // we do nothing; but if the current allowance is not enough to cover the required transaction,
  // then we do not only ask for the required increment,
  // but we go all the way and target an "infinite" allowance
  if (!isCurrentAllowanceEnough) {
    const increaseByAmount = ethers.constants.MaxUint256.sub(currentAllowance);
    const tokenContract = ERC20PresetMinterPauser__factory.connect(tokenAddress, signer);
    const tx = await tokenContract.connect(signer).increaseAllowance(spender, increaseByAmount);
    await tx.wait();
  }
};
