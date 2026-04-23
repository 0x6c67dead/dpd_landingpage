"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const NAV_LINKS = [
    {
        label: "Home",
        href: "#",
    },
    {
        label: "Sobre",
        href: "#Sobre",
    },
    {
        label: "Turmas",
        href: "#Turmas",
    },
    {
        label: "Eventos",
        href: "#Eventos",
    },
    {
        label: "Contato",
        href: "#Contato",
    },
];

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="fixed top-0 w-full z-50 flex flex-col bg-background/80 backdrop-blur-md border-b border-tertiary-dark/20">
            {/* Top bar */}
            <div className="flex flex-row justify-between items-center px-6 md:px-12 lg:px-24 py-4">
                <Link href="#" className="flex-shrink-0">
                    <Image src="/logo.png" alt="Logo" width={80} height={80} className="transition-transform hover:scale-105 duration-300 w-14 h-14 md:w-20 md:h-20" />
                </Link>

                {/* Desktop nav */}
                <nav className="hidden md:block">
                    <ul className="flex flex-row gap-6 lg:gap-10 items-center justify-end">
                        {NAV_LINKS.map((link) => (
                            <li key={link.label}
                                className="
                                    relative
                                    text-tertiary-light text-sm lg:text-base font-medium tracking-wider uppercase hover:text-primary transition-all duration-300 
                                    after:content-[''] 
                                    after:absolute 
                                    after:-bottom-2 
                                    after:left-0 
                                    after:w-full 
                                    after:h-0.5 
                                    after:bg-primary
                                    after:scale-x-0 
                                    hover:after:scale-x-100 
                                    after:transition-transform 
                                    after:duration-300">
                                <Link href={link.href}>{link.label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Mobile hamburger */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 relative z-50"
                    aria-label="Menu"
                >
                    <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-6 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </button>
            </div>

            {/* Mobile nav overlay */}
            <div className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
                <nav className="px-6 pb-6 pt-2">
                    <ul className="flex flex-col gap-4">
                        {NAV_LINKS.map((link) => (
                            <li key={link.label}>
                                <Link
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="block text-tertiary-light text-lg font-medium tracking-wider uppercase hover:text-primary transition-colors duration-300 py-2 border-b border-tertiary-dark/10"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}