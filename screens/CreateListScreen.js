import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { createList } from "../services/TrelloCalls";

const CreateListScreen = ({ route, navigation }) => {
  const { boardId } = route.params;
  const [listName, setListName] = useState("");
  const handleCreateList = async () => {
    if (!listName.trim()) {
      Alert.alert("Erreur", "Veuillez entrer un nom de liste.");
      return;
    }
    try {
      await createList(boardId, listName);
      Alert.alert("Succès", "Liste créée avec succès!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert("Erreur", "Échec de la création de la liste.");
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nom de la liste"
        value={listName}
        onChangeText={setListName}
        style={styles.input}
      />
      <Button title="Créer la liste" onPress={handleCreateList} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
  },
});

export default CreateListScreen;
