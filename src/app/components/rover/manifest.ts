import { PhotosManifest } from './photosManifest';

export interface Manifest {
  name: string;
  landing_date: string;
  launch_date: string;
  status: string;
  max_sol: number;
  max_date: string;
  total_photos: number;
  photos: PhotosManifest[];
}
