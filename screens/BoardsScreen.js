import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Button } from "react-native";
import {  deleteWorkspace, fetchBoardsByWorkspace } from "../services/TrelloCalls";
import { useFocusEffect } from "@react-navigation/native";

function BoardsScreen({ route, navigation }) {

  const { workspaceId, workspaceName } = route.params;
  const [boards, setBoards] = useState([]);
  const fetchBoardsData = async () => {
    const data = await fetchBoardsByWorkspace(workspaceId);
    setBoards(data);
  };
  const handleDeleteWorkspace = async () => {
    try {
      await deleteWorkspace(workspaceId);
      navigation.navigate("Workspaces");
    } catch (error) {
      Alert.alert("Erreur", "Échec de la suppression de l'espace de travail.", error);
    }
  }


  useEffect(() => {
    fetchBoardsData();
  }, []);
  useFocusEffect(
    useCallback(() => {
      fetchBoardsData();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      {/* edit and delelte button flex space between */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal : 20, paddingVertical:5, borderBottomColor: "#ccc", borderBottomWidth: 1 }}>
        <Button title="Modifier" 
        onPress={() => navigation.navigate("EditWorkspace", { workspaceId, workspaceName })} 
        color="#888999"
        />
        <Button title="Supprimer"
         onPress={handleDeleteWorkspace}
         color="#888999"
         />

      </View>
      <Button
        title="Créer un nouveau tableau"
        onPress={() => navigation.navigate("CreateBoard", { workspaceId, workspaceName })}
        color="#888999"
      />
      
      <FlatList
        data={boards}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("BoardDetails", {
                boardId: item.id,
                boardName: item.name,
              })
            }
            style={{
              padding: 20,
              backgroundColor: "#5526", // Changer la couleur de fond pour quelque chose de joli
              borderBottomWidth: 2,
              borderBottomColor: "#5525",
              borderRadius: 90, // Réduire la taille de la carte en ajustant la bordure
              margin: 10,
            }}
            
          >
            <Text style={{textAlign: "center"}}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default BoardsScreen;
