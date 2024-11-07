import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
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

export default function CreateEScreen(props) {
  
  // SEND DATA
  const initialState = { 
    title: '',
    description: ''
  }

  const [estado, setEstado] = useState(initialState)

  const handleChangeText = (value, name) => {
    setEstado({ ...estado, [name]: value }); 
  };

  const saveEvent = async () => {
    try {
      if (estado.title === "" || estado.description === "") {
        Alert.alert("Error", "You must give both a title and a description to add a new event.");
      } 
      else {
        const evento = {
          title: estado.title,
          description: estado.description,
          date: date.toLocaleDateString(),
          imgUri: image,
        };
        await addDoc(collection(db, "eventos"), {
          ...evento,
        });
        Alert.alert("Success","Event successfully created");
        props.navigation.navigate("Events"); 
        console.log(evento)
      }
    } catch (error) {
      console.log(error);
    }
  };

  //ABOUT DATE PICKER
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");
  const handleDatePickerPress = (e, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false); // Close the date picker after selection
    setDate(currentDate);
  };
  const showMode = (modeToShow) => {
    setShow(true);
    setMode(modeToShow);
  };

  //ABOUT IMAGE PICKER
  const [image, setImage] = useState("");
  const handleImagePickerPress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.bg}>
      <ScrollView>
        <View style={styles.parentContainer}>
          <View style={styles.screenHeaderCtn}>
            <AntDesign name="pluscircle" style={styles.icon} />
            <Text style={styles.screenHeader}>Create new event</Text>
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.label}>Title:</Text>
            <TextInput 
              style={styles.textInput} 
              onChangeText={(value)=>handleChangeText(value, 'title')} 
              value={estado.title}
            />

            <Text style={styles.label}>Description:</Text>
            <TextInput
              multiline={true}
              numberOfLines={4}
              style={styles.textInput}
              value={estado.description}
              onChangeText={(value)=>handleChangeText(value, 'description')}
            />

            <Text style={styles.label}>Date:</Text>
            <View style={styles.formatInputCtn}>
              <TextInput
                style={styles.formatInput}
                value={date.toLocaleDateString()}
                editable={false}
              />
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => showMode("date")}
              >
                <FontAwesome5 name="calendar-alt" color={"white"} size={18} />
              </TouchableOpacity>
            </View>

            {show && (
              <DateTimePicker
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={handleDatePickerPress}
              />
            )}

            <Text style={styles.label}>Picture:</Text>
            <View style={styles.formatInputCtn}>
              <TextInput style={styles.formatInput} value={image} />
              <TouchableOpacity
                style={styles.iconButton}
                onPress={handleImagePickerPress}
              >
                <Entypo name="attachment" color={"white"} size={18} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.submitBtn} onPress={saveEvent}>
              <Text style={styles.submitTxt}>Save</Text>
            </TouchableOpacity>
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
    padding: 50,
    width: "100%",
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: 40,
  },
  screenHeaderCtn: {
    height: 35,
    flex: 1,
    flexDirection: "row",
    gap: 16,
  },
  screenHeader: {
    fontSize: 28,
    color: "#746561",
  },
  icon: {
    paddingTop: 4,
    fontSize: 28,
    color: "#d6556c",
  },
  formContainer: {
    width: "100%",
  },
  label: {
    fontSize: 16,
    textTransform: "uppercase",
    fontWeight: "300",
    marginBottom: 15,
  },
  textInput: {
    backgroundColor: "white",
    width: "100%",
    marginBottom: 40,
    padding: 15,
    borderRadius: 15,
  },
  formatInputCtn: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    marginBottom: 40,
    gap: 10,
  },
  formatInput: {
    backgroundColor: "white",
    flexBasis: "80%",
    padding: 15,
    borderRadius: 15,
    color: "gray",
  },
  iconButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexBasis: "16%",
    backgroundColor: "#d6556c",
    borderRadius: 15,
  },
  submitBtn: {
    width: "100%",
    backgroundColor: "#44bcc8",
    padding: 15,
    marginTop: 25,
    borderRadius: 12,
  },
  submitTxt: {
    color: "white",
    textTransform: "uppercase",
    textAlign: "center",
    fontSize: 18,
  },
});
