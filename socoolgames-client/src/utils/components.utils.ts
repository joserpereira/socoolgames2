import { defineAsyncComponent } from 'vue'

const blockDictionary = {
        hero: {
            name: "Hero",
            component: defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/BlockHero.vue')),
            data: {
                title: { pt: '', en: '' },
                subtitle: { pt: '', en: '' },
                buttonText: { pt: '', en: '' },
                buttonlink: { pt: '', en: '' }
            }
        },
        text: {
            name: "Text",
            component: defineAsyncComponent(() => import('@/components/admin/cms/pageBuilder/BlockText.vue')),
            data: {
                content: { pt: '', en: '' }
            }
        }
    }

export function getComponents() {
  return blockDictionary;
}