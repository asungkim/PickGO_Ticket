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
/**
 *
 * @export
 * @interface VenueResponse
 */
export interface VenueResponse {
  /**
   *
   * @type {string}
   * @memberof VenueResponse
   */
  name?: string
  /**
   *
   * @type {string}
   * @memberof VenueResponse
   */
  address?: string
}

/**
 * Check if a given object implements the VenueResponse interface.
 */
export function instanceOfVenueResponse(value: object): value is VenueResponse {
  return true
}

export function VenueResponseFromJSON(json: any): VenueResponse {
  return VenueResponseFromJSONTyped(json, false)
}

export function VenueResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): VenueResponse {
  if (json == null) {
    return json
  }
  return {
    name: json["name"] == null ? undefined : json["name"],
    address: json["address"] == null ? undefined : json["address"],
  }
}

export function VenueResponseToJSON(json: any): VenueResponse {
  return VenueResponseToJSONTyped(json, false)
}

export function VenueResponseToJSONTyped(
  value?: VenueResponse | null,
  ignoreDiscriminator: boolean = false,
): any {
  if (value == null) {
    return value
  }

  return {
    name: value["name"],
    address: value["address"],
  }
}
