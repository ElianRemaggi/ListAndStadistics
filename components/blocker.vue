        
<script setup lang="ts">

interface Props{
    blockerRender: boolean
}
const props = defineProps<Props>()

</script>

<template>
    <div v-if="props.blockerRender" class="panelBlockeador" >
        <img src="@/assets/spinnerAvion.gif" alt="cargando...">
    </div>
</template>

<style scoped>
.panelBlockeador {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

img{
    width:35%;
}
</style>