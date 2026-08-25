import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Medios servidos aún desde el WordPress de origen durante la migración.
      // Cuando los medios se muevan a un CDN/almacenamiento propio, añadir aquí el dominio final.
      { protocol: "https", hostname: "pubcoopersbarrel.com" },
      { protocol: "https", hostname: "www.pubcoopersbarrel.com" },
    ],
  },
  // Las URLs de WordPress terminan en "/" (p. ej. /en/coopers-barrel-pub-in-estepona/).
  // trailingSlash preserva las URLs actuales sin necesidad de redirecciones.
  trailingSlash: true,
};

export default nextConfig;
