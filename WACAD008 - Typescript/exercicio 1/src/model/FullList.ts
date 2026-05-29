import ListItem from "./ListItem.js";

interface List {
    list: ListItem[];
    clearList(): void;
    addItem(itemObj: ListItem): void;
    removeItem(id: number): void;
    editItem(itemObj: ListItem): void;
}

export default class FullList implements List {
    static instance: FullList = new FullList();

    private constructor(private _list: ListItem[] = []) {}

    get list(): ListItem[] {
        return this._list;
    }

    clearList(): void {
        this._list = [];
    }

    addItem(itemObj: ListItem): void {
        this._list.push(itemObj);
    }

    removeItem(id: number): void {
        this._list = this._list.filter(item => item[0] !== id);
    }

    editItem(itemObj: ListItem): void {

        const index = this._list.findIndex(
            item => item[0] === itemObj[0]
        );

        if (index !== -1) {
            this._list[index] = itemObj;
        }
    }
}