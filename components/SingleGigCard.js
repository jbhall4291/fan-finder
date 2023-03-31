// THIS IS THE SINGLE GIG CARD
// DO NOT TOUCH STATES INVOLVING GIGS, (This works (: )

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
import { Button } from "@rneui/themed";
import { getUserGigs } from "../utils/api";

const SingleGigCard = ({ route, navigation }) => {
  const [gigId, setGigId] = useState("");
  const [gigInfo, setGigInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const id = route.params.msg;

  console.log(gigId + " <<< gigId from state in SingleGigCard");

  //We got to here - checking if user is attending (before implenting patch request, maybe disable button and say 'hooray you're going' if it is in the array?)
  const checkUserGigs = () => {
     return getUserGigs().then((res) => {
        console.log(res, "single card res")
      })
    }
  useEffect(() => {
    checkUserGigs()
    setGigId(id);
    if (gigId !== "") {
      // console.log(route.params.msg)
      getGigById(id)
        .then((results) => {
          // console.log(results)
          setGigInfo(results);
          setLoading(false);
        })
        .catch((err) => {
          // some error handling here
          console.log(err);
        });
    }
  }, [gigId]);

  
  
  if (loading) return <Text>Loading...</Text>;
  return (
    // <ScrollView style={styles.screen}>
    <View style={styles.screen}>
      <Text style={styles.titleText}>{gigInfo.name}</Text>
      <Text style={styles.bodyText}>Date: {gigInfo.dates.start.localDate}</Text>
      <Text style={styles.bodyText}>Time: {gigInfo.dates.start.localTime}</Text>
      <Image
        style={styles.gigImage}
        source={{
          uri: `${gigInfo.images[0].url}`, //index 0 has the majority most relevant band image at highest resolution
        }}
      ></Image>
      <Text></Text>
      <Text>Info: {gigInfo.pleaseNote}</Text>
      <Text
        style={{ color: "blue" }}
        onPress={() => Linking.openURL(`${gigInfo.url}`)}
      >
        Buy Tickets
      </Text>
      <View style={styles.buttonContainer}>
      <Button
          color="primary"
          size="lg"
          buttonStyle={{ width: 150 }}
          title="I'm going!"
          onPress={
            () =>
              navigation.navigate("ForumCard", {
                msg: `${gigId}`,
                infoForGig: gigInfo,
              })

            // msg: `${gig.id}`
          }
        />
        <Button
          color="primary"
          size="lg"
          buttonStyle={{ width: 150 }}
          title="Go To Forum"
          onPress={
            () =>
              navigation.navigate("ForumCard", {
                msg: `${gigId}`,
                infoForGig: gigInfo,
              })

            // msg: `${gig.id}`
          }
        />
      </View>
    </View>
    // </ScrollView>
  );
};

export default SingleGigCard;

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
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
    
  },
});
