import { cleanEnv, port, str } from 'envalid';
import dotenv from 'dotenv';

dotenv.config({ quiet: true});

function getEnv() {
    return cleanEnv(process.env, {
        PORT: port({ default: 5599 }), 
        LOGGER_PATH: str({ default: "logs"}),
        PATH_API: str()
    });
}

export default getEnv;