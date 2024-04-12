import React from 'react';
import { ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface CustomIconProps {
  name: string;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

const CustomIcon: React.FC<CustomIconProps> = ({ name, size = 24, color = 'black', style }) => {
  return <Icon name={name} size={size} color={color} style={style} />;
};

export default CustomIcon;
