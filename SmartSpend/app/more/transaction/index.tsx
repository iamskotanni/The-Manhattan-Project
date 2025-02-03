import { getAllUserIncomeTransactions } from "@/api/transactions";
import PageView from "@/components/Themed";
import {
  AppButton,
  AppLoadingCircle,
  EmptyList,
  TransactionListItem,
} from "@/components/core";
import { Transaction } from "@/data/supabase.types";
import useGetUserDetails from "@/hooks/useGetUserDetails";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";

const TransactionsPage: React.FC = () => {
  const [index, setIndex] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedYear, setSelectedYear] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransations] = useState<Transaction[]>([]);
  const { userID, isLoading: userDataLoading } = useGetUserDetails();

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

  return (
    <PageView style={styles.pageContainer}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* <SegmentedControl
            enabled={true}
            values={["Income", "Expenses"]}
            selectedIndex={index}
            onChange={(event) => {
              setIndex(event.nativeEvent.selectedSegmentIndex);
            }}
          /> */}
        <Picker
          style={{ width: "50%", borderWidth: 2 }}
          selectedValue={selectedMonth}
          onValueChange={(itemValue, itemIndex) => setSelectedMonth(itemIndex)}
        >
          <Picker.Item label="Month" value="" />
          <Picker.Item label="January" value="1" />
          <Picker.Item label="February" value="2" />
          <Picker.Item label="March" value="3" />
          <Picker.Item label="April" value="4" />
          <Picker.Item label="May" value="5" />
          <Picker.Item label="June" value="6" />
          <Picker.Item label="July" value="7" />
          <Picker.Item label="August" value="8" />
          <Picker.Item label="September" value="9" />
          <Picker.Item label="October" value="10" />
          <Picker.Item label="November" value="11" />
          <Picker.Item label="December" value="12" />
        </Picker>

        <Picker
          style={{ width: "45%", borderWidth: 2 }}
          selectedValue={selectedYear}
          onValueChange={(itemValue, itemIndex) => setSelectedYear(itemValue)}
        >
          <Picker.Item label="Year" value="" />
          <Picker.Item label="2024" value="2024" />
          <Picker.Item label="2025" value="2025" />
        </Picker>
      </View>
      <AppButton
        title="Show"
        disabled={false}
        isLoading={false}
        onPress={() => {}}
      />

      <View style={{ height: 20 }}></View>

      {isLoading && userDataLoading ? (
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
      <TouchableOpacity style={styles.addButton} onPress={()=> router.navigate("add-transaction")}>
        <Ionicons name="add" size={40} color={"white"} />
      </TouchableOpacity>
    </PageView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#fff", // white background
  },
  headerContainer: {
    backgroundColor: "#2A2D57", // custom color for header background
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff", // white text color
  },
  filterOptions: {
    flexDirection: "row",
  },
  filterOption: {
    marginLeft: 10,
  },
  transactionItem: {
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
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

export default TransactionsPage;
