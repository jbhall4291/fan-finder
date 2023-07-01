import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "@rneui/themed";

import { BottomSheet } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const GigModal = ({ isBottomSheetVisible, setIsBottomSheetVisible, gig }) => {
  const toggleBottomSheet = () => {
    setIsBottomSheetVisible(!isBottomSheetVisible);
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        {/* <Button title="Show Bottom Sheet" onPress={toggleBottomSheet} /> */}
        <BottomSheet
          isVisible={isBottomSheetVisible}
          containerStyle={styles.bottomSheetContainer}
        >
          <View style={styles.bottomSheetContent}>
            <Text>This is the Gig Modal for {gig?.name}</Text>
            <Image
              style={styles.gigImage}
              source={{
                uri: `${gig?.images[0].url}`, //index 0 has the majority most relevant band image at highest resolution
              }}
            ></Image>
            <Button
              title="Go To Gig Hub"
              onPress={() => {
                setIsBottomSheetVisible(false);
                navigation.navigate("StackSingleGig", { gig: gig });
              }}
            />
            <Button title="Close" onPress={toggleBottomSheet} />
          </View>
        </BottomSheet>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomSheetContainer: {
    backgroundColor: "transparent", //transparent as quick fix so user can't move map around when modal open
  },
  bottomSheetContent: {
    backgroundColor: "#fff",
    padding: 16,
    height: 600,
    borderRadius: 10,
  },
  gigImage: {
    height: "50%",
    width: "100%",
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default GigModal;
