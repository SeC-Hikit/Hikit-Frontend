import {Component, OnInit} from "@angular/core";
import * as moment from "moment";
import {AuthService} from "src/app/service/auth.service";
import {AccessibilityReport, ReportService,} from "src/app/service/report-service.service";
import {TrailPreviewService} from "src/app/service/trail-preview-service.service";
import {TrailDto, TrailMappingDto, TrailService} from "src/app/service/trail-service.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmModalComponent} from "../../../modal/confirm-modal/confirm-modal.component";
import {AdminReportService} from "../../../service/admin-report.service";
import {Router} from "@angular/router";
import {InfoModalComponent} from "../../../modal/info-modal/info-modal.component";
import {Marker} from "../../../map-preview/map-preview.component";
import {Coordinates2D} from "../../../service/geo-trail-service";
import {MapPinIconType} from "../../../../assets/icons/MapPinIconType";

@Component({
    selector: "app-accessibility-report-view",
    templateUrl: "./accessibility-report-view.component.html",
    styleUrls: ["./accessibility-report-view.component.scss"],
})
export class AccessibilityReportViewComponent implements OnInit {

    unapgradedPage = 1;
    upgradedPage = 1;

    hasLoaded = false;
    entryPerPage = 10;
    isLoading = false;
    isPreviewVisible: boolean = false;

    totalUnresolvedNotifications: number;
    totalUpgradedNotifications: number;

    selectedTrail: TrailDto;
    trailMapping: TrailMappingDto[] = [];

    unresolvedNotifications: AccessibilityReport[] = [];
    upgradedNotifications: AccessibilityReport[] = [];
    markers: Marker[] = [];

    constructor(
        private authService: AuthService,
        private reportService: ReportService,
        private trailPreviewService: TrailPreviewService,
        private trailService: TrailService,
        private adminReportService: AdminReportService,
        private modalService: NgbModal,
        private route: Router
    ) {}

    ngOnInit(): void {
        let realm = this.authService.getRealm();
        this.trailPreviewService.getMappings(realm)
            .subscribe((resp) => {
                this.trailMapping = resp.content;
                this.loadUnapgraded(1);
                this.loadUpgraded(1);
            })
    }

    loadUnapgraded(page: number) {
        this.unapgradedPage = page;
        const lowerBound = this.entryPerPage * (page - 1);
        this.getUnapgraded(lowerBound, this.entryPerPage * page);
    }

    loadUpgraded(page: number) {
        this.upgradedPage = page;
        const lowerBound = this.entryPerPage * (page - 1);
        this.getUpgraded(lowerBound, this.entryPerPage * page);
    }


    private getUnapgraded(skip: number, limit: number) {
        this.hasLoaded = false;
        this.reportService
            .getUnapgradedByRealm(skip, limit, this.authService.getRealm())
            .subscribe((x) => {
                this.unresolvedNotifications = x.content;
                this.totalUnresolvedNotifications = x.totalPages;
                this.hasLoaded = true;
            });
    }

    private getUpgraded(skip: number, limit: number) {
        this.hasLoaded = false;
        this.reportService
            .getUpgradedByRealm(skip, limit, this.authService.getRealm())
            .subscribe((x) => {
                this.upgradedNotifications = x.content;
                this.totalUpgradedNotifications = x.totalPages;
                this.hasLoaded = true;
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

    formatDate(dateString: string): string {
        return moment(dateString).format("DD/MM/YYYY");
    }

    showPreview(trailId: string, coordinates: Coordinates2D) {
        this.trailService.getTrailById(trailId).subscribe(
            trailResp => {
                this.selectedTrail = trailResp.content[0];
                this.markers = [{
                    color: "yellow",
                    icon: MapPinIconType.ALERT_PIN,
                    coords: coordinates
                }]
                this.togglePreview();
            }
        );
    }

    togglePreview() {
        this.isPreviewVisible = !this.isPreviewVisible;
    }

    onUpgradeClick(unresolvedNotification: AccessibilityReport) {
        const modal = this.modalService.open(ConfirmModalComponent);
        modal.componentInstance.title = `Sei sicuro di volere promuovere la notifica?`;
        modal.componentInstance.body = this.getUpgradeModalBody(unresolvedNotification);
        modal.componentInstance.onOk.subscribe(() => {
            this.adminReportService.upgrade(unresolvedNotification.id).subscribe((resp)=>{
                if(resp.status == "OK"){
                    this.loadUnapgraded(this.unapgradedPage);
                } else {

                }
            });
        })

        modal.componentInstance.onCancel.subscribe(() => {})
    }

    onDeleteClick(notification: AccessibilityReport) {
        this.adminReportService.delete(notification.id).subscribe((resp)=>{
            if(resp.status == "OK"){
                this.loadUnapgraded(this.unapgradedPage);
            } else {

            }
        })
    }

    private getUpgradeModalBody(unresolvedNotification: AccessibilityReport) {
        return `Promuovere la segnalazione '<b>${unresolvedNotification.description}</b>' su sentiero '<b>${this.getTrailCode(unresolvedNotification.trailId)}</b>',<br/>` +
            `riportata dall'utente pubblico con email <b>${unresolvedNotification.email}</b>?`;
    }

    onViewNotificationClick(notification: AccessibilityReport) {
        this.isLoading = true;
        const modal = this.modalService.open(InfoModalComponent);
        modal.componentInstance.title = `Dettagli per la notifica riguardo sentiero '${this.getTrailCode(notification.trailId)}'`;
        modal.componentInstance.body = `La notifica con id '<b>${notification.id}</b>' è stata promossa a notifica di accessibilità.<br/>` +
        ``;
    }
}
