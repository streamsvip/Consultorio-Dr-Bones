/* =====================================================
   CONSULTORIO DR BONES
   JAVASCRIPT
===================================================== */


/* =====================================================
   CONFIGURACIÓN
===================================================== */

// AQUÍ COLOCA EL WHATSAPP DEL CONSULTORIO
// Perú: 51 + número
//
// Ejemplo:
// const WHATSAPP_NUMBER = "51987654321";

const WHATSAPP_NUMBER = "51999999999";


/* =====================================================
   VARIABLES
===================================================== */

let horaSeleccionada = "";


/* =====================================================
   CUANDO CARGA LA PÁGINA
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    iniciarMenu();

    configurarFecha();

    iniciarHorarios();

    iniciarFormulario();

    iniciarWhatsApp();

    actualizarAnio();

});


/* =====================================================
   MENÚ MÓVIL
===================================================== */

function iniciarMenu() {

    const menuBtn = document.getElementById("menuBtn");

    const navLinks = document.getElementById("navLinks");


    if (!menuBtn || !navLinks) {
        return;
    }


    menuBtn.addEventListener("click", function () {

        navLinks.classList.toggle("active");


        if (navLinks.classList.contains("active")) {

            menuBtn.textContent = "✕";

        } else {

            menuBtn.textContent = "☰";

        }

    });


    const enlaces = navLinks.querySelectorAll("a");


    enlaces.forEach(function (enlace) {

        enlace.addEventListener("click", function () {

            navLinks.classList.remove("active");

            menuBtn.textContent = "☰";

        });

    });

}


/* =====================================================
   CONFIGURAR FECHA MÍNIMA
===================================================== */

function configurarFecha() {

    const fechaInput = document.getElementById("fecha");


    if (!fechaInput) {
        return;
    }


    const hoy = new Date();


    const anio = hoy.getFullYear();

    const mes = String(
        hoy.getMonth() + 1
    ).padStart(2, "0");

    const dia = String(
        hoy.getDate()
    ).padStart(2, "0");


    const fechaHoy =
        anio + "-" + mes + "-" + dia;


    fechaInput.min = fechaHoy;


    fechaInput.addEventListener(
        "change",
        function () {

            actualizarResumen();

        }
    );

}


/* =====================================================
   HORARIOS
===================================================== */

function iniciarHorarios() {

    const horarios =
        document.querySelectorAll(".time");


    if (!horarios.length) {
        return;
    }


    horarios.forEach(function (boton) {

        boton.addEventListener(
            "click",
            function () {


                // Quitar selección de los demás horarios

                horarios.forEach(function (item) {

                    item.classList.remove(
                        "selected"
                    );

                });


                // Seleccionar horario

                boton.classList.add(
                    "selected"
                );


                // Guardar hora

                horaSeleccionada =
                    boton.getAttribute(
                        "data-time"
                    );


                // Actualizar resumen

                actualizarResumen();

            }
        );

    });

}


/* =====================================================
   RESUMEN DE CITA
===================================================== */

function actualizarResumen() {

    const fechaInput =
        document.getElementById("fecha");


    const resumen =
        document.getElementById(
            "selectedInfo"
        );


    if (!fechaInput || !resumen) {
        return;
    }


    // Si todavía no hay fecha
    // o no hay hora seleccionada,
    // ocultamos el resumen.

    if (
        !fechaInput.value ||
        !horaSeleccionada
    ) {

        resumen.classList.remove(
            "visible"
        );

        resumen.innerHTML = "";

        return;

    }


    const fechaTexto =
        formatearFecha(
            fechaInput.value
        );


    resumen.innerHTML =
        "📅 <strong>" +
        fechaTexto +
        "</strong>" +
        " &nbsp; · &nbsp; " +
        "🕐 <strong>" +
        horaSeleccionada +
        "</strong>";


    resumen.classList.add(
        "visible"
    );

}


/* =====================================================
   FORMATEAR FECHA
===================================================== */

function formatearFecha(fecha) {

    if (!fecha) {
        return "";
    }


    const fechaObjeto =
        new Date(
            fecha + "T00:00:00"
        );


    let texto =
        fechaObjeto.toLocaleDateString(
            "es-PE",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );


    return capitalizar(texto);

}


/* =====================================================
   CAPITALIZAR
===================================================== */

function capitalizar(texto) {

    if (!texto) {
        return "";
    }


    return texto.charAt(0).toUpperCase()
        + texto.slice(1);

}


/* =====================================================
   FORMULARIO
===================================================== */

function iniciarFormulario() {

    const formulario =
        document.getElementById(
            "appointmentForm"
        );


    if (!formulario) {
        return;
    }


    formulario.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            enviarCita();

        }
    );

}


/* =====================================================
   ENVIAR CITA
===================================================== */

function enviarCita() {

    const nombreInput =
        document.getElementById(
            "nombre"
        );


    const telefonoInput =
        document.getElementById(
            "telefono"
        );


    const fechaInput =
        document.getElementById(
            "fecha"
        );


    const tipoInput =
        document.getElementById(
            "tipo"
        );


    const motivoInput =
        document.getElementById(
            "motivo"
        );


    // Comprobar que todos
    // los elementos existen.

    if (
        !nombreInput ||
        !telefonoInput ||
        !fechaInput ||
        !tipoInput ||
        !motivoInput
    ) {

        alert(
            "Error: no se pudo cargar correctamente el formulario."
        );

        return;

    }


    /* =================================================
       OBTENER DATOS
    ================================================= */

    const nombre =
        nombreInput.value.trim();


    const telefono =
        telefonoInput.value.trim();


    const fecha =
        fechaInput.value;


    const tipo =
        tipoInput.value;


    const motivo =
        motivoInput.value.trim();


    /* =================================================
       VALIDAR NOMBRE
    ================================================= */

    if (!nombre) {

        alert(
            "Por favor, ingresa tu nombre completo."
        );

        nombreInput.focus();

        return;

    }


    /* =================================================
       VALIDAR TELÉFONO
    ================================================= */

    if (!telefono) {

        alert(
            "Por favor, ingresa tu número de WhatsApp."
        );

        telefonoInput.focus();

        return;

    }


    /* =================================================
       VALIDAR FECHA
    ================================================= */

    if (!fecha) {

        alert(
            "Por favor, selecciona la fecha de tu cita."
        );

        fechaInput.focus();

        return;

    }


    /* =================================================
       VALIDAR TIPO
    ================================================= */

    if (!tipo) {

        alert(
            "Por favor, selecciona el tipo de consulta."
        );

        tipoInput.focus();

        return;

    }


    /* =================================================
       VALIDAR HORA
    ================================================= */

    if (!horaSeleccionada) {

        alert(
            "Por favor, selecciona una hora para tu cita."
        );

        return;

    }


    /* =================================================
       VALIDAR FECHA ANTERIOR
    ================================================= */

    const fechaSeleccionada =
        new Date(
            fecha + "T00:00:00"
        );


    const hoy = new Date();


    hoy.setHours(
        0,
        0,
        0,
        0
    );


    if (fechaSeleccionada < hoy) {

        alert(
            "La fecha seleccionada ya pasó. Por favor, selecciona otra fecha."
        );

        return;

    }


    /* =================================================
       FORMATEAR FECHA
    ================================================= */

    const fechaTexto =
        formatearFecha(fecha);


    /* =================================================
       CREAR MENSAJE
    ================================================= */

    let mensaje =
        "🩺 *SOLICITUD DE CITA*" +
        "\n" +
        "*CONSULTORIO DR BONES*" +
        "\n\n" +

        "━━━━━━━━━━━━━━━━━━" +
        "\n\n" +

        "👤 *Paciente:* " +
        "\n" +
        nombre +
        "\n\n" +

        "📅 *Fecha:* " +
        "\n" +
        fechaTexto +
        "\n\n" +

        "🕐 *Hora:* " +
        "\n" +
        horaSeleccionada +
        "\n\n" +

        "📋 *Tipo de consulta:* " +
        "\n" +
        tipo +
        "\n\n" +

        "📱 *WhatsApp del paciente:* " +
        "\n" +
        telefono;


    /* =================================================
       MOTIVO OPCIONAL
    ================================================= */

    if (motivo) {

        mensaje +=
            "\n\n" +

            "📝 *Motivo:* " +
            "\n" +

            motivo;

    }


    /* =================================================
       FINAL DEL MENSAJE
    ================================================= */

    mensaje +=

        "\n\n" +

        "━━━━━━━━━━━━━━━━━━" +
        "\n\n" +

        "Hola, quisiera solicitar esta cita médica." +
        "\n" +

        "Quedo atento(a) a la confirmación. Gracias.";


    /* =================================================
       WHATSAPP
    ================================================= */

    const url =
        "https://wa.me/" +
        WHATSAPP_NUMBER +
        "?text=" +
        encodeURIComponent(
            mensaje
        );


    // Abrir WhatsApp

    window.open(
        url,
        "_blank"
    );

}


/* =====================================================
   BOTÓN WHATSAPP FLOTANTE
===================================================== */

function iniciarWhatsApp() {

    const boton =
        document.getElementById(
            "whatsappFloat"
        );


    if (!boton) {
        return;
    }


    boton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            const mensaje =
                "Hola, quisiera obtener información sobre una consulta médica en el Consultorio Dr Bones.";


            const url =
                "https://wa.me/" +
                WHATSAPP_NUMBER +
                "?text=" +
                encodeURIComponent(
                    mensaje
                );


            window.open(
                url,
                "_blank"
            );

        }
    );

}


/* =====================================================
   AÑO AUTOMÁTICO
===================================================== */

function actualizarAnio() {

    const elemento =
        document.getElementById(
            "currentYear"
        );


    if (!elemento) {
        return;
    }


    elemento.textContent =
        new Date().getFullYear();

}
