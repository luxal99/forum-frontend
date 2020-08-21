import { Category } from './Category';
import { User } from './User';

export class Topics {
    title: string;
    id_category: Category;
    id_user: User;
    question:string;

    constructor(title?, id_category?, id_user?,question?) {
        this.title = title;
        this.id_category = id_category;
        this.id_user = id_user;
        this.question = question;
    }
}