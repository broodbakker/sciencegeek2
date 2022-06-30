import * as R from "ramda";

export const whatNumbersToshow = (current: number, total: number): number[] => {
  if (current === 1 && total === 1) { return [1] }
  if ((current === 1 || current === 2) && total > 3) { return [1, 2, 3] }
  if (current === 1 && total <= 3) { return R.range(1, total + 1)}
  if (current === 2 && total <= 3) { return [1, 2] }
  if (current > 1 && total - current > 0) {
    return [current - 1, current, current + 1] }

  return [current - 2, current - 1, current]

}