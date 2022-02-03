import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Photo } from './photo';
import { Manifest } from './manifest';

@Injectable({
  providedIn: 'root',
})
export class MarsRoverService {
  constructor(
    private http: HttpClient,
    @Inject('API_KEY') private apiKey: string
  ) {}

  getPhotosByEarthDate(
    rover: string,
    earth_date: string,
    camera: string,
    page: number
  ): Observable<Photo[]> {
    var url =
      'https://api.nasa.gov/mars-photos/api/v1/rovers/' + rover + '/photos';
    var params = new HttpParams()
      .set('earth_date', earth_date)
      .set('camera', camera)
      .set('page', page)
      .set('api_key', this.apiKey);

    return this.http
      .get<Photo[]>(url, { params })
      .pipe(map((result: any) => result.photos));
  }

  getPhotosByEarthDateWithoutPage(
    rover: string,
    earth_date: string,
    camera: string
  ): Observable<Photo[]> {
    var url =
      'https://api.nasa.gov/mars-photos/api/v1/rovers/' + rover + '/photos';
    var params = new HttpParams()
      .set('earth_date', earth_date)
      .set('camera', camera)
      .set('api_key', this.apiKey);

    return this.http
      .get<Photo[]>(url, { params })
      .pipe(map((result: any) => result.photos));
  }

  getPhotosBySol(
    rover: string,
    sol: number,
    camera: string,
    page: number
  ): Observable<Photo[]> {
    var url =
      'https://api.nasa.gov/mars-photos/api/v1/rovers/' + rover + '/photos';
    var params = new HttpParams()
      .set('sol', sol)
      .set('camera', camera)
      .set('page', page)
      .set('api_key', this.apiKey);

    return this.http
      .get<Photo[]>(url, { params })
      .pipe(map((result: any) => result.photos));
  }

  getPhotosBySolWithoutPage(
    rover: string,
    sol: number,
    camera: string
  ): Observable<Photo[]> {
    var url =
      'https://api.nasa.gov/mars-photos/api/v1/rovers/' + rover + '/photos';
    var params = new HttpParams()
      .set('sol', sol)
      .set('camera', camera)
      .set('api_key', this.apiKey);

    return this.http
      .get<Photo[]>(url, { params })
      .pipe(map((result: any) => result.photos));
  }

  getManifest(rover: string): Observable<Manifest> {
    var url = 'https://api.nasa.gov/mars-photos/api/v1/manifests/' + rover;

    var params = new HttpParams().set('api_key', this.apiKey);

    return this.http
      .get<Manifest>(url, { params })
      .pipe(map((result: any) => result.photo_manifest));
  }

  getCameraViewValue = (camera: string) => {
    switch (camera) {
      case 'FHAZ': {
        return 'Front Hazard Avoidance Camera';
        break;
      }
      case 'RHAZ': {
        return 'Rear Hazard Avoidance Camera';
        break;
      }
      case 'MAST': {
        return 'Mast Camera';
        break;
      }
      case 'CHEMCAM': {
        return 'Chemistry and Camera Complex';
        break;
      }
      case 'MAHLI': {
        return 'Mars Hand Lens Imager';
        break;
      }
      case 'MARDI': {
        return 'Mars Descent Imager';
        break;
      }
      case 'NAVCAM': {
        return 'Navigation Camera';
        break;
      }
      case 'PANCAM': {
        return 'Panoramic Camera';
        break;
      }
      case 'MINITES': {
        return 'Miniature T.E.S.';
        break;
      }
      default: {
        return 'Unknown camera';
      }
    }
  };
}
