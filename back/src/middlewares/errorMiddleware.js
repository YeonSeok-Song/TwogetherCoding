const errorMiddleware = (error, req, res, next) => {
  // 터미널에 노란색으로 출력됨.
  console.log("\x1b[33m%s\x1b[0m", error);
  const errorMessage = {
    errormessage : error.message,
  }
  res.status(400).json(errorMessage);
}

export { errorMiddleware };
