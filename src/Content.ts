import fs from "fs";
import http from "http";
import url from "url";
import Megoldas from "./Megoldas";
import { isNull, isString, isUndefined } from "util";

export default class Content {
    public content(req: http.IncomingMessage, res: http.ServerResponse): void {
        // favicon.ico kérés kiszolgálása:
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        // Weboldal inicializálása + head rész:
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Ötszáz</title>");
        res.write("</head>");
        res.write("<body><form><pre>");

        // Kezd a kódolást innen -->
        const megoldas: Megoldas = new Megoldas("penztar.txt");
        //2. feladat
        res.write(`2. feladat\nA fizetések száma: ${megoldas.fizetesekSzama}\n\n`);

        res.write(`3. feladat\nAz első vásárló ${megoldas.elsoVasarloAruinakSzama} darab árucikket vásárolt.\n\n`);

        const u = url.parse(req.url as string, true).query;

        let sorszam: number = parseInt(u.sorszam as string);
        if (isNaN(sorszam) || sorszam > megoldas.fizetesekSzama || sorszam < 0) {
            sorszam = 2;
        }
        res.write(`4.feladat\nAdja meg egy vásárlás sorszámát! <input type='text' name='sorszam' value=${sorszam} style='width: 3em' onChange='this.form.submit();'>\n`);
        let arucikk: string = u.arucikk as string;
        if (isUndefined(arucikk) || isNull(arucikk) || arucikk === "") {
            arucikk = "kefe";
        }
        res.write(`Adja meg egy árucikk nevét! <input type='text' name='arucikk' value=${arucikk} style='width: 10em' onChange='this.form.submit();'>\n`);
        let darab: number = parseInt(u.darab as string);
        if (isNaN(darab) || darab < 0) {
            darab = 2;
        }
        res.write(`Adja meg egy árucikk nevét! <input type='text' name='darab' value=${darab} style='width: 3em' onChange='this.form.submit();'>\n\n`);

        if (isString(megoldas.eloszorVasaroltak(arucikk))) {
            res.write(`5. feladat\n${megoldas.eloszorVasaroltak(arucikk)}\n`);
        } else {
            res.write(`5. feladat\nAz első vásárlás sorszáma: ${megoldas.eloszorVasaroltak(arucikk)}\n`);
        }
        if (isString(megoldas.utoljaraVasaroltak(arucikk))) {
            res.write(`${megoldas.eloszorVasaroltak(arucikk)}\n`);
        } else {
            res.write(`Az utolsó vásárlás sorszáma: ${megoldas.utoljaraVasaroltak(arucikk)}\n`);
        }
        if (megoldas.hanyszorVasarolatak(arucikk) <= 0) {
            res.write(`${megoldas.hanyszorVasarolatak(arucikk)}`);
        } else {
            res.write(`${megoldas.hanyszorVasarolatak(arucikk)} vásárlás során vettek belőle.\n\n`);
        }
        res.write(`${darab} darab vételekor fizetendő: ${megoldas.fizetendoOsszeg(darab)}\n\n`);
        res.write("7. feladat\n");
        for (let i = 0; i < megoldas.darabEsAru(sorszam).length; i += 2) {
            res.write(`${megoldas.darabEsAru(sorszam)[i]} ${megoldas.darabEsAru(sorszam)[i + 1]}\n`);
        }
        megoldas.allomanybaIr("osszeg.txt");

        res.write("\nGithub repository link: <a href='https://github.com/molnardaniel2000/Otszaz.git'>https://github.com/molnardaniel2000/Otszaz.git</a>\n\n");

        res.write("A penztar.txt kiírása\n\n");

        fs.readFileSync("penztar.txt")
            .toString()
            .split("\n")
            .forEach(l => {
                res.write(l.trim() + "\n");
            });

        res.write("Az osszeg.txt kiírása\n\n");

        fs.readFileSync("osszeg.txt")
            .toString()
            .split("\n")
            .forEach(l => {
                res.write(l.trim() + "\n");
            });
        // <---- Fejezd be a kódolást

        res.write("</pre></form></body></html>");
        res.end();
    }
}
