import { reactive } from 'vue';
import type { IBlocker } from '@/types/IBlocker';


const blockerState = reactive<IBlocker>({
    render : false,
    alternarEstado() {
        this.render = !this.render
    }
});

export function useBlockerService() {
    return blockerState;
}
