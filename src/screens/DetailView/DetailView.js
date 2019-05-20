import React, { Component } from "react";
import { View, Image } from "react-native";
import { connect } from "react-redux";

import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Right,
  Body,
  Icon,
  H2,
  H3
} from "native-base";

// import { Image } from "react-native-elements";

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
      if (this.state.restaurant.data.logo) {
        this.setState({ imagen: true });
      }

      if (this.state.restaurant.data.entrees.length > 0) {
        this.setState({ entrantes: true });
      }

      if (this.state.restaurant.data.salads.length > 0) {
        this.setState({ ensaladas: true });
      }

      if (this.state.restaurant.data.soups.length > 0) {
        this.setState({ sopas: true });
      }
      
      if (this.state.restaurant.data.meats.length > 0) {
        this.setState({ carnes: true });
      }

      if (this.state.restaurant.data.fishes.length > 0) {
        this.setState({ pescados: true });
      }

      if (this.state.restaurant.data.specialties.length > 0) {
        this.setState({ especiales: true });
      }
    }
  }

  /**
   * COMPONENT WILL MOUNT
   */
  async componentDidMount() {
    // console.log(await this.props.navigation.getParam("data", false));
    await this.setState({
      isFocused: true,
      restaurant: this.props.navigation.getParam("data", false)
    });

    this.checkData();

    this.subs = [
      this.props.navigation.addListener("willFocus", async () => {
        console.log("inicio", this.props.navigation.getParam("data", false));
        await this.setState({
          isFocused: true,
          restaurant: this.props.navigation.getParam("data", false)
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
          especiales: false
        });
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
      <Image
        source={{
          uri: this.state.restaurant ? this.state.restaurant.data.logo : ""
        }}
        style={{ flex: 1, height: 200, width: null }}
      />
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
              <Card>
                <CardItem cardBody>
                  {this.state.imagen ? this.renderImagen() : null}
                </CardItem>
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
              </Card>
            </Content>
          ) : null}
        </View>
      </View>
    );
  }
}

export default DetailView;
