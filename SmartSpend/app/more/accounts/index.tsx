import {
  getAccountBalance,
  getAccountExpenseTotal,
  getAccountIncomeTotal,
  getUserAccounts,
} from "@/api/account";
import PageView, { View, Text } from "@/components/Themed";
import AccountCard from "@/components/accounts/AccountCard";
import { AppLoadingCircle, EmptyList, TransationCard } from "@/components/core";
import { Account } from "@/data/supabase.types";
import useGetUserDetails from "@/hooks/useGetUserDetails";
import { Feather, Ionicons } from "@expo/vector-icons";
import { PostgrestError } from "@supabase/supabase-js";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, TouchableOpacity } from "react-native";

export default function AccountsPage() {
  const [accountsList, setAccountsList] = useState<Account[]>([]);
  const { isLoading: userDataLoading, userID } = useGetUserDetails();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<PostgrestError | null>(null);

  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const loadAccounts = async () => {
      if (!userDataLoading && userID) {
        setIsLoading(true);
        const { data, error } = await getUserAccounts(userID);

        if (error) {
          setError(error);
        } else {
          setAccountsList(data);
        }
        setIsLoading(false);
      }
    };

    loadAccounts();
  }, [userDataLoading, userID]);

  useEffect(() => {
    const loadFinancialData = async () => {
      setIsLoading(true);

      let totalIncome = 0;
      let totalExpenses = 0;
      let totalBalance = 0;

      if (accountsList.length !== 0) {
        const incomePromises = accountsList.map(({ id }) => getAccountIncomeTotal(id));
        const expensePromises = accountsList.map(({ id }) => getAccountExpenseTotal(id));
        const balancePromises = accountsList.map(({ id }) => getAccountBalance(id));

        try {
          const incomes = await Promise.all(incomePromises);
          const expenses = await Promise.all(expensePromises);
          const balances = await Promise.all(balancePromises);

          totalIncome = incomes.reduce((prev, current) => prev + current, 0);
          totalExpenses = expenses.reduce((prev, current) => prev + current, 0);
          totalBalance = balances.reduce((prev, current) => prev + current, 0);
        } catch (error) {
          console.error("Error loading account data:", error);
        }
        setIncome(totalIncome);
        setExpenses(totalExpenses);
        setBalance(totalBalance);
        setIsLoading(false);
      }
    };

    loadFinancialData();
  }, [accountsList]);

  return (
    <PageView
      style={{
        display: "flex",
        gap: 30,
        height: "100%",
      }}
    >
      {/*income and expense overviews*/}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          marginBottom: 20,
        }}
      >
        <TransationCard
          showIcon={false}
          icon={<Feather name={"trending-up"} color={"green"} size={30} />}
          title="Income"
          value={income}
        />
        <TransationCard
          showIcon={false}
          icon={<Feather name={"trending-down"} color={"red"} size={30} />}
          title="Expense"
          value={expenses}
        />
        <TransationCard
          showIcon={false}
          icon={<Feather name={"dollar-sign"} color={"black"} size={30} />}
          title="Balance"
          value={balance}
        />
      </View>

      {isLoading || userDataLoading ? (
        <AppLoadingCircle size={50} />
      ) : (
        <FlatList
          data={accountsList}
          renderItem={({ item }) => (
            <AccountCard nickname={item.nickname!!} id={item.id} />
          )}
          ListEmptyComponent={() => <EmptyList listType="accounts" />}
          ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.navigate("more/accounts/add-account")}
      >
        <Ionicons name="add" size={40} color={"white"} />
      </TouchableOpacity>
    </PageView>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#2A2D57",
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
});
