// THIS IS THE SINGLE GIG CARD

import React from 'react'
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image} from 'react-native'
import { getGigById } from '../utils/api'

const SingleGigCard = ({route}) => {
    const [gigId, setGigId] = useState("")
    const [gigInfo, setGigInfo] = useState({})
    const [loading, setLoading] = useState(true)
    const id = route.params.msg
    useEffect(() => {
      setGigId(id)
      console.log(gigId)
        if (gigId !== "") {
          // console.log(route.params.msg)
          getGigById(id)
            .then((results) => {
              // console.log(results)
              setGigInfo(results)
              setLoading(false)
            })
            .catch((err) => {
              // some error handling here
              console.log(err);
            });
        }
      }, [gigId]);
    if (loading) return <Text>Loading...</Text>
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>{gigInfo.name}</Text>
            <Text>{gigInfo.dates.start.localDate}</Text>
            <Text>{gigInfo.dates.start.localTime}</Text>
            <Image
              style={styles.gigImage}
              source={{
                uri: `${gigInfo.images[0].url}`
              }}></Image>
        </View>
    )
}

export default SingleGigCard

const styles = StyleSheet.create({
    screen:{
        flex:1,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#00000025',
    },
    text:{
        color:'#000',
        fontWeight:'700',
        fontSize:30
    },
    gigImage: {
      height: "25%",
      width: "75%"
    }
})