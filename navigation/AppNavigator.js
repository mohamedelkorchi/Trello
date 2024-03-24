import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import BoardsScreen from '../screens/BoardsScreen';
import BoardDetailsScreen from '../screens/BoardDetailsScreen';
import CreateBoardScreen from '../screens/CreateBoardScreen';
import CardDetailsScreen from '../screens/CardDetailsScreen';
import CreateCardScreen from '../screens/CreateCardScreen';
import CreateListScreen from '../screens/CreateListScreen';
import WorkspaceScreen from '../screens/WorkspaceScreen';
import CreateWorkspaceScreen from '../screens/CreateWorkspaceScreen';
import EditWorkspaceScreen from '../screens/EditWorkspaceScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Workspaces" component={WorkspaceScreen} options={{ title: 'Espace de travail' }} />
        <Stack.Screen name="CreateWorkspace" component={CreateWorkspaceScreen} options={{ title: 'Créer un espace de travail' }} />
        <Stack.Screen name="EditWorkspace" component={EditWorkspaceScreen} options={({ route }) => ({ title: `Modifier ${route.params.workspaceName}` })} />
        <Stack.Screen name="Boards" component={BoardsScreen} options={({ route }) => ({ title: route.params.workspaceName })} />
        <Stack.Screen name="BoardDetails" component={BoardDetailsScreen} options={({ route }) => ({ title: route.params.boardName })} />
        <Stack.Screen name="CreateBoard" component={CreateBoardScreen} options={{ title: 'Créer un nouveau tableau' }} />
        <Stack.Screen name="CardDetails" component={CardDetailsScreen} options={{ title: 'Détails de la carte' }} />
        <Stack.Screen name="CreateCard" component={CreateCardScreen} options={{ title: 'Créer une nouvelle carte' }} />
        <Stack.Screen name="CreateList" component={CreateListScreen } options={{ title: 'Créer une nouvelle liste' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
