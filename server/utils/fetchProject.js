const axios = require("axios");

const fetchProject = async (repoUrl) => {
  if (!repoUrl) {
    throw new Error("GitHub repository URL is required");
  }

  const regex = /https:\/\/github\.com\/([^\/]+)\/([^\/]+)/;
  const match = repoUrl.match(regex);
  if (!match) {
    throw new Error("Invalid GitHub repository URL");
  }
  const username = match[1];
  const repoName = match[2];
  const apiUrl = `https://api.github.com/repos/${username}/${repoName}/readme`;

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Accept: "application/vnd.github.v3.raw",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch project content");
  }
};

module.exports = { fetchProject };