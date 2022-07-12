import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import {openDatabase} from 'react-native-sqlite-storage';
const db = openDatabase({name: 'user.db', createFromLocation: 1});

const RegisterUser = ({navigation}) => {
  let [userName, setUserName] = useState('');
  let [userContact, setUserContact] = useState('');
  let [userAddress, setUserAddress] = useState('');

  let register_user = () => {
    if (!userName) {
      alert('Please fill name');
      return;
    }
    if (!userContact) {
      alert('Please fill Contact Number');
      return;
    }
    if (!userAddress) {
      alert('Please fill Address');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'INSERT INTO tbl_user (user_name, user_contact, user_address) VALUES (?,?,?)',
        [userName, userContact, userAddress],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              {cancelable: false},
            );
          } else alert('Registration Failed');
        },
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 1}}>
          <ScrollView keyboardShouldPersistTaps="handled">
            <Mytextinput
              placeholder="Enter Name"
              onChangeText={userName => setUserName(userName)}
              style={{padding: 10}}
            />
            <Mytextinput
              placeholder="Enter Contact No"
              onChangeText={userContact => setUserContact(userContact)}
              keyboardType="numeric"
              style={{padding: 10}}
            />
            <Mytextinput
              placeholder="Enter Address"
              onChangeText={userAddress => setUserAddress(userAddress)}
              multiline={true}
              style={{textAlignVertical: 'top', padding: 10}}
            />
            <Mybutton title="Submit" customClick={register_user} />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterUser;
