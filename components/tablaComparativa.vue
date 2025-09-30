<script setup lang="ts">
import { formatYearMonth } from '@/composables/formatYearMonth';
import { computed } from 'vue';

const props = withDefaults(defineProps<{ data?: ResultadoPeriodo[] | null }>(), {
    data: () => []
})


interface backResponse {
    data: ResultadoPeriodo[];
    message: string;
    status: number;
}

const totalCentral = computed(() => {
    if (!props.data) return 0;
    return props.data.reduce((sum, record) => sum + (record.pacientesCentral || 0), 0);
})

const totalGascon = computed(() => {
    if (!props.data) return 0;
    return props.data.reduce((sum, record) => sum + (record.pacientesGascon || 0), 0);
});
</script>

<template>
    <div>
        <div class="w-fit max-w-3/4 m-auto mt-10 overflow-x-auto">
            <div class="min-w-[900px] w-fit rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div class="sticky left-0 px-4 py-3">
                    <h2 class="text-lg font-semibold text-gray-800">Pacientes por sede</h2>
                </div>

                <table class="w-full border-t border-gray-200 text-sm tabular-nums">
                    <thead class="bg-gray-50 text-gray-600">
                        <tr>
                            <th class="sticky left-0 bg-gray-50 px-4 py-3 text-left font-medium">Fecha</th>

                            <th v-for="value in props.data" class="px-3 py-3 font-medium min-w-20">
                                <div v-if="value.mesanio">
                                    {{ formatYearMonth(value.mesanio) }}
                                </div>
                                <div v-else-if="value.fechaing" class="flex text-center justify-center">
                                    {{ value.fechaing.split('-')[2] }}/{{ value.fechaing.split('-')[1] }}
                                </div>
                            </th>
                            <th class="px-4 py-3 text-right font-semibold">Total</th>
                        </tr>
                    </thead>

                    <tbody class="divide-y divide-gray-100 text-gray-800">
                        <tr class="hover:bg-gray-50">
                            <th class="sticky left-0 bg-white px-4 py-3 text-left font-medium">Central</th>
                            <td v-for="value in props.data" class="px-3 py-3 text-center">{{ value.pacientesCentral }}
                            </td>

                            <td class="px-4 py-3 text-right font-semibold">{{ totalCentral }}</td>
                        </tr>

                        <tr class="hover:bg-gray-50">
                            <th class="sticky left-0 bg-white px-4 py-3 text-left font-medium">Gascon</th>
                            <td v-for="value in props.data" class="px-3 py-3 text-center">{{ value.pacientesGascon }}
                            </td>

                            <td class="px-4 py-3 text-right font-semibold">{{ totalGascon }}</td>
                        </tr>
                    </tbody>

                    <tfoot class="bg-gray-50 text-gray-900">
                        <tr>
                            <th class="sticky left-0 bg-gray-50 px-4 py-3 text-left font-semibold">Total</th>
                            <td v-for="value in props.data" class="px-3 py-3 text-center"> {{ value.pacientesCentral +
                                value.pacientesGascon }} </td>
                            <td class="px-4 py-3 text-right font-bold">{{ totalCentral + totalGascon }}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
</template>


<style scoped></style>