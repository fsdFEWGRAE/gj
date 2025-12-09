import speakeasy from "speakeasy";
import qrcode from "qrcode";
export const generate2FA = async (username) =
  const secret = speakeasy.generateSecret({ name: `GLOM Authorization (${username})` });
  const qr = await qrcode.toDataURL(secret.otpauth_url);
  return { secret: secret.base32, qr };
};
export const verify2FA = (secret, token) =
  return speakeasy.totp.verify({
    secret,
    encoding: "base32",
    token
  });
};
