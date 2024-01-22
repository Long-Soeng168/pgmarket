import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../config/colors';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [nameError, setNameError] = useState(null);
  const [phoneNumberError, setPhoneNumberError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);
  const [passwordMatchError, setPasswordMatchError] = useState(null);

  const validateField = (field, value) => {
    switch (field) {
      case 'name':
        setNameError(value.trim() !== '' ? null : 'Name cannot be empty');
        break;
      case 'phoneNumber':
        setPhoneNumberError(value.trim() !== '' ? null : 'Phone number cannot be empty');
        break;
      case 'email':
        setEmailError(/\S+@\S+\.\S+/.test(value) ? null : 'Invalid email address');
        break;
      case 'address':
        setAddressError(value.trim() !== '' ? null : 'Address cannot be empty');
        break;
      case 'password':
        setPasswordError(value.trim() !== '' ? null : 'Password cannot be empty');
        break;
      case 'confirmPassword':
        setConfirmPasswordError(value.trim() !== '' ? null : 'Confirm password cannot be empty');
        break;
      case 'passwordMatch':
        setPasswordMatchError(value === password ? null : 'Passwords do not match');
        break;
      default:
        break;
    }
  };

  const handleRegister = () => {
    // Validate individual fields
    validateField('name', name);
    validateField('phoneNumber', phoneNumber);
    validateField('email', email);
    validateField('address', address);
    validateField('password', password);
    validateField('confirmPassword', confirmPassword);
    validateField('passwordMatch', confirmPassword);

    // Check if any validation errors
    if (nameError || phoneNumberError || emailError || addressError || passwordError || confirmPasswordError || passwordMatchError) {
      return;
    }

    // Implement your registration logic here
    console.log('Name:', name);
    console.log('Phone Number:', phoneNumber);
    console.log('Email:', email);
    console.log('Address:', address);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);

    // You can add validation, authentication logic, API calls, etc. here

    // After successful registration, navigate to the login screen
    // navigation.navigate('LoginScreen');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Image
          style={{
            width: 100,
            height: 100,
            objectFit: "contain",
            margin: 25,
          }}
          source={require("../assets/images/pgmarketLogo.png")}
        />
        <Text style={styles.title}>Register</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => {
            setName(text);
            validateField('name', text);
          }}
        />
        {nameError && <Text style={styles.errorText}>{nameError}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={(text) => {
            setPhoneNumber(text);
            validateField('phoneNumber', text);
          }}
        />
        {phoneNumberError && <Text style={styles.errorText}>{phoneNumberError}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            validateField('email', text);
          }}
        />
        {emailError && <Text style={styles.errorText}>{emailError}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={(text) => {
            setAddress(text);
            validateField('address', text);
          }}
        />
        {addressError && <Text style={styles.errorText}>{addressError}</Text>}

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              validateField('password', text);
            }}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
          </TouchableOpacity>
        </View>
        {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm Password"
            secureTextEntry={!showPassword}
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              validateField('confirmPassword', text);
            }}
          />
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="gray" />
          </TouchableOpacity>
        </View>
        {confirmPasswordError && <Text style={styles.errorText}>{confirmPasswordError}</Text>}
        {passwordMatchError && <Text style={styles.errorText}>{passwordMatchError}</Text>}

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.loginText}>Already have an account? Login here</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 0,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    // marginBottom: 20,
    paddingHorizontal: 10,
    marginTop: 20,
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 20,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loginText: {
    // marginTop: 20,
    color: colors.primary,
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    // marginBottom: 10,
  },
});

export default RegisterScreen;