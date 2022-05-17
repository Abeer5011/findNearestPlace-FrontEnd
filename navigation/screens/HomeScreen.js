import React from "react"
import { useEffect, useState } from "react"
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native"
import * as Location from "expo-location"
import { Picker } from "@react-native-picker/picker"
import pic from "../../assets/images/pic.png"

export default function HomeScreen() {
  const [nearestPlaceByCategory, setNearestPlaceByCategory] = useState(null)

  const [category, setCategory] = useState({
    category: "",
  })
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    ;(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied")
        return
      }

      let location = await Location.getCurrentPositionAsync({})

      setLocation(location)
    })()
    if (location) {
      getNearestPlaceByCategory()
    }
  }, [])
  let text
  setTimeout(() => {
    text = "Waiting.."
    if (errorMsg) {
      text = errorMsg
    } else if (location) {
      text = "Start Searching"
    }
  }, 2000)

  const getNearestPlaceByCategory = async () => {
    try {
      let longitude
      let latitude

      longitude = location.coords.longitude
      latitude = location.coords.latitude

      console.log(location)
      const place = {
        latitude,
        longitude,
        category,
      }

      const request = await fetch("http://192.168.1.16:8080/api/v1/nearestPlaceByCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(place),
      })
      const data = await request.json()
      console.log("---!!!!", data)
      setNearestPlaceByCategory(data)
      console.log("hi" + data)
    } catch (message) {
      alert(message)
      console.log(message)
      setNearestPlaceByCategory(null)
    }
  }

  return (
    <View style={styles.view}>
      <Text style={{ fontSize: 14, marginBottom: 20 }}>{text}</Text>

      <View>
        <Image source={pic} style={styles.img} />
      </View>
      <View>
        <Text style={{ textAlign: "center", fontSize: 19, fontWeight: "400" }}>Category</Text>
        <Picker
          selectedValue={category}
          onValueChange={(selectedCategory, selectedCategoryIndex) => setCategory(selectedCategory)}
        >
          <Picker.Item label="University" value="University" />
          <Picker.Item label="Restaurant" value="Restaurant" />
          <Picker.Item label="Museum" value="Museum" />
          <Picker.Item label="Hospital" value="Hospital" />
          <Picker.Item label="Village" value="Village" />
          <Picker.Item label="Pharmacy" value="Pharmacy" />
        </Picker>
        <TouchableOpacity onPress={getNearestPlaceByCategory} style={{ borderRadius: 10 }}>
          <Text style={{ textAlign: "center", fontSize: 19, fontWeight: "600" }}>Search</Text>
        </TouchableOpacity>
        <View>
          <Text style={{ marginBottom: 20, marginTop: 20, textAlign: "center" }}>Nearest Place by category</Text>
          {nearestPlaceByCategory ? (
            <View>
              <Text style={{ textAlign: "center", fontSize: 19, fontWeight: "400", marginBottom: 20 }}>
                {nearestPlaceByCategory.category}
              </Text>
              <View style={{ alignItems: "center" }}>
                <Image source={{ uri: nearestPlaceByCategory.photo }} style={{ width: 200, height: 50 }} />
              </View>
              <Text style={{ textAlign: "center", fontSize: 19, fontWeight: "400", marginTop: 20 }}>
                {nearestPlaceByCategory.name}
              </Text>
              <Text>
                location: lat: {nearestPlaceByCategory.latitude}, lon: {nearestPlaceByCategory.longitude}
              </Text>
            </View>
          ) : null}
        </View>
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
    marginBottom: 50,
  },
})
