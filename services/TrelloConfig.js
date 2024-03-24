import axios from 'axios';

const TrelloAPI = axios.create({
  baseURL: 'https://api.trello.com/1/',
  params: {
    key: '3df7c323970fb703c8d9954d3acfe932',
    token: 'ATTA889e0cdba73b6a5a610c1a0a9818e3f75d1647bdebeffec4d6839a9f9cbdb9ed763A2354',
  },
});

export default TrelloAPI;
