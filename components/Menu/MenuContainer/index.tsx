import { Button, Grid, rem } from '@mantine/core';
import React from 'react';
import ItemCard from '../../Item/ItemCard';
import classes from './MenuContainer.module.css';
import { IconArrowBarToDown } from '@tabler/icons-react';
import TagMenu from '../TagMenu';
import { MenuTypes } from '../../../types/bristo';

interface MenuContainerProps {
    menu: MenuTypes;
}
const MenuContainer = (props: MenuContainerProps) => {
    const { menu } = props;
    return (
        <div className="mt-10" id={`menu-${menu.id}`}>
            <h1 className="text-2xl font-black  capitalize md:text-5xl">{menu.name_menu}</h1>
            <TagMenu />
            <Grid justify="center" align="flex-start" gutter="md">
                {menu.foods.map((item) => (
                    <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 4, xl: 3 }} key={item.id} style={{ maxWidth: '400px' }}>
                        <ItemCard food={item} />
                    </Grid.Col>
                ))}
            </Grid>
            <div className="mt-8 flex w-full items-center justify-center">
                <Button variant="light" color="gray" size="md" className={classes.button} rightSection={<IconArrowBarToDown style={{ width: rem(16), height: rem(16) }} />}>
                    Zobrazit více
                </Button>
            </div>
        </div>
    );
};

export default MenuContainer;
