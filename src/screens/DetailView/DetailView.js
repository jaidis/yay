import React, { Component } from "react";
import { View, Image, Alert } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { connect } from "react-redux";
import {
  favoriteTrue,
  favoriteFalse,
  addUser
} from "../../store/actions/index";

import {
  Content,
  Card,
  CardItem,
  Text,
  H2,
  H3,
  Button,
  Icon
} from "native-base";

import { Icon as IconElements } from "react-native-elements";
import { Col, Row, Grid } from "react-native-easy-grid";

// FUNCTIONS OR HELPERS
import * as NaviteBaseMenu from "../../functions/NativeBaseMenu_helper";
import * as AppConsts from "../../../config/app_consts";
import * as YAY_Api from "../../functions/YAY_Api_helper";

// LANGUAGES LIBRARY
import { setI18nConfig } from "../../../languages/i18n";
var i18n = setI18nConfig();

// STYLES
import DetailViewStyles from "./DetailViewStyles";

class DetailView extends Component {
  static navigationOptions = {
    title: "DetailView"
  };

  state = {
    restaurant: false,
    isFocused: false
  };

  async checkData() {
    if (this.state.restaurant) {
      let t_imagen,
        t_entrantes,
        t_ensaladas,
        t_sopas,
        t_carnes,
        t_pescados,
        t_especiales,
        t_descripcion,
        t_mapa,
        t_transporte_cercano,
        t_horario;

      this.state.restaurant.data.logo ? (t_imagen = true) : (t_imagen = false);
      this.state.restaurant.data.entrees.length > 0
        ? (t_entrantes = true)
        : (t_entrantes = false);
      this.state.restaurant.data.salads.length > 0
        ? (t_ensaladas = true)
        : (t_ensaladas = false);

      this.state.restaurant.data.soups.length > 0
        ? (t_sopas = true)
        : (t_sopas = false);

      this.state.restaurant.data.meats.length > 0
        ? (t_carnes = true)
        : (t_carnes = false);

      this.state.restaurant.data.fishes.length > 0
        ? (t_pescados = true)
        : (t_pescados = false);

      this.state.restaurant.data.specialties.length > 0
        ? (t_especiales = true)
        : (t_especiales = false);

      this.state.restaurant.data.description
        ? (t_descripcion = true)
        : (t_descripcion = false);

      this.state.restaurant.data.coordenateX != undefined &&
      this.state.restaurant.data.coordenateY != undefined &&
      this.state.restaurant.data.coordenateX != false &&
      this.state.restaurant.data.coordenateY != false
        ? (t_mapa = true)
        : (t_mapa = false);

      this.state.restaurant.data.transport_nearby
        ? (t_transporte_cercano = true)
        : (t_transporte_cercano = false);

      this.state.restaurant.data.schedule.length > 0
        ? (t_horario = true)
        : (t_horario = false);

      this.setState({
        imagen: t_imagen,
        entrantes: t_entrantes,
        ensaladas: t_ensaladas,
        sopas: t_sopas,
        carnes: t_carnes,
        pescados: t_pescados,
        especiales: t_especiales,
        descripcion: t_descripcion,
        mapa: t_mapa,
        transporte_cercano: t_transporte_cercano,
        horario: t_horario
      });

      NetInfo.isConnected
        .fetch()
        .then(async isConnected => {
          if (isConnected) {
            try {
              let favorites = {
                token: this.props.appJson.userdata.token,
                id_restaurant: this.props.restaurantJson.data.id
              };

              let response = await YAY_Api.fetchInternetDataAsync(
                AppConsts.URL_FAVORITES,
                await YAY_Api.getRequestPostAsync(favorites)
              );

              if (response.status === "success") {
                this.props.c_favoriteTrue();
              } else {
                console.log(response);
              }
            } catch (error) {
              console.log(error);
            }
          }
        })
        .catch(error => {
          console.log(error);
        });
      // console.log("Datos comprobados");
    }
  }

  /**
   * COMPONENT WILL MOUNT
   */
  async componentDidMount() {
    await this.setState({
      isFocused: true,
      restaurant: this.props.restaurantJson
    });

    this.checkData();

    this.subs = [
      this.props.navigation.addListener("willFocus", async () => {
        // console.log("inicio", this.props.navigation.getParam("data", false));

        await this.setState({
          isFocused: true,
          restaurant: this.props.restaurantJson
        });

        this.checkData();
      }),
      this.props.navigation.addListener("willBlur", async () => {
        this.props.navigation.setParams({ data: false });
        this.setState({
          isFocused: false,
          restaurant: false,
          imagen: false,
          entrantes: false,
          ensaladas: false,
          sopas: false,
          carnes: false,
          pescados: false,
          especiales: false,
          descripcion: false,
          mapa: false,
          transporte_cercano: false,
          horario: false,
          capacidad: false
        });
        this.props.c_favoriteFalse();
        // console.log("me voy", this.props.navigation.getParam("data", false));
      })
    ];
  }

  /**
   * COMPONENT WILL UNMOUNT
   * @description Se limpian los posibles valores que tenga la navegación, de esta forma evitamos información redundante la próxima vez que se llame al componente
   */
  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
    this.props.navigation.setParams({ data: false });
    // console.log("Desmontado");
  }

  renderImagen = () => {
    return (
      <CardItem cardBody>
        <Image
          source={{
            uri: this.state.restaurant ? this.state.restaurant.data.logo : ""
          }}
          style={DetailViewStyles.detail_view_card_item_image_style}
        />

        <IconElements
          reverse
          name={this.props.favorite ? "star" : "star-o"}
          type="font-awesome"
          color="#6E78AA"
          onPress={() => {
            NetInfo.isConnected
              .fetch()
              .then(async isConnected => {
                if (isConnected) {
                  try {
                    let favorites = {
                      token: this.props.appJson.userdata.token,
                      id_restaurant: this.props.restaurantJson.data.id
                    };

                    let response = await YAY_Api.fetchInternetDataAsync(
                      this.props.favorite
                        ? AppConsts.URL_FAVORITES_DELETE
                        : AppConsts.URL_FAVORITES_REGISTER,
                      await YAY_Api.getRequestPostAsync(favorites)
                    );

                    if (response.status === "success") {
                      this.props.favorite
                        ? this.props.c_favoriteFalse()
                        : this.props.c_favoriteTrue();

                      this.props.c_addUser(response);
                    } else {
                      Alert.alert(
                        i18n.t("internet_error_word"),
                        i18n.t("internet_error_message"),
                        [{ text: "OK" }],
                        { cancelable: false }
                      );
                    }
                  } catch (error) {
                    console.log(error);
                  }
                }
              })
              .catch(error => {
                console.log(error);
              });
          }}
          containerStyle={DetailViewStyles.detail_view_card_item_icon_style}
        />
      </CardItem>
    );
  };

  renderEntrantes = () => {
    return (
      <View>
        <CardItem cardBody style={DetailViewStyles.detail_view_card_item_style}>
          <H3>{i18n.t("detail_view_entrees")}</H3>
        </CardItem>
        <Grid>
          {this.state.restaurant.data.entrees.map((value, index) => {
            return (
              <Row
                key={index}
                style={DetailViewStyles.detail_view_card_item_row_style}
              >
                <Grid>
                  <Col size={80}>
                    <Text>{value.name}</Text>
                  </Col>
                  <Col size={20}>
                    <Text
                      style={DetailViewStyles.detail_view_card_item_col_right}
                    >
                      {value.price} €
                    </Text>
                  </Col>
                </Grid>
              </Row>
            );
          })}
        </Grid>
      </View>
    );
  };

  renderEnsaladas = () => {
    return (
      <View>
        <CardItem cardBody style={DetailViewStyles.detail_view_card_item_style}>
          <H3>{i18n.t("detail_view_salads")}</H3>
        </CardItem>
        <Grid>
          {this.state.restaurant.data.salads.map((value, index) => {
            return (
              <Row
                key={index}
                style={DetailViewStyles.detail_view_card_item_row_style}
              >
                <Grid>
                  <Col size={80}>
                    <Text>{value.name}</Text>
                  </Col>
                  <Col size={20}>
                    <Text
                      style={DetailViewStyles.detail_view_card_item_col_right}
                    >
                      {value.price} €
                    </Text>
                  </Col>
                </Grid>
              </Row>
            );
          })}
        </Grid>
      </View>
    );
  };

  renderSopas = () => {
    return (
      <View>
        <CardItem cardBody style={DetailViewStyles.detail_view_card_item_style}>
          <H3>{i18n.t("detail_view_soups")}</H3>
        </CardItem>
        <Grid>
          {this.state.restaurant.data.soups.map((value, index) => {
            return (
              <Row
                key={index}
                style={DetailViewStyles.detail_view_card_item_row_style}
              >
                <Grid>
                  <Col size={80}>
                    <Text>{value.name}</Text>
                  </Col>
                  <Col size={20}>
                    <Text
                      style={DetailViewStyles.detail_view_card_item_col_right}
                    >
                      {value.price} €
                    </Text>
                  </Col>
                </Grid>
              </Row>
            );
          })}
        </Grid>
      </View>
    );
  };

  renderCarnes = () => {
    return (
      <View>
        <CardItem cardBody style={DetailViewStyles.detail_view_card_item_style}>
          <H3>{i18n.t("detail_view_meats")}</H3>
        </CardItem>
        <Grid>
          {this.state.restaurant.data.meats.map((value, index) => {
            return (
              <Row
                key={index}
                style={DetailViewStyles.detail_view_card_item_row_style}
              >
                <Grid>
                  <Col size={80}>
                    <Text>{value.name}</Text>
                  </Col>
                  <Col size={20}>
                    <Text
                      style={DetailViewStyles.detail_view_card_item_col_right}
                    >
                      {value.price} €
                    </Text>
                  </Col>
                </Grid>
              </Row>
            );
          })}
        </Grid>
      </View>
    );
  };

  renderPescados = () => {
    return (
      <View>
        <CardItem cardBody style={DetailViewStyles.detail_view_card_item_style}>
          <H3>{i18n.t("detail_view_fishes")}</H3>
        </CardItem>
        <Grid>
          {this.state.restaurant.data.fishes.map((value, index) => {
            return (
              <Row
                key={index}
                style={DetailViewStyles.detail_view_card_item_row_style}
              >
                <Grid>
                  <Col size={80}>
                    <Text>{value.name}</Text>
                  </Col>
                  <Col size={20}>
                    <Text
                      style={DetailViewStyles.detail_view_card_item_col_right}
                    >
                      {value.price} €
                    </Text>
                  </Col>
                </Grid>
              </Row>
            );
          })}
        </Grid>
      </View>
    );
  };

  renderEspeciales = () => {
    return (
      <View>
        <CardItem cardBody style={DetailViewStyles.detail_view_card_item_style}>
          <H3>{i18n.t("detail_view_specialties")}</H3>
        </CardItem>
        <Grid>
          {this.state.restaurant.data.specialties.map((value, index) => {
            return (
              <Row
                key={index}
                style={DetailViewStyles.detail_view_card_item_row_style}
              >
                <Grid>
                  <Col size={80}>
                    <Text>{value.name}</Text>
                  </Col>
                  <Col size={20}>
                    <Text
                      style={DetailViewStyles.detail_view_card_item_col_right}
                    >
                      {value.price} €
                    </Text>
                  </Col>
                </Grid>
              </Row>
            );
          })}
        </Grid>
      </View>
    );
  };

  renderDescripcion = () => {
    return (
      <View>
        <CardItem cardBody style={DetailViewStyles.detail_view_card_item_style}>
          <H3>{i18n.t("detail_view_description")}</H3>
        </CardItem>
        <Grid>
          <Row style={DetailViewStyles.detail_view_card_item_row_style}>
            <Text>{this.state.restaurant.data.description}</Text>
          </Row>
        </Grid>
      </View>
    );
  };

  renderMapa = () => {
    return (
      <View>
        <CardItem cardBody style={DetailViewStyles.detail_view_card_item_style}>
          <H3>{i18n.t("detail_view_geolocation")}</H3>
        </CardItem>

        <Grid>
          <Row style={DetailViewStyles.detail_view_card_item_row_style}>
            <Text>X: {this.state.restaurant.data.coordenateX}</Text>
          </Row>
          <Row style={DetailViewStyles.detail_view_card_item_row_style}>
            <Text>Y: {this.state.restaurant.data.coordenateY}</Text>
          </Row>
        </Grid>
      </View>
    );
  };

  renderTransporte = () => {
    return (
      <View>
        <CardItem cardBody style={DetailViewStyles.detail_view_card_item_style}>
          <H3>{i18n.t("detail_view_transport_nearby")}</H3>
        </CardItem>
        <Grid>
          <Row style={DetailViewStyles.detail_view_card_item_row_style}>
            <Text> {this.state.restaurant.data.transport_nearby}</Text>
          </Row>
        </Grid>
      </View>
    );
  };

  renderHorario = () => {
    return (
      <View>
        <CardItem cardBody style={DetailViewStyles.detail_view_card_item_style}>
          <H3>{i18n.t("detail_view_schedule")}</H3>
        </CardItem>
        <Grid>
          {this.state.restaurant.data.schedule.map((item, index) => {
            return (
              <Row
                key={index}
                style={DetailViewStyles.detail_view_card_item_row_style}
              >
                <Text>
                  {item.name} {item.description}
                </Text>
              </Row>
            );
          })}
        </Grid>
      </View>
    );
  };

  renderCapacidad = () => {
    return (
      <View>
        <CardItem cardBody style={DetailViewStyles.detail_view_card_item_style}>
          <H3>{i18n.t("detail_view_maximum_capacity")}</H3>
        </CardItem>

        <Grid>
          <Row style={DetailViewStyles.detail_view_card_item_row_style}>
            <Text>{this.state.restaurant.data.maximum_capacity}</Text>
          </Row>
        </Grid>
      </View>
    );
  };

  render() {
    return (
      <View style={DetailViewStyles.container}>
        {NaviteBaseMenu.menuGoBack(
          this,
          this.state.restaurant.data
            ? this.state.restaurant.data.name
            : i18n.t("detail_view_title")
        )}
        <View style={DetailViewStyles.detail_view_container}>
          {this.state.isFocused ? (
            <Content>
              <Card style={DetailViewStyles.detail_view_card_style}>
                {this.state.imagen ? this.renderImagen() : null}
                <CardItem
                  cardBody
                  style={DetailViewStyles.detail_view_card_item_name}
                >
                  <H2>
                    {this.state.restaurant.data
                      ? this.state.restaurant.data.name
                      : null}
                  </H2>
                </CardItem>
                <CardItem
                  cardBody
                  style={DetailViewStyles.detail_view_card_item_location}
                >
                  <Text>
                    {this.state.restaurant.data
                      ? this.state.restaurant.data.location
                      : null}
                  </Text>
                </CardItem>
                <CardItem
                  cardBody
                  style={DetailViewStyles.detail_view_card_item_h2_style}
                >
                  <H2>{i18n.t("detail_view_suggested_dishes")}</H2>
                </CardItem>
                {this.state.entrantes ? this.renderEntrantes() : null}
                {this.state.ensaladas ? this.renderEnsaladas() : null}
                {this.state.sopas ? this.renderSopas() : null}
                {this.state.carnes ? this.renderCarnes() : null}
                {this.state.pescados ? this.renderPescados() : null}
                {this.state.especiales ? this.renderEspeciales() : null}
                <CardItem
                  cardBody
                  style={DetailViewStyles.detail_view_card_item_h2_style}
                >
                  <H2>{i18n.t("detail_view_practical_information")}</H2>
                </CardItem>
                {this.state.descripcion ? this.renderDescripcion() : null}
                {this.state.mapa ? this.renderMapa() : null}
                {this.state.transporte_cercano ? this.renderTransporte() : null}
                {this.state.horario ? this.renderHorario() : null}
                {this.state.capacidad ? this.renderCapacidad() : null}
              </Card>
            </Content>
          ) : null}
        </View>
        <View style={DetailViewStyles.detail_view_button_reserve_view_style}>
          <Button
            iconLeft
            rounded
            onPress={() => {
              this.props.navigation.navigate("Reserve");
            }}
          >
            <Icon type="FontAwesome" name="cutlery" />
            <Text>{i18n.t("detail_view_reserve")}</Text>
          </Button>
        </View>
      </View>
    );
  }
}

/**
 * @description
 * @param {*} state
 */
const mapStateToProps = state => {
  return {
    appJson: state.mainReducer.appJson,
    restaurantJson: state.mainReducer.restaurantJson,
    loading_bar: state.mainReducer.loading,
    favorite: state.mainReducer.favorite
  };
};

/**
 * @description
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => {
  return {
    c_favoriteTrue: () => dispatch(favoriteTrue()),
    c_favoriteFalse: () => dispatch(favoriteFalse()),
    c_addUser: userJSON => dispatch(addUser(userJSON))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailView);
