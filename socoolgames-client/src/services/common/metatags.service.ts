class MetaTagsService {

  setTitle(value) {
    if (!value)
        return;
    document.title = value;
    this.setProperties(['head meta[name="title"]',
                        'head meta[property="twitter:title"]',
                        'head meta[property="og:title"]'], 
                       value);
  }

  setDescription(value) {
    if (!value)
        return;    
    this.setProperties(['head meta[name="description"]',
                        'head meta[property="twitter:description"]',
                        'head meta[property="og:description"]'], 
                       value);
  }

  setKeywords(value: string) {
    if (!value)
        return;
    const keywordsElem = document.querySelector('head meta[name="keywords"]')
    keywordsElem?.setAttribute('content', value)
  }

  setProperties(attributes, value) {
    attributes.forEach(element => {
      const docElement = document.querySelector(element)
      if (docElement !== null)
        docElement.setAttribute('content', value)      
    });

  }

  setCanonical(selectedLanguage, url, alternateURL) {
    const canonical = document.querySelector('link[rel="canonical"]') as any;
    const alternate = document.querySelector('link[rel="alternate"]') as any;
    if (canonical)
    {
      canonical.href = url.toLowerCase();
      if (alternate != null) {
          alternate.href = alternateURL.toLowerCase();
          alternate.hreflang =  this.getAlternateLang(selectedLanguage)
      }
      
      this.setProperties(['head meta[property="twitter:url"]',
                          'head meta[property="og:url"]'], 
                         canonical.href);
    }
  }

  setCanonicalURL(selectedLanguage) {
    const canonical = document.querySelector('link[rel="canonical"]') as any;
    const alternate = document.querySelector('link[rel="alternate"]') as any;
    if (canonical && (!location.href.startsWith(location.origin+"/"+ + selectedLanguage) || (canonical.href != location.href)))
    {
      const parts = location.pathname.split("/")
      parts.shift()
      parts.shift()
      const p = parts.join('/');
    
      canonical.href = (location.protocol + '//' + location.host + '/' + selectedLanguage + '/' + p).toLowerCase();
      if (alternate != null) {
          alternate.href = (location.protocol + '//' + location.host + '/' + this.getAlternateHreflang(selectedLanguage) + '/' + p).toLowerCase();
          alternate.hreflang =  this.getAlternateLang(selectedLanguage)
      }
      
      this.setProperties(['head meta[property="twitter:url"]',
                          'head meta[property="og:url"]'], 
                         canonical.href);
    }
  }

  getAlternateLang(lang) {
    if (lang == "en")
        return "pt";
    return "en";
  }

  getAlternateHreflang(lang) {
    if (lang == "en")
        return "pt-pt";
    return "en";
  }         

}

export default new MetaTagsService();