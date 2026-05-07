import { defineAsyncComponent } from 'vue'

class BlockFAQData {

  getNames() {
    return {
        nameRef: "faq",
        name: "FAQ",
    }
  }

  getDefault() {
    return {
        title: { pt: '', en: '' }        
    }  
  }

  getComponent() {
    return defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/BlockFAQ.vue'));
  }

  getSchema() {
    return [
        { field: "title", type: "WidgetText", label: "Title" },              
        { field: "subtitle", type: "WidgetText", label: "Subtitle" },
        { field: "searchPlaceholder", type: "WidgetText", label: "Search Placeholder" },
    ]
  }
  
}

export default new BlockFAQData();