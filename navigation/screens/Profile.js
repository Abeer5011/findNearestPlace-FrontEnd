import firebase from "firebase"
import React, { useContext, useState } from "react"
require("firebase/auth")
import { Text, View, StyleSheet, TouchableOpacity } from "react-native"
import PlaceContext from "../../context/PlaceContext"

export default function Profile({ navigation }) {
  const { setIsLoggedIn } = useContext(PlaceContext)
  const logout = async () => {
    try {
      const request = await fetch("http://192.168.1.16:8080/api/v1/logout")
      if (request.status == 204) {
        setIsLoggedIn(false)
        navigation.navigate("Login")
      }
    } catch (message) {
      alert(message)
      console.log(message)
    }
  }
  return (
    <View style={styles.view}>
      <View style={{ alignItems: "center", width: "92%" }}>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.text} onPress={logout}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    height: 42,
    width: "92%",
    borderRadius: 25,
    marginTop: 20,
    backgroundColor: "#6d6875",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
  },
})
