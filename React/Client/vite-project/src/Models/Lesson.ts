export type Lesson = {
    id?: number;
    fileName: string;
    description: string;
    s3Key: string;
    transcriptionS3Key?: string
    transcriptionTextS3Key?: string
    fileType: string;
    size: number;
    updateDate?: Date;
    folderId: number;
    questions: {
        id: number;
        recordEntityId?: number;
        record?: Lesson;
        text: string;
        answers: Answer[];
    }[];
}
export type Question = {
    id: number;
    text: string;
    recordEntityId?: number
    record?: Lesson;
    answers?: Answer[]
}

// Normalize the Answers property into a separate entity  

export type Answer = {
    id: number;
    text: string;
    questionId?: number;
    question?: Question | null;
}

