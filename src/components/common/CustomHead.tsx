import { Head } from 'next/document';

import fs from 'fs';
import { join } from 'path';

class CustomHead extends Head {
  getCssLinks = (): JSX.Element[] | null => {
    const { files } = this.context;
    if (!files || files.length === 0) return null;
    return files
      .filter((file) => /\.css$/.test(file))
      .map((file) => (
        <style
          key={file}
          dangerouslySetInnerHTML={{
            __html: fs.readFileSync(
              join(process.cwd(), '.next', file),
              'utf-8'
            ),
          }}
        />
      ));
  };
}

export default CustomHead;
