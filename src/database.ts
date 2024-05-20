import { Sequelize } from 'sequelize-typescript';
import config from "./config/config";
import SubscripcionesPush from './models/subscripcionesPush.model';
import ColaNotificaciones from './models/colaNotificaciones.model';

console.log(config);

export const connectDB = async () => {
   try {

      const sequelize = new Sequelize({
         host:config.DB.HOST,
         database: config.DB.DBNAME,
         dialect: 'mysql',
         username: config.DB.USER,
         password: config.DB.PASW,
         port: Number(config.DB.PORT),
         // models: [__dirname + '/models'], // or [Player, Team],
      });
      sequelize.addModels([
            SubscripcionesPush,
            ColaNotificaciones
         ]);
      
   } catch (error) {
      console.log('Error in connection db ',
      error);
      process.exit(0);    
   }
}





