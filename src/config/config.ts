
import dotenv from 'dotenv';
dotenv.config();

const production = process.env.PRODUCTION_MODE === 'true'
console.log(production);

export default {
   JWT_SECRET: process.env.JWT_SECRET || 'BioonixDominosomeSecretKey17$*',
   DB: {
      DBNAME: production ? process.env.MYSQL_DBNAME : 'dominoelite',
      HOST: production ? process.env.MYSQL_HOST : 'localhost',
      PORT: production ? process.env.MYSQL_PORT : 3306,
      USER: production ? process.env.MYSQL_USER : 'root',
      PASW: production ? process.env.MYSQL_PASS : 'root'
   },
   MAIL: {
      correo: "jlramirez17@gmail.com",
      passw: "wbhlgttewcrahgvr",
      path_confirm: "http://localhost:3000/auth/confirm/"
   },
   webpush: {
      publicKey: process.env.PUBLIC_KEY_WP || 'BPgm4VlLBMb0m5ambYzGPWHo2twJncZa5Gi0WNOiOdjvHe-itNrw4FB-LjLfciGerdyruqRhe65Qr0xOYZAfSoQ',
      privateKey: process.env.PRIVATE_KEY_WP || '6vUWlr36g72GqwU2Poj3Pp2_uBURJ0auK_fLzhXLppI'
   }
}
