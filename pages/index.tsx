import { Container } from '@mantine/core';
import BannerHome from '../components/Banner/BannerHome';
import ListMenu from '../components/Menu/ListMenu';
import MenuContainer from '../components/Menu/MenuContainer';

const Index = () => {
    return (
        <Container fluid>
            <div className="flex flex-col items-center">
                <BannerHome />
                <ListMenu />
            </div>
            {[0, 1, 3].map((menu) => (
                <MenuContainer key={menu} />
            ))}{' '}
        </Container>
    );
};

export default Index;
