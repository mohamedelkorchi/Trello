import TrelloAPI from "./TrelloConfig";

export const fetchBoards = async () => {
  try {
    const response = await TrelloAPI.get("members/me/boards", {
      params: {
        filter: "open",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des tableaux Trello :", error);
  }
};

export const fetchCardsFromBoard = async (boardId) => {
  try {
    const response = await TrelloAPI.get(`boards/${boardId}/cards`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des cartes Trello :", error);
  }
};

export const fetchListsFromBoard = async (boardId) => {
  try {
    const response = await TrelloAPI.get(`boards/${boardId}/lists`);
    return response.data.filter((list) => !list.closed);
  } catch (error) {
    console.error("Erreur lors de la récupération des listes Trello :", error);
  }
};

export const fetchCardsFromList = async (listId) => {
  try {
    const response = await TrelloAPI.get(`lists/${listId}/cards`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des cartes Trello :", error);
  }
};

export const updateCard = async (cardId, updates) => {
  try {
    const response = await TrelloAPI.put(`cards/${cardId}`, updates);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la carte Trello :", error);
    throw error;
  }
};

export const createBoardInWorkspace = async (workspaceId, boardName, defaultLists = true) => {
  try {
    const response = await TrelloAPI.post("boards", {
      name: boardName,
      defaultLists: defaultLists,
      idOrganization: workspaceId,
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création du tableau Trello :", error);
    throw error;
  }

}

export const createBoard = async (boardName, defaultLists = true) => {
  try {
    const response = await TrelloAPI.post("boards/", {
      name: boardName,
      defaultLists: defaultLists,
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création du tableau Trello :", error);
    throw error;
  }
};

export const fetchCardDetails = async (cardId) => {
  try {
    const response = await TrelloAPI.get(
      `cards/${cardId}?fields=id,name,desc&members=true&member_fields=fullName&list=true&list_fields=name`
    );

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des détails de la carte Trello :", error);
  }
};

export const createCard = async (listId, name, desc, idMembers = null) => {
  try {
    const params = new URLSearchParams();
    params.append("idList", listId);
    params.append("name", name);
    params.append("desc", desc);

    if (idMembers) {
      params.append("idMembers", idMembers);
    }

    const response = await TrelloAPI.post(`cards`, params);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de la carte Trello :", error);
    throw error; 
  }
};

export const fetchMembers = async (boardId) => {
  try {
    const response = await TrelloAPI.get(`boards/${boardId}/members`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des membres du tableau Trello :", error);
    throw error;
  }
};
export const updateCardDetails = async (
  cardId,
  name,
  desc,
  idMember,
  idList
) => {
  try {
    const response = await TrelloAPI.put(`cards/${cardId}`, {
      name,
      desc,
      idMember,
      idList,
    });
    
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la carte Trello :", error);
    throw error;
  }
};

export const deleteCard = async (cardId) => {
  try {
    const response = await TrelloAPI.delete(`cards/${cardId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting Trello card:", error);
    throw error;
  }
};

export const deleteBoard = async (boardId) => {
  try {
    const response = await TrelloAPI.put(`boards/${boardId}/closed`, {
      value: true,
    });
    return response.data; 
  } catch (error) {
    console.error("Erreur lors de la fermeture du tableau Trello :", error);
    throw error; 
  }
};

export const createList = async (boardId, listName) => {
  try {
    const response = await TrelloAPI.post(`lists`, {
      name: listName,
      idBoard: boardId,
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de la liste Trello :", error);
    throw error;
  }
};

export const deleteList = async (listId) => {
  try {
    const cards = await fetchCardsFromList(listId);
    await Promise.all(cards.map(async (card) => {
      await deleteCard(card.id);
    }));
    const response = await TrelloAPI.put(`lists/${listId}/closed`, {
      value: true,
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de la liste Trello :", error);
    throw error;
  }
};


export const fetchWorkspaces = async () => {
  try {
    const response = await TrelloAPI.get("members/me/organizations");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des espaces de travail Trello :", error);
    throw error;
  }
}

export const createWorkspace = async (workspaceName) => {
  try {
    const response = await TrelloAPI.post("organizations", {
      displayName: workspaceName,
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de l'espace de travail Trello :", error);
    throw error;
  }
}

export const fetchWorkspaceDetails = async (workspaceId) => {
  try {
    const response = await TrelloAPI.get(`organizations/${workspaceId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des détails de l'espace de travail Trello :", error);
    throw error;
  }
}


export const fetchBoardsByWorkspace = async (workspaceId) => {
  try {
    const response = await TrelloAPI.get(`organizations/${workspaceId}/boards`,{
      params: {
        filter: "open",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des tableaux Trello :", error);
    throw error;
  }
}


export const editWorkspace = async (workspaceId, workspaceName) => {
  try {
    const response = await TrelloAPI.put(`organizations/${workspaceId}`, {
      displayName: workspaceName,
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la modification de l'espace de travail Trello :", error);
    throw error;
  }
}


export const deleteWorkspace = async (workspaceId) => {
  try{
    const response = await TrelloAPI.delete(`organizations/${workspaceId}`);
    return response.data;
  }
  catch(error){
    console.error("Erreur lors de la suppression de l'espace de travail Trello :", error);
    throw error;
  }
}

