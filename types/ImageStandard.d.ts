export type ImageStandard = {
  name: string;
  alt: string;
  title: string;
  url: string;
  sizes: {[name: string]: string | number};
}
