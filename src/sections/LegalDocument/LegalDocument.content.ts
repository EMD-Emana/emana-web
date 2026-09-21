import type { LegalDocumentContent } from './LegalDocument.types';

/**
 * Copy for the three legal routes linked from the footer.
 *
 * IMPORTANT — READ BEFORE SHIPPING
 * These documents describe the STRUCTURE a privacy policy, a set of terms and a
 * cookie notice need, and every page says so in a visible callout. They are not
 * legal advice and they do not bind anyone. Nothing here was copied from another
 * site: the outlines follow the headings those documents conventionally carry.
 * Replace each body with text reviewed by counsel for the jurisdictions you
 * actually operate in before the site goes live.
 */

const UPDATED_AT = '2026-09-21';
const UPDATED_LABEL = '21 de septiembre de 2026';
const CONTACT_EMAIL = 'hola@aiagencystudio.example';

const NOTICE =
  'Documento de referencia para un caso de estudio. Define la estructura y los temas que debe cubrir esta página, no condiciones vigentes: antes de publicar el sitio hay que reemplazarlo por un texto revisado legalmente para las jurisdicciones donde opera la empresa.';

export const privacyContent: LegalDocumentContent = {
  path: '/privacidad',
  title: 'Política de privacidad',
  description:
    'Qué datos personales trata el sitio, con qué finalidad, durante cuánto tiempo y cómo ejercer los derechos sobre ellos.',
  updatedAt: UPDATED_AT,
  updatedLabel: UPDATED_LABEL,
  notice: NOTICE,
  sections: [
    {
      id: 'responsable',
      title: 'Responsable del tratamiento',
      paragraphs: [
        'Esta sección identifica a la persona jurídica responsable de decidir sobre el tratamiento de los datos: razón social, domicilio fiscal, número de identificación tributaria y un canal de contacto verificable.',
        'Si la empresa opera en varios países, corresponde indicar qué entidad responde en cada uno y, cuando la normativa lo exija, designar un representante local o un delegado de protección de datos.',
      ],
    },
    {
      id: 'datos',
      title: 'Datos que se recogen',
      paragraphs: [
        'El sitio solo recibe los datos que una persona escribe de forma voluntaria en el formulario de contacto y en el formulario de suscripción del pie de página.',
      ],
      bullets: [
        'Nombre y apellido, para poder dirigirse a quien escribe.',
        'Correo electrónico, para responder la consulta o enviar la carta mensual.',
        'Empresa y rango de presupuesto, cuando se indican, para preparar la conversación.',
        'El texto del mensaje, tal como fue escrito.',
      ],
    },
    {
      id: 'finalidad',
      title: 'Finalidad y base legal',
      paragraphs: [
        'Cada finalidad debe declararse por separado, junto con la base que la legitima: el consentimiento para la carta mensual, la relación precontractual para responder una consulta comercial, y la obligación legal cuando corresponda conservar registros.',
        'Los datos del formulario no se usan para ninguna finalidad distinta de la que motivó su envío ni se ceden a terceros con fines publicitarios.',
      ],
    },
    {
      id: 'conservacion',
      title: 'Plazo de conservación',
      paragraphs: [
        'Corresponde fijar un plazo concreto por finalidad y un criterio de borrado al cumplirse, en lugar de una fórmula abierta del tipo «el tiempo necesario».',
      ],
    },
    {
      id: 'encargados',
      title: 'Proveedores y transferencias',
      paragraphs: [
        'Aquí se enumeran los proveedores que procesan datos por cuenta de la empresa —alojamiento, correo transaccional, analítica— y el país donde lo hacen. Si hay transferencias internacionales, hay que indicar la garantía que las ampara.',
      ],
    },
    {
      id: 'derechos',
      title: 'Derechos de las personas',
      paragraphs: [
        'La persona puede solicitar el acceso, la rectificación, la supresión, la oposición, la limitación y la portabilidad de sus datos, así como retirar su consentimiento en cualquier momento sin que ello afecte a lo tratado antes.',
        'La página debe explicar el procedimiento exacto para ejercer esos derechos, el plazo de respuesta y la autoridad de control ante la que se puede reclamar.',
      ],
    },
    {
      id: 'seguridad',
      title: 'Medidas de seguridad',
      paragraphs: [
        'El sitio se sirve exclusivamente por HTTPS, no incorpora scripts de terceros y valida en el servidor todo lo que recibe el formulario. Las credenciales de los proveedores se guardan como variables de entorno del servidor y nunca se envían al navegador.',
      ],
    },
  ],
  contactTitle: 'Consultas sobre privacidad',
  contactBody:
    'Para ejercer cualquiera de los derechos anteriores o resolver una duda sobre el tratamiento de datos, escribe a:',
  contactEmail: CONTACT_EMAIL,
};

export const termsContent: LegalDocumentContent = {
  path: '/terminos',
  title: 'Términos de uso',
  description:
    'Condiciones bajo las que se ofrece este sitio, alcance de la información publicada y límites de responsabilidad.',
  updatedAt: UPDATED_AT,
  updatedLabel: UPDATED_LABEL,
  notice: NOTICE,
  sections: [
    {
      id: 'objeto',
      title: 'Objeto',
      paragraphs: [
        'Esta sección delimita qué regula el documento: el acceso y el uso del sitio web, no la prestación de servicios, que se rige por el contrato firmado en cada caso.',
      ],
    },
    {
      id: 'uso',
      title: 'Uso permitido',
      paragraphs: [
        'El sitio se ofrece para consultar información sobre el estudio y para ponerse en contacto. No está permitido usarlo para enviar contenido ilícito, intentar acceder a partes no públicas o degradar su funcionamiento mediante peticiones automatizadas masivas.',
      ],
    },
    {
      id: 'contenido',
      title: 'Naturaleza de la información publicada',
      paragraphs: [
        'Los textos, las cifras, los casos y los testimonios de este sitio son material original de demostración creado para un caso de estudio. No describen clientes reales ni resultados verificados, y no constituyen una oferta contractual.',
        'Antes de publicar, cada afirmación cuantitativa debe sustituirse por un dato verificable y contrastable con su fuente.',
      ],
    },
    {
      id: 'propiedad',
      title: 'Propiedad intelectual',
      paragraphs: [
        'El código, los textos y las piezas gráficas de este sitio son obra original de quien lo desarrolla. Las tipografías se distribuyen bajo la SIL Open Font License y se alojan en el propio servidor.',
        'Aquí corresponde detallar qué se puede citar, en qué condiciones y con qué atribución.',
      ],
    },
    {
      id: 'responsabilidad',
      title: 'Limitación de responsabilidad',
      paragraphs: [
        'Debe indicarse el alcance con el que se ofrece el sitio, las interrupciones previsibles por mantenimiento y los supuestos en los que la empresa no responde, dentro de los límites que permita la ley aplicable. Una exclusión total de responsabilidad no es válida en muchas jurisdicciones.',
      ],
    },
    {
      id: 'enlaces',
      title: 'Enlaces a terceros',
      paragraphs: [
        'El sitio no carga recursos de terceros. Si en el futuro incorpora enlaces externos, debe aclarar que no controla esos destinos ni responde por su contenido.',
      ],
    },
    {
      id: 'ley',
      title: 'Ley aplicable y jurisdicción',
      paragraphs: [
        'Corresponde señalar la legislación que rige el documento y los tribunales competentes, teniendo en cuenta que la normativa de consumo puede imponer el fuero del domicilio del usuario.',
      ],
    },
  ],
  contactTitle: 'Consultas sobre estos términos',
  contactBody: 'Si algo de este documento no queda claro, escribe a:',
  contactEmail: CONTACT_EMAIL,
};

export const cookiesContent: LegalDocumentContent = {
  path: '/cookies',
  title: 'Uso de cookies',
  description:
    'Qué almacena este sitio en el navegador, para qué sirve y qué haría falta declarar si en el futuro incorporara analítica.',
  updatedAt: UPDATED_AT,
  updatedLabel: UPDATED_LABEL,
  notice: NOTICE,
  sections: [
    {
      id: 'estado-actual',
      title: 'Situación actual',
      paragraphs: [
        'Tal como está construido, este sitio no instala cookies de analítica, de publicidad ni de perfilado, y no carga scripts de terceros. Por eso no muestra un banner de consentimiento: no hay nada que consentir.',
        'La única información que puede quedar en el navegador es la estrictamente necesaria para servir la página, y se elimina al cerrar la sesión de navegación.',
      ],
    },
    {
      id: 'que-es',
      title: 'Qué es una cookie',
      paragraphs: [
        'Una cookie es un archivo pequeño que un sitio guarda en el navegador para recordar algo entre visitas. Puede ser propia o de un tercero, y puede durar solo la sesión o persistir durante meses.',
      ],
    },
    {
      id: 'categorias',
      title: 'Categorías que habría que declarar',
      paragraphs: [
        'Si el sitio incorporara medición o publicidad, cada cookie tendría que aparecer en una tabla con su nombre, su titular, su finalidad y su plazo de caducidad, agrupada en una de estas categorías:',
      ],
      bullets: [
        'Técnicas o estrictamente necesarias: no requieren consentimiento previo.',
        'De preferencias: recuerdan idioma o ajustes elegidos por la persona.',
        'De medición o analítica: requieren consentimiento en la mayoría de jurisdicciones.',
        'De publicidad o personalización: requieren consentimiento expreso y previo.',
      ],
    },
    {
      id: 'consentimiento',
      title: 'Cómo se pediría el consentimiento',
      paragraphs: [
        'Rechazar tendría que costar lo mismo que aceptar, el consentimiento debería poder retirarse con la misma facilidad con la que se dio, y ninguna cookie no necesaria podría instalarse antes de obtenerlo.',
      ],
    },
    {
      id: 'navegador',
      title: 'Control desde el navegador',
      paragraphs: [
        'Con independencia de lo anterior, cualquier navegador permite bloquear o eliminar cookies desde sus ajustes de privacidad. Bloquear las técnicas puede impedir que algunas partes del sitio funcionen.',
      ],
    },
  ],
  contactTitle: 'Consultas sobre cookies',
  contactBody: 'Para cualquier duda sobre lo anterior, escribe a:',
  contactEmail: CONTACT_EMAIL,
};
