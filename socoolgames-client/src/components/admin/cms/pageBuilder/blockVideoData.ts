import { defineAsyncComponent } from 'vue'

class BlockVideoData {

  getNames() {
    return {
        nameRef: "Video",
        name: "Video",
    }
  }

  getDefault() {
    return {
        title: { pt: '', en: '' },
        subTitle: { pt: '', en: '' },
        buttonText: { pt: '', en: '' },
        buttonLink: { pt: '', en: '' },
        backgroundImage: ''
    }  }

  getComponent() {
    return defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/BlockVideo.vue'));
  }

  getSchema() {
    return [
        { field: "title", type: "WidgetText", label: "Title" },
        { field: "subTitle", type: "WidgetMultiline", label: "Sub Title" },
        { field: "buttonText", type: "WidgetText", label: "Button Text" },
        { field: "buttonLink", type: "WidgetUrl", label: "Button Link" }, 
        { field: "backgroundImage", type: "WidgetImage", label: "Background" }
    ]
  }
  
}

export default new BlockVideoData();