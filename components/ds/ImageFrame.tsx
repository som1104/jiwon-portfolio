type ImageFrameProps = {
  src?: string;
  alt?: string;
  ratio?: string;
  caption?: string;
};

/**
 * Full-bleed media well. Square corners, no border, no shadow. With no
 * source it renders an empty off-white placeholder — the kit's standing
 * behaviour until real photography is supplied.
 */
export default function ImageFrame({
  src,
  alt = "",
  ratio = "4 / 5",
  caption,
}: ImageFrameProps) {
  return (
    <figure className="frame">
      <div className="frame__well" style={{ aspectRatio: ratio }}>
        {src ? (
          <img className="frame__img" src={src} alt={alt} data-reveal="fade" />
        ) : (
          <div className="frame__placeholder">Image</div>
        )}
      </div>
      {caption ? <figcaption className="frame__caption">{caption}</figcaption> : null}
    </figure>
  );
}
