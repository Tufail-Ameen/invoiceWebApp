import { atom } from "recoil"

export const productAtom = atom({
    key: 'productAtom',
    default: []
})

export const formdisplay = atom({
    key: 'formdisplay',
    default: false,
})

export const idsend = atom({
    key: 'idsend',
    default: [],
})

export const editatom = atom({
    key: 'editatom',
    default: false
})

export const gobackatom = atom({
    key: 'gobackatom',
    default: false
})

export const clientopenAtom = atom({
    key: 'clientopenAtom',
    default: false
})

export const useropenAtom = atom({
    key: 'useropenAtom',
    default: false
})

export const filterdatatom = atom({
    key: 'filterdatatom',
    default: [],
})

export const editclicked = atom({
    key: 'editclicked',
    default: false,
})

export const gohome = atom({
    key: 'gohome',
    default: false,
})

export const gostock = atom({
    key: 'gostock',
    default: false,
})

export const printclientdata = atom({
    key: 'printclientdata',
    default: [],
})