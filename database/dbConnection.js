
import mongoose from "mongoose";

export const dbConnection = async () => {

    try {
        const mongoDB = await mongoose.connect(process.env.BASE_URL_DB)
        console.log(`Base de datos conectada correctamente: ${mongoDB.connections[0].name}`);
        
    } catch (error) {
        console.log(`Error al conectar base de datos: ${error}`)
    }
}