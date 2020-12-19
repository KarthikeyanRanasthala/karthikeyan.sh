import { Head } from 'next/document';

import fs from 'fs';
import { join } from 'path';

// Copied from https://github.com/vercel/next.js/blob/7d48241949bc7bac7b8e30fda6be71f37286886f/packages/next/pages/_document.tsx#L40
type DocumentFiles = {
  sharedFiles: readonly string[];
  pageFiles: readonly string[];
  allFiles: readonly string[];
};

class CustomHead extends Head {
  getCssLinks = (files: DocumentFiles): JSX.Element[] | null => {
    const { allFiles } = files;
    if (!allFiles || allFiles.length === 0) return null;
    return allFiles
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
