import { defineAsyncComponent } from 'vue'

class BlockTopicsData {

  getNames() {
    return {
        nameRef: "Newsletter",
        name: "Newsletter",
    }
  }

  getDefault() {
    return {
        title: { pt: '', en: '' },
        inputPlaceholder: { pt: '', en: '' },
        buttonText: { pt: '', en: '' },
        note: { pt: '', en: '' },
    }  }

  getComponent() {
    return defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/BlockNewsLetter.vue'));
  }

  getSchema() {
    return [
        { field: "title", type: "WidgetText", label: "Title" },
        { field: "inputPlaceholder", type: "WidgetText", label: "Input Placeholder" },
        { field: "buttonText", type: "WidgetText", label: "Button Text" },
        { field: "note", type: "WidgetText", label: "Note" },
    ]
  }
  
}

export default new BlockTopicsData();