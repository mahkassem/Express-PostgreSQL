export interface Post {
    id?: number
    user_id?: number
    image_url?: string
    title: string
    body: string
    author?: string
    comments?: Comment[]
    created_at?: string
}

export interface Comment {
    id?: number
    user_id?: number
    post_id?: number
    body: string
    author?: string
    created_at?: string
}
