<?php

namespace App\\Http\\Controllers\\Admin;

use App\\Http\\Controllers\\Controller;
use Illuminate\\Http\\RedirectResponse;
use Illuminate\\Http\\Request;
use Illuminate\\Support\\Facades\\DB;
use Illuminate\\Validation\\Rule;
use Inertia\\Inertia;
use Inertia\\Response;

class VehiculoController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Admin/Vehiculos/Create', [
            'marcas' => DB::table('marcas')->orderBy('nombre_marca')->get(['id_marca', 'nombre_marca']),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'placa' => ['required', 'string', 'max:255', 'unique:vehiculos,placa'],
            'documento_propietario' => ['required', 'string', 'exists:users,documento_identidad'],
            'id_marca' => ['required', 'integer', Rule::exists('marcas', 'id_marca')],
            'modelo' => ['required', 'string', 'max:255'],
            'anio' => ['required', 'integer', 'min:1900', 'max:'.(now()->year + 1)],
            'tipo_vehiculo' => ['required', 'string', 'max:100'],
            'estado' => ['required', Rule::in(['Activo', 'Inactivo'])],
        ], [
            'placa.unique' => 'Ya existe un vehículo registrado con esa placa.',
            'documento_propietario.exists' => 'No existe un usuario con ese DUI o NIT.',
            'id_marca.exists' => 'Seleccioná una marca válida.',
        ]);

        DB::table('vehiculos')->insert([
            ...$validated,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->route('admin.vehiculos.create')
            ->with('success', 'El vehículo fue registrado correctamente.');
    }
}
