import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import appFirebase from "../DbConfig";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  setDoct,
} from "firebase/firestore";
const db = getFirestore(appFirebase);

export default function Details(props) {

  const [evento, setEvento] = useState({})
  
  const getOneEvent = async(id) => {
    try {
      const docRef = doc(db, 'eventos', id)
      const docSnap = await getDoc(docRef)
      setEvento(docSnap.data())
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    getOneEvent(props.route.params.eventId)
  },[])

  const deleteEvent = async(id) => {
    await deleteDoc(doc(db, 'eventos', id))
    Alert.alert('Success','Event successfully deleted')
    props.navigation.navigate('Events')
  }

  return (
    <SafeAreaView style={styles.bg}>
      <View style={styles.parentContainer}>
        <View style={styles.detailView}>
          <Text style={styles.title}>{evento.title}</Text>
          <Text style={styles.date}>{evento.date}</Text>
          <Text style={styles.description}>{evento.description}</Text>
          <Image source={{uri: evento.imgUri}} style={styles.img} />
          <TouchableOpacity style={styles.deleteBtn} onPress={()=>deleteEvent(props.route.params.eventId)}>
            <Text style={styles.deleteTxt}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: "#f3eae4",
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 20,
    paddingBottom: 50,
    borderRadius: 15
  },
  parentContainer: {
    backgroundColor: '#ebe3dd',
    padding: 15,
    borderRadius: 10,
    width: "100%",
    flex: 1,
  },
  detailView: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 30,
    gap: 20
  },
  title: {
    fontSize: 20,
    color: 'gray'
  },
  date: {
    color: 'gray'
  },
  description: {
    fontStyle: 'italic'
  },
  img: {
    height: 380,
    borderRadius: 25,
  },
  deleteBtn: {
    marginTop: 10,
    width: '100%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#d6556c',
  },
  deleteTxt: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: 'white'
  }
})