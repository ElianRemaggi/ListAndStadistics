export { };

declare global {
    export type SedeTotal = {
        sede: string
        total: number
    }

    export type ResultadoPeriodo = {
        mesanio: string | null,
        fechaing: string | null,
        pacientesCentral: number,
        pacientesGascon: number,
        total: number
    }
    export type ResultadoCobertura = {
        cobertura: string,
        cod_cobertura: number,
        cantCentros: number,
        cantGascon: number
        cantTotal: number
    }
    interface backResponse {
        data: ResultadoPeriodo[];
        dataOS: ResultadoCobertura[];
    }

}

declare module 'vue3-easy-data-table' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>
    export default component
}