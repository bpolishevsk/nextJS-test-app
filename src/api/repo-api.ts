import { ContributorType, RepoType } from './../utils/types';

export const getTopContributors = async ( { page, perPage } : { page: number, perPage: number}) => {
    try {
        const response = await fetch(`https://api.github.com/repos/angular/angular/contributors?page=${page}&per_page=${perPage}`);
        const responseContributors = await response.json();
        const repoItems: ContributorType[] = responseContributors.map((item:any) => ({
            avatar: item?.avatar_url,
            name: item?.login,
            commits: item?.contributions,
            github: ""
        }))
        return repoItems;
    } catch (error) {
        return [];
    }
}

export const getReposWithUser = async ({ user } : { user: string } ) => {
    try {
        const response = await fetch(`https://api.github.com/users/${user}/repos`);
        const responseRepos = await response.json();
        const reposItems: RepoType[] = responseRepos.map((item: any) => ({
            name: item?.name,
            forked: item?.fork,
            stars: item?.stargazers_count,
            lastUpdated: item?.updated_at
        }))
        return reposItems;
    } catch (error) {
        return [];
    }
}