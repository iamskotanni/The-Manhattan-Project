import { supabase } from "@/data/supabase";
import { getUserAccounts } from "./account";

import type { InsertTransaction, Transaction, UpdatedTransaction } from "@/data/supabase.types";

/**
 * 
 * @param newTransaction 
 * @returns {Transaction} the newly inserted transaction
 */
export async function insertUserTransaction(newTransaction: InsertTransaction){
  return supabase.from("transactions").insert(newTransaction).select()
}

/**
 * method takes in the user id and returns a list of transactions related to the user's accounts
 * in which the transaction is a **income**
 * @param userId 
 * @returns {Array<Transaction>} a list of transactions
 */
export async function getAllUserIncomeTransactions(userId:string){
  // get user accounts
  const {data, error} = await getUserAccounts(userId)
  
  if (error) {
    return {data: [],error}
  } else {
    // extract acount numbers
    const accountNumbers = data.map(account => account.id)
    // get account transactions 
    return supabase.from("transactions").select("*").in("to_account", accountNumbers)
  }
}

/**
 * method takes in the user id and returns a list of transactions related to the user's accounts
 * in which the transaction is an **expense**
 * @param userId 
 * @returns {Array<Transaction>} a list of transactions
 */
export async function getAllUserExpenseTransactions(userId:string){
  // get user accounts
  const {data, error} = await getUserAccounts(userId)
  
  if (error) {
    return []
  } else {
    // extract acount numbers
    const accountNumbers = data.map(account => account.id)
    // get account transactions 
    return supabase.from("transactions").select("*").in("from_account", accountNumbers)
  }
}

/**
 * gets a list of income transactions related to the given accountId
 * @param accountID 
 * @returns {Array<Transaction>}
 */
export async function getAccountIncomeTransactions(accountID:string) {
  return supabase.from("transactions").select("*").match({
    "to_account": accountID,
    "type": 1
  })
}

/**
 * gets a list of expense transactions related to the given accountId
 * @param accountID 
 * @returns {Array<Transaction>}
 */
export async function getAccountExpenseTransactions(accountID:string) {
  return supabase.from("transactions").select("*").match({
    "from_account": accountID,
    "type": 2
  })
}

/**
 *  
 * @param trasactionId 
 * @param updatedTransaction 
 * @returns {Transaction} returns the updated transaction
 */
export async function updateUserTransaction(trasactionId: string,updatedTransaction: UpdatedTransaction){
  return supabase.from("transactions").update(updatedTransaction).eq("id", trasactionId).select()
}
