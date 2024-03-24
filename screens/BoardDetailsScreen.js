import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";
import CardItem from "../components/CardItem";
import { useFocusEffect } from "@react-navigation/native";
import {
  deleteBoard,
  deleteList,
  fetchCardsFromList,
  fetchListsFromBoard,
} from "../services/TrelloCalls";

const BoardDetailsScreen = ({ route, navigation }) => {
  const { boardId } = route.params;
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchListsAndCards = async () => {
    setLoading(true);
    const fetchedLists = await fetchListsFromBoard(boardId);
    const listsWithCards = await Promise.all(
      fetchedLists.map(async (list) => {
        const cards = await fetchCardsFromList(list.id);
        return { ...list, cards };
      })
    );
    setLists(listsWithCards);
    setLoading(false);
  };

  const handleDeleteBoard = async () => {
    setLoading(true);
    try {
      await deleteBoard(boardId);
      Alert.alert("Succès", "Tableau fermé avec succès.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erreur", "Échec de la fermeture du tableau.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchListsAndCards();
  }, [boardId]);

  useFocusEffect(
    useCallback(() => {
      fetchListsAndCards();
    }, [])
  );

  const handleDeleteList = async (listId) => {
    setLoading(true);
    try {
      await deleteList(listId);
      fetchListsAndCards();
      fetchListsAndCards();
      Alert.alert("Succès", "Liste supprimée avec succès.");
    } catch (error) {
      Alert.alert("Erreur", "Échec de la suppression de la liste.");
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          padding: 10,
          // borderBottomWidth: 1,
          borderBottomColor: "red",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Button
          title="Nouvelle Liste"
          onPress={() => navigation.navigate("CreateList", { boardId })}
          color="#888999"
        />

        <Button title="Supprimer le Tableau"
         onPress={handleDeleteBoard}
         color="#888999"
         />
      </View>
      <ScrollView horizontal={true} style={{ flex: 1 }}>
        {lists.map((list) => (
          <View
            key={list.id}
            style={{
              margin: 10,
              width: 250,
              backgroundColor: "#5521",
              padding: 10,
              borderRadius: 10,
            }}
          >
            <View
              style={{ flexDirection: "row", justifyContent: "space-between",  }}
            >

              <Text style={{ fontSize: 18, fontWeight: "bold", padding: 10 }}>
                {list.name}
              </Text>
              <Button 
                title="Supprimer la Liste"
                onPress={() => handleDeleteList(list.id)}
                color="#888999"
              />
            </View>
            <FlatList
              data={list.cards}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CardItem
                  card={{
                    boardId: boardId,
                    ...item,
                  }}
                  navigation={navigation}
                />
              )}
            />
            <Button
              title="Nouvelle Carte"
              onPress={() =>
                navigation.navigate("CreateCard", {
                  listId: list.id,
                  boardId: boardId,
                })
              }
              color="#888999"
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default BoardDetailsScreen;
