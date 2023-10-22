import fs from 'fs';
import path from 'path';

export default function btojpg(film) {
  const jpg = [];
  film.forEach((x) => {
    const data = fs.readFileSync(path.resolve('uploadDir', x.boritokep), 'base64');
    jpg.push(data);
  });
  return jpg;
}
