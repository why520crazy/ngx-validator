/**
 * @type {import('@docgeni/core').DocgeniConfig}
 */
module.exports = {
    mode: 'lite',
    title: 'NGX-VALIDATOR',
    logoUrl: 'https://cdn.pingcode.com/open-sources/docgeni/logo.png',
    repoUrl: 'https://github.com/why520crazy/ngx-validator',
    description: '',
    docsDir: 'docs',
    navs: [
        null,
        {
            title: 'Directives',
            path: 'components',
            lib: 'core',
            locales: {
                'zh-cn': {
                    title: '组件'
                }
            }
        },
        {
            title: 'GitHub',
            path: 'https://github.com/why520crazy/ngx-validator',
            isExternal: true
        },
        {
            title: 'CHANGELOG',
            path: 'https://github.com/why520crazy/ngx-validator/blob/master/CHANGELOG.md',
            isExternal: true,
            locales: {
                'zh-cn': {
                    title: '更新日志'
                }
            }
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
    ],
    locales: [
        {
            key: 'zh-cn',
            name: '中文'
        },
        {
            key: 'en-us',
            name: 'English'
        }
    ]
};
