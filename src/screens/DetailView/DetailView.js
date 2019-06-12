import React, { Component } from "react";
import { View, Image } from "react-native";
import { connect } from "react-redux";
import { favoriteTrue, favoriteFalse } from "../../store/actions/index";

import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Right,
  Body,
  H2,
  H3,
  Button,
  Icon
} from "native-base";

import { Icon as IconElements } from "react-native-elements";

import { Col, Row, Grid } from "react-native-easy-grid";

import * as NaviteBaseMenu from "../../functions/NativeBaseMenu_helper";

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

      this.state.restaurant.data.logo ? (imagen = true) : (imagen = false);
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
        imagen: imagen,
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

      console.log("Datos comprobados");
    }
  }

  /**
   * COMPONENT WILL MOUNT
   */
  async componentDidMount() {
    // console.log(await this.props.navigation.getParam("data", false));
    // await this.setState({
    //   isFocused: true,
    //   restaurant: this.props.navigation.getParam("data", false)
    // });

    await this.setState({
      isFocused: true,
      restaurant: this.props.restaurantJson
    });

    this.checkData();

    this.subs = [
      this.props.navigation.addListener("willFocus", async () => {
        console.log("inicio", this.props.navigation.getParam("data", false));
        // await this.setState({
        //   isFocused: true,
        //   restaurant: this.props.navigation.getParam("data", false)
        // });

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
        console.log("me voy", this.props.navigation.getParam("data", false));
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
    console.log("Desmontado");
  }

  renderImagen = () => {
    return (
      <CardItem cardBody>
        <Image
          source={{
            uri: this.state.restaurant ? this.state.restaurant.data.logo : ""
          }}
          style={{ flex: 1, height: 200, width: null }}
        />

        <IconElements
          reverse
          name={this.props.favorite ? "star" : "star-o"}
          type="font-awesome"
          color="#6E78AA"
          onPress={() =>
            this.props.favorite
              ? this.props.c_favoriteFalse()
              : this.props.c_favoriteTrue()
          }
          containerStyle={{
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            right: 5,
            bottom: -25
          }}
        />
      </CardItem>
    );
  };

  renderEntrantes = () => {
    return (
      <View>
        <CardItem
          cardBody
          style={{ marginTop: 20, marginLeft: 10, paddingBottom: 10 }}
        >
          <H3>Entrantes</H3>
        </CardItem>
        <Grid>
          {this.state.restaurant.data.entrees.map((value, index) => {
            return (
              // <CardItem key={index}>
              //   <Grid>
              //     <Col size={90}>
              //       <Text>{value.name}</Text>
              //     </Col>
              //     <Col size={10}>
              //       <Text>{value.price}€</Text>
              //     </Col>
              //   </Grid>
              // </CardItem>
              <Row key={index} style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Grid>
                  <Col size={80}>
                    <Text>{value.name}</Text>
                  </Col>
                  <Col size={20}>
                    <Text style={{ textAlign: "right" }}>{value.price} €</Text>
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
        <CardItem
          cardBody
          style={{ marginTop: 20, marginLeft: 10, paddingBottom: 10 }}
        >
          <H3>Ensaladas</H3>
        </CardItem>
        <Grid>
          {this.state.restaurant.data.salads.map((value, index) => {
            return (
              <Row key={index} style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Grid>
                  <Col size={80}>
                    <Text>{value.name}</Text>
                  </Col>
                  <Col size={20}>
                    <Text style={{ textAlign: "right" }}>{value.price} €</Text>
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
        <CardItem
          cardBody
          style={{ marginTop: 20, marginLeft: 10, paddingBottom: 10 }}
        >
          <H3>Sopas</H3>
        </CardItem>
        <Grid>
          {this.state.restaurant.data.soups.map((value, index) => {
            return (
              <Row key={index} style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Grid>
                  <Col size={80}>
                    <Text>{value.name}</Text>
                  </Col>
                  <Col size={20}>
                    <Text style={{ textAlign: "right" }}>{value.price} €</Text>
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
        <CardItem
          cardBody
          style={{ marginTop: 20, marginLeft: 10, paddingBottom: 10 }}
        >
          <H3>Carnes</H3>
        </CardItem>
        <Grid>
          {this.state.restaurant.data.meats.map((value, index) => {
            return (
              <Row key={index} style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Grid>
                  <Col size={80}>
                    <Text>{value.name}</Text>
                  </Col>
                  <Col size={20}>
                    <Text style={{ textAlign: "right" }}>{value.price} €</Text>
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
        <CardItem
          cardBody
          style={{ marginTop: 20, marginLeft: 10, paddingBottom: 10 }}
        >
          <H3>Pescados</H3>
        </CardItem>
        <Grid>
          {this.state.restaurant.data.fishes.map((value, index) => {
            return (
              <Row key={index} style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Grid>
                  <Col size={80}>
                    <Text>{value.name}</Text>
                  </Col>
                  <Col size={20}>
                    <Text style={{ textAlign: "right" }}>{value.price} €</Text>
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
        <CardItem
          cardBody
          style={{ marginTop: 20, marginLeft: 10, paddingBottom: 10 }}
        >
          <H3>Especiales</H3>
        </CardItem>
        <Grid>
          {this.state.restaurant.data.specialties.map((value, index) => {
            return (
              <Row key={index} style={{ paddingLeft: 20, paddingRight: 20 }}>
                <Grid>
                  <Col size={80}>
                    <Text>{value.name}</Text>
                  </Col>
                  <Col size={20}>
                    <Text style={{ textAlign: "right" }}>{value.price} €</Text>
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
        <CardItem
          cardBody
          style={{ marginTop: 20, marginLeft: 10, paddingBottom: 10 }}
        >
          <H3>En pocas palabras</H3>
        </CardItem>
        <Grid>
          <Row style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Text>{this.state.restaurant.data.description}</Text>
          </Row>
        </Grid>
      </View>
    );
  };

  renderMapa = () => {
    return (
      <View>
        <CardItem
          cardBody
          style={{ marginTop: 20, marginLeft: 10, paddingBottom: 10 }}
        >
          <H3>Geolocalización</H3>
        </CardItem>

        <Grid>
          <Row style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Text>
              X: {this.state.restaurant.data.coordenateX}
              Y: {this.state.restaurant.data.coordenateY}
            </Text>
          </Row>
        </Grid>
      </View>
    );
  };

  renderTransporte = () => {
    return (
      <View>
        <CardItem
          cardBody
          style={{ marginTop: 20, marginLeft: 10, paddingBottom: 10 }}
        >
          <H3>Transporte Cercano</H3>
        </CardItem>
        <Grid>
          <Row style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Text> {this.state.restaurant.data.transport_nearby}</Text>
          </Row>
        </Grid>
      </View>
    );
  };

  renderHorario = () => {
    return (
      <View>
        <CardItem
          cardBody
          style={{ marginTop: 20, marginLeft: 10, paddingBottom: 10 }}
        >
          <H3>Horario</H3>
        </CardItem>
        <Grid>
          {this.state.restaurant.data.schedule.map((item, index) => {
            return (
              <Row key={index} style={{ paddingLeft: 20, paddingRight: 20 }}>
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
        <CardItem
          cardBody
          style={{ marginTop: 20, marginLeft: 10, paddingBottom: 10 }}
        >
          <H3>Aforo máximo</H3>
        </CardItem>

        <Grid>
          <Row style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Text>{this.state.restaurant.data.maximum_capacity}</Text>
          </Row>
        </Grid>
      </View>
    );
  };

  render() {
    eltenedor = {
      emai: "eltenedor@mailna.co",
      password: "asdf123",
      nombre: "tenedor",
      apellido: "cuchara"
    };
    return (
      <View style={DetailViewStyles.container}>
        {NaviteBaseMenu.menuGoBack(
          this,
          this.state.restaurant.data
            ? this.state.restaurant.data.name
            : "DetailView"
        )}
        {/* <Text>DetailViewScreen!</Text> */}
        <View style={{ flex: 1, margin: 20 }}>
          {this.state.isFocused ? (
            <Content>
              <Card style={{ paddingBottom: 20 }}>
                {this.state.imagen ? this.renderImagen() : null}
                <CardItem cardBody style={{ marginTop: 20, marginLeft: 10 }}>
                  <H2>
                    {this.state.restaurant.data
                      ? this.state.restaurant.data.name
                      : null}
                  </H2>
                </CardItem>
                <CardItem cardBody style={{ marginLeft: 10 }}>
                  <Text>
                    {this.state.restaurant.data
                      ? this.state.restaurant.data.location
                      : null}
                  </Text>
                </CardItem>
                <CardItem cardBody style={{ marginTop: 20, marginLeft: 10 }}>
                  <H2>Platos sugeridos</H2>
                </CardItem>
                {this.state.entrantes ? this.renderEntrantes() : null}
                {this.state.ensaladas ? this.renderEnsaladas() : null}
                {this.state.sopas ? this.renderSopas() : null}
                {this.state.carnes ? this.renderCarnes() : null}
                {this.state.pescados ? this.renderPescados() : null}
                {this.state.especiales ? this.renderEspeciales() : null}
                <CardItem cardBody style={{ marginTop: 20, marginLeft: 10 }}>
                  <H2>Información práctica</H2>
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
        <View
          style={{
            position: "absolute",
            alignItems: "center",
            justifyContent: "center",
            right: 10,
            bottom: 10
          }}
        >
          <Button
            iconLeft
            rounded
            onPress={() => {
              console.log(this.props.restaurantJson);
            }}
          >
            <Icon type="FontAwesome" name="cutlery" />
            <Text>RESERVAR</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    appJson: state.mainReducer.appJson,
    restaurantJson: state.mainReducer.restaurantJson,
    loading_bar: state.mainReducer.loading,
    favorite: state.mainReducer.favorite
  };
};

const mapDispatchToProps = dispatch => {
  return {
    c_favoriteTrue: () => dispatch(favoriteTrue()),
    c_favoriteFalse: () => dispatch(favoriteFalse())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailView);
