class functionTools {
  static getUrlParam (paramName) {
    let [paramValue, isFound] = ['', !1];
    let paramUrl = window.location.hash.split('?')[1];
    if (paramUrl.indexOf('=') > 1) {
      const arrSource = paramUrl.split('&');
      let i = 0;
      while (i < arrSource.length && !isFound) {
        const item = arrSource[i];
        if (item.indexOf('=') > 0 && item.split('=')[0].toLowerCase() === paramName.toLowerCase()) {
          paramValue = item.split('=')[1];
          isFound = !0;
        }
        i++;
      }
    }
    paramValue === '' && (paramValue = null);
    return paramValue;
  }
}

export default functionTools;
