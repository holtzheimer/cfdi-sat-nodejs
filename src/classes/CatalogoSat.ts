import path from "path";
import fs from "fs";
import pkg from "stream-json";
const { parser } = pkg;
import pakg from "stream-json/streamers/StreamArray.js";
const { streamArray } = pakg;
import { fileURLToPath } from "url";
const __dname: any = typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta?.url));

class CatalogoSat {
  private catPath: string | null;
  constructor(name: string) {
    this.catPath = null;
    const result = this.searchCatalogo(name);
    if (!result) throw new Error("There is no catalog");
  }
  private searchCatalogo(name: string) {
    try {
      const json_file = path.join(__dname, "resources", `catalogos/${name.toLowerCase()}.json`);
      if (fs.existsSync(json_file)) {
        this.catPath = json_file;
        return true;
      } else {
        return false;
      }
    } catch {
      return false;
    }
  }
  public search(key: string, value: string | number): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.catPath) return reject(new Error("The catalog does not exist"));

      const data = fs.createReadStream(this.catPath).pipe(parser()).pipe(streamArray());
      let found = false;
      data.on("data", (chunk) => {
        if (!chunk.value[key]) {
          return reject(new Error(`The specified key does not exist: ${key}`));
        }
        if (chunk.value[key].toString() === value.toString()) {
          found = true;
          data.destroy();
          return resolve(chunk.value);
        }
      });

      data.on("error", (err) => reject(err));
      data.on("end", () => {
        if (!found) reject(new Error("Not found"));
      });
    });
  }
}
export default CatalogoSat;
