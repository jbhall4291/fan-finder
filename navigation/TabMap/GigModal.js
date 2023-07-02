import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Button } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { BottomSheet } from "react-native-elements";

const GigModal = ({
  isBottomSheetVisible,
  setIsBottomSheetVisible,
  gig,
  modalClosed,
}) => {
  const navigation = useNavigation();

  const closeModal = () => {
    setIsBottomSheetVisible(false);
    modalClosed(
      Number(gig._embedded.venues[0].location.latitude),
      Number(gig._embedded.venues[0].location.longitude)
    );
  };

  if (!isBottomSheetVisible) {
    return null; // Don't render the modal if it's not visible
  }

  return (
    <View style={styles.container}>
      <View>
        <BottomSheet
          isVisible={isBottomSheetVisible}
          containerStyle={styles.bottomSheetContainer}
        >
          <View style={styles.bottomSheetContent}>
            <Text>This is the Gig Modal for {gig?.name}</Text>
            <Image
              style={styles.gigImage}
              source={{
                uri: `${gig?.images[0].url}`,
              }}
            />
            <Button
              title="Go To Gig Hub"
              onPress={() => {
                // closeModal();
                setIsBottomSheetVisible(false);
                navigation.navigate("StackSingleGig", {
                  gig: gig,
                  setIsBottomSheetVisible: setIsBottomSheetVisible,
                });
              }}
            />
            <Button title="Close" onPress={closeModal} />
          </View>
        </BottomSheet>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomSheetContainer: {
    backgroundColor: "transparent",
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
