import assert from 'node:assert/strict';
import {
  patternCells,
  practicePalette,
  practicePatterns,
} from '../src/lib/grid-maker/pixel-practice';

for (const [index, pattern] of practicePatterns.entries()) {
  assert.equal(pattern.rows.length, 8);
  assert.ok(pattern.rows.every((row) => row.length === 8));
  const small = patternCells(index, 8);
  const large = patternCells(index, 16);
  assert.equal(small.length, 64);
  assert.equal(large.length, 256);
  assert.ok(
    small.every(
      (color) =>
        Number.isInteger(color) && color >= 0 && color < practicePalette.length
    )
  );
  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      assert.equal(
        large[y * 16 + x],
        small[Math.floor(y / 2) * 8 + Math.floor(x / 2)]
      );
    }
  }
}
console.log('Passed all six original patterns at 8x8 and 16x16.');
