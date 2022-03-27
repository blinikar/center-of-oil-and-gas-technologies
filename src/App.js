import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";  

import { Routes, Route } from "react-router-dom";
import React, { Component } from 'react';
import { DataTableBeers } from './components/DataTableBeers/DataTableBeers.js';
import { Header } from './components/Header/Header.js';
import { Homepage } from './components/Homepage/Homepage.js';
import { BeerInfo } from './components/BeerInfo/BeerInfo.js';

import BeerService from './services/BeerService';



export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    };

    this.beerService = new BeerService('https://api.punkapi.com/v2');
    
    const fnc = async () => {
      await this.beerService.initBeersFromAPI();
      let data = this.beerService.getBeers();
      this.setState({ products: data });
    }
    fnc();

    this.changeFavoriteCallback = this.changeFavoriteCallback.bind(this);
  }

  changeFavoriteCallback(beerId, beerState) {

    this.setState({ products: this.beerService.changeFavorite(beerId, beerState) });
  }

  render() {
    return (
      <Routes>
        <Route path="/" element={<Header initialized={this.beerService.initialized} />}>
          <Route index element={<Homepage />}/>
          <Route path="beers" element={<DataTableBeers products={this.state.products} changeFavorite={this.changeFavoriteCallback}/>}/>
          <Route path="beers/:beerId" element={<BeerInfo products={this.state.products} changeFavorite={this.changeFavoriteCallback} beerService={this.beerService}/>}/>
        </Route>
      </Routes>
    );
  }
}
