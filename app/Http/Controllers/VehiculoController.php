<?php

namespace App\\Http\\Controllers;

use Illuminate\\Support\\Facades\\DB;
use Inertia\\Inertia;

class VehiculoController extends Controller
{
    public function index()
    {
        $documento = auth()->user()->getKey();

        $vehiculos = DB::table('vehiculos')
            ->leftJoin('marcas', 'marcas.id_marca', '=', 'vehiculos.id_marca')
            ->where('vehiculos.documento_propietario', $documento)
            ->select([
                'vehiculos.placa',
                'vehiculos.modelo',
                'vehiculos.anio',
                'vehiculos.tipo_vehiculo',
                'vehiculos.estado',
                'marcas.nombre_marca as marca',
            ])
            ->orderBy('vehiculos.placa')
            ->get();

        return Inertia::render('Vehiculos/Index', [
            'vehiculos' => $vehiculos,
        ]);
    }
}