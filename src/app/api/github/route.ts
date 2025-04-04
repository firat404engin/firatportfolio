import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const username = 'firat404engin';
    
    // GitHub GraphQL API'sini kullanarak pinlenmiş projeleri çek
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Authorization': `bearer ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            user(login: "${username}") {
              pinnedItems(first: 6, types: REPOSITORY) {
                nodes {
                  ... on Repository {
                    id
                    name
                    description
                    url
                    stargazerCount
                    forkCount
                    primaryLanguage {
                      name
                      color
                    }
                    updatedAt
                  }
                }
              }
            }
          }
        `
      })
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.errors) {
      console.error('GraphQL Errors:', data.errors);
      throw new Error(data.errors[0].message);
    }
    
    // Pinlenmiş projeleri al
    const pinnedRepos = data.data?.user?.pinnedItems?.nodes || [];
    
    // Eğer pinlenmiş proje yoksa veya hata varsa, boş dizi dön
    if (!pinnedRepos || pinnedRepos.length === 0) {
      return NextResponse.json([]);
    }
    
    return NextResponse.json(pinnedRepos);
  } catch (error) {
    console.error('GitHub API error:', error);
    return NextResponse.json(
      { error: 'GitHub projelerini getirirken bir hata oluştu' },
      { status: 500 }
    );
  }
} 