export default function Trailer(props) {

  let { embedId,width,height } = props;

  return <iframe width="350px" height="315px" src={'https://www.youtube.com/embed/' + embedId} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
}