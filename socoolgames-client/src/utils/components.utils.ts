import blockHeroData from '@/components/admin/cms/pageBuilder/blockHeroData';
import blockTextData from '@/components/admin/cms/pageBuilder/blockTextData';
const components = [blockHeroData, blockTextData]

class ComponentsUtils {
    getComponents() {
        const result = {}
        for (let i = 0; i < components.length; i++) {
            result[components[i].getNames().nameRef] = components[i].getComponent();
        }
        return result;
    }

    getList() {
        const items = [] as any[]
        components.forEach((item) => {
            if (item?.getNames() !== undefined)
            items.push(item.getNames());
        })
        return items;
    }

    getName(type) {
        for (let i = 0; i < components.length; i++) {
            const names = components[i].getNames();
            if (names.nameRef == type) {
                return names.name;
            }
        }
        return {};
    }

    getSchema(type) {
        for (let i = 0; i < components.length; i++) {
            const names = components[i].getNames();
            if (names.nameRef == type) {
                return components[i].getSchema();
            }
        }
        return {};
    }

    getDefault(type) {
        for (let i = 0; i < components.length; i++) {
            if (components[i].getNames().nameRef == type) {
                return components[i].getDefault();
            }
        }
        return {};
    }

}

export default new ComponentsUtils();