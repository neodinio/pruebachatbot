const { createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const { createBotDialog } = require ('@bot-whatsapp/contexts/dialogflow')

const flowSecundario = addKeyword(['']).addAnswer([''])

const flowTienda = addKeyword(['Tienda virtual']).addAnswer(
    [
        'Claro tenemos una tienda virtual en el que podras encontrar distintos dispositivos',
        'Este es el link de la tienda virtual',
        'https://sies.pe/?k=store',
    ],
    null,
    null,
    [flowSecundario]
)

const flowInformacion = addKeyword(['Información']).addAnswer(
    [
        'Claro esta es la pagina web de la empresa ',
        'https://sies.pe/',
    ],
    null,
    null,
    [flowSecundario]
)

const flowDirecion = addKeyword(['Dirección']).addAnswer(
    ['Nos encontramos en Asociación Los Municipales Mz. G Lt. 17 Oficina Interior, Jesús Nazareno, Huamanga, Ayacucho', 
    'Esta es la direcion en google maps',
    'https://goo.gl/maps/qGXDeLnvNbJ1pAab9',
    ],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer(' Bienvenido al *Chatbot* de SIES')
    .addAnswer(
        [
            'Somos una empresa ayacuchana fundada en el 2001 ',
            'Ofrecemos servicios de :',
            'Soluciones basadas en Energia solar.',
            'Video vigilacia.',
            'Soporte tecnico en computadoras.',
        ],
        null,
        null,
        [flowInformacion, flowTienda, flowDirecion]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBotDialog({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
