import { useState, useEffect } from 'react';

interface GitHubStats {
    publicRepos: number;
    contributions: number;
    isLoading: boolean;
    error: string | null;
}

const GITHUB_USERNAME = 'ToyaOkey';

export const useGitHubStats = (): GitHubStats => {
    const [stats, setStats] = useState<GitHubStats>({
        publicRepos: 0,
        contributions: 0,
        isLoading: true,
        error: null,
    });

    useEffect(() => {
        const fetchGitHubStats = async () => {
            try {
                // Fetch user info to get public repos count
                const userResponse = await fetch(
                    `https://api.github.com/users/${GITHUB_USERNAME}`,
                    {
                        headers: {
                            'Accept': 'application/vnd.github.v3+json',
                        },
                    }
                );

                if (!userResponse.ok) {
                    throw new Error('Failed to fetch GitHub user data');
                }

                const userData = await userResponse.json();
                const publicRepos = userData.public_repos || 0;

                // For contributions, we'll estimate from public activity
                // Note: GitHub REST API doesn't directly provide contribution count
                // We'll use public events to estimate contributions
                let contributions = 0;
                
                try {
                    // Fetch public events to estimate contributions
                    const eventsResponse = await fetch(
                        `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=100`,
                        {
                            headers: {
                                'Accept': 'application/vnd.github.v3+json',
                            },
                        }
                    );

                    if (eventsResponse.ok) {
                        const events = await eventsResponse.json();
                        
                        // Count contribution-related events (PushEvent, PullRequestEvent, etc.)
                        const contributionEvents = events.filter((event: any) => 
                            ['PushEvent', 'PullRequestEvent', 'IssuesEvent', 'CreateEvent'].includes(event.type)
                        );
                        
                        // Count unique contribution days in the last year
                        const contributionDays = new Set<string>();
                        const oneYearAgo = new Date();
                        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

                        contributionEvents.forEach((event: any) => {
                            if (event.created_at) {
                                const eventDate = new Date(event.created_at);
                                if (eventDate >= oneYearAgo) {
                                    const dateStr = eventDate.toISOString().split('T')[0];
                                    contributionDays.add(dateStr);
                                }
                            }
                        });

                        contributions = Math.max(
                            contributionDays.size * 3, // Average 3 contributions per active day
                            contributionEvents.length // Or use total events as fallback
                        );
                    }
                } catch (error) {
                    console.warn('Could not fetch contribution data:', error);
                    contributions = publicRepos * 15;
                }

                setStats({
                    publicRepos,
                    contributions: Math.min(contributions, 1000), 
                    isLoading: false,
                    error: null,
                });
            } catch (error) {
                console.error('Error fetching GitHub stats:', error);
                setStats({
                    publicRepos: 0,
                    contributions: 0,
                    isLoading: false,
                    error: error instanceof Error ? error.message : 'Unknown error',
                });
            }
        };

        fetchGitHubStats();
    }, []);

    return stats;
};

