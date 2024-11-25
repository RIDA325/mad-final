import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  StatusBar,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const PaymentScreen = () => {
  const navigation = useNavigation();
  const [paymentMethods, setPaymentMethods] = useState([
    { id: '1', name: 'Master Card', icon: 'card-outline' },
    { id: '2', name: 'PayPal', icon: 'logo-paypal' },
    { id: '3', name: 'UPI', icon: 'cash-outline' },
  ]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    name: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handlePaymentMethodSelect = (method) => {
    setSelectedMethod(method.id);
  };

  const handleConfirmOrder = () => {
    const missingFields = [];

    if (!selectedMethod) missingFields.push('Payment Method');
    if (!cardDetails.name) missingFields.push('Cardholder Name');
    if (!cardDetails.cardNumber) missingFields.push('Card Number');
    if (!cardDetails.expiry) missingFields.push('Expiry Date');
    if (!cardDetails.cvv) missingFields.push('CVV');

    if (missingFields.length > 0) {
      Alert.alert('Error', `Please fill the following fields:\n${missingFields.join('\n')}`);
    } else {
      // Navigate to OrderConfirmed screen after successful validation
      navigation.navigate('OrderConfirmed');
    }
  };

  const renderPaymentMethod = ({ item }) => {
    const isSelected = item.id === selectedMethod;

    return (
      <TouchableOpacity
        style={[
          styles.paymentMethodContainer,
          isSelected && styles.selectedMethod,
        ]}
        onPress={() => handlePaymentMethodSelect(item)}
      >
        <Ionicons
          name={item.icon}
          size={24}
          color={isSelected ? '#fff' : '#333'}
          style={styles.icon}
        />
        <Text
          style={[
            styles.paymentMethodText,
            isSelected && { color: '#fff' },
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#28a745" barStyle="light-content" />
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.toolbarTitle}>Payment</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Payment Method</Text>
        <FlatList
          horizontal
          data={paymentMethods}
          keyExtractor={(item) => item.id}
          renderItem={renderPaymentMethod}
          contentContainerStyle={styles.flatListContainer}
          showsHorizontalScrollIndicator={false}
        />

        <Text style={styles.sectionTitle}>Card Details</Text>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Cardholder Name"
            value={cardDetails.name}
            onChangeText={(text) =>
              setCardDetails({ ...cardDetails, name: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Card Number"
            keyboardType="numeric"
            value={cardDetails.cardNumber}
            onChangeText={(text) =>
              setCardDetails({ ...cardDetails, cardNumber: text })
            }
          />
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Expiry (MM/YY)"
              value={cardDetails.expiry}
              onChangeText={(text) =>
                setCardDetails({ ...cardDetails, expiry: text })
              }
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="CVV"
              keyboardType="numeric"
              value={cardDetails.cvv}
              onChangeText={(text) =>
                setCardDetails({ ...cardDetails, cvv: text })
              }
            />
          </View>
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
          <Text style={styles.confirmButtonText}>Confirm Order</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#28a745',
    padding: 15,
  },
  toolbarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollView: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  flatListContainer: {
    marginBottom: 20,
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 5,
    elevation: 3,
  },
  selectedMethod: {
    backgroundColor: '#28a745',
  },
  icon: {
    marginRight: 10,
  },
  paymentMethodText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 1,
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
