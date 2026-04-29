import { defineAsyncComponent } from 'vue'

class BlockMultipleFilesData {

  getNames() {
    return {
        nameRef: "MultipleFiles",
        name: "Multiple Files",
    }
  }

  getDefault() {
    return {
        title: { pt: '', en: '' },
        subTitle: { pt: '', en: '' },
        items: [
          {
            header: { pt: '', en: '' },
            title: { pt: '', en: '' },
            subTitle: { pt: '', en: '' },
            buttonText: { pt: '', en: '' },
            buttonColor: '',
            image: { pt: '', en: '' },
            file: { pt: '', en: '' }
          },
          {
            header: { pt: '', en: '' },
            title: { pt: '', en: '' },
            subTitle: { pt: '', en: '' },
            buttonText: { pt: '', en: '' },
            buttonColor: '',
            image: { pt: '', en: '' },
            file: { pt: '', en: '' } 
          }
        ]
    }  }

  getComponent() {
    return defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/BlockMultipleFiles.vue'));
  }

  getSchema() {
    return [
        { field: "title", type: "WidgetText", label: "Title" },
        { field: "subTitle", type: "WidgetMultiline", label: "Sub Title" },
        { field: "items", type: "WidgetMultiplier", label: "Items",
              items: [
                { field: "header", type: "WidgetText", label: "Header" },
                { field: "headerColor", type: "WidgetColor", label: "Header Color" },
                { field: "title", type: "WidgetText", label: "Title" },
                { field: "subTitle", type: "WidgetMultiline", label: "Sub Title" },
                { field: "buttonText", type: "WidgetText", label: "Button Text" },
                { field: "buttonColor", type: "WidgetColor", label: "Button Color" },
                { field: "image", type: "WidgetImage", label: "Image" },
                { field: "file", type: "WidgetFile", label: "File" }
              ]
        }
    ]
  }
  
}

export default new BlockMultipleFilesData();
