export type Lesson = {
    id?: number;
    fileName: string;
    description: string;
    s3Key: string;
    fileType: string;
    size: number;
    updateDate?: Date;
    folderId: number;

    // courseId: number; check if this is necessary  
}

