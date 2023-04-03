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
import { getAllAttendees, getGigById } from "../utils/api";
import { Button } from "@rneui/themed";
import { getUserGigs, patchUserGigs } from "../utils/api";

const SingleGigCard = ({ route, navigation }) => {
  const [gigId, setGigId] = useState("");
  const [gigInfo, setGigInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [userAttending, setUserAttending] = useState(false);

  const id = route.params.msg;

  console.log(gigId + " <<< gigId from state in SingleGigCard");

  const addToUsersGigs = () => {
    console.log("you clicked the button to add a gig to users gigs");
    patchUserGigs(gigId).then((res) => {
      console.log(res + " <<<< from addToUsersGigs");
      setUserAttending(true);
    });
  };

  //We got to here - checking if user is attending (before implenting patch request, maybe disable button and say 'hooray you're going' if it is in the array?)
  const checkUserGigs = () => {
    return getUserGigs().then((res) => {
      // console.log(res, "single card res");
      if (res.includes(gigId) === true) {
        setUserAttending(true);
      }
    });
  };

  const checkAllUsersGoing = () => {
    // api call to check all users going, display them somewhere on page
    getAllAttendees(gigId).then((results) => {
      results.map((attendee) => {
        console.log(attendee.displayName + " <<<< from singlegig");
      });
    });
  };

  useEffect(() => {
    setGigId(id);
    if (gigId !== "") {
      checkAllUsersGoing();
      checkUserGigs();
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
        {userAttending ? (
          <Button
            color="primary"
            size="lg"
            buttonStyle={{ width: 150 }}
            title="I'm already going!"
            disabled="true"
          />
        ) : (
          <Button
            color="primary"
            size="lg"
            buttonStyle={{ width: 150 }}
            title="Mark as going!"
            onPress={() => {
              addToUsersGigs();
            }}
          />
        )}

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
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
});
