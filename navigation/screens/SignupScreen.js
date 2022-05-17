import React, { useState } from "react"
import { Text, View, StyleSheet, Image, TouchableOpacity, TextInput } from "react-native"
import pic2 from "../../assets/images/pic2.png"

export default function SignUpScreen({ navigation }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("")

  const signUp = async () => {
    try {
      const signupBody = {
        userName: username,
        password,
        role,
      }

      console.log(signupBody)
      // if (pwd2 != pwd) {
      //   alert("password not matching")
      // }
      const request = await fetch("http://192.168.1.16:8080/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupBody),
      })

      const data = await request.json()
      console.log(data)
      navigation.navigate("Login")
    } catch (message) {
      alert(message)
      console.log(message)
    }
  }
  return (
    <View style={styles.view}>
      <Image source={pic2} style={styles.img} />
      <View style={styles.container}>
        <TextInput style={styles.textInput} placeholder="Username" onChangeText={text => setUsername(text)} />
      </View>

      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <View style={styles.container}>
        <TextInput style={styles.textInput} placeholder="role" onChangeText={text => setRole(text)} />
      </View>

      <View style={{ alignItems: "center", width: "92%" }}>
        <TouchableOpacity onPress={signUp} style={styles.btn}>
          <Text style={styles.text}>Sign Up</Text>
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

  img: {
    height: 100,
    width: 100,
    marginBottom: 30,
  },
  btn: {
    height: 42,
    width: "50%",
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
  container: {
    height: 52,
    width: "92%",
  },
  textInput: {
    marginTop: 0,
    width: "100%",
    borderColor: "#0B3270",
    borderWidth: 1,
    paddingLeft: 15,
    borderRadius: 25,
    height: 40,
  },
})
