import crypto from "node:crypto";

const TOKEN_SEPARATOR = ".";

function getFormSecret() {
  return process.env.LEAD_FORM_SECRET || "development-only-lead-form-secret";
}

function createSignature(timestamp: number) {
  return crypto
    .createHmac("sha256", getFormSecret())
    .update(String(timestamp))
    .digest("hex");
}

export function createFormToken(timestamp = Date.now()) {
  return `${timestamp}${TOKEN_SEPARATOR}${createSignature(timestamp)}`;
}

export function verifyFormToken(token: string) {
  const [timestampPart, signature] = token.split(TOKEN_SEPARATOR);
  const timestamp = Number(timestampPart);

  if (!timestampPart || !signature || !Number.isFinite(timestamp)) {
    return {
      ok: false,
      timestamp: 0,
    };
  }

  const expectedSignature = createSignature(timestamp);
  const signatureBuffer = Buffer.from(signature);
  const expectedSignatureBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedSignatureBuffer.length) {
    return {
      ok: false,
      timestamp,
    };
  }

  const isValid = crypto.timingSafeEqual(signatureBuffer, expectedSignatureBuffer);

  return {
    ok: isValid,
    timestamp,
  };
}
