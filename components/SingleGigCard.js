// THIS IS THE SING



import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const SingleGigCard = ({route}) => {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>{route.params.msg}</Text>
            <Text>This is the nested screen off map!</Text>
            <Text>This is a single page view for a gig!</Text>
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
})