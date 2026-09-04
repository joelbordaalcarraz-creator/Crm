/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const { AlignmentType, Document, Footer, HeadingLevel, ImageRun, Packer, Paragraph, ShadingType, Table, TableCell, TableRow, TextRun, WidthType } = require("docx");

const root = path.resolve(__dirname, "..");
const salida = path.join(root, "Manual de usuario - CRM El Recreo.docx");
const logo = path.join(root, "public", "recreo.png");
const color = "8C3A25";

function texto(valor, opciones = {}) {
  return new TextRun({ font: "Aptos", size: 22, color: "333333", ...opciones, text: valor });
}
function parrafo(valor, opciones = {}) {
  return new Paragraph({ spacing: { after: 160, line: 276 }, ...opciones, children: [texto(valor)] });
}
function titulo(valor, nivel = HeadingLevel.HEADING_1) {
  return new Paragraph({ heading: nivel, spacing: { before: 280, after: 130 }, children: [texto(valor, { bold: true, color, size: nivel === HeadingLevel.HEADING_1 ? 30 : 25 })] });
}
function paso(valor) {
  return new Paragraph({ numbering: { reference: "pasos", level: 0 }, spacing: { after: 90, line: 276 }, children: [texto(valor)] });
}
function nota(valor) {
  return new Paragraph({ shading: { fill: "F7EEE8", type: ShadingType.CLEAR }, spacing: { before: 80, after: 170 }, children: [texto("Importante: ", { bold: true, color }), texto(valor)] });
}
function celda(valor, encabezado = false) {
  return new TableCell({ shading: { fill: encabezado ? color : "F7EEE8", type: ShadingType.CLEAR }, margins: { top: 100, bottom: 100, left: 120, right: 120 }, children: [new Paragraph({ children: [texto(valor, { bold: encabezado, color: encabezado ? "FFFFFF" : "333333", size: 20 })] })] });
}
function tabla(encabezados, filas) {
  return new Table({ width: { size: 100, type: WidthType.PERCENTAGE }, rows: [new TableRow({ children: encabezados.map((x) => celda(x, true)) }), ...filas.map((fila) => new TableRow({ children: fila.map((x) => celda(x)) }))] });
}

const contenido = [];
if (fs.existsSync(logo)) contenido.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 220 }, children: [new ImageRun({ data: fs.readFileSync(logo), transformation: { width: 145, height: 145 }, type: "png" })] }));
contenido.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [texto("CRM EL RECREO", { bold: true, color, size: 42 })] }));
contenido.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [texto("Manual sencillo para usuarios", { bold: true, size: 30, color: "555555" })] }));
contenido.push(new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 500 }, children: [texto("Guía práctica paso a paso · Septiembre 2026", { size: 21, color: "777777" })] }));

contenido.push(titulo("1. ¿Para qué sirve el sistema?"));
contenido.push(parrafo("CRM El Recreo ayuda a guardar y organizar la información de los clientes. También permite revisar la actividad del negocio, preparar campañas, controlar cumpleaños, registrar conversaciones y obtener reportes."));
contenido.push(parrafo("No necesitas saber de programación para usarlo. Solo debes ingresar con tu usuario, elegir una opción del menú y seguir las instrucciones que aparecen en pantalla."));

contenido.push(titulo("2. Cómo entrar al sistema"));
contenido.push(parrafo("Cuando abras el sistema verás una pantalla con el logo de El Recreo y los campos para ingresar."));
contenido.push(paso("Haz clic en el cuadro Usuario."));
contenido.push(paso("Elige tu nombre de usuario de la lista."));
contenido.push(paso("Haz clic en el cuadro Contraseña y escríbela."));
contenido.push(paso("Presiona Ingresar al Sistema."));
contenido.push(paso("Espera unos segundos. Se abrirá la pantalla principal."));
contenido.push(nota("Si aparece Usuario o contraseña incorrectos, revisa que hayas elegido la cuenta correcta y que la contraseña esté escrita sin espacios."));

contenido.push(titulo("3. Cómo moverse por el sistema"));
contenido.push(parrafo("En el lado izquierdo de la pantalla encontrarás el menú principal. Cada opción corresponde a una tarea distinta."));
contenido.push(tabla(["Opción", "Para qué sirve"], [
  ["Dashboard", "Ver un resumen de la actividad."],
  ["Clientes", "Registrar y consultar clientes."],
  ["Campañas", "Preparar mensajes para grupos de clientes."],
  ["Cumpleaños", "Ver cumpleaños y preparar saludos."],
  ["Mensajería", "Revisar conversaciones con clientes."],
  ["Días festivos", "Consultar fechas importantes y preparar campañas."],
  ["Usuarios", "Crear o administrar cuentas, si tienes permiso."],
  ["Estrategias", "Consultar ideas y recomendaciones para el negocio."],
  ["Configuración", "Revisar opciones generales del sistema."],
]));
contenido.push(nota("Si una opción no aparece, significa que tu tipo de usuario no tiene permiso para usarla."));

contenido.push(titulo("4. Pantalla principal: Dashboard"));
contenido.push(parrafo("El Dashboard es el resumen del negocio. Allí puedes ver cantidades, gráficos y actividad reciente."));
contenido.push(paso("Entra a Dashboard desde el menú izquierdo."));
contenido.push(paso("Mira las tarjetas de resumen que aparecen en la parte superior."));
contenido.push(paso("Si necesitas revisar otro periodo, usa el selector Diario, Semanal, Mensual o Anual."));
contenido.push(paso("Revisa los gráficos para saber cómo está funcionando el negocio."));
contenido.push(paso("Usa Exportar PDF si deseas guardar o compartir el resumen."));

contenido.push(titulo("5. Registrar un cliente"));
contenido.push(parrafo("Usa esta opción cada vez que necesites guardar los datos de una persona o empresa."));
contenido.push(paso("Entra a Clientes."));
contenido.push(paso("Haz clic en Nuevo cliente."));
contenido.push(paso("Elige si el cliente es Individual o Corporativo."));
contenido.push(paso("Completa los datos que solicita el formulario."));
contenido.push(paso("Revisa especialmente el nombre, celular, documento y fecha de nacimiento."));
contenido.push(paso("Marca si acepta recibir comunicaciones."));
contenido.push(paso("Presiona Guardar."));
contenido.push(nota("Si el sistema marca un campo en rojo, corrige ese dato antes de guardar. El sistema revisa que los teléfonos, documentos y otros datos tengan el formato correcto."));

contenido.push(titulo("6. Buscar, consultar o cambiar un cliente"));
contenido.push(paso("Entra a Clientes."));
contenido.push(paso("Escribe en el buscador el nombre, celular, documento o razón social."));
contenido.push(paso("Si aparecen muchos resultados, utiliza los filtros."));
contenido.push(paso("Haz clic sobre el cliente que deseas revisar."));
contenido.push(paso("Para modificarlo, haz clic en Editar, cambia la información y guarda."));
contenido.push(paso("Para eliminarlo, selecciona Eliminar y confirma solo si estás seguro."));

contenido.push(titulo("7. Crear una campaña"));
contenido.push(parrafo("Una campaña es un mensaje preparado para un grupo de clientes. En esta versión sirve para organizar la comunicación y registrar a quién se desea contactar."));
contenido.push(paso("Entra a Campañas."));
contenido.push(paso("Haz clic en Nueva campaña."));
contenido.push(paso("Escribe un nombre fácil de reconocer, por ejemplo: Promoción de fin de semana."));
contenido.push(paso("Escribe el mensaje que quieres comunicar."));
contenido.push(paso("Elige a quién va dirigido: todos, clientes individuales o empresas."));
contenido.push(paso("Elige el negocio o los negocios correspondientes."));
contenido.push(paso("Guarda la campaña."));
contenido.push(paso("Cuando la hayas revisado, selecciona Aprobar y enviar."));
contenido.push(nota("El envío real por WhatsApp todavía no está conectado. La campaña queda registrada en el sistema, pero el mensaje no se envía automáticamente."));

contenido.push(titulo("8. Revisar cumpleaños"));
contenido.push(parrafo("Esta sección ayuda a no olvidar los cumpleaños de los clientes y a mantener una atención más cercana."));
contenido.push(paso("Entra a Cumpleaños."));
contenido.push(paso("Revisa quién cumple años hoy y quién cumple en los próximos días."));
contenido.push(paso("Abre el registro del cliente para ver su celular y sus datos."));
contenido.push(paso("Lee o modifica el mensaje de saludo si es necesario."));
contenido.push(paso("Después de contactar al cliente, marca el saludo como enviado."));
contenido.push(paso("Si el cliente hizo una reserva, registra esa información en el mismo seguimiento."));

contenido.push(titulo("9. Usar Mensajería"));
contenido.push(parrafo("Mensajería permite revisar y escribir conversaciones de prueba con los clientes."));
contenido.push(paso("Entra a Mensajería."));
contenido.push(paso("Busca al cliente en la lista."));
contenido.push(paso("Haz clic en su conversación."));
contenido.push(paso("Escribe el mensaje en el cuadro inferior."));
contenido.push(paso("Presiona el botón de enviar."));
contenido.push(paso("Comprueba que el mensaje aparezca en la conversación."));
contenido.push(nota("Las conversaciones se guardan en este navegador. No son mensajes reales de WhatsApp."));

contenido.push(titulo("10. Consultar días festivos"));
contenido.push(parrafo("Los días festivos sirven para recordar fechas importantes y planificar campañas con anticipación."));
contenido.push(paso("Entra a Días festivos."));
contenido.push(paso("Revisa las fechas y sus descripciones."));
contenido.push(paso("Si tienes permiso, usa Crear, Editar o Eliminar para mantener la lista actualizada."));
contenido.push(paso("Usa Crear campaña para esta fecha si deseas preparar una comunicación relacionada."));

contenido.push(titulo("11. Administrar usuarios"));
contenido.push(parrafo("Esta sección normalmente está disponible para el usuario Gerencial."));
contenido.push(paso("Entra a Usuarios."));
contenido.push(paso("Haz clic en Nuevo usuario."));
contenido.push(paso("Escribe el nombre, usuario y contraseña."));
contenido.push(paso("Elige el cargo, el tipo de usuario y el negocio."));
contenido.push(paso("Presiona Guardar."));
contenido.push(paso("Para cambiar una cuenta, usa Editar."));
contenido.push(paso("Para quitar una cuenta, usa Eliminar y confirma."));
contenido.push(nota("Una cuenta nueva queda disponible en este navegador. Entrégale la contraseña únicamente a la persona que usará esa cuenta."));

contenido.push(titulo("12. Usar Estrategias"));
contenido.push(parrafo("Estrategias permite hacer preguntas y recibir ideas para mejorar la comunicación con los clientes."));
contenido.push(paso("Entra a Estrategias."));
contenido.push(paso("Elige una sugerencia o escribe una pregunta sencilla."));
contenido.push(paso("Lee la recomendación."));
contenido.push(paso("Usa la idea para preparar una campaña, revisar cumpleaños o priorizar clientes."));

contenido.push(titulo("13. Exportar un reporte"));
contenido.push(parrafo("Puedes guardar la información que ves en un archivo para revisarla después o compartirla."));
contenido.push(paso("Abre el módulo que quieres reportar."));
contenido.push(paso("Aplica los filtros y el periodo que necesitas."));
contenido.push(paso("Presiona Exportar PDF o Exportar Excel."));
contenido.push(paso("Espera a que el archivo se descargue."));
contenido.push(paso("Abre el archivo y revisa que la información sea la correcta."));

contenido.push(titulo("14. Cambiar de negocio"));
contenido.push(parrafo("Algunas cuentas pueden trabajar con más de un negocio. En ese caso verás un selector en la parte superior."));
contenido.push(paso("Haz clic en el nombre del negocio que aparece arriba."));
contenido.push(paso("Selecciona el negocio que deseas revisar."));
contenido.push(paso("La información de las pantallas cambiará según el negocio elegido."));
contenido.push(nota("Si no puedes cambiar de negocio, tu cuenta está asignada a una sola sede."));

contenido.push(titulo("15. Cerrar sesión y cuidar la información"));
contenido.push(paso("Cuando termines de trabajar, abre el menú de tu usuario."));
contenido.push(paso("Haz clic en Cerrar sesión."));
contenido.push(paso("No borres los datos del sitio del navegador si quieres conservar la información registrada."));
contenido.push(paso("Para tener un respaldo, exporta periódicamente los reportes importantes."));
contenido.push(nota("La información se guarda en el navegador y no se comparte automáticamente con otra computadora. Si cambias de equipo, los datos no aparecerán allí."));

contenido.push(titulo("16. Qué hacer si algo no funciona"));
contenido.push(tabla(["Problema", "Qué puedes hacer"], [
  ["No puedo ingresar", "Revisa el usuario y la contraseña. Si continúa, consulta al encargado."],
  ["No veo una opción del menú", "Es posible que tu cuenta no tenga permiso para esa tarea."],
  ["No encuentro un cliente", "Borra el texto del buscador y revisa los filtros y el negocio seleccionado."],
  ["No aparecen mis cambios", "Recarga la página y confirma que sigues usando el mismo navegador."],
  ["Borré información por error", "Informa al encargado. Evita seguir modificando datos hasta revisar qué ocurrió."],
]));

contenido.push(titulo("17. Resumen rápido"));
contenido.push(parrafo("Para trabajar correctamente: ingresa con tu cuenta, revisa el Dashboard, registra cada cliente con datos completos, actualiza los seguimientos, prepara campañas con cuidado, exporta reportes importantes y cierra sesión al terminar."));
contenido.push(parrafo("El sistema está diseñado para que las tareas principales se realicen desde el menú izquierdo y se guarden mediante los botones de cada pantalla."));

const documento = new Document({
  creator: "CRM El Recreo",
  title: "Manual sencillo para usuarios - CRM El Recreo",
  description: "Guía práctica para usar el sistema CRM El Recreo",
  numbering: { config: [{ reference: "pasos", levels: [{ level: 0, format: "decimal", text: "%1.", alignment: AlignmentType.START }], instance: 0 }] },
  sections: [{
    properties: { page: { margin: { top: 900, right: 900, bottom: 900, left: 900 } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [texto("CRM El Recreo · Manual sencillo para usuarios", { size: 18, color: "777777" })] })] }) },
    children: contenido,
  }],
});

Packer.toBuffer(documento).then((buffer) => fs.writeFileSync(salida, buffer));
