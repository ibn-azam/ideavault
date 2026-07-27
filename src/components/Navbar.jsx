'use client';

import {
    Avatar,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from '@heroui/react';
import {
    Lightbulb,
    LogOut,
    Menu,
    Settings,
    Sparkles,
    X,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Ideas', href: '/ideas' },
    { label: 'Add Idea', href: '/add-idea', private: true },
    { label: 'My Ideas', href: '/my-ideas', private: true },
    { label: 'My Interactions', href: '/my-interactions', private: true },
];

const Navbar = () => {
    const pathname = usePathname();
    const isLoggedIn = false; // wire up to real auth state
    const [menuOpen, setMenuOpen] = useState(false);

    // close mobile menu whenever the route changes
    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    return (
        <header className='sticky top-0 z-50 border-b border-black/10 bg-white/80 backdrop-blur-md'>
            <nav className='container mx-auto flex items-center justify-between p-4 lg:px-6'>
                <Link href='/' className='flex items-center gap-2'>
                    <span className='flex h-8 w-8 items-center justify-center rounded-lg bg-[#4F46E5] text-white'>
                        <Lightbulb size={18} strokeWidth={2.2} />
                    </span>
                    <span className='text-xl font-bold tracking-tight text-gray-900'>
                        IdeaVault
                    </span>
                </Link>

                {/* desktop links */}
                <ul className='hidden items-center gap-1 lg:flex'>
                    {navLinks.map((link) => {
                        const active = pathname === link.href;
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                                        active
                                            ? 'bg-[#EEF2FF] text-[#4F46E5]'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* desktop auth area */}
                <div className='hidden items-center gap-2 lg:flex'>
                    {isLoggedIn ? (
                        <ProfileDropdown />
                    ) : (
                        <>
                            <Button
                                as={Link}
                                href='/login'
                                variant='light'
                                className='font-medium text-gray-700'
                            >
                                Login
                            </Button>
                            <Button
                                as={Link}
                                href='/register'
                                className='bg-[#4F46E5] font-medium text-white'
                            >
                                Register
                            </Button>
                        </>
                    )}
                </div>

                {/* mobile/tablet right side: avatar (if logged in) + hamburger */}
                <div className='flex items-center gap-2 lg:hidden'>
                    {isLoggedIn && (
                        <Avatar
                            size='sm'
                            name='Maya Rodriguez'
                            className='bg-[#EEF2FF] text-[#4F46E5]'
                        />
                    )}
                    <button
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                        className='flex h-9 w-9 items-center justify-center rounded-md text-gray-700 transition-colors hover:bg-gray-100'
                    >
                        {menuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </nav>

            {/* mobile/tablet dropdown panel */}
            <div
                className={`overflow-hidden transition-[max-height] duration-300 ease-in-out lg:hidden ${
                    menuOpen ? 'max-h-[28rem]' : 'max-h-0'
                }`}
            >
                <div className='container mx-auto flex flex-col gap-1 border-t border-black/10 bg-white px-4 py-3'>
                    {navLinks.map((link) => {
                        const active = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`rounded-md px-3 py-2.5 text-base font-medium transition-colors ${
                                    active
                                        ? 'bg-[#EEF2FF] text-[#4F46E5]'
                                        : 'text-gray-700 hover:bg-gray-100'
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}

                    <div className='mt-2 flex flex-col gap-2 border-t border-black/10 pt-3'>
                        {isLoggedIn ? (
                            <>
                                <Link
                                    href='/profile'
                                    className='flex items-center gap-2 rounded-md px-3 py-2.5 text-base font-medium text-gray-700 hover:bg-gray-100'
                                >
                                    <Settings size={18} />
                                    Profile Management
                                </Link>
                                <button className='flex items-center gap-2 rounded-md px-3 py-2.5 text-left text-base font-medium text-red-600 hover:bg-red-50'>
                                    <LogOut size={18} />
                                    Log Out
                                </button>
                            </>
                        ) : (
                            <>
                                <Button
                                    as={Link}
                                    href='/login'
                                    variant='light'
                                    className='w-full font-medium text-gray-700'
                                >
                                    Login
                                </Button>
                                <Button
                                    as={Link}
                                    href='/register'
                                    className='w-full bg-[#4F46E5] font-medium text-white'
                                >
                                    Register
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

const ProfileDropdown = () => (
    <Dropdown placement='bottom-end'>
        <DropdownTrigger>
            <button className='flex items-center gap-2 rounded-full border border-gray-200 py-1 pl-1 pr-3 transition-colors hover:bg-gray-50'>
                <Avatar
                    size='sm'
                    name='Maya Rodriguez'
                    className='bg-[#EEF2FF] text-[#4F46E5]'
                />
                <span className='text-sm font-medium text-gray-800'>Maya</span>
            </button>
        </DropdownTrigger>
        <DropdownMenu aria-label='Profile actions'>
            <DropdownItem
                key='profile'
                startContent={<Settings size={16} />}
                href='/profile'
            >
                Profile Management
            </DropdownItem>
            <DropdownItem
                key='my-ideas'
                startContent={<Sparkles size={16} />}
                href='/my-ideas'
            >
                My Ideas
            </DropdownItem>
            <DropdownItem
                key='logout'
                startContent={<LogOut size={16} />}
                className='text-danger'
                color='danger'
            >
                Log Out
            </DropdownItem>
        </DropdownMenu>
    </Dropdown>
);

export default Navbar;