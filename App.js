import React, { useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeScreen from "./navigation/screens/HomeScreen"
import LoginScreen from "./navigation/screens/LoginScreen"
import SignUpScreen from "./navigation/screens/SignupScreen"
import Profile from "./navigation/screens/Profile"
import PlaceContext from "./context/PlaceContext"
const stack = createBottomTabNavigator()
const homeScreen = "Home"
const profileScreen = "Profile"
const loginScreen = "Login"
const signupScreen = "Sign Up"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const store = {
    setIsLoggedIn,
  }
  return (
    <PlaceContext.Provider value={store}>
      <NavigationContainer>
        {isLoggedIn ? (
          <stack.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName
                let n = route.name
                if (n === homeScreen) {
                  iconName = focused ? "home" : "home-outline"
                } else if (n === profileScreen) {
                  iconName = focused ? "person" : "person-outline"
                }

                return <Ionicons name={iconName} size={size} color={color} />
              },
            })}
          >
            <stack.Screen name={homeScreen} component={HomeScreen} options={{ headerShown: false }} />

            <stack.Screen name={profileScreen} component={Profile} options={{ headerShown: false }} />
          </stack.Navigator>
        ) : (
          <stack.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName
                let n = route.name
                if (n === loginScreen) {
                  iconName = focused ? "log-in" : "log-in-outline"
                } else if (n === signupScreen) {
                  iconName = focused ? "person-add" : "person-add-outline"
                }

                return <Ionicons name={iconName} size={size} color={color} />
              },
            })}
          >
            <stack.Screen name={loginScreen} component={LoginScreen} options={{ headerShown: false }} />
            <stack.Screen name={signupScreen} component={SignUpScreen} options={{ headerShown: false }} />
          </stack.Navigator>
        )}
      </NavigationContainer>
    </PlaceContext.Provider>
  )
}

export default App
