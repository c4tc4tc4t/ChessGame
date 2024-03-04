import "./Tile.css";

interface Props {
  image?: string;
  id?: string;
  number: number;
  highlight: boolean;
}


export default function Tile({ number, image, highlight, id }: Props) {
  const className: string = [
    "tile",
    number % 2 === 0 && "black-tile",
    number % 2 !== 0 && "white-tile",
    highlight && "tile-highlight",
    image && "chess-piece-tile",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      {image && (
        <div
          data-testid={id}
          style={{ backgroundImage: `url(${image})` }}
          className="chess-piece"
        ></div>
      )}
    </div>
  );
}
