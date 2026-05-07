import { defineAsyncComponent } from 'vue'

class BlockHtmlData {

  getNames() {
    return {
        nameRef: "html",
        name: "Html",
    }
  }

  getDefault() {
    return {
        content: { pt: '', en: '' }
    }
  }

  getComponent() {
    return defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/BlockHtml.vue'));
  }

  getSchema() {
    return [
        { field: "content", type: "WidgetHtml", label: "Content" }        
    ]
  }
  
}

export default new BlockHtmlData();