import React, { useState, useEffect } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { editWorkspace, fetchWorkspaceDetails } from "../services/TrelloCalls";

const EditWorkspaceScreen = ({ navigation, route }) => {
  const [workspaceName, setWorkspaceName] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const workspaceDetails = await fetchWorkspaceDetails(route.params.workspaceId);
        setWorkspaceName(workspaceDetails.displayName);
      } catch (error) {
        Alert.alert("Erreur", "Échec de récupération des détails de l'espace de travail.");
      }
    };

    fetchDetails();
  }, [route.params.workspaceId]);

  const handleEditWorkspace = async () => {
    if (!workspaceName.trim()) {
      Alert.alert("Erreur", "Veuillez entrer un nom pour l'espace de travail.");
      return;
    }
    try {
      await editWorkspace(route.params.workspaceId, workspaceName);
      Alert.alert("Succès", "Espace de travail modifié avec succès!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Workspaces"),
        },
      ]);
    } catch (error) {
      Alert.alert("Erreur", "Échec de la modification de l'espace de travail.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nom de l'espace de travail"
        value={workspaceName}
        onChangeText={setWorkspaceName}
        style={styles.input}
        clearButtonMode='always'
      />
      <Button title="Modifier l'espace de travail" onPress={handleEditWorkspace} />
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

export default EditWorkspaceScreen;
