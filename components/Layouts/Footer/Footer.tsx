import Link from 'next/link';
import { Container, Group, ActionIcon, rem } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import classes from './FooterSocial.module.css';
const Footer = () => {
    return (
        <>
            <div className={classes.footer}>
                <Container className={classes.inner}>
                    <Link href="/" className="main-logo flex shrink-0 items-center">
                        <img className="inline h-[50px] w-[50px] ltr:-ml-1 rtl:-mr-1" src="/assets/images/logo.svg" alt="logo" />
                        <span className="flex flex-col items-center justify-center">
                            <span className=" align-middle text-base  font-black  transition-all duration-300 ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light md:inline">BLACK ROYAL</span>
                            <span className="font-base align-middle  text-[10px]  transition-all duration-300 ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light md:inline">ASIAN KITCHEN</span>
                        </span>
                    </Link>
                    <Group gap={0} className={classes.links} justify="flex-end" wrap="nowrap">
                        <ActionIcon size="lg" color="gray" variant="subtle">
                            <IconBrandTwitter style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon size="lg" color="gray" variant="subtle">
                            <IconBrandYoutube style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                        </ActionIcon>
                        <ActionIcon size="lg" color="gray" variant="subtle">
                            <IconBrandInstagram style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                        </ActionIcon>
                    </Group>
                </Container>
            </div>
            <div className="mt-auto p-6 text-center dark:text-white-dark ltr:sm:text-left rtl:sm:text-right">
                © {new Date().getFullYear()}
                <Link href={'https://hatss.eu/'} target="_blank">
                    . Made by HatSolutions.
                </Link>
            </div>
        </>
    );
};

export default Footer;
