/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IRootState } from '../../store';
import { toggleLocale, toggleRTL } from '../../store/themeConfigSlice';
import { useTranslation } from 'react-i18next';
import Dropdown from '../Dropdown';
import { changeMenuByLanguage, setCurrentOrder } from '../../store/bristoSlice';
import { ActionIcon, Box, Button, Drawer, Image, Indicator, NumberInput, ScrollArea, Stack, Table, rem } from '@mantine/core';
import { IconBasketFilled, IconCashBanknoteFilled } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { BillingOrder, FoodOrderTypes } from '../../types/bristo';

const Header = () => {
    const router = useRouter();
    const bristoConfig = useSelector((state: IRootState) => state.bristoConfig);
    const [listOrdered, drawedListOrdered] = useDisclosure(false);
    const [quantity, setQuantity] = useState<number | null>(null);
    const [order, setOrder] = useState<BillingOrder>();
    console.log('order====', order);

    useEffect(() => {
        if (bristoConfig.currentOrder) {
            setQuantity(bristoConfig.totalItems);
            setOrder(bristoConfig.currentOrder);
        }
    }, [bristoConfig.totalItems]);

    useEffect(() => {
        const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
        if (selector) {
            const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
            for (let i = 0; i < all.length; i++) {
                all[0]?.classList.remove('active');
            }

            let allLinks = document.querySelectorAll('ul.horizontal-menu a.active');
            for (let i = 0; i < allLinks.length; i++) {
                const element = allLinks[i];
                element?.classList.remove('active');
            }
            selector?.classList.add('active');

            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
                if (ele) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele?.classList.add('active');
                    });
                }
            }
        }
    }, [router.pathname]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const setLocale = (flag: string) => {
        setFlag(flag);
        if (flag.toLowerCase() === 'ae') {
            dispatch(toggleRTL('rtl'));
        } else {
            dispatch(toggleRTL('ltr'));
        }
    };
    const [flag, setFlag] = useState('');
    useEffect(() => {
        setLocale(localStorage.getItem('i18nextLng') || themeConfig.locale);
    });
    const dispatch = useDispatch();

    const { t, i18n } = useTranslation();

    const handleChangeQuantity = (e: string | number, item: FoodOrderTypes) => {
        console.log('handleChangeQuantity', e, item);
        if (order) {
            item.quantity = Number(e);
            order.updateFood(item);
            dispatch(setCurrentOrder(order));
        }
    };

    return (
        <>
            <header className={`z-40 ${themeConfig.semidark && themeConfig.menu === 'horizontal' ? 'dark' : ''}`}>
                <div className="shadow-sm">
                    <div className="relative flex w-full items-center bg-white px-5 py-2.5 dark:bg-black">
                        <div className="horizontal-logo flex items-center justify-between ltr:mr-2 rtl:ml-2 lg:hidden">
                            <Link href="/" className="main-logo flex shrink-0 items-center">
                                <img className="inline h-[50px] w-[50px] ltr:-ml-1 rtl:-mr-1" src="/assets/images/logo.svg" alt="logo" />
                                <span className="flex flex-col items-center justify-center">
                                    <span className=" align-middle text-base  font-black  transition-all duration-300 ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light md:inline">BLACK ROYAL</span>
                                    <span className="font-base align-middle  text-[10px]  transition-all duration-300 ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light md:inline">ASIAN KITCHEN</span>
                                </span>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-1.5 ltr:ml-auto rtl:mr-auto rtl:space-x-reverse dark:text-[#d0d2d6] sm:flex-1 ltr:sm:ml-0 sm:rtl:mr-0 lg:space-x-2">
                            <div className="sm:ltr:mr-auto sm:rtl:ml-auto"></div>
                            <div className="dropdown shrink-0">
                                <Dropdown
                                    offset={[0, 8]}
                                    placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`}
                                    btnClassName="block p-2 rounded-full bg-white-light/40 dark:bg-dark/40 hover:text-primary hover:bg-white-light/90 dark:hover:bg-dark/60"
                                    button={flag && <img className="h-5 w-5 rounded-full object-cover" src={`/assets/images/flags/${flag.toUpperCase()}.svg`} alt="flag" />}
                                >
                                    <ul className="grid w-[280px] grid-cols-2 gap-2 !px-2 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
                                        {themeConfig.languageList.map((item: any) => {
                                            return (
                                                <li key={item.code}>
                                                    <button
                                                        type="button"
                                                        className={`flex w-full hover:text-primary ${i18n.language === item.code ? 'bg-primary/10 text-primary' : ''}`}
                                                        onClick={() => {
                                                            dispatch(toggleLocale(item.code));
                                                            i18n.changeLanguage(item.code);
                                                            setLocale(item.code);
                                                            dispatch(changeMenuByLanguage(item.code));
                                                        }}
                                                    >
                                                        <img src={`/assets/images/flags/${item.code.toUpperCase()}.svg`} alt="flag" className="h-5 w-5 rounded-full object-cover" />
                                                        <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </Dropdown>
                            </div>
                            <div>
                                <Indicator size={!quantity ? 0 : 15} inline label={quantity} color="red">
                                    <ActionIcon variant="light" className="text-orange-300 hover:text-orange-300" radius="xl" size={30} onClick={drawedListOrdered.open} disabled={quantity === null}>
                                        <IconBasketFilled style={{ width: rem(36), height: rem(36) }} />
                                    </ActionIcon>
                                </Indicator>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <Drawer opened={listOrdered} onClose={drawedListOrdered.close} title={<h1 className=" text-lg font-bold capitalize">your order</h1>}>
                <Stack justify="space-between" className="h-[calc(100vh_-_80px)]">
                    <ScrollArea h={600} scrollbars="y">
                        <Table stickyHeader verticalSpacing="md" className="capitalize" striped highlightOnHover>
                            <Table.Thead>
                                <Table.Tr className="bg-white">
                                    <Table.Th>id</Table.Th>
                                    <Table.Th>image</Table.Th>
                                    <Table.Th>name</Table.Th>
                                    <Table.Th>quantity</Table.Th>
                                    <Table.Th>total</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>
                                {order?.foods.map((item) => (
                                    <Table.Tr key={item.food.id}>
                                        <Table.Td>{item.food.id}</Table.Td>
                                        <Table.Td>
                                            <Image src={item.food.image} w={40} h="auto" fit="cover" alt={item.food.name_food} />
                                        </Table.Td>
                                        <Table.Td>{item.food.name_food}</Table.Td>
                                        <Table.Td>
                                            <NumberInput defaultValue={item.quantity} min={1} max={100} onChange={(e) => handleChangeQuantity(e, item)} />
                                        </Table.Td>
                                        <Table.Td>{item.quantity * item.food.price} kc</Table.Td>
                                    </Table.Tr>
                                ))}
                            </Table.Tbody>
                        </Table>
                    </ScrollArea>

                    <Button
                        fullWidth
                        variant="filled"
                        className="bg-orange-400 text-lg font-bold hover:bg-orange-700"
                        leftSection={<IconCashBanknoteFilled style={{ width: rem(36), height: rem(36) }} />}
                    >
                        Pay
                    </Button>
                </Stack>
            </Drawer>
        </>
    );
};

export default Header;
