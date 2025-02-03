import type { Database } from './types'

export type Profile = Database["public"]["Tables"]["profiles"]["Row"]
export type UpdatedProfile = Database["public"]["Tables"]["profiles"]["Update"]

// Account
export type Account = Database["public"]["Tables"]["accounts"]["Row"]
export type InsertAccount = Database["public"]["Tables"]["accounts"]["Insert"]
export type UpdatedAccount = Database["public"]["Tables"]["accounts"]["Update"]

// Transaction 
export type Transaction = Database["public"]["Tables"]["transactions"]["Row"]
export type InsertTransaction = Database["public"]["Tables"]["transactions"]["Insert"]
// (user should only be able to update category and type )
export type UpdatedTransaction = Database["public"]["Tables"]["transactions"]["Update"]

// Category
export type Category = Database["public"]["Tables"]["category"]["Row"]

// Transaction Type
export type TransactionType = Database["public"]["Tables"]["transaction_type"]

// Address
export type Address = Database["public"]["Tables"]["address"]["Row"]
export type InsertAddress = Database["public"]["Tables"]["address"]["Insert"]
export type UpdatedAddress = Database["public"]["Tables"]["address"]["Update"]

// Budget
export type Budget = Database["public"]["Tables"]["budget"]["Row"]
export type InsertBudget = Database["public"]["Tables"]["budget"]["Insert"]
export type UpdatedBudget = Database["public"]["Tables"]["budget"]["Update"]
