import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'

export default function AboutMe() {
  return (
    <SafeAreaView style={styles.bg}>
      <ScrollView>
        <View style={styles.parentContainer}>
          <View style={styles.info}>
            <Text style={styles.header}>About Me</Text>
            <Image style={styles.img} source={require("../assets/me.jpg")} />
            <Text style={styles.description}>
              Hi! My name is Jesimiel Marte, and I’m a Fullstack Web Developer.
            </Text>
          </View>
          <View style={styles.socials}>
            <View style={styles.contact}>
              <Entypo name='phone' style={styles.icon} />
              <Text style={styles.contactTxt}>+1 829-763-5218</Text>
            </View>
            <View style={styles.contact}>
              <FontAwesome name='github' style={styles.icon} />
              <Text style={styles.contactTxt}>JMarte03</Text>
            </View>
            <View style={styles.contact}>
              <Entypo name='mail' style={styles.icon} />
              <Text style={styles.contactTxt}>+1 829-763-5218</Text>
            </View>
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  parentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center',
    paddingVertical: 150,
    paddingHorizontal: 90,
    gap: 30,
  },
  info: {
    width: '100%',
    // backgroundColor: 'blue',
    flex: 1,
    alignItems: 'center',
    gap: 35,
    marginBottom: 30
  },
  header: {
    fontSize: 26,
    color: '#746561'
  },
  img: {
    height: 150,
    width: 150,
    borderRadius: 90,
  },
  description: {
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    fontWeight: '300',
    lineHeight:25,
  },
  socials: {
    flex: 1,
    width: '100%',
    gap: 15
  },
  contact: {
    flex: 1,
    flexDirection: 'row',
    gap: 10
  },
  icon: {
    color: '#746561',
    paddingTop: 3,
    fontSize: 16
  },
  contactTxt: {
    color: '#746561',
    fontSize: 16
  }
});
