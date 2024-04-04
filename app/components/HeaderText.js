import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";
import { useTranslation } from "react-i18next";

export default function HeaderText({ title, showBackBtn = true }) {
  const navigation = useNavigation();
  const [t, i18n] = useTranslation('global');
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: 'tomato',
      }}
    >
        {showBackBtn && (
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" size={24} color={colors.white} />
            </TouchableOpacity>
        )}
      
      <Text style={{ flex: 1, fontSize: 20, fontWeight: "500", color: colors.white, textAlign: 'center' }}>
        {t(title)}
      </Text>
      {showBackBtn && (
            <View style={{ opacity: 0 }}>
                <Feather name="arrow-left" size={24} color={colors.white} />
            </View>
        )}
    </View>
  );
}
