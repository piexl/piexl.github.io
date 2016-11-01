var gulp = require('gulp'),
    //压缩js文件
    uglify = require('gulp-uglify'),
    //重命名文件
    rename = require('gulp-rename'),
    //压缩css文件
    cssnano = require('gulp-cssnano'),
    //less文件
    less = require('gulp-less'),
    //压缩html
    htmlmin = require('gulp-htmlmin'),
    //压缩图片
    imagemin = require('gulp-imagemin'),
    //合并文件
    concat = require('gulp-concat'),
    //项目清理
    clean = require('gulp-clean');

//压缩js
gulp.task('convertJS', function(){
  return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// 合并并压缩css
gulp.task('convertCSS', function(){
  return gulp.src('src/css/app.css')
    .pipe(less())
    .pipe(concat('app.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('dist/css'));
});

// 合并并压缩html
gulp.task('convertHTML', function(){
  return gulp.src('src/*.html')
    .pipe(htmlmin())
    .pipe(gulp.dest('dist/'));
});

//压缩图片
gulp.task('convertIMG', function(){
  return  gulp.src('src/imgs/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/imgs'));
});

//引入其他资源
gulp.task('moveLib', function(){
  return  gulp.src('src/lib/*')
    .pipe(gulp.dest('dist/lib'));
});

//目标目录清理
gulp.task('clean', function() {
  gulp.src(['dist'], {read: false})
    .pipe(clean());
});

gulp.task('build', ['convertJS', 'convertCSS', 'convertHTML', 'convertIMG','moveLib']);
