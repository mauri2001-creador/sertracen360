import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function Create({ marcas = [] }) {
    const { flash = {} } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        placa: '',
        documento_propietario: '',
        id_marca: '',
        modelo: '',
        anio: new Date().getFullYear(),
        tipo_vehiculo: 'Automóvil',
        estado: 'Activo',
    });

    const submit = (event) => {
        event.preventDefault();
        post(route('admin.vehiculos.store'), {
            onSuccess: () => reset('placa', 'documento_propietario', 'id_marca', 'modelo'),
        });
    };

    const fieldClass = 'mt-1 w-full rounded-xl border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500';
    const labelClass = 'block text-sm font-semibold text-slate-700';

    return (
        <AuthenticatedLayout header={<div><p className="text-sm font-medium text-blue-700">Panel administrativo</p><h1 className="text-2xl font-bold text-slate-900">Registrar vehículo</h1></div>}>
            <Head title="Registrar vehículo" />
            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <p className="mb-6 text-sm text-slate-500">Ingresá los datos del vehículo y el DUI/NIT del propietario. El sistema verificará que el propietario exista.</p>

                    {flash.success && <div className="mb-5 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-800">{flash.success}</div>}

                    <form onSubmit={submit} className="space-y-5">
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label className={labelClass}>Número de placa</label>
                                <input className={fieldClass} value={data.placa} onChange={e => setData('placa', e.target.value.toUpperCase())} placeholder="Ej. P123-456" required />
                                {errors.placa && <p className="mt-1 text-sm text-red-600">{errors.placa}</p>}
                            </div>
                            <div>
                                <label className={labelClass}>DUI o NIT del propietario</label>
                                <input className={fieldClass} value={data.documento_propietario} onChange={e => setData('documento_propietario', e.target.value)} placeholder="Documento registrado en el sistema" required />
                                {errors.documento_propietario && <p className="mt-1 text-sm text-red-600">{errors.documento_propietario}</p>}
                            </div>
                            <div>
                                <label className={labelClass}>Marca</label>
                                <select className={fieldClass} value={data.id_marca} onChange={e => setData('id_marca', e.target.value)} required>
                                    <option value="">Seleccioná una marca</option>
                                    {marcas.map(marca => <option key={marca.id_marca} value={marca.id_marca}>{marca.nombre_marca}</option>)}
                                </select>
                                {errors.id_marca && <p className="mt-1 text-sm text-red-600">{errors.id_marca}</p>}
                            </div>
                            <div>
                                <label className={labelClass}>Modelo</label>
                                <input className={fieldClass} value={data.modelo} onChange={e => setData('modelo', e.target.value)} placeholder="Ej. Corolla" required />
                                {errors.modelo && <p className="mt-1 text-sm text-red-600">{errors.modelo}</p>}
                            </div>
                            <div>
                                <label className={labelClass}>Año</label>
                                <input type="number" min="1900" max={new Date().getFullYear() + 1} className={fieldClass} value={data.anio} onChange={e => setData('anio', e.target.value)} required />
                                {errors.anio && <p className="mt-1 text-sm text-red-600">{errors.anio}</p>}
                            </div>
                            <div>
                                <label className={labelClass}>Tipo de vehículo</label>
                                <select className={fieldClass} value={data.tipo_vehiculo} onChange={e => setData('tipo_vehiculo', e.target.value)} required>
                                    <option>Automóvil</option><option>Motocicleta</option><option>Camioneta</option><option>Camión</option><option>Microbús</option><option>Autobús</option><option>Otro</option>
                                </select>
                            </div>
                            <div>
                                <label className={labelClass}>Estado</label>
                                <select className={fieldClass} value={data.estado} onChange={e => setData('estado', e.target.value)} required>
                                    <option value="Activo">Activo</option><option value="Inactivo">Inactivo</option>
                                </select>
                            </div>
                        </div>

                        <div className="rounded-xl bg-blue-50 p-4 text-sm leading-6 text-blue-800">El vehículo quedará asociado al DUI/NIT indicado. El ciudadano podrá verlo al ingresar a su cuenta.</div>
                        <div className="flex justify-end">
                            <button disabled={processing || marcas.length === 0} className="rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50">
                                {processing ? 'Guardando...' : 'Registrar vehículo'}
                            </button>
                        </div>
                        {marcas.length === 0 && <p className="text-sm text-amber-700">No hay marcas registradas. Agregá marcas al catálogo antes de registrar vehículos.</p>}
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
