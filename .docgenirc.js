/**
 * @type {import('@docgeni/core').DocgeniConfig}
 */
module.exports = {
    mode: 'lite',
    title: 'ngx-validator',
    logoUrl: 'https://cdn.pingcode.com/open-sources/docgeni/logo.png',
    description: '',
    docsDir: 'docs',
    navs: [
        null,
        {
            title: 'Directives',
            path: 'components',
            lib: 'core',
            hide: true,
            hidden: true,
            locales: {}
        }
    ],
    libs: [
        {
            name: 'core',
            rootDir: 'packages/core',
            abbrName: 'ngx',
            include: ['src', 'examples'],
            categories: []
        }
    ]
};
