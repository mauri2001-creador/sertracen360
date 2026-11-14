<?php

namespace Tests\\Feature;

use App\\Models\\User;
use Illuminate\\Foundation\\Testing\\RefreshDatabase;
use Illuminate\\Support\\Facades\\DB;
use Inertia\\Testing\\AssertableInertia as Assert;
use Tests\\TestCase;

class CitizenDataIsolationTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_cannot_access_vehicle_or_ticket_records(): void
    {
        $this->get(route('vehiculos.index'))->assertRedirect(route('login'));
        $this->get(route('esquelas.index'))->assertRedirect(route('login'));
    }

    public function test_citizen_only_receives_vehicles_registered_to_their_document(): void
    {
        $citizen = User::factory()->create(['documento_identidad' => 'DOC-OWNER-1']);
        $otherCitizen = User::factory()->create(['documento_identidad' => 'DOC-OWNER-2']);
        $brandId = DB::table('marcas')->insertGetId([
            'nombre_marca' => 'Marca de prueba',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('vehiculos')->insert([
            [
                'placa' => 'P111111',
                'documento_propietario' => $citizen->getKey(),
                'id_marca' => $brandId,
                'modelo' => 'Modelo propio',
                'anio' => 2022,
                'tipo_vehiculo' => 'Particular',
                'estado' => 'Activo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'placa' => 'P222222',
                'documento_propietario' => $otherCitizen->getKey(),
                'id_marca' => $brandId,
                'modelo' => 'Modelo ajeno',
                'anio' => 2023,
                'tipo_vehiculo' => 'Particular',
                'estado' => 'Activo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        $this->actingAs($citizen)
            ->get(route('vehiculos.index'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Vehiculos/Index')
                ->has('vehiculos', 1)
                ->where('vehiculos.0.placa', 'P111111')
            );
    }

    public function test_citizen_only_receives_tickets_related_to_their_vehicles_or_document(): void
    {
        $citizen = User::factory()->create(['documento_identidad' => 'DOC-TICKET-1']);
        $otherCitizen = User::factory()->create(['documento_identidad' => 'DOC-TICKET-2']);
        $brandId = DB::table('marcas')->insertGetId([
            'nombre_marca' => 'Marca de prueba',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('vehiculos')->insert([
            [
                'placa' => 'P333333',
                'documento_propietario' => $citizen->getKey(),
                'id_marca' => $brandId,
                'modelo' => 'Vehículo propio',
                'anio' => 2021,
                'tipo_vehiculo' => 'Particular',
                'estado' => 'Activo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'placa' => 'P444444',
                'documento_propietario' => $otherCitizen->getKey(),
                'id_marca' => $brandId,
                'modelo' => 'Vehículo ajeno',
                'anio' => 2020,
                'tipo_vehiculo' => 'Particular',
                'estado' => 'Activo',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        DB::table('multas')->insert([
            [
                'placa_vehiculo' => 'P333333',
                'documento_infractor' => null,
                'descripcion' => 'Esquela del vehículo propio',
                'monto' => 25.00,
                'estado_pago' => 'Pendiente',
                'fecha_infraccion' => '2026-10-01',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'placa_vehiculo' => 'P444444',
                'documento_infractor' => $citizen->getKey(),
                'descripcion' => 'Esquela asociada al documento',
                'monto' => 30.00,
                'estado_pago' => 'Pendiente',
                'fecha_infraccion' => '2026-10-02',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'placa_vehiculo' => 'P444444',
                'documento_infractor' => $otherCitizen->getKey(),
                'descripcion' => 'Esquela de otro ciudadano',
                'monto' => 40.00,
                'estado_pago' => 'Pendiente',
                'fecha_infraccion' => '2026-10-03',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        $this->actingAs($citizen)
            ->get(route('esquelas.index'))
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Esquelas/Index')
                ->has('esquelas', 2)
                ->where('esquelas.0.descripcion', 'Esquela asociada al documento')
                ->where('esquelas.1.descripcion', 'Esquela del vehículo propio')
            );
    }
}
