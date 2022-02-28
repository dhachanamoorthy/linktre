export default class ResponsePipe {
  success(res: any, msg: string, payload: any) {
    const responseBody = {
      code: 200,
      message: msg,
      data: payload,
    };
    return res.status(200).json(responseBody);
  }
  error(res, code, err,msg) {
    return res.status(500).json({
      code: code,
      error:err,
      message: msg,
    });
  }
}
