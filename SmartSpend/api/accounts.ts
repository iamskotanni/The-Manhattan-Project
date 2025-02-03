import { supabase } from "@/data/supabase";
import { Account, InsertAccount, UpdatedAccount } from "@/data/supabase.types";
import { getAccountExpenseTransactions, getAccountIncomeTransactions } from "./transactions";

export async function insertAccount(newAccount: InsertAccount) {
  return supabase.from("accounts").insert(newAccount);
}

/**
 *
 * @param userId
 * @returns {Array<Account>}
 */
export async function getUserAccounts(userId: string) {
  return supabase.from("accounts").select("*").eq("profile_id", userId);
}

/**
 *
 * @param userId
 * @param updatedAccount
 * @returns {Account} the updated account's details
 */
export async function updateUserAccount(
  userId: string,
  updatedAccount: UpdatedAccount
) {
  return supabase
    .from("accounts")
    .update(updatedAccount)
    .eq("profile_id", userId)
    .select();
}

export async function getAccountIncomeTotal(accountId: string) {
  let totalIncome = 0;

  // get all income transactions
  const { data, error } = await getAccountIncomeTransactions(accountId);

  if (error) {
    console.error({
      Error: error?.message,
    });
  }

  if (data) {
    // extract income values
    const incomeAmounts = data.map((transaction) => transaction.amount);
    // sum up incomes
    totalIncome = incomeAmounts.reduce((prev, current) => prev + current, 0);
  }

    // return total income
  return totalIncome;

}
export async function getAccountExpenseTotal(accountId: string) {
  let totalExpenses = 0;

  // get all expense transactions
  const { data, error } = await getAccountExpenseTransactions(accountId);

  if (error) {
    console.error({
      Error: error?.message,
    });
  }

  if (data) {
    // extract expense values
    const expenseAmounts = data.map((trasaction) => trasaction.amount);
    // sum up expenses
    totalExpenses = expenseAmounts.reduce((prev, current) => prev + current, 0);
  }

  return totalExpenses;
}

export async function getAccountBalance(
  accountID: string
)  {
  const totalIncome = await getAccountIncomeTotal(accountID);
  const totalExpenses = await getAccountExpenseTotal(accountID);
  return totalIncome - totalExpenses;
}
