import { reactive } from 'vue';
import Swal from 'sweetalert2';

const notificador = reactive({
    exito(titulo: string, mensaje: string) {
        Swal.fire({
            icon: 'success',
            title: titulo,
            html: mensaje
        });
    },
    errorUsuario(error: string) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.toString(),
        });
    },

    errorSistema(error: string) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
            footer: '<a href="">Si el problema persiste, comuníquese con el S.U.F.I (111)</a>'
        });
    }
});

export function useNotificadorService() {
    return notificador;
}
