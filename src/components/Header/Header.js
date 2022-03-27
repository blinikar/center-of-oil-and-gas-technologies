import './Header.css'
import { Outlet, Link } from 'react-router-dom';

import { ProgressBar } from 'primereact/progressbar';

export const Header = (props) => {

    return <div><h3 className='header'><Link to="/">BeerTube</Link></h3>{props.initialized ? null:<ProgressBar mode="indeterminate" />}<Outlet /></div>;
}