import Megoldas from "../Megoldas";
import fs from "fs";

describe("Megoldás osztály unit tesztjei", () => {
    const megoldas: Megoldas = new Megoldas("penztar.txt");
    it("Megoldás osztály típusa", async () => {
        expect(megoldas).toBeInstanceOf(Megoldas);
    });
    it("Fizetések száma", async () => {
        expect(megoldas.fizetesekSzama).toBe(141);
    });
    it("Első vásárló áruinak száma", async () => {
        expect(megoldas.elsoVasarloAruinakSzama).toBe(1);
    });
    it("Először vásárolták", async () => {
        expect(megoldas.eloszorVasaroltak("kefe")).toBe(5);
    });
    it("Utoljára vásárolták", async () => {
        expect(megoldas.utoljaraVasaroltak("kefe")).toBe(139);
    });
    it("Hány vásárlás során vettek belőle", async () => {
        expect(megoldas.hanyszorVasarolatak("kefe")).toBe(32);
    });
    it("Fizetendő összeg", async () => {
        expect(megoldas.fizetendoOsszeg(2)).toBe(950);
        expect(megoldas.fizetendoOsszeg(0)).toBe(0);
        expect(megoldas.fizetendoOsszeg(-2)).toBe(0);
        expect(megoldas.fizetendoOsszeg(1)).toBe(500);
        expect(megoldas.fizetendoOsszeg(4)).toBe(1750);
    });
    it("Hány darab volt egy árúból egy bizonyos vásárlás sorány", async () => {
        expect(megoldas.darabEsAru(2).toString()).toBe([2, "colostok", 2, "HB ceruza", 1, "toll", 1, "szatyor", 1, "csavarkulcs", 1, "doboz"].toString());
    });
    const megoldas2: Megoldas = new Megoldas("penztar2.txt");
    it("Állományba írás", async () => {
        fs.writeFileSync("osszeg2.txt", "1: 1850\r\n2: 1500\r\n3: 950\r\n");
        megoldas2.allomanybaIr("osszeg3.txt");
        expect(fs.readFileSync("osszeg3.txt").toString()).toBe(fs.readFileSync("osszeg2.txt").toString());
    });
});
