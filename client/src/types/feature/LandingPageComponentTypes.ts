export interface IVideo {
    id: number;
    title: string;
    description: string;
    embedId: string;
}

export interface IVideoRequest{
    page: number;
    query?: string;
}