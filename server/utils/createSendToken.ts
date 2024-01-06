import { CookieOptions, Response } from 'express';
import signToken from './signToken';

const createSendToken = (
  user: { _id: string; password: any },
  statusCode: number,
  res: Response
) => {
  const token = signToken(user._id);

  const jwtCookieExpiresInString: string = process.env.JWT_COOKIE_EXPIRES_IN!;

  if (jwtCookieExpiresInString && !isNaN(Number(jwtCookieExpiresInString))) {
    const JWT_COOKIE_EXPIRES_IN: number = Number(jwtCookieExpiresInString);

    const cookieOptions: CookieOptions = {
      expires: new Date(
        Date.now() + JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      sameSite: 'none',
      secure: false,
    };

    if (process.env.NODE_ENV === 'production') {
      cookieOptions.secure = true;
    }

    res.cookie('jwt', token, cookieOptions);
  } else {
    console.error('JWT_COOKIE_EXPIRES_IN is missing or not a valid date');
  }

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

export default createSendToken;
