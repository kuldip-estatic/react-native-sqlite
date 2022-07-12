import React, {useState} from 'react';
import {View, Alert, SafeAreaView} from 'react-native';
import Mytextinput from './components/Mytextinput';
import Mybutton from './components/Mybutton';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({name: 'user.db', createFromLocation: 1});
const DeleteUser = ({navigation}) => {
  let [inputUserId, setInputUserId] = useState('');

  let deleteUser = () => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM  tbl_user where user_id=?',
        [inputUserId],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('HomeScreen'),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Please insert a valid User Id');
          }
        },
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Mytextinput
            placeholder="Enter User Id"
            onChangeText={inputUserId => setInputUserId(inputUserId)}
            style={{padding: 10}}
          />
          <Mybutton title="Delete User" customClick={deleteUser} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DeleteUser;
