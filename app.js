const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')




const flowPrincipal = addKeyword(['Az','az'])
.addAnswer('¡Hola! 👋 ¿En que puedo ayudarte?\n Podes acceder al *Menu* para respuestas mas rapidas!:'
    // ,null, async(ctx,{gotoFlow})=>
    // {
    //         await gotoFlow(flowMenu);
    // }
)

const flowMenu= addKeyword(['menu','Menu'])
.addAnswer(
    [
        '👉 *1*. Catalogo.',
        '👉 *2*. Seguimiento del pedido.',
        '👉 *3*. Políticas de devolución y cambios.',
        '👉 *4*. Promociones y descuentos actuales.',
        '👉 *5*. Horarios de atención y dirección de nuestras tiendas físicas.',
        '👉 *6*. otro',
        'Por favor, elige el número de la opción que te interesa.',
    ],
    { capture: true },
     async (ctx, {gotoFlow, fallBack})=>{
        if(ctx.body.includes(['1','2','3','4','5','6'])){
            return fallBack('Respuesta invalida, selecciones una de las opciones');
        }
        switch(ctx.body){
            case "1":
                console.log('te mande al flow1')
                return gotoFlow(flow1);
            case "2":
                return gotoFlow(flow2);
            case "3":
                return gotoFlow(flow3);
            case "4":
                return gotoFlow(flow4);
            case "5":
                return gotoFlow(flow5);
            case "6":
                return gotoFlow(flow6);
            }
        }
    )
    

    
const flow1 = addKeyword(EVENTS.ACTION)
    .addAnswer('Aqui esta el catalogo: https://drive.google.com/file/d/0B-Js4RcSQhpkZjRQSVlYSnRWcFk/edit?resourcekey=0-_opgMbdPDZw3KBOhiOxWZg',{media:"https://drive.google.com/file/d/0B-Js4RcSQhpkZjRQSVlYSnRWcFk/edit?resourcekey=0-_opgMbdPDZw3KBOhiOxWZg"}
        
            // 
    )
const flow2 = addKeyword(EVENTS.ACTION).addAnswer('flow2')
const flow3 = addKeyword(EVENTS.ACTION)
const flow4 = addKeyword(EVENTS.ACTION)
const flow5 = addKeyword(EVENTS.ACTION)
const flow6 = addKeyword(EVENTS.ACTION)

const flowAlgoMas= addKeyword([EVENTS.ACTION])
.addAnswer('Necesitas ayuda con algo mas? *Si*/*No*',
    {capture: true},async(ctx,{flowDynamic})=>
        {
            if(ctx.body.includes(['si','Si'])){
                await gotoFlow(flowMenu);
            }
            if(ctx.body.includes(['no','No'])){
                await flowDynamic([{body:
                    `¡En breve te atendera el pesonal! o accede al *Menu*`
                }]);
            }
        },
)

const flowGracias = addKeyword(['gracias']).addAnswer('¡Gracias a vos!👋')


    // confiuracion:
const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowMenu, flow1, flow2, flow3, flow4, flow5, flow6 ,flowGracias])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
