import { Card, Image, Text } from '@mantine/core';
import React from 'react';

const MenuCard = () => {
    return (
        <Card shadow="sm" component="a" style={{ width: '128px', height: '158' }} radius="md">
            <Card.Section>
                <Image src="/assets/images/menu/ska20.webp" h={102} w={126} alt="black-royal" fit="initial" radius="md" />
            </Card.Section>
            <Text mt="lg" c="dimmed" size="md">
                Sidane
            </Text>
        </Card>
    );
};

export default MenuCard;
