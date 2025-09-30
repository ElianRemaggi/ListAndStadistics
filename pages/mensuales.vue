<script setup lang="ts">
import { ref } from 'vue'
import getPacientesMensuales from '~/composables/getPacientesMensuales'

const blockerRender = ref<boolean>(false);

const now = new Date()
const pad = (n: number) => n.toString().padStart(2, '0')
const defaultMonth = `${now.getFullYear()}-${pad(now.getMonth() + 1)}`
const mesD = ref<string>(defaultMonth)
const mesH = ref<string>(defaultMonth)
const rango = ref<boolean>(false)
const dataError = ref<string>('')

const resultados = ref<ResultadoPeriodo[] | undefined>(undefined);

const buscar = async () => {

    resultados.value = undefined;

    dataError.value = "";

    if (!rango.value) mesH.value = mesD.value

    if (new Date(mesD.value) > new Date()) {
        dataError.value = 'La fecha no puede ser mayor a la fecha actual'
        return
    }

    if (new Date(mesD.value) > new Date(mesH.value)) {
        dataError.value = 'La fecha de inicio no puede ser mayor a la fecha final'
        return
    }

    // Convierte "YYYY-MM" a índice de mes absoluto (año*12 + mes-1)
    const toMonthIndex = (ym: string) => {
        const [y, m] = ym.split('-').map(Number)
        if (!y || !m) return NaN
        return y * 12 + (m - 1)
    }

    if (!rango.value) mesH.value = mesD.value

    const startIdx = toMonthIndex(mesD.value)
    const endIdx = toMonthIndex(mesH.value)
    const diffMonths = endIdx - startIdx
    if (diffMonths > 12) {
        dataError.value = 'El rango no puede superar 12 meses'
        return
    }

    try {
        blockerRender.value = true;
        resultados.value = (await getPacientesMensuales(mesD.value, mesH.value))

    } catch (error) {
        blockerRender.value = false;
    } finally {
        blockerRender.value = false;
    }

}
</script>

<template>
    <div class="max-w-md w-full rounded-2xl border border-gray-200 bg-gray-50 p-6 shadow-sm m-auto mt-15">
        <p class="text-center mb-2  block text-xl font-medium text-gray-700">Pacientes Mensuales</p>
        <label for="month" class="mb-2 block text-sm font-medium text-gray-700">
            Seleccionar mes
        </label>

        <div class="flex gap-2">
            <div class="relative flex-1">

                <p v-show="rango" class="ml-5">Desde</p>
                <input id="month" v-model="mesD" type="month" class="w-full rounded-xl border border-gray-300 bg-white pl-10 pr-3 py-2.5 text-gray-700 placeholder-gray-400
                    outline-none transition
                    focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40
                    hover:border-gray-400" :max="defaultMonth" @keydown.enter="buscar()" />

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
                    <input id="month" v-model="mesH" type="month" class="w-full rounded-xl border border-gray-300 bg-white pl-10 pr-3 py-2.5 text-gray-700 placeholder-gray-400
                        utline-none transition
                        focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40
                        hover:border-gray-400" :max="defaultMonth" @keydown.enter="buscar()" />
                </div>
            </div>

            <button type="button" @click="buscar()"
                class="rounded-xl bg-indigo-400 text-white px-4 py-2.5 font-medium hover:bg-indigo-600 transition">
                Buscar
            </button>

            <p v-if="dataError" class="mt-2 text-sm text-red-60 hover:text-red-800">{{ dataError }}</p>
        </div>
    </div>

    <div class="block justify-center">
        <!-- <div class="flex md:flex-row  justify-center ">
            <Resultados v-if="resultados" :resultados="resultados" class="flex-1 m-auto h-fit mt-auto mx-auto p-20" />            
            <pieChartTotal :data="resultadosTotales" :titulo="'Pacientes por sede'" class="mr-auto" />
        </div>
        -->

        <TablaComparativa v-if="resultados" :data="resultados" class="m-auto h-fit mt-auto mx-auto px-20" />
        <LineChart v-if="resultados?.[1] !== undefined" :data="resultados"
            class="m-auto h-fit mt-auto mx-auto p-20 w-fit" />

    </div>

    <blocker :blockerRender="blockerRender" />

</template>