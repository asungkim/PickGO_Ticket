/* tslint:disable */
/* eslint-disable */
/**
 * PickGO API Document
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from "../runtime"
import type { PageResponseMemberLogResponse } from "./PageResponseMemberLogResponse"
import {
  PageResponseMemberLogResponseFromJSON,
  PageResponseMemberLogResponseFromJSONTyped,
  PageResponseMemberLogResponseToJSON,
  PageResponseMemberLogResponseToJSONTyped,
} from "./PageResponseMemberLogResponse"

/**
 *
 * @export
 * @interface RsDataPageResponseMemberLogResponse
 */
export interface RsDataPageResponseMemberLogResponse {
  /**
   *
   * @type {number}
   * @memberof RsDataPageResponseMemberLogResponse
   */
  code?: number
  /**
   *
   * @type {string}
   * @memberof RsDataPageResponseMemberLogResponse
   */
  message?: string
  /**
   *
   * @type {PageResponseMemberLogResponse}
   * @memberof RsDataPageResponseMemberLogResponse
   */
  data?: PageResponseMemberLogResponse
}

/**
 * Check if a given object implements the RsDataPageResponseMemberLogResponse interface.
 */
export function instanceOfRsDataPageResponseMemberLogResponse(
  value: object,
): value is RsDataPageResponseMemberLogResponse {
  return true
}

export function RsDataPageResponseMemberLogResponseFromJSON(
  json: any,
): RsDataPageResponseMemberLogResponse {
  return RsDataPageResponseMemberLogResponseFromJSONTyped(json, false)
}

export function RsDataPageResponseMemberLogResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): RsDataPageResponseMemberLogResponse {
  if (json == null) {
    return json
  }
  return {
    code: json["code"] == null ? undefined : json["code"],
    message: json["message"] == null ? undefined : json["message"],
    data:
      json["data"] == null
        ? undefined
        : PageResponseMemberLogResponseFromJSON(json["data"]),
  }
}

export function RsDataPageResponseMemberLogResponseToJSON(
  json: any,
): RsDataPageResponseMemberLogResponse {
  return RsDataPageResponseMemberLogResponseToJSONTyped(json, false)
}

export function RsDataPageResponseMemberLogResponseToJSONTyped(
  value?: RsDataPageResponseMemberLogResponse | null,
  ignoreDiscriminator: boolean = false,
): any {
  if (value == null) {
    return value
  }

  return {
    code: value["code"],
    message: value["message"],
    data: PageResponseMemberLogResponseToJSON(value["data"]),
  }
}
