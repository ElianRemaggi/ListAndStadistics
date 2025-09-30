<script setup lang="ts">
import { ref, computed } from 'vue'

export type SedeTotal = { sede: string; total: number }
export type TotalesResponse = { data: SedeTotal[] }

const props = defineProps<{ resultados: SedeTotal[] }>()

const totalGeneral = computed(() =>
    props.resultados.reduce((acc, r) => acc + r.total, 0)
)

</script>

<template>

    <div class="max-w-2xl mt-6 h-fit my-auto">
        <div class="overflow-hidden rounded-2xl border border-gray-400 bg-white shadow-sm ">
            <table class="min-w-full text-sm text-center">
                <thead class="bg-gray-100 text-gray-700">
                    <tr>
                        <th class="px-4 py-3 text-center font-medium">Sede</th>
                        <th class="px-4 py-3 text-center font-medium">Total</th>
                    </tr>
            </thead>
                <tbody class="divide-y divide-gray-200">
                    <tr v-for="(row, i) in props.resultados" :key="i" class="hover:bg-gray-50">
                        <td class="px-4 py-3 text-gray-800">{{ row.sede }}</td>
                    <td class="px-4 py-3  tabular-nums text-gray-800">{{ row.total }}</td>
                    </tr>
                </tbody>
                <tfoot class="bg-gray-100">
                    <tr>
                        <td class="px-4 py-3 text-gray-800 font-medium">Total general</td>
                        <td class="px-4 py-3  font-semibold text-gray-900">{{ totalGeneral }}</td>
                    </tr>
                </tfoot>
            </table>
        </div>

        <p v-if="!props.resultados.length" class="text-center text-xs text-gray-500 mt-3">
            No hay resultados para el mes seleccionado.
        </p>
    </div>
</template>



<style scoped></style>