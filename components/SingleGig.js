import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const SingleGig = () => {

    return (
        <View style={styles.container}>
            <Text>This is a single page view for a gig!</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });
  