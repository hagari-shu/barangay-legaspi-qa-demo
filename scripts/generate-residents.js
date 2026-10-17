import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const firstNames = [
  'Amihan', 'Bayani', 'Carmela', 'Dalisay', 'Elena',
  'Felipe', 'Giselle', 'Haraya', 'Isagani', 'Jovita',
]
const lastNames = [
  'Abad', 'Aguilar', 'Bautista', 'Cabrera', 'Dizon',
  'Enriquez', 'Flores', 'Garcia', 'Hernandez', 'Ignacio',
]
const argumentsList = process.argv.slice(2)
const getOption = (name) => {
  const index = argumentsList.indexOf(name)
  return index >= 0 ? argumentsList[index + 1] : ''
}
const countValue = Number(getOption('--count') || 100)
const outputPath = path.resolve(getOption('--out') || path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'demo-residents.json'))

if (!Number.isInteger(countValue) || countValue < 1 || countValue > 100) {
  throw new Error('--count must be an integer from 1 to 100.')
}
if (argumentsList.some((argument) => argument.startsWith('--') && !['--count', '--out'].includes(argument))
  || argumentsList.some((argument, index) => ['--count', '--out'].includes(argument) && !argumentsList[index + 1])) {
  throw new Error('Usage: node scripts/generate-residents.js [--count 1..100] [--out file.json]')
}

const residents = Array.from({ length: countValue }, (_, index) => {
  const sequence = index + 1
  const zone = (index % 5) + 1
  const purok = (index % 10) + 1
  const firstName = firstNames[index % firstNames.length]
  const lastName = lastNames[Math.floor(index / firstNames.length)]
  const birthYear = 1950 + (index % 50)

  return {
    demoId: `QA-DEMO-${String(sequence).padStart(3, '0')}`,
    firstName,
    lastName,
    email: `demo.resident.${String(sequence).padStart(3, '0')}@example.test`,
    mobile: `0900000${String(sequence + 1000).padStart(4, '0')}`,
    birthDate: `${birthYear}-${String((index % 12) + 1).padStart(2, '0')}-${String((index % 27) + 1).padStart(2, '0')}`,
    sex: index % 2 === 0 ? 'Female' : 'Male',
    householdId: `QA-HH-${String(sequence).padStart(3, '0')}`,
    familyMembers: (index % 6) + 1,
    status: 'Active Resident',
    address: `QA Sample Purok ${purok}, Zone ${zone}, Test District`,
    zone,
  }
})

await fs.writeFile(outputPath, `${JSON.stringify(residents, null, 2)}\n`, 'utf8')
console.log(`Generated ${residents.length} synthetic QA resident profiles at ${outputPath}`)
