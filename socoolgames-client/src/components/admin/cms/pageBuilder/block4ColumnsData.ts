import { defineAsyncComponent } from 'vue'

class Block4ColumnsData {

  getNames() {
    return {
        nameRef: "4Columns",
        name: "4 Columns",
    }
  }

  getDefault() {
    return {
        title: { pt: '', en: '' },
        subTitle: { pt: '', en: '' },
        title1: { pt: '', en: '' },
        image1: { pt: '', en: '' },        
        subTitle1: { pt: '', en: '' },
        title2: { pt: '', en: '' },
        image2: { pt: '', en: '' },        
        subTitle2: { pt: '', en: '' },
        title3: { pt: '', en: '' },
        image3: { pt: '', en: '' },        
        subTitle3: { pt: '', en: '' },
        title4: { pt: '', en: '' },
        image4: { pt: '', en: '' },        
        subTitle4: { pt: '', en: '' }
    }  }

  getComponent() {
    return defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/Block4Columns.vue'));
  }

  getSchema() {
    return [
        { field: "title", type: "WidgetText", label: "Title" },
        { field: "subTitle", type: "WidgetMultiline", label: "Sub Title" },
        { field: "title1", type: "WidgetText", label: "Title 1" },
        { field: "image1", type: "WidgetImage", label: "Image 1" },
        { field: "subTitle1", type: "WidgetMultiline", label: "Sub Title 1" },
        { field: "title2", type: "WidgetText", label: "Title 2" },
        { field: "image2", type: "WidgetImage", label: "Image 2" },
        { field: "subTitle2", type: "WidgetMultiline", label: "Sub Title 2" },
        { field: "title3", type: "WidgetText", label: "Title 3" },
        { field: "image3", type: "WidgetImage", label: "Image 3" },
        { field: "subTitle3", type: "WidgetMultiline", label: "Sub Title 3" },
        { field: "title4", type: "WidgetText", label: "Title 4" },
        { field: "image4", type: "WidgetImage", label: "Image 4" },
        { field: "subTitle4", type: "WidgetMultiline", label: "Sub Title 4" }
        
    ]
  }
  
}

export default new Block4ColumnsData();