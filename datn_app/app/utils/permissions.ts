/* eslint-disable react-native/split-platform-components */
import { PERMISSIONS, RESULTS, request, check, } from "react-native-permissions"
import { Platform } from "react-native"

const CAMERA_PERMISSION =
  Platform.OS === "ios" ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA
const PHOTO_PERMISSION =
  Platform.OS === "ios" ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
const LOCATION_PERMISSION =
  Platform.OS === "ios"
    ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
    : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION

export const requestCameraPermission = () => {
  return check(CAMERA_PERMISSION)
    .then((status: any) => {
      switch (status) {
        case RESULTS.GRANTED:
          return { success: true, status }
        case RESULTS.DENIED:
          return request(CAMERA_PERMISSION).then((statusRequest) => {
            if (statusRequest === RESULTS.GRANTED) {
              return { success: true, status }
            } else {
              return { success: false, status }
            }
          })
        default:
          return { success: false, status }
      }
    })
    .catch((error) => console.log("error", error))
}

export const requestPhotoPermission = () => {
  return check(PHOTO_PERMISSION)
    .then((status: any) => {
      switch (status) {
        case RESULTS.GRANTED:
          return { success: true, status }
        case RESULTS.DENIED:
          return request(PHOTO_PERMISSION).then((statusRequest) => {
            if (statusRequest === RESULTS.GRANTED) {
              return { success: true, status }
            } else {
              return { success: false, status }
            }
          })
        default:
          return { success: false, status }
      }
    })
    .catch((error) => console.log("error", error))
}

export const requestLocationPermission = () => {
  return check(LOCATION_PERMISSION).then((status: any) => {
    switch (status) {
      case RESULTS.GRANTED:
        return { success: true, status }
      case RESULTS.LIMITED:
        return { success: true, status }
      case RESULTS.DENIED:
        return request(LOCATION_PERMISSION).then((statusRequest) => {
          if (statusRequest === RESULTS.GRANTED) {
            return { success: true, status }
          } else if (statusRequest === RESULTS.LIMITED) {
            return { success: true, status }
          } else {
            return { success: false, status }
          }
        })
      default:
        return { success: false, status }
    }
  })
}
