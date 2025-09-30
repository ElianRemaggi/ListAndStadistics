<script setup lang="ts">
import { ref } from 'vue'
import LineChart from '~/components/LineChart.vue';
import TablaComparativa from '~/components/tablaComparativa.vue';

import getPacientesDiarios from '~/composables/getPacientesDiarios'

export type SedeTotal = { sede: string; total: number }

const dataError = ref<string>('')
const blockerRender = ref<boolean>(false)

const today = new Date()
const pad = (n: number) => n.toString().padStart(2, '0')
const defaultDay = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`

const fechaD = ref<string>(defaultDay);
const fechaH = ref<string>(defaultDay);
const rango = ref<boolean>(false);


const backResponse = ref<backResponse | null>(null);
const resultados = ref<ResultadoPeriodo[] | undefined>(undefined)
const resultadosOs = ref<ResultadoCobertura[] | undefined>(undefined)


const buscar = async () => {

    resultados.value = undefined;

    dataError.value = "";

    if (!rango.value) fechaH.value = fechaD.value

    // Fechas válidas
    const start = new Date(fechaD.value)
    const end = new Date(fechaH.value)
    if (isNaN(+start) || isNaN(+end)) {
        dataError.value = 'Fecha inválida'
        return
    }

    // No futuro
    if (start > new Date() || end > new Date()) {
        dataError.value = 'La fecha no puede ser mayor a la fecha actual'
        return
    }

    // Inicio <= fin
    if (start > end) {
        dataError.value = 'La fecha de inicio no puede ser mayor a la fecha final'
        return
    }

    // Diferencia máxima 62 días
    start.setHours(0, 0, 0, 0)
    end.setHours(0, 0, 0, 0)
    const MS_PER_DAY = 24 * 60 * 60 * 1000
    const diffDays = Math.round((end.getTime() - start.getTime()) / MS_PER_DAY)

    if (diffDays > 62) {
        dataError.value = 'El rango no puede superar 62 días'
        return
    }

    try {

        blockerRender.value = true

        backResponse.value = await getPacientesDiarios(fechaD.value, fechaH.value)
        console.log(backResponse.value)
        resultados.value = backResponse.value.data
        resultadosOs.value = backResponse.value.dataOS


    } catch (error) {
        console.error(error)
    } finally {
        blockerRender.value = false
    }
}

</script>

<template>

    <div class="max-w-md w-full rounded-2xl border border-gray-400 bg-gray-100 p-5 shadow-sm m-auto mt-5">
        <p class="text-center mb-2 block text-xl font-medium text-gray-800">Pacientes Diarios</p>
        <label for="day" class="mb-2 block text-sm font-medium text-gray-800">
            Seleccionar día
        </label>

        <div class="flex gap-2">
            <div class="relative flex-1">

                <p v-show="rango" class="ml-5">Desde</p>
                <input id="day" v-model="fechaD" type="date" class="w-full mb-2 rounded-xl border border-gray-400 bg-white pl-10 pr-3 py-2.5 text-gray-700 placeholder-gray-400
                    outline-none transition
                    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40
                    hover:border-gray-400 " :max="defaultDay" @keydown.enter="buscar()" />

                <div class="mt-2 flex">
                    <b class="ml-2">Rango: </b>
                    <label class="inline-flex items-center cursor-pointer  ml-2">
                        <input type="checkbox" v-model="rango" value="" class="sr-only peer">
                        <div
                            class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600">
                        </div>
                    </label>
                </div>

                <div v-if="rango">
                    <p class="ml-5">Hasta</p>
                    <input id="day" v-model="fechaH" type="date" class="w-full mt-2 rounded-xl border border-gray-400 bg-white pl-10 pr-3 py-2.5 text-gray-700 placeholder-gray-400
                    outline-none transition
                    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40
                    hover:border-gray-400 " :max="defaultDay" @keydown.enter="buscar()" />
                </div>


            </div>

            <button type="button" @click="buscar()"
                class="rounded-xl bg-indigo-400 text-white px-4 py-2.5 font-medium hover:bg-indigo-600 transition">
                Buscar
            </button>
        </div>

        <p v-if="dataError" class="mt-2 text-sm text-red-60 hover:text-red-800">{{ dataError }}</p>
    </div>

    <div class="block justify-center">
        <!-- Deprecado por cambi de modelo de datos 
        <Resultados v-if="resultados" :resultados="resultados" class="flex-1 m-auto h-fit mt-auto mx-auto p-20" />
        <pieChartTotal :data="resultadosTotales" class="mr-auto dx.softblue.css" />
        
        -->
        <TablaComparativa v-if="resultados" :data="resultados" class="m-auto h-fit mt-auto mx-auto px-20" />
        <LineChart v-if="resultados?.[1] !== undefined" :data="resultados" class="m-auto h-fit mx-auto px-20" />
        <TablaCoberturas v-if="resultadosOs" :items="resultadosOs" />
    </div>


    <blocker :blockerRender="blockerRender" />

</template>
