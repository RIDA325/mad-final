import React, { useContext, useState } from "react";
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import CartContext from "./CartContext"; // Ensure your CartContext is correctly imported

const DetailsScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const { addToCart } = useContext(CartContext); // Access the addToCart function from the CartContext
  const [quantity, setQuantity] = useState(1); // Default quantity is set to 1

  const itemPrice = isNaN(item.price) ? 0 : item.price; // Ensure item price is valid

  // Handle adding the item to the cart
  const handleAddToCart = async () => {
    const cartItem = {
      ...item,
      price: itemPrice,
      quantity: quantity,
    };

    try {
      const success = await addToCart(cartItem);
      if (success) {
        Alert.alert("Success", "Item added to cart!");
        navigation.navigate("Cart"); // Navigate to the Cart screen after success
      }
    } catch (error) {
      Alert.alert("Error", "Failed to add item to cart.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.buttonText}>{"< Back"}</Text>
      </TouchableOpacity>

      {/* Item Image */}
      <Image source={{ uri: item.image }} style={styles.image} />

      {/* Item Title */}
      <Text style={styles.title}>{item.name}</Text>

      {/* Item Price */}
      <Text style={styles.price}>Price: ${itemPrice.toFixed(2)}</Text>

      {/* Quantity Control */}
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => setQuantity((prev) => Math.max(1, prev - 1))}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <TextInput
          value={String(quantity)}
          onChangeText={(text) => setQuantity(Number(text))}
          style={styles.quantityInput}
          keyboardType="number-pad"
        />
        <TouchableOpacity
          style={styles.quantityButton}
          onPress={() => setQuantity((prev) => prev + 1)}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Add to Cart Button */}
      <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
        <Text style={styles.addToCartButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
  },
  backButton: {
    alignSelf: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f1f1f1",
    borderRadius: 5,
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  price: {
    fontSize: 18,
    marginBottom: 20,
    color: "#2ecc71",
    fontWeight: "600",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 15,
    padding: 5,
  },
  quantityButton: {
    backgroundColor: "#2ecc71",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  quantityInput: {
    width: 50,
    height: 40,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    textAlign: "center",
    fontSize: 18,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  addToCartButton: {
    backgroundColor: "#2ecc71",
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 60,
    marginTop: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addToCartButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default DetailsScreen;
