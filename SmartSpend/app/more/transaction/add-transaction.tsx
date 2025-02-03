import React, { useEffect, useState } from "react";
import PageView, { Text, View } from "@/components/Themed";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { Alert, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Account, Category } from "@/data/supabase.types";
import { getAllCategories } from "@/api/categories";
import useGetUserDetails from "@/hooks/useGetUserDetails";
import { getUserAccounts } from "@/api/account";
import { AppButton } from "@/components/core";
import { insertUserTransaction } from "@/api/transactions";

const AddTransactionPage = () => {
  const [index, setIndex] = useState(0);
  const [isExpense, setIsExpense] = useState(false);

  // form shandies
  const [ref, setRef] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedAccount, setSelectedAccount] = useState("");

  const [showDatePicker, setShowDatePicker] = useState(false);

  const { isLoading: userDataLoading, userID } = useGetUserDetails();
  // const [loadUserAccounts, setLoadUserAccounts] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [accountsList, setAccountsList] = useState<Account[]>([]);

  const handleOnDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const {
      type,
      nativeEvent: { timestamp, utcOffset },
    } = event;

    if (type === "set" && selectedDate) {
      setDate(selectedDate);
      setShowDatePicker(false);
    } else if (type === "dismissed") {
      setShowDatePicker(false);
    }
  };

  const handleCreateTransaction = async () => {
    setIsLoading(true);
    // check if account is empty
    if (selectedAccount.trim().length === 0) {
      Alert.alert("Missing Field", "You MUST select an account");
      setIsLoading(false);
      return;
    }
    // check if amount is empty
    if (amount.trim().length === 0) {
      Alert.alert("Missing Field", "Amount is a required field");
      setIsLoading(false);
      return;
    }
    // check if category is empty
    if (selectedCategory === 0) {
      Alert.alert("Missing Field", "You MUST select a category");
      setIsLoading(false);
      return;
    }
    // check if ref is empty
    if (ref.trim().length === 0) {
      Alert.alert("Missing Field", "Reference is a required field");
      setIsLoading(false);
      return;
    }

    // implement save
    const transactionType = isExpense ? 2 : 1
    if (!userDataLoading) {
      if (isExpense) {
        const {data, error} = await insertUserTransaction({
          amount: parseFloat(amount),
          category: selectedCategory,
          from_account: selectedAccount,
          reference: ref,
          type: transactionType,
        });

        if (error){
          Alert.alert("Error", error.message)
        } else{
          Alert.alert("Success", `Transaction Added ${data[0].reference}`)
        }
      }else{
        const {data, error} = await insertUserTransaction({
          amount: parseFloat(amount),
          category: selectedCategory,
          to_account: selectedAccount,
          reference: ref,
          type: transactionType,
        });

        if (error){
          Alert.alert("Error", error.message)
        } else{
          Alert.alert("Success", `Transaction Added ${data[0].reference}`)
        }
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const loadCategories = async () => {
      const { data, error } = await getAllCategories();

      if (error) {
        Alert.alert("Loading Error", error.message);
      } else {
        setCategoryList(data);
      }
    };

    loadCategories();
  }, []);

  useEffect(() => {
    const loadAccounts = async () => {
      if (!userDataLoading && userID) {
        const { data, error } = await getUserAccounts(userID);
        if (error) {
          // Alert.alert("Loading Error", error.message);
          console.log(error);
        } else {
          setAccountsList(data);
        }
      }
    };
    loadAccounts();
  }, [userID, userDataLoading]);

  return (
    <PageView
      style={{
        display: "flex",
        // justifyContent: "space-around",
        gap: 30,
        padding: 20,
        height: "100%",
      }}
    >
      <SegmentedControl
        enabled={true}
        values={["Income", "Expense"]}
        selectedIndex={index}
        onChange={(event) => {
          setIndex(event.nativeEvent.selectedSegmentIndex);
          setIsExpense(event.nativeEvent.value === "Expense");
        }}
      />
      {/* Date */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Ionicons name="calendar-outline" size={26} />
        <TouchableOpacity
          onPress={() => {
            setShowDatePicker(true);
            console.log(showDatePicker);
          }}
        >
          <Text>{date.toDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker ? (
          <RNDateTimePicker
            display="calendar"
            value={date}
            onChange={handleOnDateChange}
          />
        ) : (
          <View />
        )}
      </View>
      {/* Account Picker */}
      <View style={styles.inputBox}>
        <Text>{isExpense ? "From" : "To"} Account</Text>
        <Picker
          style={{ width: "100%", borderWidth: 2 }}
          selectedValue={selectedAccount}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedAccount(itemValue)
          }
        >
          <Picker.Item label="Select Account" value="" />
          {accountsList.map((account, index) => (
            <Picker.Item
              key={index}
              label={account.nickname!}
              value={account.id}
            />
          ))}
        </Picker>
      </View>

      {/* Amount */}
      <View style={styles.inputBox}>
        <Text>Amount</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={(val) => {
            const regex = /^\d*\.?\d*$/;

            if (regex.test(val)) {
              setAmount(val);
            }
          }}
          placeholder="N$ 0"
          placeholderTextColor={"lightgray"}
          keyboardType="number-pad"
          returnKeyType="done"
          autoCapitalize="none"
        />
      </View>
      {/* Category Picker */}
      <View style={styles.inputBox}>
        <Text>Category</Text>
        <Picker
          style={{ width: "100%", borderWidth: 2 }}
          selectedValue={selectedCategory}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedCategory(itemIndex)
          }
        >
          <Picker.Item label="Select Category" value={0} />
          {categoryList.map((category) => (
            <Picker.Item
              key={category.id}
              label={category.name!}
              value={category.id}
            />
          ))}
        </Picker>
      </View>

      {/* Reference */}
      <View style={styles.inputBox}>
        <Text>Reference</Text>
        <TextInput
          style={styles.input}
          value={ref}
          onChangeText={(val) => setRef(val)}
          placeholder="e.g NSFAF Payment"
          placeholderTextColor={"lightgray"}
          keyboardType="default"
          returnKeyType="done"
          autoCapitalize="words"
          maxLength={26}
        />
      </View>

      <AppButton
        title="Add Transaction"
        onPress={handleCreateTransaction}
        disabled={isLoading}
        isLoading={isLoading}
      />

      {/* <TouchableOpacity style={styles.addButton} onPress={() => {}}>
        <Ionicons name="checkmark" size={40} color={"white"} />
      </TouchableOpacity> */}
    </PageView>
  );
};

export default AddTransactionPage;

const styles = StyleSheet.create({
  inputBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: "grey",
    width: "100%",
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
