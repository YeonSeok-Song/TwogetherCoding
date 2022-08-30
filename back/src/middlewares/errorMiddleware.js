import { logContainer } from "../utils/logger";

const errorMiddleware = (error, req, res, next) => {
  // 터미널에 노란색으로 출력됨.
  const log = logContainer.get("logger");
  const errorMessage = {
    errormessage : error.message,
  }
  log.error(`${req.method} ${req.url} 400 ${error.message}`);
  res.status(400).json(errorMessage);
}

export { errorMiddleware };
