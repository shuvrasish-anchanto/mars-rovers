import { Component, OnInit, ViewChild } from '@angular/core';
import { MarsRoverService } from './mars-rover-service';

import { Photo } from './photo';
import { PhotosManifest } from './photosManifest';
import { Manifest } from './manifest';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { lastValueFrom } from 'rxjs';

import * as _moment from 'moment';

const moment = _moment;

interface RoverOption {
  value: string;
  viewValue: string;
}

interface CameraOption {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-mars-rover',
  templateUrl: './rover.component.html',
  styleUrls: ['./rover.component.css'],
})
export class RoverComponent implements OnInit {
  constructor(private marsRoverService: MarsRoverService) {}

  selectedCamera: string;
  selectedPage: number = 1;
  selectedEarthDate = moment().toDate();
  selectedSol: number;
  maxEarthDate = moment().toDate();
  searchBy: string = 'earthDate';
  totalPhotos: number;
  manifestCurrentDay: PhotosManifest;
  cameras: CameraOption[] = [];
  camerasInUse: string[];
  counter: number = 0;
  photos: Photo[];
  manifest: Manifest;
  resultLength: number;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  rovers: RoverOption[] = [
    { value: 'curiosity', viewValue: 'Curiosity' },
    { value: 'opportunity', viewValue: 'Opportunity' },
    { value: 'spirit', viewValue: 'Spirit' },
  ];

  selectedRover =
    this.rovers[Number(window.location.href.substr(-1)) - 1].value;
  selectedRoverName =
    this.rovers[Number(window.location.href.substr(-1)) - 1].viewValue;

  async ngOnInit() {
    await this.getManifest();
  }

  async getManifest() {
    const manifest$ = this.marsRoverService.getManifest(this.selectedRover);
    this.manifest = await lastValueFrom(manifest$);

    this.selectedEarthDate = this.maxEarthDate = moment(
      this.manifest.max_date
    ).toDate();

    this.loadFilters();

    this.getPictures();
  }

  loadFilters() {
    if (this.searchBy === 'earthDate') {
      this.camerasInUse = this.manifest.photos.filter(
        (x) =>
          x.earth_date === moment(this.selectedEarthDate).format('YYYY-MM-DD')
      )[0].cameras;
    } else if (this.searchBy === 'sol') {
      this.camerasInUse = this.manifest.photos.filter(
        (x) => x.sol === this.selectedSol
      )[0].cameras;
    }

    this.cameras = [];

    this.camerasInUse.forEach((element) => {
      this.cameras[this.counter] = {
        value: element,
        viewValue: this.marsRoverService.getCameraViewValue(element),
      };
      this.counter++;
    });

    this.counter = 0;

    this.selectedCamera = this.cameras[0].value;
  }

  async getPictures(caller?: string) {
    if (caller === 'camera') {
      this.selectedPage = 1;
      this.paginator.pageIndex = 0;
    }
    if (caller === 'earthDate' || caller === 'sol') {
      this.selectedPage = 1;
      this.loadFilters();
      this.paginator.pageIndex = 0;
    }

    if (this.searchBy === 'earthDate') {
      let photosByEarthDate = this.marsRoverService.getPhotosByEarthDate(
        this.selectedRover,
        moment(this.selectedEarthDate).format('YYYY-MM-DD'),
        this.selectedCamera,
        this.selectedPage
      );

      this.photos = await lastValueFrom(photosByEarthDate);

      if (this.selectedPage === 1) {
        let photosByEarthDateWithoutPage =
          this.marsRoverService.getPhotosByEarthDateWithoutPage(
            this.selectedRover,
            moment(this.selectedEarthDate).format('YYYY-MM-DD'),
            this.selectedCamera
          );

        this.totalPhotos = await (
          await lastValueFrom(photosByEarthDateWithoutPage)
        ).length;
      }
    } else if (this.searchBy === 'sol') {
      let photosBySol = this.marsRoverService.getPhotosBySol(
        this.selectedRover,
        this.selectedSol,
        this.selectedCamera,
        this.selectedPage
      );

      this.photos = await lastValueFrom(photosBySol);

      if (this.selectedPage === 1) {
        let photosBySolWithoutPage =
          this.marsRoverService.getPhotosBySolWithoutPage(
            this.selectedRover,
            this.selectedSol,
            this.selectedCamera
          );

        this.totalPhotos = await (
          await lastValueFrom(photosBySolWithoutPage)
        ).length;
      }
    }

    if (caller === 'earthDate' || caller === 'sol') {
      this.loadFilters();
    }
  }

  changePage(event: PageEvent) {
    this.selectedPage = event.pageIndex + 1;
    this.getPictures();
  }
}
