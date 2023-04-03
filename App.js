import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LoginPage } from "./components/LoginPage";
import { Navigation } from "./components/Navigation";
import {io} from 'socket.io-client'


export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({
    username: "testUser",
    avatar_img_url: "https://cdn.onlinewebfonts.com/svg/img_365985.png",
  });

  return isLoggedIn ? <Navigation /> : <LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
