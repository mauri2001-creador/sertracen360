import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ vehiculos = [] }) {
    return (
        <AuthenticatedLayout
            header={<div><p className="text-sm font-medium text-blue-700">Portal ciudadano</p><h1 className="mt-1 text-2xl font-bold text-slate-900">Mis vehículos</h1></div>}
        >
            <Head title="Mis vehículos" />
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <section className="mb-6 rounded-2xl bg-gradient-to-r from-[#073b91] to-[#1684df] p-6 text-white shadow-sm">
                    <p className="text-sm font-medium text-blue-100">Tu información vehicular</p>
                    <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
                        <div><p className="text-3xl font-extrabold">{vehiculos.length}</p><p className="text-sm text-blue-100">Vehículos asociados a tu cuenta</p></div>
                        <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold">Consulta personal</span>
                    </div>
                </section>

                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
                        <h2 className="font-bold text-slate-900">Listado de vehículos</h2>
                        <p className="mt-1 text-sm text-slate-500">Solo se muestran vehículos registrados a tu nombre.</p>
                    </div>
                    {vehiculos.length > 0 ? (
                        <>
                            <div className="hidden overflow-x-auto md:block">
                                <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
                                    <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                        <tr><th className="px-6 py-3 font-semibold">Placa</th><th className="px-6 py-3 font-semibold">Marca / modelo</th><th className="px-6 py-3 font-semibold">Año</th><th className="px-6 py-3 font-semibold">Tipo</th><th className="px-6 py-3 font-semibold">Estado</th></tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {vehiculos.map((vehiculo) => (
                                            <tr key={vehiculo.placa} className="hover:bg-slate-50">
                                                <td className="whitespace-nowrap px-6 py-4 font-bold text-slate-900">{vehiculo.placa}</td>
                                                <td className="px-6 py-4 text-slate-700">{[vehiculo.marca, vehiculo.modelo].filter(Boolean).join(' ') || 'No especificado'}</td>
                                                <td className="px-6 py-4 text-slate-600">{vehiculo.anio}</td>
                                                <td className="px-6 py-4 text-slate-600">{vehiculo.tipo_vehiculo}</td>
                                                <td className="px-6 py-4"><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{vehiculo.estado || 'Sin estado'}</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="divide-y divide-slate-100 md:hidden">
                                {vehiculos.map((vehiculo) => (
                                    <article key={vehiculo.placa} className="space-y-2 p-5">
                                        <div className="flex items-center justify-between gap-3"><h3 className="font-bold text-slate-900">{vehiculo.placa}</h3><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">{vehiculo.estado || 'Sin estado'}</span></div>
                                        <p className="text-sm text-slate-700">{[vehiculo.marca, vehiculo.modelo].filter(Boolean).join(' ') || 'Marca/modelo no especificado'}</p>
                                        <p className="text-xs text-slate-500">{vehiculo.anio} · {vehiculo.tipo_vehiculo}</p>
                                    </article>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="px-6 py-14 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700"><svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M5 16v-3l1.5-5h11L19 13v3M4 16h16M7 16v2m10-2v2" /></svg></div>
                            <h3 className="mt-4 font-bold text-slate-900">No hay vehículos registrados</h3>
                            <p className="mt-1 text-sm text-slate-500">Cuando existan vehículos asociados a tu documento, aparecerán en este apartado.</p>
                        </div>
                    )}
                </section>
            </div>
        </AuthenticatedLayout>
    );
}