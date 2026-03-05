class ComponentsUtils {
    getComponents() {
        return {
            hero: {
                name: "Hero",
                component: import('@/components/admin/cms/pageBuilder/BlockHero.vue'),
                data: {
                    title: { pt: '', en: '' },
                    subtitle: { pt: '', en: '' }
                }
            },
            text: {
                name: "Text",
                component: import('@/components/admin/cms/pageBuilder/BlockText.vue'),
                data: {
                    content: { pt: '', en: '' }
                }
            }
        }
    }

    resolveComponent(type) {
        const result = this.getComponents()[type]
        return result;
    }
}

export default new ComponentsUtils();