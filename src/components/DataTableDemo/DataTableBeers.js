import './DataTableBeers.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";  

import React, { Component } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Star } from '../Star/Star.js'

import BeerService from '../../services/BeerService';


export class DataTableBeers extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            first: 0
        };

        this.beerService = new BeerService('https://api.punkapi.com/v2');

        this.onClickCallback = this.onClickCallback.bind(this);
        this.favoriteBodyTemplate = this.favoriteBodyTemplate.bind(this, this.onClickCallback);
    }

    componentDidMount() {
        let fnc = async function(beerService, obj) {
            let data = await beerService.getBeers(); 
            obj.setState({ products: data });
        }
        fnc(this.beerService, this);
    }

    onClickCallback(data) {
        let newProducts = this.beerService.changeFavorite(data);
        this.setState({ products: newProducts });
    }

    favoriteBodyTemplate(callback, rowData) {

        return <Star onClick={callback} data={rowData}/>;
    }

    render() {
        return (
            <DataTable value={this.state.products} paginator rows={10} first={this.state.first} onPage={(e) => this.setState({first: e.first})}>
                <Column field="name" header="Name"></Column>
                <Column header="Favorite" body={this.favoriteBodyTemplate}></Column>
                <Column field="tagline" header="Tagline"></Column>
            </DataTable>
        );
    }
}