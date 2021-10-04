import { ProfileInterface } from "./profile.interface";

export interface ArticleInterface {
    title: string,
		slug: string,
		body: string,
		description: string,
		createdAt: string,
		updatedAt: string,
		tagList: [
			string,
			string
		],
		favoritesCount: number,
		favorited: boolean,
		author: ProfileInterface
}
