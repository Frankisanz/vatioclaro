export const LEGAL_OWNER = {
  name: "Francisco Javier Sanchez Fuentes",
  taxId: "15514272J",
  email: "amargued@gmail.com",
  streetAddress: "Calle Andalucía, n.º 5, 1.º D",
  postalCode: "23400",
  locality: "Úbeda",
  province: "Jaén",
  country: "España",
  updatedAt: "29 de julio de 2026",
} as const;

export const LEGAL_ADDRESS = `${LEGAL_OWNER.streetAddress}, ${LEGAL_OWNER.postalCode} ${LEGAL_OWNER.locality} (${LEGAL_OWNER.province}), ${LEGAL_OWNER.country}`;

export const VERCEL_PRIVACY_NOTICE = "https://vercel.com/legal/privacy-notice";
