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
import type { PerformanceUpdateRequest } from "./PerformanceUpdateRequest"
import {
  PerformanceUpdateRequestFromJSON,
  PerformanceUpdateRequestFromJSONTyped,
  PerformanceUpdateRequestToJSON,
  PerformanceUpdateRequestToJSONTyped,
} from "./PerformanceUpdateRequest"

/**
 *
 * @export
 * @interface PostUpdateRequest
 */
export interface PostUpdateRequest {
  /**
   *
   * @type {string}
   * @memberof PostUpdateRequest
   */
  title?: string
  /**
   *
   * @type {string}
   * @memberof PostUpdateRequest
   */
  content?: string
  /**
   *
   * @type {boolean}
   * @memberof PostUpdateRequest
   */
  isPublished?: boolean
  /**
   *
   * @type {PerformanceUpdateRequest}
   * @memberof PostUpdateRequest
   */
  performance?: PerformanceUpdateRequest
}

/**
 * Check if a given object implements the PostUpdateRequest interface.
 */
export function instanceOfPostUpdateRequest(
  value: object,
): value is PostUpdateRequest {
  return true
}

export function PostUpdateRequestFromJSON(json: any): PostUpdateRequest {
  return PostUpdateRequestFromJSONTyped(json, false)
}

export function PostUpdateRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): PostUpdateRequest {
  if (json == null) {
    return json
  }
  return {
    title: json["title"] == null ? undefined : json["title"],
    content: json["content"] == null ? undefined : json["content"],
    isPublished: json["isPublished"] == null ? undefined : json["isPublished"],
    performance:
      json["performance"] == null
        ? undefined
        : PerformanceUpdateRequestFromJSON(json["performance"]),
  }
}

export function PostUpdateRequestToJSON(json: any): PostUpdateRequest {
  return PostUpdateRequestToJSONTyped(json, false)
}

export function PostUpdateRequestToJSONTyped(
  value?: PostUpdateRequest | null,
  ignoreDiscriminator: boolean = false,
): any {
  if (value == null) {
    return value
  }

  return {
    title: value["title"],
    content: value["content"],
    isPublished: value["isPublished"],
    performance: PerformanceUpdateRequestToJSON(value["performance"]),
  }
}
