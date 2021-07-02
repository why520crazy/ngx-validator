module.exports = {
    allowBranch: ['master'],
    bumpFiles: [
        'package.json',
        './packages/core/package.json',
        {
            filename: './packages/core/src/version.ts',
            type: 'code'
        }
    ],
    skip: {
        changelog: true
    },
    commitAll: true,
    hooks: {
        prepublish: 'npm run build',
        postreleaseBranch: 'git add .',
        postpublish: 'npm run pub-only'
    }
};
