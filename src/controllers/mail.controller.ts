import config from "../config/config";
import { transporter } from "../config/config.mail";



export const prepareEmailAndSend = async (userId: string, tipo: string, contexto: any) => {


    let html = ''
    let subject = ''
    // arma el mensaje segun el tipo
    switch (tipo) {
        case 'invitacionTorneo':
            subject = "¡Nuevo Torneo!"
            html = `
                    <div style="text-align: center;">
                    <h1 style="color: #446d88;">¡Nuevo Torneo!</h1>
                    <p style="color: #333;">Nos complace informarle que a sido invitado nuestro próximo Torneo <strong>${contexto?.torneoNombre}</strong>.</p>
                    

                    <h2 style="color: #446d88;">Confirma tu asistencia</h2>
                    <p style="color: #333;">¡Juguemos domino para ser amigos!</p>
                    </div>
                `
            break;

        case 'esArbitro':
            subject = "¡Nuevo Torneo!"
            html = `
                    <div style="text-align: center;">
                    <h1 style="color: #446d88;">¡Nuevo Torneo!</h1>
                    <p style="color: #333;">Nos complace informarle que a sido seleccionado como arbitro en nuestro próximo Torneo <strong>${contexto?.torneoNombre}</strong>.</p>
                    

                    <h2 style="color: #446d88;">Confirma tu asistencia</h2>
                    <p style="color: #333;">¡Juguemos domino para ser amigos!</p>
                    </div>
                `
            break;

        case 'mesaEnTorneo':
            subject = "Asignacion de mesa!"
            html = `
                    <div style="text-align: center;">
                    <h1 style="color: #446d88;">Nueva Mesa!</h1>
                    <p style="color: #333;">Usted a Sido asignado a la mesa ${contexto?.mesa}.</p>
                    

                    <h2 style="color: #446d88;">Confirma tu asistencia</h2>
                    <p style="color: #333;">¡Juguemos domino para ser amigos!</p>
                    </div>
                `
            break;

        case 'ganadorPartida':
            subject = "Partida Gamada!"
            html = `
                    <div style="text-align: center;">
                    <h1 style="color: #446d88;">Enhorabuena!</h1>
                    <p style="color: #333;">Felicidades usted a ganado la partida.</p>
                    

                    <p style="color: #333;">¡Juguemos domino para ser amigos!</p>
                    </div>
                `
            break;

        case 'perdedorPartida':
            subject = "!Resultado de partida!"
            html = `
                    <div style="text-align: center;">
                    <h1 style="color: #446d88;">Nuevo Mesa!</h1>
                    <p style="color: #333;">No te desanimes, has jugado bien. Recuerda, cada derrota es una oportunidad para aprender y mejorar.</p>
                    

                    <p style="color: #446d88;">¡Esperamos verte en la próxima partida!.</p>
                    <p style="color: #333;">¡Juguemos domino para ser amigos!</p>
                    </div>
                `
            break;
            break;

        default:
            break;
    }


    const email = contexto.email
    console.log(contexto);
    
    try{
        await transporter.sendMail({
                from     : `Domino Elite <${config.MAIL.correo}>`,
                to       : email,
                subject,
                text     : "Buenas tardes estimado usuario,",
                html,
            });
    } catch (error) {
        console.log('No fue posible enviar email de confirmación, '+error)
    }


}