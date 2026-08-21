/**
 * Advertising is deliberately opt-in. Enabling this flag also requires a
 * privacy/cookie review and an explicit provider integration; neither is
 * performed by the placeholder component.
 */
export const ADVERTISING_ENABLED: boolean = false;

export const AD_SLOT_RESERVATIONS = {
  "article-inline": {
    minHeight: 250,
    maxWidth: 970,
  },
  "article-end": {
    minHeight: 280,
    maxWidth: 970,
  },
  "desktop-sidebar": {
    minHeight: 600,
    maxWidth: 300,
  },
} as const;

export type AdSlotPlacement = keyof typeof AD_SLOT_RESERVATIONS;

export function getAdSlotReservation(placement: AdSlotPlacement) {
  return AD_SLOT_RESERVATIONS[placement];
}

