const request = await fetch('https://api.tarteel.io/v1/aad/schedule/')
const json = await request.json()

const template = `<sub>_${json.surahNameEnTrans}_</sub><br>\n**Surah ${json.surahNameEn}** (${json.surah}: ${json.ayah})\n\n> ${json.englishTranslation}\n\n— ${json.hijriDate}H`
const markdown = await Deno.readTextFile('./README.md')

const regex = /^(<!--(?:\s|)AYAHADAY:(?:START|start)(?:\s|)-->)(?:\n|)([\s\S]*?)(?:\n|)(<!--(?:\s|)AYAHADAY:(?:END|end)(?:\s|)-->)$/gm
const result = markdown.replace(regex, `$1\n${template}\n$3`)

await Deno.writeTextFile('./README.md', result)
