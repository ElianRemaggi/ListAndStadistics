<script setup lang="ts">

import EasyDataTable, { type Header, type Item, type SortType } from 'vue3-easy-data-table'

const headers: Header[] = [
    { text: "Cobertura", value: "cobertura", sortable: true },
    { text: "Codigo", value: "cod_cobertura", sortable: true },
    { text: "Central", value: "cantCentral", sortable: true },
    { text: "Gascon", value: "cantGascon", sortable: true },
    { text: "Total", value: "cantTotal", sortable: true },
];

const props = defineProps<{ items: ResultadoCobertura[] }>()

</script>

<template>
    <div class="customize-table w-full m-auto mt-10">
        <EasyDataTable :headers="headers" :items="props.items" 
            class=" w-3/4 m-auto p-1 rounded-2xl bg-purple-50" table-class-name="customize-table" header-text-direction="center"
            body-text-direction="center" />
    </div>
</template>

<style scoped>
.customize-table {
    --easy-table-border: 1px solid #555;
    --easy-table-row-border: 1px solid #555;

    --easy-table-header-font-size: 14px;
    --easy-table-header-height: 50px;
    --easy-table-header-font-color: #666666;
    --easy-table-header-background-color: #eee;

    --easy-table-header-item-padding: 10px 15px;
    
    --easy-table-body-row-font-color: #000;
    --easy-table-body-row-background-color: #fff;

    --easy-table-body-even-row-font-color: #fff;
    --easy-table-body-even-row-background-color: #4c5d7a;
}
</style>