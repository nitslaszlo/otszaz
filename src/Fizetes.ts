export default class Fizetes {
    private _aurk: string[] = [];

    public get arukSzama(): number {
        return this._aurk.length;
    }
    public get kulonbozoArucikkek(): string[] {
        const arucikkek: string[] = [];
        for (const arucikk of this._aurk) {
            if (!arucikkek.includes(arucikk)) {
                arucikkek.push(arucikk);
            }
        }
        return arucikkek;
    }
    constructor(forras: string[]) {
        this._aurk = forras;
    }
    public vanArucikk(arucikk: string): boolean {
        for (const aru of this._aurk) {
            const aktsor = aru.trim();
            if (aktsor == arucikk) {
                return true;
            }
        }
        return false;
    }
    public hanyszorArucikk(arucikk: string): number {
        let darab = 0;
        for (const aru of this._aurk) {
            if (aru === arucikk) {
                darab++;
            }
        }
        return darab;
    }
}
