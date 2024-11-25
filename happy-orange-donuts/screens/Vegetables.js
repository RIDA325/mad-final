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

const VegetablesData = [
  {
    id: "1",
    name: "Carrot",
    price: "$2.99/KG",
    image: "https://png.pngtree.com/png-vector/20231014/ourmid/pngtree-fresh-orange-png-png-image_10159570.png",
  },
  {
    id: "2",
    name: "Lady Finger",
    price: "$1.00/KG",
    image: "https://static.vecteezy.com/system/resources/previews/013/809/324/non_2x/ladyfinger-icon-green-vegetable-vector.jpg",
  },
  {
    id: "3",
    name: "Capsicum",
    price: "$1.50/KG",
    image: "https://www.ladyprovidore.com.au/cdn/shop/products/Capsicum_Red_360e9ed2-108c-46da-ac84-8fa36b0cb5f1_2834x.jpg?v=1601027665",
  },
  {
    id: "4",
    name: "Tomato",
    price: "$5.99/KG",
    image: "https://apnaugao.com/cdn/shop/products/RIOGRANDE.png?v=1659097782",
  },
  {
    id: "5",
    name: "Potato",
    price: "$1.20/KG",
    image: "https://online.citysuper.com.hk/cdn/shop/products/600004493-1-australia-new-potato-s_1080x.jpg?v=1570151091",
  },
  {
    id: "6",
    name: "Onion",
    price: "$3.90/KG",
    image: "https://static.vecteezy.com/system/resources/previews/001/992/951/non_2x/fresh-onion-healthy-vegetable-icon-free-vector.jpg",
  },
];

const Vegetables = () => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);

  // Toggle favorite item
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Render individual vegetable item
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Details", { item })} // Navigate to Details screen
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
      <Text style={styles.title}>Vegetables</Text>
      <FlatList
        data={VegetablesData} // Corrected data reference
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
    marginLeft: 20,
  },
});

export default Vegetables;
