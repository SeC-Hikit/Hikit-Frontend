/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/admin/trail/update": {
    put: operations["updateTrail"];
  };
  "/admin/trail/save": {
    put: operations["importTrail"];
  };
  "/admin/poi": {
    put: operations["create"];
    post: operations["update"];
  };
  "/admin/place": {
    put: operations["create_1"];
    post: operations["update_1"];
  };
  "/admin/place/media/{id}": {
    put: operations["addMedia"];
    post: operations["deleteMedia"];
  };
  "/admin/maintenance": {
    put: operations["create_2"];
  };
  "/admin/accessibility": {
    put: operations["create_3"];
  };
  "/place/geolocate": {
    post: operations["geolocatePlace"];
  };
  "/geo-trail/locate": {
    post: operations["geoLocateTrail"];
  };
  "/geo-trail/intersect": {
    post: operations["findTrailIntersection"];
  };
  "/admin/trail/status": {
    post: operations["updateTrailStatus"];
  };
  "/admin/trail/place/{id}": {
    post: operations["addPlaceToTrail"];
    delete: operations["removePlaceFromTrail"];
  };
  "/admin/trail/media/{id}": {
    post: operations["addMediaToTrail"];
    delete: operations["removeMediaFromTrail"];
  };
  "/admin/poi/media/{id}": {
    post: operations["addMediaToPoi"];
    delete: operations["removeMediaFromPoi"];
  };
  "/admin/media": {
    post: operations["upload"];
  };
  "/admin/import": {
    post: operations["importGpx"];
  };
  "/admin/import/bulk": {
    post: operations["importMassiveGpx"];
  };
  "/admin/accessibility/resolve": {
    post: operations["resolveNotification"];
  };
  "/trail": {
    get: operations["get"];
  };
  "/trail/{id}": {
    get: operations["getById"];
  };
  "/trail/place/{id}": {
    get: operations["getByPlaceId"];
  };
  "/trail/count": {
    get: operations["getCount"];
  };
  "/raw": {
    get: operations["get_1"];
  };
  "/raw/{id}": {
    get: operations["getById_1"];
  };
  "/preview": {
    get: operations["getTrailPreviews"];
  };
  "/preview/{id}": {
    get: operations["getPreviewById"];
  };
  "/preview/raw": {
    get: operations["getRawTrailPreviews"];
  };
  "/poi": {
    get: operations["get_2"];
  };
  "/poi/{id}": {
    get: operations["get_3"];
  };
  "/poi/type/{type}": {
    get: operations["getByMacro"];
  };
  "/poi/name/{name}": {
    get: operations["getByNameOrTags"];
  };
  "/poi/count": {
    get: operations["getCount_1"];
  };
  "/poi/code/{code}": {
    get: operations["getByTrail"];
  };
  "/place": {
    get: operations["get_4"];
  };
  "/place/{id}": {
    get: operations["get_5"];
  };
  "/place/name/{name}": {
    get: operations["getLikeNameOrTags"];
  };
  "/media/{id}": {
    get: operations["getById_2"];
  };
  "/maintenance/past": {
    get: operations["getPastMaintenance"];
  };
  "/maintenance/past/{id}": {
    get: operations["getPastMaintenanceById"];
  };
  "/maintenance/past/count": {
    get: operations["getCountPast"];
  };
  "/maintenance/future": {
    get: operations["getFutureMaintenance"];
  };
  "/maintenance/future/count": {
    get: operations["getCountFuture"];
  };
  "/maintenance/count": {
    get: operations["getCount_2"];
  };
  "/dataset": {
    get: operations["getTrailDatasetV"];
  };
  "/accessibility/unresolved": {
    get: operations["getNotSolved"];
  };
  "/accessibility/unresolved/{trailId}": {
    get: operations["getNotSolvedByTrailId"];
  };
  "/accessibility/solved": {
    get: operations["getSolved"];
  };
  "/accessibility/solved/{trailId}": {
    get: operations["getSolvedByTrailId"];
  };
  "/accessibility/count": {
    get: operations["getCount_3"];
  };
  "/admin/trail/{id}": {
    delete: operations["deleteById"];
  };
  "/admin/raw/{id}": {
    delete: operations["deleteById_1"];
  };
  "/admin/poi/{id}": {
    delete: operations["deletePoi"];
  };
  "/admin/place/{id}": {
    delete: operations["delete"];
  };
  "/admin/media/{id}": {
    delete: operations["deleteById_2"];
  };
  "/admin/maintenance/{id}": {
    delete: operations["deleteMaintenance"];
  };
  "/admin/accessibility/{id}": {
    delete: operations["deleteAccessibilityNotification"];
  };
}

export interface components {
  schemas: {
    CoordinatesDto: {
      longitude?: number;
      latitude?: number;
      altitude?: number;
    };
    CycloDetailsDto: {
      cycloClassification?:
        | "TC"
        | "TC_PLUS"
        | "MC"
        | "MC_PLUS"
        | "BC"
        | "BC_PLUS"
        | "OC"
        | "OC_PLUS"
        | "EC"
        | "NO"
        | "UNCLASSIFIED";
      officialEta?: number;
      wayForward?: components["schemas"]["CycloFeasibilityDto"];
      wayBack?: components["schemas"]["CycloFeasibilityDto"];
      description?: string;
    };
    CycloFeasibilityDto: {
      feasible?: boolean;
      portage?: number;
    };
    FileDetailsDto: {
      uploadedOn?: string;
      uploadedBy?: string;
      onInstance?: string;
      realm?: string;
      filename?: string;
      originalFilename?: string;
    };
    KeyValueDto: {
      key?: string;
      value?: string;
    };
    LinkedMediaDto: {
      id?: string;
      description?: string;
      keyVal?: components["schemas"]["KeyValueDto"][];
    };
    PlaceRefDto: {
      name?: string;
      coordinates?: components["schemas"]["CoordinatesDto"];
      placeId?: string;
    };
    StatsTrailMetadataDto: {
      totalRise?: number;
      totalFall?: number;
      eta?: number;
      length?: number;
      highestPlace?: number;
      lowestPlace?: number;
    };
    TrailCoordinatesDto: {
      distanceFromTrailStart?: number;
      latitude?: number;
      longitude?: number;
      altitude?: number;
    };
    TrailDto: {
      id?: string;
      code?: string;
      name?: string;
      description?: string;
      variant?: boolean;
      officialEta?: number;
      startLocation?: components["schemas"]["PlaceRefDto"];
      endLocation?: components["schemas"]["PlaceRefDto"];
      locations?: components["schemas"]["PlaceRefDto"][];
      classification?: "T" | "E" | "EE" | "EEA" | "UNCLASSIFIED";
      country?: string;
      statsTrailMetadata?: components["schemas"]["StatsTrailMetadataDto"];
      coordinates?: components["schemas"]["TrailCoordinatesDto"][];
      mediaList?: components["schemas"]["LinkedMediaDto"][];
      lastUpdate?: string;
      territorialDivision?: string;
      maintainingSection?: string;
      status?: "DRAFT" | "PUBLIC";
      fileDetails?: components["schemas"]["FileDetailsDto"];
      cycloDetails?: components["schemas"]["CycloDetailsDto"];
    };
    TrailResponse: {
      currentPage?: number;
      totalPages?: number;
      size?: number;
      totalCount?: number;
      status?: "OK" | "ERROR";
      messages?: string[];
      content?: components["schemas"]["TrailDto"][];
    };
    TrailImportDto: {
      code?: string;
      name?: string;
      description?: string;
      officialEta?: number;
      startLocation?: components["schemas"]["PlaceRefDto"];
      endLocation?: components["schemas"]["PlaceRefDto"];
      locations?: components["schemas"]["PlaceRefDto"][];
      classification?: "T" | "E" | "EE" | "EEA" | "UNCLASSIFIED";
      country?: string;
      coordinates?: components["schemas"]["TrailCoordinatesDto"][];
      maintainingSection?: string;
      territorialDivision?: string;
      linkedMediaDtos?: components["schemas"]["LinkedMediaDto"][];
      lastUpdate?: string;
      fileDetailsDto?: components["schemas"]["FileDetailsDto"];
      trailStatus?: "DRAFT" | "PUBLIC";
      variant?: boolean;
    };
    PoiDto: {
      id?: string;
      name?: string;
      description?: string;
      tags?: string[];
      macroType?: "BELVEDERE" | "SUPPORT" | "CULTURAL";
      microType?: string[];
      mediaList?: components["schemas"]["LinkedMediaDto"][];
      trailIds?: string[];
      coordinates?: components["schemas"]["CoordinatesDto"];
      createdOn?: string;
      lastUpdatedOn?: string;
      externalResources?: string[];
      keyVal?: components["schemas"]["KeyValueDto"][];
      recordDetails?: components["schemas"]["RecordDetailsDto"];
    };
    RecordDetailsDto: {
      uploadedOn?: string;
      uploadedBy?: string;
      onInstance?: string;
      realm?: string;
    };
    PoiResponse: {
      currentPage?: number;
      totalPages?: number;
      size?: number;
      totalCount?: number;
      status?: "OK" | "ERROR";
      messages?: string[];
      content?: components["schemas"]["PoiDto"][];
    };
    PlaceDto: {
      id?: string;
      name?: string;
      description?: string;
      tags?: string[];
      mediaIds?: string[];
      coordinates?: components["schemas"]["CoordinatesDto"][];
      crossingTrailIds?: string[];
      recordDetails?: components["schemas"]["RecordDetailsDto"];
    };
    PlaceResponse: {
      currentPage?: number;
      totalPages?: number;
      size?: number;
      totalCount?: number;
      status?: "OK" | "ERROR";
      messages?: string[];
      content?: components["schemas"]["PlaceDto"][];
    };
    MaintenanceDto: {
      id?: string;
      date?: string;
      trailId?: string;
      meetingPlace?: string;
      description?: string;
      contact?: string;
      recordDetails?: components["schemas"]["RecordDetailsDto"];
    };
    MaintenanceResponse: {
      currentPage?: number;
      totalPages?: number;
      size?: number;
      totalCount?: number;
      status?: "OK" | "ERROR";
      messages?: string[];
      content?: components["schemas"]["MaintenanceDto"][];
    };
    AccessibilityNotificationDto: {
      id?: string;
      description?: string;
      trailId?: string;
      reportDate?: string;
      resolutionDate?: string;
      minor?: boolean;
      resolution?: string;
      coordinates?: components["schemas"]["CoordinatesDto"];
      recordDetails?: components["schemas"]["RecordDetailsDto"];
    };
    AccessibilityResponse: {
      currentPage?: number;
      totalPages?: number;
      size?: number;
      totalCount?: number;
      status?: "OK" | "ERROR";
      messages?: string[];
      content?: components["schemas"]["AccessibilityNotificationDto"][];
    };
    PointGeolocationDto: {
      coordinatesDto?: components["schemas"]["CoordinatesDto"];
      distance?: number;
    };
    Coordinates2D: {
      latitude?: number;
      longitude?: number;
    };
    RectangleDto: {
      bottomLeft?: components["schemas"]["Coordinates2D"];
      topRight?: components["schemas"]["Coordinates2D"];
    };
    GeoLineDto: {
      coordinates?: components["schemas"]["Coordinates2D"][];
    };
    TrailIntersectionDto: {
      points?: components["schemas"]["CoordinatesDto"][];
      trail?: components["schemas"]["TrailDto"];
    };
    TrailIntersectionResponse: {
      currentPage?: number;
      totalPages?: number;
      size?: number;
      totalCount?: number;
      status?: "OK" | "ERROR";
      messages?: string[];
      content?: components["schemas"]["TrailIntersectionDto"][];
    };
    UnLinkeMediaRequestDto: {
      id?: string;
    };
    MediaDto: {
      creationDate?: string;
      id?: string;
      name?: string;
      fileName?: string;
      fileUrl?: string;
      mime?: string;
      fileSize?: number;
      fileDetails?: components["schemas"]["FileDetailsDto"];
    };
    MediaResponse: {
      currentPage?: number;
      totalPages?: number;
      size?: number;
      totalCount?: number;
      status?: "OK" | "ERROR";
      messages?: string[];
      content?: components["schemas"]["MediaDto"][];
    };
    TrailRawDto: {
      id?: string;
      name?: string;
      description?: string;
      startPos?: components["schemas"]["TrailCoordinatesDto"];
      finalPos?: components["schemas"]["TrailCoordinatesDto"];
      coordinates?: components["schemas"]["TrailCoordinatesDto"][];
      fileDetails?: components["schemas"]["FileDetailsDto"];
    };
    TrailRawResponse: {
      currentPage?: number;
      totalPages?: number;
      size?: number;
      totalCount?: number;
      status?: "OK" | "ERROR";
      messages?: string[];
      content?: components["schemas"]["TrailRawDto"][];
    };
    AccessibilityNotificationResolutionDto: {
      id?: string;
      resolution?: string;
      resolutionDate?: string;
    };
    CountDto: {
      count?: number;
    };
    CountResponse: {
      status?: "OK" | "ERROR";
      message?: string[];
      content?: components["schemas"]["CountDto"];
    };
    TrailPreviewDto: {
      id?: string;
      code?: string;
      classification?: "T" | "E" | "EE" | "EEA" | "UNCLASSIFIED";
      startPos?: components["schemas"]["PlaceRefDto"];
      finalPos?: components["schemas"]["PlaceRefDto"];
      bikeData?: boolean;
      trailStatus?: "DRAFT" | "PUBLIC";
      fileDetails?: components["schemas"]["FileDetailsDto"];
    };
    TrailPreviewResponse: {
      currentPage?: number;
      totalPages?: number;
      size?: number;
      totalCount?: number;
      status?: "OK" | "ERROR";
      messages?: string[];
      content?: components["schemas"]["TrailPreviewDto"][];
    };
    TrailDatasetVersion: {
      version?: number;
      lastUpdate?: string;
    };
  };
}

export interface operations {
  updateTrail: {
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["TrailResponse"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["TrailDto"];
      };
    };
  };
  importTrail: {
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": components["schemas"]["TrailResponse"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["TrailImportDto"];
      };
    };
  };
  create: {
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["PoiResponse"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["PoiDto"];
      };
    };
  };
  update: {
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["PoiResponse"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["PoiDto"];
      };
    };
  };
  create_1: {
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["PlaceResponse"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["PlaceDto"];
      };
    };
  };
  update_1: {
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["PlaceResponse"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["PlaceDto"];
      };
    };
  };
  addMedia: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["PlaceResponse"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["LinkedMediaDto"];
      };
    };
  };
  deleteMedia: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["PlaceResponse"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UnLinkeMediaRequestDto"];
      };
    };
  };
  create_2: {
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["MaintenanceResponse"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["MaintenanceDto"];
      };
    };
  };
  create_3: {
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": components["schemas"]["AccessibilityResponse"];
          "application/xml": components["schemas"]["AccessibilityResponse"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["AccessibilityNotificationDto"];
        "application/xml": components["schemas"]["AccessibilityNotificationDto"];
      };
    };
  };
  geolocatePlace: {
    parameters: {
      query: {
        skip?: number;
        limit?: number;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["PlaceResponse"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["PointGeolocationDto"];
      };
    };
  };
  geoLocateTrail: {
    parameters: {
      query: {
        level: "LOW" | "MEDIUM" | "HIGH" | "FULL";
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["TrailResponse"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["RectangleDto"];
      };
    };
  };
  findTrailIntersection: {
    parameters: {
      query: {
        skip?: number;
        limit?: number;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["TrailIntersectionResponse"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["GeoLineDto"];
      };
    };
  };
  updateTrailStatus: {
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["TrailResponse"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["TrailDto"];
      };
    };
  };
  addPlaceToTrail: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["TrailResponse"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["PlaceRefDto"];
      };
    };
  };
  removePlaceFromTrail: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["TrailResponse"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["PlaceRefDto"];
      };
    };
  };
  addMediaToTrail: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["TrailResponse"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["LinkedMediaDto"];
      };
    };
  };
  removeMediaFromTrail: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["TrailResponse"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UnLinkeMediaRequestDto"];
      };
    };
  };
  addMediaToPoi: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["PoiResponse"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["LinkedMediaDto"];
      };
    };
  };
  removeMediaFromPoi: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["PoiResponse"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UnLinkeMediaRequestDto"];
      };
    };
  };
  upload: {
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": components["schemas"]["MediaResponse"];
        };
      };
    };
    requestBody: {
      content: {
        "multipart/form-data": {
          file?: string;
        };
      };
    };
  };
  importGpx: {
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": components["schemas"]["TrailRawResponse"];
        };
      };
    };
    requestBody: {
      content: {
        "multipart/form-data": {
          file?: string;
        };
      };
    };
  };
  importMassiveGpx: {
    parameters: {
      query: {
        files: string[];
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "application/json": components["schemas"]["TrailRawResponse"];
        };
      };
    };
  };
  resolveNotification: {
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["AccessibilityResponse"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["AccessibilityNotificationResolutionDto"];
      };
    };
  };
  get: {
    parameters: {
      query: {
        skip?: number;
        limit?: number;
        realm?: string;
        level?: "LOW" | "MEDIUM" | "HIGH" | "FULL";
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["TrailResponse"];
        };
      };
    };
  };
  getById: {
    parameters: {
      path: {
        id: string;
      };
      query: {
        level?: "LOW" | "MEDIUM" | "HIGH" | "FULL";
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["TrailResponse"];
        };
      };
    };
  };
  getByPlaceId: {
    parameters: {
      path: {
        id: string;
      };
      query: {
        level?: string;
        skip?: number;
        limit?: number;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["TrailResponse"];
        };
      };
    };
  };
  getCount: {
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["CountResponse"];
        };
      };
    };
  };
  get_1: {
    parameters: {
      query: {
        skip?: number;
        limit?: number;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["TrailRawResponse"];
        };
      };
    };
  };
  getById_1: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["TrailRawResponse"];
        };
      };
    };
  };
  getTrailPreviews: {
    parameters: {
      query: {
        skip?: number;
        limit?: number;
        realm?: string;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["TrailPreviewResponse"];
        };
      };
    };
  };
  getPreviewById: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["TrailPreviewResponse"];
        };
      };
    };
  };
  getRawTrailPreviews: {
    parameters: {
      query: {
        skip?: number;
        limit?: number;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["TrailPreviewResponse"];
        };
      };
    };
  };
  get_2: {
    parameters: {
      query: {
        skip?: number;
        limit?: number;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["PoiResponse"];
        };
      };
    };
  };
  get_3: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["PoiResponse"];
        };
      };
    };
  };
  getByMacro: {
    parameters: {
      path: {
        type: string;
      };
      query: {
        skip?: number;
        limit?: number;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["PoiResponse"];
        };
      };
    };
  };
  getByNameOrTags: {
    parameters: {
      path: {
        name: string;
      };
      query: {
        skip?: number;
        limit?: number;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["PoiResponse"];
        };
      };
    };
  };
  getCount_1: {
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["CountResponse"];
        };
      };
    };
  };
  getByTrail: {
    parameters: {
      path: {
        code: string;
      };
      query: {
        skip?: number;
        limit?: number;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["PoiResponse"];
        };
      };
    };
  };
  get_4: {
    parameters: {
      query: {
        skip?: number;
        limit?: number;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["PlaceResponse"];
        };
      };
    };
  };
  get_5: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["PlaceResponse"];
        };
      };
    };
  };
  getLikeNameOrTags: {
    parameters: {
      path: {
        name: string;
      };
      query: {
        skip?: number;
        limit?: number;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["PlaceResponse"];
        };
      };
    };
  };
  getById_2: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["MediaResponse"];
        };
      };
    };
  };
  getPastMaintenance: {
    parameters: {
      query: {
        skip?: number;
        limit?: number;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["MaintenanceResponse"];
        };
      };
    };
  };
  getPastMaintenanceById: {
    parameters: {
      path: {
        id: string;
      };
      query: {
        skip?: number;
        limit?: number;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["MaintenanceResponse"];
        };
      };
    };
  };
  getCountPast: {
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["CountResponse"];
        };
      };
    };
  };
  getFutureMaintenance: {
    parameters: {
      query: {
        skip?: number;
        limit?: number;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["MaintenanceResponse"];
        };
      };
    };
  };
  getCountFuture: {
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["CountResponse"];
        };
      };
    };
  };
  getCount_2: {
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["CountResponse"];
        };
      };
    };
  };
  getTrailDatasetV: {
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["TrailDatasetVersion"];
        };
      };
    };
  };
  getNotSolved: {
    parameters: {
      query: {
        skip?: number;
        limit?: number;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["AccessibilityResponse"];
        };
      };
    };
  };
  getNotSolvedByTrailId: {
    parameters: {
      path: {
        trailId: string;
      };
      query: {
        skip?: number;
        limit?: number;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["AccessibilityResponse"];
        };
      };
    };
  };
  getSolved: {
    parameters: {
      query: {
        skip?: number;
        limit?: number;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["AccessibilityResponse"];
        };
      };
    };
  };
  getSolvedByTrailId: {
    parameters: {
      path: {
        trailId: string;
      };
      query: {
        skip?: number;
        limit?: number;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["AccessibilityResponse"];
        };
      };
    };
  };
  getCount_3: {
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["CountResponse"];
        };
      };
    };
  };
  deleteById: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["TrailResponse"];
        };
      };
    };
  };
  deleteById_1: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["TrailRawResponse"];
        };
      };
    };
  };
  deletePoi: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["PoiResponse"];
        };
      };
    };
  };
  delete: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["PlaceResponse"];
        };
      };
    };
  };
  deleteById_2: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["MediaResponse"];
        };
      };
    };
  };
  deleteMaintenance: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["MaintenanceResponse"];
        };
      };
    };
  };
  deleteAccessibilityNotification: {
    parameters: {
      path: {
        id: string;
      };
    };
    responses: {
      /** OK */
      200: {
        content: {
          "*/*": components["schemas"]["AccessibilityResponse"];
        };
      };
    };
  };
}
