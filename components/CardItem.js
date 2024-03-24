// CardItem.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const CardItem = ({ card, navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('CardDetails', { cardId: card.id, boardId: card.boardId })}>
      <View style={{
          padding: 10,
          height: 70,
          borderBottomWidth: 2,
          borderBottomColor: "#5525",
          backgroundColor: "#5526",
          borderRadius: 90,
          margin: 10,
          
      }}>
        <Text style={{textAlign: "center", marginTop: 15}}>{card.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CardItem;
