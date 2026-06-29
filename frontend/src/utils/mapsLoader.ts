import { Loader } from '@googlemaps/js-api-loader';

/**
 * Shared singleton Google Maps Loader.
 * Both MapView and SearchBar must use this same instance
 * to avoid duplicate script-load conflicts that crash the page.
 *
 * NOTE: In @googlemaps/js-api-loader v2.x, `libraries` must NOT
 * be passed to the constructor — use importLibrary() instead.
 */
let loaderInstance: Loader | null = null;

export function getGoogleMapsLoader(): Loader {
  if (!loaderInstance) {
    const apiKey = (import.meta as any).env?.VITE_GOOGLE_MAPS_API_KEY || '';
    loaderInstance = new Loader({
      apiKey,
      version: 'weekly',
    });
  }
  return loaderInstance;
}
