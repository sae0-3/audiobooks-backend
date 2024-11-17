import pg from "pg";

const pool = new pg.Pool({
  user: process.env.DB_USER || "postres",
  password: process.env.DB_PASSWORD || "1234",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_DATABASE || "db_audiobooks",
  port: process.env.DB_PORT || "5432",
});

export async function connectDB(reintentos = 5, espera = 2000) {
  for (let i = 0; i < reintentos; i++) {
    try {
      await pool.connect();
      console.log("¡Conexión exitosa!");
      return;
    } catch (err) {
      console.error(`Intento ${i + 1} de ${reintentos}: Error de conexión`, err.stack);
      if (i < reintentos - 1) {
        console.log(`Reintentando en ${espera / 1000} segundos...`);
        await new Promise(res => setTimeout(res, espera));
      }
    }
  };
  console.error("No se pudo establecer conexión después de varios intentos.");
};

export default pool;
