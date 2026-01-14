
export interface PostResponse {
    id: number;
    caption: string;
    imageUrl: string;
    location?: string;
    createdAt: string;
    username: string;
    userAvatar?: string;
    likeCount: number;
    commentCount: number;
    liked: boolean;
}

export interface User {
    id: number;
    username: string;
    fullName: string;
    avatarUrl?: string;
}

export interface RelationshipDto {
    isFollowing: boolean;
    isFriend: boolean;
    message: string;
    followersCount: number;
    followingsCount: number;
}