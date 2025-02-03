
export type Currency = {
    isoCode: string,
    flagIcon: string,
    name: string,
    symbol: string
}
export const currencies : Array<Currency> = [
    {
        isoCode: "NAD",
        flagIcon: "🇳🇦",
        name:"Namibian Dollar",
        symbol: "N$"
    },
    {
        isoCode: "ZAR",
        flagIcon: "🇿🇦",
        name:"South African Rand",
        symbol: "R"
    },
    {
        isoCode: "AOA",
        flagIcon: "🇦🇴",
        name: "Angolan Kwanza",
        symbol: "Kz"
      },
      {
        isoCode: "BWP",
        flagIcon: "🇧🇼",
        name: "Botswana Pula",
        symbol: "P"
      },
    {
        isoCode: "ZMW",
        flagIcon: "🇿🇲",
        name:"Zambian Kwacha",
        symbol: "K"
    },
    {
        isoCode: "USD",
        flagIcon: "🇺🇸",
        name:"United States Dollar",
        symbol: "$"
    },
    {
        isoCode: "GBP",
        flagIcon: "🇬🇧",
        name:"Great British Pound (Sterling)",
        symbol: "£"
    },
    {
        isoCode: "EUR",
        flagIcon: "🇪🇺",
        name:"Euro",
        symbol: "€"
    },
]
