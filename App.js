import React, { Component } from "react";
import { Image, View, Text, Animated } from "react-native";

import ProfileImage from "./assets/images/profile-image.png";

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 70;
const PROFILE_IMAGE_MAX_HEIGHT = 80;
const PROFILE_IMAGE_MIN_HEIGHT = 40;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0)
    };
  }
  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: "clamp"
    });

    const profileImageDimensions = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [PROFILE_IMAGE_MAX_HEIGHT, PROFILE_IMAGE_MIN_HEIGHT],
      extrapolate: "clamp"
    });

    const profileImageMarginTop = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [
        HEADER_MAX_HEIGHT - PROFILE_IMAGE_MAX_HEIGHT / 2,
        HEADER_MAX_HEIGHT + 5
      ],
      extrapolate: "clamp"
    });

    const headerZIndex = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
      outputRange: [0, 1],
      extrapolate: "clamp"
    });

    const headerTitleBottom = this.state.scrollY.interpolate({
      inputRange: [
        0,
        HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
        HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_IMAGE_MIN_HEIGHT,
        HEADER_MAX_HEIGHT -
          HEADER_MIN_HEIGHT +
          PROFILE_IMAGE_MIN_HEIGHT +
          5 +
          20
      ],
      outputRange: [-20, -20, -20, 1],
      extrapolate: "clamp"
    });

    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "lightskyblue",
            zIndex: headerZIndex,
            height: headerHeight,
            alignItems: "center",
            overflow: "hidden"
          }}
        >
          <Animated.View
            style={{
              position: "absolute",
              bottom: headerTitleBottom
            }}
          >
            <Text style={{ color: "#fff", fontSize: 14, fontWeight: "bold" }}>
              Amardeep Singh
            </Text>
          </Animated.View>
        </Animated.View>
        <Animated.ScrollView
          style={{ flex: 1 }}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.state.scrollY } } }
          ])}
        >
          <Animated.View
            style={{
              height: profileImageDimensions,
              width: profileImageDimensions,
              borderRadius: PROFILE_IMAGE_MAX_HEIGHT / 2,
              borderWidth: 3,
              borderColor: "#fff",
              overflow: "hidden",
              marginTop: profileImageMarginTop,
              marginLeft: 10
            }}
          >
            <Image
              source={ProfileImage}
              style={{ height: null, width: null, flex: 1 }}
            />
          </Animated.View>
          <View>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>
              Amardeep singh
            </Text>
          </View>
        </Animated.ScrollView>
      </View>
    );
  }
}
