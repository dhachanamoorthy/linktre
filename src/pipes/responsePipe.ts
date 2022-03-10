export class SuccessPipe {
  Ok(res, code, msg, data) {
    const body = {
      status: 200,
      code: code,
      msg: msg,
      data: data,
    };
    return res.status(200).json(body);
  }
  Created(res, code, msg, data) {
    const body = {
      status: 201,
      code: code,
      msg: msg,
      data: data,
    };
    return res.status(201).json(body);
  }
  NoContent(res) {
    const body = {
      msg: "No Data Found",
    };
    return res.status(204).json(body);
  }
}
