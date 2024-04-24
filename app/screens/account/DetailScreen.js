import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from "react-native";
import HTML from "react-native-render-html";
import { useState, useEffect } from 'react';
import { Dimensions } from "react-native";
import HeaderText from "../../components/HeaderText";
import i18next from 'i18next';

const screenWidth = Dimensions.get("window").width;

const DetailScreen = ({ route }) => {
  let routeValue = route.params;
  console.log(routeValue);

  

    const currentLanguage = i18next.language;

    if (currentLanguage === 'en') {
    console.log('The current language is English.');
    } else {
    console.log('The current language is', currentLanguage);
    }


  const [data, setData] = useState(null);
  const [htmlContent, setHtmlContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://pgmarket.online/api/detail_page?tag=' + routeValue);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
        if(currentLanguage == 'kh' && jsonData.description_kh) {
            setHtmlContent(jsonData.description_kh)
        }else {
            setHtmlContent(jsonData.description)
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView>
        <HeaderText  title="PG Market"/>
        <View style={styles.container}>
            
            {isLoading ? (
                <ActivityIndicator size="large" color="#00ff00" />
            ) : (
                <>
                {error ? (
                    <Text>Error: {error.message}</Text>
                ) : (
                    <>
                    <HTML source={{ html: htmlContent }} contentWidth={screenWidth} />
                    </>
                )}
                </>
            )}
        </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
  },
  content: {},
  paragraph: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default DetailScreen;
