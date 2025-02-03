import { supabase } from "@/data/supabase";
import { Budget, InsertBudget, UpdatedBudget } from "@/data/supabase.types";

const query = supabase.from("budget")

/**
 * function used to create new budget for a user
 * @param newBudget 
 * @returns {Budget} the newly created budget 
 */
export async function createBudget(newBudget: InsertBudget){
  return query.insert(newBudget).select()
}

/**
 * gets a list of a users budgets
 * @param userId 
 * @returns {Array<Budget>} a list of user budget
 */
export async function getUserBudgets(userId :string) {
  // TODO: update it so that it is also able to check between a specific range
  return query.select("*").eq("user_id", userId)
}

/**
 * updates a specific buget
 * @param budgetId 
 * @param updatedBudget 
 * @returns {Budget}
 */
export async function updatedUserBudget(budgetId:string, updatedBudget: UpdatedBudget) {
  return query.update(updatedBudget).eq("id", budgetId).select()
}

/**
 * deletes a specific budget with the given budgetId
 * @param budgetId 
 * @returns {null}
 */
export async function deleteUserBudget(budgetId:string) {
  return query.delete().eq("id", budgetId)
}
