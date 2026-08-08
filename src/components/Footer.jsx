import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import Link from 'next/link';
import React from 'react';
import { Lightbulb, Mail, MapPin, Phone } from "lucide-react";

const platformLinks = [
    { label: 'Ideas', href: '/ideas' },
    { label: 'Categories', href: '/categories' },
    { label: 'Add Idea', href: '/add-idea' },
    { label: 'My Ideas', href: '/my-ideas' },
    { label: 'My Interactions', href: '/my-interactions' },
];

const companyLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
];

const socialLinks = [
    { label: 'Twitter', href: 'https://twitter.com', icon: FaTwitter },
    { label: 'Facebook', href: 'https://facebook.com', icon: FaFacebook },
    { label: 'Instagram', href: 'https://instagram.com', icon: FaInstagram },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: FaLinkedin },
    { label: 'GitHub', href: 'https://github.com', icon: FaGithub },
];

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className='border-t border background'>
            <div className='container mx-auto px-4 py-10 lg:px-6 lg:py-14'>
                <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4'>
                    {/* brand + about */}
                    <div className='sm:col-span-2 lg:col-span-1'>
                        <Link href='/' className='flex items-center gap-2'>
                            <span className='flex h-8 w-8 items-center justify-center rounded-lg bg-[#4F46E5] text-white'>
                                <Lightbulb size={18} strokeWidth={2.2} />
                            </span>
                            <span className='text-xl font-bold tracking-tight text-title'>
                                IdeaVault
                            </span>
                        </Link>
                        <p className='mt-3 max-w-xs text-sm leading-relaxed text-gray-600'>
                            A place to share, discover, and grow ideas
                            together with a community that builds on what
                            you bring.
                        </p>

                        {/* socials */}
                        <div className='mt-5 flex items-center gap-2'>
                            {socialLinks.map(({ label, href, icon: Icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    aria-label={label}
                                    className='flex h-9 w-9 items-center justify-center rounded-md text-gray-600 transition-colors hover:bg-[#EEF2FF] hover:text-[#4F46E5]'
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* platform links */}
                    <div>
                        <h3 className='text-sm font-semibold text-title'>
                            Platform
                        </h3>
                        <ul className='mt-4 flex flex-col gap-3'>
                            {platformLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className='text-sm font-medium text-gray-600 transition-colors hover:text-[#4F46E5]'
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* company links */}
                    <div>
                        <h3 className='text-sm font-semibold text-title'>
                            Company
                        </h3>
                        <ul className='mt-4 flex flex-col gap-3'>
                            {companyLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className='text-sm font-medium text-gray-600 transition-colors hover:text-[#4F46E5]'
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* contact info */}
                    <div>
                        <h3 className='text-sm font-semibold text-title'>
                            Contact
                        </h3>
                        <ul className='mt-4 flex flex-col gap-3'>
                            <li>
                                <a
                                    href='mailto:hello@ideavault.com'
                                    className='flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-[#4F46E5]'
                                >
                                    <Mail size={16} className='shrink-0' />
                                    hello@ideavault.com
                                </a>
                            </li>
                            <li>
                                <a
                                    href='tel:+15551234567'
                                    className='flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-[#4F46E5]'
                                >
                                    <Phone size={16} className='shrink-0' />
                                    +1 (555) 123-4567
                                </a>
                            </li>
                            <li className='flex items-start gap-2 text-sm font-medium text-gray-600'>
                                <MapPin size={16} className='mt-0.5 shrink-0' />
                                <span>
                                    123 Innovation Street, San Francisco,
                                    CA 94103
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* bottom bar */}
                <div className='mt-10 flex flex-col-reverse items-center justify-between gap-4 border-t border-black/10 pt-6 sm:flex-row'>
                    <p className='text-sm text-gray-500'>
                        &copy; {year} IdeaVault. All rights reserved.
                    </p>
                    <div className='flex items-center gap-4'>
                        <Link
                            href='/privacy'
                            className='text-sm text-gray-500 transition-colors hover:text-[#4F46E5]'
                        >
                            Privacy
                        </Link>
                        <Link
                            href='/terms'
                            className='text-sm text-gray-500 transition-colors hover:text-[#4F46E5]'
                        >
                            Terms
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;