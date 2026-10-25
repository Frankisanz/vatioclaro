import { ImageResponse } from "next/og";
import { ShareImageCard } from "@/app/components/ShareImageCard";
import { appliances, getAppliance } from "@/lib/appliances";
import {
  getApplianceImageFigures,
  SHARE_IMAGE_SIZE,
} from "@/lib/share-images";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return appliances.map((item) => ({ file: `${item.slug}.png` }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ file: string }> },
) {
  const { file } = await params;
  const item = getAppliance(file.replace(/\.png$/, ""));

  if (!item) {
    return new Response("No encontrado", { status: 404 });
  }

  const figures = getApplianceImageFigures(item);

  return new ImageResponse(
    (
      <ShareImageCard
        eyebrow={item.category}
        footer={`Ejemplo editable · vatioclaro.es/consumo/${item.slug}`}
        stats={[
          { label: "Consumo al mes", value: figures.monthKwh },
          { label: "Coste al mes", value: figures.monthCost },
          { label: "Coste al año", value: figures.yearCost },
        ]}
        title={`¿Cuánto consume ${item.articleName}?`}
      />
    ),
    SHARE_IMAGE_SIZE,
  );
}
