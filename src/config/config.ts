import dotenv from 'dotenv';
dotenv.config();
export default {
   DB: {
      DBNAME: 'dominoelite',
      HOST: process.env.MYSQL_HOST || 'localhost',
      PORT: process.env.MYSQL_PORT || 3306,
      USER: process.env.MYSQL_USER || 'root',
      PASW: process.env.MYSQL_PASS || 'root'
   },
   webpush: {
      publicKey: process.env.PUBLIC_KEY_WP || 'BPgm4VlLBMb0m5ambYzGPWHo2twJncZa5Gi0WNOiOdjvHe-itNrw4FB-LjLfciGerdyruqRhe65Qr0xOYZAfSoQ',
      privateKey: process.env.PRIVATE_KEY_WP || '6vUWlr36g72GqwU2Poj3Pp2_uBURJ0auK_fLzhXLppI'
   },
   MAIL: {
      correo: "jlramirez17@gmail.com",
      passw: "wbhlgttewcrahgvr",
      path_confirm: "http://localhost:3000/auth/confirm/"
   }
}
