import type { ImageLoaderProps } from "next/image";

export function imageLoader(resolverProps: ImageLoaderProps): string {
  const { src } = resolverProps;
  return src;
}
