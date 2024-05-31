import React from 'react';
// import { Button } from '../components/button/Button';
// import { Card } from '../components/cards/Card';
// import { Header1 } from '../components/text/Typography';
import { Button } from '../components/button/Button';
import { Container } from '@/components/container/Container';

const Homepage = () => {
    return (
        <Container center={true} >
            <Button size='lg' color='tertiary' loading>
                Eshika Rawat
            </Button>
        </Container>
    );
};

export default Homepage;
