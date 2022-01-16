import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";

const Player = (props) => {
  // back function
  const handleBack = async () => {
    let newIndex = props.audioIndex - 1;
    if (newIndex < 0) {
      newIndex = props.musicas.length - 1;
    }
    props.setAudioIndex(newIndex);
    let curFile = props.musicas[newIndex].file;
    // atualizar interface
    let newMusics = props.musicas.filter((val, k) => {
      if (newIndex == k) {
        props.musicas[k].playing = true;
        curFile = props.musicas[k].file;
      } else {
        props.musicas[k].pause = false;
        props.musicas[k].playing = false;
      }
      return props.musicas[k];
    });

    if (props.audio != null) {
      await props.audio.unloadAsync();
    }
    let curAudio = new Audio.Sound();
    try {
      await curAudio.loadAsync(curFile);
      await curAudio.playAsync();
    } catch (error) {}

    props.setAudio(curAudio);
    props.setMusicas(newMusics);
    props.setPlaying(true);
  };

  //next funciont
  const handleNext = async () => {
    let newIndex = props.audioIndex + 1;
    if (newIndex > props.musicas.length - 1) {
      newIndex = 0;
    }
    props.setAudioIndex(newIndex);
    let curFile = props.musicas[newIndex].file;
    // atualizar interface
    let newMusics = props.musicas.filter((val, k) => {
      if (newIndex == k) {
        props.musicas[k].playing = true;
        curFile = props.musicas[k].file;
      } else {
        props.musicas[k].pause = false;
        props.musicas[k].playing = false;
      }
      return props.musicas[k];
    });

    if (props.audio != null) {
      await props.audio.unloadAsync();
    }
    let curAudio = new Audio.Sound();
    try {
      await curAudio.loadAsync(curFile);
      await curAudio.playAsync();
    } catch (error) {}

    props.setAudio(curAudio);
    props.setMusicas(newMusics);
    props.setPlaying(true);
  };

  // PLAY FUNCTION
  const handlePlay = async () => {
    let curFile = props.musicas[props.audioIndex].file;
    props.musicas[props.audioIndex].pause = false;
    let newMusics = props.musicas.filter((val, k) => {
      if (props.audioIndex == k) {
        props.musicas[k].playing = true;
        curFile = props.musicas[k].file;
      } else {
        props.musicas[k].playing = false;
      }
      return props.musicas[k];
    });

    if (props.audio != null) {
      props.setPlaying(true);
      props.setMusicas(newMusics);
      await props.audio.playAsync();
    } else {
      let curAudio = new Audio.Sound();
      try {
        await curAudio.loadAsync(curFile);
        await curAudio.playAsync();
      } catch (error) {}

      props.setAudio(curAudio);
      props.setMusicas(newMusics);
      props.setPlaying(true);
    }
  };

  // PAUSE FUNCTION
  const handlePause = async () => {
    if (props.audio != null) {
      props.audio.pauseAsync();
    }
    props.musicas[props.audioIndex].pause = true;
    props.setPlaying(false);
  };

  // BOTTOM TAB
  return (
    <View style={styles.player}>
      <TouchableOpacity onPress={() => handleBack()} style={styles.btnPlayer}>
        <AntDesign name="stepbackward" size={35} color="#fff" />
      </TouchableOpacity>

      {!props.playing ? (
        <TouchableOpacity onPress={() => handlePlay()} style={styles.btnPlayer}>
          <AntDesign name="playcircleo" size={35} color="#fff" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => handlePause()}
          style={styles.btnPlayer}
        >
          <AntDesign name="pausecircleo" size={35} color="#fff" />
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={() => handleNext()} style={styles.btnPlayer}>
        <AntDesign name="stepforward" size={35} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Player;

const styles = StyleSheet.create({
  player: {
    width: "100%",
    height: 100,
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 999,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  btnPlayer: {
    marginHorizontal: 20,
  },
});
