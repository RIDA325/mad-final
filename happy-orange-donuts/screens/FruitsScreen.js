import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const fruitsData = [
  {
    id: "1",
    name: "Orange",
    price: "$2.99/KG",
    image: "https://png.pngtree.com/png-vector/20231014/ourmid/pngtree-fresh-orange-png-png-image_10159570.png",
  },
  {
    id: "2",
    name: "Banana",
    price: "$1.00/KG",
    image: "https://png.pngtree.com/png-vector/20220708/ourmid/pngtree-banana-clipart-design-png-image_5766012.png",
  },
  {
    id: "3",
    name: "Kiwi",
    price: "$1.50/KG",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ34vUZscSB-FA5--dYxc14NSqL6pkUpiFF6w&s",
  },
  {
    id: "4",
    name: "Avocado",
    price: "$5.99/KG",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR2eTu7gAGf9bYE_zQS2A2C4mbE9m_SVD3AQ&s",
  },
  {
    id: "5",
    name: "Apple",
    price: "$1.20/KG",
    image: "https://png.pngtree.com/png-clipart/20230110/ourmid/pngtree-fresh-red-apple-png-image_6558046.png",
  },
  {
    id: "6",
    name: "Strawberry",
    price: "$3.90/KG",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0VlMUxbsc3TeLacOKL60mMRE-mL6L6MmMCw&s",
  },
];

const FruitsScreen = () => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);

  // Toggle favorite item
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Render individual fruit item
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Details", { item })}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
      </View>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>

      {/* Buttons Row */}
      <View style={styles.buttonsRow}>
        {/* Add Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("Details", { item })}
        >
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>

        {/* Favorite Icon */}
        <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
          <Text style={styles.favorite}>
            {favorites.includes(item.id) ? "❤️" : "🤍"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fruits</Text>
      <FlatList
        data={fruitsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#4CAF50",
  },
  list: {
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 10,
    width: "45%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  price: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
    textAlign: "center",
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 50,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  addText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  favorite: {
    fontSize: 24,
    color: "#e74c3c",
    marginLeft: 20, // Adds spacing between the button and the heart icon
  },
});

export default FruitsScreen;
