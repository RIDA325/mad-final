import React from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const navigation = useNavigation();

  // Categories list with corresponding screens for navigation
  const categories = [
    { name: "Fruits", image: require("../assets/fruit.png"), screen: "Fruits" },
    { name: "Vegetables", image: require("../assets/vegetables.png"), screen: "Vegetables" },
    { name: "Dairies", image: require("../assets/dairies.png"), screen: "Dairies" },
    { name: "Meat", image: require("../assets/meats.png"), screen: "Meat" },
  ];

  // Popular items data
  const popularItems = [
    { name: "Beetroot", price: "Rs.2500", image: require("../assets/beetroot.png") },
    { name: "Broccoli", price: "Rs.3000", image: require("../assets/broccoli.png") },
    { name: "Beetroot", price: "Rs.2500", image: require("../assets/beetroot.png") },
    { name: "Broccoli", price: "Rs.3000", image: require("../assets/broccoli.png") },
  ];

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <FontAwesome name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for products"
          placeholderTextColor="#999"
        />
      </View>

      {/* Categories Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Categories</Text>
      </View>
      <View style={styles.categories}>
        {categories.map((item, index) => (
          <TouchableOpacity
            style={styles.categoryItem}
            key={index}
            onPress={() => navigation.navigate(item.screen)} // Navigate to category screens
          >
            <View style={styles.categoryCircle}>
              <Image source={item.image} style={styles.categoryImage} />
            </View>
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Deals Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Deals</Text>
      </View>
      <View style={styles.dealsImageContainer}>
        <Image
          source={{
            uri: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/18d60b107187879.5fa16aecd880f.jpg",
          }}
          style={styles.dealImage}
        />
      </View>

      {/* Popular Items Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular Items</Text>
      </View>
      <View style={styles.popularItems}>
        {popularItems.map((item, index) => (
          <View style={styles.popularItem} key={index}>
            <Image source={item.image} style={styles.popularImage} />
            <View style={styles.popularTextContainer}>
              <Text style={styles.popularName}>{item.name}</Text>
              <Text style={styles.popularPrice}>{item.price}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5", paddingHorizontal: 16 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 30,
    width: "95%",
    alignSelf: "center",
    elevation: 3,
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, fontSize: 16, color: "#333" },
  sectionHeader: { marginVertical: 20 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", color: "#333" },
  categories: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  categoryItem: { alignItems: "center" },
  categoryCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  categoryImage: { width: 50, height: 50 },
  categoryText: { marginTop: 8, fontSize: 14, color: "#333", fontWeight: "600" },
  dealsImageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  dealImage: {
    width: "95%",
    height: 150,
    borderRadius: 12, // Rounded corners for the image
    resizeMode: "cover",
    elevation: 3,
  },
  popularItems: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  popularItem: {
    width: "48%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    elevation: 5,
  },
  popularImage: { width: "100%", height: 120, borderRadius: 10, marginBottom: 10 },
  popularTextContainer: { alignItems: "center" },
  popularName: { fontSize: 16, fontWeight: "bold", color: "#333" },
  popularPrice: { fontSize: 14, color: "#999", marginTop: 4 },
});

export default HomeScreen;
