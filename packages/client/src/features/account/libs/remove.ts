import { accountApi, accountModel, billModel } from "../../../entities";

export const remove = async (id: number) => {
  if (
    billModel.useUsersBills().find((bill) => bill.accountId === id) === undefined
  ) {
    await accountApi.remove(id);
    billModel.resetAccBills();
    accountModel.updateAccountsFx(null);
  } else {
    //FIX ME: throw this error into the interface
    const error = new Error();
    error.message = "You cant delete this account beacuse it have bills";
    error.name = "Delete account error";
    console.log(error.message);
  }
};
