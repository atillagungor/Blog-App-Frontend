export interface PostCreateResponseModel {
    id: string;
    title: string;
    content: string;
    createdDate: Date;
    userId: string;
    categoryId: string;
}