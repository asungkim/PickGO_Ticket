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
import type { PostUpdateResponse } from "./PostUpdateResponse"
import {
  PostUpdateResponseFromJSON,
  PostUpdateResponseFromJSONTyped,
  PostUpdateResponseToJSON,
  PostUpdateResponseToJSONTyped,
} from "./PostUpdateResponse"

/**
 *
 * @export
 * @interface RsDataPostUpdateResponse
 */
export interface RsDataPostUpdateResponse {
  /**
   *
   * @type {number}
   * @memberof RsDataPostUpdateResponse
   */
  code?: number
  /**
   *
   * @type {string}
   * @memberof RsDataPostUpdateResponse
   */
  message?: string
  /**
   *
   * @type {PostUpdateResponse}
   * @memberof RsDataPostUpdateResponse
   */
  data?: PostUpdateResponse
}

/**
 * Check if a given object implements the RsDataPostUpdateResponse interface.
 */
export function instanceOfRsDataPostUpdateResponse(
  value: object,
): value is RsDataPostUpdateResponse {
  return true
}

export function RsDataPostUpdateResponseFromJSON(
  json: any,
): RsDataPostUpdateResponse {
  return RsDataPostUpdateResponseFromJSONTyped(json, false)
}

export function RsDataPostUpdateResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): RsDataPostUpdateResponse {
  if (json == null) {
    return json
  }
  return {
    code: json["code"] == null ? undefined : json["code"],
    message: json["message"] == null ? undefined : json["message"],
    data:
      json["data"] == null
        ? undefined
        : PostUpdateResponseFromJSON(json["data"]),
  }
}

export function RsDataPostUpdateResponseToJSON(
  json: any,
): RsDataPostUpdateResponse {
  return RsDataPostUpdateResponseToJSONTyped(json, false)
}

export function RsDataPostUpdateResponseToJSONTyped(
  value?: RsDataPostUpdateResponse | null,
  ignoreDiscriminator: boolean = false,
): any {
  if (value == null) {
    return value
  }

  return {
    code: value["code"],
    message: value["message"],
    data: PostUpdateResponseToJSON(value["data"]),
  }
}
