/**
 * NativeBaseMenu_helper.js
 */

import React from "react";
import { Dimensions } from "react-native";
import { Image } from 'react-native-elements';

// Importar componentes de NativeBase
import {
  Container,
  Header,
  Title,
  Left,
  Icon,
  Right,
  Button,
  Body,
  StyleProvider,
  Content,
  Card,
  CardItem
} from "native-base";
import getTheme from "../../native-base-theme/components";
import platform from "../../native-base-theme/variables/platform";

import ResponsiveImage from "react-native-responsive-image";

// DIMENSIONES PARA QUE SEA RESPONSIVE
var SCREEN_WIDTH = Dimensions.get("window").width;
var SCREEN_HEIGHT = Dimensions.get("window").height;

/**
 * @description Esta función devuelve el menú superior con el logo de OpenPark, es necesario pasar la clase padre que la llama
 * @param {*} clasePadre
 */
export function menuLogo(clasePadre) {
  return (
    <StyleProvider style={getTheme(platform)}>
      <Header>
        <Left style={{ flex: 1 }}>
          <Button
            transparent
            onPress={() => clasePadre.props.navigation.toggleDrawer()}
          >
            <Icon name="menu" />
          </Button>
        </Left>
        <Body style={{ flex: 1, alignItems: "center" }}>
          <ResponsiveImage
            source={require("../../assets/img/yay-transparente.png")}
            initWidth={SCREEN_WIDTH * 0.2}
            initHeight={SCREEN_HEIGHT * 0.1}
          />
        </Body>
        <Right style={{ flex: 1 }} />
      </Header>
    </StyleProvider>
  );
}

/**
 * @description  Esta función devuelve el menú superior con el texto de OpenPark, es necesario pasar la clase padre que la llama
 * @param {*} clasePadre
 * @param {*} titulo
 */
export function menuTitulo(clasePadre, titulo="Yay!") {
  return (
    <StyleProvider style={getTheme(platform)}>
      <Header>
        <Left>
          <Button
            transparent
            onPress={() => clasePadre.props.navigation.toggleDrawer()}
          >
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Title>{titulo}</Title>
        </Body>
        <Right />
      </Header>
    </StyleProvider>
  );
}

/**
 * @description Esta función devuelve la barra superior de navegación con el icono de volver atrás, es necesario pasar la clase padre y el titulo que se desea mostrar
 * @param {*} clasePadre
 * @param {*} titulo
 */
export function menuGoBack(clasePadre, titulo = "OpenPark") {
  return (
    <StyleProvider style={getTheme(platform)}>
      <Header>
        <Left>
          <Button
            transparent
            onPress={() => clasePadre.props.navigation.goBack()}
          >
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>{titulo}</Title>
        </Body>
        <Right />
      </Header>
    </StyleProvider>
  );
}


/**
 * @description Esta función devuelve la barra superior de navegación con el icono de volver atrás, es necesario pasar la clase padre y el titulo que se desea mostrar
 * @param {*} clasePadre
 * @param {*} titulo
 */
export function menuGoHome(clasePadre, titulo = "OpenPark") {
  return (
    <StyleProvider style={getTheme(platform)}>
      <Header>
        <Left>
          <Button
            transparent
            onPress={() => clasePadre.props.navigation.navigate("Home")}
          >
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>{titulo}</Title>
        </Body>
        <Right />
      </Header>
    </StyleProvider>
  );
}
