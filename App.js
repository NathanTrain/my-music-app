import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, LogBox } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Constants from 'expo-constants';
import Musics from './Musics.js'
import Player from './Player.js';

export default function App() {

  LogBox.ignoreAllLogs(true);

  const [audioIndex, setAudioIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

  const [audio, setAudio] = useState(null);
  const [musicas, setMusicas] = useState([
    {
      nome: 'Trail of Broken Hearts',
      artista: 'DragonForce',
      playing: false,
      pause: false,
      file: require('./musics/TrailOfBrokenHearts.mp3')
    },
    {
      nome: 'Shape Of You',
      artista: 'Ed Sheeran',
      playing: false,
      pause: false,
      file: require('./musics/ShapeOfYou.mp3')
    },
    {
      nome: 'Human',
      artista: 'Daughter',
      playing: false,
      pause: false,
      file: require('./musics/Human.mp3')
    },
  ])

  return (
    <View style={{flex:1}}>
      { /* header */ }
        <View style={{marginTop:Constants.statusBarHeight}}>
          <StatusBar style='light' backgroundColor='#427f' />
        </View>    
        <View style={styles.header}>
            <Text style={styles.headerText}>App Música | Nathan Train</Text>
        </View>
      {/* corpo */}
        <ScrollView style={styles.container}>
          {/* info */}
          <View style={styles.table}>
            <AntDesign name="infocirlce" size={20} color="#bbb" style={{paddingRight:10}} />
            <Text style={styles.tableText}>Música:</Text>
            <Text style={styles.tableText}>Artista:</Text>
          </View>

        {/* musicas */}
          <Musics musicas={musicas} setMusicas={setMusicas}
            audio={audio} setAudio={setAudio}
            playing={playing} setPlaying={setPlaying}
            setAudioIndex={setAudioIndex}
          />
        {/* base */}
          <View style={{paddingBottom:200}} />
        </ScrollView>

      {/* Player */}
        <Player playing={playing} setPlaying={setPlaying}
          audioIndex={audioIndex} setAudioIndex={setAudioIndex}
          musicas={musicas} setMusicas={setMusicas}
          audio={audio} setAudio={setAudio} 
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
  },
  header:{
    backgroundColor: '#649',
    width:'100%',
    padding:20,
  },
  headerText:{
    textAlign:'center',
    color: '#fff',
    fontSize:25,
  },
  table:{
    flexDirection:'row',
    padding:20,
    borderBottomColor:'#fff',
    borderBottomWidth: 1
  },
  tableText:{
    alignItems:'center',
    justifyContent:'center',
    width:'50%',
    color: '#bbb'
  },
});
