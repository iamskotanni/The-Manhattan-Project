import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign, Feather } from "@expo/vector-icons";
import PageView from "@/components/Themed";
import BudgetListItem from "@/components/core/BudgetListItem";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { TransationCard } from "@/components/core";
import { BarChart } from "react-native-gifted-charts";

const AnalysisPage: React.FC = () => {
  const [selectedInterval, setSelectedInterval] = useState<string>("Month");
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [index, setIndex] = useState(1);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const barData = [
    { value: 230, label: "Jan", frontColor: "#4ABFF4" },

    { value: 180, label: "Feb", frontColor: "#79C3DB" },

    { value: 195, label: "Mar", frontColor: "#28B2B3" },

    { value: 250, label: "Apr", frontColor: "#4ADDBA" },

    { value: 320, label: "May", frontColor: "#91E3E3" },
  ];

  const getCurrentWeekDates = (): number[] => {
    const currentDay = new Date().getDate();
    const firstDayOfWeek = new Date(
      new Date().setDate(currentDay - (new Date().getDay() || 7) + 1)
    ).getDate();
    return Array.from({ length: 7 }, (_, i) => firstDayOfWeek + i);
  };

  const getCurrentYear = (): number => {
    return new Date().getFullYear();
  };

  const handleIntervalChange = (direction: string) => {
    if (selectedInterval === "Week") {
      const currentWeekDates = getCurrentWeekDates();
      const currentIndex = currentWeekDates.indexOf(selectedDate || 1);
      if (direction === "left") {
        setSelectedDate((date) =>
          date && date > 1 ? date - 1 : currentWeekDates[0]
        );
      } else if (direction === "right") {
        setSelectedDate((date) =>
          date && date < 31
            ? date + 1
            : currentWeekDates[currentWeekDates.length - 1]
        );
      }
    } else if (selectedInterval === "Month") {
      const currentIndex = months.indexOf(selectedMonth || "");
      if (direction === "left") {
        setSelectedMonth(
          months[currentIndex === 0 ? months.length - 1 : currentIndex - 1]
        );
      } else if (direction === "right") {
        setSelectedMonth(
          months[currentIndex === months.length - 1 ? 0 : currentIndex + 1]
        );
      }
    } else if (selectedInterval === "Year") {
      if (direction === "left") {
        setSelectedYear((year) => (year && year > 2023 ? year - 1 : 2023));
      } else if (direction === "right") {
        setSelectedYear((year) => (year && year < 2032 ? year + 1 : 2032));
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageView
        style={{
          display: "flex",
          // justifyContent: "space-around",
          gap: 30,
          padding: 20,
          height: "100%",
        }}
      >
        {/*interval selector*/}
        <SegmentedControl
          enabled={true}
          values={["Week", "Month", "Year"]}
          selectedIndex={index}
          onChange={(event) => {
            setIndex(event.nativeEvent.selectedSegmentIndex);
            setSelectedInterval(event.nativeEvent.value);
          }}
        />

        {/*interval navigation*/}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 40,
            marginBottom: 20,
          }}
        >
          <TouchableOpacity onPress={() => handleIntervalChange("left")}>
            <AntDesign name="left" size={24} color="black" />
          </TouchableOpacity>
          <Text>
            {selectedInterval === "Week"
              ? selectedDate
                ? `Date: ${selectedDate}`
                : `Week: ${getCurrentWeekDates().join(", ")}`
              : selectedInterval === "Month"
              ? selectedMonth
                ? `Month: ${selectedMonth}`
                : `Month: ${months[new Date().getMonth()]}`
              : selectedInterval === "Year"
              ? selectedYear
                ? `Year: ${selectedYear}`
                : `Year: ${getCurrentYear()}`
              : ""}
          </Text>
          <TouchableOpacity onPress={() => handleIntervalChange("right")}>
            <AntDesign name="right" size={24} color="black" />
          </TouchableOpacity>
        </View>

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
            value={100.0}
          />
          <TransationCard
            showIcon={false}
            icon={<Feather name={"trending-down"} color={"red"} size={30} />}
            title="Expense"
            value={-1000}
          />
          <TransationCard
            showIcon={false}
            icon={<Feather name={"dollar-sign"} color={"black"} size={30} />}
            title="Balance"
            value={100.0}
          />
        </View>

        {/*graph overviews */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20, gap: 20 }}>
          {/*graph border*/}
          <View style={styles.chartBox}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Income Overview
            </Text>
            {/*income graph to be implemented*/}
            <BarChart
              showFractionalValues={true}
              showYAxisIndices={true}
              noOfSections={4}
              maxValue={400}
              data={barData}
              isAnimated
            />
          </View>
          {/*graph border */}
          <View style={styles.chartBox}>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              Expense Overview
            </Text>
            {/*expense graph to be implemented*/}
            <BarChart
              showFractionalValues={true}
              showYAxisIndices={true}
              noOfSections={4}
              maxValue={400}
              data={barData}
              isAnimated
            />
          </View>
        </View>
      </PageView>
    </SafeAreaView>
  );
};

export default AnalysisPage;

const styles = StyleSheet.create({
  chartBox: { padding: 10, backgroundColor: "white", elevation: 3 },
});
