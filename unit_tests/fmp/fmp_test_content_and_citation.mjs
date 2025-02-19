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

import { extractData } from "../../extension/site/fmp/core/fmp_extract_data.mjs";
import { generalizeData } from "../../extension/site/fmp/core/fmp_generalize_data.mjs";
import { buildCitation } from "../../extension/site/fmp/core/fmp_build_citation.mjs";
import { buildHouseholdTable } from "../../extension/base/core/table_builder.mjs";

import { runExtractDataTests } from "../test_utils/test_extract_data_utils.mjs";
import { runGeneralizeDataTests } from "../test_utils/test_generalize_data_utils.mjs";
import { runBuildCitationTests } from "../test_utils/test_build_citation_utils.mjs";

const regressionData = [
  {
    caseName: "au_sa_births_1915_raymond_barltrope",
    url: "https://www.findmypast.co.uk/transcript?id=ANZ%2FAU%2FSA%2FBMD%2FB%2F0000594453",
  },
  {
    caseName: "au_sa_deaths_1936_louisa_whittenbury",
    url: "https://www.findmypast.co.uk/transcript?id=ANZ%2FAU%2FSA%2FBMD%2FD%2F0000408461",
  },
  {
    caseName: "au_sa_marriages_1887_maria_austin",
    url: "https://www.findmypast.co.uk/transcript?id=ANZ%2FAU%2FSA%2FBMD%2FM%2F0000042031%2F2",
  },
  {
    caseName: "au_will_book_1908_robert_walbutton",
    url: "https://www.findmypast.co.uk/transcript?id=ANZ%2FNSWWILLS%2F563548",
  },
  {
    caseName: "birth_reg_pavey-342",
    url: "https://www.findmypast.co.uk/transcript?id=BMD%2FB%2F1852%2F3%2FIS%2F000879%2F027",
  },
  {
    caseName: "british_india_marriage_1881_albert_woods",
    url: "https://www.findmypast.co.uk/transcript?id=BL%2FBIND%2FM%2F69318%2F1",
  },
  {
    caseName: "census_1911_pavey-342",
    url: "https://www.findmypast.co.uk/transcript?id=GBC%2F1911%2FRG14%2F00802%2F0395%2F1",
  },
  {
    caseName: "cornwall_marriage_1708_edward_bettison",
    url: "https://www.findmypast.co.uk/transcript?id=GBPRS%2FM%2F959021462%2F1",
  },
  {
    caseName: "cornwall_memorial_1803_joyce_werry",
    url: "https://www.findmypast.co.uk/transcript?id=GBPRS%2FD%2F77171415%2F1",
  },
  {
    // in Wales and past the 1915 cutoff on early Ancestry death reg collection
    caseName: "death_reg_isaac_ellaway_1939",
    url: "https://www.findmypast.co.uk/transcript?id=BMD%2FD%2F1939%2F4%2FAZ%2F000273%2F035",
  },
  {
    caseName: "death_reg_pavey-342",
    url: "https://www.findmypast.co.uk/transcript?id=BMD%2FD%2F1914%2F1%2FAZ%2F000845%2F005",
  },
  {
    caseName: "devon_baptisms_pavey-342",
    url: "https://www.findmypast.co.uk/transcript?id=GBPRS%2FB%2F31077260%2F1",
  },
  {
    caseName: "devon_baptisms_pavey-433",
    url: "https://www.findmypast.co.uk/transcript?id=GBPRS%2FB%2F31067794%2F1",
  },
  {
    caseName: "england_1939_register_pavey-452",
    url: "https://www.findmypast.co.uk/transcript?id=TNA%2FR39%2F0261%2F0261B%2F008%2F18",
  },
  {
    caseName: "england_1939_register_rosemary_white",
    url: "https://www.findmypast.co.uk/transcript?id=TNA%2FR39%2F1946%2F1946D%2F027%2F38",
  },
  {
    caseName: "england_burial_1870_john_moore",
    url: "https://www.findmypast.co.uk/transcript?id=GBPRS%2FPORTSMOUTH%2FBUR%2F00238041",
  },
  {
    caseName: "england_census_1871_mary_forster",
    url: "https://www.findmypast.co.uk/transcript?id=GBC%2F1871%2F0011811498",
    optionVariants: [
      {
        variantName: "narrative_1",
        thisTypeOnly: "narrative",
        optionOverrides: {
          narrative_census_includeOccupation: "no",
          narrative_census_householdPartFormat: "withFamily",
          narrative_census_includeHousehold: "inMainSentence",
        },
      },
      {
        variantName: "narrative_2",
        thisTypeOnly: "narrative",
        optionOverrides: {
          narrative_census_includeOccupation: "inMainSentence",
          narrative_general_occupationFormat: "lowerCase",
          narrative_census_ageFormat: "commasAge",
        },
      },
      {
        variantName: "narrative_3",
        thisTypeOnly: "narrative",
        optionOverrides: {
          narrative_census_includeOccupation: "inSeparateSentence",
        },
      },
    ],
  },
  {
    caseName: "england_census_1871_robert",
    url: "https://www.findmypast.co.uk/transcript?id=GBC%2F1871%2F0003951781",
    optionVariants: [
      {
        variantName: "narrative_1",
        thisTypeOnly: "narrative",
        optionOverrides: {
          narrative_census_householdPartFormat: "withFamily",
        },
      },
    ],
  },
  {
    caseName: "england_census_1901_charles_pavey_son",
    url: "https://www.findmypast.co.uk/transcript?id=GBC/1901/0005222325",
    optionVariants: [
      {
        variantName: "narrative_1",
        thisTypeOnly: "narrative",
        optionOverrides: {
          narrative_census_householdPartFormat: "withFamily",
        },
      },
      {
        variantName: "narrative_2",
        thisTypeOnly: "narrative",
        optionOverrides: {
          narrative_census_includeHousehold: "inSeparateSentence",
          narrative_census_includeAge: "inSeparateSentence",
          narrative_census_includeOccupation: "inSeparateSentence",
          narrative_census_householdPartFormat: "withFamily",
        },
      },
      {
        variantName: "narrative_3",
        thisTypeOnly: "narrative",
        optionOverrides: {
          narrative_census_includeHousehold: "inSeparateSentence",
          narrative_census_householdPartFormat: "relationship",
        },
      },
    ],
  },
  {
    caseName: "england_census_1901_ralph_pavey_son",
    url: "https://www.findmypast.co.uk/transcript?id=GBC/1901/0005222326",
    optionVariants: [
      {
        variantName: "narrative_1",
        thisTypeOnly: "narrative",
        optionOverrides: {
          narrative_census_householdPartFormat: "withFamily",
        },
      },
      {
        variantName: "narrative_2",
        thisTypeOnly: "narrative",
        optionOverrides: {
          narrative_census_householdPartFormat: "withFamily",
          narrative_census_includeOccupation: "inSeparateSentenceHead",
        },
      },
    ],
  },
  {
    caseName: "england_census_1911_daisy_rosling",
    url: "https://www.findmypast.co.uk/transcript?id=GBC%2F1911%2FRG14%2F00566%2F0175%2F3",
    optionVariants: [
      {
        variantName: "narrative_1",
        thisTypeOnly: "narrative",
        optionOverrides: {
          narrative_census_householdPartFormat: "withFamily",
        },
      },
    ],
  },
  {
    caseName: "england_census_1911_mary_wacey",
    url: "https://www.findmypast.co.uk/transcript?id=GBC/1911/RG14/11601/0101/2",
    optionVariants: [
      {
        variantName: "narrative_1",
        thisTypeOnly: "narrative",
        optionOverrides: {
          narrative_census_householdPartFormat: "withFamily",
          narrative_census_includeHousehold: "inMainSentence",
        },
      },
      {
        variantName: "narrative_2",
        thisTypeOnly: "narrative",
        optionOverrides: {
          narrative_census_householdPartFormat: "withFamily",
          narrative_census_includeOccupation: "inSeparateSentenceHead",
        },
      },
    ],
  },
  {
    caseName: "england_census_1921_arthur_pavey",
    url: "https://www.findmypast.co.uk/transcript?id=GBC/1921/RG15/12939/0163/01",
    optionVariants: [
      {
        variantName: "narrative_1",
        thisTypeOnly: "narrative",
        optionOverrides: {
          narrative_census_includeOccupation: "no",
          narrative_census_householdPartFormat: "withFamily",
          narrative_census_includeHousehold: "inMainSentence",
        },
      },
      {
        variantName: "narrative_2",
        thisTypeOnly: "narrative",
        optionOverrides: {
          narrative_census_includeOccupation: "inMainSentence",
          narrative_general_occupationFormat: "lowerCase",
          narrative_census_householdPartFormat: "withFamily",
          narrative_census_wasPartFormat: "wasEnumerated",
          narrative_census_ageFormat: "commasAge",
        },
      },
      {
        variantName: "narrative_3",
        thisTypeOnly: "narrative",
        optionOverrides: {
          narrative_census_wasPartFormat: "wasEnumerated",
          narrative_census_includeOccupation: "inSeparateSentence",
        },
      },
    ],
  },
  {
    caseName: "england_divorce_louisa_smith_1893",
    url: "https://www.findmypast.co.uk/transcript?id=GBOR%2FDIV%2F364111",
  },
  {
    caseName: "england_marriage_1835_isaac_barter",
    url: "https://www.findmypast.co.uk/transcript?id=GBPRS%2FM%2F810019037%2F1",
  },
  {
    caseName: "england_devon_marriage_1841_maria_torr",
    url: "https://www.findmypast.co.uk/transcript?id=GBPRS%2FDEV%2FBANNS%2F86127%2F2",
  },
  {
    caseName: "england_leics_marriage_1844_jane_cox",
    url: "https://www.findmypast.co.uk/transcript?id=GBPRS%2FLEICS%2FMAR%2F00260146%2F2",
    optionVariants: [
      {
        variantName: "narrative_1",
        thisTypeOnly: "narrative",
        optionOverrides: {
          narrative_marriage_ageFormat: "commasAge",
        },
      },
      {
        variantName: "narrative_2",
        thisTypeOnly: "narrative",
        optionOverrides: {
          narrative_marriage_ageFormat: "plainAged",
        },
      },
      {
        variantName: "narrative_3",
        thisTypeOnly: "narrative",
        optionOverrides: {
          narrative_marriage_includeAge: "inSeparateSentence",
        },
      },
    ],
  },
  {
    caseName: "england_parish_baptism_1823_william_more",
    url: "https://www.findmypast.co.uk/transcript?id=GBPRS%2FB%2F220095549%2F1",
  },
  {
    caseName: "england_parish_baptism_littlemore-13",
    url: "https://www.findmypast.co.uk/transcript?id=R_950288928",
  },
  {
    caseName: "england_parish_marriage_1799_moses_littlemore",
    url: "https://www.findmypast.co.uk/transcript?id=GBPRS%2FM%2F770409281%2F1",
  },
  {
    caseName: "england_parish_marriage_1856_emily_spiller",
    url: "https://www.findmypast.co.uk/transcript?id=GBPRS/DEV/MAR/122154/2",
  },
  {
    caseName: "england_probate_1907_william_rigby",
    url: "https://www.findmypast.co.uk/transcript?id=GBOR%2FGOVPROBATE%2FC%2F1907-1907%2F00046991",
  },
  {
    caseName: "england_probate_1941_alfred_maton",
    url: "https://www.findmypast.co.uk/transcript?id=GBOR%2FGOVPROBATE%2FC%2F1941-1941%2F00094861",
  },
  {
    caseName: "england_probate_charles_blake_1795",
    url: "https://www.findmypast.co.uk/transcript?id=GBPRS%2FCHS%2F748133659",
  },
  {
    caseName: "england_rutland_banns_1864_thomas_strickland",
    url: "https://www.findmypast.co.uk/transcript?id=GBPRS%2FLEICS%2FBANNS%2F00070573%2F1",
  },
  {
    caseName: "nz_electoral_roll_1874_robert_wallbutton",
    url: "https://www.findmypast.co.uk/transcript?id=ANZ%2FDWILSON_1865TO1875NZ%2F287077",
  },
  {
    caseName: "parish_marriage_pavey-343",
    url: "https://www.findmypast.co.uk/transcript?id=R_858111454",
  },
  {
    caseName: "uk_death_reg_1997_leslie_collins",
    url: "https://www.findmypast.co.uk/transcript?id=BMD%2FD%2F1997%2F9%2F81840835",
  },
  {
    caseName: "us_census_1860_betsey_gardener",
    url: "https://www.findmypast.co.uk/transcript?id=USC%2F1860%2F0000634121703",
  },
  {
    caseName: "wales_baptism_1908_bruce_ridd",
    url: "https://search.findmypast.co.uk/record?id=GBPRS/B/871892573/1",
  },
  {
    caseName: "wales_teacher_reg_1917_ivor_john",
    url: "https://www.findmypast.co.uk/transcript?id=GBOR%2FTCHIX%2F45336",
  },
  {
    caseName: "wales_census_1851_catherine_flaningan",
    url: "https://www.findmypast.co.uk/transcript?id=GBC/1851/0016942518&expand=true",
  },

  // Image pages
  // It turns out that we can't test image pages in Unit Tests because the retrieveWindowVariables function
  // in extract does not work - it depends on javascript running in the browser
  //{
  //  caseName: "zz_image_england_census_1921_arthur_pavey",
  //  url: "https://search.findmypast.co.uk/record?id=GBC%2F1921%2FRG15%2F12939%2F0163&parentid=GBC%2F1921%2FRG15%2F12939%2F0163%2F01",
  //},

  // Person pages

  {
    caseName: "xx_person_john_kimberlin_1800_1871",
    url: "https://tree.findmypast.co.uk/#/trees/918c5b61-df62-4dec-b840-31cad3d86bf9/1181964933/profile",
  },
];

const optionVariants = [
  {
    variantName: "dataStyle_none",
    optionOverrides: {
      citation_fmp_dataStyle: "none",
    },
  },
  {
    variantName: "dataStyle_string",
    optionOverrides: {
      citation_fmp_dataStyle: "string",
    },
  },
  {
    variantName: "dataStyle_list",
    optionOverrides: {
      citation_fmp_dataStyle: "list",
    },
  },
  {
    variantName: "dataStyle_table",
    optionOverrides: {
      citation_fmp_dataStyle: "table",
    },
  },
];

async function runTests(testManager) {
  await runExtractDataTests("fmp", extractData, regressionData, testManager);

  await runGeneralizeDataTests("fmp", generalizeData, regressionData, testManager);

  await runBuildCitationTests("fmp", buildCitation, buildHouseholdTable, regressionData, testManager, optionVariants);
}

export { runTests };
