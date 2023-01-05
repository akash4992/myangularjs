const gulp = require('gulp');
// const sass = require('gulp-sass');
const sass = require('gulp-sass')(require('node-sass'));
const minify = require('gulp-minify');
const minihtml = require('gulp-htmlmin');
const {src,dest} = require('gulp');
const minifyjs = require('gulp-uglify')
const sourceMaps = require('gulp-sourcemaps')
const concat = require('gulp-concat')
const minifyCss = require('gulp-clean-css')
const { series, parallel } = require('gulp');
const styles=()=>{
    return gulp.src('scss/*.scss')
    .pipe(sass({outputStyle:'compressed'}).on('error',sass.logError))
    .pipe(minifyCss())
    .pipe(concat('bundle.css'))
    .pipe(sourceMaps.write())
    .pipe(gulp.dest('dest/static/css'))
}


gulp.task('watch',()=>{
    return gulp.src('scss/*.scss',(done)=>{
        gulp.series(['styles'])(done)
    })
})

gulp.task('minify',()=>{
    return gulp.src('js/*.js')
    .pipe(minify())
    .pipe(gulp.dest('dest/js'))
})

const minifyHTML=()=>{
    return gulp.src('src/*.html')
    .pipe(minihtml({collapseWhitespace: true}))
    .pipe(gulp.dest('dest'))
}


// const bundlejs = () => {
//     return src('./js/**/*.js')
//     .pipe(sourceMaps.init())
//     .pipe(minifyjs())
//     .pipe(sourceMaps.write())
//     .pipe(dest('./dest/static/js'));

// }


const jsFile = ['./js/main.js','./js/main2.js']
const bundlejs = () => {
    return src(jsFile)
    .pipe(sourceMaps.init())
    .pipe(minifyjs())
    .pipe(concat('bundle.js'))
    .pipe(sourceMaps.write())
    .pipe(dest('./dest/static/js'));

}



exports.build = series(styles, bundlejs,minifyHTML);

