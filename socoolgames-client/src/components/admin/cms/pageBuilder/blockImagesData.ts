import { defineAsyncComponent } from 'vue'

class BlockImagesData {

  getNames() {
    return {
        nameRef: "Images",
        name: "Images",
    }
  }

  getDefault() {
    return {
        title: { pt: '', en: '' },
        buttonText: { pt: '', en: '' },
        buttonLink: { pt: '', en: '' },
        note: { pt: '', en: '' },
        backgroundImage: { pt: '', en: '' },
        items: [
          {
            image: { pt: '', en: '' }
          },
          {
            image: { pt: '', en: '' }
          },
          {
            image: { pt: '', en: '' }
          }

        ]
    }  }

  getComponent() {
    return defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/BlockImages.vue'));
  }

  getSchema() {
    return [
        { field: "title", type: "WidgetText", label: "Title" },
        { field: "buttonText", type: "WidgetText", label: "Button Text" },
        { field: "buttonLink", type: "WidgetUrl", label: "Button Link" },
        { field: "backgroundImage", type: "WidgetImage", label: "Background Image" },
        { field: "items", type: "WidgetMultiplier", label: "Items",
              items: [
                { field: "imageSize", type: "WidgetOption", label: "Image Size", options: ["thumb", "medium", "large"] },
                { field: "image", type: "WidgetImage", label: "Image" }
              ]
        }        
    ]
  }
  
}

export default new BlockImagesData();