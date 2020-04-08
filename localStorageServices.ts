import { compose, curry } from "ramda";
import {SimpleWidgetInterface} from "../workspase/tvc_corportal_front/src/state/widgets/services";

export interface DataManagerInterface {
    setData: (key: string, elements: any[]) => void;
    getData: (key: string) => any;
}

export class DataManager {
    private inner: DataManagerInterface;

    constructor(inner: DataManagerInterface) {
        this.inner = inner;
    }

    setData = (keyName: string, value: any) => {
        return this.inner.setData(keyName, value);
    };

    getData = (name: string) => {
        return this.inner.getData(name);
    };

    map = (key: string, cb: (value: any) => any): void => {
        compose(
            curry(this.inner.setData)(key),
            cb,
            this.inner.getData
        )(key);
    };
}

class LocalStorageService implements DataManagerInterface {
    setData = (key: string, value: any) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    getData = (key: string) => {
        const gotData: string = localStorage.getItem(key);
        if (gotData === null || gotData === undefined) return null;
        return JSON.parse(gotData);
    };
}

// Use example ===>
const exampleStorage = new DataManager(new LocalStorageService());

exampleStorage.map("widgets", (data: SimpleWidgetInterface[]) => {
    return [...(data || []), widget];
}); // мы получаем данные из localStorage модифицируем и возвращаем новые, которые запишутся снова в localStorage.

