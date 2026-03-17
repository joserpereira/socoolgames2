import { defineAsyncComponent } from 'vue'

class BlockMultipleCardsData {

  getNames() {
    return {
        nameRef: "MultipleCards",
        name: "Multiple Cards",
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
            buttonLink: { pt: '', en: '' },
            buttonColor: '',
            image: ''
          },
          {
            header: { pt: '', en: '' },
            title: { pt: '', en: '' },
            subTitle: { pt: '', en: '' },
            buttonText: { pt: '', en: '' },
            buttonLink: { pt: '', en: '' },
            buttonColor: '',
            image: ''
          },
          {
            header: { pt: '', en: '' },
            title: { pt: '', en: '' },
            subTitle: { pt: '', en: '' },
            buttonText: { pt: '', en: '' },
            buttonLink: { pt: '', en: '' },
            buttonColor: '',
            image: ''
          },
          {
            header: { pt: '', en: '' },
            title: { pt: '', en: '' },
            subTitle: { pt: '', en: '' },
            buttonText: { pt: '', en: '' },
            buttonLink: { pt: '', en: '' },
            buttonColor: '',
            image: ''
          }
        ]
    }  }

  getComponent() {
    return defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/BlockMultipleCards.vue'));
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
                { field: "buttonLink", type: "WidgetUrl", label: "Button Link" }, 
                { field: "buttonColor", type: "WidgetColor", label: "Button Color" },
                { field: "image", type: "WidgetImage", label: "Image" }
              ]
        }
    ]
  }
  
}

export default new BlockMultipleCardsData();