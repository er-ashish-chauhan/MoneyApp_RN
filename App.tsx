/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import store from './src/store';
import Navigator from './src/navigator';
import BootSplash from "react-native-bootsplash";
import { NativeBaseProvider, extendTheme } from 'native-base';
import LoaderHOC from './src/components/templates/LoaderHOC';
import Toast from 'react-native-toast-message'
import { getDataFromStorage } from './src/utils/utility';
import constants from './src/constants';
import axiosConfig from './src/libs/AxiosConfig';
import { getUserDetails } from './src/store/actions/loginAction';

function App(): React.JSX.Element {
  // const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();
  const instance = axiosConfig;
  useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
      const userToken = await getDataFromStorage(constants.USER_ACCESS_TOKEN);
      console.log(axiosConfig.defaults.headers, "userToken")
      if (userToken) {
        instance.defaults.headers.common["Authorization"] = `Bearer ${userToken}`;
        await dispatch(getUserDetails());
      }
    };

    init().finally(() => {
      BootSplash.hide({
        fade: false
      });
      // setTimeout(() => {
      //   BootSplash.hide({
      //     fade: false
      //   });
      // }, 4000);
    });
  }, []);


  return (
    <LoaderHOC>
      <Navigator />
      <Toast />
    </LoaderHOC>
  );
}


const AppWrapper = () => {

  const newColorTheme = {
    brand: {
      900: "#8287af",
      800: "#7c83db",
      700: "#b3bef6",
    },
  };
  const theme = extendTheme({ colors: newColorTheme });
  return (
    <Provider store={store} >
      <NativeBaseProvider theme={theme}>
        <App />
      </NativeBaseProvider>
    </Provider>
  )

}

export default AppWrapper;
