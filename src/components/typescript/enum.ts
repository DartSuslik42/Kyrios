enum Hardness {
    Easy,
    Medium,
    Hard
}
const localHardness_1 = Hardness.Easy // 0
const localHardness_2 = Hardness[2] // "Hard" - из-за специфики реализации enum

enum Letters {
    A = "Alpha",
    B = "Bravo",
    C = "Charly",
    //...
}
const GoingToPoint = Letters.A // "Alpha"