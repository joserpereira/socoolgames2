import { Router } from 'express';
const logger = require('@joserpereira/lazuli-labs-logger')

function getCurrentDate() {
    var datetime = new Date();
    return datetime.toISOString() //.slice(0,10);
}

function getUrlNode(doc: any, loc: any, lastmod: string, changefreq: string, priority: string, caption: string) {
    var elem = doc.ele('url');
    elem.ele('loc', loc);
    elem.ele('lastmod').txt(lastmod)
    elem.ele('changefreq').txt(changefreq)
    elem.ele('priority').txt(priority)
    var img_elem = elem.ele('image:image')
    img_elem.ele("image:loc").txt("https://socoolgames.net/images/og-image.png")
    img_elem.ele("image:caption").txt(caption);
    // elem.ele('xhtml:link').att("rel","alternate").att("hreflang", "en").txt(loc)
    // elem.ele('xhtml:link').att("rel","alternate").att("hreflang", "pt").txt(loc.replace("/en/", "/pt-pt/"))
}

export const sitemapRoutes = (router: Router, baseUrl: string) => {
    router.get(baseUrl + 'sitemap.xml', async (req, res) => {
    try
    {
        var baseDomain = "https://socoolgames.net/"
        var builder = require('xmlbuilder');
        var doc = builder.create('urlset').att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9')
                                          .att("xmlns:xhtml","http://www.w3.org/1999/xhtml")
                                          .att("xmlns:image", "http://www.google.com/schemas/sitemap-image/1.1")

       
        // default url
        getUrlNode(doc, baseDomain, getCurrentDate(), 'weekly', '0.8', "Links Digest - For Curious Minds")

        var xml = doc.end({ pretty: true });

        var content = xml;
        var contentType = "application/xml";
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content, "utf-8");
    }
    catch(error: any)
    {
        logger.error(error.message)
        res.status(500).json({error: 999, message: error.message})
    }
})
}


