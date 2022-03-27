import './DataTableBeers.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";  

import React, { Component, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Star } from '../Star/Star.js'
import { Outlet, useNavigate } from 'react-router-dom';


export const DataTableBeers = (props) => {
    let [first, setFirst] = useState(0);
    const navigate = useNavigate();

    let favoriteBodyTemplate = (rowData) => {
        return <Star className='star' onClick={props.changeFavorite} data={rowData.id} state={rowData.favorite}/>;
    }

    let onRowClick = (rowData) => {
        navigate('/beers/'+rowData.id);
    }

    return (
        <div>
            <DataTable value={props.products} paginator rows={10} first={first} onPage={(e) => setFirst(e.first)}
                onRowClick={(e) => {onRowClick(e.data)}}>
                <Column field="name" header="Name"></Column>
                <Column header="Favorite" body={favoriteBodyTemplate}></Column>
                <Column field="tagline" header="Tagline"></Column>
            </DataTable>
            <Outlet />
        </div>
    );
} 