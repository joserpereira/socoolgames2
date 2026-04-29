//import { defineAsyncComponent } from 'vue'
/*
const componentsDict = {


"blockHeroData": defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/blockHeroData')),
"blockHtmlData": defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/blockHtmlData')),
"blockTextData": defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/blockTextData')),
"block4ColumnsData": defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/block4ColumnsData')),
"blockMultipleCardsData": defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/blockMultipleCardsData')),
"blockTextBgData": defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/blockTextBgData')),
"blockVideoData": defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/blockVideoData')),
"blockTopicsData": defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/blockTopicsData')),
"blockNewsLetterData": defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/blockNewsLetterData')),
"blockImagesData": defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/blockImagesData')),
"blockArticlesData": defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/blockArticlesData')),
"blockDownloadFileData": defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/blockDownloadFileData')),
"blockContactUsData": defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/blockContactUsData'))
}
*/
import blockHeroData from '@/components/admin/cms/pageBuilder/blockHeroData';
import blockHtmlData from '@/components/admin/cms/pageBuilder/blockHtmlData';
import blockTextData from '@/components/admin/cms/pageBuilder/blockTextData';
import block4ColumnsData from '@/components/admin/cms/pageBuilder/block4ColumnsData';
import blockMultipleCardsData from '@/components/admin/cms/pageBuilder/blockMultipleCardsData';
import blockTextBgData from '@/components/admin/cms/pageBuilder/blockTextBgData';
import blockVideoData from '@/components/admin/cms/pageBuilder/blockVideoData';
import blockTopicsData from '@/components/admin/cms/pageBuilder/blockTopicsData';
import blockNewsLetterData from '@/components/admin/cms/pageBuilder/blockNewsLetterData';
import blockImagesData from '@/components/admin/cms/pageBuilder/blockImagesData';
import blockArticlesData from '@/components/admin/cms/pageBuilder/blockArticlesData';
import blockDownloadFileData from '@/components/admin/cms/pageBuilder/blockDownloadFileData';
import blockContactUsData from '@/components/admin/cms/pageBuilder/blockContactUsData';
import blockGameCircusData from '@/components/admin/cms/pageBuilder/blockGameCircusData';
import blockMultipleFilesData from '@/components/admin/cms/pageBuilder/blockMultipleFilesData';
import blockCarouselHeroData from '@/components/admin/cms/pageBuilder/blockCarouselHeroData';

const components = [blockHeroData, blockHtmlData, blockTextData, 
                    block4ColumnsData, blockMultipleCardsData, blockTextBgData, 
                    blockVideoData, blockTopicsData, blockNewsLetterData,  
                    blockImagesData, blockArticlesData, blockDownloadFileData,
                    blockContactUsData, blockGameCircusData, blockMultipleFilesData,
                    blockCarouselHeroData
]

class ComponentsUtils {
    getComponents() {
        const result = {}
        for (let i = 0; i < components.length; i++) {
            result[components[i].getNames().nameRef] = components[i].getComponent();
        }
        return result;
    }

    getList() {
        const items = [] as any[]
        components.forEach((item) => {
            if (item?.getNames() !== undefined)
            items.push(item.getNames());
        })
        return items;
    }

    getName(type) {
        for (let i = 0; i < components.length; i++) {
            const names = components[i].getNames();
            if (names.nameRef == type) {
                return names.name;
            }
        }
        return {};
    }

    getSchema(type) {
        for (let i = 0; i < components.length; i++) {
            const names = components[i].getNames();
            if (names.nameRef == type) {
                return components[i].getSchema();
            }
        }
        return {};
    }

    getDefault(type) {
        for (let i = 0; i < components.length; i++) {
            if (components[i].getNames().nameRef == type) {
                return components[i].getDefault();
            }
        }
        return {};
    }

    getDefaultFromSchema(schema, languages) {
        const values = {};
        for (let i = 0; i < schema.length; i++) {

            if (["WidgetText", "WidgetUrl", "WidgetMultiline"].indexOf(schema[i].type) >= 0)
            {
                values[schema[i].field] = {}
                values[schema[i].field]["en"] = "";
            }                
            else if (schema[i].type !== "WidgetMultiplier")
            {
                values[schema[i].field] = "";
            }
                
        }
       
        return values;
    }
}

export default new ComponentsUtils();