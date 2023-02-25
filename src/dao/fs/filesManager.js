import fs from "fs";

export default class FilesManager {
  constructor(file) {
    file = `${process.cwd()}/src/file/${file}`;
  }

  async loadItems() {
    if (fs.existsSync(this.file)) {
      const data = await fs.promises.readFile(this.file);
      const response = JSON.parse(data);
      return response;
    }
    return "no se encuentra el archivo";
  }
}