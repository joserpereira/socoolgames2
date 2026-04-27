import { defineAsyncComponent } from 'vue'

class BlockImagesData {

  getNames() {
    return {
        nameRef: "gameCircus",
        name: "Game Circus",
    }
  }

  getDefault() {
    return {
        title: { pt: '', en: '' }        
    }  
  }

  getComponent() {
    return defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/BlockGameCircus.vue'));
  }

  getSchema() {
    return [
        { field: "title", type: "WidgetText", label: "Title" },              
    ]
  }
  
}

export default new BlockImagesData();