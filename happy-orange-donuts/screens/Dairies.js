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

const dairiesData = [
  {
    id: "1",
    name: "Milk",
    price: "$2.99/KG",
    image: "https://cdn.theatlantic.com/thumbor/GCqfW0ynNbC6W-zNYako3g_vVlo=/451x36:1531x1116/1080x1080/media/img/mt/2024/10/Atlantic_Milk_2000x1125/original.jpg",
  },
  {
    id: "2",
    name: "Butter",
    price: "$1.00/KG",
    image: "https://www.allrecipes.com/thmb/YEHvUygNdvsUwzKttGh314d9n1M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/sticks-of-butter-photo-by-twoellis-GettyImages-149134517-resized-3911123142a141eca2340a4bb63e0869.jpg",
  },
  {
    id: "3",
    name: "Cream",
    price: "$1.50/KG",
    image: "https://www.hkarimbuksh.com/cdn/shop/products/Nestle_20Milk_20Pak_20Dairy_20Cream_20200ml_1_924cff29-b50b-4e76-912f-0d8ef78aa402_1024x.jpg?v=1629530609",
  },
  {
    id: "4",
    name: "Condensed Milk",
    price: "$5.99/KG",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfClFgvI0QQljMceuDoaeR7G3wRESZmePfRpvpKb_vD6ZfXfbM1YzPKJoj9wYWWcK9taY&usqp=CAU",
  },
  {
    id: "5",
    name: "Yoghurt",
    price: "$1.20/KG",
    image: "https://www.yoplait.com/_next/image?url=https%3A%2F%2Fprodcontent.yoplait.com%2Fwp-content%2Fuploads%2F2019%2F09%2FYoplait-Greek-100-Protein-Strawberry-Yogurt-460x460-Y.png&w=1024&q=75",
  },
  {
    id: "6",
    name: "Cheese",
    price: "$3.90/KG",
    image: "https://www.schultzscheese.com/wp-content/uploads/2015/06/swiss.jpg",
  },
];

const Dairies = () => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);

  // Toggle favorite item
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Render individual dairy item
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
      <Text style={styles.title}>Dairies</Text>
      <FlatList
        data={dairiesData}
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

export default Dairies;
