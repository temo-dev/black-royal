import { Card, Image, Text } from '@mantine/core';
import React from 'react';
import { MenuTypes } from '../../../types/bristo';

interface MenuCardPropsTypes {
    menu: MenuTypes;
}

const MenuCard = (props: MenuCardPropsTypes) => {
    const { menu } = props;
    return (
        <Card shadow="sm" component="a" style={{ width: '140px', height: '158' }} radius="md" href={`#menu-${menu.id}`}>
            <Card.Section>
                <Image src={menu.background} h={102} w={140} alt="black-royal" fit="initial" radius="md" />
            </Card.Section>
            <Text mt="lg" c="dimmed" size="sm" className="line-clamp-2 min-h-[40px] font-semibold uppercase">
                {menu.name_menu}
            </Text>
        </Card>
    );
};

export default MenuCard;
