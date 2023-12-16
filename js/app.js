document.addEventListener('DOMContentLoaded', function(){
    const email = {
        email: '',
        cc: '',
        asunto: '',
        mensaje: ''
    }

    // Seleccionar los elementos de la interfaz 
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const inputCC = document.querySelector('#cc');
    const formulario = document.querySelector('#formulario')
    const btnSubmit = document.querySelector('#formulario button[type="submit"]')
    const btnReset = document.querySelector('#formulario button[type="reset"]')
    const spinner = document.querySelector('#spinner')

    // Asignar eventos 
    inputEmail.addEventListener('input', validar)
    inputAsunto.addEventListener('input', validar)
    inputMensaje.addEventListener('input', validar);
    inputCC.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail)

    btnReset.addEventListener('click', (e,) =>{
        e.preventDefault();
        
        resetFormulario();
        limpiarAlerta(referencia)
    })

    function enviarEmail(e){
        e.preventDefault();
        
        spinner.classList.remove('hidden')

        setTimeout(() => {
            spinner.classList.add('hidden')
            // Reiniciar el objeto
            resetFormulario();

            // Crear una alerta
            const alertaExito = document.createElement('P')
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-20',
            'font-bold', 'text-sm', 'uppercase')
            alertaExito.textContent = "Email enviado Correctamente"
            formulario.appendChild(alertaExito)

            setTimeout(() => {
                alertaExito.remove();
            }, 2000)
        }, 3000)
    }

    function validar(e){
        console.log(e.target.parentElement)
        if(e.target.value.trim() === "" && (e.target.id === "email" || e.target.id === "asunto" || e.target.id === "mensaje")){
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = "";
            comprobarEmail();
            return;
        }
        if((e.target.id === "cc" || e.target.id === "email") && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es valido', e.target.parentElement);
            email[e.target.name] = "";
            comprobarEmail();
            return;
        }
        
        limpiarAlerta(e.target.parentElement);

        // Asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();

        // Comprobar el objeto de email
        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia){
        limpiarAlerta(referencia);

        // Generar alerta en HTML
        const error = document.createElement('DIV');
        error.textContent = mensaje;
        error.classList.add("bg-red-600", 'text-white', 'p-2', 'text-center')


        // Inyectar el error al formulario
        referencia.appendChild(error)
    }

    function limpiarAlerta(referencia){
        // Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600')
        if(alerta){
            alerta.remove();
        }
    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email);
        console.log(resultado)
        return resultado;
    }

    function comprobarEmail() {
        const { email: emails, cc, asunto, mensaje } = email; 
        console.log(Object.values(email))
        
        if (emails === '' || asunto === '' || mensaje === '' && !validarEmail(cc)) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
        } 
        else {
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
        }
    }

    function resetFormulario(){
        // Reiniciar el objeto
        email.email = "";
        email.cc = "";
        email.asunto = "";
        email.mensaje = "";

        formulario.reset();
        comprobarEmail();
    }
})