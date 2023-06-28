import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Pressable,
  Linking,
  ScrollView,
} from "react-native";
import { Button } from "@rneui/themed";
import Constants from "expo-constants";

import { getUserGigs, patchUserGigs, getAllAttendees } from "../utils/api";

const SingleGigPage = ({ route }) => {
  const gig = route.params.gig;
  console.log(route.props + " <<<<<<");

  const [thisUserAttending, setThisUserAttending] = useState(false);

  const [allUsersAttending, setAllUsersAttending] = useState([]);
  const [attendingUsersLoaded, setAttendingUsersLoaded] = useState(false);

  //   // our hardcoded user
  // const [user, setUser] = useState({
  //   displayName: "Team_Express",
  //   avatar_img_url: "https://cdn.onlinewebfonts.com/svg/img_365985.png",
  // });

  // add this gig's ID to this users 'gigs I'm attending' array
  const addToUsersGigs = () => {
    console.log("you clicked the button to add a gig to users gigs");
    setThisUserAttending(true);
    setAllUsersAttending((currentAttendees) => {
      //optimistically render the current user into 'users going'
      return [
        { displayName: "hello i team express, am going" },
        ...currentAttendees,
      ];
    });
    patchUserGigs(gig.id);
  };

  // this if this gig is already in this users's 'gigs I'm attending' array
  const checkUserGigs = () => {
    return getUserGigs().then((res) => {
      console.log(res, "single card res");
      if (res.includes(gig.id) === true) {
        setThisUserAttending(true);
      }
    });
  };

  const checkAllUsersGoing = () => {
    // api call to check all users going, display them somewhere on page
    getAllAttendees(gig.id).then((results) => {
      console.log(results, "hi from line 48");
      setAllUsersAttending(results);
      setAttendingUsersLoaded(true);
    });
  };

  const UsersGoing = () => {
    if (!attendingUsersLoaded) {
      return (
        <>
          <ActivityIndicator
            style={styles.ActivityIndicator}
            size="large"
            color="#4b006e"
          />
          <Text style={styles.LoadingText}>loading fans who are going...</Text>
        </>
      );
    } else if (allUsersAttending?.length === 0) {
      return (
        <Text style={styles.NoUsersGoingText}>None yet... be the first!</Text>
      );
    } else {
      //map thru all users going and render a card for each
      return (
        <>
          <ScrollView style={styles.ScrollView}>
            {allUsersAttending.map((attendee) => {
              console.log(attendee.displayName, "attendee<<<<<");
              {
                return <Text>{attendee.displayName}</Text>;
              }
            })}
            {console.log(allUsersAttending)}
          </ScrollView>
        </>
      );
    }
  };

  useEffect(() => {
    checkUserGigs(); //if this user is already marked as going to gig, render 'I'm going' button differently
    checkAllUsersGoing(); //get all users going to this gig, results may include current user
  }, []);

  return (
    <View style={styles.screen}>
      <Text style={styles.titleText}>{gig.name}</Text>
      <Text style={styles.bodyText}>On: {gig.dates.start.localDate}</Text>
      <Text style={styles.bodyText}>
        Starts At: {gig.dates.start.localTime?.slice(0, 5)}
      </Text>
      <Image
        style={styles.gigImage}
        source={{
          uri: `${gig.images[0].url}`, //index 0 has the majority most relevant band image at highest resolution
        }}
      ></Image>
      {/* <Text style={styles.GigInfo}>Interested? Then get involved!</Text> */}

      <Button
        icon={{
          name: "ticket",
          type: "font-awesome",
          size: 30,
          color: "white",
        }}
        size="lg"
        titleStyle={{ color: "white" }}
        buttonStyle={{
          width: "100%",
          borderColor: "#4b006e",
          backgroundColor: "#4b006e",
          borderWidth: 3,
          borderRadius: 10,
        }}
        title="Buy Tickets"
        onPress={() => Linking.openURL(`${gig.url}`)}
      />

      <View style={styles.buttonContainer}>
        {thisUserAttending ? (
          <Button
            color="red"
            size="lg"
            buttonStyle={{
              width: 150,
              borderColor: "4b006e",
              borderWidth: 3,
              borderRadius: 10,
            }}
            title="I'm going!"
            disabled="true"
            disabledTitleStyle={{ color: "#4b006e" }}
            disabledStyle={{ backgroundColor: "#ffffff" }}
          />
        ) : (
          <Button
            color="white"
            size="lg"
            titleStyle={{ color: "#ffffff" }}
            buttonStyle={{
              width: 150,
              borderColor: "#4b006e",
              backgroundColor: "#4b006e",
              borderWidth: 3,
              borderRadius: 10,
            }}
            title="I'll be going"
            onPress={() => {
              addToUsersGigs();
            }}
          />
        )}

        <Button
          size="lg"
          titleStyle={{ color: "white" }}
          buttonStyle={{
            width: 150,
            borderColor: "#4b006e",
            backgroundColor: "#4b006e",
            borderWidth: 3,
            borderRadius: 10,
          }}
          title="Go To Forum"
          onPress={() =>
            navigation.navigate("ForumCard", {
              msg: `${gigId}`,
              infoForGig: gigInfo,
            })
          }
        />
      </View>

      <Text style={styles.ConfirmedText}>These fans have confirmed:</Text>
      <UsersGoing />
    </View>
  );
};

const styles = StyleSheet.create({
  // paddingTop: Constants.statusBarHeight,
  screen: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    color: "#4b006e",
    padding: 10,
  },
  ScrollView: {
    width: "100%",
    backgroundColor: "4b006e",
  },

  ScrollViewGigInfo: {
    height: 4,
  },

  titleText: {
    marginTop: 10,
    color: "#4b006e",
    fontWeight: "700",
    fontSize: 20,
    textAlign: "center",
  },
  bodyText: {
    color: "#4b006e",
    fontSize: 20,
  },
  GigInfo: {
    color: "#4b006e",
    marginBottom: 10,
  },
  gigImage: {
    height: "30%",
    width: "100%",
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    marginBottom: 20,
  },
  ActivityIndicator: {
    justifyContent: "center",
    paddingTop: "10%",
  },
  LoadingText: {
    paddingTop: "10%",
    color: "#4b006e",
    fontSize: 15,
  },
  NoUsersText: {
    color: "#4b006e",
    fontSize: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  NoUsersGoingText: {
    color: "#4b006e",
    marginTop: 20,
    fontStyle: "italic",
  },
  GigInfoText: {
    color: "#4b006e",
  },
  ConfirmedText: {
    color: "#4b006e",
    marginTop: 10,
    marginBottom: 5,
  },
  GigInfoContainer: {
    // marginVertical: 10,
  },
});

export default SingleGigPage;
