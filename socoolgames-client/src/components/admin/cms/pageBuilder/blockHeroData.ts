import { defineAsyncComponent } from 'vue'

class BlockHeroData {

  getNames() {
    return {
        nameRef: "hero",
        name: "Hero",
    }
  }

  getDefault() {
    return {
        title: { pt: '', en: '' },
        subtitle: { pt: '', en: '' },
        buttonText: { pt: '', en: '' },
        buttonLink: { pt: '', en: '' },
        backgroundImage: ''
    }
  }

  getComponent() {
    return defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/BlockHero.vue'));
  }

  getSchema() {
    return [
        { field: "title", type: "WidgetText", label: "Title" },
        { field: "subtitle", type: "WidgetMultiline", label: "Title" },
        { field: "buttonText", type: "WidgetText", label: "Button Text" },
        { field: "buttonLink", type: "WidgetUrl", label: "Button Link" },
        { field: "backgroundImage", type: "WidgetImage", label: "Background" },
    ]
  }
  
}

export default new BlockHeroData();
