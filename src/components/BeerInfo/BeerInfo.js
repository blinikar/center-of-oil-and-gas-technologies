import './BeerInfo.css';
import { useParams, Link, useNavigate } from "react-router-dom";
import "primeicons/primeicons.css";  

import { Card } from 'primereact/card';
import { Image } from 'primereact/image';
import { Skeleton } from 'primereact/skeleton';
import { Button } from 'primereact/button';

export const BeerInfo = (props) => {

    let navigate = useNavigate();
    let params = useParams();
    
    let index = props.beerService.getIndexById(params.beerId);

    if (!props.beerService.initialized) return <Card className="info-card"><Skeleton height='100px'/></Card>
    if (index == -1) return <Card className="info-card" title="Incorrect ID :("></Card>
    
    let product = props.products[index];

    let button = {
        class: product.favorite ? "p-button-outlined" : "p-button",
        label: product.favorite ? "In Favorites" : "Add To Favorites"
    }; 
    
    return (
        <Card title={<div><Button className="p-button-rounded p-button-text" icon="pi pi-arrow-left" onClick={() => navigate("/beers")} /><div className='label'>{product.name}</div></div>} subTitle={product.abv+'% | '+product.tagline+' | by '+ product.contributed_by + ' | est. ' + product.first_brewed} className="info-card">
            <Image src={product.image_url} alt={product.name} imageClassName="beer-image" />
            <p>{product.description}</p>
            <Button onClick={() => props.changeFavorite(product.id, product.favorite)} label={button.label} className={button.class} />
        </Card>
    );
}