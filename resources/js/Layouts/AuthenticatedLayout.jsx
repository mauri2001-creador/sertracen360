import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

const navigation = [
    { label: 'Inicio', routeName: 'dashboard' },
    { label: 'Vehículos', routeName: 'vehiculos.index' },
    { label: 'Licencias', routeName: 'licencias.index' },
    { label: 'Esquelas', routeName: 'esquelas.index' },
    { label: 'Traspasos', routeName: 'traspasos.index' },
];

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50">
            <nav className="sticky top-0 z-40 border-b border-blue-900/10 bg-white/95 shadow-sm backdrop-blur">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex min-h-20 items-center justify-between gap-4">
                        <div className="flex min-w-0 items-center gap-7">
                            <Link href={route('dashboard')} className="flex shrink-0 items-center rounded-xl bg-[#0757bd] px-3 py-2 transition hover:bg-[#06499e] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2">
                                <img
                                    src="/images/sertracen_vmt.svg"
                                    alt="VMT y SERTRACEN El Salvador"
                                    className="h-8 w-auto max-w-[190px] object-contain"
                                />
                            </Link>

                            <div className="hidden items-center gap-1 lg:flex">
                                {navigation.map((item) => (
                                    <NavLink
                                        key={item.routeName}
                                        href={route(item.routeName)}
                                        active={route().current(item.routeName)}
                                        className="rounded-lg border-b-0 px-3 py-2 text-sm"
                                    >
                                        {item.label}
                                    </NavLink>
                                ))}
                            </div>
                        </div>

                        <div className="hidden shrink-0 items-center sm:flex">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white py-1.5 pl-2 pr-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                                    >
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-800">
                                            {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                        </span>
                                        <span className="max-w-36 truncate">{user.name}</span>
                                        <svg className="h-4 w-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.09 1.04l-4.25 4.5a.75.75 0 0 1-1.09 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content contentClasses="py-1 bg-white">
                                    <div className="border-b border-slate-100 px-4 py-3">
                                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Sesión iniciada</p>
                                        <p className="mt-1 truncate text-sm font-semibold text-slate-800">{user.name}</p>
                                        <p className="truncate text-xs text-slate-500">{user.email}</p>
                                    </div>
                                    <Dropdown.Link href={route('profile.edit')}>
                                        Mi cuenta
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Cerrar sesión
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowingNavigationDropdown((current) => !current)}
                            aria-label={showingNavigationDropdown ? 'Cerrar menú' : 'Abrir menú'}
                            aria-expanded={showingNavigationDropdown}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-blue-50 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 lg:hidden"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                                {showingNavigationDropdown ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
                            </svg>
                        </button>
                    </div>
                </div>

                <div className={`border-t border-slate-100 bg-white lg:hidden ${showingNavigationDropdown ? 'block' : 'hidden'}`}>
                    <div className="mx-auto max-w-7xl space-y-1 px-4 py-3 sm:px-6">
                        {navigation.map((item) => (
                            <ResponsiveNavLink
                                key={item.routeName}
                                href={route(item.routeName)}
                                active={route().current(item.routeName)}
                                className="rounded-lg border-l-0 px-3 py-2"
                            >
                                {item.label}
                            </ResponsiveNavLink>
                        ))}
                    </div>
                    <div className="border-t border-slate-100 px-4 py-4 sm:px-6">
                        <p className="text-sm font-semibold text-slate-800">{user.name}</p>
                        <p className="mt-0.5 text-xs text-slate-500">{user.email}</p>
                        <div className="mt-3 flex flex-wrap gap-2">
                            <Link href={route('profile.edit')} className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-800 hover:bg-blue-100">
                                Mi cuenta
                            </Link>
                            <Link href={route('logout')} method="post" as="button" className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200">
                                Cerrar sesión
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="border-b border-slate-100 bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
