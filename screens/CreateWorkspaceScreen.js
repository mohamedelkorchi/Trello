// CreateBoardScreen.js
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { createWorkspace } from "../services/TrelloCalls";

const CreateWorkspaceScreen = ({ navigation }) => {
  const [workspaceName, setWorkspaceName] = useState("");
  const handleCreateWorkspace = async () => {
    if (!workspaceName.trim()) {
      Alert.alert("Erreur", "Veuillez entrer un nom pour l'espace de travail.");
      return;
    }
    try {
      await createWorkspace(workspaceName);
      Alert.alert("Succès", "Espace de travail créé avec succès!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Workspaces"),
        },
      ]);
    } catch (error) {
      Alert.alert("Erreur", "Échec de la création de l'espace de travail.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nom de l'espace de travail"
        value={workspaceName}
        onChangeText={setWorkspaceName}
        style={styles.input}
      />
      <Button title="Créer l'espace de travail" onPress={handleCreateWorkspace} />
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

export default CreateWorkspaceScreen;
