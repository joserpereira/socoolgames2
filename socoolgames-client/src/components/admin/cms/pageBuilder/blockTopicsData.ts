import { defineAsyncComponent } from 'vue'

class BlockTopicsData {

  getNames() {
    return {
        nameRef: "Topics",
        name: "Topics",
    }
  }

  getDefault() {
    return {
        title: { pt: '', en: '' },
        subTitle: { pt: '', en: '' },
        items: { pt: '', en: '' },
        buttonText: { pt: '', en: '' },
        buttonLink: { pt: '', en: '' },
        image: { pt: '', en: '' },
        backgroundImage: { pt: '', en: '' }
    }  }

  getComponent() {
    return defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/BlockTopics.vue'));
  }

  getSchema() {
    return [
        { field: "title", type: "WidgetText", label: "Title" },
        { field: "subTitle", type: "WidgetMultiline", label: "Sub Title" },
        { field: "items", type: "WidgetMultiline", label: "Items" },
        { field: "buttonText", type: "WidgetText", label: "Button Text" },
        { field: "buttonLink", type: "WidgetUrl", label: "Button Link" }, 
        { field: "image", type: "WidgetImage", label: "Image" },
        { field: "backgroundImage", type: "WidgetImage", label: "Background" }
    ]
  }
  
}

export default new BlockTopicsData();