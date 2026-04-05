// Test the getLanguageColor function
import { getLanguageColor, linguistData } from "../src/index"

describe("getLanguageColor", () => {
    it("returns the correct color for a known language", () => {
        const color = getLanguageColor("TypeScript")
        expect(color).toBe("#3178c6")
    })

    it("returns the fallback color for unknown language", () => {
        const color = getLanguageColor("NonExistentLang")
        expect(color).toBe("#ededed")
    })
})

// Test the linguistData object
describe("linguistData", () => {
    it("has color for each language", () => {
        Object.values(linguistData).forEach(lang => {
            expect(lang.color).toMatch(/^#[0-9a-fA-F]{6}$/)
        })
    })

    it("has only string keys", () => {
        Object.keys(linguistData).forEach(key => {
            expect(typeof key).toBe("string")
        })
    })
})

// Test that linguistData includes some popular languages
it("includes popular languages", () => {
    expect(linguistData).toHaveProperty("JavaScript")
    expect(linguistData).toHaveProperty("TypeScript")
    expect(linguistData).toHaveProperty("Python")
    expect(linguistData).toHaveProperty("Java")
    expect(linguistData).toHaveProperty("C++")
})

// Snapshot test for language colors
// Not really needed, but for future reference
// it("matches language colors snapshot", () => {
//     expect(
//         Object.fromEntries(
//             Object.entries(linguistData).map(([name, info]) => [name, info.color])
//         )
//     ).toMatchSnapshot()
// })