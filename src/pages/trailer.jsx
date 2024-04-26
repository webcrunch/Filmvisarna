export default function Trailer(props) {
  let { embedId, width, height, className } = props;

  return (
    <iframe
      className={className}
      // className="detailedTrailer"
      width={width}
      height={height}
      // height="315px"
      src={"https://www.youtube.com/embed/" + embedId}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    ></iframe>
  );
}
