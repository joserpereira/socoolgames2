import { defineAsyncComponent } from 'vue'

class BlockHero2Data {

  getNames() {
    return {
        nameRef: "hero 2",
        name: "Hero 2",
    }
  }

  getDefault() {
    return {
        title: { pt: '', en: '' },
        subTitle: { pt: '', en: '' },
        buttonText: { pt: '', en: '' },
        buttonLink: { pt: '', en: '' },
        urgencyBadge: { pt: '', en: '' },
        image: { pt: '', en: '' },
        items: [
          { thrustBadge: { pt: '', en: '' } },
          { thrustBadge: { pt: '', en: '' } },
        ]
    }
  }

  getComponent() {
    return defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/BlockHero2.vue'));
  }

  getSchema() {
    return [
        { field: "title", type: "WidgetText", label: "Title" },
        { field: "subTitle", type: "WidgetMultiline", label: "Sub Title" },
        { field: "buttonText", type: "WidgetText", label: "Button Text" },
        { field: "buttonLink", type: "WidgetUrl", label: "Button Link" },
        { field: "urgencyBadge", type: "WidgetText", label: "Urgency Badge" },
        { field: "items", type: "WidgetMultiplier", label: "Items",
              items: [
                 { field: "thrustBadge", type: "WidgetText", label: "Thrust Badge" }
              ]
        },
          { field: "image", type: "WidgetImage", label: "Image" },
        
    ]
  }
  
}

export default new BlockHero2Data();
