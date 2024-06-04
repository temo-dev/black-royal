/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IRootState } from '../../store';
import { toggleLocale, toggleRTL } from '../../store/themeConfigSlice';
import { useTranslation } from 'react-i18next';
import Dropdown from '../Dropdown';
import { changeMenuByLanguage, resetCurrentOrder, updateCurrentOrder, updateTotalitems } from '../../store/bristoSlice';
import { ActionIcon, Button, Drawer, Group, Image, Indicator, Modal, ScrollArea, Stack, Table, rem } from '@mantine/core';
import { IconBasketFilled, IconCashBanknoteFilled, IconCircleCheckFilled, IconCircleXFilled, IconLocationFilled } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { BillingOrder, FoodOrderTypes } from '../../types/bristo';
import QRCode from 'react-qr-code';
import Thankyou from '../container/Thankyou';
import { Map, ZoomControl } from 'react-mapycz';

const Header = () => {
    const router = useRouter();
    const bristoConfig = useSelector((state: IRootState) => state.bristoConfig);
    const [listOrdered, drawedListOrdered] = useDisclosure(false);
    const [paymentModelOpened, paymentModel] = useDisclosure(false);
    const [paymentDoneOpend, paymentDone] = useDisclosure(false);
    const [localOpened, handleLocal] = useDisclosure(false);
    const [quantity, setQuantity] = useState<number>(0);
    const [order, setOrder] = useState<BillingOrder | null>(null);

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

    const handlePlusQuantity = (e: number, item: FoodOrderTypes) => {
        if (order) {
            item.quantity += 1;
            order.totalQuantity += 1;
            order.total += item.food.price * e;
            dispatch(updateCurrentOrder(order));
            dispatch(updateTotalitems({ code: 'plus', number: 1 }));
        }
    };

    const handleReduceQuantity = (e: number, item: FoodOrderTypes) => {
        if (order && item.quantity > 1) {
            item.quantity -= 1;
            order.totalQuantity -= 1;
            order.total -= item.food.price * e;
            dispatch(updateCurrentOrder(order));
            dispatch(updateTotalitems({ code: 'reduce', number: 1 }));
        }
    };

    const hanldeOrderDone = () => {
        paymentModel.close();
        drawedListOrdered.close();
        paymentDone.open();
    };

    const hanldeConfirm = () => {
        setOrder(null);
        setQuantity(0);
        dispatch(resetCurrentOrder());
        paymentDone.close();
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
                                    <span className=" align-middle text-base  font-black  text-green-700 transition-all duration-300 ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light md:inline">NIKA</span>
                                    <span className="font-base align-middle  text-[10px]  text-green-700 transition-all duration-300 ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light md:inline">
                                        Coffe and Tea
                                    </span>
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
                                    <ActionIcon variant="light" className="text-orange-300 hover:text-orange-300" radius="xl" size={30} onClick={drawedListOrdered.open} disabled={quantity === 0}>
                                        <IconBasketFilled style={{ width: rem(36), height: rem(36) }} />
                                    </ActionIcon>
                                </Indicator>
                            </div>
                            <div>
                                <ActionIcon variant="light" className="text-orange-300 hover:text-orange-300" radius="xl" size={30} onClick={handleLocal.open}>
                                    <IconLocationFilled style={{ width: rem(30), height: rem(30) }} />
                                </ActionIcon>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <Drawer opened={listOrdered} onClose={drawedListOrdered.close} title={<h1 className=" text-lg font-bold capitalize">your order</h1>}>
                <Stack justify="space-between" className="h-[calc(100vh_-_80px)]">
                    <ScrollArea h={600} scrollbars="y">
                        <Table stickyHeader verticalSpacing="xs" className="capitalize" striped highlightOnHover>
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
                                        <Table.Td>#{item.food.id}</Table.Td>
                                        <Table.Td>
                                            <Image src={item.food.image} w={100} h="auto" fit="cover" alt={item.food.name_food} radius="md" />
                                        </Table.Td>
                                        <Table.Td>
                                            <h1 className="font-semibold">{item.food.name_food}</h1>
                                        </Table.Td>
                                        <Table.Td>
                                            <div className="inline-flex w-[40px] flex-col">
                                                <button
                                                    type="button"
                                                    className="bg-orange-30 flex items-center justify-center rounded-t-md border border-orange-300 bg-orange-300 p-1 font-semibold text-white"
                                                    onClick={() => handlePlusQuantity(1, item)}
                                                >
                                                    +
                                                </button>
                                                <input type="text" placeholder="55" className="form-input rounded-none px-2 text-center" min="1" max="25" readOnly value={item.quantity} />
                                                <button
                                                    type="button"
                                                    className="flex items-center justify-center rounded-b-md border border-t-0 border-orange-300 bg-orange-300 p-1 font-semibold text-white"
                                                    onClick={() => handleReduceQuantity(1, item)}
                                                >
                                                    -
                                                </button>
                                            </div>
                                        </Table.Td>
                                        <Table.Td>
                                            <h1 className="font-bold">{item.quantity * item.food.price} kc</h1>
                                        </Table.Td>
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
                        onClick={paymentModel.open}
                    >
                        Pay
                    </Button>
                </Stack>
            </Drawer>
            <Modal opened={paymentModelOpened} onClose={paymentModel.close} title={<h1 className=" text-lg font-bold capitalize">Pay by QRCode</h1>}>
                <Stack justify="space-between" align="center">
                    <QRCode value={`SPD*1.0*ACC:CZ7201000001158044580277*AM:${order?.total}*CC:CZK*PT:IP*MSG:NIKA_COFFEE: Order Numbder:${order?.id}*`} />
                    {/* <Group>
                        <Button
                            variant="filled"
                            className="bg-orange-400 text-base font-bold hover:bg-orange-700"
                            leftSection={<IconCardsFilled style={{ width: rem(20), height: rem(20) }} />}
                            onClick={paymentModel.open}
                        >
                            Pay Card
                        </Button>
                        <Button
                            variant="filled"
                            className="bg-orange-400 text-base  font-bold hover:bg-orange-700"
                            leftSection={<IconCashBanknoteFilled style={{ width: rem(20), height: rem(20) }} />}
                            onClick={paymentModel.open}
                        >
                            Pay Cash
                        </Button>
                    </Group> */}
                    <Group>
                        <Button
                            variant="filled"
                            className="btn-danger text-base font-bold hover:bg-orange-700"
                            leftSection={<IconCircleXFilled style={{ width: rem(20), height: rem(20) }} />}
                            onClick={paymentModel.close}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="filled"
                            className="btn-success font-bol text-base hover:bg-green-900"
                            leftSection={<IconCircleCheckFilled style={{ width: rem(20), height: rem(20) }} />}
                            onClick={hanldeOrderDone}
                        >
                            QRCode Done
                        </Button>
                    </Group>
                </Stack>
            </Modal>
            <Modal opened={paymentDoneOpend} onClose={paymentDone.close} title={<h1 className=" text-lg font-bold capitalize">Thank You For Your Order !</h1>} radius="md">
                <Stack>
                    <Thankyou clientOrder={order} />
                    <Button
                        variant="filled"
                        className="btn-success font-bol text-base hover:bg-green-900"
                        leftSection={<IconCircleCheckFilled style={{ width: rem(20), height: rem(20) }} />}
                        onClick={hanldeConfirm}
                    >
                        Confirm
                    </Button>
                </Stack>
            </Modal>
            <Modal opened={localOpened} onClose={handleLocal.close} title={<h1 className=" text-lg font-bold capitalize">Your Local:</h1>} radius="md">
                <Stack>
                    <Map height="50vh" center={{ lat: 50.0755, lng: 14.4378 }} zoom={18}>
                        <ZoomControl />
                    </Map>
                </Stack>
            </Modal>
        </>
    );
};

export default Header;
