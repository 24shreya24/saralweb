/**
 * Merges discontinuous time ranges within a given threshold.
 * 
 * @param {Array<[number, number]>} ranges - Array of [start, end) ranges (unsorted, may overlap)
 * @param {number} threshold - Max gap (in ms) allowed between ranges to still be merged
 * @returns {Array<[number, number]>} - Sorted, non-overlapping merged ranges
 */

const mergeTimeRanges = (ranges, threshold) => {
  if (!Array.isArray(ranges) || ranges.length === 0) return [];

  // Step 1: Sort ranges by start time
  ranges.sort((a, b) => a[0] - b[0]);

  const merged = [];
  let [currentStart, currentEnd] = ranges[0];

  for (let i = 1; i < ranges.length; i++) {
    const [nextStart, nextEnd] = ranges[i];

    // Check if overlapping or gap ≤ threshold
    if (nextStart <= currentEnd + threshold) {
      // Merge them
      currentEnd = Math.max(currentEnd, nextEnd);
    } else {
      // Push current and start a new range
      merged.push([currentStart, currentEnd]);
      [currentStart, currentEnd] = [nextStart, nextEnd];
    }
  }

  // Push the last range
  merged.push([currentStart, currentEnd]);

  return merged;
};

module.exports = {
  mergeTimeRanges
};
