import { React, useState, useEffect } from 'react'
import { View, StyleSheet, Image, Text, TextInput, Button, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import SQLite from 'react-native-sqlite-storage'
import { useSelector, useDispatch } from 'react-redux'
import { setName, setAge } from './redux/actions'

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

export default function Login({ navigation }) {
  //   const [name, setName] = useState('')

  const { name, age } = useSelector(state => state.userReducer)
  const dispatch = useDispatch()

  useEffect(() => {
    // createTable()
    getData()
  }, [])

  //   const createTable = () => {
  //     db.transaction(tx => {
  //       tx.executeSql('CREATE TABLE IF NOT EXISTS ' + 'Users ' + '(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT);')
  //     })
  //   }

  const getData = () => {
    try {
      AsyncStorage.getItem('UserName').then(value => {
        if (value != null) {
          //   navigation.navigate('Camera')
          navigation.navigate('Home')
        }
      })
      //   db.transaction(tx => {
      //     tx.executeSql('SELECT Name from Users', [], (tx, results) => {
      //       var len = results.rows.length
      //       if (len > 0) {
      //         navigation.navigate('Home')
      //       }
      //     })
      //   })
    } catch (error) {
      console.log(error)
    }
  }

  const setData = async () => {
    console.log('name', name)
    console.log('name', age)
    if (name.length == 0 || age == 0) {
      Alert.alert('Warning!', 'please write your name')
    } else {
      try {
        // await db.transaction(async tx => {
        //   await tx.executeSql("INSERT INTO Users (Name) VALUES ('" + name + "')")
        // })
        // navigation.navigate('Camera')
        var user = {
          Name: name,
          Age: age
        }
        await AsyncStorage.setItem('UserData', JSON.stringify(user))
        dispatch(setName(name))
        dispatch(setAge(age))
        navigation.navigate('Home')
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <View style={styles.home}>
      <Image style={styles.logo} source={require('../assets/favicon.png')} />
      <Text style={styles.title}>Async Storage</Text>
      <TextInput style={styles.input} placeholder="Enter your name" onChangeText={value => dispatch(setName(value))}></TextInput>
      <TextInput style={styles.input} placeholder="Enter your age" onChangeText={value => dispatch(setAge(value))}></TextInput>
      <Button title="Login" onPress={setData} />
    </View>
  )
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'pink'
  },
  logo: {
    width: 100,
    height: 100,
    margin: 10
  },
  title: {
    fontSize: 40,
    color: '#ffffff'
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
