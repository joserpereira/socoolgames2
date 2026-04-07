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
        articleSchema: "3-2",
        showNewsletter: true,
    }
  }

  getComponent() {
    return defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/BlockArticles.vue'));
  }

  getSchema() {
    return [
        { field: "title", type: "WidgetText", label: "Title" },
        { field: "articleSchema", type: "WidgetOption", label: "Article Schema", options: ["3-2", "2-3"] },
        { field: "showNewsletter", type: "WidgetBoolean", label: "Show Newsletter" }
    ]
  }
  
}

export default new BlockArticlesData();