/*
MIT License

Copyright (c) 2020 Robert M Pavey

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import { extractData } from "../../extension/site/wikitree/core/wikitree_extract_data.mjs";
import { generalizeData } from "../../extension/site/wikitree/core/wikitree_generalize_data.mjs";

import { runExtractDataTests } from "../test_utils/test_extract_data_utils.mjs";
import { runGeneralizeDataTests } from "../test_utils/test_generalize_data_utils.mjs";

const regressionData = [
  {
    caseName: "black-16695_read",
    url: "https://www.wikitree.com/wiki/Black-16695",
  },
  {
    caseName: "davey-2737_private",
    url: "https://www.wikitree.com/wiki/Davey-2737",
  },
  {
    caseName: "dickens-1530_private",
    url: "https://www.wikitree.com/wiki/Dickens-1530",
  },
  {
    caseName: "ellacott-59_read",
    url: "https://www.wikitree.com/wiki/Ellacott-59",
  },
  {
    // Scotland example
    caseName: "gow-822_read",
    url: "https://www.wikitree.com/wiki/Gow-822",
  },
  {
    caseName: "handford-3_read",
    url: "https://www.wikitree.com/wiki/Handford-3",
  },
  {
    caseName: "harrington-1500_private_with_pub_bio",
    url: "https://www.wikitree.com/index.php?title=Harrington-1500",
  },
  {
    caseName: "kimberlin-117_logged_out",
    url: "https://www.wikitree.com/wiki/Kimberlin-117",
  },
  {
    caseName: "littlemore-13_read",
    url: "https://www.wikitree.com/wiki/Littlemore-13",
  },
  {
    caseName: "mcdonald-1168_read",
    url: "https://www.wikitree.com/wiki/McDonald-1168",
  },
  {
    caseName: "moore-12982_private",
    url: "https://www.wikitree.com/wiki/Moore-12982",
  },
  {
    caseName: "pavey-342_edit",
    url: "https://www.wikitree.com/index.php?title=Special:EditPerson&u=22280837",
  },
  {
    caseName: "pavey-443_private",
    url: "https://www.wikitree.com/wiki/Pavey-443",
  },
  {
    caseName: "pavey-451_read",
    url: "https://www.wikitree.com/index.php?title=Pavey-451&public=1",
  },
  {
    caseName: "pavey-452_edit",
    url: "https://www.wikitree.com/index.php?title=Special:EditPerson&u=27023019",
  },
  {
    caseName: "pavey-455_read",
    url: "https://www.wikitree.com/index.php?title=Pavey-455&public=1",
  },
  {
    caseName: "pavey-459_edit",
    url: "https://www.wikitree.com/index.php?title=Special:EditPerson&u=27023237",
  },
  {
    caseName: "pavey-507_private",
    url: "https://www.wikitree.com/wiki/Pavey-507",
  },
  {
    // scotland, forenames over 15 chars
    caseName: "peffers-331_read",
    url: "https://www.wikitree.com/wiki/Peffers-331",
  },
  {
    caseName: "spencer-1038_read",
    url: "https://www.wikitree.com/wiki/Spencer-1038",
  },
  {
    // Has father but no mother
    caseName: "winbush-11_read",
    url: "https://www.wikitree.com/wiki/Winbush-11",
  },
];

async function runTests(testManager) {
  await runExtractDataTests("wikitree", extractData, regressionData, testManager);

  await runGeneralizeDataTests("wikitree", generalizeData, regressionData, testManager);
}

export { runTests };
