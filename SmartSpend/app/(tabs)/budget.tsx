import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import PageView from "@/components/Themed";
import BudgetListItem from "@/components/core/BudgetListItem";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { AppLoadingCircle, EmptyList, TransationCard } from "@/components/core";
import { router } from "expo-router";
import { Budget } from "@/data/supabase.types";
import { getUserBudgets } from "@/api/budget";
import useGetUserDetails from "@/hooks/useGetUserDetails";

const BudgetPage = () => {
  const [budgetList, setBudgetList] = useState<Budget[]>([]);
  const { userID, isLoading: userDataLoading } = useGetUserDetails();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllBudgets = async () => {
      if (!userDataLoading && userID) {
        setIsLoading(true);
        const { data, error } = await getUserBudgets(userID);

        if (error) {
          console.log(error);
          
        } else {
          setBudgetList(data);
        }
        setIsLoading(false);
      }
      
    };

    getAllBudgets()
  }, [userDataLoading, userID]);

  return (
    <SafeAreaView>
      <PageView
        style={{
          display: "flex",
          height: "100%",
          gap: 20,
          flexGrow: 1,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 6,
          }}
        >
          <TouchableOpacity>
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>

          {/*Date */}
          <Text>April 2024</Text>
          <TouchableOpacity>
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            // paddingHorizontal: 70,
          }}
        >
          <TransationCard icon={<View />} title="Total Budget" value={100.0} />
          <TransationCard icon={<View />} title="Total Spent" value={100.0} />
        </View>

        {/* Budget Cards */}
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingHorizontal: 40,
            paddingVertical: 8,
            gap: 6,
          }}
        >
          {isLoading ? (
            <AppLoadingCircle size={50} />
          ) : (
            <FlatList
              data={budgetList}
              renderItem={({ item }) => (
                <BudgetListItem
                  category={item.id.toString()}
                  limit={item.limit}
                  spent={0}
                />
              )}
              ListEmptyComponent={() => <EmptyList listType="budgets" />}
            />
          )}
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("add-budget")}
        >
          <Ionicons name="add" size={40} color={"white"} />
        </TouchableOpacity>
      </PageView>
    </SafeAreaView>
  );
};

export default BudgetPage;

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
