import { logContainer } from "../utils/logger";
import morgan from "morgan";
import dotenv from 'dotenv';
dotenv.config();

// 이걸 좀 생각해봐야겠다.
// 로그를 어떤걸 남길건지
// 1. morgan
// 2. 이게 좀 애매함. 성공한것도 남길건지 아니면 실패한것만 남길건지
// 2. 모두 남길거면 좀 복잡해지고
// 2. 에러만 남길거면 여기에 몰간로그만 찍는것만 구현하고 에러미들웨어에서 기록.

//해당 stream은 morgan과도 연동 할 수 있다. 
const stream = {
    
    write: message => {
        const log = logContainer.get("logger");
        log.log({
            level : 'info',
            message : message
        });
    }
}

const skip = (_, res) => {
    if (process.env.NODE_ENV === 'production') {
       return res.ststusCode < 400;
    }
    return false;
};

const combined = ':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"' 
const morganFormat = process.env.NODE_ENV === 'production' ? combined : 'dev';
// NOTE: morgan 출력 형태 server.env에서 NODE_ENV 설정 production : 배포 dev : 개발

const morganMiddleware = morgan(morganFormat, { stream, skip });

export { morganMiddleware };
