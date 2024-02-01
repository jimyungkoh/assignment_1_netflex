export default function getTMDBImgSrc(path, size = 500) {
  return `https://image.tmdb.org/t/p/w${size}` + path;
}
