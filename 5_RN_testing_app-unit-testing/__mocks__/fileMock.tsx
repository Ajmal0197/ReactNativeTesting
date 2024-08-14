// `module.exports = 'test-file-stub';` is used in testing to mock non-JS files like images. When your code imports a file (e.g., `logo.png`), this line makes sure Jest returns a placeholder string (`'test-file-stub'`) instead of trying to load the actual file during tests.
module.exports = 'test-file-stub';
