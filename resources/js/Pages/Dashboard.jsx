import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

function Icon({ children, className = 'h-6 w-6' }) {
    return (
        <svg
            aria-hidden="true"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
        >
            {children}
        </svg>
    );
}

const services = [
    {
        title: 'Mis vehículos',
        description: 'Consulta la información de tus vehículos registrados.',
        href: 'vehiculos.index',
        icon: <><path d="M5 16v-3l1.5-5h11L19 13v3" /><path d="M4 16h16M7 16v2m10-2v2M7 12h.01M17 12h.01" /></>,
        tone: 'blue',
    },
    {
        title: 'Mis licencias',
        description: 'Revisa el estado de tu licencia y su vigencia.',
        href: 'licencias.index',
        icon: <><rect x="5" y="3.5" width="14" height="17" rx="2" /><path d="M9 8h6M9 12h6M9 16h3" /></>,
        tone: 'emerald',
    },
    {
        title: 'Mis esquelas',
        description: 'Consulta las esquelas asociadas a tus vehículos.',
        href: 'esquelas.index',
        icon: <><path d="M6 4h12v16l-6-3-6 3V4Z" /><path d="M9 8h6M9 11h6M9 14h4" /></>,
        tone: 'amber',
    },
    {
        title: 'Traspasos',
        description: 'Accede al módulo de gestión de traspasos.',
        href: 'traspasos.index',
        icon: <><path d="M7 7h13l-3-3M20 7l-3 3M17 17H4l3 3M4 17l3-3" /></>,
        tone: 'violet',
    },
];

const toneClasses = {
    blue: 'bg-blue-50 text-blue-700 group-hover:bg-blue-100',
    emerald: 'bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100',
    amber: 'bg-amber-50 text-amber-700 group-hover:bg-amber-100',
    violet: 'bg-violet-50 text-violet-700 group-hover:bg-violet-100',
};

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <div>
                    <p className="text-sm font-medium text-blue-700">Portal ciudadano</p>
                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                        Mi espacio SERTRACEN
                    </h1>
                </div>
            }
        >
            <Head title="Mi espacio | SERTRACEN" />

            <div className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
                <section className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-[#073b91] via-[#0757bd] to-[#1684df] px-6 py-8 text-white shadow-lg sm:px-10 sm:py-10">
                    <div className="absolute -right-12 -top-20 -z-10 h-64 w-64 rounded-full border-[36px] border-white/10" />
                    <div className="absolute -bottom-28 right-40 -z-10 h-64 w-64 rounded-full bg-white/5" />
                    <div className="max-w-2xl">
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-50">
                            <span className="h-2 w-2 rounded-full bg-emerald-300" />
                            Servicios en línea
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                            Todo sobre tus trámites, en un solo lugar.
                        </h2>
                        <p className="mt-4 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
                            Consulta la información de tus vehículos, licencias y esquelas desde tu espacio ciudadano.
                        </p>
                    </div>
                    <div className="mt-7 flex flex-wrap gap-3">
                        <Link
                            href={route('vehiculos.index')}
                            className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-bold text-blue-800 shadow-sm transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700"
                        >
                            Consultar mis vehículos
                        </Link>
                        <Link
                            href={route('licencias.index')}
                            className="inline-flex items-center justify-center rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
                        >
                            Ver mis licencias
                        </Link>
                    </div>
                </section>

                <section aria-labelledby="services-heading">
                    <div className="flex flex-wrap items-end justify-between gap-3">
                        <div>
                            <p className="text-sm font-semibold text-blue-700">Accesos directos</p>
                            <h2 id="services-heading" className="mt-1 text-xl font-bold text-slate-900">
                                Tus servicios
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Selecciona el módulo que deseas consultar.
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {services.map((service) => (
                            <Link
                                key={service.title}
                                href={route(service.href)}
                                className="group flex min-h-52 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                            >
                                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl transition ${toneClasses[service.tone]}`}>
                                    <Icon>{service.icon}</Icon>
                                </span>
                                <h3 className="mt-5 text-base font-bold text-slate-900">
                                    {service.title}
                                </h3>
                                <p className="mt-2 flex-1 text-sm leading-6 text-slate-500">
                                    {service.description}
                                </p>
                                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-700">
                                    Abrir módulo
                                    <Icon className="h-4 w-4 transition group-hover:translate-x-1">
                                        <path d="M5 12h14M13 6l6 6-6 6" />
                                    </Icon>
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="rounded-2xl border border-blue-100 bg-blue-50/70 px-5 py-4 sm:flex sm:items-center sm:justify-between sm:gap-6">
                    <div>
                        <h2 className="font-bold text-slate-900">Mantén tus datos actualizados</h2>
                        <p className="mt-1 text-sm leading-6 text-slate-600">
                            Verifica que la información de tu cuenta esté correcta para facilitar tus gestiones.
                        </p>
                    </div>
                    <Link
                        href={route('profile.edit')}
                        className="mt-4 inline-flex shrink-0 items-center justify-center rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-800 transition hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-600 sm:mt-0"
                    >
                        Revisar mi cuenta
                    </Link>
                </section>

                <footer className="border-t border-slate-200 pt-5 text-center text-xs text-slate-400">
                    SERTRACEN El Salvador · Portal de servicios ciudadanos
                </footer>
            </div>
        </AuthenticatedLayout>
    );
}
