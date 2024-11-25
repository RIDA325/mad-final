import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { auth } from '../backend/firebaseAuth';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert("Logged in successfully!");
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Main' }], // Navigate to MainTabs after login
                });
            })
            .catch((err) => setError(err.message));
    };

    return (
        <View style={styles.container}>
            <Image source={require('../assets/cart.png')} style={styles.image} />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
                style={styles.input}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text onPress={() => navigation.navigate('SignupScreen')} style={styles.link}>
                Don’t have an account? <Text style={styles.signupText}>Sign up</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'flex-start', padding: 20, backgroundColor: 'white' },
    image: { width: '100%', height: 300, marginTop: -40, marginBottom: 50 },
    input: { borderWidth: 1, marginBottom: 30, padding: 10, borderRadius: 10, backgroundColor: 'white' },
    error: { color: 'red', marginBottom: 10 },
    link: { color: 'black', marginTop: 10, textAlign: 'center' },
    signupText: { marginTop: 50, color: 'green', textDecorationLine: 'underline' },
    button: { backgroundColor: '#34A853', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 20, alignItems: 'center', marginBottom: 20 },
    buttonText: { color: 'white', fontSize: 20, fontWeight: 'bold' }
});

export default LoginScreen;
