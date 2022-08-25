export class AttributeWithNameAlreadyExists extends Error {
  message: string
  name: 'ATTRIBUTE_WITH_NAME_ALREADY_EXISTS'
  constructor(name?: string) {
    super()
    if (name) {
      this.message = `attribute with name ${name} already exist`
    } else {
      this.message = 'attribute with the provided name already exists'
    }
  }
}
