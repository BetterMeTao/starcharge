class Jsbridge {
    constructor () {
        this.version = '1.0.0';
        window['frame_android_uniqueId'] = 1;
    }

    call (vMethodName, vParam, vCallback, vOptions) {
        if (window.JSBridge || window.WebViewIOSJavascriptBridge) {
            let vCallbackName = '';
            if (vCallback) {
              vCallbackName = 'cb_' + (window['frame_android_uniqueId']++) + '_' + new Date().getTime();
                window[vCallbackName] = vCallback;
            }
            try {
                if (window.JSBridge && window.JSBridge.AndroidMobileJSBridge) {
                    window.JSBridge.AndroidMobileJSBridge(vMethodName, vParam ? JSON.stringify(vParam) : '', vCallbackName);
                } else if (window.WebViewIOSJavascriptBridge) {
                    window.WebViewIOSJavascriptBridge(vMethodName, vParam ? JSON.stringify(vParam) : '', vCallbackName);
                }
            } catch (e) {
            }
        }
    }
}

export default Jsbridge;
