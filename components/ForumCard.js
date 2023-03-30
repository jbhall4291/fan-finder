import React from "react";
import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import { getGigById } from "../utils/api";

export const ForumCard = ({ route }) => {
  const id = route.params.msg;
  console.log(id + "<<<< this is from forumcard!!!!!");
  return (
    <View style={styles.screen}>
      <Text style={styles.titleText}>Hello from ForumCard for unique gig: {id}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "`#000000`",
  },
  titleText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 30,
  },
  bodyText: {
    color: "#000",
    fontSize: 20,
  },
  gigImage: {
    height: "25%",
    width: "75%",
  },
});
