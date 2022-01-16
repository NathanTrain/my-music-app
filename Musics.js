
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const Musics = (props)=>{
    
    const changeMusic = async (id) =>{
        let curFile = null;
        let newMusics = props.musicas.filter((val, k)=>{
            if(id == k){
                props.setAudioIndex(k)
                props.musicas[k].pause = false;
                if(props.playing && props.musicas[k].playing){
                    props.musicas[k].playing = false;
                    props.setPlaying(false);
                }else{
                    props.musicas[k].playing = true;
                    curFile = props.musicas[k].file;
                    props.setPlaying(true)
                }
            }else{
                props.musicas[k].playing = false;
                props.musicas[k].pause = false;
            }
            return props.musicas[k];
        })

        if (props.audio != null){
            props.audio.unloadAsync();
            props.setPlaying(false);
        }

        let curAudio = new Audio.Sound();
        try{
            await curAudio.loadAsync(curFile);
            await curAudio.playAsync();
            props.setPlaying(true);
        }catch(error){}

        props.setAudio(curAudio);
        props.setMusicas(newMusics);
    }

    return (
        props.musicas.map((val, k)=>{
            if (val.playing && !val.pause){
                // se ta tocando:
                return(
                    <View style={styles.table}>
                        <TouchableOpacity onPress={()=>changeMusic(k)} style={{width:'100%', flexDirection:'row'}}>
                            <AntDesign name='pausecircle' size={20} color='#85b' style={{paddingRight:10}} />
                            <Text style={styles.tableTextSelected}>
                                {val.nome}
                            </Text>
                            <Text style={styles.tableTextSelected}>
                                {val.artista}
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
            }else if (val.pause){
                // se ta pausado:
                return(
                    <View style={styles.table}>
                        <TouchableOpacity onPress={()=>changeMusic(k)} style={{width:'100%', flexDirection:'row'}}>
                            <AntDesign name='play' size={20} color='#85b' style={{paddingRight:10}} />
                            <Text style={styles.tableTextSelected}>
                                {val.nome}
                            </Text>
                            <Text style={styles.tableTextSelected}>
                                {val.artista}
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
            }else{
                return(
                    <View style={styles.table}>
                        <TouchableOpacity onPress={()=>changeMusic(k)} style={{width:'100%', flexDirection:'row'}}>
                            <AntDesign name='play' size={20} color='#fff' style={{paddingRight:10}} />
                            <Text style={styles.tableText}>
                                {val.nome}
                            </Text>
                            <Text style={styles.tableText}>
                                {val.artista}
                            </Text>
                        </TouchableOpacity>
                    </View>
                );
            }
        })
    )
}

export default Musics;

const styles = StyleSheet.create({
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
      tableTextSelected:{
        alignItems:'center',
        justifyContent:'center',
        width:'50%',
        color: '#85b'
      },
})
