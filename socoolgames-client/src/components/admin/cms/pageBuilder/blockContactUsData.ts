import { defineAsyncComponent } from 'vue'

class BlockContactUsData {

  getNames() {
    return {
        nameRef: "contactUs",
        name: "Contact Us",
    }
  }

  getDefault() {
    return {
        title: { pt: '', en: '' },
        articleSchema: "",
        showNewsletter: true,
    }
  }

  getComponent() {
    return defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/BlockContactUs.vue'));
  }

  getSchema() {
    return [
        { field: "title", type: "WidgetText", label: "Title" },
        { field: "subTitle", type: "WidgetText", label: "Sub Title" },
        { field: "emailLabel", type: "WidgetText", label: "Email Label" },
        { field: "emailPlaceholder", type: "WidgetText", label: "Email Placeholder" },
        { field: "messageLabel", type: "WidgetText", label: "Message Label" },
        { field: "messagePlaceholder", type: "WidgetText", label: "Message Placeholder" },
        { field: "buttonText", type: "WidgetText", label: "Button Text" },
        { field: "formNotes", type: "WidgetText", label: "Form Notes" },
        { field: "thanksMessage", type: "WidgetText", label: "Thanks Message" }
    ]
  }
  
}

export default new BlockContactUsData();