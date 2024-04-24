import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import HTML from "react-native-render-html";
import { Dimensions } from "react-native";
import HeaderText from "../../components/HeaderText";

const screenWidth = Dimensions.get("window").width;

const DetailScreen = ({ route }) => {
  let routeValue = route.params;
  console.log(routeValue);

  const htmlContent = `
  <div style="text-align: center;">
    <h2>Samret Sophat (Mr.)</h2>
    <h3>Founder of Pond Growth, Co. Ltd.</h3>
    <p>
      Samret Sophat, a man of strong leadership, intelligence, and a charitable spirit, is known as Sophat. After completing his university education in ADE, BBA, MBA, and DBA, he served as a school director since 1996. Recognizing real estate as a key business area, he transitioned to become a branch manager in a real estate company in 2007.
    </p>
    <p>
      In 2009, driven by his entrepreneurial spirit and the potential of the real estate sector, Sophat started his own small business (SB). The business experienced rapid growth due to its focus on customer satisfaction and Sophat's strong leadership skills.
    </p>
    <h4>Vision:</h4>
    <p>- To empower all dealers to sell their products to customers in Cambodia and around the world.</p>
    <h4>Goal:</h4>
    <p>
      - Build Your Trust Today<br />
      - Prepare Your Business for the Future
    </p>
    <h4>Mission:</h4>
    <p>
      - Facilitate seamless connections between buyers and sellers everywhere.<br />
      - Reduce costs and time for both buyers and sellers.<br />
      - Ensure efficient and high-quality transactions with a detailed order history for record-keeping.<br />
      - Minimize risks at all stages.
    </p>
  </div>
`;

  return (
    <ScrollView>
        <HeaderText  title="PG Market"/>
        <View style={styles.container}>
            <HTML source={{ html: htmlContent }} contentWidth={screenWidth} />
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
