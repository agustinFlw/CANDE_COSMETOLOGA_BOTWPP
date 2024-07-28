const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');


// ----------------------------flows


const flowPrueba = addKeyword('!bot').addAnswer('🤖Bot activo')

const flowPrincipal = addKeyword(['az','hola'])
.addAnswer('🙇‍♀️¡Hola!¿En que puedo ayudarte?\n Podes acceder a los *Tratamientos*, *Catálogo* o coordinar un *Turno*.'
    // ,null, async(ctx,{gotoFlow})=>
    // {
    //         await gotoFlow(flowMenu);
    // }
);
const FlowTurnos=addKeyword('turno')
    .addAnswer('🙇‍♀️ Para poder coordinar un turno porfavor ingrese: Tratamiento, dias y horario en *un solo mensaje*.',
        {capture:true},async (ctx, { flowDynamic }) => 
            {
                await flowDynamic([
                    '🙇‍♀️ En breve recibirá una respuesta.',
                ])
            })

const flowTratamientos= addKeyword(['xz','tratamiento'])
.addAnswer(
    [
        '🙇‍♀️ *Informacion acerca de los tratamientos:*',
        '✨ *1*. Limpieza facial.',
        '✨ *2*. Limpieza facial con extracciones.',
        '✨ *3*. Limpieza facial con extracciones y espátula ultrasónica.',
        '✨ *4*. Limpieza facial con Hydrapeel.',
        '✨ *5*. Hidratación profunda.',
        '✨ *6*. Tratamiento despigmentante/iluminador',
        '✨ *7*. Dermaplaning',
        '*Por favor, elige el número de la opción que te interesa.*',
    ],
    { capture: true },
     async (ctx, {gotoFlow, fallBack})=>{
        switch(ctx.body){
            case "1":
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
            case "7":
                return gotoFlow(flow7);
            }
        }
    );
    // []
const flow1 = addKeyword(EVENTS.ACTION)
    .addAnswer('✨ *Limpieza facial.*\nLa limpieza facial implica eliminar impurezas, células muertas y exceso de sebo. Se lleva a cabo pasos de limpieza, exfoliación, aplicación de mascarillas y productos específicos para cada tipo de piel. El objetivo es purificar la piel, mejorar su textura, prevenir imperfecciones y promover su salud general, dejando un cutis más suave, luminoso y rejuvenecido.', 
        null, async (ctx,{gotoFlow})=>{
            gotoFlow(flowLoop);
        }
    );
const flow2 = addKeyword(EVENTS.ACTION)
    .addAnswer('✨ *Limpieza facial con extracciones*.\nLa limpieza facial con extracciones es un procedimiento en el que, además de la limpieza profunda de la piel del rostro para eliminar impurezas, se incluye la extracción manual de comedones (puntos negros) y otras imperfecciones como espinillas.  El objetivo es eliminar las obstrucciones de los poros, mejorar la apariencia de la piel y prevenir la formación de futuros brotes de acné', 
        null, async (ctx,{gotoFlow})=>{
            await gotoFlow(flowLoop);
        }
    );
const flow3 = addKeyword(EVENTS.ACTION)
    .addAnswer('✨ *Limpieza facial con extracciones y espátula ultrasónica*\nUn tratamiento de limpieza facial con extracciones y espátula ultrasónica es un procedimiento estético que combina la limpieza profunda de la piel con la extracción de impurezas utilizando una espátula ultrasónica. Esta herramienta emite vibraciones ultrasónicas que ayudan a aflojar las impurezas de los poros, facilitando su extracción de manera menos invasiva que la extracción manual tradicional. Además de limpiar en profundidad, la espátula ultrasónica puede ayudar a exfoliar suavemente la piel y estimular la circulación sanguínea, dejando la piel más limpia, suave y radiante.', 
        null, async (ctx,{gotoFlow})=>{
            await gotoFlow(flowLoop);
        }
    );
const flow4 = addKeyword(EVENTS.ACTION)
    .addAnswer('✨ *Limpieza facial con Hydrapeel*\nUn tratamiento de limpieza facial con Hydrapeel es un procedimiento avanzado que combina la hidrodermoabrasión y la infusión de sueros específicos para la piel. La hidrodermoabrasión utiliza una solución a base de agua y succión suave para exfoliar y limpiar la piel, mientras que la infusión de sueros proporciona nutrientes, antioxidantes y humedad a la piel. Este tratamiento ayuda a eliminar las impurezas, exfoliar suavemente, hidratar y rejuvenecer la piel, dejándola más luminosa, firme y revitalizada.', 
        null, async (ctx,{gotoFlow})=>{
            await gotoFlow(flowLoop);
        }
    );
const flow5 = addKeyword(EVENTS.ACTION)
    .addAnswer('✨ *Hidratación profunda*\nEl tratamiento de hidratación profunda es un procedimiento diseñado para proporcionar una hidratación intensiva a la piel. Se utilizan productos y técnicas específicas para reponer la humedad perdida, restaurar la barrera protectora de la piel y mejorar su apariencia general. Este tipo de tratamiento ayuda a combatir la sequedad, suavizar la piel, reducir la apariencia de líneas finas y arrugas, y promover una apariencia más saludable y radiante.', 
        null, async (ctx,{gotoFlow})=>{
            await gotoFlow(flowLoop);
        }
    );
const flow6 = addKeyword(EVENTS.ACTION)
    .addAnswer('✨ *Despigmentante/iluminador*\nUn tratamiento despigmentante/iluminador es un procedimiento estético que tiene como objetivo reducir las manchas oscuras en la piel y mejorar la luminosidad del cutis. Se utilizan productos y técnicas especializadas para tratar la hiperpigmentación, ya sea causada por el sol, el envejecimiento o condiciones de la piel.', 
        null, async (ctx,{gotoFlow})=>{
            await gotoFlow(flowLoop);
        }
    );
const flow7 = addKeyword(EVENTS.ACTION)
    .addAnswer('✨ *Dermaplaning*\nEl dermaplaning es un tratamiento estético no invasivo que consiste en utilizar una pequeña cuchilla para exfoliar suavemente la capa superior de la piel, eliminando células muertas, vello facial o pelusitas, dejando la piel más suave y luminosa. Este procedimiento ayuda a mejorar la textura de la piel, a permitir una mejor absorción de los productos para el cuidado de la piel, y a darle un aspecto más fresco y rejuvenecido al rostro.', 
        null, async (ctx,{gotoFlow})=>{
            await gotoFlow(flowLoop);
        }
    );


const flowCatalogo=addKeyword(['Catalogo','Catálogo','lista de precio'])
    .addAnswer('Enviando...')
    .addAnswer('🙇‍♀️ ¡Este es el catalogo!',
        {
            media:'https://i.imgur.com/9dAqJrp.jpeg'
            
        }, async (ctx,{gotoFlow})=>{
            console.log('goto flowLoop');
            await gotoFlow(flowLoop);
        }
    )

const flowLoop= addKeyword(EVENTS.ACTION).addAnswer('🙇‍♀️ En cualquier momento puede acceder a *Tratamientos*, *Catalogo* o *Turnos*.'  ,
);

const flowGracias = addKeyword(['gracias']).addAnswer('🙇‍♀️¡Gracias a vos!')


    // confiuracion:
const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrueba, flowPrincipal, FlowTurnos, flowTratamientos, flow1, flow2, flow3, flow4, flow5, flow6, flow7, flowCatalogo, flowLoop ,flowGracias])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    },{
        blackList:['5492944132255','5492804626844','5492945416401','5492804378262']
    })
    
    QRPortalWeb({ port:3001})
}

main()

main()
