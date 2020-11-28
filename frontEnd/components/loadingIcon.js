import React from 'react';
import {ActivityIndicator} from 'react-native';

const LoadingIcon = ({ isIconAnimating }) => <ActivityIndicator size="large" color="#FB2343" animating={isIconAnimating} />;
export default LoadingIcon;
