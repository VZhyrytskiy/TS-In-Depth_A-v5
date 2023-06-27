import * as Interfaces from '../interfaces';
import { sealed, logParameter, logMethod,  } from '../decorators';
import { freeze, writable, logger, format } from './../new-decorators';

// @logger
// @sealed('UniversityLibrarian')
// @freeze('UniversityLibrarian')
export class UniversityLibrarian implements Interfaces.Librarian {
    @format() accessor name!: string;
    email!: string;
    department!: string;

    // @logMethod
    assistCustomer(/* @logParameter */ custName: string, bookTitle: string): void {
        console.log(`${this.name} is assisting ${custName} with the book ${bookTitle}`);
    }

    @writable(true)
    assistFaculty() {
        console.log('Assisting faculty.');
    }

    @writable(false)
    teachCommunity() {
        console.log('Teaching community.');
    }
}
