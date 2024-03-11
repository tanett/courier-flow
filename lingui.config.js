/** @type {import('@lingui/conf').LinguiConfig} */
module.exports = {
    locales: [ 'en', 'ru', 'uz' ],
    sourceLocale: 'en',
    catalogs: [ {
        path: 'src/app/locales/{locale}/messages',
        include: [ 'src' ],
    } ],
    format: 'po',
};
