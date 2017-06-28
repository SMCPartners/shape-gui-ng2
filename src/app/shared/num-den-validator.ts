import {FormGroup} from "@angular/forms";

export function numDenValidator (group: FormGroup): any {

  const numKey = Object.keys(group.controls)[0];
  const denKey = Object.keys(group.controls)[1];
  const numControl = group.get(numKey);
  const denControl = group.get(denKey);

  if (!numControl.dirty || !denControl.dirty) {
    return null;
  }
  if (numControl.dirty && numControl.value !== '' && denControl.dirty && denControl.value !== '') {

    if (numControl.value > denControl.value) {
      return {
        denominatorHigher: true
      }
    }
  }
  return null;
}
