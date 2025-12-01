import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Search from "@/components/search";
import User from "@/components/user";
import { Contact } from "@/models/contact";

export default function Index() {
  const [search, setSearch] = useState("");
  
  const contacts: Contact[] = [
    { name: "Guðný" },
    { name: "Heimir" },
    { name: "Bjarki" },
    { name: "Vita" },
  ];

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Search value={search} onChange={setSearch} />
      <User contacts={filteredContacts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
});
