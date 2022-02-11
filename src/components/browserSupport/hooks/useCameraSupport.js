import { isChrome, isFirefox, isIOSWeb, isSafari, osVersionInfo } from '../../../lib/utils/platform'
import useBrowserSupport from './useBrowserSupport'

const iosSupported = isSafari || (osVersionInfo.major >= 14 && osVersionInfo.minor >= 4 && (isChrome || isFirefox))

// if non-ios camera support is present on all browsers
// for IOS camera is supported omnly in Safari or ios>=14.4 chrome+firefox
export default (options = {}) =>
  useBrowserSupport({ ...options, checkOutdated: false, onCheck: () => !isIOSWeb || iosSupported })
