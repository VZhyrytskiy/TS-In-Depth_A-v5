import { setInitial } from '../new-decorators';

export class Library {
    @setInitial(10) id!: number;
    name!: string;
    address!: string;
}
