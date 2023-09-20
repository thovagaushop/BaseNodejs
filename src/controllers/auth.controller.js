import HttpStatusConstant from "../common/constant/httpstatus.constant.js";
import MessageConstant from "../common/constant/message.constant.js";
import StatusResponseConstant from "../common/constant/statusResponse.constant.js";
import { ConfligError } from "../common/exeptions/custom.exeption.js";
import * as authService from "../services/auth.service.js";
export const login = async (req, res) => {
  try {
    return res.status(HttpStatusConstant.SUCCESS).json({
      status: StatusResponseConstant.SUCCESS,
      data: req.user,
    });
  } catch (error) {
    return res.status(error.statusCode()).json({
      status: StatusResponseConstant.ERROR,
      message: MessageConstant.BAD_REQUEST,
    });
  }
};

export const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    return res.status(HttpStatusConstant.SUCCESS).json({
      status: StatusResponseConstant.SUCCESS,
      data: user,
    });
  } catch (error) {
    if (error instanceof ConfligError) {
      return res.status(error.statusCode()).json({
        status: StatusResponseConstant.ERROR,
        message: error.message,
      });
    }
    return res.status(HttpStatusConstant.BAD_REQUEST).json({
      status: StatusResponseConstant.ERROR,
      message: MessageConstant.BAD_REQUEST,
    });
  }
};
