import { StyleSheet, Text, View, Button, ScrollView } from "react-native";
import React, {useState, useEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ListItem } from "@rneui/themed";
import { ListItemChevron } from "@rneui/base/dist/ListItem/ListItem.Chevron";
import { ListItemContent } from "@rneui/base/dist/ListItem/ListItem.Content";
import { ListItemTitle } from "@rneui/base/dist/ListItem/ListItem.Title";
import { ListItemSubtitle } from "@rneui/base/dist/ListItem/ListItem.Subtitle";

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

export default function ViewEScreen(props) {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    const getEventList = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "eventos"));
        const docs = [];
        querySnapshot.forEach((doc) => {
          const { title, description, date, imgUri } = doc.data();
          docs.push({
            id: doc.id,
            title,
            description,
            date,
            imgUri,
          });
        });
        setEventList(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getEventList();
  }, []);

  return (
    <SafeAreaView style={styles.bg}>
      {/* <View style={styles.ctn}>
        <Text>ViewEScreen</Text>
        <Button
          title={"Ir a Detalles"}
          onPress={() => navigation.navigate("Details")}
        />
      </View> */}
      <ScrollView>
        <View style={[styles.parentContainer]}>
          <View style={styles.screenHeaderCtn}>
            <Ionicons name="grid" style={styles.icon} />
            <Text style={styles.screenHeader}>Events</Text>
          </View>
          <View style={styles.eventsContainer}>
            {eventList.map((evento) => (
              <ListItem
                containerStyle={{
                  backgroundColor: 'white',
                  borderRadius: 15,
                  padding: 25,
                }}
                bottomDivider
                key={evento.id}
                onPress={() => {
                  props.navigation.navigate("Event details", {
                    eventId: evento.id,
                  });
                }}
              >
                <ListItemChevron iconStyle={{color: '#746561'}} />

                <ListItemContent>
                  <ListItemTitle style={styles.title}>
                    {evento.title}
                  </ListItemTitle>
                  <ListItemSubtitle style={styles.subtitle}>
                    {evento.date}
                  </ListItemSubtitle>
                </ListItemContent>
              </ListItem>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: "#f3eae4",
    flex: 1,
  },
  parentContainer: {
    flex: 1,
    padding: 50,
    gap: 30,
  },
  screenHeaderCtn: {
    height: 30,
    flex: 1,
    flexDirection: "row",
    gap: 16,
  },
  screenHeader: {
    fontSize: 28,
    color: "#746561",
  },
  icon: {
    paddingTop: 3,
    fontSize: 28,
    color: "#d6556c",
  },
  eventsContainer: {
    backgroundColor: "#ebe3dd",
    borderRadius: 15,
    padding: 10,
    flex: 1,
    gap: 10
  },
  title: {
    fontSize: 20,
    color: "#746561",
    paddingBottom: 10
  },
  subtitle: {
    color: "#746561",
  }
}); 