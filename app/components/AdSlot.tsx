import {
  ADVERTISING_ENABLED,
  getAdSlotReservation,
  type AdSlotPlacement,
} from "@/lib/monetization";

type AdSlotProps = {
  placement: AdSlotPlacement;
  className?: string;
};

/**
 * Reserves layout space only after advertising has been explicitly enabled.
 * It does not load a provider script or render an advertisement.
 */
export function AdSlot({ placement, className }: AdSlotProps) {
  if (!ADVERTISING_ENABLED) {
    return null;
  }

  const reservation = getAdSlotReservation(placement);

  return (
    <div
      aria-hidden="true"
      className={className}
      data-ad-slot={placement}
      data-ad-status="reserved"
      style={{
        marginInline: "auto",
        maxWidth: reservation.maxWidth,
        minHeight: reservation.minHeight,
        width: "100%",
      }}
    />
  );
}

