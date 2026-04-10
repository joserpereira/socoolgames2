import { defineAsyncComponent } from 'vue'

class BlockTextData {

  getNames() {
    return {
        nameRef: "downloadFile",
        name: "Download File",
    }
  }

  getDefault() {
    return {
        title: { pt: '', en: '' },
        subTitle: { pt: '', en: '' },
        buttonText: { pt: '', en: '' },
        footer: { pt: '', en: '' }
    }
  }

  getComponent() {
    return defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/BlockDownloadFile.vue'));
  }

  getSchema() {
    return [
        { field: "title", type: "WidgetText", label: "Title" },
        { field: "subTitle", type: "WidgetText", label: "Sub Title" },
        { field: "inputPlaceholder", type: "WidgetText", label: "Input Placeholder" },
        { field: "buttonText", type: "WidgetText", label: "Button Text" },
        { field: "footer", type: "WidgetText", label: "Footer" },
    ]
  }
}

export default new BlockTextData();