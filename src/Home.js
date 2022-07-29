import { React, useState, useEffect } from 'react'
import { StyleSheet, View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native'
import {
  DancingScript_400Regular,
  DancingScript_500Medium,
  DancingScript_600SemiBold,
  DancingScript_700Bold
} from '@expo-google-fonts/dancing-script'
import { useFonts } from 'expo-font'
import GlobalStyle from './utils/GlobalStyle'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import SQLite from 'react-native-sqlite-storage'
import { useSelector, useDispatch } from 'react-redux'
import { setName, setAge, increaseAge, getNames } from './redux/actions'
import { FlatList } from 'react-native-gesture-handler'

function Home({ navigation, route }) {
  // const [name, setName] = useState('')
  const { name, age, names } = useSelector(state => state.userReducer)
  const dispatch = useDispatch()

  // const db = SQLite.openDatabase(
  //   {
  //     name: 'MainDB',
  //     location: 'default'
  //   },
  //   () => {},
  //   error => {
  //     console.log(error)
  //   }
  // )

  useEffect(() => {
    getData()
    dispatch(getNames())
  }, [])

  const getData = () => {
    try {
      AsyncStorage.getItem('UserData').then(value => {
        console.log('value', value)
        if (value != null) {
          dispatch(setName(JSON.parse(value).Name))
          dispatch(setAge(JSON.parse(value).Age))
        }
      })
      // db.transaction(tx => {
      //   tx.executeSql('SELECT Name FROM Users', [], (tx, results) => {
      //     var len = results.rows.length
      //     if (len > 0) {
      //       var userName = results.rows.item(0).Name
      //       setName(userName)
      //     }
      //   })
      // })
    } catch (error) {
      console.log(error)
    }
  }

  const updateData = async () => {
    console.log('name', name)
    if (name.length == 0) {
      Alert.alert('Warning!', 'please write your name')
    } else {
      try {
        await AsyncStorage.setItem('UserName', name)
        Alert.alert('Success!', 'Your data has been updated')
      } catch (error) {
        console.log(error)
      }
    }
  }

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem('UserName')
      navigation.navigate('Login')
    } catch (error) {
      console.log(error)
    }
  }

  const onPressHandler = () => {
    navigation.navigate('Screen_B')
    // navigation.replace('Screen_B')
    // navigation.openDrawer()
  }

  let [fontsLoaded, error] = useFonts({
    DancingScript_400Regular,
    DancingScript_500Medium,
    DancingScript_600SemiBold,
    DancingScript_700Bold
  })

  return (
    <View style={styles.body}>
      <Text style={[GlobalStyle.CustomFont, { fontSize: 20 }]}>Welcome {name} !</Text>
      <Text style={[GlobalStyle.CustomFont, { fontSize: 20 }]}>Your age {age} !</Text>
      {/* <TextInput style={styles.input} placeholder="Enter your name" value={name} onChangeText={value => dispatch(setName(value))} />
      <TextInput style={styles.input} placeholder="Enter your age" value={age} onChangeText={value => dispatch(setAge(value))} />
      <Button title="Update" onPress={updateData} />
      <Button style={{ margin: 20 }} title="Logout" onPress={removeData} />
      <Button
        style={{ margin: 20 }}
        title="increase one"
        onPress={() => {
          dispatch(increaseAge())
        }}
      /> */}

      <FlatList
        data={names}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View>
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    margin: 10
  },
  input: {
    width: 300,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 130,
    marginBottom: 10
  }
})

export default Home
