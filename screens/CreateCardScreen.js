import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { createCard, fetchMembers } from "../services/TrelloCalls";
import RNPickerSelect from "react-native-picker-select";

const CreateCardScreen = ({ route, navigation }) => {
  const { listId, boardId } = route.params;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");

  useEffect(() => {
    const loadMembers = async () => {
      const fetchedMembers = await fetchMembers(boardId);
      setMembers(
        fetchedMembers.map((member) => ({
          label: member.fullName,
          value: member.id,
        }))
      );
      if (fetchedMembers.length > 0) {
        setSelectedMember(fetchedMembers[0].id); 
      }
    };

    loadMembers();
  }, []);

  const handleSubmit = async () => {
    if (!name.trim()) {
      Alert.alert("Erreur", "Veuillez fournir un nom de carte.");
      return;
    }

    try {
      await createCard(listId, name, description, selectedMember);
      Alert.alert("Succès", "Carte créée avec succès");
      navigation.goBack(); 
    } catch (error) {
      Alert.alert("Erreur", "Échec de la création de la carte.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Nom de la carte"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        style={styles.input}
      />
      <RNPickerSelect
        onValueChange={(value) => setSelectedMember(value)}
        items={members}
        style={pickerSelectStyles}
        placeholder={{ label: "Sélectionnez un membre...", value: null }}
      />
      <Button title="Créer une carte" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, 
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30, 
    marginBottom: 20,
  },
});

export default CreateCardScreen;
