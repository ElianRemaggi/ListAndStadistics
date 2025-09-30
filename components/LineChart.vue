<script setup lang="ts">
import { computed, ref, type PropType } from 'vue';
import {
    DxChart, DxSeries, DxArgumentAxis, DxCommonSeriesSettings, DxExport,
    DxGrid, DxMargin, DxLegend, DxTitle, DxTooltip, DxSize, DxLabel,
    type DxChartTypes
} from 'devextreme-vue/chart';

const props = defineProps({
    data: { type: Array as PropType<any[] | null | undefined>, default: () => [] },
    titulo: { type: String, default: '' }
});

const sedes = [
    { name: 'Central', value: 'pacientesCentral' },
    { name: 'Gascon', value: 'pacientesGascon' }
] as const;

const types: DxChartTypes.SeriesType[] = ['line', 'stackedline', 'fullstackedline'];
const type = ref<DxChartTypes.SeriesType>('line');

type Punto = { year: string; pacientesCentral: number; pacientesGascon: number; };

const mapped = computed<Punto[]>(() => {
    if (!Array.isArray(props.data)) return [];
    return props.data
        .map((r: any) => {
            const year = r?.mesanio ?? r?.fechaing; // uno u otro
            if (!year) return null;
            return {
                year: String(year),
                pacientesCentral: Number(r?.pacientesCentral) || 0,
                pacientesGascon: Number(r?.pacientesGascon) || 0
            } as Punto;
        })
        .filter(Boolean) as Punto[];
});

// Etiquetas eje X: formateo amigable
function formatAxisLabel(e: { value?: unknown }): string {
    const v = String(e?.value ?? '');
    const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

    const m1 = /^(?<year>\d{4})-(?<month>\d{2})$/.exec(v);
    if (m1?.groups?.year && m1.groups.month) {
        const y = m1.groups.year;
        const m = Number(m1.groups.month);
        if (m >= 1 && m <= 12) return `${meses[m - 1]} ${y}`;
    }

    const m2 = /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/.exec(v);
    if (m2?.groups?.day && m2.groups.month) {
        return `${m2.groups.day}/${m2.groups.month}`;
    }

    const m3 = /^(?<day>\d{2})\/(?<month>\d{2})\/\d{4}$/.exec(v);
    if (m3?.groups?.day && m3.groups.month) {
        return `${m3.groups.day}/${m3.groups.month}`;
    }

    return v;
}
</script>

<template>
    <div id="chart-demo" class="w-full">
        <DxChart id="chart" :data-source="mapped" palette="Violet">
            <DxSize :height="420" />
            <DxCommonSeriesSettings :type="type" argument-field="year" />
            <DxSeries v-for="sede in sedes" :key="sede.value" :value-field="sede.value" :name="sede.name" />
            <DxMargin :bottom="20" />
            <DxArgumentAxis :value-margins-enabled="false" discrete-axis-division-mode="crossLabels">
                <DxGrid :visible="true" />
                <DxLabel :customize-text="formatAxisLabel" />
            </DxArgumentAxis>
            <DxLegend vertical-alignment="bottom" horizontal-alignment="center" item-text-position="bottom" />
            <DxExport :enabled="true" />
            <DxTitle :text="titulo" />
            <DxTooltip :enabled="true" />
        </DxChart>
    </div>
</template>
