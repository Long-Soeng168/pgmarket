import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../config/colors'; 
import storage from '../../localStorage/storage';
import { userContext } from '../../../App';
import { useTranslation } from 'react-i18next';

const RegisterScreenCart = () => {
  const navigation = useNavigation();

  const [user, setUser] = React.useContext(userContext);
  const [t, i18n] = useTranslation('global');

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
  
  const [errors, setErrors] = useState(false);

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
    setErrors(false);
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

    if(password !== confirmPassword) {
      return;
    }

    // Implement your registration logic here
    // console.log('Name:', name);
    // console.log('Phone Number:', phoneNumber);
    // console.log('Email:', email);
    // console.log('Address:', address);
    // console.log('Password:', password);
    // console.log('Confirm Password:', confirmPassword);

    const fetchData = () => {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");

      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("phone", phoneNumber);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("address", address);

      const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: formdata,
          redirect: "follow",
      };

      fetch(
          "https://pgmarket.online/api/register",
          requestOptions
      )
          .then((response) => {
              if (!response.ok) {
                  throw new Error("Network response was not ok");
              }
              return response.json(); // Convert response to JSON
          })
          .then((result) => {
              if (result.token) {
                  // console.log(result.token);
                  // console.log(JSON.stringify(result, null, 2)); 
                  setUser(result);
                  storage.storeToken(JSON.stringify(result));
                  navigation.replace("CartScreen");
              } 
              if(result.errors) {
                // console.log(JSON.stringify(result, null, 2)); 
                setErrors(true);
              }
              // Process the JSON result here
              // setIsError(false);
          })
          .catch((error) => {
              console.error(
                  "There was a problem with the fetch operation:",
                  error
              );
              // setIsError(true);
          });
  };

  fetchData();

    // You can add validation, authentication logic, API calls, etc. here

    // After successful registration, navigate to the login screen
    // navigation.navigate('LoginScreen');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
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
            source={require("../../assets/images/pgmarketLogo.png")}
          />
          <Text style={styles.title}>{t('register')}</Text>
          <View style={{ width: '100%',  }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 3 }}>{t('name')}</Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  validateField('name', text);
                }}
              />
            </View>
            {nameError && <Text style={styles.errorText}>{nameError}</Text>}
            <View style={{ width: '100%',  }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 3 }}>{t('phone')}</Text>
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
            </View>
            {phoneNumberError && <Text style={styles.errorText}>{phoneNumberError}</Text>}
            <View style={{ width: '100%',  }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 3 }}>{t('email')}</Text>
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
               </View>
            {emailError && <Text style={styles.errorText}>{emailError}</Text>}
            <View style={{ width: '100%',  }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 3 }}>{t('address')}</Text>
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={address}
              onChangeText={(text) => {
                setAddress(text);
                validateField('address', text);
              }}
            />
               </View>
            {addressError && <Text style={styles.errorText}>{addressError}</Text>}
            <View style={{ width: '100%',  }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 3 }}>{t('password')}</Text>
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
                <Ionicons name={showPassword ? "eye" : "eye-off"} size={24} color="gray" />
              </TouchableOpacity>
            </View>
            </View>
            {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
            <View style={{ width: '100%',  }}>
              <Text style={{ fontWeight: 'bold', marginBottom: 3 }}>{t('confirmPassword')}</Text>
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
                <Ionicons name={showPassword ? "eye" : "eye-off"} size={24} color="gray" />
              </TouchableOpacity>
            </View>
            </View>
          {confirmPasswordError && <Text style={styles.errorText}>{confirmPasswordError}</Text>}
          {passwordMatchError && <Text style={styles.errorText}>{passwordMatchError}</Text>}
      
          {errors && <Text style={[styles.errorText, {textAlign: 'center', width: '100%'}]}>Phone or Email was Taken</Text>}
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>{t('register')}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreenCart')}>
            <Text style={styles.loginText}>{t('hasAcc')}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
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
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    // marginBottom: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  passwordContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 10,
  },
  eyeIcon: {
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 17,
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loginText: {
    marginTop: 10,
    color: colors.primary,
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    // marginBottom: 10,
  },
});

export default RegisterScreenCart;