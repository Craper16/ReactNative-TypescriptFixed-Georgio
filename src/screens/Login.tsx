import React, {useEffect} from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Button, Text, TextInput} from 'react-native-paper';
import {useAppDispatch} from '../redux/hooks';
import {useSignInUserMutation} from '../redux/api/authApi';
import {setUser} from '../redux/auth/authSlice';
import {loginValidationSchema} from '../validation/validation';
import {Formik} from 'formik';
import * as Keychain from 'react-native-keychain';

const Login = () => {
  const dispatch = useAppDispatch();

  const [signInUser, {data, isError, error, isLoading, isSuccess}] =
    useSignInUserMutation();

  const storeAccessTokenKeychain = async (
    accessToken: string,
    status: string,
  ) => {
    try {
      await Keychain.setGenericPassword(accessToken, status);
    } catch (error) {
      console.log('Keychain could not be accessed', error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      storeAccessTokenKeychain(data?.accessToken, 'isAuthenticated');
      dispatch(setUser({accessToken: data?.accessToken}));
    }
  }, [isSuccess, dispatch, data?.accessToken]);

  return (
    <Formik
      initialValues={{username: '', password: ''}}
      validateOnMount={true}
      onSubmit={values => signInUser({...values})}
      validationSchema={loginValidationSchema}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        isValid,
        errors,
      }) => (
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={50}
          style={styles.screen}>
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            style={styles.mainContainer}>
            <Text style={styles.title}>Login to view Articles!</Text>
            <View style={styles.inputContainer}>
              <ScrollView>
                <View style={styles.textInputContainer}>
                  <TextInput
                    testID="username"
                    autoCapitalize="none"
                    textColor="#8A2BE2"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    mode="outlined"
                    label="Username"
                    error={!!errors.username && touched.username}
                  />
                  {errors.username && touched.username && (
                    <Text style={styles.errors}>{errors.username}</Text>
                  )}
                </View>
                <View style={styles.textInputContainer}>
                  <TextInput
                    testID="password"
                    autoCapitalize="none"
                    textColor="#8A2BE2"
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    mode="outlined"
                    secureTextEntry
                    label="Password"
                    error={!!errors.password && touched.password}
                  />
                  {errors.password && touched.password && (
                    <Text style={styles.errors}>{errors.password}</Text>
                  )}
                </View>
                <View style={styles.actions}>
                  <Button
                    testID="loginButton"
                    disabled={!isValid || isLoading}
                    onPress={handleSubmit}
                    mode="elevated"
                    loading={isLoading}>
                    Login
                  </Button>
                </View>
                {isError && (
                  <View style={styles.apiErrorsContainer}>
                    <Text style={styles.apiErrors}>
                      {(error as any).data?.message || (error as any).error}
                    </Text>
                  </View>
                )}
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#aab1eebb',
  },
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#8A2BE2',
  },
  inputContainer: {
    width: '80%',
    padding: 2,
    marginBottom: 9,
    marginVertical: 14,
  },
  textInputContainer: {
    margin: 5,
    padding: 4,
    justifyContent: 'center',
  },
  errors: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    color: 'red',
  },
  apiErrorsContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  apiErrors: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 7,
    color: 'red',
  },
  actions: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Login;
