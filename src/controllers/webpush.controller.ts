import express, { Request, Response } from "express";
import SubscripcionesPush from "../models/subscripcionesPush.model";
import WP from "../webPush";


export const suscribe = async (req: Request, res: Response): Promise<Response> => {

    const { userId, subscription } = req.body;

    if (!userId || !subscription) {

        return res.status(409).json({
            data_send: "",
            num_status: 1,
            msg_status: 'El campos userId, subscription es obligatorio'
        })
    }

    const [subs, created] = await SubscripcionesPush.upsert({
        id: userId,
        subscription: JSON.stringify(subscription)
    });


    try {


        if (created) {
            return res.status(201).json(
                {
                    data_send: 'suscripcion exitosa',
                    num_status: 0,
                    msg_status: 'club creado correctamente.'
                });
        }


        return res.status(201).json(
            {
                data_send: 'suscripcion encontrada',
                num_status: 0,
                msg_status: 'club creado correctamente.'
            });

    } catch (error) {
        return res.status(400).json({
            message: error
        })
    }
}

export const enviarNotificacion = async (req: Request, res: Response): Promise<Response> => {



    return res.status(201).json(
        {
            data_send: 'suscripcion encontrada',
            num_status: 0,
            msg_status: 'club creado correctamente.'
        });


}

export const prepareWebPushAndSend = async(userId:string, tipo:string, contexto:any)=>{

    const sub = await SubscripcionesPush.findOne({
        where: { id: userId }
    })

    if (sub) {

        const subscripcion = JSON.parse(sub.subscription)

        // estructura de la notificacion
        const payload = {
            "notification": {
                "title": "Domino Elite",
                "body": "",
                "vibrate": [100, 50, 100],
                "image": "",
                "actions": [{
                    "action": "explore",
                    "title": "Go to the site"
                }]
            }
        }

        
        // arma el mensaje segun el tipo
        switch (tipo) {
            case 'invitacionTorneo':
                payload.notification.body = "Usted a Sido invitado al torneo \"" + contexto?.torneoNombre+"\""
            break;

            case 'esArbitro':
                payload.notification.body = "Usted a Sido seleccionado como arbitro"
                break;

            case 'mesaEnTorneo':
                payload.notification.body = "Usted a Sido asignado a la mesea " + contexto?.mesa
            break;

            case 'ganadorPartida':
                payload.notification.body = "Felicidades usted a ganado la partida "
            break;

            case 'perdedorPartida':
                payload.notification.body = "¡Ánimo! Cada derrota es una lección. ¡Nos vemos en la próxima!"
                // payload.notification.body = "No te desanimes, has jugado bien. Recuerda, cada derrota es una oportunidad para aprender y mejorar. ¡Esperamos verte en la próxima partida! "
            break;

            default:
                break;
        }

        // envia la notificacion 
        WP.sendNotification(subscripcion, JSON.stringify(payload))
            .then(async (res) => {
                console.log('Enviado !!');
            }).catch(err => {
                console.log('Error', err);
            })


    }

}