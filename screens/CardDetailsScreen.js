import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { fetchCardDetails, updateCardDetails, deleteCard, fetchMembers, fetchListsFromBoard } from '../services/TrelloCalls';
import RNPickerSelect from 'react-native-picker-select';

const CardDetailsScreen = ({ route, navigation }) => {
  const { cardId, boardId } = route.params;
  const [card, setCard] = useState(null);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState('');
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState('');

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchDetailsAndMembers = async () => {
      setLoading(true);
      try {
        const details = await fetchCardDetails(cardId);
        setName(details.name);
        setDesc(details.desc);
        setCard(details);
        const fetchedMember = await fetchMembers(boardId);
        const member =  fetchedMember.find(member => member.id === details.members[0].id).id
        setSelectedMember(member);
        setMembers(fetchedMember.map(member => ({ label: member.fullName, value: member.id })));


        const fetchedLists = await fetchListsFromBoard(boardId)
        setLists(fetchedLists.map(list => ({ label: list.name, value: list.id })));
        setSelectedList(details.list.id);
      } catch (error) {
        Alert.alert("Erreur", "Impossible de récupérer les détails de la carte, les membres ou les listes.", error);
      }
      setLoading(false);
    };

    fetchDetailsAndMembers();
  }, []);


  const handleUpdateCard = async () => {
    setLoading(true);
    try {
      await updateCardDetails(cardId, name, desc, selectedMember, selectedList);
      Alert.alert('Succès', 'Carte mise à jour avec succès.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de mettre à jour la carte.');
    }
    setLoading(false);
  };

  const handleDeleteCard = async () => {
    try {
      await deleteCard(cardId);
      Alert.alert('Succès', 'Carte supprimée avec succès.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de supprimer la carte.');
    }
  };

  if(loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }


  if (!card) {
    return <Text>Chargement...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
          <Text style={{marginBottom: 5}}>
        Titre
      </Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Nom de la carte"
      />
       <Text style={{marginBottom: 5}}>
        Description
      </Text>
      <TextInput
        style={styles.input}
        value={desc}
        onChangeText={setDesc}
        placeholder="Description"
        multiline
      />
      <Text style={{marginBottom: 5}}>
        Cette carte est assignée à
      </Text>
      <RNPickerSelect
        onValueChange={(value) => setSelectedMember(value)}
        items={members}
        style={pickerSelectStyles}
        placeholder={{ label: 'Choisir une nouvelle personne', value: null }}
        value={selectedMember}
      />
      <Text style={{ marginBottom: 5 }}>Cette carte est dans la liste</Text>
        <RNPickerSelect
        onValueChange={(value) => setSelectedList(value)}
        items={lists}
        style={pickerSelectStyles}
        placeholder={{ label: 'Sélectionner une liste...', value: null }}
        value={selectedList}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button title="Mettre à jour la carte" onPress={handleUpdateCard} />
        <Button title="Supprimer la carte" onPress={handleDeleteCard} color="red" />
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
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
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 20,
  },
});

export default CardDetailsScreen;
