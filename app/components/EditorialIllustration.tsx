import Image from "next/image";
import editorialIllustration from "@/public/images/vatioclaro-hogar-energia.webp";

type EditorialIllustrationProps = {
  caption?: string;
  priority?: boolean;
};

export function EditorialIllustration({
  caption =
    "Ilustración editorial de un hogar con distintos usos eléctricos. No representa una vivienda ni una medición real.",
  priority = false,
}: EditorialIllustrationProps) {
  return (
    <figure className="editorial-illustration">
      <Image
        alt="Ilustración editorial de una vivienda y sus principales usos de electricidad"
        placeholder="blur"
        priority={priority}
        sizes="(max-width: 720px) 90vw, (max-width: 1180px) 82vw, 820px"
        src={editorialIllustration}
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
