<script setup lang="ts">
import { type PropType } from 'vue'
import { DxChart, DxSeries } from 'devextreme-vue/chart'

const props = defineProps({
    data: { type: Array as PropType<resultadoCobertura[] | null | undefined>, default: () => [] },
    titulo: { type: String, default: '' }
})
//Este esta echo para sedes pero hay que cambiarlos por coberturas 
</script>


<template>
    <p>{{ props.data?.length }}</p>
    <div v-bind="$attrs" v-if="props.data">
        <h4 class="text-center mt-10 font-semibold">
            {{ titulo ? `Gráfico de ${titulo}` : 'Gráfico' }}
        </h4>
        <DxChart id="chart" :data-source="props.data">
            <DxSeries argument-field="cobertura" value-field="cantCentros" type="bar" color="#d1b6ff" />
        </DxChart>
    </div>
    <p v-else class="text-center text-sm text-gray-500 mt-4">Sin datos para mostrar.</p>
</template>

<style>
#chart {
    height: 440px;
}
</style>