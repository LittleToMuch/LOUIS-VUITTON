//要想使用gulp提供的功能，首先要将gulp引入到当前文件中
const willy_gulp = require('gulp');
const del = require('del');
const sprite = require('gulp.spritesmith');
//gulp是一个基于task(任务)的构建工具，我们需要在执行构建步骤时，先创建任务

// willy_gulp.task('任务名称',回调函数)

// willy_gulp.task('test',async function () {
//     console.log('测试环境配置是否成功');
// });

async function copyIndex() {
    willy_gulp.src('./src/index.html').pipe(willy_gulp.dest('./dist'))
}

willy_gulp.task('copy-home', copyIndex);

async function copyHtml() {
    willy_gulp.src('./src/html/*.html').pipe(willy_gulp.dest('./dist/html'));
}

willy_gulp.task('copy-html', copyHtml);

async function copyImg() {
    //  路径中的**,代表将文件夹下的路径结构，整体拷贝走
    willy_gulp.src('./src/assets/img/**/*.*').pipe(willy_gulp.dest('./dist/assets/img'))
}

willy_gulp.task('copy-img', copyImg)

async function copyLib() {
    willy_gulp.src('./src/lib/**/*.*').pipe(willy_gulp.dest('./dist/lib'))
}

willy_gulp.task('copy-lib', copyLib);

//willy_gulp.parallel()返回一个新函数，该新函数会并行的执行被合并的任务
let copyAll = willy_gulp.parallel(copyIndex, copyHtml, copyImg, copyLib);
willy_gulp.task('copy', copyAll);

//编译sass这件事，gulp自己是无法实现的，需要依赖插件
//gulp-sass gulp-sass要使用node-sass来编译scss文件
// gulp-sass node-sass
// 步骤：
//      1.安装插件
//      2.将插件引入到gulpfile.js中
var sass = require('gulp-sass');
async function sassTask() {
    willy_gulp.src('./src/style/**/*.scss')
        .pipe(sass({
            outputStyle: "compressed"
        }))
        .pipe(willy_gulp.dest('./dist/css/'))
}

willy_gulp.task('sass', sassTask);
//      3.使用引入后的插件

const babel = require('gulp-babel')
// npm i gulp-babel @babel/core @babel/preset-env
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')

async function homeJS() {
    //将home下的所有js文件合并，然后再编译
    //合并需要使用插件gulp-concat
    //npm i gulp-concat
    willy_gulp
        .src('./src/js/home/**/*.js')
        .pipe(concat("index.js"))
        .pipe(babel({
            presets: ['@babel/env']
        }))     //编译到e5后，进行压缩   gulp-uglify
        .pipe(willy_gulp.dest('./dist/js/index'))
}
willy_gulp.task('js-home', homeJS);
async function myLv() {
    //将home下的所有js文件合并，然后再编译
    //合并需要使用插件gulp-concat
    //npm i gulp-concat
    willy_gulp
        .src('./src/js/myLv/**/*.js')
        .pipe(concat("myLv.js"))
        .pipe(babel({
            presets: ['@babel/env']
        }))     //编译到e5后，进行压缩   gulp-uglify
        .pipe(willy_gulp.dest('./dist/js/myLv'))
}
willy_gulp.task('myLv', myLv);
async function detailSecond() {
    //将home下的所有js文件合并，然后再编译
    //合并需要使用插件gulp-concat
    //npm i gulp-concat
    willy_gulp
        .src('./src/js/details_second/**/*.js')
        .pipe(concat("main.js"))
        .pipe(babel({
            presets: ['@babel/env']
        }))     //编译到e5后，进行压缩   gulp-uglify
        .pipe(willy_gulp.dest('./dist/js/details_second'))
}
willy_gulp.task('details', detailSecond);

async function detailThird() {
    //将home下的所有js文件合并，然后再编译
    //合并需要使用插件gulp-concat
    //npm i gulp-concat
    willy_gulp
        .src('./src/js/details_third/**/*.js')
        .pipe(concat("main.js"))
        .pipe(babel({
            presets: ['@babel/env']
        }))     //编译到e5后，进行压缩   gulp-uglify
        .pipe(willy_gulp.dest('./dist/js/details_third'))
}
willy_gulp.task('details-third', detailThird);

async function php(){
    willy_gulp.src('./src/assets/api/*.php').pipe(willy_gulp.dest('./dist/assets/api'))
}
willy_gulp.task('php',php);

async function spriteCreate() {
    willy_gulp.src('./src/assets/icons/**/*.{png,jpg}')
        .pipe(sprite({
            imgName: "精灵图.png",
            cssName: "精灵图.css"
        }))
        .pipe(willy_gulp.dest('./dist/assets/icons'))
}

willy_gulp.task('sprite', spriteCreate)


let build = willy_gulp.series(clean, willy_gulp.parallel(homeJS, sassTask, copyAll));
willy_gulp.task('dist', build);

function clean() {
    return del(['dist'])
}

function watch() {
    willy_gulp.watch('./src/index.html', copyIndex)
    willy_gulp.watch('./src/assets/img/**/*.*', copyImg)
    willy_gulp.watch('./src/html/*.html', copyHtml)
    willy_gulp.watch('./src/lib/**/*.*', copyLib)
    willy_gulp.watch('./src/style/**/*.scss', sassTask)
    willy_gulp.watch('./src/js/home/**/*.js', homeJS)
    willy_gulp.watch('./src/assets/api/*.php',php)
    willy_gulp.watch('./src/js/details_third/*.js',detailThird)
    willy_gulp.watch('./src/js/details_second/*.js',detailSecond)
    willy_gulp.watch('./src/js/myLv/*.js',myLv);
}

willy_gulp.task('watch', watch);