import {Component, OnInit} from "@angular/core";
import * as moment from "moment";
import {AccessibilityNotification, NotificationService,} from "src/app/service/notification-service.service";
import {TrailPreviewService,} from "src/app/service/trail-preview-service.service";
import {TrailDto, TrailMappingDto, TrailService} from "src/app/service/trail-service.service";
import {Status} from "src/app/Status";
import {AuthService} from "../../../service/auth.service";
import {AdminNotificationService} from "../../../service/admin-notification-service.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PromptModalComponent} from "../../../modal/prompt-modal/prompt-modal.component";
import {Marker} from "../../../map-preview/map-preview.component";
import {Coordinates2D} from "../../../service/geo-trail-service";
import {MapPinIconType} from "../../../../assets/icons/MapPinIconType";
import {PaginationUtils} from 'src/app/utils/PaginationUtils';
import {InfoModalComponent} from "../../../modal/info-modal/info-modal.component";
import {AnnouncementTopic} from "../../../service/announcement.service";

@Component({
    selector: "app-accessibility-notification-view",
    templateUrl: "./accessibility-notification-view.component.html",
    styleUrls: ["./accessibility-notification-view.component.scss"],
})
export class AccessibilityNotificationViewComponent implements OnInit {
    entryPerPage = 10;
    unresolvedPage = 1;
    solvedPage = 1;
    isLoading = false;

    realm: string = "";
    filterTrailId: string = ""

    totalUnresolvedNotification: number;
    totalSolvedNotification: number;
    isPreviewVisible: boolean = false;
    hasLoaded = false;

    trailMapping: TrailMappingDto[] = [];
    selectedTrail: TrailDto;
    unresolvedNotifications: AccessibilityNotification[];
    solvedNotifications: AccessibilityNotification[];
    markers: Marker[] = [];

    constructor(
        private notificationService: NotificationService,
        private adminNotificationService: AdminNotificationService,
        private trailPreviewService: TrailPreviewService,
        private trailService: TrailService,
        private modalService: NgbModal,
        public authService: AuthService,
    ) {
        this.unresolvedNotifications = [];
        this.solvedNotifications = [];
    }

    ngOnInit(): void {
        this.realm = this.authService.getInstanceRealm();
        this.trailPreviewService.getMappings(this.realm)
            .subscribe((resp) => {
                this.trailMapping = resp.content;
                this.loadNotification(1);
                this.loadSolvedNotification(1);
            })
    }

    loadNotification(page: number) {
        this.unresolvedPage = page;
        const lowerBound = this.entryPerPage * (page - 1);
        this.loadUnresolved(lowerBound, this.entryPerPage * page, this.realm, "");
    }

    loadSolvedNotification(page: number) {
        this.unresolvedPage = page;
        const lowerBound = this.entryPerPage * (page - 1);
        this.loadResolved(lowerBound, this.entryPerPage * page, this.authService.getInstanceRealm());
    }

    loadUnresolved(skip: number, limit: number, realm: string, trailId: string) {
        this.hasLoaded = false;
        if (trailId && trailId != "") {
            console.log(`Looking for trailId ${trailId}`)
            this.notificationService.getUnresolvedForTrailId(trailId).subscribe(
                (resp) => {
                    this.unresolvedNotifications = resp.content;
                    this.totalUnresolvedNotification = resp.totalCount;
                    this.hasLoaded = true;
                });
            return
        }
        this.notificationService.getUnresolved(skip, limit, realm).subscribe(
            (resp) => {
                this.unresolvedNotifications = resp.content;
                this.totalUnresolvedNotification = resp.totalCount;
                this.hasLoaded = true;
            });
    }

    private loadResolved(skip: number, limit: number, realm: string) {
        this.hasLoaded = false;
        this.notificationService.getResolved(skip, limit, realm).subscribe(
            (resp) => {
                this.solvedNotifications = resp.content;
                this.totalSolvedNotification = resp.totalCount;
                this.hasLoaded = true;
            });
    }


    formatDate(dateString: string): string {
        return moment(dateString).format("DD/MM/YYYY");
    }

    onDeleteClick(unresolvedNotification: AccessibilityNotification) {
        let isDeleting = confirm(
            "Sei sicuro di voler cancellare la segnalazione in data " +
            this.formatDate(unresolvedNotification.reportDate.toString()) +
            ", per il sentiero '" +
            unresolvedNotification.trailId +
            "'?"
        );
        if (isDeleting) {
            this.adminNotificationService
                .deleteById(unresolvedNotification.id)
                .subscribe((d) => {
                    if (d.status == Status.OK) this.removeFromList(unresolvedNotification);
                });
        }
    }

    removeFromList(unresolvedNotification: AccessibilityNotification): void {
        let i = this.unresolvedNotifications.indexOf(unresolvedNotification);
        this.unresolvedNotifications.splice(i, 1);
    }

    onResolveClick(unresolvedNotification: AccessibilityNotification) {
        const modal = this.modalService.open(PromptModalComponent);
        modal.componentInstance.title = `Risolvi notifica il per sentiero ${this.getTrailCode(unresolvedNotification.trailId)}`;
        modal.componentInstance.body = `Inserisci un messaggio risolutivo della notifica`;
        modal.componentInstance.onPromptOk.subscribe((valueResolution: string) => {
            if (valueResolution != null && valueResolution.length > 0) {
                unresolvedNotification.resolution = valueResolution;
                this.onResolve(unresolvedNotification);
            }
        });
        modal.componentInstance.onPromptCancel.subscribe(() => {
        })
    }

    onResolve(unresolvedNotification: AccessibilityNotification) {
        let resolutionDate = new Date();
        this.adminNotificationService
            .resolveNotification({
                id: unresolvedNotification.id,
                resolution: unresolvedNotification.resolution,
                resolutionDate: resolutionDate.toISOString(),
            })
            .subscribe((response) => {
                if (response.status == Status.OK) {
                    this.onResolvedSuccess();
                }
            });
    }

    getTrailCode(trailId) {
        const filtered = this.trailMapping
            .filter((tp) => tp.id == trailId);
        if (filtered.length > 0) {
            return filtered[0].code;
        }
        console.warn(`Could not find trail mapping for id: ${trailId}`)
        return "";
    }

    showPreview(trailId: string, coordinates: Coordinates2D) {
        this.trailService.getTrailById(trailId).subscribe(
            trailResp => {
                this.selectedTrail = trailResp.content[0];
                this.markers = [{
                    coords: coordinates,
                    icon: MapPinIconType.ALERT_PIN,
                    color: "yellow"
                }]
                this.togglePreview();
            }
        );
    }

    togglePreview() {
        this.isPreviewVisible = !this.isPreviewVisible;
    }

    onResolvedSuccess(): void {
        this.loadSolvedNotification(this.solvedPage);
        this.loadNotification(this.unresolvedPage);
    }

    copyId(id: string) {
        PaginationUtils.copyToClipboard(id).then(() => {
            const modal = this.modalService.open(InfoModalComponent);
            modal.componentInstance.title = "ID '" + id + "', copiato";
            if (this.authService.isRealmMatch()) {
                modal.componentInstance.body = PaginationUtils.getOptionsText(id,
                    AnnouncementTopic.ACCESSIBILITY_NOTIFICATION)
            }

        })
    }

    onTrailSearch(newTrailCode: string) {
        const filteredTrails =
            this.trailMapping.filter((it) =>
                it.code.toLowerCase() == newTrailCode.toLowerCase()
            );

        if (newTrailCode != "" && filteredTrails.length == 0) {
            this.unresolvedNotifications = []
        }
        if (filteredTrails.length > 0) {
            this.filterTrailId = filteredTrails[0].id
            this.loadUnresolved(0, 1000, this.realm, this.filterTrailId)
        }
    }
}
