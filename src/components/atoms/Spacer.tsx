/**
 * @file Spacer.tsx
 * @author Ashish Chauhan
 */

import React from 'react';
import { View } from 'react-native';

const Spacer: React.FC<{
  size: number
}> = ({ size }): JSX.Element => (
  <View
    style={{
      left: 0,
      right: 0,
      height: 1,
      marginTop: size - 1,
    }}
  />
);

export default Spacer;
