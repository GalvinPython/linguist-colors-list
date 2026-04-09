import fs from "fs"
import YAML from "yaml"
import { type ColorRoot } from "../src/index.ts"

// Types
export type LanguageInfo = {
    type: string
    color: string
    extensions: string[]
    tm_scope: string
    ace_mode: string
    language_id: number
}

export type Root = Record<string, LanguageInfo>

// Utils
async function fetchLinguistData(): Promise<void> {
    const response = await fetch("https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml")
    const text = await response.text()
    const data = YAML.parse(text) as Root
    const dataOut = {} as ColorRoot

    // Only keep the color property
    // If there is no color, set it to #ededed
    for (const key in data) {
        if (!data[key].color) {
            data[key].color = "#ededed"
        }
        dataOut[key] = {
            color: data[key].color
        }
    }
    console.dir(dataOut, { depth: null })

    // Save to src/index.ts
    const fileContent = `export type LanguageInfo = {
    color: string
}

export type ColorRoot = Record<string, LanguageInfo>

export function getLanguageColor(language: string): string {
    const data = linguistData
    if (data[language]) {
        return data[language].color
    }
    return "#ededed"
}

export const linguistData: ColorRoot = ${JSON.stringify(dataOut, null, 4)}
`
    fs.writeFileSync("src/index.ts", fileContent)

    // Also update the version in package.json to today's date in the format x.x.yyyymmdd
    const packageJson = JSON.parse(fs.readFileSync("package.json", "utf-8"))
    packageJson.version = `${packageJson.version.split(".")[0]}.${packageJson.version.split(".")[1]}.${new Date().toISOString().slice(0, 10).replace(/-/g, "")}`
    fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 4))
}
fetchLinguistData()