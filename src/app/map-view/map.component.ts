import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Maintenance, MaintenanceService} from '../service/maintenance.service';
import {AccessibilityNotification, NotificationService} from '../service/notification-service.service';
import {TrailPreview, TrailPreviewService} from '../service/trail-preview-service.service';
import {TrailDto, TrailCoordinates, TrailService} from '../service/trail-service.service';
import {UserCoordinates} from '../UserCoordinates';
import {GraphicUtils} from '../utils/GraphicUtils';
import *  as FileSaver from 'file-saver';
import {GeoTrailService, RectangleDto} from "../service/geo-trail-service";

export interface View {
    NONE, TRAIL, PLACE_IN_TRAIL
}

export enum TrailSimplifierLevel {
    NONE = "none",
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    FULL = "full"
}
@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

    // static TRAIL_LIST_COLUMN_ID = "trail-list-column"
    static TRAIL_DETAILS_ID = "trail-detail-column";

    // Bound elements
    trailPreviewList: TrailPreview[];
    selectedTrail: TrailDto;
    trailList: TrailDto[];

    selectedTileLayer: string;
    selectedTrailBinaryPath: string;
    trailNotifications: AccessibilityNotification[];
    lastMaintenance: Maintenance;
    userPosition: UserCoordinates;
    highlightedLocation: TrailCoordinates;

    isTrailSelectedVisible: boolean = false;
    isTrailFullScreenVisible: boolean = false;
    isTrailListVisible: boolean = false;
    isAllTrailVisible: boolean = true;
    isNotificationModalVisible: boolean = false;
    isUserPositionToggled: boolean = false;
    isLoading: boolean = false;

    zoomLevel = 12;

    constructor(
        private trailService: TrailService,
        private geoTrailService: GeoTrailService,
        private trailPreviewService: TrailPreviewService,
        private accessibilityService: NotificationService,
        private maintenanceService: MaintenanceService,
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.changeTileLayer("topo");
        this.trailPreviewList = [];
        this.trailList = [];
        this.handleQueryParam();
    }

    private handleQueryParam() {
        const idFromPath: string = this.route.snapshot.paramMap.get("id");
        this.selectTrails(idFromPath);
    }

    ngAfterViewInit(): void {
        let fullSize = GraphicUtils.getFullHeightSizeWOMenuImage();
        console.log(fullSize);
        document.getElementById(MapComponent.TRAIL_DETAILS_ID).style.minHeight = fullSize.toString() + "px";
        document.getElementById(MapComponent.TRAIL_DETAILS_ID).style.height = fullSize.toString() + "px";
    }

    loadPreviews(): void {
        this.trailPreviewService.getPreviews(0, 10).subscribe(previewResponse => {
            this.trailPreviewList = previewResponse.content;
            console.log(this.trailPreviewList)
        });
    }

    selectTrails(_id: string): void {
        let singletonTrail = this.trailList.filter(t=> t.id == _id);
        if(singletonTrail.length > 0) {
            this.selectedTrail = singletonTrail[0];
        }
    }

    loadNotificationsForTrail(code: string): void {
        this.accessibilityService.getUnresolvedByTrailByCode(code).subscribe(notificationResponse => {
            this.trailNotifications = notificationResponse.content
        });
    }

    loadLastMaintenaceForTrail(code: string): void {
        this.maintenanceService.getPastForTrail(code).subscribe(maintenanceResponse => {
            this.lastMaintenance = maintenanceResponse.content[0]
        });
    }

    loadBinaryPath(): void {
        this.trailService.downloadGpx(this.selectedTrail.code).subscribe(response => {
            let blob: any = new Blob([response], {type: 'text/json; charset=utf-8'});
            const url = window.URL.createObjectURL(blob);
            FileSaver.saveAs(blob, this.selectedTrail.code + ".gpx");
        });
    }

    onDownloadBinary(): void {
        this.loadBinaryPath();
    }

    changeTileLayer(type: string): void {
        this.selectedTileLayer = type;
    }

    toggleNotificationsModal(): void {
        this.isNotificationModalVisible = !this.isNotificationModalVisible;
    }

    toggleFullPageTrail(): void {
        this.isTrailFullScreenVisible = !this.isTrailFullScreenVisible;
    }

    toggleUserPosition(): void {
        this.isUserPositionToggled = !this.isTrailFullScreenVisible;

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.userPosition = new UserCoordinates(
                    position.coords.latitude,
                    position.coords.longitude)
            }, (error) => alert(error))
        }
    }

    navigateToLocation(location: TrailCoordinates) {
        this.highlightedLocation = location;
    }

    toggleList(): void {
        this.isTrailListVisible = !this.isTrailListVisible;
        if (this.trailPreviewList.length == 0 && this.isTrailListVisible) {
            this.loadPreviews();
        }
    }

    toggleAllTrails(): void {
        this.isAllTrailVisible = !this.isAllTrailVisible;
        if (this.trailList.length == 0 && this.isAllTrailVisible) {
            // this.loadAllTrails();
        }
    }

    geoLocateTrails($event: RectangleDto) {
        if(!$event) { return; }
        this.onLoading();
        let level = this.electTrailSimplifierLevel(this.zoomLevel);
        if(level == TrailSimplifierLevel.NONE) return;
        this.geoTrailService
            .locate($event, level.toUpperCase())
            .subscribe((e) => {
            this.trailList = e.content;
            this.onDoneLoading();
        });
    }

    onLoading() {
        this.isLoading = true;
    }

    onDoneLoading() {
        this.isLoading = false;
    }

    onZoomChange(zoomLevel: number) {
        this.zoomLevel = zoomLevel;
    }

    electTrailSimplifierLevel(zoom : number) : TrailSimplifierLevel {
        if(zoom <= 10) return TrailSimplifierLevel.NONE;
        if(zoom < 12) return TrailSimplifierLevel.LOW;
        if(zoom <= 15) return TrailSimplifierLevel.MEDIUM;
        if(zoom >= 16) return TrailSimplifierLevel.HIGH;
    }
}
