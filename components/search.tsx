import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

type SearchProps = {
  value: string;
  onChange: (text: string) => void;
};

export default function Search({ value, onChange }: SearchProps) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        placeholderTextColor="#8e8e93"
        value={value}
        onChangeText={onChange}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: '#F2F2F7',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginVertical: 10,
  },
  input: {
    fontSize: 16,
    color: "#000",
  },
});
