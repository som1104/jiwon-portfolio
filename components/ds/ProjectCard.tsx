import Label from "./Label";
import ImageFrame from "./ImageFrame";

type ProjectCardProps = {
  title: string;
  index?: string;
  ratio?: string;
  src?: string;
  href?: string;
  external?: boolean;
};

/** Image with type underneath it — not a card, no container. */
export default function ProjectCard({
  title,
  index,
  ratio = "4 / 5",
  src,
  href = "#",
  external = false,
}: ProjectCardProps) {
  const linkProps = external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
  return (
    <a className="pcard" href={href} {...linkProps}>
      <ImageFrame src={src} ratio={ratio} alt={src ? title : ""} />
      <div className="pcard__head">
        <h3 className="pcard__title">{title}</h3>
        {index ? <Label>{index}</Label> : null}
      </div>
    </a>
  );
}
