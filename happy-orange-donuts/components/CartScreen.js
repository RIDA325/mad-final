import React, { useContext } from "react";
import { FlatList, View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CartContext from "./CartContext";

const CartScreen = () => {
  const { cart, removeFromCart } = useContext(CartContext);
  const navigation = useNavigation();

  const handleRemove = async (id) => {
    try {
      Alert.alert(
        "Remove Item",
        "Are you sure you want to remove this item?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Remove",
            onPress: async () => {
              const success = await removeFromCart(id);
              if (success) {
                Alert.alert("Success", "Item removed successfully");
              }
            },
            style: "destructive",
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to remove item");
    }
  };

  const handleConfirmPayment = () => {
    if (cart.length === 0) {
      Alert.alert("Cart is Empty", "Please add items to your cart before proceeding to payment.");
    } else {
      navigation.navigate("Payment");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const unitPrice = Number(item.price) || 0;
          const itemTotalPrice = (unitPrice * item.quantity).toFixed(2);

          return (
            <View style={styles.item}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.itemDetails}>
                <Text style={styles.name}>{item.name || "Unnamed Item"}</Text>
                <Text style={styles.price}>Price: ${unitPrice.toFixed(2)}</Text>
                <Text style={styles.quantity}>Quantity: {item.quantity}</Text>
                <Text style={styles.itemTotal}>Total: ${itemTotalPrice}</Text>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemove(item.id)}
              >
                <Text style={styles.removeButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your cart is empty.</Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={handleConfirmPayment}
      >
        <Text style={styles.confirmButtonText}>Confirm Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  item: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  price: {
    fontSize: 14,
    color: "#555",
  },
  quantity: {
    fontSize: 14,
    color: "#555",
  },
  itemTotal: {
    fontSize: 14,
    color: "#e74c3c",
  },
  removeButton: {
    backgroundColor: "red",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignSelf: "center",
    marginTop: 10,
  },
  removeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  confirmButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 10,
    margin: 20,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    color: "#555",
  },
});

export default CartScreen;
