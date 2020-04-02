import Fizetes from "./Fizetes";
import fs from "fs";

export default class Megoldas {
    private _fizetesek: Fizetes[] = [];

    public get fizetesekSzama(): number {
        return this._fizetesek.length;
    }
    public get elsoVasarloAruinakSzama(): number {
        return this._fizetesek[0].arukSzama;
    }

    constructor(forras: string) {
        let seged: string[] = [];
        fs.readFileSync(forras)
            .toString()
            .split("\r\n")
            .forEach(l => {
                const aktsor = l.trim();
                if (aktsor === "F") {
                    this._fizetesek.push(new Fizetes(seged));
                    seged = [];
                } else {
                    seged.push(l);
                }
            });
    }
    public eloszorVasaroltak(arucikk: string): number | string {
        for (let i = 0; i < this._fizetesek.length; i++) {
            if (this._fizetesek[i].vanArucikk(arucikk)) {
                return i + 1;
            }
        }
        return "Nem vettek ilyen árucikket!";
    }

    public utoljaraVasaroltak(arucikk: string): number | string {
        let sorszam = -1;
        for (let i = 0; i < this._fizetesek.length; i++) {
            if (this._fizetesek[i].vanArucikk(arucikk)) {
                sorszam = i + 1;
            }
        }
        if (sorszam === -1) {
            return "Nem vettek ilyen árucikket!";
        } else {
            return sorszam;
        }
    }
    public hanyszorVasarolatak(arucikk: string): number | string {
        let darab = 0;
        for (const fizetes of this._fizetesek) {
            if (fizetes.vanArucikk(arucikk)) {
                darab++;
            }
        }
        if (darab === 0) {
            return "Nem vettek ilyen árucikket!";
        }
        return darab;
    }
    public fizetendoOsszeg(darab: number): number {
        if (darab <= 0) {
            return 0;
        } else if (darab === 1) {
            return 500;
        } else if (darab === 2) {
            return 950;
        } else {
            return 950 + (darab - 2) * 400;
        }
    }
    public darabEsAru(sorszam: number): (number | string)[] {
        const darabEsAru: (number | string)[] = [];
        for (const arucikk of this._fizetesek[sorszam - 1].kulonbozoArucikkek) {
            darabEsAru.push(this._fizetesek[sorszam - 1].hanyszorArucikk(arucikk));
            darabEsAru.push(arucikk);
        }
        return darabEsAru;
    }
    public allomanybaIr(allomanyNeve: string): void {
        let szoveg = "";
        for (let i = 0; i < this._fizetesek.length; i++) {
            let ar = 0;
            for (const arucikk of this._fizetesek[i].kulonbozoArucikkek) {
                ar += this.fizetendoOsszeg(this._fizetesek[i].hanyszorArucikk(arucikk));
            }
            szoveg += `${i + 1}: ${ar}\r\n`;
        }
        fs.writeFileSync(allomanyNeve, szoveg);
    }
}
