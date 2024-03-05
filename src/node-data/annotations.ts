/**
 * This is the @Model annotation. Marks a class as a database table.
 */
export function Model() {
  return (ctor: Function) => { // eslint-disable-line
    if ((ctor as any)['model']) {
      (ctor as any)['isModel'] = true
    }
  }
}

/**
 * This is the @ModelField annotation. Marks a class property as a database field.
 */
export function ModelField(column: string) {
  return function (target: any, key: string) {
    if (!target.constructor['model']) {
      target.constructor['model'] = {}
    }

    const type = Reflect.getMetadata('design:type', target, key)
    target.constructor['model'][key] = {
      type: type.name.toLowerCase(),
      column,
    }
  }
}
