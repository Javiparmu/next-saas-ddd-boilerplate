import { Address } from '../../Shared/Address';

export class CustomerAddress {
  readonly value: Address;

  constructor(value: Address) {
    this.value = value;
  }
}
