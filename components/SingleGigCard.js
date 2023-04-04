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
  FlatList,
  ActivityIndicator,
} from "react-native";
import { getAllAttendees, getGigById } from "../utils/api";
import { Button } from "@rneui/themed";
import { getUserGigs, patchUserGigs } from "../utils/api";
import { UserCard } from "./UserCard";

const SingleGigCard = ({ route, navigation }) => {
  const [gigId, setGigId] = useState("");
  const [gigInfo, setGigInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [userAttending, setUserAttending] = useState(false);
  const [allUsersAttending, setAllUsersAttending] = useState([]);
  const [attendingUsersLoaded, setAttendingUsersLoaded] = useState(false);

  const id = route.params.msg;

  console.log(gigId + " <<< gigId from state in SingleGigCard");

  const addToUsersGigs = () => {
    console.log("you clicked the button to add a gig to users gigs");
    patchUserGigs(gigId).then((res) => {
      setUserAttending(true);
      checkAllUsersGoing();
    });
  };

  const checkUserGigs = () => {
    return getUserGigs().then((res) => {
      console.log(res, "single card res");
      if (res.includes(gigId) === true) {
        setUserAttending(true);
      }
    });
  };

  const checkAllUsersGoing = () => {
    // api call to check all users going, display them somewhere on page
    getAllAttendees(gigId).then((results) => {
      console.log(results, "hi from line 48");
      setAllUsersAttending(results);
      setAttendingUsersLoaded(true);
      // results.map((attendee) => {
      //   console.log(attendee.displayName + " <<<< from singlegig");
      //   setAllUsersAttending((currentUsersAttending) => {
      //     console.log(allUsersAttending, "line 54");
      //     return [attendee.displayName, ...currentUsersAttending];
      //   });
      // });
    });
  };

  useEffect(() => {
    setGigId(id);
    if (gigId !== "") {
      checkAllUsersGoing();
      checkUserGigs();
      console.log(allUsersAttending + " <<< all users attending line 63");
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

  const UsersGoing = () => {
    if (!attendingUsersLoaded) {
      return (
        <>
          <ActivityIndicator
            style={styles.ActivityIndicator}
            size="large"
            color="#FBFFF1"
          />
          <Text>loading fans who are going...</Text>
        </>
      );
    }
    // if (!haveCommentsLoaded) {
    //   return (
    //     <>
    //       <ActivityIndicator
    //         style={styles.ActivityIndicator}
    //         size="large"
    //         color="blue"
    //       />
    //       <Text>loading comments...</Text>
    //     </>
    //   );

    //   // return <Text>comments loading... please wait!</Text>;
    // } else

    if (allUsersAttending.length === 0) {
      return (
        <Text style={styles.NoComments}>No users going... be the first!</Text>
      );
    } else {
      console.log(allUsersAttending[0].displayName, "<<<<sgc users");
      console.log(allUsersAttending.length, "arr length");
      return (
        <>
          <Text>These users are going, get involved & post a comment</Text>
          <ScrollView style={styles.ScrollView}>
            {allUsersAttending.map((attendee) => {
              console.log(attendee, "attendee<<<<<");
              return (
                <UserCard
                  key={attendee.displayName}
                  username={attendee.displayName}
                  avatar={attendee.avatarUrl}
                />
              );
            })}
            {console.log(allUsersAttending)}
          </ScrollView>
        </>
      );
    }
  };

  // need to check the above dep. array

  if (loading) return <Text>Loading...</Text>;
  return (
    // <ScrollView style={styles.screen}>
    <View style={styles.screen}>
      <Text style={styles.titleText}>{gigInfo.name}</Text>
      <Text style={styles.bodyText}>Date: {gigInfo.dates.start.localDate}</Text>
      <Text style={styles.bodyText}>Time: {gigInfo.dates.start.localTime.slice(0,5)}</Text>
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
      {/* <Text>{allUsersAttending}</Text> */}
      <View style={styles.buttonContainer}>
        {userAttending ? (
          <Button
            color="red"
            size="lg"
            buttonStyle={{ width: 150 }}
            title="I'm going!"
            disabled="true"
            disabledTitleStyle={{ color: "#271A31" }}
            disabledStyle={{ backgroundColor: "white" }}
          />
        ) : (
          <Button
            color="#271A31"
            size="lg"
            titleStyle={{ color: "#FBFFF1" }}
            buttonStyle={{ width: 150 }}
            title="Mark as going!"
            onPress={() => {
              addToUsersGigs();
            }}
          />
        )}

        <Button
          color="#271A31"
          size="lg"
          titleStyle={{ color: "#FBFFF1" }}
          buttonStyle={{ width: 150 }}
          title="Go To Forum"
          onPress={() =>
            navigation.navigate("ForumCard", {
              msg: `${gigId}`,
              infoForGig: gigInfo,
            })
          }
        />
      </View>
      <UsersGoing style={styles.UsersGoing} />
    </View>
    // </ScrollView>
  );
};

export default SingleGigCard;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#753c9e",
    color: "#FBFFF1",
    padding: 10
  },

  ScrollView: {
    width: "90%",
    backgroundColor: "753c9e",
  },

  titleText: {
    marginTop: 10,
    color: "#FBFFF1",
    fontWeight: "700",
    fontSize: 20,
    textAlign: "center",
  },
  bodyText: {
    color: "#FBFFF1",
    fontSize: 20,
  },
  gigImage: {
    height: "30%",
    width: "100%",
    borderRadius: 5,
    
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
  ActivityIndicator: {
    justifyContent: "center",
    paddingTop: "10%",
  },
});
