import React, { useState, useEffect, useRef} from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import { Camera } from 'expo-camera';

import { withNavigationFocus } from 'react-navigation';


import {Button, Overlay} from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import LoadingIcon from '../components/loadingIcon';

import {connect} from 'react-redux';


function SnapScreen(props) {
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setTypeFlash]=useState(Camera.Constants.FlashMode.torch)
    const [visible, setVisible] = useState(false);
    const [iconAnimating, setIconAnimating]= useState(false)
    var camera = useRef(null);

    
  useEffect(() => {  
    (async () => {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
    })();
  }, []);

  var cameraDisplay;
  if (hasPermission &&props.isFocused) {
     
        
    cameraDisplay = <Camera style={{ flex: 1 }}
      type={type}
      flashMode={flash}
      ref={ref => (camera = ref)}
    >
                  <View    
                  style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                  }}>
                      <TouchableOpacity 
                          onPress={() => {
                              setType(
                              type == Camera.Constants.Type.back
                                  ? Camera.Constants.Type.front
                                  : Camera.Constants.Type.back
                              );
                          }} 
                          style={{
            
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                        }}>
                          <MaterialCommunityIcons 

                            
                          title="flip"
                          name="camera-retake-outline" 
                          
                          size={40} 
                          color='white'
                          
                      />
                          <Text style={{color:'white'}}>Flip</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                      onPress={() => {
                              setTypeFlash(
                              flash == Camera.Constants.FlashMode.torch
                                  ? Camera.Constants.FlashMode.off
                                  : Camera.Constants.FlashMode.torch
                              );
                      }}
                      style={{
            
                        alignSelf: 'flex-end',
                        alignItems: 'center',
                    }}>
                          <MaterialCommunityIcons 
                            
                          title="flash"
                          name="flash" 
                          
                          size={40} 
                          color='white'
                          
                      />
                          <Text style={{color:'white'}}>Flash</Text>
                      </TouchableOpacity>
                  </View>
        
    </Camera>    
                   
        
      
    
  } 
  else {
    cameraDisplay = <View style={{ flex: 1 }}>
      </View>;
  }
  return(
    <View style={{flex:1}}>
        <Overlay isVisible={visible}   width="auto" height="auto">
            <LoadingIcon/><Text>Loading</Text>
            
        </Overlay>
        {cameraDisplay}
      <Button title=" Snap"
      onPress={async () => {
        setVisible(true)
        setIconAnimating(true)
          if (camera) {

              var photo=await camera.takePictureAsync({quality : 0.7,
          base64: true,
            exif: true});  
           
            setIconAnimating(false)

            var data = new FormData();

            data.append('image', {
              uri: photo.uri,
              type: 'image/jpeg',
              name: 'image.jpg',
            });

            var rawResponse = await fetch("[IP Adress]/upload", {
              method: 'post',
              body: data
            })
            var response = await rawResponse.json();
           
            props.onSnap(response.url, response.age,response.gender, response.barbe, response.lunettes, response.sourir, response.couleurCheveux)
           
            setVisible(false)
            
          }
      
        }}
      icon= {<MaterialCommunityIcons name="content-save" size={24} color="white" />}
      buttonStyle= {{backgroundColor:"#009788"}}       
      />
    </View>
  
  )
  
}

function mapDispatchToProps(dispatch) {
  return {
    onSnap: function(url, age, gender, barbe, lunettes, sourir,couleurCheveux ) { 
        dispatch( {type: 'snap', actionUrl: url, actionAge: age,actionGender: gender, actionBarbe: barbe, actionLunettes: lunettes, actionSourir: sourir, actionCheveux: couleurCheveux } ) 
    }
  }
}

var SnapScreenRedux= connect(
    null, 
    mapDispatchToProps
)(SnapScreen);

export default withNavigationFocus (SnapScreenRedux)

