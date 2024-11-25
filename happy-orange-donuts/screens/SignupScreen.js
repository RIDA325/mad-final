import React, { useState } from 'react'; 
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../backend/firebaseAuth';

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignup = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert("Account created successfully!");
                navigation.navigate('LoginScreen');
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
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <Text onPress={() => navigation.navigate('LoginScreen')} style={styles.link}>
                Already have an account? <Text style={styles.loginText}>Login</Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        justifyContent: 'flex-start', 
        padding: 20, 
        backgroundColor: 'white' 
    },
    image: { 
        width: '100%', 
        height: 300, 
        marginTop: -40, 
        marginBottom: 50 
    },
    input: { 
        borderWidth: 1, 
        marginBottom: 30, 
        padding: 10, 
        borderRadius: 10, 
        backgroundColor: 'white' 
    },
    error: { 
        color: 'red', 
        marginBottom: 10 
    },
    button: {
        backgroundColor: '#34A853',
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    link: { 
        color: 'black', 
        marginTop: 10, 
        textAlign: 'center' 
    },
    loginText: {
        color: 'green',
        textDecorationLine: 'underline',
    }
});

export default SignupScreen;
