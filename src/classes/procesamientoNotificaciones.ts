import { prepareEmailAndSend } from "../controllers/mail.controller";
import { prepareWebPushAndSend } from "../controllers/webpush.controller";
import ColaNotificaciones from "../models/colaNotificaciones.model"
import SubscripcionesPush from "../models/subscripcionesPush.model";


export const processNotification = async () => {
    
    //busca las notificiaciones por enviar 
    const notificaciones = await ColaNotificaciones.findAll({limit: 5})
    // verifica que exista alguna
    if(notificaciones.length > 0){
        
        notificaciones.forEach( async (notif) => {
            // busca la suscripcion y las credenciales para enviar el mensaje por cada usuario
            const sub = await SubscripcionesPush.findOne({
                where: { id: notif.userId }
            })

            const contexto = notif.contexto? JSON.parse(notif.contexto):{}

            if(notif.webpush){
                prepareWebPushAndSend(notif.userId, notif.tipo, contexto)
            }

            if (notif.correo) {
                prepareEmailAndSend(notif.userId, notif.tipo, contexto)
            }
            

            // elimina el mensaje
            await notif.destroy();
        });

    }

}
