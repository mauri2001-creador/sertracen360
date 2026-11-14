import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

const money = (amount) => new Intl.NumberFormat('es-SV', { style: 'currency', currency: 'USD' }).format(Number(amount || 0));
const date = (value) => value ? new Intl.DateTimeFormat('es-SV', { dateStyle: 'medium' }).format(new Date(`${value}T00:00:00`)) : 'Sin fecha';

export default function Index({ esquelas = [] }) {
    const pendientes = esquelas.filter((item) => String(item.estado_pago).toLowerCase() === 'pendiente').length;
    const totalPendiente = esquelas.filter((item) => String(item.estado_pago).toLowerCase() === 'pendiente').reduce((total, item) => total + Number(item.monto || 0), 0);

    return (
        <AuthenticatedLayout
            header={<div><p className="text-sm font-medium text-blue-700">Portal ciudadano</p><h1 className="mt-1 text-2xl font-bold text-slate-900">Mis esquelas</h1></div>}
        >
            <Head title="Mis esquelas" />
            <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
                <section className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl bg-gradient-to-br from-[#073b91] to-[#1684df] p-6 text-white shadow-sm">
                        <p className="text-sm font-medium text-blue-100">Esquelas encontradas</p>
                        <p className="mt-2 text-3xl font-extrabold">{esquelas.length}</p>
                        <p className="mt-1 text-xs text-blue-100">Asociadas a tus vehículos o documento</p>
                    </div>
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
                        <p className="text-sm font-semibold text-amber-800">Monto pendiente registrado</p>
                        <p className="mt-2 text-3xl font-extrabold text-slate-900">{money(totalPendiente)}</p>
                        <p className="mt-1 text-xs text-amber-800">{pendientes} {pendientes === 1 ? 'esquela pendiente' : 'esquelas pendientes'}</p>
                    </div>
                </section>

                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
                        <h2 className="font-bold text-slate-900">Historial de esquelas</h2>
                        <p className="mt-1 text-sm text-slate-500">Consulta las infracciones registradas para ti o tus vehículos.</p>
                    </div>
                    {esquelas.length > 0 ? (
                        <>
                            <div className="hidden overflow-x-auto md:block">
                                <table className="min-w-full divide-y divide-slate-100 text-left text-sm">
                                    <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                                        <tr><th className="px-6 py-3 font-semibold">N.º</th><th className="px-6 py-3 font-semibold">Placa</th><th className="px-6 py-3 font-semibold">Descripción</th><th className="px-6 py-3 font-semibold">Fecha</th><th className="px-6 py-3 font-semibold">Monto</th><th className="px-6 py-3 font-semibold">Estado</th></tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {esquelas.map((item) => (
                                            <tr key={item.id_multa} className="hover:bg-slate-50">
                                                <td className="px-6 py-4 font-semibold text-slate-700">#{item.id_multa}</td>
                                                <td className="whitespace-nowrap px-6 py-4 font-bold text-slate-900">{item.placa_vehiculo}</td>
                                                <td className="max-w-xs px-6 py-4 text-slate-600">{item.descripcion}</td>
                                                <td className="whitespace-nowrap px-6 py-4 text-slate-600">{date(item.fecha_infraccion)}</td>
                                                <td className="whitespace-nowrap px-6 py-4 font-semibold text-slate-800">{money(item.monto)}</td>
                                                <td className="px-6 py-4"><span className={`rounded-full px-3 py-1 text-xs font-semibold ${String(item.estado_pago).toLowerCase() === 'pendiente' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>{item.estado_pago}</span></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="divide-y divide-slate-100 md:hidden">
                                {esquelas.map((item) => (
                                    <article key={item.id_multa} className="space-y-3 p-5">
                                        <div className="flex items-center justify-between gap-3"><span className="font-bold text-slate-900">{item.placa_vehiculo}</span><span className={`rounded-full px-3 py-1 text-xs font-semibold ${String(item.estado_pago).toLowerCase() === 'pendiente' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>{item.estado_pago}</span></div>
                                        <p className="text-sm text-slate-600">{item.descripcion}</p>
                                        <div className="flex items-center justify-between text-sm"><span className="text-slate-500">{date(item.fecha_infraccion)}</span><strong className="text-slate-900">{money(item.monto)}</strong></div>
                                    </article>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="px-6 py-14 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700"><svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="m5 12 4 4L19 6" /></svg></div>
                            <h3 className="mt-4 font-bold text-slate-900">No se encontraron esquelas</h3>
                            <p className="mt-1 text-sm text-slate-500">No hay infracciones asociadas a tu documento o a tus vehículos en este momento.</p>
                        </div>
                    )}
                </section>
                <p className="text-xs leading-5 text-slate-400">La información mostrada corresponde a los registros disponibles en el sistema y no constituye un comprobante de pago.</p>
            </div>
        </AuthenticatedLayout>
    );
}