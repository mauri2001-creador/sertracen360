<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EsquelaController extends Controller
{
    public function index()
    {
        $documento = auth()->user()->getKey();

        $esquelas = DB::table('multas')
            ->join('vehiculos', 'vehiculos.placa', '=', 'multas.placa_vehiculo')
            ->where(function ($query) use ($documento) {
                $query->where('vehiculos.documento_propietario', $documento)
                    ->orWhere('multas.documento_infractor', $documento);
            })
            ->select([
                'multas.id_multa',
                'multas.placa_vehiculo',
                'multas.descripcion',
                'multas.monto',
                'multas.estado_pago',
                'multas.fecha_infraccion',
            ])
            ->distinct()
            ->orderByDesc('multas.fecha_infraccion')
            ->get();

        return Inertia::render('Esquelas/Index', [
            'esquelas' => $esquelas,
        ]);
    }
}