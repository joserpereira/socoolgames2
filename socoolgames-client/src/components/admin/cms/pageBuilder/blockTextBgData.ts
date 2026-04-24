import { defineAsyncComponent } from 'vue'

class BlockTextBgData {

  getNames() {
    return {
        nameRef: "textbg",
        name: "Text Background",
    }
  }

  getDefault() {
    return {
        title: { pt: '', en: '' },
        subTitle: { pt: '', en: '' },
        text: { pt: '', en: '' },
        backgroundImage: { pt: '', en: '' }
    }
  }

  getComponent() {
    return defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/BlockTextBg.vue'));
  }

  getSchema() {
    return [
        { field: "title", type: "WidgetText", label: "Title" },
        { field: "subTitle", type: "WidgetMultiline", label: "Sub Title" },
        { field: "text", type: "WidgetMultiline", label: "Title" },
        { field: "backgroundImage", type: "WidgetImage", label: "Background" },
    ]
  }
  
}

export default new BlockTextBgData();
