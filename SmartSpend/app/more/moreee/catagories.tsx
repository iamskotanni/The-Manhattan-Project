import { getAllCategories } from "@/api/categories";
import { AppLoadingCircle } from "@/components/core";
import { Category } from "@/data/supabase.types";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      setLoadingData(true);
      const { data, error } = await getAllCategories();

      if (data) {
        setCategories(data);
        setLoadingData(false);
      }
    };

    getCategories();
  }, []);

  const addCategory = () => {
    if (newCategoryName.trim() !== "") {
      // setCategories([...categories, newCategoryName]);
      setNewCategoryName("");
    }
  };

  const handleCategoryPress = (category: string) => {
    console.log(`Category pressed: ${category}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.categoryList}>
        {loadingData ? (
          <AppLoadingCircle size={50} />
        ) : (
          <FlatList
            data={categories}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item.id}
                style={styles.categoryItem}
                onPress={() => {}}
              >
                {/* TODO: Fix icon besigheid */}
                <Ionicons name="help" size={20} />
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
            ListEmptyComponent={() => (
              <View>
                <Text>No categories have been added</Text>
              </View>
            )}
          />
        )}
      </View>
      {/* <TextInput
        style={styles.input}
        placeholder="Enter Category Name"
        value={newCategoryName}
        onChangeText={setNewCategoryName}
      />
      <Button title="Add Category" onPress={addCategory} /> */}
      {/* TODO: Add link to go to a google form */}
      {/* <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonLabel}>+</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "#EBEBEB",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#2A2D57",
  },
  backButton: {
    color: "#fff",
    marginRight: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  categoryList: {
    marginTop: 20,
  },
  categoryText: {
    marginBottom: 10,
    fontSize: 16,
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
  addButtonLabel: {
    color: "#fff",
    fontSize: 24,
  },
});

export default CategoriesPage;
