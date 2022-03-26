import './Star.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";  

import React from 'react';

export const Star = (props) => {

    let classNameStr = props.data.favorite ? "pi pi-star-fill" : "pi pi-star";
    return <i onClick={() => {props.onClick(props.data)}} className={classNameStr}/>
}