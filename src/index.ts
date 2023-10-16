import app from "./app";
import 'dotenv/config'


app.listen(process.env.PORT,() => {
    console.log("Iniciamos en puerto 5000");
});