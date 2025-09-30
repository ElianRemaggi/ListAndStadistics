<script setup lang="ts">
import DxPieChart, {
    DxSize,
    DxSeries,
    DxLabel,
    DxConnector,
    DxExport,
} from 'devextreme-vue/pie-chart';
import type { DxPieChartTypes } from 'devextreme-vue/pie-chart';
import { type PropType } from 'vue';

type SedeTotalData = { data: SedeTotal[]};

function pointClickHandler(e: DxPieChartTypes.PointClickEvent) {
    toggleVisibility(e.target);
}

function toggleVisibility(item: any) {
    item.isVisible() ? item.hide() : item.show();
}

const props = defineProps({
    data: { type: Object as PropType<SedeTotalData>, default: () => undefined },
    titulo: { type: String, default: '' }
})
</script>

<template>
    <DxPieChart v-if="props.data && props.data?.data" id="pie" :data-source="props.data.data" palette="Bright" :title="titulo"
        @point-click="pointClickHandler($event)">
        <DxSeries argument-field="sede" value-field="total">
            <DxLabel :visible="true">
                <DxConnector :visible="true" :width="1" />
            </DxLabel>
        </DxSeries>
        <DxSize :width="500" />
        <DxExport :enabled="true" />
    </DxPieChart>
</template>

<style>
#pie {
    height: 440px;
}

#pie * {
    margin: 0 auto;
}
</style>