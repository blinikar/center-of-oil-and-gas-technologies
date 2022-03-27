import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';

export const Homepage = () => {
    
    let navigate = useNavigate();
    
    return (
        <Card title='Welcome to BeerTube' subTitle='by Yegor Blinov' className="info-card">
            <Button label='Open Table' onClick={() => navigate('/beers')}/>
        </Card>
    );
}