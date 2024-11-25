import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

// Import screens
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./components/CartScreen";
import PaymentScreen from "./screens/PaymentScreen";
import OrderConfirmed from "./screens/OrderConfirmed"; // Import Order Confirmation Screen
import ProfileScreen from "./screens/ProfileScreeen";
import DetailsScreen from "./components/DetailsScreen";
import FruitsScreen from "./screens/FruitsScreen";
import VegetablesScreen from "./screens/Vegetables";
import DairiesScreen from "./screens/Dairies";
import MeatScreen from "./screens/Meat";
import { CartProvider } from "./components/CartContext";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator for Home, Cart, Payment, and Profile
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
            return <FontAwesome name={iconName} size={size} color={color} />;
          } else if (route.name === "Cart") {
            iconName = "shopping-cart";
            return <FontAwesome name={iconName} size={size} color={color} />;
          } else if (route.name === "Payment") {
            iconName = "credit-card";
            return <MaterialIcons name={iconName} size={size} color={color} />;
          } else if (route.name === "Profile") {
            iconName = "user";
            return <FontAwesome name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: "#44C062",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#fff", elevation: 5 },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack} // Use HomeStack for nested navigation 
        options={{ headerShown: false }} 
      />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Payment" component={PaymentStack} options={{ headerShown: false }} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

// Stack Navigator for Home and Category Screens
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: "Fruit Details" }}
      />
      <Stack.Screen
        name="Fruits"
        component={FruitsScreen}
        options={{ title: "Fruits" }}
      />
      <Stack.Screen
        name="Vegetables"
        component={VegetablesScreen}
        options={{ title: "Vegetables" }}
      />
      <Stack.Screen
        name="Dairies"
        component={DairiesScreen}
        options={{ title: "Dairies" }}
      />
      <Stack.Screen
        name="Meat"
        component={MeatScreen}
        options={{ title: "Meat" }}
      />
    </Stack.Navigator>
  );
};

// Stack Navigator for Payment and Order Confirmation Screens
const PaymentStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Payment"
        component={PaymentScreen}
        options={{ title: "Payment" }}
      />
      <Stack.Screen
        name="OrderConfirmed"
        component={OrderConfirmed}
        options={{
          title: "Order Confirmed",
          headerShown: false, // Optional: Hide the header on the confirmation screen
        }}
      />
    </Stack.Navigator>
  );
};

// Main App Component
const App = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          {/* Splash Screen */}
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />

          {/* Authentication Screens */}
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: "Login" }}
          />
          <Stack.Screen
            name="SignupScreen"
            component={SignupScreen}
            options={{ title: "Signup" }}
          />

          {/* Main App Screens */}
          <Stack.Screen
            name="Main"
            component={MainTabs}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;
