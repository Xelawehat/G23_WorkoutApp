// networkFetcher file
import React, { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

const getIPAddress = async () => {
  try {
    const state = await NetInfo.fetch();
    console.log("IP Address:", state.details.ipAddress);
    return state.details.ipAddress;
  } catch (error) {
    console.error('Error getting IP address:', error);
    return null;
  }
};

export default getIPAddress;
