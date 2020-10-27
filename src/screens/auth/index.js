import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Keyboard, StyleSheet } from 'react-native';
import { Colors } from '~/theme';
import { Text, Button, LoginView, TextInput } from '~/components';
import {
  login,
  changeEmail,
  resetFields,
  changePassword,
} from '~/actions/auth-actions';

const Auth = ({ navigation }) => {
  const dispatch = useDispatch();
  const { navigate } = navigation;
  const { email, loading, password, errorMessage } = useSelector(
    ({ authReducer }) => authReducer,
  );

  useEffect(() => () => dispatch(resetFields()), []);

  return (
    <LoginView title="Welcome back.">
      <View style={styles.formContainer}>
        {!!errorMessage && (
          <View style={{ marginHorizontal: 8 }}>
            <Text color={Colors.red}>{errorMessage}</Text>
          </View>
        )}
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => dispatch(changeEmail(text))}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          label="Password"
          value={password}
          onChangeText={(text) => dispatch(changePassword(text))}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry
        />
      </View>
      <View style={{ marginBottom: 2 }}>
        <Button
          text="Sign In"
          disabled={!(email && password)}
          loading={loading}
          onPress={() => {
            Keyboard.dismiss();
            dispatch(login());
          }}
        />
        <View style={{ alignSelf: 'center' }}>
          <Button
            transparent
            tintColor={Colors.white}
            text="Create an account"
            onPress={() => navigate('register')}
          />
        </View>
      </View>
    </LoginView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Auth;
