import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Button } from "react-native";
import { fetchBoards, fetchWorkspaces } from "../services/TrelloCalls";
import { CurrentRenderContext, useFocusEffect } from "@react-navigation/native";

function WorkspaceScreen({ navigation }) {
  const [workspaces, setWorkspaces] = useState([]);
  const fetchWorkspacesData = async () => {
    const data = await fetchWorkspaces();
    setWorkspaces(data);
  };
  useEffect(() => {
    fetchWorkspacesData();
  }, []);
  useFocusEffect(
    useCallback(() => {
      fetchWorkspacesData();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <Button
        title="Créer un espace de travail"
        onPress={() => navigation.navigate("CreateWorkspace")}
        color="#888999"
      />

<Text style={{ padding: 10, fontSize: 24, fontWeight: "semibold", textAlign: "center", marginBottom: 10, backgroundColor: "#f0f0f0", borderRadius: 8 }}>
  {workspaces.length === 0
    ? "Pas encore d'espace de travail ..."
    : workspaces.length === 1
      ? "Votre espace de travail :"
      : "Vos espaces de travail :"}
</Text>





      <FlatList
        data={workspaces}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Boards", {
                workspaceId: item.id,
                workspaceName: item.displayName,
              })
            }
            style={{
              padding: 20,
              backgroundColor: "#5526",
              borderBottomWidth: 2,
              borderBottomColor: "#5525",
              borderRadius: 90, 
              margin: 10,
            }}
            
          >
            <Text style={{textAlign: "center"}}>{item.displayName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

export default WorkspaceScreen;