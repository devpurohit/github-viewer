import { Octokit } from "@octokit/core";

class GithubApi {
  // I am using a single repo for demonstration hence the owner and repo variables are static
  constructor(token) {
    this.octokit = new Octokit({ auth: token });
    this.owner = "axios";
    this.repo = "axios";
    this.perPage = 5;
    this.issueLabelsCache = {};
  }

  async getLatestIssues({
    per_page = 5,
    page = 1,
    state = "open",
    filterLabels = "",
  }) {
    const response = await this.octokit.request(
      `GET /repos/${this.owner}/${this.repo}/issues`,
      {
        per_page,
        page: page + 1,
        state,
        labels: filterLabels,
      }
    );

    return response.data;
  }

  async getLatestPullRequests({
    per_page = 5,
    page = 1,
    state = "open",
    sort = "created",
  }) {
    const response = await this.octokit.request(
      `GET /repos/${this.owner}/${this.repo}/pulls`,
      {
        per_page,
        page: page + 1,
        state,
        sort,
      }
    );
    return response.data;
  }

  async getPullRequestComments(pullRequestNumber) {
    const response = await this.octokit.request(
      `GET /repos/${this.owner}/${this.repo}/pulls/${pullRequestNumber}/comments`
    );
    return response.data;
  }

  async getIssueLabels() {
    if (this.issueLabelsCache.labels) {
      return this.issueLabelsCache.labels;
    }

    const response = await this.octokit.request(
      `GET /repos/${this.owner}/${this.repo}/labels`
    );

    this.issueLabelsCache.labels = response.data;
    return response.data;
  }
}

const githubApi = new GithubApi(process.env.REACT_APP_GITHUB_API_KEY);

export default githubApi;
