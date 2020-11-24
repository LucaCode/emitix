const {src,dest,series,parallel} = require('gulp');
const del               = require('del');
const typescript        = require('gulp-typescript');
const terser            = require('gulp-terser');

const outputFolder = 'dist';

function clean() {
    return del(outputFolder);
}

function compile() {
    return src('./*.ts')
        .pipe(typescript.createProject('tsconfig.json')())
        .pipe(dest(outputFolder));
}

function optimize() {
    return src(`${outputFolder}/**/*.js`)
        .pipe(terser())
        .pipe(dest(outputFolder));
}

const build = series(clean,compile,optimize);

module.exports = {
    clean,
    compile,
    build,
    default: build
};