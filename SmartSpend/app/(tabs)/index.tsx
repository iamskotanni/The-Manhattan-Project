import {
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import PageView, { Text, View } from "@/components/Themed";
import { Feather, Ionicons } from "@expo/vector-icons";
import { AppLoadingCircle, EmptyList, TransactionListItem, TransationCard } from "@/components/core";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import useGetUserDetails from "@/hooks/useGetUserDetails";
import { Link, router } from "expo-router";
import { Account, Transaction } from "@/data/supabase.types";
import { getAllUserIncomeTransactions } from "@/api/transactions";
import { getUserAccounts, getAccountIncomeTotal, getAccountExpenseTotal, getAccountBalance } from "@/api/account";

export default function HomePage() {
  const { userID, isLoading: userDataLoading,profile } = useGetUserDetails();

   const [transactions, setTransations] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [balance, setBalance] = useState(0);
  const [accountsList, setAccountsList] = useState<Account[]>([])

  useEffect(() => {
    const getAllTransactions = async () => {
      if (!userDataLoading && userID) {
        setIsLoading(true);
        const { data, error } = await getAllUserIncomeTransactions(userID);

        if (error) {
          // Alert.alert("Error", error.message
          console.log(error);
        } else {
          setTransations(data);
        }
        setIsLoading(false);
      }
    };

    getAllTransactions()
  }, [userID, userDataLoading]);

  useEffect(() => {
    const loadAccounts = async () => {
      if (!userDataLoading && userID) {
        setIsLoading(true);
        const { data, error } = await getUserAccounts(userID);

        if (error) {
          console.log(error);
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

  // returns a different message depending on the Time Of Day (Morning, Afternoon, Evening)
  function getTODMessage(): string {
    const date = new Date();

    let hours = date.getHours();

    if (hours >= 0 && hours < 12) {
      return "Good morning,";
    } else if (hours >= 12 && hours < 18) {
      return "Good afternoon,";
    } else {
      return "Good evening,";
    }
  }
  return (
    <SafeAreaView>
      <PageView
        style={{
          display: "flex",
          // justifyContent: "space-around",
          gap: 30,
          padding: 20,
          height: "100%",
        }}
      >
        {/* Greeting row with month changer */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text>{getTODMessage()}</Text>
            <Text style={{ fontWeight: "bold" }}>{profile?.first_name}</Text>
          </View>

          <Link href={"/month-picker-modal"}>
            <Pressable
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 4,
                paddingVertical: 6,
                paddingHorizontal: 10,
                borderWidth: 2,
                borderRadius: 10,
              }}
              // onPress={() => {
              //   // Alert.alert("Change month", "Would you like to change month");
              //   router.push("month-picker-modal")
              // }}
            >
              <Feather name="calendar" size={20} />
              <Text>April</Text>
            </Pressable>
          </Link>
        </View>

        {/* Balance */}
        <View>
          <Text>Balance</Text>
          <Text
            style={{
              fontSize: 30,
              fontWeight: "600",
              color: Colors.light.tint,
            }}
          >
            N$ {balance}
          </Text>
        </View>

        {/* Transaction Cards */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 20,
          }}
        >
          <TransationCard
            icon={<Feather name={"trending-up"} color={"green"} size={30} />}
            title="Income"
            value={income}
          />
          <TransationCard
            icon={<Feather name={"trending-down"} color={"red"} size={30} />}
            title="Expenses"
            value={expenses}
          />
        </View>

        <Text>Latest Transactions</Text>
        {/* TransactionList */}
        {/* <FlatList
          data={transactionList}
          renderItem={({item :transaction}) => <TransactionListItem description=""/>}
        /> */}{isLoading && userDataLoading ? (
        <AppLoadingCircle size={50} />
        ) : (
          <FlatList
            data={transactions}
            renderItem={({ item: transaction }) => (
              <TransactionListItem
                description={transaction.reference ?? ""}
                amount={transaction.amount}
                date={new Date(transaction.created_at)}
                showIcon={false}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
            ListEmptyComponent={() => (
              <EmptyList listType="transactions" />
            )}
          />
        )}


        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("more/transactions/add-transaction")}
        >
          <Ionicons name="add" size={40} color={"white"} />
        </TouchableOpacity>
      </PageView>
    </SafeAreaView>
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
