import {Component, OnInit} from "@angular/core";
import {NavigationEnd, Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {Profile} from "../../admin/ProfileChecker";

@Component({
  selector: "app-menu-admin",
  templateUrl: "./menu-admin.component.html",
  styleUrls: ["./menu-admin.component.scss"],
})


export class MenuAdminComponent implements OnInit {

  userProfile: Profile = Profile.noProfile;

  // ngif inside menu-admin.component.html cannot get profile.noProfile
  // inside ProfileChecker
  noProfile: Profile = Profile.noProfile;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.router.events.subscribe((change) => {
      if (change instanceof NavigationEnd) {
        this.assignRolesToUser();
      }
    });
  }

  private assignRolesToUser() {
    this.authService.onIsAuth(
      () => {
        this.authService.getUserProfile().then((name: string): void => {
          if (name == "admin") {
            this.userProfile = Profile.admin;
          } else if (name == "maintainer") {
            this.userProfile = Profile.maintainer;
          } else if (name == "content_creator") {
            this.userProfile = Profile.contentCreator;
          } else if (name == "casual_volunteer") {
            this.userProfile = Profile.casualVolunteer;
          }
        });

        this.authService.getUsername().then((name) => {
          // this.usernameToShow = name;
        });
      },
      () => {
        this.userProfile = Profile.noProfile;
      }
    );
  }

  onLogoutClick(): void {
    //this.keycloakService.logout();
  }

  protected readonly profile = Profile;
}
