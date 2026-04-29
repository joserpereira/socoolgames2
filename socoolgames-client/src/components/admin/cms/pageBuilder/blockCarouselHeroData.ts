import { defineAsyncComponent } from 'vue'

class BlockCarouselHeroData {

  getNames() {
    return {
        nameRef: "carouselHero",
        name: "Carousel Hero",
    }
  }

  getDefault() {
    return {
        items: [
          {
            title: { pt: '', en: '' },
            subTitle: { pt: '', en: '' },
            buttonText: { pt: '', en: '' },
            buttonLink: { pt: '', en: '' },
            buttonColor: '',
            image: { pt: '', en: '' }
          },
          {
            title: { pt: '', en: '' },
            subTitle: { pt: '', en: '' },
            buttonText: { pt: '', en: '' },
            buttonLink: { pt: '', en: '' },
            buttonColor: '',
            image: { pt: '', en: '' }
          },
          {
            title: { pt: '', en: '' },
            subTitle: { pt: '', en: '' },
            buttonText: { pt: '', en: '' },
            buttonLink: { pt: '', en: '' },
            buttonColor: '',
            image: { pt: '', en: '' }
          }
        ]
    }  }

  getComponent() {
    return defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/BlockCarouselHero.vue'));
  }

  getSchema() {
    return [
        { field: "items", type: "WidgetMultiplier", label: "Items",
              items: [
                { field: "title", type: "WidgetText", label: "Title" },
                { field: "subTitle", type: "WidgetMultiline", label: "Sub Title" },
                { field: "buttonText", type: "WidgetText", label: "Button Text" },
                { field: "buttonLink", type: "WidgetUrl", label: "Button Link" }, 
                { field: "buttonColor", type: "WidgetColor", label: "Button Color" },
                { field: "image", type: "WidgetImage", label: "Image" }
              ]
        }
    ]
  }
  
}

export default new BlockCarouselHeroData();