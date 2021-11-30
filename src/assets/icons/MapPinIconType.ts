import * as L from "leaflet";

export enum MapPinIconType {
  PIN,
  CROSSWAY_ICON,
  ALERT_PIN,
  VIEW_PIN,
  RUIN_PIN,
  WATER_PIN,
  START_ICON,
  END_ICON,
}

export class CrossWayIcon {
  public static get() {
    return L.divIcon({
      html: `
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#0B2E20" class="bi bi-signpost-2-fill" viewBox="0 0 16 16">
      <path d="M7.293.707A1 1 0 0 0 7 1.414V2H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h5v1H2.5a1 1 0 0 0-.8.4L.725 8.7a.5.5 0 0 0 0 .6l.975 1.3a1 1 0 0 0 .8.4H7v5h2v-5h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H9V6h4.5a1 1 0 0 0 .8-.4l.975-1.3a.5.5 0 0 0 0-.6L14.3 2.4a1 1 0 0 0-.8-.4H9v-.586A1 1 0 0 0 7.293.707z"/>
    </svg>`,
      className: "",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });
  }
}

export class PinIcon {
  public static get(color = "#D04341") {
    return L.divIcon({
      html: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="32" viewBox="0 0 52 64">
        <g fill="none">
          <path fill="`+ color +`" d="M26.7090909,0 C26.4727273,0 26.2363636,0 26,0 C11.5818182,0 0,11.6148148 0,26.0740741 C0,45.2740741 20.8,60.9185185 24.3454545,63.2888889 C24.5818182,63.5259259 24.8181818,63.762963 25.0545455,63.762963 C25.2909091,64 25.7636364,64 26.2363636,64 C26.7090909,64 27.1818182,63.762963 27.6545455,63.5259259 C28.3636364,63.0518519 52,46.4592593 52,26.0740741 C52,11.8518519 40.6545455,0.474074074 26.7090909,0 Z"/>
          <path fill="#FFF" d="M26,13.037037 C19.3818182,13.037037 14.1818182,18.2518519 14.1818182,24.8888889 C14.1818182,31.5259259 19.3818182,36.7407407 26,36.7407407 C32.6181818,36.7407407 37.8181818,31.5259259 37.8181818,24.8888889 C37.8181818,18.2518519 32.6181818,13.037037 26,13.037037 Z"/>
        </g>
      </svg>
      `,
      className: "",
      iconSize: [26, 32],
      iconAnchor: [16, 16],
    });
  }
}

export class AlertPinIcon {
  public static get() {
    return L.divIcon({
      html: `<svg xmlns="http://www.w3.org/2000/svg" width="52" height="64" viewBox="0 0 52 64">
        <g fill="none" fill-rule="evenodd">
          <g fill-rule="nonzero">
            <path fill="#ECC333" d="M26.7090909,0 C26.4727273,0 26.2363636,0 26,0 C11.5818182,0 0,11.6148148 0,26.0740741 C0,45.2740741 20.8,60.9185185 24.3454545,63.2888889 C24.5818182,63.5259259 24.8181818,63.762963 25.0545455,63.762963 C25.2909091,64 25.7636364,64 26.2363636,64 C26.7090909,64 27.1818182,63.762963 27.6545455,63.5259259 C28.3636364,63.0518519 52,46.4592593 52,26.0740741 C52,11.8518519 40.6545455,0.474074074 26.7090909,0 Z"/>
            <path fill="#FFF" d="M26,4.88888889 C14.8318182,4.88888889 6.05681818,13.6888889 6.05681818,24.8888889 C6.05681818,36.0888889 14.8318182,44.8888889 26,44.8888889 C37.1681818,44.8888889 45.9431818,36.0888889 45.9431818,24.8888889 C45.9431818,13.6888889 37.1681818,4.88888889 26,4.88888889 Z"/>
          </g>
          <path fill="#ECC333" fill-rule="nonzero" d="M17.2765096,1.87190854 C16.6006218,0.713557358 15.35164,0 14,0 C12.6483538,0 11.399372,0.713557358 10.7234841,1.87190854 L0.506793274,19.3839992 C-0.168968305,20.5424138 -0.168928597,21.9695931 0.506897442,23.1279709 C1.18272348,24.2863487 2.43167055,25 3.78330602,25 L24.216694,25 C25.5683294,25 26.8172765,24.2863487 27.4931026,23.1279709 C28.1689286,21.9695931 28.1689683,20.5424138 27.4932067,19.3839992 L17.2765096,1.87190854 Z M13.9999969,21.9676306 C13.1940115,21.9676306 12.5406399,21.3210335 12.5406399,20.5234265 C12.5406399,19.7258196 13.1940281,19.0792388 14.0000135,19.0792388 C14.8059988,19.0792388 15.4593725,19.7258339 15.4593725,20.5234409 C15.4593725,20.9064665 15.3056168,21.2738041 15.0319304,21.5446427 C14.7582439,21.8154812 14.3870459,21.9676306 13.9999969,21.9676306 L13.9999969,21.9676306 Z M16.06044,7.4767531 L15.5450126,16.1481903 C15.496893,16.9577671 14.8194357,17.589907 13.9999409,17.589907 C13.180446,17.589907 12.5029887,16.9577671 12.4548692,16.1481903 L11.9394199,7.4767531 C11.8944135,6.71964287 12.2770051,6.00018466 12.9330825,5.60818408 C13.5891599,5.21618351 14.4107,5.21618351 15.0667774,5.60818408 C15.7228549,6.00018466 16.1054464,6.71964287 16.06044,7.4767531 Z" transform="translate(12 10)"/>
        </g>
      </svg>
      `,
      className: "",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
    });
  }
}

export class StartIcon {
  public static get() {
    return L.divIcon({
      html: `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle" viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
      </svg>`,
      className: "",
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });
  }
}

export class EndIcon {
  public static get() {
    return L.divIcon({
      html: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-circle-fill" viewBox="0 0 16 16">
    <circle cx="8" cy="8" r="8"/>
  </svg>`,
      className: "",
      iconSize: [16, 16],
      iconAnchor: [8, 8],
    });
  }
}
