import React from 'react';
import { View, StyleSheet, Text, Image, ImageBackground } from 'react-native';
import App from '../App';

const UserList = () => {
    return(
        <ImageBackground
       style={[styles.group, styles.group_layout]}
       source={require('../assets/109fed3207ab155ae1e40f9444de7d34.png')}
       resizeMode="cover">
       <View style={[styles.flex, styles.flex_layout]}>
         <View style={styles.flex_row}>
           <ImageBackground
             style={[styles.img, styles.img_layout]}
             source={require('../assets/1e9cb5ce9d3538d2d566258ef27ea0ea.png')}
           />
         </View>
         <View style={styles.flex_row}>
           <ImageBackground
             style={[styles.img, styles.img_layout1]}
             source={require('../assets/9b9cae34f2eb03a6936e3d83bb9699d3.png')}
           />
         </View>
         <View style={styles.flex_row}>
           <View style={[styles.cover_group, styles.cover_group_layout]}>
             <View
               style={[
                 styles.iniciar_sesion_box,
                 styles.iniciar_sesion_box_layout
               ]}>
               <Text style={styles.iniciar_sesion} ellipsizeMode={'clip'}>
                 {'Iniciar sesion '}
               </Text>
             </View>
           </View>
         </View>
         <View style={styles.flex_row}>
           <View style={[styles.cover_group1, styles.cover_group1_layout]}>
             <View
               style={[styles.crear_cuenta_box, styles.crear_cuenta_box_layout]}>
               <Text style={styles.crear_cuenta} ellipsizeMode={'clip'}>
                 {'Crear cuenta '}
               </Text>
             </View>
           </View>
         </View>
         <View style={styles.flex_row}>
           <View
             style={[styles.medium_title_box, styles.medium_title_box_layout]}>
             <Text style={styles.medium_title} ellipsizeMode={'clip'}>
               {'Terminos & Condiciones'}
             </Text>
           </View>
         </View>
       </View>
     </ImageBackground>
    );
}

 const styles = StyleSheet.create({
   group: {
     width: '100%',
     backgroundColor: '#ffffffff',
     borderRadius: 46
   },
   group_layout: {
     marginTop: 0,
     marginBottom: 0,
     minHeight: 812,
     marginLeft: 0,
     flexGrow: 1,
     marginRight: 0
   },
   flex: {},
   flex_layout: {
     overflow: 'visible',
     marginTop: 21,
     marginBottom: 21,
     marginLeft: 14.34,
     flexGrow: 1,
     marginRight: 14.34
   },
   flex_row: {
     flexGrow: 0,
     flexShrink: 1
   },
   img: {
     resizeMode: 'contain'
   },
   img_layout: {
     marginTop: 0,
     height: 4,
     marginBottom: 0,
     marginLeft: 'auto',
     width: 1.33,
     minWidth: 1.33,
     marginRight: 0
   },
   img_layout1: {
     marginTop: 51,
     height: 330,
     marginBottom: 0,
     marginLeft: 24.66,
     flexGrow: 1,
     marginRight: 23.66
   },
   cover_group: {
     width: '100%',
     backgroundColor: '#ffffffff',
     borderTopLeftRadius: 20,
     borderTopRightRadius: 27,
     borderBottomRightRadius: 20,
     borderBottomLeftRadius: 27
   },
   cover_group_layout: {
     marginTop: 50,
     marginBottom: 0,
     minHeight: 54,
     marginLeft: 18.66,
     flexGrow: 1,
     marginRight: 17.66
   },
   iniciar_sesion_box_layout: {
     marginTop: 10,
     marginBottom: 15,
     width: 146,
     minWidth: 146,
     marginLeft: 'auto',
     marginRight: 'auto'
   },
   iniciar_sesion_box: {
     flexDirection: 'row',
     alignItems: 'flex-start',
     justifyContent: 'center'
   },
   cover_group1: {
     width: '100%',
     backgroundColor: '#ffffffff',
     borderTopLeftRadius: 27,
     borderTopRightRadius: 20,
     borderBottomRightRadius: 27,
     borderBottomLeftRadius: 20
   },
   cover_group1_layout: {
     marginTop: 57,
     marginBottom: 0,
     minHeight: 54,
     marginLeft: 18.66,
     flexGrow: 1,
     marginRight: 17.66
   },
   crear_cuenta_box_layout: {
     marginTop: 10,
     marginBottom: 15,
     marginLeft: 0,
     flexGrow: 1,
     marginRight: 0
   },
   crear_cuenta_box: {
     flexDirection: 'row',
     alignItems: 'flex-start',
     justifyContent: 'center'
   },
   medium_title_box_layout: {
     marginTop: 89,
     marginBottom: 52,
     marginLeft: 47.16,
     flexGrow: 1,
     marginRight: 42.16
   },
   medium_title_box: {
     flexDirection: 'row',
     alignItems: 'flex-start',
     justifyContent: 'center'
   }
 });

export default UserList