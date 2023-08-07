"use client"
import { DefaultValue, atom, selector } from "recoil";
const localStorageEffect = (key: string) => ({ setSelf, onSet }: any) => {
    if (typeof window != "undefined") {
        const savedValue = localStorage.getItem(key)
        if (savedValue != null) {
            setSelf(JSON.parse(savedValue));
        }
    }

    onSet((newValue: any) => {
        if (newValue instanceof DefaultValue) {
            localStorage.removeItem(key);
        } else {
            localStorage.setItem(key, JSON.stringify(newValue));
        }
    });
};
export const darkMode = atom<boolean | null>({
    key: 'darkMode',
    default: null,
    effects_UNSTABLE: [
        localStorageEffect('darkMode'),
    ]
});
export const darkModeGetter = selector<boolean | null>({
    key: 'darkModeGetter',
    get(opts) {
        return opts.get(darkMode)
    },
});