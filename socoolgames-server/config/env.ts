import path from "path"
import dotenv from "dotenv"

const envPath = path.join(process.cwd(), ".env")

dotenv.config({ path: envPath })
