import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Card,  Badge } from 'react-native-elements'
import { Camera } from 'expo-camera';

import {connect} from 'react-redux';




function GalleryScreen(props) {
 
  
 
 
 var galleryItem= props.pictureUrlList.map((copy, i)=>{

    return<Card  key={i} containerStyle={{ maxWidth: '90%',paddingLeft:0, paddingRight:0, paddingTop:0, width: 333 }} style={{ alignItems: 'center' }}>
            <Image source={{uri : copy.url}} style={{ maxWidth: '100%', height: 250, marginBottom: 13 }} />
                <Badge status='success' value={copy.gender} />
              <Badge status='success' value={copy.age} />
              <Badge status='success' value={copy.barbe} />
              <Badge status='success' value={copy.lunettes} />
              <Badge status='success' value={copy.sourir} />
              <Badge status='success' value={copy.cheveux} />
      </Card>
      

  })
  

  return (
    <View style={styles.container}>
        <View style={styles.text}>
        <Text  style={{  marginTop: 40,marginBottom: 16,fontWeight: 'bold',fontSize: 28 }}>Kamil's Gallery </Text>
          
        </View>
      <ScrollView>
  
     
      {galleryItem} 
      </ScrollView>
       
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e3e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  
});

function mapStateToProps(state) {
  return { pictureUrlList : state.pictureUrlList }
}
  
export default  connect(
  mapStateToProps, 
  null
)(GalleryScreen);

