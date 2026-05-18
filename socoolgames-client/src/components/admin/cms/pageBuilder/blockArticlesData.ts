import { defineAsyncComponent } from 'vue'

class BlockArticlesData {

  getNames() {
    return {
        nameRef: "articles",
        name: "Articles",
    }
  }

  getDefault() {
    return {
        title: { pt: '', en: '' },
        articleSchema: "",
        showNewsletter: true,
        showRelated: true
    }
  }

  getComponent() {
    return defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/BlockArticles.vue'));
  }

  getSchema() {
    return [
        { field: "title", type: "WidgetText", label: "Title" },
        { field: "articleSchema", type: "WidgetOption", label: "Article Schema", options: ["3-2", "2-3", "2-2", "2-0", "3-0", "3-3"] },
        { field: "showNewsletter", type: "WidgetBoolean", label: "Show Newsletter" },
        { field: "showRelated", type: "WidgetBoolean", label: "Show Related" },
        { field: "otherTitle", type: "WidgetText", label: "Other Title" },
    ]
  }  
}

export default new BlockArticlesData();