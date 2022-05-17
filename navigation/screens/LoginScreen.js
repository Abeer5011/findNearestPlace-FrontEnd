import React, { useContext, useState } from "react"
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image } from "react-native"
import pic3 from "../../assets/images/pic3.png"
import PlaceContext from "../../context/PlaceContext"

export default function Loginscreen({ navigation }) {
  const { setIsLoggedIn } = useContext(PlaceContext)
  const [values, setValues] = useState({
    userName: "",
    password: "",
  })

  function handleChange(text, eventName) {
    setValues(prev => {
      return {
        ...prev,
        [eventName]: text,
      }
    })
  }

  const Login = async () => {
    try {
      const request = await fetch("http://192.168.1.16:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      })
      const data = await request.json()
      setIsLoggedIn(true)
    } catch (message) {
      alert(message)
      console.log(message)
    }
  }
  console.log(values)
  return (
    <View style={styles.view}>
      <Image source={pic3} style={styles.img} />
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Email Address"
          onChangeText={text => handleChange({ userName: text })}
        />
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          onChangeText={text => handleChange({ password: text })}
          secureTextEntry={true}
        />
      </View>

      <View style={{ alignItems: "center", width: "92%" }}>
        <TouchableOpacity onPress={Login} style={styles.btn}>
          <Text style={styles.text}>Login</Text>
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
    width: "48%",
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
  img: {
    height: 100,
    width: 100,
    marginBottom: 30,
  },
})
