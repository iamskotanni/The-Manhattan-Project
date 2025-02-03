import { createBudget } from "@/api/budget";
import { getAllCategories } from "@/api/categories";
import PageView, { View, Text } from "@/components/Themed";
import { AppButton } from "@/components/core";
import { Category } from "@/data/supabase.types";
import useGetUserDetails from "@/hooks/useGetUserDetails";
import { Ionicons } from "@expo/vector-icons";
import RNDateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, TextInput, TouchableOpacity } from "react-native";

export default function AddBudgetPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [limit, setLimit] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const { isLoading: userDataLoading, userID } = useGetUserDetails();
  const [isLoading, setIsLoading] = useState(false);

  const [categoryList, setCategoryList] = useState<Category[]>([]);

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

  const handleBudgetCreation = async () => {
    setIsLoading(true)
    
    // check if category is empty
    if (selectedCategory === 0) {
      Alert.alert("Missing Field", "You MUST select a category");
      setIsLoading(false);
      return;
    }
     // check if amount is empty
     if (limit.trim().length === 0) {
      Alert.alert("Missing Field", "Amount is a required field");
      setIsLoading(false);
      return;
    }

    // implement save
    if(!userDataLoading){
      const {data, error} = await createBudget({
        limit: parseFloat(limit),
        category_id: selectedCategory,
        created_at: date.toDateString(),
        user_id: userID
      })

      if (error){
        Alert.alert("Error", error.message)
      } else{
        Alert.alert("Success", `Budget Added Successfuly`)
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
      {/* date selector */}
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
      {/* category field */}
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
      {/* limit field */}
      <View style={styles.inputBox}>
        <Text>Limit</Text>
        <TextInput
          style={styles.input}
          value={limit}
          onChangeText={(val) => {
            const regex = /^\d*\.?\d*$/;

            if (regex.test(val)) {
              setLimit(val);
            }
          }}
          placeholder="N$ 0"
          placeholderTextColor={"lightgray"}
          keyboardType="number-pad"
          returnKeyType="done"
          autoCapitalize="none"
        />
      </View>

      <AppButton
        title="Add Transaction"
        onPress={handleBudgetCreation}
        disabled={isLoading}
        isLoading={isLoading}
      />
    </PageView>
  );
}

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
