import {ComponentDef, ComponentType} from "../../model/component-def.model";

export function AutoUnsubscribe(): Function {
    return (componentType: ComponentType<any>): void => {
        // @ts-ignore
      const component: ComponentDef<ComponentType<any>> = componentType.ɵcmp;

        if (!component) {
            throw new Error("No Angular property found for " + componentType.name);
        }

        const cmpOnDestroy: (() => void) | null = component.onDestroy;

        component.onDestroy = function () {
            if (this.unsubscribeStream$) {
                this.unsubscribeStream$.next();
                this.unsubscribeStream$.complete();
            }

            if (cmpOnDestroy !== null) {
                cmpOnDestroy.apply(this);
            }
        };
    };
}
