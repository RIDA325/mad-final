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

const MeatData = [
  {
    id: "1",
    name: "Lamb",
    price: "$2.99/KG",
    image: "https://media.istockphoto.com/id/507909388/photo/fresh-raw-meat-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=4sETtSn3lHSAzsdUCJGpyTAIzi7mcM6v0L8xkl_sd4Q=",
  },
  {
    id: "2",
    name: "Beef",
    price: "$1.00/KG",
    image: "https://www.shysha.in/wp-content/uploads/2021/07/beef-meat.png",
  },
  {
    id: "3",
    name: "Mutton",
    price: "$1.50/KG",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt-66J2xgpWIc38MJGQk0b-xYqZDB31egePhsvIT2_VHkdwTkTi_5hfHc6UiQbtxzTrtE&usqp=CAU",
  },
  {
    id: "4",
    name: "Chicken",
    price: "$5.99/KG",
    image: "https://static.vecteezy.com/system/resources/thumbnails/034/763/859/small_2x/ai-generated-raw-chicken-meat-free-png.png",
  },
  {
    id: "5",
    name: "Fish",
    price: "$1.20/KG",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1C-TO9Smmf_0ebEzL0JNyugRMyyEgeLpP8ZddFytM_8IaqMEjKQbOMeQrcegqvw-KnfY&usqp=CAU",
  },
  {
    id: "6",
    name: "Seafood",
    price: "$3.90/KG",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Plateau_van_zeevruchten.jpg/640px-Plateau_van_zeevruchten.jpg",
  },
];

const Meat = () => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);

  // Toggle favorite item
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Render individual meat item
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
      <Text style={styles.title}>Meat</Text>
      <FlatList
        data={MeatData} // Corrected data reference
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

export default Meat;
