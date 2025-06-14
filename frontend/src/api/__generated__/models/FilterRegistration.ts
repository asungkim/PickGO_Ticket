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
 * @interface FilterRegistration
 */
export interface FilterRegistration {
  /**
   *
   * @type {Array<string>}
   * @memberof FilterRegistration
   */
  servletNameMappings?: Array<string>
  /**
   *
   * @type {Array<string>}
   * @memberof FilterRegistration
   */
  urlPatternMappings?: Array<string>
  /**
   *
   * @type {string}
   * @memberof FilterRegistration
   */
  name?: string
  /**
   *
   * @type {string}
   * @memberof FilterRegistration
   */
  className?: string
  /**
   *
   * @type {{ [key: string]: string; }}
   * @memberof FilterRegistration
   */
  initParameters?: { [key: string]: string }
}

/**
 * Check if a given object implements the FilterRegistration interface.
 */
export function instanceOfFilterRegistration(
  value: object,
): value is FilterRegistration {
  return true
}

export function FilterRegistrationFromJSON(json: any): FilterRegistration {
  return FilterRegistrationFromJSONTyped(json, false)
}

export function FilterRegistrationFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): FilterRegistration {
  if (json == null) {
    return json
  }
  return {
    servletNameMappings:
      json["servletNameMappings"] == null
        ? undefined
        : json["servletNameMappings"],
    urlPatternMappings:
      json["urlPatternMappings"] == null
        ? undefined
        : json["urlPatternMappings"],
    name: json["name"] == null ? undefined : json["name"],
    className: json["className"] == null ? undefined : json["className"],
    initParameters:
      json["initParameters"] == null ? undefined : json["initParameters"],
  }
}

export function FilterRegistrationToJSON(json: any): FilterRegistration {
  return FilterRegistrationToJSONTyped(json, false)
}

export function FilterRegistrationToJSONTyped(
  value?: FilterRegistration | null,
  ignoreDiscriminator: boolean = false,
): any {
  if (value == null) {
    return value
  }

  return {
    servletNameMappings: value["servletNameMappings"],
    urlPatternMappings: value["urlPatternMappings"],
    name: value["name"],
    className: value["className"],
    initParameters: value["initParameters"],
  }
}
