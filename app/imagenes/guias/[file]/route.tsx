import { ImageResponse } from "next/og";
import { ShareImageCard } from "@/app/components/ShareImageCard";
import { editorialGuides, getEditorialGuide } from "@/lib/editorial-guides";
import { SHARE_IMAGE_SIZE } from "@/lib/share-images";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return editorialGuides.map((guide) => ({ file: `${guide.slug}.png` }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ file: string }> },
) {
  const { file } = await params;
  const guide = getEditorialGuide(file.replace(/\.png$/, ""));

  if (!guide) {
    return new Response("No encontrado", { status: 404 });
  }

  return new ImageResponse(
    (
      <ShareImageCard
        eyebrow={guide.eyebrow}
        footer={`vatioclaro.es/guias/${guide.slug}`}
        stats={guide.quickFacts.slice(0, 3).map((fact) => ({
          label: fact.label,
          value: fact.value,
        }))}
        title={guide.title}
      />
    ),
    SHARE_IMAGE_SIZE,
  );
}
