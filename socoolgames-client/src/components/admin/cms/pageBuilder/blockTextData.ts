import { defineAsyncComponent } from 'vue'

class BlockTextData {

  getNames() {
    return {
        nameRef: "text",
        name: "Text",
    }
  }

  getDefault() {
    return {
        content: { pt: '', en: '' }
    }
  }

  getComponent() {
    return defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/BlockText.vue'));
  }

  getSchema() {
    return [
        { field: "content", type: "WidgetMultiline", label: "Content" }        
    ]
  }
  
}

export default new BlockTextData();