import './Header.css'
import { Outlet } from 'react-router-dom';

export const Header = (props) => {

    return <div><h3 class='header'>BeerTube</h3><Outlet /></div>;
}