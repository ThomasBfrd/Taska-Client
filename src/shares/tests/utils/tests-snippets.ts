import { DebugElement, Predicate } from "@angular/core";
import { By } from "@angular/platform-browser"

export const getByTestId = (testId: string): Predicate<DebugElement> => {
  return By.css(`[data-testid="${testId}"]`);
}
