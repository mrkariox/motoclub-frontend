import PlacesRepository from "~/repositories/PlacesRepository";

declare module '@nuxt/types' {
  interface Context {
    $placesRepository: PlacesRepository
  }
}


