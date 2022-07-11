import React, { Component } from "react";
import Search from "../pages/Search";

class Frase extends Component {
  render() {
    return <p>{`Resultado de álbuns de: ${searchedWord}`}</p>;
  }
}

export default Frase;
