export default function Trailer(props) {

  let { embedId } = props;

  return <iframe width="560" height="315" src={'https://www.youtube.com/embed/' + embedId} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
}