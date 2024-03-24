// CreateBoardScreen.js
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { createBoardInWorkspace } from "../services/TrelloCalls";

const CreateBoardScreen = ({ route, navigation }) => {
  const { workspaceId, workspaceName } = route.params;
  const [boardName, setBoardName] = useState("");
  const handleCreateBoard = async () => {
    if (!boardName.trim()) {
      Alert.alert("Erreur", "Veuillez entrer un nom de tableau.");
      return;
    }
    try {
      await createBoardInWorkspace(workspaceId, boardName);
      Alert.alert("Succès", "Tableau créé avec succès!", [
        {
          text: "OK",
          onPress: () =>
            navigation.navigate("Boards", {
              workspaceId: workspaceId,
              workspaceName: workspaceName,
            }),

        },
      ]);
    } catch (error) {
      Alert.alert("Erreur", "Échec de la création du tableau.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nom du tableau"
        value={boardName}
        onChangeText={setBoardName}
        style={styles.input}
      />
      <Button title="Créer le tableau" 
      onPress={handleCreateBoard}
      />
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

export default CreateBoardScreen;
