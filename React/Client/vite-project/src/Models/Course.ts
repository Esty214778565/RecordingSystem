import { Lesson } from "./Lesson";


export type Course = {
    id: number;
    name: string;
    teacherId?: number|null;
    createDate: Date;
    updateDate: Date;
    isDeleted: boolean;
    parentFolderId?:number|null;//check
     records: Lesson[]; 
}